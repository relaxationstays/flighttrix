import twilio from "twilio";
import readline from "readline";

// Set your credentials as environment variables for security
const accountSid =
  process.env.TWILIO_ACCOUNT_SID || "AC0c361869f7b851d6a200ba927726b0d3";
const authToken =
  process.env.TWILIO_AUTH_TOKEN || "728575b4c2f8a14aa041c431ac611487";
const verifySid =
  process.env.TWILIO_VERIFY_SID || "VAc6f689585997b4c1902a73f43d50d4f4";
const client = twilio(accountSid, authToken);

// Function to send OTP
async function sendOtp() {
  try {
    const verification = await client.verify.v2
      .services(verifySid)
      .verifications.create({ to: "+971563087636", channel: "sms" });
    console.log("Verification status:", verification.status);

    // Prompt user to enter OTP
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Please enter the OTP: ", async (otpCode) => {
      try {
        const verification_check = await client.verify.v2
          .services(verifySid)
          .verificationChecks.create({ to: "+971563087636", code: otpCode });
        console.log("Verification check status:", verification_check.status);
      } catch (error) {
        console.error("Error verifying OTP:", error);
      } finally {
        rl.close();
      }
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
}

// Send OTP
sendOtp();
