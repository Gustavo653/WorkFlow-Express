import http from "k6/http";

export const options = {
  stages: [
    { duration: "1m", target: 200 },
    { duration: "1m", target: 500 },
    { duration: "1m", target: 0 },
  ],
};

export default function () {
  const loginPayload = JSON.stringify({
    userName: "admin",
    password: "admin",
  });

  const loginParams = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const loginResponse = http.post(
    "http://localhost:5007/api/account/login",
    loginPayload,
    loginParams
  );

  if (loginResponse.status === 200) {
    console.log("Login successful");
  } else {
    console.log("Login failed");
  }
}
