const cors = require('cors');
const sls = require('serverless-http');
const app = require('./config/express');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const adminRoutes = require('./routes/adminRoutes');
const publicJobRoutes = require('./routes/publicJobRoutes');
const companyRoutes = require('./routes/companyRoutes');

app.use(cors());

app.use('/api', userRoutes);
app.use('/jobs', jobRoutes);
app.use('/admin', adminRoutes);
app.use('/api/public', publicJobRoutes);
app.use('/api/companies', companyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// module.exports.server = sls(app)





// exports.server = (req, res) => {
//     app(req, res);
// };