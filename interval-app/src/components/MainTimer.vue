<template>
  <div>
    <router-view :time="time" @abort="abortTimer" />
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
  },
  created() {},
};
</script>
