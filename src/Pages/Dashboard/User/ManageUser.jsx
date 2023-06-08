import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import { useContext } from "react";
import { FaWallet } from "react-icons/fa";
import { Link } from "react-router-dom";

const ManageUser = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!user) {
          setUsers([]);
          setIsLoading(false);
          return;
        }

        const response = await fetch(
          `https://summer-camp-server-rho.vercel.app/users?email=${user.email}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://summer-camp-server-rho.vercel.app/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));

      // Show success notification
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "User deleted successfully.",
      });
    } catch (error) {
      setError(error);

      // Show error notification
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete user.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="loading loading-spinner text-warning"></span>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bg-green-50 overflow-x-auto">
      <h1 className="text-3xl font-bold text-center mt-4 mb-8">
        My Selected Class
      </h1>
      <table className="w-full border-collapse table text-center">
        <thead>
          <tr>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Class</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Payment Now</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((instructor) => (
            <tr key={instructor._id}>
              <td className="px-4 py-2">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-12 h-12 rounded-full block mx-auto"
                />
              </td>
              <td className="px-4 py-2 text-center">{instructor.name}</td>
              <td className="px-4 py-2 text-center">{instructor.email}</td>
              <td className="px-4 py-2 text-center">
                <Link to='/dashboard/pay' className="btn btn-square btn-outline bg-green-500">
                  <FaWallet />
                </Link>
              </td>
              <td className="px-4 py-2 text-center">
                <button
                  className="btn btn-circle btn-outline bg-red-600"
                  onClick={() => handleDelete(instructor._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUser;
