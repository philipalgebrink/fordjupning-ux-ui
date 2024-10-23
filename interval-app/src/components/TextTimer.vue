<template>
  <div class="text-timer">
    <div class="time-text">{{ timeInWords }}</div>
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

      // Om det är 0 sekunder kvar, visa bara minuter
      if (seconds === 0) {
        return `${minutesText} MINUT${minutes > 1 ? "ER" : ""} KVAR`;
      }

      return `${minutesText} MINUT${
        minutes > 1 ? "ER" : ""
      } OCH ${secondsText} SEKUND${seconds > 1 ? "ER" : ""} KVAR`;
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
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  color: #222222;
}
</style>
