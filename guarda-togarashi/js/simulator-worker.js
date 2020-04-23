// ------------ FLAGS ------------ //
const MAIN_BOX = 0
const MINI_BOX = 1
const SELECTION = 2;
const UR = 0
const SR = 1

// ------------ PROTOTYPES ------------ //
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

function Simulator(dex, crit, swat, low_g, high_g, duration){
  this.dex = dex;
  this.crit = crit;
  this.swat = swat;
  this.low_g = low_g;
  this.high_g = high_g;
  this.duration = duration;

  this.togarashi_roll = function (rolls, dice_sides, dice_suc, crit_sides = 1, modifier=0){
    function roll_n_dice(n){
      return [...Array(n)].map(() => Math.floor(Math.random() * dice_sides) + 1);
    }

    function count_in_rolls(roll, test){
      let count = 0;
      for (let i = 0; i < roll.length; i++) {
        if (test(roll[i])) count++;
      }
      return count;
    }

    function count_crit_err(roll){
      return count_in_rolls(roll, (x) => { return x == 1; })
    }

    function count_maxs(roll){
      return count_in_rolls(roll, (x) => { return x >= (dice_sides - crit_sides + 1); })
    }

    function count_suc(roll){
      return count_in_rolls(roll, (x) => { return ((x != 1) && ((x + modifier) >= dice_suc)); })
    }

    roll = roll_n_dice(rolls);
    ones = count_crit_err(roll);
    maxs = count_maxs(roll);
    suc = count_suc(roll);
    non_max_suc = suc - maxs;
    del_max = Math.max(0, ones - non_max_suc);
    n_reroll = maxs - del_max;

    while(n_reroll > 0){
      roll = roll_n_dice(n_reroll);
      maxs = count_maxs(roll);
      suc += count_suc(roll);
      n_reroll = maxs;
    }

    return suc - ones
  }

  this.run = function(percentage_callback){
    let start_sim_time = new Date().getTime();
    let simulated = {
      "low": {},
      "high": {},
      "count": 0
    };

    let last_perc_report = 0;
    while (true){
      let elapsed_time = (new Date().getTime() - start_sim_time) / 1000;
      if(elapsed_time > this.duration) break;

      let curr_perc = elapsed_time / this.duration;
      if (curr_perc - last_perc_report > (this.duration / 25)){
        last_perc_report = curr_perc;
        percentage_callback(elapsed_time / this.duration);
      }

      let low_guard_suc = this.togarashi_roll(this.dex, 10, this.low_g, this.crit, this.swat);
      let high_guard_suc = this.togarashi_roll(this.dex, 10, this.high_g, this.crit, this.swat);

      low_guard_suc = Math.max(0, low_guard_suc);
      high_guard_suc = Math.max(0, high_guard_suc);

      if(!(low_guard_suc in simulated["low"])){
        simulated["low"][low_guard_suc] = 0;
      }

      if (!(high_guard_suc in simulated["high"])) {
        simulated["high"][high_guard_suc] = 0;
      }

      simulated["low"][low_guard_suc] += 1;
      simulated["high"][high_guard_suc] += 1;
      simulated["count"] += 1;
    }

    return {
      "result": simulated,
      "exectime": (new Date().getTime() - start_sim_time) / 1000
    }
  }
};

// ------------ WORKER ------------ //
onmessage = function(e){
  let simulator = new Simulator(e.data[0], e.data[1], e.data[2], e.data[3], e.data[4], e.data[5], e.data[6]);
  let result = simulator.run(function(perc){
    postMessage({ done: false, progress: perc });
  });

  result.done = true;
  result.progress = 1;
  postMessage(result);
}
