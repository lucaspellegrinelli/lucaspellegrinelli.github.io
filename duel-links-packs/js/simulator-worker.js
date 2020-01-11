import { Simulator } from './simulator.js';

onmessage = function(e){
  let simulator = new Simulator(e.data[0], e.data[1]);
  postMessage(simulator.run());
}
