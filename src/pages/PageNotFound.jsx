import HomeNav from "../components/HomeNav";
import styles from './styles/Product.module.css'

const PageNotFound = () => {
  return (
    <div className={styles.product}>
      <HomeNav />
      <h1 className={styles.notFound}>PageNotFound :(</h1>
    </div>
  );
};

export default PageNotFound;
