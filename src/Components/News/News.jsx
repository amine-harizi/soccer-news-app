import { useState, useEffect } from "react";
import "./News.css";
import LeagueLoading from "../Standings/Loadings/LeagueLoading";
import { Link } from "react-router-dom";
import LogoLink from "../LogoLink";
const News = () => {
  const url = `https://www.scorebat.com/video-api/v3/feed/?token=${process.env.REACT_APP_VIDEO_API_KEY}`;
  const [videos, setVideos] = useState([]);
  const [videosLoading, setVideosLoading] = useState(false);
  const fetchVideos = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      // console.log('data.response', data.response)
      return data.response;
    } catch (error) {
      setVideosLoading(false);
    }
  };

  useEffect(() => {
    setVideosLoading(true);

    const temp = fetchVideos();
    temp.then((data) => {
      setVideos(data);
      setVideosLoading(false);
    });
  }, []);

  return videosLoading ? (
    <LeagueLoading />
  ) : (
    <>
      <header className="header">
        <LogoLink/>
        <h1 style={{ textAlign: "center", padding: "1rem" }}>Watch</h1>
      </header>
      <div className="news-container">
        {videos?.map((video, idx) => (
          <div className="video-card" key={idx + video.title}>
            <div
              className="card-thumbnail"
              onClick={() => window.open(video.matchviewUrl)}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src =
                    "https://www.odt.co.nz/sites/default/files/styles/odt_landscape_extra_large_21_10/public/story/2021/12/footballgoalnetgettyimages-dv1419019.jpg?itok=xKL9RUun";
                }}
              />
              <div className="watch-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="card-body">
              <a
                className="competition-url"
                href={video.competitionUrl}
                target="_blank"
              >
                <svg
                  style={{ height: "16px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                    clipRule="evenodd"
                  />
                </svg>
                {video.competition}
              </a>
              <br />
              Date : {video.date.slice(0, 10)}
            </div>
            <div className="card-footer">
              <div className="team-one">{video?.title?.split("-")[0]}</div>

              <svg
                style={{ width: "16px" }}
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="team-two">{video?.title?.split("-")[1]}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default News;
