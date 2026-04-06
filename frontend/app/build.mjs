import { build, context } from "esbuild";
import http from "node:http";
import https from "node:https";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, "src");
const publicDir = path.join(__dirname, "public");
const distDir = path.join(__dirname, "dist");
const routeMetadataPath = path.join(srcDir, "routes", "metadata.json");
const templatePath = path.join(publicDir, "index.html");

const args = new Set(process.argv.slice(2));
const isWatchMode = args.has("--watch");
const shouldServe = args.has("--serve");
const devPort = Number(process.env.PORT ?? "3000");
const backendTarget = process.env.BACKEND_URL ?? "http://127.0.0.1:8000";

function aliasPlugin() {
  return {
    name: "alias-plugin",
    setup(pluginBuild) {
      pluginBuild.onResolve({ filter: /^@\// }, async (args) => {
        const basePath = path.join(srcDir, args.path.slice(2));
        const candidates = [
          basePath,
          `${basePath}.ts`,
          `${basePath}.tsx`,
          `${basePath}.js`,
          `${basePath}.json`,
          path.join(basePath, "index.ts"),
          path.join(basePath, "index.tsx"),
          path.join(basePath, "index.js")
        ];

        for (const candidate of candidates) {
          try {
            const stat = await fs.stat(candidate);
            if (stat.isFile()) {
              return { path: candidate };
            }
          } catch {}
        }

        return {
          errors: [{ text: `Unable to resolve alias import: ${args.path}` }]
        };
      });
    }
  };
}

function staticOutputPlugin() {
  return {
    name: "static-output-plugin",
    setup(pluginBuild) {
      pluginBuild.onEnd(async (result) => {
        if (result.errors.length > 0) {
          return;
        }

        await syncStaticOutput();
      });
    }
  };
}

async function copyDirectory(source, destination) {
  const entries = await fs.readdir(source, { withFileTypes: true });
  await fs.mkdir(destination, { recursive: true });

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, destinationPath);
      continue;
    }

    await fs.copyFile(sourcePath, destinationPath);
  }
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function getRouteFilePath(routePath) {
  if (routePath === "/") {
    return path.join(distDir, "index.html");
  }

  const normalizedPath = routePath.replace(/^\/+|\/+$/g, "");
  return path.join(distDir, normalizedPath, "index.html");
}

async function syncStaticOutput() {
  await fs.mkdir(distDir, { recursive: true });
  await copyDirectory(publicDir, distDir);

  const [template, metadataContent] = await Promise.all([
    fs.readFile(templatePath, "utf8"),
    fs.readFile(routeMetadataPath, "utf8")
  ]);

  const routes = JSON.parse(metadataContent);

  for (const route of routes) {
    const outputPath = getRouteFilePath(route.path);
    const html = template
      .replaceAll("{{title}}", escapeHtml(route.title))
      .replaceAll("{{description}}", escapeHtml(route.description));

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, html, "utf8");
  }
}

function getContentType(filePath) {
  if (filePath.endsWith(".html")) {
    return "text/html; charset=utf-8";
  }

  if (filePath.endsWith(".js")) {
    return "application/javascript; charset=utf-8";
  }

  if (filePath.endsWith(".json")) {
    return "application/json; charset=utf-8";
  }

  if (filePath.endsWith(".css")) {
    return "text/css; charset=utf-8";
  }

  if (filePath.endsWith(".svg")) {
    return "image/svg+xml";
  }

  return "text/plain; charset=utf-8";
}

async function resolveStaticPath(requestPath) {
  const decodedPath = decodeURIComponent(requestPath.split("?")[0]);
  const candidate = decodedPath === "/" ? "/index.html" : decodedPath;
  const relativeCandidate = candidate.replace(/^\/+/, "");
  const directPath = path.join(distDir, relativeCandidate);

  try {
    const directStat = await fs.stat(directPath);
    if (directStat.isFile()) {
      return directPath;
    }
  } catch {}

  if (!path.extname(candidate)) {
    const nestedIndexPath = path.join(distDir, relativeCandidate, "index.html");

    try {
      const nestedStat = await fs.stat(nestedIndexPath);
      if (nestedStat.isFile()) {
        return nestedIndexPath;
      }
    } catch {}
  }

  return path.join(distDir, "index.html");
}

function proxyRequest(req, res) {
  const targetUrl = new URL(req.url || "/", backendTarget);
  const requestClient = targetUrl.protocol === "https:" ? https : http;
  const proxy = requestClient.request(
    targetUrl,
    {
      method: req.method,
      headers: req.headers
    },
    (proxyResponse) => {
      res.writeHead(proxyResponse.statusCode ?? 502, proxyResponse.headers);
      proxyResponse.pipe(res);
    }
  );

  proxy.on("error", (error) => {
    res.writeHead(502, { "content-type": "application/json; charset=utf-8" });
    res.end(
      JSON.stringify({
        message: "Backend proxy request failed.",
        details: error.message
      })
    );
  });

  req.pipe(proxy);
}

function startServer() {
  const server = http.createServer(async (req, res) => {
    if (!req.url) {
      res.writeHead(400);
      res.end();
      return;
    }

    if (req.url.startsWith("/api")) {
      proxyRequest(req, res);
      return;
    }

    try {
      const filePath = await resolveStaticPath(req.url);
      const fileContents = await fs.readFile(filePath);
      res.writeHead(200, { "content-type": getContentType(filePath) });
      res.end(fileContents);
    } catch {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      res.end("Not found");
    }
  });

  server.listen(devPort, () => {
    console.log(`Frontend available at http://127.0.0.1:${devPort}`);
    console.log(`Proxying /api/* to ${backendTarget}`);
  });

  return server;
}

const sharedBuildOptions = {
  absWorkingDir: __dirname,
  entryPoints: [path.join(srcDir, "main.tsx")],
  bundle: true,
  outfile: path.join(distDir, "main.js"),
  format: "esm",
  platform: "browser",
  target: ["es2020"],
  jsx: "automatic",
  jsxImportSource: "preact",
  sourcemap: isWatchMode,
  minify: !isWatchMode,
  plugins: [aliasPlugin(), staticOutputPlugin()]
};

async function run() {
  await fs.rm(distDir, { recursive: true, force: true });

  if (isWatchMode) {
    const buildContext = await context(sharedBuildOptions);
    await buildContext.watch();

    const server = shouldServe ? startServer() : null;
    console.log("Watching frontend sources...");

    const stop = async () => {
      server?.close();
      await buildContext.dispose();
      process.exit(0);
    };

    process.on("SIGINT", stop);
    process.on("SIGTERM", stop);
    return;
  }

  await build(sharedBuildOptions);
  console.log("Frontend build complete.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
