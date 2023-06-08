import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Authentication/Login/Login";
import Resister from "../Pages/Authentication/Resister/Resister";
import Dashboard from "../Layout/Dashboard";
import InstructorTable from "../Pages/InstructorTable/InstructorTable";
import ClassesTable from "../Pages/ClassesTable/ClassesTable";
import ManageUser from "../Pages/Dashboard/User/ManageUser";

  
export const router = createBrowserRouter([
    {
      path: "/",
        element: <Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
          },
          {
            path: 'login',
            element:<Login></Login>
          },
          {
            path: 'signup',
            element:<Resister></Resister>
          },
          {
            path: 'instructors',
            element:<InstructorTable></InstructorTable>
          },
          {
            path: 'classes',
            element:<ClassesTable></ClassesTable>
          }
      ]
  },
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>, 
    children: [
      {
        path: 'manageUser', 
        element: <ManageUser></ManageUser>
      }
    ]
  }
  ]);