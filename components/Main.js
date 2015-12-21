var React = require('react-native');
var RefreshableListView = require('react-native-refreshable-listview');
var TimeAgo = require('react-native-timeago');

var {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    Dimensions,
    ActivityIndicatorIOS,
    TouchableHighlight
} = React;

var Firebase = require('firebase');
var Routes = require('../Routes')
var WINDOW_HEIGHT = Dimensions.get('window').height;
var IMAGE_WIDTH = Dimensions.get('window').width;
var IMAGE_HEIGHT = IMAGE_WIDTH / 2;

var Main = React.createClass({
    getInitialState: function () {
        return {
            isLoadingTail: false,
            isLoading: true,
            loadMore: true,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            lastTs: 0
        };
    },
    componentWillMount: function() {
        this.firebaseRef = new Firebase('https://whyapp.firebaseio.com/articles');
        this.firebaseRef.orderByChild('created').limitToLast(10).once('value', function(dataSnapshot) {
            var items = [];
            dataSnapshot.forEach(function(childSnapshot) {
                var item = childSnapshot.val();
                item['.key'] = childSnapshot.key();
                items.push(item);
            }.bind(this));

            this._data = [];
            this.setState({
                isLoading: false,
                lastTs: items[0].created,
                dataSource: this.getDataSource(items.reverse())
            });
        }.bind(this));
    },
    componentWillUnmount: function() {
        this.firebaseRef.off();
    },
    goToArticle(story) {
        this.props.navigator.push(Routes.Article(story))
    },
    renderRow: function (item) {
        return (
            <TouchableHighlight onPress={() => this.goToArticle(item)}>
                <View>
                    <Image
                        style={styles.image}
                        source={{ uri: item.image }}
                    />
                    <View style={styles.overlay}>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                    <TimeAgo style={styles.created} time={item.created} />
                </View>
            </TouchableHighlight>
        );
    },
    onEndReached: function () {
        if (this.state.isLoadingTail) {
            // We're already fetching
            return;
        }
        this.setState({
            isLoadingTail: true
        });

        if (this.state.loadMore == true) {
            this.firebaseRef = new Firebase('https://whyapp.firebaseio.com/articles');
            this.firebaseRef.orderByChild('created').endAt(this.state.lastTs-1).limitToLast(10).once('value', function(dataSnapshot) {
                var items = [];
                dataSnapshot.forEach(function(childSnapshot) {
                    var item = childSnapshot.val();
                    item['.key'] = childSnapshot.key();
                    items.push(item);
                }.bind(this));

                if (dataSnapshot.val() < 7)  {
                    this.setState({
                        isLoadingTail: false,
                        loadMore: false,
                        dataSource: this.getDataSource(items.reverse())
                    });
                } else {
                    this.setState({
                        isLoadingTail: false,
                        lastTs: items[0].created,
                        dataSource: this.getDataSource(items.reverse())
                    });
                }

                }.bind(this));
        }
    },
    reload: function() {
        if (this.state.isLoadingTail) {
            // We're already fetching
            return;
        }
        this.setState({
            loadMore: true,
            isLoadingTail: true
        });

        this.firebaseRef = new Firebase('https://whyapp.firebaseio.com/articles');
        this.firebaseRef.orderByChild('created').limitToLast(10).once('value', function(dataSnapshot) {
            var items = [];
            dataSnapshot.forEach(function(childSnapshot) {
                var item = childSnapshot.val();
                item['.key'] = childSnapshot.key();
                items.push(item);
            }.bind(this));

            this._data = [];
            this.setState({
                lastTs: 0,
                dataSource: new ListView.DataSource({
                    rowHasChanged: (row1, row2) => row1 !== row2,
                })
            });
            this.setState({
                isLoadingTail: false,
                lastTs: items[0].created,
                dataSource: this.getDataSource(items.reverse())
            });
        }.bind(this));
    },
    getDataSource: function (users):ListView.DataSource {
        this._data = this._data.concat(users);
        return this.state.dataSource.cloneWithRows(this._data);
    },
    render: function () {
        if (this.state.isLoading) {
            return this.renderLoadingView();
        }

        return (
            <View style={styles.container}>
                <RefreshableListView
                   dataSource={this.state.dataSource}
                   renderRow={this.renderRow}
                   loadData={this.reload}
                   onEndReached={this.onEndReached}
                   refreshingIndictatorComponent={
                       <RefreshableListView.RefreshingIndicator stylesheet={indicatorStylesheet} />
                   }
                 />
            </View>);
    },
    renderLoadingView: function() {
        return (
        <View style={styles.loading}>
            <ActivityIndicatorIOS size='large'/>
            <Text>
                Loading...
            </Text>
        </View>
        );
    }
});

var styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        marginTop: 60,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
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
});

var indicatorStylesheet = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    height: 40,
    paddingBottom: 10
  },
})

module.exports = Main
