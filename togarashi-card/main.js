// $("canvas").drawPolygon({
//   draggable: true,
//   fillStyle: "#6c3",
//   x: 100, y: 100,
//   radius: 50, sides: 5
// });

let type_colors = {
  "vazio": "#95a5a6",
  "vento": "#2ecc71",
  "terra": "#e67e22",
  "agua": "#2980b9",
  "fogo": "#e74c3c"
}

let last_url = "";
let last_tam = 100;
let last_rot = 0;

$(function() {
  $('canvas').addLayer({
    type: 'arc',
    layer: true,
    groups: ['info-holder'],
    fillStyle: '#34495e',
    strokeStyle: '#2c3e50',
    strokeWidth: 5,
    x: 43, y: 43,
    radius: 37
  }).addLayer({
    type: 'arc',
    layer: true,
    groups: ['info-holder'],
    fillStyle: '#3498db',
    strokeStyle: '#2980b9',
    strokeWidth: 5,
    x: 35, y: 440 - 35,
    radius: 30
  }).addLayer({
    type: 'arc',
    layer: true,
    groups: ['info-holder'],
    fillStyle: '#e74c3c',
    strokeStyle: '#c0392b',
    strokeWidth: 5,
    x: 315 - 35, y: 440 - 35,
    radius: 30
  }).addLayer({
    type: 'text',
    name: 'card-type-name',
    fillStyle: '#1c1c1c',
    fontSize: '10pt',
    fontStyle: 'bold',
    fontFamily: 'Trebuchet MS, sans-serif',
    text: "agua",
    x: 315 - 35, y: 35,
    maxWidth: 170
  }).addLayer({
    type: 'arc',
    layer: true,
    index: -1,
    name: 'card-type',
    fillStyle: type_colors["agua"],
    strokeStyle: '#e9e9e9',
    strokeWidth: 2,
    x: 315 - 35, y: 35,
    radius: 30
  }).addLayer({
    type: 'image',
    layer: true,
    index: -1,
    source: 'img/atk.png',
    scale: 0.08,
    x: 35, y: 440 - 35
  }).addLayer({
    type: 'image',
    source: 'img/def.png',
    scale: 0.14,
    x: 315 - 35, y: 440 - 35
  }).addLayer({
    type: 'image',
    layer: true,
    index: 0,
    name: 'image-layer',
    source: "https://i.imgur.com/1az6btP.png",
    draggable: true,
    rotate: 15,
    scale: 1.26,
    x: 165, y: 220
  }).addLayer({
    type: 'text',
    layer: true,
    name: 'cost-layer',
    fillStyle: '#e9e9e9',
    fontStyle: 'bold',
    fontSize: '40pt',
    fontFamily: 'Trebuchet MS, sans-serif',
    text: "2",
    x: 44, y: 47
  }).addLayer({
    type: 'text',
    layer: true,
    name: 'atk-layer',
    fillStyle: '#e9e9e9',
    fontStyle: 'bold',
    fontSize: '30pt',
    fontFamily: 'Trebuchet MS, sans-serif',
    text: "2",
    x: 35, y: 440 - 32
  }).addLayer({
    type: 'text',
    layer: true,
    name: 'health-layer',
    fillStyle: '#e9e9e9',
    fontStyle: 'bold',
    fontSize: '30pt',
    fontFamily: 'Trebuchet MS, sans-serif',
    text: "2",
    x: 315 - 35, y: 440 - 32
  }).drawLayers();
});

$("#create-card").click(() => {
  $('canvas')
    .removeLayer('cost-layer')
    .removeLayer('atk-layer')
    .removeLayer('health-layer')
    .removeLayer('effect-layer')
    .removeLayer('effect-bg-layer')
    .removeLayer('card-type')
    .removeLayer('card-type-name');

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
      layer: true,
      index: 0,
      name: 'image-layer',
      source: last_url,
      draggable: true,
      rotate: last_rot,
      scale: last_tam / 100,
      x: last_x, y: last_y
    });
  }

  $('canvas').addLayer({
    type: 'text',
    layer: true,
    name: 'cost-layer',
    fillStyle: '#e9e9e9',
    fontStyle: 'bold',
    fontSize: '40pt',
    fontFamily: 'Trebuchet MS, sans-serif',
    text: $('#card-cost').val(),
    x: 44, y: 47
  }).addLayer({
    type: 'text',
    layer: true,
    name: 'atk-layer',
    fillStyle: '#e9e9e9',
    fontStyle: 'bold',
    fontSize: '30pt',
    fontFamily: 'Trebuchet MS, sans-serif',
    text: $('#card-atk').val(),
    x: 35, y: 440 - 32
  }).addLayer({
    type: 'text',
    layer: true,
    name: 'health-layer',
    fillStyle: '#e9e9e9',
    fontStyle: 'bold',
    fontSize: '30pt',
    fontFamily: 'Trebuchet MS, sans-serif',
    text: $('#card-health').val(),
    x: 315 - 35, y: 440 - 32
  }).addLayer({
    type: 'text',
    layer: true,
    name: 'effect-layer',
    fillStyle: '#1c1c1c',
    fontSize: '10pt',
    fontStyle: 'bold',
    fontFamily: 'Trebuchet MS, sans-serif',
    text: $('#card-effect').val(),
    x: 157, y: 405,
    maxWidth: 170
  }).addLayer({
    type: 'rectangle',
    index: -1,
    name: 'effect-bg-layer',
    fillStyle: '#ffffff80',
    x: 157, y: 405,
    width: $('canvas').measureText('effect-layer').width > 0 ? $('canvas').measureText('effect-layer').width + 10 : 0,
    height: $('canvas').measureText('effect-layer').height > 0 ? $('canvas').measureText('effect-layer').height + 10 : $('canvas').measureText('effect-layer').height,
  }).addLayer({
    type: 'text',
    name: 'card-type-name',
    fillStyle: '#1c1c1c',
    fontSize: '10pt',
    fontStyle: 'bold',
    fontFamily: 'Trebuchet MS, sans-serif',
    text: $('#type-select').val(),
    x: 315 - 35, y: 35,
    maxWidth: 170
  }).addLayer({
    type: 'arc',
    index: -1,
    name: 'card-type',
    fillStyle: type_colors[$('#type-select').val()],
    strokeStyle: '#e9e9e9',
    strokeWidth: 2,
    x: 315 - 35, y: 35,
    radius: 30
  }).drawLayers();
});