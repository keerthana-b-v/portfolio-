import fs from "fs";
import path from "path";
import pdf from "pdf-parse";

const PDF_FILES = [
  "Keerthana B V.pdf",
  "Keerthana_BV_RAG_Document.pdf"
];

async function ingest() {
  const allChunks = [];
  
  for (const fileName of PDF_FILES) {
    const filePath = path.join(process.cwd(), "..", fileName);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }
    
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    const text = data.text;
    
    // Simple chunking by paragraphs/newlines
    const chunks = text.split(/\n\s*\n/).filter(c => c.trim().length > 20);
    
    chunks.forEach(content => {
      allChunks.push({
        content: content.replace(/\s+/g, " ").trim(),
        metadata: { source: fileName }
      });
    });
  }
  
  const outDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  
  const outPath = path.join(outDir, "kb-chunks.json");
  fs.writeFileSync(outPath, JSON.stringify(allChunks, null, 2));
  console.log(`Ingested ${allChunks.length} chunks to ${outPath}`);
}

ingest().catch(console.error);
