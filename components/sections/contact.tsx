"use client"

import { motion } from "framer-motion"
import { Mail, Linkedin, MapPin, Send, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import emailjs from '@emailjs/browser'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Replace these with your EmailJS credentials
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ''
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ''
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company || 'Not provided',
          project_type: formData.projectType,
          message: formData.message,
        },
        publicKey
      )

      setSubmitStatus('success')
      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "",
        message: ""
      })

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      console.error('EmailJS error:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your business with AI? Get in touch to discuss your project.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <p className="text-muted-foreground mb-8">
                I&apos;m available for consulting, development projects, and corporate training.
                Typical response time: <strong className="text-foreground">24 hours</strong>.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:ceferino.troya.r@gmail.com"
                className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:shadow-md transition-all group"
              >
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-sm text-muted-foreground">ceferino.troya.r@gmail.com</div>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/ceferino-troya"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:shadow-md transition-all group"
              >
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Linkedin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">LinkedIn</div>
                  <div className="text-sm text-muted-foreground">linkedin.com/in/ceferino-troya</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card">
                <div className="p-2 rounded-lg bg-primary/10">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Location</div>
                  <div className="text-sm text-muted-foreground">Panama City, Panama • Remote Worldwide</div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <h4 className="font-semibold mb-3">Services Offered</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• AI Agent Development</li>
                <li>• Technical Consulting</li>
                <li>• Corporate Training & Workshops</li>
                <li>• Ongoing Support & Maintenance</li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-lg border border-border">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                  Project Type *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select a type</option>
                  <option value="ai-development">AI Development</option>
                  <option value="consulting">Consulting</option>
                  <option value="training">Training</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full group" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-green-600 dark:text-green-400 text-center"
                >
                  ✓ Thank you! I&apos;ll get back to you within 24 hours.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 dark:text-red-400 text-center"
                >
                  ✗ Something went wrong. Please try again or email me directly.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
