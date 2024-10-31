import { Link, useRouteError } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const ErrorPage = () => {
  const { error, status, statusText } = useRouteError();

  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${status} ${statusText}`;

    return () => (document.title = originalTitle);
  }, [status, statusText]);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-5 p-10">
      <h1 className="text-3xl text-black font-bold text-center">
        Oops! Sorry, an unexpected error occured.
      </h1>
      <p className="text-lg font-semibold">{error?.message}</p>
      <div className="flex justify-between gap-3 items-center">
        <p className="text-sm text-blue-700">{status}</p>
        <p className="text-sm text-slate-700">{statusText}</p>
      </div>

      <Button asChild>
        <Link to="/" replace>
          <ArrowLeft />
          Back to Home
        </Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
