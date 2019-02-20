import React from 'react'
import { AppState, View } from 'react-native'
import { WebView } from 'react-native'
import styled from 'styled-components'

const Wrap = styled.View`
  height: 500px;
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

  onNavigationStateChange = navigator => console.log(navigator)

  render() {
    const { isForeground } = this.state
    return (
      <Wrap>
        {isForeground ? (
          <MyWebView
            source={{
              uri:
                'https://www.youtube.com/embed/v8y5qgWllT8?rel=0&autoplay=0&showinfo=0&controls=0'
            }}
            onNavigationStateChange={this.onNavigationStateChange}
            startInLoadingState
            scalesPageToFit
            javaScriptEnabled
            style={{ flex: 1 }}
          />
        ) : null}
      </Wrap>
    )
  }
}
