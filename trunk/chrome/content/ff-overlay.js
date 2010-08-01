EmuleOneClick.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ EmuleOneClick.showFirefoxContextMenu(e); }, false);
};

EmuleOneClick.getCharPref = function(prefname, value){
	try {value=this.pref.getCharPref(prefname);} // get pref
	catch(e) {this.pref.setCharPref(prefname, value);} // if pref doesnt exist, create it
	return value;
},

EmuleOneClick.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  //TODO: to check if this link is a valid ed2k link.
  document.getElementById("context-emule-download").hidden = !gContextMenu.onLink;
};

EmuleOneClick.addLink = function(link) {
    //1.login & to get session id
    var logins = EmuleOneClick.getLoginInfo();
    var url = logins[0].username;
    var password = logins[0].password;
    if(!url || !password) {
    	alert("Please set your login information for eMule web interface");
    	return;
    }
    var request = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);
    request.onload = function(e) {
        var content = e.target.responseText;
        //alert(content);
        var r = /\?ses\=(.*?)\&amp\;/;
        var matchs = r.exec(content);
        if(matchs!=null) {
        	url = url.replace(/\/$/,"");
            gBrowser.addTab(url+"/?ses="+matchs[1]+"&w=transfer&ed2k="+encodeURIComponent(link));
        }else {
            alert("eMule web interface Login failed.");
        }
        
    }
    request.onerror = function(e) {
        window.alert("Error Status:\n" + e.target.status);
    }
    request.open("POST", url, true);
    request.send("p="+password+"&w=password&submit=x");
    
};

EmuleOneClick.getLoginInfo = function() {

	var hostname = 'chrome://emuleoneclick';
	var formSubmitURL = null;
	var httprealm = 'emule';
	var username = 'user';
	var password=null;

	try {
		var myLoginManager = Components.classes["@mozilla.org/login-manager;1"].
				  getService(Components.interfaces.nsILoginManager);
		var logins = myLoginManager.findLogins({}, hostname, formSubmitURL, httprealm);
	} catch(ex) {}	
	
	if(logins) {
		return logins;
	}else {
		return null;
	}

}

window.addEventListener("load", EmuleOneClick.onFirefoxLoad, false);
