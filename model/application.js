const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job", // Referencing the Job model
      required: true,
    },
    jobrole:{
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    resumeUrl: {
      type: String,
      required: true, // Stores the URL of the uploaded resume (e.g., in a cloud storage service)
    },
    appliedAt: {
      type: Date,
      default: Date.now, // Automatically record the time of application
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("Application", applicationSchema);
