<template>
  <EventItem
    v-for="event of mondayEventsOrdered"
    :key="event.order"
    v-model="event.passed"
    :time-limit="event.duration"
  />
</template>

<script>
import EventItem from "./EventItem.vue";
import { DateTime } from "luxon";

export default {
  components: {
    EventItem,
  },

  props: {
    isoTimestamp: {
      type: Number,
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

      mondayEvents: [
        {
          startHours: 1,
          endHours: 1,
          startMinutes: 0,
          endMinutes: 1,
          passed: 0,
          duration: 60, // input in seconds
          label: "Daily reset",
        },
        {
          startHours: 3,
          endHours: 4,
          startMinutes: 30,
          endMinutes: 0,
          passed: 0,
          duration: 1800, // input in seconds
          label: "Pirate ships",
        },
        {
          startHours: 13,
          endHours: 14,
          startMinutes: 30,
          endMinutes: 0,
          passed: 0,
          duration: 1800, // input in seconds
          label: "Pirate ships",
        },
        {
          startHours: 17,
          endHours: 18,
          startMinutes: 30,
          endMinutes: 0,
          passed: 0,
          duration: 1800, // input in seconds
          label: "Pirate ships",
        },
        {
          startHours: 20,
          endHours: 20,
          startMinutes: 10,
          endMinutes: 50,
          passed: 0,
          duration: 2400, // input in seconds
          label: "RvR",
        },
      ],
    };
  },

  computed: {
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
  },

  methods: {
    getLocalizationTime(hStart, mStart, hEnd, mEnd) {
      const dt = DateTime.now()
        .startOf("day")
        .setZone(process.env.CURRENT_ZONE)
        .setLocale(process.env.CURRENT_LOCALE);
      const dtStart = dt
        .plus({ hours: hStart, minutes: mStart })
        .toLocaleString(DateTime.TIME_SIMPLE);
      const dtEnd = dt
        .plus({ hours: hEnd, minutes: mEnd })
        .toLocaleString(DateTime.TIME_SIMPLE);
      return `${dtStart} - ${dtEnd}`;
    },
  },
};
</script>
