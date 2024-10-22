<template>
  <div class="alarm-view">
    <div class="circle-container">
      <div class="circle" v-for="n in 3" :key="n"></div>
    </div>
    <div class="icon-container">
      <img src="@/assets/alarm-icon.svg" alt="Alarm Icon" class="alarm-icon" />
    </div>
    <p class="message">Times up!</p>
    <button @click="setNewTimer" class="new-timer-button">SET NEW TIMER</button>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";

export default {
  methods: {
    setNewTimer() {
      this.$router.push("/set-timer");
    },
    startAnimations() {
      anime({
        targets: ".circle",
        scale: [0, 4],
        opacity: [1, 0],
        easing: "easeOutQuad",
        duration: 2000,
        loop: true,
        delay: anime.stagger(500),
      });

      anime({
        targets: ".alarm-icon",
        translateX: [-5, 5],
        duration: 100,
        easing: "easeInOutSine",
        direction: "alternate",
        loop: true,
      });
    },
  },
  mounted() {
    this.startAnimations();
  },
};
</script>

<style scoped>
.alarm-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1e1e1e;
  position: relative;
}

.circle-container {
  position: relative;
  left: -75px; /* Våran klock image är 150px så för att få i mitten -75px */
  transform: translate(-50%, -50%);
  z-index: 0;
}

.circle {
  position: absolute;
  width: 150px;
  height: 150px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  z-index: 2;
}

.alarm-icon {
  width: 80px;
  height: 80px;
}

.message {
  font-size: 36px;
  font-weight: bold;
  color: #ffffff;
  margin: 20px 0;
  z-index: 2;
}

.new-timer-button {
  position: absolute;
  bottom: 48px;
  padding: 15px 40px;
  font-size: 16px;
  color: #ffffff;
  background-color: transparent;
  border: 1px solid #ffffff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
