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

export function getEmptyWeekDict() {
  return {
    Su: false,
    M: false,
    Tu: false,
    W: false,
    Th: false,
    F: false,
    Sa: false,
  };
}

export const sampleDataTable = [
  {
    title: "Dog walking",
    description: "Walk dog on weekdays",
    toggledDays: {
      Su: false,
      M: true,
      Tu: true,
      W: false,
      Th: false,
      F: false,
      Sa: false,
    },
    timeOfDay: 10,
    numberOfTimesDone: 10,
    lastSevenTimesDone: ["2021-08-28", "2021-08-27"],
    timesDone: ["2021-08-04", "2021-08-22"],
  },
  {
    title: "Cat sitting Mr. Mittens on weekdays",
    description: "Walk dog on weekdays",
    toggledDays: {
      Su: true,
      M: false,
      Tu: false,
      W: false,
      Th: false,
      F: false,
      Sa: true,
    },
    numberOfTimesDone: 10,
    lastSevenTimesDone: ["2021-08-28", "2021-08-29"],
    timesDone: ["2021-08-04", "2021-08-23"],
  },
  {
    title: "Crying",
    description: "Walk dog on weekdays",
    toggledDays: {
      Su: false,
      M: false,
      Tu: false,
      W: true,
      Th: true,
      F: false,
      Sa: false,
    },
    numberOfTimesDone: 10,
    lastSevenTimesDone: ["2021-08-29", "2021-08-30"],
    timesDone: ["2021-08-04", "2021-08-24"],
  },
  {
    title: "Dog walking22",
    description: "Walk dog on weekdays",
    toggledDays: {
      Su: false,
      M: true,
      Tu: true,
      W: false,
      Th: false,
      F: false,
      Sa: false,
    },
    numberOfTimesDone: 10,
    lastSevenTimesDone: ["2021-08-25"],
    timesDone: ["2021-08-04", "2021-08-25"],
  },
  {
    title: "Cat sitting22",
    description: "Walk dog on weekdays",
    toggledDays: {
      Su: true,
      M: false,
      Tu: false,
      W: false,
      Th: false,
      F: false,
      Sa: true,
    },
    numberOfTimesDone: 10,
    lastSevenTimesDone: ["2021-08-05"],
    timesDone: ["2021-08-04", "2021-08-05"],
  },
  {
    title: "Jumping on the bed because I'm cool like dat yooo",
    description: "Walk dog on weekdays",
    toggledDays: {
      Su: false,
      M: false,
      Tu: false,
      W: true,
      Th: true,
      F: false,
      Sa: false,
    },
    numberOfTimesDone: 10,
    lastSevenTimesDone: ["2021-08-05"],
    timesDone: ["2021-08-04", "2021-08-05"],
  },
  {
    title: "Cat sitting44",
    description: "Walk dog on weekdays",
    toggledDays: {
      Su: true,
      M: false,
      Tu: false,
      W: false,
      Th: false,
      F: false,
      Sa: true,
    },
    numberOfTimesDone: 10,
    lastSevenTimesDone: ["2021-08-05"],
    timesDone: ["2021-08-04", "2021-08-05"],
  },
  {
    title: "Crying555555",
    description: "Walk dog on weekdays",
    toggledDays: {
      Su: false,
      M: false,
      Tu: false,
      W: true,
      Th: true,
      F: false,
      Sa: false,
    },
    numberOfTimesDone: 10,
    lastSevenTimesDone: ["2021-08-05"],
    timesDone: ["2021-08-04", "2021-08-05"],
  },
];