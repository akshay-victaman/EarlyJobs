const axios = require('axios');
const qs = require('qs');
const db = require('../config/database');

module.exports.dayBeforeHandler = async () => {
  const baseUrl = "https://mediaapi.smsgupshup.com/GatewayAPI/rest";
  const userid = process.env.GUPSHUP_USER_ID;
  const password = process.env.GUPSHUP_PASSWORD;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yyyy = tomorrow.getFullYear();
  const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const dd = String(tomorrow.getDate()).padStart(2, '0');
  const formattedDate = `${yyyy}-${mm}-${dd}`; // 'YYYY-MM-DD'

  const query = `
    SELECT 
      jobs.title AS roleName,
      jobs.company_name AS company_name,
      candidates.name AS candidate_name,
      candidates.email AS candidate_email,
      candidates.phone AS candidate_phone,
      applications.applied_by AS hr_email,
      users.username AS hr_name,
      users.phone AS hr_phone,
      applications.interview_date AS interview_date,
      jobs.location_link AS location
    FROM 
      applications
    INNER JOIN 
      candidates ON applications.candidate_id = candidates.id
    INNER JOIN 
      jobs ON applications.job_id = jobs.id
    INNER JOIN 
      users ON applications.applied_by = users.email
    WHERE 
      DATE(applications.interview_date) = ?
  `;

  try {
    const [results] = await db.execute(query, [formattedDate]);

    for (const row of results) {
      const {
        candidate_name,
        candidate_phone,
        roleName,
        company_name,
        interview_date,
        location,
        hr_name,
        hr_phone,
        hr_email
      } = row;

      const interviewDate = new Date(interview_date);
      const readableDate = interviewDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      const readableTime = interviewDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

      const msg = `Hi ${candidate_name},
        Your interview for the ${roleName} role at ${company_name} is scheduled for tomorrow.

        📅 Date: ${readableDate}
        ⏰ Time: ${readableTime}
        📍 Location: ${location}

        All the best!
        — Team EarlyJobs`;

      const payload = {
        userid,
        password,
        send_to: `91${candidate_phone}`,
        v: '1.1',
        format: 'json',
        msg_type: 'TEXT',
        method: 'SENDMESSAGE',
        msg,
        isTemplate: false,
        header: 'Interview Reminder',
        footer: 'EarlyJobs HR Team'
      };

      const res = await axios.get(`${baseUrl}?${qs.stringify(payload)}`);
      console.log(`✅ Message sent to ${candidate_phone}:`, res.data);
    }

    return { statusCode: 200, body: 'All messages sent' };

  } catch (err) {
    console.error('❌ Error sending messages:', err.message || err.response?.data);
    return { statusCode: 500, body: 'Error sending messages' };
  }
};
