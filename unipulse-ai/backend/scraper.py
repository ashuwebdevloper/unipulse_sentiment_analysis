import requests
import os
import time
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

IIT_SUBREDDITS = {
    "IITBHU":         "IITBHU",
    "IITBhubaneswar": "IITBhubaneswar",
    "IITBombay":      "iitbombay",
    "IITDelhi":       "IITDelhi",
    "IITISM":         "IndianInstituteofTechnologyISM",
    "IITGandhinagar": "IITGandhinagar",
    "IITGoa":         "IITGoa",
    "IITGuwahati":    "iitg",
    "IITHyderabad":   "IITHyderabad",
    "IITIndore":      "IITIndore",
    "IITJammu":       "IITJammu",
    "IITJodhpur":     "IITJodhpur",
    "IITK":           "IITK",
    "IITKgp":         "iitkgp",
    "IITMadras":      "iitmadras",
    "IITMandi":       "IITMandi",
    "IITPalakkad":    "IITPalakkad",
    "IITPatna":       "IITPatna",
    "IITRoorkee":     "IITRoorkee",
    "IITRopar":       "IITRopar",
    "IITTirupati":    "IITTirupati",
    "IITBhilai":      "IITBhilai",
    "IITDharwad":     "IITDharwad",
}

GENERAL_SUBREDDITS = {
    "JEE":           "JEETards",
    "NITs":          "NIT", 
    "Engineering":   "engineering",
    "IndianStudents":"indianstudents",
    "BITS":          "BitsPilani",
    "IITJEE":        "IITJEE",
}

NIT_SUBREDDITS = {
    "NITWarangal":   "NITWarangal",
    "NITSurathkal":  "NITK",
    "NITTrichy":     "NITTrichy",
    "NITCalicut":    "NITCalicut",
    "NITRourkela":   "NITRourkela",
    "NITHamirpur":   "NIThamirpur",
    "NITJamshedpur": "NITJsr",
    "NITKurukshetra":"NITKurukshetra",
}

CATEGORY_KEYWORDS = {
    "Academics":      ["exam", "professor", "course", "grade", "cgpa", "study", "lecture", "assignment", "quiz", "test"],
    "Placements":     ["placement", "internship", "package", "company", "offer", "recruit", "job", "salary", "jnf"],
    "Hostel Life":    ["hostel", "mess", "food", "room", "warden", "dorm", "canteen", "accommodations"],
    "Fests & Culture":["fest", "cultural", "techfest", "mood indigo", "spring fest", "event", "competition"],
    "Mental Health":  ["stress", "anxiety", "depression", "counseling", "mental", "burnout", "vent", "support"],
    "Infrastructure": ["lab", "library", "wifi", "facility", "building", "campus", "gym", "resources"],
    "Administration": ["admin", "dean", "rule", "policy", "fee", "bureaucracy", "portal", "registrar"],
}

def categorize_post(text):
    text_lower = text.lower()
    for category, keywords in CATEGORY_KEYWORDS.items():
        if any(kw in text_lower for kw in keywords):
            return category
    return "General"

def fetch_reddit_posts(sub_name, sort="hot", time_filter="all", limit=100, after=None):
    """Fetch posts from a specific subreddit with sorting and pagination"""
    url = f"https://www.reddit.com/r/{sub_name}/{sort}.json"
    params = {"limit": min(limit, 100), "t": time_filter}
    if after:
        params["after"] = after
    
    headers = {
        'User-Agent': 'UniPulse-AI/1.0 (Educational Project)'
    }
    
    try:
        response = requests.get(url, headers=headers, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        posts = []
        if "data" in data and "children" in data["data"]:
            for item in data["data"]["children"]:
                post = item.get("data", {})
                posts.append({
                    "post_id":   post.get("id", ""),
                    "title":     post.get("title", ""),
                    "body":      post.get("selftext", "")[:500],
                    "score":     post.get("score", 0),
                    "comments":  post.get("num_comments", 0),
                    "created":   post.get("created_utc", 0),
                    "url":       post.get("url", ""),
                })
        
        new_after = data.get("data", {}).get("after")
        return posts, new_after
    except Exception as e:
        print(f"Error fetching {sort} from r/{sub_name}: {e}")
        return [], None

def scrape_iit(iit_key, limit=100, delay=1):
    """Fetch posts from multiple sorting methods for richer data"""
    sub_name = IIT_SUBREDDITS.get(iit_key)
    if not sub_name:
        return []

    posts = []
    sort_methods = ["hot", "new", "top", "rising"]
    time_filters = ["all", "year", "month", "week"]
    
    for sort in sort_methods:
        if sort == "top":
            for tf in time_filters:
                more_posts, _ = fetch_reddit_posts(sub_name, sort=sort, time_filter=tf, limit=limit)
                for post in more_posts:
                    if post["post_id"] not in [p["post_id"] for p in posts]:
                        post["iit"] = iit_key
                        post["category"] = categorize_post(post["title"] + " " + post["body"])
                        post["subreddit"] = sub_name
                        posts.append(post)
                time.sleep(delay)
                if len(posts) >= limit * 2:
                    break
        else:
            more_posts, _ = fetch_reddit_posts(sub_name, sort=sort, limit=limit)
            for post in more_posts:
                if post["post_id"] not in [p["post_id"] for p in posts]:
                    post["iit"] = iit_key
                    post["category"] = categorize_post(post["title"] + " " + post["body"])
                    post["subreddit"] = sub_name
                    posts.append(post)
            time.sleep(delay)
        
        if len(posts) >= limit * 3:
            break
    
    return posts[:limit * 3] if limit * 3 <= 500 else posts[:500]

def scrape_general_reddits(limit=50, delay=1.5):
    """Fetch posts from general Indian education subreddits"""
    all_posts = []
    all_subs = {**GENERAL_SUBREDDITS, **NIT_SUBREDDITS}
    
    for name, sub in all_subs.items():
        sort_methods = ["hot", "new", "top"]
        
        for sort in sort_methods[:2]:
            posts_data, _ = fetch_reddit_posts(sub, sort=sort, limit=limit)
            for post in posts_data:
                if post["post_id"] not in [p["post_id"] for p in all_posts]:
                    post["iit"] = name
                    post["category"] = categorize_post(post["title"] + " " + post["body"])
                    post["subreddit"] = sub
                    all_posts.append(post)
            time.sleep(delay)
            if len(all_posts) >= 500:
                break
        if len(all_posts) >= 500:
            break
    
    return all_posts[:500]