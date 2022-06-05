  const getData = async () => {
      
    if(!window.localStorage.getItem('jsonData')){
        const response = await fetch("../assets/data.json");
        const data = await response.json();
        return data;}
    else {
        const json = window.localStorage.getItem('jsonData');
        console.log(json, 'json')
        const data = JSON.parse(json)
        console.log(data.data[1].votes, 'hd')
        return data;
    }
}

//console.log(data); 
function setTime (dat){
    const datelast = dat.split('T');
    const datea = datelast[0];
    const dateago = datea.split('-');
    const today = new Date();
    const lastDay = new Date(dateago);
    let timedif = today.getTime() -lastDay.getTime();
    let daydiff = timedif  / (1000 * 3600 * 24);
    
    let time = '';
        if (daydiff / 365 > 1){
            let year = Math.round(daydiff / 365)
            time =  year = 1 ? year + ' year ago' : year + ' years ago'
        } else if (daydiff / 30 > 1 ){
            let months = Math.round(daydiff / 30)
            time = months = 1 ? months + ' month ago' : months + ' months ago';
        }else if ( daydiff / 30 < 1 ){
            let days = Math.round(daydiff);
            time = days = 1 ? days +' day ago' : days + ' days ago'
        }
 return time; 
}

function builtCard (person, index) {
    let totalvotes = person.votes.positive + person.votes.negative;
    
    let posPercentage = (person.votes.positive * 100 / totalvotes).toFixed(2);
    let negPercentage = (person.votes.negative * 100 / totalvotes).toFixed(2);
    const finalres = posPercentage > negPercentage ? 'thumbsup' : 'thumbsdown';
    const cardHTML = `<div class="card">
<div class="card__picture" style="background-image: url('../assets/img/people/${person.picture}'");>

</div>

<div class="card__content">
    
    <div class="card__info">
        <div class="card__info__name ${finalres}"><span>${person.name}</span></div>
         <p class="card__info__description">${person.description}</p>
    </div>
    

    <div class="card__form">
        <p class="card__form__quickinfo">
            <span class="info">${setTime(person.lastUpdated)} in ${person.category}</span>
            <span class="thank hide">Thank you for your vote!</span>
        </p>
        <div id="${index}" class="card__votebox">
            <div class="card__vote yes"></div>
            <div class="card__vote no"></div>

            <Button class="card__votesubmit disabled" disabled>Vote Now</Button>
        </div>
        <div class="card__voteagain hide">Vote Again</div>
    </div>
</div>
<div id="results-${index}" class="card__gausebar">
    <div class="bar">
        <div class="positive" style="width:${posPercentage}%"></div>                            
        <div class="negative" style="width:${negPercentage}%"></div>
    </div>
    <div class="data">
        <div class="label"><img src="./assets/img/thumbs-up.svg"><span class="pos">${posPercentage}%</span></div>
        <div class="label"><span class="neg">${negPercentage}%</span><img src="./assets/img/thumbs-down.svg"></div>
</div>
</div>
</div>
`;
    return cardHTML;

}


const aCards = (datos) => {
    //console.log({datos})
    const cards = `
        ${datos.map((person, index)=>{
            const niw = builtCard(person, index);
            return niw;
        }).join('')}`;
    return cards;
    
};

(async function (){
    const jsonData = await getData();
    console.log(jsonData.data[1].votes);
    const finalHMTL = aCards(jsonData.data);
    document.querySelector('.peoplecard').innerHTML = finalHMTL;
    listeners(jsonData);
    localStorage.setItem('jsonData', JSON.stringify(jsonData));
  })()
