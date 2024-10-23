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
    return units[num];
  } else if (num < 100) {
    const ten = Math.floor(num / 10);
    const unit = num % 10;
    return unit === 0
      ? tens[ten]
      : `${tens[ten]}${units[unit] !== "noll" ? ` ${units[unit]}` : ""}`;
  } else {
    return num.toString();
  }
}
