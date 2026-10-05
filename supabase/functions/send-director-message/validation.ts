// Чистые функции валидации и очистки ввода (без зависимостей от Deno — можно тестировать в Node).

export const LIMITS = {
  nameMin: 2, nameMax: 100,
  emailMax: 254,
  phoneMax: 30,
  messageMin: 10, messageMax: 1000,
  minElapsedMs: 2500, // человек не заполнит форму быстрее
};

const EMAIL_RE = /^[^\s@<>()"',;:\\]+@[^\s@<>()"',;:\\]+\.[^\s@<>()"',;:\\]{2,}$/;
const PHONE_RE = /^[+\d][\d\s()-]{5,24}$/;

/** Удаляет управляющие символы и HTML-теги, обрезает пробелы. */
export const sanitizeLine = (v: unknown): string =>
  String(v ?? '')
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001F\u007F]+/g, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

export const sanitizeText = (v: unknown): string =>
  String(v ?? '')
    .replace(/\r\n?/g, '\n')
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

export const escapeHtml = (v: string): string =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export interface CleanInput { name: string; phone: string; email: string; message: string }

export type ValidationResult =
  | { ok: true; value: CleanInput }
  | { ok: false; errors: Record<string, string> };

export const validateInput = (raw: Record<string, unknown>): ValidationResult => {
  const name = sanitizeLine(raw.name);
  const phone = sanitizeLine(raw.phone);
  const email = sanitizeLine(raw.email).toLowerCase();
  const message = sanitizeText(raw.message);
  const errors: Record<string, string> = {};

  if (name.length < LIMITS.nameMin || name.length > LIMITS.nameMax) errors.name = 'invalid';
  if (!email || email.length > LIMITS.emailMax || !EMAIL_RE.test(email)) errors.email = 'invalid';
  if (phone && (phone.length > LIMITS.phoneMax || !PHONE_RE.test(phone))) errors.phone = 'invalid';
  if (message.length < LIMITS.messageMin || message.length > LIMITS.messageMax) errors.message = 'invalid';
  // Простейший спам-признак: много ссылок
  if ((message.match(/https?:\/\//gi) ?? []).length > 2) errors.message = 'invalid';

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value: { name, phone, email, message } };
};
