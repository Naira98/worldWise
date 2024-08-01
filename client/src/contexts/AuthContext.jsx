import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  handleGetUser,
  handleLogin,
  handleLogout,
  handleSignup,
} from "../lib/auth-services";

const AuthContext = createContext();

const intialState = {
  user: null,
  isAuth: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    case "logout":
      return {
        user: null,
        isAuth: false,
      };
    default:
      throw new Error("Unkown action type");
  }
};

const AuthProvider = ({ children }) => {
  const [{ user, isAuth }, dispatch] = useReducer(reducer, intialState);

  const signup = async (email, password, name) => {
    const user = await handleSignup(email, password, name);
    if (!user) return null;
    return user;
  };

  const login = async (email, password) => {
    const user = await handleLogin(email, password);
    if (!user) return null;
    dispatch({ type: "login", payload: user });
    return user;
  };

  const getUser = useCallback(async () => {
    const user = await handleGetUser();
    if (user) {
      dispatch({ type: "login", payload: user });
      return user;
    }
  }, []);

  const logout = async () => {
    const success = await handleLogout();
    if (success) {
      dispatch({ type: "logout" });
    }
  };

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <AuthContext.Provider
      value={{ user, isAuth, signup, login, getUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
};

export { AuthProvider, useAuth };
