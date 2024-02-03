var MultiTimer = function(spinnerId) {
  var self=this;
  this.updateDisplay();
  this.nosleep = new NoSleep();
  this.spinner = new YinYang(spinnerId, "#ccf", "#004");
  this.endSound = new Howl({  src: ["music/templeBell.wav"]});
  this.minSound = new Howl({  src: ["music/ting.wav"]});

  this.state = "STATIONARY";
  $("body").one("pagecontainerchange", function() { 
    $(spinnerId +" path").click(function() { if (self.state == "SPINNING") self.stop(); else self.start(); });
    self
        .on("min-rollover", function() { self.minSound.play(); })
        .on("iter-rollover", function() { self.endSound.play(); });
  });
}

MultiTimer.prototype = {
  timer: {  sec: 30, min: 0, iter: 1 },
  sec: 0, min: 0, iter: -1,
  timerid: null,
  

  start: function() {
    var self=this;
    this.state = "SPINNING";
    this.spinner.spinClockwise();
    this.nosleep.enable();
    if (this.timerid!=null) clearInterval(this.timerid);
    this.timerid=setInterval(function() { self.tick(); }, 1000);
    this.sec=10;
    this.min=0;
    this.iter=this.timer.iter;
    this.updateDisplay();
    debug.log("MultiTimer", "Start");
  },
  
  stop: function() {
    if (this.timerid!=null) clearInterval(this.timerid);
    this.state = "STATIONARY";
    this.spinner.stop();
    this.nosleep.disable();
    this.timerid=null;
    this.iter=-1;
    this.updateDisplay();
    debug.log("MultiTimer", "Stop");
  },
  
  tick: function() {
    debug.log("MultiTimer", "TICK:"+this.iter+", "+this.min+", "+this.sec);
    var callback=null;
    this.sec--;
    if (this.sec<0) { this.sec= 59; this.min--; callback=this.minRolloverCB; }
    if (this.min<0) { this.sec= this.timer.sec; this.min=this.timer.min; this.iter--; callback=this.iterRolloverCB; }
    this.updateDisplay();
    if (callback != null) callback();
    if (this.iter<0)
    {
      this.stop();
      if (this.finishedCB != null) this.finishedCB();
    }
  },
  
  updateDisplay: function() { 
    var cd, it;
    if (this.iter<0) { it = this.timer.iter; cd = this.getNumber(this.timer.min) + ":" + this.getNumber(this.timer.sec); }
    else if (this.iter == this.timer.iter) { it = "Starting"; cd = this.getNumber(this.sec); }
    else { it = this.iter+1; cd = this.getNumber(this.min) + ":" + this.getNumber(this.sec); }
    $("#standing-stake .iter-count").text(it);
    $("#standing-stake .countdown").text(cd);
  },
  
  getNumber: function(n) {
    if (n>9) return n.toString();
    else return '0'+n.toString();
  },


  on: function(n, cb) {
    if (n=="min-rollover") this.minRolloverCB=cb;
    if (n=="iter-rollover") this.iterRolloverCB=cb;
    if (n=="finished") this.finishedCB=cb;
    return this;
  },
  
  getIterations: function(i) { return this.timer.iter; },
  setIterations: function(i) { this.timer.iter=i; this.updateDisplay(); },
  setDuration: function(s) { var secs = parseInt(s, 10); this.timer.sec=secs%60; this.timer.min=Math.floor(secs/60);  this.updateDisplay(); }
}
