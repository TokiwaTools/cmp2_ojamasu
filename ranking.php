<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Result</title>
	<link rel="stylesheet" type="text/css" href="styles/default.css">
</head>
<?php
	$pdo = new PDO("sqlite:userRank.sqlite");
	$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_WARNING);
	$st = $pdo->query("SELECT * FROM userrank;");
?>
<body>
	<div class="title">
  		<img src="img/title.png" width="300px">
  		<img src="img/icon.png" width="40px"><br>
  	</div>
  	<h2　class="ranking">ランキング</h2>
	<?php
		echo "<table class='rankingTable'>";
		echo "<tr><th>rank</th><th>name</th><th>score</th><th>time</th>";
		while($result = $st->fetch( PDO::FETCH_ASSOC )){
			echo "<tr>";
			echo "<td>{$result['id']}</td>";
			echo "<td>{$result['name']}</td>";
			echo "<td>{$result['score']}</td>";
			echo "<td>{$result['time']}</td>";
			echo "<tr>";
		}
		echo "</table>";
	?>
</body>
</html>
