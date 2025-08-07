# QuickSurvey - Lightweight Survey Tool

Quick Insight Pulse is a minimal, student-friendly survey tool that lets users quickly build, share, and analyze surveys — without requiring accounts or complex setup. It’s designed as a capstone-style project at the intersection of Business Analytics and Web Development.

## ✨ Features

### 🚀 Quick Survey Creation
- **No account required** - Start creating surveys immediately
- **Template-based creation** - Choose from pre-built templates or start from scratch
- **Drag-and-drop interface** - Intuitive survey builder
- **Multiple question types** - Multiple choice, text input, rating scales, NPS scores, and yes/no questions

### 📱 Easy Response Collection
- **QR Code generation** - Generate QR codes for easy mobile sharing
- **Direct links** - Share survey URLs directly
- **Mobile-optimized** - Perfect experience across all devices
- **No registration needed** - Respondents can take surveys without signing up

### 📊 Rich Analytics
- **Real-time charts** - Visualize response trends with Recharts
- **NPS scoring** - Automatic Net Promoter Score calculation
- **Completion rates** - Track survey completion metrics
- **Question analytics** - Detailed breakdown by question type
- **Export functionality** - Download results as CSV

### 💾 Data Management
- **Local storage** - All data stored locally in the browser
- **CSV export** - Export survey responses to CSV format
- **Survey management** - Create, edit, and delete surveys
- **Response tracking** - View individual responses and analytics

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts
- **QR Codes**: qrcode library
- **Build Tool**: Vite
- **Routing**: React Router DOM

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Navigate to the project directory**
   ```bash
   cd quick-insight-pulse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` (or the port shown in the terminal)

### 🚨 Troubleshooting

#### Common Issues:

**1. "ENOENT: no such file or directory, open 'package.json'"**
- **Problem**: You're in the wrong directory
- **Solution**: Make sure you're in the `quick-insight-pulse` folder:
  ```bash
  cd quick-insight-pulse
  ls package.json  # Should show the file
  npm run dev
  ```

**2. "Port already in use"**
- **Problem**: Another application is using port 8080
- **Solution**: The server will automatically use the next available port (check terminal output)

**3. "Module not found" errors**
- **Problem**: Dependencies not installed
- **Solution**: Run `npm install` again

**4. App not loading in browser**
- **Problem**: Server not running or wrong URL
- **Solution**: 
  - Check terminal for the correct URL (usually `http://localhost:8080`)
  - Make sure the terminal shows "Local: http://localhost:8080/"
  - Try refreshing the browser

#### Step-by-Step Running Instructions:

1. **Open your terminal/command prompt**

2. **Navigate to the project folder**:
   ```bash
   cd F:\Growth\ba_project\quick-insight-pulse
   ```

3. **Verify you're in the correct directory**:
   ```bash
   ls package.json
   # Should show: package.json
   ```

4. **Install dependencies** (if not done already):
   ```bash
   npm install
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Look for the server output**:
   ```
   ➜  Local:   http://localhost:8080/
   ➜  Network: http://192.168.1.3:8080/
   ```

7. **Open your web browser** and go to:
   `http://localhost:8080/`

#### ✅ Success Indicators:
- Terminal shows "Local: http://localhost:8080/"
- No error messages in terminal
- Browser loads the QuickSurvey homepage
- You can see "Create Survey" button on the homepage

## 📖 How to Use

### Creating a Survey

1. **Start from the homepage**
   - Click "Create Your First Survey" or "Create Survey"

2. **Choose a template or start from scratch**
   - Select from customer satisfaction, product feedback, event feedback, or NPS templates
   - Or start with a blank survey

3. **Build your survey**
   - Add survey title and description
   - Add questions using the question builder
   - Choose from multiple question types:
     - **Multiple Choice**: Radio buttons with custom options
     - **Text Input**: Open-ended text responses
     - **Rating Scale**: 1-5 star ratings
     - **NPS Score**: 0-10 Net Promoter Score
     - **Yes/No**: Simple binary questions

4. **Publish your survey**
   - Click "Publish Survey" to make it live
   - Get your survey URL and QR code

### Sharing Your Survey

1. **QR Code Method**
   - Download the generated QR code
   - Print and display in high-traffic areas
   - Add to business cards or flyers

2. **Direct Link Method**
   - Copy the survey URL
   - Share via email, social media, or messaging apps
   - Embed in websites or emails

### Viewing Analytics

1. **Access the analytics dashboard**
   - Navigate to the Analytics section
   - Select your survey from the dropdown

2. **View key metrics**
   - Total responses
   - Completion rates
   - Average response times
   - NPS scores

3. **Analyze question data**
   - View response breakdowns by question
   - See average ratings for rating questions
   - Check multiple choice answer distributions

4. **Export data**
   - Click "Export CSV" to download all responses
   - Use the data in other analysis tools

## 🎯 Question Types

### Multiple Choice
- Add custom options
- Single selection only
- Perfect for preference questions

### Text Input
- Open-ended responses
- Great for qualitative feedback
- No character limit

### Rating Scale (1-5)
- Star-based rating system
- Ideal for satisfaction questions
- Visual rating interface

### NPS Score (0-10)
- Net Promoter Score calculation
- Automatic promoter/detractor classification
- Industry standard metric

### Yes/No
- Simple binary questions
- Quick responses
- Clear visual interface

## 📊 Analytics Features

### Real-time Charts
- Response trends over time
- Question-by-question breakdowns
- Visual data representation

### NPS Calculation
- Automatic promoter/detractor classification
- Score calculation: (Promoters - Detractors) / Total Responses
- Industry-standard methodology

### Completion Tracking
- Track partial vs. complete responses
- Identify drop-off points
- Optimize survey length

### Export Capabilities
- CSV format export
- All response data included
- Compatible with Excel, Google Sheets, etc.

## 🔧 Customization

### Styling
The app uses Tailwind CSS with a custom design system. Colors, spacing, and components can be customized in:
- `src/index.css` - Global styles and design tokens
- `tailwind.config.ts` - Tailwind configuration
- Component files - Individual component styling

### Adding Question Types
To add new question types:
1. Update the `Question` interface in `src/lib/survey-storage.ts`
2. Add the question type to the `questionTypes` array in `SurveyBuilder.tsx`
3. Implement the rendering logic in `SurveyResponse.tsx`
4. Add analytics handling in the storage system

## 📱 Mobile Optimization

The survey tool is fully responsive and optimized for mobile devices:
- Touch-friendly interfaces
- Optimized form controls
- Mobile-first design
- QR code scanning support

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for deployment
- **Any static hosting**: Upload the `dist` folder

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🚀 Future Features Roadmap

We're constantly working to enhance QuickSurvey with new capabilities. Here's what's coming next:

### 🎯 **Phase 1: Enhanced Survey Management**
- **Survey Templates Library** - Pre-built templates for different industries (restaurants, retail, healthcare, education)
- **Survey Duplication** - Clone existing surveys to create variations quickly
- **Survey Versioning** - Track changes and rollback to previous versions
- **Bulk Operations** - Delete multiple surveys, export all data at once

### 📊 **Phase 2: Advanced Question Types**
- **File Upload** - Allow respondents to upload images, documents
- **Matrix Questions** - Rate multiple items on the same scale
- **Ranking Questions** - Drag and drop to rank preferences
- **Slider Questions** - Visual slider for numeric responses
- **Date/Time Picker** - Schedule appointments or events
- **Location Picker** - Get GPS coordinates or address input

### 🔄 **Phase 3: Survey Logic & Branching**
- **Conditional Logic** - Show/hide questions based on previous answers
- **Skip Logic** - Skip irrelevant questions based on responses
- **Question Dependencies** - Make questions required based on other answers
- **Multi-page Surveys** - Create surveys with progress bars and navigation

### 📈 **Phase 4: Advanced Analytics**
- **Real-time Dashboard** - Live response monitoring with notifications
- **Comparative Analytics** - Compare results across different time periods
- **Demographic Analysis** - Filter responses by respondent characteristics
- **Sentiment Analysis** - AI-powered text analysis for open-ended responses
- **Custom Reports** - Build custom report templates

### 🔐 **Phase 5: Collaboration & Security**
- **Team Collaboration** - Multiple users can edit surveys
- **Role-based Access** - Admin, editor, viewer permissions
- **Data Encryption** - Encrypt sensitive response data
- **GDPR Compliance** - Data privacy controls and consent management

### 📱 **Phase 6: Mobile & Accessibility**
- **Offline Mode** - Collect responses without internet connection
- **Push Notifications** - Alert when new responses arrive
- **Screen Reader Support** - Full WCAG compliance
- **Multi-language Support** - Internationalization (i18n)

### 🎨 **Phase 7: Customization & Branding**
- **Custom Branding** - Upload logos, custom colors, fonts
- **Custom Domains** - Use your own domain for surveys
- **Dark Mode** - Toggle between light and dark themes
- **Advanced Styling** - CSS customization options

### 🤖 **Phase 8: AI & Automation**
- **Smart Question Suggestions** - AI recommends questions based on survey goal
- **Response Analysis** - AI summarizes open-ended responses
- **Auto-reminders** - Follow-up emails for incomplete surveys
- **Predictive Analytics** - Forecast response rates and trends

### 🔗 **Phase 9: Integrations**
- **Third-party Integrations** - Zapier, Slack, email marketing tools
- **API Support** - REST API for custom integrations
- **CRM Integration** - Salesforce, HubSpot, Pipedrive
- **Payment Processors** - Stripe, PayPal for paid surveys

### 🎯 **Phase 10: Industry-Specific Features**
- **Customer Satisfaction (CSAT)** - Industry-specific CSAT surveys
- **Employee Engagement** - HR-focused survey templates
- **Product Research** - Feature prioritization, usability testing
- **Healthcare Surveys** - Patient satisfaction, clinical research Engineer

🧠 Project Vibe

This isn’t just a dev project. It’s a bridge between tech & business thinking. We collect, analyze, and act on feedback—because data-driven decisions start with good questions.


---

## 🆘 Support

For issues or questions:
1. Check the existing issues
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

---

**Built with ❤️ for better feedback collection**
