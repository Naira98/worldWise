import apiReq from "./apiReq";

export async function handleSignup(email, password, name) {
  try {
    const res = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });
    if (!res.ok) return null;
    const userData = await res.json();
    return userData;
  } catch (err) {
    console.log(err);
  }
}

export async function handleLogin(email, password) {
  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) return null;
    const userData = await res.json();
    localStorage.setItem("accessToken", userData.accessToken);
    localStorage.setItem("refreshToken", userData.refreshToken);
    return { userId: userData.userId, name: userData.name };
  } catch (err) {
    console.log(err);
  }
}

export async function handleLogout() {
  try {
    const res = await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    if (!res.ok) return null;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return "You logged out successfully";
  } catch (err) {
    console.log(err);
  }
}

export async function handleGetUser() {
  try {
    const res = await apiReq("GET", "/auth/getUser");
    console.log(res);
    if (!res.ok) return null;
    const userData = await res.json();
    return { userId: userData.userId, name: userData.name };
  } catch (err) {
    console.log(err);
  }
}
