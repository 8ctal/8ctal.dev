// A small named-import lookup for the `icon` field on each post in
// blog.js, instead of `import * as Icons from "lucide-react"` — a
// namespace import like that pulls in every lucide icon (over a thousand)
// regardless of which ones are actually used, defeating the tree-shaking
// every other lucide-react import in this project already relies on.
// Add an icon here (and to its named import) the same way when a new post
// needs one.
import { Activity, MapPin, MessageSquare, Sparkles } from "lucide-react";

const ICONS = { Activity, MapPin, MessageSquare, Sparkles };

export const iconForPost = (post) => ICONS[post.icon] || Sparkles;

export default iconForPost;
