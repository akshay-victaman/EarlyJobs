import express from "express";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "../src/App";
import fs from "fs";
import axios from "axios";

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, "..", "build")));

// Read the index.html template once at startup
const indexTemplate = fs.readFileSync(
  path.join(__dirname, "..", "build", "index.html"),
  "utf8"
);

// Helper function to fetch job data
async function fetchJobData(jobId) {
  try {
    const response = await axios.get(
      `https://07mz59w9ch.execute-api.ap-south-1.amazonaws.com/prod/api/public/jobs/${jobId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching job data:", error);
    throw error;
  }
}

// Helper function for SSR with data
const renderWithSSR = async (req, res, jobData) => {
  const context = {};
  const entryPoint = ["/static/js/main.js"];

  // Generate keywords and meta tags
  const keywords = `
  ${jobData.title} in ${jobData.area} ${jobData.city},
  ${jobData.title} in ${jobData.category} at ${jobData.company_name},
  ${jobData.title} in ${jobData.city},
  freshers jobs,
  Entry-level jobs near me,
  Jobs for freshers in ${jobData.city},
  ${jobData.title} openings in ${jobData.city},
  Remote jobs hiring now,
  Freelance jobs in ${jobData.city},
  ${jobData.category} jobs for freshers,
  Internships in ${jobData.category},
  Top companies hiring in ${jobData.city},
  Jobs with no experience required,
  ${jobData.title} jobs for recent graduates,
  Best jobs for freshers in India,
  Top companies hiring fresh graduates,
  Entry-level positions in ${jobData.category},
  Latest job openings for freshers,
  Work-from-home jobs for freshers,
  High-paying jobs for recent graduates,
  Internship and job opportunities in ${jobData.city},
  Part-time jobs for students and freshers,
  Immediate hiring jobs near me,
  New job postings in ${jobData.city} today,
  Earlyjobs, earlycarrier, early jobs, early career,
  Earlyjobs in ${jobData.city},
  Early jobs in ${jobData.area},
  Early career in ${jobData.city},
  APIA jobs, Naukry jobs, Naukry alternative,
  Apna alternative, Jobhe alternative,
  Unstop alternative, Shine alternative,
  Foundit alternative, Indeed, Indeed alternative,
  ${jobData.title} vacancy, Job vacancy
`.trim();

  const pageTitle = `${jobData.title} in ${jobData.area} ${jobData.city} | Earlyjobs`;

  const metaTags = `
    <title>${pageTitle}</title>
    <meta name="title" content="${pageTitle}" />
    <meta name="description" content="${jobData.title} in ${jobData.category} at ${jobData.company_name} | ${jobData.title} in ${jobData.city} | Earlyjobs" />
    <meta name="keywords" content="${keywords}" />
    <meta property="og:title" content="${pageTitle}" />
    <meta property="og:description" content="${jobData.title} in ${jobData.category} at ${jobData.company_name}" />
    <meta property="og:image" content="${jobData.company_logo_url}" />
  `;

  // Create a script tag to inject the initial state
  const initialState = `
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify({ jobData })};
    </script>
  `;

  const { pipe, abort: _abort } = ReactDOMServer.renderToPipeableStream(
    <StaticRouter location={req.url} context={context}>
      <App initialState={{ jobData }} />
    </StaticRouter>,
    {
      bootstrapScripts: entryPoint,
      onAllReady() {
        res.statusCode = context.statusCode || 200;
        res.setHeader("Content-Type", "text/html");

        // Inject meta tags and initial state into the HTML template
        const html = indexTemplate
          .replace('<div id="root">', `<div id="root">`)
          .replace("</head>", `${metaTags}${initialState}</head>`);

        res.write(html);
        pipe(res);
      },
      onShellError(error) {
        console.error("Shell error:", error);
        res.statusCode = 500;
        res.send("<!DOCTYPE html><p>Something went wrong</p>");
      },
      onError(error) {
        console.error("Rendering error:", error);
      },
    }
  );
};

// Handle job details route
app.get("/job-openings/:details", async (req, res) => {
  try {
    const { details } = req.params;
    const jobId = details.split("_").pop();

    // Fetch job data before rendering
    const jobData = await fetchJobData(jobId);

    // Render the page with the fetched data
    await renderWithSSR(req, res, jobData);
  } catch (error) {
    console.error("Error in job details route:", error);
    res.status(500).send("Error loading job details");
  }
});

// Client-side routing fallback
app.get("/*", (req, res) => {
  res.send(indexTemplate);
});

app.listen(3002, () => {
  console.log("App is running on http://localhost:3002");
});
