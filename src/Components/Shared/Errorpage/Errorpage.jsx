import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Helmet>
        <title>VisaPortal | Not-Found</title>
      </Helmet>
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl text-gray-600 mt-4">Oops! Page Not Found.</p>
        <p className="text-lg text-gray-500 mt-2">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to={"/"}
          className="mt-6 inline-block px-6 py-2 bg-primary text-white text-lg rounded-md hover:bg-primary/[130]"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
