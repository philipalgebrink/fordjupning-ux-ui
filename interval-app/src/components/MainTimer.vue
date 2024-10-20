<template>
  <div class="timer-view">
    <div class="menu-and-title">
      <div class="menu-icon">
        <img src="@/assets/navicon.svg" alt="Menu Icon" @click="toggleMenu" />
      </div>
      <div v-if="intervalActive" class="title">interval</div>
    </div>

    <!-- Timer Display -->
    <div class="timer-display">
      <component :is="currentTimer" :time="time" />
    </div>

    <!-- Abort Button -->
    <button @click="abortTimer" class="abort-button">ABORT TIMER</button>

    <!-- Timer Menu -->
    <TimerMenu
      v-if="showMenu"
      @close="toggleMenu"
      @changeTimer="changeTimerType"
    />
  </div>
</template>

<script>
import Timer from "easytimer.js";
import TimerMenu from "@/components/TimerMenu.vue";
import AnalogTimer from "@/components/AnalogTimer.vue";
import DigitalTimer from "@/components/DigitalTimer.vue";
import TextTimer from "@/components/TextTimer.vue";

export default {
  components: {
    TimerMenu,
    AnalogTimer,
    DigitalTimer,
    TextTimer,
  },
  data() {
    return {
      timer: new Timer(),
      time: "00:00",
      intervalActive: false,
      breakActive: false,
      breakTime: 300,
      originalTime: 0,
      showMenu: false,
      currentTimer: this.$route.query.timerType || "AnalogTimer", // Sätt till vald typ eller default till AnalogTimer
    };
  },
  methods: {
    startTimer(minutes, interval, breaks) {
      this.originalTime = minutes * 60;
      this.intervalActive = interval;
      this.breakActive = breaks;

      this.time = this.formatTime(minutes * 60);

      this.timer.start({
        countdown: true,
        startValues: { minutes },
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
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    changeTimerType(type) {
      this.currentTimer = type; // Byt vilken timer som visas
      this.showMenu = !this.showMenu; // Stäng menyn?
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
    const { time, intervals, breaks, timerType } = this.$route.query;
    this.currentTimer = timerType || "AnalogTimer"; // Sätt till vald timer-typ eller default
    this.startTimer(parseInt(time), intervals === "true", breaks === "true");
  },
};
</script>

<style scoped>
.timer-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  position: relative;
}

.menu-and-title {
  position: absolute;
  top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-icon {
  margin-left: 20px;
  cursor: pointer;
}

.title {
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  margin-right: 20px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #222222;
}

.timer-display {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70%;
}

.abort-button {
  position: absolute;
  bottom: 48px;
  padding: 20px 40px;
  font-size: 16px;
  color: #222222;
  background-color: transparent;
  border: 1px solid #222222;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
