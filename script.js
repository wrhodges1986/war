$(document).ready(function() {

	//what does this do
	// Converts the face cards to their appropriate name value
	function convert_value_to_string(value) {
		if (value > 10) {
			switch (value) {
				case 11:
				return 'Jack';
				break;
				case 12:
				return 'Queen';
				break;
				case 13:
				return 'King';
				break;
			}
		}
		return value.toString();
	}

	//what does this do?
	// Creates an empty array to represent the deck, an array of the four card types, and then fills the deck by first choosing a suit, and then adding a number to that suit, and adding the finished card to the deck array.
	// Result is 52 cards in the deck
	var deck = [];
	var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	for (var i = 0; i<suits.length; i++) {
		var suit = suits[i];
		for (var j = 0; j<13; j++) {
			deck.push({number: j+1, suit: suit});
		}
	}
	
	//what does this do?
	// This sorts the deck array by creating a random number within the indexing of the array, deleting it if it is found in the array, pushing it to the copy of the array, and going until all cards have been sorted into the copy.
	var shuffle = function(array) { 
		var copy = [];
		var n = array.length; 
		var i; 
		while (n) { i = Math.floor(Math.random() * array.length);  
			if (i in array) { 
		 		copy.push(array[i]); 
		 		delete array[i]; 
		 		n--; 
		 	} 
		} 
		return copy; 
	}
	
	var cards_player_1 = [];
	var cards_player_2 = [];
	//divide out the cards into the two arrays
	// This function has the effect of every other card assignment
	var divideCards = function(array) {
	  for (var i = 0; i < array.length; i++) {
	    if (i % 2 === 0) { // If even index
		  cards_player_1.push(array[i]);
		}
		else { // If odd index
		  cards_player_2.push(array[i]);
		}
	  }
	};
	
	//create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. A tie should return false.
	function war(playerOneCard, playerTwoCard) {
	  if (playerOneCard.number > playerTwoCard.number) {
	    return playerOneCard;
	  }
	  else if (playerOneCard.number < playerTwoCard.number) {
	    return playerTwoCard;
	  }
	  else { // If they are equal
	    return false;
	  }
	}
	
	
	//create a play function
		//compare the cards
		//give the winner both cards (at end of deck)
	function play() {
	
	  var playerOneCard = cards_player_1[0];
	  var playerTwoCard = cards_player_2[0];
	  // card1 for player 1 deck, card2 for player 2 deck
	  var winningCard = war(playerOneCard, playerTwoCard);
	  
	  if (winningCard === playerOneCard) {
		var firstCard = cards_player_1.shift();
		var secondCard = cards_player_2.shift();
		cards_player_1.push(firstCard, secondCard);
	  }
	  else if (winningCard === playerTwoCard) {
	    var firstCard = cards_player_1.shift();
		var secondCard = cards_player_2.shift();
		cards_player_2.push(firstCard, secondCard);
	  }
	  // In case of a tie
	  
	  else if (winningCard === false) {
	    winningCard = war(cards_player_1[3], cards_player_2[3]);
		
		if (winningCard === cards_player_1[3]) {
		  var cardsToRemove1 = cards_player_1.slice(0, 4);
		  var cardsToRemove2 = cards_player_2.slice(0, 4);
		  cards_player_2.splice(0, 4);
		  cards_player_1.push(cardsToRemove1, cardsToRemove2);
		}
		else if (winningCard === cards_player_2[3]) {
		  var cardsToRemove1 = cards_player_1.slice(0, 4);
		  var cardsToRemove2 = cards_player_2.slice(0, 4);
		  cards_player_1.splice(0, 4);
		  cards_player_2.push(cardsToRemove1, cardsToRemove2);
		}
	  }
	  // Assign cards to winning player
	  //this function (defined below) will continue to the next turn
	  advance();
	}
	
	function advance() {
		//take the top two cards and display them
		if (cards_player_1.length && cards_player_2.length) {
			var card_1 = cards_player_1[0];
			var card_2 = cards_player_2[0];
			$("#opp-card").html(convert_value_to_string(card_1.number)+" "+card_1.suit);
			$("#opp-card-count").html(cards_player_1.length);
			$("#my-card").html(convert_value_to_string(card_2.number)+" "+card_2.suit);
			$("#my-card-count").html(cards_player_2.length);
			
		}
		else {
			if (!cards_player_1.length) {
				alert("Player Two Wins!");
			}
			else if (!cards_player_2.length) {
				alert("Player One Wins!");
			}
		}
	}
	
	deck = shuffle(deck);
	divideCards(deck);
	advance();
	
	$(".btn").click(function() {
		play();
	});
});
