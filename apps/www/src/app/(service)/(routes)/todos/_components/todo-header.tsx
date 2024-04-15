"use client";

import moment from "moment";
import axios from "axios";

import { useServiceState, useServiceDispatch } from "@/hooks/use-service";
import {
  toYear,
  toMonthDateKo,
  getWeeks,
  toDate,
  toDayOfTheWeek,
  toDefaultDate,
} from "@/lib/date";
import { cn } from "@/lib/utils";

export function TodoHeader() {
  const { activateDate } = useServiceState();
  const dispatch = useServiceDispatch();
  const year = toYear(activateDate);
  const monthDate = toMonthDateKo(activateDate);

  const weeks = getWeeks(activateDate)
  const weeksDayOfMonth = weeks.map((day) => {
    return ({
      date: day,
      dd: moment(day).format("DD"),
      dayOfTheWeek: toDayOfTheWeek(day).charAt(0)
    });
  })

  const handleClick = async (date: Date) => {
    dispatch({ type: "UPDATE_ACTIVATE_DATE", payload: date });

    try {
      const response = await axios.get(`/api/todos?date=${toDefaultDate(date)}`);

      dispatch({ type: "SET_TODOS", payload: response.data });
    }
    catch {
      alert("Oops! Something went wrong!");
    }
  }

  return (
    <div>
      <div className="m-5">
        <span className="text-slate-400 font-medium">
          {year}
        </span>
        <p className="text-xl font-semibold">
          {monthDate}
        </p>
      </div>
      <div className="grid w-full h-12 grid-cols-7">
        {
          weeksDayOfMonth.map(({ date, dd, dayOfTheWeek }) => {
            return (
              <button
                key={dd}
                className={cn(
                  "mx-1 py-1 h-full flex flex-col items-center duration-300 transition",
                  toDate(activateDate) === dd && "bg-gray-100 rounded-md",
                )}
                onClick={() => {
                  handleClick(date)
                }}
              >
                <span className="font-medium">
                  {dd}
                </span>
                <span className="text-slate-500 text-[14px]">
                  {dayOfTheWeek}
                </span>
              </button>
            )
          })
        }
      </div>
    </div>
  );
}
