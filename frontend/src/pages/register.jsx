import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";

// contexts
import { useFormSchema } from "@/contexts/form-schema-context";

// redux
import { register, resetMessage } from "@/redux/slices/authSlice";

// hooks
import useIsLoggedIn from "@/hooks/use-is-logged-in";

// components
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form-input";
import { ShowAlert } from "@/components/show-alert";
import { Loader } from "@/components/loader";
import { GoogleSignIn } from "@/components/google-sign-in";

// icons
import { Eye, EyeOff } from "lucide-react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const RegisterPage = () => {
  useIsLoggedIn();

  const formSchema = useFormSchema();
  const [passwordState, setPasswordState] = useState({
    isPasswordShow: false,
    isPasswordFocus: false,
    isConfirmPasswordShow: false,
    isConfirmPasswordFocus: false,
  });

  const handlePasswordStateChange = (key, value) => {
    setPasswordState((p) => ({ ...p, [key]: value }));
  };

  const { status, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerUser = useCallback(
    async (values) => {
      const res = await dispatch(register(values));
      if (register.fulfilled.match(res)) {
        navigate("/login");
        form.reset();
      }
    },
    [dispatch, navigate, form]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(registerUser)}
        className="w-full max-w-sm p-5 ring-1 ring-slate-300 rounded-lg shadow-md space-y-5"
      >
        <h1 className="text-2xl font-bold text-center">Register Form</h1>

        {error && (
          <ShowAlert
            variant="destructive"
            Icon={ExclamationTriangleIcon}
            message={error}
          />
        )}

        <div className="flex flex-col gap-4">
          <FormInput form={form} name="username" inputPlaceholder="John Doe" />
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
                  className={`absolute right-2 top-[50%] ${
                    form.formState.errors?.password?.type === "too_small"
                      ? "-translate-y-[40%]"
                      : form.formState.errors?.password?.type ===
                        "invalid_string"
                      ? "-translate-y-[90%]"
                      : "translate-y-[30%]"
                  } cursor-pointer`}
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
                  className={`absolute right-2 top-[50%] ${
                    form.formState.errors?.password?.type === "too_small"
                      ? "-translate-y-[40%]"
                      : form.formState.errors?.password?.type ===
                        "invalid_string"
                      ? "-translate-y-[90%]"
                      : "translate-y-[30%]"
                  } cursor-pointer`}
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

          {/* confirm password field */}
          <div
            className="relative"
            onFocus={() =>
              handlePasswordStateChange("isConfirmPasswordFocus", true)
            }
            onBlur={() =>
              handlePasswordStateChange("isConfirmPasswordFocus", false)
            }
            tabIndex={-1}
          >
            <FormInput
              form={form}
              name="confirmPassword"
              inputType={
                passwordState.isConfirmPasswordShow ? "text" : "password"
              }
              inputPlaceholder="********"
            />
            {passwordState.isConfirmPasswordFocus &&
              (passwordState.isConfirmPasswordShow ? (
                <EyeOff
                  size={20}
                  className={`absolute right-2 top-[50%] ${
                    form.formState.errors.confirmPassword
                      ? "-translate-y-[30%]"
                      : "translate-y-[30%]"
                  }  cursor-pointer`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() =>
                    handlePasswordStateChange(
                      "isConfirmPasswordShow",
                      !passwordState.isConfirmPasswordShow
                    )
                  }
                />
              ) : (
                <Eye
                  size={20}
                  className={`absolute right-2 top-[50%] ${
                    form.formState.errors.confirmPassword
                      ? "-translate-y-[30%]"
                      : "translate-y-[30%]"
                  }  cursor-pointer`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() =>
                    handlePasswordStateChange(
                      "isConfirmPasswordShow",
                      !passwordState.isConfirmPasswordShow
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
            !form.getValues("username") ||
            !form.getValues("email") ||
            !form.getValues("password") ||
            !form.getValues("confirmPassword") ||
            status === "loading"
          }
        >
          {status === "loading" ? <Loader /> : "Register"}
        </Button>

        {/* Link to login page */}
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-indigo-700"
            onClick={() => dispatch(resetMessage())}
          >
            Login here.
          </Link>
        </p>

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

export default RegisterPage;
