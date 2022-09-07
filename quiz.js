const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progessText = document.querySelector('#progessText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswer = true
let score = 0
let questionCounter = 0
let availableQuestion = []

let questions = [
{
	question:'Which one of these should you do when a front tyre burst.',
	choice1: 'Apply the handbrake to stop the vehicle',
	choice2: 'Break firmly and quickly',
	choice3: 'Hold the steering firmly and control the vehicle to a stop',
	choice4: 'Hold the steeringwheel lightly',
	answer: 3,
},
{
	question:'It is not safe to cross in front of a parked vehicle.',
	choice1: 'Because drivers are always angry',
	choice2: 'Because oncoming vehicle Drivers may not be able to see You',
	choice3: 'Because the parked cars may not allow you',
	choice4: 'Because Pessengers may not see you',
	answer: 2,
},
{
	question:'When your tyre blows out on the road,you have to park the vehicle;',
	choice1: 'In the right lane and change the tyre',
	choice2: 'In the left lane and change the tyre',
	choice3: 'On the shoulder of the road and replace the tyre',
	choice4: 'In the middle of the road and change the tyre',
	answer: 3,
},
{
	question:'You are driving and there is a curve ahead of you,what will you do?',
	choice1: 'speed up and go',
	choice2: 'Slow and block other drivers',
	choice3: 'Drive in the  middle of the road',
	choice4: 'Reduce speed and keep to your lane',
	answer: 4,
},
{
	question:'Where must you park your vehicle on the motorway?',
	choice1: 'The carriageway road itself ',
	choice2: 'The slip road',
	choice3: 'The shoulders of road',
	choice4: 'Park is not allow',
	answer: 4,
},
{
	question:'You went to a social event and need to drive a short time after. What precaution should you take?',
	choice1: 'Drink plenty of milk before',
	choice2: 'Avoid drinking Alcohol completely',
	choice3: 'Drink plenty of coffee after drinking',
	choice4: 'Avoid drinking Alcohol on an empty stomach',
	answer: 2,
},
]

const SCORE_POINTS = 5
const MAX_QUESTIONS = 6

function startQuiz(){
	questionCounter = 0
	score= 0 
	availableQuestion = [...questions]
	getNewQuestion()
}

function getNewQuestion(){
	if(availableQuestion.length === 0 || questionCounter > MAX_QUESTIONS){
		localStorage.setItem('mostRecentScore',score)
		
		return window.location.assign('result.html')
	}
	
	questionCounter++
	progressText.innerText == `question ${questionCounter} 0f ${MAX_QUESTIONS}`
	progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`
	
	const questionIndex = Math.floor(Math.random() * availableQuestion.length)
	currentQuestion = availableQuestion[questionIndex]
	question.innerText = currentQuestion.question
	
	choices.forEach(choice => {
		const number = choice.dataset['number']
		choice.innerText = currentQuestion['choice' + number]
	})
	
	availableQuestion.splice(questionIndex , 1)
	
	acceptingAnswer = true
}

choices.forEach(choice =>{
	choice.addEventListener('click',function(event){
		if(!acceptingAnswer)return
		
			acceptingAnswer = false
			const selectedChoice = event.target
			const selectedAnswer = selectedChoice.dataset['number']
			
			let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
			
			if(classToApply == 'correct'){
				incrementScore(SCORE_POINTS)
			}
			
			selectedChoice.parentElement.classList.add(classToApply)
	         
			 setTimeout(function(){
				 selectedChoice.parentElement.classList.remove(classToApply)
				 getNewQuestion()
			 }, 1000)
	})
})

function incrementScore(num){
	score += num
	scoreText.innerText = score
}

startQuiz()