const cors = require('cors');
const sls = require('serverless-http');
const app = require('./config/express'); 
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const adminRoutes = require('./routes/adminRoutes');
const publicJobRoutes = require('./routes/publicJobRoutes');
const companyRoutes = require('./routes/companyRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const blogRouter = require('./routes/blogRoutes.js');

app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        return res.status(200).json({});
    }
    next();
}); 


app.use('/api', userRoutes);
app.use('/jobs', jobRoutes);
app.use('/admin', adminRoutes);
app.use('/api/public', publicJobRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use("/", blogRouter);

const PORT = process.env.PORT || 5000;
//  app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
//  });
module.exports.server = sls(app)
