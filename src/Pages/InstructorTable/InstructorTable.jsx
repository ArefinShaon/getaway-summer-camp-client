import { useQuery } from "@tanstack/react-query";

const InstructorTable = () => {
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
    <div className="mt-24 overflow-x-auto w-full">
      <h1 className="text-3xl font-bold text-center m-4">THE INSTRUCTORS</h1>
      <table className="w-full table text-center">
        <thead>
          <tr className="text-xl font-bold">
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((instructor) => (
            <tr key={instructor._id}>
              <td className="mx-auto">
                <img
                  src={instructor.instructor_image}
                  alt={instructor.name}
                  className="w-12 h-12 rounded-full block mx-auto "
                />
              </td>
              <td className="">
                {instructor.instructor_name}
              </td>
              <td className="">
                {instructor.instructor_email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstructorTable;
