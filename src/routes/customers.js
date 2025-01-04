const express = require("express");
const router = express.Router();
const custumerController = require("../controllers/customersController");

router.get("/", custumerController.list);
router.post("/add", custumerController.save);
router.get("/delete/:id_producto", custumerController.delete);
router.get("/update/:id_producto", custumerController.edit);
router.post("/update/:id_producto", custumerController.saveUpdate);
router.get("/ubicacion", custumerController.ubication);
router.get("/multimedia", custumerController.multimedia);
router.get("/indexedDB", custumerController.uploadImages);
module.exports = router;
