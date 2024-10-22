const validateNewJob = (req, res, next) => {
    const { companyName, minexp, maxexp, description, salary, location, locationType, jobrole, jobType, skills } = req.body;
    console.log(req.body);
    // if (!companyName || !minexp || !maxexp || !description || !salary || !location || !locationType || !jobrole || !jobType || !skills) {
    //     return res.status(400).json({
    //         message: 'Please provide all required fields',
    //     });
    // }

    const validSkills = Array.isArray(skills) && skills.every(skill => typeof skill === 'string');
    const validSalary = typeof salary === 'number' && salary > 0;
    const validexp = typeof minexp === 'number' && typeof maxexp === 'number'
    if (!validSkills) {
        return res.status(400).json({
            message: 'Invalid skills',
        });
    }
    
    if (!validSalary) {
        return res.status(400).json({
            message: 'Invalid salary',
        });
    }
    if(!validexp){
        return res.status(400).json({
            message: 'Invalid experience',
        });
    }
    if ( minexp > maxexp ) {
        return res.status(400).json({
            message: 'Min experience cannot be greater than Max experience',
        });
    }
    next();
};

module.exports = validateNewJob;