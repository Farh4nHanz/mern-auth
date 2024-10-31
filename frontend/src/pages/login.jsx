import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";

// contexts
import { useFormSchema } from "@/contexts/form-schema-context";

// hooks
import useIsLoggedIn from "@/hooks/use-is-logged-in";

// redux
import { login, resetMessage } from "@/redux/slices/authSlice";

// components
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form-input";
import { ShowAlert } from "@/components/show-alert";
import { Loader } from "@/components/loader";
import { GoogleSignIn } from "@/components/google-sign-in";

// icons
import { Eye, EyeOff } from "lucide-react";
import {
  ExclamationTriangleIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons";

const LoginPage = () => {
  useIsLoggedIn();

  const formSchema = useFormSchema();
  const [passwordState, setPasswordState] = useState({
    isPasswordShow: false,
    isPasswordFocus: false,
  });

  const handlePasswordStateChange = (key, value) => {
    setPasswordState((p) => ({ ...p, [key]: value }));
  };

  const { status, message, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginUser = useCallback(
    async (values) => {
      const res = await dispatch(login(values));
      if (login.fulfilled.match(res)) {
        navigate("/");
        form.reset();
      }
    },
    [form, navigate, dispatch]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(loginUser)}
        className="w-full max-w-md p-5 ring-1 ring-slate-300 rounded-lg shadow-md space-y-5"
      >
        <h1 className="text-2xl font-bold text-center">Welcome Back!</h1>

        {error && (
          <ShowAlert
            variant="destructive"
            Icon={ExclamationTriangleIcon}
            message={error}
          />
        )}

        {message && (
          <ShowAlert
            className="bg-green-300"
            Icon={CheckCircledIcon}
            message={message}
          />
        )}

        <div className="flex flex-col gap-4">
          <FormInput
            form={form}
            name="email"
            inputType="email"
            inputPlaceholder="johndoe@gmail.com"
          />

          {/* password field */}
          <div
            className="relative"
            onFocus={() => handlePasswordStateChange("isPasswordFocus", true)}
            onBlur={() => handlePasswordStateChange("isPasswordFocus", false)}
            tabIndex={-1}
          >
            <FormInput
              form={form}
              name="password"
              inputType={passwordState.isPasswordShow ? "text" : "password"}
              inputPlaceholder="********"
            />
            {passwordState.isPasswordFocus &&
              (passwordState.isPasswordShow ? (
                <EyeOff
                  size={20}
                  className="absolute right-2 top-[50%] translate-y-[30%] cursor-pointer"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() =>
                    handlePasswordStateChange(
                      "isPasswordShow",
                      !passwordState.isPasswordShow
                    )
                  }
                />
              ) : (
                <Eye
                  size={20}
                  className="absolute right-2 top-[50%] translate-y-[30%] cursor-pointer"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() =>
                    handlePasswordStateChange(
                      "isPasswordShow",
                      !passwordState.isPasswordShow
                    )
                  }
                />
              ))}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={
            !form.getValues("email") ||
            !form.getValues("password") ||
            status === "loading"
          }
        >
          {status === "loading" ? <Loader /> : "Login"}
        </Button>

        <div className="flex justify-between gap-2">
          {/* Link to register */}
          <span className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to={"/register"}
              className="text-indigo-700"
              onClick={() => dispatch(resetMessage())}
            >
              Register here.
            </Link>
          </span>

          {/* Link to reset password */}
          <Link
            to="/reset-password"
            className="text-sm flex w-fit ml-auto text-indigo-700"
          >
            Forgot password?
          </Link>
        </div>

        {/* Sign in with Google */}
        <div className="flex items-center justify-center text-gray-500">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-xs">or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <div className="flex justify-center">
          <GoogleSignIn />
        </div>
      </form>
    </Form>
  );
};

export default LoginPage;
