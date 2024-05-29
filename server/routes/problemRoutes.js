import express from "express";
import problemController from "../controllers/problemController.js";

const router = express.Router();

router.get("/", problemController.getAllProblems);
router.get("/:id", problemController.getProblemById);
router.post("/", problemController.createProblem);
router.put("/:id", problemController.updateProblem);
router.delete("/:id", problemController.deleteProblem);

export { router as problemRouter };
