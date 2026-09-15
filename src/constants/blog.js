// Blog content — plain data here rather than Markdown/MDX files, matching
// this project's existing convention (constants/index.js is the single
// source of truth for every other section's content too; see CLAUDE.md).
//
// These three posts are a placeholder scaffold, not real published writing
// — they exist so /blog and /blog/:slug have something real to render and
// to show the shape each entry needs. Replace `body` (an array of
// paragraph strings — no Markdown parser is wired up, so keep formatting to
// plain paragraphs) with actual posts, or trim this list to none once real
// ones exist.
//
// `icon` names a lucide-react icon (see BlogIndex.jsx/BlogPost.jsx) used
// as each post's marker instead of a photo — there's no real cover image
// for a post that doesn't exist yet, and a stock/found photo standing in
// for one would misrepresent it as more finished than it is.
export const blogPosts = [
    {
        slug: "monitoreo-industrial-tiempo-real",
        title: "Lo que aprendí construyendo monitoreo industrial en tiempo real",
        excerpt:
            "Integrar PLCs, MQTT y Kafka con una interfaz que un operador de planta pueda leer de un vistazo, sin perder ni un dato en el camino.",
        date: "Marzo 2026",
        dateISO: "2026-03-01",
        readTime: "6 min",
        icon: "Activity",
        body: [
            "Cuando empecé a trabajar en Cathaleia, la plataforma de monitoreo industrial que desarrollamos en Copower, mi primer instinto fue tratar cada sensor como una fila más en una base de datos. Funcionó exactamente hasta el primer corte de red en planta: los datos llegaban desordenados, duplicados, o no llegaban.",
            "Lo que terminó funcionando fue tratar cada dispositivo como una fuente de eventos, no de estado. MQTT para la telemetría de campo, Kafka como bitácora inmutable en el medio, y una capa de agregación que reconstruye el estado \"actual\" a partir de esa bitácora en vez de sobrescribirlo directamente. Si algo se cae, se reproduce desde donde se quedó — no se pierde ni se duplica.",
            "La otra mitad del problema fue la interfaz. Un operador de planta no tiene tiempo de interpretar un dashboard de métricas genéricas; necesita saber, en dos segundos, si algo está fuera de rango y qué hacer al respecto. Eso significó menos gráficas y más semáforos, umbrales configurables por línea de producción, y alertas que se agrupan en vez de bombardear.",
            "Todavía hay mucho por mejorar — sobre todo en cómo comunicamos degradación parcial de servicio sin generar pánico innecesario — pero el principio que me llevo es simple: en sistemas industriales, la resiliencia del dato importa tanto como la claridad de quien lo lee.",
        ],
    },
    {
        slug: "flutter-firebase-parchuis",
        title: "Construir una comunidad en un mapa 3D con Flutter y Firebase",
        excerpt:
            "ParchUIS mezcla mapas, tiempo real y una identidad visual muy específica — algunas notas sobre cómo se sostiene eso en producción.",
        date: "Enero 2026",
        dateISO: "2026-01-15",
        readTime: "5 min",
        icon: "MapPin",
        body: [
            "ParchUIS nació de una pregunta simple: ¿cómo se ve una comunidad universitaria en un mapa? La respuesta que elegimos fue MapBox SDK sobre Flutter, con Firebase manejando autenticación y estado en tiempo real — una combinación cómoda hasta que el número de marcadores en pantalla empezó a crecer.",
            "La lección más útil ahí fue no renderizar cada marcador como un widget independiente. Agrupar por clusters geográficos y solo \"despertar\" el detalle cuando el usuario hace zoom evitó que el mapa se sintiera pesado en dispositivos de gama media, que son la mayoría entre estudiantes.",
            "Firebase, por su parte, resultó ideal para el prototipo pero exigió disciplina en las reglas de seguridad desde el día uno — es fácil dejar una colección abierta \"solo por ahora\" y olvidarlo. Documentar cada regla junto al modelo de datos, no después, terminó ahorrando varias tardes de depuración.",
            "El proyecto sigue en desarrollo activo, y probablemente el capítulo más interesante — cómo migrar ese estado en tiempo real a algo que escale más allá de un campus — todavía está por escribirse.",
        ],
    },
    {
        slug: "freelance-comunicacion-antes-que-codigo",
        title: "Lo primero que falla en un proyecto freelance no es el código",
        excerpt:
            "Después de un año trabajando con clientes distintos, la mayoría de los problemas que recuerdo no eran técnicos.",
        date: "Noviembre 2025",
        dateISO: "2025-11-10",
        readTime: "4 min",
        icon: "MessageSquare",
        body: [
            "Cuando empecé a tomar proyectos freelance en paralelo a mi trabajo de tiempo completo, asumí que el reto principal sería técnico: elegir bien el stack, escribir código mantenible, entregar a tiempo. Un año después, la mayoría de los momentos tensos que recuerdo no tuvieron nada que ver con eso.",
            "Casi siempre el problema era una expectativa que nunca se dijo en voz alta: un cliente que asumía que \"landing page\" incluía el hosting, o que \"lo tengo casi listo\" significaba algo distinto para mí que para quien esperaba el entregable. Ninguno de los dos estaba actuando de mala fe — simplemente no habíamos alineado el vocabulario.",
            "Lo que más me ha ayudado es cerrar cada etapa con un resumen corto y explícito, incluso cuando parece obvio: qué se entregó, qué falta, y qué decisión quedó pendiente de quién. Toma cinco minutos y evita malentendidos que, sin eso, tardan semanas en salir a la luz.",
            "El código sigue importando, por supuesto — pero la comunicación constante es la que hace que ese código realmente llegue a producción sin fricción.",
        ],
    },
];

export const getBlogPost = (slug) => blogPosts.find((post) => post.slug === slug);
