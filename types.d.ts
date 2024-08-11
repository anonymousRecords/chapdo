import { JSXElementConstructor, ReactElement } from "react";

export type Meta = {
  id: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
};

export type BlogPost = {
  meta: Meta;
  content: ReactElement<any, string | JSXElementConstructor<any>>;
};

export type ArchiveType = "TIL" | "POSTS" | "PROJECTS" | "ACTIVITIES" | "BOOKS";

export type TilType = "all" | "search" | "pick";
