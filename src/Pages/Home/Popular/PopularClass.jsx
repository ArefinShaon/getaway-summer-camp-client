import { useEffect, useState } from "react";
import axios from "axios";
import { Zoom, Bounce } from "react-awesome-reveal";
const PopularClass = () => {
  const [popularClasses, setPopularClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch popular classes data
    axios
      .get("http://localhost:5000/class")
      .then((response) => {
        const sortedClasses = response.data.sort(
          (a, b) => b.students - a.students
        );
        const topClasses = sortedClasses.slice(0, 6);
        setPopularClasses(topClasses);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mt-12">
      <Bounce triggerOnce>
        <h2 className="text-center text-5xl my-10 font-bold hover:text-green-500 transition-colors">
          <span>Our</span> <br /> Popular Classes
              </h2>
              <div className="divider bg-slate-700 rounded w-96 mx-auto"></div>
      </Bounce>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <span className="loading loading-spinner text-warning"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:mx-20">
          {popularClasses.map((classItem, index) => (
            <Zoom key={classItem._id} triggerOnce delay={index * 100}>
              <div className="card glass h-[580px] ">
                <figure>
                  <img  src={classItem.image} alt={classItem.name} />
                </figure>
                <div className="card-body">
                  <div className="card-content">
                    <h2 className="card-title">{classItem.name}</h2>
                    <p>{classItem.description}</p>
                    <div className="divider bg-slate-700 rounded"></div>
                    <p className="text-center btn btn-success hover:bg-gray-400">
                      Students enrolled: {classItem.students}
                    </p>
                  </div>
                  <div className="card-actions justify-end">
                    <div className="btn btn-outline border-0 border-b-4 mt-4">
                      Enroll Now
                    </div>
                  </div>
                </div>
              </div>
            </Zoom>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularClass;
