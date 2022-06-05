const thankYou = (e) => {
    e.target.parentElement.classList.add('hide');
        const par = e.target.closest('.card__form');
        par.querySelector('.card__voteagain').classList.remove('hide');
        par.querySelector('.card__form__quickinfo .thank').classList.remove('hide');
        par.querySelector('.card__form__quickinfo .info').classList.add('hide');
        e.target.disabled = true;
        e.target.parentElement.querySelectorAll('.card__vote').forEach(ele => ele.classList.remove('active'));
 

}
const voteAgain = (e) => {
    const box= e.target.parentElement;
    box.querySelector('.card__votebox').classList.remove('hide');
    box.querySelector('.card__form__quickinfo .thank').classList.add('hide');
    box.querySelector('.card__form__quickinfo .info').classList.remove('hide');
    e.target.classList.add('hide');
}
const sumVote = (index, jsonData, finalVote) => {   
    let persona = jsonData.data[index];
    
    
    if (finalVote == 'yes'){
        persona.votes.positive++; 
    } else if (finalVote == 'no'){
        persona.votes.negative++; 
    }
    let totalvotes = persona.votes.positive + persona.votes.negative;
    let posPercent = (persona.votes.positive * 100 / totalvotes).toFixed(2);
    let negPercent = (persona.votes.negative * 100 / totalvotes).toFixed(2);
   
    document.querySelector(`#results-${index} .bar .positive`).style.width =  `${posPercent}%`;
    document.querySelector(`#results-${index} .bar .negative`).style.width= `${negPercent}%`;
    document.querySelector(`#results-${index} .data .label .pos`).textContent =  `${posPercent}%`;
    document.querySelector(`#results-${index} .data .label .neg`).textContent= `${negPercent}%`;

    localStorage.setItem('jsonData', JSON.stringify(jsonData));
        console.log(jsonData.data[index]);
}

function listeners (jsonData) {
    let valselect = document.querySelector('#styleview'); 
        valselect.addEventListener('change', () => {
        if( valselect.value === 'grid'){
            document.querySelector('.peoplecard').classList.remove('list');
            document.querySelector('.peoplecard').classList.add('grid');
        } else if ( valselect.value === 'list'){
            document.querySelector('.peoplecard').classList.remove('grid');
            document.querySelector('.peoplecard').classList.add('list');
        }
    }); 

    document.querySelectorAll('.card__votebox').forEach( vote =>  {
        let finalVote = 'null' ;
        vote.addEventListener('click', (e) => {
        if( e.target.className.indexOf('card__vote yes') != -1) {
            e.target.classList.add('active');
            const voteBox = e.target.parentElement;
            voteBox.children[1].classList.remove('active');
            finalVote = 'yes';
            voteBox.children[2].classList.remove('disabled');
            voteBox.children[2].disabled = false;
        }
        if( e.target.className.indexOf('card__vote no') != -1) {
            e.target.classList.add('active');
            e.target.classList.add('active');
            const voteBox = e.target.parentElement;
            voteBox.children[0].classList.remove('active');
            finalVote = 'no';
            voteBox.children[2].classList.remove('disabled');
            voteBox.children[2].disabled = false;
        }
        if( e.target.className.indexOf('card__votesubmit') != -1) {
            const ind = e.target.parentElement.id;
            sumVote(ind,jsonData, finalVote);        
            thankYou(e)
            }
        })
    });

    document.querySelectorAll('.card__voteagain').forEach( again =>{
        again.addEventListener('click', (e) =>{
            voteAgain(e);
        })
    });
}
