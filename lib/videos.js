import videoTestData from "../data/videos.json";
import { getMyListVideos, getWatchedVideos } from "./db/hasura";

const fetchVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const BASE_URL = "youtube.googleapis.com/youtube/v3";
  const response = await fetch(
    `https://${BASE_URL}/${url}&key=${YOUTUBE_API_KEY}`
  );

  return await response.json();
};
export const getCommonVideos = async (url) => {
  try {
    const isDev = false;
    const data = isDev ? videoTestData : await fetchVideos(url);

    if (data?.error) {
      console.error("Youtube API error", data.error);
      return [];
    }

    return data?.items.map((item) => {
      const snippet = item.snippet;
      const id = item.id?.videoId || item.id;
      return {
        title: snippet?.title,
        imgUrl: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
        description: snippet?.description,
        publishTime: snippet?.publishedAt,
        channelTitle: snippet?.channelTitle,
        viewCount:
          item.statistics && item.statistics.viewCount
            ? item.statistics.viewCount
            : 0,
      };
    });
  } catch (error) {
    console.error("Something went wrong with fetching videos", error);
    return [];
  }
};

export const getVideos = async (searchQuery) => {
  const URL = `search?part=snippet&maxResults=25&q=${searchQuery}`;
  return getCommonVideos(URL);
};

export const getPopularVideos = () => {
  const URL =
    "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=25&regionCode=US";
  return getCommonVideos(URL);
};

export const getYoutubeVideoById = (videoId) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
  return getCommonVideos(URL);
};

export const getWatchItAgainVideos = async (token, userId) => {
  const videos = await getWatchedVideos(token, userId);
  return videos?.map((video) => {
    video;
    return {
      id: video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
    };
  });
};

export const getMyList = async (token, userId) => {
  const videos = await getMyListVideos(token, userId);
  console.log({ videos });
  return videos?.map((video) => {
    video;
    return {
      id: video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
    };
  });
};
