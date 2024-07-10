import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { CreateEventPage } from "./pages/create-event";
import { EventDetailsPage } from "./pages/event-details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateEventPage/>,
  },
  {
    path: "/event/:eventId",
    element: <EventDetailsPage/>,
  },
]);

export function App() {
  return(
    <RouterProvider router={router} />
  )
}
