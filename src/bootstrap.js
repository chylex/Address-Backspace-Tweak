Components.utils.import("resource://gre/modules/Services.jsm");

// Functions

function handleAddressBarKey(e){
  var ele = e.target;
  
  if (e.keyCode === 8 && ele.selectionStart !== ele.selectionEnd && ele.selectionEnd === ele.value.length){
    ele.ownerDocument.defaultView.setTimeout(function(){
      if (ele.value.length > 0){
        ele.value = ele.value.slice(0, -1);
      }
    }, 0);
  }
}

function loadWindow(w){
  w.document.getElementById("urlbar").addEventListener("keydown", handleAddressBarKey);
}

function unloadWindow(w){
  w.document.getElementById("urlbar").removeEventListener("keydown", handleAddressBarKey);
}

// Window management

function forEachWindow(callback){
  var windows = Services.wm.getEnumerator("navigator:browser");
  
  while(windows.hasMoreElements()){
    callback(windows.getNext());
  }
}

var WindowListener = {
  onOpenWindow: function(w){
    var window = w.QueryInterface(Components.interfaces.nsIInterfaceRequestor).getInterface(Components.interfaces.nsIDOMWindow);
    
    var onload = function(){
      window.removeEventListener("load", onload);
      
      if (window.document.documentElement.getAttribute("windowtype") === "navigator:browser"){
        loadWindow(window);
      }
    };
    
    window.addEventListener("load", onload);
  },
  
  onCloseWindow: function(w){
    unloadWindow(w);
  },
  
  onWindowTitleChange: function(w, newTitle){}
};

// Bootstrap

function startup(data, reason){
  forEachWindow(loadWindow);
  Services.wm.addListener(WindowListener);
}

function shutdown(data, reason){
  forEachWindow(unloadWindow);
  Services.wm.removeListener(WindowListener);
}

function install(data, reason){}
function uninstall(data, reason){}
