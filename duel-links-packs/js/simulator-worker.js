const MAIN_BOX = 0
const MINI_BOX = 1
const UR = 0
const SR = 1

Array.prototype.sum = function(){
  return this.reduce((a, b) => a + b, 0);
}

Array.prototype.mean = function(){
  return this.sum() / this.length;
}

Array.prototype.std = function(){
  let mean = this.mean();
  let diff_sq = 0;
  this.forEach(function(item){
    diff_sq += Math.pow(item - mean, 2);
  });

  return Math.sqrt(diff_sq / this.length);
};

Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  if (i == 0) return this;
  while(--i) {
     j = Math.floor(Math.random() * (i + 1));
     temp = this[i];
     this[i] = this[j];
     this[j] = temp;
  }
  return this;
}

function CardPack(pack_type){
  this.pack_type = pack_type;
  this.cards_in_pack = this.pack_type == MINI_BOX ? 100 : 180

  this.amount_in_pack = function(card){
    return (this.pack_type == MINI_BOX || card.type == UR) ? 1 : 2;
  }

  this.packs_needed = function(wanted_){
    let wanted = wanted_.map(a => ({...a}));
    let ctx = this;
    let n_packs = 0;
    let amount = [];

    wanted.forEach(function(item){
      amount.push(ctx.amount_in_pack(item));
    });

    let packs_needed_per_card = [];
    wanted.forEach(function(card, i){
      packs_needed_per_card.push(Math.ceil(card.amount / amount[i]))
    });
    let max_packs = Math.max(...packs_needed_per_card);

    function pack(card, amt_in_box, curr_pack){
      return card.pos[card.amount - (amt_in_box * (max_packs - curr_pack - 1)) - 1];
    };

    function check(card, amt_in_box, curr_pack){
      return Math.ceil(card.amount / amt_in_box) == (max_packs - curr_pack);
    };

    for(let p = 0; p < max_packs; p++){
      let cards_id = [];
      for(let c = 0; c < this.cards_in_pack; cards_id.push(c++));
      let positions = cards_id.shuffle().slice(amount.sum());

      wanted.forEach(function(card, index){
        wanted[index]["pos"] = [];
        for(let i = 0; i < amount[index]; i++, wanted[index].pos.push(positions.pop()));
      });

      let possible_last_packs = [];
      wanted.forEach(function(card, i){
        if(check(card, amount[i], p)){
          possible_last_packs.push(pack(card, amount[i], p));
        }
      });
      let last_pack = Math.max(...possible_last_packs);
      n_packs += last_pack + 1;

      wanted.forEach(function(card, i){
        let opened_cards_count = 0;
        card.pos.forEach(function(item){
          if(item <= last_pack) opened_cards_count++;
        });

        wanted[i].amount -= opened_cards_count;
        wanted[i].amount = Math.max(0, wanted[i].amount);
      });
    }

    return n_packs;
  }
};

function Simulator(boxes_cards, iterations){
  this.boxes_cards = boxes_cards;
  this.iterations = iterations;

  this.run = function(percentage_callback){
    let start_sim_time = new Date().getTime();
    let simulated = [];

    for(let i = 0; i < this.iterations; i++){
      if(i % Math.trunc(this.iterations / 25) == 0) percentage_callback(i / this.iterations);

      let total_simulated = 0;
      this.boxes_cards.forEach(function(box_info){
        let box = new CardPack(box_info.boxtype);
        total_simulated += box.packs_needed(box_info.cards);
      });

      simulated.push(total_simulated);
    }

    return {
      "result": simulated,
      "exectime": (new Date().getTime() - start_sim_time) / 1000
    }
  }
};

onmessage = function(e){
  let simulator = new Simulator(e.data[0], e.data[1]);
  let result = simulator.run(function(perc){
    postMessage({ done: false, progress: perc });
  });

  result.done = true;
  result.progress = 1;
  postMessage(result);
}
