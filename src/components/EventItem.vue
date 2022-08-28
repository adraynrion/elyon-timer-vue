<template>
  <div v-if="timeLeft > 0" class="event-content">
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

export default {
  components: {
    EventTimer,
  },

  props: {
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
        if (v > this.timeLimit) this.stopTimer();
        else this.$emit("update:modelValue", v);
      },
    },
  },

  mounted() {
    this.timerInterval = setInterval(() => {
      this.startTimer();
    }, 1000);
  },

  beforeUnmount() {
    this.stopTimer();
  },

  methods: {
    startTimer() {
      this.timePassed++;
    },

    stopTimer() {
      clearInterval(this.timerInterval);
      // this.resetTimer();
    },

    resetTimer() {
      this.timePassed = 0;
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
