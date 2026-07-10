/**
 * Countdown utility targeting 2026-07-01T00:00:00 in Africa/Lagos timezone (WAT = UTC+1).
 * We hardcode the UTC equivalent so the countdown is correct regardless of the user's local timezone.
 */

// July 1, 2026, 00:00:00 WAT = June 30, 2026, 23:00:00 UTC
const TARGET_UTC_MS = Date.UTC(2026, 5, 30, 23, 0, 0, 0); // month is 0-indexed → 5 = June

export function getTimeRemaining() {
  const now = Date.now();
  const diff = TARGET_UTC_MS - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds, total: diff };
}

export function padNumber(num) {
  return String(num).padStart(2, '0');
}
