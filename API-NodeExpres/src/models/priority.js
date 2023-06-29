const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Priority = sequelize.define("Priority", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

Priority.sync()
  .then(async () => {
    const priorities = ["Baixa", "Média", "Alta", "Urgente"];
    for (const priorityName of priorities) {
      const existingPriority = await Priority.findOne({
        where: { name: priorityName },
      });
      if (!existingPriority) {
        await Priority.create({ name: priorityName });
      }
    }
    console.log("Valores de prioridade inseridos com sucesso.");
  })
  .catch((error) => {
    console.error("Erro ao inserir valores de prioridade:", error);
  });

module.exports = Priority;
