const display = document.querySelector("#display");
var wallet = 0;

const weapons = {
  woodPick : {
    damage : 2,
    price : 20,
    assign : document.querySelector('[data-pick="wood"]'),
  },
  ironPick : {
    damage : 4,
    price : 100,
    assign : document.querySelector('[data-pick="iron"]'),
  },
  diamondPick : {
    damage : 4,
    price : 400,
    assign : document.querySelector('[data-pick="diamond"]'),
  },
}
const user = {
  name : "Wezu",
  weapon : weapons.woodPick,
}

console.log(weapons)
console.log(weapons.diamondPick.assign)

function inc(){
  wallet += user.weapon.damage;
  display.innerHTML = wallet;
  for(var x in weapons){
    console.log(x)
    /*console.log(x.price)
    if(x.price<=wallet){
      console.log("true")
      x.assignedButton.disabled = "false";
    }*/
  }
}
