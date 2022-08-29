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
  startPlus = {},
  deltaDuration,
  duration,
  label,
}) => {
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
