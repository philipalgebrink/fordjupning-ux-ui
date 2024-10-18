<template>
  <div class="loading-screen">
    <img
      src="@/assets/logo.svg"
      alt="App Logo"
      class="logo"
      @click="goToSetTimer"
    />
    <p class="slogan">For all your timing needs</p>
  </div>
</template>

<script>
export default {
  name: "LoadingScreen", // Ändra komponentnamn här
  methods: {
    goToSetTimer() {
      this.$router.push("/set-timer");
    },
  },
};
</script>

<style scoped>
.loading-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.logo {
  width: 150px;
  cursor: pointer;
}

.slogan {
  margin-top: 20px;
  font-size: 18px;
  color: #333;
}
</style>
