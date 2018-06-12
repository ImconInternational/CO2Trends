/**
 * This function allows to add an app to the interface
 * -> Main toolbar
 * -> App tabs
 */

function addAppToView(appName,appId,tabContent,callback){
	if(appName && appName != "" && appId && appId != "" && tabContent && tabContent != ""){
		var element = '<a class="tab-link gdrAddedMenu" href="#' + appId + '" appid="' + appId + '">'+ appName + '</a>';
		$$(element).insertBefore(".gdr-main-toolbar #gdBtnDashboard");
		$$("#gdrAppTabs").append('<div class="tab" id="'+ appId + '">' + tabContent + '</div>');
		//console.log(tabContent);
	}
}


/**
 * This function allows to add on init functions
 * @param {function} toBeAdded function to be added on init
 */
var onInitFunctions = [];

function gdInitAppAddFunctions(toBeAdded){
	if(typeof toBeAdded == "function") onInitFunctions.push(toBeAdded);
}

function gdInitAppScript(toBeAdded){
	for(var i=0;i<onInitFunctions.length;i++){
		if(typeof onInsitFunctions[i] == "function") onInsitFunctions[i]();
	}
}

function gdInitAppDesign(){
	
}

/**
 * This method overides the post method by Framework7
 * It allows to buffer messages if connection is not available
 * 
 * @param {string} url
 * @param {string} data
 * @param {boolean} toQueue
 * @param {boolean} toQueueTwice
 * @param {function} callback
 * @param {function} callbackFailed
 * @param {function} callbackMsgQueued
 */
function gdrPostData(url,data,toQueue,toQueueTwice,callback,callbackFailed,callbackMsgQueued){
	encryptLoggedPostData(data,function(data){
		$$.post(appsLink,{d:data},function(d){
			
		},function(){
			queueObjForLate({d:data,status:1,timest:new Date().getTime()},function(){
			});
		});
	});
}

function gdrSendQueuedData(){
	
}

var GDR = function(){};


GDR.prototype.authMethod = function(k,obj,callback){
	console.log("Well authentified");
	console.log(obj);
	if(typeof callback == "function") callback();
};

GDR.prototype.getDatabaseCredentials = function(parent,callback){
	if(parent){
		
	}
};

GDR.prototype.checkIfInSameScope = function(child,parent){
	if(child && parent){
		return (child === parent) ? false : parent.contains(child);
	}
};

GDR.prototype.authentifyTag = function(appId,tag,callback){
	if(appid,tab){
		if(this.checkIfInSameScope($("#gdrAppTabs> #"+appId+".tab")[0],tag) || this.checkIfPublicTag(tag)){
			if(typeof callback === "function") callback();
			return true;
		}
	}
};

GDR.prototype.checkIfPublicTag = function(tag){
	//Implement the features to make sure, in case a tag is not public, 
	//not to be called by other scripts
	return true;
};

GDR.prototype.getContactList = function(callbackClick,callback){
	 
	var contactList = "";
	var userId,userNames,userEmail;
	getContactList(function(contact){
		userId = contact.userid;// == localStorage.userid ? contact.iduser : contact.idotheruser;
		userNames = contact.names;// == localStorage.userid ? contact.identuser.names : contact.identotheruser.names;
		userEmail = contact.email;// == localStorage.userid ? contact.identuser.email : contact.identotheruser.email;
		
		contactList += '<li class="gdrContactInContactList" email="' + userEmail + '" code="' + userId + '">'+
				          '<div class="item-content">'+
				            '<div class="item-inner">'+
				              '<div class="item-title">' + userNames +  '</div>'+
				            '</div>'+
				          '</div>'+
						'</li>';
	},function(){
		var popupHTML = '<div id="gdrPopupContactList" class="popup">'+
	 				'<div class="navbar">'+
					    '<div class="navbar-inner">'+
					      '<div class="left"><a href="index.html" class="link close-popup icon-only"><i class="icon icon-back"></i></a></div>'+
					      '<div class="center">Contacts</div>'+
					      //'<div class="right"><a href="#" class="open-panel link icon-only"><i class="icon icon-bars"></i></a></div>'+
					    '</div>'+
					  '</div>'+
                  '<div class="list-block contacts-block">'+
				    '<div class="list-group">'+
				      '<ul>'+
				        '<li class="list-group-title">A</li>'+
				        contactList + 
				      '</ul>'+
				     '</div>'+
				    '</div>'+
				   '</div>';
		
		myApp.popup(popupHTML);
		
		setTimeout(function(){
			var toBeReturnedObj = {};
			$$("#gdrPopupContactList .gdrContactInContactList").click(function(){
				toBeReturnedObj["code"] = $$(this).attr("code");
				toBeReturnedObj["email"] = $$(this).attr("email");
				toBeReturnedObj["nnames"] = $$(this).text();
				
				myApp.closeModal("#gdrPopupContactList");
				if(typeof callbackClick == "function") callbackClick(toBeReturnedObj);
			});
		},500);
	});
  	
};

function getContactList(callback,callbackComplete){
	getFilteredElement("contact",["status"],[1],1,function(d){
		if(typeof callback == "function") callback(d);
	},function(){
		if(typeof callbackComplete == "function") callbackComplete();
	});
}

var gdr = new GDR();

function showElementNotification(elt){
	if(!$(elt).css("position")){
		$(elt).css("position","relative").promise().done(function(){
			$(elt).append("<div class='notificationSymbole'></div>");
		});
	}else{
		$(elt).append("<div class='notificationSymbole'></div>");
	}
}

function removeElementNotificaation(elt){
	$(elt + " .notificationSymbole").remove();
}

var myApp = new Framework7({modalTitle : 'Gridlet',material : true,init:true});
var $$ = Dom7;
var mainView = myApp.addView('.main-view', {domCache : true});
mainView.router.load({pageName: 'gdrMainPage'});