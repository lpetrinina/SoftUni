enum Days {
  Monday = 1,
  Tuestaday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

function reverseDayOfWeek(dayName: string): void {
  console.log(Days[dayName as keyof typeof Days] || "error");
}

// reverseDayOfWeek("Monday");
reverseDayOfWeek("Test");
