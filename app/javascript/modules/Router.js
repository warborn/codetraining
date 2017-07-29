let Router = {
  redirectTo(url) {
    window.location.replace(url);
  },

  // Challenges show action
  challenge_path() {
    return `/challenges/${this.getChallengeID()}/show/${this.getLanguage()}`;
  },

  // Challenges new action
  new_challenge_path() {
    return '/challenges/new';
  },

  // Challenges create or patch action
  save_challenge_path(actionName) {
    if (actionName === 'post') {
      return '/challenges';
    } else {
      return this.edit_challenge_path();
    }
  },

  // Challenges edit action
  edit_challenge_path(challengeID = this.getChallengeID(), language = this.getLanguage()) {
    return `/challenges/${challengeID}/edit/${language}`;
  },

  // Challenges delete action
  delete_challenge_path() {
    return this.edit_challenge_path();
  },

  challenge_solutions_path() {
    return `/challenges/${this.getChallengeID()}/solutions/${this.getLanguage()}`;
  },

  // Examples show action
  example_path(language) {
    return `/challenges/example/${language}`;
  },

  // Extract challenge id from URL
  getChallengeID() {
    let matches = this._challengeURLMatches();
    return matches[1];
  },

  // Extract language name from URL
  getLanguage: function() {
    let matches = this._challengeURLMatches();
    return matches[2];
  },

  // Get the matches that correspond to the challenge id and language name from URL
  _challengeURLMatches() {
    return window.location.pathname.match(/challenges\/(\d+)\/(?:train|edit)\/([a-zA-Z-_\+#]+)/);
  }
}

export default Router;