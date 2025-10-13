const projects = [
  {
    id: "ecal-test-framework",
    title: "eCAL Integration Test Suite",
    category: "work", // 'work' | 'study' | 'private'
    description: "Docker- & Robot-Framework-basierte Tests (Publish/Subscribe, RPC, Fault Injection).",
    technologies: ["C++", "Docker", "Robot Framework", "eCAL", "GitHub Actions"],
    links: {
      github: "https://github.com/EmirTutar",
      demo: null
    }
  },
  {
    id: "foxglove-panels",
    title: "Custom Foxglove Panels",
    category: "work",
    description: "Indikatoren & Visualisierung für Sensorstatus (ARS542/SRR630), Live-Data in eCAL.",
    technologies: ["TypeScript", "Foxglove", "eCAL"],
    links: { github: "https://github.com/EmirTutar", demo: null }
  },
  {
    id: "scheduler-comparison",
    title: "Cyclic Scheduler V1–V3",
    category: "study",
    description: "Performancevergleiche (CPU-Last, Frequenz), Replay/Live-Mode, eCAL Time.",
    technologies: ["C++", "CMake", "eCAL"],
    links: { github: "https://github.com/EmirTutar", demo: null }
  },
  {
    id: "personal-site",
    title: "Persönliche Portfolio-Webseite",
    category: "private",
    description: "Mehrsprachig (DE/EN/TR), Dark Theme, PDF-Embed, GitHub Pages.",
    technologies: ["React", "Vite", "i18next", "React Router"],
    links: { github: null, demo: null }
  }
]

export default projects
