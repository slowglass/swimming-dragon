// Spinning Yin-Yang symbol.

var YinYang = function(loc, fg, bg) {
  this._init_();
  this.jq=$(loc);
  $(loc).append('<div style="margin:0; height: 400px;"></div>');
  $pdiv=$(loc).find("div");
  $pdiv.append('<div style="margin:auto; width: 256px; height: 256px;"></div>');
  $div=$pdiv.find("div");
  $div.append('<div class="iter-count" style="margin:0; height: 1.1em; font-size: 4em; width: 100%; text-align: center"></div>');
  $div.append('<div class="yin-yang">' +
      '<svg ' +
      'xmlns="http://www.w3.org/2000/svg" ' +
      'height="256" width="256" ' +
     'viewBox="-8 -8 16 16" ' +
      '> ' +
		   '<g><circle r="7" fill="#808080" filter="url(#f)"/> ' +
		      '<path d="m0-7a3.5 3.5 0 1 1 0 7 3.5 3.5 0 1 0 0 7 7 7 0 1 1 0-14z" fill="'+fg+'"/> ' +
				  '<path d="m0-7a7 7 0 1 1 0 14 3.5 3.5 0 1 1 0-7 3.5 3.5 0 1 0 0-7z" fill="'+bg+'"/> ' +
				  '<circle cy="-3.5" r="1.1" fill="'+bg+'"/><circle cy="3.5" r="1.1" fill="'+fg+'"/>' +
		  	'</g></svg></div>');
  $div.append('<div class="countdown" style="margin:0; height: 1.1em; font-size: 4em; width: 100%; text-align: center"></div>');
  this.yin = $div.find(".yin-yang");
  this.yang = $div.find(".yin-yang svg");
  this.yin.css({
    'animation-name': 'yin-yang-anticlockwise-spin',
    'animation-duration': '4s',
    'animation-timing-function': 'linear',  
    'animation-iteration-count': 'infinite',
    "animation-play-state": "paused",
    'width': '256px',
    'height': '256px',
    'margin': '0',
    'padding': '0'
  });
  this.yang.css({
    'animation-name': 'yin-yang-clockwise-spin',
    'animation-duration': '4s',
    'animation-timing-function': 'linear',  
    'animation-iteration-count': 'infinite',
    "animation-play-state": "paused",
    'width': '256px',
    'height': '256px',
    'margin': '0',
    'padding': '0'
  });
  this.spinDir=0;
}

YinYang.prototype = {
  _init_: function() {
    if (YinYang.prototype.haskeyframes == undefined) {
      $('body').append('<style>' +
          '@keyframes yin-yang-clockwise-spin     {  100% { transform: rotate( 360deg); } } ' +
          '@keyframes yin-yang-anticlockwise-spin {  100% { transform: rotate(-360deg); } } ' +
        '</style>');
      YinYang.prototype.haskeyframes = true;
    }
  },

  show: function() { debug.log("YinYang", "Show"); this.jq.show(); },
  hide: function() { debug.log("YinYang", "Hide"); this.jq.hide(); },
  click: function(cb) { debug.log("YinYang", "Click"); this.jq.click(cb); },

  stop: function() {
    debug.log("YinYang", "Stop"); 
    this.yin .css("animation-play-state", "paused");
    this.yang.css("animation-play-state", "paused");
  },
  
  spinClockwise: function() {
    debug.log("YinYang", "SpinClockwise"); 
    this.spinDir=1;
    this.yin .css("animation-play-state", "running");
    this.yang.css({"animation-play-state": "paused"});
  },

  spinAnticlockwise: function() {
    debug.log("YinYang", "SpinAnticlockwise"); 
    this.spinDir= -1;
    this.yin .css("animation-play-state", "paused");
    this.yang.css({"animation-play-state": "running"});
  },

  spin: function() { this.spinAnticlockwise(); },
  toggle: function() {
    if (this.spinDir == -1) this.spinClockwise();
    else this.spinAnticlockwise();
  }
}
