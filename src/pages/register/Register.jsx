import axios from "axios";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth } from "../../firebase_config";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const axiosFetch = useAxios();
  // register submit
  const submit = (data) => {
    const name = data.name;
    const email = data.email;
    const phone = data.phone;
    const country = data.country;
    const address = data.address;
    const password = data.password;
    const userData = { name, email, image, phone, country, address, password };

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        updateProfile(auth.currentUser, {
          displayName: data.name,
          photoURL: data.photo_url,
        })
          .then(() => {
            axiosFetch
              .post("/customers", userData)
              .then((res) => {
                console.log(res.data);
                if (res.data.message == "ok") {
                  Swal.fire({
                    icon: "success",
                    title: "Your Register has been Success",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  setTimeout(() => {
                    navigate("/login");
                  }, 2000);
                  reset();
                }
              })
              .catch((error) => {
                console.log(error.message);
                Swal.fire({
                  icon: "warning",
                  title: "Your Register Failed",
                  showConfirmButton: false,
                  timer: 1500,
                });
              });
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // handle image
  const handleFileChange = (event) => {
    console.log("ok");

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("upload_preset", "dealMart");
    formData.append("api_key", "941311292871449");

    axios
      .post("https://api.cloudinary.com/v1_1/dqsqzp3an/image/upload", formData)
      .then((response) => {
        if (response.data.asset_id) {
          setImage(response.data.secure_url);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen px-2">
      <div className="flex flex-col w-[430px]  rounded-md px-6 py-4 bg-[#ebe8e8]">
        <div className=" text-center">
          <h1 className=" text-4xl font-bold">Register</h1>
          <p className="text-sm dark:text-gray-600">Register your account</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(submit)}>
          <div className="space-y-2">
            {/* frist input row */}
            <div className="flex *:flex-1 gap-2">
              <div>
                <label className="block mb-2 text-sm">Name</label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  name="name"
                  placeholder="name"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                />
                {errors.name && (
                  <p className="text-red-500">Invalid Your Name</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm">Email</label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  name="email"
                  placeholder="email"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                />
                {errors.email && (
                  <p className="text-red-500">Invalid Your Email</p>
                )}
              </div>
            </div>
            {/* second input row */}
            <div className="flex *:flex-1 gap-2">
              <div>
                <label className="block mb-2 text-sm">Phone</label>
                <input
                  {...register("phone", { required: true })}
                  type="number"
                  name="phone"
                  placeholder="phone"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                />
                {errors.phone && (
                  <p className="text-red-500">Invalid Your Phone number</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm">Image</label>
                <input
                  onChange={handleFileChange}
                  type="file"
                  name="photo_url"
                  placeholder="photo_url"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                />
                {errors.number && (
                  <p className="text-red-500">Invalid Your Number</p>
                )}
              </div>
            </div>
            {/* third input row */}
            <div className="flex *:flex-1 gap-2">
              <div>
                <label className="block mb-2 text-sm">Password</label>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  name="password"
                  placeholder="*****"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                />
                {errors.password && (
                  <p className="text-red-500">Invalid Your password</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm">Country</label>
                <select
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                  name="country"
                  {...register("country", { required: true })}
                >
                  <option value="bangladesh">bangladesh</option>
                  <option value="pakistan">pakistan</option>
                  <option value="nepal">nepal</option>
                  <option value="srilanka">srilanka</option>
                  <option value="china">china</option>
                  <option value="USA">USA</option>
                  <option value="india">india</option>
                  <option value="UK">UK</option>
                </select>

                {errors.country && (
                  <p className="text-red-500">Invalid Your Country name</p>
                )}
              </div>
            </div>
            {/* four input row */}
            <div>
              <label className="block mb-2 text-sm">Address</label>
              <textarea
                {...register("address", { required: true })}
                type="text"
                name="address"
                placeholder="address"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 resize-none"
              />
              {errors.address && (
                <p className="text-red-500">Invalid Your address</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button
                // onClick={handleSubmit(submit)}
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md bg-darkBlue poppins hover:bg-black text-white duration-500"
              >
                Register
              </button>
            </div>
            <p className="px-6 text-sm text-center dark:text-gray-600">
              Don't have an account yet?
              <Link to="/login" className="poppins text-green">
                {" "}
                Login
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
