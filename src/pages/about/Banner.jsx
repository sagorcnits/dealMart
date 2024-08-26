

const Banner = () => {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center *:flex-1 gap-10 max-w-7xl mx-auto px-2 ">
            <div>
              <h1 className="text-3xl font-semibold text-green py-6">Our Dream is Multination Busniess</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis adipisci, quos id dolorum nisi quasi quis consequatur</p>
          </div>
          <div className="flex justify-end rounded-md overflow-hidden">
              <img className="w-full" src="https://img.freepik.com/free-photo/portrait-happy-male-female-businesspeople-looking-camera_23-2147826613.jpg?t=st=1724640569~exp=1724644169~hmac=d3ae5e5c44035af96878451ad77b82c1838d79424c1daddbc42fbc539fc05db0&w=740" alt="banner_img" />
          </div>
        </div>
    );
};

export default Banner;