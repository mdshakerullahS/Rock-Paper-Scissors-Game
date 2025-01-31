let buttons = document.querySelectorAll(".gameBtn");
let result = document.querySelector(".result");
let resultDesc = document.querySelector(".resultDesc");
let score = document.querySelector(".score");
let resetBtn = document.querySelector(".resetBtn");
let myWin = localStorage.getItem("myWin")
  ? parseInt(localStorage.getItem("myWin"))
  : 0;
let computerWin = localStorage.getItem("computerWin")
  ? parseInt(localStorage.getItem("computerWin"))
  : 0;

if (myWin === 0 && computerWin === 0) {
  resetBtn.style.display = "none";
}

score.textContent = `You: ${myWin} | Computer: ${computerWin}`;

const getComputerMove = () => {
  let randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber < 1 / 3) return "Rock";
  if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) return "Paper";
  return "Scissors";
};

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    let computerMove = getComputerMove();
    let playerMove = event.currentTarget.nextElementSibling.textContent;
    checkWinner(playerMove, computerMove);

    localStorage.setItem("myWin", myWin);
    localStorage.setItem("computerWin", computerWin);

    resetBtn.style.display = "block";
    score.textContent = `You: ${myWin} | Computer: ${computerWin}`;
  });
});

const checkWinner = (playerMove, computerMove) => {
  if (playerMove === computerMove) {
    result.textContent = "Ooops! That was a TIE. Try again.";
    resultDesc.textContent = `You choose ${playerMove} and Computer choose ${computerMove}.`;
  } else if (
    (playerMove === "Rock" && computerMove === "Paper") ||
    (playerMove === "Paper" && computerMove === "Scissors") ||
    (playerMove === "Scissors" && computerMove === "Rock")
  ) {
    result.textContent = "Computer WON.";
    resultDesc.textContent = `You choose ${playerMove} and Computer choose ${computerMove}.`;
    computerWin++;
  } else {
    result.textContent = "You WON.";
    resultDesc.textContent = `You choose ${playerMove} and Computer choose ${computerMove}.`;
    myWin++;
  }
};

resetBtn.addEventListener("click", () => {
  myWin = 0;
  computerWin = 0;

  localStorage.removeItem("myWin");
  localStorage.removeItem("computerWin");

  result.textContent = "";
  resultDesc.textContent = "";
  score.textContent = `You: ${myWin} | Computer: ${computerWin}`;
  resetBtn.style.display = "none";
});
