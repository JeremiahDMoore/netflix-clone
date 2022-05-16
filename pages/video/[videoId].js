import clsx from "classnames";
import { useRouter } from "next/router";
import Modal from "react-modal";

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
  const { videoId } = router.query;

  const { title, publishTime, description, channelTitle, viewCount } = video;
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
