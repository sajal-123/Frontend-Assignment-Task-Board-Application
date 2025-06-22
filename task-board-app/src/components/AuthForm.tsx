// src/components/AuthForm.tsx
import { useState } from "react";
import { useLoginUser, useSignupUser } from "../hooks/user.queries";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../utils/ToastUtils";

interface AuthFormProps {
  mode: "login" | "signup";
  setUser: (user: any) => void;
}

// Spinner component
const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

// Zod validation schemas
const loginSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters")
  // .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  // .regex(/[a-z]/, "Must contain at least one lowercase letter")
  // .regex(/[0-9]/, "Must contain at least one number")
  // .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});

const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Username is required" })
    .min(4, "Username must be at least 4 characters"),
});

const AuthForm = ({ mode, setUser }: AuthFormProps) => {
  const [formData, setFormData] = useState({ email: "", password: "", username: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const loginMutation = useLoginUser();
  const signupMutation = useSignupUser();

  const isPending = mode === "login" ? loginMutation.isPending : signupMutation.isPending;

  const schema = mode === "login" ? loginSchema : signupSchema;

  const handleChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);

    const result: any = schema.safeParse(newData);
    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors[field]?.[0];
      setErrors((prev) => ({ ...prev, [field]: fieldError || "" }));
    } else {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleSubmit = () => {
    const result = schema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    const { email, password, username } = formData;

    if (mode === "login") {
      loginMutation.mutate({ email, password }, {
        onSuccess: (data) => {
          setUser(data.user)
          showSuccess("Login successful!");
          navigate("/", { replace: true }); // ✅ Correct way
        },
        onError: (error:any) => {
          showError(error.response?.data.message || "Login failed. Please try again.");
        }
      },
      );
    } else {
      signupMutation.mutate({ username, email, password },
        {
          onSuccess: () => {
            showSuccess("Signup successful! Please log in.");
            navigate("/auth?mode=login", { replace: true });
          },
          onError: (error:any) => {
            showError(error.response?.data.message || "Signup failed. Please try again.");
          }
        }
      );
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-2 border rounded bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 ${errors[field]
      ? "border-red-500 focus:ring-red-400"
      : formData[field as keyof typeof formData]
        ? "border-green-500 focus:ring-green-400"
        : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
    }`;

  return (
    <div className="text-gray-800 dark:text-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {mode === "login" ? "Login" : "Sign Up"}
      </h2>

      <div className="space-y-4">
        {mode === "signup" && (
          <div>
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
              className={inputClass("username")}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1 animate-fadeIn">{errors.username}</p>
            )}
          </div>
        )}

        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={inputClass("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 animate-fadeIn">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className={inputClass("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1 animate-fadeIn">{errors.password}</p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isPending}
          className={`w-full py-2 rounded-md transition-all duration-300 shadow-md text-white flex items-center justify-center ${isPending
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {isPending ? <Spinner /> : <span className="transition-opacity duration-200">{mode === "login" ? "Login" : "Sign Up"}</span>}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
