"use client"

import { useState, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Network, Play, Pause, RotateCcw, Code, FileText } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Position,
} from "reactflow"
import "reactflow/dist/style.css"

interface AgentLog {
  agent: string
  action: string
  timestamp: Date
  status: "processing" | "completed" | "waiting"
}

const initialNodes: Node[] = [
  {
    id: "input",
    type: "input",
    data: { label: "📄 Document Input" },
    position: { x: 250, y: 0 },
    style: { background: "#3b82f6", color: "white", border: "2px solid #2563eb", borderRadius: "8px", padding: "10px" }
  },
  {
    id: "processor",
    data: { label: "🔍 Document Processor Agent" },
    position: { x: 250, y: 100 },
    style: { background: "#8b5cf6", color: "white", border: "2px solid #7c3aed", borderRadius: "8px", padding: "10px" }
  },
  {
    id: "analyzer",
    data: { label: "🧠 Analyzer Agent" },
    position: { x: 100, y: 220 },
    style: { background: "#ec4899", color: "white", border: "2px solid #db2777", borderRadius: "8px", padding: "10px" }
  },
  {
    id: "summarizer",
    data: { label: "📝 Summarizer Agent" },
    position: { x: 400, y: 220 },
    style: { background: "#f59e0b", color: "white", border: "2px solid #d97706", borderRadius: "8px", padding: "10px" }
  },
  {
    id: "quality",
    data: { label: "✅ Quality Checker Agent" },
    position: { x: 250, y: 340 },
    style: { background: "#10b981", color: "white", border: "2px solid #059669", borderRadius: "8px", padding: "10px" }
  },
  {
    id: "output",
    type: "output",
    data: { label: "📊 Final Output" },
    position: { x: 250, y: 460 },
    style: { background: "#06b6d4", color: "white", border: "2px solid #0891b2", borderRadius: "8px", padding: "10px" }
  },
]

const initialEdges: Edge[] = [
  { id: "e1", source: "input", target: "processor", animated: false, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e2", source: "processor", target: "analyzer", animated: false, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e3", source: "processor", target: "summarizer", animated: false, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e4", source: "analyzer", target: "quality", animated: false, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e5", source: "summarizer", target: "quality", animated: false, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e6", source: "quality", target: "output", animated: false, markerEnd: { type: MarkerType.ArrowClosed } },
]

const agentDetails = {
  input: {
    name: "Document Input",
    description: "Receives and validates incoming documents",
    code: `async function processInput(document) {
  const validated = await validateDocument(document)
  return { status: "ready", data: validated }
}`
  },
  processor: {
    name: "Document Processor Agent",
    description: "Extracts text, metadata, and structure from documents",
    code: `async function processDocument(doc) {
  const text = await extractText(doc)
  const metadata = await extractMetadata(doc)
  const structure = await analyzeStructure(doc)
  return { text, metadata, structure }
}`
  },
  analyzer: {
    name: "Analyzer Agent",
    description: "Performs semantic analysis and entity extraction",
    code: `async function analyzeContent(content) {
  const entities = await extractEntities(content)
  const sentiment = await analyzeSentiment(content)
  const topics = await extractTopics(content)
  return { entities, sentiment, topics }
}`
  },
  summarizer: {
    name: "Summarizer Agent",
    description: "Generates concise summaries using LLM",
    code: `async function summarizeDocument(content) {
  const summary = await llm.complete({
    prompt: \`Summarize: \${content}\`,
    max_tokens: 200
  })
  return { summary, word_count: summary.split(' ').length }
}`
  },
  quality: {
    name: "Quality Checker Agent",
    description: "Validates output quality and completeness",
    code: `async function checkQuality(analysis, summary) {
  const completeness = checkCompleteness(analysis, summary)
  const accuracy = validateAccuracy(analysis)
  const score = calculateQualityScore(completeness, accuracy)
  return { score, passed: score > 0.8 }
}`
  },
  output: {
    name: "Final Output",
    description: "Aggregates results and formats final response",
    code: `async function generateOutput(data) {
  return {
    summary: data.summary,
    analysis: data.analysis,
    metadata: data.metadata,
    quality_score: data.quality_score
  }
}`
  }
}

export default function AIArchitecturePage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [logs, setLogs] = useState<AgentLog[]>([])
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Ensure component is mounted on client
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const simulationSteps = [
    { nodeId: "input", action: "Receiving document input...", duration: 1000 },
    { nodeId: "processor", action: "Processing document structure...", duration: 1500 },
    { nodeId: "analyzer", action: "Analyzing content semantics...", duration: 2000 },
    { nodeId: "summarizer", action: "Generating summary...", duration: 2000 },
    { nodeId: "quality", action: "Validating output quality...", duration: 1500 },
    { nodeId: "output", action: "Finalizing results...", duration: 1000 },
  ]

  // Update node classes when activeNodeId changes
  useEffect(() => {
    if (typeof window === 'undefined') return // Only run on client
    
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        className: node.id === activeNodeId ? 'active-node' : ''
      }))
    )
  }, [activeNodeId, setNodes])

  const runSimulation = async () => {
    setIsRunning(true)
    setLogs([])
    setCurrentStep(0)
    setActiveNodeId(null)

    for (let i = 0; i < simulationSteps.length; i++) {
      const step = simulationSteps[i]
      setCurrentStep(i)
      setActiveNodeId(step.nodeId)

      // Add log entry
      setLogs(prev => [...prev, {
        agent: agentDetails[step.nodeId as keyof typeof agentDetails].name,
        action: step.action,
        timestamp: new Date(),
        status: "processing"
      }])

      // Animate edge - find edge that leads TO this node
      setEdges(prevEdges => prevEdges.map(edge => ({
        ...edge,
        animated: edge.target === step.nodeId
      })))

      await new Promise(resolve => setTimeout(resolve, step.duration))

      // Mark as completed
      setLogs(prev => prev.map((log, idx) => 
        idx === i ? { ...log, status: "completed" as const } : log
      ))
    }

    // Reset animations
    setActiveNodeId(null)
    setEdges(prevEdges => prevEdges.map(edge => ({ ...edge, animated: false })))

    setIsRunning(false)
  }

  const resetSimulation = () => {
    setCurrentStep(0)
    setLogs([])
    setActiveNodeId(null)
    setEdges(prevEdges => prevEdges.map(edge => ({ ...edge, animated: false })))
  }

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id)
  }, [])

  const selectedAgentDetails = selectedNode ? agentDetails[selectedNode as keyof typeof agentDetails] : null

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
            <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
              <Network className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AI Agents Architecture</h1>
              <p className="text-muted-foreground">Interactive multi-agent system visualization</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {["React Flow", "LangGraph", "Next.js", "Framer Motion"].map(tag => (
              <span key={tag} className="text-xs px-3 py-1 bg-muted rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Flow Diagram */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg overflow-hidden" style={{ height: "600px" }}>
              <div className="border-b border-border p-4 flex items-center justify-between">
                <h3 className="font-semibold">Document Analysis Pipeline</h3>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={runSimulation}
                    disabled={isRunning || !isMounted}
                    className="gap-2"
                  >
                    {isRunning ? (
                      <>
                        <Pause className="w-4 h-4" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Run Simulation
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={resetSimulation}
                    disabled={isRunning || !isMounted}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              {isMounted ? (
                <>
                  <style jsx global>{`
                    .active-node {
                      box-shadow: 0 0 20px rgba(59, 130, 246, 0.8) !important;
                      transform: scale(1.05) !important;
                    }
                    .react-flow__node {
                      transition: all 0.3s ease !important;
                    }
                  `}</style>
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodeClick={onNodeClick}
                    fitView
                    fitViewOptions={{ padding: 0.2 }}
                    attributionPosition="bottom-left"
                    defaultViewport={{ x: 0, y: 0, zoom: 1 }}
                    minZoom={0.5}
                    maxZoom={1.5}
                  >
                    <Background />
                    <Controls />
                  </ReactFlow>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-muted-foreground">Loading diagram...</div>
                </div>
              )}
            </div>

            {/* Agent Details Panel */}
            {selectedAgentDetails && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-card border border-border rounded-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">{selectedAgentDetails.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {selectedAgentDetails.description}
                </p>
                <div className="bg-muted rounded-lg p-4">
                  <div className="text-xs font-mono text-muted-foreground mb-2">Implementation:</div>
                  <pre className="text-xs font-mono overflow-x-auto">
                    <code>{selectedAgentDetails.code}</code>
                  </pre>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Execution Logs */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Execution Logs
              </h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {logs.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Click "Run Simulation" to see agent execution
                  </p>
                ) : (
                  logs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-3 rounded-lg border ${
                        log.status === "processing" 
                          ? "border-blue-500/50 bg-blue-500/10" 
                          : "border-green-500/50 bg-green-500/10"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-xs font-semibold">{log.agent}</span>
                        <span className="text-xs text-muted-foreground">
                          {log.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{log.action}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <div className={`w-2 h-2 rounded-full ${
                          log.status === "processing" ? "bg-blue-500 animate-pulse" : "bg-green-500"
                        }`} />
                        <span className="text-xs capitalize">{log.status}</span>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* System Info */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-4">System Architecture</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium mb-1">Total Agents</div>
                  <div className="text-2xl font-bold text-primary">6</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Processing Steps</div>
                  <div className="text-2xl font-bold text-secondary">
                    {currentStep + 1} / {simulationSteps.length}
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-1">Status</div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
                    isRunning 
                      ? "bg-blue-500/10 text-blue-500" 
                      : logs.length > 0 
                        ? "bg-green-500/10 text-green-500"
                        : "bg-muted text-muted-foreground"
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      isRunning ? "bg-blue-500 animate-pulse" : logs.length > 0 ? "bg-green-500" : "bg-muted-foreground"
                    }`} />
                    {isRunning ? "Running" : logs.length > 0 ? "Completed" : "Idle"}
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-1.5" />
                  Interactive flow visualization
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-1.5" />
                  Real-time execution simulation
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-1.5" />
                  Agent code inspection
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-1.5" />
                  Execution logging
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-1.5" />
                  Multi-agent orchestration
                </li>
              </ul>
            </div>

            {/* Info */}
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-6">
              <h3 className="font-semibold mb-2">How It Works</h3>
              <p className="text-sm text-muted-foreground mb-3">
                This system demonstrates a multi-agent architecture for document processing.
                Each agent has a specific responsibility and communicates through a shared pipeline.
              </p>
              <p className="text-xs text-muted-foreground">
                Click on any agent node to view its implementation details and role in the system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
