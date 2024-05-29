import Problem from "../models/problem.js";
import asyncWrapper from "../utils/asyncWrapper.js";

// Controller methods for handling problem-related operations
const getAllProblems = async (req, res) => {
  const problems = await Problem.find();
  return res.json(problems);
};

const getProblemById = async (req, res) => {
  const problem = await Problem.findById(req.params.id);
  if (!problem) {
    return res.status(404).json({ message: "Problem not found" });
  }
  return res.json(problem);
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
  return res.status(201).json(newProblem);
};

const updateProblem = async (req, res) => {
  const updatedProblem = await Problem.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedProblem) {
    return res.status(404).json({ message: "Problem not found" });
  }
  return res.json(updatedProblem);
};

const deleteProblem = async (req, res) => {
  const deletedProblem = await Problem.findByIdAndDelete(req.params.id);
  if (!deletedProblem) {
    return res.status(404).json({ message: "Problem not found" });
  }
  return res.json({ message: "Problem deleted successfully" });
};

export default {
  getAllProblems: asyncWrapper(getAllProblems),
  getProblemById: asyncWrapper(getProblemById),
  createProblem: asyncWrapper(createProblem),
  updateProblem: asyncWrapper(updateProblem),
  deleteProblem: asyncWrapper(deleteProblem),
};
