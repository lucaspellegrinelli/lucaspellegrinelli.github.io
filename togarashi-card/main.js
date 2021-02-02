// $("canvas").drawPolygon({
//   draggable: true,
//   fillStyle: "#6c3",
//   x: 100, y: 100,
//   radius: 50, sides: 5
// });

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
  }).drawLayers();
});

$("#create-card").click(() => {
  $('canvas')
    .removeLayer('image-layer')
    .removeLayer('cost-layer')
    .removeLayer('atk-layer')
    .removeLayer('health-layer')
    .removeLayer('effect-layer')
    .removeLayer('effect-bg-layer')
    .addLayer({
    type: 'image',
    layer: true,
    index: 0,
    name: 'image-layer',
    source: $('#card-url').val(),
    draggable: true,
    rotate: parseFloat($('#card-rotation').val()),
    scale: parseFloat($('#card-scale').val()) / 100,
    x: 157, y: 220
  }).addLayer({
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
  }).drawLayers();
});