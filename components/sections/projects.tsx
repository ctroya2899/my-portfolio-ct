"use client"

import { motion } from "framer-motion"
import { Bot, Brain, Network, ArrowRight } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    id: "sales-agent",
    title: "AI Sales Agent",
    description: "Intelligent conversational agent that qualifies leads, schedules appointments, and handles customer inquiries with natural language understanding.",
    icon: Bot,
    gradient: "from-blue-500 to-cyan-500",
    tags: ["OpenAI", "LangChain", "React", "TypeScript"],
    features: [
      "Multi-agent architecture",
      "Real-time analytics dashboard",
      "Appointment scheduling",
      "Lead qualification"
    ],
    href: "/projects/sales-agent"
  },
  {
    id: "ml-prediction",
    title: "ML Prediction Lab",
    description: "Interactive machine learning platform for customer churn prediction with real-time model comparison and explainability features.",
    icon: Brain,
    gradient: "from-purple-500 to-pink-500",
    tags: ["TensorFlow.js", "Plotly", "scikit-learn", "SHAP"],
    features: [
      "3 model comparison",
      "SHAP explainability",
      "Interactive visualizations",
      "Real-time predictions"
    ],
    href: "/projects/ml-prediction"
  },
  {
    id: "ai-architecture",
    title: "AI Agents Architecture",
    description: "Visual playground demonstrating multi-agent system design with interactive flow diagrams and real-time execution simulation.",
    icon: Network,
    gradient: "from-orange-500 to-red-500",
    tags: ["React Flow", "LangGraph", "Next.js", "Framer Motion"],
    features: [
      "Interactive diagrams",
      "Agent orchestration",
      "Live execution logs",
      "System architecture"
    ],
    href: "/projects/ai-architecture"
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Technical Showcase
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interactive demonstrations of AI solutions and machine learning applications
          </p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => {
            const Icon = project.icon
            return (
              <motion.div
                key={project.id}
                variants={item}
                className="group relative"
              >
                <Link href={project.href}>
                  <div className="relative h-full bg-card border border-border rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {/* Icon with gradient */}
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${project.gradient} mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm mb-4">
                      {project.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-1 mb-4">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-center">
                          <span className="w-1 h-1 bg-primary rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      View Demo
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 rounded-lg transition-opacity pointer-events-none`} />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* View all projects CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Each project includes live demos, source code, and detailed technical documentation
          </p>
        </motion.div>
      </div>
    </section>
  )
}
