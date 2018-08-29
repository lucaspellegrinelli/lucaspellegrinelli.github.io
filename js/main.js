let text = "work -in progress"
let textDOM = document.getElementById("command");
let currentActionIndex = 0;

function loop(){
  let delay = 2500; // Waiting speed (ms)

  if (currentActionIndex < text.length && currentActionIndex != 0) delay = 75 + (Math.random() * 75); // Writting speed (ms)
  else if(currentActionIndex > text.length) delay = 50; // Erasing speed (ms)

  setTimeout(function (){
    nextTextFrame();
    loop();
  }, delay);
}

function nextTextFrame(){
  if(currentActionIndex++ < text.length){
    // Writting the command
    for(; text.charAt(currentActionIndex - 1) == ' '; currentActionIndex++)
      textDOM.innerHTML += text.charAt(currentActionIndex - 1);

    textDOM.innerHTML += text.charAt(currentActionIndex - 1);
  }else{
    // Erasing the command
    textDOM.innerHTML = textDOM.innerHTML.substring(0, textDOM.innerHTML.length - 1);
    if(textDOM.innerHTML.length == 0) currentActionIndex = 0;
  }
}

loop();
