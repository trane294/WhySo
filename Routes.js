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
  static Article(story) {
    return {
      component: require('./components/ArticleScreen'),
      title: 'WhySo?',
      passProps: story
    }
  }
}

module.exports = Routes
