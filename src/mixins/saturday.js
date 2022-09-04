import * as common from "./common";

const WEEKDAY = 6;

export default common.weekEvents(WEEKDAY);

export const weekdayEvents = [
  common.weekdaysEvents.supplyBoxes,
  common.weekdaysEvents.underground,
  common.weekdaysEvents.chaos,
];
