import  jwtDecode  from "jwt-decode";
import "core-js/stable/atob";

const apiReq = async (method, endpoint, body, headers) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (accessToken && refreshToken) {
    const decodedToken = jwtDecode(accessToken);
    // console.log(decodedToken.exp * 1000);
    // console.log(Date.now());
    // console.log(decodedToken.exp * 1000 >= Date.now());
    if (decodedToken.exp * 1000 < Date.now()) {
      const res = await fetch("http://localhost:3000/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify({ refreshToken }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
      }
    }
  }
  return await fetch(`http://localhost:3000${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { authorization: "Bearer " + accessToken }),
      ...headers,
    },
    body: JSON.stringify(body),
  });
};
export default apiReq;
