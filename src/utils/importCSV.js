// Minimal CSV parser sufficient for the import preview flow (no embedded newlines in quotes edge-case).
export function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length === 0) return { headers: [], rows: [], errors: [] };

  const splitLine = (line) =>
    line.split(',').map((cell) => cell.trim().replace(/^"|"$/g, ''));

  const headers = splitLine(lines[0]);
  const rows = [];
  const errors = [];

  lines.slice(1).forEach((line, idx) => {
    if (!line.trim()) return;
    const cells = splitLine(line);
    if (cells.length !== headers.length) {
      errors.push({ line: idx + 2, message: `Expected ${headers.length} columns, found ${cells.length}` });
      return;
    }
    const row = {};
    headers.forEach((h, i) => { row[h] = cells[i]; });
    rows.push(row);
  });

  return { headers, rows, errors };
}

export function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = reject;
    reader.readAsText(file);
  });
}
