import { useForm } from "react-hook-form";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    await axios({
      method: "post",
      url: "user/login",
      data,
      headers: { "Access-Control-Allow-Origin": "*" },
    })
      .then((res) => {
        localStorage.setItem("accessToken", res.data.access_token);
        navigate("/main/dashboard");
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };
  return (
    <div className="Login">
      <div className="main-container">
        <h3>Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-container">
            <div>
              <div className="form-group">
                <label>E-mail:</label>
                <input type="text" {...register("email", { required: true })} />
              </div>
              {errors.email && (
                <span className="errors">This field is required</span>
              )}
            </div>
            <div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                />
              </div>
              {errors.password && (
                <span className="errors">This field is required</span>
              )}
            </div>
            <div className="submit-container">
              <button type="submit">Login</button>
            </div>
            <div className="register-container">
              <a href="/register">
                <small>Register</small>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
