/*
 * Site configuration — edit your details here.
 * Every contact link and skill on the page is generated from this file.
 */
window.PORTFOLIO_CONFIG = {
  name: "Kartheek Tambi",
  quote: "I am expanding my capabilities.",

  // Profile photo. Replace the file (or change the path). If it is missing,
  // a "KT" monogram is shown instead.
  profileImage: "assets/profile.jpg",
  // Which part of the photo stays visible inside the circle ("x% y%").
  // Lower the second value to move the crop up (e.g. "50% 30%" for tall photos).
  profileImagePosition: "50% 50%",

  contact: {
    email: "kartheektambi2@gmail.com",
    // Phone in international format. Used for tel: and WhatsApp links.
    phone: "+91-9182490868",
    github: "https://github.com/kartheektambi2005",
    linkedin: "https://www.linkedin.com/in/kartheektambi",
    // Set to false to hide the WhatsApp card.
    showWhatsApp: true
  },

  // Skill groups shown in the Skills section. Add, remove or rename freely.
  skillGroups: [
    {
      title: "Programming & backend",
      icon: "code",
      skills: ["Python", "FastAPI", "MySQL"]
    },
    {
      title: "Web development",
      icon: "layout",
      skills: ["HTML", "CSS", "JavaScript", "React.js", "Bootstrap"]
    },
    {
      title: "Tools & infrastructure",
      icon: "box",
      skills: ["Docker", "Git", "GitHub"]
    },
    {
      title: "AI development",
      icon: "spark",
      skills: ["AI development tools"],
      note: "Experience working with AI development tools in my workflow."
    }
  ]
};
