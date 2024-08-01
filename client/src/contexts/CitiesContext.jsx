import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  handleAddCity,
  handleDeleteCity,
  handleGetCities,
  handleGetCity,
} from "../lib/actions-services";

// const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

// const sleep = (time) => new Promise((fulfill) => setTimeout(fulfill, time));

const intialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  err: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };

    case "city/loaded":
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      };
    case "city/added":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
        isLoading: false,
      };

    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
      };
    case "rejected":
      return {
        ...state,
        err: action.payload,
        isLoading: false,
      };

    default:
      throw new Error("Unkown action type");
  }
};

const CitiesProvider = ({ children }) => {
  const [{ cities, currentCity, isLoading }, dispatch] = useReducer(
    reducer,
    intialState
  );
  const [value, setValue] = useState(0);
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  const forceRefetch = () => {
    setValue((x) => x + 1);
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        dispatch({ type: "loading" });
        const cities = await handleGetCities();
        dispatch({ type: "cities/loaded", payload: cities });
        // setCities(data);
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
    };
    fetchCities();
  }, [value]);

  const getCity = useCallback(
    async (id) => {
      if (id === currentCity.id) return;
      try {
        dispatch({ type: "loading" });
        const city = await handleGetCity(id);
        dispatch({ type: "city/loaded", payload: city });
        // setCurrentCity(data);
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading city...",
        });
      }
    },
    [currentCity.id]
  );
  const addCity = async (newCity) => {
    try {
      dispatch({ type: "loading" });
      const addedCity = await handleAddCity(newCity);
      dispatch({ type: "city/added", payload: addedCity });
      // setCities((cities) => [...cities, newCity]);
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error during creating city.",
      });
    }
  };
  const deleteCity = async (id) => {
    try {
      dispatch({ type: "loading" });
      await handleDeleteCity(id);
      dispatch({ type: "city/deleted", payload: id });
      forceRefetch()
      // location.reload();
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error during deleting city...",
      });
    }
  };
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        addCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the ContextProvider");
  return context;
};

export { CitiesProvider, useCities };
