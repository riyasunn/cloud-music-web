import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setImageSize,
  formatDate,
  getPlaySong,
} from "../../../utils/format-utils";

import { NavLink } from "react-router-dom";
import { Slider } from "antd";
import { PlayerBarWrapper, Control, PlayInfo, Operator } from "./style";
import {
  getSongDeatilAction,
  changeSequenceAction,
  changeMusicAction,
  changeCurrentLyricIndexAction,
} from "../store/action";
import {
  selectCurrentSong,
  selectPlayList,
  selectSequence,
  selectLyricList,
  selectCurrentLyricIndex,
} from "../store/selector";
import PlayerPanel from "../player-panel";
// import { getSongDetail } from '../../../services/player';

const PlayerBar = memo(() => {
  //props and state:
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  //redux hooks:
  const dispatch = useDispatch();
  const currentSong = useSelector(selectCurrentSong);
  // console.log("playBar currentSong", currentSong);
  const sequence = useSelector(selectSequence);
  const playList = useSelector(selectPlayList);
  // console.log("player-bar-count", playList.length);
  const lyricList = useSelector(selectLyricList);
  // console.log("lyricList", lyricList);
  const currentLyricIndex = useSelector(selectCurrentLyricIndex);
  //other hooks:
  const audioRef = useRef();

  useEffect(() => {
    // getSongDetail(247579).then(res => console.log("get song info", res) )
    dispatch(getSongDeatilAction(1355394805));
  }, [dispatch]);

  useEffect(() => {
    audioRef.current.src = getPlaySong(currentSong.id);
    // audioRef.current.play().then(res => {
    //     setIsPlaying(true);
    // }).catch(err => {
    //     setIsPlaying(false);
    //     // alert("Sorry, no copyright in your region.")
    // })
  }, [currentSong]);

  //other handle:
  const songPic = (currentSong.al && currentSong.al.picUrl) || "";
  const singerName = (currentSong.ar && currentSong.ar[0].name) || "Unknown";
  const duration = currentSong.dt || 0;
  const showDuration = formatDate(duration, "mm:ss");
  const showCurrentTime = formatDate(currentTime, "mm:ss");

  //handle function:
  const playMusic = useCallback(() => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const timeUpdate = (e) => {
    // console.log("timeupdate current-time: ",e.target.currentTime);
    const currentTime = e.target.currentTime * 1000;
    if (!isChanging) {
      // console.log("progress value when not change slider: ", currentTime, currentTime / duration * 100);
      setCurrentTime(currentTime);
      setProgress((currentTime / duration) * 100);
    }
    //make current lyric correspond to the song's currentTime:
    let i = 0;
    for (; i < lyricList.length; i++) {
      let lyricItem = lyricList[i];
      if (currentTime < lyricItem.time) {
        // console.log("currentTime", currentTime);
        break;
      };
    }
    // console.log("currentLyric: ", lyricList[i - 1]);

    if (currentLyricIndex !== i-1) {
        dispatch(changeCurrentLyricIndexAction(i-1));
        // console.log("lyric", lyricList[i-1]);
    }
    
  };

  const changeSequence = () => {
    let currentSequence = sequence + 1;
    if (currentSequence > 2) {
      currentSequence = 0;
    }
    dispatch(changeSequenceAction(currentSequence));
  };

  const handleMusicEnded = () => {
    setIsPlaying(false);
    if (sequence === 2) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      dispatch(changeMusicAction(1));
    }
  };

  const sliderChange = useCallback(
    (value) => {
      // console.log("change value", value);
      setIsChanging(true);
      const duringChangeCurrentTime = (value / 100) * duration;
      setCurrentTime(duringChangeCurrentTime);
      setProgress(value);
    },
    [duration]
  );

  const sliderAfterChange = useCallback(
    (value) => {
      // console.log("end", value);
      const currentTimeAfterChange = ((value / 100) * duration) / 1000;
      audioRef.current.currentTime = currentTimeAfterChange;
      // console.log("after change music current-time", audioRef.current.currentTime )
      setCurrentTime(currentTimeAfterChange * 1000);
      // console.log("after change display current-time", currentTime);
      setIsChanging(false);

      if (!isPlaying) {
        playMusic();
      }
    },
    [duration, isPlaying, playMusic]
  );

  return (
    <PlayerBarWrapper className="sprite_player">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button
            className="sprite_player prev "
            onClick={(e) => dispatch(changeMusicAction(-1))}
          ></button>
          <button className="sprite_player play " onClick={playMusic}></button>
          <button
            className="sprite_player next "
            onClick={(e) => dispatch(changeMusicAction(1))}
          ></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink to="/discover/player">
              <img src={setImageSize(songPic, 34)} alt="" />
              <div className="sprite_player cover"></div>
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <a href="/待更新" className="song-name">
                {currentSong.name}
              </a>
              <a href="/待更新" className="artiest-name">
                {singerName}
              </a>
            </div>
            <div className="progress">
              <Slider
                value={progress}
                onChange={sliderChange}
                onAfterChange={sliderAfterChange}
              />
              <div className="time">
                <span className="now-time">{showCurrentTime}</span>
                <span className="divider">/</span>
                <span className="duration">{showDuration}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator sequence={sequence}>
          <div className="left">
            <button className="sprite_player btn favor"></button>
            <button className="sprite_player btn share"></button>
          </div>
          <div className="right sprite_player">
            <button className="sprite_player btn volume"></button>
            <button
              className="sprite_player btn loop"
              onClick={(e) => changeSequence()}
            ></button>
            <button className="sprite_player btn play-list"></button>
            <p className="count">{playList.length}</p>
          </div>
        </Operator>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => timeUpdate(e)}
        onEnded={(e) => handleMusicEnded()}
      />
      <PlayerPanel/>
    </PlayerBarWrapper>
  );
});

export default PlayerBar;
