<template>
  <div class="event-content">
    <EventTimer
      :time-left="timeLeft"
      :time-limit="timeLimit"
      class="event-timer"
    />

    <p class="event-title">{{ title }}</p>
  </div>
</template>

<script>
import EventTimer from "./EventTimer.vue";
import { Duration } from "luxon";

export default {
  components: {
    EventTimer,
  },

  props: {
    // 1 = Monday / 7 = Sunday
    weekday: {
      type: Number,
      required: true,
    },

    modelValue: {
      type: Number,
      required: true,
    },

    timeLimit: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      timerInterval: null,
    };
  },

  computed: {
    timeLeft() {
      return this.timeLimit - this.timePassed;
    },

    timePassed: {
      get() {
        return this.modelValue;
      },
      set(v) {
        // if (v > this.timeLimit) this.stopTimer();
        this.$emit("update:modelValue", v);
      },
    },
  },

  mounted() {
    this.timerInterval = setInterval(() => {
      this.runTimer();
    }, 1000);
  },

  beforeUnmount() {
    this.stopTimer();
  },

  watch: {
    timePassed: {
      handler(v) {
        let delta = this.weekday % 7;
        if (delta === 0) delta = 1;
        if (v >= this.timeLimit && v < this.timeDuration({ days: delta })) {
          this.timePassed -= this.timeDuration({ days: delta });
        }
      },
    },
  },

  methods: {
    runTimer() {
      if (this.timePassed > this.timeLimit) this.timePassed--;
      else this.timePassed++;
    },

    stopTimer() {
      clearInterval(this.timerInterval);
      // this.resetTimer();
    },

    resetTimer() {
      this.timePassed = 0;
    },

    timeDuration(details) {
      return Duration.fromObject(details).as("seconds");
    },
  },
};
</script>

<style lang="scss" scoped>
.event-content {
  .event-timer {
    margin: 0 auto;
  }

  .event-title {
    text-align: center;
  }
}
</style>
