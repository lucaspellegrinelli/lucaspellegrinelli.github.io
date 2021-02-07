function prepare_to_download(){
  let img_layer = $('canvas').getLayer('image-layer');
  let img_x = img_layer.x;
  let img_y = img_layer.y;
  let b64 = btoa(JSON.stringify([...last_info, img_x, img_y]));
  console.log([...last_info, img_x, img_y]);
  add_b64_to_img(b64);
}

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
  let c = document.getElementById("canvas");
  let ctx = c.getContext("2d");

  let index = 0;
  const img_width = 315;
  const start_y = 439;

  for (let i = 0; i < b64.length; i += 3) {
    let r = b64.charCodeAt(i + 0);
    let g = b64.charCodeAt(i + 1);
    let b = b64.charCodeAt(i + 2);

    if(isNaN(r)) r = 0;
    if(isNaN(g)) g = 0;
    if(isNaN(b)) b = 0;

    let x = index % img_width;
    let y = Math.trunc(index / img_width) + start_y;
    index++;

    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 255)`;
    ctx.fillRect(x, y, 1, 1);
  }

  let x = index % img_width;
  let y = Math.trunc(index / img_width) + start_y;
  ctx.fillStyle = `rgba(0, 0, 0, 255)`;
  ctx.fillRect(x, y, 1, 1);
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

  return b64;
}