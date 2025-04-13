const axios = require('axios');
const qs = require('qs');
const db = require('../config/database');

module.exports.interviewDayHandler = async () => {
  const baseUrl = "https://mediaapi.smsgupshup.com/GatewayAPI/rest";
  const userid = process.env.GUPSHUP_USER_ID;
  const password = process.env.GUPSHUP_PASSWORD;
  
  sendNotJoinedWhatsAppMessages()

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
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
    console.log(results);

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
      const readableTime = interviewDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

      const msg = `https://media.smsgupshup.com/GatewayAPI/rest?userid=${userid}&password=${password}&send_to=${candidate_phone}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=Hi+${candidate_name}%2C%0AHope+you%27re+doing+great%21+Just+a+quick+reminder+about+your+interview+for+the+${roleName}+role+at+${company_name}+today.%0A%0A%E2%8F%B3+Time%3A+${readableTime}%0A%F0%9F%93%8D+Location%3A+${location}%0A%0AWishing+you+all+the+best%21+See+you+soon.+%F0%9F%98%8A%0A%0A%F0%9F%93%9E+Contact%3A+${hr_phone}%0A%F0%9F%93%A7+Email%3A+${hr_email}&isTemplate=true&header=Interview+Today&footer=EarlyJobs+Recruitment+Team`;

      const res = await fetch(msg);
      const data = await res.json();
      console.log(`✅ Message sent to ${candidate_phone}:`, res.data);
    }

    return { statusCode: 200, body: 'All messages sent' };

  } catch (err) {
    console.error('❌ Error sending messages:', err.message || err.response?.data);
    return { statusCode: 500, body: 'Error sending messages' };
  }
};

sendNotJoinedWhatsAppMessages = async () => {
  const userid = process.env.GUPSHUP_USER_ID;
  const password = process.env.GUPSHUP_PASSWORD;

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
      jobs.location_link AS location,
      applications.reminder_count AS reminder_count,
      applications.id AS application_id
    FROM 
      applications
    INNER JOIN 
      candidates ON applications.candidate_id = candidates.id
    INNER JOIN 
      jobs ON applications.job_id = jobs.id
    INNER JOIN 
      users ON applications.applied_by = users.email
    WHERE 
      applications.reminder_count < 3 AND
      applications.offer_status = 'Selected'
  `;

  try {
    const [results] = await db.execute(query);
    console.log(results);

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
      const readableTime = interviewDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
      const msg = `https://media.smsgupshup.com/GatewayAPI/rest?userid=${userid}&password=${password}&send_to=${candidate_phone}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=Hi+${candidate_name}%2C%0AHope+you%27re+doing+great%21+Just+a+quick+reminder+about+your+interview+for+the+${roleName}+role+at+${company_name}+today.%0A%0A%E2%8F%B3+Time%3A+${readableTime}%0A%F0%9F%93%8D+Location%3A+${location}%0A%0AWishing+you+all+the+best%21+See+you+soon.+%F0%9F%98%8A%0A%0A%F0%9F%93%9E+Contact%3A+${hr_phone}%0A%F0%9F%93%A7+Email%3A+${hr_email}&isTemplate=true&header=Interview+Today&footer=EarlyJobs+Recruitment+Team`;

      const res = await fetch(msg);
      const data = await res.json();
      await db.query('UPDATE applications SET reminder_count = reminder_count + 1 WHERE id = ?', [row.application_id]);
      console.log(`✅ Message sent to ${candidate_phone}:`, res.data);
    }

    return { statusCode: 200, body: 'All messages sent' };

  } catch (err) {
    console.error('❌ Error sending messages:', err.message || err.response?.data);
    return { statusCode: 500, body: 'Error sending messages' };
  }
};
     