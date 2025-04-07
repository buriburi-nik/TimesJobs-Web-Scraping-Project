const axios = require('axios');
// HTTP request bhejne ke liye

const cheerio = require('cheerio');
// HTML data ko parse karne ke liye

const json2xls = require('json2xls');
// JSON ko Excel file mein convert karta hai

const fs = require('fs');
// File read/write ke liye

const URL = 'https://www.timesjobs.com/candidate/job-search.html?searchType=Home_Search&from=submit&asKey=OFF&txtKeywords=&cboPresFuncArea=35';
// Target website jahan se scraping karni hai

async function scrapeJobs() {
  try {
    const { data } = await axios.get(URL);
    // Website ka HTML content fetch kar rahe hain

    const $ = cheerio.load(data);
    // Cheerio ke through HTML ko load karke jQuery jaise syntax mein access kar rahe hain

    const jobs = [];
    // Saare jobs store karne ke liye ek array

    $("li.clearfix.job-bx.wht-shd-bx").each((i, el) => {
      const postedDate = $(el).find("span.sim-posted").text().trim();
      if (!postedDate.includes("few")) return;
      // Sirf "few days ago" wali jobs hi lenge

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
      // Har job ko object ki form mein jobs array mein daal rahe hain
    });

    // Step 1: JSON file mein save kar rahe hain
    fs.writeFileSync("jobs.json", JSON.stringify(jobs, null, 2));
    console.log("✅ Data saved to jobs.json");

    // Step 2: Excel file ke format mein convert karke save kar rahe hain
    const xls = json2xls(jobs);
    fs.writeFileSync("tech_jobs.xlsx", xls, "binary");
    console.log("✅ Excel file saved as tech_jobs.xlsx");

  } catch (error) {
    console.error("❌ Error scraping data:", error.message);
  }
}

// Call the function to run
scrapeJobs();
