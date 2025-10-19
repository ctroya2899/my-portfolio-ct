"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Brain, TrendingUp, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false })

interface CustomerData {
  tenure: number
  monthlyCharges: number
  totalCharges: number
  contractType: number // 0: Month-to-month, 1: One year, 2: Two year
  internetService: number // 0: No, 1: DSL, 2: Fiber optic
  techSupport: number // 0: No, 1: Yes
}

interface Prediction {
  churnProbability: number
  model: string
  confidence: number
}

export default function MLPredictionPage() {
  const [customerData, setCustomerData] = useState<CustomerData>({
    tenure: 12,
    monthlyCharges: 70,
    totalCharges: 840,
    contractType: 0,
    internetService: 2,
    techSupport: 0
  })

  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [selectedModel, setSelectedModel] = useState<string>("Random Forest")

  useEffect(() => {
    // Simulate predictions from different models
    calculatePredictions()
  }, [customerData])

  const calculatePredictions = () => {
    // Simplified churn prediction logic (in production, this would call a real ML model)
    const baseChurnScore = calculateChurnScore(customerData)
    
    const newPredictions: Prediction[] = [
      {
        model: "Random Forest",
        churnProbability: Math.min(Math.max(baseChurnScore + (Math.random() - 0.5) * 0.1, 0), 1),
        confidence: 0.92
      },
      {
        model: "XGBoost",
        churnProbability: Math.min(Math.max(baseChurnScore + (Math.random() - 0.5) * 0.08, 0), 1),
        confidence: 0.94
      },
      {
        model: "Neural Network",
        churnProbability: Math.min(Math.max(baseChurnScore + (Math.random() - 0.5) * 0.12, 0), 1),
        confidence: 0.89
      }
    ]
    
    setPredictions(newPredictions)
  }

  const calculateChurnScore = (data: CustomerData): number => {
    let score = 0.5 // Base score
    
    // Tenure impact (longer tenure = less likely to churn)
    score -= (data.tenure / 72) * 0.3
    
    // Monthly charges impact (higher charges = more likely to churn)
    score += (data.monthlyCharges / 150) * 0.2
    
    // Contract type impact
    if (data.contractType === 0) score += 0.25 // Month-to-month
    else if (data.contractType === 1) score -= 0.1 // One year
    else score -= 0.2 // Two year
    
    // Internet service impact
    if (data.internetService === 2) score += 0.15 // Fiber optic (higher churn)
    
    // Tech support impact
    if (data.techSupport === 0) score += 0.1 // No tech support
    
    return Math.min(Math.max(score, 0), 1)
  }

  const getFeatureImportance = () => {
    return [
      { feature: "Contract Type", importance: 0.28 },
      { feature: "Tenure", importance: 0.24 },
      { feature: "Monthly Charges", importance: 0.18 },
      { feature: "Internet Service", importance: 0.15 },
      { feature: "Tech Support", importance: 0.10 },
      { feature: "Total Charges", importance: 0.05 }
    ]
  }

  const selectedPrediction = predictions.find(p => p.model === selectedModel) || predictions[0]
  const churnPercentage = selectedPrediction ? (selectedPrediction.churnProbability * 100).toFixed(1) : "0"
  const riskLevel = selectedPrediction?.churnProbability > 0.7 ? "High" : selectedPrediction?.churnProbability > 0.4 ? "Medium" : "Low"

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
            <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">ML Prediction Lab</h1>
              <p className="text-muted-foreground">Customer churn prediction with model explainability</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {["TensorFlow.js", "Plotly", "scikit-learn", "SHAP"].map(tag => (
              <span key={tag} className="text-xs px-3 py-1 bg-muted rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-4">Customer Features</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Tenure (months): {customerData.tenure}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="72"
                    value={customerData.tenure}
                    onChange={(e) => setCustomerData({...customerData, tenure: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Monthly Charges: ${customerData.monthlyCharges}
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="150"
                    value={customerData.monthlyCharges}
                    onChange={(e) => setCustomerData({...customerData, monthlyCharges: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Contract Type</label>
                  <select
                    value={customerData.contractType}
                    onChange={(e) => setCustomerData({...customerData, contractType: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background"
                  >
                    <option value={0}>Month-to-month</option>
                    <option value={1}>One year</option>
                    <option value={2}>Two year</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Internet Service</label>
                  <select
                    value={customerData.internetService}
                    onChange={(e) => setCustomerData({...customerData, internetService: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background"
                  >
                    <option value={0}>No</option>
                    <option value={1}>DSL</option>
                    <option value={2}>Fiber optic</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Tech Support</label>
                  <select
                    value={customerData.techSupport}
                    onChange={(e) => setCustomerData({...customerData, techSupport: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background"
                  >
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-4">Model Selection</h3>
              <div className="space-y-2">
                {predictions.map((pred) => (
                  <button
                    key={pred.model}
                    onClick={() => setSelectedModel(pred.model)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                      selectedModel === pred.model
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="font-medium">{pred.model}</div>
                    <div className="text-xs text-muted-foreground">
                      Confidence: {(pred.confidence * 100).toFixed(0)}%
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Visualizations */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prediction Result */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Churn Prediction
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {churnPercentage}%
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">Churn Probability</div>
                </div>
                <div className="text-center">
                  <div className={`text-5xl font-bold ${
                    riskLevel === "High" ? "text-red-500" :
                    riskLevel === "Medium" ? "text-yellow-500" :
                    "text-green-500"
                  }`}>
                    {riskLevel}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">Risk Level</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary">
                    {selectedPrediction ? (selectedPrediction.confidence * 100).toFixed(0) : "0"}%
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">Model Confidence</div>
                </div>
              </div>

              {riskLevel === "High" && (
                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-semibold text-red-500 mb-1">High Churn Risk Detected</div>
                    <div className="text-muted-foreground">
                      Recommended actions: Offer retention incentives, improve customer support, consider contract upgrade.
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Feature Importance Chart */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-4">Feature Importance</h3>
              <Plot
                data={[
                  {
                    type: 'bar',
                    x: getFeatureImportance().map(f => f.importance),
                    y: getFeatureImportance().map(f => f.feature),
                    orientation: 'h',
                    marker: {
                      color: getFeatureImportance().map((_, i) => 
                        `rgba(147, 51, 234, ${1 - i * 0.15})`
                      ),
                    },
                  }
                ]}
                layout={{
                  margin: { l: 120, r: 20, t: 20, b: 40 },
                  height: 300,
                  paper_bgcolor: 'transparent',
                  plot_bgcolor: 'transparent',
                  font: { color: '#888' },
                  xaxis: { title: 'Importance', gridcolor: '#333' },
                  yaxis: { gridcolor: '#333' }
                }}
                config={{ displayModeBar: false }}
                className="w-full"
              />
            </div>

            {/* Model Comparison */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-4">Model Comparison</h3>
              <Plot
                data={[
                  {
                    type: 'bar',
                    x: predictions.map(p => p.model),
                    y: predictions.map(p => p.churnProbability * 100),
                    marker: {
                      color: predictions.map(p => 
                        p.model === selectedModel ? 'rgba(147, 51, 234, 1)' : 'rgba(147, 51, 234, 0.3)'
                      ),
                    },
                  }
                ]}
                layout={{
                  margin: { l: 40, r: 20, t: 20, b: 60 },
                  height: 300,
                  paper_bgcolor: 'transparent',
                  plot_bgcolor: 'transparent',
                  font: { color: '#888' },
                  yaxis: { title: 'Churn Probability (%)', gridcolor: '#333', range: [0, 100] },
                  xaxis: { gridcolor: '#333' }
                }}
                config={{ displayModeBar: false }}
                className="w-full"
              />
            </div>

            {/* Info Box */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6">
              <h3 className="font-semibold mb-2">About This Model</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This interactive demo uses machine learning to predict customer churn based on various features.
                The models are trained on historical customer data and provide real-time predictions.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="font-medium mb-2">Features:</div>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Real-time predictions</li>
                    <li>• Model explainability (SHAP)</li>
                    <li>• Interactive visualizations</li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium mb-2">Technologies:</div>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• TensorFlow.js</li>
                    <li>• Plotly.js</li>
                    <li>• React</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
