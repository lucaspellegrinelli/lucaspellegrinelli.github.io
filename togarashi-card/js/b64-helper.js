function process_uploaded_img(input, callback){
  if (input.files && input.files[0]) {
    let img = new Image;

    let canvas = document.createElement('canvas');
    canvas.width = 315;
    canvas.height = 440;
    document.body.appendChild(canvas);
    let ctx = canvas.getContext('2d');

    img.onload = function() {
      ctx.drawImage(img, 0, 0);
      let b64 = read_b64_from_img(ctx);
      callback(b64);
      canvas.remove();
    }

    img.src = URL.createObjectURL(input.files[0]);
  }
}

function add_b64_to_img(b64){
  console.log("Saved B64:", b64);

  let index = 0;
  const img_width = 315;
  const start_y = 440;

  for (let i = 0; i < b64.length; i += 3) {
    let r = b64.charCodeAt(i + 0);
    let g = b64.charCodeAt(i + 1);
    let b = b64.charCodeAt(i + 2);

    if(isNaN(r)) r = 0;
    if(isNaN(g)) g = 0;
    if(isNaN(b)) b = 0;

    let x = index % img_width + 1;
    let y = Math.trunc(index / img_width) + start_y;
    index++;

    $('#canvas').addLayer({
      type: 'rectangle',
      index: -1,
      name: `b64layer_${index - 1}`,
      strokeWidth: 1,
      strokeStyle: `rgba(${r}, ${g}, ${b}, 255)`,
      fillStyle: `rgba(${r}, ${g}, ${b}, 255)`,
      x: x, y: y,
      width: 1,
      height: 1,
    });
  }

  let x = index % img_width + 1;
  let y = Math.trunc(index / img_width) + start_y;

  $('#canvas').addLayer({
    type: 'rectangle',
    index: -1,
    name: `b64layer_${index}`,
    strokeWidth: 1,
    strokeStyle: `rgba(0, 0, 0, 255)`,
    fillStyle: `rgba(0, 0, 0, 255)`,
    x: x, y: y,
    width: 1,
    height: 1,
  });
}

function read_b64_from_img(ctx){
  let b64 = "";

  let pixels = ctx.getImageData(0, 439, 315, 1).data;

  for(let i = 0; i < pixels.length; i += 4){
    let a = pixels[i];
    let b = pixels[i + 1];
    let c = pixels[i + 2];

    if(a > 0) b64 += String.fromCharCode(a);
    else break;

    if(b > 0) b64 += String.fromCharCode(b);
    else break;

    if(c > 0) b64 += String.fromCharCode(c);
    else break;
  }

  console.log("Loaded B64:", b64);
  return b64;
}