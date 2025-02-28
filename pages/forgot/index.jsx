import ApiClient from "@/api/apiClient";
import Inputbox from "@/components/common/Inputbox";
import { handleChange } from "@/components/helpers/change";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function Forgot() {
  const router = useRouter();
  const [allData, setAllData] = useState({});
  const [errors, setErrors] = useState({});
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [userId, setUserId] = useState("");

  const handleSubmit = async () => {
    let errors = {};

    if (!allData.mobile) {
      errors.mobile = "Mobile number is required";
    }

    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    try {
      const checkMobileResponse = await ApiClient.CheckMobile({
        mobile: allData.mobile,
        app_key: "@34@Y#456)D9)(JE4dsj36f$%#(jodiplay!com)8fe8345*&^ef8ef8"
      });

      if (checkMobileResponse.data.status === false) {
          const sendotp = await ApiClient.sendotp({mobile: allData.mobile, app_key: "@34@Y#456)D9)(JE4dsj36f$%#(jodiplay!com)8fe8345*&^ef8ef8"});
          if(sendotp.data.status === true) {
            // console.log(sendotp.data.user_id);
            setUserId(sendotp.data.user_id);
            toast.success(sendotp.data.msg);
            setIsOtpSent(true);
          } else {
            toast.error(sendotp.data.msg);
          }
      } else {
        toast.error(checkMobileResponse.data.msg || 'Mobile number not registered');
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || error?.message || 'An error occurred while sending OTP');
    }
  };

  const handleVerifyOTP = async () => {
    if (!allData.otp) {
      toast.error("OTP is required");
      return;
    }

    if (!allData.password) {
      toast.error("New Password is required");
      return;
    }

    try {
      const verifyOTPResponse = await ApiClient.VerifyOTPForgot({
        user_id: userId,
        otp: allData.otp,
        app_key: "@34@Y#456)D9)(JE4dsj36f$%#(jodiplay!com)8fe8345*&^ef8ef8"
      });

      if (verifyOTPResponse.data.msg === 'Otp Successfully Matched.') {
        const forgotpassword = await ApiClient.ForgotPassword({ mobile: allData.mobile, new_pass: allData.password});
        if (forgotpassword.data.status === true) {
          toast.success(forgotpassword.data.msg);
          router.push("/login");
        } else {
          toast.error(forgotpassword.data.msg);
        }
      } else {
        toast.error(verifyOTPResponse.data.msg || 'OTP verification failed');
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || error?.message || 'An error occurred during OTP verification');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-800 to-black text-white p-6">
  <div className="bg-gray-900 p-8 rounded-xl shadow-2xl max-w-md w-full relative">
    {/* Back Button */}
    <div onClick={router.back} className="absolute top-2 left-4 text-orange-500 cursor-pointer ">
      <svg xmlns="http://www.w3.org/2000/svg" height="30px" width="30px" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.5 4L6 12l8.5 8 1-1.5L9 12l4.5-6.5z" />
      </svg>
    </div>

    {/* Title */}
    <h2 className="text-3xl font-bold text-orange-500 mt-4 text-center mb-6">Forgot Password</h2>

    {/* Subtitle */}
    <div className="text-center text-gray-400 mb-6">Enter your details and reset your password</div>

    {/* Input Fields */}
    <div className="space-y-4">
      <Inputbox
        onChange={(val) => handleChange("mobile", val, allData, setAllData, errors)}
        value={allData.mobile}
        error={errors.mobile}
        type="number"
        label="📱 Mobile Number:"
        placeholder="Enter 10-digit phone number"
      />

      {isOtpSent && (
        <Inputbox
          onChange={(val) => handleChange("otp", val, allData, setAllData, errors)}
          value={allData.otp}
          error={errors.otp}
          label="🔢 OTP:"
          placeholder="Enter OTP"
        />
      )}

      {isOtpSent && (
        <Inputbox
          onChange={(val) => handleChange("password", val, allData, setAllData, errors)}
          value={allData.password}
          error={errors.password}
          type="password"
          label="🔒 New Password:"
          placeholder="Enter new password"
        />
      )}
    </div>

    {/* Action Button */}
    <button
      onClick={isOtpSent ? handleVerifyOTP : handleSubmit}
      className="bg-orange-500 hover:bg-orange-400 text-black font-bold py-2 px-4 w-full rounded-lg mt-6 shadow-md transition transform hover:scale-105"
    >
      {isOtpSent ? "Verify OTP" : " Submit"}
    </button>
  </div>
</div>
  );
}

export default Forgot;
