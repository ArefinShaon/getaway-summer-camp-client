import { useEffect, useState } from "react";
import axios from "axios";
import { Zoom, Bounce } from "react-awesome-reveal";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Instructor = () => {
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

  // Configuration for the carousel
  const carouselConfig = {
    responsive: {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 1,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 1,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1,
      },
    },
    draggable: true,
    swipeable: true,
    arrows: true,
    infinite: true,
    autoPlay: true,
    autoPlaySpeed: 3000,
  };

  return (
    <div className="mt-12">
      <Bounce triggerOnce>
        <h2 className="text-center text-4xl mt-10 font-bold hover:text-green-500 transition-colors">
          <span>OUR</span> <br /> Best Instructors
        </h2>
        <div className="divider bg-slate-700 rounded lg:w-96 mx-auto"></div>
      </Bounce>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <span className="loading loading-spinner text-warning"></span>
        </div>
      ) : (
        <Carousel {...carouselConfig}>
          {popularClasses.map((classItem, index) => (
            <Zoom key={classItem._id} triggerOnce delay={index * 100}>
              <div className="instructor-item p-2">
                <img
                  src={classItem.instructor_image}
                  alt={classItem.name}
                  className="instructor-image rounded"
                />
                <div className="instructor-details mt-4">
                  <h2 className="instructor-name text-center text-green-500 font-bold">Instructor No: {index + 1}. {classItem.instructor_name}</h2>
                  
                </div>
              </div>
            </Zoom>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Instructor;
