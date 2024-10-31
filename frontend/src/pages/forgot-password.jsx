import { auth } from "@/firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

// components
import { ShowAlert } from "@/components/show-alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// icons
import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import { ArrowLeft } from "lucide-react";

const ForgotPasswordPage = () => {
  const [resetPasswordState, setResetPasswordState] = useState({
    email: "",
    message: "",
    error: "",
  });

  const handleStateChange = (e) => {
    const { name, value } = e.target;
    setResetPasswordState((r) => ({ ...r, [name]: value }));
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    const actionCodeSettings = {
      url: import.meta.env.VITE_RESET_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    try {
      await sendPasswordResetEmail(
        auth,
        resetPasswordState.email,
        actionCodeSettings
      );
      setResetPasswordState((r) => ({
        ...r,
        message: "Email sent. Please check your email!",
        email: "",
      }));
    } catch (err) {
      setResetPasswordState((r) => ({ ...r, error: err.message }));
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center px-5">
      <form
        className="w-full max-w-sm p-5 ring-1 ring-slate-300 rounded-lg shadow-md space-y-7"
        onSubmit={sendEmail}
      >
        <h1 className="text-2xl font-bold text-center">Reset your password</h1>

        {resetPasswordState.message && (
          <ShowAlert
            Icon={CheckCircledIcon}
            className="bg-green-400"
            message={resetPasswordState.message}
          ></ShowAlert>
        )}

        {resetPasswordState.error && (
          <ShowAlert
            variant="destructive"
            Icon={ExclamationTriangleIcon}
            message={resetPasswordState.error}
          ></ShowAlert>
        )}

        <div className="space-y-3">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="your@gmail.com"
            autoComplete="off"
            required
            value={resetPasswordState.email}
            onChange={handleStateChange}
          />
        </div>

        <div className="flex justify-between items-center">
          <Button asChild>
            <Link to="/login">
              <ArrowLeft />
              Back
            </Link>
          </Button>

          <Button
            type="submit"
            className="bg-white text-black ring-1 ring-black hover:bg-black hover:text-white"
          >
            Send Email
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
