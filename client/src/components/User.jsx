import { useNavigate } from "react-router-dom";

import styles from "./styles/User.module.css";

import { useAuth } from "../contexts/AuthContext";
const avatar = "https://i.pravatar.cc/100?u=zz"

function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleClick() {
    await logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/