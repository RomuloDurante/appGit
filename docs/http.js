// HTTP framework ************************************************
(function(global){

  function easyHTTP() {
    this.http = new XMLHttpRequest();
    this.data = [];
  }
  
  easyHTTP.prototype = {
            // the GET method
            get: function(obj, callback) {
              this.http.open(obj.type, obj.url, true);            
              var that = this;
              this.http.onload = function() {
                if(that.http.status === 200) {
                    callback(null, that.http.responseText);

                } else {
                  callback('Error: ' + that.http.status);
                }
              }            
              this.http.send();
            },

            getMultipleJSON: function(post) {
              JSON.parse(post).forEach(element =>{this.data.push(element)});
            },

            getSingleJSON: function(post) {
              this.data = JSON.parse(post);
            },

            getTxt: function(post) {
              this.data = post;
            },

            // POST method
            post: function(obj, callback) {
              this.http.open(obj.type, obj.url, true);
              this.http.setRequestHeader('Content-type', 'application/json');

              var that = this;
              this.http.onload = function() {
                  callback(null, that.http.responseText);
              } 

              this.http.send(JSON.stringify(obj.data));
            },

           // PUT method
            put: function(obj, callback) {
              this.http.open(obj.type, obj.url, true);
              this.http.setRequestHeader('Content-type', 'application/json');

              var that = this;
              this.http.onload = function() {
                  callback(null, that.http.responseText);
              } 

              this.http.send(JSON.stringify(obj.data));
            },

            //DELETE
            delete: function(obj, callback) {
              this.http.open(obj.type, obj.url, true);            
              var that = this;
              this.http.onload = function() {
                if(that.http.status === 200) {
                  callback(null, that.http.responseText);
                } else {
                  callback('Error: ' + that.http.status);
                }
              }            
              this.http.send();
            },

            //menu
            menu: function(obj, callback) {
              if(obj.type === 'GET'){
                 this.get(obj, callback);

              } else if (obj.type === 'POST'){
                 this.post(obj, callback);

              } else if (obj.type === 'PUT'){
                 this.put(obj, callback);

              } else if(obj.type === 'DELETE') {
                this.delete(obj, callback);
              }

            }
            
      } // end prototype

global._http = new easyHTTP();
}(window));