# 🛠️ TimesJobs Tech Job Scraper

This project scrapes **recent tech job postings** from [TimesJobs.com](https://www.timesjobs.com) and saves the data into two file formats:

- `jobs.json` (JSON format)
- `tech_jobs.xlsx` (Excel format)

## 📌 Target URL

> [TimesJobs - Tech Jobs](https://www.timesjobs.com/candidate/job-search.html?searchType=Home_Search&from=submit&asKey=OFF&txtKeywords=&cboPresFuncArea=35)

---

## 📦 Features

- Scrapes job title, company name, location, job type, posted date, and short description
- Filters only **recent jobs** (posted a "few days ago")
- Saves scraped data to `jobs.json`
- Converts and saves data as `tech_jobs.xlsx`

---

## 📁 Files

| File Name        | Description                                |
| ---------------- | ------------------------------------------ |
| `scrape.js`      | Main script that performs the web scraping |
| `jobs.json`      | Output file with structured JSON data      |
| `tech_jobs.xlsx` | Excel version of the scraped data          |

---

## 🚀 How to Run

### 1. Clone the repository (or create your own folder):

```bash
git clone https://github.com/your-username/timesjobs-scraper.git
cd timesjobs-scraper
```
