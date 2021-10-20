import { getDay, parse, startOfDay } from "date-fns";

// Returns most recently occuring Sunday
export function getLastSunday() {
  let date = new Date();
  date.setDate(date.getDate() - date.getDay());
  return startOfDay(date);
}

export function dateToWeekdayName(date) {
  let num = getDay(date);
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

export const sampleHabitList = [
  {
    title: "Walk Beatrice's dog on weekdays",
    description:
      "I want to walk Beatrice's dog on weekdays. It is a great way for me to stay active and make money!",
    toggledDays: {
      Su: false,
      M: true,
      Tu: true,
      W: true,
      Th: true,
      F: true,
      Sa: false,
    },
    completedDays: getEmptyWeekDict(),
    timesDoneThisWeek: 0,
    lastTenTimesDone: [],
    totalTimesDone: Math.floor(Math.random() * 100),
    timeOfDay: parse('18:00', 'HH:mm', new Date()),
  },
  {
    title: "Yoga",
    description:
      "I signed up for a yoga class on Tuesdays and Thursdays at the rec center. I want to improve my flexibility and also stay active, and yoga is a great way of doing both!",
    toggledDays: {
      Su: false,
      M: false,
      Tu: true,
      W: false,
      Th: true,
      F: false,
      Sa: false,
    },
    completedDays: getEmptyWeekDict(),
    timesDoneThisWeek: 0,
    lastTenTimesDone: [],
    totalTimesDone: Math.floor(Math.random() * 100),
    timeOfDay: parse('20:00', 'HH:mm', new Date()),
  },
  {
    title: "Reading",
    description:
      "I am noticing that I am not reading as much as I used to. I want to read for 30 minutes every day, preferably before bedtime. Reading is so important!",
    toggledDays: {
      Su: false,
      M: false,
      Tu: true,
      W: true,
      Th: true,
      F: false,
      Sa: false,
    },
    completedDays: getEmptyWeekDict(),
    timesDoneThisWeek: 0,
    lastTenTimesDone: [],
    totalTimesDone: Math.floor(Math.random() * 100),
    timeOfDay: parse('22:00', 'HH:mm', new Date()),
  },
  {
    title: "Biking",
    description:
      "I stopped biking for three months after my leg injury, and want to get back to it! I want to bike to work on Mondays. It will help me be active and fit!",
    toggledDays: {
      Su: false,
      M: true,
      Tu: false,
      W: false,
      Th: false,
      F: false,
      Sa: false,
    },
    completedDays: getEmptyWeekDict(),
    timesDoneThisWeek: 0,
    lastTenTimesDone: [],
    totalTimesDone: Math.floor(Math.random() * 100),
    timeOfDay: parse('08:00', 'HH:mm', new Date()),
  },
  {
    title: "Gratitude journal",
    description:
      "Lately I've found that I'm not appreciating the good things in life as much. I want to write in my gratitude journal every day!",
    toggledDays: {
      Su: true,
      M: true,
      Tu: true,
      W: true,
      Th: true,
      F: true,
      Sa: true,
    },
    completedDays: getEmptyWeekDict(),
    timesDoneThisWeek: 0,
    lastTenTimesDone: [],
    totalTimesDone: Math.floor(Math.random() * 100),
    timeOfDay: parse('09:00', 'HH:mm', new Date()),
  }

];