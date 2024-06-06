import { Problem } from "../models/problem.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";

const getAllProblems = async (req, res) => {
  const problems = await Problem.find();
  return res
    .status(200)
    .json({
      success: true,
      message: "Problems fetched successfully",
      problems,
    });
};

const getProblemById = async (req, res) => {
  const problem = await Problem.findById(req.params.id);
  if (!problem) {
    return res
      .status(404)
      .json({ success: false, message: "Problem not found" });
  }
  return res
    .status(200)
    .json({ success: true, message: "Problem fetched successfully", problem });
};

const createProblem = async (req, res) => {
  const problem = new Problem({
    title: req.body.title,
    description: req.body.description,
    sampleInput: req.body.sampleInput,
    sampleOutput: req.body.sampleOutput,
    difficulty: req.body.difficulty,
  });

  const newProblem = await problem.save();
  return res
    .status(201)
    .json({
      success: true,
      message: "Problem created successfully",
      problem: newProblem,
    });
};

const updateProblem = async (req, res) => {
  const updatedProblem = await Problem.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedProblem) {
    return res
      .status(404)
      .json({ success: false, message: "Problem not found" });
  }
  return res
    .status(200)
    .json({
      success: true,
      message: "Problem updated successfully",
      problem: updatedProblem,
    });
};

const deleteProblem = async (req, res) => {
  const deletedProblem = await Problem.findByIdAndDelete(req.params.id);
  if (!deletedProblem) {
    return res
      .status(404)
      .json({ success: false, message: "Problem not found" });
  }
  return res
    .status(200)
    .json({ success: true, message: "Problem deleted successfully" });
};

export default {
  getAllProblems: asyncWrapper(getAllProblems),
  getProblemById: asyncWrapper(getProblemById),
  createProblem: asyncWrapper(createProblem),
  updateProblem: asyncWrapper(updateProblem),
  deleteProblem: asyncWrapper(deleteProblem),
};
