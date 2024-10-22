const application = require("../model/application");
const Application = require("../model/application");

const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json({
      message: "All Applications",
      applications: applications,
    });
  } catch (error) {
    console.error("Error fetching applications:", error); // Log the error
    res.status(500).json({
      message: "Error fetching applications",
      error: error.message,
    });
  }
};


const applyApplication = async (req, res) => {
  try {
    const { jobId, name, email, jobrole } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Resume file is required" });
    }

    const resumeUrl = req.file.path; // The file path from multer
    const resumeFilename = path.basename(resumeUrl); 
    
    const newApplication = new Application({
      jobId,
      name,
      email,
      jobrole,
      resumeUrl : resumeFilename,
    });

    await newApplication.save();
    res.status(200).json({ message: "Application submitted successfully", application: newApplication });
  } catch (error) {
    console.error("Error applying for job:", error); // Log the error for debugging
    res.status(500).json({ error: "Error applying for job" });
  }
};


module.exports = {
  getAllApplications,
  applyApplication,
};
