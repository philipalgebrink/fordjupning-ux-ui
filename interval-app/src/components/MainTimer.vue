<template>
  <div>
    <router-view
      :time="time"
      :intervalActive="intervalActive"
      @abort="abortTimer"
    />
  </div>
</template>

<script>
import Timer from "easytimer.js";

export default {
  data() {
    return {
      timer: new Timer(),
      time: "00:00",
      intervalActive: false,
      breakActive: false,
      breakTime: 300,
      originalTime: 0,
    };
  },
  methods: {
    startTimer(minutes, interval, breaks) {
      this.originalTime = minutes * 60;
      this.intervalActive = interval;
      this.breakActive = breaks;

      // Ställ in tiden manuellt innan timern startar
      this.time = this.formatTime(minutes * 60);

      this.timer.start({
        countdown: true,
        startValues: { minutes: minutes },
      });

      this.timer.addEventListener("secondsUpdated", () => {
        this.time = this.timer.getTimeValues().toString(["minutes", "seconds"]);
      });

      this.timer.addEventListener("targetAchieved", () => {
        this.handleTimerEnd();
      });
    },
    handleTimerEnd() {
      if (this.breakActive) {
        this.startBreak();
      } else if (this.intervalActive) {
        this.restartTimer();
      } else {
        this.$router.push("/alarm");
      }
    },
    startBreak() {
      this.timer.start({
        countdown: true,
        startValues: { seconds: this.breakTime },
      });
      this.timer.addEventListener("targetAchieved", () => {
        this.restartTimer();
      });
      this.$router.push("/break");
    },
    restartTimer() {
      this.timer.reset();
      this.startTimer(
        this.originalTime / 60,
        this.intervalActive,
        this.breakActive
      );
    },
    abortTimer() {
      this.timer.stop();
      this.time = "00:00";
      this.$router.push("/set-timer");
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${String(minutes).padStart(2, "0")}:${String(
        remainingSeconds
      ).padStart(2, "0")}`;
    },
  },
  created() {
    const { time, intervals, breaks } = this.$route.query;
    this.startTimer(parseInt(time), intervals === "true", breaks === "true");
  },
};
</script>
