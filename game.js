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

    function update_score(gaming_status){
        if(gaming_status === 'l')
            score -= 10;
        else 
            score += 5

        score_board.innerText = "Score: " + score;
    }

    function turns_red(boundary){
        boundary.classList.add("youlose");
    }

    function turns_green(boundary){
        boundary.style.backgroundColor = 'green';
    }

    function show_message(message){
            status.innerText = message;
    }

    function pause_game(){
        playing = false;
    }

    //if user hovers outside game zone while playing
    function enable_cheating_detection(){
        game_zone.addEventListener("mouseleave", function(){
            if(playing)
            {
                alert("Please stay in the game zone");
                pause_game();
                stop_timer();
            }
        })
    }

    function restart_game(){
        score = 0;
        score_board.innerText = "Score: " + score;
        stop_timer();
        best = [9999999,9999999,9999999];
        start_timer();
        live_element.innerText = "0:0:0";
        last_element.innerText = "0:0:0";
        best_element.innerText = "0:0:0";
    }

    function displayTimer(){
        milliseconds+=100;
        if(milliseconds == 1000){
            milliseconds = 0;
            seconds++;
            if(seconds == 60){
                seconds = 0;
                minutes++;
            }
        }
        let m = minutes;
        let s = seconds;
        let ms = (""+milliseconds).slice(0, -2); 
    
        live_element.innerHTML = `${m}:${s}:${ms}`;
    }

    function start_timer(){
        milliseconds = 0;
        seconds = 0;
        minutes = 0;
        timer = setInterval(displayTimer,100);
    }

    function stop_timer(){
        clearInterval(timer);
    }

    start_game();

}