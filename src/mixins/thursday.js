import * as common from "./common";

const WEEKDAY = 4;

export default () => {
  return [
    {
      ...common.genEvent({
        startHours: 3,
        endHours: 4,
        startMinutes: 30,
        endMinutes: 0,
        weekday: WEEKDAY,
        deltaDuration: { hours: 3, minutes: 0 },
        duration: { minutes: 30 },
        label: "Pirate ships",
      }),
    },
    {
      ...common.genEvent({
        startHours: 13,
        endHours: 14,
        startMinutes: 30,
        endMinutes: 0,
        weekday: WEEKDAY,
        deltaDuration: { hours: 13, minutes: 0 },
        duration: { minutes: 30 },
        label: "Pirate ships",
      }),
    },
    {
      ...common.genEvent({
        startHours: 17,
        endHours: 18,
        startMinutes: 30,
        endMinutes: 0,
        weekday: WEEKDAY,
        deltaDuration: { hours: 17, minutes: 0 },
        duration: { minutes: 30 },
        label: "Pirate ships",
      }),
    },
    {
      ...common.genEvent({
        startHours: 20,
        endHours: 20,
        startMinutes: 10,
        endMinutes: 50,
        weekday: WEEKDAY,
        deltaDuration: { hours: 20, minutes: 10 },
        duration: { minutes: 40 },
        label: "RvR",
      }),
    },
  ];
};
