var Spill = function() {
  var self=this;
  this.sound = new Howl({  
        src: ["music/water.wav"],
        sprite: { spill: [1500, 950]},
        volume: 1.0,
        onend: function() { self.setStatusDelay(); }
  });
  
}

Spill.prototype = {
  tilt: 0,
  lowerBound: 15,
  upperBound: 30,
  maxDelay: 2000,
  status: "OFF",
  
  start: function() { this.setStatusOK(); },
  stop: function() { this.setStatusOff(); },
  setStatusOff: function() {
    this.status = "OFF";
    this.sound.stop();
    window.clearTimeout(this.delayid);

    debug.log("Spill", "Stop");
  },
  setStatusOK: function() { 
    debug.log("Spill", "Start");
    this.status = "OK"; 
  },
  setStatusPlay: function() {
    this.status = "PLAY";
    this.sound.play("spill");

    debug.log("Spill", "Audio Warning");
  },
  setStatusDelay: function() {
    var self = this;
    this.status = "DELAY";
    var d=this.delay();

    debug.log("Spill", "Set Delay ("+d+")");
    this.delayid = window.setTimeout(function() { self.replay(); }, this.delay());
  },
  
  replay: function() {
    if (this.tilt >= this.lowerBound)
      this.setStatusPlay();
    else
      this.setStatusOK();
  },
  delay: function() {
    var v=Math.min(Math.max(this.lowerBound,this.tilt),this.upperBound);
    var d=this.maxDelay-this.maxDelay*(v-this.lowerBound)/(this.upperBound-this.lowerBound);
    return d;
  },

  setTilt: function(t) {
    this.tilt=Math.abs(t);

    debug.log("Spill_TRACE", "Tilt + ("+t+")");
    if (this.tilt>=this.lowerBound && this.status=="OK")
      this.setStatusPlay();
  },
  
  setRange: function(mn,mx) {
    this.lowerBound=mn;
    this.upperBound=mx;
  },
  setMaxDelay: function(d) { this.maxDelay=d; },
  setMusic: function(url) { this.sound=new Howl({ src: [url], volume: 1.0}); }
}
