import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

const ClassesTable = () => {
  const { isLoading, isError, data, error } = useQuery([""], async () => {
    const response = await fetch("http://localhost:5000/class");
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
          `http://localhost:5000/users?email=${user.email}&selected=true`
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
          const response = await fetch("http://localhost:5000/users", {
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
    <div className="m-8 mt-24 overflow-x-auto ">
      <h1 className="text-3xl font-bold text-center m-4">CAMP - CLASSES</h1>
      <table className="w-full table text-center border-collapse ">
        <thead>
          <tr className="text-xl font-bold">
            <th>Image</th>
            <th>Name</th>
            <th>Instructor</th>
            <th>Available Seats</th>
            <th>Price</th>
            <th>Add</th>
          </tr>
        </thead>
        <tbody>
          {data.map((instructor) => (
            <tr key={instructor._id}>
              <td >
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-12 h-12 rounded-full mx-auto"
                />
              </td>
              <td >{instructor.name}</td>
              <td >
                {instructor.instructor_name}
              </td>
              <td>
                {instructor.availableSeats}
              </td>
              <td>{instructor.price}$</td>
              <td>
                {selectedClasses.includes(instructor._id) ? (
                  <button className="btn btn-disabled">Selected</button>
                ) : (
                  <button
                    className="btn btn-ghost"
                    onClick={() => handleSelect(instructor._id, instructor)}
                    disabled={instructor.availableSeats === 0}
                  >
                    {instructor.availableSeats === 0 ? "Sold Out" : "Select"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassesTable;
