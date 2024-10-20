<template>
  <div class="digital-clock">
    <div class="time-display">{{ time }}</div>
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
};
</script>

<style scoped>
.digital-clock {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #eeeeee;
}

.time-display {
  font-size: 96px;
  font-weight: bold;
  color: #222222;
  margin-bottom: 60px;
}
</style>
