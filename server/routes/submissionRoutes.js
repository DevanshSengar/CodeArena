// routes/submission.js
import express from "express";
import submissionController from "../controllers/submissionController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// Create a new submission
router.post("/", submissionController.createSubmission);
// router.post('/submit', createSubmission);

router.get("/", submissionController.getAllSubmissions);

// Get submissions by problemId
router.get("/problem/:problemId", submissionController.getSubmissionsByProblem);

// Get submissions by userId
router.get(
  "/user/:username",
  verifyToken,
  submissionController.getSubmissionsByUser
);

router.get(
  "/user/:username/problem/:problemId",
  verifyToken,
  submissionController.getSubmissionsByUserAndProblem
);

// Create a submission and run it on all testcases i.e. submit the code

export { router as submissionRouter };
