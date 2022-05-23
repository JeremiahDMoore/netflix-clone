import Link from "next/link";
import clsx from "classNames";
import Card from "./Card";
import styles from "./SectionCards.module.css";

const SectionCards = ({
  title,
  videos = [],
  size,
  shouldWrap = false,
  shouldScale,
}) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={clsx(styles.cardWrapper, shouldWrap && styles.wrapping)}>
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
                  shouldScale={shouldScale}
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
