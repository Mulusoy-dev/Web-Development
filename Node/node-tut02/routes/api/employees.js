const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");
const verifyJWT = require("../../middleware/verifyJWT");

// Roles
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  // .get(verifyJWT, employeesController.getAllEmployees) // Bu route JWT ile yetkilendirildi.
  .get(verifyJWT, employeesController.getAllEmployees) // Bu route JWT ile yetkilendirildi.
  .post(
    verifyJWT,
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.createNewEmployee
  )
  .put(
    verifyJWT,
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.updateEmployee
  )
  .delete(
    // Sadece ADMIN silebilir.
    verifyJWT,
    verifyRoles(ROLES_LIST.Admin),
    employeesController.deleteEmployee
  );

router.route("/:id").get(verifyJWT, employeesController.getEmployee);

module.exports = router;
