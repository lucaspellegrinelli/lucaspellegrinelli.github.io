$(function() {
  create_spell_from_b64("WyJTb2NvIGRvIHRyb3bjbyIsImh0dHBzOi8vaS5pbWd1ci5jb20vVUxCd2h5VS5wbmciLDEwMCwwLDIsImluc3RhbnQiLCJmb2dvIiwibmVuaHVtIiwiRXNzYSBjYXJ0YSB0ZW0gbyBwb2RlciBkZSBzZXIgbmVyZmFkYSBtYWlzIHLhcGlkbyBkbyBxdWUgcXVhbHF1ZXIgb3V0cmEgamFtYWlzIGltYWdpbm91Il0=");
});

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

  create_spell(name, url, scale, rotation, cost, speed, type1, type2, effect);
});