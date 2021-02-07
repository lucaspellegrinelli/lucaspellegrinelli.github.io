let curr_card_b64 = "";

$(function() {
  curr_card_b64 = card_card($("#card-name").val(), $("#card-url").val(), parseFloat($("#card-scale").val()),
    parseFloat($("#card-rotation").val()), $("#card-cost").val(), $("#card-atk").val(),
    $("#card-health").val(), $("#card-speed").val(), $("#type1-select").val(), 
    $("#type2-select").val(), $("#card-effect").val());

  console.log(curr_card_b64);
});

$("#create-card").click(() => {
  curr_card_b64 = card_card($("#card-name").val(), $("#card-url").val(), parseFloat($("#card-scale").val()),
    parseFloat($("#card-rotation").val()), $("#card-cost").val(), $("#card-atk").val(),
    $("#card-health").val(), $("#card-speed").val(), $("#type1-select").val(), 
    $("#type2-select").val(), $("#card-effect").val());
});

$("#download-card").click(() => {
  let img = $('canvas').getCanvasImage();
  console.log(img);
});