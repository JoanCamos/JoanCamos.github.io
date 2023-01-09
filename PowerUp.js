class PowerUp {
 constructor({ position = {x: 0, y: 0}, velocity }){
  this.position = position
  this.velocity = velocity

  this.image = new Image()
  this.image.src = './images/lightningBolt.png'
  this.radians = 0
 }

draw() {
 //save and restore for the image to fade up
 ctx.save()
 ctx.globalAlpha = this.alpha

 ctx.translate(this.position.x + this.image.width / 2, this.position.y + this.image.height / 2)
 ctx.rotate(this.radians)
ctx.translate(-this.position.x - this.image.width / 2, -this.position.y - this.image.height / 2)

 ctx.drawImage(this.image, this.position.x , this.position.y)
 ctx.restore()
}

update() {
 this.draw()
 this.radians += 0.01
 this.position.x += this.velocity.x
}}

function spawnPowerUps() {
 spawnPowerUpsId = setInterval(() => {
  powerUps.push(new PowerUp({
   position: {
    x: -30,
    y: Math.random() * canvas.height
   },
   velocity: {
    x: Math.random() * 8,
    y: 0
   }
  }))
 }, 18000)
}