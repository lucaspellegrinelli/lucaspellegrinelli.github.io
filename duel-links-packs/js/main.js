const MAIN_BOX = 0
const MINI_BOX = 1
const UR = 0
const SR = 1

const SIM_ITERATIONS = 12345;

$(function(){
  $("#box-list").html("");

  let row = create_new_row();
  create_box_dom(last_box_id++).appendTo(row.find("div:nth-child(1)"));
  create_new_box_dom().appendTo(row.find("div:nth-child(2)"));

  set_box_values(1, {
    boxtype: "MAIN BOX",
    cards: [
      { type: "UR", amount: 3 },
      { type: "UR", amount: 1 },
      { type: "SR", amount: 3 },
      { type: "SR", amount: 2 },
    ]
  });

  $("#simulate-button").click(function(){
    let boxes_cards = [];

    $("#box-list > div > div > #card-box").each(function(){
      let this_box_type = $(this).find("select.box-type-selector > option:selected").val();
      let this_box_cards = [];
      $(this).find("ul").children().each(function(){
        let rarity = $(this).find("select.rarity-select > option:selected").val();
        let amount = $(this).find("select.amount-select > option:selected").val();

        this_box_cards.push({
          "type": rarity == "UR" ? UR : SR,
          "amount": parseInt(amount)
        });
      });

      boxes_cards.push({
        "boxtype": this_box_type == "MAIN BOX" ? MAIN_BOX : MINI_BOX,
        "cards": this_box_cards
      });
    });

    let real_iter = SIM_ITERATIONS / boxes_cards.length;
    if(simulator_worker != undefined){
      simulator_worker.postMessage([boxes_cards, real_iter]);
      simulator_worker.onmessage = function(e){
        update_simulation_ui(e.data.result, e.data.exectime, real_iter);
      }
    }else{
      let simulator = new Simulator(boxes_cards, real_iter);
      let result = simulator.run();
      update_simulation_ui(result.result, result.exectime, real_iter);
    }
  });
});
