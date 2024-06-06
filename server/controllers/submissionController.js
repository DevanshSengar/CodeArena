import mongoose from "mongoose";
import { Submission } from "../models/submission.js";
import { Problem } from "../models/problem.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";

// Create a new submission
const createSubmission = async (req, res) => {
  const { userId, problemId, language, code, verdict, time, memory } = req.body;

  const submissionId = new mongoose.Types.ObjectId();
  const submission = new Submission({
    _id: submissionId,
    userId,
    problemId,
    language,
    code,
    verdict,
    time,
    memory,
  });

  await submission.save();
  res.status(201).json({
    success: true,
    message: "Submission created successfully",
    submission,
  });
};

const getAllSubmissions = async (req, res) => {
  const submissionsCursor = Submission.find()
    .sort({ createdAt: -1 })
    .populate()
    .cursor();

  let submissions = [];
  for (
    let doc = await submissionsCursor.next();
    doc != null;
    doc = await submissionsCursor.next()
  ) {
    submissions.push(doc);
  }
  await submissionsCursor.close();

  res.status(200).json({
    success: true,
    message: "Submissions fetched successfully",
    submissions,
  });
};

// Get submissions by problemId
const getSubmissionsByProblem = async (req, res) => {
  const { problemId } = req.params;

  const submissionsCursor = Submission.find({ problemId })
    .populate("userId", "email")
    .cursor();

  let submissions = [];
  for (
    let doc = await submissionsCursor.next();
    doc != null;
    doc = await submissionsCursor.next()
  ) {
    submissions.push(doc);
  }
  await submissionsCursor.close();

  res.status(200).json({
    success: true,
    message: "Submissions by problem fetched successfully",
    submissions,
  });
};

// Get submissions by userId
const getSubmissionsByUser = async (req, res) => {
  const { userId } = req.params;

  const submissionsCursor = Submission.find({ userId }).populate().cursor();

  let submissions = [];
  for (
    let doc = await submissionsCursor.next();
    doc != null;
    doc = await submissionsCursor.next()
  ) {
    submissions.push(doc);
  }
  await submissionsCursor.close();

  res.status(200).json({
    success: true,
    message: "Submissions by user fetched successfully",
    submissions,
  });
};

const getSubmissionsByUserAndProblem = async (req, res) => {
  const { userId, problemId } = req.params;

  const submissionsCursor = Submission.find({ userId, problemId })
    .sort({ createdAt: -1 })
    .populate()
    .cursor();

  let submissions = [];
  for (
    let doc = await submissionsCursor.next();
    doc != null;
    doc = await submissionsCursor.next()
  ) {
    submissions.push(doc);
  }
  await submissionsCursor.close();

  res.status(200).json({
    success: true,
    message: "Submissions by user and problem fetched successfully",
    submissions,
  });
};

export default {
  createSubmission: asyncWrapper(createSubmission),
  getAllSubmissions: asyncWrapper(getAllSubmissions),
  getSubmissionsByProblem: asyncWrapper(getSubmissionsByProblem),
  getSubmissionsByUser: asyncWrapper(getSubmissionsByUser),
  getSubmissionsByUserAndProblem: asyncWrapper(getSubmissionsByUserAndProblem),
};
