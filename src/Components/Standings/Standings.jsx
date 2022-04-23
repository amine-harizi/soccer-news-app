import "./Standings.css";
import LeagueLoading from "./Loadings/LeagueLoading";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoLink from "../LogoLink";
const Standings = () => {
  const url = "https://api-football-standings.azharimm.site/leagues";
  const [showNavbar, setShowNavbar] = useState(false);
  const [leagues, setLeagues] = useState([]);
  const [currentSort, setCurrentSort] = useState("asc");
  const [currentLeague, setCurrentLeague] = useState({});
  const [currentLeagueId, setCurrentLeagueId] = useState("");
  const [currentLeagueSeasons, setCurrentLeagueSeasons] = useState([]);
  const [currentSeason, setCurrentSeason] = useState(
    new Date().getFullYear() - 1
  );
  const [showSeasonPicker, setShowSeasonPicker] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [leagueLoading, setLeagueLoading] = useState(false);
  // fetch all leagues : happens in navbar : first render
  const fetchLeagues = async () => {
    try {
      setPageLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      setPageLoading(false);
      return data.data;
    } catch (error) {}
  };

  // fetch the selected league
  const fetchCurrentLeague = async () => {
    try {
      setLeagueLoading(true);
      const res = await fetch(
        `${url}/${currentLeagueId}/standings?season=${currentSeason}&sort=asc`
      );
      const data = await res.json();
      setLeagueLoading(false);
      return data.data;
    } catch (error) {}
  };
  // fetch the seasons available for curr league
  const fetchCurrentLeagueSeasons = async () => {
    try {
      const res = await fetch(`${url}/${currentLeagueId}/seasons`);
      const data = await res.json();
      return data.data.seasons.map((season) => season.year);
    } catch (error) {}
  };

  // change in sorting
  const handleSortChange = () => {
    const temp = {
      ...currentLeague,
      standings: currentLeague.standings.reverse(),
    };
    setCurrentSort((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentLeague(temp);
  };
  //handle next - prev year click
  const handleYearChange = (type) => {
    switch (type) {
      case "prev":
        if (currentLeagueSeasons.indexOf(currentSeason - 1) !== -1)
          setCurrentSeason((prev) => prev - 1);
        setShowSeasonPicker(false);
        break;
      case "next":
        if (currentLeagueSeasons.indexOf(currentSeason + 1) !== -1)
          setCurrentSeason((prev) => prev + 1);
        setShowSeasonPicker(false);
        break;
      default:
        break;
    }
  };
  // initial render
  useEffect(() => {
    fetchLeagues().then((data) => {
      setLeagues(data);
      setCurrentLeagueId(data[0].id);
      setCurrentLeague(data[0]);
    });
  }, []);
  // handle fetching league when the selected one changes
  useEffect(() => {
    if (currentLeagueId) {
      fetchCurrentLeague().then((league) => setCurrentLeague(league));
      fetchCurrentLeagueSeasons().then((seasons) => {
        setCurrentLeagueSeasons(seasons);
        setCurrentSeason(seasons[0]);
      });
    }
    setCurrentSort("asc");
    setShowSeasonPicker(false);
    setShowNavbar(false);
  }, [currentLeagueId]);

  // handle fetching data for current league in  current season when
  // it changes:: happens when change season
  useEffect(() => {
    if (currentSeason) {
      fetchCurrentLeague().then((league) => setCurrentLeague(league));
      setCurrentSort("asc");
    }
  }, [currentSeason]);

  return pageLoading ? (
    <LeagueLoading />
  ) : (
    <div className="standings-page-container">
      <div
        style={{ left: showNavbar ? "250px" : "0px" }}
        onClick={() => setShowNavbar((prev) => !prev)}
        role="button"
        className="toggle-btn"
      >
        <svg
          style={{ transform: showNavbar ? "rotate(0deg)" : "rotate(180deg)" }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
      {showNavbar && (
        <aside className="aside">
          <nav className="aside-nav">
            <header className="header">
              <LogoLink />
            </header>
            {leagues.map((league) => (
              <div
                className={`nav-link ${
                  league.id === currentLeagueId ? "active" : ""
                }`}
                key={league.id}
                onClick={() => setCurrentLeagueId(league.id)}
              >
                <img src={league.logos.light} alt={league.name} />
                <div>{league.name}</div>
              </div>
            ))}
          </nav>
        </aside>
      )}

      <main className="standings-container">
        {leagueLoading ? (
          <LeagueLoading />
        ) : (
          <>
            {!showNavbar && (
              <header className="header" >
                <LogoLink />
              </header>
            )}

            <h2>{currentLeague?.name}</h2>
            <div className="head">
              <h3>Standings</h3>

              <div className="season-container">
                <div
                  title="prev"
                  disabled={
                    currentSeason ==
                    currentLeagueSeasons[currentLeagueSeasons.length - 1]
                  }
                  onClick={() => handleYearChange("prev")}
                >
                  <svg
                    style={{ height: "16px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </div>
                <div
                  style={{ minWidth: "35px" }}
                  onClick={() => setShowSeasonPicker((prev) => !prev)}
                  title="season"
                >
                  {showSeasonPicker ? "close" : currentSeason}
                </div>
                <div
                  title="next"
                  disabled={currentSeason == currentLeagueSeasons[0]}
                  onClick={() => handleYearChange("next")}
                >
                  <svg
                    style={{ height: "16px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>

                {showSeasonPicker && (
                  <div className={`season-picker`}>
                    {currentLeagueSeasons.map((season) => (
                      <div
                        key={season}
                        onClick={() => {
                          setCurrentSeason(season);
                          setShowSeasonPicker(false);
                        }}
                        className={`season ${
                          season == currentSeason ? "active" : ""
                        }`}
                      >
                        {season}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="standings">
              <div className="standings-table-layout">
                <div className="table-headings">
                  <div
                    title={`sort ${
                      currentSort === "asc" ? "desc" : "asc"
                    }ending`}
                    style={{ display: "flex", alignItems: "center" }}
                    onClick={handleSortChange}
                  >
                    {currentSort === "desc" ? (
                      <svg
                        style={{ height: "20px" }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                      </svg>
                    ) : (
                      <svg
                        style={{ height: "20px" }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                      </svg>
                    )}
                  </div>
                  <div>L</div>
                  <div>Team</div>
                  {currentLeague?.standings
                    ?.slice(0, 1)[0]
                    ?.stats?.slice(0, 7)
                    ?.map((item) => (
                      <div
                        style={{ textAlign: "center" }}
                        key={item.shortDisplayName}
                        title={item.displayName}
                      >
                        {item.abbreviation}
                      </div>
                    ))}
                </div>
                <div className="table-values">
                  {currentLeague?.standings?.map((item, idx, curr) => (
                    <div className="team" key={idx}>
                      <div>
                        {currentSort === "asc" ? idx + 1 : curr.length - idx}.
                      </div>
                      <img
                        src={item?.team?.logos?.slice(0, 1)[0].href}
                        alt=""
                      />
                      <div>{item.team.name}</div>
                      {item?.stats?.slice(0, 7).map((item) => (
                        <div
                          style={{ textAlign: "center" }}
                          key={item.shortDisplayName}
                        >
                          {item.displayValue}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Standings;
