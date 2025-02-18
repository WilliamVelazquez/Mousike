import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Player from './Player/Player';
import { GlobalStyle } from '../../GlobalStyles';

const MainContainer = styled.main`
    color: #0B0B0B;
    font-family: "Roboto Mono", monospace;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    perspective: 1000px;
    transform-style: preserve-3d;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    align-content: center;
    position: relative;
    width: 100%;
    height: 100%;
    padding: 12px;
`;

const Container = styled.div`
    color: #0B0B0B;
    font-family: "Roboto Mono", monospace;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    transform-style: preserve-3d;
`;

const PlayerWrapper = styled.div`
    color: #0B0B0B;
    text-rendering: optimizeLegibility;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    position: relative;
    z-index: 3;
    width: 100%;
    max-width: 600px;
   
`;

const FrontArt = styled.img`
    color: #0B0B0B;
    
    width: 100%;
`;

const ControlsTop = styled.div`
    color: #0B0B0B;
    font-family: "Roboto Mono", monospace;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    text-align: center;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    transform-style: preserve-3d;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    align-content: center;
    width: 100%;
    justify-content: space-around;
    padding: 12px;
`;
const ControlsButton = styled.a`
    color: white;
`;
const Info = styled.div`
    color: white; 
    text-align: center;
    padding: 12px;

`;

const FullPlayer = (props) => {

  const [state, setState] = useState({
    playing: props.playing,
    isPlaying: false,
    trends: props.trends,
  });

  const pause = (cb) => {
    console.log('pause');
    console.log('pausing');
    if (state.isPlaying) {
      const player = document.getElementById('player');
      player.pause();
      setState({
        isPlaying: false,
      }, () => {
        cb && cb();
      });
      //   },
      // );
    }
  };
  const play = () => {
    console.log('playing');
    const player = document.getElementById('player');
    console.log(state);
    const { isPlaying, playing, trends } = state;
    // const playlist =
    const song = playing.playlist.songNumber ? playing.playlist[playing.songNumber] : trends[0];
    const { url } = song.images[0];

    if (url) {
      if (isPlaying) {
        pause();
        setTimeout(() => {
          player.play().then((response) => {
            setState({
              isPlaying: true,
            });
          })
            .catch(
              (err) => {
                console.log(err);
              },
            );
        }, 0);

      } else {
        player.play().then(
          () => {
            setState({
              isPlaying: true,
            });
          },
        );
      }

    } else {
      // this.nextSong();
    }
  };

  const togglePlay = (event) => {
    event.preventDefault();
    const player = document.getElementById('player');
    if (player.paused) {
      console.log('play');
      play();
    } else {
      console.log('pause');
      pause();
    }
  };

  const { playing } = props;
  let song;
  playing.songNumber ? song = playing.playlist[playing.songNumber] : song = props.song;

  //   const { song } = props;
  const { name, artist } = song;
  const { url } = song.images[0];
  console.log(song);
  //   const { prevHandler, nextHandler, togglePlayHandler, song, img } = props;
  //   const { name, artist } = song;
  return (
    <MainContainer className="pre-enter">
      <GlobalStyle />
      <div className="background">
        <div />
      </div>
      <Container className="container">
        <PlayerWrapper className="player">
          <div className="front">
            {/* <FrontArt className="art" alt="art" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/345377/thousand-thursday%402x.jpg" /> */}
            <FrontArt className="art" alt="art" src={url} />
            <Player />
            <div className="meta">
              {/* <ControlsTop className="controls top">
                <ControlsButton href="/" className="rewind skip">
                  <i style={{ 'fontSize': '30px' }} className="fas fa-backward" />
                </ControlsButton>
                <ControlsButton href="/" className="play" onClick={togglePlay}>
                  <i style={{ 'fontSize': '40px', 'marginTop': '3px' }} className="fas fa-play" />
                </ControlsButton>
                <ControlsButton href="/" className="forward skip">
                  <i style={{ 'fontSize': '30px' }} className="fas fa-forward" />
                </ControlsButton>
              </ControlsTop> */}
              <Info className="info">
                <h1>{name}</h1>
                <h2>{artist}</h2>
              </Info>

            </div>
          </div>
        </PlayerWrapper>
      </Container>
    </MainContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    playing: state.playing,
    trends: state.trends,
  };
};

export default connect(mapStateToProps, null)(FullPlayer);

