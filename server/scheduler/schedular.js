const cron = require('node-cron');
const { 
    sendDayBeforeInterviewReminder, 
  sendInterviewNoAttendedWhatsAppMessage 
} = require('./sendDayBeforeReminder.js'); // Adjust the path as necessary
const { sendNotJoinedWhatsAppMessages, sendInterviewDayReminder } = require('./sendInterviewDayReminder.js');

const startCronJobs = () => {
  console.log('🛎️  Scheduler started...');

  // Interview Reminder — runs every day at 6 PM
  cron.schedule('0 18 * * *', async () => {
    console.log('🛎️  Sending interview reminders...');
    await sendDayBeforeInterviewReminder();
    console.log('🛎️  Sending not attended interview followups...');
    await sendInterviewNoAttendedWhatsAppMessage();
    console.log('🛎️  Interview reminders sent successfully!');
  },{
    timezone: 'Asia/Kolkata'  // <-- very important!
  });

  // Not Attended Interview Followup — runs every day at 7 AM
  cron.schedule('0 7 * * *', async () => {
    console.log('🛎️  Sending interview day reminders...');
    await sendInterviewDayReminder();
    console.log('🛎️  Interview day reminders sent successfully!');
    await sendNotJoinedWhatsAppMessages();
    console.log('🛎️  Not joined interview followups sent successfully!');
  }, {
    timezone: 'Asia/Kolkata'  // <-- very important!
  });
};

module.exports = {
  startCronJobs
};
