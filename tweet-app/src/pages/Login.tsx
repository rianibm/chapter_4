import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const tweets_api_base_url = "http://localhost:8082";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch(`${tweets_api_base_url}/api/auth/login`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseJson = await response.json();

      if (response.status !== 200) {
        alert(`Error: ${responseJson.message}`);
      } else {
        localStorage.setItem("access_token", responseJson.data.access_token);
        // If login succeeds, redirect to the home page
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form>
        <input
          value={email}
          onChange={handleEmailChange}
          placeholder="Masukkan email"
        />
        <input
          value={password}
          onChange={handlePasswordChange}
          type="password"
          placeholder="Masukkan password"
        />

        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
