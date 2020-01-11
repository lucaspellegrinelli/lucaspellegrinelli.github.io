import { Simulator } from './simulator.js';

onmessage = function(e){
  let simulator = new Simulator(e.data[0], e.data[1]);
  let result = simulator.run(function(perc){
    postMessage({ done: false, progress: perc });
  });

  result.done = true;
  result.progress = 1;
  postMessage(result);
}
