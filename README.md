# 🚀 GitHub Project Analyzer

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![Express](https://img.shields.io/badge/Server-Express-black?logo=express)
![TailwindCSS](https://img.shields.io/badge/Style-TailwindCSS-38B2AC?logo=tailwind-css)
![API](https://img.shields.io/badge/API-GitHub-orange?logo=github)

A full-stack web application that analyzes GitHub repositories and evaluates their authenticity and quality based on activity, commits, contributors, and overall repository health.

## 🔗 Live Demo  
👉 https://github-project-analyzer-2.onrender.com/  
💡 Tip: Try searching repositories like `facebook/react` or `vercel/next.js`

## 📌 Overview
GitHub Project Analyzer helps users determine how active, reliable, and well-maintained a repository is. By integrating with the GitHub REST API, the application fetches real-time data and transforms it into meaningful insights such as commit frequency, contributor involvement, issue activity, and language distribution.

The goal of this project is to provide a quick way to assess the **authenticity and health of open-source projects**, making it easier for developers to choose reliable repositories.

## ✨ Key Features
- 🔍 Analyze any public GitHub repository  
- 📊 Repository health insights (activity, stars, forks, issues)  
- 📈 Commit frequency and contribution analysis  
- 👨‍💻 Contributor activity tracking  
- 📦 Language and code distribution insights  
- 🧠 Helps evaluate project authenticity and maintenance level  
- ⚡ Real-time data fetching using GitHub API  
- 🎨 Clean and responsive UI (Tailwind CSS)  
- 🚀 Fast and optimized performance  

## 🏗 System Architecture
### 🔹 Frontend (Client)
- React.js (Vite)  
- Tailwind CSS  
- Axios  
- Component-based architecture  
- Responsive design  

### 🔹 Backend (Server)
- Node.js  
- Express.js  
- REST API routing  
- Data processing & analysis logic  
- Environment configuration  

### 🔹 External Services
- GitHub REST API  

## 📊 Data Flow
1. User enters repository name (`username/repo`)  
2. Frontend sends request to backend  
3. Backend fetches repository data from GitHub API  
4. Data is analyzed (commits, contributors, activity)  
5. Insights are generated and sent to frontend  
6. UI displays repository health and authenticity metrics  

## 📂 Project Structure

github-project-analyzer/
├── client/
│ ├── components/
│ ├── pages/
│ ├── hooks/
│ └── App.jsx
├── server/
│ ├── routes/
│ ├── controllers/
│ ├── utils/
│ └── config/
└── README.md


## 📈 Impact
- Built a tool to evaluate GitHub repository authenticity and activity  
- Improved decision-making for selecting reliable open-source projects  
- Strengthened skills in API integration, data analysis, and full-stack development  

## 🛠 Installation & Setup
```bash
git clone https://github.com/your-username/github-project-analyzer.git
cd github-project-analyzer

# Frontend
cd client
npm install
npm run dev

# Backend
cd ../server
npm install
npm start
