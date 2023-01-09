/* Poner un HARD / EASY / MEDIUM mode?*/



//getting the 'canvas' from the html file
const canvas = document.querySelector('canvas')

//canvas context is our canvas API that allows us to draw in the canvas or do whatever we want
const ctx = canvas.getContext('2d')

//To get the full width and height from the screen
//innerWidth is a property of the window object
canvas.width = innerWidth
canvas.height = innerHeight

//selecting scoreEL from html
const scoreEL = document.querySelector('#scoreEL')

//selecting startGameBtn from html
const startGameBtn = document.querySelector('#startGameBtn')

const modelEl = document.querySelector('#modelEl')
const dieEl = document.querySelector('#dieEl')

//To get the score into the menu aswell
const bigScoreEl = document.querySelector('#bigScoreEl')


//Center of the map
const xHalf = canvas.width / 2
const yHalf = canvas.height / 2


//Creating arrays that group the projectiles and enemies, we are then looping through them to draw them at the same time
let projectiles = []
let enemies = []
let projectiles2 = []
let powerUps = []

//to make the power up projectiles not too broken
let frames = 0

//Sprite
const background = new Sprite({
 position: {
  x: 0,
  y: 0
 },
 imageSrc: './images/background.jpg'
})

const shop = new Sprite({
 position: {
  x: 0,
  y: 1
 },
 imageSrc: './images/planet.png',
 scale: 3,
 framesMax: 8
})

//Function made to be able to restart game, starting with the player at the middle position, no projectiles/enemies/score
function init() {
  player = new Player({
  position: {
  x: xHalf,
  y: yHalf
 },
 velocity: {
  x: 0,
  y: 0
 },
 imageSrc: './images/spaceship.png',
 offset: {
  x:0,
  y:0
 },
 
})
   projectiles = []
   enemies = []
   projectiles2 = []
   score = 0
   powerUps = []
   
   //????
  scoreEL.innerHTML = score
   bigScoreEl.innerHTML = score

  frames = 0
}



//To cancel our animateFrame to pause the game
let animationId

//constant to be able to increase our score
let score = 0

//This function is a loop that calls it self non-stop
function animate() {
 animationId = requestAnimationFrame(animate)

 //Fade effect
 ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'


 //To clear the canvas everytime something happens
 ctx.fillRect(0, 0, canvas.width, canvas.height)
 frames++

 //Sprite
 
 background.update()
 shop.update()

 //Call the update function which calls the draw function to draw the player on the screen
 player.update()

 for (let i = powerUps.length - 1; i >=0; i--) {
  const powerUp = powerUps[i]

  //garbage collection
  if (powerUp.position.x > canvas.width){
    powerUps.splice(i, 1)
    
  } powerUp.update()

  //Collision powerup and player
  //Hypot distance between player and powerup
  const dist = Math.hypot(player.position.x - powerUp.position.x, player.position.y - powerUp.position.y)

  
//gain powerup
  if (dist < powerUp.image.height / 2 + player.height + player.width) {
    //splice removes it
    
    powerUps.splice(i, 1)
    player.powerUp = 'MachineGun'
    setTimeout(() => {
      player.powerUp = null
    }, 1000

    )
  }
 }

 //"projectiles" refers to the array we created and the array will call the update function
 projectiles.forEach((projectile, index) => {
  projectile.update()

  //remove our projectiles from the array  when they go out of the screen
  if (projectile.x + projectile.radius < 0 || projectile.x - projectile.radius > canvas.width || projectile.y + projectile.radius < 0 || projectile.y - projectile.radius > canvas.height) {
   setTimeout(() => {
    projectiles.splice(index, 1)
    }, 0)
  }
 })


 
 projectiles2.forEach((projectile2, index) => {
  projectile2.update()

  //remove our projectiles from the array  when they go out of the screen
  if (projectile2.x + projectile2.radius < 0 || projectile2.x - projectile2.radius > canvas.width || projectile2.y + projectile2.radius < 0 || projectile2.y - projectile2.radius > canvas.height) {
   setTimeout(() => {
    projectiles2.splice(index, 1)
    }, 0)
  }
 })


 //All this code is for the detection of collisions between enemies projectiles and player

 //"enemies" refers to the array and it will loop and call the update function
 enemies.forEach((enemy, index) => {
  enemy.update()
  const dist = Math.hypot(player.position.x + 10 - enemy.x, player.position.y + 10 - enemy.y)

   //This will end the game when enemy touches the player
   if (dist - enemy.radius < 1) {
    cancelAnimationFrame(animationId)
    //To get the menu back when you die
    dieEl.style.display = 'flex'

    //set the menu score = to the score on top left
    bigScoreEl.innerHTML = score
   }

   //getting the distance between projectile and enemy
  projectiles.forEach((projectile,projectileIndex) => {
   const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

   //objects touch and removing them from the screen
   if (dist - enemy.radius - projectile.radius < 1) {

    //Increase our score
    score += 100
    scoreEL.innerHTML = score

    //(setTimeout) to remove the flash effect
    //if statament to shrink enemies so we dont 1 hit big enemies. '-10' to make sure the enemy does not get too small before desapearing from the screen
    if (enemy.radius - 10 > 10) {
     enemy.radius -= 10
     setTimeout(() => {
     //"splice" removes an object from an array

    projectiles.splice(projectileIndex, 1)
    }, 0) 
    } else {
    setTimeout(() => {
     //"splice" removes an object from an array
       enemies.splice(index, 1)
    projectiles.splice(projectileIndex, 1)
    }, 0) 
   }}
  })

projectiles2.forEach((projectile2,projectile2Index) => {
   const dist = Math.hypot(projectile2.x - enemy.x, projectile2.y - enemy.y)

   //objects touch and removing them from the screen
   if (dist - enemy.radius - projectile2.radius < 1) {

    //Increase our score
    score += 100
    scoreEL.innerHTML = score

    //(setTimeout) to remove the flash effect
    //if statament to shrink enemies so we dont 1 hit big enemies. '-10' to make sure the enemy does not get too small before desapearing from the screen
    if (enemy.radius - 10 > 10) {
     enemy.radius -= 0.5
     setTimeout(() => {
     //"splice" removes an object from an array

    projectiles2.splice(projectile2Index, 1)
    }, 0) 
    } else {
    setTimeout(() => {
     //"splice" removes an object from an array
       enemies.splice(index, 1)
    projectiles2.splice(projectile2Index, 1)
    }, 0) 
   }}
  })
 
  
 })

}


 //Disable right click on the screen
document.oncontextmenu = rightClick
function rightClick(clickEvent) {
 clickEvent.preventDefault()
}



     //EventListener to shoot the projectiles
  addEventListener('click', (event) => {  
 //  // event.key === 'k' 
   //atan2 produces the angle of Y and X which is what we need to get the velocities to make the projectile travel
   const angle = Math.atan2(event.clientY - player.position.y, event.clientX - player.position.x )


//PLAYER MOVEMENT
    player.velocity.x = Math.cos(angle) * 2
    player.velocity.y = Math.sin(angle) * 2
    
    


   
   })


 //EventListener to shoot the projectiles
  addEventListener('contextmenu', (event) => { 
   
 //  // event.key === 'k' 
   //atan2 produces the angle of Y and X which is what we need to get the velocities to make the projectile travel
   const angle = Math.atan2(event.clientY - player.position.y, event.clientX - player.position.x )

   //Getting the projectile velocity using trigonometry
    const velocity = {
     x: Math.cos(angle) * 10,
     y: Math.sin(angle) * 10
    }

 projectiles.push(
   
   new Projectile(
     player.position.x, player.position.y, 8 , 'grey', velocity
    )

    )  
   
   })


   //MACHINEGUN
  const mouse = {
    position: {
      x: 0,
      y: 0
    }
  }
   addEventListener('mousewheel', (event) => {
    // mouse.position.x = event.clientX
    // mouse.position.y = event.clientY

     if (player.powerUp === 'MachineGun') {
    //  const angle = Math.atan2(mouse.position.y - player.position.y, mouse.position.x - player.position.x )
     enemies = []
 }
    
   })

//EventListener to start game 
startGameBtn.addEventListener('click', () => {


init()
animate()
spawnEnemies()
spawnPowerUps()

modelEl.style.display = 'none'
})