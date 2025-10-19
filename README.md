# Ceferino Troya - AI Solutions Portfolio

A modern, interactive portfolio showcasing AI and machine learning expertise through live demonstrations and technical projects.

## 🚀 Features

### Interactive Technical Demos

1. **AI Sales Agent** - Conversational AI chatbot with lead qualification
   - OpenAI GPT-3.5 integration
   - Real-time analytics dashboard
   - Appointment scheduling simulation

2. **ML Prediction Lab** - Customer churn prediction with explainability
   - Interactive feature adjustment
   - Model comparison (Random Forest, XGBoost, Neural Network)
   - SHAP-inspired feature importance visualization
   - Real-time Plotly charts

3. **AI Agents Architecture** - Multi-agent system visualization
   - Interactive flow diagrams with React Flow
   - Live execution simulation
   - Agent code inspection
   - Real-time logging

### Additional Features
- Responsive design (mobile-first)
- Dark mode support
- Smooth animations with Framer Motion
- SEO optimized
- Professional UI with Tailwind CSS

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI, shadcn/ui
- **Animations:** Framer Motion
- **Charts:** Plotly.js
- **Diagrams:** React Flow
- **AI:** OpenAI API
- **ML:** TensorFlow.js (browser-based)

## 📦 Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. (Optional) Set up OpenAI API key for the Sales Agent:
   - Copy `env.example.txt` content
   - Create `.env.local` file
   - Add your OpenAI API key:
     ```
     NEXT_PUBLIC_OPENAI_API_KEY=your_key_here
     ```

## 🚀 Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 📁 Project Structure

```
portfolio-app/
├── app/
│   ├── projects/
│   │   ├── sales-agent/      # AI Sales Agent demo
│   │   ├── ml-prediction/    # ML Prediction Lab
│   │   └── ai-architecture/  # AI Architecture Playground
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── sections/             # Home page sections
│   ├── ui/                   # Reusable UI components
│   ├── navigation.tsx
│   └── footer.tsx
└── lib/
    └── utils.ts
```

## 🎯 Key Sections

- **Home:** Hero section with stats and tech stack
- **Projects:** Grid of 3 interactive technical demos
- **About:** Professional background and expertise
- **Contact:** Contact form and information

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables (if using OpenAI)
4. Deploy!

The portfolio is optimized for Vercel with automatic deployments.

## 📝 Notes

- The **Sales Agent** works in demo mode without an API key (simulated responses)
- Add `NEXT_PUBLIC_OPENAI_API_KEY` for live AI responses
- All ML models run in the browser (no backend required)
- The architecture is designed for easy extension with more projects

## 🔧 Customization

To customize for your own portfolio:

1. Update personal information in `app/layout.tsx` (metadata)
2. Modify content in `components/sections/` files
3. Add your own projects in `app/projects/`
4. Update contact information in `components/sections/contact.tsx`
5. Replace social links in `components/footer.tsx`

## 📄 License

This project is open source and available for personal and commercial use.

---

**Built with Next.js, TypeScript & TailwindCSS**

For questions or collaboration: ceferino.troya.r@gmail.com
