import { useForm } from "react-hook-form";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      middleName: "",
      lastName: "",
      contactNo: "",
    },
  });
  const onSubmit = async (data) => {
    const apiResponse = await axios({
      method: "post",
      url: "user/register",
      data,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((res) => {
        alert(res.data.message);
        navigate("/");
        return res;
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };
  return (
    <div className="Register">
      <div className="main-container">
        <h3>Register</h3>
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

            <div>
              <div className="form-group">
                <label>First name:</label>
                <input
                  type="firstName"
                  {...register("firstName", { required: true })}
                />
              </div>
              {errors.firstName && (
                <span className="errors">This field is required</span>
              )}
            </div>

            <div>
              <div className="form-group">
                <label>Middle name:</label>
                <input
                  type="middleName"
                  {...register("middleName", { required: true })}
                />
              </div>
              {errors.middleName && (
                <span className="errors">This field is required</span>
              )}
            </div>

            <div>
              <div className="form-group">
                <label>Last name:</label>
                <input
                  type="lastName"
                  {...register("lastName", { required: true })}
                />
              </div>
              {errors.lastName && (
                <span className="errors">This field is required</span>
              )}
            </div>

            <div>
              <div className="form-group">
                <label>Contact no:</label>
                <input
                  type="contactNo"
                  {...register("contactNo", { required: true })}
                />
              </div>
              {errors.contactNo && (
                <span className="errors">This field is required</span>
              )}
            </div>

            <div className="submit-container">
              <button type="submit">Register</button>
            </div>
            <div className="login-container">
              <a href="/">
                <small>Back to Login</small>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
