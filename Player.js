//Each time we create a new player we are giving it the constructor properties
class Player extends Sprite {
 constructor({x, y, position, velocity, imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0},}) {

//for the inheritance
 super({
  position,
  imageSrc,
  scale,
  framesMax,
  offset
 
 })
//The player properties
 
 this.velocity = velocity
 this.height = 0
 this.width = 0
 this.powerUp
 this.framesCurrent = 0
 this.framesElapsed = 0
 this.framesHold = 20


 }

 update() {
  this.draw()
  //animate
  this.animateFrame()
  this.position.x += this.velocity.x * 2.5
  this.position.y += this.velocity.y * 2.5


  //To make the player tp to the middle of the screen if they try to get out of the map
  if (this.position.y + this.height + this.velocity.y >= canvas.height) {
   this.position.x = canvas.width / 2
   this.position.y = canvas.height / 2 
  } 
  else if (this.position.x + this.width + this.velocity.x >= canvas.width) 
  {this.position.x = canvas.width / 2
   this.position.y = canvas.height / 2 }

   else if (this.position.x + this.width + this.velocity.x <= 0)
   {this.position.x = canvas.width / 2
   this.position.y = canvas.height / 2 }

    else if (this.position.y + this.height + this.velocity.y <= 0)
   {this.position.x = canvas.width / 2
   this.position.y = canvas.height / 2 }
 }

}