//MAIN IIFE
(function(global) {
// DATA MODULE ************************************
  var _dt = (function() {        
      //=>>>CLOSURE___________________________

      //____________________________________
      
      var dataPrototype = {
        //clear database User
        clearUser: function() {
          this.User.profile = {};
          this.User.repo = {};
        }
      }

      var _dt = Object.create(dataPrototype);// This is an example of app, if you will create a real app the database will be hidden
          _dt.Api = 'https://api.github.com/users/';
          _dt.id = '?client_id=603069c8fd837913b51e';
          _dt.secret = '&client_secret=9b522cef94055d3f8d76d03f95c0309dc6642d28';
          _dt.User = { //-> keep the User object come from http request
            profile: {},
            repo: {}
          }; 

      return _dt;

  }());

/*********************************************** */
// UI MODULE *************************************
  var _ui = (function() {        
      //=>>>CLOSURE___________________________

      //____________________________________
      
    var uiPrototype = {
         //show te user on the Dom
          showUser: function(user) {
            document.getElementById(this.Dom.profile).innerHTML = 
            `<div class="card card-body mb-3">
            <div class="row">
              <div class="col-md-3">
                <img class="img-fluid mb-2" src="${user.avatar_url}">
                <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
              </div>
              <div class="col-md-9">
                <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
                <span class="badge badge-success">Followers: ${user.followers}</span>
                <span class="badge badge-info">Following: ${user.following}</span>
                <br><br>
                <ul class="list-group">
                  <li class="list-group-item">Company: ${user.company}</li>
                  <li class="list-group-item">Website/Blog: ${user.blog}</li>
                  <li class="list-group-item">Location: ${user.location}</li>
                  <li class="list-group-item">Member Since: ${user.created_at}</li>
                </ul>
              </div>
            </div>
          </div>
          <h3 class="page-heading mb-3">Latest Repos</h3>
          <div id="repos"></div> `
          },

          //show repos on the Dom
          showRepos: function(repos) {
            var output = '';
            repos.forEach(function(repo) {
              output += `
              <div class="card card-body mb-2">
              <div class="row">
                <div class="col-md-6">
                  <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </div>
                <div class="col-md-6">
                <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
                <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
                <span class="badge badge-success">Forks: ${repo.forks_count}</span>
                </div>
              </div>
            </div>
              `;
                // Output repos
                document.getElementById('repos').innerHTML = output;
            });
          },

         //show alert when not found user
          showAlert: function(error) {
            document.getElementById(this.Dom.profile).innerHTML = 
            `<div class = "alert alert-danger">
            User not Found
            </div>`;
          },

         //clear user profile
          clearUser: function(error) {
            if(!error) {
              document.getElementById(this.Dom.profile).innerHTML = `<div class="alert alert-primary">Type the User</div>`;
            }

        }
    }

    var _ui = Object.create(uiPrototype);
        _ui.Dom = {//->strings Dom 
            search: 'searchUser',
            profile: 'profile',
            searchContainer: 'container searchContainer'
          }

    return _ui;

  }());

/************************************************** */
// APP MODULE ***************************************
// app is the only ibject expose to the global environment
  global.app = (function(_dt, _ui) {
     //=>>>CLOSURE___________________________

        var userText = '';
        
      //get input text
        function search(e){
          userText = e.target.value;

          if(userText !== '') {

           //call http function
            httpUser(userText);

          } else {
            _ui.clearUser();
            _dt.clearUser();
            console.log(_dt.User);//--> test
          }
            

        }
       //http request
        function httpUser(userText) {
          _http.menu({
            type:'GET',
            url: _dt.Api + userText + _dt.id + _dt.secret
          },callback)}
          
          //calback for httpRequest
          function callback(err,data) {
            if(err){
             //Show alert
             _ui.showAlert();

            }else {
                    // push a object to data User.profile
                    _dt.User.profile = JSON.parse(data);

                    console.log(_dt.User);//--> test

                    //cal the method showUser from _ui module
                    _ui.showUser(_dt.User.profile);


                    //create repo object
                    _http.menu({
                      type:'GET',
                      // takes the repos url from Object User.profile
                      url: _dt.User.profile.repos_url + _dt.id + _dt.secret
                    }, function (error,repo) {
                      if(error){      
                      }else {
                        // push a object to User.repo
                        _dt.User.repo = JSON.parse(repo);
                        _ui.showRepos(_dt.User.repo);
                      }
                    } );
                 }
          }

          
    //end CLOSURE__________________________

      var appSetup = {
          setupEvents: function() {
            //event get text value
            document.getElementById(_ui.Dom.search).addEventListener('keyup', search);
          }
      }

    var app = Object.create(appSetup);
    //run events
    app.setupEvents();
    return app;

  }(_dt, _ui));

  console.log(_dt);
  console.log(_ui);
  console.log(app);
}(window));



