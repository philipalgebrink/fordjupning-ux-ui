<template>
  <div class="set-timer-screen">
    <div class="menu-icon">
      <img src="@/assets/navicon.svg" alt="Menu Icon" @click="openMenu" />
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
          intervals (VG)
        </label>
        <label :style="{ visibility: intervals ? 'visible' : 'hidden' }">
          <input type="checkbox" v-model="breaks" />
          5 min break / interval (VG)
        </label>
      </div>

      <button class="start-button" @click="startMainTimer">START TIMER</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SetTimer",
  data() {
    return {
      time: 10, // Startvärde för minuter
      intervals: false, // Om intervaller är aktiverade
      breaks: false, // Om paus är aktiverad
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
        path: "/main-timer/analog", // Navigera till den analoga vyen först
        query: {
          time: this.time, // Skicka med tiden (antal minuter)
          intervals: this.intervals, // Skicka med om intervaller är aktiverade
          breaks: this.breaks, // Skicka med om pauser är aktiverade
        },
      });
    },
    openMenu() {
      console.log("Menu opened");
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
  height: 100vh;
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

/* Ny container för checkboxar och startknapp (För att aligna rätt) */
.options-and-button {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 250px;
  margin-top: 68px;
}

.interval-options {
  margin-bottom: 20px;
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
  background-color: transparent;
  cursor: pointer;
  display: inline-block;
  align-self: flex-start;
  width: 100%;
}
</style>
