const Application = require('../models/Application')
const User = require('../models/User')
const Job = require('../models/Job')
const { sendApplicationEmail } = require('../utils/sendEmail')

exports.applyJob = async (req, res) => {
  try {
    const existing = await Application.findOne({ job: req.params.jobId, applicant: req.user.id })
    if (existing) return res.status(400).json({ msg: 'Already applied' })

    const application = await Application.create({
      job: req.params.jobId,
      applicant: req.user.id,
      resume: req.file ? req.file.filename : ''
    })

    const candidate = await User.findById(req.user.id)
    const job = await Job.findById(req.params.jobId)

    await sendApplicationEmail(candidate.email, candidate.name, job.title, job.company)

    res.status(201).json(application)
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Server error' })
  }
}

exports.getMyApplications = async (req, res) => {
  try {
    const apps = await Application.find({ applicant: req.user.id }).populate('job')
    res.json(apps)
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
}

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('job').populate('applicant')

    const { sendStatusUpdateEmail } = require('../utils/sendEmail')
    await sendStatusUpdateEmail(
      application.applicant.email,
      application.applicant.name,
      application.job.title,
      application.job.company,
      status
    )

    res.json(application)
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
}