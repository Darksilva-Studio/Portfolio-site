/* ==========================================================
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO GROW YOUR SITE
   ==========================================================

   1) Change SITE to your own details.
   2) Each object in CATEGORIES becomes a TAB in the menu.
      -> To add a new skill/tab, copy a whole { ... } block
         and change id, label, description and items.
   3) Inside a tab, give items a "tag" (e.g. "Modeling").
      Tags automatically become filter buttons (subcategories).

   ITEM TYPES
   ----------
   image     -> { type:"image",   src:"assets/blender/chair.jpg" }
   video     -> { type:"video",   src:"assets/blender/turntable.mp4" }   (small mp4 files)
   youtube   -> { type:"youtube", id:"dQw4w9WgXcQ" }                      (the part after v=)
   sketchfab -> { type:"sketchfab", id:"your-model-id" }                  (3D viewer embed)

   OPTIONAL FIELDS on any item
   ---------------------------
   description : "Short text under the title"
   date        : "2026-11"
   tools       : ["Blender 4.2", "Cycles", "Substance Painter"]
   download    : "assets/blender/chair.blend"   (shows a download button, good proof of work!)
   ========================================================== */

const SITE = {
  name: "Your Name",
  tagline: "3D Artist & Lifelong Learner",
  about:
    "I'm learning and building skills in public. This portfolio shows proof of my work, starting with Blender 3D. More skills are coming.",
  links: [
    { label: "GitHub",   url: "https://github.com/Darksilva-Studio" },
    { label: "ArtStation", url: "#" },
    { label: "Email",    url: "uchebruno52@gmail.com" }
  ]
};

const CATEGORIES = [
  {
    id: "blender",
    label: "Blender 3D",
    description: "Renders, wireframes, timelapses and source files from my Blender work.",
    items: [
      {
        title: "Low-poly Chair",
        tag: "Modeling",
        type: "image",
        src: "assets/blender/chair-render.jpg",
        description: "Final Cycles render.",
        date: "2026-11",
        tools: ["Blender", "Cycles"],
        download: "#"
      },
      {
        title: "Low-poly Chair: Wireframe",
        tag: "Modeling",
        type: "image",
        src: "assets/blender/chair-wireframe.jpg",
        description: "Clean topology proof.",
        date: "2026-11",
        tools: ["Blender"]
      },
      {
        title: "Donut Texturing",
        tag: "Texturing",
        type: "image",
        src: "assets/blender/donut.jpg",
        description: "Procedural shaders only, no image textures.",
        tools: ["Blender", "Shader Nodes"]
      },
      {
        title: "Bouncing Ball Animation",
        tag: "Animation",
        type: "video",
        src: "assets/blender/bounce.mp4",
        description: "Squash and stretch practice.",
        tools: ["Blender", "EEVEE"]
      }
    ]
  }

  /* ---------- EXAMPLE: HOW TO ADD A NEW TAB ----------
     Remove the comment markers and add a comma after the Blender block above.

  ,{
    id: "web",                       // short, lowercase, no spaces (used in the URL: #web)
    label: "Web Development",        // text shown on the tab
    description: "Sites and apps I've built.",
    items: [
      {
        title: "My First Landing Page",
        tag: "HTML/CSS",
        type: "image",
        src: "assets/web/landing.png",
        description: "Built from scratch.",
        download: "https://github.com/your-username/landing-page"
      }
    ]
  }
  --------------------------------------------------- */
];
