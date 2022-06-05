/* updates everything after voting */
const thankYou = (e) => {
  e.target.parentElement.classList.add("hide");
  const par = e.target.closest(".card__form");
  par.querySelector(".card__voteagain").classList.remove("hide");
  par.querySelector(".card__form__quickinfo .thank").classList.remove("hide");
  par.querySelector(".card__form__quickinfo .info").classList.add("hide");
  e.target.disabled = true;
  e.target.parentElement
    .querySelectorAll(".card__vote")
    .forEach((ele) => ele.classList.remove("active"));
};
/* resets vote box and thank you label to vote again */
const voteAgain = (e) => {
  const box = e.target.parentElement;
  box.querySelector(".card__votebox").classList.remove("hide");
  box.querySelector(".card__form__quickinfo .thank").classList.add("hide");
  box.querySelector(".card__form__quickinfo .info").classList.remove("hide");
  e.target.classList.add("hide");
};
/* adds the votes and runs the logic to calculate the new percentange and updates the bar */
const sumVote = (index, jsonData, finalVote) => {
  let persona = jsonData.data[index];
 /* adds votes */
  if (finalVote == "yes") {
    persona.votes.positive++;
  } else if (finalVote == "no") {
    persona.votes.negative++;
  }
  /* calcules percentage*/
  let totalvotes = persona.votes.positive + persona.votes.negative;
  let posPercent = ((persona.votes.positive * 100) / totalvotes).toFixed(2);
  let negPercent = ((persona.votes.negative * 100) / totalvotes).toFixed(2);
  /* updates ui with new percentage*/
  document.querySelector(
    `#results-${index} .bar .positive`
  ).style.width = `${posPercent}%`;
  document.querySelector(
    `#results-${index} .bar .negative`
  ).style.width = `${negPercent}%`;
  document.querySelector(
    `#results-${index} .data .label .pos`
  ).textContent = `${posPercent}%`;
  document.querySelector(
    `#results-${index} .data .label .neg`
  ).textContent = `${negPercent}%`;
    /*updates local storage with new data */
  localStorage.setItem("jsonData", JSON.stringify(jsonData));
};

/* this function adds all the events on the site */
function listeners(jsonData) {
  let valSelect = document.querySelectorAll("#styleview .select-items");
  /* controls view select */
  valSelect.forEach( (item) => { 
    item.addEventListener("click", (e) => {
      if (e.target.className.indexOf('Grid') ==! -1 ) {
        document.querySelector(".peoplecard").classList.remove("list");
        document.querySelector(".peoplecard").classList.add("grid");
      } else if (e.target.className.indexOf('List') ==! -1) {
        document.querySelector(".peoplecard").classList.remove("grid");
        document.querySelector(".peoplecard").classList.add("list");
      }
    });
  });
  /* controles votes card */ 
  document.querySelectorAll(".card__votebox").forEach((vote) => {
    let finalVote = "null";
    vote.addEventListener("click", (e) => {
      if (e.target.className.indexOf("card__vote yes") != -1) {
        e.target.classList.add("active");
        const voteBox = e.target.parentElement;
        voteBox.children[1].classList.remove("active");
        finalVote = "yes";
        voteBox.children[2].classList.remove("disabled");
        voteBox.children[2].disabled = false;
      }
      if (e.target.className.indexOf("card__vote no") != -1) {
        e.target.classList.add("active");
        e.target.classList.add("active");
        const voteBox = e.target.parentElement;
        voteBox.children[0].classList.remove("active");
        finalVote = "no";
        voteBox.children[2].classList.remove("disabled");
        voteBox.children[2].disabled = false;
      }
      if (e.target.className.indexOf("card__votesubmit") != -1) {
        const ind = e.target.parentElement.id;
        sumVote(ind, jsonData, finalVote);
        thankYou(e);
      }
    });
  });
  /* controls vote again to reset votebox */
  document.querySelectorAll(".card__voteagain").forEach((again) => {
    again.addEventListener("click", (e) => {
      voteAgain(e);
    });
  });
}


