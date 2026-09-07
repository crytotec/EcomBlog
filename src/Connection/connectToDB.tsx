import { api } from "../Api/api";


export type Book = {
  _id: string;
  title: string;
  author: string;
  description?: string;
  category?: string;
  price: number;
  image?: string;
  publishedDate?: string;
  pageCount?: string | number;
  language?: string;
  isbn?: string;
  color?: string;
  badge?: string;
  stock?: number;
};

export const LoginUser = async (
  email: string,
  password: string,
  keepSignedIn: boolean
) => {
  try {
    const response = await api.post("/user/login", {
      email,
      password,
      keepSignedIn,
    });

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const SignupUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await api.post("/user/signup", {
      name,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const LogoutUser = async () => {
  try {
    const response = await api.post("/user/logout", {});
    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const verifyUser = async () => {
  try {
    const response = await api.get("/user/auth-status");
    return response.data;
  } catch (error) {
    console.error("Verify error:", error);
    throw error;
  }
};

export const resetPassword = async (
  token: string,
  password: string
) => {
  try {
    const response = await api.post(
      `/user/reset-password/${token}`,
      { password }
    );

    return response.data;
  } catch (error) {
    console.error("Reset password error:", error);
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await api.post("/user/forgot-password", {
      email,
    });

    return response.data;
  } catch (error) {
    console.error("Forgot password error:", error);
    throw error;
  }
};

/* =========================
   BOOKS
========================= */

export const getBook = async () => {
  try {
    const response = await api.get("/book/bookapi");

    console.log("Books response:", response.data);

    return response.data.books || response.data.items || [];
  } catch (error) {
    console.error("Fetch books error:", error);
    throw error;
  }
};

export const getBooksByCategory = async (
  category: string,
  limit?: number
) => {
  try {
    const response = await api.get("/book/bookapi", {
      params: {
        category,
        limit,
      },
    });

    console.log("Books by category response:", response.data);

    return response.data.books || response.data.items || [];
  } catch (error) {
    console.error("Fetch books by category error:", error);
    throw error;
  }
};


export const getReviews = async (id: string) => {
  try {
    const response = await api.get(`/book/reviews/${id}`);

    return response.data.reviews || [];
  } catch (error) {
    console.error("Fetch reviews error:", error);
    throw error;
  }
};


export const AddToCart = async (
  bookId: string,
  quantity: number = 1
) => {
  try {
    if (!bookId || bookId === "undefined") {
      console.error("Invalid bookId:", bookId);

      return {
        success: false,
        message: "Book ID is invalid",
        cart: null,
      };
    }

    const response = await api.post("/cart", {
      bookId,
      quantity,
    });

    console.log("Add to cart response:", response.data);

    return response.data;
  } catch (error: any) {
    console.error("Add to cart error:", error);

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to add book to cart",
      cart: null,
    };
  }
};

export const IncreaseCartQty = async (bookId: string) => {
  try {
    if (!bookId || bookId === "undefined") {
      return {
        success: false,
        message: "Book ID is invalid",
        cart: null,
      };
    }

    const response = await api.put("/cart/increase", {
      bookId,
    });

    console.log("Increase cart response:", response.data);

    return response.data;
  } catch (error: any) {
    console.error("Increase cart error:", error);

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to increase cart quantity",
      cart: null,
    };
  }
};

export const DecreaseCartQty = async (bookId: string) => {
  try {
    if (!bookId || bookId === "undefined") {
      return {
        success: false,
        message: "Book ID is invalid",
        cart: null,
      };
    }

    const response = await api.put("/cart/decrease", {
      bookId,
    });

    console.log("Decrease cart response:", response.data);

    return response.data;
  } catch (error: any) {
    console.error("Decrease cart error:", error);

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to decrease cart quantity",
      cart: null,
    };
  }
};

export const RemoveFromCart = async (bookId: string) => {
  try {
    if (!bookId || bookId === "undefined") {
      return {
        success: false,
        message: "Book ID is invalid",
        cart: null,
      };
    }

    const response = await api.delete("/cart", {
      data: {
        bookId,
      },
    });

    console.log("Remove from cart response:", response.data);

    return response.data;
  } catch (error: any) {
    console.error("Remove from cart error:", error);

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to remove book from cart",
      cart: null,
    };
  }
};



export const GetCart = async () => {
  try {
    const response = await api.get("/cart");

    console.log("Get cart response:", response.data);

    return response.data;
  } catch (error: any) {
    console.error("Get cart error:", error);

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch cart",
      cart: null,
    };
  }
};