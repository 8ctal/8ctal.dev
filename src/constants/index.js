// Bilingual content lives here as one authored list per topic, each entry
// carrying its language-independent fields (imgPath, link, stack, …)
// alongside an `es`/`en` sub-object for whatever actually needs translating.
// Keeping both languages on the same entry — rather than two parallel
// arrays in separate files — means there's exactly one place to add a
// project/cert/role and no risk of the two lists drifting out of sync or
// silently misaligning by index. `src/context/Language.jsx` is what turns
// these into the flat, single-language objects every component actually
// reads (via `useLanguage()`), by merging each entry's `es`/`en` half onto
// its shared fields.
//
// Section links are prefixed with "/" (not bare "#work") so they still
// resolve correctly from a route other than home — e.g. clicking "Trabajo"
// while on /blog needs to navigate back to "/" and then scroll, not just
// change the hash on whatever page is currently showing. "Blog" has no
// hash at all: it's a real route (see App.jsx), rendered as a router
// <Link> rather than a plain anchor in NavBar.jsx.
const navLinks = [
  {
    link: "/#work",
    es: { name: "Trabajo" },
    en: { name: "Work" },
  },
  {
    link: "/#experience",
    es: { name: "Experiencia" },
    en: { name: "Experience" },
  },
  {
    link: "/#skills",
    es: { name: "Habilidades" },
    en: { name: "Skills" },
  },
  {
    link: "/#certifications",
    es: { name: "Certificaciones" },
    en: { name: "Certifications" },
  },
  {
    link: "/#testimonials",
    es: { name: "Referencias" },
    en: { name: "Testimonials" },
  },
  {
    link: "/blog",
    es: { name: "Blog" },
    en: { name: "Blog" },
  },
];

const words = [
  { imgPath: "/images/ideas.svg", es: { text: "Ideas" }, en: { text: "Ideas" } },
  { imgPath: "/images/concepts.svg", es: { text: "Conceptos" }, en: { text: "Concepts" } },
  { imgPath: "/images/designs.svg", es: { text: "Diseños" }, en: { text: "Designs" } },
  { imgPath: "/images/code.svg", es: { text: "Código" }, en: { text: "Code" } },
  { imgPath: "/images/ideas.svg", es: { text: "Ideas" }, en: { text: "Ideas" } },
  { imgPath: "/images/concepts.svg", es: { text: "Conceptos" }, en: { text: "Concepts" } },
  { imgPath: "/images/designs.svg", es: { text: "Diseños" }, en: { text: "Designs" } },
  { imgPath: "/images/code.svg", es: { text: "Código" }, en: { text: "Code" } },
];

// `id` is a stable, language-independent key — StatsShowcase.jsx's iconFor()
// matches on this instead of the (translated, therefore language-dependent)
// label, so the right icon still shows up no matter which language is active.
const counterItems = [
  {
    id: "experience",
    value: 2,
    suffix: "+",
    es: { label: "Años de experiencia" },
    en: { label: "Years of experience" },
  },
  {
    id: "projects",
    value: 20,
    suffix: "+",
    es: { label: "Proyectos completados" },
    en: { label: "Completed projects" },
  },
  {
    id: "clients",
    value: 5,
    suffix: "+",
    es: { label: "Clientes satisfechos" },
    en: { label: "Satisfied clients" },
  },
  {
    id: "certifications",
    value: 8,
    suffix: "#",
    es: { label: "Certificaciones" },
    en: { label: "Certifications" },
  },
];

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.png",
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
  },
  {
    imgPath: "/images/logos/company-logo-10.png",
  },
  {
    imgPath: "/images/logos/company-logo-11.png",
  },
  {
    imgPath: "/images/logos/company-logo-12.png",
  },
  {
    imgPath: "/images/logos/company-logo-13.png",
  },
  {
    imgPath: "/images/logos/company-logo-14.png",
  },
  {
    imgPath: "/images/logos/company-logo-15.png",
  },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    es: {
      title: "Calidad de trabajo",
      desc: "Entregando resultados de alta calidad mientras mantenemos la atención a cada detalle.",
    },
    en: {
      title: "Quality of work",
      desc: "Delivering high-quality results while keeping an eye on every detail.",
    },
  },
  {
    imgPath: "/images/chat.png",
    es: {
      title: "Comunicación constante",
      desc: "Manteniéndote actualizado en cada paso para asegurar transparencia y claridad.",
    },
    en: {
      title: "Constant communication",
      desc: "Keeping you updated every step of the way to ensure transparency and clarity.",
    },
  },
  {
    imgPath: "/images/time.png",
    es: {
      title: "Tiempos de entrega",
      desc: "Asegurando que los proyectos tengan un tiempo de entrega competitivo.",
    },
    en: {
      title: "Delivery times",
      desc: "Making sure every project ships on a competitive timeline.",
    },
  },
];

// Not shown as text anywhere (TechStack.jsx's <img alt> uses techStackIcons'
// name instead) — purely descriptive metadata, so it's language-independent
// and doesn't need an es/en split.
const techStackImgs = [
  {
    name: "React Developer",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Python Developer",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Backend Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Project Manager",
    imgPath: "/images/logos/git.svg",
  },
];

const techStackIcons = [
  {
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
    es: { name: "React Stack" },
    en: { name: "React Stack" },
  },
  {
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
    es: { name: "Analisis de datos" },
    en: { name: "Data analysis" },
  },
  {
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
    es: { name: "Desarrollo backend" },
    en: { name: "Backend development" },
  },
  {
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
    es: { name: "Diseñador UI/UX y 3D" },
    en: { name: "UI/UX & 3D design" },
  },
  {
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
    es: { name: "DevOps" },
    en: { name: "DevOps" },
  },
];

const expCards = [
  {
    id: "copower-fullstack",
    company: "COPOWER ENERGY SOLUTIONS",
    location: "Bucaramanga, Colombia",
    logoPath: "/images/logos/logo-copower-colombia.png",
    stack: [
      "TypeScript",
      "Java",
      "React",
      "Next.js",
      "Flutter",
      "Expo",
      "Kafka",
      "MQTT",
      "WebSockets",
      "Modbus TCP",
      "Docker",
      "Snowflake",
      "IONOS Cloud",
    ],
    es: {
      title: "Ingeniero Full Stack",
      employmentType: "Tiempo completo · Presencial",
      date: "2026 - Actualidad",
      summary:
        "Desarrollo soluciones de software para Industria 4.0 y entornos empresariales, incluyendo Cathaleia, una plataforma de monitoreo industrial en tiempo real que integra PLCs, IoT, infraestructura cloud, procesamiento de datos e inteligencia artificial, además de aplicaciones web y móviles multiplataforma.",
    },
    en: {
      title: "Full-Stack Engineer",
      employmentType: "Full-time · On-site",
      date: "2026 - Present",
      summary:
        "I build software for Industry 4.0 and enterprise environments, including Cathaleia, a real-time industrial monitoring platform that integrates PLCs, IoT, cloud infrastructure, data processing, and artificial intelligence, plus cross-platform web and mobile applications.",
    },
  },
  {
    id: "copower-it-specialist",
    company: "COPOWER ENERGY SOLUTIONS",
    location: "Bucaramanga, Colombia",
    logoPath: "/images/logos/logo-copower-colombia.png",
    stack: [
      "TypeScript",
      "React",
      "Next.js",
      "Expo",
      "Appwrite",
      "PowerShell",
      "Fortinet",
      "Ubiquiti",
      "Proxmox",
      "Windows Server",
      "Linux",
      "Odoo",
    ],
    es: {
      title: "Especialista en Tecnología de la Información",
      employmentType: "Prácticas",
      date: "2025 - 2026",
      summary:
        "Desarrollé soluciones internas de software y automatización mientras gestionaba infraestructura tecnológica, redes, servidores, seguridad y operaciones de TI, integrando aplicaciones empresariales con Odoo y automatizando procesos de gestión de activos y mantenimiento.",
    },
    en: {
      title: "Information Technology Specialist",
      employmentType: "Internship",
      date: "2025 - 2026",
      summary:
        "I developed internal software and automation solutions while managing technology infrastructure, networks, servers, security, and IT operations, integrating business applications with Odoo and automating asset and maintenance management processes.",
    },
  },
  {
    id: "freelance",
    company: "8ctal · Freelance",
    logoPath: "/images/logo_8ball.png",
    es: {
      title: "Desarrollador freelance",
      date: "Enero 2025 - Actualidad",
      summary:
        "Colaboré con distintos clientes en el desarrollo de aplicaciones web y móviles personalizadas, participando en todas las etapas del ciclo de desarrollo —planificación, diseño, desarrollo, testing y despliegue— con comunicación constante para asegurar que el producto cumpliera sus expectativas.",
    },
    en: {
      title: "Freelance Developer",
      date: "January 2025 - Present",
      summary:
        "I collaborated with different clients on custom web and mobile applications, taking part in every stage of the development cycle — planning, design, development, testing, and deployment — with constant communication to make sure the product met their expectations.",
    },
  },
  {
    id: "cabecera",
    company: "Cabecera",
    logoPath: "/images/logo_cabecera.png",
    stack: ["Expo", "React Native", "Express.js"],
    es: {
      title: "Administrador",
      date: "Junio 2024 - Diciembre 2024",
      summary:
        "Administré las operaciones diarias de un negocio local (inventario, flujo de caja, proveedores) y diseñé una aplicación móvil con Expo y un backend con Express.js para gestionar pedidos y deudas de clientes, automatizando tareas operativas clave.",
    },
    en: {
      title: "Manager",
      date: "June 2024 - December 2024",
      summary:
        "I managed the daily operations of a local business (inventory, cash flow, suppliers) and designed a mobile app with Expo and an Express.js backend to manage orders and customer debts, automating key operational tasks.",
    },
  },
  {
    id: "probell",
    company: "PROBELL Y&J COSMETICS",
    location: "Bucaramanga, Colombia",
    logoPath: "/images/logo_probell.png",
    stack: ["JavaScript", "React", "Node.js", "TailwindCSS", "PayU", "Meta Ads"],
    es: {
      title: "Gerente de Marketing",
      date: "2022",
      summary:
        "Desarrollé campañas de marketing digital y una plataforma web para la gestión de pedidos, combinando desarrollo de software, integración de pagos y estrategia de contenido para fortalecer las operaciones digitales de la empresa.",
    },
    en: {
      title: "Marketing Manager",
      date: "2022",
      summary:
        "I developed digital marketing campaigns and a web platform for order management, combining software development, payment integration, and content strategy to strengthen the company's digital operations.",
    },
  },
];

const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/logo1.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
];

// Placeholder reviews (already English) for a section that currently just
// shows an "under construction" message instead (see Testimonials.jsx) —
// left as-is, not part of the translation pass, since nothing renders it yet.
const testimonials = [
  {
    name: "Esther Howard",
    mentions: "@estherhoward",
    review:
      "I can't say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Wade Warren",
    mentions: "@wadewarren",
    review:
      "Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Guy Hawkins",
    mentions: "@guyhawkins",
    review:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Marvin McKinney",
    mentions: "@marvinmckinney",
    review:
      "Adrian was a pleasure to work with. He turned our outdated website into a fresh, intuitive platform that's both modern and easy to navigate. Fantastic work overall.",
    imgPath: "/images/client5.png",
  },
  {
    name: "Floyd Miles",
    mentions: "@floydmiles",
    review:
      "Adrian's expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He's a true professional!",
    imgPath: "/images/client4.png",
  },
  {
    name: "Albert Flores",
    mentions: "@albertflores",
    review:
      "Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend and backend dev are top-notch.",
    imgPath: "/images/client6.png",
  },
];

// `label` is the human-readable name shown in the footer's social links
// (see SocialLinks.jsx, which renders it as clickable text) — kept apart
// from `name` since that key had drifted from what it actually links to
// (the "fb" entry has always pointed at GitHub, not Facebook) and nothing
// previously rendered `name` where that would show. `icon` picks which
// brand mark SocialLinks.jsx's hover pop-up shows (see SocialIcon.jsx) —
// this used to be a flat PNG path (`imgPath`), but those were dull single-
// color placeholders once seen at the size the pop-up renders them.
// `label` is already language-independent (brand names), so this list
// doesn't need an es/en split.
const socialImgs = [
  {
    name: "insta",
    label: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/8ctals/",
  },
  {
    name: "fb",
    label: "GitHub",
    icon: "github",
    link: "https://github.com/8ctal",
  },
  {
    name: "x",
    label: "X",
    icon: "x",
    link: "https://x.com/8ctalst",
  },
  {
    name: "linkedin",
    label: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/8ctal",
  },
];

// Two distinct hosted PDFs, not one document — the CV's own text is
// translated, not just the site around it, so the language toggle has to
// swap which file this points at instead of just relabeling one link.
const cvLink = {
  es: "https://drive.google.com/file/d/1cbg6EzOebUI2rrTt-EWJsPxFy-ArqOQ2/view?usp=sharing",
  en: "https://drive.google.com/file/d/1T2c-x4yk0BEIcLG5C5aE-66BnM5VyuUL/view?usp=sharing",
};

// Optional per-project fields, not set on anything below yet:
// - `videoPath` / `gifPath`: shown instead of `imagePath` inside the
//   project detail modal (ProjectDetailModal.jsx) when present — a video
//   wins if both are set. Drop the file in public/ and point to it with a
//   root-relative path, same as imagePath.
// - `islandColor` (mobile projects only): recolors that screenshot's
//   Dynamic Island in the iPhone frame (PhoneCarousel.jsx) — e.g. "#000"
//   for a project whose UI is itself dark, where the default light-silver
//   cutout looks out of place. Left unset, the island stays the frame's
//   default light color.
const projects = [
  {
    id: "copower_pr_elec",
    title: "Copower Pruebas Eléctricas",
    imagePath: "/images/projects/web/copower_pr_elec.jpg",
    technologies: ["NextJS", "PostgreSQL", "FastAPI", "IonosCloud"],
    link: "#",
    featured: true,
    category: "web",
    es: {
      subtitle: "Pruebas Eléctricas - Automatiza la generación de documentos de tus pruebas eléctricas",
      description:
        "Una plataforma construida con NextJS, Python, FastAPI y hosteada con IonosCloud que permite con ayuda de algoritmos deterministas y machine learning automatizar la generación de documentos del departamento Pruebas Eléctricas de la empresa asociada Copower",
    },
    en: {
      subtitle: "Electrical Testing - Automates document generation for your electrical tests",
      description:
        "A platform built with Next.js, Python, and FastAPI, hosted on IonosCloud, that uses deterministic algorithms and machine learning to automate document generation for partner company Copower's Electrical Testing department.",
    },
  },
  {
    id: "camos_digital",
    title: "CAMOS DIGITAL",
    imagePath: "/images/projects/web/camos_digital_hero.png",
    technologies: ["NextJS", "ShadCN", "ThreeJS", "GSap"],
    link: "https://camosdigital.com/",
    featured: true,
    category: "web",
    es: {
      subtitle: "CAMOS DIGITAL - Agencia creativa especializada en publicidad, diseño y SEO",
      description: "Una landing para una agencia dedicada a la asesoría de marca y crecimiento digital",
    },
    en: {
      subtitle: "CAMOS DIGITAL - Creative agency specializing in advertising, design, and SEO",
      description: "A landing page for an agency dedicated to brand consulting and digital growth.",
    },
  },
  {
    id: "parchuis",
    title: "ParchUIS",
    imagePath: "/images/parchuis.jpg",
    technologies: ["Flutter", "Firebase", "MapBox SDK"],
    link: "https://parchuis.com/",
    featured: true,
    category: "mobile",
    es: {
      subtitle: "ParchUIS - Comunidad educativa en un mundo digital 3D",
      description:
        "Una aplicación construida con Flutter, Firebase, MapBox SDK y otras herramientas de desarrollo escalables (En desarrollo).",
    },
    en: {
      subtitle: "ParchUIS - An educational community in a 3D digital world",
      description: "An app built with Flutter, Firebase, MapBox SDK, and other scalable development tools (in progress).",
    },
  },
  {
    id: "tribe_app",
    title: "Tribe App",
    imagePath: "/images/projects/mobile/meta_tribe_model.jpg",
    technologies: ["StreamLit", "Python", "Cloudflare"],
    link: "#",
    featured: true,
    category: "mobile",
    islandColor: "#000",
    es: {
      subtitle: "Tribe model - Conoce qué tan viral se hará tu contenido con estímulos cerebrales reales",
      description:
        "Una plataforma construída en base al modelo Tribe de Meta que permite identificar patrones reales en un cerebro humano respecto al contenido que consume, así el usuario puede subir su propio contenido y determinar qué estímulo tendrá en quien lo consuma",
    },
    en: {
      subtitle: "Tribe model - Find out how viral your content will get using real brain-response stimuli",
      description:
        "A platform built on Meta's Tribe model that identifies real patterns in the human brain in response to the content it consumes, letting users upload their own content and see what response it's likely to trigger in whoever views it.",
    },
  },
  {
    id: "gymapp",
    title: "GymApp",
    imagePath: "/images/projects/mobile/gym_app.png",
    technologies: ["Flutter", "Supabase"],
    link: "https://github.com/xMiguelBolano/gym_app",
    featured: true,
    category: "mobile",
    islandColor: "#000",
    es: {
      subtitle: "Tu rutina de ejercicios siempre a mano",
      description:
        "Con nuestra GymApp no tendrás que recordar tu rutina de ejercicios, aquí tendrás a la mano todo lo relacionado con tu sitio de entrenamiento.",
    },
    en: {
      subtitle: "Your workout routine, always at hand",
      description: "With GymApp you'll never have to memorize your workout routine again — everything about your training is right at hand.",
    },
  },
  {
    id: "school-admin",
    title: "School Admin",
    imagePath: "/images/projects/web/school_admin.png",
    technologies: ["Angular", "Spring Boot", "PostgreSQL", "Docker", "AWS"],
    link: "#",
    featured: true,
    category: "web",
    es: {
      subtitle: "Administración educativa simplificada",
      description: "Administra fácilmente tus estudiantes y profesores en un solo lugar.",
    },
    en: {
      subtitle: "Simplified school administration",
      description: "Easily manage your students and teachers in one place.",
    },
  },
  {
    id: "wallet-app",
    title: "Wallet App",
    imagePath: "/images/projects/mobile/wallet_app.png",
    technologies: ["Redis - Upstash", "NeonDB - PostgreSQL", "Expo", "Auth - Clerk"],
    link: "https://github.com/8ctal/wallet-app",
    featured: false,
    category: "mobile",
    es: {
      subtitle: "Gestión financiera personal",
      description: "Aplicación móvil para el control de gastos y presupuestos personales.",
    },
    en: {
      subtitle: "Personal finance management",
      description: "A mobile app for tracking personal expenses and budgets.",
    },
  },
  {
    id: "style-bga",
    title: "StyleBGA",
    imagePath: "/images/projects/web/stylebga_display.png",
    technologies: ["Java Spring Boot", "React JS", "MongoDB", "Tailwind CSS"],
    link: "https://github.com/8ctal/style_bga",
    featured: false,
    category: "web",
    es: {
      subtitle: "Administra tu sitio de belleza",
      description: "Una plataforma para gestionar tu negocio de belleza.",
    },
    en: {
      subtitle: "Manage your beauty business",
      description: "A platform for managing your beauty business.",
    },
  },
  {
    id: "doctor_landing",
    title: "Doctor Landing",
    imagePath: "/images/carlos_landing_display.png",
    technologies: ["Next.js", "Tailwind CSS", "Typescript"],
    link: "https://carlosgonzalesmedicointernista.vercel.app/",
    featured: false,
    category: "web",
    es: {
      subtitle: "Landing page comercial",
      description: "Un sitio web para promocionar tu portafolio profesional.",
    },
    en: {
      subtitle: "Commercial landing page",
      description: "A website to showcase your professional portfolio.",
    },
  },
];

const certifications = [
  {
    issuer: "MinTIC",
    credentialId: "Ef4mLmADys",
    imgPath: "/images/logos/talento_tech_logo.png",
    link: "https://app.certika.co/certificate/OTU0Mjg=",
    es: {
      title: "Bootcamp Inteligencia Artificial",
      date: "Diciembre 2024",
      description:
        "Certificación Inteligencia Artificial Básica. Conocimiento general de análisis de datos, python y librerías de machine learning",
      skills: [
        "TensorFlow",
        "Aprendizaje Supervisado / No supervisado",
        "Python",
        "Scikit-learn",
        "Pandas",
        "Numpy",
        "Seaborn",
        "Plotly",
        "Modelos de regresión - clasificación - clustering - detección de anomalías - redducción de la dimensionalidad",
      ],
    },
    en: {
      title: "Artificial Intelligence Bootcamp",
      date: "December 2024",
      description: "Basic Artificial Intelligence certification. General knowledge of data analysis, Python, and machine learning libraries.",
      skills: [
        "TensorFlow",
        "Supervised / Unsupervised Learning",
        "Python",
        "Scikit-learn",
        "Pandas",
        "Numpy",
        "Seaborn",
        "Plotly",
        "Regression - classification - clustering - anomaly detection - dimensionality reduction models",
      ],
    },
  },
  {
    issuer: "Coursera IBM",
    credentialId: "DYL4YF5D0II0",
    imgPath: "/images/logos/imb_logo.png",
    link: "https://coursera.org/verify/DYL4YF5D0II0",
    es: {
      title: "Machine Learning con Python",
      date: "Diciembre 2024",
      description: "Certificación de aprendizaje de máquina con python.",
      skills: [
        "Dimensionality Reduction",
        "Scikit Learn (Machine Learning Library)",
        "Predictive Modeling",
        "Regression Analysis",
        "Clustering",
        "Anomaly Detection",
        "Data Visualization",
      ],
    },
    en: {
      title: "Machine Learning with Python",
      date: "December 2024",
      description: "Machine learning certification using Python.",
      skills: [
        "Dimensionality Reduction",
        "Scikit Learn (Machine Learning Library)",
        "Predictive Modeling",
        "Regression Analysis",
        "Clustering",
        "Anomaly Detection",
        "Data Visualization",
      ],
    },
  },
  {
    issuer: "Oracle - Alura",
    credentialId: "d758ef3d-87f2-4868-ba19-ff4dd64faa7b",
    imgPath: "/images/logos/alura_logo.jpg",
    link: "https://app.aluracursos.com/program/certificate/d758ef3d-87f2-4868-ba19-ff4dd64faa7b?lang",
    es: {
      title: "Programa Oracle Next Education F2 T6 Back-end",
      date: "Julio 2024",
      description: "Certificación en desarrollo backend con Java Orientado a Objetos, Backend SpringBoot, REST APIs, Authentication JWT",
      skills: ["Java Orientado a Objetos", "Backend SpringBoot", "REST APIs", "Authentication JWT"],
    },
    en: {
      title: "Oracle Next Education Program F2 T6 Back-end",
      date: "July 2024",
      description: "Backend development certification covering Object-Oriented Java, Spring Boot backends, REST APIs, and JWT authentication.",
      skills: ["Object-Oriented Java", "Spring Boot Backend", "REST APIs", "JWT Authentication"],
    },
  },
  {
    issuer: "Udemy",
    credentialId: "UC-0123456789",
    imgPath: "/images/logos/udemy_logo.png",
    link: "https://www.udemy.com/certificate/UC-0123456789/",
    es: {
      title: "Flutter Developer",
      date: "Junio 2025",
      description: "Certificación en desarrollo de aplicaciones móviles con Flutter, incluyendo widgets, navegación, API, y testing.",
      skills: ["Flutter", "Dart", "API", "Testing", "Firebase", "Firestore", "Authentication", "Cloud Functions", "Cloud Storage", "Cloud Messaging", "Notifications", "Bloc", "Riverpod"],
    },
    en: {
      title: "Flutter Developer",
      date: "June 2025",
      description: "Mobile app development certification with Flutter, covering widgets, navigation, APIs, and testing.",
      skills: ["Flutter", "Dart", "API", "Testing", "Firebase", "Firestore", "Authentication", "Cloud Functions", "Cloud Storage", "Cloud Messaging", "Notifications", "Bloc", "Riverpod"],
    },
  },
  // No `credentialId` on these two: they link straight to the certificate
  // PDF rather than to a verification-code page like the others above, so
  // there's no separate ID to show — CertificationStack.jsx only renders
  // the "ID: …" line when credentialId is actually set.
  {
    issuer: "SENA",
    imgPath: "/images/logos/sena_logo.svg",
    link: "https://drive.google.com/file/d/1x2bwtV5p9TNzC-oPKEq-YOxbyzx2vUhL/view?usp=sharing",
    es: {
      title: "Calidad en el Desarrollo de Software",
      date: "Agosto 2026",
      description:
        "Certificación SENA en aseguramiento de calidad para el desarrollo de software, incluyendo estándares ISO, gestión de requerimientos y control de versiones.",
      skills: ["Estándares ISO", "Requerimientos", "Versionado"],
    },
    en: {
      title: "Software Development Quality",
      date: "August 2026",
      description: "SENA certification in software quality assurance, covering ISO standards, requirements management, and version control.",
      skills: ["ISO Standards", "Requirements", "Version Control"],
    },
  },
  {
    issuer: "SENA",
    imgPath: "/images/logos/sena_logo.svg",
    link: "https://drive.google.com/file/d/1bFjiet5L853e9_FM-nwQWDU9rR4fBTx4/view?usp=sharing",
    es: {
      title: "Diseño de Soluciones de Internet de las Cosas",
      date: "Agosto 2026",
      description:
        "Certificación SENA en diseño de soluciones IoT, incluyendo comunicación en tiempo real con WebSocket y MQTT, y procesamiento de eventos con Apache Kafka.",
      skills: ["IoT", "WebSocket", "MQTT", "Apache Kafka"],
    },
    en: {
      title: "Internet of Things Solutions Design",
      date: "August 2026",
      description: "SENA certification in designing IoT solutions, including real-time communication with WebSocket and MQTT, and event processing with Apache Kafka.",
      skills: ["IoT", "WebSocket", "MQTT", "Apache Kafka"],
    },
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
  certifications,
  cvLink,
  projects,
};
