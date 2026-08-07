export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  color: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Nikhil Shah",
    role: "Final year, Computer Engineering",
    quote:
      "Reserved Introduction to Algorithms two days before my DAA exam and actually got it. Would've failed that viva otherwise, not even joking.",
    color: "var(--color-lavender)",
  },
  {
    name: "Bhumi More",
    role: "ML enthusiast",
    quote:
      "Been trying to properly learn machine learning for months. Having Machine Learning Yearning and the Mitchell book both on my shelf at once finally got me past just watching YouTube videos.",
    color: "var(--color-mustard)",
  },
  {
    name: "Vaishali Pawar",
    role: "Working professional, switching into ML",
    quote:
      "I have maybe an hour after work most days. Being able to reserve a book on my phone during lunch and just walk in and grab it saves me the one thing I don't have, time.",
    color: "var(--color-pink)",
  },
  {
    name: "Sachi Dhoka",
    role: "College student",
    quote:
      "Used to just hope the AI textbook was still on the shelf when I got there. Now I check availability before I even leave the hostel.",
    color: "var(--color-cobalt)",
  },
];
