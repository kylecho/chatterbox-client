// YOUR CODE HERE:
var message = {
  username: 'something',
  text: 'something',
  roomname: 'something'
};

$('#submit').on('click', function(){
  message.username = $('#username').val();
  message.text = $('#message').val();
});

var app = {};

app.init = function() {};

app.send = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data) {
        console.log('chatterbox: Message sent');
    },
    error: function(data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function() {
  // var response;
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data) {
      var ourData = data.results;
      for (var i = 0; i < ourData.length; i++) {
        var user = ourData[i].username;
        var msg = ourData[i].text;
        var room = ourData[i].roomname;
        // $('#chats').append('<li>' + user + ':' + msg + '</li>');
        var a = $('<li>');
        // a.text(user);
        // a.text(":");
        a.text(user + ":" + msg);
        a.append('</li>');
        jQuery('#chats').append(a);
      }
    },
    error: function(data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message');
    }
  });
};

// console.log("user:" + user + " msg:" + msg + " roomname:" + room);        
// { results: [{ username:, text:, roomname: },{},{} ... }   