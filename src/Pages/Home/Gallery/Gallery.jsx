import { Fade, Bounce } from "react-awesome-reveal";
import image1 from "../../../assets/construction-silhouette.jpg";
import image2 from "../../../assets/arrangement-professional-photographer-equipment.jpg";
import image3 from "../../../assets/DSCN4662.jpeg";
import image4 from "../../../assets/heart+over+lake.jpg";
import image5 from "../../../assets/man-with-camera-world-photographer-day.jpg";
import image6 from "../../../assets/silhouette-photographer-who-shoots-sunset-mountains.jpg";
import image7 from "../../../assets/young-female-product-photographer-studio.jpg";
import image8 from "../../../assets/zy4Uda.jpg";

const Gallery = () => {
  const images = [
    {
      src: image1,
      thin: true,
    },
    {
      src: image2,
      thin: false,
    },
    {
      src: image3,
      thin: true,
    },
    {
      src: image4,
      thin: false,
    },
    {
      src: image5,
      thin: true,
    },
    {
      src: image6,
      thin: false,
    },
    {
      src: image7,
      thin: true,
    },
    {
      src: image8,
      thin: false,
    },
    {
      src: image8,
      thin: false,
    },
  ];

  return (
    <div className="mt-2 lg:mb-12">
      <Fade triggerOnce>
        <Bounce triggerOnce>
          <h2 className="text-center text-4xl mt-10 font-bold hover:text-green-500 transition-colors">
            <span>OuR</span> <br /> GAlleRY
          </h2>
          <div className="divider bg-slate-700 rounded lg:w-96 mx-auto"></div>
        </Bounce>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 border box-border lg:mx-20 mt-4 bg-green-100 rounded-xl shadow-xl">
          {images.map((image, index) => (
            <div
              key={index}
              className={`overflow-hidden rounded-lg ${
                image.thin ? "col-span-1" : "col-span-2"
              }`}
            >
              <img
                src={image.src}
                alt=""
                className="w-full h-auto hover:scale-125 transition-transform duration-300 ease-in-out"
              />
            </div>
          ))}
        </div>
      </Fade>
    </div>
  );
};

export default Gallery;
