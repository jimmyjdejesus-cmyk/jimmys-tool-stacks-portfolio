# 🚀 AI Guardians Suite - Quick Start Guide

Get up and running in **5 minutes**!

---

## Option 1: Chrome Extension (2 minutes)

### Step 1: Load Extension
1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable "Developer mode" (top right)
4. Click "Load unpacked"
5. Select the `chrome-extension/` folder
6. Done! Extension is installed

### Step 2: Use It
1. Visit any AI-powered website (ChatGPT, Claude, etc.)
2. Click the AI Guardians icon in your toolbar
3. See real-time safety scores
4. Get detailed analysis

---

## Option 2: Backend API (5 minutes)

### Prerequisites
- Docker installed
- Docker Compose installed

### Step 1: Configure
```bash
cd backend
cp .env.example .env
# Edit .env and add your API keys
```

### Step 2: Start Services
```bash
docker-compose up -d
```

### Step 3: Test API
```bash
curl -X POST http://localhost:8080/api/v1/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "Your text to analyze"}'
```

### Step 4: Check Status
```bash
docker-compose ps
# All services should be "Up"
```

---

## Option 3: Python Integration (3 minutes)

### Step 1: Install
```bash
pip install requests
```

### Step 2: Use It
```python
import requests

api_key = "YOUR_API_KEY"
api_url = "http://localhost:8080/api/v1/analyze"

response = requests.post(
    api_url,
    json={"text": "Your AI-generated text here"},
    headers={"Authorization": f"Bearer {api_key}"}
)

result = response.json()
print(f"Bias Score: {result['bias_score']}")
print(f"Toxicity: {result['toxicity_score']}")
print(f"Hallucination Risk: {result['hallucination_risk']}")
```

---

## 🎯 Next Steps

1. **Read the full documentation**: See `README.md`
2. **Check examples**: See `examples/` folder
3. **Configure for production**: See `deployment-guide.md`
4. **Get support**: Email jimmy@bravetto.com

---

## ❓ Troubleshooting

### Extension not working?
- Check that Developer mode is enabled
- Reload the extension
- Check browser console for errors

### API not responding?
- Check Docker containers are running: `docker-compose ps`
- Check logs: `docker-compose logs`
- Verify API key in `.env` file

### Need help?
Email: jimmy@bravetto.com

---

**You're all set! Start protecting your AI systems now.** 🛡️

