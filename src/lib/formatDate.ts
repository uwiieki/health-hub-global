type Lang = 'ru' | 'kz' | 'en';

const KZ_MONTHS = [
  'қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым',
  'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан',
];

/** Дата вида «30 қыркүйек 2026». Для kz названия месяцев заданы вручную —
 *  в некоторых браузерах нет данных локали kk-KZ и выводится «2026 M09 30». */
export const formatNewsDate = (dateStr: string, language: Lang): string => {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return '';
  if (language === 'kz') {
    return `${date.getDate()} ${KZ_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
  }
  return date.toLocaleDateString(language === 'en' ? 'en-US' : 'ru-RU', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
};
