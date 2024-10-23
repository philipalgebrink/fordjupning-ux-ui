<template>
  <div class="text-timer">
    <div class="time-text" v-html="timeInWords"></div>
  </div>
</template>

<script>
import { numToWords } from "@/utils/numToWords";

export default {
  props: ["time"],
  computed: {
    timeInWords() {
      const [minutes, seconds] = this.time.split(":").map(Number);
      const minutesText = numToWords(minutes).toUpperCase();
      const secondsText = numToWords(seconds).toUpperCase();

      // Om det är 1 sekund kvar, skriv det som EN istället för ETT
      if (seconds === 1 && minutes === 0) {
        return `EN<br>SEKUND KVAR`;
      } else if (seconds === 1) {
        return `${minutesText} MINUT${
          minutes > 1 ? "ER" : ""
        }<br>& EN<br>SEKUND KVAR`;
      }

      // Om det är 0 sekunder kvar, visa bara minuter
      if (seconds === 0) {
        return `${minutesText} MINUT${minutes > 1 ? "ER" : ""}<br>KVAR`;
      }

      // Om det är bara sekunder kvar, visa bara sekunder
      if (minutes === 0) {
        return `${secondsText}<br>SEKUND${seconds > 1 ? "ER" : ""} KVAR`;
      }

      // Om det är 1 minut kvar, skriv det som EN istället för ETT
      if (minutes === 1) {
        return `EN MINUT <br> ${
          seconds > 0
            ? `& ${secondsText} <br> SEKUND${seconds > 1 ? "ER" : ""}`
            : ""
        } KVAR`;
      } else {
        return `${minutesText} MINUT${
          minutes > 1 ? "ER" : ""
        } <br> & ${secondsText} <br> SEKUND${seconds > 1 ? "ER" : ""} KVAR`;
      }
    },
  },
};
</script>

<style scoped>
.text-timer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 30px;
  font-weight: bold;
  color: #222222;
  text-align: left;
  max-width: 350px;
  line-height: 1.5;
}

.time-text {
  min-height: 100px;
}
</style>
