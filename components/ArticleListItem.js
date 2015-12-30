'use strict';

var React = require('react-native');
var TimeAgo = require('react-native-timeago');

var {
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    TouchableHighlight
} = React

var WINDOW_HEIGHT = Dimensions.get('window').height;
var IMAGE_WIDTH = Dimensions.get('window').width;
var IMAGE_HEIGHT = IMAGE_WIDTH / 2;

// <Image style={styles.share} source={require('../icons/share.png')}/>

var ArticleListItem = React.createClass({
    handleSelectArticle() {
        this.props.onSelectArticle(this.props.article)
    },
    render() {
        var {article} = this.props;
        
        return (
            <TouchableHighlight onPress={this.handleSelectArticle}>
                <View>
                    <Image
                        style={styles.image}
                        source={{ uri: article.image }}
                    />
                    <View style={styles.overlay}>
                        <Text style={styles.title}>{article.title}</Text>
                    </View>
                    <TimeAgo style={styles.created} time={article.created} />
                </View>
            </TouchableHighlight>
        )
    }
})

var styles = StyleSheet.create({
    image: {
        height: IMAGE_HEIGHT
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0
    },
    created: {
        position: 'absolute',
        bottom: 10, right: 15,
        color: 'white',
        opacity: 0.5,
        backgroundColor: 'transparent',
        fontSize: 10
    },
    title: {
        fontFamily: 'BebasNeueBold',
        marginTop: 40,
        marginRight: 100,
        marginLeft: 25,
        fontSize: 20,
        lineHeight: 25,
        fontWeight: '400',
        color: 'white',
    },
    share: {
        position: 'absolute',
        top: 0, left: 0,
        backgroundColor: 'transparent'
    }
})

module.exports = ArticleListItem
