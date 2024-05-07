import { Button, TextField } from "@mui/material";
import Password from "antd/es/input/Password";
import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [admin, setAdmin] = useState({ username: "", password: "" });
  const [country, setCountry, users, setAdminId, setLocalStorageId] = useOutletContext();
  const foundAdmin = users.find(
    (x) =>
      x.username === admin.username &&
      x.password === admin.password &&
      x.role === "admin"
  );

  const handleLogin = (e) => {
    e.preventDefault();

    if (foundAdmin) {
      console.log(foundAdmin);
      setAdminId(foundAdmin.id);
      setLocalStorageId(foundAdmin.id);
      toast.success("You are logged in");
      navigate("/admin");
    } else {
      toast.error("Username or password is incorrect");
      setAdmin({ username: "", password: "" });
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <form
        onSubmit={(e) => handleLogin(e)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          marginTop: "200px",
        }}
      >
        <TextField
          value={admin.username}
          onChange={(e) => setAdmin({ ...admin, username: e.target.value })}
          type="text"
          label="Admin Username"
          variant="outlined"
        />
        <TextField
          value={admin.password}
          onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
          type="password"
          label="Admin Password"
          variant="outlined"
        />
        <Button variant="contained" type="submit">
          Sign In
        </Button>
      </form>
      <ToastContainer />
    </>
  );
};

export default Login;
