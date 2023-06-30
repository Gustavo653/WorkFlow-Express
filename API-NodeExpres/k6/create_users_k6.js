import http from "k6/http";

export const options = {
  stages: [
    { duration: "1m", target: 200 },
    { duration: "3m", target: 500 },
    { duration: "1m", target: 0 },
  ],
};

export default function () {
  const loginPayload = JSON.stringify({
    email: "admin@example.com",
    password: "admin123",
  });

  const loginParams = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const loginResponse = http.post(
    "http://localhost:3500/users/login",
    loginPayload,
    loginParams
  );

  if (loginResponse.status === 200) {
    console.log("Login successful");

    const createUserPayload = JSON.stringify({
      firstName: "John",
      lastName: "Doe",
      email: `user_${Math.floor(Math.random() * 100000)}@example.com`,
      password: "123",
      role: "agent",
    });

    const createUserParams = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginResponse.json("token")}`,
      },
    };

    const createUserResponse = http.post(
      "http://localhost:3500/users",
      createUserPayload,
      createUserParams
    );

    if (createUserResponse.status === 200) {
      console.log("User created successfully");
    } else {
      console.log("Failed to create user");
    }
  } else {
    console.log("Login failed");
  }
}
