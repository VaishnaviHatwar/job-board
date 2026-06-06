const router = require('express').Router()
const { getJobRecommendations } = require('../controllers/aiController')

router.post('/recommend', getJobRecommendations)

module.exports = router