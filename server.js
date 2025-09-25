const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const SRC_DIR = path.join(__dirname, "src");

const server = http.createServer((req, res) => {
  let filePath = path.join(SRC_DIR, req.url === "/" ? "index.html" : req.url);

  if (!filePath.startsWith(SRC_DIR)) {
    res.writeHead(403);
    return res.end("Access denied");
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("File not found");
    } else {
      const ext = path.extname(filePath).toLowerCase();
      const type =
        {
          ".html": "text/html",
          ".js": "text/javascript",
          ".css": "text/css",
          ".json": "application/json",
          ".png": "image/png",
          ".jpg": "image/jpeg",
          ".gif": "image/gif",
        }[ext] || "application/octet-stream";

      res.writeHead(200, { "Content-Type": type });
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});