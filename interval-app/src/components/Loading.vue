<template>
  <div class="loading-screen">
    <img
      src="@/assets/logo.svg"
      alt="App Logo"
      class="logo"
      @click="goToSetTimer"
    />
    <p class="slogan" ref="sloganText">For all your timing needs</p>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";

export default {
  name: "LoadingScreen", // Ändra komponentnamn här
  methods: {
    goToSetTimer() {
      this.$router.push("/set-timer");
    },
  },

  mounted() {
    anime({
      targets: this.$refs.sloganText,
      scale: [1, 1.1], // Ändra storlek (För att ge "pulserande" effekt)
      easing: "easeInOutQuad",
      duration: 1500, // Per loop
      loop: true, // Loop
      direction: "alternate", // Så den går fram o tillbaka
    });
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
  width: 100vw;
  background-color: #000000;
}

.logo {
  width: 50%;
}

.slogan {
  margin-top: 20px;
  font-size: 20px;
  color: #ffffff;
}
</style>
