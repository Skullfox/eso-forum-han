$( document ).ready(function() {

  hanPlugin = {

    "start" : function(){
      console.log('%c[HAN] Forum Plugin ' + chrome.runtime.getManifest().version, 'background: #fff; color: #33636b');
    },

    "log" : function(text = "M'aiq has heard it is dangerous to be your friend."){
      console.log('%c[HAN] '+ text, 'background: #fff; color: #33636b');
    },

    "getOption" : function(option,callback,args = {}){

      chrome.storage.local.get(option,function(result){
        console.log(result);
        if(option in result){
          if(result[option]){
            callback(args)
          }else{
            console.log("Option " + option + " didnt exist or is false");
          }
        };
      });
    },

    "addAfterAjax" : function(selector,callback){

      var e = setInterval(function() {
         if ($(selector).length) {
            callback();
            clearInterval(e);
         }
      }, 200,selector,callback);
    },


    "nerfFilter" : function(){

      var _this = this;

      chrome.storage.local.get("nerf",function(result){
        if("nerf" in result){
          if(result.nerf){

            _this.addAfterAjax(".DiscussionsTable",function(){

              var c = 0;

              $( "tr.ItemDiscussion .DiscussionName a" ).each(function( index ) {
                  if( $( this ).text().match(/nerf/i) ){

                    var i = $( this ).parents(".Item");
                    if( i.hasClass("han-filter-nerf") == false ){
                      $( this ).parents(".Item").addClass("han-filter-nerf");
                      $( this ).parents(".Item").hide();
                      c++;
                    }
                  }
                });
                _this.log(c+" nerf threads hidden.");
            })

          }else{
            _this.addAfterAjax(".DiscussionsTable",function(){
              var c = 0;
              $( "tr.han-filter-nerf" ).each(function( index ) {
                      $( this ).show();
                      $( this ).removeClass("han-filter-nerf");
                });
            })
          }
        };
      });
    },
  }

  hanPlugin.start();
  hanPlugin.nerfFilter();

});
