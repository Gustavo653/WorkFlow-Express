require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const migrate = require("./database/migrate");
const usersRouter = require("./routes/users");
const logsRouter = require("./routes/logs");
const supportGroupsRouter = require("./routes/supportGroups");
const log = require("./models/log");
const errorHandler = require("./middleware/errorHandler");
const infoHandler = require("./middleware/infoHandler");

const app = express();
app.use(cors());
const port = process.env.PORT;

async function startServer() {
  await migrate();

  app.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });
}

app.use(
  morgan("short", {
    stream: {
      write: (message) => {
        log.create({ message, type: "network" });
      },
    },
  })
);
app.use(express.json());

app.use(infoHandler);

app.use("/users", usersRouter);
app.use("/logs", logsRouter);
app.use("/support-groups", supportGroupsRouter);

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Página não encontrada",
    error: {
      statusCode: 404,
      message: "Você acessou uma rota que não está definida neste servidor",
    },
  });
});

app.use(errorHandler);

startServer();

module.exports = app;
