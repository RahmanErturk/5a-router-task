import express from "express";

import * as controller from "../controller/recordsController.js";

const router = express.Router();

router
  .get("/", controller.getAllRecords)
  .get("/:id", controller.getRecord)
  .post("/", controller.saveRecord)
  .put("/:id", controller.editRecord)
  .delete("/:id", controller.deleteRecord);

export default router;
