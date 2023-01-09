class Sprite {
 constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0}}) {
  this.position = position
  this.width = 50
  this.height = 150
  this.image = new Image()
  this.image.src = imageSrc
  this.scale = scale
  this.framesMax = framesMax
  this.framesCurrent = 0
  this.framesElapsed = 0
  this.framesHold = 20
  this.offset = offset
 }

 draw(){
  ctx.drawImage(
   this.image,

   //Crop location arguments, Divide by 6 as there is 6 different animations
   this.framesCurrent * (this.image.width / this.framesMax),
   0,
   this.image.width / this.framesMax,
   this.image.height,

   this.position.x - this.offset.x, 
   this.position.y - this.offset.y, 
   (this.image.width / this.framesMax) + this.scale, 
   this.image.height + this.scale
   )
 }

 //animate method
 animateFrame() {
  this.framesElapsed++

  if (this.framesElapsed % this.framesHold === 0){
  //For the image to "move"
  if (this.framesCurrent < this.framesMax - 1) {
  this.framesCurrent++}
  else {
   this.framesCurrent = 0
  }
  }}

  
 update() {
  this.draw()
  this.animateFrame()
 }
}