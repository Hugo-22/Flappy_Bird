window.onload = function () {

    // setup variables
    let canvasWidth = 700;
    let canvasHeight = 500;
    const btn = document.querySelector("#btn");
    const background = document.querySelector('#bg');
    const player = document.querySelector('#perso');
    const canvas = document.querySelector("#canvas");
    const obstacle1 = document.querySelector("#obstacle1");
    const obstacle2 = document.querySelector("#obstacle2");
    const blaster = document.querySelector("#blaster");
    const gap = 70; // 70 = best value
    const obstacleHeight = 242;
    const obstacleWidth = 52;
    let constant = obstacleHeight + gap;
    let space;
    let positionX = 50;
    let positionY = 150;
    let gravity = 1;
    const playerWidth = 20;
    const playerHeight = 30;
    let score = 0;

    // let canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // canvas.style.position = "absolute";
    // canvas.style.left = "30px";
    // document.body.appendChild(canvas);
    space = canvas.getContext('2d');


    function jump() {
        positionY -= 25;
        blaster.play();
        // pour jump vers l'avant en plus de remonter
        // positionX +=  1 
    }


    document.addEventListener("keydown", jump) || document.addEventListener("click", jump)

    let obstacle = [];

    obstacle[0] = {
        x : canvas.width,
        y : 0
    };


    tombe();


    function tombe() {
        
        // affichage du bg
        space.drawImage(background, 0, 0, canvasWidth, canvasHeight);


        for (var i = 0; i < obstacle.length; i++) {

            //affichage des obstacles
            space.drawImage(obstacle1, obstacle[i].x, obstacle[i].y);
            space.drawImage(obstacle2, obstacle[i].x, obstacle[i].y + constant);

            // vitesse des obstacles
            obstacle[i].x -=1;
            

            // ajout d'obstacles
            if (obstacle[i].x == 300) {
                obstacle.push({
                    x : canvasWidth,
                    y : Math.floor(Math.random() * 200) - 200
                });
            }

            // gestion des collisions 
            if (positionX + playerWidth >= obstacle[i].x && positionX <= obstacle[i].x + obstacleWidth && (positionY <= obstacle[i].y + obstacleHeight || positionY + playerHeight >= obstacle[i].y + constant) && positionY >= 0 || positionY >= canvasHeight - playerHeight) {

                location.reload();
            }

            // gestion du score
            if (obstacle[i].x == 10) {
                score++;
            }
        }
            // affichage du player
            space.drawImage(player, positionX, positionY, playerWidth, playerHeight);
            
            // gravité du player
            positionY += gravity;

            // score
            space.fillStyle = "#FFF";
            space.font = "50px Bangers";
            space.fillText(+score, 300, 150);
            
            requestAnimationFrame(tombe);
    }
}