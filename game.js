window.onload=function(){

    var playing = false;
    var score = 0;

    const start_btn = document.getElementById("start");
    const end_btn = document.getElementById("end");
    const game_zone = document.getElementById("game");
    const live_element = document.getElementById("live");
    const last_element = document.getElementById("last");
    const best_element = document.getElementById("best");
    const status = document.getElementById("status");

    const boundaries = Array.from(document.getElementsByClassName("boundary"));
    const score_board = Array.from(document.getElementsByClassName("example"))[0];

    const game_title = document.getElementsByTagName("h1")[0]

    const grey_background = boundaries[0].style.backgroundColor;

    var milliseconds = 0;
    var seconds = 0;
    var minutes = 0;
    var timer = null;

    var best = [9999999,9999999,9999999];

    function start_game(){
        enable_cheating_detection();
        score_board.innerText = "Score: " + score;
        game_title.innerHTML += "<br>(Double Click ON 'S' To Restart)";
        start_btn.addEventListener("mouseenter", track_cursor);
        start_btn.addEventListener("dblclick", restart_game);
    }

    function reset_game(){
        boundaries.forEach(reset_boundaries_background);
        status.innerText = "Playing Now";
        playing = true;
    }

    function reset_boundaries_background(boundary){
        boundary.classList.remove("youlose");
        boundary.style.backgroundColor = grey_background;
    }

    function track_cursor(){
        reset_game();
        boundaries.forEach(lost);
        start_timer();
        end_btn.addEventListener("mouseenter", win)
    }

    function win(){
        if(playing){
            boundaries.forEach(turns_green);
            update_score('w');
            show_message("You Won");
            pause_game();
            stop_timer();
            set_last_best();
        }
    }

    function lost(boundary){
        boundary.addEventListener("mouseenter", function(){
            if(playing){
                boundaries.forEach(turns_red);
                update_score('l');
                show_message("You Lose");
                pause_game();
                stop_timer();
            }
        })
    }

    start_game();

}