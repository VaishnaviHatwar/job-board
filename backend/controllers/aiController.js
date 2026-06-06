const Groq = require('groq-sdk')
const Job = require('../models/Job')

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

exports.getJobRecommendations = async (req, res) => {
  try {
    const { message, conversationHistory } = req.body
    const jobs = await Job.find({})

    const jobsList = jobs.map(j => 
      `- ${j.title} at ${j.company} (${j.location}, ${j.type}${j.salary ? ', ' + j.salary : ''}): ${j.description.substring(0, 100)}`
    ).join('\n')

    const systemPrompt = `You are a helpful job assistant for JobBoard. Help candidates find relevant jobs based on their skills and experience.

Available jobs on our platform:
${jobsList}

When a candidate describes their skills or asks for job recommendations:
1. Suggest the most relevant jobs from the list above
2. Explain why each job matches their profile
3. Keep responses concise and friendly
4. If no jobs match, encourage them to check back later`

    const messages = [
      { role: 'system', content: systemPrompt },
      ...(conversationHistory || []),
      { role: 'user', content: message }
    ]

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages,
      max_tokens: 500
    })

    res.json({ reply: completion.choices[0].message.content })
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'AI error' })
  }
}