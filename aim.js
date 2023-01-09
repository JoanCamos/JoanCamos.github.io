/*This consists on getting the id/classes from html and making that everytime the user clicks the screen goes down to the next time till you get to the game */
const go = document.querySelector('#go')
const go2 = document.querySelector('#go2')
const covers = document.querySelectorAll('.cover')
const dateTable = document.querySelector('.date-table')
const dateTable2 = document.querySelector('.date-table2')

const panel = document.querySelector('.panel')
const panel2 = document.querySelector('.panel2')
const watching = document.querySelector('#watch')
const life = document.querySelector('#live')

const back = document.querySelector('.back')


let live = 0
let watch = 0
let score = 0


let inter = null


go.addEventListener('click', () => {
    covers[0].classList.add('up')
})

  dateTable.addEventListener('click', (event) => {
  if(event.target.classList.contains('date-button')){
    live = parseInt(event.target.getAttribute('data-live'))
    covers[1].classList.add('up')
}
})

dateTable2.addEventListener('click', (event) => {
 if(event.target.classList.contains('date-button2')){
   watch = parseInt(event.target.getAttribute('data-t'))
   covers[2].classList.add('up')
   startGame() 
}
})

go2.addEventListener('click', () => {
    covers[0].classList.add('up2')
    startGame2()
})


panel.addEventListener('click', (event) => {
    if(event.target.classList.contains('circle')){
       score++
       event.target.remove()
       createRandomCircle()
    }
    else {
    dead()
}
})

panel2.addEventListener('click', (event) => {
    if(event.target.classList.contains('circle')){
       event.target.remove()
       createRandomCircle2()
    }
    else {   
}
})

panel2.addEventListener('click', (event) => {
    if(event.target.classList.contains('circle2')){
       event.target.remove()
       createRandomCircle3()
    }
    else {   
}
})

panel2.addEventListener('click', (event) => {
    if(event.target.classList.contains('circle3')){
       event.target.remove()
       createRandomCircle4()
    }
    else {   
}
})


function startGame(){
   inter = setInterval(decreaseTime, 1000)
   createRandomCircle()
   setTimer(watch)
   life.innerHTML = `${live}`
}

function startGame2(){
   createRandomCircle2()
   createRandomCircle3()
   createRandomCircle4()
}

function finishGame(){
  clearInterval(inter);
  panel.innerHTML = `<h1>Score:&nbsp; <span class='primary'>${score}</span></h1>`
}

//Function for the time to decrease
function decreaseTime() {
 if(watch === 0){
  finishGame()
 } else {
  --watch
  setTimer(watch)
}
}

function dead(){
   if(live === 0){
  finishGame()
 } else {
  --live
  life.innerHTML = `${live}`
}
}


function setTimer(value) {
 if(value < 10){
   watching.innerHTML = `00:0${watch}`
 } else {
   watching.innerHTML = `00:${watch}`
 }
}


function createRandomCircle() {
  const circle = document.createElement('div')
  const size = getRandomNumber(10, 50)
  const {width, height} = panel.getBoundingClientRect();
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)
  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  panel.append(circle)
}

function createRandomCircle2() {
  const circle = document.createElement('div')
  const size = getRandomNumber(10, 50)
  const {width, height} = panel2.getBoundingClientRect();
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)
  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  panel2.append(circle)
}

function createRandomCircle3() {
  const circle2 = document.createElement('div')
  const size = getRandomNumber(10, 50)
  const {width, height} = panel2.getBoundingClientRect();
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)
  circle2.classList.add('circle2')
  circle2.style.width = `${size}px`
  circle2.style.height = `${size}px`
  circle2.style.top = `${y}px`
  circle2.style.left = `${x}px`
  panel2.append(circle2)
}

function createRandomCircle4() {
  const circle3 = document.createElement('div')
  const size = getRandomNumber(10, 50)
  const {width, height} = panel2.getBoundingClientRect();
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)
  circle3.classList.add('circle3')
  circle3.style.width = `${size}px`
  circle3.style.height = `${size}px`
  circle3.style.top = `${y}px`
  circle3.style.left = `${x}px`
  panel2.append(circle3)
}


function getRandomNumber(min, max) {
 return Math.round(Math.random() * (max - min) + min)
}
