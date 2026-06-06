const Job = require('../models/Job');

exports.getAllJobs = async (req, res) => {
  try {
    const { search, location, type } = req.query;
    let filter = {};
    if (search) filter.title = { $regex: search, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (type) filter.type = type;
    const jobs = await Job.find(filter).populate('postedBy', 'name email').sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name email');
    if (!job) return res.status(404).json({ msg: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, postedBy: req.user.id });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};