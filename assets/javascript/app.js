var quizInfo = [
					{
						question:"Which planet takes almost 30 Earth years to orbit the sun?",
						answerSet:["uranus","saturn","mars","pluto"],
						answer:"saturn",
						picture:'assets/images/saturn.png'

					},
					{
						question:"Which planet is the densest?",
						answerSet:["uranus","earth","saturn","mars"],
						answer:"earth",
						picture:'assets/images/earth.jpg'
					},
					{
						question:"Which is the brightest comet in the solar system??",
						answerSet:["Halley","HALE-BOPP","HYAKUTAKE","titan"],
						answer:"Halley",
						picture:'assets/images/halleys.jpg'
					},
					{
						question:"Who was the first living creature in space?",
						answerSet:["dog","cat","human","monkey"],
						answer:"dog",
						picture:'assets/images/laika.jpg'
					}
				];
		var currentQuestionNum;	
		var rightAnswerCount = 0;
		var wrongAnswerCount = 0;
		var unattemptedQCount = 0;
		var userAnsTimerConstant = 20; // 20 minutes timer
		var userResultTimerConstant = 3; // 3 minutes  wait time
		var num = userAnsTimerConstant;
		var userResponseTimer;	
		var ansProcessTimer;
		var counter;

		$( document ).ready(function() {
			$("#reset-button-id").hide();
			$("#picture").hide();
		});

		$("#startBt").on('click',function(){
			$(this).hide();
			$("#displayquestion").show();
			$("#answersdiv").show();
			$("#display-timer").show();
			console.log("inside tRivia");
			if ( !currentQuestionNum ) {
				currentQuestionNum = 0;
			} else {
				currentQuestionNum++;

			}
			$("#display-timer").html("Time remaining "+num+" seconds");
			timer();
			displayQuestionInfo();

		});

		function displayQuestionInfo() {
			console.log("inside displayQuestionInfo");
			if (ansProcessTimer) {
				clearTimeout(ansProcessTimer);
				console.log("clearing ans process timer");
			}
			$("#display-timer").html("Time remaining "+num+" seconds");

			
			$("#displayquestion").html(quizInfo[currentQuestionNum].question);
			for(var i =0;i<(quizInfo[currentQuestionNum].answerSet.length); i++){
				console.log("answers: " + quizInfo[currentQuestionNum].answerSet[i]);
				$("#answersdiv").append("<p  id='answersetparaid"+ i +"' class='answesetparaclass'>"+
				 quizInfo[currentQuestionNum].answerSet[i]+"</p>");
			}

			$(".answesetparaclass").on('click',function(){
				console.log("hellos"+ this.id);
				var answerSetParaID  = $(this).attr('id').replace("answersetparaid", "");
				console.log('selected answer '+ quizInfo[currentQuestionNum].answerSet[answerSetParaID]);
				$(this).css("color","red");
				if ( quizInfo[currentQuestionNum].answerSet[answerSetParaID] === quizInfo[currentQuestionNum].answer) {
					rightAnswerCount++;
					userResponseDisplay("correct");
				}
				else {
					wrongAnswerCount++;
					userResponseDisplay("wrong");
				}
			});
		}

		function cleanQuestionInfoDiv(){
			for(var i =0;i<(quizInfo[currentQuestionNum].answerSet.length); i++){
				$("#answersetparaid"+ i).remove();
			}

		}
		function timer(){
			console.log("inside timer");
			if (!userResponseTimer) {
				console.log("starting timer");
				userResponseTimer = setInterval(decrement, 1000);
				num=userAnsTimerConstant;			
			}
		}

		function decrement(){
			num--;
			console.log(" inside decrement num ="+num);
			if (num == 0) {
				
				console.log("decrement before clear intervel");

				clearInterval(userResponseTimer);
				userResponseTimer = undefined;
				
				unattemptedQCount++;
				console.log("decrement afterclear intervel" );

				userResponseDisplay("unattempted");

			}

			$("#display-timer").html("Time remaining "+num+" seconds");

			if (num > 0) {
				timer();
			}
		
		} 

		function userResponseDisplay(userAns){

			$("#displayquestion").hide();
			$("#answersdiv").hide();
			cleanQuestionInfoDiv();
			console.log("inside userResponseDisplay");
			if (userResponseTimer) {
				console.log("before clearing userResponseTimer");
				clearInterval(userResponseTimer);
				userResponseTimer = undefined;
			}
			console.log("currentQuestionNum:"+currentQuestionNum);
			if (userAns === "correct") {
				$("#display-result").html("Correct");
			} else if (userAns === 'wrong') {
				$("#display-result").html("Nope !"+"<br> The Correct answer was : "+ 
					quizInfo[currentQuestionNum].answer);
					$("#picture").show();
					$("#picture").attr('src',quizInfo[currentQuestionNum].picture);
			} else {
				$("#display-result").html("Out of time. "+"<br> The Correct answer was : "+ 
					quizInfo[currentQuestionNum].answer);
				$("#picture").show();
				$("#picture").attr('src',quizInfo[currentQuestionNum].picture); 
			}

			
			setTimeout(clearUserResponse, ( userResultTimerConstant * 1000 ));
			$("#display-timer").html("Time remaining "+num+" seconds");
			console.log("rightCount =" +rightAnswerCount );
			console.log("wrongAnswerCount ="+wrongAnswerCount);
			currentQuestionNum++;
			
			$("#display-result").show();

		}
		
		function clearUserResponse() {
			console.log("inside clearUserResponse");

			$("#display-result").hide();
			$("#picture").hide();

			if ( currentQuestionNum === quizInfo.length) {
				console.log("currentQuestionNum: "+currentQuestionNum+", resetting currentQuestionNum");
				$("#final-result").html('All done,here is how you did !' +'<br>'+'<br>'+'Correct Answers = ' +rightAnswerCount+'<br>'+
					'Incorrect Answers = '+wrongAnswerCount+'<br>'+
					'Unanswered = '+unattemptedQCount);
				$("#final-result").show();
				$("#display-timer").hide();
				$("#reset-button-id").show();
				
			} else {
				timer();
				$("#displayquestion").show();
				$("#answersdiv").show();
				displayQuestionInfo();

			}
			console.log("currentQuestionNum =" + currentQuestionNum);
		}

		$("#reset-button-id").click(function(){
			currentQuestionNum = 0;
			 rightAnswerCount = 0;
			 wrongAnswerCount = 0;
			 unattemptedQCount = 0;
			$("#final-result").hide();
			$("#startBt").show();
			$(this).hide();

		});
		
		