//min time it will take from green to red
const minMS = 2000

//max time
const maxMS = 9000

//how many milliseconds it took the user to react
let reactTime = 0;

//when is true means we are waiting for the user to click in the area
let nowClick = false;

const mainArea = document.querySelector(".main-red")
const insideText = document.querySelector(".inside-txt")

const milliseconds = document.querySelector(".ms")

mainArea.addEventListener("click", () => {
  if (nowClick) {

      const ms = Date.now() - reactTime;
      nowClick = false;
      insideText.textContent = `Click to go again.`
      milliseconds.textContent = ` ${ms} ms `
  } 
   else {
  start() 
  }
})

function start() {
    //To revert the color back to red
  mainArea.style.backgroundColor = null;

  //hide the text when the screen is red
  insideText.textContent = "";
  
  //random num between 3000 and 10000
  const msTillChange = Math.floor(Math.random() * (maxMS - minMS)) + minMS;

  //to run code after some seconds 
  setTimeout(() => { 
    reactTime = Date.now() 
    mainArea.style.backgroundColor = "#ff7700";
    nowClick = true;
  }, msTillChange)
}
