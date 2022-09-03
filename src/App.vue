<template>
  <header>
    <img
      alt="ELYON icon"
      class="logo"
      src="./assets/ELYON.png"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <GreetingsHeader msg="Elyon Timer" />
      <div id="iso-date-time" class="text-navy">
        <div id="iso-date">
          {{ isoDate }}
        </div>
        <div id="iso-time">
          {{ isoTime }}
        </div>
      </div>
    </div>
  </header>

  <main>
    <section id="daily-event">
      <EventItem
        v-model="dailyEvent.passed"
        :time-limit="dailyEvent.duration"
        :title="dailyEvent.timedLabel"
        :delta="1"
      />
    </section>

    <WeekdayEvents
      v-for="day of weekdays"
      :key="day"
      :iso-date-time="isoDateTime"
      :events-data="eventsOrdered(day)"
      :weekday="day"
    />
  </main>
</template>

<script>
import GreetingsHeader from "./components/GreetingsHeader.vue";
import WeekdayEvents from "./components/WeekdayEvents.vue";
import EventItem from "./components/EventItem.vue";
import { DateTime } from "luxon";

import * as common from "./mixins/common";
import mondayEventsData from "./mixins/monday";
import tuesdayEventsData from "./mixins/tuesday";
import wednesdayEventsData from "./mixins/wednesday";
import thursdayEventsData from "./mixins/thursday";
import fridayEventsData from "./mixins/friday";
import saturdayEventsData from "./mixins/saturday";
import sundayEventsData from "./mixins/sunday";

export default {
  components: {
    GreetingsHeader,
    WeekdayEvents,
    EventItem,
  },

  data() {
    return {
      weekdays: [1, 2, 3, 4, 5, 6, 7],
      isoDateTime: DateTime.now()
        .setZone(import.meta.env.VITE_CURRENT_ZONE)
        .setLocale(import.meta.env.VITE_CURRENT_LOCALE),
      prevIsoDateTime: DateTime.now()
        .setZone(import.meta.env.VITE_CURRENT_ZONE)
        .setLocale(import.meta.env.VITE_CURRENT_LOCALE),
    };
  },

  computed: {
    isoDate() {
      return this.isoDateTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
    },

    isoTime() {
      return this.isoDateTime.toLocaleString(DateTime.TIME_24_WITH_SECONDS);
    },

    isoSeconds() {
      return Math.floor(this.isoDateTime.toSeconds());
    },

    prevIsoSeconds() {
      return Math.floor(this.prevIsoDateTime.toSeconds());
    },

    mondayEvents() {
      return mondayEventsData();
    },

    tuesdayEvents() {
      return tuesdayEventsData();
    },

    wednesdayEvents() {
      return wednesdayEventsData();
    },

    thursdayEvents() {
      return thursdayEventsData();
    },

    fridayEvents() {
      return fridayEventsData();
    },

    saturdayEvents() {
      return saturdayEventsData();
    },

    sundayEvents() {
      return sundayEventsData();
    },

    dailyEvent() {
      return common.events.dailyReset;
    },
  },

  mounted() {
    this.timerInterval = setInterval(() => {
      this.updateIsoDateTime();
    }, 200);
  },

  beforeUnmount() {
    clearInterval(this.timerInterval);
  },

  methods: {
    updateIsoDateTime() {
      this.isoDateTime = DateTime.now()
        .setZone(import.meta.env.VITE_CURRENT_ZONE)
        .setLocale(import.meta.env.VITE_CURRENT_LOCALE);

      if (this.prevIsoSeconds !== this.isoSeconds) this.runGlobalTimer();
      this.prevIsoDateTime = this.isoDateTime;
    },

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

    eventsOrdered(weekday) {
      let events = null;
      switch (weekday) {
        case 0:
          events = [this.dailyEvent];
          break;
        case 1:
          events = this.mondayEvents;
          break;
        case 2:
          events = this.tuesdayEvents;
          break;
        case 3:
          events = this.wednesdayEvents;
          break;
        case 4:
          events = this.thursdayEvents;
          break;
        case 5:
          events = this.fridayEvents;
          break;
        case 6:
          events = this.saturdayEvents;
          break;
        case 7:
          events = this.sundayEvents;
          break;
      }

      let order = 0;
      return events.map((e) => {
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

    runGlobalTimer() {
      for (let i = 0; i <= 7; i++) {
        for (const event of this.eventsOrdered(i)) {
          if (event.passed > event.duration) event.passed--;
          else event.passed++;
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
#daily-event h1 {
  text-align: center;
}

#iso-date-time {
  text-align: center;
  align-self: center;
}
@media (max-width: 1023px) {
  #iso-date-time {
    width: 100%;
  }
}

header {
  line-height: 1.5;
  display: flex;
  place-items: center;
  justify-content: center;

  .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

.logo {
  display: block;
  margin: 0 2rem 0 0;
}

main {
  max-width: 1000px;
}
</style>
