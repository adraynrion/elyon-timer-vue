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
      <div id="iso-date-time">
        <div id="iso-date">
          {{ isoDate }}
        </div>
        <div id="iso-time">
          {{ isoTime }}
        </div>
      </div>
    </div>
  </header>

  <main>
    <TheEvents :iso-timestamp="isoTimestamp" />
  </main>
</template>

<script>
const CURRENT_ZONE = "Europe/Paris";
const CURRENT_LOCALE = "en";

import GreetingsHeader from "./components/GreetingsHeader.vue";
import TheEvents from "./components/TheEvents.vue";
import { DateTime } from "luxon";

export default {
  components: {
    GreetingsHeader,
    TheEvents,
  },

  data() {
    return {
      isoDateTime: DateTime.now()
        .setZone(CURRENT_ZONE)
        .setLocale(CURRENT_LOCALE),
    };
  },

  computed: {
    isoDate() {
      return this.isoDateTime.toLocaleString(DateTime.DATE_MED);
    },

    isoTime() {
      return this.isoDateTime.toLocaleString(DateTime.TIME_24_WITH_SECONDS);
    },

    isoTimestamp() {
      return this.isoDateTime.toMillis();
    },
  },

  mounted() {
    this.timerInterval = setInterval(() => {
      this.updateIsoDateTime();
    }, 1000);
  },

  beforeUnmount() {
    clearInterval(this.timerInterval);
  },

  methods: {
    updateIsoDateTime() {
      this.isoDateTime = DateTime.now()
        .setZone(CURRENT_ZONE)
        .setLocale(CURRENT_LOCALE);
    },
  },
};
</script>

<style scoped lang="scss">
header {
  line-height: 1.5;
  display: flex;
  place-items: center;
  padding-right: calc(var(--section-gap) / 2);
  justify-content: center;

  .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

.logo {
  display: block;
  margin: 0 2rem 0 0;
}

main {
  width: 1000px;
}
</style>
