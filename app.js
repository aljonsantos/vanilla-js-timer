const app = document.querySelector('#app')

class Timer {
  constructor(minutes) {
    this.minutes = minutes
    this.time = minutes * 60
    this.element = this.element()
    this.isActive = false
    this.timer = null
  }

  getMinutes() {
    const minutes = Math.floor(this.time / 60)
    return minutes < 10 ? `0${minutes}` : minutes
  }

  getSeconds() {
    const seconds = this.time % 60
    return seconds < 10 ? `0${seconds}` : seconds
  }

  updateTimer() {
    if (this.time < 0) {
      clearInterval(this.timer)
      this.isActive = false

      this.element.classList.add('up')
      const startBtn = this.element.querySelector('.start-btn .icon')
      startBtn.classList.remove('fa-pause')
      startBtn.classList.add('fa-play')
      return
    }

    const countdown = this.element.querySelector(`.timer__time`)
    countdown.innerText = `${this.getMinutes()}:${this.getSeconds()}`
    this.time--
  }

  start() {
    if (this.isActive) {
      this.pause()
    } else {
      this.timer = setInterval(this.updateTimer.bind(this), 1000)
      this.isActive = true

      const startBtn = this.element.querySelector('.start-btn .icon')
      startBtn.classList.remove('fa-play')
      startBtn.classList.add('fa-pause')
    }
  }

  pause() {
    clearInterval(this.timer)
    this.isActive = false

    const startBtn = this.element.querySelector('.start-btn .icon')
    startBtn.classList.remove('fa-pause')
    startBtn.classList.add('fa-play')
  }

  reset() {
    this.time = this.minutes * 60
    this.updateTimer()
  }

  dismiss() {

  }

  element() {
    const element = document.createElement('div')
    element.id = `timer-${this.id}`
    element.classList.add('timer')
    element.innerHTML = `
      <div class="timer__time">${this.getMinutes()}:${this.getSeconds()}</div>
      <div class="timer__btns">
        <button class="start-btn"><i class="icon fa-solid fa-play"></i></button>
        <button class="reset-btn"><i class="icon fa-solid fa-rotate-left"></i></button>
      </div>
    `
    return element
  }

  render() {
    app.appendChild(this.element)
    this.setupEventListeners()
  }

  setupEventListeners() {
    this.element.querySelector('.start-btn').addEventListener('click', this.start.bind(this))
    this.element.querySelector('.reset-btn').addEventListener('click', this.reset.bind(this))
  }
}

const timers = [new Timer(1), new Timer(3), new Timer(10), new Timer(15)]
timers.forEach(timer => timer.render())