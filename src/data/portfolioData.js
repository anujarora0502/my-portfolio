export const portfolioData = {
  personalInfo: {
    name: "Anuj Arora",
    title: "Backend-Specialized Full-Stack Developer",
    email: "anujarora.work@gmail.com",
    phone: "+91 9711379962",
    github: "https://github.com/anujarora0502",
    linkedin: "https://www.linkedin.com/in/anujarora0502",
    twitter: "https://x.com/eight_bit_byte",
    bio: "Backend-Specialized Full-Stack Developer with extensive experience in designing and building scalable systems using GoLang and Ruby on Rails. While my primary expertise lies in backend architecture, I possess solid frontend capabilities in ReactJS, enabling me to contribute effectively across the entire development stack."
  },
  skills: {
    languages: ["Golang", "Ruby", "SQL", "JavaScript", "TypeScript"],
    frameworks: ["Ruby on Rails", "ReactJS"],
    tools: ["AWS", "Docker", "Kubernetes", "Prometheus", "Grafana", "GitHub Actions"],
    concepts: ["GraphQL", "REST APIs", "Microservices", "CI/CD", "System Design", "Monitoring & Alerting"]
  },
  experience: [
    {
      company: "Samsung Research Institute, Bangalore",
      role: "Lead Engineer (Samsung Ads)",
      period: "Aug 2022 - Present",
      description: [
        "Designed and developed an Authorization Service from scratch in Go, handling 200+ requests per second with p99 latency of 20ms.",
        "Integrated Prometheus metrics into Samsung DSP application and built Grafana dashboards.",
        "Developed and optimized CI/CD pipelines using GitHub Actions.",
        "Enhanced geo-targeting capabilities in the Samsung DSP, expanding coverage to 50+ countries with potential revenue impact of $8.4M.",
        "Enhanced advertisement campaign pacing by introducing custom date-based budget allocation.",
        "Executed multiple migration and maintenance tasks for Samsung DSP."
      ]
    }
  ],
  education: [
    {
      institution: "Maharaja Agrasen Institute of Technology, Delhi",
      degree: "B.Tech in Computer Science",
      period: "Aug 2018 - Aug 2022",
      score: "CGPA: 9.2/10",
      coursework: "Object Oriented Programming, Operating Systems, Database Management System, Data Structures, Algorithm Design And Analysis, Web Engineering, Computer Networks, Java Programming"
    },
    {
      institution: "Kendriya Vidyalaya, Delhi",
      degree: "Class 12th (PCM with Computer Science)",
      period: "Class 12th",
      score: "Percentage: 93.8%"
    }
  ],
  projects: [
    {
      title: "Local Events Based Advertisement Creative Generation",
      description: "Samsung Ads Hackathon project that dynamically generates hyper-relevant ad creatives by integrating Amazon Bedrock's generative AI with PredictHQ's real-time event data API."
    },
    {
      title: "GraphQL Inspector",
      description: "Built a GraphQL schema governance system during an internal hackathon, which won a special award and was later productionized. Integrated into CI/CD pipelines."
    }
  ],
  leadership: [
    "Initiated and organized an Engineering Jam Session at Samsung Research Institute.",
    "Conducted training sessions on code.i (Samsung's internal coding assistant) and SQL agents.",
    "Managed two projects with a team of two members, ensuring timely delivery."
  ]
};
