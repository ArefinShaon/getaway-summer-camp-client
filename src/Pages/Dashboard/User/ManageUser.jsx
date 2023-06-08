import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import { useContext } from "react";
import {
    FaWallet
  } from "react-icons/fa";
const ManageUser = () => {
  const { user } = useContext(AuthContext);

  const { isLoading, isError, data, error, refetch } = useQuery(
    ["userQuery"],
    async () => {
      if (!user) {
        return [];
      }
      const response = await fetch(
        `http://localhost:5000/users?email=${user.email}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }
  );

  useEffect(() => {
    refetch();
  }, [user, refetch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="loading loading-spinner text-warning"></span>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bg-green-50">
      <h1 className="text-3xl font-bold text-center mt-4 mb-8">My Selected Class</h1>
      <table className="w-full border-collapse">
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
          {data.map((instructor) => (
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
              <button className="btn btn-square btn-outline bg-green-500">
                <FaWallet></FaWallet>
                </button>
              </td>
              <td className="px-4 py-2 text-center">
                <button className="btn btn-circle btn-outline bg-red-600">
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
