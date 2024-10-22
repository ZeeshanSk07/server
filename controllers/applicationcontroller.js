const application = require("../model/application");
const Application = require("../model/application");

function getAllApplications() {
  return async (req, res, next) => {
    try {
      const applications = await Application.find();
      res.status(200).json({
        message: "All Applications",
        applications: applications,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error fetching applications",
        error: error.message,
      });
    }
  };
}

function applyApplication() {
  return async (req, res) => {
    try {
      const { jobId, name, email, jobrole } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: "Resume file is required" });
      }

      const resumeUrl = req.file.path; 
      const newApplication = new Application({
        jobId,
        name,
        email,
        jobrole,
        resumeUrl,
      });

      await newApplication.save();
      res.status(200).json({ message: "Application submitted successfully", application: newApplication });
    } catch (error) {
      console.error("Error applying for job:", error); // Log the error for debugging
      res.status(500).json({ error: "Error applying for job" });
    }
  };
}


module.exports = {
  getAllApplications,
  applyApplication,
};