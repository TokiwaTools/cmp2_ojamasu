<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Result</title>
	<link rel="shortcut icon" type="image/png" href="images/icon.png">
	<link rel="stylesheet" type="text/css" href="styles/default.css">
	<link type="text/css" rel="stylesheet" href="styles/pink.css">

</head>
<?php
	$pdo = new PDO("sqlite:userRank.sqlite");
	$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_WARNING);

	if (isset($_GET['name']) && isset($_GET['score']) && isset($_GET['time'])) {
		$name = htmlspecialchars($_GET['name']);
		$score = htmlspecialchars($_GET['score']);
		$time = htmlspecialchars($_GET['time']);
		$st1 = $pdo -> prepare("INSERT INTO userrank(name, score, time) VALUES(?, ?, ?)");
		$st1 -> execute(array($name, $score, $time));
	}
	//レコード10行分まで表示、scoreで自動ソート
	$st = $pdo->query("SELECT * FROM userrank order by score desc limit 10;");
?>
<body>
	<!--<div class="title">
  		<img src="img/title.png" width="300px">
  		<img src="img/icon.png" width="40px"><br>
  	</div>-->
	<div class="title">
		<img src="images/title2.png" width="350px">
	</div>
	<br>

  	<div class="ranking"><img src="images/king3.png" width="40px"> Ranking <img src="images/king3.png" width="40px"></div>
	<?php
		echo "<table class='rankingTable'>";
		echo "<tr><th>rank</th><th>name</th><th>score</th><th>time</th>";
		//1位から順にtable表示
		$rank = 1;
		while($result = $st->fetch( PDO::FETCH_ASSOC )){
			echo "<tr>";
			echo "<td>$rank</td>";
			echo "<td>{$result['name']}</td>";
			echo "<td>{$result['score']}</td>";
			echo "<td>{$result['time']}</td>";
			echo "<tr>";
			$rank += 1;
		}
		echo "</table>";
	?>
	<form action="index.php" class="retry" method="post">
		<?php
			if (isset($name)) {
				echo '<input type="hidden" name="name" value=' . $name . '>';
			}
		 ?>
		<input type="submit" id="hidari" value="リトライ">
	</form>
</body>
</html>
