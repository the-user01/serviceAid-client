import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Main/Home/Home/Home";
import Services from "../pages/Main/Services/Services/Services";
import About from "../pages/Main/About/About/About";
import Contact from "../pages/Main/Contact/Contact/Contact";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ErrorPage from "../shared/ErrorPage";
import Dashboard from "../layout/Dashboard";
import AdminHome from "../pages/Dashboard/Admin/AdminHome/AdminHome";
import AllUsers from "../pages/Dashboard/Admin/AllUsers/AllUsers";
import ServicesList from "../pages/Dashboard/Admin/ServicesList/ServicesList";
import BookingsList from "../pages/Dashboard/Admin/BookingsList/BookingsList";
import CustomerHome from "../pages/Dashboard/Customer/CustomerHome/CustomerHome";
import CustomerBookings from "../pages/Dashboard/Customer/CustomerBookings/CustomerBookings";
import CustomerHistory from "../pages/Dashboard/Customer/CustomerHistory/CustomerHistory";
import ServiceProviderHome from "../pages/Dashboard/ServiceProvider/ServiceProviderHome/ServiceProviderHome";
import ServiceProviderServices from "../pages/Dashboard/ServiceProvider/ServiceProviderServices/ServiceProviderServices";
import ServiceDetails from "../pages/Main/Services/AvailableServices/ServiceDetails";
import UserMessages from "../pages/Dashboard/Admin/UserMessages/UserMessages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/services",
                element: <Services></Services>,
            },
            {
                path: "/about",
                element: <About></About>,
            },
            {
                path: "/contact",
                element: <Contact></Contact>,
            },
            {
                path: "/details/:id",
                element: <ServiceDetails></ServiceDetails>
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
        ]
    },

    //Dashboard routes
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            // Admin Dashboard

            {
                path: "admin-home",
                element: <AdminHome></AdminHome>
            },
            {
                path: "all-users",
                element: <AllUsers></AllUsers>
            },
            {
                path: "all-services",
                element: <ServicesList></ServicesList>
            },
            {
                path: "bookings",
                element: <BookingsList></BookingsList>
            },
            {
                path: "user-messages",
                element: <UserMessages></UserMessages>
            },


            // Customer Dashboard

            {
                path: "customer-home",
                element: <CustomerHome></CustomerHome>
            },

            {
                path: "customer-booking",
                element: <CustomerBookings></CustomerBookings>
            },
            {
                path: "customer-history",
                element: <CustomerHistory></CustomerHistory>
            },


            // Service provider Dashboard

            {
                path: "provider-home",
                element: <ServiceProviderHome></ServiceProviderHome>
            },
            {
                path: "provider-services",
                element: <ServiceProviderServices></ServiceProviderServices>
            },
        ]
    }

]);

export default router;