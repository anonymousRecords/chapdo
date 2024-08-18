"use client";

import React, { useState } from "react";
import TILGrid, { Meta } from "@/components/Til/TilGrid";
import ViewSelector from "@/components/Til/ViewSelector";
import TilCalendar from "./TilCalendar";
import { BlogPost } from "@/types";
import AnimatedNumber from "../Common/AnimatedNumber";

interface TilPageClientProps {
  metaPosts: Meta[];
  posts: BlogPost[];
}

export default function TilPageClient({
  metaPosts,
  posts,
}: TilPageClientProps) {
  const [view, setView] = useState<"grid" | "calendar">("grid");

  return (
    <section className="mx-auto mt-6 max-w-4xl">
      <h2 className="text-4xl font-bold text-black dark:text-white mb-3">
        오늘 배움
      </h2>
      <p className="mb-2">분명 나는 어제의 나보다 성장했다.</p>
      <p className="mb-8">
        지금까지{" "}
        <AnimatedNumber number={metaPosts.length} style={{ color: "#F7F008", fontWeight: 900, fontSize: 20 }} />
        개의 TIL을 썼고, 나는 무엇을 해도 성공할 사람이다.
      </p>
      <ViewSelector
        currentView={view}
        onViewChange={(newView) => setView(newView as "grid" | "calendar")}
      />
      {view === "grid" ? (
        <TILGrid items={metaPosts} />
      ) : (
        <TilCalendar posts={posts} />
      )}
    </section>
  );
}
