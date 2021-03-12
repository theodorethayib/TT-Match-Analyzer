import React, { useCallback, useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";

// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import axios from "axios";
import qs from "qs";
import * as FaIcons from "react-icons/fa";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdUnfoldLess,
  MdUnfoldMore,
  MdAdd,
  MdPermContactCalendar,
  MdUpdate,
} from "react-icons/md";
// import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { IconContext } from "react-icons";

import "../Styles/Video.css";
import "../Styles/Gamenav.css";
import "../Styles/Gametable.css";
import "../Styles/Sidebar.css";
// import "../Styles/tailwind.min.css";

function VideoNotesView() {
  const [playerName] = useState("Duck");	
	
  const [url, setUrl] = useState("m1.m4v");

  const [dates, setDates] = useState(["woo"]);
  const [matches, setMatches] = useState([]);
  const [games, setGames] = useState([]);
  const [opponents, setOpponents] = useState([]);
  const [gameData, setGameData] = useState([]);
  const [pointsData, setPointsData] = useState([]);

  const [expandCollapse, setExpandCollapse] = useState([]);
  const [dateslength, setDateslength] = useState(0);

  const [score, setScore] = useState("");
  const [winLoss, setWinLoss] = useState("Win/Loss");
  const [winLossList] = useState(["Win", "Loss"]);
  const [server, setServer] = useState("Server");
  const [serverList] = useState(["Me", "Opponent"]);
  const [opener, setOpener] = useState("Opener");
  const [openerList] = useState(["Me", "Opponent", "N/A"]);
  const [serveSpin, setServeSpin] = useState("Serve Spin  ");
  const [serveSpinList, setServeSpinList] = useState([]);
  const [serveLength, setServeLength] = useState("Serve Length");
  const [serveLengthList, setServeLengthList] = useState([]);
  const [servePlacement, setServePlacement] = useState("Serve Placement");
  const [servePlacementList, setServePlacementList] = useState([]);
  const [openingType, setOpeningType] = useState("Opening");
  const [openingTypeList, setOpeningTypeList] = useState([]);
  const [winBy, setWinBy] = useState("Win By");
  const [winByList, setWinByList] = useState([]);
  const [goodPoint, setGoodPoint] = useState("Good Point");
  const [goodPointList] = useState(["Yes", "No"]);
  const [notes, setNotes] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const [matchId, setMatchId] = useState(-1);
  const [addGame, setAddGame] = useState(false);
  const [gameScore, setGameScore] = useState("");
  const [gameUrl, setGameUrl] = useState("");
  const [gameWinLoss, setGameWinLoss] = useState("Win/Loss");
  const [goodGame, setGoodGame] = useState("Good Game");

  const [hasGame, setHasGame] = useState(false);
  const [hasMatch, setHasMatch] = useState(false);

  const [addDate, setAddDate] = useState("");
  const [matchDate, setMatchDate] = useState("Match date:");

  const [opponentTitle, setOpponentTitle] = useState("Select a match");
  const [gameStartTime, setGameStartTime] = useState(0);

  const frameRate = 120;

  const [key, setKey] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [tempPlaybackRate, setTempPlaybackRate] = useState(1);
  const [curFrameNumber, setCurFrameNumber] = useState(0);
  const [played, setPlayed] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [tempPlayedSeconds, setTempPlayedSeconds] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [playing, setPlaying] = useState(false);

  const [matchDiv, setMatchDiv] = useState(false);
  const [datesDiv, setDatesDiv] = useState(false);

  const [opponentsList, setOpponentsList] = useState([]);

  const [matchOpponent, setMatchOpponent] = useState("Select Opponent");
  const [matchWinLoss, setMatchWinLoss] = useState("Win/Loss");
  const [matchScore, setMatchScore] = useState("");
  const [matchBestOf, setMatchBestOf] = useState("");
  const [matchGoodMatch, setMatchGoodMatch] = useState("Good Match");
  const [sidebar, setSidebar] = useState(false);

  const [inputField, setInputField] = useState("");

  const [pointsTitle, setPointsTitle] = useState("");

  const [curArr, setCurArr] = useState([]);
  const [curGameStartTime, setCurGameStartTime] = useState(0);

  const [addGameStartTime, setAddGameStartTime] = useState(0);

  const vidPlayer = useRef(null);

  useEffect(() => {
    getDates();
    getServeSpinList();
    getServeLengthList();
    getServePlacementList();
    getOpeningTypeList();
    getWinByList();
    getOpponents();
  }, []);

  useEffect(() => {
    setDateslength(dates.length);
    console.log(dates);
    if (dates[0] !== "woo") {
      getMatches();
    }
  }, [dates]);

  useEffect(() => {
    if (gameData.length > 0) {
      getPoints();
    }
  }, [gameData]);

  useEffect(() => {
    setTempPlaybackRate(playbackRate);
  }, [playbackRate]);

  async function getServeSpinList() {
    let temp = [];
    await axios.get("http://localhost:5000/servespin").then((result) => {
      result.data.forEach(({ serve_spin }) => {
        temp.push(serve_spin);
      });
    });
    setServeSpinList(temp);
  }

  async function getServeLengthList() {
    let temp = [];
    await axios.get("http://localhost:5000/servelength").then((result) => {
      result.data.forEach(({ serve_length }) => {
        temp.push(serve_length);
      });
    });
    setServeLengthList(temp);
  }

  async function getServePlacementList() {
    let temp = [];
    await axios.get("http://localhost:5000/serveplacement").then((result) => {
      result.data.forEach(({ serve_placement }) => {
        temp.push(serve_placement);
      });
    });
    setServePlacementList(temp);
  }

  async function getOpeningTypeList() {
    let temp = [];
    await axios.get("http://localhost:5000/openingtype").then((result) => {
      result.data.forEach(({ opening_type }) => {
        temp.push(opening_type);
      });
    });
    setOpeningTypeList(temp);
  }

  async function getWinByList() {
    let temp = [];
    await axios.get("http://localhost:5000/winby").then((result) => {
      result.data.forEach(({ win_by }) => {
        temp.push(win_by);
      });
    });
    setWinByList(temp);
  }

  async function getDates() {
    let temp = [];
    let temp2 = [];

    await axios.get("http://localhost:5000/dates").then((result) => {
      result.data.forEach(({ Dates }) => {
        temp.unshift(Dates);
      });
    });

    console.log(temp);
    setDates(temp);
    for (let i = 0; i < temp.length; i++) {
      temp2.push(true);
    }
  }

  async function getOpponents() {
    let temp = [];
    await axios.get("http://localhost:5000/opponents").then((result) => {
      result.data.forEach(({ opponent_name }) => {
        temp.push(opponent_name);
      });
    });
    setOpponents(temp);
  }

  async function getMatches() {
    let temp = [];

    let temp2 = [];

    for (let i = 0; i < dates.length; i++) {
      let temp2 = [];
      console.log(dates);
      await axios
        .get("http://localhost:5000/matches/" + dates[i])
        .then((result) => {
          result.data.forEach(
            ({
              match_id,
              opponent_name,
              match_score,
              win_loss,
              good_match,
            }) => {
              let temp3 = [];
              temp3.push(match_id);
              temp3.push(opponent_name);
              temp3.push(match_score);
              temp3.push(win_loss);
              temp3.push(good_match);
              temp2.unshift(temp3);
            }
          );
        })
        .then(() => {
          temp.push(temp2);
        });
    }
    setMatches(temp);
    console.log(temp);
  }

  async function getGames(matchid) {
    setHasGame(false);
    let temp = [];
    let i = 0;
    await axios.get("http://localhost:5000/games/" + matchid).then((result) => {
      result.data.forEach(
        ({
          match_id,
          game_id,
          win_loss,
          game_score,
          game_url,
          good_game,
          game_start_time,
        }) => {
          i += 1;
          let temp2 = [];
          temp2.push(game_id);
          temp2.push(i);
          temp2.push(win_loss);
          temp2.push(game_score);
          temp2.push(game_url);
          temp2.push(good_game);
          temp2.push(match_id);
          temp2.push(game_start_time);
          temp.push(temp2);
        }
      );
    });

    if (temp.length > 0) {
      setGames(temp);
      setHasGame(true);
      setGameData(temp[0]);
      setUrl(temp[0][4] + "#t=" + temp[0][7]);
    } else {
      setGames([]);
      setGameData([]);
      setHasGame(false);
    }

    console.log(temp);
  }

  async function getPoints() {
    let temp = [];
    let i = 0;
    console.log(gameData);
    await axios
      .get("http://localhost:5000/points/" + gameData[0])
      .then((result) => {
        console.log(result);
        result.data.forEach(
          ({
            point_id,
            timestamp,
            score,
            win_loss,
            server,
            serve_spin,
            serve_length,
            serve_placement,
            opener,
            opening_type,
            win_by,
            good_point,
            notes,
          }) => {
            let temp2 = [];
            temp2.push(i);
            temp2.push(point_id);
            temp2.push(timestamp);
            temp2.push(score);
            temp2.push(win_loss);
            temp2.push(server);
            temp2.push(serve_spin);
            temp2.push(serve_length);
            temp2.push(serve_placement);
            temp2.push(opener);
            temp2.push(opening_type);
            temp2.push(win_by);
            temp2.push(good_point);
            temp2.push(notes);
            temp.push(temp2);
            i += 1;
          }
        );
      });
    setPointsData(temp);
    console.log(temp);
  }

  async function addPoint() {
    let time;
    if (timestamp !== "") {
      time = timestamp;
    } else {
      time = playedSeconds;
    }
    await axios({
      method: "post",
      url: "http://localhost:5000/addpoint",
      data: qs.stringify({
        game_id: gameData[0],
        timestamp: time,
        score: score,
        win_loss: winLoss,
        server: server,
        serve_spin: serveSpin,
        serve_placement: servePlacement,
        serve_length: serveLength,
        opener: opener,
        opening_type: openingType,
        win_by: winBy,
        good_point: goodPoint,
        notes: notes,
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    await getPoints();
    resetDropdowns();
    console.log(gameData);
    console.log(games);
  }

  async function editPoint(point) {
    let time;
    let editScore;
    let editWL;
    let editServer;
    let editServeSpin;
    let editServePlacement;
    let editServeLength;
    let editOpener;
    let editOpeningType;
    let editWinBy;
    let editGoodPoint;
    let editNotes;
    if (timestamp !== "") {
      time = timestamp;
    } else {
      time = point[2];
    }
    if (score === "") {
      editScore = point[3];
    } else {
      editScore = score;
    }
    if (winLoss === "Win/Loss") {
      editWL = point[4];
    } else {
      editWL = winLoss;
    }
    if (server === "Server") {
      editServer = point[5];
    } else {
      editServer = server;
    }
    if (serveSpin === "Serve Spin  ") {
      editServeSpin = point[6];
    } else {
      editServeSpin = serveSpin;
    }
    if (serveLength === "Serve Length") {
      editServeLength = point[7];
    } else {
      editServeLength = serveLength;
    }
    if (servePlacement === "Serve Placement") {
      editServePlacement = point[8];
    } else {
      editServePlacement = servePlacement;
    }
    if (opener === "Opener") {
      editOpener = point[9];
    } else {
      editOpener = opener;
    }
    if (openingType === "Opening") {
      editOpeningType = point[10];
    } else {
      editOpeningType = openingType;
    }
    if (winBy === "Win By") {
      editWinBy = point[11];
    } else {
      editWinBy = winBy;
    }
    if (goodPoint === "Good Point") {
      editGoodPoint = point[12];
    } else {
      editGoodPoint = goodPoint;
    }
    if (notes === "") {
      editNotes = point[13];
    } else {
      editNotes = notes;
    }
    console.log(point[1]);
    console.log(gameData[0]);
    console.log(time);
    console.log(score);
    console.log(winLoss);
    console.log(server);
    console.log(serveSpin);
    console.log(servePlacement);
    await axios({
      method: "post",
      url: "http://localhost:5000/editpoint",
      data: qs.stringify({
        game_id: gameData[0],
        timestamp: time,
        score: editScore,
        win_loss: editWL,
        server: editServer,
        serve_spin: editServeSpin,
        serve_placement: editServePlacement,
        serve_length: editServeLength,
        opener: editOpener,
        opening_type: editOpeningType,
        win_by: editWinBy,
        good_point: editGoodPoint,
        notes: editNotes,
        point_id: point[1],
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    await getPoints();
    resetDropdowns();
  }

  async function deletePoint(pointId) {
    console.log(pointId);
    await axios({
      method: "post",
      url: "http://localhost:5000/deletepoint",
      data: qs.stringify({
        point_id: pointId,
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    await getPoints();
  }

  async function doAddGame() {
    await axios({
      method: "post",
      url: "http://localhost:5000/addgame",
      data: qs.stringify({
        match_id: matchId,
        win_loss: gameWinLoss,
        game_score: gameScore,
        game_url: gameUrl,
        good_game: goodGame,
        game_start_time: addGameStartTime,
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    await getGames(matchId);
    resetDropdowns();
    console.log(matchId);
    console.log(gameWinLoss);
    console.log(gameScore);
    console.log(gameUrl);
    console.log(goodGame);
  }

  async function doAddDate() {
    await axios({
      method: "post",
      url: "http://localhost:5000/adddate",
      data: qs.stringify({
        date: addDate,
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    await getDates();
  }

  async function doAddMatch() {
    console.log(matchDate);
    await axios({
      method: "post",
      url: "http://localhost:5000/addmatch",
      data: qs.stringify({
        date: matchDate,
        opponent_name: matchOpponent,
        win_loss: matchWinLoss,
        match_score: matchScore,
        best_of: matchBestOf,
        good_match: matchGoodMatch,
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    await getMatches();
  }

  function nextFrame() {
    setSeeking(true);
    let curTime = vidPlayer.current.getCurrentTime();
    setPlayedSeconds(curTime + 1 / frameRate);
    vidPlayer.current.seekTo(curTime + 1 / frameRate, "second");
    setCurFrameNumber(curTime * 120 + 1);
    setSeeking(false);
  }

  function resetDropdowns() {
    setScore("");
    setWinLoss("Win/Loss");
    setServer("Server");
    setOpener("Opener");
    setServeSpin("Serve Spin  ");
    setServeLength("Serve Length");
    setServePlacement("Serve Placement");
    setOpeningType("Opening");
    setWinBy("Win By");
    setGoodPoint("Good Point");
    setNotes("");
    // setTimestamp(-1);
    setScore("");
    setNotes("");
    setTimestamp("");
    setGameScore("");
    setGameUrl("");
    setMatchScore("");
    setMatchBestOf("");
    setAddDate("");
  }

  function prevFrame() {
    setSeeking(true);
    let curTime = vidPlayer.current.getCurrentTime();
    setPlayedSeconds(curTime - 1 / frameRate);
    vidPlayer.current.seekTo(curTime - 1 / frameRate, "second");
    // vidPlayer.current.state.showPreview = true;
    // setCurFrameNumber(curTime * 120 - 1);
    setSeeking(false);
    // setKey(key + 1);
  }

  function updatePlaybackRate() {
    setPlaybackRate(tempPlaybackRate);
  }

  function updatePlayedSeconds() {
    vidPlayer.current.seekTo(tempPlayedSeconds);
    setPlayedSeconds(tempPlayedSeconds);
  }

  const handleProgress = (state) => {
    // pointsData.forEach((data, index) => {
    //   console.log(data);
    //   if (state.playedSeconds >= data[2]) {
    //     setPointsTitle(data[3]);
    //     break;
    //   }
    // });
    let temp = "0-0";
    let lastTemp = "0-0";
    for (let i = 0; i < pointsData.length; i++) {
      lastTemp = temp;
      temp = pointsData[i][3];
      if (pointsData[i][2] >= state.playedSeconds) {
        // setPointsTitle(pointsData[i][3]);
        setPointsTitle(lastTemp);
        break;
      }
    }
    let gTemp = 0;
    let lastGTemp = 0;
    for (let i = 0; i < games.length; i++) {
      lastGTemp = gTemp;
      gTemp = games[i][0];
      // console.log(games[i][7]);
      // console.log(state.playedSeconds);
      // console.log(games);
      // console.log(gameData);

      // console.log(games[i - 1][1]);
      // if (
      //   games[i][7] > state.playedSeconds &&
      //   games[i - 1][4] === gameData[4]
      // ) {
      //   console.log(games[i][7]);
      //   console.log(state.playedSeconds);
      //   console.log(gameData[1]);
      //   console.log(games[i - 1][1]);
      //   break;
      // }

      // console.log("AGH");
      // console.log(curArr);
      if (curArr.length === 0) {
        let temp = [];
        for (let i = 0; i < games.length; i++) {
          if (games[i][4] === gameData[4]) {
            temp.push(games[i]);
          }
        }
        setCurArr(temp);
        // console.log(temp);
      }
      for (let i = 0; i < curArr.length; i++) {
        // console.log(i + 1 + " " + curArr.length);
        if (
          i + 1 < curArr.length &&
          // curArr[i + 1][1] !== gameData[1] &&
          playedSeconds >= curArr[i + 1][7]
        ) {
          setGameData(games[curArr[i][1]]);
          setCurGameStartTime(curArr[i + 1][7]);
          break;
          // console.log(playedSeconds);
          // console.log(curArr[i + 1]);
        }
        // else {
        //   console.log(i);
        //   console.log(gameData);
        //   console.log(curArr[i + 1]);
        // }
      }

      let tempVar = [];

      if (curArr.length > 0 && playedSeconds < curGameStartTime) {
        // setCurArr([]);
        console.log(curGameStartTime);
        let index = 0;
        let lastIndex = 0;
        for (let i = 0; i < curArr.length; i++) {
          if (playedSeconds >= curArr[i][7]) {
            lastIndex = index;
            index = i;
            break;
          }
        }
        // console.log(lastIndex);
        // console.log(curArr);
        // console.log(curArr[lastIndex][7]);
        // console.log(games[curArr[lastIndex][1]]);
        // tempVar = games[curArr[lastIndex][1] - 1];
        setGameData(games[curArr[lastIndex][1] - 1]);
        // setGameData(asdf);
        setCurGameStartTime(curArr[lastIndex][7]);
        // console.log(gameData);
        // console.log(curGameStartTime);
        // console.log(index);
        // console.log(games);
        // console.log(curArr);
        // console.log(curGameStartTime);
        // console.log("RESET");
      }

      // if (tempVar.length > 0) {
      //   console.log("[[[[[[");
      //   console.log(gameData);
      //   console.log(tempVar);
      //   setGameData(tempVar);
      // }

      // if (
      //   games[i][7] > state.playedSeconds &&
      //   games[i - 1][4] === gameData[4] &&
      //   games[i - 1][1] !== gameData[1]
      // ) {
      //   console.log("BAB" + i);
      //   break;
      // }

      // if (games[i][7] > state.playedSeconds) {
      //   console.log(games[i - 1][4]);
      //   console.log(gameData[4]);
      //   console.log(games[i - 1][1]);
      //   console.log(gameData[1]);
      //   break;
      // }

      // if (games[i][7] > state.playedSeconds && games[i][1] !== gameData[1]) {
      //   // setGameData(games[i]);
      //   console.log("AAA" + i);
      //   // console.log(games[i - 1][1]);
      //   // console.log(gameData[1]);
      // }
    }
    // console.log(gameData);
    // console.log(gameData);
    if (!seeking) {
      // console.log(state);
      // console.log(pointsData);
      setPlayed(state.played);
      setPlayedSeconds(state.playedSeconds);
      setTempPlayedSeconds(state.playedSeconds);
    }
    console.log(curGameStartTime);
  };

  useEffect(() => {
    console.log("SAAD");
    console.log(curGameStartTime);
  }, [curGameStartTime]);

  function playPause() {
    setPlaying(!playing);
  }

  function doSetAddGame() {
    setAddGame(!addGame);
  }

  function doSetMatchDiv() {
    if (datesDiv) {
      setDatesDiv(false);
    }
    setMatchDiv(!matchDiv);
  }

  function doSetDatesDiv() {
    if (matchDiv) {
      setMatchDiv(false);
    }
    setDatesDiv(!datesDiv);
  }

  const showSidebar = () => {
    let temp = [];
    if (expandCollapse.length == 0) {
      for (let i = 0; i < dateslength; i++) {
        temp.push(true);
      }
      setExpandCollapse(temp);
    }
    setSidebar(!sidebar);
  };

  const doSetWL = useCallback(
    (data) => () => {
      setWinLoss(data);
    },
    []
  );

  const doSetServer = useCallback(
    (data) => () => {
      setServer(data);
    },
    []
  );

  const doSetServeSpin = useCallback(
    (data) => () => {
      setServeSpin(data);
    },
    []
  );

  const doSetServeLength = useCallback(
    (data) => () => {
      setServeLength(data);
    },
    []
  );

  const doSetServePlacement = useCallback(
    (data) => () => {
      setServePlacement(data);
    },
    []
  );

  const doSetOpener = useCallback(
    (data) => () => {
      setOpener(data);
      if (data === "N/A") {
        setOpeningType("N/A");
      }
    },
    []
  );

  const doSetOpeningType = useCallback(
    (data) => () => {
      setOpeningType(data);
      if (data === "N/A") {
        setOpener("N/A");
      }
    },
    []
  );

  const doSetWinBy = useCallback(
    (data) => () => {
      setWinBy(data);
      if (data === "Serve") {
        setOpener("N/A");
        setOpeningType("N/A");
      }
    },
    []
  );

  const doSetGameWinLoss = useCallback(
    (data) => () => {
      setGameWinLoss(data);
    },
    []
  );

  const doSetGoodGame = useCallback(
    (data) => () => {
      setGoodGame(data);
    },
    []
  );

  const doSetGoodPoint = useCallback(
    (data) => () => {
      setGoodPoint(data);
    },
    []
  );

  const doSetMatchDate = useCallback(
    (data) => () => {
      setMatchDate(data);
    },
    []
  );

  const doSetMatchWinLoss = useCallback(
    (data) => () => {
      setMatchWinLoss(data);
    },
    []
  );

  const doSetGoodMatch = useCallback(
    (data) => () => {
      setMatchGoodMatch(data);
    },
    []
  );

  const currentTimeClickHandler = useCallback((data) => () => {
    setTimestamp(data);
  });

  const getGamesClickHandler = useCallback((data) => () => {
    console.log(data);
    let id = data[0];
    getGames(id).then();
    setMatchId(id);
    console.log(id);
    setOpponentTitle(data[1]);
    setHasMatch(true);
    setCurArr([]);
  });

  const expandCollapseClickHandler = useCallback(
    (index) => () => {
      let newArr = [...expandCollapse];
      if (newArr.length === 0) {
        for (let i = 0; i < dates.length; i++) {
          newArr.push(true);
        }
      }
      newArr[index] = !newArr[index];
      setExpandCollapse(newArr);
    },
    [expandCollapse]
  );

  const tableClickHandler = useCallback((data) => () => {
    setSeeking(true);
    vidPlayer.current.seekTo(data);
    setPlayedSeconds(data);
    setSeeking(false);
    console.log(data);
  });

  const selectGame = useCallback((index) => () => {
    console.log("SDFSDFSDF");
    console.log(index);
    setGameData(games[index]);
    setUrl(games[index][4] + "#t=" + games[index][7]);
    setHasGame(true);
    setCurArr([]);
    console.log(games[index]);
    console.log(url);
  });

  const deleteClick = useCallback((data) => () => {
    console.log(data);
    deletePoint(parseInt(data));
  });

  const editClick = useCallback((data) => () => {
    editPoint(data);
    console.log(data);
  });

  const setPlaybackRateButton = useCallback((data) => () => {
    setPlaybackRate(data);
  });

  const doSetMatchOpponent = useCallback((data) => () => {
    setMatchOpponent(data);
  });

  return (
    <div className="wrapper">
      <IconContext.Provider value={{ color: "#AAA" }}>
        <div className="navbar">
          <div className="navbar-text" onClick={showSidebar}>
            <p className="text-left mx-4 text-s font-medium text-gray-200 tracking-wider">
              {opponentTitle} {pointsTitle}
            </p>
          </div>
          <div className="navbar-icon">
            <MdPermContactCalendar onClick={doSetDatesDiv} />
          </div>
          <div className="navbar-icon">
            <MdAdd onClick={doSetMatchDiv} />
          </div>

          {/*<Link to='#' className='menu-bars'>*/}
          <div className="navbar-icon">
            <FaIcons.FaBars onClick={showSidebar} />
          </div>

          {/*</Link>*/}
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            {/*<li className='navbar-toggle'>*/}
            {/*    /!*<Link to='#' className='menu-bars'>*!/*/}
            {/*        <AiIcons.AiOutlineClose  onClick={showSidebar}/>*/}
            {/*    /!*</Link>*!/*/}
            {/*</li>*/}
            {dateslength > 0 &&
              dates.map((data, index) => (
                <div>
                  <div>
                    <hr />
                    <div
                      className="title-flex"
                      onClick={expandCollapseClickHandler(index)}
                    >
                      <h2 className="mx-1 text-left text-s font-medium text-gray-900 tracking-wider">
                        {data}
                      </h2>
                      <br />
                      {expandCollapse[index] ? (
                        <MdUnfoldLess className="icons" />
                      ) : (
                        <MdUnfoldMore className="icons" />
                      )}
                    </div>
                    <hr />
                  </div>
                  {expandCollapse[index] &&
                    matches[index].map((data, index) => (
                      <div onClick={getGamesClickHandler(data)}>
                        <h1 className="mx-1 text-left text-s font-medium text-gray-300 tracking-wider">
                          {/*Match vs {data[1]}: {data[2]} {data[3]}{data[4] ? "!" : ""}*/}
							  {playerName} vs {data[1]}: {data[2]} {data[3]}
                          {data[4] ? "!" : ""}
                        </h1>
                      </div>
                    ))}
                </div>
              ))}
          </ul>
        </nav>
      </IconContext.Provider>
      {datesDiv && (
        <div className={sidebar ? "subnav-navbar" : "subnav"}>
          <input
            type="text"
            className="input"
            value={addDate}
            onChange={(e) => setAddDate(e.target.value)}
          />
          <span
            className="px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800"
            onClick={doAddDate}
          >
            Add Date
          </span>
        </div>
      )}
      {matchDiv && (
        <div className={sidebar ? "subnav-navbar" : "subnav"}>
          <span className="px-2 mx-2 inline-flex text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
            <div className="dropmenu">
              <div className="dropbtn">{matchDate}</div>
              <div className="dropmenu-content">
                {dates.map((data, index) => (
                  <span key={index} onClick={doSetMatchDate(data)}>
                    <p className="dropdown">{data}</p>
                  </span>
                ))}
              </div>
            </div>
          </span>
          <span className="px-2 mx-2 inline-flex text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
            <div className="dropmenu">
              <div className="dropbtn">{matchOpponent}</div>
              <div className="dropmenu-content">
                {opponents.map((data, index) => (
                  <span key={index} onClick={doSetMatchOpponent(data)}>
                    <p className="dropdown">{data}</p>
                  </span>
                ))}
              </div>
            </div>
          </span>
          <span className="px-2 mx-2 inline-flex text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
            <div className="dropmenu">
              <div className="dropbtn">{matchWinLoss}</div>
              <div className="dropmenu-content">
                {winLossList.map((data, index) => (
                  <span key={index} onClick={doSetMatchWinLoss(data)}>
                    <p className="dropdown">{data}</p>
                  </span>
                ))}
              </div>
            </div>
          </span>
          Match Score:
          <input
            type="text"
            className="input mx-2"
            size="1"
            value={matchScore}
            onChange={(e) => setMatchScore(e.target.value)}
          />
          Best Of:
          <input
            type="text"
            className="input mx-2"
            size="1"
            value={matchBestOf}
            onChange={(e) => setMatchBestOf(e.target.value)}
          />
          <span className="px-2 mx-2 inline-flex text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
            <div className="dropmenu">
              <div className="dropbtn">{matchGoodMatch}</div>
              <div className="dropmenu-content">
                {goodPointList.map((data, index) => (
                  <span key={index} onClick={doSetGoodMatch(data)}>
                    <p className="dropdown">{data}</p>
                  </span>
                ))}
              </div>
            </div>
          </span>
          <span
            className="px-2 mx-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800"
            onClick={doAddMatch}
          >
            Add Match
          </span>
        </div>
      )}
      {hasGame && (
        <div className={sidebar ? "video-sidebar" : "video"}>
          <div className="vidwrapper">
            <ReactPlayer
              key={key}
              played={played}
              playedSeconds={playedSeconds}
              playing={playing}
              seeking={seeking}
              progressInterval="8"
              playbackRate={playbackRate}
              ref={vidPlayer}
              width="auto%"
              height="auto%"
              url={url}
              controls="true"
              showPreview="true"
              config={{
                file: {
                  forceVideo: true,
                },
              }}
              onProgress={handleProgress}
            />
            <div className="vidcontrols">
              <table className="max-w-screen-sm">
                <tr className="max-w-screen-sm">
                  <td className="w-vidControls px-2 py-1 whitespace-normal text-sm text-gray-100">
                    <button onClick={nextFrame}>‹ Point</button>
                  </td>
                  <td className="w-vidControls px-2 py-1 whitespace-normal text-sm text-gray-100">
                    <button onClick={prevFrame}>‹ Frame</button>
                  </td>
                  <td className="w-vidControlsInput px-2 py-1 whitespace-normal text-sm text-gray-100">
                    <div className="vidflex">
                      <button onClick={currentTimeClickHandler(playedSeconds)}>
                        Current time:
                      </button>{" "}
                      <input
                        type="number"
                        className="input mx-2"
                        value={tempPlayedSeconds}
                        onChange={(e) =>
                          setTempPlayedSeconds(parseFloat(e.target.value))
                        }
                      />
                      <MdUpdate onClick={updatePlayedSeconds} />
                    </div>
                    {/*/!*</td>*!/{" "}*/}
                    {/*<button onClick={upadtePlayedSeconds}> Update</button>*/}
                  </td>
                  <td className="w-vidControls px-2 py-1 whitespace-normal text-sm text-gray-100">
                    <button onClick={nextFrame}>Frame ›</button>
                  </td>
                  <td className="w-vidControls px-2 py-1 whitespace-normal text-sm text-gray-100">
                    <button onClick={nextFrame}>Point ›</button>
                  </td>
                </tr>
                <tr className="max-w-screen-sm">
                  <td className="w-vidControls px-2 py-1 whitespace-normal text-sm text-gray-100">
                    <button onClick={setPlaybackRateButton(0.1)}>0.1x</button>
                  </td>
                  <td className="w-vidControls px-2 py-1 whitespace-normal text-sm text-gray-100">
                    <button onClick={setPlaybackRateButton(0.5)}>0.5x</button>
                  </td>
                  <td className="w-vidControlsInput px-2 py-1 whitespace-normal text-sm text-gray-100">
                    <div className="vidflex">
                      <button onClick={updatePlaybackRate}>
                        Playback rate:
                      </button>{" "}
                      <input
                        type="number"
                        className="input mx-2"
                        value={tempPlaybackRate}
                        onChange={(e) =>
                          setTempPlaybackRate(parseFloat(e.target.value))
                        }
                      />
                      <MdUpdate onClick={updatePlaybackRate} />
                    </div>
                    {/*<button onClick={updatePlaybackRate}> Check</button>*/}
                    {/*<br />*/}
                  </td>
                  <td className="w-vidControls px-2 py-1 whitespace-normal text-sm text-gray-100">
                    <button onClick={setPlaybackRateButton(1)}>1x</button>
                  </td>
                  <td className="w-vidControls px-2 py-1 whitespace-normal text-sm text-gray-100">
                    <button onClick={setPlaybackRateButton(1.5)}>1.5x</button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      )}
      {/*<br />*/}
      {hasMatch && (
        <div className="navwrapper">
          {games.map((data, index) => (
            <div
              className={
                gameData[1] === data[1] ? "navcontent-selected" : "navcontent"
              }
              onClick={selectGame(index)}
            >
              {/*<div className="navcontent" onClick={selectGame(index)}>*/}
              Game {data[1]}
            </div>
          ))}
          <div className="navcontent-addgame" onClick={doSetAddGame}>
            Add Game
          </div>
        </div>
      )}

      {addGame && (
        // <GameTable gameData={gameData} pointsData={pointsData} />
        <div className={sidebar ? "pointtable-navbar" : "pointtable"}>
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto">
              <div className="sm:px-6 lg:px-8">
                {/*<div className="py-2 align-middle inline-block sm:px-6 lg:px-8">*/}
                <div className="shadow overflow-hidden border border-gray-800 sm:rounded-lg">
                  <table className="min-w-max divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="w-tablescore px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        ></th>
                        <th
                          scope="col"
                          className="w-tablewinloss px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Win/Loss
                        </th>
                        <th
                          scope="col"
                          className="w-tablewinloss px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Game score
                        </th>
                        <th
                          scope="col"
                          className="w-table px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Game URL
                        </th>
                        <th
                          scope="col"
                          className="w-table px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Game Start Time
                        </th>
                        <th
                          scope="col"
                          className="w-table px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Good Game
                        </th>
                        <th
                          scope="col"
                          className="w-table px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Add Game
                        </th>
                        <th
                          scope="col"
                          className="w-tablenotes px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        />

                        <th
                          scope="col"
                          className="w-table px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        />
                        <th
                          scope="col"
                          className="w-table px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        />
                      </tr>
                    </thead>
                    <tbody className="bg-gray divide-y divide-gray-200">
                      <tr>
                        <td
                          scope="col"
                          className="w-tablescore px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        />
                        <td className="w-tablewinloss px-2 py-4 whitespace-normal text-sm text-gray-100">
                          <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                            <div className="dropmenu">
                              <div className="dropbtn">{gameWinLoss}</div>
                              <div className="dropmenu-content">
                                {winLossList.map((data, index) => (
                                  <span
                                    key={index}
                                    onClick={doSetGameWinLoss(data)}
                                  >
                                    <p className="dropdown">{data}</p>
                                  </span>
                                ))}
                              </div>
                            </div>
                          </span>
                        </td>
                        <td className="w-tablewinloss py-4 whitespace-normal text-sm text-gray-500">
                          <input
                            type="text"
                            className="input"
                            value={gameScore}
                            onChange={(e) => setGameScore(e.target.value)}
                          />
                        </td>
                        <td className="w-table py-4 whitespace-normal text-sm text-gray-500">
                          <input
                            type="text"
                            className="input"
                            value={gameUrl}
                            onChange={(e) => setGameUrl(e.target.value)}
                          />
                        </td>
                        <td className="w-table py-4 whitespace-normal text-sm text-gray-500">
                          <input
                            type="number"
                            className="input"
                            value={addGameStartTime}
                            onChange={(e) =>
                              setAddGameStartTime(e.target.value)
                            }
                          />
                        </td>
                        <td className="w-table py-4 whitespace-normal text-sm text-gray-500">
                          <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                            <div className="dropmenu">
                              <div className="dropbtn">{goodGame}</div>
                              <div className="dropmenu-content">
                                {goodPointList.map((data, index) => (
                                  <span
                                    key={index}
                                    onClick={doSetGoodGame(data)}
                                  >
                                    <p className="dropdown">{data}</p>
                                  </span>
                                ))}
                              </div>
                            </div>
                          </span>
                        </td>
                        <td className="w-table py-4 whitespace-normal text-sm text-gray-500">
                          <span
                            className="px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800"
                            onClick={doAddGame}
                          >
                            Add Game
                          </span>
                        </td>
                        {/*<td className="w-tablenotes py-4 whitespace-normal text-sm text-gray-500" />*/}
                        <td className="w-tablenotes py-4 whitespace-normal text-sm text-gray-500" />
                        <td className="w-table py-4 whitespace-normal text-sm text-gray-500" />
                      </tr>
                    </tbody>
                    <br />
                    <br />
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <br />
      {hasGame && (
        // <GameTable gameData={gameData} pointsData={pointsData} />
        <div className={sidebar ? "pointtable-navbar" : "pointtable"}>
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto">
              <div className="sm:px-6 lg:px-8">
                {/*<div className="py-2 align-middle inline-block sm:px-6 lg:px-8">*/}
                <div className="shadow overflow-hidden border border-gray-800 sm:rounded-lg">
                  <table className="min-w-max divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="w-tablescore px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Score
                        </th>
                        <th
                          scope="col"
                          className="w-tablewinloss px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Win/Loss
                        </th>
                        <th
                          scope="col"
                          className="w-tablewinloss px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Server
                        </th>
                        <th
                          scope="col"
                          className="w-table px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Serve Spin
                        </th>
                        <th
                          scope="col"
                          className="w-table px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Serve Length
                        </th>
                        <th
                          scope="col"
                          className="w-table px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Serve Placement
                        </th>
                        <th
                          scope="col"
                          className="w-table px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Opener
                        </th>
                        <th
                          scope="col"
                          className="w-table px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Opening type
                        </th>
                        <th
                          scope="col"
                          className="w-table px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Win by
                        </th>
                        <th
                          scope="col"
                          className="w-table px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Good point
                        </th>
                        <th
                          scope="col"
                          className="w-tablenotes px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Notes
                        </th>
                        <th
                          scope="col"
                          className="w-table px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Edit
                        </th>
                        <th
                          scope="col"
                          className="w-table px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Delete
                        </th>
                      </tr>
                    </thead>
                    {pointsData.length > 0 &&
                      pointsData.map((data, index) => (
                        <tbody
                          className="bg-gray divide-y divide-gray-200"
                          onClick={tableClickHandler(data[2])}
                        >
                          <td className="w-tablescore px-2 py-4 whitespace-normal text-sm text-gray-100">
                            {data[3]}
                          </td>
                          <td className="w-tablewinloss py-4 whitespace-normal text-sm text-gray-500">
                            <span
                              className={
                                data[4] === "Win"
                                  ? "px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800"
                                  : "px-2 inline-flex text-xs font-semibold rounded-full bg-red-100 text-red-800"
                              }
                            >
                              {data[4]}
                            </span>
                          </td>
                          <td className="w-tablewinloss py-4 whitespace-normal">
                            <span
                              className={
                                data[5] === "Opponent"
                                  ? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"
                                  : "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                              }
                            >
                              {data[5]}
                            </span>
                          </td>
                          <td className="w-table px-2 py-4 whitespace-normal">
                            {data[6] === "No spin" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                No spin
                              </span>
                            ) : null}
                            {data[6] === "Under" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Under
                              </span>
                            ) : null}
                            {data[6] === "Side Under" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                Side-Under
                              </span>
                            ) : null}
                            {data[6] === "Side" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Side
                              </span>
                            ) : null}
                            {data[6] === "Side Top" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-pink-100 text-pink-800">
                                Side-Top
                              </span>
                            ) : null}
                            {data[6] === "Top" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                Top
                              </span>
                            ) : null}
                          </td>
                          <td className="w-table px-2 py-4 whitespace-normal">
                            {data[7] === "Long" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                Long
                              </span>
                            ) : null}
                            {data[7] === "Half Long" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Half-long
                              </span>
                            ) : null}
                            {data[7] === "Short" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Short
                              </span>
                            ) : null}
                          </td>
                          <td className="w-table px-2 py-4 whitespace-normal">
                            {data[8] === "Forehand" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                Forehand
                              </span>
                            ) : null}
                            {data[8] === "Middle" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Middle
                              </span>
                            ) : null}
                            {data[8] === "Backhand" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Backhand
                              </span>
                            ) : null}
                          </td>
                          <td className="w-table px-2 py-4 whitespace-normal">
                            {data[9] === "Me" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Me
                              </span>
                            ) : null}
                            {data[9] === "Opponent" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                Opponent
                              </span>
                            ) : null}
                            {data[9] === "N/A" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                N/A
                              </span>
                            ) : null}
                          </td>
                          <td className="w-table px-2 py-4 whitespace-normal">
                            {data[10] === "FH Flick" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                                FH Flick
                              </span>
                            ) : null}
                            {data[10] === "BH Flick" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                                BH Flick
                              </span>
                            ) : null}
                            {data[10] === "FH Loop" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                FH Loop
                              </span>
                            ) : null}
                            {data[10] === "BH Loop" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                BH Loop
                              </span>
                            ) : null}
                            {data[10] === "N/A" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                N/A
                              </span>
                            ) : null}
                          </td>
                          <td className="w-table px-2 py-4 whitespace-normal">
                            {data[11] === "Serve" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-pink-100 text-pink-800">
                                Serve
                              </span>
                            ) : null}
                            {data[11] === "Push" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Push
                              </span>
                            ) : null}
                            {data[11] === "Opening Loop" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Opening Loop
                              </span>
                            ) : null}
                            {data[11] === "Block" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                                Block
                              </span>
                            ) : null}
                            {data[11] === "Rally" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                                Rally
                              </span>
                            ) : null}
                            {data[11] === "Counterloop" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                Counterloop
                              </span>
                            ) : null}
                            {data[11] === "Lob" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                Lob
                              </span>
                            ) : null}
                            {data[11] === "Luck" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                Luck
                              </span>
                            ) : null}
                          </td>
                          <td className="w-table px-2 py-4 whitespace-normal">
                            <span
                              className={
                                data[12] === "Yes"
                                  ? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                                  : "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                              }
                            >
                              {data[12]}
                            </span>
                          </td>
                          <td className="w-tablenotes px-2 py-4 whitespace-normal text-sm text-gray-300">
                            {data[13]}
                          </td>
                          <td className="w-table px-2 py-4 whitespace-normal">
                            <span
                              className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"
                              onClick={editClick(data)}
                            >
                              Edit
                            </span>
                          </td>
                          <td className="w-table px-2 py-4 whitespace-normal">
                            <span
                              className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                              onClick={deleteClick(data[1])}
                            >
                              Delete
                            </span>
                          </td>
                        </tbody>
                      ))}
                    {/*<tbody className="bg-gray divide-y divide-gray-200">*/}
                    <tr>
                      <td className="w-tablescore px-2 py-4 whitespace-normal text-sm text-gray-100">
                        <input
                          value={score}
                          type="text"
                          className="input"
                          size="2"
                          onChange={(e) => setScore(e.target.value)}
                        />
                      </td>
                      <td className="w-tablewinloss py-4 whitespace-normal text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                          <div className="dropmenu">
                            <div className="dropbtn">{winLoss}</div>
                            <div className="dropmenu-content">
                              {winLossList.map((data, index) => (
                                <span key={index} onClick={doSetWL(data)}>
                                  <p className="dropdown">{data}</p>
                                </span>
                              ))}
                            </div>
                          </div>
                        </span>
                      </td>
                      <td className="w-tablewinloss py-4 whitespace-normal text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                          <div className="dropmenu">
                            <div className="dropbtn">{server}</div>
                            <div className="dropmenu-content">
                              {serverList.map((data, index) => (
                                <span key={index} onClick={doSetServer(data)}>
                                  <p className="dropdown">{data}</p>
                                </span>
                              ))}
                            </div>
                          </div>
                        </span>
                      </td>
                      <td className="w-tablewinloss py-4 whitespace-normal text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                          <div className="dropmenu">
                            <div className="dropbtn">{serveSpin}</div>
                            <div className="dropmenu-content">
                              {serveSpinList.map((data, index) => (
                                <span
                                  key={index}
                                  onClick={doSetServeSpin(data)}
                                >
                                  <p className="dropdown">{data}</p>
                                </span>
                              ))}
                            </div>
                          </div>
                        </span>
                      </td>
                      <td className="w-tablewinloss py-4 whitespace-normal text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                          <div className="dropmenu">
                            <div className="dropbtn">{serveLength}</div>
                            <div className="dropmenu-content">
                              {serveLengthList.map((data, index) => (
                                <span
                                  key={index}
                                  onClick={doSetServeLength(data)}
                                >
                                  <p className="dropdown">{data}</p>
                                </span>
                              ))}
                            </div>
                          </div>
                        </span>
                      </td>
                      <td className="w-tablewinloss py-4 whitespace-normal text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                          <div className="dropmenu">
                            <div className="dropbtn">{servePlacement}</div>
                            <div className="dropmenu-content">
                              {servePlacementList.map((data, index) => (
                                <span
                                  key={index}
                                  onClick={doSetServePlacement(data)}
                                >
                                  <p className="dropdown">{data}</p>
                                </span>
                              ))}
                            </div>
                          </div>
                        </span>
                      </td>
                      <td className="w-tablewinloss py-4 whitespace-normal text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                          <div className="dropmenu">
                            <div className="dropbtn">{opener}</div>
                            <div className="dropmenu-content">
                              {openerList.map((data, index) => (
                                <span key={index} onClick={doSetOpener(data)}>
                                  <p className="dropdown">{data}</p>
                                </span>
                              ))}
                            </div>
                          </div>
                        </span>
                      </td>
                      <td className="w-tablewinloss py-4 whitespace-normal text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                          <div className="dropmenu">
                            <div className="dropbtn">{openingType}</div>
                            <div className="dropmenu-content">
                              {openingTypeList.map((data, index) => (
                                <span
                                  key={index}
                                  onClick={doSetOpeningType(data)}
                                >
                                  <p className="dropdown">{data}</p>
                                </span>
                              ))}
                            </div>
                          </div>
                        </span>
                      </td>
                      <td className="w-tablewinloss py-4 whitespace-normal text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                          <div className="dropmenu">
                            <div className="dropbtn">{winBy}</div>
                            <div className="dropmenu-content">
                              {winByList.map((data, index) => (
                                <span key={index} onClick={doSetWinBy(data)}>
                                  <p className="dropdown">{data}</p>
                                </span>
                              ))}
                            </div>
                          </div>
                        </span>
                      </td>
                      <td className="w-tablewinloss py-4 whitespace-normal text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                          <div className="dropmenu">
                            <div className="dropbtn">{goodPoint}</div>
                            <div className="dropmenu-content">
                              {goodPointList.map((data, index) => (
                                <span
                                  key={index}
                                  onClick={doSetGoodPoint(data)}
                                >
                                  <p className="dropdown">{data}</p>
                                </span>
                              ))}
                            </div>
                          </div>
                        </span>
                      </td>
                      <td className="w-tablenotes px-2 py-4 whitespace-normal text-sm text-gray-300">
                        <textarea
                          value={notes}
                          className="notes"
                          onChange={(e) => setNotes(e.target.value)}
                        />
                      </td>
                      <td className="w-table px-2 py-4 whitespace-normal">
                        <input
                          value={timestamp}
                          type="text"
                          className="input"
                          size="2"
                          onChange={(e) => setTimestamp(e.target.value)}
                        />
                      </td>
                      <td className="w-table px-2 py-4 whitespace-normal">
                        <span
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                          onClick={addPoint}
                        >
                          Add
                        </span>
                      </td>
                    </tr>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    {/*</tbody>*/}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/*<GameNav gameData={games}/>*/}
    </div>
  );
}

export default VideoNotesView;
