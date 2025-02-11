import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import useAuthStore from "../stores/authStore";
import { useState } from "react";

function Login() {
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      // Redirect to a protected route
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };

  const handleLoginSuccess = async (googleResponse: any) => {
    const token = googleResponse.credential; // Google token
    // Use the response to authenticate with your backend.
    // Implement Google login logic here
  };

  const handleLoginFailure = (response: any = "There was a Login error.") => {
    // Handle the login failure.
    setError(response.error);
  };

  return (
    <div className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">
            All people are knowing, growing, creating.
          </h1>
          <p className="leading-relaxed mt-4">
            Yet we are all here to read, learn and teach.
          </p>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input type="email" id="email" name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
              <input type="password" id="password" name="password" current-password="********"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
          <p className="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>
          <span className="flex flex-col md:flex-row justify-between mt-3">
            <Link to="/register" className="text-indigo-500 inline-flex items-center mt-3">Register</Link>
            <Link to="/forgot-password" className="text-indigo-500 inline-flex items-center mt-3">Forgot Password</Link>
          </span>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;