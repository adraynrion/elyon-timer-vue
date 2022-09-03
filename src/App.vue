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
    <div id="daily-event">
      <h1 class="text-danger"><u>Daily</u></h1>
      <EventItem
        v-model="dailyEvent.passed"
        :time-limit="dailyEvent.duration"
        :title="dailyEvent.timedLabel"
        :delta="1"
      />
    </div>

    <WeekdayEvents
      :iso-date-time="isoDateTime"
      :events-data="mondayEvents"
      :weekday="1"
    />
    <WeekdayEvents
      :iso-date-time="isoDateTime"
      :events-data="tuesdayEvents"
      :weekday="2"
    />
    <WeekdayEvents
      :iso-date-time="isoDateTime"
      :events-data="wednesdayEvents"
      :weekday="3"
    />
    <WeekdayEvents
      :iso-date-time="isoDateTime"
      :events-data="thursdayEvents"
      :weekday="4"
    />
    <WeekdayEvents
      :iso-date-time="isoDateTime"
      :events-data="fridayEvents"
      :weekday="5"
    />
    <WeekdayEvents
      :iso-date-time="isoDateTime"
      :events-data="saturdayEvents"
      :weekday="6"
    />
    <WeekdayEvents
      :iso-date-time="isoDateTime"
      :events-data="sundayEvents"
      :weekday="7"
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
      isoDateTime: DateTime.now()
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
    }, 1000);
  },

  beforeUnmount() {
    clearInterval(this.timerInterval);
  },

  methods: {
    updateIsoDateTime() {
      this.isoDateTime = DateTime.now()
        .setZone(import.meta.env.VITE_CURRENT_ZONE)
        .setLocale(import.meta.env.VITE_CURRENT_LOCALE);
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
  margin-left: 1rem;
}

header {
  line-height: 1.5;
  display: flex;
  place-items: center;
  padding-right: calc(var(--section-gap) / 2);
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
  width: 1000px;
}
</style>
