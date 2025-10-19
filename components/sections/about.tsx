"use client"

import { motion } from "framer-motion"
import { Award, Briefcase, GraduationCap, Users } from "lucide-react"

const expertise = [
  { icon: Briefcase, title: "Conversational AI & Chatbots", description: "Building intelligent agents with LangChain and OpenAI" },
  { icon: Users, title: "Process Automation", description: "Enterprise workflow optimization and intelligent automation" },
  { icon: GraduationCap, title: "Machine Learning", description: "Predictive models and data-driven solutions" },
  { icon: Award, title: "Corporate Training", description: "Trained 300+ professionals in AI applications" },
]

const certifications = [
  "Samsung Innovation Campus - Python AI",
  "Smart Data - AWS Data Engineering",
  "IBM - Machine Learning",
  "Cisco - CCNA",
]

export function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI Solutions Architect with a proven track record of delivering production-ready solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-muted-foreground">
                I'm a <strong className="text-foreground">Python AI Developer and Data Scientist</strong> specializing in conversational 
                AI agents and intelligent automation. With a proven track record of delivering 
                production-ready AI solutions that generate measurable business impact, I help 
                organizations leverage artificial intelligence to streamline operations and 
                enhance customer experiences.
              </p>
              <p className="text-muted-foreground">
                Currently serving as <strong className="text-foreground">Chief Technology Innovation Officer at OMC Group</strong>, I've 
                led the adoption of AI technologies across the organization, impacting 100+ 
                team members and automating critical business processes. My work has resulted 
                in a 97% reduction in document processing time and the generation of 700+ 
                automated compliance reports weekly.
              </p>
              <p className="text-muted-foreground">
                Beyond development, I'm passionate about education and knowledge sharing. I've 
                trained over 300 professionals across various organizations, including 
                government institutions, on practical AI applications and implementation 
                strategies.
              </p>
            </div>

            {/* Certifications */}
            <div className="pt-6">
              <h3 className="text-xl font-bold mb-4">Certifications</h3>
              <ul className="space-y-2">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-start">
                    <Award className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right column - Expertise */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold mb-6">Areas of Expertise</h3>
            <div className="grid gap-6">
              {expertise.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-4 p-4 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Professional Journey */}
            <div className="pt-6">
              <h3 className="text-xl font-bold mb-4">Professional Journey</h3>
              <div className="space-y-4">
                <div className="border-l-2 border-primary pl-4">
                  <div className="font-semibold">Chief Technology Innovation Officer</div>
                  <div className="text-sm text-muted-foreground">OMC Group - Present</div>
                </div>
                <div className="border-l-2 border-muted pl-4">
                  <div className="font-semibold">AI Solutions Developer</div>
                  <div className="text-sm text-muted-foreground">Prosit Health</div>
                </div>
                <div className="border-l-2 border-muted pl-4">
                  <div className="font-semibold">Founder</div>
                  <div className="text-sm text-muted-foreground">Kaizen</div>
                </div>
                <div className="border-l-2 border-muted pl-4">
                  <div className="font-semibold">Data Analyst</div>
                  <div className="text-sm text-muted-foreground">Banistmo</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
