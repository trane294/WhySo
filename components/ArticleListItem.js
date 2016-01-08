'use strict';

var React = require('react-native');
var TimeAgo = require('react-native-timeago');
var ActivityView = require('react-native-activity-view');

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
    _handleShareButton() {
        var {article} = this.props;
        ActivityView.show({
            text: article.title,
            url: 'https://whysoapp.com',
            imageUrl: article.image
        });
    },
    renderMain() {
        var {article} = this.props;

        return (
            <View style={{flex: 1}}>
                <TouchableHighlight onPress={this.handleSelectArticle}>
                    <View style={{flex: 1}}>
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
            </View>
        )
    },
    renderButtons() {
        return (
            <TouchableHighlight onPress={this._handleShareButton}>
                <View>
                    <Image style={styles.share} resizeMode="contain" source={require('image!share')}/>
                </View>
            </TouchableHighlight>
        )
    },
    render() {
        return (
            <View style={[styles.row, styles.itemRow]}>
                {this.renderMain()}
                {this.renderButtons()}
            </View>
        )
    }
})

var styles = StyleSheet.create({
    row: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    itemRow: {
        height: IMAGE_HEIGHT,
        alignItems: 'stretch'
    },
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
        top: 8, right: 8,
        backgroundColor: 'transparent',
        width: 30,
        height: 30
    }
})

module.exports = ArticleListItem
