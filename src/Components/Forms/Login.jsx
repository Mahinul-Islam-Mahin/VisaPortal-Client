import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext/AuthProvider';
import { IoMdEye } from 'react-icons/io';
import { VscEyeClosed } from 'react-icons/vsc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import logo from '../../assets/login.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Login = () => {
  const { signInUser, signInWithGoogle, Toast, setLoading, theme } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const attemptedPath = location.state?.from || '/';
  const handlePasswordVisibility = () => setShowPassword(!showPassword);
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 500 });
  }, []);
  const handleSubmit = e => {
    e.preventDefault();
    const password = e.target[1].value;
    signInUser(email, password)
      .then(() => {
        setTimeout(() => {
          navigate(attemptedPath);
          Toast('Login Successful', 'success');
        }, 200);
      })
      .catch(error => {
        Toast(error.message, 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then(() => {
        setTimeout(() => {
          navigate(attemptedPath);
          Toast('Login Successful', 'success');
        }, 200);
      })
      .catch(error => {
        Toast(error.message, 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-bl from-primary/10 to-primary/5 ${
        theme == 'dark' ? 'text-white' : 'text-black'
      }`}
    >
      <Helmet>
        <title>VisaPortal | Login</title>
      </Helmet>
      <div
        className={`flex w-full max-w-5xl shadow-lg ${
          theme == 'dark' ? 'bg-gray-950' : 'bg-white'
        } rounded-lg overflow-hidden`}
      >
        <div
          className="hidden md:flex md:w-1/2 bg-primary text-white flex-col items-center justify-center p-8"
          data-aos="fade-right"
        >
          <img src={logo} className="w-[75%] mx-auto mb-2 rounded-xl" alt="" />
          <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-center text-lg">
            Log in to VisaPortal and simplify your visa application process with
            ease and confidence!
          </p>
        </div>

        <div
          className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center"
          data-aos="fade-left"
        >
          <h2 className="text-3xl font-bold text-primary text-center mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium ${
                  theme == 'dark' ? 'text-white' : 'text-gray-700'
                }`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium ${
                  theme == 'dark' ? 'text-white' : 'text-gray-700'
                }`}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="Enter your password"
                  required
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={handlePasswordVisibility}
                >
                  {showPassword ? (
                    <VscEyeClosed className="w-5 h-5 text-gray-500" />
                  ) : (
                    <IoMdEye className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                state={{ email }}
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition"
            >
              Login
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleSignInWithGoogle}
            className="w-full py-2 flex items-center justify-center border-2 border-gray-300 text-primary font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.67 0 6.57 1.5 8.52 3.05l6.32-6.33C34.25 2.57 29.68.5 24 .5 14.91.5 7.27 6.74 4.13 15.13l7.66 5.94C13.8 14.38 18.52 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M47.65 24.5c0-1.49-.12-2.96-.35-4.39H24v8.79h13.55c-.58 3.03-2.27 5.4-4.87 7.07l7.67 5.96C43.58 37.33 47.65 31.49 47.65 24.5z"
              />
              <path
                fill="#FBBC05"
                d="M11.77 27.02c-.57-1.67-.9-3.47-.9-5.32 0-1.85.33-3.65.9-5.32L4.13 15.13C1.48 20.03 0 24 0 24c0 2.59.65 5.03 1.8 7.24L11.77 27.02z"
              />
              <path
                fill="#34A853"
                d="M24 47.5c5.68 0 10.58-1.88 14.11-5.1l-7.67-5.96c-2.13 1.43-4.91 2.36-7.96 2.36-5.47 0-10.19-4.88-11.94-11.37l-7.66 5.94C7.27 41.26 14.91 47.5 24 47.5z"
              />
            </svg>
            Sign in with Google
          </button>

          <p className="mt-6 text-center text-sm">
            New to VisaPortal?{' '}
            <Link
              to="/signup"
              state={{ from: attemptedPath }}
              className="text-primary hover:underline font-medium"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
