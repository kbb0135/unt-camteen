import React from 'react'

export default function OTPVerification() {
  return (
    <div>
        <form>
        <label htmlFor="itemName">Enter OTP Code for Authentication:</label>
                <input type="text" id="otp" className="otp" />
                <input type="submit" value="Submit" alt=" " />
        </form>
    </div>
  )
}
