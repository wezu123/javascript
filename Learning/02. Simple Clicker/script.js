const display = document.querySelector("#display");
var wallet = 16;

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
    if(weapons[x].price<=wallet){
      weapons[x].assign.disabled = false;
    }else{
      weapons[x].assign.disabled = true;
    }
  }
}

function buy(obj){
  console.log(weapons.eval(obj))
  if(wallet>weapons.eval(obj).price){
  wallet -= weapons.test.price;
  user.weapon = weapons.test;
  inc();
}
}
