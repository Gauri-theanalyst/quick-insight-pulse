import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SurveyBuilder from '@/components/SurveyBuilder';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import { 
  Zap, 
  BarChart3, 
  Users, 
  Globe,
  Star,
  ArrowRight,
  CheckCircle,
  Smartphone,
  Brain,
  Clock
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast Creation',
    description: 'Create professional surveys in under 2 minutes with our intuitive builder'
  },
  {
    icon: Brain,
    title: 'AI-Powered Insights',
    description: 'Get instant analysis and recommendations powered by advanced AI'
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimized',
    description: 'Perfect experience across all devices with responsive design'
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Watch responses flow in with live dashboards and instant updates'
  }
];

const stats = [
  { label: 'Surveys Created', value: '50K+' },
  { label: 'Responses Collected', value: '2M+' },
  { label: 'Happy Customers', value: '10K+' },
  { label: 'Countries', value: '150+' }
];

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'builder' | 'analytics'>('home');

  if (currentView === 'builder') {
    return <SurveyBuilder />;
  }

  if (currentView === 'analytics') {
    return <AnalyticsDashboard />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card-elevated">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">QuickSurvey</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <Button variant="ghost" onClick={() => setCurrentView('home')}>Home</Button>
              <Button variant="ghost" onClick={() => setCurrentView('builder')}>Create Survey</Button>
              <Button variant="ghost" onClick={() => setCurrentView('analytics')}>Analytics</Button>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline">Sign In</Button>
              <Button variant="gradient">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in">
            <Badge variant="secondary" className="mb-6">
              🚀 Create surveys 10x faster with AI
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto">
              From Idea to 
              <span className="gradient-primary bg-clip-text text-transparent"> Insights</span>
              <br />
              in Under 5 Minutes
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create, distribute, and analyze customer feedback surveys with AI-powered insights. 
              Get the data you need to make better business decisions, faster than ever.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => setCurrentView('builder')}
                className="text-lg px-8 py-4"
              >
                <Zap className="w-5 h-5 mr-2" />
                Create Your First Survey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setCurrentView('analytics')}
                className="text-lg px-8 py-4"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                View Demo Dashboard
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose QuickSurvey?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for speed, powered by AI, designed for results. Everything you need to collect and understand customer feedback.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-smooth text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple 3-Step Process
            </h2>
            <p className="text-xl text-muted-foreground">
              From creation to insights in minutes, not hours
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">Create</h3>
              <p className="text-muted-foreground">
                Choose a template or start from scratch. Add questions with our intuitive builder.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">Distribute</h3>
              <p className="text-muted-foreground">
                Share via QR codes, email, social media, or embed directly on your website.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">Analyze</h3>
              <p className="text-muted-foreground">
                Get instant AI-powered insights and watch real-time analytics as responses come in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using QuickSurvey to make data-driven decisions
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => setCurrentView('builder')}
              className="text-lg px-8 py-4"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Building Now
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Clock className="w-5 h-5 mr-2" />
              Schedule Demo
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 mt-8 text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Free 14-day trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card-elevated py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">QuickSurvey</span>
            </div>
            
            <div className="text-muted-foreground text-sm">
              © 2024 QuickSurvey. Made with ❤️ for better feedback.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
