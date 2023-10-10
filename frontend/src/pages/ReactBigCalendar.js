import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { insertEventApi, selectEventApi } from "../api/schedule";
moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState([
    {
      start: new Date(),
      end: new Date(),
      title: "오늘",
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSelectedEvents = async () => {
      try {
        const response = await selectEventApi();
        setEventsData((prevEvents) => [
          ...prevEvents,
          ...response.data,
        ]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSelectedEvents();
  }, []);

  const handleSelect = async ({ start, end }) => {
    const title = window.prompt("일정 추가");
    if (title) {
      const event = {
        start,
        end,
        title,
      };

      try {
        const response = await insertEventApi(event);
        const newEvent = response.data;
        setEventsData([...eventsData, newEvent]);

        window.location.reload();
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
