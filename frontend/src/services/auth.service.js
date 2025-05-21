const API_URL = "http://localhost:3000/api/auth/";

const register = async (username, password, role = "USER") => {
  const response = await fetch(API_URL + "signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, role })
  });
  return response.json();
};

const login = async (username, password) => {
  const response = await fetch(API_URL + "signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  if (response.ok && data.accessToken) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  return data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default { register, login, logout, getCurrentUser };