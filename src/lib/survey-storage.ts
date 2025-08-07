export interface Question {
  id: string;
  type: 'multiple-choice' | 'text' | 'rating' | 'yes-no' | 'nps';
  title: string;
  options?: string[];
  required: boolean;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt: string;
  isActive: boolean;
  shareUrl?: string;
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  answers: {
    questionId: string;
    answer: string | number | string[];
  }[];
  submittedAt: string;
  userAgent?: string;
}

class SurveyStorage {
  private readonly SURVEYS_KEY = 'quick-survey-surveys';
  private readonly RESPONSES_KEY = 'quick-survey-responses';

  // Survey Management
  saveSurvey(survey: Survey): void {
    const surveys = this.getAllSurveys();
    const existingIndex = surveys.findIndex(s => s.id === survey.id);
    
    if (existingIndex >= 0) {
      surveys[existingIndex] = survey;
    } else {
      surveys.push(survey);
    }
    
    localStorage.setItem(this.SURVEYS_KEY, JSON.stringify(surveys));
  }

  getAllSurveys(): Survey[] {
    try {
      const data = localStorage.getItem(this.SURVEYS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  getSurvey(id: string): Survey | null {
    const surveys = this.getAllSurveys();
    return surveys.find(s => s.id === id) || null;
  }

  deleteSurvey(id: string): void {
    const surveys = this.getAllSurveys();
    const filtered = surveys.filter(s => s.id !== id);
    localStorage.setItem(this.SURVEYS_KEY, JSON.stringify(filtered));
    
    // Also delete responses for this survey
    const responses = this.getAllResponses();
    const filteredResponses = responses.filter(r => r.surveyId !== id);
    localStorage.setItem(this.RESPONSES_KEY, JSON.stringify(filteredResponses));
  }

  // Response Management
  saveResponse(response: SurveyResponse): void {
    const responses = this.getAllResponses();
    responses.push(response);
    localStorage.setItem(this.RESPONSES_KEY, JSON.stringify(responses));
  }

  getAllResponses(): SurveyResponse[] {
    try {
      const data = localStorage.getItem(this.RESPONSES_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  getSurveyResponses(surveyId: string): SurveyResponse[] {
    const responses = this.getAllResponses();
    return responses.filter(r => r.surveyId === surveyId);
  }

  // Analytics helpers
  getSurveyAnalytics(surveyId: string) {
    const survey = this.getSurvey(surveyId);
    const responses = this.getSurveyResponses(surveyId);
    
    if (!survey) return null;

    const analytics = {
      totalResponses: responses.length,
      completionRate: 0,
      averageTime: 0,
      questionAnalytics: survey.questions.map(q => ({
        questionId: q.id,
        questionTitle: q.title,
        questionType: q.type,
        responses: 0,
        answers: {} as Record<string, number>,
        averageRating: 0,
        npsScore: 0
      }))
    };

    responses.forEach(response => {
      response.answers.forEach(answer => {
        const questionAnalytic = analytics.questionAnalytics.find(qa => qa.questionId === answer.questionId);
        if (questionAnalytic) {
          questionAnalytic.responses++;
          
          if (questionAnalytic.questionType === 'rating' || questionAnalytic.questionType === 'nps') {
            const rating = Number(answer.answer);
            if (!isNaN(rating)) {
              questionAnalytic.averageRating = 
                (questionAnalytic.averageRating * (questionAnalytic.responses - 1) + rating) / questionAnalytic.responses;
              
              if (questionAnalytic.questionType === 'nps') {
                // NPS calculation: Promoters (9-10) - Detractors (0-6)
                const npsScore = rating >= 9 ? 1 : rating <= 6 ? -1 : 0;
                questionAnalytic.npsScore = 
                  (questionAnalytic.npsScore * (questionAnalytic.responses - 1) + npsScore) / questionAnalytic.responses;
              }
            }
          } else if (questionAnalytic.questionType === 'multiple-choice') {
            const choices = Array.isArray(answer.answer) ? answer.answer : [answer.answer];
            choices.forEach(choice => {
              questionAnalytic.answers[choice] = (questionAnalytic.answers[choice] || 0) + 1;
            });
          } else {
            // For text and yes-no, just count responses
            questionAnalytic.answers[answer.answer as string] = (questionAnalytic.answers[answer.answer as string] || 0) + 1;
          }
        }
      });
    });

    // Calculate completion rate (responses with all required questions answered)
    const completedResponses = responses.filter(response => {
      const requiredQuestions = survey.questions.filter(q => q.required);
      const answeredRequired = requiredQuestions.every(q => 
        response.answers.some(a => a.questionId === q.id)
      );
      return answeredRequired;
    });

    analytics.completionRate = responses.length > 0 ? (completedResponses.length / responses.length) * 100 : 0;

    return analytics;
  }

  // Generate unique ID
  generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Export to CSV
  exportToCSV(surveyId: string): string {
    const survey = this.getSurvey(surveyId);
    const responses = this.getSurveyResponses(surveyId);
    
    if (!survey || responses.length === 0) return '';

    // Create headers
    const headers = ['Response ID', 'Submitted At', ...survey.questions.map(q => q.title)];
    
    // Create rows
    const rows = responses.map(response => {
      const row = [response.id, response.submittedAt];
      
      survey.questions.forEach(question => {
        const answer = response.answers.find(a => a.questionId === question.id);
        row.push(answer ? (Array.isArray(answer.answer) ? answer.answer.join(', ') : answer.answer.toString()) : '');
      });
      
      return row;
    });

    // Convert to CSV
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    return csvContent;
  }
}

export const surveyStorage = new SurveyStorage();
