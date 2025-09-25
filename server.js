import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { events as galleries } from "./data/events.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View engine & static
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("layout", { title: "Discover NYC Galleries", view: "index", events: galleries });
});

app.get("/events/:slug", (req, res, next) => {
  const item = galleries.find(g => g.slug === req.params.slug);
  if (!item) return next();
  res.render("layout", { title: item.name, view: "item", item });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render("layout", { title: "Not Found", view: "404" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});