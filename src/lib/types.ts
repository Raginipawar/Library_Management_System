export interface DbBook {
  id: string;
  title: string;
  author: string;
  genre: string;
  format: string;
  color: string;
  rating: number;
  year: number;
  availability: "available" | "waitlist" | "reserved";
  description: string;
  tags: string[];
  is_new: boolean;
  cover_path: string | null;
}

export interface DbReservation {
  id: string;
  user_id: string;
  book_id: string;
  status: "active" | "returned" | "waitlist";
  pickup_slot: string | null;
  delivery_details: string | null;
  due_date: string | null;
  created_at: string;
  books: DbBook;
}

export interface DbCartItem {
  id: string;
  user_id: string;
  book_id: string;
  created_at: string;
  books: DbBook;
}
