import Homepage from "../Layout/Homepage/Homepage";
import CreateEvent from "../Pages/CreateEvent/CreateEvent";
import Edit from "../Pages/Edit/Edit";
import Events from "../Pages/Events/Events";
import EventDetails from "../Pages/EventView/EventDetails";
import EventView from "../Pages/EventView/EventView";
import AddGuest from "../Pages/GuestList/AddGuest";
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
    {
        exact:true,
        path: '/profile/edit',
        layout: Homepage,
        component:Edit
    },
    {
        exact:true,
        path: '/guest/new',
        layout: Homepage,
        component:AddGuest
    },
    {
        path: '/event/detail/:id',
        layout: Homepage,
        component:EventDetails
    },
]

export default routes;