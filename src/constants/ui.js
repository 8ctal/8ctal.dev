// Every hardcoded, non-content UI string on the site (nav labels, buttons,
// form copy, aria-labels, the boot sequence's terminal text, …) — as
// distinct from constants/index.js and constants/blog.js, which hold the
// bilingual *content* (projects, experience, posts). Read via `t` from
// `useLanguage()` (see src/context/Language.jsx), e.g. `t.contact.send`.
// A couple of entries are functions instead of plain strings where the
// string needs to interpolate a value that's itself already been localized
// (e.g. a company name) — kept to the few spots that actually need it,
// not a general templating mechanism.
export const ui = {
  es: {
    nav: {
      logoLabel: "8ctal — volver al inicio",
      contact: "Contáctame",
      reduceMotion: "Reducir animaciones",
      enableMotion: "Activar animaciones",
      motionActive: "Animaciones activas",
      motionReduced: "Animaciones reducidas",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      navigation: "Navegación",
    },
    hero: {
      titlePrefix: "Convirtiendo",
      titleLine1: "en proyectos reales",
      titleLine2: "que dan resultados",
      greeting1: "¡Hola! Soy Camilo un ingeniero de software Colombiano",
      greeting2: "Apasionado por la creación de experiencias digitales",
      cta: "Mira mi trabajo",
    },
    showcase: {
      title: "Mi Trabajo",
      sub: "Proyectos que he construido",
      mobileApps: "Apps móviles",
      viewDetails: "Ver detalles",
      viewProject: "Ver proyecto",
    },
    experience: {
      title: "Experiencia Profesional",
      sub: "Mi trayectoria a lo largo de los años",
      logoAlt: (company) => `Logo de ${company}`,
    },
    skills: {
      show: (label) => `Ver ${label}`,
      hide: (label) => `Ocultar ${label}`,
    },
    certifications: {
      title: "Certificaciones",
      sub: "Credenciales que validan mi experiencia",
      skillsLabel: "habilidades certificadas",
      verify: "Verificar certificación",
      swipeHint: "Desliza para ver más",
      previous: "Certificación anterior",
      next: "Siguiente certificación",
    },
    techStack: {
      title: "Habilidades clave y tecnologías",
      sub: "Lo que puedo aportar",
    },
    testimonials: {
      title: "¿Que dicen de mí?",
      sub: "Opiniones de mis clientes",
      underConstruction: "En construcción...",
    },
    thoughts: {
      title: "Pensamientos recientes",
      sub: "Notas sobre el oficio",
      readSuffix: "de lectura",
      viewAll: "Ver todos los posts",
    },
    contact: {
      title: "Contáctame",
      sub: "¿Tienes preguntas o ideas? ¡Házmelo saber!",
      nameLabel: "Tu nombre",
      namePlaceholder: "¿Cuál es tu nombre?",
      emailLabel: "Tu correo",
      emailPlaceholder: "¿Cuál es tu correo electrónico?",
      messageLabel: "Tu mensaje",
      messagePlaceholder: "¿Cómo puedo ayudarte?",
      sending: "Enviando...",
      send: "Enviar mensaje",
    },
    blog: {
      indexTitle: "Blog",
      indexSub: "Todos los posts",
      readSuffix: "de lectura",
      empty: "Todavía no hay posts publicados.",
      notFoundTitle: "Post no encontrado",
      notFoundBody: "Puede que el enlace esté roto o el post ya no exista.",
      backToBlog: "Volver al blog",
      allPosts: "Todos los posts",
      morePosts: "Ver más posts",
    },
    cv: {
      download: "Descargar CV",
    },
    carousel: {
      region: "Carrusel de capturas de la app",
      previous: "Imagen anterior",
      next: "Siguiente imagen",
      pause: "Pausar",
      resume: "Reanudar",
    },
    cardStack: {
      goTo: (title) => `Ir a ${title}`,
      openLink: "Abrir enlace",
      noImage: "Sin imagen",
    },
    projectModal: {
      close: "Cerrar detalles del proyecto",
      viewLive: "Ver proyecto en vivo",
    },
    boot: {
      statuses: ["inicializando interfaz", "cargando modelo 3d", "calibrando la cámara", "abriendo el portafolio"],
      ready: "listo",
      eyebrow: "8ctal — portafolio",
      annotation: "secuencia de arranque",
    },
    footer: {
      rights: "Todos los derechos reservados.",
    },
  },
  en: {
    nav: {
      logoLabel: "8ctal — back to home",
      contact: "Contact me",
      reduceMotion: "Reduce animations",
      enableMotion: "Enable animations",
      motionActive: "Animations on",
      motionReduced: "Animations reduced",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      navigation: "Navigation",
    },
    hero: {
      titlePrefix: "Turning",
      titleLine1: "into real projects",
      titleLine2: "that deliver results",
      greeting1: "Hi! I'm Camilo, a Colombian software engineer",
      greeting2: "Passionate about creating digital experiences",
      cta: "See my work",
    },
    showcase: {
      title: "My Work",
      sub: "Projects I've built",
      mobileApps: "Mobile apps",
      viewDetails: "View details",
      viewProject: "View project",
    },
    experience: {
      title: "Professional Experience",
      sub: "My journey over the years",
      logoAlt: (company) => `${company} logo`,
    },
    skills: {
      show: (label) => `Show ${label}`,
      hide: (label) => `Hide ${label}`,
    },
    certifications: {
      title: "Certifications",
      sub: "Credentials that validate my experience",
      skillsLabel: "certified skills",
      verify: "Verify certification",
      swipeHint: "Swipe to see more",
      previous: "Previous certification",
      next: "Next certification",
    },
    techStack: {
      title: "Key skills & technologies",
      sub: "What I bring to the table",
    },
    testimonials: {
      title: "What do people say about me?",
      sub: "Reviews from my clients",
      underConstruction: "Under construction...",
    },
    thoughts: {
      title: "Recent thoughts",
      sub: "Notes on the craft",
      readSuffix: "read",
      viewAll: "See all posts",
    },
    contact: {
      title: "Contact me",
      sub: "Have questions or ideas? Let me know!",
      nameLabel: "Your name",
      namePlaceholder: "What's your name?",
      emailLabel: "Your email",
      emailPlaceholder: "What's your email address?",
      messageLabel: "Your message",
      messagePlaceholder: "How can I help you?",
      sending: "Sending...",
      send: "Send message",
    },
    blog: {
      indexTitle: "Blog",
      indexSub: "All posts",
      readSuffix: "read",
      empty: "No posts published yet.",
      notFoundTitle: "Post not found",
      notFoundBody: "The link may be broken or the post no longer exists.",
      backToBlog: "Back to blog",
      allPosts: "All posts",
      morePosts: "See more posts",
    },
    cv: {
      download: "Download CV",
    },
    carousel: {
      region: "App screenshot carousel",
      previous: "Previous image",
      next: "Next image",
      pause: "Pause",
      resume: "Resume",
    },
    cardStack: {
      goTo: (title) => `Go to ${title}`,
      openLink: "Open link",
      noImage: "No image",
    },
    projectModal: {
      close: "Close project details",
      viewLive: "View live project",
    },
    boot: {
      statuses: ["initializing interface", "loading 3d model", "calibrating the camera", "opening the portfolio"],
      ready: "ready",
      eyebrow: "8ctal — portfolio",
      annotation: "boot sequence",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
};

export default ui;
