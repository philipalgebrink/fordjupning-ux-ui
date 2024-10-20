<template>
  <div class="menu-overlay">
    <div class="menu-header">
      <img
        src="@/assets/navicon.svg"
        alt="Close Menu"
        @click="$emit('close')"
      />
    </div>
    <ul class="menu-items">
      <li @click="selectTimer('AnalogTimer')">Analog Timer</li>
      <li @click="selectTimer('DigitalTimer')">Digital Timer</li>
      <li @click="selectTimer('TextTimer')">Text Timer</li>
      <li @click="selectTimer('CirclesTimer')">Circles Timer</li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    selectTimer(timerType) {
      this.$emit("changeTimer", timerType);
    },
  },
};
</script>

<style scoped>
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.menu-header {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
}

.menu-header img {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.menu-items {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}

.menu-items li {
  color: white;
  font-size: 24px;
  margin: 20px 0;
  cursor: pointer;
  transition: color 0.3s ease;
}
</style>
