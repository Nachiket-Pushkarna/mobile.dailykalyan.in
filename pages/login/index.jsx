import ApiClient from "@/api/apiClient";
import Loader from "@/components/Loader";
import Inputbox from "@/components/common/Inputbox";
import { handleChange } from "@/components/helpers/change";
import { getSetData } from "@/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch } from 'react-redux';
import { setUserId } from '@/redux/slice';

function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [allData, setAllData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const forgotclick = () => {
    router.push('/forgot');
  };

  const handleSubmit = () => {
    let errors = {};

    if (!allData.mobile) {
      errors.mobile = "Mobile number is required";
    }
    if (!allData.password) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    let payload = {
      mobile: allData.mobile,
      password: allData.password,
    };

    setLoading(true);

    ApiClient.userLogin(payload)
      .then((response) => {
        setLoading(false);
        getSetData("token", response.data.token);
        getSetData("userData", response?.data, true);
        dispatch(setUserId(response.data.user_id)); 
        toast.success("Login Successfully");

        // window.location = "";
        router.push('/?welcomesound=true');
      })
      .catch((error) => {
        toast.error("Invalid Details");
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-[100dvh] bg-gray-900 px-4">
      <div className="w-full max-w-lg bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        {/* Header with Back Button */}
        <div className="relative flex items-center justify-center p-4 border-b border-gray-700">
          <div className="absolute left-2 text-orange-500 cursor-pointer" onClick={router.back}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.5 4L6 12l8.5 8 1-1.5L9 12l4.5-6.5z"/>
            </svg>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-orange-500">Login</h3>
            <p className="text-xs text-gray-400">Welcome Back</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-6">
          <div className="space-y-4">
            <Inputbox
              onChange={(val) => handleChange("mobile", val, allData, setAllData, errors)}
              value={allData.mobile}
              error={errors.mobile}
              type="number"
              label="Mobile Number"
              placeholder="Enter 10 Digit Phone Number"
              labelClassName="text-orange-300"
            />
            
            <div className="relative">
              <Inputbox
                onChange={(val) => handleChange("password", val, allData, setAllData, errors)}
                value={allData.password}
                error={errors.password}
                label="Password"
                placeholder="Enter Password"
                type={showPassword ? "text" : "password"}
                labelClassName="text-orange-300"
              />
              <div
                className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
              </div>
            </div>

            <p
              className="text-sm text-gray-400 cursor-pointer hover:text-orange-500 text-right"
              onClick={forgotclick}
            >
              Forgot Password?
            </p>

            {/* Action Buttons */}
            <div className="space-y-4 pt-2">
              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
              >
                Login
              </button>
              
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">Don't have an account?</p>
                <button
                  onClick={() => router.push("/signup")}
                  className="w-full py-3 bg-transparent border border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-500 hover:text-white focus:outline-none transition"
                >
                  Create New Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {loading && <Loader />}
    </div>
  );
}

export default Login;
