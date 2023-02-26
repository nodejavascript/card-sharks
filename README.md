# card-sharks
A single player card game where you guess if the next card is higher or lower.



## Takeaways

Yes, this is simple. This game was made to highlight simplicity in my portfolio.

### App design

- All game logic components are intentionally saved in one <a href="https://github.com/nodejavascript/card-sharks/blob/master/src/site/Site.js" title="Main game">Site.js</a>, to make code review easier

- Rules and high score Alert boxes can be closed by user, because user likes to know if they read it

- Implemented game wrapper with fullScreen mode so users on phone can ignore that fluff

- No local storage or cookies. All state based using React 18.x

### Devops
- Images hosting on <a href="https://cloudinary.com" title="cloudinary.com">cloudinary.com</a> to minimize hosting resources
- CI/CD is automated and hosted `statelessly` using self-hosted <a href="https://coolify.io" title="coolify.io">coolify.io</a> through pushing to `master` on <a href="https://github.com/nodejavascript/card-sharks" title="github.com/nodejavascript/card-sharks">github.com/nodejavascript/card-sharks</a>
- Uptime Kuma is used to detect downtime
- <a href="https://cloudflare.com" title="cloudflare.com">cloudflare.com</a> for DNS, <a href="https://coolify.io" title="coolify.io">coolify.io</a> provides SSL certificate
- <a href="https://analytics.google.com" title="analytics.google.com">analytics.google.com</a> used for page views to determine if usage justifies new features (unless you contribute)
- Self hosted <a href="https://github.com/google/cadvisor" title="https://github.com/google/cadvisor">cAdvisor</a> metrics from `this docker app` are exported to <a href="https://prometheus.io" title="prometheus.io">prometheus</a>, and <a href="https://grafana.com" title="grafana.com">grafana</a> is used to monitor container resource usage

### LIVE https://card-sharks.nodejavascript.com
[![card-sharks-normal](https://res.cloudinary.com/nodejavascript-com/image/upload/v1677444811/card-sharks/Selection_024.png)](https://card-sharks.nodejavascript.com)


## Code review
- Main game code: <a href="https://github.com/nodejavascript/card-sharks/blob/master/src/site/Site.js" title="Main game">https://github.com/nodejavascript/card-sharks/blob/master/src/site/Site.js</a>

### Game uses one `useState`
  - ```const [game, setGame] = useState()```

### Variables
  - Score = number of correct guesses in a row during the game
  - High Score = best Score, from game to game
  - Sum of correct guesses are displayed to user at end of game

### ButtonView
  - Display if playing
  - call `onGuess()` for higher or lower button click
    - determine next card and evaluate for Right, Wrong or Tied
    - set / display user feedback message
    - increment scores for correct guesses
    - update game state `setGame()`

### Game uses one `useEffect`, for `[game]`
  - displaying user feedback message on:
    - new game
    - user click was Right, Wrong, or Tied
    - in addition to above, display when game is over as message

### CardView
  - Display if playing
  - Show styled playing card

### GameOverView
  - Display if game over
  - Show user how many correct guesses in game

### NewGameButton
  - Dependent on game state
  - Show new game when appropriate (when app starts and when game is over)
  - Show restart game during game play
  - Pull shuffled cards from [this script](https://github.com/nodejavascript/card-sharks/blob/master/src/site/data.js#L6)

## Attribution

<a href="https://www.flaticon.com/authors/freepik" title="playing card icons">Thank you freepik for the free flaticon.com icon 👍</a>

<a href="https://github.com/hayeah" title="playing card icons">Thank you @hayeah for the playing cards 👍</a>
