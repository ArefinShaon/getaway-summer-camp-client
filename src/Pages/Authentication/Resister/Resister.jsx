import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import { useContext, useState } from "react";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (event) => {
    event.preventDefault();
    setSuccess(false);
    const form = event.target;
    // eslint-disable-next-line no-unused-vars
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    // Validate password
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters.");
      return;
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      setPasswordError("Please provide at least one uppercase letter");
      return;
    }
    if (!/(?=.*[!@#$&*])/.test(password)) {
      setPasswordError("Please add at least one special character");
      return;
    }
    setPasswordError("");

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess(true);
        swal("Good job!", "Successfully create an account", "success");
        form.reset();
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
        setPasswordError(error.message);
      });
  };

  return (
    <div className="flex justify-center text-black py-22">
      <div className="card w-full max-w-lg shadow-2xl bg-gray-200">
        <h1 className="font-bold text-4xl text-center pt-6">
          Create An Account
        </h1>
        <form onSubmit={handleSignUp} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black">Your Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="input input-bordered border-zinc-900 bg-white"
              required
            />
            <label className="label">
              <span className="label-text text-black">Your Photo</span>
            </label>
            <input
              name="photo"
              type="text"
              placeholder="Photo URL"
              className="input input-bordered border-zinc-900 bg-white"
              required
            />
            <label className="label">
              <span className="label-text text-black">Email Address</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered border-zinc-900 bg-white"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered border-zinc-900 bg-white"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black">Confirm Password</span>
            </label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered border-zinc-900 bg-white"
              required
            />
          </div>
          {passwordError && <p className="text-error">{passwordError}</p>}
          {success && (
            <div className="toast toast-end toast-middle">
              <div className="alert alert-success">
                <div>
                  <span>User created successfully.</span>
                </div>
              </div>
            </div>
          )}
          <div className="form-control mt-6">
            <input
              type="submit"
              className="btn bg-black text-white btn-outline"
              value="Sign Up"
            />
          </div>
        </form>
        <div className="flex justify-center mt-4 mb-4">
          <p>Already have an account?</p>
          <Link to="/login" className="text-cyan-600 font-semibold ml-2">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
