<template>
  <div class="break-view">
    <div class="circle-container">
      <div class="circle" v-for="n in 3" :key="n"></div>
    </div>

    <div class="pause-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="48"
        height="48"
      >
        <path fill="white" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
      </svg>
    </div>

    <p class="break-message">Pause & breathe</p>

    <p class="break-timer">{{ breakTime }}</p>

    <button @click="skipBreak" class="skip-button">NO PAUSE, GO NOW!</button>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
import Timer from "easytimer.js";

export default {
  data() {
    return {
      breakTime: "1:00",
      timer: new Timer(),
    };
  },
  methods: {
    skipBreak() {
      // Emit a custom event to notify the parent component to restart the timer
      this.$emit("skipBreak");
    },
    startBreakTimer() {
      this.timer.start({
        countdown: true,
        startValues: { minutes: 1 },
      });

      this.timer.addEventListener("secondsUpdated", () => {
        this.breakTime = this.timer
          .getTimeValues()
          .toString(["minutes", "seconds"]);
      });

      this.timer.addEventListener("targetAchieved", () => {
        this.skipBreak();
      });
    },
    startAnimations() {
      anime({
        targets: ".circle",
        scale: [0, 4],
        opacity: [1, 0],
        easing: "easeOutQuad",
        duration: 2000,
        loop: true,
        delay: anime.stagger(1500),
      });
    },
  },

  mounted() {
    this.startAnimations();
    this.startBreakTimer();
  },
};
</script>

<style scoped>
.break-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #1e1e1e;
  color: white;
  z-index: 10;
  overflow: hidden;
}

.circle-container {
  position: absolute;
  top: 29%;
  left: 33%;
  transform: translate(-33%, -33%);
  z-index: 0;
}

.circle {
  position: absolute;
  width: 150px;
  height: 150px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  top: 33%;
  left: 33%;
  transform: translate(-33%, -33%);
}

.pause-icon {
  position: relative;
  z-index: 2;
  margin-bottom: 20px;
}

.break-message {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}

.break-timer {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
}

.skip-button {
  padding: 15px 40px;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid white;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
