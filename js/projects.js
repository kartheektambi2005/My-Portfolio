/*
 * Project data — the Projects section is rendered from this array.
 *
 * To add a project: copy one object, change its fields, put the image in
 * assets/, and reload the page. No HTML changes needed.
 *
 *   title        (required) Project name
 *   description  (required) One or two sentences
 *   technologies (required) Array of strings — also used for the filter buttons
 *   image        (optional) Path to a thumbnail, e.g. "assets/my-project.jpg"
 *   githubUrl    (optional) Repository URL — button hidden if empty
 *   liveDemoUrl  (optional) Live demo URL — button hidden if empty
 *   featured     (optional) true shows a "Featured" badge and lists it first
 */
window.PROJECTS = [
  {
    title: "ShopHub — E-commerce Website",
    description: "An e-commerce website project built with React.js.",
    technologies: ["React.js"],
    image: "assets/shophub.jpg",
    githubUrl: "https://github.com/kartheektambi2005/shop-hub-ecommerce",
    liveDemoUrl: "https://shophub-market.netlify.app/",
    featured: true
  },
  {
    title: "Villa Website",
    description: "A responsive static website created to explore web development and responsive layouts.",
    technologies: ["HTML", "CSS", "Bootstrap"],
    image: "assets/villa.jpg",
    githubUrl: "https://github.com/kartheektambi2005/villa-real-estate",
    liveDemoUrl: "https://kartheektambi2005.github.io/villa-real-estate/",
    featured: false
  },
  {
    title: "GitHub Agent",
    description: "A Python automation project designed to simplify uploading projects to GitHub repositories and reduce repetitive manual effort.",
    technologies: ["Python"],
    image: "assets/github-agent.jpg",
    githubUrl: "https://github.com/kartheektambi2005/GitSync-AI",
    liveDemoUrl: "",
    featured: false
  },
  {
    title: "Donark AI — Android AI Assistant",
    description: "An Android assistant project designed to provide voice-based interaction and help users perform phone tasks using AI.",
    technologies: ["Kotlin", "Jetpack Compose", "Gemini API", "Android Speech Recognition", "Text-to-Speech"],
    image: "assets/donark-ai.jpg",
    githubUrl: "https://github.com/kartheektambi2005/DONARK-AI-Android-assistant",
    liveDemoUrl: "",
    featured: true
  }
];
