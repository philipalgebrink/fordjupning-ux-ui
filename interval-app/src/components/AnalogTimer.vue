<template>
  <div class="analog-clock">
    <div class="menu-and-title">
      <div class="menu-icon">
        <img src="@/assets/navicon.svg" alt="Menu Icon" @click="openMenu" />
      </div>
      <div v-if="intervalActive" class="title">interval</div>
    </div>

    <div class="clock-face">
      <div
        v-for="n in 60"
        :key="n"
        class="tick"
        :style="{ transform: 'rotate(' + n * 6 + 'deg)' }"
      ></div>
      <div
        class="hand"
        :style="{ transform: 'rotate(' + secondRotation + 'deg)' }"
      ></div>
    </div>
    <button @click="$emit('abort')" class="abort-button">ABORT TIMER</button>
  </div>
</template>

<script>
export default {
  props: ["time", "intervalActive"],
  methods: {
    openMenu() {
      console.log("Menu opened");
    },
  },
  computed: {
    secondRotation() {
      const [minutes, seconds] = this.time.split(":").map(Number);
      return 360 - (minutes * 60 + seconds) * 6 - 90;
    },
  },
};
</script>

<style scoped>
.analog-clock {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #eeeeee;
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
}

.menu-icon img {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.title {
  font-size: 22px;
  font-weight: bold;
  margin-right: 20px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #222222;
}

.clock-face {
  width: 300px;
  height: 300px;
  position: relative;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tick {
  position: absolute;
  width: 5px;
  height: 15px;
  background-color: #222222;
  top: 10px;
  transform-origin: center 140px;
  transform: translateX(-50%) rotate(0deg);
  border-radius: 5px;
}

.hand {
  width: 45%;
  height: 2px;
  background-color: #222222;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 0% 50%;
  transition: transform 0s linear;
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
