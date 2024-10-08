import { Link } from "react-router-dom";
import styles from "./styles/CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const CityItem = ({ city }) => {
  const { currentCity, deleteCity } = useCities();
  const { emoji, cityName, date, _id, position } = city;

  const handleDelete = (e) => {
    e.preventDefault()
    deleteCity(_id)
  }
  
  return (
    <Link
      className={`${styles.cityItem} ${
        currentCity.id === _id ? styles["cityItem--active"] : ""
      }`}
      to={`${_id}?lat=${position.lat}&lng=${position.lng}`}
    >
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn} onClick={handleDelete}>
        &times;
      </button>
    </Link>
  );
};

export default CityItem;
