var EZKeyboard = function(updateInterval) {
	var table = {
		"backspace": 8,
		"tab": 9,
		"enter": 13,
		"esc": 27,
		"pageup": 33,
		"pagedown": 34,
		"end": 35,
		"home": 36,
		"left": 37,
		"up": 38,
		"right": 39,
		"down": 40,
		"insert": 45,
		"delete": 46
	};
	var keys = [];
	var listeners = []; // function(keyevent,keynum)
	var pushedListeners = {};
	this.getKeyNum = function(keynum) {
		if (typeof(keynum)=="string") keynum = table[keynum.toLowerCase()];
		if (typeof(keynum)!="number") throw "Keyboard exception: First argument to setListener is not a key number.";
		return keynum;
	}
	//this.setListener = function(keynum,listener) { listeners[this.getKeyNum(keynum)] = listener; }
	this.pushListener = function(keynum,listener) {
		keynum = this.getKeyNum(keynum);
		if (listeners[keynum]!=undefined) {
			if (pushedListeners[keynum]==undefined) pushedListeners[keynum] = []; 
			pushedListeners[keynum].push(listeners[keynum]);
		}
		listeners[keynum]=listener;
	}
	this.popListener = function(keynum) {
		keynum = this.getKeyNum(keynum);
		var restore, pl = pushedListeners[keynum];
		if (pl!=undefined && pl.length>0) restore = pl.pop();
		listeners[keynum] = restore;
		if (!restore) delete listeners[keynum];
	}
	this.notify = function() { for (var i=0;i<keys.length;++i) if (keys[i] && listeners[i]) try { listeners[i](i); } catch(Ex) {} }
	document.onkeydown = function(e) { e=e||window.event; keys[e.which||e.keyCode]=true; return true; }	
	document.onkeyup = function(e) { e=e||window.event; keys[e.which||e.keyCode]=false; return true; }
	var intervalID = window.setInterval(this.notify,updateInterval||1);				
}
var keyboard = new EZKeyboard(100);
// Sample usage
/*                   KEYNUM VALUE
keyboard.pushListener(37,function(keynum){
	// Do stuff on 'arrow left'
});

keyboard.pushListener('Left',function(keynum){
	// Do stuff on 'arrow right'
});					
*/