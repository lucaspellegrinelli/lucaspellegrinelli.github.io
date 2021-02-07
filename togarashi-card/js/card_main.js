function fill_canvas_with_doms(){
  card_card($("#card-name").val(), $("#card-url").val(), parseFloat($("#card-scale").val()),
    parseFloat($("#card-rotation").val()), parseInt($("#card-cost").val()),
    parseInt($("#card-atk").val()), parseInt($("#card-health").val()),
    parseInt($("#card-speed").val()), $("#type1-select").val(), 
    $("#type2-select").val(), $("#card-effect").val());
}

$(function() {
  fill_canvas_with_doms();
});

$("#create-card").click(() => {
  fill_canvas_with_doms();
});

$("#download-card").click(() => {
  let name = $("#card-name").val();
  let link = document.createElement('a');
  link.download = `${name}.png`;
  prepare_to_download();
  link.href = document.getElementById('canvas').toDataURL()
  link.click();
});