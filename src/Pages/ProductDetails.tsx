import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Check,
} from "lucide-react";
import {
  getBook,
  getReviews,
  type Book,
} from "../Connection/connectToDB";
import { cartAuth } from "../context/CartContext";

type ReviewItem = {
  _id?: string;
  rating?: number;
  comment?: string;
  review?: string;
  user?: {
    name?: string;
    email?: string;
  };
  userName?: string;
  name?: string;
  createdAt?: string;
};

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { add } = cartAuth();

  const [product, setProduct] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);

        const books = await getBook();

        if (!Array.isArray(books)) {
          setProduct(null);
          return;
        }

        const slugify = (title: string) =>
          title
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

        const foundBook = books.find(
          (book: Book) =>
            book._id === id || slugify(book.title) === id
        );

        if (foundBook) {
          setProduct(foundBook);

          // Fetch reviews for this particular book
          try {
            setReviewLoading(true);

            const bookReviews = await getReviews(foundBook._id);

            if (Array.isArray(bookReviews)) {
              setReviews(bookReviews);
            } else {
              setReviews([]);
            }
          } catch (error) {
            console.error("Review fetch error:", error);
            setReviews([]);
          } finally {
            setReviewLoading(false);
          }
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Product fetch error:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const increaseQuantity = () => {
    if (product?.stock && quantity >= product.stock) return;

    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      setAdding(true);

      await add(product, quantity);

      setQuantity(1);
    } catch (error) {
      console.error("Add to cart error:", error);
    } finally {
      setAdding(false);
    }
  };

  const formatPrice = (price: number) => {
    return `₦${Number(price || 0).toLocaleString("en-NG")}`;
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce(
          (total, review) => total + Number(review.rating || 0),
          0
        ) / reviews.length
      : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading book...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Book Not Found
          </h1>

          <p className="text-gray-500 mb-6">
            Sorry, we couldn't find the book you're looking for.
          </p>

          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      {/* Product */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center min-h-[500px]">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="max-h-[500px] max-w-full object-contain rounded-lg"
              />
            ) : (
              <div className="text-gray-400 text-center">
                No image available
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            {/* Category */}
            {product.category && (
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {product.category}
              </p>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              {product.title}
            </h1>

            {/* Author */}
            {product.author && (
              <p className="text-lg text-gray-600 mt-3">
                by{" "}
                <span className="font-medium text-gray-900">
                  {product.author}
                </span>
              </p>
            )}

            {/* Rating */}
            <div className="flex items-center gap-3 mt-5">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className={
                      star <= Math.round(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <span className="text-sm text-gray-500">
                {reviews.length > 0
                  ? `${averageRating.toFixed(1)} (${reviews.length} ${
                      reviews.length === 1 ? "review" : "reviews"
                    })`
                  : "No reviews yet"}
              </span>
            </div>

            {/* Price */}
            <div className="mt-7">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <div className="mt-7">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h2>

                <p className="text-gray-600 leading-7">
                  {product.description}
                </p>
              </div>
            )}

            {/* Book information */}
            <div className="grid grid-cols-2 gap-4 mt-7">
              {product.publishedDate && (
                <div>
                  <p className="text-sm text-gray-500">Published</p>
                  <p className="font-medium text-gray-900">
                    {product.publishedDate}
                  </p>
                </div>
              )}

              {product.pageCount && (
                <div>
                  <p className="text-sm text-gray-500">Pages</p>
                  <p className="font-medium text-gray-900">
                    {product.pageCount}
                  </p>
                </div>
              )}

              {product.language && (
                <div>
                  <p className="text-sm text-gray-500">Language</p>
                  <p className="font-medium text-gray-900">
                    {product.language}
                  </p>
                </div>
              )}

              {product.isbn && (
                <div>
                  <p className="text-sm text-gray-500">ISBN</p>
                  <p className="font-medium text-gray-900">
                    {product.isbn}
                  </p>
                </div>
              )}
            </div>

            {/* Stock */}
            {product.stock !== undefined && (
              <div className="mt-6">
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <Check size={18} />
                    <span className="font-medium">
                      {product.stock} in stock
                    </span>
                  </div>
                ) : (
                  <p className="text-red-600 font-medium">
                    Out of stock
                  </p>
                )}
              </div>
            )}

            {/* Quantity + Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              {/* Quantity */}
              <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="p-3 hover:bg-gray-100 disabled:opacity-40 transition"
                >
                  <Minus size={18} />
                </button>

                <span className="w-12 text-center font-semibold">
                  {quantity}
                </span>

                <button
                  onClick={increaseQuantity}
                  disabled={
                    product.stock !== undefined &&
                    product.stock > 0 &&
                    quantity >= product.stock
                  }
                  className="p-3 hover:bg-gray-100 disabled:opacity-40 transition"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                disabled={
                  adding ||
                  (product.stock !== undefined && product.stock <= 0)
                }
                className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400 transition"
              >
                <ShoppingCart size={20} />

                {adding ? "Adding..." : "Add to Cart"}
              </button>
            </div>

            {/* Go to cart */}
            <Link
              to="/cart"
              className="mt-4 text-center text-gray-700 hover:text-black font-medium underline"
            >
              View Cart
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Customer Reviews
              </h2>

              <p className="text-gray-500 mt-1">
                What readers are saying about this book
              </p>
            </div>

            {reviews.length > 0 && (
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {averageRating.toFixed(1)}
                </div>

                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={
                        star <= Math.round(averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {reviewLoading ? (
            <div className="py-10 text-center text-gray-500">
              Loading reviews...
            </div>
          ) : reviews.length === 0 ? (
            <div className="border border-dashed border-gray-300 rounded-xl p-10 text-center">
              <Star
                size={35}
                className="mx-auto text-gray-300 mb-3"
              />

              <h3 className="font-semibold text-gray-900">
                No reviews yet
              </h3>

              <p className="text-gray-500 mt-1">
                Be the first person to review this book.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {reviews.map((review, index) => {
                const reviewerName =
                  review.user?.name ||
                  review.userName ||
                  review.name ||
                  review.user?.email ||
                  "Anonymous";

                const reviewText =
                  review.comment || review.review || "";

                return (
                  <div
                    key={review._id || index}
                    className="border border-gray-200 rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {reviewerName}
                        </h3>

                        <div className="flex gap-1 mt-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className={
                                star <= Number(review.rating || 0)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                      </div>

                      {review.createdAt && (
                        <span className="text-sm text-gray-400">
                          {new Date(
                            review.createdAt
                          ).toLocaleDateString("en-NG")}
                        </span>
                      )}
                    </div>

                    {reviewText && (
                      <p className="text-gray-600 mt-4 leading-7">
                        {reviewText}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;