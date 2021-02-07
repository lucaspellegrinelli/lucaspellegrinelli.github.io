let stats_positions = {
  "cost": [40, 401],
  "attack": [118, 401],
  "defense": [196, 401],
  "speed": [275, 401]
}

function create_card(name, img, img_size, img_rot, cost, atk, health, speed, type1, type2, effect, img_x=157, img_y=220){
  clear_canvas();

  $('#canvas')
  .addLayer(create_circle(stats_positions["cost"], '#9b59b6', '#8e44ad'))
  .addLayer(create_circle(stats_positions["attack"], '#e74c3c', '#c0392b'))
  .addLayer(create_circle(stats_positions["defense"], '#3498db', '#2980b9'))
  .addLayer(create_circle(stats_positions["speed"], '#2ecc71', '#27ae60'));

  $('#canvas')
  .addLayer(create_img("img/cost.png", 0.22, stats_positions["cost"]))
  .addLayer(create_img("img/atk.png", 0.2, stats_positions["attack"]))
  .addLayer(create_img("img/def.png", 0.2, stats_positions["defense"]))
  .addLayer(create_img("img/speed.png", 0.2, stats_positions["speed"]));

  $('#canvas')
  .addLayer(create_text(cost, "#e9e9e9", stats_positions["cost"]))
  .addLayer(create_text(atk, "#e9e9e9", stats_positions["attack"]))
  .addLayer(create_text(health, "#e9e9e9", stats_positions["defense"]))
  .addLayer(create_text(speed, "#e9e9e9", stats_positions["speed"]));

  $('#canvas')
  .addLayer(create_img(`img/shadow.png`, 0.08, type_position))
  .addLayer(create_img(`img/tipos/${type1}.png`, 0.08, type_position))

  if(type2 != "nenhum"){
    $('#canvas')
    .addLayer(create_img(`img/shadow.png`, 0.08, type2_position))
    .addLayer(create_img(`img/tipos/${type2}.png`, 0.08, type2_position))
  }

  update_background(img, img_size, img_rot, img_x, img_y);

  add_backgrounded_text(effect, effect_position, 10, 280, draggable=true);
  add_backgrounded_text(name, name_position, 20, 240, draggable=true);

  $('#canvas').drawLayers();

  let b64 = btoa(JSON.stringify([
    name, img, img_size, img_rot, cost, atk, health, speed, type1, type2, effect
  ]));
  clear_b64();
  add_b64_to_img(b64);
}

function create_card_from_b64(b64){
  let v = JSON.parse(atob(b64));

  create_card(v[0], v[1], v[2], v[3], v[4], v[5], v[6], v[7], v[8], v[9], v[10]);
  $("#card-name").val(v[0]);
  $("#card-url").val(v[1]);
  $("#card-scale").val(v[2]);
  $("#card-rotation").val(v[3]);
  $("#card-cost").val(v[4]);
  $("#card-atk").val(v[5]);
  $("#card-health").val(v[6]);
  $("#card-speed").val(v[7]);
  $("#type1-select").val(v[8]);
  $("#type2-select").val(v[9]);
  $("#card-effect").val(v[10]);
}