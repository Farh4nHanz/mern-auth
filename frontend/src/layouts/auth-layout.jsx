import PropTypes from "prop-types";
import { z } from "zod";

// contexts
import { FormSchemaContext } from "@/contexts/form-schema-context";

const AuthLayout = ({ children, page }) => {
  const formSchema =
    String(page).toLowerCase() === "login"
      ? z.object({
          email: z.string().email(),
          password: z.string(),
        })
      : z
          .object({
            username: z.string().min(4, {
              message: "Username must be at least 4 characters.",
            }),
            email: z.string().email(),
            password: z
              .string()
              .min(6, {
                message: "Password must be at least 6 characters.",
              })
              .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{6,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character."
              ),
            confirmPassword: z.string(),
          })
          .refine((data) => data.password === data.confirmPassword, {
            message: "Password not match.",
            path: ["confirmPassword"],
          });

  return (
    <FormSchemaContext.Provider value={formSchema}>
      <div className="h-screen w-full flex justify-center items-center p-5">
        {children}
      </div>
    </FormSchemaContext.Provider>
  );
};

AuthLayout.propTypes = {
  page: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
