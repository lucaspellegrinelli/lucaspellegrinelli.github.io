let stats_positions = {
  "cost": [40, 401],
  "attack": [118, 401],
  "defense": [196, 401],
  "speed": [275, 401]
}

let effect_position = [157, 345];
let name_position = [127, 35];
let type_position = [275, 39];

let last_url = "";
let last_tam = 100;
let last_rot = 0;

let curr_layer_name = 0;

function create_circle(pos, fill, stroke){
  return {
    type: 'arc',
    name: `layer_${curr_layer_name++}`,
    fillStyle: fill,
    strokeStyle: stroke,
    strokeWidth: 5,
    x: pos[0], y: pos[1],
    radius: 30
  }
}

function create_img(src, scale, pos){
  return {
    type: 'image',
    name: `layer_${curr_layer_name++}`,
    source: src,
    scale: scale,
    x: pos[0], y: pos[1],
  }
}

function create_text(text, fill, pos){
  return {
    type: 'text',
    name: `layer_${curr_layer_name++}`,
    fillStyle: fill,
    fontStyle: 'bold',
    fontSize: '30pt',
    fontFamily: 'Trebuchet MS, sans-serif',
    text: text,
    x: pos[0], y: pos[1],
  }
}

function add_backgrounded_text(text, pos, size, max_w){
  $('canvas').addLayer({
    type: 'text',
    name: `layer_${curr_layer_name++}`,
    fillStyle: '#1c1c1c',
    fontSize: `${size}pt`,
    fontStyle: 'bold',
    fontFamily: 'Trebuchet MS, sans-serif',
    text: text,
    x: pos[0], y: pos[1],
    maxWidth: max_w
  }).addLayer({
    type: 'rectangle',
    index: -1,
    name: `layer_${curr_layer_name++}`,
    fillStyle: '#ffffffA8',
    x: pos[0], y: pos[1],
    width: $('canvas').measureText(`layer_${curr_layer_name - 2}`).width > 0 ? $('canvas').measureText(`layer_${curr_layer_name - 2}`).width + 10 : 0,
    height: $('canvas').measureText(`layer_${curr_layer_name - 2}`).height > 0 ? $('canvas').measureText(`layer_${curr_layer_name - 2}`).height + 10 : 0,
  });
}

function update_background(){
  if($('#card-url').val() != last_url || parseFloat($('#card-rotation').val()) != last_rot || parseFloat($('#card-scale').val()) != last_tam){
    last_url = $('#card-url').val();
    last_rot = parseFloat($('#card-rotation').val());
    last_tam = parseFloat($('#card-scale').val());

    if($('canvas').getLayer('image-layer')){
      var last_x = $('canvas').getLayer('image-layer').x;
      var last_y = $('canvas').getLayer('image-layer').y;
    }else{
      var last_x = 157;
      var last_y = 220;
    }

    $('canvas').removeLayer('image-layer').addLayer({
      type: 'image',
      index: 0,
      name: 'image-layer',
      source: last_url,
      draggable: true,
      rotate: last_rot,
      scale: last_tam / 100,
      x: last_x, y: last_y
    });
  }
}

function clear_stuff(){
  for(let i = 0; i < curr_layer_name; i++){
    $('canvas').removeLayer(`layer_${i}`).drawLayers();
  }

  $('canvas').removeLayer(`effect-layer`).drawLayers();
  $('canvas').clearCanvas();
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
  .addLayer(create_img(`img/shadow.png`, 0.1, type_position))
  .addLayer(create_img(`img/tipos/${$("#type-select").val()}.png`, 0.1, type_position))

  update_background();

  add_backgrounded_text($('#card-effect').val(), effect_position, 10, 280);
  add_backgrounded_text($('#card-name').val(), name_position, 20, 230);

  $('canvas').drawLayers();
}

$(function() {
  fill_stuff();
});

$("#create-card").click(() => {
  fill_stuff();
});