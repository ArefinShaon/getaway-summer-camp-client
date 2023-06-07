import { useQuery } from "@tanstack/react-query";

const ClassesTable = () => {
  const { isLoading, isError, data, error } = useQuery([""], async () => {
    const response = await fetch("http://localhost:5000/class");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });

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
    <div className="instructors-page mt-24">
      <h1 className="text-3xl font-bold text-center m-4">CAMP - CLASSES</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Instructor</th>
            <th className="px-4 py-2">Available Seats</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Add</th>
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
              <td className="px-4 py-2 text-center">
                {instructor.name}
              </td>
              <td className="px-4 py-2 text-center">
                {instructor.instructor_name}
              </td>
              <td className="px-4 py-2 text-center">
                {instructor.availableSeats}
              </td>
              <td className="px-4 py-2 text-center">
                {instructor.price}$
              </td>
              <td className="px-4 py-2 text-center">
              <button className="btn btn-ghost">Add Course</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassesTable;
