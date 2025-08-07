# 📊 Quick Insight Pulse - Lightweight Survey & Feedback Tool

**Quick Insight Pulse** is a minimal, student-friendly survey tool that lets users quickly build, share, and analyze surveys without requiring accounts or complex setup. It’s designed as a capstone-style project at the intersection of **Business Analytics** and **Web Development**.

---

## ✅ Current Features (MVP - Version 1)

### 🚀 Core Functionalities Implemented:

* **Create Surveys Quickly**

  * No login required for basic survey creation
  * Support for different question types:

    * Rating Scale (1-5, 1-10)
    * Multiple Choice
    * Net Promoter Score (0-10)
    * Open-Ended (Text Input)

* **Survey Access & Collection**

  * Unique survey URL generated on creation
  * Responses can be submitted from any device (mobile-first)

* **Data Storage**

  * Responses saved to local PostgreSQL DB
  * Supports timestamp, device type, and source (QR/email)

* **Basic Analytics Dashboard**

  * Number of responses
  * Average rating scores
  * Service quality breakdown
  * NPS Score Calculation (Promoters/Detractors)

* **Export to CSV**

  * Download raw responses as CSV

---

## 🔭 Future Roadmap

> **Disclaimer**: The features listed below are *not yet implemented*. They represent a learning roadmap and the project’s long-term vision as a student initiative. The MVP focuses on demonstrating core BA principles and basic full-stack capability.

### 🎯 Planned / Upcoming Features (Next Versions)

#### Core Improvements:

* [ ] Survey Templates for common use cases (Restaurant, Product Launch, Event)
* [ ] Drag-and-Drop Survey Builder UI
* [ ] Improved Data Validation (required fields, unique response logic)
* [ ] Session-based Temporary Storage for unauthenticated users

#### Enhanced Analytics:

* [ ] Charts & Graphs using Chart.js (bar, pie, line)
* [ ] Sentiment Analysis on open text
* [ ] Completion Time Stats
* [ ] Device/Location Heatmaps

#### AI-Powered Features (Stretch Goals):

* [ ] Auto-generate follow-up questions based on responses
* [ ] Text summarization for long-form answers
* [ ] Predictive scoring for satisfaction trends

#### Optional User Management:

* [ ] Basic user auth for saving multiple surveys
* [ ] Survey expiration & visibility controls
* [ ] Tiered access (free vs premium features)

#### Integrations:

* [ ] QR Code Generation for quick access
* [ ] Email sending to distribute surveys
* [ ] API access for third-party CRMs

---

## 🧩 High Priority Features (Beyond MVP)

*(These are future goals and currently in the exploration phase)*

### Survey Management

* Survey Templates Library
* Survey Duplication & Versioning
* Bulk Export & Delete Options

### Advanced Question Types

* File Upload
* Ranking & Matrix Questions
* Slider Inputs
* Date/Time & Location Pickers

### Logic & Flow

* Conditional/Skip Logic
* Multi-page surveys with progress bars
* Question dependencies & validation logic

### Analytics & Insights

* Real-time Dashboard
* Demographic filters
* Comparative analytics over time
* Sentiment analysis
* Response Heatmaps

### Export & Integration

* Export to PDF/Excel
* Google Sheets sync
* Webhooks & API integrations

### User & Security

* Multi-user collaboration
* Role-based permissions
* GDPR support & audit logs

### Mobile & Accessibility

* Offline mode
* Voice input
* WCAG accessibility
* Multi-language support

### Customization & Branding

* Custom themes, logos, domains
* Dark mode & CSS customization

### AI & Automation

* Smart question suggestions
* Auto summaries
* Predictive analytics
* Auto-reminders & scheduled surveys

---

## 💡 Use Case Examples

* Cafés collecting customer feedback via QR on receipts
* Students running survey-based research projects
* Event organizers collecting attendee opinions
* Marketing teams validating new product ideas

---

## 🛠️ Tech Stack

* **Frontend**: HTML/CSS (React coming soon)
* **Backend**: Node.js, Express.js
* **Database**: PostgreSQL (SQLite-compatible for trials)
* **Analytics**: Basic SQL queries (AI/NLP features optional)
* **Exports**: `json2csv`, native CSV modules

---

## 👨‍💻 Setup Instructions

1. Clone the repo:

```bash
git clone https://github.com/yourusername/quick-insight-pulse.git
```

2. Install dependencies:

```bash
cd quick-insight-pulse/backend
npm install
```

3. Create a `.env` file based on `env.example`:

```bash
PORT=5000
DB_URL=postgresql://localhost/yourdb
```

4. Run the server:

```bash
node server.js
```

5. Go to:

```
http://localhost:5000/health
```

---

## 📎 Contributing

We welcome student contributors! Start with the issues labeled `good-first-issue` or `student-project`.

---

## 📄 License

MIT

---

## ✨ Author

**Gauri** – Master's in Business Analytics @ Deakin | Ex-CS Engineer

---

## 🧠 Project Vibe

This isn’t just a dev project. It’s a **bridge between tech & business thinking**. We collect, analyze, and act on feedback—because **data-driven decisions start with good questions**.
