---
name: 8ctal — Portfolio
description: Un escritorio cyberpunk oscuro con una bola de billar 8 al centro — precisión técnica con una sola chispa de neón permitida, y ahora paneles de vidrio líquido flotando sobre ese lienzo para la interfaz interactiva.
colors:
  ink: "#000000"
  void: "#0e0e10"
  graphite: "#1c1c21"
  slate: "#282732"
  input-well: "#2d2d38"
  muted-slate-blue: "#839cb5"
  signal-white: "#d9ecff"
  pure-white: "#ffffff"
  spark-cyan: "#62e0ff"
  spark-azure: "#52aeff"
  spark-coral: "#fd5c79"
  spark-violet: "#6d45ce"
  glass-100: "rgba(217, 236, 255, 0.05)"
  glass-200: "rgba(217, 236, 255, 0.1)"
  glass-border: "rgba(217, 236, 255, 0.16)"
  glass-border-strong: "rgba(217, 236, 255, 0.28)"
typography:
  display:
    fontFamily: "Mona Sans, sans-serif"
    fontSize: "clamp(1.875rem, 5vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "normal"
  headline:
    fontFamily: "Mona Sans, sans-serif"
    fontSize: "clamp(1.875rem, 3vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "Mona Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Mona Sans, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  full: "9999px"
  xl: "0.75rem"
  lg: "0.5rem"
  md: "0.375rem"
spacing:
  gap-sm: "1.5rem"
  gap-md: "1.75rem"
  gap-lg: "2.5rem"
  container-x-mobile: "1.25rem"
  container-x-desktop: "5rem"
  section-y-mobile: "5rem"
  section-y-desktop: "10rem"
components:
  button:
    background: "linear-gradient({colors.glass-200} → {colors.glass-100})"
    textColor: "{colors.signal-white}"
    rounded: "{rounded.lg}"
    padding: "16px 24px"
    border: "1px solid {colors.glass-border}"
    boxShadow: "inset 0 1px 0 0 rgba(217,236,255,0.22), 0 8px 32px rgba(0,0,0,0.45)"
  button-hover:
    textColor: "#ffffff"
  badge:
    backgroundColor: "{colors.slate}"
    textColor: "{colors.signal-white}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  card:
    backgroundColor: "linear-gradient({colors.glass-200} → {colors.glass-100})"
    textColor: "{colors.signal-white}"
    rounded: "{rounded.xl}"
    padding: "40px"
    border: "1px solid {colors.glass-border}"
    boxShadow: "inset 0 1px 0 0 rgba(217,236,255,0.18), 0 8px 32px rgba(0,0,0,0.45)"
---

# Design System: 8ctal — Portfolio

## Overview

**Creative North Star: "El Netrunner del 8-ball"**

Un desarrollador que trabaja de noche en un escritorio cyberpunk — y sobre esa mesa de trabajo, en lugar de un adorno cualquiera, hay una bola de billar 8 girando en 3D. La interfaz es ese escritorio: superficies casi negras, apiladas unas sobre otras, con la tipografía blanco-azulada haciendo todo el trabajo de jerarquía. No hay una paleta de colores en el sentido tradicional — hay oscuridad técnica, disciplinada, y una única chispa de neón (cian → azul → coral → violeta) que aparece una sola vez, como el reflejo de luces de una ciudad nocturna en una ventana. Todo lo demás se mantiene monocromático a propósito, para que esa chispa nunca deje de sentirse rara y especial.

Los componentes no son estáticos: responden al cursor. Una tarjeta revela un halo que persigue el mouse; un botón es un panel de vidrio que aclara su borde y su texto al pasar el cursor. Es una interfaz "viva y con textura" — el gesto del usuario siempre obtiene una respuesta física, nunca solo un cambio de color plano.

Sobre ese mismo lienzo oscuro, el sitio adopta un segundo material para toda su capa de chrome flotante e interactiva: "Vidrio Líquido" (Liquid Glass), al estilo Apple pero en su variante oscura y minimalista — paneles translúcidos, desenfocados, con borde luminoso y sombra real, como el Centro de Control de iOS en modo oscuro. No reemplaza el mundo del Netrunner: el fondo sigue siendo Ink/Void, la bola 8 sigue girando en el Hero, y la chispa de neón sigue siendo única. El vidrio es el material de *todo* lo que flota e interactúa sobre ese escritorio — navegación, tarjetas, marcadores de timeline, y **todos los botones** (no solo un botón "secundario"; ya no hay una excepción sólida de por medio) — no un tema nuevo, un único lenguaje de superficie consistente.

**Key Characteristics:**
- Monocromo disciplinado (negros apilados + blanco-azulado frío) con una sola chispa de neón, nunca expandida.
- Una sola familia tipográfica (Mona Sans) que carga toda la jerarquía por peso y tamaño, no por combinación de fuentes.
- Profundidad por capas de superficie y borde en la base del sitio; todo el chrome flotante e interactivo (nav, tarjetas, botones) usa vidrio translúcido con sombra real en su lugar.
- Vidrio Líquido minimalista: un solo material de botón, sin coreografías de reveal por componente — el propio vidrio (blur, borde, realce) es la respuesta de interacción, con solo un ajuste sutil de color/posición encima (texto a blanco puro, la flecha del CTA se desliza un poco).
- Toda interacción tiene una respuesta táctil: revelado, movimiento o glow — nunca un simple cambio de color.

## Colors

La paleta es casi monocromática por diseño: negros profundos como lienzo, un blanco-azulado frío como voz principal, una chispa de neón deliberadamente escasa, y una familia de tokens de vidrio para el chrome flotante.

### Primary
- **Signal White** (`#d9ecff`): el color de identidad real del sitio — texto de cuerpo, enlaces de navegación, el wordmark "8ctal", y el relleno por defecto del botón CTA. Es lo que más se ve en pantalla.

### Secondary — La chispa de neón (uso extremadamente restringido)
- **Spark Cyan** (`#62e0ff`), **Spark Azure** (`#52aeff`), **Spark Coral** (`#fd5c79`), **Spark Violet** (`#6d45ce`): un único degradado (`.gradient-line`) que aparece en la línea vertical del timeline de Experiencia. Es la única aparición de color saturado en todo el sistema.

### Neutral
- **Ink** (`#000000`): fondo base de `html`/`body` — el lienzo sobre el que todo flota.
- **Void** (`#0e0e10`): superficie base de proyectos secundarios y otras tarjetas que aún no migraron al vidrio — el primer nivel "elevado" sobre el Ink.
- **Graphite** (`#1c1c21`): bordes de tarjetas/badges no-vidrio y fondo de hover en botones — el borde que separa una superficie de la siguiente.
- **Slate** (`#282732`): fondo de badges, del botón CTA en reposo, y del navbar al hacer scroll.
- **Input Well** (`#2d2d38`): fondo de campos de formulario — ligeramente más claro que Slate para que el formulario se sienta "hundido" y editable.
- **Muted Slate-Blue** (`#839cb5`): texto secundario/atenuado — fechas, IDs de credencial, placeholders de formulario.
- **Pure White** (`#ffffff`): reservado para estados de hover/foco — nunca el color de texto por defecto.

### Material — Vidrio Líquido (chrome flotante)
- **Glass 100** (`rgba(217, 236, 255, 0.05)`) / **Glass 200** (`rgba(217, 236, 255, 0.1)`): el degradado de fondo (`linear-gradient(180deg, glass-200 → glass-100)`) que da a un panel su lectura de "vidrio esmerilado" sobre el fondo oscuro — nunca un color sólido opaco.
- **Glass Border** (`rgba(217, 236, 255, 0.16)`) / **Glass Border Strong** (`rgba(217, 236, 255, 0.28)`): el borde de 1px que define el canto del panel; la versión "strong" se reserva para el overlay de pantalla completa del nav móvil, donde el panel necesita leerse como una superficie propia y no como una tarjeta más.
- Estos tokens son distintos en rol de Ink/Void/Graphite/Slate/Signal White: no son parte de la escala de negros apilados, son la translucidez, el borde y el realce de un material que *flota sobre* esa escala.

### Named Rules
**La Regla de la Chispa Única.** El degradado neón (cian/azul/coral/violeta) vive solo en la línea del timeline. No se replica en botones, badges ni fondos — su rareza es lo que lo hace notar.

**La Regla del Vidrio Reservado.** Los tokens `glass-*` solo se usan en componentes de chrome flotante e interactivo (navegación, tarjetas, marcadores de timeline, botones) — nunca como fondo de sección ni decoración plana. Ver Elevation & Depth y Do's/Don'ts.

## Typography

**Display / Body / Label Font:** Mona Sans (variable, pesos 200–900), con `sans-serif` como fallback.

**Character:** Una sola familia hace todo el trabajo — la jerarquía viene de peso y tamaño, no de mezclar fuentes. Se siente técnica y neutral, como una interfaz de sistema, sin coquetería serif.

### Hierarchy
- **Display** (600, `clamp(1.875rem, 5vw, 3.75rem)`, line-height 1.1): el titular del Hero ("Convirtiendo Ideas/Conceptos/Diseños/Código en proyectos reales que dan resultados").
- **Headline** (600, `clamp(1.875rem, 3vw, 3rem)`, line-height 1.2): títulos de sección (`TitleHeader`), siempre centrados.
- **Body** (400, 1rem–1.25rem, line-height 1.5): párrafos de introducción y descripciones de proyecto/certificación/experiencia.
- **Label** (500, 0.75rem–0.875rem, letter-spacing 0.02em, a veces uppercase): badges de tecnología, fechas, IDs de credencial, texto del botón CTA (uppercase), enlaces del overlay de nav móvil (`text-3xl font-semibold`, una escala más grande que el label de escritorio porque son el único contenido de una pantalla completa).

### Named Rules
**La Regla de un Solo Rostro.** Nunca se introduce una segunda familia tipográfica (por ejemplo, una serif de acento). Mona Sans, en sus 900 pesos disponibles, es suficiente para toda la jerarquía.

## Layout

Secciones a ancho completo (`width: 100dvw`) apiladas verticalmente, cada una con su propio ritmo generoso: `mt-20` (5rem) en mobile, `md:mt-40` (10rem) en desktop entre secciones. El contenedor horizontal escala de `px-5` (1.25rem) en mobile a `md:px-10`/`md:px-20` (2.5rem–5rem) en desktop.

El Hero es asimétrico: contenido de texto a la izquierda, escena 3D (`HeroExperience`) superpuesta a la derecha, ocupando hasta 70% del ancho en desktop (`xl:w-[70%]`) y posicionada en absoluto sobre el layout. El resto del sitio usa grids responsivos estándar (`grid-3-cols`, `grid-4-cols`) que colapsan a una sola columna en mobile, con `gap-6`–`gap-10` entre elementos.

Experiencia usa un layout de timeline vertical de una sola columna: una espina de vidrio delgada (`.gradient-line`) recorre el eje, con un marcador circular de vidrio (`TimelineLogo`) por entrada y el contenido de cada entrada en un panel `.exp-card.glass-panel` a la derecha de la espina — reemplaza el layout anterior de dos columnas (logo/reseña a la izquierda, detalle a la derecha).

## Elevation & Depth

El sistema tiene ahora dos capas de profundidad con reglas distintas, no una:

**Capa base (sin cambios):** las superficies estructurales del sitio siguen siendo planas — sin `box-shadow`. La profundidad se transmite apilando superficies cada vez más claras sobre el fondo negro (Ink → Void → Graphite/Slate) y delimitándolas con bordes finos de 1px en Graphite. Esta sigue siendo la base por defecto para cualquier superficie que no sea chrome flotante o interactivo.

**Capa de Vidrio Líquido:** el chrome flotante e interactivo — la navegación completa (píldora de escritorio y overlay móvil), el toggle de menú, `GlowCard` (y por herencia sus tarjetas de Certificaciones/Testimonios), los paneles de Experiencia (marcador de timeline, `.exp-card`), y **todos los botones** (`.cta-button` — "Mira mi trabajo", "Enviar mensaje" — y "Contáctame") — usa un material translúcido y desenfocado (`backdrop-filter: blur(24px) saturate(150%)`) con borde `glass-border`, un degradado de fondo `glass-200 → glass-100`, y **sí** lleva un `box-shadow` real: un realce interior superior (`inset 0 1px 0 0 rgba(217,236,255,0.18/0.22)`, que lee como el filo del vidrio atrapando luz) más una sombra exterior de offset+blur (`0 8px 32px rgba(0,0,0,0.45)`, o `0 24px 64px rgba(0,0,0,0.6)` en la variante "strong" del overlay de pantalla completa). Esta es la única capa del sistema donde una sombra real está sancionada. La píldora de navegación de escritorio suma además un filtro de refracción sutil (`feTurbulence` + `feDisplacementMap` vía SVG, ver `.glass-liquid` en `index.css`) sobre esa misma base — un acento, no un material aparte.

El halo cónico que sigue al mouse en las tarjetas (`--start`, `conic-gradient` enmascarado) se mantiene como firma de interacción, y ahora se lee explícitamente como "el canto del vidrio atrapando la luz" en vez de un glow abstracto sobre una superficie opaca — el mismo mecanismo, reinterpretado por el nuevo material.

### Named Rules
**La Regla de Capas: Base Plana / Chrome de Vidrio.** (Supersede a la antigua "Regla de Cero Sombras", que prohibía `box-shadow` en todo el sistema sin excepción — esa prohibición ya no describe el build.) La base estructural del sitio sigue sin sombras, resuelta con superficie + borde de 1px. El chrome flotante e interactivo (nav móvil, tarjetas, marcadores de timeline) es la única capa donde un `box-shadow` de offset+blur real está permitido, y solo como parte del material de vidrio completo (blur + saturación + borde + degradado) — nunca una sombra aislada añadida a una superficie plana existente.

## Shapes

Dos familias de esquina, sin mezclarlas: **`rounded-full`** para píldoras y elementos circulares (badges, iconos de navbar/footer, el círculo revelador del botón CTA, el marcador circular de logo del timeline), y **`rounded-xl`**/**`rounded-2xl`** para superficies grandes (tarjetas, imágenes de proyecto, iconos de footer, `.exp-card`). Botones e inputs usan un radio intermedio, **`rounded-lg`/`rounded-md`** (8px/6px), para sentirse "clicables" sin la circularidad de una píldora. Los bordes, cuando existen, son de 1px — en Graphite para superficies base, en `glass-border`/`glass-border-strong` para superficies de vidrio — nunca gruesos ni decorativos.

## Components

### Buttons
- **Shape:** `rounded-lg` (8px).
- **Material:** Apple Liquid Glass, minimalista, y **el mismo en todos lados** — `.cta-button` (Hero's "Mira mi trabajo", Contact's "Enviar mensaje") y "Contáctame" en la navbar comparten el material `.glass-panel` exacto: degradado `glass-200 → glass-100`, `backdrop-blur-2xl backdrop-saturate-150`, borde 1px `glass-border`, y el `box-shadow` de realce interior + sombra exterior descrito en Elevation & Depth. No existe ya un botón "primario" sólido y uno "secundario" de vidrio — es un único lenguaje de botón, sin excepciones.
- **Hover / Focus:** deliberadamente mínimo — el texto pasa de Signal White a Pure White, y en `.cta-button` la flecha se desliza unos píxeles a la derecha (`group-hover:translate-x-1`). Sin círculo revelador, sin cambio de color de fondo sólido: el vidrio en sí (su blur, su borde, su realce) es la declaración visual; la interacción solo la acentúa, no la reemplaza.
- **CV flotante:** mismo material y misma lógica — `.cv-btn` es un ícono circular de vidrio (ver `FloatingCVButton.jsx`), consistente con el resto.

### Badges / Chips
- **Style:** fondo Slate, texto Signal White, `rounded-full`, padding `px-3 py-1` (badges de proyecto) o `px-2 py-1` (badges de tecnología, más pequeños/`text-xs`), borde de 1px en Graphite.
- **Uso:** tecnologías de proyecto, habilidades certificadas, fecha/ID de credencial (estas últimas sin fondo, solo texto Muted Slate-Blue).

### Cards / Containers — `GlowCard` (componente insignia, ahora de vidrio)
- **Corner Style:** `rounded-xl` (12px).
- **Material:** capa de Vidrio Líquido (`.card` en `index.css`) — degradado `glass-200 → glass-100`, borde 1px `glass-border`, `backdrop-filter: blur(24px) saturate(150%)`, y el `box-shadow` sancionado (realce interior + sombra exterior offset+blur) descrito en Elevation & Depth. Reemplaza el fondo Void plano + borde Graphite que tenía antes.
- **Signature behavior:** al mover el mouse sobre la tarjeta, un halo cónico sigue la posición del cursor y aparece como un borde luminoso que se desvanece en los extremos — implementado con una variable CSS (`--start`, el ángulo del mouse) que reposiciona un `conic-gradient` enmascarado. Con el material de vidrio, este halo ahora se lee explícitamente como el canto del panel atrapando la luz, no como un glow flotando sobre una superficie opaca — el mismo mecanismo, nueva lectura. Aparece en Experiencia (`.exp-card`), Certificaciones y (cuando tenga contenido real) Testimonios, ya que ambos consumen `GlowCard`.
- **Internal Padding:** 40px (`p-10`) en `GlowCard`; los paneles `.exp-card` de Experiencia usan `md:p-10 p-6`.

### Inputs / Fields (formulario de contacto)
- **Style:** fondo Input Well (`#2d2d38`), sin borde visible, `rounded-md` (6px), padding generoso `px-4 py-4`. No es de vidrio — sigue siendo la superficie "hundida" plana de la capa base.
- **Placeholder:** Muted Slate-Blue — nunca Signal White, para mantener la distinción entre valor ingresado y placeholder.
- **Submit:** botón ancho completo, fondo Signal White, texto negro semibold — el único botón del sitio que no usa el patrón de círculo revelador (es una acción de confirmación, no de descubrimiento).

### Navigation
- **Desktop — píldora de vidrio que colapsa:** barra fija (`fixed`), logo = ícono de bola 8 + wordmark "8ctal" en Signal White, a la izquierda, fuera de la píldora. Los enlaces viven en una píldora `.glass-panel` (más `.glass-liquid`, su filtro de refracción sutil) que se colapsa a un círculo de 3rem con un ícono `Menu` (lucide-react) genérico al bajar más de 150px, y se re-expande al subir — nunca repite el logo dentro del círculo colapsado, para no leerse redundante con el wordmark fijo a su izquierda. Enlaces con texto Signal White en reposo, blanco puro al hover, con un subrayado (`.underline`) que crece de 0 a 100% de ancho — el mismo lenguaje de "revelado" que el resto del sistema, aplicado a texto.
- **Mobile — marca fija + overlay de vidrio de pantalla completa:** un pequeño panel `glass-panel` circular con el ícono de bola 8 vive fijo en la esquina superior izquierda (inspirado en la esquina de marca de camosdigital.com), independiente del estado del menú. Por debajo de `lg:`, un botón hamburguesa (`.nav-toggle`, el mismo tipo de panel circular) en la esquina opuesta reemplaza los enlaces de escritorio. Al tocarlo, se abre un panel `.mobile-nav-overlay.glass-panel-strong` de viewport completo (`fixed inset-0`) — mismo patrón de overlay móvil de camosdigital.com — con los enlaces apilados en `text-3xl font-semibold`, centrados vertical y horizontalmente. La entrada se anima con GSAP: el overlay hace fade-in (0.45s), seguido de un stagger de los enlaces que suben desde `y: 24px, opacity: 0` (0.5s, stagger 0.06s, `expo.out`). Al cerrar (tap en un enlace, tap en el botón, o Escape), el overlay hace fade-out (0.3s) sin el stagger inverso. Mientras está abierto: scroll del body bloqueado y foco movido al primer enlace. Usa `glass-panel-strong` (no `glass-panel`) porque, al ser la única superficie visible en pantalla, necesita leerse como un fondo propio y opaco-al-desenfoque, no como una tarjeta flotando sobre otro contenido visible.

## Do's and Don'ts

### Do:
- **Do** usar Signal White (`#d9ecff`) como color de texto por defecto; reservar Pure White (`#ffffff`) solo para estados de hover/foco.
- **Do** dar a todo elemento interactivo (botón, link, tarjeta) una respuesta de revelado o movimiento al hover — nunca solo un cambio de color plano.
- **Do** mantener la chispa de neón (cian/azul/coral/violeta) confinada a la línea del timeline (La Regla de la Chispa Única).
- **Do** usar `rounded-full` solo para píldoras/círculos y `rounded-xl`/`rounded-2xl` solo para superficies grandes — no intercambiarlos.
- **Do** reservar el material de Vidrio Líquido (`glass-*`, blur, borde, sombra offset+blur) para chrome flotante e interactivo — navegación, tarjetas, marcadores de timeline, botones — nunca como decoración de fondo de sección.
- **Do** usar el mismo `.glass-panel`/`.cta-button` para cualquier botón nuevo — no introducir un segundo estilo de botón "porque este es más importante"; la jerarquía se expresa con tamaño/posición, no con un material distinto.

### Don't:
- **Don't** añadir `box-shadow` a una superficie de la capa base (fondos de sección, badges, inputs) — esa capa sigue resolviendo profundidad con superficie + borde de 1px, sin excepción. (Los botones ya no son parte de esta capa — ver Elevation & Depth.)
- **Don't** aplicar el material de vidrio (blur/saturación/degradado glass) como decoración genérica en una superficie que no sea chrome flotante o interactivo — el vidrio se gana su lugar por función (paneles que flotan sobre contenido), no por moda visual.
- **Don't** introducir una segunda familia tipográfica; Mona Sans cubre toda la jerarquía por peso/tamaño.
- **Don't** expandir la chispa de neón a botones, badges o fondos generales — debe seguir sintiéndose rara.
- **Don't** presentar el contenido de placeholder de la sección Testimonios (nombres/reseñas falsas heredadas del template) como si fuera real — ver `PRODUCT.md` § Evidence on Hand.

### Estado de adopción (nota de alcance)
El Vidrio Líquido cubre ya: NavBar completa (píldora de escritorio y overlay móvil), Experience, Certificaciones (vía `GlowCard`), el Testimonios oculto (mismo componente), y todos los botones interactivos (CTA principal, Contáctame, envío de formulario, CV flotante). ShowcaseSection, FeatureCards, TechStack y Footer siguen con el tratamiento plano/bordeado anterior fuera de sus botones. Esto es trabajo incremental esperado, no una inconsistencia a corregir — ver PRODUCT.md.
