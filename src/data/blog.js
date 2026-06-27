export const blogPosts = [
  {
    id: 'bachelor-thesis-ecal',
    title: 'Automating IPC Middleware Tests: My Bachelor Thesis at Continental',
    date: '2025-05-10',
    readTime: 9,
    excerpt:
      'How I designed a reusable test concept for the eCAL IPC middleware using Docker, Robot Framework, and GitHub Actions — and what I learned working on a real engineering problem.',
    tags: ['testing', 'docker', 'ci/cd', 'ecal'],
    content: [
      {
        type: 'p',
        text: 'During my final semester I had the opportunity to write my bachelor thesis at Continental\'s ADC division in Lindau. The task: design a reusable automated test concept for IPC middleware, demonstrated with eCAL — an open-source middleware used for efficient data exchange between processes in automotive systems.',
      },
      { type: 'h2', text: 'The Problem' },
      {
        type: 'p',
        text: 'Modern software systems — especially in automotive — rely heavily on multiple processes communicating with each other. Ensuring this communication works correctly under all conditions (network failures, crashes, high load) is critical. But automated tests for IPC middleware didn\'t exist in a structured, reusable form for eCAL.',
      },
      { type: 'h2', text: 'What I Built' },
      {
        type: 'p',
        text: 'Over several months I designed and implemented a full automated test suite using the following stack:',
      },
      {
        type: 'ul',
        items: [
          'Docker to isolate each test case in its own reproducible container',
          'Robot Framework as the test runner and HTML report generator',
          'GitHub Actions to run all tests automatically on every push',
          'GitHub Pages to publish test results publicly',
        ],
      },
      {
        type: 'p',
        text: 'The result is a generic framework others can adapt for different middleware systems — not just eCAL.',
      },
      { type: 'h2', text: 'Key Challenges' },
      {
        type: 'p',
        text: 'The hardest part wasn\'t writing the tests themselves — it was timing. IPC communication involves inherent race conditions: a publisher might not be ready when the subscriber connects, or a crash might take an unpredictable amount of time to register. I had to design retry logic and timeout handling carefully to avoid flaky tests.',
      },
      { type: 'h2', text: 'What I Learned' },
      {
        type: 'p',
        text: 'Writing a thesis at a real company is fundamentally different from a university lab project. You\'re accountable to actual engineers, your work has to be practical and maintainable, and you need to communicate your decisions clearly in writing. That discipline has stuck with me. If you\'re curious about the technical details, the full thesis and test suite are linked in my Projects section.',
      },
    ],
  },
  {
    id: 'patient-monitoring-yolo',
    title: 'Building a Patient Monitoring System with YOLOv5 and Raspberry Pi',
    date: '2024-11-18',
    readTime: 7,
    excerpt:
      'A look at how our team used YOLOv5 fall detection, MQTT messaging, and a fleet of Raspberry Pis to build a low-cost patient monitoring prototype.',
    tags: ['python', 'iot', 'docker', 'ml'],
    content: [
      {
        type: 'p',
        text: 'For a system administration project at university, our team built a camera-based patient monitoring system that detects falls and sends real-time alerts to nursing staff. Here\'s how it came together — and what nearly broke us.',
      },
      { type: 'h2', text: 'The Architecture' },
      {
        type: 'p',
        text: 'We used off-the-shelf hardware and open-source software throughout:',
      },
      {
        type: 'ul',
        items: [
          'Raspberry Pis with cameras monitoring the bed and room from two angles',
          'YOLOv5 in a Docker container for fall detection (classes: walking, sitting, fall detected)',
          'MQTT as the central message broker between all components',
          'Matrix (open-source chat protocol) for encrypted alert messages to nursing staff',
          'Hardware alarm: LEDs + buzzer on a Raspberry Pi for local audible/visual alerts',
        ],
      },
      { type: 'h2', text: 'What Surprised Us' },
      {
        type: 'p',
        text: 'The most challenging part wasn\'t the machine learning — YOLOv5 is remarkably easy to deploy with Docker. The challenge was reliability. MQTT connections drop. Cameras disconnect. Network interruptions happen. Building the reconnection logic and health monitoring for each component turned out to be the majority of the actual work.',
      },
      {
        type: 'p',
        text: 'We also underestimated training data quality. YOLOv5 is only as good as what you train it on. A person lying in bed and a person who has fallen look very different — but only if your training images actually capture both scenarios.',
      },
      { type: 'h2', text: 'What I\'d Do Differently' },
      {
        type: 'p',
        text: 'I\'d use a message queue with persistence (like RabbitMQ) instead of plain MQTT to avoid losing alerts during network hiccups. And I\'d write integration tests from the start rather than relying on manual demos.',
      },
    ],
  },
  {
    id: 'ai-test-generation-java',
    title: 'Can ChatGPT Write Your Java Tests? We Tried It.',
    date: '2024-06-03',
    readTime: 6,
    excerpt:
      'A project seminar evaluation of using GPT-4 to generate unit, integration, and UI tests for Java applications — with honest numbers on coverage and effort.',
    tags: ['java', 'testing', 'ai'],
    content: [
      {
        type: 'p',
        text: 'For a project seminar our group spent several weeks asking GPT-4 to generate unit, integration, and UI tests for three Java applications. The results were more nuanced than the usual "AI will replace developers" narrative.',
      },
      { type: 'h2', text: 'What We Tested' },
      {
        type: 'ul',
        items: [
          'Inventory Manager — simple CRUD with JUnit unit tests',
          'Bank Manager — more complex domain logic with database integration tests',
          'Farm Product Store — a Swing desktop app requiring UI tests',
        ],
      },
      { type: 'h2', text: 'The Results' },
      {
        type: 'p',
        text: 'Unit tests: GPT-4 performed well. With clear prompts describing the class and expected behavior, it generated tests with 80–90% line coverage on the first attempt. Minor corrections (wrong import paths, method signature mismatches) needed one or two prompt iterations.',
      },
      {
        type: 'p',
        text: 'Integration tests: More mixed. The AI understood the intent but often made wrong assumptions about the database schema or test transaction handling. Coverage was lower and required significant manual revision.',
      },
      {
        type: 'p',
        text: 'UI tests: Weakest results. Swing UI testing is niche enough that the model\'s training data was thin. Many generated tests didn\'t compile. A developer with UI testing experience still needs to do most of the work here.',
      },
      { type: 'h2', text: 'What This Means in Practice' },
      {
        type: 'p',
        text: 'AI-assisted test generation is a real productivity boost for unit tests — especially for well-defined, pure functions. But it\'s not a replacement for understanding what you\'re testing. The models confidently generate wrong assertions without any warning. The skill shifts from "write the test" to "review and correct the test" — which is still a skill.',
      },
    ],
  },
  {
    id: 'first-react-app-lessons',
    title: 'Lessons From Building My First React Web App',
    date: '2024-03-22',
    readTime: 5,
    excerpt:
      'What I learned integrating a weather API, managing state with hooks, and deploying a React SPA while building the Outdoor Planner — mistakes included.',
    tags: ['react', 'web', 'api'],
    content: [
      {
        type: 'p',
        text: 'The Outdoor Planner was a simple assignment: build a single-page app combining appointment management with live weather data. It ended up teaching me more about web development than any tutorial had before.',
      },
      { type: 'h2', text: 'Lesson 1: API Integration Is Mostly Error Handling' },
      {
        type: 'p',
        text: 'Calling the OpenWeatherMap API felt straightforward at first. But dealing with rate limits, network timeouts, loading states, and error messages in a way that doesn\'t break the UI turned the "call the API" step into about 60% of the total implementation effort.',
      },
      { type: 'h2', text: 'Lesson 2: State Management Gets Complex Fast' },
      {
        type: 'p',
        text: 'I started with a single component holding all the state. By the time I had a working appointment form, a weather widget, and a list view, the data flow was hard to follow. Refactoring to lift state properly and use hooks meaningfully taught me why the patterns exist.',
      },
      { type: 'h2', text: 'Lesson 3: Responsive Design Is a Separate Discipline' },
      {
        type: 'p',
        text: 'I built the desktop view first, then tried to make it mobile-friendly at the end. The layout had baked-in assumptions that made adaptation awkward. Next project: start mobile-first.',
      },
      { type: 'h2', text: 'What I\'d Do Differently' },
      {
        type: 'p',
        text: 'Use a lightweight state manager earlier, start with sensible UI primitives, and write at least a few integration tests from day one rather than testing everything by hand.',
      },
    ],
  },
]
