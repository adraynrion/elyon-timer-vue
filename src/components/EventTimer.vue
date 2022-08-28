<template>
  <div class="base-timer">
    <svg
      class="base-timer__svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="46.5" />
        <path
          :stroke-dasharray="circleDasharray"
          :class="remainingPathColor"
          class="base-timer__path-remaining"
          d="M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0"
        ></path>
      </g>
    </svg>
    <span class="base-timer__label">
      {{ formattedTimeLeft }}
    </span>
  </div>
</template>

<script>
const FULL_DASH_ARRAY = 283;

export default {
  props: {
    timeLeft: {
      type: Number,
      required: true,
    },

    timeLimit: {
      type: Number,
      required: true,
    },

    alertThreshold: {
      type: Number,
      default: 5,
    },

    warningThreshold: {
      type: Number,
      default: 10,
    },
  },

  computed: {
    formattedTimeLeft() {
      // The largest round integer less than or equal to the result of time divided being by 60.
      let minutes = Math.floor(this.timeLeft / 60);

      // Seconds are the remainder of the time dividedby 60 (modulus operator)
      let seconds = this.timeLeft % 60;

      // If the value of seconds is less than 10, then display seconds with a leading zero
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      // Display hours if necessary
      if (minutes > 60) {
        const hours = Math.floor(minutes / 60);
        minutes = minutes % 60;
        // The output in hh:MM:SS format
        return `${hours}:${minutes}:${seconds}`;
      }

      // The output in MM:SS format
      return `${minutes}:${seconds}`;
    },

    // Update the dasharray value as time passes, starting with 283
    circleDasharray() {
      return `${(this.timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`;
    },

    timeFraction() {
      const rawTimeFraction = this.timeLeft / this.timeLimit;
      return rawTimeFraction - (1 / this.timeLimit) * (1 - rawTimeFraction);
    },

    colorCodes() {
      return {
        info: {
          color: "green",
        },
        warning: {
          color: "orange",
          threshold: this.warningThreshold,
        },
        alert: {
          color: "red",
          threshold: this.alertThreshold,
        },
      };
    },

    remainingPathColor() {
      const { alert, warning, info } = this.colorCodes;

      if (this.timeLeft <= alert.threshold) {
        return alert.color;
      } else if (this.timeLeft <= warning.threshold) {
        return warning.color;
      } else {
        return info.color;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.base-timer {
  /* Sets the containers height and width */
  position: relative;
  width: 300px;
  height: 300px;

  &__path-remaining {
    /* Just as thick as the original ring */
    stroke-width: 7px;
    /* Rounds the line endings to create a seamless circle */
    stroke-linecap: round;
    /* Makes sure the animation starts at the top of the circle */
    transform: rotate(90deg);
    transform-origin: center;
    /* One second aligns with the speed of the countdown timer */
    transition: 1s linear all;
    /* Allows the ring to change color when the color value updates */
    fill-rule: nonzero;
    stroke: currentColor;

    &.green {
      color: rgb(65, 184, 131);
    }

    &.orange {
      color: orange;
    }

    &.red {
      color: red;
    }
  }

  &__svg {
    /* Flips the svg and makes the animation to move left-to-right */
    transform: scaleX(-1);
  }

  &__label {
    position: absolute;
    /* Size should match the parent container */
    width: 300px;
    height: 300px;
    /* Keep the label aligned to the top */
    top: 0;
    /* Create a flexible box that centers content vertically and horizontally */
    display: flex;
    align-items: center;
    justify-content: center;
    /* Sort of an arbitrary number; adjust to your liking */
    font-size: 48px;
  }

  /* Removes SVG styling that would hide the time label */
  &__circle {
    fill: none;
    stroke: none;
  }

  /* The SVG path that displays the timer's progress */
  &__path-elapsed {
    stroke-width: 7px;
    stroke: grey;
  }
}
</style>
