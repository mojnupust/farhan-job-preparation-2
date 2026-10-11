/**
 * RFC 6266 / RFC 5987 Content-Disposition for non-ASCII (e.g. Bangla) filenames.
 * `filename` is an ASCII fallback; `filename*` is UTF-8 so browsers keep বাংলা titles.
 */
export function attachmentDisposition(downloadName: string, fallbackBase = 'download'): string {
  const cleaned = downloadName.replace(/[\r\n"]/g, '').trim() || fallbackBase;
  const ascii = toAsciiFilename(cleaned, fallbackBase);
  const encoded = encodeRFC5987(cleaned);
  return `attachment; filename="${ascii}"; filename*=UTF-8''${encoded}`;
}

export function withExtension(name: string, ext: string): string {
  const normalizedExt = ext.startsWith('.') ? ext : `.${ext}`;
  if (name.toLowerCase().endsWith(normalizedExt.toLowerCase())) return name;
  return `${name}${normalizedExt}`;
}

function toAsciiFilename(name: string, fallbackBase: string): string {
  const lastDot = name.lastIndexOf('.');
  const ext = lastDot > 0 ? name.slice(lastDot) : '';
  const stem = lastDot > 0 ? name.slice(0, lastDot) : name;
  const asciiStem = stem
    .normalize('NFKD')
    .replace(/[^\x20-\x7E]/g, '_')
    .replace(/[\\/:*?<>|]+/g, '_')
    .replace(/\s+/g, ' ')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')
    .trim();
  const asciiExt = ext.replace(/[^\x20-\x7E]/g, '') || '';
  const fallbackStem = fallbackBase.replace(/\.[^.]+$/, '');
  const usableStem = /[A-Za-z0-9]/.test(asciiStem) ? asciiStem : fallbackStem;
  return `${usableStem}${asciiExt}`.slice(0, 150);
}

function encodeRFC5987(value: string): string {
  return encodeURIComponent(value).replace(/['()*]/g, (ch) =>
    `%${ch.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}
