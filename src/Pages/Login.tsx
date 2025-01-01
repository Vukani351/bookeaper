import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

// for testing - move this to store function when it works the nstore the response in a cookie or storage.
import axios from 'axios';

function Login() {
  const handleLoginSuccess = async (googleResponse: any) => {
    const token = googleResponse.credential; // Google token
    console.log("Google login response:", googleResponse);
    // Use the response to authenticate with your backend.

    // for testing - move this to store function when it works the nstore the response in a cookie or storage.
    try {
      const response = await axios.get('http://localhost:3000/api/auth/google', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Login success:', response.data);
  
      // Save the JWT token in localStorage or cookies
      localStorage.setItem('token', response.data.token);
  
      // Redirect to a protected route
      window.location.href = '/dashboard';
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Login failed:', error.response?.data || error.message);
      } else {
        console.error('Login failed:', error);
      }
    }
  };

  const handleLoginFailure = (response: any = "There was a Login error.") => {
    console.log("Google login response:", response);
    // Handle the login failure.
  };


  return (
    <div className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">All people are knowing, growing, creating.</h1>
          <p className="leading-relaxed mt-4">
          Yet we are all here to read, learn and teach.
          </p>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Login</h2>
          <div className="relative mb-4">
            <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Username</label>
            <input type="email" id="full-name" name="full-name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Password</label>
            <input type="password" id="email" name="email"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Login</button>
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

export default Login