import React from 'react';
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
  Star
} from 'lucide-react';

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
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
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
          {insights.map((insight, index) => (
            <Card key={index} className="metric-card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-muted-foreground text-sm">{insight.metric}</p>
                  <p className="text-2xl font-bold mt-1">{insight.value}</p>
                </div>
                <div className={`flex items-center text-sm ${
                  insight.trend === 'up' ? 'text-success' : 'text-destructive'
                }`}>
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {insight.change}
                </div>
              </div>
              <p className="text-muted-foreground text-sm">{insight.description}</p>
            </Card>
          ))}
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
              
              {/* Mock Chart */}
              <div className="h-64 bg-gradient-secondary rounded-lg flex items-end justify-between p-4 gap-2">
                {[40, 65, 45, 80, 75, 90, 85, 95, 70, 85, 75, 100].map((height, i) => (
                  <div
                    key={i}
                    className="bg-primary rounded-t flex-1 transition-smooth hover:bg-primary-hover"
                    style={{ height: `${height}%` }}
                  />
                ))}
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
            {/* Recent Surveys */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Recent Surveys</h3>
              <div className="space-y-4">
                {mockSurveys.map((survey) => (
                  <div key={survey.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-smooth">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{survey.title}</h4>
                      <Badge variant={survey.status === 'active' ? 'default' : 'secondary'}>
                        {survey.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Responses</span>
                        <span className="font-medium">{survey.responses}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Completion</span>
                        <span className="font-medium">{survey.completion}%</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Avg Rating</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current text-warning" />
                          <span className="font-medium">{survey.avgRating}</span>
                        </div>
                      </div>
                      
                      <div className="bg-muted rounded-full h-2 mt-3">
                        <div 
                          className="bg-primary rounded-full h-2 transition-smooth"
                          style={{ width: `${survey.completion}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {survey.created}
                      </span>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
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