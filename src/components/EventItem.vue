<template>
  <div v-show="lessThanOneDay || forceVisibility" class="event-content">
    <EventTimer
      :time-left="timeLeft"
      :time-limit="timeLimit"
      class="event-timer"
    />

    <p class="event-title text-beige">{{ title }}</p>
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

    delta: {
      type: Number,
      default: 7,
    },

    forceVisibility: {
      type: Boolean,
      default: false,
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
        this.$emit("update:modelValue", v);
      },
    },

    lessThanOneDay() {
      return this.timeLeft < Duration.fromObject({ days: 1 }).as("seconds");
    },
  },

  mounted() {
    this.timerInterval = setInterval(() => {
      this.runTimer();
    }, 1000);
  },

  watch: {
    timePassed: {
      handler(v) {
        if (
          v >= this.timeLimit &&
          v < this.timeDuration({ days: this.delta })
        ) {
          this.timePassed -= this.timeDuration({ days: this.delta });
        }
      },
    },
  },

  methods: {
    runTimer() {
      if (this.timePassed > this.timeLimit) this.timePassed--;
      else this.timePassed++;
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
