<template>
  <div v-show="lessThanOneDay || forceVisibility" class="event-content">
    <EventTimer
      :time-left="timeLeft"
      :time-limit="timeLimit"
      class="event-timer"
    />

    <p class="event-title" :class="textColor">
      {{ title }}
    </p>
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

    textColor() {
      return this.delta === 7 ? "text-beige" : "text-danger";
    },
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
    timeDuration(details) {
      return Duration.fromObject(details).as("seconds");
    },
  },
};
</script>

<style lang="scss" scoped>
.event-content {
  display: flex;

  .event-timer {
    margin: 0 auto;
  }

  .event-title {
    text-align: center;
  }
}

@media (min-width: 1024px) {
  .event-content {
    flex-direction: row-reverse;
    margin-bottom: 0.5rem;

    .event-title {
      align-self: center;
      width: 50%;
    }
  }
}
@media (max-width: 1023px) {
  .event-content {
    flex-direction: column;
  }
}
</style>
