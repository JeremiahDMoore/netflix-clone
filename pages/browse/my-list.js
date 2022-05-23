import Head from "next/head";
import SectionCards from "../../components/card/SectionCards";
import NavBar from "../../components/nav-bar/NavBar";
import { getMyList } from "../../lib/videos";

import styles from "../../styles/MyList.module.css";
import useRedirectUser from "../../utils/redirectUser";

export async function getServerSideProps(context) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { token, userId } = await useRedirectUser(context);
  const videos = await getMyList(token, userId);
  return {
    props: {
      myListVideos: videos || [],
    },
  };
}
const MyList = ({ myListVideos }) => {
  return (
    <div>
      <Head>
        <title>My List</title>
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.sectionWrapper}>
          <SectionCards
            title="My List"
            videos={myListVideos}
            size="small"
            shouldWrap
            shouldScale={false}
          />
        </div>
      </main>
    </div>
  );
};

export default MyList;
