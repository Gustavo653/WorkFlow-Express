const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Status = sequelize.define("Status", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

Status.beforeSync(async () => {
  try {
    const priorities = ["Aberto", "Em Progresso", "Encerrado"];
    for (const priorityName of priorities) {
      const existingStatus = await Status.findOne({
        where: { name: priorityName },
      });
      if (!existingStatus) {
        await Status.create({ name: priorityName });
      }
    }
    console.log("Valores de status inseridos com sucesso.");
  } catch (error) {
    console.error("Erro ao inserir valores de status:", error);
  }
});

module.exports = Status;
