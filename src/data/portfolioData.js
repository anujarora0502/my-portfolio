// Single source of truth for the site AND the AI assistant (see src/app/api/chat/route.js).
// Everything in here is public-facing: keep internal-only details (teammate names,
// ticket IDs, security findings, client budgets) out of this file.
// Titles, dates and headline figures follow the resume in /public/Anuj_Arora_Resume.pdf.

export const portfolioData = {
  personalInfo: {
    name: "Anuj Arora",
    title: "Lead Engineer, Samsung Ads",
    location: "Bangalore, India",
    email: "anujarora.work@gmail.com",
    phone: "+91 9711379962",
    github: "https://github.com/anujarora0502",
    linkedin: "https://www.linkedin.com/in/anujarora0502",
    twitter: "https://x.com/eight_bit_byte",
    resume: "/Anuj_Arora_Resume.pdf",
    intro:
      "I'm a backend engineer at Samsung Ads in Bangalore. I spend most of my time on the systems behind the Samsung DSP, and lately on Plan Assist, an AI agent that turns advertiser RFPs into media plans.",
    about:
      "I work mostly in Go, Python and Ruby on Rails, with enough React to ship the front end of what I build. I like writing the design doc before the code, and finishing a migration by deleting the old path."
  },

  // Work at Samsung Ads, grouped by role (as on the resume). Each item is one piece of work.
  // `details` is extra context for the AI assistant only; it isn't shown on the page.
  work: {
    company: "Samsung Research Institute, Bangalore",
    team: "Samsung Ads",
    roles: [
      {
        title: "Lead Engineer",
        period: "Jan 2025 - Present",
        items: [
          {
            name: "Plan Assist",
            summary:
              "An AI agent that reads advertiser RFPs and produces forecasted media plans inside the DSP, using CrewAI, LangChain, LangGraph and FastAPI on AWS Bedrock; it handles 500+ RFPs a month and cut processing from about 45 minutes to 10 per request.",
            details:
              "One of the core engineers and owner of the tech spec (40 revisions, approved by the Architecture Review Board). Built the one-shot plan generation flow (read RFP, filter and rank inventory, build audiences, forecast, reconcile budget), re-architected the service into layered FastAPI routes, services and Redis repositories, made pre-save forecasts match the DSP exactly, and shipped Save Plan and Edit Plan across the Python agent, a Go orchestration service and the React UI. Set up Bedrock infrastructure as code, GitHub Actions and ArgoCD deploys, and fixed a production memory leak after profiling with Memray. Saves the operations team roughly 290 hours a month."
          },
          {
            name: "Geo-data migration and postal-code targeting",
            summary:
              "Led the move of all DSP geo targeting from MaxMind to Digital Element before the old contract ended, protecting around $10M in campaign revenue, then built postal-code targeting on the new data.",
            details:
              "Wrote the tech spec (44 revisions) and took it through the Architecture Review Board. Designed a new geo schema with a materialized view, ran old and new data side by side behind per-buyer feature flags, built the S3 and background-job ingestion path plus Airflow changes, updated every downstream consumer, then removed the flags and the old path."
          }
        ]
      },
      {
        title: "Software Engineer",
        period: "Aug 2022 - Dec 2024",
        items: [
          {
            name: "Authorization Service",
            summary:
              "Designed and built a shared authorization service from scratch in Go (RBAC and ABAC), serving 200+ requests per second at a p99 of about 20ms.",
            details:
              "Main implementer: schema, tenants, users, roles, grants and audit-trail APIs; merged two services into one; keyset pagination on eight list APIs; HPA autoscaling and a versioned Go client; coverage above 80%. Retired the legacy ACL system, deleting 17,419 lines in one PR, and onboarded a second product as a tenant."
          },
          {
            name: "Observability and CI/CD",
            summary:
              "Moved the DSP's metrics to Prometheus with Grafana dashboards, and rebuilt its GitHub Actions pipelines with linters, caching and parallel tests.",
            details:
              "StatsD to Prometheus migration with PromQL dashboards for latency and error rate. Added seven static-analysis linters via reviewdog, failed-test re-runs, path filters, shared caches and tests split across 8 nodes; retired Concourse and moved to self-hosted runners; added GraphQL schema checks."
          },
          {
            name: "Engineering Jam Session",
            summary:
              "Started and organized an Engineering Jam Session at Samsung Research Institute, so engineers across teams could share what they were building and learning.",
            details: "Also ran knowledge-transfer sessions on the Authorization Service, trainings on code.i (Samsung's internal coding assistant), and a talk on building a SQL agent with Snowflake Cortex."
          },
          {
            name: "Campaign pacing",
            summary:
              "Introduced custom date-based budget allocation for campaign pacing, beyond the standard pacing modes, which helped onboard new clients.",
            details: "Resume: helped onboard 10+ new clients and enabled differentiated sales offerings."
          }
        ]
      }
    ],
    beyond:
      "I review a lot of my teammates' code (about 300 pull requests so far), write design docs and runbooks, own incidents through to the postmortem, and have taken four designs through the Architecture Review Board."
  },

  // Projects built for the love of it. Add more entries here.
  projects: [
    {
      title: "Tathya Live",
      url: "https://tathya.ink",
      linkLabel: "tathya.ink",
      year: "2026",
      description:
        "Stand in a crowd on a Mumbai street at night and talk, by voice, to Mahatma Gandhi, Dr. APJ Abdul Kalam, Netaji Subhas Chandra Bose and Albert Einstein on a street stage. They answer back in real time.",
      stack: "three.js, Blender, Sarvam conversational voice AI, GSAP, Vite"
    }
  ],

  skills: {
    Languages: "Go, Python, Ruby, SQL, JavaScript, TypeScript",
    "AI & agents": "LLMs, CrewAI, LangChain, LangGraph, AWS Bedrock",
    Frameworks: "Ruby on Rails, FastAPI, React, GraphQL",
    Infrastructure: "AWS, Docker, Kubernetes, Terraform, ArgoCD, GitHub Actions",
    Observability: "Prometheus, Grafana, PagerDuty"
  },

  education: [
    {
      institution: "Maharaja Agrasen Institute of Technology, Delhi",
      degree: "B.Tech, Computer Science",
      period: "2018 - 2022",
      score: "CGPA 9.29/10"
    },
    {
      institution: "Kendriya Vidyalaya, Delhi",
      degree: "Class 12, PCM with Computer Science",
      period: "2018",
      score: "93.8%"
    }
  ],

  // Shown in the "Education and more" section.
  interests: [
    {
      title: "Off the keyboard",
      text: "I love working out, running, playing the flute and chess."
    },
    {
      title: "Hackathons and people",
      text: "I love going to hackathons in Bengaluru and networking with different folks."
    }
  ],

  leadership: [
    "Started and organized an Engineering Jam Session at Samsung Research Institute to share knowledge across teams.",
    "Ran training sessions on code.i (Samsung's internal coding assistant) and presented on building a SQL agent with Snowflake Cortex.",
    "Managed two projects with a team of two, from scoping to delivery without production issues.",
    "Ran knowledge-transfer sessions on the Authorization Service."
  ]
};
