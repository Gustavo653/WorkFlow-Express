import http from "k6/http";

export const options = {
  stages: [
    { duration: "1m", target: 5 },
    { duration: "1m", target: 10 },
    { duration: "1m", target: 15 },
    { duration: "1m", target: 30 },
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
      type: "dislike",
    });

    const createUserParams = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginResponse.json("token")}`,
      },
    };

    const createUserResponse = http.post(
      "http://localhost:3500/posts/85/reactions",
      createUserPayload,
      createUserParams
    );

    if (createUserResponse.status === 201) {
      console.log("Reaction created successfully");
    } else {
      console.log("Failed to create reaction");
    }
  } else {
    console.log("Login failed");
  }
}
