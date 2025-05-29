# MSM Co-Pilot Prototype

A leadership coaching co-pilot for Merchant Success Managers (MSMs) at Shopify, focusing on the three main pillars:
- Drive Merchant Growth
- Drive Product Usage
- Enable Cross-Sell

## Deployment

### GitHub Pages Deployment
1. Push your changes to GitHub:
```bash
git add .
git commit -m "Your commit message"
git push origin your-branch-name
```

2. Deploy using one of these methods:
   
   a. **Automatic Deployment**:
   - Push to main/master branch
   - The GitHub Action will automatically deploy
   - Check deployment status in Actions tab
   
   b. **Manual Deployment**:
   - Go to GitHub repository
   - Click Actions tab
   - Select "Deploy to GitHub Pages"
   - Click "Run workflow"
   - Choose your branch
   - Click "Run workflow"

3. Access your deployed site at:
```
https://[your-github-username].github.io/msm-copilot/
```

### Branch-Specific Deployment
To deploy from a specific branch:

1. Update branch name in `.github/workflows/deploy.yml`:
```yaml
on:
  push:
    branches: [ main, master, your-branch-name ]
```

2. Push changes to your branch:
```bash
git checkout your-branch-name
git add .
git commit -m "Update deployment workflow"
git push origin your-branch-name
```

3. Enable GitHub Pages:
   - Go to repository Settings
   - Pages section
   - Source: GitHub Actions

## Live Demo
Visit the live demo at: [https://[your-github-username].github.io/msm-copilot/](https://[your-github-username].github.io/msm-copilot/)

## Quick Start

1. Clone this repository:
```bash
git clone https://github.com/[your-github-username]/msm-copilot.git
cd msm-copilot
```

2. Open `index.html` in your browser
3. No server setup required - it runs entirely in the browser!

## Features

### Filters
- MSM Name selection
- Date Range filtering
- Region filtering
- Merchant Segment filtering

### Top Section
- **Merchant Overview**: Quick view of merchant metrics (GMV, NRR, Risk Level)
- **Quick Actions**: Common tasks like generating success plans and risk assessments
- **AI Assistant**: Interactive chat interface for real-time guidance

### Skills Categories
1. **Business Skills**
   - Drive Merchant Growth strategies
   - Product usage optimization
   - Cross-sell enablement

2. **Craft Skills**
   - Account management
   - Stakeholder engagement
   - Technical proficiency

3. **Training & Updates**
   - Salesloft Coaching
     - Recent calls
     - Coaching insights
   - Seismic Updates
     - Latest content
     - Required training

### Main Pillars
1. **Drive Merchant Growth**
   - Account Planning
   - Stakeholder Management
   - Risk Mitigation
   - Contract Renewal strategies

2. **Drive Product Usage**
   - Product Adoption
   - Feature Optimization
   - Usage Analytics
   - Integration Strategy

3. **Enable Cross-Sell**
   - Shopify Payments
   - Shopify Capital
   - Retail POS
   - B2B opportunities

## Tech Stack
- HTML5
- CSS3 (with Tailwind CSS)
- Vanilla JavaScript
- No backend required

## Development

### Directory Structure
```
msm-copilot/
├── index.html
├── styles.css
├── script.js
├── README.md
└── .gitignore
```

### Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Next Steps
- Integration with real merchant data
- Enhanced AI capabilities
- Additional success metrics
- Custom recommendation engine
- Real-time data analytics
- Integration with Shopify's internal tools

## License
This project is internal to Shopify and not licensed for external use. 