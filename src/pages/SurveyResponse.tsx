import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Star,
  MessageSquare,
  Send,
  Loader2
} from 'lucide-react';
import { surveyStorage, type Survey, type SurveyResponse } from '@/lib/survey-storage';

export default function SurveyResponse() {
  const { surveyId } = useParams<{ surveyId: string }>();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (surveyId) {
      const foundSurvey = surveyStorage.getSurvey(surveyId);
      if (foundSurvey && foundSurvey.isActive) {
        setSurvey(foundSurvey);
      } else {
        // Survey not found or inactive
        navigate('/');
      }
      setLoading(false);
    }
  }, [surveyId, navigate]);

  const currentQuestion = survey?.questions[currentQuestionIndex];
  const progress = survey ? ((currentQuestionIndex + 1) / survey.questions.length) * 100 : 0;

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < (survey?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!survey) return;

    setIsSubmitting(true);

    // Validate required questions
    const requiredQuestions = survey.questions.filter(q => q.required);
    const missingRequired = requiredQuestions.some(q => !answers[q.id]);

    if (missingRequired) {
      // Find first missing required question
      const firstMissing = requiredQuestions.find(q => !answers[q.id]);
      if (firstMissing) {
        const questionIndex = survey.questions.findIndex(q => q.id === firstMissing.id);
        setCurrentQuestionIndex(questionIndex);
      }
      setIsSubmitting(false);
      return;
    }

    // Create response
    const response: SurveyResponse = {
      id: surveyStorage.generateId(),
      surveyId: survey.id,
      answers: Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer
      })),
      submittedAt: new Date().toISOString(),
      userAgent: navigator.userAgent
    };

    // Save response
    surveyStorage.saveResponse(response);
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    const currentAnswer = answers[currentQuestion.id];

    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-4">
            <RadioGroup
              value={currentAnswer || ''}
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
            >
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <Textarea
              placeholder="Type your answer here..."
              value={currentAnswer || ''}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
        );

      case 'rating':
        return (
          <div className="space-y-4">
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleAnswerChange(currentQuestion.id, rating)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    currentAnswer === rating
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-primary/10'
                  }`}
                >
                  <Star className={`w-6 h-6 ${currentAnswer === rating ? 'fill-current' : ''}`} />
                </button>
              ))}
            </div>
            <div className="text-center text-sm text-muted-foreground">
              {currentAnswer ? `${currentAnswer} out of 5` : 'Select a rating'}
            </div>
          </div>
        );

      case 'nps':
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Not likely</span>
              <span>Very likely</span>
            </div>
            <div className="flex justify-between space-x-1">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleAnswerChange(currentQuestion.id, rating)}
                  className={`flex-1 h-10 rounded border transition-all ${
                    currentAnswer === rating
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background border-border hover:bg-primary/10'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
            <div className="text-center text-sm text-muted-foreground">
              {currentAnswer !== undefined ? `Score: ${currentAnswer}/10` : 'Select a score'}
            </div>
          </div>
        );

      case 'yes-no':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswerChange(currentQuestion.id, 'Yes')}
                className={`p-4 rounded-lg border transition-all ${
                  currentAnswer === 'Yes'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background border-border hover:bg-primary/10'
                }`}
              >
                <CheckCircle className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Yes</div>
              </button>
              
              <button
                onClick={() => handleAnswerChange(currentQuestion.id, 'No')}
                className={`p-4 rounded-lg border transition-all ${
                  currentAnswer === 'No'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background border-border hover:bg-primary/10'
                }`}
              >
                <div className="w-6 h-6 mx-auto mb-2 border-2 border-current rounded-full" />
                <div className="font-medium">No</div>
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading survey...</p>
        </div>
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Survey Not Found</h1>
          <p className="text-muted-foreground mb-4">This survey may have been deleted or is no longer active.</p>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Thank You!</h1>
          <p className="text-muted-foreground mb-6">
            Your response has been submitted successfully. We appreciate your feedback!
          </p>
          <Button onClick={() => navigate('/')} className="w-full">
            <Send className="w-4 h-4 mr-2" />
            Submit Another Response
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card-elevated">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <div className="text-center">
              <h1 className="text-lg font-semibold">{survey.title}</h1>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {survey.questions.length}
              </p>
            </div>

            <div className="w-20" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="border-b border-border bg-card-elevated">
        <div className="container mx-auto px-6 py-2">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="p-6">
            {/* Question Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline">Q{currentQuestionIndex + 1}</Badge>
                <Badge variant="secondary">{currentQuestion?.type}</Badge>
                {currentQuestion?.required && (
                  <Badge variant="destructive">Required</Badge>
                )}
              </div>
              
              <h2 className="text-xl font-semibold mb-2">
                {currentQuestion?.title}
              </h2>
              
              {currentQuestion?.description && (
                <p className="text-muted-foreground">
                  {currentQuestion.description}
                </p>
              )}
            </div>

            {/* Question Content */}
            <div className="mb-8">
              {renderQuestion()}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentQuestionIndex === (survey.questions.length - 1) ? (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="gradient-primary text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Survey
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!answers[currentQuestion?.id]}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
