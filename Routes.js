var ActivityView = require('react-native-activity-view');

class Routes {
    static register(name, handler) {
        if (this.handlers == null) this.handlers = {}
        this.handlers[name] = handler
    }
    static get(name, params) {
        if (this.handlers[name] == null) throw new Error('unknown route')
        return this.handlers[name](params)
    }
    static TopStories() {
        return {
            component: require('./components/Main'),
            title: 'WhySo?',
            backButtonTitle: 'Back'
        }
    }
    static Article(article) {
        return {
            component: require('./components/ArticleScreen'),
            title: article.title,
            passProps: article,
            rightButtonIcon: require('./icons/icon-share.png'),
            onRightButtonPress: () => {
                ActivityView.show({
                    text: article.title,
                    url: 'https://whysoapp.com',
                    imageUrl: article.image
                });
            }
        }
    }
}

module.exports = Routes
