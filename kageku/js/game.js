let squares = [];
let white_play = true;

let actions = [];

let curr_operation = "m";
let move_start = undefined;

$(function(){
  create_squares();
  fill_menus();
  set_up_first_position();
  process_menu_click("m");

  $("#reset-button").click(function(){
    clear_squares();
    set_up_first_position();
    actions = [];
  });

  $("#prev-button").click(function(){
    undo_last_action();
  });

  $("#save-button").click(function(){
    save_actions();
  });

  $("#win-button").click(function(){
    save_actions("win");
  });

  $("#lose-button").click(function(){
    save_actions("loss");
  });
});

function save_actions(addition=""){
  let actions_str = "";
  let actions_item = [];
  actions.forEach(function(item){
    let act_str = action_to_str(item);
    actions_str += act_str + " ";
    actions_item.push(act_str);
  });

  if(addition.length > 0){
    actions_str += addition + " ";
  }

  let current_text = $("#output-area").val();
  let lines = current_text.split("\n");
  if(lines.includes(actions_str)) return;

  let best_line = 0;
  let best_score = 0;
  lines.forEach(function(line, index){
    let score = 0;
    let splitted_line = line.split(" ");
    for(let i = 0; i < Math.min(splitted_line.length, actions_item.length); i++){
      if(splitted_line[i] == actions_item[i]) score++;
      else break;
    }
    if(score > best_score){
      best_score = score;
      best_line = index;
    }
  });

  let before = lines.slice(0, best_line).join("\n");
  let after = lines.slice(best_line).join("\n");
  let new_text = "";
  if(before.length != 0) new_text += before + "\n";
  new_text += actions_str;
  if(after.length != 0) new_text += "\n" + after;
  $("#output-area").val(new_text);
}

function action_to_str(action){
  if(action.type == "move"){
    return C[action.from[1]] + "" + R[action.from[0]] + "" + C[action.to[1]] + "" + R[action.to[0]];
  }else if(action.type == "add"){
    return action.piece + "" + C[action.to[1]] + "" + R[action.to[0]];
  }
}

function update_team_to_play(){
  white_play = !white_play;
  if(white_play){
    $("#team-container").html("WHITE TO PLAY");
  }else{
    $("#team-container").html("BLACK TO PLAY");
  }
}

function undo_last_action(){
  if(actions.length > 0){
    update_team_to_play();
    let action = actions.pop();
    if(action.type == "move"){
      squares[action.from[0]][action.from[1]].val(squares[action.to[0]][action.to[1]].val());
      squares[action.to[0]][action.to[1]].val(action.to_contents);
    }else if(action.type == "add"){
      squares[action.to[0]][action.to[1]].val(action.to_contents);
    }
  }

  if(move_start != undefined){
    squares[move_start[0]][move_start[1]].removeClass("chess-selected-square");
    move_start = undefined;
  }
}

function process_square_click(x, y){
  if(curr_operation == "m"){
    if(move_start == undefined){
      if(squares[x][y].val().length > 0){
        move_start = [x, y];
        squares[x][y].addClass("chess-selected-square");
      }
    }else if(move_start[0] != x || move_start[1] != y){
      actions.push({
        type: "move",
        from: move_start,
        to: [x, y],
        to_contents: squares[x][y].val()
      });
      update_team_to_play();

      squares[x][y].val(squares[move_start[0]][move_start[1]].val());
      squares[move_start[0]][move_start[1]].removeClass("chess-selected-square");
      squares[move_start[0]][move_start[1]].val("");
      move_start = undefined;
    }else{
      move_start = undefined;
      squares[x][y].removeClass("chess-selected-square");
    }
  }else{
    if(squares[x][y].val().length == 0){
      actions.push({
        type: "add",
        piece: curr_operation,
        to: [x, y],
        to_contents: squares[x][y].val()
      });
      update_team_to_play();

      if(move_start != undefined){
        squares[move_start[0]][move_start[1]].removeClass("chess-selected-square");
        move_start = undefined;
      }

      squares[x][y].val(piece_unicode[curr_operation]);
      process_menu_click("m");
    }
  }
}

function process_menu_click(option){
  curr_operation = option;
  $("#game-container").children().each(function(){
    $(this).children().each(function(){
      $(this).attr("style", 'cursor: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" style="font-size: 2rem;"><text y="25">' + piece_unicode[option] + '</text></svg>\'), auto;');
    })
  });
}

function set_up_first_position(){
  squares[7][7].val(piece_unicode["K"]);
  squares[7][5].val(piece_unicode["R"]);
  squares[6][7].val(piece_unicode["P"]);
  squares[6][6].val(piece_unicode["P"]);
  squares[6][5].val(piece_unicode["P"]);
  squares[0][0].val(piece_unicode["k"]);
  squares[0][2].val(piece_unicode["r"]);
  squares[1][0].val(piece_unicode["p"]);
  squares[1][1].val(piece_unicode["p"]);
  squares[1][2].val(piece_unicode["p"]);
}

function create_squares(){
  for(let i = 0; i < 8; i++){
    $("<div>", {"class": "chess-row"}).appendTo($("#game-container"));
    squares.push([]);
    for(let j = 0; j < 8; j++){
      let evenoddclass = (i + j) % 2 ? "chess-odd-square" : "chess-even-square";
      let square = $("<input>", {
        "class": "chess-square " + evenoddclass,
        "type": "submit",
        "value": ""
      }).click(function(){
        process_square_click(i, j);
      }).appendTo($("#game-container").children().last());
      squares[i].push(square);
    }
  }
}

function clear_squares(){
  $("#game-container").children().each(function(){
    $(this).children().each(function(){
      $(this).val("");
    });
  });
}

function fill_menus(){
  Object.entries(piece_unicode).forEach(function(item){
    $("<input>", {
      "class": "menu-item",
      "type": "submit",
      "value": item[1]
    }).click(function(){
      process_menu_click(item[0]);
    }).appendTo("#menu-container");
  });
}
