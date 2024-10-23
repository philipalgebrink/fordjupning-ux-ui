<template>
  <div class="set-timer-screen">
    <div class="menu-icon">
      <img src="@/assets/navicon.svg" alt="Menu Icon" @click="toggleMenu" />
    </div>

    <div class="timer-settings">
      <button @click="decreaseTime">‹</button>
      <input
        type="number"
        v-model="time"
        class="time-display"
        min="1"
        max="999"
        @blur="validateTime"
      />
      <button @click="increaseTime">›</button>
    </div>
    <p class="minutes-label">minutes</p>

    <div class="options-and-button">
      <div class="interval-options">
        <label>
          <input type="checkbox" v-model="intervals" />
          intervals
        </label>
        <label :style="{ visibility: intervals ? 'visible' : 'hidden' }">
          <input type="checkbox" v-model="breaks" />
          5 min break / interval
        </label>
      </div>

      <button class="start-button" @click="startMainTimer">START TIMER</button>

      <!-- Timer Menu -->
      <TimerMenu
        v-if="showMenu"
        @close="toggleMenu"
        @changeTimer="changeTimerType"
      />
    </div>
  </div>
</template>

<script>
import TimerMenu from "@/components/TimerMenu.vue";

export default {
  components: {
    TimerMenu,
  },
  data() {
    return {
      time: 10,
      intervals: false,
      breaks: false,
      showMenu: false,
      selectedTimerType: "AnalogTimer", // Default till AnalogTimer
    };
  },
  methods: {
    increaseTime() {
      if (this.time < 999) {
        this.time++;
      }
    },
    decreaseTime() {
      if (this.time > 1) {
        this.time--;
      }
    },
    validateTime() {
      if (this.time > 999) {
        this.time = 999;
      } else if (this.time < 1 || isNaN(this.time)) {
        this.time = 1;
      }
    },
    startMainTimer() {
      this.$router.push({
        path: "/main-timer",
        query: {
          time: this.time,
          intervals: this.intervals,
          breaks: this.breaks,
          timerType: this.selectedTimerType, // Använd vald timer typ från menyn
        },
      });
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    changeTimerType(type) {
      this.selectedTimerType = type; // Sätt den valda timer-typen från menyn
      this.toggleMenu(); // Stäng menyn efter val
    },
  },
};
</script>

<style scoped>
.set-timer-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 130vh;
  width: 100vw;
  background-color: #f5f5f5;
  position: relative;
}

.menu-icon {
  position: absolute;
  top: 20px;
  left: 20px;
}

.menu-icon img {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.timer-settings {
  display: flex;
  justify-content: center;
  align-items: center;
}

.time-display {
  font-size: 72px;
  font-weight: bold;
  margin: 0 40px;
  text-align: center;
  width: 135px;
  border: none;
  background: none;
  appearance: none;
}

.timer-settings button {
  font-size: 48px;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  padding: 0 10px;
}

.minutes-label {
  font-size: 16px;
  color: #555;
  text-align: center;
}

.options-and-button {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 250px;
  margin-top: 128px;
}

.interval-options {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.interval-options label {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 18px;
}

input[type="checkbox"] {
  margin-right: 10px;
  width: 20px;
  height: 20px;
  border: 2px solid #000;
  cursor: pointer;
}

.start-button {
  padding: 15px 40px;
  font-size: 20px;
  border: 2px solid #000;
  border-radius: 5px;
  background-color: transparent;
  cursor: pointer;
  display: inline-block;
  align-self: flex-start;
  width: 100%;
  margin-top: 20px;
}
</style>
