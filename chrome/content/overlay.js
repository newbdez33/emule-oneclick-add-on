var EmuleOneClick = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
  },

  onMenuItemDownload: function(e) {
    EmuleOneClick.addLink(gContextMenu.getLinkURL());
  },

  onOptionsClick: function(e) {
    // just reuse the function above.  you can change this, obviously!
    var ww = Components.classes["@mozilla.org/embedcomp/window-watcher;1"]
                   .getService(Components.interfaces.nsIWindowWatcher);
    ww.openWindow(null, 'chrome://EmuleOneClick/content/options.xul', 'Options', 'chrome,centerscreen,modal', null);
  }
};

window.addEventListener("load", EmuleOneClick.onLoad, false);
