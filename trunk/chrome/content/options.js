//OK
function onOK() {
	var url=document.getElementById('url').value;
	var passwd=document.getElementById('passwd').value;

	var passwordManager = Components.classes["@mozilla.org/login-manager;1"].
				getService(Components.interfaces.nsILoginManager);

	var nsLoginInfo = new Components.Constructor("@mozilla.org/login-manager/loginInfo;1",
						     Components.interfaces.nsILoginInfo,
						     "init");
	var extLoginInfo = new nsLoginInfo('chrome://emuleoneclick', null, 'emule', 
				url, passwd, '', '');

	var logins = getLoginInfo();
	try {
		if(logins!=null) {
			var old = new nsLoginInfo('chrome://emuleoneclick', null, 'emule', 
						logins[0].username, logins[0].password, '', '');
			passwordManager.modifyLogin(old, extLoginInfo);
		}else {
			passwordManager.addLogin(extLoginInfo);
		}
	}catch(e) { alert(e); }

	return true;	
}


function onCancel() {
	return true;
}

function onLoad() {

	var logins = getLoginInfo();
	if(logins!=null) {
		document.getElementById('url').value=logins[0].username;
		document.getElementById('passwd').value=logins[0].password;
	}

}

function getLoginInfo() {

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
