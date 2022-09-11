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
{
	question:'What is speed limit in town and village',
	choice1: '5kp/h',
	choice2: '50kp/h',
	choice3: '10kp/h',
	choice4: '20km/h',
	answer: 2,
},
{
	question:'As a driver who is appropriate person who can check your driving document',
	choice1: 'Soldier',
	choice2: 'Teacher',
	choice3: 'UTAG',
	choice4: 'Police(MTTD)',
	answer: 4,
},
{
	question:'After juction where will be proper place to stop vehicle',
	choice1: 'Bus stop',
	choice2: 'on the Zebra crossing',
	choice3: 'Level Crossing',
	choice4: 'Toucan crossing',
	answer: 1,
},
{
	question:'Overtaking is ONLY allowed at or near one of the following:',
	choice1: 'Juctions',
	choice2: 'Curves',
	choice3: 'Pedestrian crossing',
	choice4: 'When the road is clear and safe',
	answer: 4,
},
{
	question:'Your mobile phone rings while you are driving. You should:',
	choice1: 'stop immediately to answer the call',
	choice2: 'stop in proper and covenient place',
	choice3: 'just pick whilst driving',
	choice4: 'stop immediately and cut the call',
	answer: 2,
},
{
	question:'If you park your vehicle overnight what will you check before you start your vehicle',
	choice1: 'Engine oil',
	choice2: 'Air condition',
	choice3: 'Doors',
	choice4: 'Radio',
	answer: 1,
},
{
	question:'You are travelling in very heavy rain. Your overall stopping distance is likely to be:',
	choice1:'Double',
	choice2:'No Difference',
	choice3:'Up to ten times greater',
	choice4:'None of the above',
	answer:1,
},
{
	question:'When following large vehicle it is advisable to stay out of;',
	choice1:'Your lane to be seen',
	choice2:'Its blind spot',
	choice3:'Head lamp coverage area',
	choice4:'None of the above',
	answer:2,
},
{
	question:'Prohibitory road signs are circular with red borders on them',
	choice1:'True',
	choice2:'False',
	choice3:'Sometimes True',
	choice4:'Sometimes False',
	answer:1,
},
{
	question:'When you see a vehicle flashing light and siren, what should you do as a driver?',
	choice1:'start shouting',
	choice2:'Do not mind them',
	choice3:'Slow Down and allow',
	choice4:'speed up',
	answer:3,
},
{
	question:'You can be more easily seen in the dark or in a poor light if you wear or carry something.....',
	choice1:'Blue',
	choice2:'Green',
	choice3:'Black',
	choice4:'White and Reflective',
	answer:4,
},
{
	question:'You start to feel tired while driving what should you do?',
	choice1:'Increase your speed slightly',
	choice2:'Decrease your speed slightly',
	choice3:'Pull over at a safe place to rest',
	choice4:'Find a less busy route',
	answer:3,
},
{
	question:'How do you select gears when driving?',
	choice1:'By selecting the Gear',
	choice2:'Press the clutch down and change the gear',
	choice3:'By selecting the correct Gear',
	choice4:'By pressing the accelerator down and change the gear',
	answer:2,
},
{
	question:'The brake should always be depressed with',
	choice1:'The left foot',
	choice2:'The right foot',
	choice3:'It depends on the position of the pedal',
	choice4:'Any of the feet',
	answer:2,
},
]

const SCORE_POINTS = 5
const MAX_QUESTIONS = 20

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