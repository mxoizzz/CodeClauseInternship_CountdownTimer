const form = document.querySelector("form");

const eventDateInput = document.getElementById("EventDate");
const eventTimeInput = document.getElementById("EventTime");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const targetEventEl = document.getElementById("targetEvent");
const targetDateEl = document.getElementById("targetDate");

let timer;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const dateValue = eventDateInput.value;
  const timeValue = eventTimeInput.value;

  if (!dateValue || !timeValue) {
    alert("Please enter event name, date and time");
    return;
  }

  const targetDate = new Date(`${dateValue}T${timeValue}`);

  if (targetDate <= new Date()) {
    alert("Please select a future date and time");
    return;
  }

  targetDateEl.textContent = targetDate.toLocaleString(undefined, {
  dateStyle: "long",
  timeStyle: "short"
});


  clearInterval(timer);
  startCountdown(targetDate);
});

function startCountdown(targetDate) {
  timer = setInterval(() => {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      clearInterval(timer);
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      alert("Countdown Completed!");
      return;
    }

    const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutesLeft = Math.floor((diff / (1000 * 60)) % 60);
    const secondsLeft = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(daysLeft).padStart(2, "0");
    hoursEl.textContent = String(hoursLeft).padStart(2, "0");
    minutesEl.textContent = String(minutesLeft).padStart(2, "0");
    secondsEl.textContent = String(secondsLeft).padStart(2, "0");
  }, 1000);
}
