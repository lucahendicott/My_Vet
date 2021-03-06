import React, { useState, useContext, useEffect } from "react";
import UserContext from "../Context/UserContext.js";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const LoginForm = () => {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();
  const [form, setForm] = useState({});
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitLoginForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/users/login", form);

      if (!data.user.confirmed) {
        toast.error(
          "Your account has not been verified, please check your email."
        );
      } else {
        setUserData({
          token: data.token,
          user: data.user,
        });

        localStorage.setItem("auth-token", data.token);
        history.push("/");
      }
    } catch (err) {
      console.log("err", err.response);
      toast.error(err.response.data.msg);
    }
  };

  useEffect(() => {
    if (userData.user) history.push("/");
  }, [userData.user, history]);

  return (
    <div className="col-md-6 log-reg-form">
      <form onSubmit={submitLoginForm}>
        <div className="form-group">
          <label>Email</label>
          <input
            onChange={onChange}
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            onChange={onChange}
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>

        <button className="login-btn rounded-pill" type="submit">
          Login
        </button>
        <button
          className="register-btn rounded-pill"
          style={{ margin: 20 }}
          onClick={() => history.push("/Register")}
        >
          Register
        </button>
      </form>
    </div>
  );
};
export default LoginForm;
