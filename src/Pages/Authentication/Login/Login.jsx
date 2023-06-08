import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleAuthProvider } from "firebase/auth";
import swal from "sweetalert";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, providerLogin } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleGoogleSignIn = () => {
    providerLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from);
        swal("Good job!", "Successfully Log In", "success");
       
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccess(false);

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess(true);
        swal("Good job!", "Successfully Log In", "success");
        form.reset();
        navigate(from);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="py-10 mt-16">
      <h2 className="text-4xl font-bold text-center">Please Log In</h2>
      <div className="flex justify-center text-black mb-14 mt-10">
        <div className="card w-full max-w-lg shadow-2xl bg-gray-200">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <h1 className="font-bold text-slate-900 text-3xl text-center my-6">
                Login to view next
              </h1>

              <label className="label">
                <span className="label-text text-black">Email Address</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered border-zinc-900 bg-white"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Password</span>
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered border-zinc-900 bg-white pr-10 w-full"
                  required
                />
                <div
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEye className="text-gray-500" />
                  ) : (
                    <FaEyeSlash className="text-gray-500" />
                  )}
                </div>
              </div>
              <label className="label text-purple-700">
                {success && <p>Successfully login to the account</p>}
                {error && <p className="text-red-500">{error}</p>}
              </label>
            </div>
            <div className="form-control mt-4">
              <input
                type="submit"
                className="btn bg-black text-white btn-outline"
                value="login"
              />
            </div>
            <div className="divider">Or Log in with</div>
          </form>

          <div className="mb-2 flex justify-center mx-8 -mt-6">
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline text-bold w-full mx-4"
            >
              <p className="px-2">
                <FaGoogle className="text-cyan-600 text-lg"></FaGoogle>
              </p>{" "}
              Login with Google
            </button>
          </div>

          <div className="flex justify-around mb-6 mx-8">
            <p>Need an account? </p>
            <p>
              {" "}
              <Link
                to="/signUp"
                className="font-semibold text-cyan-600 flex items-center"
              >
                Register <FaArrowRight className="mx-2"></FaArrowRight>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
