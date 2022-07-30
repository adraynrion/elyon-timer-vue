<script>
import EventItem from "./EventItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import ToolingIcon from "./icons/IconTooling.vue";
import EcosystemIcon from "./icons/IconEcosystem.vue";
import CommunityIcon from "./icons/IconCommunity.vue";
import SupportIcon from "./icons/IconSupport.vue";
import { DateTime } from "luxon";

import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

export default {
  components: {
    EventItem,
    DocumentationIcon,
    ToolingIcon,
    EcosystemIcon,
    CommunityIcon,
    SupportIcon,
    VueSlider,
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
          duration: 60, // input in seconds
          label: "Daily reset",
        },
        {
          startHours: 3,
          endHours: 4,
          startMinutes: 30,
          endMinutes: 0,
          duration: 1800, // input in seconds
          label: "Pirate ships",
        },
        {
          startHours: 13,
          endHours: 14,
          startMinutes: 30,
          endMinutes: 0,
          duration: 1800, // input in seconds
          label: "Pirate ships",
        },
        {
          startHours: 17,
          endHours: 18,
          startMinutes: 30,
          endMinutes: 0,
          duration: 1800, // input in seconds
          label: "Pirate ships",
        },
        {
          startHours: 20,
          endHours: 20,
          startMinutes: 10,
          endMinutes: 50,
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
      const dt = DateTime.now().startOf("day");
      const dtStart = dt.plus({ hours: hStart, minutes: mStart });
      const dtEnd = dt.plus({ hours: hEnd, minutes: mEnd });
      return `${dtStart.toLocaleString(DateTime.TIME_SIMPLE)} - ${dtEnd.toLocaleString(DateTime.TIME_SIMPLE)}`;
    },
  },
};
</script>

<template>
  <EventItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Monday</template>

    <vue-slider
      v-model="monday"
      :data="mondayEventsOrdered"
      data-label="timedLabel"
      data-value="order"
      disabled
    />
  </EventItem>

  <EventItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Tuesday</template>

    <vue-slider v-model="tuesday" />
  </EventItem>

  <EventItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Wednesday</template>

    <vue-slider v-model="wednesday" />
  </EventItem>

  <EventItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Thursday</template>

    <vue-slider v-model="thursday" />
  </EventItem>

  <EventItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Friday</template>

    <vue-slider v-model="friday" />
  </EventItem>

  <EventItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Saturday</template>

    <vue-slider v-model="saturday" />
  </EventItem>

  <EventItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Sunday</template>

    <vue-slider v-model="sunday" />
  </EventItem>
</template>
