export interface Category {
  name: string;
  slug: string;
  color: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  { name: "Fiction", slug: "fiction", color: "var(--color-maroon)", description: "Stories that stay with you", image: "/images/categories/fiction.jpg" },
  { name: "Sci-Fi", slug: "sci-fi", color: "var(--color-cobalt)", description: "Other worlds, other futures", image: "/images/categories/sci-fi.jpg" },
  { name: "Academic", slug: "academic", color: "var(--color-forest)", description: "Research, essays & ideas", image: "/images/categories/academic.jpg" },
  { name: "Kids", slug: "kids", color: "var(--color-mustard)", description: "Picture books & first chapters", image: "/images/categories/kids.jpg" },
  { name: "Romance", slug: "romance", color: "var(--color-pink)", description: "Slow burns & happy endings", image: "/images/categories/romance.jpg" },
  { name: "Mystery", slug: "mystery", color: "var(--color-olive)", description: "Clues, twists & whodunits", image: "/images/categories/mystery.jpg" },
];
