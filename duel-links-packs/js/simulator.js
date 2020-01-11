import { CardPack } from './box.js';

export function Simulator(boxes_cards, iterations){
  this.boxes_cards = boxes_cards;
  this.iterations = iterations;

  this.run = function(){
    let start_sim_time = new Date().getTime();
    let simulated = [];

    for(let i = 0; i < this.iterations; i++){
      let total_simulated = 0;

      this.boxes_cards.forEach(function(box_info){
        let box = new CardPack(box_info.boxtype);
        total_simulated += box.packs_needed(box_info.cards);
      });

      simulated.push(total_simulated);
    }

    let elapsed_time = (new Date().getTime() - start_sim_time) / 1000;

    return {
      "result": simulated,
      "exectime": elapsed_time
    }
  }
};
