import express from "express";
import { config } from "./config.js";
import { overview, pages, pageDetail, lastSyncDate } from "./db.js";
import { syncGsc } from "./gsc.js";
import { PAGE_HTML } from "./page.js";

const clampDays = (v: unknown) => Math.min(365, Math.max(1, Number(v) || 90));

export function createServer() {
  const app = express();

  // Basic-auth: логин любой, проверяется только пароль.
  app.use((req, res, next) => {
    const h = req.headers.authorization ?? "";
    if (h.startsWith("Basic ")) {
      const decoded = Buffer.from(h.slice(6), "base64").toString("utf8");
      const pass = decoded.slice(decoded.indexOf(":") + 1);
      if (pass === config.password) return next();
    }
    res.set("WWW-Authenticate", 'Basic realm="BizReg SEO"').status(401).send("Требуется вход");
  });

  app.get("/", (_req, res) => res.type("html").send(PAGE_HTML));

  app.get("/api/freshness", async (_req, res) => {
    res.json({ last: await lastSyncDate() });
  });

  app.get("/api/overview", async (req, res) => {
    res.json(await overview(clampDays(req.query.days)));
  });

  app.get("/api/pages", async (req, res) => {
    res.json(await pages(clampDays(req.query.days)));
  });

  app.get("/api/page", async (req, res) => {
    const url = String(req.query.url ?? "");
    if (!url) return res.status(400).json({ error: "url required" });
    res.json(await pageDetail(url, clampDays(req.query.days)));
  });

  // Ручной запуск синхронизации
  app.post("/api/sync", async (_req, res) => {
    try {
      res.json(await syncGsc());
    } catch (e: any) {
      res.status(500).json({ error: String(e?.message ?? e) });
    }
  });

  return app;
}
