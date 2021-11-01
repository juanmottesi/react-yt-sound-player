import React, { ChangeEvent, useEffect, useState } from 'react'
import { BUFFERING, ENDED, PAUSED, PlayerStateType, PLAYING, UNSTARTED, VIDEOCUED } from '../utilities/PlayerStates'
import PlayerButton from './PlayerButton'

import '../styles/Player.css';
import { EmptyYoutubePlayer, YoutubePlayerInterface } from '../types/YoutubePlayer'
import { parseDuration } from '../utilities/parse';

const Player = ({ songs = [], start = 0 }) => {
  const [currentSong, setCurrentSong] = useState(start)
  const [duration, setDuration] = useState(0)
  const [player, setPLayer] = useState<YoutubePlayerInterface>(EmptyYoutubePlayer)
  const [playerState, setPlayerState] = useState<PlayerStateType>(UNSTARTED)
  const [currentTime, setCurrentTime] = useState(0)

  // console.log(player);

  const handlePlaying = () => setDuration(player.getDuration())
  const handleEnd = () => nextSong()
  const handleStateChange = (event:any) => setPlayerState(event.data)

  useEffect(() => {
    const handleStates = {
      [PLAYING]: handlePlaying,
      [ENDED]: handleEnd,
      [PAUSED]: () => console.log(PAUSED),
      [BUFFERING]: () => console.log(BUFFERING),
      [VIDEOCUED]: () => console.log(VIDEOCUED),
      [UNSTARTED]: () => console.log(UNSTARTED),
    };
    handleStates[playerState]()
  }, [playerState])

  
  const startPlayer = () => {
    setPLayer(
      new window.YT.Player('player', {
        height: '0',
        width: '0',
        videoId: songs[currentSong],
        events: {
          onReady: (event: any) => event.target.playVideo(),
          onStateChange: handleStateChange
        }
      })
    )
  }

  const loadPlayer = () => {
    const tag = document.createElement("script");
    tag.id = "youtubeApi";
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    // eslint-disable-next-line no-unused-expressions
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    window.onYouTubeIframeAPIReady = () => startPlayer();
  }

  useEffect(() => {
    const progressInterval = setInterval(() => {
      if (player) {
        setCurrentTime(player.getCurrentTime())
      }
    }, 1000)
    return () => clearInterval(progressInterval)
  }, [player])

  useEffect(() => loadPlayer(), [])

  useEffect(() => {
    player.loadVideoById(songs[0], 0, "small");
    setCurrentSong(0);
  }, [songs]);

  const play = () => player.playVideo()
  const pause = () => player.pauseVideo()

  const nextSong = () => {
    if (songs.length <= currentSong + 1) return
    player.loadVideoById(songs[currentSong + 1], 0, 'small')
    setCurrentSong((prevState) => prevState + 1)
  }

  const prevSong = () => {
    if (currentSong === 0) return player.seekTo(0, true)
    player.loadVideoById(songs[currentSong - 1], 0, 'small')
    setCurrentSong((prevState) => prevState - 1)
  }

  const seek = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    const seek = parseFloat(value)
    setCurrentTime(seek)
    player.seekTo(seek, true)
  }

  return (
    <div className="playerContainer">
      <div id="player" />
      <div className="actionPanelContainer">
        <PlayerButton onClick={prevSong} type="prev" />
        {playerState !== PLAYING ? (
          <PlayerButton onClick={play} type="play" />
        ) : (
          <PlayerButton onClick={pause} type="pause" />
        )}
        <PlayerButton onClick={nextSong} type="next" />
      </div>
      <div className="durationRange">
        <span>{parseDuration(currentTime)}</span>
        <input
          className="input-bar"
          style={{
            background: `linear-gradient(to right, #959595 0%, #959595 ${
              (currentTime * 100) / (duration || 1)
            }%, #e1e1e1 ${(currentTime * 100) / (duration || 1)}%, #e1e1e1 100%)`,
          }}
          onChange={seek}
          type="range"
          min="0"
          max={duration}
          step="any"
          value={currentTime}
        />
        <span>{parseDuration(duration)}</span>
      </div>
    </div>
  );
}

export default Player