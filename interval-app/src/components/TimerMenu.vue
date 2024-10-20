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
      <li @click="navigateTo('analog')">Analog Timer</li>
      <li @click="navigateTo('digital')">Digital Timer</li>
      <li @click="navigateTo('text')">Text Timer</li>
      <li @click="navigateTo('circles')">Circles Timer</li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTo(view) {
      this.$emit("close"); // Stäng menyn
      this.$router.push({ name: view, query: this.$route.query }); // Navigera till rätt vy med befintlig tid
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

.menu-header h2 {
  color: white;
  font-size: 24px;
  margin-left: 10px;
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

.menu-items li:hover {
  color: #ccc;
}
</style>
