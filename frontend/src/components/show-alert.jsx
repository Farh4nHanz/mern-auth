import PropTypes from "prop-types";

// components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const ShowAlert = ({
  variant = "default",
  className,
  Icon,
  title,
  message,
}) => (
  <Alert variant={variant} className={className}>
    <Icon className="h-4 w-4" />
    <AlertTitle>{title}</AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

ShowAlert.propTypes = {
  variant: PropTypes.string,
  className: PropTypes.string,
  Icon: PropTypes.any,
  title: PropTypes.string,
  message: PropTypes.string,
};
