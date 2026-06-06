const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const Job = require('./models/Job')

const jobs = [
  { title: 'Frontend Developer', company: 'TechCorp', location: 'Mumbai', description: 'We are looking for a skilled Frontend Developer with React experience. Must know HTML, CSS, JavaScript.', salary: '₹4-6 LPA', type: 'Full-time' },
  { title: 'Backend Developer', company: 'Infosys', location: 'Pune', description: 'Looking for Node.js backend developer with MongoDB experience. REST API development required.', salary: '₹5-8 LPA', type: 'Full-time' },
  { title: 'UI/UX Designer', company: 'Wipro', location: 'Bangalore', description: 'Creative UI/UX designer needed with Figma and Adobe XD skills. Portfolio required.', salary: '₹3-5 LPA', type: 'Full-time' },
  { title: 'Data Analyst', company: 'Accenture', location: 'Hyderabad', description: 'Data analyst with Python and SQL skills needed. Experience with Power BI preferred.', salary: '₹4-7 LPA', type: 'Full-time' },
  { title: 'React Native Developer', company: 'Startupx', location: 'Remote', description: 'Mobile app developer needed for cross-platform development using React Native.', salary: '₹3-5 LPA', type: 'Remote' },
  { title: 'Web Development Intern', company: 'Codsoft', location: 'Remote', description: 'Internship opportunity for web development. Learn MERN stack in a real environment.', salary: '₹10-15k/month', type: 'Internship' },
]

const seedDB = async () => {
  await mongoose.connect(process.env.MONGO_URI)
  await Job.deleteMany({})
  await Job.insertMany(jobs)
  console.log('Database seeded!')
  process.exit()
}

seedDB()