import React from 'react'
import { AppState, View } from 'react-native'
import { WebView } from 'react-native'
import styled from 'styled-components'

const Wrap = styled.View`
  flex: 1;
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

  render() {
    const { isForeground } = this.state
    return (
      <Wrap>
        {isForeground ? (
          <MyWebView
            source={{
              html: `
                      <html>
                        <iframe width="100%" height="800" src="https://www.youtube.com/embed/v8y5qgWllT8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                      </html>
                    `
            }}
            scrollEnabled={false}
            javaScriptEnabled={true}
          />
        ) : null}
      </Wrap>
    )
  }
}
