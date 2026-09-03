const navLinks = [
  {
    name: "Trabajo",
    link: "#work",
  },
  {
    name: "Experiencia",
    link: "#experience",
  },
  {
    name: "Habilidades",
    link: "#skills",
  },
  {
    name: "Certificaciones",
    link: "#certifications",
  },
  {
    name: "Referencias",
    link: "#testimonials",
  },
];

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Conceptos", imgPath: "/images/concepts.svg" },
  { text: "Diseños", imgPath: "/images/designs.svg" },
  { text: "Código", imgPath: "/images/code.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Conceptos", imgPath: "/images/concepts.svg" },
  { text: "Diseños", imgPath: "/images/designs.svg" },
  { text: "Código", imgPath: "/images/code.svg" },
];

function createCounterItem(value, suffix, labelSingular, labelPlural) {
  return {
    value,
    suffix,
    label: value === 1 ? labelSingular : labelPlural,
  };
}

const counterItems = [
  createCounterItem(1, "+", "Año de experiencia", "Años de experiencia"),
  { value: 10, suffix: "+", label: "Proyectos completados" },
  { value: 5, suffix: "+", label: "Clientes satisfechos" },
  { value: 5, suffix: "#", label: "Certificaciones" },
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
    title: "Calidad de trabajo",
    desc: "Entregando resultados de alta calidad mientras mantenemos la atención a cada detalle.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Comunicación constante",
    desc: "Manteniéndote actualizado en cada paso para asegurar transparencia y claridad.",
  },
  {
    imgPath: "/images/time.png",
    title: "Tiempos de entrega",
    desc: "Asegurando que los proyectos tengan un tiempo de entrega competitivo.",
  },
];

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
    name: "React Stack",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Analisis de datos",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Desarrollo backend",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Diseñador UI/UX y 3D",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "DevOps",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    title: "Ingeniero Full Stack",
    company: "COPOWER ENERGY SOLUTIONS",
    employmentType: "Tiempo completo · Presencial",
    location: "Bucaramanga, Colombia",
    logoPath: "/images/logos/logo-copower-colombia.png",
    date: "2026 - Actualidad",
    summary:
      "Desarrollo soluciones de software para Industria 4.0 y entornos empresariales, incluyendo Cathaleia, una plataforma de monitoreo industrial en tiempo real que integra PLCs, IoT, infraestructura cloud, procesamiento de datos e inteligencia artificial, además de aplicaciones web y móviles multiplataforma.",
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
  },
  {
    title: "Especialista en Tecnología de la Información",
    company: "COPOWER ENERGY SOLUTIONS",
    employmentType: "Prácticas",
    location: "Bucaramanga, Colombia",
    logoPath: "/images/logos/logo-copower-colombia.png",
    date: "2025 - 2026",
    summary:
      "Desarrollé soluciones internas de software y automatización mientras gestionaba infraestructura tecnológica, redes, servidores, seguridad y operaciones de TI, integrando aplicaciones empresariales con Odoo y automatizando procesos de gestión de activos y mantenimiento.",
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
  },
  {
    title: "Desarrollador freelance",
    company: "8ctal · Freelance",
    logoPath: "/images/logo_8ball.png",
    date: "Enero 2025 - Actualidad",
    summary:
      "Colaboré con distintos clientes en el desarrollo de aplicaciones web y móviles personalizadas, participando en todas las etapas del ciclo de desarrollo —planificación, diseño, desarrollo, testing y despliegue— con comunicación constante para asegurar que el producto cumpliera sus expectativas.",
  },
  {
    title: "Administrador",
    company: "Cabecera",
    logoPath: "/images/logo_cabecera.png",
    date: "Junio 2024 - Diciembre 2024",
    summary:
      "Administré las operaciones diarias de un negocio local (inventario, flujo de caja, proveedores) y diseñé una aplicación móvil con Expo y un backend con Express.js para gestionar pedidos y deudas de clientes, automatizando tareas operativas clave.",
    stack: ["Expo", "React Native", "Express.js"],
  },
  {
    title: "Gerente de Marketing",
    company: "PROBELL Y&J COSMETICS",
    location: "Bucaramanga, Colombia",
    logoPath: "/images/logo_probell.png",
    date: "2022",
    summary:
      "Desarrollé campañas de marketing digital y una plataforma web para la gestión de pedidos, combinando desarrollo de software, integración de pagos y estrategia de contenido para fortalecer las operaciones digitales de la empresa.",
    stack: ["JavaScript", "React", "Node.js", "TailwindCSS", "PayU", "Meta Ads"],
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

const socialImgs = [
  {
    name: "insta",
    imgPath: "/images/insta.png",
    link: "https://www.instagram.com/8ctals/",
  },
  {
    name: "fb",
    imgPath: "/images/github.png",
    link: "https://github.com/8ctal",
  },
  {
    name: "x",
    imgPath: "/images/x.png",
    link: "https://x.com/8ctalst",
  },
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
    link: "https://www.linkedin.com/in/camilo-j-avila",
  },
];

const cvLink = "https://drive.google.com/file/d/15Cu0ZqXEN9iYkkihbnIGRqBu6FrNPFeH/view?usp=sharing";

const projects = [
  {
    id: "parchuis",
    title: "ParchUIS",
    subtitle: "ParchUIS - Comunidad educativa en un mundo digital 3D",
    description: "Una aplicación construida con Flutter, Firebase, MapBox SDK y otras herramientas de desarrollo escalables (En desarrollo).",
    imagePath: "/images/parchuis.jpg",
    technologies: ["Flutter", "Firebase", "MapBox SDK"],
    link: "https://parchuis.com/",
    featured: true,
    category: "mobile"
  },
  {
    id: "gymapp",
    title: "GymApp",
    subtitle: "Tu rutina de ejercicios siempre a mano",
    description: "Con nuestra GymApp no tendrás que recordar tu rutina de ejercicios, aquí tendrás a la mano todo lo relacionado con tu sitio de entrenamiento.",
    imagePath: "/images/gym_app_banner.png",
    technologies: ["Flutter", "Supabase"],
    link: "https://github.com/xMiguelBolano/gym_app",
    featured: true,
    category: "mobile"
  },
  {
    id: "school-admin",
    title: "School Admin",
    subtitle: "Administración educativa simplificada",
    description: "Administra fácilmente tus estudiantes y profesores en un solo lugar.",
    imagePath: "/images/school_admin_display.png",
    technologies: ["Angular", "Spring Boot", "PostgreSQL", "Docker", "AWS"],
    link: "#",
    featured: true,
    category: "web"
  },
  {
    id: "wallet-app",
    title: "Wallet App",
    subtitle: "Gestión financiera personal",
    description: "Aplicación móvil para el control de gastos y presupuestos personales.",
    imagePath: "/images/wallet_app_display.png",
    technologies: ["Redis - Upstash", "NeonDB - PostgreSQL", "Expo", "Auth - Clerk"],
    link: "https://github.com/8ctal/wallet-app",
    featured: false,
    category: "mobile"
  },
  {
    id: "style-bga",
    title: "StyleBGA",
    subtitle: "Administra tu sitio de belleza",
    description: "Una plataforma para gestionar tu negocio de belleza.",
    imagePath: "/images/stylebga_display.jpg",
    technologies: ["Java Spring Boot", "React JS", "MongoDB", "Tailwind CSS"],
    link: "https://github.com/8ctal/style_bga",
    featured: false,
    category: "web"
  },
  {
    id: "doctor_landing",
    title: "Doctor Landing",
    subtitle: "Landing page comercial",
    description: "Un sitio web para promocionar tu portafolio profesional.",
    imagePath: "/images/carlos_landing_display.png",
    technologies: ["Next.js", "Tailwind CSS", "Typescript"],
    link: "https://carlosgonzalesmedicointernista.vercel.app/",
    featured: false,
    category: "web"
  },
];

const certifications = [
  {
    title: "Bootcamp Inteligencia Artificial",
    issuer: "MinTIC",
    date: "Diciembre 2024",
    credentialId: "Ef4mLmADys",
    imgPath: "/images/logos/talento_tech_logo.png",
    description: "Certificación Inteligencia Artificial Básica. Conocimiento general de análisis de datos, python y librerías de machine learning",
    skills: ["TensorFlow", "Aprendizaje Supervisado / No supervisado", "Python", "Scikit-learn", "Pandas", "Numpy", "Seaborn", "Plotly", "Modelos de regresión - clasificación - clustering - detección de anomalías - redducción de la dimensionalidad"],
    link: "https://app.certika.co/certificate/OTU0Mjg=",
  },
  {
    title: "Machine Learning con Python",
    issuer: "Coursera IBM",
    date: "Diciembre 2024",
    credentialId: "DYL4YF5D0II0",
    imgPath: "/images/logos/imb_logo.png",
    description: "Certificación de aprendizaje de máquina con python.",
    skills: ["Dimensionality Reduction", "Scikit Learn (Machine Learning Library)", "Predictive Modeling", "Regression Analysis", "Clustering", "Anomaly Detection", "Data Visualization"],
    link: "https://coursera.org/verify/DYL4YF5D0II0",
  },
  {
    title: "Programa Oracle Next Education F2 T6 Back-end",
    issuer: "Oracle - Alura",
    date: "Julio 2024",
    credentialId: "d758ef3d-87f2-4868-ba19-ff4dd64faa7b",
    imgPath: "/images/logos/alura_logo.jpg",
    description: "Certificación en desarrollo backend con Java Orientado a Objetos, Backend SpringBoot, REST APIs, Authentication JWT",
    skills: ["Java Orientado a Objetos", "Backend SpringBoot", "REST APIs", "Authentication JWT"],
    link: "https://app.aluracursos.com/program/certificate/d758ef3d-87f2-4868-ba19-ff4dd64faa7b?lang",
  },
  {
    title: "Flutter Developer",
    issuer: "Udemy",
    date: "Junio 2025",
    credentialId: "UC-0123456789",
    imgPath: "/images/logos/udemy_logo.png",
    description: "Certificación en desarrollo de aplicaciones móviles con Flutter, incluyendo widgets, navegación, API, y testing.",
    skills: ["Flutter", "Dart", "API", "Testing", "Firebase", "Firestore", "Authentication", "Cloud Functions", "Cloud Storage", "Cloud Messaging", "Notifications", "Bloc", "Riverpod"],
    link: "https://www.udemy.com/certificate/UC-0123456789/",
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
