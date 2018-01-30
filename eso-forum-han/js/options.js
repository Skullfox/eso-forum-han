$(document).foundation()

$( document ).ready(function() {

  $(".han-settings").each(function () {
    var option = ( $(this).attr("id").length == 0 ) ? false : $(this).attr("id");
    chrome.storage.local.get(option,function(result){
      if(option in result){
        $('#' + option).prop('checked', result[option]);
      }else{
        $('#' + option).prop('checked', false);
      }
    });
  });

  $(".han-settings").change(function() {

    var option = ( $(this).attr("id").length == 0 ) ? false : $(this).attr("id");

      if(this.checked) {
          console.log(option + " checked");
          var obj = {};
          obj[option] = 1;
          chrome.storage.local.set(obj, function() {
            console.log("saved");
          });

      }else{
          console.log(option + " unchecked");
          var obj = {};
          obj[option] = 0;
          chrome.storage.local.set(obj, function() {
          });
      }

      chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.reload(tab.id);
      });

  });

});
