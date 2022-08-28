<template>
  <EventTimer :time-left="timeLeft" :time-limit="timeLimit" />
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
        if (v > this.timeLimit) v = this.timeLimit;
        this.$emit("update:modelValue", v);
      },
    },
  },

  mounted() {
    this.timerInterval = setInterval(() => {
      this.startTimer();
    }, 1000);
  },

  beforeUnmount() {
    clearInterval(this.timerInterval);
  },

  methods: {
    startTimer() {
      this.timePassed++;
    },
  },
};
</script>
