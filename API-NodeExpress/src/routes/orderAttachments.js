const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { v4: uuidv4 } = require('uuid');
const OrderAttachment = require("../models/orderAttachment");
const { uploadImage, deleteImage } = require('../utils/cloudStorage');
const Order = require("../models/order");

router.post("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: "Chamado não encontrado!" });
    }

    const uniqueIdentifier = uuidv4();
    const myFile = req.file;

    const fileExtension = `.${myFile.originalname.split('.').pop()}`;

    const imageUrl = await uploadImage(myFile, `${uniqueIdentifier}${fileExtension}`);

    const fileName = myFile.originalname;

    const orderAttachment = await OrderAttachment.create({
      uniqueIdentifier,
      fileName,
      extension: fileExtension,
      orderId: id
    });

    res.status(200).json({
      message: "Arquivo salvo com sucesso!",
      url: imageUrl,
      orderAttachment
    });

  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao salvar arquivo.",
      detail: error,
    });
  }
});

const deleteAttachment = async (uuid) => {
  try {
    const orderAttachment = await OrderAttachment.findOne({
      where: {
        uniqueIdentifier: uuid,
      },
    });

    if (!orderAttachment) {
      throw new Error("Registro de anexo não encontrado.");
    }

    const fileName = orderAttachment.fileName;
    return { orderAttachment, fileName };
  } catch (error) {
    throw new Error(`Erro ao excluir o anexo: ${error.message}`);
  }
};

router.delete("/:uuid", authMiddleware, async (req, res, next) => {
  try {
    const { uuid } = req.params;
    const { orderAttachment, fileName } = await deleteAttachment(uuid);
    await orderAttachment.destroy();
    await deleteImage(`${orderAttachment.uniqueIdentifier}${orderAttachment.extension}`);
    res.status(200).json({
      message: `Anexo ${uuid} e registro OrderAttachment excluídos com sucesso.`,
    });
  } catch (error) {
    next({
      statusCode: 500,
      message: "Erro ao excluir o anexo.",
      detail: error.message,
    });
  }
});


module.exports = router;
