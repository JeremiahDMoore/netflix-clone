import Card from "./Card";
import styles from "./SectionCards.module.css";

const SectionCards = ({ title, videos = [], size }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, index) => {
          return (
            <Card key={index} id={index} imgUrl={video.imgUrl} size={size} />
          );
        })}
      </div>
    </section>
  );
};

export default SectionCards;
