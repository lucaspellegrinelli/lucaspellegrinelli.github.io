$(function() {
  create_card_from_b64("WyJKYXZhbGkgRXNwaW5ob3NvIiwiaHR0cHM6Ly9pLmltZ3VyLmNvbS9wQW1VWk1ULmpwZyIsMTAwLDAsMiwyLDIsMiwidGVycmEiLCJ2YXppbyIsIkVzc2EgY2FydGEgdGVtIG8gcG9kZXIgZGUgbWF0YXIgdHVkbywgdG9kb3MgZSBhbGdvIG1haXMiXQ==");
});

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