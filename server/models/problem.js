import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sampleInput: {
    type: String,
    required: true,
  },
  sampleOutput: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
});

const ProblemModel = mongoose.model("Problem", ProblemSchema);
export { ProblemModel as Problem };
