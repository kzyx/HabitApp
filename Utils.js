import { getDay, startOfDay } from "date-fns";

// Returns most recently occuring Sunday
export function getLastSunday() {
  var date = new Date();
  date.setDate(date.getDate() - date.getDay());
  return startOfDay(date);
}

export function dateToWeekdayName(date) {
  var num = getDay(date);
  switch (num) {
    case 0: return 'Su';
    case 1: return 'M';
    case 2: return 'Tu';
    case 3: return 'W';
    case 4: return 'Th';
    case 5: return 'F';
    case 6: return 'Sa';
  }
}