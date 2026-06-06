const router = require('express').Router()
const auth = require('../middleware/authMiddleware')
const multer = require('multer')
const { applyJob, getMyApplications, updateStatus } = require('../controllers/applicationController')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})
const upload = multer({ storage })

router.post('/:jobId', auth, upload.single('resume'), applyJob)
router.get('/my', auth, getMyApplications)
router.put('/:id/status', auth, updateStatus)

module.exports = router