import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "../api/events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { insertEventApi } from "../api/schedule";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState(events);

  const handleSelect = async ({ start, end }) => {
    const title = window.prompt("일정 추가");
    if (title) {
      const event = {
        start,
        end,
        title
      };

      try {
        const response = await insertEventApi(event);
        const newEvent = response.data;
        setEventsData([...eventsData, newEvent]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="App">
      <Calendar
        views={["month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
      />
    </div>
  );
}
