import Homepage from "../Layout/Homepage/Homepage";
import CreateEvent from "../Pages/CreateEvent/CreateEvent";
import Events from "../Pages/Events/Events";
import EventView from "../Pages/EventView/EventView";
import GuestList from "../Pages/GuestList/GuestList";
import Home from "../Pages/Home/Home";

const routes = [
    {
        exact:true,
        path: '/home',
        layout: Homepage,
        component:Home
    },
    {
        exact:true,
        path: '/events',
        layout: Homepage,
        component:Events
    },
    {
        exact:true,
        path: '/guests',
        layout: Homepage,
        component:GuestList
    },
    {
        exact:true,
        path: '/event/create',
        layout: Homepage,
        component:CreateEvent
    },
    {
        exact:true,
        path: '/event/:id',
        layout: Homepage,
        component:EventView
    },
]

export default routes;