//Bidness
var player1;
var player2;
var temporaryScore = 0;
var yourTurn = "";

function Player(name, turnYN, humanYN){
	this["name"] = name;
	this["permanentScore"] = 0;
	this["turn"] = turnYN;
	this["human"] = humanYN;
}

Player.prototype.announceTurn = function(){
	if(this.turn === true){
		yourTurn = this.name;
	}
}

Player.prototype.passTurn = function(){
	temporaryScore = 0;
	if (this.turn === true) {
		this.turn = false;
	} else {
		this.turn = true;
		this.announceTurn();
	}
}

Player.prototype.dieRoll = function() {
	return (1 + Math.floor(Math.random() * 6));
}

Player.prototype.fullRoll = function() {
	var roll = this.dieRoll();
	// alert(roll);
	if(roll !== 1){
		temporaryScore += roll;
	} else if (roll === 1){
		player1.passTurn();
		player2.passTurn();
	}
	return roll;
}

//UI Logic

$(document).ready(function() {
  // ONE PLAYER GAME
	$("#onePlayer").click(function(){
		$(".gameType").hide();
		$(".game").show();
		player1 = new Player("Player 1", true, true);
		player2 = new Player("Computer", false, false);
	});

	//TWO PLAYER GAME
	$("#twoPlayer").click(function(){
		$(".gameType").hide();
		$(".game").show();
		player1 = new Player("Player 1", true, true);
		player2 = new Player("Player 2", false, true);
		player1.announceTurn();
		$("#yourTurn").text(yourTurn);
	});


	$("#roll").click(function() {
		if (player1.turn === true) {
			var lastRoll = player1.fullRoll();
		} else {
			var lastRoll = player2.fullRoll();
		}
		$("#tempScoreContainer").text(temporaryScore);
		$("#lastRoll").text(lastRoll);
		$("#yourTurn").text(yourTurn);
		if (lastRoll === 1) {
			$("#slider").toggleClass("col-sm-offset-8");
		}
	});

	$("#pass").click(function() {
		if (player1.turn === true) {
			player1.permanentScore += temporaryScore;
		} else if (player2.turn === true) {
			player2.permanentScore += temporaryScore;
		}

		$("#player1Total").text(player1.permanentScore);
		$("#player2Total").text(player2.permanentScore);
		player1.passTurn();
		player2.passTurn();
		$("#yourTurn").text(yourTurn);
		if (player1.permanentScore >= 100){
			$(".winner").text("Player 1");
			$("#youWin").slideToggle(1000);
		}
		if (player2.permanentScore >= 100){
			$(".winner").text("Player 2");
			$("#youWin").slideToggle("slow");
		}
		$("#tempScoreContainer").text(temporaryScore);
		$("#slider").toggleClass("col-sm-offset-8");
	});

	$("#rulesHeader").click(function() {
		$("#rulesList").slideToggle();
	});


});
