let stats_positions = {
  "cost": [118, 401],
  "speed": [196, 401]
}

function create_spell(name, img, img_size, img_rot, cost, speed, type1, type2, effect){
  clear_stuff();

  $('#canvas')
  .addLayer(create_circle(stats_positions["cost"], '#9b59b6', '#8e44ad'))
  .addLayer(create_circle(stats_positions["speed"], '#2ecc71', '#27ae60'));

  $('#canvas')
  .addLayer(create_img("img/cost.png", 0.22, stats_positions["cost"]))
  .addLayer(create_img(`img/${speed}.png`, 0.2, stats_positions["speed"]));

  $('#canvas')
  .addLayer(create_text(cost, "#e9e9e9", stats_positions["cost"]));

  $('#canvas')
  .addLayer(create_img(`img/shadow.png`, 0.08, type_position))
  .addLayer(create_img(`img/tipos/${type1}.png`, 0.08, type_position))

  if(type2 != "nenhum"){
    $('#canvas')
    .addLayer(create_img(`img/shadow.png`, 0.08, type2_position))
    .addLayer(create_img(`img/tipos/${type2}.png`, 0.08, type2_position))
  }

  update_background(img, img_size, img_rot);

  add_backgrounded_text(effect, effect_position, 10, 280, draggable=true);
  add_backgrounded_text(name, name_position, 20, 240, draggable=true);

  $('#canvas').drawLayers();

  return btoa(JSON.stringify([
    name, img, img_size, img_rot, cost, speed, type1, type2, effect
  ]));
}