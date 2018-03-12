cards_array=['fa fa-diamond','fa fa-paper-plane-o','fa fa-anchor','fa fa-bolt','fa fa-cube','fa fa-leaf','fa fa-bicycle','fa fa-bomb','fa fa-diamond','fa fa-paper-plane-o','fa fa-anchor','fa fa-bolt','fa fa-cube','fa fa-leaf','fa fa-bicycle','fa fa-bomb']
moves=0
open=[]
time=0
minutes=0
totaltime=0
// initial moves to 0
$('.moves').text(0)
//initial text and time
$('<span class="time">| Time: </span><span class="minute" >0</span><span class="m">m </span><span class="second" >0</span><span class="s">s</span>').insertAfter('.restart')

//shuffle the card input is array type
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//rerranage the cards order react on html
function ordered_cards(){
  newcards=shuffle(cards_array)
  $('.deck').find('i').each(function(index,element){
    $(this).removeClass().addClass(newcards[index])
  })
}
//get the classname in string
function getClassName(card){
  return card.html()
}
//------------------------------------------------------------
//take actions when click event happens
function click(){
  $('.card').click(function(){
    if ($(this).hasClass('show open')===false){
      $(this).addClass('show open')
      open.push($(this))
      count_moves()
    }
    if (open.length==2){
      check_card()
    }
  })
}
//check 2 cards if they are matched
function check_card(){
  if (getClassName(open[0])===getClassName(open[1])){
    open.forEach(function(card){
      card.effect('bounce');
      card.addClass('match')
    })
  }else{
    open.forEach(function(card){
      card.effect('shake');
      function delay(){
        card.removeClass('show open')
      }
      setTimeout(delay,500)
    })
  }
  open=[]
}
//count moves
function count_moves(){
  $('.moves').text(moves+=1)
  rating()
}
//count time
function count_up(){
    $('.card').click(function(){
      if (moves==1){
        function changeTime(){
            $('.second').text(time+=1)
          second_minute()
        }
          totaltime=setInterval(changeTime,1000)

      }
    })}
//change 60 seconds to 1 minute
function second_minute(){
  if (time===60){
    time=0
    setTimeout(function(){$('.minute').text(minutes+=1)},1000)
  }
}
// check rating
function rating(){
      if (moves>20 && moves<=30){
        $('.fa-star').remove()
        $('.stars').append($('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>'))
      }
      if (moves>30){
        $('.fa-star').remove()
        $('.stars').append($('<li><i class="fa fa-star"></i></li>'))
      }
    }

// end the game if all cards have showed.
function end_game(){
  $('.card').click(function(){
    if ($('.match').length==16){
      clearInterval(totaltime);
      dialog_box();
        }}
  )
}


//get pop up from https://jqueryui.com/dialog/#modal-confirmation
//pop up window to if game finisihed
function dialog_box(){

  $('<div id="dialog-confirm" title="Game Completed"><p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>Congratulations! You just won the game in '+minutes+' minutes '+time+' seconds and '+moves+' moves, with '+$('.fa-star').length+'/3 star rating. Do you want to play again?</p></div>').insertBefore($('.stars'))
  $( function() {
    $( "#dialog-confirm" ).dialog({
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    buttons: {
      "Play Again": function() {
        $( this ).dialog( "close" );
        clearInterval(totaltime);
        play_again()

      },
      CLose: function() {
        $( this ).dialog( "close" );
      }
    }
  });

} );
}
// click to reset game
function reset(){
  $('.restart').click(function(){
    moves=0
    time=0
    minutes=0
    clearInterval(totaltime);
    $('.moves').text(moves)
    $('.second').text(time)
    $('.minute').text(minutes)
    ordered_cards()
    $('.fa-star').remove()
    $('.stars').append($('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>'))
    $('.card').each(function(){$(this).removeClass().addClass('card')})
  })
}
// play again when game is finished
function play_again(){
  moves=0
  time=0
  minutes=0
  clearInterval(totaltime);
  $('.moves').text(moves)
  $('.second').text(time)
  $('.minute').text(minutes)
  ordered_cards()
  $('.fa-star').remove()
  $('.stars').append($('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>'))
  $('.card').each(function(){$(this).removeClass().addClass('card')})
}



ordered_cards()
click()
count_up()
end_game()
reset()
