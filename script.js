
const countdownContainer = document.getElementById('countdown')
const inputContainer = document.getElementById('input-container')
const form = document.getElementById('countdownForm')
const titleInput = document.getElementById('title-input')
const dateInput = document.getElementById('date-input')
const resetBtn = document.getElementById('reset-btn')
const timeElements = document.querySelectorAll('span')
const titleEl = document.getElementById('countdown-title')

const completeEl = document.getElementById('complete')
const completeElInfo = document.getElementById('complete-info')
const completeBtn = document.getElementById('complete-btn')

let countdownTitle = ''
let countdownDate = ''
let countdownValue = Date;
let countdownActive;
let savedCountdown

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

//Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0]
dateInput.setAttribute('min', today)

//Functions
function beginCountdown(e) {
  inputContainer.hidden = true
  countdownContainer.hidden = false
  e.preventDefault()
  countdownTitle = e.srcElement[0].value
  countdownDate = e.srcElement[1].value

  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };

  localStorage.setItem('countdown', JSON.stringify(savedCountdown))

  updateDom()
}

function updateDom() {
  if(countdownDate === '') return

  countdownActive = setInterval(() => {
    //Get number version of current date, updateDom
    countdownValue = new Date(countdownDate).getTime()
  
    const now = new Date().getTime()
    const distance = countdownValue - now
    const days = Math.floor(distance / day)
    const hours = Math.floor((distance % day) / hour)
    const minutes = Math.floor((distance % hour) / minute)
    const seconds = Math.floor((distance % minute) / second)

    if(distance < 0) {
      countdownContainer.hidden = true
      clearInterval(countdownActive)
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
      completeEl.hidden = false
    } else {
      titleEl.textContent = `${countdownTitle}`
      timeElements[0].textContent = `${days}`
      timeElements[1].textContent = `${hours}`
      timeElements[2].textContent = `${minutes}`
      timeElements[3].textContent = `${seconds}`
      completeEl.hidden = true
      countdownContainer.hidden = false
    }
  }, second) 
}

function resetContainer() {
  countdownContainer.hidden = true
  completeEl.hidden = true
  inputContainer.hidden = false
  clearInterval(countdownActive)
  countdownTitle = ''
  countdownDate = ''
  titleInput.value = ''
  dateInput.value = ''
  localStorage.removeItem('countdown')
}

function restorePreviousCountdown() {
  //Get countdown from localStorage if available
  if(localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'))
    countdownTitle = savedCountdown.title
    countdownDate = savedCountdown.date
    countdownValue = new Date(countdownDate).getTime()
    updateDom()
  }
}
  
  form.addEventListener('submit', beginCountdown)
  resetBtn.addEventListener('click', resetContainer)
  completeBtn.addEventListener('click', resetContainer) 

  restorePreviousCountdown()