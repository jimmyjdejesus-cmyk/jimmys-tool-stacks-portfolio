# 📦 AI Guardians Suite - Deployment Guide

Complete guide for deploying AI Guardians Suite to production.

---

## 🎯 Deployment Options

### 1. Docker (Recommended)
- **Best for**: Development, testing, small deployments
- **Time**: 10 minutes
- **Difficulty**: Easy

### 2. Kubernetes
- **Best for**: Production, scaling
- **Time**: 1-2 hours
- **Difficulty**: Medium

### 3. Cloud Platforms
- **AWS**: ECS, EC2, Lambda
- **Google Cloud**: Cloud Run, GKE
- **Azure**: Container Instances, AKS

---

## 🐳 Docker Deployment

### Step 1: Prerequisites
```bash
# Install Docker
# Install Docker Compose
```

### Step 2: Configuration
```bash
cd backend
cp .env.example .env
# Edit .env with your settings
```

### Step 3: Start Services
```bash
docker-compose up -d
```

### Step 4: Verify
```bash
docker-compose ps
curl http://localhost:8080/health
```

---

## ☁️ Cloud Deployment

### AWS (ECS)

1. **Build Docker Image**:
```bash
docker build -t ai-guardians:latest .
docker tag ai-guardians:latest YOUR_ECR_REPO/ai-guardians:latest
docker push YOUR_ECR_REPO/ai-guardians:latest
```

2. **Create ECS Task Definition**:
- Use provided `ecs-task-definition.json`
- Update environment variables
- Set resource limits

3. **Deploy**:
```bash
aws ecs create-service \
  --cluster your-cluster \
  --service-name ai-guardians \
  --task-definition ai-guardians \
  --desired-count 2
```

### Google Cloud (Cloud Run)

1. **Build and Push**:
```bash
gcloud builds submit --tag gcr.io/YOUR_PROJECT/ai-guardians
```

2. **Deploy**:
```bash
gcloud run deploy ai-guardians \
  --image gcr.io/YOUR_PROJECT/ai-guardians \
  --platform managed \
  --region us-central1
```

---

## 🔒 Security Configuration

### 1. API Keys
- Generate strong API keys
- Store in environment variables
- Never commit to git

### 2. HTTPS
- Use reverse proxy (Nginx, Traefik)
- Configure SSL certificates (Let's Encrypt)
- Enable TLS 1.2+

### 3. Database
- Use encrypted connections
- Regular backups
- Access controls

---

## 📊 Monitoring

### Health Checks
```bash
# Health endpoint
curl http://localhost:8080/health

# Metrics endpoint
curl http://localhost:8080/metrics
```

### Logging
- All logs go to stdout/stderr
- Use Docker logging or external service
- Recommended: CloudWatch, Datadog, or similar

---

## 🔄 Updates

### Update Process
1. Pull latest code
2. Rebuild Docker image
3. Deploy new version
4. Verify health checks
5. Monitor for issues

### Rollback
```bash
docker-compose down
docker-compose up -d --scale api=0
# Deploy previous version
```

---

## 🆘 Support

For deployment help:
- **Email**: jimmy@bravetto.com
- **Documentation**: See `README.md`
- **Examples**: See `examples/` folder

---

**Ready for production!** 🚀

