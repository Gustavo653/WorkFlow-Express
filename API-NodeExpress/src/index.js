require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { exec } = require('child_process');

const usersRouter = require("./routes/users");
const logsRouter = require("./routes/logs");
const supportGroupsRouter = require("./routes/supportGroups");
const categoriesRouter = require("./routes/categories");
const prioritiesRouter = require("./routes/priorities");
const statusesRouter = require("./routes/statuses");
const ordersRouter = require("./routes/orders");
const orderAttachmentsRouter = require("./routes/orderAttachments");
const timeEntriesRouter = require("./routes/timeEntries");
const log = require("./models/log");
const errorHandler = require("./middleware/errorHandler");
const infoHandler = require("./middleware/infoHandler");
const multer = require('multer');

const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(cors());

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "WorkFlow Express API with Swagger",
      version: "1.0.0",
      description:
        "WorkFlow Express API with Swagger",
    },
  },
  apis: ["src/routes/*.js"],
};

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(options), { explorer: true })
);

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});
app.use(multerMid.single('file'));

const port = process.env.PORT;

async function startServer() {
  /*await new Promise((resolve, reject) => {
    const migrate = exec(
      'npx sequelize-cli db:migrate',
      { env: process.env.NODE_ENV },
      (err, stdout, stderr) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );

    migrate.stdout.pipe(process.stdout);
    migrate.stderr.pipe(process.stderr);
  });*/

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

app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

app.use(infoHandler);

app.use("/users", usersRouter);
app.use("/logs", logsRouter);
app.use("/support-groups", supportGroupsRouter);
app.use("/categories", categoriesRouter);
app.use("/priorities", prioritiesRouter);
app.use("/statuses", statusesRouter);
app.use("/orders", ordersRouter);
app.use("/time-entries", timeEntriesRouter);
app.use("/order-attachments", orderAttachmentsRouter);

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
