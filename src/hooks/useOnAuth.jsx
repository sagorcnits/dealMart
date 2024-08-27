import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../features/user/userSlice";
import { auth } from "../firebase_config";

const useOnAuth = () => {
  const dispatch = useDispatch();
  //   const [load, setLoad] = useState(true);
  useEffect(() => {
    const stateChange = onAuthStateChanged(auth, (user) => {
      dispatch(addUser(user));
      console.log(user);
    });

    return () => {
      stateChange();
    };
  }, []);
};

export default useOnAuth;
