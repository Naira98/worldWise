import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import styles from "./styles/Login.module.css";
import HomeNav from "../components/HomeNav";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const { signup } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password && name) {
      const user = await signup(email, password, name);
      if (user) navigate("/login");
    }
  };

  return (
    <main className={styles.login}>
      <HomeNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Signup</Button>
        </div>
      </form>
      <div className={styles.footer}>
        <span>
          <strong>Already have an account </strong>
        </span>
        <span>
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        </span>
      </div>
    </main>
  );
};

export default Signup;
