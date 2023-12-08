import React from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import { LuLogIn } from "react-icons/lu";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import image2 from "../utils/Saly-43Rocket.svg";

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Required"),
      email: Yup.string().required("Email"),
      password: Yup.string()
        .required("Required")
        .min(8, "Password is too short - should be 8 chars minimum."),
      confirmPassword: Yup.string().equals(
        [Yup.ref("password"), null],
        "Password doesnot match"
      ),
    }),
    onSubmit: () => {
      const userName = formik.values.userName;
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
            Sign up Here
          </Typography>
          <TextField
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            id="userName"
            label="Username*"
            margin="normal"
            onBlur={formik.handleBlur}
            value={formik.values.userName}
            onChange={formik.handleChange}
          />
          {formik.touched.userName && formik.errors.userName ? (
            <p className="text-red-500">{formik.errors.userName}</p>
          ) : null}
          <TextField
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            id="email"
            label="Email*"
            margin="normal"
            onBlur={formik.handleBlur}
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-500">{formik.errors.email}</p>
          ) : null}
          <TextField
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            id="password"
            margin="normal"
            type="password"
            label="Password*"
            onBlur={formik.handleBlur}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-500">{formik.errors.password}</p>
          ) : null}
          <TextField
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            id="confirmPassword"
            margin="normal"
            label="Confirm Password"
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <p className="text-red-500">{formik.errors.confirmPassword}</p>
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
            Already a user?{" "}
            <Link underline="none" href="/">
              Login Here
            </Link>
          </Typography>
        </form>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
