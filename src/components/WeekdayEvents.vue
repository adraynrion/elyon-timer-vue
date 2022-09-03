<template>
  <div>
    <h1 class="text-beige c-pointer" @click="toggleVisibility()">
      <span>{{ weekdayLabel }}</span>
    </h1>

    <div v-if="processing" class="loader"></div>
    <div v-show="!processing">
      <EventItem
        v-for="event of eventsOrdered"
        :key="event.order"
        v-model="event.passed"
        :time-limit="event.duration"
        :title="event.timedLabel"
        :forceVisibility="visible"
      />
    </div>
  </div>
</template>

<script>
import EventItem from "./EventItem.vue";
import { DateTime } from "luxon";

export default {
  components: {
    EventItem,
  },

  props: {
    isoDateTime: {
      type: Object,
      required: true,
    },

    eventsData: {
      type: Array,
      required: true,
    },

    weekday: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      processing: true,
      visible: false,
      events: [],
    };
  },

  computed: {
    eventsOrdered() {
      let order = 0;
      return this.events.map((e) => {
        e.order = order++;

        e.timedLabel = `${e.label} ${this.getLocalizationTime(
          e.startHours,
          e.startMinutes,
          e.endHours,
          e.endMinutes
        )}`;

        return e;
      });
    },

    weekdayLabel() {
      switch (this.weekday) {
        case 1:
          return "Monday";
        case 2:
          return "Tuesday";
        case 3:
          return "Wednesday";
        case 4:
          return "Thursday";
        case 5:
          return "Friday";
        case 6:
          return "Saturday";
        case 7:
          return "Sunday";
        default:
          return "Undefined";
      }
    },
  },

  mounted() {
    this.events = this.eventsData;

    setTimeout(() => {
      this.processing = false;
    }, 2000);
  },

  methods: {
    getLocalizationTime(hStart, mStart, hEnd, mEnd) {
      const dtStart = this.isoDateTime
        .startOf("day")
        .plus({ hours: hStart, minutes: mStart })
        .toLocaleString(DateTime.TIME_SIMPLE);
      const dtEnd = this.isoDateTime
        .startOf("day")
        .plus({ hours: hEnd, minutes: mEnd })
        .toLocaleString(DateTime.TIME_SIMPLE);
      return `${dtStart} - ${dtEnd}`;
    },

    toggleVisibility() {
      this.visible = !this.visible;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/colors.scss";

h1 {
  text-align: center;
  position: relative;
  z-index: 1;

  &::before {
    border-top: 2px solid $beige;
    content: "";
    margin: 0 auto; /* this centers the line to the full width specified */
    position: absolute; /* positioning must be absolute here, and relative positioning must be applied to the parent */
    top: 50%;
    left: 0;
    right: 0;
    bottom: 0;
    width: 95%;
    z-index: -1;
  }

  span {
    /* to hide the lines from behind the text, you have to set the background color the same as the container */
    background: $black;
    padding: 0 15px;
  }
}

.loader {
  width: 150px;
  aspect-ratio: 1;
  display: grid;
  mask: conic-gradient(from 22deg, #0003, #000);
  animation: load 1s steps(8) infinite;
  margin: 0 auto;
}
.loader,
.loader:before {
  --_g: linear-gradient(#00bd7e 0 0) 50%;
  background: var(--_g) / 34% 8% space no-repeat,
    var(--_g) / 8% 34% no-repeat space;
}
.loader:before {
  content: "";
  transform: rotate(45deg);
}
@keyframes load {
  to {
    transform: rotate(1turn);
  }
}
</style>
