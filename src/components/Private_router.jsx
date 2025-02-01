import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRouter = ({ children }) => {
    const user = useSelector((state) => state.user.user)

    if (!user) {
      return  <div className='h-screen flex justify-center items-center'>
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
        </div>
    }

    if (user?.role == 'admin') {
        return children
    }
    return <Navigate to="/login"></Navigate>

};

export default PrivateRouter;