import "./ProductForm.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext";

function ProductForm() {
  const authCtx = useContext(AuthContext);

  const [selectedFile, setSelectedFile] = useState(undefined);
  const [preview, setPreview] = useState(undefined);

  const navigate = useNavigate();

  let { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      size: "",
      price: "",
      file: undefined,
    },
  });

  useEffect(() => {
    if (id !== undefined) {
      axios.get(`/products/${id}`).then((res) => {
        setValue("name", res.data.name);
        setValue("description", res.data.description);
        setValue("size", res.data.size);
        setValue("price", res.data.price);
        setValue("is_available", res.data.is_available ? 1 : 0);
        setPreview(`http://localhost/php-rest-api-git/${res.data.image}`);
      });
    }
  }, []);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    const url = reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const onSubmit = async (data) => {
    if (id === undefined) {
      //create new product
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("size", data.size);
      formData.append("price", data.price);
      formData.append("file", selectedFile);
      formData.append("is_available", data.is_available);

      axios
        .post("/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authCtx.accessToken}`,
          },
        })
        .then((res) => {
          if (res) {
            alert("Product successfully saved.");
            navigate("/main/products");
          }
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    } else {
      //update existing product
      axios
        .patch(`/products/${id}`, data, {
          headers: {
            Authorization: `Bearer ${authCtx.accessToken}`,
          },
        })
        .then((res) => {
          if (res) {
            alert("Product successfully updated.");
            navigate("/main/products");
          }
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  };
  return (
    <div className="ProductForm">
      <h1>Product Form</h1>
      <div className="content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-container">
            <div className="form-group">
              <label>Name:</label>
              <input type="text" {...register("name", { required: true })} />
            </div>
            {errors.name && (
              <span className="errors">This field is required</span>
            )}
            <div className="form-group">
              <label>Description:</label>
              <textarea
                rows={10}
                {...register("description", { required: true })}
              />
            </div>
            {errors.description && (
              <span className="errors">This field is required</span>
            )}
            <div className="form-group">
              <label>Size:</label>
              <input
                type="number"
                {...register("size", {
                  required: true,
                  valueAsNumber: true,
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Please enter a number",
                  },
                })}
              />
            </div>
            {errors.size && errors.size.type === "required" && (
              <span className="errors">This field is required</span>
            )}
            {errors.size && errors.size.type === "valueAsNumber" && (
              <span className="errors">This field accepts numbers only</span>
            )}
            <div className="form-group">
              <label>Price:</label>
              <input
                type="number"
                {...register("price", {
                  required: true,
                  valueAsNumber: true,
                  pattern: {
                    value: /^[0-9]+$/,
                  },
                })}
              />
            </div>
            {errors.price && errors.price.type === "required" && (
              <span className="errors">This field is required</span>
            )}
            {errors.price && errors.price.type === "valueAsNumber" && (
              <span className="errors">This field accepts numbers only</span>
            )}
            <div className="form-group">
              <label>Availability:</label>
              <select {...register("is_available")}>
                <option value="0">Unavailable</option>
                <option value="1">Available</option>
              </select>
            </div>
            {!id ? (
              <input
                type="file"
                {...register("file")}
                onChange={handleFileSelect}
              />
            ) : null}
            {(selectedFile || preview) && (
              <img className="product-preview" src={preview} />
            )}

            <div className="submit-container">
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ProductForm;
