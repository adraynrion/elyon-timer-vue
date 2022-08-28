<template>
  <div>
    <EventItem
      v-for="event of mondayEventsOrdered"
      :key="event.order"
      v-model="event.passed"
      :time-limit="event.duration"
      :title="event.timedLabel"
      :weekday="isoDateTime.weekday"
    />
  </div>
</template>

<script>
import EventItem from "./EventItem.vue";
import { DateTime, Duration } from "luxon";

export default {
  components: {
    EventItem,
  },

  props: {
    isoDateTime: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0,

      mondayEvents: [],
    };
  },

  computed: {
    mondayEventsData() {
      return [
        {
          startHours: 1,
          endHours: 1,
          startMinutes: 0,
          endMinutes: 0,
          passed: this.timePassed(
            this.isoDateTime,
            this.isoDateTime.startOf("day"),
            this.timeDuration({ hours: 1 })
          ),
          duration: this.timeDuration({ days: 1 }),
          label: "Daily reset",
        },
        {
          startHours: 3,
          endHours: 4,
          startMinutes: 30,
          endMinutes: 0,
          passed: this.timePassed(
            this.isoDateTime,
            this.isoDateTime.startOf("day"),
            this.timeDuration({ hours: 3, minutes: 0 }) // start - "duration"
          ),
          duration: this.timeDuration({ minutes: 30 }),
          label: "Pirate ships",
        },
        {
          startHours: 13,
          endHours: 14,
          startMinutes: 30,
          endMinutes: 0,
          passed: this.timePassed(
            this.isoDateTime,
            this.isoDateTime.startOf("day"),
            this.timeDuration({ hours: 13, minutes: 0 }) // start - "duration"
          ),
          duration: this.timeDuration({ minutes: 30 }),
          label: "Pirate ships",
        },
        {
          startHours: 17,
          endHours: 18,
          startMinutes: 30,
          endMinutes: 0,
          passed: this.timePassed(
            this.isoDateTime,
            this.isoDateTime.startOf("day"),
            this.timeDuration({ hours: 17, minutes: 0 }) // start - "duration"
          ),
          duration: this.timeDuration({ minutes: 30 }),
          label: "Pirate ships",
        },
        {
          startHours: 20,
          endHours: 20,
          startMinutes: 10,
          endMinutes: 50,
          passed: this.timePassed(
            this.isoDateTime,
            this.isoDateTime.startOf("day"),
            this.timeDuration({ hours: 19, minutes: 30 }) // start - "duration"
          ),
          duration: this.timeDuration({ minutes: 40 }),
          label: "RvR",
        },
      ];
    },

    mondayEventsOrdered() {
      let order = 0;
      return this.mondayEvents.map((e) => {
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

    nextResetTime() {
      return this.isoDateTime
        .startOf("day")
        .plus({ hours: 1, days: 1 })
        .toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
    },
  },

  mounted() {
    this.mondayEvents = this.mondayEventsData;
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

    timePassed(end, start, delta) {
      return Math.floor(end.diff(start).as("seconds") - delta);
    },

    timeDuration(details) {
      return Duration.fromObject(details).as("seconds");
    },
  },
};
</script>
