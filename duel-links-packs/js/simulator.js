function Simulator(boxes_cards, iterations){
  this.boxes_cards = boxes_cards;
  this.iterations = iterations;
};

Simulator.prototype.run = function(callback){
  let start_sim_time = new Date().getTime();

  let iterations_per_box = Math.round(this.iterations / this.boxes_cards.length);
  let simulated = [];
  for(let i = 0; i < iterations_per_box; i++){
    let total_simulated = 0;
    this.boxes_cards.forEach(function(box_info){
      let box = new CardPack(box_info.boxtype);
      total_simulated += box.packs_needed(box_info.cards);
    });

    simulated.push(total_simulated);
  }

  let elapsed_time = (new Date().getTime() - start_sim_time) / 1000;
  callback(simulated, elapsed_time);
}
