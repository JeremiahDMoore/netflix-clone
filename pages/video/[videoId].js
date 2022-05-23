import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import clsx from "classnames";
import Modal from "react-modal";
import DisLike from "../../components/icons/DisLike";
import Like from "../../components/icons/Like";

Modal.setAppElement("#__next");

import Navbar from "../../components/nav-bar/NavBar";
import { getYoutubeVideoById } from "../../lib/videos";

import styles from "../../styles/Video.module.css";

export async function getStaticProps(context) {
  const videoId = context.params.videoId;
  const videoArray = await getYoutubeVideoById(videoId);

  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const listOfVideos = ["gdZLi9oWNZg", "WMweEpGlu_U", "BVwAVbKYYeM"];

  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }));

  return { paths, fallback: "blocking" };
}

const Video = ({ video }) => {
  const router = useRouter();

  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDislike, setToggleDislike] = useState(false);
  const { videoId } = router.query;

  const { title, publishTime, description, channelTitle, viewCount } = video;

  useEffect(() => {
    const getFavoritedData = async () => {
      const response = await fetch(`/api/stats?videoId=${videoId}`, {
        method: "GET",
      });
      const data = await response.json();

      if (data.length > 0) {
        const favorited = data[0].favorited;
        if (favorited === 1) {
          setToggleLike(true);
        } else if (favorited === 0) {
          setToggleDislike(true);
        }
      }
    };

    getFavoritedData();
  }, []);

  const runRatingService = async (favorited) => {
    return await fetch("/api/stats", {
      method: "POST",
      body: JSON.stringify({
        videoId,
        favorited,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const toggleLikeHandler = async () => {
    const val = !toggleLike;
    setToggleLike(val);
    setToggleDislike(toggleLike);

    const favorited = val ? 1 : 0;
    runRatingService(favorited);
  };

  const toggleDislikeHandler = async () => {
    const val = !toggleDislike;
    setToggleDislike(val);
    setToggleLike(toggleDislike);

    const favorited = val ? 0 : 1;
    runRatingService(favorited);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => {
          router.back();
        }}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <iframe
          id="player"
          type="text/html"
          width="100%"
          height="390"
          src={`http://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com`}
          frameBorder="0"
          rel="0"
          className={styles.videoPlayer}
        ></iframe>
        <div className={styles.likeDislikeBtnWrapper}>
          <div className={styles.likeBtnWrapper}>
            <button onClick={toggleLikeHandler}>
              <div className={styles.btnWrapper}>
                <Like selected={toggleLike} />
              </div>
            </button>
          </div>
          <button onClick={toggleDislikeHandler}>
            <div className={styles.btnWrapper}>
              <DisLike selected={toggleDislike} />
            </div>
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.infoTextColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>

              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.infoTextColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
