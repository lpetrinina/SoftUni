"use strict";
var Days;
(function (Days) {
    Days[Days["Monday"] = 1] = "Monday";
    Days[Days["Tuestaday"] = 2] = "Tuestaday";
    Days[Days["Wednesday"] = 3] = "Wednesday";
    Days[Days["Thursday"] = 4] = "Thursday";
    Days[Days["Friday"] = 5] = "Friday";
    Days[Days["Saturday"] = 6] = "Saturday";
    Days[Days["Sunday"] = 7] = "Sunday";
})(Days || (Days = {}));
function reverseDayOfWeek(dayName) {
    console.log(Days[dayName] || "error");
}
// reverseDayOfWeek("Monday");
reverseDayOfWeek("Test");
//# sourceMappingURL=reverse-day-of-week.js.map