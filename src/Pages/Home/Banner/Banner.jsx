import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../../../assets/DSCN4662.jpeg";
import img2 from "../../../assets/heart+over+lake.jpg";
import img3 from "../../../assets/zy4Uda.jpg";

const Banner = () => {
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      autoPlay
      infiniteLoop
      interval={3000}
      className="carousel bg-gray-100 relative"
    >
      <div className="relative flex justify-center items-center">
        <img
          src={img1}
          alt="Carousel Image 1"
          className="object-cover w-full h-[460px] md:h-[600px]"
        />
        <div className="absolute top-4 right-4 p-2 bg-green-500 text-white text-sm font-semibold rounded">
          <span className="block">25% off</span>
          <span className="block">Available</span>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h3 className="text-3xl font-bold">
            <span className="font-serif text-cyan-700">
              Learn the basics of{" "}
            </span>
            <span className="font-mono font-bold text-3xl text-yellow-500">
              photography
            </span>
          </h3>
          <p className="text-lg">Make Your Summer Camp With GetAway</p>
          <div className="mt-24">
            <p className="btn btn-success">Enroll Now!</p>
          </div>
        </div>
      </div>
      <div className="relative flex justify-center items-center">
        <img
          src={img2}
          alt="Carousel Image 2"
          className="object-cover w-full h-[460px] md:h-[600px]"
        />
        <div className="absolute top-4 right-4 p-2 bg-green-500 text-white text-sm font-semibold rounded">
          <span className="block">25% off</span>
          <span className="block">Available</span>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h3 className="text-3xl font-bold">Discover the beauty of nature</h3>
          <p className="text-lg text-yellow-50">
            Learn how to capture stunning landscape photographs.
          </p>
          <div className="mt-24">
            <p className="btn btn-success">Enroll Now!</p>
          </div>
        </div>
      </div>
      <div className="relative flex justify-center items-center">
        <img
          src={img3}
          alt="Carousel Image 3"
          className="object-cover w-full h-[460px] md:h-[600px]"
        />
        <div className="absolute top-4 right-4 p-2 bg-black text-white text-sm font-semibold rounded">
          <span className="block">25% off</span>
          <span className="block">Available</span>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h3 className="text-3xl font-bold">Explore composition</h3>
          <p className="text-lg text-yellow-400">
            Create dynamic and visually appealing sports photography
          </p>
          <div className="mt-24">
            <p className="btn btn-success">Enroll Now!</p>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
