const CARDS_WANTED = [
	{"type": UR, "amount": 1},
	{"type": SR, "amount": 2},
	{"type": SR, "amount": 2},

	{"type": UR, "amount": 1},
	{"type": SR, "amount": 1},
]

const BOX = MINI_BOX;
const ITERATIONS = 100000;

let start_sim_time = new Date().getTime();

let simulator_promise = new Promise(resolve => {
  start_sim_time = new Date().getTime();
  let simulator = new Simulator(CARDS_WANTED, BOX, ITERATIONS);
  resolve(simulator.run());
});

simulator_promise.then(function(simulated){
  let graphmaker = new GraphMaker("cumulative", simulated, ITERATIONS, 50);
  let graph = graphmaker.build_graph();

  $("#mean-packs").html(simulated.mean().toFixed(2));
  $("#std-packs").html(simulated.std().toFixed(2));

  $("#total-packs").html(simulated.sum());

  let simulated_gems = [];
  simulated.forEach(function(item){
    simulated_gems.push(item * 50);
  });

  $("#mean-gems").html(simulated_gems.mean().toFixed(2));
  $("#std-gems").html(simulated_gems.std().toFixed(2));

  let elapsed_time = (new Date().getTime() - start_sim_time) / 1000;
  $("#time-taken").html(elapsed_time.toFixed(2) + "s");
});
