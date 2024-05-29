import express from "express";
import testCaseController from "../controllers/testcaseController.js";

const router = express.Router();

router.post("/", testCaseController.createTestCase);
router.get("/:problemId", testCaseController.getTestCasesByProblemId);
router.delete("/:problemId", testCaseController.deleteAllTestCasesByProblemId);
router.delete("/:problemId/:testID", testCaseController.deleteTestCaseById);

export { router as testcaseRouter };
