# UniPulse AI - Product Requirements Document (PRD)

## Executive Summary

UniPulse AI is a sentiment analysis platform that aggregates and analyzes Reddit posts from 23 IIT (Indian Institute of Technology) subreddits to provide insights into student sentiment across various categories including academics, placements, hostel life, and more.

**Current Status**: MVP with basic sentiment analysis and visualization
**Target**: Production-ready platform with enhanced features, improved architecture, and comprehensive data management

---

## 1. Frontend PRD

### 1.1 Current State
- **Tech Stack**: React 19, Vite, Recharts, React Router
- **Pages**: Dashboard (single IIT view), Compare (all IITs comparison)
- **Features**: Basic sentiment visualization, category breakdown, post feed

### 1.2 Frontend Requirements

#### 1.2.1 Core Features

**A. Enhanced Dashboard**
- Real-time sentiment updates with WebSocket support
- Historical sentiment trends (time-series charts)
- Category drill-down with detailed post analysis
- Sentiment heatmaps across categories
- Export functionality (PDF, CSV)
- Dark/Light theme toggle
- Responsive design for mobile/tablet

**B. Advanced Comparison**
- Multi-IIT comparison (select 2-5 IITs)
- Category-wise comparison charts
- Sentiment trend comparison over time
- Statistical significance indicators
- Side-by-side post comparison
- Custom date range filters

**C. Post Analysis**
- Detailed post view with full sentiment breakdown
- Comment sentiment analysis
- Post engagement metrics (upvotes, comments)
- Sentiment evolution over time
- Related posts recommendation
- User sentiment tracking

**D. Analytics & Insights**
- Sentiment velocity (rate of change)
- Trend detection (rising/falling sentiment)
- Anomaly detection (unusual sentiment spikes)
- Category correlation analysis
- Word cloud visualization
- Topic modeling visualization

#### 1.2.2 User Experience

**A. Navigation**
- Breadcrumb navigation
- Quick search for IITs
- Favorites/bookmarking
- Recent views history
- Keyboard shortcuts

**B. Performance**
- Lazy loading for charts
- Virtual scrolling for post feeds
- Optimistic UI updates
- Progressive image loading
- Code splitting by route

**C. Accessibility**
- WCAG 2.1 AA compliance
- Screen reader support
- Keyboard navigation
- High contrast mode
- Font size controls

#### 1.2.3 Technical Requirements

**A. State Management**
- Implement Redux Toolkit or Zustand for global state
- Caching strategy for API responses
- Offline support with service workers
- Local storage for user preferences

**B. API Integration**
- Axios interceptors for error handling
- Request/response transformation
- Retry logic for failed requests
- Request debouncing/throttling

**C. Testing**
- Unit tests (Jest + React Testing Library)
- Integration tests
- E2E tests (Playwright)
- Visual regression tests

**D. Build & Deployment**
- Environment-specific configurations
- Asset optimization
- Bundle size monitoring
- CDN integration
- Progressive Web App (PWA) support

### 1.3 Frontend Architecture Improvements

#### 1.3.1 Component Structure
```
src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── charts/          # Chart components
│   ├── posts/           # Post-related components
│   └── analytics/       # Analytics components
├── pages/
│   ├── Dashboard/
│   ├── Compare/
│   ├── Analytics/
│   └── Settings/
├── hooks/               # Custom hooks
├── services/            # API services
├── store/               # State management
├── utils/               # Utility functions
├── constants/           # Constants and configs
└── types/               # TypeScript types
```

#### 1.3.2 Design System
- Component library with Storybook
- Design tokens (colors, spacing, typography)
- Responsive breakpoints
- Animation library integration
- Icon system

---

## 2. Backend PRD

### 2.1 Current State
- **Tech Stack**: FastAPI, SQLAlchemy, VADER sentiment, APScheduler
- **Data Source**: Reddit API (hot posts)
- **Database**: SQLite (development), PostgreSQL (production)
- **Features**: Basic sentiment analysis, scheduled scraping

### 2.2 Backend Requirements

#### 2.2.1 Core Features

**A. Enhanced Data Collection**
- Multi-source data aggregation (Reddit, Twitter, Quora)
- Real-time scraping with rate limiting
- Incremental updates (only new posts)
- Historical data backfilling
- Comment thread analysis
- User profile analysis

**B. Advanced Sentiment Analysis**
- Multiple sentiment models (VADER, BERT, RoBERTa)
- Aspect-based sentiment analysis
- Emotion detection (joy, anger, fear, etc.)
- Sarcasm detection
- Context-aware sentiment
- Multi-language support

**C. Data Processing Pipeline**
- ETL pipeline with Airflow/Prefect
- Data validation and cleaning
- Deduplication logic
- Text preprocessing (tokenization, stemming)
- Entity extraction (IIT names, departments, companies)
- Topic modeling (LDA, BERTopic)

**D. Analytics Engine**
- Time-series aggregation
- Statistical analysis
- Trend detection algorithms
- Anomaly detection
- Correlation analysis
- Predictive modeling

#### 2.2.2 API Requirements

**A. RESTful API Endpoints**

```
# Sentiment Analysis
GET    /api/v1/sentiment/{iit}
GET    /api/v1/sentiment/{iit}/history
GET    /api/v1/sentiment/{iit}/categories
GET    /api/v1/sentiment/{iit}/trends

# Comparison
GET    /api/v1/compare
GET    /api/v1/compare/categories
GET    /api/v1/compare/timeline

# Posts
GET    /api/v1/posts
GET    /api/v1/posts/{id}
GET    /api/v1/posts/{id}/comments
GET    /api/v1/posts/search

# Analytics
GET    /api/v1/analytics/overview
GET    /api/v1/analytics/velocity
GET    /api/v1/analytics/anomalies
GET    /api/v1/analytics/correlations

# Admin
POST   /api/v1/admin/scrape
POST   /api/v1/admin/backfill
GET    /api/v1/admin/status
```

**B. WebSocket Support**
- Real-time sentiment updates
- Live scraping progress
- System notifications

**C. Authentication & Authorization**
- API key authentication
- Rate limiting per user
- Role-based access control
- Audit logging

#### 2.2.3 Performance Requirements

**A. Response Times**
- P50: < 200ms
- P95: < 500ms
- P99: < 1s

**B. Throughput**
- 1000+ requests/second
- 10,000+ concurrent connections

**C. Caching**
- Redis for hot data
- CDN for static assets
- Database query caching
- API response caching

#### 2.2.4 Monitoring & Observability

**A. Metrics**
- Request latency
- Error rates
- Scraping success rates
- Database performance
- Cache hit rates

**B. Logging**
- Structured logging (JSON)
- Log aggregation (ELK stack)
- Error tracking (Sentry)
- Performance profiling

**C. Alerting**
- Scraping failures
- API errors
- Database issues
- Performance degradation

### 2.3 Backend Architecture Improvements

#### 2.3.1 Microservices Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     API Gateway                          │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼────────┐  ┌──────▼──────┐  ┌────────▼────────┐
│  Sentiment      │  │   Data      │  │   Analytics     │
│  Service       │  │   Service   │  │   Service       │
└────────────────┘  └─────────────┘  └─────────────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼────────┐  ┌──────▼──────┐  ┌────────▼────────┐
│  PostgreSQL    │  │   Redis     │  │   Message       │
│  (Primary DB)  │  │   (Cache)   │  │   Queue         │
└────────────────┘  └─────────────┘  └─────────────────┘
```

#### 2.3.2 Service Breakdown

**A. Sentiment Service**
- Sentiment analysis endpoints
- Model management
- Batch processing
- Result caching

**B. Data Service**
- Scraping orchestration
- Data storage
- Data retrieval
- Data transformation

**C. Analytics Service**
- Aggregation queries
- Statistical analysis
- Trend detection
- Report generation

#### 2.3.3 Data Flow

```
Reddit API → Scraper → Message Queue → Data Service → PostgreSQL
                                              ↓
                                         Sentiment Service
                                              ↓
                                            Redis
                                              ↓
                                         API Gateway
                                              ↓
                                           Frontend
```

---

## 3. Backend Data Improvements

### 3.1 Database Schema Enhancements

#### 3.1.1 Core Tables

**A. Posts Table**
```sql
CREATE TABLE posts (
    id VARCHAR(50) PRIMARY KEY,
    iit VARCHAR(50) NOT NULL,
    title TEXT NOT NULL,
    body TEXT,
    subreddit VARCHAR(100),
    author VARCHAR(100),
    score INTEGER,
    comments INTEGER,
    url TEXT,
    created_utc TIMESTAMP,
    scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_iit (iit),
    INDEX idx_created (created_utc),
    INDEX idx_scraped (scraped_at)
);
```

**B. Sentiment Scores Table**
```sql
CREATE TABLE sentiment_scores (
    id SERIAL PRIMARY KEY,
    post_id VARCHAR(50) REFERENCES posts(id),
    model VARCHAR(50) NOT NULL,
    compound FLOAT NOT NULL,
    positive FLOAT NOT NULL,
    negative FLOAT NOT NULL,
    neutral FLOAT NOT NULL,
    label VARCHAR(20) NOT NULL,
    emotions JSONB,
    aspects JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_post (post_id),
    INDEX idx_model (model)
);
```

**C. Categories Table**
```sql
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    post_id VARCHAR(50) REFERENCES posts(id),
    category VARCHAR(50) NOT NULL,
    confidence FLOAT,
    keywords JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category)
);
```

**D. Comments Table**
```sql
CREATE TABLE comments (
    id VARCHAR(50) PRIMARY KEY,
    post_id VARCHAR(50) REFERENCES posts(id),
    parent_id VARCHAR(50),
    author VARCHAR(100),
    body TEXT NOT NULL,
    score INTEGER,
    created_utc TIMESTAMP,
    scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_post (post_id),
    INDEX idx_parent (parent_id)
);
```

**E. Comment Sentiment Table**
```sql
CREATE TABLE comment_sentiment (
    id SERIAL PRIMARY KEY,
    comment_id VARCHAR(50) REFERENCES comments(id),
    model VARCHAR(50) NOT NULL,
    compound FLOAT NOT NULL,
    positive FLOAT NOT NULL,
    negative FLOAT NOT NULL,
    neutral FLOAT NOT NULL,
    label VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**F. Aggregated Metrics Table**
```sql
CREATE TABLE aggregated_metrics (
    id SERIAL PRIMARY KEY,
    iit VARCHAR(50) NOT NULL,
    category VARCHAR(50),
    date DATE NOT NULL,
    avg_sentiment FLOAT,
    total_posts INTEGER,
    positive_count INTEGER,
    negative_count INTEGER,
    neutral_count INTEGER,
    engagement_score FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(iit, category, date),
    INDEX idx_date (date),
    INDEX idx_iit_category (iit, category)
);
```

**G. Trends Table**
```sql
CREATE TABLE trends (
    id SERIAL PRIMARY KEY,
    iit VARCHAR(50) NOT NULL,
    category VARCHAR(50),
    trend_type VARCHAR(20) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    magnitude FLOAT,
    confidence FLOAT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_iit (iit),
    INDEX idx_dates (start_date, end_date)
);
```

**H. Anomalies Table**
```sql
CREATE TABLE anomalies (
    id SERIAL PRIMARY KEY,
    iit VARCHAR(50) NOT NULL,
    category VARCHAR(50),
    detected_at TIMESTAMP NOT NULL,
    anomaly_type VARCHAR(50) NOT NULL,
    severity VARCHAR(20) NOT NULL,
    value FLOAT,
    expected_value FLOAT,
    deviation FLOAT,
    context JSONB,
    resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_iit (iit),
    INDEX idx_detected (detected_at)
);
```

**I. Scraping Logs Table**
```sql
CREATE TABLE scraping_logs (
    id SERIAL PRIMARY KEY,
    iit VARCHAR(50) NOT NULL,
    source VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL,
    posts_scraped INTEGER,
    errors INTEGER,
    duration_seconds FLOAT,
    started_at TIMESTAMP NOT NULL,
    completed_at TIMESTAMP,
    metadata JSONB,
    INDEX idx_iit (iit),
    INDEX idx_status (status),
    INDEX idx_started (started_at)
);
```

#### 3.1.2 Database Indexes

**Performance Indexes**
- Composite indexes for common query patterns
- Partial indexes for filtered queries
- GIN indexes for JSONB columns
- BRIN indexes for time-series data

#### 3.1.3 Data Partitioning

**Time-based Partitioning**
- Partition posts by month
- Partition sentiment_scores by month
- Partition aggregated_metrics by quarter

### 3.2 Data Quality Improvements

#### 3.2.1 Data Validation

**A. Input Validation**
- Post ID format validation
- Score range validation
- Timestamp validation
- Text length limits

**B. Data Cleaning**
- Remove duplicate posts
- Normalize text (Unicode, whitespace)
- Filter spam/low-quality posts
- Handle missing values

**C. Data Enrichment**
- Add geographic metadata
- Extract entities (companies, departments)
- Classify post types (question, rant, announcement)
- Identify trending topics

#### 3.2.2 Data Retention

**A. Retention Policies**
- Raw posts: 2 years
- Sentiment scores: 5 years
- Aggregated metrics: 10 years
- Logs: 6 months

**B. Archival Strategy**
- Cold storage for old data
- Data compression
- Partition pruning

### 3.3 Data Migration Strategy

#### 3.3.1 Migration Phases

**Phase 1: Schema Migration**
- Create new tables
- Migrate existing data
- Update indexes
- Validate data integrity

**Phase 2: Application Migration**
- Update API endpoints
- Migrate frontend queries
- Update scraping logic
- Test thoroughly

**Phase 3: Optimization**
- Analyze query performance
- Add missing indexes
- Optimize slow queries
- Tune database settings

#### 3.3.2 Rollback Plan

- Database backups before migration
- Feature flags for gradual rollout
- Monitoring for issues
- Quick rollback procedures

---

## 4. Architecture Improvements

### 4.1 High-Level Architecture

#### 4.1.1 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend Layer                           │
│  (React + Vite + Recharts + PWA)                                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS/WebSocket
                              │
┌─────────────────────────────────────────────────────────────────┐
│                      API Gateway Layer                           │
│  (Kong / AWS API Gateway / NGINX)                               │
│  - Rate Limiting                                                  │
│  - Authentication                                                │
│  - Load Balancing                                                │
│  - Request Routing                                               │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────▼──────────┐  ┌───────▼──────────┐  ┌──────▼──────────┐
│  Sentiment       │  │   Data           │  │   Analytics     │
│  Service         │  │   Service        │  │   Service       │
│  (FastAPI)       │  │   (FastAPI)      │  │   (FastAPI)     │
│  - Analysis      │  │   - Scraping     │  │   - Aggregation │
│  - Models        │  │   - Storage      │  │   - Trends      │
│  - Caching       │  │   - Retrieval    │  │   - Reports     │
└──────────────────┘  └──────────────────┘  └─────────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────▼──────────┐  ┌──────▼──────┐  ┌──────▼──────────┐
│  PostgreSQL      │  │   Redis          │  │   RabbitMQ      │
│  (Primary DB)    │  │   (Cache)        │  │   (Message      │
│  - Posts         │  │   - Hot Data     │  │    Queue)       │
│  - Sentiment     │  │   - Sessions     │  │   - Tasks       │
│  - Metrics       │  │   - Rate Limits  │  │   - Events     │
└──────────────────┘  └──────────────────┘  └─────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────▼──────────┐  ┌───────▼──────────┐  ┌──────▼──────────┐
│  S3 / Cloud      │  │   Elasticsearch  │  │   Prometheus    │
│  Storage         │  │   (Search)       │  │   (Metrics)    │
│  - Media         │  │   - Full-text    │  │   - Monitoring  │
│  - Backups       │  │   - Analytics    │  │   - Alerting    │
└──────────────────┘  └──────────────────┘  └─────────────────┘
```

#### 4.1.2 Deployment Architecture

**Development Environment**
- Docker Compose for local development
- Hot reloading for services
- Local PostgreSQL and Redis
- Mock data for testing

**Staging Environment**
- Kubernetes cluster
- Production-like configuration
- Limited data set
- Performance testing

**Production Environment**
- Multi-region deployment
- Auto-scaling groups
- Load balancers
- CDN for static assets
- Database replication

### 4.2 Infrastructure Improvements

#### 4.2.1 Containerization

**A. Docker Images**
- Multi-stage builds
- Minimal base images
- Security scanning
- Version tagging

**B. Kubernetes Configuration**
- Deployment manifests
- Service configurations
- Ingress rules
- ConfigMaps and Secrets
- Horizontal Pod Autoscaling

#### 4.2.2 CI/CD Pipeline

**A. Pipeline Stages**
1. **Lint & Format**
   - ESLint, Prettier
   - Black, isort
   - Pre-commit hooks

2. **Unit Tests**
   - Jest for frontend
   - Pytest for backend
   - Coverage reporting

3. **Integration Tests**
   - API testing
   - Database testing
   - End-to-end tests

4. **Build**
   - Docker image build
   - Frontend bundle
   - Security scanning

5. **Deploy to Staging**
   - Kubernetes deployment
   - Database migrations
   - Smoke tests

6. **Deploy to Production**
   - Blue-green deployment
   - Canary releases
   - Rollback capability

#### 4.2.3 Monitoring & Observability

**A. Metrics Collection**
- Application metrics (Prometheus)
- Infrastructure metrics (CloudWatch)
- Business metrics (custom)

**B. Logging**
- Centralized logging (ELK stack)
- Structured logs
- Log retention policies
- Log analysis dashboards

**C. Tracing**
- Distributed tracing (Jaeger)
- Request correlation
- Performance profiling
- Error tracking

**D. Alerting**
- PagerDuty integration
- Slack notifications
- Email alerts
- Alert escalation

### 4.3 Security Improvements

#### 4.3.1 Application Security

**A. Authentication**
- OAuth 2.0 / OpenID Connect
- JWT tokens
- Multi-factor authentication
- Session management

**B. Authorization**
- Role-based access control (RBAC)
- API key management
- Rate limiting
- IP whitelisting

**C. Data Security**
- Encryption at rest
- Encryption in transit (TLS)
- Data masking
- Secure key management

**D. API Security**
- Input validation
- SQL injection prevention
- XSS protection
- CSRF protection

#### 4.3.2 Infrastructure Security

**A. Network Security**
- VPC configuration
- Security groups
- Network ACLs
- DDoS protection

**B. Container Security**
- Image vulnerability scanning
- Runtime security
- Least privilege
- Resource limits

**C. Secrets Management**
- HashiCorp Vault
- AWS Secrets Manager
- Environment variables
- Rotation policies

### 4.4 Scalability Improvements

#### 4.4.1 Horizontal Scaling

**A. Stateless Services**
- Remove session state
- Externalize state (Redis)
- Load balancing
- Auto-scaling

**B. Database Scaling**
- Read replicas
- Connection pooling
- Query optimization
- Caching strategy

#### 4.4.2 Performance Optimization

**A. Caching Strategy**
- Application-level caching
- Database query caching
- CDN caching
- Edge computing

**B. Async Processing**
- Background jobs
- Message queues
- Event-driven architecture
- Batch processing

**C. Database Optimization**
- Query optimization
- Index tuning
- Partitioning
- Connection pooling

### 4.5 Disaster Recovery & High Availability

#### 4.5.1 High Availability

**A. Service Availability**
- Multi-zone deployment
- Load balancing
- Health checks
- Automatic failover

**B. Database Availability**
- Primary-replica setup
- Automatic failover
- Backup replication
- Point-in-time recovery

#### 4.5.2 Disaster Recovery

**A. Backup Strategy**
- Automated backups
- Cross-region replication
- Backup verification
- Retention policies

**B. Recovery Procedures**
- RTO/RPO targets
- Recovery runbooks
- Regular testing
- Documentation

---

## 5. Implementation Roadmap

### 5.1 Phase 1: Foundation (Weeks 1-4)

**Frontend**
- Set up TypeScript
- Implement state management
- Create design system
- Set up testing framework

**Backend**
- Implement new database schema
- Create migration scripts
- Set up Redis caching
- Implement basic monitoring

**Infrastructure**
- Set up CI/CD pipeline
- Configure Docker builds
- Set up staging environment
- Implement logging

### 5.2 Phase 2: Core Features (Weeks 5-8)

**Frontend**
- Build enhanced dashboard
- Implement real-time updates
- Add historical trends
- Create comparison features

**Backend**
- Implement advanced sentiment analysis
- Add comment analysis
- Create aggregation service
- Implement WebSocket support

**Data**
- Migrate existing data
- Implement data validation
- Set up data retention
- Create archival strategy

### 5.3 Phase 3: Advanced Features (Weeks 9-12)

**Frontend**
- Add analytics page
- Implement export functionality
- Create PWA features
- Add accessibility features

**Backend**
- Implement trend detection
- Add anomaly detection
- Create analytics engine
- Implement advanced caching

**Infrastructure**
- Set up production environment
- Implement auto-scaling
- Configure monitoring
- Set up alerting

### 5.4 Phase 4: Optimization & Polish (Weeks 13-16)

**Frontend**
- Performance optimization
- UI/UX improvements
- Add animations
- Final testing

**Backend**
- Performance tuning
- Security hardening
- Documentation
- Load testing

**Infrastructure**
- Disaster recovery testing
- Security audit
- Cost optimization
- Final deployment

---

## 6. Success Metrics

### 6.1 Technical Metrics

**Performance**
- API response time < 200ms (P50)
- Page load time < 2s
- 99.9% uptime
- Error rate < 0.1%

**Scalability**
- Support 10,000+ concurrent users
- Handle 1M+ posts
- Process 100K+ posts/day
- Sub-second query responses

**Quality**
- Test coverage > 80%
- Zero critical vulnerabilities
- Code quality score > 8/10
- Documentation completeness > 90%

### 6.2 Business Metrics

**User Engagement**
- Daily active users
- Session duration
- Page views per session
- Return user rate

**Data Quality**
- Scraping success rate > 95%
- Sentiment accuracy > 85%
- Data freshness < 6 hours
- Duplicate rate < 1%

---

## 7. Risks & Mitigations

### 7.1 Technical Risks

**Risk**: Reddit API rate limits
**Mitigation**: Implement caching, use multiple accounts, optimize requests

**Risk**: Sentiment model accuracy
**Mitigation**: Ensemble models, continuous training, human validation

**Risk**: Database performance at scale
**Mitigation**: Proper indexing, partitioning, caching, read replicas

**Risk**: Third-party service dependencies
**Mitigation**: Fallback mechanisms, service alternatives, SLA monitoring

### 7.2 Business Risks

**Risk**: Reddit terms of service changes
**Mitigation**: Diversify data sources, build relationships, legal review

**Risk**: User privacy concerns
**Mitigation**: Anonymize data, comply with regulations, transparent policies

**Risk**: Competition
**Mitigation**: Focus on unique features, continuous innovation, user feedback

---

## 8. Appendix

### 8.1 Technology Stack Summary

**Frontend**
- React 19
- TypeScript
- Vite
- Recharts
- React Router
- Redux Toolkit/Zustand
- Tailwind CSS

**Backend**
- FastAPI
- Python 3.11+
- PostgreSQL
- Redis
- RabbitMQ
- Celery
- PyTorch/Transformers

**Infrastructure**
- Docker
- Kubernetes
- AWS/GCP
- Terraform
- Prometheus
- Grafana
- ELK Stack

### 8.2 References

- Reddit API Documentation
- FastAPI Best Practices
- PostgreSQL Performance Tuning
- React Performance Optimization
- Microservices Patterns

---

## Document Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-28 | UniPulse Team | Initial PRD creation |
