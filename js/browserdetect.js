if (typeof (LS) === "undefined") {
  LS = {}
}
LS.SystemDetector = {
  getAgent: function () {
    return navigator.userAgent.toLowerCase()
  },
  getPlatform: function () {
    return navigator.platform.toLowerCase()
  },
  // Mac Checks
  isMac: function () {
    return !!this.getAgent().match(/mac/i) && (this.getAgent().indexOf("ipad") == -1) && (this.getAgent().indexOf("iphone") == -1)
  },
  macVersion: function () {
    var h = this.getAgent();
    if (!this.isMac(h)) {
      return null
    }
    var f = h.match(/(mac os x )([\d\._]*)/i);
    if (f == null) {
      return f
    }
    if (!! f[2].match(/\./)) {
      f = f[2].split(".")
    } else {
      f = f[2].split("_")
    }
	var version = "";
    for (var e = 0; e < f.length; e++) {
	  if (e == 0)
        version = version + f[e]
      else
	    version = version + '.' +f[e]
    }
    return version
  },
  isMavericks: function () {
    return this.isMac() && (this.macVersion().indexOf("10.9") != -1)
  },
  isMountainLion: function () {
    return this.isMac() && (this.macVersion().indexOf("10.8") != -1)
  },
  isLion: function () {
    return this.isMac() && (this.macVersion().indexOf("10.7") != -1)
  },
  // Win Checks
  isWin: function () {
    return !!this.getAgent().match(/win/i)
  },
  isWin8: function () {
    return this.isWin() && (this.getAgent().match(/nt\s*6\.[23]([0-9]{0,2})?/i))
  },
  isWin7: function () {
    return this.isWin() && (this.getAgent().match(/nt\s*6\.1([0-9]{0,2})?/i))
  },
  isWinVista: function () {
    return this.isWin() && (this.getAgent().match(/nt\s*6\.0([0-9]{0,2})?/i))
  },
  isWinx64: function () {
    return this.isWin() && ((this.getAgent().indexOf("wow64") != -1) || (this.getAgent().indexOf("win64") != -1))
  },
  // Linux Checks
  isLinux: function () {
    return !!this.getPlatform().match(/linux/i)
  }
};