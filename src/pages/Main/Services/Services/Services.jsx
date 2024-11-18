import Banner from "../../Home/Banner/Banner";
import ServiceCategories from "../ServiceCategories/ServiceCategories";
import ServiceProviderSec from "../ServiceProviderSec/ServiceProviderSec";

const Services = () => {
    return (
        <div>
            <Banner heading="Discover Our Services" text="Find the perfect service for your needs"></Banner>
            <ServiceCategories></ServiceCategories>
            <ServiceProviderSec></ServiceProviderSec>
        </div>
    );
};

export default Services;