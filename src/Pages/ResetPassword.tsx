import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { resetPassword } from "../Connection/connectToDB";

const C = {
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

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or missing reset link");
      return;
    }

    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await resetPassword(token, password);

      setSubmitted(true);

      toast.success("Password reset successfully");

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error: any) {
      console.error("Reset password error:", error);

      const message =
        error?.response?.data?.message ||
        "Unable to reset password";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: C.paper,
        color: C.ink,
        fontFamily: "'Source Serif 4', serif",
      }}
      className="min-h-screen w-full flex items-center justify-center px-5 py-16"
    >
      <div className="w-full max-w-md">

        {/* BRAND */}
        <div className="text-center mb-8">
          <span
            className="text-2xl"
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            Foxed &amp; Bound
          </span>

          <p
            className="text-sm mt-3"
            style={{ color: "#4A473E" }}
          >
            A fresh password for your next chapter.
          </p>
        </div>

        {/* CARD */}
        <div
          className="border-2 border-dashed rounded-sm p-8"
          style={{
            borderColor: C.oxblood,
            backgroundColor: C.cream,
          }}
        >
          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <span
              className="text-xs uppercase tracking-[0.15em]"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: C.oxblood,
              }}
            >
              Reset Password
            </span>

            <LockKeyhole
              size={17}
              style={{ color: C.oxblood }}
            />
          </div>

          {!submitted ? (
            <>
              {/* TITLE */}
              <h1
                className="text-3xl mb-2"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 600,
                }}
              >
                Create a new password
              </h1>

              <p
                className="text-sm leading-6 mb-7"
                style={{ color: "#4A473E" }}
              >
                Choose a new password for your account. Make sure
                it's something secure that you can remember.
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                {/* PASSWORD */}
                <div>
                  <label
                    htmlFor="password"
                    className="text-xs uppercase tracking-[0.1em] block mb-2"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#4A473E",
                    }}
                  >
                    New password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ color: "#8A8674" }}
                    />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      autoComplete="new-password"
                      placeholder="Enter new password"
                      disabled={loading}
                      required
                      className="w-full pl-10 pr-11 py-3 rounded-sm border text-sm outline-none disabled:opacity-60"
                      style={{
                        borderColor: C.paperDark,
                        fontFamily: "'Source Serif 4', serif",
                        backgroundColor: "white",
                      }}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      disabled={loading}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: "#8A8674" }}
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>
                  </div>

                  <p
                    className="text-xs mt-2"
                    style={{
                      color: "#8A8674",
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  >
                    Minimum 6 characters
                  </p>
                </div>

                {/* CONFIRM PASSWORD */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="text-xs uppercase tracking-[0.1em] block mb-2"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#4A473E",
                    }}
                  >
                    Confirm password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ color: "#8A8674" }}
                    />

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                      autoComplete="new-password"
                      placeholder="Confirm new password"
                      disabled={loading}
                      required
                      className="w-full pl-10 pr-11 py-3 rounded-sm border text-sm outline-none disabled:opacity-60"
                      style={{
                        borderColor:
                          confirmPassword &&
                          confirmPassword !== password
                            ? C.oxblood
                            : C.paperDark,
                        fontFamily: "'Source Serif 4', serif",
                        backgroundColor: "white",
                      }}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      disabled={loading}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: "#8A8674" }}
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>
                  </div>

                  {confirmPassword &&
                    confirmPassword !== password && (
                      <p
                        className="text-xs mt-2"
                        style={{
                          color: C.oxblood,
                          fontFamily:
                            "'IBM Plex Mono', monospace",
                        }}
                      >
                        Passwords do not match
                      </p>
                    )}
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-1 px-6 py-3.5 text-sm uppercase tracking-[0.1em] text-white rounded-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: C.oxblood,
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}
                >
                  {loading ? (
                    "Resetting..."
                  ) : (
                    <>
                      Reset password
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* SUCCESS STATE */
            <div className="text-center py-3">
              <div
                className="mx-auto mb-5 w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: C.paperDark,
                  color: C.forest,
                }}
              >
                <ShieldCheck size={27} />
              </div>

              <h1
                className="text-2xl mb-3"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 600,
                }}
              >
                Password updated
              </h1>

              <p
                className="text-sm leading-6 mb-5"
                style={{ color: "#4A473E" }}
              >
                Your password has been successfully changed.
                You can now sign in using your new password.
              </p>

              <div
                className="text-xs leading-5"
                style={{
                  color: "#8A8674",
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
              >
                Redirecting you to sign in...
              </div>
            </div>
          )}
        </div>

        {/* BACK TO LOGIN */}
        {!submitted && (
          <div className="text-center mt-6">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm hover:opacity-60 transition-opacity"
              style={{
                color: C.oxblood,
                fontFamily: "'Source Serif 4', serif",
              }}
            >
              <ArrowLeft size={14} />
              Back to sign in
            </Link>
          </div>
        )}

        {/* FOOTER NOTE */}
        <p
          className="text-center text-xs mt-5 leading-5"
          style={{
            color: "#8A8674",
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          Reset links expire after 15 minutes for your security.
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
