const express = require('express');
const router = express.Router();
const validateNewJob = require('../middlewares/validateNewJob');
const { getJobById, createNewJob, updateExistingJob, deleteJob,getAllJobs} = require('../controllers/jobcontroller');
const verifyToken = require('../middlewares/verifyToken');


router.get('/', getAllJobs());

router.get('/:id', getJobById());

router.post('/add', verifyToken, validateNewJob, createNewJob());

router.put('/update/:id', verifyToken, updateExistingJob());

router.delete('/delete/:id', verifyToken, deleteJob());


module.exports = router;