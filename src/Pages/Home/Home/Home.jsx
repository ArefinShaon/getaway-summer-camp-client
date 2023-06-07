import Banner from "../Banner/Banner";
import Instructor from "../Instructor/Instructor";
import PopularClass from "../Popular/PopularClass";


const Home = () => {
    return (
        <div className="mt-20">
            <Banner></Banner>
            <PopularClass></PopularClass>
            <Instructor></Instructor>
        </div>
    );
};

export default Home;