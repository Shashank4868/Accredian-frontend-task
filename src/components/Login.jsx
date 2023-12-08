import React from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import { LuLogIn } from "react-icons/lu";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import image2 from "../utils/Saly-43Rocket.svg";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      userNameOrEmail: "",
      password: "",
    },
    validationSchema: Yup.object({
      userNameOrEmail: Yup.string().required("Required"),
      password: Yup.string()
        .required("Password is Required")
        .min(8, "Password is too short - should be 8 chars minimum."),
    }),
    onSubmit: () => {
      const userName = formik.values.userNameOrEmail;
      const password = formik.values.password;

      // Make API Call
    },
  });

  return (
    <React.Fragment>
      <div className="flex flex-row justify-evenly">
        <div className="w-[50%] m-0 left-0">
          {/* <img src={image1} alt="image1" className="absolute z-0" /> */}
          <img src={image2} alt="image2" className="absolute" />
        </div>
        <form
          className="flex flex-col w-[50%] mt-8"
          onSubmit={formik.handleSubmit}
        >
          <Typography
            variant="body1"
            fontSize={30}
            align="center"
            margin={2}
            color="blue"
            fontWeight="bold"
          >
            Login Here
          </Typography>
          <TextField
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            id="userNameOrEmail"
            label="Username or Email*"
            margin="normal"
            onBlur={formik.handleBlur}
            value={formik.values.userNameOrEmail}
            onChange={formik.handleChange}
          />
          {formik.touched.userNameOrEmail && formik.errors.userNameOrEmail ? (
            <p className="text-red-500">{formik.errors.userNameOrEmail}</p>
          ) : null}
          <TextField
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            id="password"
            margin="normal"
            label="Password*"
            type="password"
            onBlur={formik.handleBlur}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-500">{formik.errors.password}</p>
          ) : null}
          <Button
            size="large"
            type="submit"
            variant="contained"
            endIcon={<LuLogIn />}
            color="primary"
          >
            Login
          </Button>
          <Typography
            variant="subtitle1"
            margin={2}
            align="center"
            color="initial"
          >
            Don't have an account?{" "}
            <Link underline="none" href="/signup">
              Sign up Here
            </Link>
          </Typography>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
