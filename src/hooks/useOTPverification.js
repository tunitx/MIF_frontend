import { useEffect, useState } from "react";
import axios from "axios";
import {
  Fast2SMS_OPT_API_ENDPOINT,
  Fast2SMS_OPT_API_KEY,
} from "../utils/constants";

function opt_generator() {
  return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
}

export const useOTPverification = ({ phoneNumber }) => {
  const [otpVerification, setOTPVerification] = useState({
    success: null,
    opt_sent: null,
  });

  useEffect(() => {
    const sendOTP = async () => {
      const opt_sent = opt_generator();

      try {
        const opt_message_request_url = `${Fast2SMS_OPT_API_ENDPOINT}?authorization=${Fast2SMS_OPT_API_KEY}&variables_values=${opt_sent}&route=otp&numbers=${phoneNumber}`;

        const sendingOTP = await axios.get(opt_message_request_url);

        setOTPVerification({
          success: true,
          opt_sent: opt_sent,
        });
      } catch (error) {
        setOTPVerification({
          success: false,
          opt_sent: opt_sent,
        });
      }
    };

    sendOTP();
  }, [phoneNumber]);

  return otpVerification;
};
