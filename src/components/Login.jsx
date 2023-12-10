import React, { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useHttpClient } from "../hooks/http-hook";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import Modal from "../UIElements/Modal";
import ErrorModal from "../UIElements/ErrorModal";

import { LuLogIn } from "react-icons/lu";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { NavLink } from "react-router-dom";

const Login = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [result, setResult] = useState("");

  const closeModalHandler = () => {
    setResult("");
  };

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
    onSubmit: (event) => {
      // event.preventDefault();
      const usernameOrEmail = formik.values.userNameOrEmail;
      const password = formik.values.password;
      // Make API Call
      const Login = async () => {
        try {
          const formData = new FormData();
          formData.append("usernameOrEmail", usernameOrEmail);
          formData.append("password", password);
          let response = await sendRequest(
            `http://localhost:3000/`,
            "POST",
            JSON.stringify({
              usernameOrEmail: usernameOrEmail,
              password: password,
            }),
            {
              "Content-Type": "application/json",
            }
          );
          setResult(response.message);
        } catch (err) {
          console.log(err);
        }
      };
      Login();
    },
  });

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      {error && <ErrorModal error={error} onClear={clearError} />}
      {result.length > 0 && (
        <Modal
          show={result.length > 0}
          onCancel={closeModalHandler}
          header={"Login Result"}
          footer={<Button onClick={closeModalHandler}>CLOSE</Button>}
        >
          <div>{result}</div>
        </Modal>
      )}
      <div className="flex flex-row justify-evenly">
        <form
          className="flex flex-col justify-evenly w-full max-w-[90%] mt-8"
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
            <NavLink
              style={{ color: "blue", textDecoration: "none" }}
              to="/signup"
            >
              Sign up Here
            </NavLink>
          </Typography>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
