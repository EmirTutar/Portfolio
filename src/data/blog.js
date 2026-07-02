export const blogPosts = [
  {
    id: 'building-portfolio-with-claude-code',
    title: 'Building My Portfolio with Claude Code: What I Actually Learned',
    date: '2026-07-02',
    readTime: 8,
    cover: null,
    excerpt:
      'Started by adding a profile picture. Ended up deep inside GitHub Actions, Vite peer conflicts, i18n, and a full Timeline redesign — all with an AI pair programmer in my terminal.',
    tags: ['claude-code', 'react', 'vite', 'ai-tools', 'github-actions'],
    content: [
      {
        type: 'callout',
        text: 'Claude Code is Anthropic\'s CLI for Claude — it runs in your terminal, reads your codebase, writes and edits files, runs commands, and commits changes. Think of it as a senior developer sitting next to you who can actually touch the keyboard.',
      },
      {
        type: 'p',
        text: 'I started using Claude Code for a simple task: add a profile photo to my portfolio\'s home page with some nice animations. What followed over the next few weeks turned into one of the most educational debugging sessions I\'ve had — because things kept breaking in ways I didn\'t expect.',
      },
      { type: 'h2', text: 'The Profile Picture That Started Everything' },
      {
        type: 'p',
        text: 'The home page had a placeholder "ET" initials circle. I wanted a real photo with a floating animation and a shine effect on hover. Claude Code read the existing CSS, matched the design system (dark theme, green accent), and added three keyframe animations: avatar-enter (scale in on load), avatar-float (gentle up/down loop), and avatar-shine (a diagonal light sweep on hover).',
      },
      {
        type: 'p',
        text: 'The photo itself was tricky. Copying a file from a local path into the repo, setting the correct asset path using import.meta.env.BASE_URL for GitHub Pages — these are the kinds of environment-specific details that trip up copy-pasted tutorials. Claude Code got both right on the first attempt because it had already read the Vite config and the existing deploy workflow.',
      },
      { type: 'h2', text: 'First Crisis: Deployments Started Hanging' },
      {
        type: 'p',
        text: 'The moment I pushed the profile picture, GitHub Pages deployments that previously finished in ~1 minute started hanging for 10–11 minutes before timing out. I shared a screenshot of the Actions run history. The times told the story instantly.',
      },
      {
        type: 'callout',
        text: 'Root cause: the workflow had concurrency.cancel-in-progress: true. When two pushes happened quickly (common during active dev), the first deployment got cancelled mid-way — leaving GitHub Pages in a locked "syncing" state. The next run then had to wait for that lock to expire.',
      },
      {
        type: 'p',
        text: 'The fix was straightforward once diagnosed: set cancel-in-progress: false and add timeout-minutes: 10 so stuck deployments auto-abort instead of hanging forever. What made this hard to spot was that the bug only appeared under rapid-push conditions, not in normal single-commit deploys.',
      },
      { type: 'h2', text: 'Dependabot: Helpful Until It Breaks Your Build' },
      {
        type: 'p',
        text: 'I asked Claude Code to set up Dependabot for automated dependency updates. Simple enough — a .github/dependabot.yml with weekly npm and github-actions checks. Then I merged the first batch of Dependabot PRs without thinking.',
      },
      {
        type: 'p',
        text: 'The build immediately broke. Dependabot had jumped Vite from version 5 directly to 8, skipping v7 entirely. The problem: @vitejs/plugin-react at the installed version only declared peer support for Vite up to 7. npm refused to install.',
      },
      {
        type: 'code',
        text: 'npm error ERESOLVE unable to resolve dependency tree\n\nnpm error Found: vite@8.1.3\nnpm error node_modules/vite\nnpm error   dev vite@"^8.1.3" from the root project\n\nnpm error Could not resolve dependency:\nnpm error   peer vite@"^4.2.0 || ^5.0.0 || ^6.0.0 || ^7.0.0" from @vitejs/plugin-react@5.0.4',
      },
      {
        type: 'p',
        text: 'Fix: update @vitejs/plugin-react to its latest version which added Vite 8 support. But at the same time, react-icons had quietly renamed and removed some Simple Icons exports — SiCss3 became SiCss, and SiOracle was removed entirely. The build now failed for a second, unrelated reason. One Dependabot batch, two breaks.',
      },
      {
        type: 'callout',
        text: 'Lesson: never merge major-version Dependabot PRs without checking the changelog. And always run the local build before pushing — the CI failure told me what was wrong, but a 30-second npm run build would have caught it first.',
      },
      { type: 'h2', text: 'Redesigning the Timeline Page' },
      {
        type: 'p',
        text: 'The /timeline page was a plain card grid — functional but boring. I asked for a proper vertical timeline with filter tabs, tech tags per job, icons, and scroll animations. This was the most complex UI task of the whole project.',
      },
      {
        type: 'ul',
        items: [
          'Vertical track with a gradient green line and dot nodes per entry',
          'Filter tabs (All / Work Experience / Education) styled as a segmented control',
          'Tech tag chips under each work entry (Docker, Robot Framework, eCAL, etc.)',
          'FiBriefcase / FiBook icons on each dot node and section header',
          'Reveal component for staggered scroll animations with per-entry delays',
        ],
      },
      {
        type: 'p',
        text: 'Claude Code wrote the component, new CSS classes (ftl-*), and updated all three locale files (DE/EN/TR) simultaneously. I checked each file before committing. The translations matched, the CSS matched the design system, and the filter state logic worked on first render.',
      },
      { type: 'h2', text: 'What Working With Claude Code Actually Feels Like' },
      {
        type: 'p',
        text: 'The biggest surprise was context retention. Claude Code reads the codebase at the start and keeps that context across tool calls — so when I said "the period for ZF should include 05/2026–08/2026," it knew where in the data file to look and which translation keys to update across all three locale files without me specifying.',
      },
      {
        type: 'p',
        text: 'It also made mistakes I had to catch. Early on it added itself as a git co-author, which I did not want. It suggested using raw GitHub URLs for assets when the proper approach was import.meta.env.BASE_URL. And once it used a destructive git reset without asking first. These are real problems — AI tooling requires supervision, not trust.',
      },
      { type: 'h2', text: 'What I\'d Tell Someone Starting Out' },
      {
        type: 'ul',
        items: [
          'Run npm run build locally before pushing — CI tells you what\'s wrong, but local is faster.',
          'Read Dependabot PRs before merging. Major version bumps need a changelog check.',
          'Keep commits small and descriptive so git history stays useful as context.',
          'Don\'t approve actions you don\'t understand just because the AI suggested them.',
          'Use it for the tedious parts — updating translations across 3 locale files, writing CSS for a design system you\'ve already defined, setting up CI steps you\'ve done before.',
        ],
      },
      {
        type: 'p',
        text: 'The portfolio is now significantly better than it was three months ago — more polished UI, proper deployment stability, multilingual content, and a well-structured codebase. Claude Code was the tool that made that pace possible. But every meaningful decision still went through me.',
      },
    ],
  },
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
