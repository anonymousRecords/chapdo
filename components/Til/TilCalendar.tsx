"use client";
import React, { useState, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { BlogPost } from "@/types";
import TilModal from "./TilModal";
import "@/styles/calendar.css";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

interface TilCalendarProps {
  posts: BlogPost[];
}

const TilCalendar: React.FC<TilCalendarProps> = ({ posts }) => {
  const [selectedTil, setSelectedTil] = useState<BlogPost | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = posts.map((post) => ({
    title: post.meta.title,
    start: new Date(post.meta.date),
    end: new Date(post.meta.date),
    resource: post,
  }));

  const handleSelectEvent = useCallback((event: { resource: BlogPost }) => {
    setSelectedTil(event.resource);
  }, []);

  const handleNavigate = useCallback((newDate: Date) => {
    setCurrentDate(newDate);
  }, []);

  return (
    <div className="h-[600px] relative z-10">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        style={{ height: "100%" }}
        views={["month"]}
        date={currentDate}
        onNavigate={handleNavigate}
      />
      {selectedTil && (
        <TilModal til={selectedTil} onClose={() => setSelectedTil(null)} />
      )}
    </div>
  );
};

export default TilCalendar;
