
  const ball = document.getElementById('ball');
        const ball2 = document.getElementById('ball2');
        const paddle = document.getElementById('paddle');
        const gameArea = document.getElementById('gameArea');
        const messageBox = document.getElementById('messageBox');
       document.getElementById("restartBtn").addEventListener("click", restartGame);

        
        let ballX = 290;
        let ballY = 200;
        let ballSpeedX = 2;
        let ballSpeedY = -2;

        let ball2X = 100;
        let ball2Y = 100;
        let ball2SpeedX = 1.5;
        let ball2SpeedY = -1.5;

        let paddleX = 250;
        const paddleSpeed = 20;

        let reactionTimeStart = 0;
        let gameStartTime = new Date().getTime();
        let isGameOver = false;
        let gameStarted = false;
        function startGame() {
            setInterval(moveBall, 10);
            const randomDelay = Math.random() * 5000 + 3000;
            setTimeout(showSecondBall, randomDelay);
            setInterval(calculateGameDuration, 10000);
        }

        const showSecondBall = () => {
            ball2.style.display = "block";
            setInterval(moveBall2, 10);
        }

        function moveBall() {
            if (isGameOver) return;
            ballX += ballSpeedX;
            ballY += ballSpeedY;

            if (ballX <= 0 || ballX >= gameArea.clientWidth - ball.clientWidth) {
                ballSpeedX *= -1;
            }
            if (ballY <= 0) {
                ballSpeedY *= -1;
            }

            if (ballY >= gameArea.clientHeight - ball.clientHeight - paddle.clientHeight - 30 && reactionTimeStart === 0) {
                reactionTimeStart = new Date().getTime();
            }
            
            if (
                ballY >= gameArea.clientHeight - ball.clientHeight - paddle.clientHeight &&
                ballX + ball.clientWidth >= paddleX &&
                ballX <= paddleX + paddle.clientWidth
            ) {
                ballSpeedY *= -1;
                const reactionTimeEnd = new Date().getTime();
                if (reactionTimeStart !== 0) {
                    const reactionTime = (reactionTimeEnd - reactionTimeStart) / 1000;
                    console.log("Reaction Time (Red Ball): " + reactionTime.toFixed(2) + " seconds");
                    reactionTimeStart = 0;
                }
            }

            if (ballY >= gameArea.clientHeight - ball.clientHeight) {
                isGameOver = true;
                showMessage("Game Over-Click to Restart");
            }

            ball.style.left = ballX + "px";
            ball.style.top = ballY + "px";
        }

        function moveBall2() {
            if (isGameOver) return;
            ball2X += ball2SpeedX;
            ball2Y += ball2SpeedY;

            if (ball2X <= 0 || ball2X >= gameArea.clientWidth - ball2.clientWidth) {
                ball2SpeedX *= -1;
            }
            if (ball2Y <= 0) {
                ball2SpeedY *= -1;
            }

            if (ball2Y >= gameArea.clientHeight - ball2.clientHeight - paddle.clientHeight - 30 && reactionTimeStart === 0) {
                reactionTimeStart = new Date().getTime();
            }
            
            if (
                ball2Y >= gameArea.clientHeight - ball2.clientHeight - paddle.clientHeight &&
                ball2X + ball2.clientWidth >= paddleX &&
                ball2X <= paddleX + paddle.clientWidth
            ) {
                ball2SpeedY *= -1;
                const reactionTimeEnd = new Date().getTime();
                if (reactionTimeStart !== 0) {
                    const reactionTime = (reactionTimeEnd - reactionTimeStart) / 1000;
                    console.log("Reaction Time (Blue Ball): " + reactionTime.toFixed(2) + " seconds");
                    reactionTimeStart = 0;
                }
            }

            if (ball2Y >= gameArea.clientHeight - ball2.clientHeight) {
                isGameOver = true;
                showMessage("Game Over-Click to Restart");
            }
            ball2.style.left = ball2X + "px";
            ball2.style.top = ball2Y + "px";
        }

        function showMessage(message) {
            messageBox.textContent = message;
            messageBox.style.display = 'block';
            messageBox.onclick = restartGame;
        }

        function restartGame() {
            isGameOver = false;
            messageBox.style.display = 'none';

            ballX = 290;
            ballY = 200;
            ballSpeedX = 2;
            ballSpeedY = -2;

            ball2X = 100;
            ball2Y = 100;
            ball2SpeedX = 1.5;
            ball2SpeedY = -1.5;
        }

        const movePaddle = (e) => {
            if (isGameOver) return;
            if (e.key === "ArrowLeft") {
                paddleX = Math.max(paddleX - paddleSpeed, 0);
            } else if (e.key === "ArrowRight") {
                paddleX = Math.min(paddleX + paddleSpeed, gameArea.clientWidth - paddle.clientWidth);
            }
            paddle.style.left = paddleX + "px";
        }
        document.addEventListener("keydown", movePaddle);

        function calculateGameDuration() {
            if (isGameOver) return;
            const currentTime = new Date().getTime();
            const elapsedTime = (currentTime - gameStartTime) / 1000;
            const minutes = Math.floor(elapsedTime / 60);
            const seconds = Math.floor(elapsedTime % 60);
            console.log(`Game duration: ${minutes} minutes and ${seconds} seconds.`);
        }

        window.onload = startGame; 
