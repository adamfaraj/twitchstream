(function(){


    let dom;
    const userArray = ["ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

    const init = function(){
    cacheDOM();
    bindEventHandlers();
//    twitchResponse();
};


    const cacheDOM = function() {
    dom = {};
    dom.container = $(".main-container");
    dom.searchText = dom.container.find(".search-text");
    dom.buttonSearch = dom.container.find("#button-search");
    dom.online = dom.container.find("#online");
    dom.offline = dom.container.find("#offline");
//    console.log(dom.buttonSearch);
  };

    const bindEventHandlers = function() {
        dom.buttonSearch.click(onSearchButton);
        dom.searchText.keydown(onEnterUserSearch);
    };
    
    const getUser = function(user) {
        let api = "https://wind-bow.glitch.me/twitch-api/streams/" + user;
      $.ajax({
        method: 'GET',
        url: api,
        cache: false,
        datatype: "json"
      }).then(function(data)    {
//        console.log(data.stream);
        if (data.stream == null){
            dom.offline.append("<div class='user_container'><span class='user_class'>" + user + ":</span>" +  "<span class='offline'> Offline</span></div> <br>");
        } else {
            dom.online.append("<div class='user_container'><span class='user_class'>"+user+ " is streaming " + data.stream.game + ": </span>"+'<a href="'+data.stream.channel.url+'"target=_blank class="online">'+"Online"+'</a>' + "<br>" + "<span class='status'>" + data.stream.channel.status + "</span>" + "<br>" + "<a href='" + data.stream.channel.url + "' target=_blank>" + "<img src ='"+ data.stream.channel.video_banner + "'>" + "</a>" + "<br>" + "<span class='viewers'>Viewers: " + data.stream.viewers + "</span></div>")
        }
      })
    }
    const onSearchButton = function() {
        userArray.push(dom.searchText[0].value);
        getUser(dom.searchText[0].value);
        dom.searchText[0].value = '';
//        console.log(dom.searchText[0].value);
//        console.log(userArray);
    };
    
     const onEnterUserSearch = function(e) {
    if (e.which === 13) {
      onSearchButton();
    }
  }

//    const twitchResponse = function() {
        userArray.forEach(function(user) {
            getUser(user);
    });
//  };

 
  
  

  init();

 })(jQuery);
