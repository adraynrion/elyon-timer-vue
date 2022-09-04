import * as common from "./common";

const WEEKDAY = 1;

export default common.weekEvents(WEEKDAY);

export const weekdayEvents = [
  common.weekdaysEvents.beacons,
  common.weekdaysEvents.underground,
];
