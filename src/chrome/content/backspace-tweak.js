var BSPCTWEAK = {
	load: function(){
		document.getElementById("urlbar").addEventListener("keydown", BSPCTWEAK.handleAddressBarKey);
	},
	
	unload: function(){
		document.getElementById("urlbar").removeEventListener("keydown", BSPCTWEAK.handleAddressBarKey);
	},
  
  handleAddressBarKey: function(e){
    var ele = e.target;
    
    if (e.keyCode === 8 && ele.selectionStart !== ele.selectionEnd && ele.selectionEnd === ele.value.length){
      window.setTimeout(function(){
        if (ele.value.length > 0){
          ele.value = ele.value.slice(0, -1);
        }
      }, 0);
    }
  }
};

window.addEventListener("load", BSPCTWEAK.load, false);
window.addEventListener("unload", BSPCTWEAK.unload, false);
