import { ArrowLeft, ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { forgotPassword } from "../Connection/connectToDB";

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

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setLoading(true);

      await forgotPassword(email);

      setSubmitted(true);
      toast.success("Reset link sent to your email");
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("Unable to send reset link");
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

        {/* Brand */}
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
            Your next chapter is only a click away.
          </p>
        </div>

        {/* Card */}
        <div
          className="border-2 border-dashed rounded-sm p-8"
          style={{
            borderColor: C.oxblood,
            backgroundColor: C.cream,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <span
              className="text-xs uppercase tracking-[0.15em]"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: C.oxblood,
              }}
            >
              Account Recovery
            </span>

            <LockKeyhole
              size={17}
              style={{ color: C.oxblood }}
            />
          </div>

          {!submitted ? (
            <>
              <h1
                className="text-3xl mb-2"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 600,
                }}
              >
                Forgot your password?
              </h1>

              <p
                className="text-sm leading-6 mb-7"
                style={{ color: "#4A473E" }}
              >
                No worries. Enter the email address connected to your
                account and we'll send you a link to create a new password.
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="text-xs uppercase tracking-[0.1em] block mb-2"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#4A473E",
                    }}
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ color: "#8A8674" }}
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      placeholder="you@example.com"
                      required
                      disabled={loading}
                      className="w-full pl-10 pr-4 py-3 rounded-sm border text-sm outline-none disabled:opacity-60"
                      style={{
                        borderColor: C.paperDark,
                        fontFamily: "'Source Serif 4', serif",
                        backgroundColor: "white",
                      }}
                    />
                  </div>
                </div>

                {/* Submit */}
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
                    "Sending..."
                  ) : (
                    <>
                      Send reset link
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Success state */
            <div className="text-center py-3">
              <div
                className="mx-auto mb-5 w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: C.paperDark,
                  color: C.oxblood,
                }}
              >
                <Mail size={24} />
              </div>

              <h1
                className="text-2xl mb-3"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 600,
                }}
              >
                Check your inbox
              </h1>

              <p
                className="text-sm leading-6 mb-5"
                style={{ color: "#4A473E" }}
              >
                If an account exists for{" "}
                <strong style={{ color: C.ink }}>{email}</strong>,
                we've sent instructions to reset your password.
              </p>

              <p
                className="text-xs leading-5"
                style={{ color: "#8A8674" }}
              >
                Didn't receive anything? Check your spam folder or try
                again with the email you used to create your account.
              </p>
            </div>
          )}
        </div>

        {/* Back to login */}
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

        {/* Small security note */}
        <p
          className="text-center text-xs mt-5 leading-5"
          style={{
            color: "#8A8674",
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          For your security, reset links expire after a limited time.
        </p>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;