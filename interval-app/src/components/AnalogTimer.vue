<template>
  <div class="analog-clock">
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
</style>
