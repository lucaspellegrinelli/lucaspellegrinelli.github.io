let stats_positions = {
  "cost": [40, 401],
  "attack": [118, 401],
  "defense": [196, 401],
  "speed": [275, 401]
}

function fill_stuff(){
  clear_stuff();

  $('canvas')
  .addLayer(create_circle(stats_positions["cost"], '#9b59b6', '#8e44ad'))
  .addLayer(create_circle(stats_positions["attack"], '#e74c3c', '#c0392b'))
  .addLayer(create_circle(stats_positions["defense"], '#3498db', '#2980b9'))
  .addLayer(create_circle(stats_positions["speed"], '#2ecc71', '#27ae60'));

  $('canvas')
  .addLayer(create_img("img/cost.png", 0.22, stats_positions["cost"]))
  .addLayer(create_img("img/atk.png", 0.2, stats_positions["attack"]))
  .addLayer(create_img("img/def.png", 0.2, stats_positions["defense"]))
  .addLayer(create_img("img/speed.png", 0.2, stats_positions["speed"]));

  $('canvas')
  .addLayer(create_text($('#card-cost').val(), "#e9e9e9", stats_positions["cost"]))
  .addLayer(create_text($('#card-atk').val(), "#e9e9e9", stats_positions["attack"]))
  .addLayer(create_text($('#card-health').val(), "#e9e9e9", stats_positions["defense"]))
  .addLayer(create_text($('#card-speed').val(), "#e9e9e9", stats_positions["speed"]));

  $('canvas')
  .addLayer(create_img(`img/shadow.png`, 0.08, type_position))
  .addLayer(create_img(`img/tipos/${$("#type1-select").val()}.png`, 0.08, type_position))

  if($("#type2-select").val() != "nenhum"){
    $('canvas')
    .addLayer(create_img(`img/shadow.png`, 0.08, type2_position))
    .addLayer(create_img(`img/tipos/${$("#type2-select").val()}.png`, 0.08, type2_position))
  }

  update_background();

  // $('canvas')
  // .addLayer({
  //   type: 'rectangle',
  //   fillStyle: '#121212',
  //   index: 0,
  //   x: 157.5, y: 220,
  //   width: 315,
  //   height: 440
  // });

  add_backgrounded_text($('#card-effect').val(), effect_position, 10, 280, draggable=true);
  add_backgrounded_text($('#card-name').val(), name_position, 20, 240, draggable=true);

  $('canvas').drawLayers();
}

$(function() {
  fill_stuff();
});

$("#create-card").click(() => {
  if(!locked){
    locked = true;
    fill_stuff();
    locked = false;
  }
});