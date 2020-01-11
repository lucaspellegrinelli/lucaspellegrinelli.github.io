let last_box_id = 0;
const boxes_per_row = 4;

const MAIN_BOX = 1
const MINI_BOX = 0
const UR = 0
const SR = 1

let simulator_worker = undefined;
if(window.Worker){
  try{
    simulator_worker = new Worker("./js/simulator_worker.js", {type: "module"});
    console.log("Using Workers");
  }catch(e){
    console.log("Not using Workers");
  }
}else{
  console.log("Not using Workers");
}

$(function(){
  $("#box-list").html("");

  let row = create_new_row();
  create_box_dom(last_box_id++).appendTo(row.find("div:nth-child(1)"));
  create_new_box_dom().appendTo(row.find("div:nth-child(2)"));

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

    let iterations = 1234;
    let real_iter = iterations / boxes_cards.length;
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

function update_simulation_ui(simulated, elapsed_time, real_iter){
  let graphmaker = new GraphMaker("cumulative", simulated, real_iter, 50);
  let graph = graphmaker.build_graph();
  let simulated_gems = [];
  simulated.forEach(function(item){ simulated_gems.push(item * 50); });

  $("#mean-packs").html(simulated.mean().toFixed(2));
  $("#std-packs").html(simulated.std().toFixed(2));
  $("#total-packs").html(simulated.sum());
  $("#mean-gems").html(simulated_gems.mean().toFixed(2));
  $("#std-gems").html(simulated_gems.std().toFixed(2));
  $("#time-taken").html(elapsed_time.toFixed(2) + "s");
}

function create_box_dom(id){
  let pack_config = $("<div>", {"class": "pack-config", "id": "card-box"});
  let pack_header = $("<div>", {"class": "pack-header"});
  let pack_title = $("<div>", {"class": "pack-title"}).html("BOX " + (id + 1));
  let box_type = $("<select>", {"class": "box-type-selector"});
  let delete_button = $("<i>", {"class": "material-icons remove-box-button hover-red"}).html("delete");
  let list = $("<ul>", {"class": "list-group"});
  let pack_footer = $("<div>", {"class": "pack-footer"});
  let pack_footer_buttons = $("<div>", {"class": "pack-footer-buttons"});
  let add_button = $("<i>", {"class": "material-icons pack-footer-icon hover-green"}).html("add");
  let remove_button = $("<i>", {"class": "material-icons pack-footer-icon hover-red"}).html("remove");

  create_list_item().appendTo(list);

  $("<option selected>MAIN BOX</option>").appendTo(box_type);
  $("<option>MINI BOX</option>").appendTo(box_type);

  add_button.click(function(){
    create_list_item().appendTo(list);
  });

  remove_button.click(function(){
    if(list.children().length > 1){
      list.children().last().remove();
    }
  });

  delete_button.click(function(){
    if(last_box_id > 1){
      let parent = pack_config.parent();
      pack_config.remove();

      parent.nextAll().each(function(){
        if($(this).find(".pack-title").length > 0){
          let last_id = parseInt($(this).find(".pack-title").html().split(" ")[1]);
          $(this).find(".pack-title").html("BOX " + (last_id - 1));
        }

        $(this).children().first().appendTo($(this).prev());
      });

      if($("#add-box").length == 0){
        create_new_box_dom().appendTo(parent.parent().children().last());
      }

      last_box_id--;
    }
  });

  add_button.appendTo(pack_footer_buttons);
  remove_button.appendTo(pack_footer_buttons);
  pack_footer_buttons.appendTo(pack_footer);
  pack_title.appendTo(pack_header);
  box_type.appendTo(pack_header);
  delete_button.appendTo(pack_header);
  pack_header.appendTo(pack_config);
  list.appendTo(pack_config);
  pack_footer.appendTo(pack_config);

  return pack_config;
}

function create_new_box_dom(){
  let pack_config = $("<div>", {"class": "pack-config", "id": "add-box"});
  let add_pack = $("<div>", {"class": "add-pack"});
  let add_button = $("<i>", {"class": "material-icons add-pack-button"}).html("add");
  let add_text = $("<div>", {"class": "add-pack-text"}).html("ADD NEW BOX");

  add_pack.click(function(){
    let parent = pack_config.parent();
    create_box_dom(last_box_id++).appendTo(parent);

    if(last_box_id < boxes_per_row){
      pack_config.appendTo(parent.next());
    }

    if(last_box_id == boxes_per_row){
      pack_config.remove();
    }
  });

  add_button.appendTo(add_pack);
  add_text.appendTo(add_pack);
  add_pack.appendTo(pack_config);

  return pack_config;
}

function create_new_row(){
  let row = $("<div>", {"class": "row"});
  for(let i = 0; i < boxes_per_row; i++){
    $("<div>", {"class": "col-sm-3"}).appendTo(row);
  }

  row.appendTo($("#box-list"));
  return row;
}

function create_list_item(){
  let list_item = $("<li>", {"class": "list-group-item"});
  let rarity = $("<select>", {"class": "rarity-select"});
  let amount = $("<select>", {"class": "amount-select"});

  $("<option selected>UR</option>").appendTo(rarity);
  $("<option>SR</option>").appendTo(rarity);
  $("<option selected>3</option>").appendTo(amount);
  $("<option>2</option>").appendTo(amount);
  $("<option>1</option>").appendTo(amount);

  rarity.appendTo(list_item);
  amount.appendTo(list_item);

  return list_item;
}
