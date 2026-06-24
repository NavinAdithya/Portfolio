import { LucideIcon } from "lucide-react";

export interface IProject {
  name: string;
  tagline: string;
  details: string[];
  tech: string[];
  url: string;
  accent: string;
}

export interface ICapability {
  id: string;
  label: string;
  desc: string;
  metric: string;
  color: string;
  skills: string[];
  details: string[];
  certUrl?: string;
  icon: LucideIcon;
}

export interface ITimelineEvent {
  period: string;
  title: string;
  org: string;
  detail: string;
  color: string;
  status: "active" | "past";
}

export interface INavLink {
  label: string;
  href: string;
}
