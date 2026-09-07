import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  getBook,
  type Book,
} from "../Connection/connectToDB";

import { cartAuth } from "../context/CartContext";

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
};

/* =========================================================
   HOME
========================================================= */

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] =
    useState<string | null>(null);
  const [search, setSearch] = useState("");

  const { add, cart } = cartAuth();

  /* =======================================================
     FETCH BOOKS
  ======================================================= */

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);

        const data = await getBook();

        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          console.error(
            "Invalid books response:",
            data
          );

          setBooks([]);
        }
      } catch (error) {
        console.error(
          "Book fetch error:",
          error
        );

        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  /* =======================================================
     SEARCH
  ======================================================= */

  const filteredBooks = useMemo(() => {
    const searchText = search
      .trim()
      .toLowerCase();

    if (!searchText) {
      return books;
    }

    return books.filter((book) => {
      const title =
        book.title?.toLowerCase() || "";

      const author =
        book.author?.toLowerCase() || "";

      const category =
        book.category?.toLowerCase() || "";

      return (
        title.includes(searchText) ||
        author.includes(searchText) ||
        category.includes(searchText)
      );
    });
  }, [books, search]);

  /* =======================================================
     CART MAP
  ======================================================= */

  const cartMap = useMemo(() => {
    const map = new Map<string, number>();

    cart.forEach((item) => {
      if (item._id) {
        map.set(
          String(item._id),
          item.quantity
        );
      }
    });

    return map;
  }, [cart]);

  /* =======================================================
     ADD TO CART
  ======================================================= */

  const handleAddToCart = async (
    book: Book
  ) => {
    if (!book._id) {
      console.error(
        "Book MongoDB _id is missing:",
        book
      );

      return;
    }

    setAddingId(book._id);

    try {
      await add(book);
    } catch (error) {
      console.error(
        "Failed to add book to cart:",
        error
      );
    } finally {
      setAddingId(null);
    }
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-lg text-gray-600">
            Loading books...
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===================================================
          HERO
      =================================================== */}

      <section className="bg-gradient-to-r from-blue-600 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4">
              Welcome to our bookstore
            </p>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Discover Your Next Favorite Book
            </h1>

            <p className="mt-6 text-lg text-white/90 leading-8">
              Explore our collection of books and
              find something perfect for learning,
              entertainment and personal growth.
            </p>

            <a
              href="#books"
              className="inline-block mt-8 px-7 py-3 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-100 transition"
            >
              Explore Books
            </a>
          </div>
        </div>
      </section>

      {/* ===================================================
          SEARCH
      =================================================== */}

      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="max-w-xl mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search by title, author or category..."
            className="w-full px-5 py-4 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section>

      {/* ===================================================
          BOOKS
      =================================================== */}

      <section
        id="books"
        className="max-w-7xl mx-auto px-6 pb-16"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Available Books
            </h2>

            <p className="text-gray-500 mt-2">
              {filteredBooks.length}{" "}
              {filteredBooks.length === 1
                ? "book"
                : "books"}{" "}
              found
            </p>
          </div>

          <Link
            to="/cart"
            className="w-fit px-5 py-3 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition"
          >
            Cart ({cart.length})
          </Link>
        </div>

        {/* =================================================
            NO BOOKS
        ================================================= */}

        {filteredBooks.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-800">
              No books found
            </h3>

            <p className="text-gray-500 mt-2">
              Try searching for another title,
              author or category.
            </p>
          </div>
        ) : (
          /* ===============================================
             BOOK GRID
          =============================================== */

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => {
              const quantity =
                cartMap.get(
                  String(book._id)
                ) || 0;

              const isAdding =
                addingId === book._id;

              const slug = generateSlug(
                book.title
              );

              return (
                <article
                  key={book._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition"
                >
                  {/* IMAGE */}

                  <Link to={`/product/${slug}`}>
                    <div className="h-72 bg-gray-100 overflow-hidden">
                      {book.image ? (
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-full h-full object-cover hover:scale-105 transition duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* CONTENT */}

                  <div className="p-5">
                    {book.badge && (
                      <span className="inline-block text-xs font-semibold bg-red-100 text-red-600 px-3 py-1 rounded-full mb-3">
                        {book.badge}
                      </span>
                    )}

                    {book.category && (
                      <p className="text-sm text-blue-600 font-medium mb-1">
                        {book.category}
                      </p>
                    )}

                    <Link
                      to={`/product/${slug}`}
                    >
                      <h3 className="font-bold text-lg text-gray-900 line-clamp-2 hover:text-blue-600 transition">
                        {book.title}
                      </h3>
                    </Link>

                    <p className="text-sm text-gray-500 mt-2">
                      by {book.author}
                    </p>

                    <div className="flex items-center justify-between mt-5">
                      <span className="text-xl font-bold text-gray-900">
                        ₦
                        {Number(
                          book.price || 0
                        ).toLocaleString()}
                      </span>

                      {quantity > 0 && (
                        <span className="text-sm font-medium text-green-600">
                          {quantity} in cart
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2 mt-5">
                      <Link
                        to={`/product/${slug}`}
                        className="flex-1 text-center px-4 py-3 rounded-lg border border-gray-300 font-medium hover:bg-gray-50 transition"
                      >
                        View
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          handleAddToCart(book)
                        }
                        disabled={isAdding}
                        className="flex-1 px-4 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
                      >
                        {isAdding
                          ? "Adding..."
                          : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
