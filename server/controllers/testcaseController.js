import { TestCase } from "../models/testcase.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";

const createTestCase = async (req, res) => {
  const { problemId, testCase } = req.body;
  if (!problemId || !testCase) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Problem ID and Test Case are required",
      });
  }

  // Check if a document with the given problemId already exists
  let existingTestCases = await TestCase.findOne({ problemId });

  if (existingTestCases) {
    // If it exists, push the new test case into the array
    existingTestCases.testCase.push(testCase);
    await existingTestCases.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Test case added successfully",
        testCases: existingTestCases,
      });
  } else {
    // If it doesn't exist, create a new document
    const newTestCase = new TestCase({
      problemId,
      testCase: [testCase],
    });

    const savedTestCase = await newTestCase.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Test case created successfully",
        testCases: savedTestCase,
      });
  }
};

const getTestCasesByProblemId = async (req, res) => {
  const { problemId } = req.params;

  const testCases = await TestCase.find({ problemId });
  if (!testCases || testCases.length === 0) {
    return res
      .status(404)
      .json({
        success: false,
        message: "Test cases not found for the given problem ID",
      });
  }

  res
    .status(200)
    .json({
      success: true,
      message: "Test cases fetched successfully",
      testCases,
    });
};

const deleteTestCaseById = async (req, res) => {
  const { problemId, testID } = req.params;

  const testCase = await TestCase.findOneAndUpdate(
    { problemId },
    { $pull: { testCase: { testID } } },
    { new: true }
  );

  if (!testCase) {
    return res.status(404).json({
      success: false,
      message: "Test case not found for the given problem ID and test ID",
    });
  }

  res
    .status(200)
    .json({
      success: true,
      message: "Test case deleted successfully",
      testCases: testCase,
    });
};

const deleteAllTestCasesByProblemId = async (req, res) => {
  const { problemId } = req.params;

  const result = await TestCase.deleteMany({ problemId });

  if (result.deletedCount === 0) {
    return res
      .status(404)
      .json({
        success: false,
        message: "No test cases found for the given problem ID",
      });
  }

  res
    .status(200)
    .json({ success: true, message: "All test cases deleted successfully" });
};

export default {
  createTestCase: asyncWrapper(createTestCase),
  getTestCasesByProblemId: asyncWrapper(getTestCasesByProblemId),
  deleteTestCaseById: asyncWrapper(deleteTestCaseById),
  deleteAllTestCasesByProblemId: asyncWrapper(deleteAllTestCasesByProblemId),
};
