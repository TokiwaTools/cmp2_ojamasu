<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link rel="shortcut icon" type="image/png" href="images/icon.png">
    <link type="text/css" rel="stylesheet" href="styles/jquery-ui.min.css">
    <link type="text/css" rel="stylesheet" href="styles/default.css">
    <link type="text/css" rel="stylesheet" href="styles/pink.css">
    <script type="text/javascript" src="scripts/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="scripts/jquery-ui.min.js"></script>
    <script type="text/javascript" id="script" src="scripts/ready.js" username=
    <?php
      if (isset($_POST['name'])) {
        $name = htmlspecialchars($_POST['name']);
        echo $name;
      } else {
        echo 'false';
      }
    ?>
    ></script>
    <!--<script type="text/javascript" src="scripts/whatsyourname.js"></script>-->
    <!--<script type="text/javascript" src="scripts/question.js"></script>-->
    <script type="text/javascript" src="scripts/score.js"></script>
    <script type="text/javascript" src="scripts/timer.js"></script>
    <script type="text/javascript" src="scripts/scantime.js"></script>
    <script type="text/javascript" src="scripts/eventtime.js"></script>
    <script type="text/javascript" src="scripts/table.js"></script>
    <script type="text/javascript" src="scripts/barcode.js"></script>
    <script type="text/javascript" src="scripts/ball.js"></script>
    <title>おじゃマス計算</title>
  </head>
  <body>
    <div id="ballpaper">
        <canvas id="canvas" width=100% height=100%></canvas>
    </div>

    <div class="title">
      <img src="images/title2.png">
    </div>

    <div class="dialog"></div>

    <div class="eventTimeMessage">
      <h2 class="eventState"></h2>
      <p class="eventContent"></p>
    </div>

    <form>
      <table class="mainTable" border="1" cellspacing="0"></table>
    </form>

    <div class="statusboard">
	    <div class="timerboard"></div>
	    <div class="scoreboard"></div>
	  </div>

    <div class="nameDialog" title="あなたのお名前は？">
      <form class="nameDialogForm" method="post">
        <input type="text" name="name" class="namebox" value="名無しさん" class="text ui-widget-content ui-corner-all">
      </form>
    </div>

    <div class="difficultyDialog" title="どのレベルでプレイする？">
      <form>
        <input type="button" value="激甘" id="hidari" onclick="gameReady('easy')">
        <input type="button" value="中辛" id="migi" onclick="gameReady('normal')">
      </form>
    </div>

    <div class="areyouready" title="準備はOK？"></div>

    <div class="tutorialDialog" title="チュートリアル">
      <iframe width="100%" height="480" src="https://www.youtube.com/embed/NTj33EWSn1I" frameborder="0" allowfullscreen></iframe>
    </div>

    <div class="bonustimeDialog" title="スキャンタイム！">
      <p>バーコードリーダーでピッ</p>
      <p class="limitTimeMessage"></p>
      <form>
        <input type="number" class="firstBarcode" value="" max="13">
        <input type="number" class="secondBarcode" value="" max="13">
      </form>
    </div>

    <div class="gameoverDialog" title="ゲームオーバー">
      <p class="scoreResult"></p>
      <p class="timeResult"></p>
    </div>
  </body>
</html>
