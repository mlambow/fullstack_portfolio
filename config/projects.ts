const portfolioProjects = [
    {
        id: "p-01",
        title: "FlowState Task Engine",
        description: "An enterprise workflow and task management system featuring custom role-based access control, strict state-machine validation, and a high-performance workspace interface. Built with FastAPI (Python) for a scalable REST API, React for a responsive frontend, Tailwind CSS for modern, utility-first styling, PostgreSQL for reliable data persistence, and Docker for consistent development and deployment environments.",
        tags: ["react", "fastapi", "postgresql", "docker"],
        githubUrl: "https://github.com/mlambow/workflow",
        liveUrl: "https://flowstate.yourdomain.com",
        isHot: true
    },
    {
        id: "p-02",
        title: "VoxLib PDF Audio Converter",
        description: "A private, 100% offline text-to-speech rendering utility. Built to extract layered document data into cleanly paced audio sequences without internet dependencies or cloud processing telemetry.",
        tags: ["python", "react", "tailwind_css", "local_tts"],
        githubUrl: "https://github.com/yourusername/voxlib-converter",
        isHot: true
    },
    {
        id: "p-03",
        title: "Orion Cache Layer",
        description: "A secondary, lightweight analytical middleware built to intercept high-volume web service pools and cache metrics directly into a sharded data container layout.",
        tags: ["django", "postgres", "redis", "ci_cd"],
        githubUrl: "https://github.com/yourusername/orion-cache",
        liveUrl: "https://orion.yourdomain.com",
        isHot: false
    },
    {
        id: "p-04",
        title: "Social Media Api",
        description: "A production-ready RESTful social media backend built with Node.js, Express, and MongoDB. The API supports secure user authentication, profile management, posts, comments, likes, and social interactions through a clean, scalable architecture. Security features include JWT authentication, password hashing, request validation, rate limiting, and centralized error handling. Designed with maintainability in mind, the project follows REST principles and modular design patterns, making it easy to extend with additional features and third-party integrations.",
        tags: ["nodejs", "express", "mongodb", "docker"],
        githubUrl: "https://github.com/mlambow/social_media_api",
        isHot: false
    }
];

export default portfolioProjects;