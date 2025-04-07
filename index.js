const axios = require('axios');
const cheerio = require('cheerio');
const json2xls = require('json2xls');
const fs = require('fs');

const URL = 'https://www.timesjobs.com/candidate/job-search.html?searchType=Home_Search&from=submit&asKey=OFF&txtKeywords=&cboPresFuncArea=35';

async function scrapeJobs() {
  try {
    const { data } = await axios.get(URL);
    const $ = cheerio.load(data);
    const jobs = [];

    $("li.clearfix.job-bx.wht-shd-bx").each((i, el) => {
      const postedDate = $(el).find("span.sim-posted").text().trim();

      // ✅ Keep jobs posted in last 2 days or marked as "few days ago"
      if (
        !(
          postedDate.includes("1 day") ||
          postedDate.includes("2 days") ||
          postedDate.includes("few")
        )
      ) return;

      const jobTitle = $(el).find("h2 a").text().trim();
      const companyName = $(el).find(".joblist-comp-name").text().trim();
      const location = $(el).find(".top-jd-dtl li").first().text().trim();
      const jobType = $(el).find(".job-type").text().trim() || "Not specified";
      const jobDescription = $(el).find(".list-job-dtl li").first().text().trim();

      jobs.push({
        jobTitle,
        companyName,
        location,
        jobType,
        postedDate,
        jobDescription
      });
    });

    fs.writeFileSync("jobs.json", JSON.stringify(jobs, null, 2));
    console.log("✅ Data saved to jobs.json");

    const xls = json2xls(jobs);
    fs.writeFileSync("tech_jobs.xlsx", xls, "binary");
    console.log("✅ Excel file saved as tech_jobs.xlsx");

  } catch (error) {
    console.error("❌ Error scraping data:", error.message);
  }
}

scrapeJobs();
