import React from 'react'
import { AppState, View } from 'react-native'
import { WebView } from 'react-native'
import styled from 'styled-components'

const Wrap = styled.View`
  height: 500px;
  padding-top: 40px;
`

const MyWebView = styled.WebView`
  flex: 1;
`

export default class App extends React.Component {
  state = {
    isForeground: true
  }

  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  _handleAppStateChange = nextAppState =>
    this.setState({ isForeground: nextAppState === 'active' })

  onNavigationStateChange = navigator => {
    // prevent navigate, for Android
    // NOTE: screen flutterring
    const { url } = navigator
    if (
      url !== 'about:blank' &&
      url.indexOf('https://www.youtube.com/embed/v8y5qgWllT8') !== 0
    ) {
      this.WebView.goBack()
    }
  }

  render() {
    const { isForeground } = this.state
    return (
      <Wrap>
        {isForeground ? (
          <MyWebView
            ref={c => (this.WebView = c)}
            source={{
              // uri:
              //   'https://www.youtube.com/embed/v8y5qgWllT8?rel=0&autoplay=0&showinfo=0&controls=0'
              html: `<!DOCTYPE html>
                <html>
                  <body>
                    <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
                    <div id="player"></div>

                    <script>
                      // 2. This code loads the IFrame Player API code asynchronously.
                      var tag = document.createElement('script');

                      tag.src = "https://www.youtube.com/iframe_api";
                      var firstScriptTag = document.getElementsByTagName('script')[0];
                      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                      // 3. This function creates an <iframe> (and YouTube player)
                      //    after the API code downloads.
                      var player;
                      function onYouTubeIframeAPIReady() {
                        player = new YT.Player('player', {
                          height: '360',
                          width: '640',
                          videoId: 'v8y5qgWllT8',
                          events: {
                            'onReady': onPlayerReady,
                            'onStateChange': onPlayerStateChange
                          }
                        });
                      }

                      // 4. The API will call this function when the video player is ready.
                      function onPlayerReady(event) {
                        event.target.playVideo();
                      }

                      // 5. The API calls this function when the player's state changes.
                      //    The function indicates that when playing a video (state=1),
                      //    the player should play for six seconds and then stop.
                      var done = false;
                      function onPlayerStateChange(event) {
                        if (event.data == YT.PlayerState.PLAYING && !done) {
                          setTimeout(stopVideo, 6000);
                          done = true;
                        }
                      }
                      function stopVideo() {
                        player.stopVideo();
                      }
                    </script>
                  </body>
                </html>`
            }}
            onNavigationStateChange={this.onNavigationStateChange}
            // startInLoadingState
            scalesPageToFit
            javaScriptEnabled
            onShouldStartLoadWithRequest={({ url }) => {
              // iOS Only
              console.log(url)
              return (
                url === 'about:blank' ||
                url.indexOf('https://www.youtube.com/embed/v8y5qgWllT8') === 0
              )
            }}
            style={{ flex: 1 }}
          />
        ) : null}
      </Wrap>
    )
  }
}
