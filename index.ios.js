'use strict'

// react-native bundle --entry-file index.ios.js --platform ios --dev false --bundle-output ios/app/production.jsbundle --assets-dest /Users/trane294/WhySo/ios/App/Images.xcassets
// curl 'http://192.168.0.10:8081/index.ios.bundle?platform=ios&dev=false' -o main.jsbundle

var React = require('react-native')
var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Text,
  View,
  StatusBarIOS
} = React

var Routes = require('./Routes')

var App = React.createClass({
    render: function() {
        StatusBarIOS.setStyle(1);
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
