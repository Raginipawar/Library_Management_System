export interface LibraryEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "Book Club" | "Author Talk" | "Workshop" | "Story Time";
  color: string;
  description: string;
  seatsLeft: number;
}

export const events: LibraryEvent[] = [
  {
    id: "evt-1",
    title: "Banned Books Book Club",
    date: "2026-08-02",
    time: "6:00 PM",
    type: "Book Club",
    color: "var(--color-maroon)",
    description: "A discussion of challenged classics and why they still matter.",
    seatsLeft: 6,
  },
  {
    id: "evt-2",
    title: "In Conversation: Kenji Osei",
    date: "2026-08-09",
    time: "5:30 PM",
    type: "Author Talk",
    color: "var(--color-cobalt)",
    description: "The author of Moths & Metal on writing cyberpunk with heart.",
    seatsLeft: 12,
  },
  {
    id: "evt-3",
    title: "Zine-Making Workshop",
    date: "2026-08-15",
    time: "2:00 PM",
    type: "Workshop",
    color: "var(--color-mustard)",
    description: "Bring scraps of paper and leave with a mini zine of your own.",
    seatsLeft: 4,
  },
  {
    id: "evt-4",
    title: "Story Time: Counting Stars",
    date: "2026-08-16",
    time: "10:00 AM",
    type: "Story Time",
    color: "var(--color-forest)",
    description: "A read-aloud and stargazing craft for ages 4-8.",
    seatsLeft: 20,
  },
];
