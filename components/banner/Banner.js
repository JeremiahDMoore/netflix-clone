import { useRouter } from "next/router";
import Image from "next/image";

import styles from "./Banner.module.css";

const Banner = ({ title, subTitle, imgUrl, videoId }) => {
  const router = useRouter();
  const onPlayHandler = () => {
    console.log("Hi.");
    router.push(`video/${videoId}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <h4 className={styles.subTitle}>{subTitle}</h4>

          <div className={styles.playBtnWrapper}>
            <button className={styles.btnWithIcon} onClick={onPlayHandler}>
              <Image
                src={"/static/play_arrow.svg"}
                alt="Play icon"
                height="32px"
                width="32px"
              />
              <span className={styles.playText}>Play</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.bannerImg}
        style={{
          backgroundImage: `url(${imgUrl})`,
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
      ></div>
    </div>
  );
};
export default Banner;
