$(function() {
  const name = "Javali Espinhoso";
  const url = "https://i.imgur.com/pAmUZMT.jpg";
  const scale = 100;
  const rotation = 0;
  const cost = 2;
  const atk = 2;
  const health = 2;
  const speed = 2;
  const type1 = "terra";
  const type2 = "vazio";
  const effect = "Essa carta tem o poder de matar tudo, todos e algo mais";

  create_card(name, url, scale, rotation, cost, atk, health, speed, type1, type2, effect);
  fill_form(name, url, scale, rotation, cost, atk, health, speed, type1, type2, effect);
});

$("#canvas").mouseup(() => {
  update_b64_info();
})

$("#create-card").click(() => {
  const name = $("#card-name").val();
  const url = $("#card-url").val();
  const scale = parseFloat($("#card-scale").val());
  const rotation = parseFloat($("#card-rotation").val());
  const cost = parseInt($("#card-cost").val());
  const atk = parseInt($("#card-atk").val());
  const health = parseInt($("#card-health").val());
  const speed = parseInt($("#card-speed").val());
  const type1 = $("#type1-select").val();
  const type2 = $("#type2-select").val();
  const effect = $("#card-effect").val();

  create_card(name, url, scale, rotation, cost, atk, health, speed, type1, type2, effect);
});