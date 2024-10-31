import { createContext, useContext } from "react";

export const FormSchemaContext = createContext();

export const useFormSchema = () => {
  const context = useContext(FormSchemaContext);
  if (!context)
    throw new Error("useFormSchema must be used within FormSchemaProvider!");
  return context;
};
