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