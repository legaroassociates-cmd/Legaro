import { onRequestPost as __send_booking_confirmation_js_onRequestPost } from "E:\\freelancing\\Legaro2\\functions\\send-booking-confirmation.js"
import { onRequestPost as __send_otp_js_onRequestPost } from "E:\\freelancing\\Legaro2\\functions\\send-otp.js"

export const routes = [
    {
      routePath: "/send-booking-confirmation",
      mountPath: "/",
      method: "POST",
      middlewares: [],
      modules: [__send_booking_confirmation_js_onRequestPost],
    },
  {
      routePath: "/send-otp",
      mountPath: "/",
      method: "POST",
      middlewares: [],
      modules: [__send_otp_js_onRequestPost],
    },
  ]