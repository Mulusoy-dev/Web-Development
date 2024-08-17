const express = require("express");
const router = express.Router();
const equipmentController = require("../controllers/equipmentController");

// Equipment Router
router.post("/newEquipment", equipmentController.createNewEquipment);
router.get("/equipments/getAll", equipmentController.allEquipments);
router.get("/:equipmentCode", equipmentController.equipmentByCode);
router.put("/update/:equipmentCode", equipmentController.updateEquipment);
router.delete("/delete/:equipmentCode", equipmentController.deleteEquipment);

module.exports = router;
