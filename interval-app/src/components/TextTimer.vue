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
      if (seconds === 1) {
        return `${minutesText} MINUT${
          minutes > 1 ? "ER" : ""
        }<br>& EN<br>SEKUND KVAR`;
      }

      // Om det är 0 sekunder kvar, visa bara minuter
      if (seconds === 0) {
        return `${minutesText} MINUT${minutes > 1 ? "ER" : ""}<br>KVAR`;
      }

      return `${minutesText} MINUT${
        minutes > 1 ? "ER" : ""
      }<br>OCH ${secondsText}<br>SEKUND${seconds > 1 ? "ER" : ""} KVAR`;
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
  max-width: 300px;
  line-height: 1.5;
}

.time-text {
  min-height: 100px;
}
</style>
