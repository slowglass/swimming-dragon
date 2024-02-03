var Debug = function(id) {
	this.id=id;
	this.debug={};
	this.read();
}

Debug.prototype = {
	_get: function(id) { return this.debug[id]; },
	get: function(id) { 
		var v=localStorage["debug-"+id];
		this.debug[id]=(v==="TRUE"); 
		return this._get(id);
	},
	set: function(id, v) { 
		this.debug[id]=v;
		localStorage["debug-"+id]=v?"TRUE":"FALSE"; 
	},
	add_debug: function(id, label) {
		var self=this;
		if (typeof(Storage) === "undefined") return;
		$("#"+id).click(function() { self.update(); });
		if (this._get(id)) $("#"+id).prop("checked", true);
		if (this.opts.indexOf(id) == -1) this.opts.push(id);
	},

	update: function() {
		var self=this;
		console.log("Update" +JSON.stringify(this.opts));
		$.each(this.opts, function(i, id) { self.set(id,$("#"+id).prop("checked")); 
		console.log("Update "+id+ "="+$("#"+id).prop("checked"));
	});
		localStorage["debug_opts"]=this.opts;
	},

	read: function() {
		var self=this;
		var opts=localStorage["debug_opts"];
		if (opts == undefined) this.opts=[]; else this.opts=opts.split(",");

		var debug_flags=[];
		$.each(this.opts, function(i, id) { if (self.get(id)) debug_flags.push(id); });
		if (debug_flags.length >0) console.log("Debug: Debug Options "+JSON.stringify(debug_flags));
	},

	log: function(id, msg)
	{
		if (this._get(id)) console.log(id+": " +msg);
	}
}
