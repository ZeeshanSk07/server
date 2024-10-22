const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
        },
        minexp: {
            type: Number,
            required: true,
        },
        maxexp: {
            type: Number,
            required: true,
        },
        jobrole:{
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        salary: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        locationType: {
            type: String,
            required: true,
        },
        jobType: {
            type: String,
            required: true,
        },
        skills: {
            type: Array,
            required: true,
        }
    },
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("Job", jobSchema);