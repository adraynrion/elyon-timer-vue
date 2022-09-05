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

  <main :key="keyComponents">
    <section id="weekday-events">
      <h2>Events of the day</h2>
      <ul>
        <li v-for="[index, ev] of Object.entries(weekdayEvents)" :key="index">
          {{ ev }}
        </li>
      </ul>
    </section>

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

  <footer>
    <p>
      Data source based on in-game experience, friends knowledge and
      <a
        href="https://docs.google.com/spreadsheets/d/172kxgUaHb5bTrQPma31SrPItMfHX3EXUDEnxaDN4KbM/edit#gid=1455474602"
        rel="noopener"
      >
        this spreadsheet
      </a>
    </p>
  </footer>
</template>

<script>
import GreetingsHeader from "./components/GreetingsHeader.vue";
import WeekdayEvents from "./components/WeekdayEvents.vue";
import EventItem from "./components/EventItem.vue";
import { DateTime } from "luxon";

import * as common from "./mixins/common";
import mondayEventsData, {
  weekdayEvents as mondayEvents,
} from "./mixins/monday";
import tuesdayEventsData, {
  weekdayEvents as tuesdayEvents,
} from "./mixins/tuesday";
import wednesdayEventsData, {
  weekdayEvents as wednesdayEvents,
} from "./mixins/wednesday";
import thursdayEventsData, {
  weekdayEvents as thursdayEvents,
} from "./mixins/thursday";
import fridayEventsData, {
  weekdayEvents as fridayEvents,
} from "./mixins/friday";
import saturdayEventsData, {
  weekdayEvents as saturdayEvents,
} from "./mixins/saturday";
import sundayEventsData, {
  weekdayEvents as sundayEvents,
} from "./mixins/sunday";

export default {
  components: {
    GreetingsHeader,
    WeekdayEvents,
    EventItem,
  },

  data() {
    return {
      hidden: undefined,
      visibilityChange: undefined,

      keyComponents: 0,
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

    dailyEvent() {
      return common.events.dailyReset;
    },

    weekdays() {
      const day = this.isoDateTime.weekday;

      return [1, 2, 3, 4, 5, 6, 7]
        .sort((a, n) => {
          if (a < day) {
            if (a < n) return 1;
            else if (a > n) return -1;
          } else if (a >= day) return 0;
          else return -1;
        })
        .sort((a, n) => {
          if (a < day) {
            if (a < n) return -1;
            else if (a > n) return 1;
          } else if (a >= day) return 0;
          else return -1;
        });
    },

    weekdayEvents() {
      switch (this.isoDateTime.weekday) {
        case 1:
          return mondayEvents;
        case 2:
          return tuesdayEvents;
        case 3:
          return wednesdayEvents;
        case 4:
          return thursdayEvents;
        case 5:
          return fridayEvents;
        case 6:
          return saturdayEvents;
        case 7:
          return sundayEvents;
        default:
          return [];
      }
    },
  },

  mounted() {
    this.timerInterval = setInterval(() => {
      this.updateIsoDateTime();
    }, 200);

    this.addDocumentVisibilitySupport();
  },

  beforeUnmount() {
    clearInterval(this.timerInterval);

    document.removeEventListener(
      this.visibilityChange,
      this.handleVisibilityChange,
      false
    );
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
          events = mondayEventsData;
          break;
        case 2:
          events = tuesdayEventsData;
          break;
        case 3:
          events = wednesdayEventsData;
          break;
        case 4:
          events = thursdayEventsData;
          break;
        case 5:
          events = fridayEventsData;
          break;
        case 6:
          events = saturdayEventsData;
          break;
        case 7:
          events = sundayEventsData;
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

    handleVisibilityChange() {
      if (!document[this.hidden]) {
        this.keyComponents++;
      }
    },

    addDocumentVisibilitySupport() {
      // Set the name of the hidden property and the change event for visibility
      if (typeof document.hidden !== "undefined") {
        // Opera 12.10 and Firefox 18 and later support
        this.hidden = "hidden";
        this.visibilityChange = "visibilitychange";
      } else if (typeof document.msHidden !== "undefined") {
        this.hidden = "msHidden";
        this.visibilityChange = "msvisibilitychange";
      } else if (typeof document.webkitHidden !== "undefined") {
        this.hidden = "webkitHidden";
        this.visibilityChange = "webkitvisibilitychange";
      }

      // Warn if the browser doesn't support addEventListener or the Page Visibility API
      if (
        typeof document.addEventListener === "undefined" ||
        this.hidden === undefined
      ) {
        console.log(
          "This app requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API."
        );
      } else {
        // Handle page visibility change
        document.addEventListener(
          this.visibilityChange,
          this.handleVisibilityChange,
          false
        );
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "./assets/colors.scss";

#weekday-events {
  margin: 1rem;
  border: 1px dotted $beige;

  h2 {
    text-align: center;
  }
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

footer {
  margin-top: 1rem;
  margin-bottom: 1rem;

  p {
    text-align: center;
  }
}
</style>
