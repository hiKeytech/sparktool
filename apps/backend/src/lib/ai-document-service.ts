import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";
import type { CreateAiDocumentInput } from "sparktool-contracts/ai";

const MAX_CHUNK_LENGTH = 1200;
const CHUNK_OVERLAP = 200;

function decodeDataUrl(dataUrl: string) {
  const match = dataUrl.match(
    /^data:([^;,]+)?(?:;charset=[^;,]+)?;base64,(.+)$/,
  );

  if (!match) {
    throw Object.assign(new Error("Invalid document upload payload."), {
      status: 400,
    });
  }

  return {
    buffer: Buffer.from(match[2], "base64"),
    mimeType: match[1] || "application/octet-stream",
  };
}

function compactText(value: string) {
  return value
    .replace(/\u0000/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildChunks(text: string) {
  const normalized = compactText(text);

  if (!normalized) {
    return [];
  }

  const chunks: string[] = [];
  let cursor = 0;

  while (cursor < normalized.length) {
    const next = normalized.slice(cursor, cursor + MAX_CHUNK_LENGTH).trim();

    if (next) {
      chunks.push(next);
    }

    if (cursor + MAX_CHUNK_LENGTH >= normalized.length) {
      break;
    }

    cursor += MAX_CHUNK_LENGTH - CHUNK_OVERLAP;
  }

  return chunks;
}

async function extractPdfText(buffer: Buffer) {
  const parser = new PDFParse({ data: buffer });

  try {
    const result = await parser.getText();
    return compactText(result.text || "");
  } finally {
    await parser.destroy();
  }
}

async function extractDocxText(buffer: Buffer) {
  const result = await mammoth.extractRawText({ buffer });
  return compactText(result.value || "");
}

function inferDocumentType(file: CreateAiDocumentInput["file"]) {
  const filename = file.name.toLowerCase();

  if (file.type === "application/pdf" || filename.endsWith(".pdf")) {
    return "pdf";
  }

  if (
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    filename.endsWith(".docx")
  ) {
    return "docx";
  }

  if (file.type === "application/msword" || filename.endsWith(".doc")) {
    return "doc";
  }

  return "unsupported";
}

export async function parseUploadedDocument(
  file: CreateAiDocumentInput["file"],
) {
  const { buffer, mimeType } = decodeDataUrl(file.dataUrl);
  const detectedType = inferDocumentType(file);

  let extractedText = "";

  if (detectedType === "pdf") {
    extractedText = await extractPdfText(buffer);
  } else if (detectedType === "docx") {
    extractedText = await extractDocxText(buffer);
  } else if (detectedType === "doc") {
    throw Object.assign(
      new Error(
        "Legacy .doc files are not supported yet. Please upload .docx or .pdf.",
      ),
      { status: 400 },
    );
  } else {
    throw Object.assign(new Error("Only PDF and DOCX files are supported."), {
      status: 400,
    });
  }

  const chunks = buildChunks(extractedText);

  if (chunks.length === 0) {
    throw Object.assign(
      new Error("Could not extract readable text from that document."),
      { status: 400 },
    );
  }

  return {
    bytes: buffer.byteLength,
    chunks,
    mimeType,
    sourceCount: chunks.length,
  };
}

function tokenize(value: string) {
  return Array.from(
    new Set(
      value
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .map((word) => word.trim())
        .filter((word) => word.length >= 3),
    ),
  );
}

export function selectRelevantDocumentChunks(input: {
  documents: Array<{ chunks: string[]; id: string; title: string }>;
  message: string;
  maxChunks?: number;
}) {
  const terms = tokenize(input.message);
  const ranked = input.documents.flatMap((document) =>
    document.chunks.map((chunk, index) => {
      const haystack = chunk.toLowerCase();
      const score = terms.reduce((total, term) => {
        if (!haystack.includes(term)) {
          return total;
        }

        const matches = haystack.split(term).length - 1;
        return total + matches;
      }, 0);

      return {
        chunk,
        documentId: document.id,
        index,
        score,
        title: document.title,
      };
    }),
  );

  const prioritized = ranked
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .filter((item, index) => index < (input.maxChunks ?? 4) || item.score > 0)
    .slice(0, input.maxChunks ?? 4);

  if (prioritized.length > 0) {
    return prioritized;
  }

  return ranked.slice(0, input.maxChunks ?? 4);
}
