"use client";
import React, { useState, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { BlogPost } from "@/types";
import TilModal from "./TilModal";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

interface TilCalendarProps {
  posts: BlogPost[];
}

const TilCalendar: React.FC<TilCalendarProps> = ({ posts }) => {
  const [selectedTil, setSelectedTil] = useState<BlogPost | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const events =
    posts?.map((post) => ({
      title: post.meta?.title || "Untitled",
      start: new Date(post.meta?.date || Date.now()),
      end: new Date(post.meta?.date || Date.now()),
      resource: post,
    })) || [];

  const handleSelectEvent = useCallback((event: { resource: BlogPost }) => {
    setSelectedTil(event.resource);
  }, []);

  const handleNavigate = useCallback((newDate: Date) => {
    setCurrentDate(newDate);
  }, []);

  return (
    <div className="h-[600px] relative z-10">
      <style jsx global>{`
        .rbc-calendar {
          min-height: 600px;
        }
        .rbc-header {
          padding: 10px 3px;
          background-color: #f3f4f6;
          color: #374151;
        }
        .rbc-event {
          background-color: #3b82f6;
        }
        .rbc-today {
          background-color: #dbeafe;
        }
        .rbc-btn-group button {
          color: #374151;
          background-color: #ffffff;
          border-color: #d1d5db;
        }
        .rbc-btn-group button:hover {
          background-color: #f3f4f6;
        }
      `}</style>
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
