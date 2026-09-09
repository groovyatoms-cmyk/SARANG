function toCSVValue(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

export function rowsToCSV(rows, columns) {
  const header = columns.map((c) => toCSVValue(c.label)).join(',');
  const body = rows
    .map((row) => columns.map((c) => toCSVValue(c.accessor(row))).join(','))
    .join('\n');
  return `${header}\n${body}`;
}

export function downloadFile(content, filename, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportCSV(rows, columns, filename = 'export.csv') {
  downloadFile(rowsToCSV(rows, columns), filename, 'text/csv;charset=utf-8;');
}

export function exportJSON(rows, filename = 'export.json') {
  downloadFile(JSON.stringify(rows, null, 2), filename, 'application/json;charset=utf-8;');
}
