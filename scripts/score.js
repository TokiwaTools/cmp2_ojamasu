var scoreboard;   //スコアボードの要素

//スコアボード
var score = 0;          //スコア
var scoreInterval = 100;//スコアの増減間隔

//スコアボードの作成
function createScoreboard() {
  $(scoreboard).empty();
  var title = $('<h2>');
  title.html('Scoreboard');
  $(scoreboard).append(title);
  var scorep = $('<p>');
  scorep.attr('class', 'score');
  scorep.html(score);
  $(scoreboard).append(scorep);
}

//スコアを更新
function updateScore() {
  $(scoreboard).find('.score').html(score);
}
