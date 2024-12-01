import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./styles/Login.module.css";
import HomeNav from "../components/HomeNav";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login, isAuth } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      const user = await login(email, password);
      if (!user) setError("Wrong email or password");
      console.log(error)
    }
  };

  useEffect(() => {
    if (isAuth) return navigate("/app", { replace: true });
  }, [isAuth, navigate]);

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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
          {error && <h2 style={{textAlign: "center", color:'#db8080'}}>{error}</h2>}
        </div>
      </form>
      <div className={styles.footer}>
        <span>
          <strong>Don&apos;t have an account? </strong>
        </span>
        <span>
          <Link to="/signup" className={styles.link}>
            Register
          </Link>
        </span>
      </div>
    </main>
  );
};

export default Login;
