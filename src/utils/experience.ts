/**
 * Calculates dynamic professional experience duration based on careerStartDate.
 * Example: "2025-02-01" -> "1+ Years Experience" or "1.5+ Years Experience"
 */
export interface ExperienceDuration {
  years: number;
  months: number;
  totalMonths: number;
  formatted: string;
  badge: string;
  detailed: string;
}

export function calculateExperience(startDateStr: string, asOfDate: Date = new Date()): ExperienceDuration {
  const start = new Date(startDateStr);
  if (isNaN(start.getTime())) {
    return {
      years: 1,
      months: 0,
      totalMonths: 12,
      formatted: '1+ Years Experience',
      badge: '1+ Yrs Exp',
      detailed: '1+ Years',
    };
  }

  let years = asOfDate.getFullYear() - start.getFullYear();
  let months = asOfDate.getMonth() - start.getMonth();

  if (asOfDate.getDate() < start.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalMonths = Math.max(0, years * 12 + months);

  let formatted = '';
  let badge = '';
  let detailed = '';

  if (totalMonths < 12) {
    const m = Math.max(1, totalMonths);
    formatted = `${m}+ Month${m > 1 ? 's' : ''} Experience`;
    badge = `${m}+ Mos Exp`;
    detailed = `${m} Month${m > 1 ? 's' : ''}`;
  } else if (months === 0) {
    formatted = `${years} Year${years > 1 ? 's' : ''} Experience`;
    badge = `${years} Yrs Exp`;
    detailed = `${years} Year${years > 1 ? 's' : ''}`;
  } else {
    formatted = `${years}+ Years Experience`;
    badge = `${years}+ Yrs Exp`;
    detailed = `${years} Year${years > 1 ? 's' : ''}, ${months} Month${months > 1 ? 's' : ''}`;
  }

  return {
    years,
    months,
    totalMonths,
    formatted,
    badge,
    detailed,
  };
}
