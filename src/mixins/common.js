import { DateTime, Duration } from "luxon";

export const isoDateTime = DateTime.now()
  .setZone(import.meta.env.VITE_CURRENT_ZONE)
  .setLocale(import.meta.env.VITE_CURRENT_LOCALE);

export const timePassed = (end, start, delta) => {
  return Math.floor(end.diff(start).as("seconds") - delta);
};

export const timeDuration = (details) => {
  return Duration.fromObject(details).as("seconds");
};

export const genEvent = ({
  startHours,
  endHours,
  startMinutes,
  endMinutes,
  weekday = 0,
  deltaDuration = false,
  duration,
  label,
}) => {
  let startPlus = {};
  if (weekday) {
    startPlus = { days: weekday - isoDateTime.weekday };
  }

  if (!deltaDuration) {
    deltaDuration = { hours: startHours, minutes: startMinutes };
  }

  return {
    startHours,
    endHours,
    startMinutes,
    endMinutes,
    passed: timePassed(
      isoDateTime,
      isoDateTime.plus(startPlus).startOf("day"),
      timeDuration(deltaDuration)
    ),
    duration: timeDuration(duration),
    label,
  };
};

export const events = {
  dailyReset: {
    ...genEvent({
      startHours: 1,
      endHours: 1,
      startMinutes: 0,
      endMinutes: 0,
      deltaDuration: { hours: 1 },
      duration: { days: 1 },
      label: "Daily reset",
    }),
  },
};

export const weekEvents = (weekday) => {
  return [
    {
      ...genEvent({
        startHours: 0,
        endHours: 1,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 1 },
        label: "Frozen city",
      }),
    },
    {
      ...genEvent({
        startHours: 1,
        endHours: 2,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 1 },
        label: "Weekly dimension",
      }),
    },
    {
      ...genEvent({
        startHours: 3,
        endHours: 4,
        startMinutes: 30,
        endMinutes: 30,
        weekday,
        duration: { hours: 1 },
        label: "Pirate ships",
      }),
    },
    {
      ...genEvent({
        startHours: 7,
        endHours: 8,
        startMinutes: 30,
        endMinutes: 30,
        weekday,
        duration: { hours: 1 },
        label: "Pirate ships",
      }),
    },
    {
      ...genEvent({
        startHours: 9,
        endHours: 10,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 1 },
        label: "Frozen city",
      }),
    },
    {
      ...genEvent({
        startHours: 10,
        endHours: 11,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 1 },
        label: "Weekly dimension",
      }),
    },
    {
      ...genEvent({
        startHours: 11,
        endHours: 13,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 2 },
        label: "Frozen city",
      }),
    },
    {
      ...genEvent({
        startHours: 12,
        endHours: 14,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 2 },
        label: "Sacredwood",
      }),
    },
    {
      ...genEvent({
        startHours: 13,
        endHours: 14,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 1 },
        label: "Weekly dimension",
      }),
    },
    {
      ...genEvent({
        startHours: 13,
        endHours: 14,
        startMinutes: 30,
        endMinutes: 30,
        weekday,
        duration: { hours: 1 },
        label: "Pirate ships",
      }),
    },
    {
      ...genEvent({
        startHours: 14,
        endHours: 16,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 2 },
        label: "Frozen city",
      }),
    },
    {
      ...genEvent({
        startHours: 16,
        endHours: 17,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 1 },
        label: "Weekly dimension",
      }),
    },
    {
      ...genEvent({
        startHours: 17,
        endHours: 18,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 2 },
        label: "Frozen city",
      }),
    },
    {
      ...genEvent({
        startHours: 17,
        endHours: 18,
        startMinutes: 30,
        endMinutes: 30,
        weekday,
        duration: { hours: 1 },
        label: "Pirate ships",
      }),
    },
    {
      ...genEvent({
        startHours: 18,
        endHours: 20,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 2 },
        label: "Sacredwood",
      }),
    },
    {
      ...genEvent({
        startHours: 19,
        endHours: 20,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 1 },
        label: "Weekly dimension",
      }),
    },
    {
      ...genEvent({
        startHours: 20,
        endHours: 20,
        startMinutes: 10,
        endMinutes: 50,
        weekday,
        duration: { minutes: 40 },
        label: "RvR",
      }),
    },
    {
      ...genEvent({
        startHours: 21,
        endHours: 22,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 1 },
        label: "Frozen city",
      }),
    },
    {
      ...genEvent({
        startHours: 22,
        endHours: 23,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 1 },
        label: "Weekly dimension",
      }),
    },
    {
      ...genEvent({
        startHours: 23,
        endHours: 0,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 1 },
        label: "Frozen city",
      }),
    },
  ];
};

export const weekendEvents = (weekday) => {
  return [
    {
      ...genEvent({
        startHours: 0,
        endHours: 1,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 1 },
        label: "Frozen city",
      }),
    },
    {
      ...genEvent({
        startHours: 1,
        endHours: 2,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 1 },
        label: "Weekly dimension",
      }),
    },
    {
      ...genEvent({
        startHours: 3,
        endHours: 4,
        startMinutes: 30,
        endMinutes: 30,
        weekday,
        duration: { hours: 1 },
        label: "Pirate ships",
      }),
    },
    {
      ...genEvent({
        startHours: 7,
        endHours: 8,
        startMinutes: 30,
        endMinutes: 30,
        weekday,
        duration: { hours: 1 },
        label: "Pirate ships",
      }),
    },
    {
      ...genEvent({
        startHours: 9,
        endHours: 10,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 1 },
        label: "Frozen city",
      }),
    },
    {
      ...genEvent({
        startHours: 10,
        endHours: 11,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 1 },
        label: "Weekly dimension",
      }),
    },
    {
      ...genEvent({
        startHours: 11,
        endHours: 13,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 2 },
        label: "Frozen city",
      }),
    },
    {
      ...genEvent({
        startHours: 12,
        endHours: 14,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 2 },
        label: "Sacredwood",
      }),
    },
    {
      ...genEvent({
        startHours: 13,
        endHours: 14,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 1 },
        label: "Weekly dimension",
      }),
    },
    {
      ...genEvent({
        startHours: 13,
        endHours: 14,
        startMinutes: 30,
        endMinutes: 30,
        weekday,
        duration: { hours: 1 },
        label: "Pirate ships",
      }),
    },
    {
      ...genEvent({
        startHours: 14,
        endHours: 16,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 2 },
        label: "Frozen city",
      }),
    },
    {
      ...genEvent({
        startHours: 16,
        endHours: 17,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 1 },
        label: "Weekly dimension",
      }),
    },
    {
      ...genEvent({
        startHours: 17,
        endHours: 18,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 2 },
        label: "Frozen city",
      }),
    },
    {
      ...genEvent({
        startHours: 17,
        endHours: 18,
        startMinutes: 30,
        endMinutes: 30,
        weekday,
        duration: { hours: 1 },
        label: "Pirate ships",
      }),
    },
    {
      ...genEvent({
        startHours: 18,
        endHours: 20,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 2 },
        label: "Sacredwood",
      }),
    },
    {
      ...genEvent({
        startHours: 19,
        endHours: 20,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 1 },
        label: "Weekly dimension",
      }),
    },
    {
      ...genEvent({
        startHours: 20,
        endHours: 21,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 1 },
        label: "GvG",
      }),
    },
    {
      ...genEvent({
        startHours: 21,
        endHours: 22,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 1 },
        label: "Frozen city",
      }),
    },
    {
      ...genEvent({
        startHours: 22,
        endHours: 23,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 1 },
        label: "Weekly dimension",
      }),
    },
    {
      ...genEvent({
        startHours: 23,
        endHours: 0,
        startMinutes: 0,
        endMinutes: 0,
        weekday,
        duration: { hours: 1 },
        label: "Frozen city",
      }),
    },
  ];
};
