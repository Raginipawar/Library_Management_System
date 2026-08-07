// Book ids that have a real cover photo in /public/images/covers.
// Every book in the catalog has one now: 19 sourced from the Open
// Library Covers API, and 11 supplied by hand for invented titles
// and the two real books Open Library didn't have on file.
const idsWithCovers = new Set([
  "introduction-to-algorithms",
  "machine-learning-mitchell",
  "database-system-concepts",
  "compilers-dragon-book",
  "discrete-mathematics-rosen",
  "deep-learning-goodfellow",
  "cryptography-network-security",
  "design-patterns-gof",
  "the-queens-gambit",
  "you-kepnes",
  "behind-her-eyes",
  "to-all-the-boys",
  "bridgerton-duke-and-i",
  "alice-in-wonderland",
  "the-jungle-book",
  "peter-pan",
  "charlottes-web",
  "grapes-of-wrath",
  "dune",
  "quiet-mind",
  "letters-of-fire",
  "the-last-orchard",
  "case-of-the-vanishing-clock",
  "banned-books-shelf",
  "moths-and-metal",
  "small-loud-things",
  "the-cartographers-daughter",
  "counting-stars-for-beginners",
  "artificial-intelligence-modern-approach",
  "machine-learning-yearning",
]);

export function getCoverImage(id: string): string | null {
  return idsWithCovers.has(id) ? `/images/covers/${id}.jpg` : null;
}
