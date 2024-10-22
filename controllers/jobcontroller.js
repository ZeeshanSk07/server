const Job = require("../model/job");
//working
function getJobById() {
  return async (req, res, next) => {
    try {
      const jobID = req.params.id;
      const job = await Job.findById(jobID);
      if (job) {
        res.status(200).json({
          message: "Job found",
          job: job,
        });
      }
    } catch (error) {
      next("Error Finding Job", error);
    }
  };
}

//working
function getAllJobs() {
    return async (req,res,next)=>{
        try {
            const jobss = await Job.find();
            res.status(200).json({
                message: "Jobs found",
                jobs: jobss
            });
        } catch (error) {
            next(error); 
        }
}};

//working
function createNewJob() {
  return async (req, res, next) => {
    try {
      const {
        companyName,
        minexp,
        maxexp,
        description,
        salary,
        jobrole,
        location,
        locationType,
        jobType,
        skills,
      } = req.body;

      const newJob = new Job({
        companyName,
        minexp,
        maxexp,
        jobrole,
        description,
        salary,
        location,
        locationType,
        jobType,
        skills,
      });
      await newJob.save();
      res.status(201).json({
        message: "Job added successfully",
        jobID: newJob,
      });
    } catch (error) {
      next({
        message: "Error Adding Job",
        error,
      });
    }
  };
}

//working
function updateExistingJob() {
  return async (req, res, next) => {
    try {
      const id = req.params.id;
      console.log(id);
      const {
        companyName,
        minexp,
        maxexp,
        description,
        jobrole,
        salary,
        location,
        locationType,
        jobType,
        skills,
      } = req.body;
      console.log(req.body);
      const updatedJob = await Job.findByIdAndUpdate(id, {
        companyName,
        minexp,
        description,
        maxexp,
        jobrole,
        salary,
        location,
        locationType,

        jobType,
        skills,
      },
      { new: true });

      res.status(200).json({
        message: "Job updated successfully",
        job: updatedJob,
      });
    } catch (error) {
      next("Error Updating Job from server", error);
    }
  };
}

//working
function deleteJob() {
  return async (req, res, next) => {
    try {
      const jobID = req.params.id;
      await Job.findByIdAndDelete(jobID);
      res.status(200).json({
        message: "Job deleted successfully",
      });
    } catch (error) {
      next("Error Deleting Job", error);
    }
  };
}

module.exports = {
  getJobById,
  createNewJob,
  updateExistingJob,
  deleteJob,
  getAllJobs
};
