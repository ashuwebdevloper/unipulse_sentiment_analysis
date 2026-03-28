from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func
from database import get_db, engine
from scheduler import scheduler  # auto-starts on import
import models, scraper, sentiment as sa
from collections import defaultdict

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="UniPulse AI API")

app.add_middleware(CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"], allow_headers=["*"])

@app.get("/api/stats")
def get_stats(db: Session = Depends(get_db)):
    """Instant stats from database - no scraping"""
    total = db.query(models.Post).count()
    
    # Sentiment distribution
    sentiment_dist = db.query(
        models.Post.label, 
        func.count(models.Post.id)
    ).group_by(models.Post.label).all()
    
    # Category distribution
    category_dist = db.query(
        models.Post.category,
        func.count(models.Post.id)
    ).group_by(models.Post.category).all()
    
    # IIT distribution
    iit_dist = db.query(
        models.Post.iit,
        func.count(models.Post.id)
    ).group_by(models.Post.iit).order_by(func.count(models.Post.id).desc()).all()
    
    # Average sentiment by IIT
    iit_scores = db.query(
        models.Post.iit,
        func.avg(models.Post.compound),
        func.count(models.Post.id)
    ).group_by(models.Post.iit).all()
    
    iit_ranking = []
    for iit, avg_compound, count in iit_scores:
        if count > 0:
            iit_ranking.append({
                "iit": iit,
                "score": round((avg_compound + 1) / 2 * 100),
                "posts": count
            })
    iit_ranking.sort(key=lambda x: x["score"], reverse=True)
    
    return {
        "total_posts": total,
        "sentiment": {k: v for k, v in sentiment_dist},
        "categories": {k: v for k, v in category_dist},
        "iits": [{"iit": k, "posts": v} for k, v in iit_dist],
        "ranking": iit_ranking[:10]
    }

@app.get("/api/compare")
def compare_all(db: Session = Depends(get_db)):
    """Compare all IITs using database data - instant load"""
    iit_scores = db.query(
        models.Post.iit,
        func.avg(models.Post.compound),
        func.count(models.Post.id)
    ).group_by(models.Post.iit).all()
    
    results = []
    for iit, avg_compound, count in iit_scores:
        if count > 0:
            results.append({
                "iit": iit,
                "score": round((avg_compound + 1) / 2 * 100),
                "posts": count
            })
    return sorted(results, key=lambda x: x["score"], reverse=True)

@app.get("/api/sentiment/{iit_key}")
def get_sentiment(iit_key: str, db: Session = Depends(get_db)):
    """Get sentiment for specific IIT - uses database"""
    iit_search = iit_key.upper()
    posts = db.query(models.Post).filter(
        models.Post.iit.ilike(f"%{iit_search}%")
    ).all()
    
    if not posts:
        return {"iit": iit_key.upper(), "overall": 50, "total_posts": 0, 
                "categories": [], "message": "No data in database"}
    
    cat_data = defaultdict(lambda: {"scores": [], "posts": 0})
    for p in posts:
        cat_data[p.category]["scores"].append(p.compound)
        cat_data[p.category]["posts"] += 1
    
    categories = []
    for cat, data in cat_data.items():
        avg = sum(data["scores"]) / len(data["scores"])
        normalized = round((avg + 1) / 2 * 100)
        categories.append({"name": cat, "score": normalized, "posts": data["posts"]})
    
    total_scores = [p.compound for p in posts]
    overall = round((sum(total_scores)/len(total_scores) + 1) / 2 * 100)
    
    top_posts = [
        {"title": p.title, "body": p.body, "compound": p.compound, "label": p.label}
        for p in sorted(posts, key=lambda x: x.score, reverse=True)[:5]
    ]
    
    return {
        "iit": iit_key.upper(),
        "overall": overall,
        "total_posts": len(posts),
        "categories": categories,
        "top_posts": top_posts,
    }

@app.get("/api/refresh")
def refresh_data(db: Session = Depends(get_db)):
    """Manually trigger data refresh from Reddit (slow)"""
    results = []
    for iit_key in scraper.IIT_SUBREDDITS.keys():
        try:
            posts_raw = scraper.scrape_iit(iit_key, limit=50, delay=1)
            posts_analyzed = sa.analyze_posts(posts_raw)
            
            for p in posts_analyzed:
                existing = db.query(models.Post).filter(models.Post.id == p["post_id"]).first()
                if not existing:
                    post = models.Post(
                        id=p["post_id"],
                        iit=p["iit"],
                        title=p["title"],
                        body=p["body"],
                        category=p["category"],
                        compound=p.get("compound", 0),
                        label=p.get("label", "neutral"),
                        score=p.get("score", 0),
                        comments=p.get("comments", 0),
                        subreddit=p.get("subreddit", "")
                    )
                    db.add(post)
            db.commit()
            results.append({"iit": iit_key, "posts": len(posts_analyzed)})
        except Exception as e:
            results.append({"iit": iit_key, "error": str(e)})
    
    return {"status": "completed", "results": results}
