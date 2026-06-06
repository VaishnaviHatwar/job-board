const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { getAllJobs, getJobById, createJob, deleteJob } = require('../controllers/jobController');

router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/', auth, createJob);
router.delete('/:id', auth, deleteJob);

module.exports = router;