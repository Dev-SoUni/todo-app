import moment from 'moment';

import { Weeks } from "@/ts/schema.t";

export const DateFormat = {
  defaultDate: 'YYYY-MM-DD',
  year: 'YYYY',
  date: 'DD',
  monthDateKo: 'MM월 DD일',
  dayOfTheWeek: 'dddd',
}

/**
 * YYYY-MM-DD
 */
export const toDefaultDate = (date: Date) => moment(date).format(DateFormat.defaultDate);

/**
 * YYYY
 */
export const toYear = (date: Date) => moment(date).format(DateFormat.year);

/**
 * DD
 */
export const toDate = (date: Date) => moment(date).format(DateFormat.date);

/**
 * MM월 DD일
 */
export const toMonthDateKo = (date: Date) => moment(date).format(DateFormat.monthDateKo);

/**
 * 요일
 *  ex) M, T, W ..
 */
export const toDayOfTheWeek = (date: Date) => moment(date).format(DateFormat.dayOfTheWeek);

export const getWeeks = (date: Date) => {
  const monday =
    moment(date)
      .add(-1, "days")
      .startOf('week')
      .add(1, "days")

  let weeks = [];

  for (let i = 0; i < 7; i++) {
    weeks.push(
      moment(monday).add(i, "days").toDate(),
    );
  }

  return weeks;
}
