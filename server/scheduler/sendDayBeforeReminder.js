const axios = require('axios');
const qs = require('qs');
const db = require('../config/database');

const sendInterviewNoAttendedWhatsAppMessage = async () => {
  const userid = process.env.GUPSHUP_USER_ID;
  const password = process.env.GUPSHUP_PASSWORD;
  console.log("sendInterviewNoAttendedWhatsAppMessage called")

  const today = new Date();
  today.setDate(today.getDate() - 1); // Set to yesterday's date
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
      AND applications.offer_status = 'Not Attended'
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
      const readableDate = interviewDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', year: 'numeric' });
      const readableTime = interviewDate.toLocaleTimeString('en-IN', {timeZone: 'Asia/Kolkata',  hour: '2-digit', minute: '2-digit', hour12: true });

      const msg = `https://mediaapi.smsgupshup.com/GatewayAPI/rest?userid=${userid}&password=${password}&send_to=${candidate_phone}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=Hi+${candidate_name}%2C%0AWe+noticed+that+you+were+unable+to+attend+the+interview+for+the+${roleName}+role+at+${company_name}.%0A%0AWould+you+like+to+reschedule%3F+Let+us+know+if+you%E2%80%99re+still+interested+so+we+can+arrange+a+new+slot+for+you.+Looking+forward+to+your+response%21%0A%0AContact%3A+${hr_phone}%0AEmail%3A+${hr_email}&isTemplate=true&header=Missed+Interview&footer=EarlyJobs+HR+Team`;
      const res = await axios.get(msg);
      console.log(`✅ Message sent to ${candidate_phone}:`, res.data);

      if (res && res.data) {
        try {
          const notifRes = await axios.post("https://toolsapis.earlyjobs.ai/api/webhooks/notification", {
            phoneNumber: candidate_phone,
            message: `Hi ${candidate_name},
We noticed that you were unable to attend the interview for the ${roleName} role at ${company_name}.

Would you like to reschedule? Let us know if you’re still interested so we can arrange a new slot for you. Looking forward to your response!

Contact: ${hr_phone}
Email: ${hr_email}`,
            senderName: candidate_name
          });
          console.log(`📩 Notification API response for ${candidate_phone}:`, notifRes.data);
        } catch (postErr) {
          console.error(`❌ Failed to call notification API for ${candidate_phone}:`, postErr.message);
        }
      }

    }

    return { statusCode: 200, body: 'All messages sent' };

  } catch (err) {
    console.error('❌ Error sending messages:', err.message || err.response?.data);
    return { statusCode: 500, body: 'Error sending messages' };
  }
};

const sendDayBeforeInterviewReminder = async () => {
  const baseUrl = "https://mediaapi.smsgupshup.com/GatewayAPI/rest";
  const userid = process.env.GUPSHUP_USER_ID;
  const password = process.env.GUPSHUP_PASSWORD;
  sendInterviewNoAttendedWhatsAppMessage()

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
      const readableDate = interviewDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata',day: '2-digit', month: 'short', year: 'numeric' });
      const readableTime = interviewDate.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata',hour: '2-digit', minute: '2-digit', hour12: true });

      const msg = `https://mediaapi.smsgupshup.com/GatewayAPI/rest?userid=${userid}&password=${password}&send_to=${candidate_phone}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=Hi+${candidate_name}%2C%0A%0AWe%E2%80%99re+excited+to+remind+you+that+your+interview+for+the+${roleName}+role+at+${company_name}+is+scheduled+for+tomorrow%21%0A%0AHere+are+the+details%3A%0ADate%3A+${readableDate}%0ATime%3A+${readableTime}%0ALocation%3A+${location}%0A%0AIf+you+have+any+questions+or+need+any+assistance+before+the+interview%2C+feel+free+to+reach+out+to+us.%0A%0AContact%3A+${hr_phone}%0AEmail%3A+${hr_email}&isTemplate=true&header=Reminder%3A+Your+Interview+is+Scheduled+for+Tomorrow&footer=Team+EarlyJobs`;

      const res = await axios.get(msg);
      console.log(`✅ Message sent to ${candidate_phone}:`, res.data);
      if (res && res.data) {
        try {
          const notifRes = await axios.post("https://toolsapis.earlyjobs.ai/api/webhooks/notification", {
            phoneNumber: candidate_phone, 
            message: `Hi ${candidate_name},

We’re excited to remind you that your interview for the ${roleName} role at ${company_name} is scheduled for tomorrow!

Here are the details:
Date: ${readableDate}
Time: ${readableTime}
Location: ${location}

If you have any questions or need any assistance before the interview, feel free to reach out to us.

Contact: ${hr_phone}
Email: ${hr_email}`,
            senderName: candidate_name
          });
          console.log(`📩 Notification API response for ${candidate_phone}:`, notifRes.data);
        } catch (postErr) {
          console.error(`❌ Failed to call notification API for ${candidate_phone}:`, postErr.message);
        }
      }
    
    }

    return { statusCode: 200, body: 'All messages sent' };

  } catch (err) {
    console.error('❌ Error sending messages:', err.message || err.response?.data);
    return { statusCode: 500, body: 'Error sending messages' };
  }
};

module.exports = {
  sendDayBeforeInterviewReminder,
  sendInterviewNoAttendedWhatsAppMessage
};
