import img from "../../../assets/man-with-camera-world-photographer-day.jpg";

const AboutUs = () => {
  return (
    <div>
      <div className="hero min-h-screen bg-green-50">
        <div className="hero-content flex-col-reverse lg:flex-row-reverse">
          <img
            src={img}
            className="w-5/6 h-4/6 lg:w-1/2 rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold p-8">About Us</h1>
            <p className="px-8 text-xl font-bold">
              Getaway provide you the best summer-camp courses.
            </p>
            <p className="px-8 py-2 text-xl">
              Welcome to our Photography Summer Camp! We are passionate about
              inspiring young photographers and helping them explore their
              creative potential.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
