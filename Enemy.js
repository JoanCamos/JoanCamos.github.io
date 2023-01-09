class Enemy {
 constructor(x, y, radius, color, velocity) {
  this.x = x
  this.y = y
  this.radius = radius 
  this.color = color 
  this.velocity = velocity
  
  this.type = 'Linear'

  this.image = new Image()
  this.image.src = './images/meteor.png'

  this.image2 = new Image()
  this.image2.src = './images/ship_1.png'

  this.image3 = new Image()
  this.image3.src = './images/ship_2.png'


  this.radians = 0
  this.center = {
    x,
    y
  }

  //70% of the enemies as math.random produces a number 0 - 1
    if (Math.random() < 0.7) {
      this.type = 'Homing'

      if (Math.random() < 0.3) {
        this.type = 'Spinning'

        if (Math.random() < 0.5) {
          this.type = 'Homing Spinning'
        }
      }
    }
  
 }

 draw() {
   ctx.save()
 ctx.globalAlpha = this.alpha

 ctx.translate(this.x + this.image.width / 2, this.y + this.image.height / 2)
 ctx.rotate(this.radians)
ctx.translate(-this.x - this.image.width / 2, -this.y - this.image.height / 2)

 ctx.drawImage(this.image, this.x , this.y)
 ctx.restore()
 }

  draw2() {
   ctx.save()
 ctx.globalAlpha = this.alpha

 ctx.translate(this.x + this.image2.width / 2, this.y + this.image2.height / 2)
 ctx.rotate(this.radians)
ctx.translate(-this.x - this.image2.width / 2, -this.y - this.image2.height / 2)

 ctx.drawImage(this.image2, this.x , this.y)
 ctx.restore()
 }

  draw3() {
   ctx.save()
 ctx.globalAlpha = this.alpha

 ctx.translate(this.x + this.image3.width / 2, this.y + this.image3.height / 2)
 ctx.rotate(this.radians)
ctx.translate(-this.x - this.image3.width / 2, -this.y - this.image3.height / 2)

 ctx.drawImage(this.image3, this.x , this.y)
 ctx.restore()
 }

 update() {
   

  if (this.type === 'Spinning') {
      this.draw3()
      

  //spinning enemies
  this.radians += 0.1

  this.center.x += this.velocity.x 
  this.center.y += this.velocity.y

  this.x =  this.center.x + Math.cos(this.radians) * 3
  this.y =  this.center.y + Math.sin(this.radians) * 3 }

  
  //get the angle between our enemy and our player
   else if (this.type === 'Homing') {
    this.draw2()
     const angle = Math.atan2(player.position.y - this.y, player.position.x - this.x) 
// // // //this is giving us the velocity we need of the x axis
     this.velocity.x = Math.cos(angle) * 3
// // // //same with y
     this.velocity.y = Math.sin(angle) * 3
  } 
  else if (this.type === 'Homing Spinning') {
   this.draw2()
    this.radians += 0.1

    const angle = Math.atan2(player.position.y - this.center.y, player.position.x - this.center.x)

  this.velocity.x = Math.cos(angle) * 3
  this.velocity.y = Math.sin(angle) * 3

  this.center.x += this.velocity.x 
  this.center.y += this.velocity.y

  this.x =  this.center.x + Math.cos(this.radians) * 3
  this.y =  this.center.y + Math.sin(this.radians) * 3 

    
     
  }
  else if (this.type === 'Linear'){
    this.draw()
   }
    this.x = this.x + this.velocity.x 
    this.y = this.y + this.velocity.y
  
  
    
 }
}

function spawnEnemies() {
 //setInterval between the spawn of enemeies
 //Random location of the screen
 setInterval(() => {
  //Creating a random radius but not smaller than 4
const health = Math.random() * (30 - 20) + 20
      
   let x
   let y

//Enemies will respawn in random positions Left Right Top Down
   if (Math.random() < 0.5){
   x =  Math.random() < 0.5 ? 0 - health: canvas.width + health
   y = Math.random() * canvas.height
   } else {
    x = Math.random() * canvas. width
    y = Math.random() < 0.5 ? 0 - health: canvas.height + health
   }
   
   //Getting a random color for the enemies
   const creating = 1 

   //Making the 'linear' enemies go towards the center
   const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 -  x)
   const velocity = {
  x: Math.cos(angle) * 3,
  y: Math.sin(angle) * 3
 }

 //Pusing new enemies into the array with random properties, every 1second?
   enemies.push(new Enemy(x, y, health, creating, velocity))
  }, 500)
}

