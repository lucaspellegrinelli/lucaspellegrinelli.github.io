let effect_position = [157, 345];
let name_position = [129, 35];
let type_position = [280, 35];
let type2_position = [280, 90];

let last_url = "";
let last_tam = 100;
let last_rot = 0;

let curr_layer_name = 0;
let curr_group_name = 0;

let locked = false;

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
    x: pos[0], y: pos[1] + 3,
  }
}

function add_backgrounded_text(text, pos, size, max_w, draggable=false){
  if(draggable){
    let g = [`group_${curr_group_name++}`];
    $('canvas').addLayer({
      type: 'text',
      name: `layer_${curr_layer_name++}`,
      fillStyle: '#1c1c1c',
      groups: g,
      dragGroups: g,
      draggable: draggable,
      fontSize: `${size}pt`,
      fontStyle: 'bold',
      fontFamily: 'Trebuchet MS, sans-serif',
      text: text,
      restrictDragToAxis: 'y',
      x: pos[0], y: pos[1],
      maxWidth: max_w
    }).addLayer({
      type: 'rectangle',
      index: -1,
      groups: g,
      dragGroups: g,
      draggable: draggable,
      name: `layer_${curr_layer_name++}`,
      fillStyle: '#ffffffCC',
      x: pos[0], y: pos[1],
      restrictDragToAxis: 'y',
      width: $('canvas').measureText(`layer_${curr_layer_name - 2}`).width > 0 ? $('canvas').measureText(`layer_${curr_layer_name - 2}`).width + 10 : 0,
      height: $('canvas').measureText(`layer_${curr_layer_name - 2}`).height > 0 ? $('canvas').measureText(`layer_${curr_layer_name - 2}`).height + 10 : 0,
    });
  }else{
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
      fillStyle: '#ffffffCC',
      x: pos[0], y: pos[1],
      width: $('canvas').measureText(`layer_${curr_layer_name - 2}`).width > 0 ? $('canvas').measureText(`layer_${curr_layer_name - 2}`).width + 10 : 0,
      height: $('canvas').measureText(`layer_${curr_layer_name - 2}`).height > 0 ? $('canvas').measureText(`layer_${curr_layer_name - 2}`).height + 10 : 0,
    });
  }
}

function update_background(img, img_size, img_rot){
  if(img != last_url || img_size != last_rot || img_rot != last_tam){
    last_url = $('#card-url').val();
    last_rot = img_rot;
    last_tam = img_size;

    if($('canvas').getLayer('image-layer')){
      var last_x = $('canvas').getLayer('image-layer').x;
      var last_y = $('canvas').getLayer('image-layer').y;
    }else{
      var last_x = 157;
      var last_y = 220;
    }

    $('canvas').removeLayer('image-layer').removeLayer('image-layer-bg')
    .addLayer({
      type: 'image',
      index: 0,
      name: 'image-layer',
      source: last_url,
      draggable: true,
      rotate: last_rot,
      scale: last_tam / 100,
      x: last_x, y: last_y
    }).addLayer({
      type: 'rectangle',
      name: 'image-layer-bg',
      fillStyle: '#121212',
      index: 0,
      x: 157.5, y: 220,
      width: 315,
      height: 440
    });;
  }
}

function clear_canvas(){
  for(let i = 0; i < curr_layer_name; i++){
    $('canvas').removeLayer(`layer_${i}`).drawLayers();
  }

  $('canvas').removeLayer(`effect-layer`).drawLayers();
  $('canvas').clearCanvas();

  curr_layer_name = 0;
  curr_group_name = 0;
}