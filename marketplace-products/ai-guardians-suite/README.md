# 🛡️ AI Guardians Suite

**Version**: 1.0.0  
**Last Updated**: December 19, 2025  
**Support**: jimmy@bravetto.com

---

## 🎯 What is AI Guardians Suite?

AI Guardians Suite is a production-ready system that provides real-time verification for AI systems, detecting bias, hallucinations, toxicity, and security vulnerabilities **before they reach users**.

---

## ✨ Features

- **7-Layer Bias Detection** - 89% F1 accuracy, detects 12+ bias types
- **Real-Time Fact Verification** - Source citations, claim validation
- **Context Management** - Persistent memory, prevents drift
- **Toxicity Detection** - Multi-language support
- **Hallucination Prevention** - Confidence-based filtering
- **Security Validation** - Input/output sanitization
- **Token Optimization** - Reduce costs by 30-50%
- **Chrome Extension** - Browser-based monitoring
- **REST API** - Integrate with any application
- **149-Agent Swarm** - Distributed architecture for scale

---

## 📦 What's Included

```
ai-guardians-suite/
├── chrome-extension/          # Chrome extension files
├── backend/                   # Backend API (Docker)
├── api-documentation/         # Complete API docs
├── examples/                  # Integration examples
├── deployment-guide.md        # Step-by-step deployment
└── quick-start.md            # Get started in 5 minutes
```

---

## 🚀 Quick Start

### Option 1: Chrome Extension (Easiest)

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `chrome-extension/` folder
5. Pin the extension to your toolbar
6. Start using it!

### Option 2: Backend API (Docker)

1. Install Docker and Docker Compose
2. Copy `.env.example` to `.env`
3. Add your API keys to `.env`
4. Run: `docker-compose up -d`
5. API will be available at `http://localhost:8080`

### Option 3: Python Integration

```python
import requests

response = requests.post(
    'http://localhost:8080/api/v1/analyze',
    json={'text': 'Your AI-generated text here'},
    headers={'Authorization': 'Bearer YOUR_API_KEY'}
)

result = response.json()
print(f"Bias Score: {result['bias_score']}")
print(f"Toxicity: {result['toxicity_score']}")
```

---

## 📚 Documentation

- **API Documentation**: See `api-documentation/openapi.yaml`
- **Deployment Guide**: See `deployment-guide.md`
- **Integration Examples**: See `examples/` folder
- **Full Documentation**: https://github.com/bravetto/AIGuards-Backend

---

## 🔧 Configuration

### Environment Variables

```bash
# API Configuration
API_PORT=8080
API_KEY=your-secret-key-here

# Database (if using)
DATABASE_URL=postgresql://user:pass@localhost/guardians

# Guardian Services
BIASGUARD_URL=http://localhost:9002
TRUSTGUARD_URL=http://localhost:9003
CONTEXTGUARD_URL=http://localhost:9001
```

---

## 💰 Pricing & Licensing

### Included in This Package:
- **Pro License**: Full source code access
- **API Access**: Unlimited API calls
- **Email Support**: 30 days included
- **Updates**: Lifetime updates

### Upgrade Options:
- **Enterprise License**: Custom features, SLA, priority support
- **Cloud Hosting**: Managed hosting available
- **Custom Development**: Available upon request

---

## 🆘 Support

- **Email**: jimmy@bravetto.com
- **Response Time**: <24 hours
- **Documentation**: See `api-documentation/`
- **GitHub Issues**: https://github.com/bravetto/AIGuards-Backend/issues

---

## 📄 License

See `LICENSE` file for full license terms.

---

## 🙏 Thank You!

Thank you for purchasing AI Guardians Suite. We're here to help you build safer AI systems.

**Questions?** Email jimmy@bravetto.com

---

**Made with ❤️ by Bravetto**

