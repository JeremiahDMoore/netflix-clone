import Link from "next/link";

import Card from "./Card";
import styles from "./SectionCards.module.css";

const SectionCards = ({ title, videos = [], size }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, index) => {
          const videoId = video.id;
          return (
            <Link key={index} href={`/video/${videoId}`} passHref>
              <a>
                <Card
                  key={index}
                  id={index}
                  imgUrl={video.imgUrl}
                  size={size}
                />
              </a>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SectionCards;
