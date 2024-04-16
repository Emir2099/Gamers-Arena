
try{
  var scene = document.getElementById('scene');
  var parallaxInstance = new Parallax(scene);
  
}catch(err){
  console.log(err.message);
}




document.querySelectorAll('.movie_card').forEach(function(card) {
  card.addEventListener('mouseenter', function() {
    try {
      // Create an audio element
      var hoversound = new Audio('./AUDIO/hover.mp3');
      
      // Play the sound
      hoversound.play().catch(error => {
        console.error('Failed to play audio:', error);
      });
    } catch (error) {
      console.error('Error while playing audio:', error);
    }
  });
});


document.querySelectorAll('.flip-card').forEach(function(card) {
  card.addEventListener('mouseenter', function() {
    try {
      // Create an audio element
      var hoversound = new Audio('./AUDIO/hover.mp3');
      
      // Play the sound
      hoversound.play().catch(error => {
        console.error('Failed to play audio:', error);
      });
    } catch (error) {
      console.error('Error while playing audio:', error);
    }
  });
});