const jsonServer = require("json-server");
const cors = require("cors");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
// Enabling CORS for all routes
server.use(cors({ origin: "*" }));

server.use(middlewares);
server.use(jsonServer.bodyParser);

const { VM } = require("vm2");
const { PythonShell } = require("python-shell");

server.post("/api/execute", (req, res) => {
  const { language, code } = req.body;

  if (!language || !code) {
    return res.status(400).json({ error: "Language and code cannot be empty" });
  }

  if (language === "javascript") {
    const output = [];
    const vm = new VM({
      timeout: 1000,
      sandbox: {
        console: {
          log: (...args) => output.push(args.join(" ")),
        },
      },
    });

    try {
      vm.run(code);
      return res.json({ status: "success", output });
    } catch (err) {
      return res.status(500).json({ status: "error", message: err.message });
    }
  } else if (language === "python") {
    // Handling Python code execution
    const options = {
      mode: "text",
      pythonOptions: ["-c"], // Executing code directly
      args: [],
    };

    PythonShell.runString(code, options, (err, result) => {
      if (err) {
        return res.status(500).json({ status: "error", message: err.message });
      }

      res.json({ status: "success", output: result });
    });
  } else {
    return res.status(400).json({ error: `Unsupported language: ${language}` });
  }
});

server.use(router);

// Starting the server on port 3001 (or change to any available port)
server.listen(3001, () => {
  console.log("Mock API is running on http://localhost:3001");
});
