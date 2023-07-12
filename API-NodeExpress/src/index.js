require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const migrate = require("./database/migrate");
const usersRouter = require("./routes/users");
const logsRouter = require("./routes/logs");
const supportGroupsRouter = require("./routes/supportGroups");
const categoriesRouter = require("./routes/categories");
const prioritiesRouter = require("./routes/priorities");
const statusesRouter = require("./routes/statuses");
const ordersRouter = require("./routes/orders");
const timeEntriesRouter = require("./routes/timeEntries");
const log = require("./models/log");
const errorHandler = require("./middleware/errorHandler");
const infoHandler = require("./middleware/infoHandler");
const multer = require('multer'); 
const { uploadImage } = require('./utils/cloudStorage')

const app = express();
app.use(cors());

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024,
  },
});
app.use(multerMid.single('file'))

app.post('/uploads', async (req, res, next) => {
  try {
    const myFile = req.file
    const imageUrl = await uploadImage(myFile)
    res.status(200).json({
      message: "Upload succeed",
      daat: imageUrl
    })
  } catch (err) {
    next(err)
  }
})

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
app.use("/categories", categoriesRouter);
app.use("/priorities", prioritiesRouter);
app.use("/statuses", statusesRouter);
app.use("/orders", ordersRouter);
app.use("/time-entries", timeEntriesRouter);

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
