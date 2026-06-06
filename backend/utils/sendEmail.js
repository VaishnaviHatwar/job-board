const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

const sendApplicationEmail = async (candidateEmail, candidateName, jobTitle, company) => {
  const mailOptions = {
    from: `"JobBoard" <${process.env.EMAIL_USER}>`,
    to: candidateEmail,
    subject: `Application Submitted — ${jobTitle} at ${company}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #1d4ed8; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0;">JobBoard</h1>
        </div>
        <div style="background-color: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #111827;">Hi ${candidateName}! 👋</h2>
          <p style="color: #374151; font-size: 16px;">Your application has been submitted successfully!</p>
          <div style="background-color: white; border-left: 4px solid #1d4ed8; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">Applied for</p>
            <h3 style="margin: 5px 0; color: #1d4ed8;">${jobTitle}</h3>
            <p style="margin: 0; color: #374151;">at ${company}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px;">The employer will review your application and get back to you soon.</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; text-align: center;">JobBoard — Find Your Dream Job</p>
          </div>
        </div>
      </div>
    `
  }

  await transporter.sendMail(mailOptions)
}

const sendStatusUpdateEmail = async (candidateEmail, candidateName, jobTitle, company, status) => {
  const statusMessages = {
    reviewed: { emoji: '👀', text: 'Your application is being reviewed!', color: '#3b82f6' },
    accepted: { emoji: '🎉', text: 'Congratulations! Your application has been accepted!', color: '#10b981' },
    rejected: { emoji: '😔', text: 'Unfortunately, your application was not selected.', color: '#ef4444' }
  }

  const statusInfo = statusMessages[status] || { emoji: '📋', text: 'Your application status has been updated.', color: '#6b7280' }

  const mailOptions = {
    from: `"JobBoard" <${process.env.EMAIL_USER}>`,
    to: candidateEmail,
    subject: `Application Update — ${jobTitle} at ${company}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #1d4ed8; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0;">JobBoard</h1>
        </div>
        <div style="background-color: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #111827;">Hi ${candidateName}! ${statusInfo.emoji}</h2>
          <p style="color: #374151; font-size: 16px;">${statusInfo.text}</p>
          <div style="background-color: white; border-left: 4px solid ${statusInfo.color}; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">Job</p>
            <h3 style="margin: 5px 0; color: ${statusInfo.color};">${jobTitle}</h3>
            <p style="margin: 0; color: #374151;">at ${company}</p>
            <p style="margin: 5px 0 0; color: #374151;">Status: <strong style="color: ${statusInfo.color};">${status.toUpperCase()}</strong></p>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; text-align: center;">JobBoard — Find Your Dream Job</p>
          </div>
        </div>
      </div>
    `
  }

  await transporter.sendMail(mailOptions)
}

module.exports = { sendApplicationEmail, sendStatusUpdateEmail }