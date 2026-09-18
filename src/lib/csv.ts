/**
 * Minimalni CSV parser (RFC 4180) za cjenike objavljene u strojno čitljivom obliku.
 * Podržava navodnike, uduplane navodnike i prijelome retka unutar polja.
 */
export function parseCsv(text: string, delimiter = ';'): string[][] {
  const input = text.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (inQuotes) {
      if (char === '"') {
        if (input[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === delimiter) {
      row.push(field.trim());
      field = '';
    } else if (char === '\n') {
      row.push(field.trim());
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }

  row.push(field.trim());
  rows.push(row);

  return rows.filter((r) => r.some((cell) => cell !== ''));
}
