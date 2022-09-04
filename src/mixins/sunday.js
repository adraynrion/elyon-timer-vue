import * as common from "./common";

const WEEKDAY = 7;

export default common.weekEvents(WEEKDAY);

export const weekdayEvents = [
  common.weekdaysEvents.transportShips,
  common.weekdaysEvents.underground,
];