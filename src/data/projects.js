const projects = [
  {
    id: "ecal-test-suite",
    title: "eCAL Test Suite – IPC Integration Testing",
    category: "work", // 'work' | 'study' | 'private'
    Effort: 5,
    description:
      "Automated integration tests for the eCAL IPC middleware using Docker and Robot Framework (Pub/Sub, RPC, fault scenarios, CI).",
    technologies: ["C++", "Python", "Docker", "Robot Framework", "eCAL", "GitHub Actions", "GitHub Pages"],
    links: {
      github: "https://github.com/EmirTutar/bachelor-thesis-ipc-testing",
      demo: null
    }
  },
  {
    id: "personal-site",
    title: "Personal Portfolio Website",
    category: "private",
    Effort: 5,
    description:
      "Multilingual developer portfolio (EN/DE/TR) with dark theme, routing, i18n and embedded PDF résumé, deployed via GitHub Pages.",
    technologies: ["React", "JavaScript", "CSS", "HTML", "Vite", "i18next"],
    links: {
      github: "https://github.com/EmirTutar/Portfolio",
      demo: "https://emirtutar.github.io/Portfolio/"
    }
  },
  {
    id: "rateme",
    title: "RateMe – Android Produktbewertungs-App",
    category: "study",
    Effort: 4,
    description:
      "Android-App zum Scannen von Barcodes, Anzeigen von Produktinfos und Speichern von Bewertungen in Firebase.",
    technologies: ["Android", "Java", "Firebase Auth", "Firestore", "REST-API"],
    links: {
      github: "https://github.com/EmirTutar/RateMe_AndroidApp",
      demo: null
    }
  },
  {
    id: "outdoor-planner",
    title: "Outdoor Planner – Weather-Aware Scheduler",
    category: "study",
    Effort: 2,
    description:
      "Web app that combines event planning with live weather data to support outdoor activities and avoid bad-weather appointments.",
technologies: ["Vue.js", "JavaScript", "CSS", "HTML","OpenWeatherMap API"],
    links: {
      github: "https://github.com/EmirTutar/wetterapp",
      demo: "https://outdoorplaner.netlify.app/"
    }
  },
  {
    id: "turtlebot-driving",
    title: "Autonomous Turtlebot Navigation",
    category: "study",
    Effort: 5,
    description:
      "ROS project enabling a mobile robot to autonomously navigate to predefined goals using navigation stack and costmaps.",
    technologies: ["ROS", "Python", "CMake"],
    links: {
      github: "https://github.com/EmirTutar/turtlebot_driving",
      demo: null
    }
  },
  {
    id: "patient-monitoring",
    title: "Patient Monitoring Prototype",
    category: "study",
    Effort: 5,
    description:
      "Prototype system for monitoring patients and visualising medical data, developed as part of a university project.",
    technologies: ["Java", "SQL"],
    links: {
      github: "https://github.com/EmirTutar/Patientenmonitoring",
      demo: null
    }
  },

  {
    id: "mission-fried-chicken",
    title: "Mission Fried Chicken",
    category: "study",
    Effort: 3,
    description:
      "Game project developed during studies; small gameplay prototype focused on experimenting with game mechanics and implementation.",
    technologies: [
      ["C#"],
    ],
    links: {
      github: "https://github.com/EmirTutar/MissionFriedChicken",
      demo: null
    }
  },

  {
    id: "ai-java-tests",
    title: "AI-Assisted Java Software Testing",
    category: "study",
    Effort: 4,
    description:
      "Project work on using ChatGPT to generate software tests for Java projects and evaluating the quality and efficiency of the generated tests.",
    technologies: ["LaTeX", "Java", "Software Testing", "ChatGPT"],
    links: {
      github: "https://github.com/EmirTutar/PA_KI_Softwaretests_Java",
      demo: null
    }
  },

  {
    id: "radar-game",
    title: "RadarGame – C# Game Prototype",
    category: "study",
    Effort: 4,
    description:
      "C# game prototype exploring radar-style visuals, rendering and basic game engine structures.",
    technologies: ["C#", "GLSL"],
    links: {
      github: "https://github.com/EmirTutar/RadarGame",
      demo: null
    }
  }
]

export default projects
