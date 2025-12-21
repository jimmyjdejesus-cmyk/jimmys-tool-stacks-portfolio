# 📚 Publishing Your Whitepapers to Zenodo

## Overview

This guide walks you through publishing your research whitepapers to **Zenodo** for:
- 🆔 **DOI assignment** - Citable academic references
- 🌐 **Open access** - No gatekeeping or endorsement required
- 🔗 **GitHub integration** - Automatic archiving of releases
- 📊 **Metrics** - Download counts and citations

---

## Step 1: Connect GitHub to Zenodo

1. Go to [zenodo.org](https://zenodo.org)
2. Click **Log in** → **Log in with GitHub**
3. Authorize Zenodo to access your GitHub account
4. Go to **Settings** → **GitHub**
5. Find `jimmys-tool-stacks-portfolio` and toggle it **ON**

---

## Step 2: Create a GitHub Release

Once connected, every GitHub release automatically creates a Zenodo archive with a DOI.

### Via GitHub UI:
1. Go to your repository on GitHub
2. Click **Releases** → **Create a new release**
3. Tag: `v1.0.0-whitepapers`
4. Title: `Research Whitepapers v1.0.0`
5. Description:
```markdown
## 📄 Research Whitepapers Collection

### Included Papers:
1. **Quantum Reservoir Computing** - Exploring QRC-QG interface
2. **Neuromorphic Evolution** - LLM-guided evolutionary algorithms  
3. **Temporal Shard RAG** - Time-aware retrieval augmented generation
4. **P=NP Consciousness** - Computational approach to Millennium Problem
5. **Wetware Computing** - Biological-digital hybrid systems
6. **Neuromorphic Code Intelligence** - Spiking networks for code analysis

### Interactive Demos:
All papers include interactive web-based demonstrations.
```
6. Click **Publish release**

### Via Command Line:
```bash
git tag -a v1.0.0-whitepapers -m "Research Whitepapers v1.0.0"
git push origin v1.0.0-whitepapers
```

Then create the release on GitHub.

---

## Step 3: Verify on Zenodo

1. Go to [zenodo.org/deposit](https://zenodo.org/deposit)
2. Find your new upload (may take a few minutes)
3. Click to view and verify metadata
4. Your **DOI** will be displayed: `10.5281/zenodo.XXXXXXX`

---

## Step 4: Add DOI Badges to Repository

Once you have your DOI, add this badge to your README:

```markdown
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.XXXXXXX.svg)](https://doi.org/10.5281/zenodo.XXXXXXX)
```

---

## Individual Paper Publishing

For publishing papers individually with separate DOIs:

### Option A: Separate Releases
Create a release for each paper:
- `v1.0.0-quantum-reservoir`
- `v1.0.0-neuromorphic-evolution`
- etc.

### Option B: Direct Zenodo Upload
1. Go to [zenodo.org/deposit/new](https://zenodo.org/deposit/new)
2. Upload PDF version of whitepaper
3. Fill in metadata manually
4. Publish

---

## Converting Markdown to PDF

### Using Pandoc (Recommended):
```bash
# Install pandoc
# Windows: choco install pandoc
# Mac: brew install pandoc

# Convert each whitepaper
pandoc documentation/whitepapers/quantum-reservoir-qg.md -o quantum-reservoir-qg.pdf --pdf-engine=xelatex
pandoc documentation/whitepapers/neuromorphic-evolution.md -o neuromorphic-evolution.pdf --pdf-engine=xelatex
```

### Using VS Code:
1. Install "Markdown PDF" extension
2. Open whitepaper `.md` file
3. Ctrl+Shift+P → "Markdown PDF: Export (pdf)"

---

## Your Whitepapers

| Paper | Status | DOI |
|-------|--------|-----|
| Quantum Reservoir Computing | Ready | Pending |
| Neuromorphic Evolution | Ready | Pending |
| Temporal Shard RAG | Ready | Pending |
| P=NP Consciousness | Ready | Pending |
| Wetware Computing | Ready | Pending |
| Neuromorphic Code Intelligence | Ready | Pending |

---

## Alternative Platforms

### ResearchGate
- Academic social network
- Upload PDFs directly
- Track citations and reads

### Academia.edu
- Similar to ResearchGate
- Free tier available

### OSF (Open Science Framework)
- DOI assignment
- Project-based organization
- Good for ongoing research

### SSRN
- Social Science Research Network
- Good for interdisciplinary work

---

## Citation Format

Once published, cite your work as:

```bibtex
@misc{dejesus2024quantum,
  author = {De Jesus, Jimmy},
  title = {Quantum Reservoir Dynamics: Exploring the Interface Between High-Dimensional Computing and Quantum Gravity},
  year = {2024},
  publisher = {Zenodo},
  doi = {10.5281/zenodo.XXXXXXX}
}
```

---

## GitHub Pages (Live Demos)

Your interactive demos will be available at:
```
https://jimmydejesus.github.io/jimmys-tool-stacks-portfolio/demos/
```

After enabling GitHub Pages:
1. Go to repository **Settings** → **Pages**
2. Source: **GitHub Actions**
3. The workflow will auto-deploy on push to main

---

## Questions?

- Zenodo Help: https://help.zenodo.org
- GitHub Pages: https://docs.github.com/pages
- DOI FAQ: https://www.doi.org/faq.html

