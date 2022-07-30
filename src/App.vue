<script setup>
import GreetingsHeader from "./components/GreetingsHeader.vue";
import TheEvents from "./components/TheEvents.vue";
</script>

<template>
  <header>
    <img
      alt="ELYON icon"
      class="logo"
      src="./assets/ELYON.png"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <GreetingsHeader msg="Elyon Timer" />
    </div>
  </header>

  <main>
    <TheEvents />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  display: flex;
  place-items: center;
  padding-right: calc(var(--section-gap) / 2);
  justify-content: center;
}
header .wrapper {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}

.logo {
  display: block;
  margin: 0 2rem 0 0;
}

main {
  width: 1000px;
}
</style>
