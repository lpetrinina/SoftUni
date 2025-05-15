function dayOfWeek(dayNum: number): void {
  enum Days {
    Monday = 1,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
  }

  console.log(Days[dayNum] || "error");
}

dayOfWeek(1);
dayOfWeek(6);
dayOfWeek(9);
