export const C = {
  ink: "#1B1B16",
  paper: "#EFE7D8",
  paperDark: "#E3D9C4",
  cream: "#F7F2E7",
  oxblood: "#7A2E2E",
  oxbloodDark: "#5E2222",
  forest: "#37483B",
  gold: "#B08D57",
  sage: "#8B9A82",
};

export type Book = {
  id: number;
  title: string;
  author: string;
  price: string;
  color: string;
  badge: string | null;
  category: string;
  stock: number;
};

export const BOOKS: Book[] = [
  { id: 1, title: "The Salt Path", author: "Meret Winn", price: "18.00", color: C.oxblood, badge: "New", category: "Fiction", stock: 24 },
  { id: 2, title: "Nocturne for Two Cities", author: "Ryo Osei", price: "22.50", color: C.forest, badge: "Staff Pick", category: "Fiction", stock: 12 },
  { id: 3, title: "Glass Orchard", author: "Theo Vance", price: "16.00", color: C.gold, badge: null, category: "Poetry", stock: 0 },
  { id: 4, title: "Marrow & Bone", author: "Sefi Achebe", price: "24.00", color: C.ink, badge: "New", category: "Mystery", stock: 8 },
  { id: 5, title: "Low Tide Almanac", author: "Juno Reyes", price: "19.50", color: C.sage, badge: null, category: "Essays", stock: 31 },
  { id: 6, title: "The Cartographer's Wife", author: "Nils Solberg", price: "21.00", color: C.oxbloodDark, badge: "Staff Pick", category: "Biography", stock: 15 },
];

export const CATEGORIES = ["Fiction", "Poetry", "Mystery", "Essays", "Biography", "Sci-Fi", "Children's"];