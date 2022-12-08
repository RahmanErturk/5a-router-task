import express from "express";

import * as controller from "../controller/usersController.js";

const router = express.Router();

router
  .get("/", controller.getAllUsers)
  .get("/:id", controller.getUser)
  .post("/", controller.saveUser)
  .put("/:id", controller.editUser)
  .delete("/:id", controller.deleteUser);

export default router;
