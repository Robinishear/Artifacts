import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";

import Login from "../All-Page/Login/Login";
import Register from "../All-Page/Register/Register";
import Home from "../All-Page/Home/Home";
import AllArtifacts from "../All-Page/All Artifacts/AllArtifacts";
import AddArtifacts from "../All-Page/Add Artifacts/AddArtifacts";
import Error from "../All-Page/Error/Error";
import Details from "../All-Page/All Artifacts/Details";
import MyArtifacts from "../All-Page/MyArtifacts/MyArtifacts";
import ComponentRoute from "../ComponentRoute/ComponentRoute";
import Products from '../All-Page/product/Product';


const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "allartifacts",
        element: <AllArtifacts />,
      },
      {
        path: "product",
        element: <Products />,
      },
      {
        path: "AddArtifacts",
        element: (
          <ComponentRoute>
            <AddArtifacts />
          </ComponentRoute>
        ),
      },
      {
        path: "AddArtifacts",
        element: (
          <ComponentRoute>
            <Addts />
          </ComponentRoute>
        ),
      },
      {
        path: "AddArtifacts",
        element: (
          <ComponentRoute>
            <tifacts />
          </ComponentRoute>
        ),
      },
      {
        path: "details/:id",
        element: (
          <ComponentRoute>
            <Details />
          </ComponentRoute>
        ),
      },
      {
        path: "myartifacts",
        element: (
          <ComponentRoute>
            <MyArtifacts />
          </ComponentRoute>
        ),
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
 
]);

export default Router;
