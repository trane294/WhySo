/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Routes = require('../Routes');
var HTMLView = require('react-native-htmlview');

var {
  StyleSheet,
  Text,
  Image,
  View,
  Component,
  WebView,
  Dimensions,
  ScrollView
} = React;

var IMAGE_WIDTH = Dimensions.get('window').width;
var IMAGE_HEIGHT = IMAGE_WIDTH / 2;

class ArticleScreen extends Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <View>
                    <Image source={{ uri: this.props.image }} style={styles.bgImage} />
                    <View style={styles.overlay}>
                        <Text style={styles.title}>{this.props.title}</Text>
                    </View>
                </View>
                <View
                    style={styles.mainText}>
                    <Text style={styles.text}>{this.props.text}</Text>
                </View>
            </ScrollView>
        );
    }
};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e3e3e3'
    },
    bgImage: {
        flex: 1,
        height: IMAGE_HEIGHT,
    },
    mainText: {
        flex: 1,
        padding: 20,
    },
    text: {
        fontFamily: 'BreeSerif-Regular',
        fontSize: 16,
        color: '#717070'
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0
    },
    title: {
        marginTop: 40,
        marginRight: 100,
        marginLeft: 25,
        fontSize: 20,
        lineHeight: 25,
        fontWeight: '400',
        color: 'white',
        fontFamily: 'BebasNeueBold'
    },
});

module.exports = ArticleScreen
