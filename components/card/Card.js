import { useState } from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import cls from "classnames";

import styles from "./Card.module.css";

const Card = ({
  id,
  imgUrl = "/static/movie-placeholder.jpg",
  size = "medium",
  shouldScale = true,
}) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);
  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const onImageErrorHandler = () => {
    setImgSrc("/static/movie-placeholder.jpg");
  };

  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

  const shouldHover = shouldScale && {
    whileHover: { ...scale },
  };
  return (
    <div className={styles.container}>
      <motion.div
        className={cls(styles.imgMotionWrapper, classMap[size])}
        {...shouldHover}
      >
        <Image
          className={styles.cardImg}
          src={imgSrc}
          alt="image"
          layout="fill"
          onError={onImageErrorHandler}
          objectFit="cover"
        />
      </motion.div>
    </div>
  );
};

export default Card;
