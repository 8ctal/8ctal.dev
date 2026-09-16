// Blog content — plain data here rather than Markdown/MDX files, matching
// this project's existing convention (constants/index.js is the single
// source of truth for every other section's content too; see CLAUDE.md).
// Bilingual the same way constants/index.js is: shared, language-independent
// fields (slug, dateISO, readTime, icon) alongside an `es`/`en` sub-object
// for title/excerpt/body — see src/context/Language.jsx for how those get
// merged into the flat post objects `useLanguage()` hands components.
// `date` isn't stored at all: it's derived from `dateISO` via
// `formatDate()` (also from Language.jsx) so the display date is always in
// the active language's month names without a separate field to keep in
// sync.
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
        dateISO: "2026-03-01",
        readTime: "6 min",
        icon: "Activity",
        es: {
            title: "Lo que aprendí construyendo monitoreo industrial en tiempo real",
            excerpt:
                "Integrar PLCs, MQTT y Kafka con una interfaz que un operador de planta pueda leer de un vistazo, sin perder ni un dato en el camino.",
            body: [
                "Cuando empecé a trabajar en Cathaleia, la plataforma de monitoreo industrial que desarrollamos en Copower, mi primer instinto fue tratar cada sensor como una fila más en una base de datos. Funcionó exactamente hasta el primer corte de red en planta: los datos llegaban desordenados, duplicados, o no llegaban.",
                "Lo que terminó funcionando fue tratar cada dispositivo como una fuente de eventos, no de estado. MQTT para la telemetría de campo, Kafka como bitácora inmutable en el medio, y una capa de agregación que reconstruye el estado \"actual\" a partir de esa bitácora en vez de sobrescribirlo directamente. Si algo se cae, se reproduce desde donde se quedó — no se pierde ni se duplica.",
                "La otra mitad del problema fue la interfaz. Un operador de planta no tiene tiempo de interpretar un dashboard de métricas genéricas; necesita saber, en dos segundos, si algo está fuera de rango y qué hacer al respecto. Eso significó menos gráficas y más semáforos, umbrales configurables por línea de producción, y alertas que se agrupan en vez de bombardear.",
                "Todavía hay mucho por mejorar — sobre todo en cómo comunicamos degradación parcial de servicio sin generar pánico innecesario — pero el principio que me llevo es simple: en sistemas industriales, la resiliencia del dato importa tanto como la claridad de quien lo lee.",
            ],
        },
        en: {
            title: "What I learned building real-time industrial monitoring",
            excerpt:
                "Integrating PLCs, MQTT, and Kafka with an interface a plant operator can read at a glance, without losing a single data point along the way.",
            body: [
                "When I started working on Cathaleia, the industrial monitoring platform we built at Copower, my first instinct was to treat every sensor as just another row in a database. That worked exactly until the first network outage on the plant floor: data arrived out of order, duplicated, or not at all.",
                "What ended up working was treating every device as a source of events, not of state. MQTT for field telemetry, Kafka as an immutable log in the middle, and an aggregation layer that reconstructs \"current\" state from that log instead of overwriting it directly. If something goes down, it replays from where it left off — nothing gets lost or duplicated.",
                "The other half of the problem was the interface. A plant operator doesn't have time to interpret a dashboard full of generic metrics; they need to know, within two seconds, whether something is out of range and what to do about it. That meant fewer charts and more traffic-light indicators, thresholds configurable per production line, and alerts that group together instead of bombarding the operator.",
                "There's still a lot to improve — especially in how we communicate partial service degradation without causing unnecessary panic — but the principle I've taken away is simple: in industrial systems, data resilience matters just as much as clarity for whoever's reading it.",
            ],
        },
    },
    {
        slug: "flutter-firebase-parchuis",
        dateISO: "2026-01-15",
        readTime: "5 min",
        icon: "MapPin",
        es: {
            title: "Construir una comunidad en un mapa 3D con Flutter y Firebase",
            excerpt:
                "ParchUIS mezcla mapas, tiempo real y una identidad visual muy específica — algunas notas sobre cómo se sostiene eso en producción.",
            body: [
                "ParchUIS nació de una pregunta simple: ¿cómo se ve una comunidad universitaria en un mapa? La respuesta que elegimos fue MapBox SDK sobre Flutter, con Firebase manejando autenticación y estado en tiempo real — una combinación cómoda hasta que el número de marcadores en pantalla empezó a crecer.",
                "La lección más útil ahí fue no renderizar cada marcador como un widget independiente. Agrupar por clusters geográficos y solo \"despertar\" el detalle cuando el usuario hace zoom evitó que el mapa se sintiera pesado en dispositivos de gama media, que son la mayoría entre estudiantes.",
                "Firebase, por su parte, resultó ideal para el prototipo pero exigió disciplina en las reglas de seguridad desde el día uno — es fácil dejar una colección abierta \"solo por ahora\" y olvidarlo. Documentar cada regla junto al modelo de datos, no después, terminó ahorrando varias tardes de depuración.",
                "El proyecto sigue en desarrollo activo, y probablemente el capítulo más interesante — cómo migrar ese estado en tiempo real a algo que escale más allá de un campus — todavía está por escribirse.",
            ],
        },
        en: {
            title: "Building a community on a 3D map with Flutter and Firebase",
            excerpt:
                "ParchUIS blends maps, real-time data, and a very specific visual identity — some notes on how that holds up in production.",
            body: [
                "ParchUIS started from a simple question: what does a university community look like on a map? The answer we chose was MapBox SDK on top of Flutter, with Firebase handling authentication and real-time state — a comfortable combination until the number of markers on screen started to grow.",
                "The most useful lesson there was not rendering every marker as its own independent widget. Grouping into geographic clusters and only \"waking up\" the detail once the user zooms in kept the map from feeling heavy on mid-range devices — which are the majority among students.",
                "Firebase, for its part, turned out to be ideal for the prototype but demanded discipline around security rules from day one — it's easy to leave a collection open \"just for now\" and forget about it. Documenting each rule alongside the data model, not after the fact, ended up saving several afternoons of debugging.",
                "The project is still in active development, and probably the most interesting chapter — how to migrate that real-time state to something that scales beyond a single campus — is still unwritten.",
            ],
        },
    },
    {
        slug: "freelance-comunicacion-antes-que-codigo",
        dateISO: "2025-11-10",
        readTime: "4 min",
        icon: "MessageSquare",
        es: {
            title: "Lo primero que falla en un proyecto freelance no es el código",
            excerpt:
                "Después de un año trabajando con clientes distintos, la mayoría de los problemas que recuerdo no eran técnicos.",
            body: [
                "Cuando empecé a tomar proyectos freelance en paralelo a mi trabajo de tiempo completo, asumí que el reto principal sería técnico: elegir bien el stack, escribir código mantenible, entregar a tiempo. Un año después, la mayoría de los momentos tensos que recuerdo no tuvieron nada que ver con eso.",
                "Casi siempre el problema era una expectativa que nunca se dijo en voz alta: un cliente que asumía que \"landing page\" incluía el hosting, o que \"lo tengo casi listo\" significaba algo distinto para mí que para quien esperaba el entregable. Ninguno de los dos estaba actuando de mala fe — simplemente no habíamos alineado el vocabulario.",
                "Lo que más me ha ayudado es cerrar cada etapa con un resumen corto y explícito, incluso cuando parece obvio: qué se entregó, qué falta, y qué decisión quedó pendiente de quién. Toma cinco minutos y evita malentendidos que, sin eso, tardan semanas en salir a la luz.",
                "El código sigue importando, por supuesto — pero la comunicación constante es la que hace que ese código realmente llegue a producción sin fricción.",
            ],
        },
        en: {
            title: "The first thing that breaks in a freelance project isn't the code",
            excerpt: "After a year working with different clients, most of the problems I remember weren't technical.",
            body: [
                "When I started taking on freelance projects alongside my full-time job, I assumed the main challenge would be technical: picking the right stack, writing maintainable code, delivering on time. A year later, most of the tense moments I remember had nothing to do with any of that.",
                "The problem was almost always an expectation that never got said out loud: a client who assumed \"landing page\" included hosting, or where \"I've almost got it ready\" meant something different to me than to whoever was waiting on the deliverable. Neither of us was acting in bad faith — we just hadn't aligned our vocabulary.",
                "What's helped the most is closing out each stage with a short, explicit summary, even when it seems obvious: what was delivered, what's still missing, and which decision is pending from whom. It takes five minutes and prevents misunderstandings that, without it, can take weeks to surface.",
                "The code still matters, of course — but it's constant communication that gets that code into production without friction.",
            ],
        },
    },
];
