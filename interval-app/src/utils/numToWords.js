export function numToWords(num) {
  const units = [
    "noll",
    "ett",
    "två",
    "tre",
    "fyra",
    "fem",
    "sex",
    "sju",
    "åtta",
    "nio",
    "tio",
    "elva",
    "tolv",
    "tretton",
    "fjorton",
    "femton",
    "sexton",
    "sjutton",
    "arton",
    "nitton",
  ];
  const tens = [
    "",
    "",
    "tjugo",
    "trettio",
    "fyrtio",
    "femtio",
    "sextio",
    "sjuttio",
    "åttio",
    "nittio",
  ];

  if (num < 20) {
    // Om numret är under 20 så använder vi units för ja ARTON osv.
    return units[num];
  } else if (num < 100) {
    // Om numret är över 20 men under 100 använder vi tens för tjugo, trettio osv.
    const ten = Math.floor(num / 10); // Tar det första siffran av talet (tiotalet). Till exempel, för 42 blir detta 4.
    const unit = num % 10; // Tar resten av divisionen, dvs entalet (isåfall 2 om man går på exemplet ovan).
    return unit === 0 // Kollar om talet är 0 och isf returnerar vi endast fyrtio
      ? tens[ten]
      : `${tens[ten]}${units[unit] !== "noll" ? ` ${units[unit]}` : ""}`;
  } else {
    return num.toString();
  }
}
