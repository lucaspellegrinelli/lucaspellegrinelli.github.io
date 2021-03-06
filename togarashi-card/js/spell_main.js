$(function() {
  const name = "Soco do Trovão";
  const url = "https://i.imgur.com/ULBwhyU.png";
  const scale = 100;
  const rotation = 0;
  const cost = 2;
  const speed = "instant";
  const type1 = "fogo";
  const type2 = "nenhum";
  const effect = "Essa carta tem o poder de ser nerfada mais rápido do que qualquer outra jamais imaginou";
  const name_size = 20;
  const effect_size = 10;

  create_spell(name, url, scale, rotation, cost, speed, type1, type2, effect, undefined, undefined, name_size, effect_size);
  fill_form(name, url, scale, rotation, cost, speed, type1, type2, effect, undefined, undefined, name_size, effect_size);
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
  const speed = $("#speed-select").val();
  const type1 = $("#type1-select").val();
  const type2 = $("#type2-select").val();
  const effect = $("#card-effect").val();
  const name_size = parseInt($("#name-size").val());
  const effect_size = parseInt($("#effect-size").val());

  create_spell(name, url, scale, rotation, cost, speed, type1, type2, effect, undefined, undefined, name_size, effect_size);
});