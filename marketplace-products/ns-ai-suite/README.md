# 🤖 NS-AI-Suite - Specialized AI Agents

**Version**: 1.0.0  
**Last Updated**: December 19, 2025  
**Support**: jimmy@bravetto.com

---

## 🎯 What is NS-AI-Suite?

NS-AI-Suite is a collection of specialized AI agents for enterprise automation, including helpdesk, frontdesk, compliance, data ingestion, and more.

---

## ✨ Modules Included

### 1. **Guardian Core** (Core Library)
- Foundation library for all agents
- Common utilities and helpers
- Agent orchestration framework

### 2. **Data Ingestion Agent**
- Automated data collection
- Multi-format support (CSV, JSON, XML, etc.)
- Data validation and cleaning

### 3. **Frontdesk AI**
- Reception automation
- Visitor management
- Appointment scheduling
- Customer service

### 4. **Helpdesk AI**
- Ticket management
- Automated responses
- Escalation handling
- Knowledge base integration

### 5. **Compliance Automation AI**
- Regulatory compliance checking
- Document validation
- Audit trail generation
- Risk assessment

---

## 📦 What's Included

```
ns-ai-suite/
├── guardian-core/            # Core library
├── data-ingestion/           # Data ingestion agent
├── frontdesk-ai/             # Frontdesk agent
├── helpdesk-ai/              # Helpdesk agent
├── compliance-automation-ai/  # Compliance agent
├── api-gateway/              # Unified API
├── examples/                 # Integration examples
└── documentation/            # Complete docs
```

---

## 🚀 Quick Start

### Option 1: Individual Modules

```python
# Install a module
pip install ns-ai-suite-frontdesk

# Use it
from ns_ai_suite.frontdesk import FrontdeskAgent

agent = FrontdeskAgent()
response = agent.handle_visitor("Hello, I have an appointment")
```

### Option 2: Full Suite

```python
# Install full suite
pip install ns-ai-suite

# Use unified API
from ns_ai_suite import NS_AISuite

suite = NS_AISuite()
suite.initialize_all_agents()
```

### Option 3: Docker

```bash
# Start all services
docker-compose up -d

# Use API
curl http://localhost:8080/api/v1/frontdesk/visitor \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
```

---

## 📚 Documentation

- **API Documentation**: See `documentation/API.md`
- **Module Guides**: See `documentation/MODULES.md`
- **Integration Examples**: See `examples/` folder
- **Deployment Guide**: See `documentation/DEPLOYMENT.md`

---

## 🔧 Configuration

### Environment Variables

```bash
# API Configuration
API_PORT=8080
API_KEY=your-secret-key

# Agent Configuration
FRONTDESK_ENABLED=true
HELPDESK_ENABLED=true
COMPLIANCE_ENABLED=true

# Database
DATABASE_URL=postgresql://user:pass@localhost/ns_ai_suite
```

---

## 💰 Pricing & Licensing

### Included in This Package:
- **Full Suite License**: All 5 modules
- **Source Code**: Complete source code
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
- **Documentation**: See `documentation/` folder
- **GitHub Issues**: https://github.com/NS-AI-Suite/guardian-core/issues

---

## 📄 License

See `LICENSE` file for full license terms.

---

## 🙏 Thank You!

Thank you for purchasing NS-AI-Suite. Automate your enterprise with AI.

**Questions?** Email jimmy@bravetto.com

---

**Made with ❤️ by Bravetto**

