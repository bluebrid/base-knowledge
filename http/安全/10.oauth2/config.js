const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
const SCOPE = 'user'
const github = {
  request_token_url: 'https://github.com/login/oauth/access_token',
  client_id: 'e04b253391e64ce559aa',
  client_secret: '616cb01993e6f10b77bf127ba437adebb76ba55e',
  // client_id: '46a4f47abba552766e47',
  // client_secret: '1e9dc74bab1ee7bdaf366cbaad34548c5f6d13e8',
  github_user_url:'https://api.github.com/user'
}
module.exports = {
  github,
  GITHUB_OAUTH_URL,
  OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${github.client_id}&scope=${SCOPE}`,
}
