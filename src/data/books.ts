export type Availability = "available" | "waitlist" | "reserved";

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  format: "Paperback" | "Hardcover" | "E-book" | "Audiobook";
  color: string;
  rating: number;
  year: number;
  availability: Availability;
  description: string;
  tags: string[];
  isNew?: boolean;
}

export const genres = [
  "All",
  "Fiction",
  "Sci-Fi",
  "Academic",
  "Kids",
  "Romance",
  "Mystery",
  "Poetry",
];

export const formats = ["All", "Paperback", "Hardcover", "E-book", "Audiobook"];

const spineColors = [
  "var(--color-forest)",
  "var(--color-maroon)",
  "var(--color-burnt)",
  "var(--color-lavender)",
  "var(--color-mustard)",
  "var(--color-cobalt)",
  "var(--color-pink)",
  "var(--color-olive)",
];

export const books: Book[] = [
  {
    id: "charlottes-web",
    title: "Charlotte's Web",
    author: "E. B. White",
    genre: "Kids",
    format: "Paperback",
    color: spineColors[0],
    rating: 4.8,
    year: 1952,
    availability: "available",
    description:
      "A tender tale of friendship between a pig named Wilbur and a clever spider named Charlotte, who spins words into her web to save his life.",
    tags: ["classic", "friendship", "farm"],
    isNew: true,
  },
  {
    id: "grapes-of-wrath",
    title: "The Grapes of Wrath",
    author: "John Steinbeck",
    genre: "Fiction",
    format: "Hardcover",
    color: spineColors[1],
    rating: 4.6,
    year: 1939,
    availability: "waitlist",
    description:
      "The Joad family's journey west during the Dust Bowl, a sweeping portrait of resilience, injustice, and the search for dignity.",
    tags: ["classic", "american", "depression-era"],
  },
  {
    id: "dune",
    title: "Dune",
    author: "Frank Herbert",
    genre: "Sci-Fi",
    format: "Paperback",
    color: spineColors[3],
    rating: 4.9,
    year: 1965,
    availability: "available",
    description:
      "On the desert planet Arrakis, prophecy, politics, and spice collide in one of the most influential science fiction novels ever written.",
    tags: ["space", "politics", "epic"],
    isNew: true,
  },
  {
    id: "quiet-mind",
    title: "The Quiet Mind",
    author: "Renata Solis",
    genre: "Academic",
    format: "E-book",
    color: spineColors[4],
    rating: 4.3,
    year: 2021,
    availability: "available",
    description:
      "A research-backed guide to attention, focus, and the neuroscience of calm in an overstimulated world.",
    tags: ["psychology", "research", "wellbeing"],
  },
  {
    id: "letters-of-fire",
    title: "Letters of Fire",
    author: "Adaeze Obi",
    genre: "Poetry",
    format: "Paperback",
    color: spineColors[6],
    rating: 4.7,
    year: 2019,
    availability: "reserved",
    description:
      "A blazing collection of poems about migration, memory, and the languages we carry across borders.",
    tags: ["poetry", "identity", "diaspora"],
  },
  {
    id: "the-last-orchard",
    title: "The Last Orchard",
    author: "Mireille Fontaine",
    genre: "Romance",
    format: "Hardcover",
    color: spineColors[2],
    rating: 4.4,
    year: 2023,
    availability: "available",
    description:
      "Two rival winemakers, one dying orchard, and a summer that changes everything. A slow-burn romance set in the French countryside.",
    tags: ["romance", "slow-burn", "countryside"],
    isNew: true,
  },
  {
    id: "case-of-the-vanishing-clock",
    title: "The Case of the Vanishing Clock",
    author: "Priyansh Verma",
    genre: "Mystery",
    format: "Audiobook",
    color: spineColors[5],
    rating: 4.2,
    year: 2020,
    availability: "available",
    description:
      "Detective Aara Rao races against time, literally, as antique clocks vanish from a locked museum wing.",
    tags: ["detective", "locked-room", "museum"],
  },
  {
    id: "banned-books-shelf",
    title: "Banned Books Shelf",
    author: "Collected Voices",
    genre: "Academic",
    format: "Paperback",
    color: spineColors[1],
    rating: 4.9,
    year: 2022,
    availability: "waitlist",
    description:
      "An anthology exploring the history and defiance behind the world's most frequently challenged and banned books.",
    tags: ["censorship", "history", "essays"],
  },
  {
    id: "moths-and-metal",
    title: "Moths & Metal",
    author: "Kenji Osei",
    genre: "Sci-Fi",
    format: "E-book",
    color: spineColors[7],
    rating: 4.5,
    year: 2024,
    availability: "available",
    description:
      "In a rusting orbital city, a junk-collector discovers a moth-shaped AI with a memory that isn't hers to keep.",
    tags: ["cyberpunk", "ai", "found-family"],
    isNew: true,
  },
  {
    id: "small-loud-things",
    title: "Small Loud Things",
    author: "Tavish Lund",
    genre: "Fiction",
    format: "Paperback",
    color: spineColors[3],
    rating: 4.1,
    year: 2018,
    availability: "available",
    description:
      "A coming-of-age story about a garage band in a shrinking town, and the noise you make to be heard.",
    tags: ["coming-of-age", "music", "small-town"],
  },
  {
    id: "the-cartographers-daughter",
    title: "The Cartographer's Daughter",
    author: "Elin Braga",
    genre: "Fiction",
    format: "Hardcover",
    color: spineColors[0],
    rating: 4.6,
    year: 2017,
    availability: "reserved",
    description:
      "She inherits her father's unfinished maps, and a continent that may not exist. A literary adventure across imagined geographies.",
    tags: ["adventure", "family", "maps"],
  },
  {
    id: "counting-stars-for-beginners",
    title: "Counting Stars for Beginners",
    author: "Nadia Okonkwo",
    genre: "Kids",
    format: "Paperback",
    color: spineColors[4],
    rating: 4.9,
    year: 2023,
    availability: "available",
    description:
      "A picture book about a curious kid, a wobbly telescope, and the very first star she names after herself.",
    tags: ["picture-book", "space", "curiosity"],
    isNew: true,
  },

  // ---- Academic: Computer Science / Data Science / AI-ML course texts ----
  {
    id: "introduction-to-algorithms",
    title: "Introduction to Algorithms",
    author: "Cormen, Leiserson, Rivest & Stein",
    genre: "Academic",
    format: "Hardcover",
    color: spineColors[1],
    rating: 4.8,
    year: 2009,
    availability: "available",
    description:
      "The definitive reference on algorithm design and analysis, asymptotic notation, divide-and-conquer, dynamic programming, graph algorithms, and NP-completeness, all with rigorous proofs.",
    tags: ["algorithms", "computer-science", "textbook"],
  },
  {
    id: "artificial-intelligence-modern-approach",
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell & Peter Norvig",
    genre: "Academic",
    format: "Hardcover",
    color: spineColors[5],
    rating: 4.7,
    year: 2020,
    availability: "available",
    description:
      "The standard AI textbook, intelligent agents, search, logic, planning, and machine learning, spanning the full breadth of the field.",
    tags: ["artificial-intelligence", "textbook", "agents"],
    isNew: true,
  },
  {
    id: "deep-learning-goodfellow",
    title: "Deep Learning",
    author: "Ian Goodfellow, Yoshua Bengio & Aaron Courville",
    genre: "Academic",
    format: "Hardcover",
    color: spineColors[0],
    rating: 4.6,
    year: 2016,
    availability: "waitlist",
    description:
      "The foundational deep learning text, linear algebra and probability refreshers, feedforward networks, CNNs, RNNs, and generative models, from MIT Press.",
    tags: ["deep-learning", "neural-networks", "textbook"],
  },
  {
    id: "machine-learning-mitchell",
    title: "Machine Learning",
    author: "Tom M. Mitchell",
    genre: "Academic",
    format: "Hardcover",
    color: spineColors[4],
    rating: 4.5,
    year: 1997,
    availability: "available",
    description:
      "A classic first course in machine learning, concept learning, decision trees, neural networks, Bayesian learning, and reinforcement learning.",
    tags: ["machine-learning", "textbook", "classic"],
  },
  {
    id: "machine-learning-yearning",
    title: "Machine Learning Yearning",
    author: "Andrew Ng",
    genre: "Academic",
    format: "E-book",
    color: spineColors[6],
    rating: 4.7,
    year: 2018,
    availability: "available",
    description:
      "A practical, project-focused guide to structuring machine learning projects, from Andrew Ng, covering error analysis, train/dev/test splits, and diagnosing model performance.",
    tags: ["machine-learning", "andrew-ng", "practical"],
    isNew: true,
  },
  {
    id: "database-system-concepts",
    title: "Database System Concepts",
    author: "Silberschatz, Korth & Sudarshan",
    genre: "Academic",
    format: "Hardcover",
    color: spineColors[2],
    rating: 4.5,
    year: 2019,
    availability: "available",
    description:
      "Comprehensive coverage of relational databases, SQL, normalization, transactions, and modern storage and query processing techniques.",
    tags: ["databases", "sql", "textbook"],
  },
  {
    id: "cryptography-network-security",
    title: "Cryptography and Network Security",
    author: "William Stallings",
    genre: "Academic",
    format: "Paperback",
    color: spineColors[7],
    rating: 4.4,
    year: 2016,
    availability: "reserved",
    description:
      "Principles and practice of cryptographic algorithms and network security protocols, from symmetric ciphers to TLS and firewalls.",
    tags: ["cryptography", "security", "networks"],
  },
  {
    id: "design-patterns-gof",
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    author: "Gamma, Helm, Johnson & Vlissides",
    genre: "Academic",
    format: "Paperback",
    color: spineColors[3],
    rating: 4.6,
    year: 1994,
    availability: "available",
    description:
      "The 'Gang of Four' book, twenty-three foundational object-oriented design patterns that shaped how software is architected.",
    tags: ["software-engineering", "design-patterns", "oop"],
  },
  {
    id: "compilers-dragon-book",
    title: "Compilers: Principles, Techniques & Tools",
    author: "Aho, Lam, Sethi & Ullman",
    genre: "Academic",
    format: "Hardcover",
    color: spineColors[1],
    rating: 4.6,
    year: 2006,
    availability: "available",
    description:
      "The 'Dragon Book', lexical analysis, parsing, syntax-directed translation, and code generation, the classic guide to building compilers.",
    tags: ["compilers", "computer-science", "classic"],
  },
  {
    id: "discrete-mathematics-rosen",
    title: "Discrete Mathematics and Its Applications",
    author: "Kenneth H. Rosen",
    genre: "Academic",
    format: "Hardcover",
    color: spineColors[4],
    rating: 4.5,
    year: 2018,
    availability: "available",
    description:
      "Logic, sets, combinatorics, graph theory, and number theory, the mathematical foundations underlying computer science.",
    tags: ["mathematics", "discrete-math", "textbook"],
  },

  // ---- Fiction / Mystery / Romance: well-known screen adaptations ----
  {
    id: "the-queens-gambit",
    title: "The Queen's Gambit",
    author: "Walter Tevis",
    genre: "Fiction",
    format: "Paperback",
    color: spineColors[0],
    rating: 4.7,
    year: 1983,
    availability: "available",
    description:
      "An orphaned chess prodigy battles addiction and grandmasters on her way to the top, the novel behind the acclaimed Netflix series.",
    tags: ["chess", "coming-of-age", "screen-adaptation"],
    isNew: true,
  },
  {
    id: "you-kepnes",
    title: "You",
    author: "Caroline Kepnes",
    genre: "Mystery",
    format: "Paperback",
    color: spineColors[5],
    rating: 4.3,
    year: 2014,
    availability: "available",
    description:
      "A bookstore manager's obsession curdles into stalking and worse, the chilling thriller behind the hit Netflix series.",
    tags: ["thriller", "obsession", "screen-adaptation"],
  },
  {
    id: "behind-her-eyes",
    title: "Behind Her Eyes",
    author: "Sarah Pinborough",
    genre: "Mystery",
    format: "E-book",
    color: spineColors[6],
    rating: 4.2,
    year: 2017,
    availability: "waitlist",
    description:
      "A single mother's affair with her boss unravels into something far stranger, adapted into a twist-ending Netflix miniseries.",
    tags: ["psychological-thriller", "twist-ending", "screen-adaptation"],
  },
  {
    id: "to-all-the-boys",
    title: "To All the Boys I've Loved Before",
    author: "Jenny Han",
    genre: "Romance",
    format: "Paperback",
    color: spineColors[2],
    rating: 4.6,
    year: 2014,
    availability: "available",
    description:
      "Five secret love letters get mailed by accident, turning Lara Jean's private crushes very public, the novel behind the Netflix romance trilogy.",
    tags: ["ya-romance", "coming-of-age", "screen-adaptation"],
    isNew: true,
  },
  {
    id: "bridgerton-duke-and-i",
    title: "The Duke and I",
    author: "Julia Quinn",
    genre: "Romance",
    format: "Paperback",
    color: spineColors[7],
    rating: 4.5,
    year: 2000,
    availability: "available",
    description:
      "A fake courtship between Daphne Bridgerton and the Duke of Hastings sparks real feelings, book one of the series behind Netflix's Bridgerton.",
    tags: ["regency", "historical-romance", "screen-adaptation"],
  },

  // ---- Kids: Disney-associated classics ----
  {
    id: "alice-in-wonderland",
    title: "Alice's Adventures in Wonderland",
    author: "Lewis Carroll",
    genre: "Kids",
    format: "Hardcover",
    color: spineColors[3],
    rating: 4.6,
    year: 1865,
    availability: "available",
    description:
      "A girl falls down a rabbit hole into a world of riddles, talking creatures, and a temperamental queen, the classic behind Disney's animated film.",
    tags: ["classic", "fantasy", "disney"],
  },
  {
    id: "the-jungle-book",
    title: "The Jungle Book",
    author: "Rudyard Kipling",
    genre: "Kids",
    format: "Paperback",
    color: spineColors[0],
    rating: 4.5,
    year: 1894,
    availability: "available",
    description:
      "Mowgli grows up among wolves, bears, and panthers in the Indian jungle, the source material for Disney's beloved adaptations.",
    tags: ["classic", "adventure", "disney"],
  },
  {
    id: "peter-pan",
    title: "Peter Pan",
    author: "J. M. Barrie",
    genre: "Kids",
    format: "Hardcover",
    color: spineColors[6],
    rating: 4.7,
    year: 1911,
    availability: "reserved",
    description:
      "The boy who never grows up whisks the Darling children away to Neverland, the timeless story behind Disney's animated classic.",
    tags: ["classic", "fantasy", "disney"],
    isNew: true,
  },
];

export function getBookById(id: string) {
  return books.find((b) => b.id === id);
}

export function getRelatedBooks(book: Book, count = 4) {
  return books
    .filter((b) => b.id !== book.id && b.genre === book.genre)
    .slice(0, count)
    .concat(books.filter((b) => b.id !== book.id && b.genre !== book.genre))
    .slice(0, count);
}
