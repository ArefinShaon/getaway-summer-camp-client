import AboutUs from "../AboutUs/AboutUs";
import Banner from "../Banner/Banner";
import Gallery from "../Gallery/Gallery";
import Instructor from "../Instructor/Instructor";
import PopularClass from "../Popular/PopularClass";


const Home = () => {
    return (
        <div className="mt-20">
            <Banner></Banner>
            <PopularClass></PopularClass>
            <Instructor></Instructor>
            <Gallery></Gallery>
            <AboutUs></AboutUs>
        </div>
    );
};

export default Home;