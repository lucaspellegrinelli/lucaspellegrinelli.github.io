function Simulator(cards, box_type, iterations){
  this.cards = cards;
  this.box_type = box_type;
  this.iterations = iterations;
};

Simulator.prototype.run = function(){
  let simulated = [];
  let pack = new CardPack(this.box_type);

  for(let i = 0; i < this.iterations; i++){
    simulated.push(pack.packs_needed(this.cards));
  }

  return simulated;
}
