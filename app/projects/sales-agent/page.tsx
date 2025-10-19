"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Bot, Calendar, MessageSquare, TrendingUp, Send, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import OpenAI from "openai"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
}

interface Analytics {
  totalMessages: number
  leadsQualified: number
  appointmentsScheduled: number
  avgResponseTime: string
}

export default function SalesAgentPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI Sales Assistant. I can help you learn about our technical services, answer questions, and schedule a consultation. How can I assist you today?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [analytics, setAnalytics] = useState<Analytics>({
    totalMessages: 1,
    leadsQualified: 0,
    appointmentsScheduled: 0,
    avgResponseTime: "1.2s"
  })

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Check if OpenAI API key is available
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY
      
      if (!apiKey) {
        // Fallback to simulated response if no API key
        setTimeout(() => {
          const simulatedResponse: Message = {
            role: "assistant",
            content: getSimulatedResponse(input),
            timestamp: new Date()
          }
          setMessages(prev => [...prev, simulatedResponse])
          updateAnalytics(input)
          setIsLoading(false)
        }, 1000)
        return
      }

      // Real OpenAI API call
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Note: In production, use a backend API route
      })

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a professional sales assistant for a technical services company. Your role is to:
1. Qualify leads by understanding their needs
2. Provide information about our services (AI Development, Consulting, Training)
3. Schedule appointments when requested
4. Handle objections professionally
5. Be concise, friendly, and helpful

Services:
- AI Agent Development
- Technical Consulting
- Corporate Training & Workshops
- Ongoing Support & Maintenance

Always be professional, ask qualifying questions, and guide the conversation toward scheduling a consultation.`
          },
          ...messages.map(m => ({ role: m.role, content: m.content })),
          { role: "user", content: input }
        ],
        temperature: 0.7,
        max_tokens: 200
      })

      const assistantMessage: Message = {
        role: "assistant",
        content: response.choices[0].message.content || "I apologize, I couldn't process that. Could you rephrase?",
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
      updateAnalytics(input)
    } catch (error) {
      console.error("Error calling OpenAI:", error)
      const errorMessage: Message = {
        role: "assistant",
        content: "I apologize, but I'm having trouble connecting right now. Please try again or contact us directly at ceferino.troya.r@gmail.com",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const getSimulatedResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase()
    
    if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("pricing")) {
      return "Thank you for your interest! Pricing varies based on project scope and requirements. I'd be happy to discuss your specific needs and provide a customized quote. Would you like to schedule a consultation to discuss your project in detail?"
    }
    
    if (lowerInput.includes("schedule") || lowerInput.includes("appointment") || lowerInput.includes("meeting")) {
      return "I'd be happy to help schedule a consultation! Could you provide:\n1. Your preferred date/time\n2. Your email address\n3. Brief description of your project\n\nOur team typically responds within 24 hours."
    }
    
    if (lowerInput.includes("ai") || lowerInput.includes("chatbot") || lowerInput.includes("automation")) {
      return "We specialize in AI solutions! Our services include:\n\n• Conversational AI chatbots\n• Process automation\n• Machine learning models\n• Enterprise AI integration\n\nWould you like to discuss a specific use case?"
    }
    
    if (lowerInput.includes("training") || lowerInput.includes("workshop")) {
      return "Our corporate training programs are highly rated! We offer:\n\n• AI for Business workshops\n• Python & LangChain training\n• Automation strategies\n• Custom curriculum\n\nWe've trained 300+ professionals. Would you like to schedule a training session?"
    }
    
    return "Thank you for your interest! I can help you with:\n\n• Information about our AI services\n• Pricing details\n• Scheduling a consultation\n• Answering technical questions\n\nWhat would you like to know more about?"
  }

  const updateAnalytics = (userInput: string) => {
    setAnalytics(prev => {
      const newAnalytics = { ...prev, totalMessages: prev.totalMessages + 2 }
      
      const lowerInput = userInput.toLowerCase()
      if (lowerInput.includes("schedule") || lowerInput.includes("appointment")) {
        newAnalytics.appointmentsScheduled += 1
      }
      if (lowerInput.includes("price") || lowerInput.includes("interested") || lowerInput.includes("need")) {
        newAnalytics.leadsQualified += 1
      }
      
      return newAnalytics
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/#projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AI Sales Agent</h1>
              <p className="text-muted-foreground">Intelligent conversational agent with lead qualification</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {["OpenAI GPT-3.5", "LangChain", "React", "TypeScript"].map(tag => (
              <span key={tag} className="text-xs px-3 py-1 bg-muted rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chat Area */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg overflow-hidden flex flex-col h-[600px]">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-4">
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    disabled={isLoading}
                  />
                  <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {process.env.NEXT_PUBLIC_OPENAI_API_KEY 
                    ? "Powered by OpenAI GPT-3.5" 
                    : "Demo mode - Add OPENAI_API_KEY for live AI responses"}
                </p>
              </div>
            </div>
          </div>

          {/* Analytics Sidebar */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Real-time Analytics
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Total Messages</span>
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold">{analytics.totalMessages}</div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Leads Qualified</span>
                    <Bot className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold text-primary">{analytics.leadsQualified}</div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Appointments</span>
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold text-secondary">{analytics.appointmentsScheduled}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Avg Response Time</div>
                  <div className="text-2xl font-bold">{analytics.avgResponseTime}</div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-1.5" />
                  Natural language understanding
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-1.5" />
                  Lead qualification
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-1.5" />
                  Appointment scheduling
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-1.5" />
                  Real-time analytics
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-1.5" />
                  Context-aware responses
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Try it out!</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Ask about pricing, services, or schedule a consultation to see the AI in action.
              </p>
              <div className="space-y-2 text-xs">
                <p className="font-medium">Example prompts:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• &quot;What are your AI services?&quot;</li>
                  <li>• &quot;How much does consulting cost?&quot;</li>
                  <li>• &quot;I&apos;d like to schedule a meeting&quot;</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
