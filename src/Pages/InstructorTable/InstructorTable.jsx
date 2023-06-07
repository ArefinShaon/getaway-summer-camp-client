

const InstructorTable = () => {
  return (
    <div className="instructors-page">
      <h1 className="text-3xl font-bold mb-4">Instructors</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {/* {instructors.map((instructor) => (
            <tr key={instructor.id}>
              <td className="px-4 py-2">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <td className="px-4 py-2">{instructor.name}</td>
              <td className="px-4 py-2">{instructor.email}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default InstructorTable;
