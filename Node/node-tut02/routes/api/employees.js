const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");
const verifyJWT = require("../../middleware/verifyJWT");

router
  .route("/")
  // .get(verifyJWT, employeesController.getAllEmployees) // Bu route JWT ile yetkilendirildi.
  .get(verifyJWT, employeesController.getAllEmployees) // Bu route JWT ile yetkilendirildi.
  .post(verifyJWT, employeesController.createNewEmployee)
  .put(verifyJWT, employeesController.updateEmployee)
  .delete(verifyJWT, employeesController.deleteEmployee);

router.route("/:id").get(verifyJWT, employeesController.getEmployee);

module.exports = router;
