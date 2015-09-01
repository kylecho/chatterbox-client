// YOUR CODE HERE:
var message = {
  username: 'something',
  text: 'something',
  roomname: 'something'
};

var rooms = {};

var saveInput = function() {
  var username = $('#username').val();
  var message = $('#message').val();
  var room = $('#room').val();
  app.send({
    username: username,
    text: message,
    roomname: room
  });
};

var refresh = function() {
  app.fetch();
};

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox'
};

app.init = function() {
  app.fetch();
  app.handleSubmit();
};

app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data) {
        console.log('chatterbox: Message sent');
        $('#chats').empty();
        app.fetch();
    },
    error: function(data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function() {
  $.ajax({
    url: app.server,
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data) {
      var ourData = data.results;
      for (var i = 0; i < ourData.length; i++) {
        var user = ourData[i].username;
        var msg = ourData[i].text;
        var room = ourData[i].roomname;
        rooms[room] = room;
        var a = $('<li>');
        a.text(user + ": " + msg + ", room: " + room);
        a.append('</li>');
        jQuery('#chats').append(a);
      }
      app.listRoom();
    },
    error: function(data) {
      console.error('chatterbox: Failed to receive message');
    }
  });
};

app.fetchByRoom = function(targetRoom) {
  $.ajax({
    url: app.server,
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data) {
      var ourData = data.results;
      for (var i = 0; i < ourData.length; i++) {
        var user = ourData[i].username;
        var msg = ourData[i].text;
        var room = ourData[i].roomname;
        rooms[room] = room;
        if (targetRoom === room) {
          var a = $('<li>');
          a.text(user + ": " + msg + ", room: " + room);
          a.append('</li>');
          jQuery('#chats').append(a);
        }
      }
      app.listRoom();
    },
    error: function(data) {
      console.error('chatterbox: Failed to receive message');
    }
  });
};

app.handleSubmit = function() {

};
app.clearMessages = function() {
  $('#chats').empty();
};

// for test to pass
app.addMessage = function(message) {
  $('#chats').append('<li>' + message.username + ': ' + message.text + '</li>');
};

app.listRoom = function() {
  $('#roomSelect').empty();
  for (var key in rooms) {
    var option = $('<option></option>');
    option.val(key);
    option.text(key);
    $('#roomSelect').append(option);
  }
};

app.addRoom = function(room){
  $('#roomSelect').append('<li>' + room + '</li>');
};

app.addFriend = function() {

};

// $( "selected" )
//   .change(function() {
//     $( "selected option:selected" ).each(function() {
//       console.log('selected?');
//       var roomName = $(this).val();
//       app.fetchByRoom(roomName);  
//     });
//   })
//   .trigger( "change" );
$(document).ready(function(){
  $('#roomSelect').change(function(){
    var selectedVal = $(this).val();
    $.ajax({
        url: app.server,
        type: 'GET',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function(data) {
          var ourData = data.results;
          $('#chats').empty();
          for (var i = 0; i < ourData.length; i++) {
            var user = ourData[i].username;
            var msg = ourData[i].text;
            var room = ourData[i].roomname;
            rooms[room] = room;
            if (selectedVal === ourData[i].roomname) {
              var a = $('<li>');
              a.text(user + ": " + msg + ", room: " + room);
              a.append('</li>');
              jQuery('#chats').append(a);
            }
          }
          app.listRoom();
        },
        error: function(data) {
          console.error('chatterbox: Failed to receive message');
        }
      });
  });
});

// setInterval(function() {
//   app.fetch();
// }, 1000);
// setInterval(function() {
//   $('#chats').empty();
// }, 5000);


// function sendHelper () {
//   var message = {
//     username: 'something',
//     text: 'something',
//     roomname: 'something'
//   };

//   $('#submit').on('click', function(){
//     message.username = $('#username').val();
//     message.text = $('#message').val();
//   });
// }