let loading_colors = ["16a085", "#0D6E5B"];
let current_loading_color = 0;

let button_enabled = true;

$(function(){
  initiate_simulation(true);

  $("#simulate-button").click(function(){
    initiate_simulation(false);
  });
});

function initiate_simulation(initial=false){
  if(!button_enabled) return;

  button_enabled = false;
  if(!initial && simulator_worker != undefined) percentage_ui_color();

  let dex = parseInt($("#dex").val());
  let crit = parseInt($("#crit").val());
  let swat = parseInt($("#swat").val());
  let low_guard = parseInt($("#low_guard").val());
  let resistence = parseInt($("#resistence").val());
  let duration = parseFloat($("#duration").val());

  if(simulator_worker != undefined){
    simulator_worker.postMessage([dex, crit, swat, low_guard, low_guard + resistence, duration]);
    simulator_worker.onmessage = function(e){
      if(e.data.done){
        update_simulation_ui(e.data.result, e.data.exectime);
        button_enabled = true;
      }else if(!initial){
        percentage_ui_update(e.data.progress);
      }
    }
  }else{
    let simulator = new Simulator(dex, crit, swat, low_guard, low_guard + resistence, duration);
    let result = simulator.run(percentage_ui_update);
    update_simulation_ui(result.result, result.exectime);
    button_enabled = true;
  }
}

function percentage_ui_color(){
  $("#simulate-button > .simulate-progress").css("width", 0);
  $("#simulate-button").css("background-color", loading_colors[current_loading_color]);
  current_loading_color = current_loading_color == 0 ? 1 : 0;
  $("#simulate-button > .simulate-progress").css("background-color", loading_colors[current_loading_color]);
}

function percentage_ui_update(perc){
  $("#simulate-button > .simulate-progress").css("width", (perc * 100).toFixed(1) + "%");
}

function update_simulation_ui(simulated, elapsed_time) {
  let graphmaker = new GraphMaker("cumulative", simulated);
  let graph = graphmaker.build_graph();
  
  let low_avg_hits = 0;
  for(let key in simulated["low"]){
    low_avg_hits += key * simulated["low"][key] / simulated["count"];
  }

  let high_avg_hits = 0;
  for (let key in simulated["high"]) {
    high_avg_hits += key * simulated["high"][key] / simulated["count"];
  }

  $("#mean-packs").html(low_avg_hits.toFixed(2));
  // $("#std-packs").html(simulated.std().toFixed(2));
  $("#mean-gems").html(high_avg_hits.toFixed(2));
  // $("#std-gems").html(simulated_gems.std().toFixed(2));
  $("#total-packs").html(simulated["count"].toFixed(0));
  $("#time-taken").html(elapsed_time.toFixed(2) + "s");
}