import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  return (
    <div className="flex justify-center items-center h-screen px-2">
      <div className="flex flex-col w-[480px]  rounded-md px-6 py-4 bg-[#ebe8e8]">
        <div className=" text-center">
          <h1 className=" text-4xl font-bold">Register</h1>
          <p className="text-sm dark:text-gray-600">Register your account</p>
        </div>
        <form className="space-y-6">
          <div className="space-y-2">
            <div>
              <label className="block mb-2 text-sm">Name</label>
              <input
                {...register("name", { required: true })}
                type="text"
                name="name"
                placeholder="name"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              />
              {errors.name && <p className="text-red-500">Invalid Your Name</p>}
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
            <div>
              <label className="block mb-2 text-sm">Number</label>
              <input
                {...register("number", { required: true})}
                type="number"
                name="number"
                placeholder="number"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              />
              {errors.number && (
                <p className="text-red-500">Invalid Your Number</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm">Password</label>
              <input
                {...register("password", { required: true})}
                type="password"
                name="password"
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              />
              {errors.password && (
                <p className="text-red-500">Invalid Your password</p>
              )}
            </div>
          
          </div>
          <div className="space-y-2">
            <div>
              <button
                // onClick={handleSubmit(submit)}
                type="button"
                className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50"
              >
                Register
              </button>
            </div>
            <p className="px-6 text-sm text-center dark:text-gray-600">
              Don't have an account yet?
              <Link to="/">Login</Link>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
