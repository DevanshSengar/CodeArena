import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

const SubmissionModel = mongoose.model("Submission", SubmissionSchema);
export { SubmissionModel as Submission };
