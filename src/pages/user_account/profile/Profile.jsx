import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
   const [loading,setLoading] = useState(true);
  const axiosFetch = useAxios();
  const user = useSelector((state) => state.user.user);
  // data fetch user er
  useEffect(() => {
    console.log("ok")

    if(user?.email){
      axiosFetch
        .get(`/customers/${user?.email}`)
        .then((res) => {
          setProfile(res.data);
          // console.log(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };
// handle submit 
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const updateUser = {
      name: form.name.value,
      email: form.email.value,
      country: form.country.value,
      phone: form.phone.value,
      address: form.address.value,
    };

    // update data
   if(user?.email){
    axiosFetch
    .put(`/customers/${user?.email}`, updateUser)
    .then((res) => {
      if(res.data.message == "ok"){
        Swal.fire({
          icon: "success",
          title: "Your Profile Updated",
          showConfirmButton: false,
          timer: 1500,
        });
      };
    })
    .catch((err) => {
      console.log(err.message);
      Swal.fire({
        icon: "warning",
        title: "Your Profile Not Updated",
        showConfirmButton: false,
        timer: 1500,
      });
    });
   }

    setIsEditing(false);
  };
// handle edit
  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
    console.log("Updated profile:", profile);
  };

  // loading profile
  if(loading){
    return (
      <div className="text-center">Loading...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-2xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6">your Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center mb-6">
            <img
              src={profile?.image}
              alt={profile?.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={profile?.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-gray-100 p-2 border focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={profile?.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="p-2 border focus:outline-none mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-gray-100"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <input
                id="country"
                name="country"
                type="text"
                value={profile?.country}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="p-2 border focus:outline-none mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-gray-100"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={profile?.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="p-2 border focus:outline-none mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-gray-100"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={profile?.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="p-2 border focus:outline-none mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-gray-100"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            {isEditing ? (
              <>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
