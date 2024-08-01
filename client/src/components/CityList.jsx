import { CircularProgress } from "@mui/material";

import styles from "./styles/CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";

import { useCities } from "../contexts/CitiesContext";

const CityList = () => {
  const { cities = [], isLoading } = useCities();

  if (isLoading) return <CircularProgress color="inherit" />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.length &&
        cities.map((city) => (
          <li key={city._id}>
            <CityItem city={city} />
          </li>
        ))}
    </ul>
  );
};

export default CityList;
