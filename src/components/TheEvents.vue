<template>
  <div>
    <EventItem
      v-for="event of mondayEventsOrdered"
      :key="event.order"
      v-model="event.passed"
      :time-limit="event.duration"
      :title="event.label"
    />
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
    isoTimestamp: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      isoDateTime: DateTime.now()
        .setZone(import.meta.env.VITE_CURRENT_ZONE)
        .setLocale(import.meta.env.VITE_CURRENT_LOCALE),

      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0,

      // TODO Set as computed
      mondayEvents: [
        {
          startHours: 1,
          endHours: 1,
          startMinutes: 0,
          endMinutes: 1,
          passed: "daily",
          duration: 86400, // input in seconds
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
        if (e.passed === "daily") e.passed = this.dailyTimePassed;
        return e;
      });
    },

    nextResetTime() {
      return this.isoDateTime
        .startOf("day")
        .plus({ hours: 1, days: 1 })
        .toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
    },

    dailyTimePassed() {
      return Math.floor(
        this.isoDateTime.diff(this.isoDateTime.startOf("day")).as("seconds")
      );
    },
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
  },
};
</script>
