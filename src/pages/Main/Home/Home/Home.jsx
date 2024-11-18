import Banner from "../Banner/Banner";
import FeaturedCategories from "../FeaturedCategories/FeaturedCategories";
import HowItWorks from "../HowItWorks/HowItWorks";
import PopularServices from "../PopularServices/PopularServices";

const Home = () => {
    return (
        <div>
            <Banner heading="Find Your Service, Simplify Your Life" text="Book trusted service providers for all your needs"></Banner>
            <PopularServices></PopularServices>
            <HowItWorks></HowItWorks>
            <FeaturedCategories></FeaturedCategories>
        </div>
    );
};

export default Home;