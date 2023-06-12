import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

const ClassesTable = () => {
  const { isLoading, isError, data, error } = useQuery([""], async () => {
    const response = await fetch("https://summer-camp-server-rho.vercel.app/class");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });

  const { user } = useContext(AuthContext); 
  const [selectedClasses, setSelectedClasses] = useState([]);
  const navigate = useNavigate();

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

  const handleSelect = async (classId, classData) => {
    if (!user) {
      Swal.fire({
        title: "Please log in",
        text: "You need to log in before selecting the course.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Log In",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to login page
          navigate("/login");
        }
      });
      return;
    }
  
    const alreadySelected = selectedClasses.includes(classId);
    if (!alreadySelected) {
      try {
        const payload = {
          email: user.email,
          selected: true,
          userId: classData._id,
          image: classData.image,
          name: classData.name,
          price: classData.price,
          availableSeats: classData.availableSeats,
        };
  
        // Check if the class is already selected for the current user
        const response = await fetch(
          `https://summer-camp-server-rho.vercel.app/users?email=${user.email}&selected=true`
        );
        const existingSelections = await response.json();
  
        const alreadySelectedClass = existingSelections.find(
          (selection) => selection.userId === classData._id
        );
  
        if (alreadySelectedClass) {
          // Class is already selected for the current user, display a toast message
          Swal.fire({
            title: "Already Selected",
            text: "You have already selected this class.",
            icon: "info",
          });
        } else {
          // Send the selected class to the backend
          const response = await fetch("https://summer-camp-server-rho.vercel.app/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
  
          if (!response.ok) {
            throw new Error(
              "Failed to send the selected class to the backend."
            );
          }
  
          setSelectedClasses((prevSelectedClasses) => [
            ...prevSelectedClasses,
            classId,
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      // Class is already selected, display a toast message
      Swal.fire({
        title: "Already Selected",
        text: "You have already selected this class.",
        icon: "info",
      });
    }
  };

  return (
    <div className="m-8 mt-24 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <h1 className="text-3xl font-bold text-center m-4 col-span-full">CAMP - CLASSES</h1>
      {data.map((instructor) => (
        <div key={instructor._id} className="bg-pink-200 p-4 rounded shadow">
          <img
            src={instructor.image}
            alt={instructor.name}
            className="w-12 h-12 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-bold text-center">Class Name:{instructor.name}</h2>
          <p className="text-center">Instructor Name:{instructor.instructor_name}</p>
          <p className="text-center">Available Seats: {instructor.availableSeats}</p>
          <p className="text-center">Price: {instructor.price}$</p>
          <div className="flex justify-center">
            {selectedClasses.includes(instructor._id) ? (
              <button className="btn btn-disabled">Selected</button>
            ) : (
              <button
                className="btn btn-secondary"
                onClick={() => handleSelect(instructor._id, instructor)}
                disabled={instructor.availableSeats === 0}
              >
                {instructor.availableSeats === 0 ? "Sold Out" : "Select"}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClassesTable;
