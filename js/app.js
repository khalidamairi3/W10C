var pokemons=["pikatchu","chaizard","Bulbasaur"];
var attacks_count={
    pikatchu: "85358",
    chaizard: "22523",
    Bulbasaur: "55534"
}

function gameStart(pokemon){
    Cookies.set("user_pokemon",pokemon);
    Cookies.set("user_maxHealth","100");
    Cookies.set("user_currentHealth","100");
    Cookies.set("user_attackPoints","100");
    Cookies.set("user_attck_count",attacks_count[pokemon]);
    var computer_pokemon =pokemons[Math.floor(Math.random()*3)];
    Cookies.set("computer_pokemon",computer_pokemon);
    Cookies.set("computer_maxHealth","100");
    Cookies.set("computer_currentHealth","100");
    Cookies.set("computer_attackPoints","100");
    Cookies.set("computer_attck_count",attacks_count[computer_pokemon]);
    window.open("../battle.html");


}