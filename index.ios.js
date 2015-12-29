'use strict'

// react-native bundle --entry-file index.ios.js --platform ios --dev false --bundle-output ios/app/production.jsbundle

var React = require('react-native')
var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Text,
  View
} = React

var Routes = require('./Routes')

var App = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        barTintColor='#234465'
        titleTextColor='#fff'
        tintColor='#fff'
        style={styles.container}
        initialRoute={Routes.TopStories()}
      />
    )
  }
})

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

AppRegistry.registerComponent('App', () => App)
