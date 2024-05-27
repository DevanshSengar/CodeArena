import mongoose from "mongoose";

const TestcaseSchema = new mongoose.Schema({
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: [true, "Please enter Problem ID"],
  },
  testCase: [
    {
      input: {
        type: String,
        required: [true, "Please enter input"],
      },
      output: {
        type: String,
        required: [true, "Please enter output"],
      },
    },
  ],
});

const TestcaseModel = mongoose.model("TestCases", TestcaseSchema);
export { TestcaseModel as TestCase };
