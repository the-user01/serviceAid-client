import { Outlet, ScrollRestoration } from "react-router-dom";
import Heading from "../shared/Heading/Heading";
import Footer from "../shared/Footer/Footer";

const Root = () => {
    return (
        <div className="bg-slate-50">
            <Heading></Heading>

            <div className="mx-full bg-white rounded-lg">
                <Outlet></Outlet>
            </div>
            
            <Footer></Footer>

            <ScrollRestoration></ScrollRestoration>
        </div>
    );
};

export default Root;