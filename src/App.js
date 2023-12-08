import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Card from "@mui/material/Card";
import Login from "./components/Login";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SignUp from "./components/Signup";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    loader: () => import("./UIElements/LoadingSpinner"),
  },
  {
    path: "/signup",
    element: <SignUp />,
    loader: () => import("./UIElements/LoadingSpinner"),
  },
]);

const App = () => {
  return (
    <Container maxWidth="md">
      <Card elevation={3} className="mt-8 p-8 mb-8">
        <Typography
          variant="body1"
          fontSize={24}
          fontWeight="bold"
          color="blue"
        >
          accredian
        </Typography>
        <RouterProvider router={router} />
        {/* <SignUp /> */}
      </Card>
    </Container>
  );
};

export default App;
