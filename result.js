const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highscores = JSON.parse(localStorage.getItem('highscores')) || []
const MAX_HIGH_SCORES = 5


finalScore.innerText = mostRecentScore

username.addEventListener('keyup', function(){
	saveScoreBtn.disabled = !username.value
})

function saveHighScore (event){
	event.preventDefault()
	
	const score = {
		score: mostRecentScore,
		name: username.value
	}
	
	highscores.push(score)
	
	highscores.sort((a,b) => {
		return b.score - a.score
	})

	highscores.splice(10)
	
	localStorage.setItem('highscores',JSON.stringify(highscores))
	window.location.assign('home.html')
	
}

