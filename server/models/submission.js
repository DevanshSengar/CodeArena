import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    language: {
      type: String,
      required: true,
      default: "cpp",
    },
    code: {
      type: String,
      required: true,
    },
    verdict: {
      type: String,
      default: "PENDING",
    },
    time: {
      type: Number,
    },
    memory: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const SubmissionModel = mongoose.model("Submission", SubmissionSchema);
export { SubmissionModel as Submission };
