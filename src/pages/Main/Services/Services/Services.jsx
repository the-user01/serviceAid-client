import useCustomer from "../../../../hooks/useCustomer";
import Banner from "../../Home/Banner/Banner";
import ServiceCategories from "../ServiceCategories/ServiceCategories";
import ServiceProviderSec from "../ServiceProviderSec/ServiceProviderSec";

const Services = () => {

    const [isCustomer] = useCustomer();

    return (
        <div>
            <Banner heading="Discover Our Services" text="Find the perfect service for your needs"></Banner>
            
            <ServiceCategories></ServiceCategories>

            {
                isCustomer &&
                <ServiceProviderSec></ServiceProviderSec>
            }
            
        </div>
    );
};

export default Services;