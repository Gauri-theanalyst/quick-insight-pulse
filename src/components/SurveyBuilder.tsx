import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Trash2, 
  Eye, 
  Zap, 
  BarChart3, 
  Users, 
  Star,
  CheckCircle,
  Globe,
  Smartphone,
  Share2,
  QrCode,
  Download
} from 'lucide-react';
import { surveyStorage, type Survey, type Question } from '@/lib/survey-storage';
import QRCodeGenerator from './QRCodeGenerator';

// Remove the duplicate interface definitions since we're importing them

const questionTypes = [
  { id: 'multiple-choice', label: 'Multiple Choice', icon: CheckCircle },
  { id: 'text', label: 'Text Input', icon: Users },
  { id: 'rating', label: 'Rating Scale', icon: Star },
  { id: 'nps', label: 'NPS Score', icon: BarChart3 },
  { id: 'yes-no', label: 'Yes/No', icon: CheckCircle }
];

const templates = [
  {
    id: 'customer-satisfaction',
    title: 'Customer Satisfaction',
    description: 'Measure customer happiness and identify improvement areas',
    icon: '😊',
    category: 'Popular',
    questions: 5
  },
  {
    id: 'product-feedback',
    title: 'Product Feedback',
    description: 'Collect insights about your product features and usability',
    icon: '💡',
    category: 'Popular',
    questions: 7
  },
  {
    id: 'event-feedback',
    title: 'Event Feedback',
    description: 'Get attendee feedback to improve future events',
    icon: '🎉',
    category: 'Business',
    questions: 6
  },
  {
    id: 'nps-survey',
    title: 'NPS Survey',
    description: 'Net Promoter Score to measure customer loyalty',
    icon: '📊',
    category: 'Analytics',
    questions: 3
  }
];

export default function SurveyBuilder() {
  const [currentStep, setCurrentStep] = useState<'template' | 'build' | 'preview' | 'share'>('template');
  const [survey, setSurvey] = useState<Survey>({
    id: '',
    title: '',
    description: '',
    questions: [],
    createdAt: '',
    isActive: false
  });
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const addQuestion = (type: Question['type']) => {
    const newQuestion: Question = {
      id: `q_${Date.now()}`,
      type,
      title: '',
      required: true,
      ...(type === 'multiple-choice' ? { options: ['Option 1', 'Option 2'] } : {})
    };
    setSurvey(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const saveSurvey = () => {
    const surveyToSave: Survey = {
      ...survey,
      id: survey.id || surveyStorage.generateId(),
      createdAt: survey.createdAt || new Date().toISOString(),
      isActive: true
    };
    
    surveyStorage.saveSurvey(surveyToSave);
    setSurvey(surveyToSave);
    setCurrentStep('share');
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setSurvey(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === id ? { ...q, ...updates } : q
      )
    }));
  };

  const removeQuestion = (id: string) => {
    setSurvey(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== id)
    }));
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSurvey({
        id: '',
        title: template.title,
        description: template.description,
        questions: [
          {
            id: 'q1',
            type: 'rating',
            title: 'How satisfied are you with our service?',
            required: true
          },
          {
            id: 'q2',
            type: 'multiple-choice',
            title: 'What could we improve?',
            options: ['Customer service', 'Product quality', 'Pricing', 'Delivery speed'],
            required: false
          }
        ],
        createdAt: '',
        isActive: false
      });
      setCurrentStep('build');
    }
  };

  if (currentStep === 'template') {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-hero">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="relative container mx-auto px-6 py-20 text-center text-white">
            <div className="animate-fade-in">
              <h1 className="text-5xl font-bold mb-6">
                Create Surveys in 
                <span className="bg-white/20 px-3 py-1 rounded-lg ml-3">Under 2 Minutes</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                AI-powered survey creation with instant insights. Get customer feedback faster than ever.
              </p>
              <div className="flex items-center justify-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  <span>Lightning Fast</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>AI Insights</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  <span>Mobile Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Templates Section */}
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Starting Point</h2>
            <p className="text-muted-foreground text-lg">
              Pick a template or start from scratch. All templates are fully customizable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {templates.map((template) => (
              <Card 
                key={template.id}
                className="survey-card cursor-pointer group"
                onClick={() => handleTemplateSelect(template.id)}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{template.icon}</div>
                  <Badge variant="secondary" className="mb-3">
                    {template.category}
                  </Badge>
                  <h3 className="font-semibold text-lg mb-2">{template.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {template.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {template.questions} questions
                    </span>
                    <Button size="sm" variant="ghost" className="group-hover:bg-primary group-hover:text-primary-foreground">
                      Use Template
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setCurrentStep('build')}
              className="border-2 border-dashed border-muted-foreground/30 hover:border-primary"
            >
              <Plus className="w-5 h-5 mr-2" />
              Start from Scratch
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'build') {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card-elevated">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Survey Builder</h1>
                <p className="text-muted-foreground">
                  Build your survey with our intuitive drag-and-drop interface
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => setCurrentStep('preview')}>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button 
                  className="gradient-primary text-white"
                  onClick={saveSurvey}
                  disabled={!survey.title || survey.questions.length === 0}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Publish Survey
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Editor */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                {/* Survey Info */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Survey Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Survey Title</label>
                      <Input
                        placeholder="Enter your survey title..."
                        value={survey.title}
                        onChange={(e) => setSurvey(prev => ({ ...prev, title: e.target.value }))}
                        className="text-lg"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Description</label>
                      <Textarea
                        placeholder="Briefly describe your survey purpose..."
                        value={survey.description}
                        onChange={(e) => setSurvey(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Questions */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Questions</h2>
                  <div className="space-y-4">
                    {survey.questions.map((question, index) => (
                      <Card key={question.id} className="p-6 border-l-4 border-l-primary/20">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline">Q{index + 1}</Badge>
                            <Badge variant="secondary">{question.type}</Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeQuestion(question.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <Input
                            placeholder="Enter your question..."
                            value={question.title}
                            onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
                          />
                          
                          {question.type === 'multiple-choice' && question.options && (
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Options</label>
                              {question.options.map((option, optIndex) => (
                                <Input
                                  key={optIndex}
                                  placeholder={`Option ${optIndex + 1}`}
                                  value={option}
                                  onChange={(e) => {
                                    const newOptions = [...question.options!];
                                    newOptions[optIndex] = e.target.value;
                                    updateQuestion(question.id, { options: newOptions });
                                  }}
                                />
                              ))}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const newOptions = [...question.options!, `Option ${question.options!.length + 1}`];
                                  updateQuestion(question.id, { options: newOptions });
                                }}
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Option
                              </Button>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}

                    {/* Add Question Section */}
                    <Card className="p-6 border-2 border-dashed border-muted-foreground/30">
                      <h3 className="font-medium mb-4">Add New Question</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {questionTypes.map((type) => {
                          const Icon = type.icon;
                          return (
                            <Button
                              key={type.id}
                              variant="outline"
                              onClick={() => addQuestion(type.id as Question['type'])}
                              className="h-auto p-4 flex flex-col items-center gap-2"
                            >
                              <Icon className="w-5 h-5" />
                              <span className="text-sm">{type.label}</span>
                            </Button>
                          );
                        })}
                      </div>
                    </Card>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Mobile Preview */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Mobile Preview
                </h3>
                <div className="bg-muted rounded-xl p-4 mx-auto max-w-[200px]">
                  <div className="bg-background rounded-lg p-3 shadow-soft">
                    <div className="space-y-3">
                      <div className="h-3 bg-primary/20 rounded"></div>
                      <div className="h-2 bg-muted rounded w-3/4"></div>
                      <div className="h-2 bg-muted rounded w-1/2"></div>
                      <div className="space-y-1">
                        <div className="h-2 bg-muted rounded w-full"></div>
                        <div className="h-2 bg-muted rounded w-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Stats */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Survey Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Questions</span>
                    <span className="font-medium">{survey.questions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Est. Time</span>
                    <span className="font-medium">{Math.max(1, Math.ceil(survey.questions.length * 0.5))} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completion Rate</span>
                    <Badge variant="secondary">85%</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'share') {
    const surveyUrl = `${window.location.origin}/survey/${survey.id}`;
    
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card-elevated">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Survey Published!</h1>
                <p className="text-muted-foreground">
                  Your survey is now live and ready to collect responses
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => setCurrentStep('build')}>
                  Edit Survey
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    const csvContent = surveyStorage.exportToCSV(survey.id);
                    if (csvContent) {
                      const blob = new Blob([csvContent], { type: 'text/csv' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `${survey.title.replace(/\s+/g, '-')}-responses.csv`;
                      link.click();
                    }
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* QR Code and Sharing */}
            <QRCodeGenerator 
              surveyUrl={surveyUrl}
              surveyTitle={survey.title}
            />

            {/* Survey Stats */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Survey Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Title</label>
                    <p className="font-medium">{survey.title}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                    <p className="text-sm">{survey.description}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Questions</label>
                    <p className="font-medium">{survey.questions.length}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Created</label>
                    <p className="text-sm">{new Date(survey.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.open(`/analytics/${survey.id}`, '_blank')}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.open(surveyUrl, '_blank')}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Survey
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      const csvContent = surveyStorage.exportToCSV(survey.id);
                      if (csvContent) {
                        const blob = new Blob([csvContent], { type: 'text/csv' });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `${survey.title.replace(/\s+/g, '-')}-responses.csv`;
                        link.click();
                      }
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Responses
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Preview would go here
  return null;
}