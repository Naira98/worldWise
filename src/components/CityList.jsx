import { CircularProgress } from "@mui/material";
import styles from "./styles/CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";

const CityList = ({ cities, isLoading }) => {
  if (isLoading) return <CircularProgress color="inherit" />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <li key={city.id}>
          <CityItem city={city} />
        </li>
      ))}
    </ul>
  );
};

export default CityList;
