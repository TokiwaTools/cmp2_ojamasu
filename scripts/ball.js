function initBall()
{
    var offsetX = 0,
    offsetY = 0,
    ctx,
    bounce = -1,
    numBalls = 40,
    theCanvas,
    balls = [],
    theContents;

    theContents = document.getElementById("ballpaper");
    offsetX = (theContents.currentStyle || document.defaultView.getComputedStyle(theContents,'')).width;
    offsetX = Number(offsetX.replace('px', ''));

    offsetY = (theContents.currentStyle || document.defaultView.getComputedStyle(theContents,'')).height;
    offsetY = Number(offsetY.replace('px', ''));

    ctx = document.getElementById('canvas').getContext("2d");

    for(var i = 0; i < numBalls; i++)
    {
        var ball = new Object();
        ball.red = Math.floor(Math.random() * 256);
        ball.green = Math.floor(Math.random() * 256);
        ball.blue = Math.floor(Math.random() * 256);
        ball.x = i * 50;
        ball.y = i * 50;
        ball.vx = Math.random() * 10 - 5;
        ball.vy = Math.random() * 10 - 5;
        ball.radius = Math.random() * 30 + 10;
        ball.mass = ball.radius;
        balls[i] = ball;
    }

    setBallAnimation();

    function setBallAnimation()
    {
        animation();
        requestAnimationFrame(setBallAnimation);
    }

    function animation()
    {
        var canvas = document.getElementById('canvas');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for(var i = 0; i < numBalls; i++)
        {
            ctx.strokeStyle ="rgb(" + balls[i].red + "," + balls[i].green + "," + balls[i].blue + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(balls[i].x, balls[i].y, balls[i].radius, 0, Math.PI * 2, true);
            ctx.fillStyle = "rgb(" + balls[i].red + "," + balls[i].green + "," + balls[i].blue + ")";
            ctx.fill();
            ctx.stroke();
            move(balls[i]);
            var ballA = balls[i];
            for(var j = i + 1; j < numBalls; j++)
            {
                var ballB = balls[j];
                checkCollision(ballA, ballB);
            }
        }
    }

    /*
     * ボールの運動
     */
    function move(ball)
    {
        ball.x += ball.vx;
        ball.y += ball.vy;
        checkWall(ball);
    }

    /*
     * 壁の衝突、跳ね返り
     */
    function checkWall(ball)
    {
        if(ball.x + ball.radius > offsetX)
        {
            ball.x = offsetX - ball.radius;
            ball.vx *= bounce;
        }
        else
        if(ball.x - ball.radius < 0)
        {
            ball.x = ball.radius;
            ball.vx *= bounce;
        }

        if(ball.y + ball.radius > offsetY)
        {
            ball.y = offsetY- ball.radius;
            ball.vy *= bounce;
        }
        else
        if(ball.y - ball.radius < 0)
        {
            ball.y = ball.radius;
            ball.vy *= bounce;
        }
    }

    /*
     * ボール同士の衝突
     */
    function checkCollision(ball0, ball1)
    {
        /*
         * 衝突判定予測
         */
        var dx = ball1.x - ball0.x;
        var dy = ball1.y - ball0.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if(dist < ball0.radius + ball1.radius)
        {
            var radian = Math.atan2(dy, dx);
            var sin = Math.sin(radian);
            var cos = Math.cos(radian);
            //位置の回転
            var point0 = {x:0, y:0};
            //位置の回転
            var point1 = rotate(dx, dy, sin, cos, true);
            //速度の回転
            var velocity0 = rotate(ball0.vx, ball0.vy, sin, cos, true);
            //速度の回転
            var velocity1 = rotate(ball1.vx, ball1.vy, sin, cos, true);
            //衝突反応
            var vxTotal = velocity0.x - velocity1.x;
            //運動量の保存
            velocity0.x = ((ball0.mass - ball1.mass) * velocity0.x + 2 * ball1.mass * velocity1.x) / (ball0.mass + ball1.mass);
            velocity1.x = vxTotal + velocity0.x;

            //位置の更新
            var absV = Math.abs(velocity0.x) + Math.abs(velocity1.x);
            var overlap = (ball0.radius + ball1.radius) - Math.abs(point0.x - point1.x);
            point0.x += (velocity0.x / absV) * overlap;
            point1.x += (velocity1.x / absV) * overlap;

            //位置の回転、元へ戻す
            var point0Final = rotate(point0.x, point0.y, sin, cos, false);
            var point1Final = rotate(point1.x, point1.y, sin, cos, false);

            //速度の回転、元の位置へ戻す
            var velocity0Final = rotate(velocity0.x, velocity0.y, sin, cos, false);
            var velocity1Final = rotate(velocity1.x, velocity1.y, sin, cos, false);

            /*
             * 衝突判定の予測分だけ速度を加算する
             */
            ball1.x = ball0.x + point1Final.x;
            ball1.y = ball0.y + point1Final.y;
            ball0.x = ball0.x + point0Final.x;
            ball0.y = ball0.y + point0Final.y;

            ball0.vx = velocity0Final.x;
            ball0.vy = velocity0Final.y;
            ball1.vx = velocity1Final.x;
            ball1.vy = velocity1Final.y;
        }
    }

    /*
     * 回転行列
     */
    function rotate(x, y, sin, cos, reverse)
    {
        var result = {x:0, y:0}
        if(reverse)
        {
            result.x = x * cos + y * sin;
            result.y = y * cos - x * sin;
        }
        else
        {
            result.x = x * cos - y * sin;
            result.y = y * cos + x * sin;
        }
        return result;
    }
}

// 各ブラウザ対応
window.requestAnimationFrame = (function()
{
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback)
    {
        window.setTimeout(callback, 1000/60);
    };
}());
