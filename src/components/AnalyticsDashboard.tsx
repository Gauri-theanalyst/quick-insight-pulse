import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  MessageSquare,
  Download,
  Share2,
  Clock,
  Target,
  Star,
  BarChart,
  PieChart
} from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { surveyStorage, type Survey } from '@/lib/survey-storage';

const mockSurveys = [
  {
    id: '1',
    title: 'Customer Satisfaction Q4 2024',
    responses: 247,
    status: 'active',
    completion: 78,
    created: '2 days ago',
    avgRating: 4.2
  },
  {
    id: '2',
    title: 'Product Feature Feedback',
    responses: 89,
    status: 'active',
    completion: 65,
    created: '1 week ago',
    avgRating: 3.8
  },
  {
    id: '3',
    title: 'Event Experience Survey',
    responses: 156,
    status: 'completed',
    completion: 92,
    created: '2 weeks ago',
    avgRating: 4.5
  }
];

const insights = [
  {
    metric: 'Response Rate',
    value: '34.2%',
    change: '+12%',
    trend: 'up',
    description: 'Higher than industry average'
  },
  {
    metric: 'Completion Rate',
    value: '78.5%',
    change: '+5.3%',
    trend: 'up',
    description: 'Excellent engagement'
  },
  {
    metric: 'Avg. Response Time',
    value: '2.3 min',
    change: '-0.4 min',
    trend: 'up',
    description: 'Faster completion times'
  },
  {
    metric: 'Customer Satisfaction',
    value: '4.2/5',
    change: '+0.3',
    trend: 'up',
    description: 'Positive feedback trend'
  }
];

export default function AnalyticsDashboard() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [selectedSurvey, setSelectedSurvey] = useState<string | null>(null);

  useEffect(() => {
    const allSurveys = surveyStorage.getAllSurveys();
    setSurveys(allSurveys);
    if (allSurveys.length > 0 && !selectedSurvey) {
      setSelectedSurvey(allSurveys[0].id);
    }
  }, [selectedSurvey]);

  const currentSurvey = surveys.find(s => s.id === selectedSurvey);
  const analytics = currentSurvey ? surveyStorage.getSurveyAnalytics(currentSurvey.id) : null;

  const handleExportCSV = () => {
    if (selectedSurvey) {
      const csvContent = surveyStorage.exportToCSV(selectedSurvey);
      if (csvContent) {
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${currentSurvey?.title.replace(/\s+/g, '-')}-responses.csv`;
        link.click();
      }
    }
  };

  // Prepare chart data
  const responseTrendData = analytics ? 
    Array.from({ length: 7 }, (_, i) => ({
      day: `Day ${i + 1}`,
      responses: Math.floor(Math.random() * 20) + 5
    })) : [];

  const questionChartData = analytics?.questionAnalytics.map(qa => ({
    name: qa.questionTitle,
    responses: qa.responses,
    averageRating: qa.averageRating
  })) || [];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card-elevated">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Real-time insights from your surveys with AI-powered analysis
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select 
                value={selectedSurvey || ''} 
                onChange={(e) => setSelectedSurvey(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background"
              >
                {surveys.map(survey => (
                  <option key={survey.id} value={survey.id}>
                    {survey.title}
                  </option>
                ))}
              </select>
              <Button variant="outline" onClick={handleExportCSV}>
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="gradient">
                <Share2 className="w-4 h-4 mr-2" />
                Share Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="metric-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-muted-foreground text-sm">Total Responses</p>
                <p className="text-2xl font-bold mt-1">{analytics?.totalResponses || 0}</p>
              </div>
              <div className="flex items-center text-sm text-success">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12%
              </div>
            </div>
            <p className="text-muted-foreground text-sm">All time responses</p>
          </Card>

          <Card className="metric-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-muted-foreground text-sm">Completion Rate</p>
                <p className="text-2xl font-bold mt-1">{analytics?.completionRate.toFixed(1) || 0}%</p>
              </div>
              <div className="flex items-center text-sm text-success">
                <TrendingUp className="w-4 h-4 mr-1" />
                +5.3%
              </div>
            </div>
            <p className="text-muted-foreground text-sm">Excellent engagement</p>
          </Card>

          <Card className="metric-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-muted-foreground text-sm">Avg. Response Time</p>
                <p className="text-2xl font-bold mt-1">2.3 min</p>
              </div>
              <div className="flex items-center text-sm text-success">
                <TrendingUp className="w-4 h-4 mr-1" />
                -0.4 min
              </div>
            </div>
            <p className="text-muted-foreground text-sm">Faster completion times</p>
          </Card>

          <Card className="metric-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-muted-foreground text-sm">NPS Score</p>
                <p className="text-2xl font-bold mt-1">
                  {analytics?.questionAnalytics.find(qa => qa.questionType === 'nps')?.npsScore.toFixed(1) || 'N/A'}
                </p>
              </div>
              <div className="flex items-center text-sm text-success">
                <TrendingUp className="w-4 h-4 mr-1" />
                +0.3
              </div>
            </div>
            <p className="text-muted-foreground text-sm">Net Promoter Score</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Response Trends Chart */}
            <Card className="chart-container">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Response Trends</h3>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">7D</Button>
                  <Button variant="ghost" size="sm">30D</Button>
                  <Button variant="default" size="sm">90D</Button>
                </div>
              </div>
              
              {/* Real Chart */}
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={responseTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="responses" fill="#3b82f6" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-muted-foreground text-sm">
                  Daily responses over the last 12 days
                </p>
              </div>
            </Card>

            {/* AI Insights */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-semibold">AI-Powered Insights</h3>
                <Badge variant="secondary">New</Badge>
              </div>

              <div className="space-y-4">
                <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium text-success">Response Rate Improvement</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your surveys are performing 34% better than similar surveys. The mobile-optimized design is driving higher engagement.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-primary">Sentiment Analysis</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        85% positive sentiment detected in text responses. Customers particularly appreciate your customer service quality.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-warning mt-0.5" />
                    <div>
                      <p className="font-medium text-warning">Optimization Opportunity</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Consider reducing Question 3 options from 6 to 4. This could improve completion rates by ~8%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Question Analytics */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Question Analytics</h3>
              <div className="space-y-4">
                {analytics?.questionAnalytics.map((qa, index) => (
                  <div key={qa.questionId} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{qa.questionTitle}</h4>
                      <Badge variant="secondary">{qa.questionType}</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Responses</span>
                        <span className="font-medium">{qa.responses}</span>
                      </div>
                      
                      {qa.questionType === 'rating' && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Avg Rating</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current text-warning" />
                            <span className="font-medium">{qa.averageRating.toFixed(1)}</span>
                          </div>
                        </div>
                      )}

                      {qa.questionType === 'nps' && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">NPS Score</span>
                          <span className="font-medium">{qa.npsScore.toFixed(1)}</span>
                        </div>
                      )}
                      
                      {qa.questionType === 'multiple-choice' && Object.keys(qa.answers).length > 0 && (
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground">Top Answers</span>
                          {Object.entries(qa.answers)
                            .sort(([,a], [,b]) => b - a)
                            .slice(0, 3)
                            .map(([answer, count]) => (
                              <div key={answer} className="flex items-center justify-between text-xs">
                                <span className="truncate">{answer}</span>
                                <span className="font-medium">{count}</span>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Create New Survey
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Export All Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Results
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}