//projectiles properties
class Projectile {
 constructor(x, y, radius, color, velocity) {
  this.x = x
  this.y = y
  this.radius = radius 
  this.color = color 
  this.velocity = velocity 
    this.image = new Image()
  this.image.src = './images/laser.png'
 }

 draw() {
 ctx.save()
 ctx.globalAlpha = this.alpha

 ctx.translate(this.x + this.image.width / 3, this.y + this.image.height / 3)
 ctx.rotate(this.radians)
ctx.translate(-this.x - this.image.width / 3, -this.y - this.image.height / 3)

 ctx.drawImage(this.image, this.x , this.y)
 ctx.restore()
 }
 
 //This function updates the velocity of the projectiles and calls the draw function
 update() {
  this.draw()
  this.x = this.x + this.velocity.x
  this.y = this.y + this.velocity.y

 }
}