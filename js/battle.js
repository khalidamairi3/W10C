
// a function to store the counts of each player attacks as a string in Cookies//
function setCountCookies(){
    var user_countString="";
    for(var i=0; i < user_pokemon_attacks.length;i++){

        user_countString+=user_pokemon_attacks[i].count.toString();

    }
    var computer_countString="";
    for(var i=0; i < computer_pokemon_attacks.length;i++){

        computer_countString+=computer_pokemon_attacks[i].count.toString();

    }
    
 
    Cookies.set("user_attck_count",user_countString);
    Cookies.set("computer_attck_count",computer_countString);
}
function allCookiesExist(){
    if(Cookies.get("user_pokemon")== undefined || Cookies.get("user_maxHealth")== undefined || Cookies.get("user_currentHealth")== undefined || Cookies.get("user_attackPoints")== undefined || Cookies.get("user_attck_count")== undefined || Cookies.get("computer_pokemon")== undefined || Cookies.get("computer_maxHealth")== undefined || Cookies.get("computer_currentHealth")== undefined || Cookies.get("computer_attackPoints")== undefined || Cookies.get(user_pokemon)== "computer_attck_count"){
        return false
    }
    else{
        return true
    }
}




function getCountCookies(){
    var user_countString=Cookies.get("user_attck_count");
    var computer_countString=Cookies.get("computer_attck_count");

    for(var i=0; i < user_pokemon_attacks.length;i++){

        user_pokemon_attacks[i].count= parseInt(user_countString[i]);

    }
    for(var i=0; i < computer_pokemon_attacks.length;i++){

        computer_pokemon_attacks[i].count= parseInt(computer_countString[i]);
      
    }
    

}





function updateResults(){
    user_currentHealth.innerHTML = "your current health is :" + user.current_health +  "/" + user.max;
    user_attackPoints.innerHTML= "your current attack points :" + user.attackPoints; 
    computer_currentHealth.innerHTML = "computer current health is : " + computer.current_health + "/" + computer.max;
    computer_attackPoints.innerHTML= " computer current attack points :" + computer.attackPoints; 

    Cookies.set("user_currentHealth",user.current_health);
    Cookies.set("user_attackPoints",user.attackPoints);
    Cookies.set("computer_currentHealth",computer.current_health);
    Cookies.set("computer_attackPoints",computer.attackPoints);
    setCountCookies()
    

}







 

async function attack(attacktype){
    var message = document.getElementById("message");
    if(user_pokemon_attacks[attacktype].count>0){
        if(user.current_health > 0 && computer.current_health >0)
        {
              console.log(user.attackPoints-user_pokemon_attacks[attacktype].attack_points);
            if(user.attackPoints-user_pokemon_attacks[attacktype].attack_points >= 0)
            {
                message.innerHTML="";
                var randomDamage = Math.round(user_pokemon_attacks[attacktype].damage_lower_limit + Math.random()*(user_pokemon_attacks[attacktype].damage_upper_limit - user_pokemon_attacks[attacktype].damage_lower_limit));
                user.attackPoints -= user_pokemon_attacks[attacktype].attack_points;
                computer.current_health -= randomDamage;
                user.current_health = parseInt(user.current_health) + parseInt(user_pokemon_attacks[attacktype].healing);
                user_pokemon_attacks[attacktype].count --;
                checkmaximumhealth();
                updateResults();
                await sleep(2000);
                computer_attack();
                winner();
    
            }
            else{
    
                message.innerHTML = "your attack points are not enough to do this attack, try another one "
        
            } 
        }


    }

    else{
    
        message.innerHTML = "you exceded the limit for this attack "

    } 
    
   
      

}

function computer_attack(){
    if(computer.current_health > 0){
        var randomAttack = computer_pokemon_attacks[Math.floor(Math.random()*5)];
        while(computer.attackPoints- randomAttack.attack_points < 0 || randomAttack.count == 0){
                
                randomAttack = computer_pokemon_attacks[Math.floor(Math.random()*5)];  
        }
        
        var randomDamage = Math.round(randomAttack.damage_lower_limit + Math.random()*(randomAttack.damage_upper_limit - randomAttack.damage_lower_limit));
        user.current_health -= randomDamage;
        computer.current_health = parseInt(computer.current_health) + parseInt(randomAttack.healing);
        computer.attackPoints-= randomAttack.attack_points;
        randomAttack.count --;
        checkmaximumhealth();
        updateResults();
        

    }

}
function checkmaximumhealth(){
    if (user.current_health > 100)
    user.current_health=100;
    if(computer.current_health > 100)
    computer.current_health=100;
}

function winner(){
    var winner_element = document.getElementById("winner");
    if(checkcount(user_pokemon_attacks) && checkcount(computer_pokemon_attacks)){

        if(user.current_health <= 0){
            winner_element.innerHTML = " you lost, try again ";
    
        }
        else if(computer.current_health <= 0){
            winner_element.innerHTML = " you won, congrats";
        }

    }
    else if(checkcount(user_pokemon_attacks)){
        winner_element.innerHTML = " you won, because the computer attacks are over";
    }
    else if(checkcount(computer_pokemon_attacks)){
        winner_element.innerHTML = " you lost, because your attacks are over";
    }
    else{
        winner_element.innerHTML = " tie";
    }
    
    
}

function checkcount(player_attacks){
    for(var i=0 ; i< player_attacks.length; i++){
        if(player_attacks[i].count > 0)
        {
            return true
        }
    }
    return false
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


var pokemon_images={
    pikatchu: "https://cdn.ndtv.com/tech/images/gadgets/pikachu_hi_pokemon.jpg",
    chaizard: "https://vignette.wikia.nocookie.net/iso33private/images/9/95/Charizard.png/revision/latest?cb=20170727171344",
    Bulbasaur: "https://vignette.wikia.nocookie.net/pokemon-talk6406/images/4/43/Bulbasaur.png/revision/latest?cb=20170506185349"
}


var user= {
    pokemon : Cookies.get("user_pokemon"),
    current_health : Cookies.get("user_currentHealth"),
    attackPoints : Cookies.get("user_attackPoints"),
    max: Cookies.get("user_maxHealth"),
    attack_count: Cookies.get("user_attck_count")

}

var computer= {
    pokemon : Cookies.get("computer_pokemon"),
    current_health : Cookies.get("computer_currentHealth"),
    attackPoints : Cookies.get("computer_attackPoints"),
    max: Cookies.get("computer_maxHealth"),
    attack_count: Cookies.get("computer_attck_count")

}

var puicatchu_attacks = [ {
    damage_upper_limit : 10,
    damage_lower_limit : 1,
    healing : 0,
    attack_points : 10

},
 {
    damage_upper_limit : 25,
    damage_lower_limit : 10,
    healing : 0,
    attack_points : 15

},
 {
    damage_upper_limit : 25,
    damage_lower_limit : 10,
    healing : 10,
    attack_points : 20

},
 {
    damage_upper_limit : 30,
    damage_lower_limit : 20,
    healing : 0,
    attack_points : 20

},
  {
    damage_upper_limit : 0,
    damage_lower_limit : 0,
    healing : 15,
    attack_points : -15

}];

var chizard_attacks = [ {
    damage_upper_limit : 50,
    damage_lower_limit : 20,
    healing : 0,
    attack_points : 25

},
 {
    damage_upper_limit : 30,
    damage_lower_limit : 10,
    healing : 10,
    attack_points : 25

},
 {
    damage_upper_limit : 20,
    damage_lower_limit : 10,
    healing : 15,
    attack_points : 15

},
 {
    damage_upper_limit : 60,
    damage_lower_limit : 20,
    healing : 0,
    attack_points : 30

},
  {
    damage_upper_limit : 0,
    damage_lower_limit : 0,
    healing : 20,
    attack_points : -10

}];

var bulbassure_attacks = [ {
    damage_upper_limit : 10,
    damage_lower_limit : 0,
    healing : 5,
    attack_points : 10

},
 {
    damage_upper_limit : 25,
    damage_lower_limit : 10,
    healing : 10,
    attack_points : 15

},
 {
    damage_upper_limit : 40,
    damage_lower_limit : 25,
    healing : 0,
    attack_points : 25
    

},
 {
    damage_upper_limit : 45,
    damage_lower_limit : 40,
    healing : 0,
    attack_points : 40


},
  {
    damage_upper_limit : 0,
    damage_lower_limit : 0,
    healing : 20,
    attack_points : -20
    

}];

var pokemon_attacks = { 
    pikatchu : puicatchu_attacks,
    chaizard : chizard_attacks,
    Bulbasaur : bulbassure_attacks
}; 
var user_pokemon_attacks = pokemon_attacks[user.pokemon];
var computer_pokemon_attacks = pokemon_attacks[computer.pokemon];

     

if(allCookiesExist()){
    
    getCountCookies(); 


    var user_pokemon = document.getElementById("user_pokemon"); 
    var user_pokemon_img = document.getElementById("user_pokemon_img");
    var computer_pokemon = document.getElementById("computer_pokemon");
    var computer_pokemon_img = document.getElementById("computer_pokemon_img");
    user_pokemon.innerHTML+= user.pokemon;
    user_pokemon_img.setAttribute("src",pokemon_images[Cookies.get("user_pokemon")]);
    computer_pokemon.innerHTML+= computer.pokemon;
    computer_pokemon_img.setAttribute("src",pokemon_images[Cookies.get("computer_pokemon")]);
    
    console.log(user.current_health);
    var user_currentHealth = document.getElementById("user_currentHealth");
    user_currentHealth.innerHTML = "your current health is :" + user.current_health + "/" + user.max;
    var user_attackPoints = document.getElementById("user_attackPoints");
    user_attackPoints.innerHTML= "your current attack points :" + user.attackPoints; 
    
    var computer_currentHealth = document.getElementById("computer_currentHealth");
    computer_currentHealth.innerHTML = "computer current health is : " + computer.current_health + "/" + computer.max;
    var computer_attackPoints = document.getElementById("computer_attackPoints");
    computer_attackPoints.innerHTML= " computer current attack points :" + computer.attackPoints; 
    
    winner(); 
}
else{
    window.open("index.html","_self");
}





