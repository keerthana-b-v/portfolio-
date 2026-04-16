import fs from "fs/promises";
import path from "path";
import { config } from "./config.js";

const GITHUB_USERNAME = "Ruthvikrr";

async function fetchFromGitHub(endpoint) {
  const headers = {
    "Accept": "application/vnd.github.v3+json",
    "User-Agent": "RAG-Portfolio-Bot",
  };
  
  if (config.githubToken) {
    headers["Authorization"] = `token ${config.githubToken}`;
  }

  const response = await fetch(`https://api.github.com${endpoint}`, { headers });
  
  if (!response.ok) {
    console.warn(`Failed to fetch ${endpoint}: ${response.status} ${response.statusText}`);
    return null;
  }
  
  return response.json();
}

async function fetchReadme(repoName) {
  const data = await fetchFromGitHub(`/repos/${GITHUB_USERNAME}/${repoName}/readme`);
  if (data && data.content) {
    // GitHub API returns BASE64 encoded content
    return Buffer.from(data.content, "base64").toString("utf-8");
  }
  return null;
}

async function main() {
  console.log(`Fetching repositories for GitHub User: ${GITHUB_USERNAME}...`);
  
  // Use visibility=all to fetch public and private repos (since we use a token)
  const repos = await fetchFromGitHub(`/user/repos?affiliation=owner&per_page=100`);
  
  if (!repos) {
    throw new Error("Could not fetch repositories. Please check your network or GITHUB_TOKEN.");
  }

  console.log(`Found ${repos.length} repositories. Processing...`);
  const chunks = [];

  for (const repo of repos) {
    console.log(`- Indexing repo: ${repo.name}`);
    
    // Create a summarized chunk out of the repository metadata
    let content = `GitHub Project Name: ${repo.name}\n`;
    content += `Description: ${repo.description || "No description provided."}\n`;
    content += `Language: ${repo.language || "N/A"}\n`;
    content += `URL: ${repo.html_url}\n`;
    if (repo.topics && repo.topics.length > 0) {
      content += `Topics: ${repo.topics.join(", ")}\n`;
    }
    
    // Fetch and append the README to add rich context
    const readme = await fetchReadme(repo.name);
    if (readme) {
      // Truncate README slightly to avoid massive token sizes, or keep mostly intact
      content += `\n--- README ---\n${readme.substring(0, 3000)}`; 
    }

    chunks.push({
      content: content,
      type: "github_project",
      section: "portfolio_projects",
      keywords: ["github", "code", "project", repo.name, repo.language || ""].filter(Boolean)
    });
  }

  // Save the chunks into a specific github JSON
  const outputDir = path.resolve("./data");
  await fs.mkdir(outputDir, { recursive: true });
  
  const outputPath = path.join(outputDir, "github-chunks.json");
  await fs.writeFile(outputPath, JSON.stringify(chunks, null, 2), "utf-8");
  
  console.log(`\nSuccessfully saved ${chunks.length} GitHub projects into ${outputPath}`);
  console.log('Next step: Run exactly what you run for docx (embed-and-store.js) but target this new JSON file!');
  console.log('Example: node src/embed-and-store.js ./data/github-chunks.json');
}

main().catch(console.error);
