/*global window:false */
var $ = window.$;
var d3 = window.d3;
var document = window.document;

var DESKTOP_BREAKPOINT = 1134;
var NAV_WIDTH = $(window).width() * 20 / 100;
var plainData = {};
var interval = 10;
var targetId = null;

var NAV_ID = 'RoadmapNav';
var CHART_ID = 'RoadmapChart';
var SVG_ID = 'RoadmapSvg';
var SVG_BOX_GRP_ID = 'RoadmapSvgBoxGrp';
var TASK_TITLE_ID = 'TaskTitle';
var TASK_DESC_ID = 'TaskDesc';
var BREADCUM_ID = 'Breadcum';
var MOBILE_MENU_ID = 'Mobile_menu';
var MOBILE_CHART_ID = 'Mobile_chart';
var SUB_FEATURES_ID = 'Sub_feature';
var RELIED_ON_FEATURES_ID = 'Relied_on_features';
var RELY_THIS_FEATURES_ID = 'Rely_this_features';
var MVP_ID = 'MVP';

var NAV_PREFIX = 'NAV_';
var BOX_PREFIX = 'BOX_';
var ARROW_PREFIX = 'ARROW_';
var BOX_PATTERN_PREFIX = 'BOX_PATTERN_';
var CONNECTION_PREFIX = 'CONNECTION_';
var FEATURES_PREFIX = 'FEATURE_';

var EXCLUDED_TASKS = [ 'EXTERNAL', 'DOWN_STREAM' ];
// var END_TASK_TARGET = 'END';

var TASK_FEATURE_TYPE = {
  SUB_FEATURES: 'sub_features',
  RELIED_ON_FEATURES: 'relied_on_features',
  RELY_THIS_FEATURES: 'rely_this_features'
};

var infoIconOpen = '<svg class="info-icon opened" version="1.1" id="Layer_1" x="0px" y="0px"' +
  ' viewBox="0 0 39 24" fill="#2A98EA" enable-background="new 0 0 39 24" ><path d="M11,' +
  '17h2v-6h-2V17z M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,' +
  '20c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8S16.4,20,12,20z M11,9h2V7h-2V9z"/><polygon ' +
  'points="31.3,13.2 26.8,8.7 25.8,9.8 31.3,15.3 36.8,9.8 35.7,8.7 "/></svg>';

var infoIconClose = '<svg class="info-icon closed" version="1.1" id="Layer_1" x="0px" y="0px"' +
  ' viewBox="0 0 39 24" fill="#2A98EA" enable-background="new 0 0 39 24">' +
  '<polygon points="31.3,11.1 35.7,15.5 36.8,14.5 31.3,9 25.8,14.5 26.8,15.5 "/>' +
  '<path d="M12,2.3c-5.5,0-10,4.5-10,10s4.5,10,10,10s10-4.5,10-10S17.5,2.3,12,2.3z"/>' +
  '<path fill="#FFFFFF" d="M11,17.3h2v-6h-2V17.3z M11,9.3h2v-2h-2V9.3z"/></svg>';

var TASK_STATUS = {
  NAME: 'Status_Patterns',
  COMPLETE: {
    id: 'STATUS_COMPLETE',
    path: '14.9,4.9 7.7,12.1 4.9,9.2 3.5,10.6 7.7,14.9 16.3,6.3',
    color: '#FFFFFF'
  },
  COMPLETE_DARK: {
    id: 'STATUS_COMPLETE_DARK',
    path: '14.9,4.9 7.7,12.1 4.9,9.2 3.5,10.6 7.7,14.9 16.3,6.3',
    color: '#000000'
  },
  OPEN: {
    id: 'STATUS_OPEN',
    path: 'M15.2,13.3l-4.5-4.5c0.4-1.1,0.2-2.5-0.7-3.4c-1-1-2.5-1.2-3.6-0.6' +
      'l2.1,2.1L7,8.4L4.8,6.3C4.2,7.4,4.5,8.9,5.5,9.9c0.9,0.9,2.3,1.2,3.4,' +
      '0.7l4.5,4.5c0.2,0.2,0.5,0.2,0.7,0l1.1-1.1C15.4,13.8,15.4,13.4,15.2,13.3z',
    color: '#FFFFFF'
  },
  OPEN_DARK: {
    id: 'STATUS_OPEN_DARK',
    path: 'M15.2,13.3l-4.5-4.5c0.4-1.1,0.2-2.5-0.7-3.4c-1-1-2.5-1.2-3.6-0.6' +
      'l2.1,2.1L7,8.4L4.8,6.3C4.2,7.4,4.5,8.9,5.5,9.9c0.9,0.9,2.3,1.2,3.4,' +
      '0.7l4.5,4.5c0.2,0.2,0.5,0.2,0.7,0l1.1-1.1C15.4,13.8,15.4,13.4,15.2,13.3z',
    color: '#000000'
  },
  PLANNED: {
    id: 'STATUS_PLANNED',
    path: 'M14.7,5.1H7.9C7,5.1,6.3,5.9,6.3,6.8v1.4h2.3c1.5,0,2.7,1.2,2.7,2.7v1.3' +
    'h3.4c0.9,0,1.6-0.7,1.6-1.6V6.8C16.3,5.9,15.6,5.1,14.7,5.1zM8.7,10.1H6' +
    'c-0.4,0-0.7,0.3-0.7,0.7v1c0.8,0,1.4,0.6,1.4,1.4h2c0.4,0,0.7-0.3,0.7-0.7v-1.7' +
    'C9.3,10.4,9,10.1,8.7,10.1zM5.3,12.9H4.1c-0.2,0-0.4,0.2-0.4,0.4v1.2' +
    'c0,0.2,0.2,0.4,0.4,0.4h1.2c0.2,0,0.4-0.2,0.4-0.4v-1.2C5.7,12.9,5.5,12.9,5.3,12.9z',
    color: '#FFFFFF'
  },
  PLANNED_DARK: {
    id: 'STATUS_PLANNED_DARK',
    path: 'M14.7,5.1H7.9C7,5.1,6.3,5.9,6.3,6.8v1.4h2.3c1.5,0,2.7,1.2,2.7,2.7v1.3' +
    'h3.4c0.9,0,1.6-0.7,1.6-1.6V6.8C16.3,5.9,15.6,5.1,14.7,5.1zM8.7,10.1H6' +
    'c-0.4,0-0.7,0.3-0.7,0.7v1c0.8,0,1.4,0.6,1.4,1.4h2c0.4,0,0.7-0.3,0.7-0.7v-1.7' +
    'C9.3,10.4,9,10.1,8.7,10.1zM5.3,12.9H4.1c-0.2,0-0.4,0.2-0.4,0.4v1.2' +
    'c0,0.2,0.2,0.4,0.4,0.4h1.2c0.2,0,0.4-0.2,0.4-0.4v-1.2C5.7,12.9,5.5,12.9,5.3,12.9z',
    color: '#000000'
  }
};

var TASK_COLORS = [ 'red-1', 'red-2', 'red-3', 'red-4', 'red-5', 'red-6', 'pink-1', 'pink-2',
  'pink-3', 'pink-4', 'pink-5', 'pink-6', 'purple-1', 'purple-2', 'purple-3', 'purple-4',
  'purple-5', 'purple-6', 'navy-1', 'navy-2', 'navy-3', 'navy-4', 'navy-5', 'navy-6', 'blue-1',
  'blue-2', 'blue-3', 'blue-4', 'blue-5', 'blue-6', 'cyan-1', 'cyan-2', 'cyan-3', 'cyan-4', 'cyan-5',
  'cyan-6', 'teal-1', 'teal-2', 'teal-3', 'teal-4', 'teal-5', 'teal-6', 'tangerine-1', 'tangerine-2',
  'tangerine-3', 'tangerine-4', 'tangerine-5', 'tangerine-6', 'orange-1', 'orange-2', 'orange-3',
  'orange-4', 'orange-5', 'orange-6', 'brown-1', 'brown-2', 'brown-3', 'brown-4', 'brown-5', 'brown-6',
  'charcoal-1', 'charcoal-2', 'charcoal-3', 'charcoal-4', 'charcoal-5', 'charcoal-6', 'grey-1', 'grey-2',
  'grey-3', 'grey-4', 'grey-5', 'grey-6', 'moss-1', 'moss-2',
  'moss-3', 'moss-4', 'moss-5', 'moss-6' ];

var BOX_PATTERN_PATH = '22,0 0,22 43,22 62,0';

var CONNECTION_ARROW = {
  title: 'Connection_Arrows',
  refX: 12,
  refY: 10,
  markerWidth: 6,
  markerHeight: 6,
  fill: 'none',
  strokeWidth: 3,
  path: 'M 0 20L 10 10 L 0 0'
};

var CSS_CLASS = {
  LIST_TITLE: 'listTitle',
  LIST_BASE: 'listBase',
  LIST_PADDING: 'listPadding',
  LIST_CLOSED: 'listClose',
  NAV_BASE: 'roadmapNav',
  CHART: 'roadmapChart',
  CHART_BASE: 'roadmapChart-b',
  LINE: 'line-',
  SVG: 'svg-',
  CHART_HEADER: 'roadmapChart-h',
  CHART_HEADER_TITLE: 'roadmapChart-h-t',
  CHART_HEADER_DESC: 'roadmapChart-h-desc',
  BREADCUM: 'roadmapBreadcrumb',
  BREADCUM_ITEM: 'breadcrumb-i',
  PROGRESSBAR_BG: 'svg-blue-3',
  PROGRESSBAR_STRIPE: 'svg-blue-2',
  FEATURES: 'features-'
};

var roadmapTasks = [];
var Roadmap = null;
var DEFAULT_START_DATE = null;

var print = function(title, data) {
  console.log(title + ' ::');
  console.log(data);
};

/**
 * Utilities
 */
var Utils = function() {};

// formate date to YYYY-MM-DD
Utils.parseDate = function(dateStr) {
  var makeDouble = function(digit) {
    return ('0' + digit).slice(-2);
  };
  if (dateStr instanceof Date) {
    dateStr = dateStr.getFullYear() + '-' + makeDouble(dateStr.getMonth() + 1) + '-' + makeDouble(dateStr.getDate());
  } else {
    dateStr = dateStr.split('-');
    dateStr[1] = makeDouble(dateStr[1]);
    dateStr[2] = makeDouble(dateStr[2]);
    dateStr = dateStr.join('-');
  }
  // console.log(dateStr);
  // var date = dateStr ? new Date(dateStr) : new Date();
  // return date.getFullYear() + '-' + makeDouble(date.getMonth() + 1) + '-' + makeDouble(date.getDate());
  return dateStr;
};

Utils.addDate = function(dateStr, value) {
  if (isNaN(value)) {
    throw 'value is not Numeric';
  }
  var date = new Date(Utils.parseDate(dateStr));
  var newDate = new Date(date.getTime() + (parseInt(value) * 24 * 60 * 60 * 1000));
  return Utils.parseDate(newDate);
};

Utils.subDate = function(dateStr, value) {
  if (isNaN(value)) {
    throw 'value is not Numeric';
  }
  var date = new Date(Utils.parseDate(dateStr));
  var newDate = new Date(date.getTime() - (parseInt(value) * 24 * 60 * 60 * 1000));
  return Utils.parseDate(newDate);
};

Utils.getTask = function(taskId) {
  var targetTask = null;
  d3.map(roadmapTasks, function(task) {
    if (task.id !== taskId) {
      return;
    }
    targetTask = task;
  });
  return targetTask;
};

Utils.addSvgClass = function(targetId, className) {
  var classNames = $(targetId).attr('class');
  if (!classNames) {
    return;
  }
  var classList = classNames.split(' ');
  if (classList.indexOf(className) !== -1) {
    return;
  }
  classList.unshift(className);
  $(targetId).attr('class', classList.join(' '));
};

Utils.removeSvgClass = function(targetId, className) {
  var classNames = $(targetId).attr('class');
  if (!classNames) {
    return;
  }
  var classList = classNames.split(' ');
  if (classList.indexOf(className) === -1) {
    return;
  }
  classList.splice(classList.indexOf(className), 1);
  $(targetId).attr('class', classList.join(' '));
};

Utils.textEllipsis = function(str, length) {
  length = length || 0;
  return length < str.length ? (str.slice(0, length) + '...') : str;
};

Utils.truncateBoxText = function(box) {
  var task = Utils.getTask(box.taskId);
  if (!task) {
    return;
  }
  var text = task.name;
  var textPadding = 4;
  var boxWidth = Math.floor($(Utils.parseId(box.id)).children('.box').attr('width'));
  var statusBoxWidth = Math.floor($(Utils.parseId(box.id)).children('.statusBox').attr('width'));
  var charWidth = 7;
  var textLen = Math.floor(boxWidth / charWidth) - Math.floor(statusBoxWidth / charWidth) - textPadding;
  var truncatedText = text.slice(0, textLen);
  if (text.length > truncatedText.length) {
    truncatedText += '...';
  }
  return truncatedText;
};

// create div element
// return jQuery element
Utils.createDiv = function(id, classList, text) {
  id = id || '';
  text = text || '';
  var classNames = (typeof classList === 'object') ? classList.join(' ') : '';
  var ele = '<div id="::id::" class="::class::">::text::</div>';
  ele = ele.replace('::id::', id)
    .replace('::class::', classNames)
    .replace('::text::', text);
  return $(ele);
};

// parse name as jQuery id selector
Utils.parseId = function(idName) {
  if (!idName) {
    return;
  }
  return idName.indexOf('#') === 0 ? idName : '#' + idName;
};

// set location hash
Utils.setLocationHash = function(taskId) {
  if (!taskId) {
    return;
  }
  window.location.assign('#' + taskId.toLowerCase());
};

Utils.getLocationHash = function() {
  return window.location.hash.toUpperCase().replace('#', '');
};

Utils.resetLocationHash = function() {
  window.location.hash = '';
};

Utils.isDesktopScreen = function() {
  return $(window).width() > DESKTOP_BREAKPOINT;
};

Utils.getChildrenTasks = function(taskId) {
  var children = [];
  d3.map(roadmapTasks, function(task) {
    if (task.isExcluded()) {
      return;
    }
    if (task.parent && task.parent.id === taskId) {
      children.unshift(task);
    }
  });
  return children;
};

Utils.getMarkerArrowLevel = function(color, isLevelup) {
  var markerColor = color;
  var level = parseInt(color.slice(-1));
  level = !isLevelup ? level : level - 1;
  markerColor = markerColor.slice(0, markerColor.length - 1) + level;
  return 'url(#' + ARROW_PREFIX + markerColor + ')';
};

Utils.resetStartDate = function() {
  d3.map(roadmapTasks, function(task, i) {
    task.startDate = Utils.parseDate(DEFAULT_START_DATE);
    task.endDate = roadmapTasks[i].startDate;
    roadmapTasks[i] = task;
  });
};

Utils.getColorLevelDown = function(color) {
  if (!color) {
    throw 'Invalid color';
  }
  var level = parseInt(color.slice(-1));
  return color.slice(0, -1) + (level + 1);
};

var init = function(self) {
  if (!self) {
    self = new Roadmap({
      payload: plainData,
      interval: interval,
      target: targetId
    });
  }
  var windowWidth = 0;
  $(window).on('load', function() {
    windowWidth = $(window).width();
  });

  $(window).on('hashchange', function() {
    var hash = Utils.getLocationHash();
    self.drawChart(hash);
    self.updateNav(hash);
  });
  $(window).bind('resize', function() {
    if (windowWidth !== $(window).width()) {
      if (window.RT) {
        clearTimeout(window.RT);
      }
      window.RT = setTimeout(function() {
        self.draw();
      }, 200);
    }
  });
};

var Connection = function(taskId, sourceId) {
  this.sourceId = sourceId;
  this.targetId = taskId;
  this.id = CONNECTION_PREFIX + taskId + '_' + sourceId;
  this.start = { x: 0, y: 0 };
  this.interStart = { x: 0, y: 0 };
  this.interEnd = { x: 0, y: 0 };
  this.end = { x: 0, y: 0 };
  this.color = '';
};

Connection.prototype.setPath = function(start, interStart, interEnd, end) {
  var self = this;
  self.start = start;
  self.interStart = interStart;
  self.interEnd = interEnd;
  self.end = end;
};

Connection.prototype.setColor = function(color) {
  this.color = color;
};

var TaskFeature = function(taskId, type) {
  this.id = FEATURES_PREFIX + taskId;
  this.taskId = taskId;
  this.type = type;
};

TaskFeature.prototype.onClick = function() {
  var self = this;
  return function() {
    var taskId = self.taskId;
    var task = Utils.getTask(self.taskId);
    if (task.isExcluded()) {
      taskId = task.source;
    }
    if (Utils.getChildrenTasks(taskId).length > 0) {
      Utils.setLocationHash(taskId);
      $(window).scrollTop(0);
    }
  };
};

/**
 * Task Nav
 */
var TaskNav = function(taskId, isRoot) {
  this.taskId = taskId;
  this.id = NAV_PREFIX + taskId;
  this.isRoot = isRoot;
};

TaskNav.prototype.onClick = function() {
  var self = this;
  return function(e) {
    e.stopPropagation();
    self.mouseClick(this, true);
  };
};

TaskNav.prototype.onMouseOver = function() {
  var self = this;
  return function(e) {
    e.stopPropagation();
    self.mouseOver(this);
    var task = Utils.getTask(self.taskId);
    task.box.mouseOver();
  };
};

TaskNav.prototype.onMouseOut = function() {
  var self = this;
  return function(e) {
    e.stopPropagation();
    self.mouseOut(this);
    var task = Utils.getTask(self.taskId);
    task.box.mouseOut();
  };
};

TaskNav.prototype.mouseOut = function(target) {
  var self = this;
  if (!target) {
    target = Utils.parseId(self.id);
  }
  $(target).removeClass('highlight');
  var hash = Utils.getLocationHash();
  var activeTask = Utils.getTask(hash);
  $(Utils.parseId(activeTask.nav.id)).addClass('highlight');
};

TaskNav.prototype.mouseOver = function(target) {
  var self = this;
  if (!target) {
    target = Utils.parseId(self.id);
  }
  $(target).addClass('highlight');
};

TaskNav.prototype.mouseClick = function(target, setHash) {
  var self = this;
  if (!target) {
    target = Utils.parseId(self.id);
  }
  if (self.isRoot) {
    $(target).children().addClass(CSS_CLASS.LIST_CLOSED);
  } else {
    $(target).siblings().addClass(CSS_CLASS.LIST_CLOSED);
    $(target).children('.' + CSS_CLASS.LIST_BASE).addClass(CSS_CLASS.LIST_CLOSED);
    var parent = $(target).parent();
    while (parent && parent.hasClass('listBase')) {
      parent.removeClass(CSS_CLASS.LIST_CLOSED);
      parent.siblings().addClass(CSS_CLASS.LIST_CLOSED);
      parent = $(parent).parent();
    }
    $(target).removeClass(CSS_CLASS.LIST_CLOSED);
    $('.listBase').removeClass('highlight');
    $(target).addClass('highlight');
  }
  if (setHash) {
    Utils.setLocationHash(self.taskId);
  }
  $(window).scrollTop(0);
};

/**
 * Task Box
 */
var TaskBox = function(taskId) {
  this.taskId = taskId;
  this.id = BOX_PREFIX + taskId;
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.statusX = 0;
  this.childrenCount = 0;
};

TaskBox.prototype.setParams = function(x, y, width, statusX, childrenCount) {
  var self = this;
  self.x = x;
  self.y = y;
  self.width = width;
  self.statusX = statusX;
  self.childrenCount = childrenCount;
};

TaskBox.prototype.onClick = function() {
  var self = this;
  return function() {
    Utils.setLocationHash(self.taskId);
    $(window).scrollTop(0);
  };
};

TaskBox.prototype.onMouseOver = function() {
  var self = this;
  return function() {
    self.mouseOver();
  };
};

TaskBox.prototype.onMouseOut = function() {
  var self = this;
  return function() {
    self.mouseOut();
  };
};

TaskBox.prototype.mouseOver = function() {
  var self = this;
  var task = Utils.getTask(self.taskId);
  task.nav.mouseOver();
  Utils.addSvgClass(Utils.parseId(self.id), 'highlight');
  d3.map(task.target, function(targetId) {
    var targetTask = Utils.getTask(targetId);
    if (!targetTask) {
      return;
    }
    d3.map(targetTask.connections, function(connection) {
      if (connection.sourceId === self.taskId) {
        var connectionId = Utils.parseId(connection.id);
        Utils.addSvgClass(connectionId, 'highlight');
        $(connectionId).attr('marker-start', Utils.getMarkerArrowLevel(connection.color, true));
      }
    });
  });
  d3.map(task.connections, function(connection) {
    var sourceTask = Utils.getTask(connection.sourceId);
    if (sourceTask.isDownStream()) {
      Utils.addSvgClass(Utils.parseId(connection.id), 'highlight');
    }
  });
};

TaskBox.prototype.mouseOut = function() {
  var self = this;
  var task = Utils.getTask(self.taskId);
  task.nav.mouseOut();
  Utils.removeSvgClass(Utils.parseId(self.id), 'highlight');
  d3.map(task.target, function(targetId) {
    var targetTask = Utils.getTask(targetId);
    if (!targetTask) {
      return;
    }
    d3.map(targetTask.connections, function(connection) {
      if (connection.sourceId === self.taskId) {
        var connectionId = Utils.parseId(connection.id);
        Utils.removeSvgClass(connectionId, 'highlight');
        $(connectionId).attr('marker-start', Utils.getMarkerArrowLevel(connection.color, false));
      }
    });
  });
  d3.map(task.connections, function(connection) {
    var sourceTask = Utils.getTask(connection.sourceId);
    if (sourceTask.isDownStream()) {
      Utils.removeSvgClass(Utils.parseId(connection.id), 'highlight');
    }
  });
};

/**
 * Task
 */
var Task = function(payload, parent, isRoot) {
  this.name = payload.name;
  this.id = payload.id;
  this.desc = payload.desc;
  this.parent = parent;
  this.target = payload.target;
  this.source = payload.source || null;
  this.color = payload.color;
  this.status = payload.status;
  this.startDate = Utils.parseDate(payload.startDate);
  this.daysCompleted = payload.daysCompleted || 0;
  this.inProgress = payload.inProgress || 0;
  this.planned = payload.planned || 0;
  this.order = payload.order || 1;
  this.section = payload.section || 1;
  this.offset = payload.offset || 0;
  this.nav = new TaskNav(this.id, isRoot);
  this.box = new TaskBox(this.id);
  this.connections = [];
};

Task.prototype.isExcluded = function() {
  var self = this;
  return EXCLUDED_TASKS.indexOf(self.name) !== -1;
};

Task.prototype.isExternal = function() {
  var self = this;
  return EXCLUDED_TASKS[0] === self.name;
};

Task.prototype.isDownStream = function() {
  var self = this;
  return EXCLUDED_TASKS[1] === self.name;
};

/**
 * Roadmap
 */
Roadmap = function(payload) {
  this.plainData = plainData = payload.data;
  this.targetId = targetId = payload.target;
  this.interval = interval = payload.interval;
  this.dateFormat = d3.time.format('%Y-%m-%d');
  this.startDates = [];
  this.sectionCurrentIncomingCounts = [];
  this.activeTasks = [];
  this.downStreamCounts = [];
  this.svg = {
    width: 0,
    height: 600,
    padding: 20
  };
  this.progressBar = {
    height: 10
  };
  this.box = {
    width: 0,
    height: 22,
    strokeWidth: 2,
    strokeDasharray: 5
  };
  this.label = {
    width: 85,
    height: 15,
    padding: 8,
    borderRadius: 7
  };
};

Roadmap.prototype.getPerUnit = function() {
  var self = this;
  var task = self.activeTasks[0];
  return (self.timeScale(self.dateFormat.parse(task.startDate)) -
    self.timeScale(self.dateFormat.parse(Utils.subDate(task.startDate, 1))));
};

Roadmap.prototype.prepareTasks = function() {
  var self = this;

  var setTask = function(task) {
    if (!task.hasOwnProperty('children')) {
      return;
    }
    d3.map(task.children, function(child) {
      roadmapTasks.push(new Task(child, Utils.getTask(task.id), false));
      if (child.hasOwnProperty('children')) {
        setTask(child);
      }
    });
  };
  roadmapTasks = [];
  roadmapTasks.push(new Task(self.plainData, null, true));
  setTask(plainData);
  print('Task', roadmapTasks);
};

Roadmap.prototype.timeScale = function(val) {
  var self = this;
  return (d3.time.scale()
    .domain([ d3.min(self.activeTasks, function(d) {
        return self.dateFormat.parse(d.startDate);
      }),
      d3.max(self.activeTasks, function(d) {
        return self.dateFormat.parse(d.endDate);
      })
    ])
    .range([ 0, (self.svg.width - (self.svg.padding * 2)) ]))(val);
};

Roadmap.prototype.setNav = function() {
  var self = this;
  var prepareNavBase = function() {
    var navBase = Utils.createDiv(null, [ CSS_CLASS.NAV_BASE ]);
    var navBaseCtx = Utils.createDiv(NAV_ID, [ 'roadmapNav-b' ]);
    $(Utils.parseId(self.targetId)).append(navBase.append(navBaseCtx));
    // if (Utils.isDesktopScreen()) {
    //   navBase.css('min-height', self.svg.height);
    // }
  };

  var setNavList = function(task) {
    if (task.isExcluded() || task.id.indexOf(MVP_ID) !== -1) {
      return;
    }
    var parentNavList = !task.parent ? $(Utils.parseId(NAV_ID)) : $(Utils.parseId(task.parent.nav.id));
    var listClasses = [ task.color ];
    if (task.nav.isRoot) {
      listClasses.push(CSS_CLASS.LIST_TITLE);
    } else {
      parentNavList.addClass(CSS_CLASS.LIST_CLOSED);
      listClasses.push(CSS_CLASS.LIST_BASE);
    }
    var navList = Utils.createDiv(task.nav.id, listClasses);
    navList.append('<span class="' + CSS_CLASS.LIST_PADDING + '">' + task.name + '</span>');
    if (Utils.getChildrenTasks(task.id).length > 1) {
      navList.on('click', (task.nav.onClick)());
    }
    navList.on('mouseover', (task.nav.onMouseOver)());
    navList.on('mouseout', (task.nav.onMouseOut)());
    parentNavList.append(navList);
  };

  prepareNavBase();
  d3.map(roadmapTasks, setNavList);
};

Roadmap.prototype.prepareChart = function() {
  var self = this;
  var container = null;
  var setChartBase = function() {
    var chart = Utils.createDiv(null, [ CSS_CLASS.CHART ]);
    var chartBase = Utils.createDiv(CHART_ID, [ CSS_CLASS.CHART_BASE ]);
    $(Utils.parseId(self.targetId)).append(chart.append(chartBase));
    NAV_WIDTH = $(window).width() * 20 / 100;
    self.svg.width = $(window).width() - NAV_WIDTH - 1;
  };

  var setSvg = function() {
    container = d3.selectAll(Utils.parseId(CHART_ID))
      .append('svg')
      .attr('id', SVG_ID)
      .attr('width', self.svg.width)
      .attr('height', self.svg.height)
      .attr('class', 'roadmapSvg')
      .append('g')
      .attr('id', SVG_BOX_GRP_ID)
      .attr('transform', 'translate(' + self.svg.padding + ', ' + self.svg.padding + ')');
  };

  var defineTaskStatus = function() {
    var status = d3.select(Utils.parseId(SVG_ID));

    // status complete
    status.append('svg:pattern')
      .attr('id', TASK_STATUS.COMPLETE.id)
      .attr('patternUnits', 'objectBoundingBox')
      .attr('width', self.box.height)
      .attr('height', self.box.height)
      .append('polygon')
      .attr('fill', TASK_STATUS.COMPLETE.color)
      .attr('points', TASK_STATUS.COMPLETE.path);

    // status complete dark
    status.append('svg:pattern')
      .attr('id', TASK_STATUS.COMPLETE_DARK.id)
      .attr('patternUnits', 'objectBoundingBox')
      .attr('width', self.box.height)
      .attr('height', self.box.height)
      .append('polygon')
      .attr('fill', TASK_STATUS.COMPLETE_DARK.color)
      .attr('points', TASK_STATUS.COMPLETE_DARK.path);

    // status open
    status.append('svg:pattern')
      .attr('id', TASK_STATUS.OPEN.id)
      .attr('patternUnits', 'objectBoundingBox')
      .attr('width', self.box.height)
      .attr('height', self.box.height)
      .append('path')
      .attr('fill', TASK_STATUS.OPEN.color)
      .attr('d', TASK_STATUS.OPEN.path);

    // status open dark
    status.append('svg:pattern')
      .attr('id', TASK_STATUS.OPEN_DARK.id)
      .attr('patternUnits', 'objectBoundingBox')
      .attr('width', self.box.height)
      .attr('height', self.box.height)
      .append('path')
      .attr('fill', TASK_STATUS.OPEN_DARK.color)
      .attr('d', TASK_STATUS.OPEN_DARK.path);

    // status planned
    status.append('svg:pattern')
      .attr('id', TASK_STATUS.PLANNED.id)
      .attr('patternUnits', 'objectBoundingBox')
      .attr('width', self.box.height)
      .attr('height', self.box.height)
      .append('path')
      .attr('fill', TASK_STATUS.PLANNED.color)
      .attr('d', TASK_STATUS.PLANNED.path);

    // status planned
    status.append('svg:pattern')
      .attr('id', TASK_STATUS.PLANNED_DARK.id)
      .attr('patternUnits', 'objectBoundingBox')
      .attr('width', self.box.height)
      .attr('height', self.box.height)
      .append('path')
      .attr('fill', TASK_STATUS.PLANNED_DARK.color)
      .attr('d', TASK_STATUS.PLANNED_DARK.path);
  };

  var defineConnectionArrows = function() {
    d3.select(Utils.parseId(SVG_ID))
      .selectAll('marker')
      .data(TASK_COLORS)
      .enter()
      .append('svg:marker')
      .attr('id', function(d) {
        return ARROW_PREFIX + d;
      })
      .attr('class', function(d) {
        return CSS_CLASS.LINE + d;
      })
      .attr('viewBox', '0 0 20 20')
      .attr('refX', CONNECTION_ARROW.refX)
      .attr('refY', CONNECTION_ARROW.refY)
      .attr('markerUnits', 'strokeWidth')
      .attr('markerWidth', CONNECTION_ARROW.markerWidth)
      .attr('markerHeight', CONNECTION_ARROW.markerHeight)
      .attr('fill', CONNECTION_ARROW.fill)
      .append('svg:path')
      .attr('stroke-width', CONNECTION_ARROW.strokeWidth)
      .attr('d', CONNECTION_ARROW.path);
  };

  var setChartHeader = function() {
    var chartHeader = Utils.createDiv(null, [ CSS_CLASS.CHART_HEADER ]);
    var chartHeaderTitle = Utils.createDiv(null, [ CSS_CLASS.CHART_HEADER_TITLE ]);
    var chartHeaderTitleCtx = Utils.createDiv(TASK_TITLE_ID, []);
    var chartHeaderDesc = Utils.createDiv(null, [ CSS_CLASS.CHART_HEADER_DESC ]);
    var chartHeaderDescCtx = Utils.createDiv(TASK_DESC_ID);
    var menuicon = Utils.createDiv(MOBILE_MENU_ID, [ 'roadmapChart-h-menu' ]);
    chartHeader.append(menuicon);
    chartHeaderTitle.append(infoIconOpen);
    chartHeaderTitle.append(infoIconClose);
    chartHeader.append(chartHeaderTitle.append(chartHeaderTitleCtx));
    chartHeader.append(chartHeaderDesc.append(chartHeaderDescCtx));
    $(Utils.parseId(CHART_ID)).append(chartHeader);

    // Toggle Description
    chartHeaderTitle.on('click', function(e) {
      e.stopPropagation();
      $(this).toggleClass('active');
    });

    menuicon.on('click', function(e) {
      e.stopPropagation();
      $(Utils.parseId(NAV_ID)).parent().addClass('open');
    });

    $('.roadmapNav').on('click', function(e) {
      e.stopPropagation();
      if (e.target !== this) {
        return;
      }
      $(this).removeClass('open');
    });
  };

  var setBreadcum = function() {
    var breadcum = Utils.createDiv(BREADCUM_ID, [ CSS_CLASS.BREADCUM ]);
    $(Utils.parseId(CHART_ID)).append(breadcum);
  };

  setChartBase();
  setBreadcum();
  setChartHeader();
  setSvg();
  defineTaskStatus();
  defineConnectionArrows();
  self.isChartReady = true;
};

Roadmap.prototype.updateBreadcum = function(activeTask) {
  var breadcumList = [];
  var breadcum = $(Utils.parseId(BREADCUM_ID));
  var resetBreadcum = function() {
    breadcum.html('');
  };

  var getParentTask = function(task) {
    var parentTask = null;
    d3.map(roadmapTasks, function(item) {
      if (!item) {
        return;
      }
      if (item.id === task.id) {
        parentTask = item.parent;
      }
    });
    return parentTask;
  };

  var updateBreadcumList = function(task) {
    breadcumList.push(task);
    var parentTask = getParentTask(task);
    if (parentTask) {
      updateBreadcumList(parentTask);
    }
  };

  resetBreadcum();
  updateBreadcumList(activeTask);
  breadcumList.reverse();
  var breadcumItem = null;
  d3.map(breadcumList, function(task) {
    breadcumItem = Utils.createDiv(null, [ CSS_CLASS.BREADCUM_ITEM ], task.name);
    breadcumItem.on('click', function() {
      Utils.setLocationHash(task.id);
    });
    breadcum.append(breadcumItem);
  });
};

Roadmap.prototype.updateChartHeader = function(activeTask) {
  $(Utils.parseId(TASK_TITLE_ID)).text(activeTask.name).parent().removeClass()
    .addClass(activeTask.color + ' text roadmapChart-h-t');
  $(Utils.parseId(TASK_DESC_ID)).text(activeTask.desc);
  var task = Utils.getTask(Utils.getLocationHash());
  if (!task) {
    return;
  }
  if (Utils.getChildrenTasks(task.id).length === 0) {
    $(Utils.parseId(TASK_TITLE_ID)).parent().addClass('active');
  }
};

Roadmap.prototype.updateSvgDimensions = function() {
  var self = this;
  var SVG_MIN_HEIGHT = 500;
  var ts = null;
  ts = setTimeout(function() {
    $('.roadmapNav').css('min-height', 0);
    var navHeight = $('.roadmapNav').height();
    var rectGroupHeight = $(Utils.parseId(SVG_BOX_GRP_ID))[0].getBoundingClientRect().height;
    self.svg.width = $(window).width() - NAV_WIDTH - 2;
    self.svg.height = rectGroupHeight > navHeight ? rectGroupHeight : navHeight;
    if (self.svg.height < SVG_MIN_HEIGHT) {
      self.svg.height = SVG_MIN_HEIGHT;
    }
    var svg = $(Utils.parseId(SVG_ID))[0];
    svg.setAttribute('width', self.svg.width);
    svg.setAttribute('height', self.svg.height);
    if (Utils.isDesktopScreen()) {
      $('.roadmapNav').css('min-height', self.svg.height + 70);
    }
    clearTimeout(ts);
    self.addLegend();
    if (Utils.isDesktopScreen()) {
      $('.root').css('min-height', 0);
      $('.root').css('min-height', $(document).height() - $('footer').height());
    }
  }, 200);
};

Roadmap.prototype.addLegend = function() {
  var self = this;
  var svgBase = d3.select(Utils.parseId(SVG_ID)).select('g');

  svgBase.append('pattern')
    .attr('id', 'completedLegend')
    .attr('patternUnits', 'objectBoundingBox')
    .attr('width', '30')
    .attr('height', '30')
    .append('image')
    .attr('xlink:href', './img/roadmap_legends/key_complete.svg')
    .attr('x', '0')
    .attr('y', '0')
    .attr('width', '30')
    .attr('height', '30');

  svgBase.append('pattern')
    .attr('id', 'plannedLegend')
    .attr('patternUnits', 'objectBoundingBox')
    .attr('width', '30')
    .attr('height', '30')
    .append('image')
    .attr('xlink:href', './img/roadmap_legends/key_planned.svg')
    .attr('x', '0')
    .attr('y', '0')
    .attr('width', '30')
    .attr('height', '30');

  svgBase.append('pattern')
    .attr('id', 'inProgressLegend')
    .attr('patternUnits', 'objectBoundingBox')
    .attr('width', '30')
    .attr('height', '30')
    .append('image')
    .attr('xlink:href', './img/roadmap_legends/key_in_progress.svg')
    .attr('x', '0')
    .attr('y', '0')
    .attr('width', '30')
    .attr('height', '30');

  svgBase.append('rect')
  .attr('x', 0)
  .attr('y', self.svg.height - 110)
  .attr('width', 30)
  .attr('height', 30)
  .attr('fill', 'url(#completedLegend)');

  svgBase.append('text')
  .text('Complete')
  .attr('x', 40)
  .attr('y', self.svg.height - 90)
  .attr('style', 'font-size: 13px;fill: #616161;font-weight: 600;');

  svgBase.append('rect')
  .attr('x', 0)
  .attr('y', self.svg.height - 80)
  .attr('width', 30)
  .attr('height', 30)
  .attr('fill', 'url(#inProgressLegend)');

  svgBase.append('text')
  .text('In Progress')
  .attr('x', 40)
  .attr('y', self.svg.height - 60)
  .attr('style', 'font-size: 13px;fill: #616161;font-weight: 600;');

  svgBase.append('rect')
  .attr('x', 0)
  .attr('y', self.svg.height - 50)
  .attr('width', 30)
  .attr('height', 30)
  .attr('fill', 'url(#plannedLegend)');

  svgBase.append('text')
  .text('Planned')
  .attr('x', 40)
  .attr('y', self.svg.height - 30)
  .attr('style', 'font-size: 13px;fill: #616161;font-weight: 600;');
};

Roadmap.prototype.defineBoxPattern = function(data) {
  var self = this;
  var patternId = BOX_PATTERN_PREFIX + data.name;
  if ($(Utils.parseId(patternId)).is('pattern')) {
    return;
  }
  var boxPattern = d3.select(Utils.parseId(SVG_ID))
    .select('g')
    .append('pattern')
    .attr('id', patternId)
    .attr('x', data.x)
    .attr('y', data.y)
    .attr('width', 80)
    .attr('height', self.box.height)
    .attr('patternUnits', 'userSpaceOnUse')
    .append('g');

  boxPattern.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('class', data.className)
    .attr('width', data.width)
    .attr('height', data.height)
    .attr('opacity', 0.8);

  boxPattern.append('polygon')
    .attr('class', data.className)
    .attr('points', BOX_PATTERN_PATH);
};

Roadmap.prototype.drawProgressBar = function(activeTask) {
  var self = this;
  // var line = d3.svg.line()
  // .x(function(d) {
  //   return d.x;
  // })
  // .y(function(d) {
  //   return d.y;
  // })
  // .interpolate('linear');

  if (!activeTask.daysCompleted) {
    return;
  }

  self.defineBoxPattern({
    name: activeTask.id,
    x: 0,
    y: -self.svg.padding,
    width: self.svg.width - (self.svg.padding * 2),
    height: self.progressBar.height,
    className: CSS_CLASS.SVG + activeTask.color
  });

  var progressBar = d3.select(Utils.parseId(SVG_BOX_GRP_ID))
    .append('g').attr('class', 'progressBar');
  var baseWidth =  self.svg.width - (self.svg.padding * 2);

  var completed = baseWidth * activeTask.daysCompleted / 100;
  var inProgress = (baseWidth * activeTask.inProgress / 100);
  var planned = (baseWidth * activeTask.planned / 100);

  // progress completed
  progressBar.append('rect')
    .attr('class', CSS_CLASS.SVG + activeTask.color)
    .attr('x', completed + inProgress)
    .attr('y', -self.svg.padding)
    .attr('width', planned)
    .attr('height', self.progressBar.height)
    .attr('opacity', 0.8);

  // progress completed
  progressBar.append('rect')
    .attr('class', 'chart-progress-b')
    .attr('x', completed)
    .attr('y', -self.svg.padding)
    .attr('width', inProgress)
    .attr('height', self.progressBar.height)
    .attr('style', 'fill: url(' + Utils.parseId(BOX_PATTERN_PREFIX + activeTask.id) + ')');

  // progress completed
  progressBar.append('rect')
    .attr('class', CSS_CLASS.SVG + activeTask.color)
    .attr('x', 0)
    .attr('y', -self.svg.padding)
    .attr('width', completed)
    .attr('height', self.progressBar.height);

  // progress status planned
  // progressBar.append('rect')
  //   .attr('class', CSS_CLASS.SVG + activeTask.color)
  //   .attr('x', baseWidth - self.box.height)
  //   .attr('y', -self.svg.padding + self.progressBar.height)
  //   .attr('width', self.box.height)
  //   .attr('height', self.box.height)
  //   .style('fill', 'url(' + Utils.parseId(TASK_STATUS.PLANNED_DARK.id) + ')');

  // progress status open
  // progressBar.append('rect')
  //   .attr('class', CSS_CLASS.SVG + activeTask.color)
  //   .attr('x', (completed + inProgress) - self.box.height)
  //   .attr('y', -self.svg.padding + self.progressBar.height)
  //   .attr('width', self.box.height)
  //   .attr('height', self.box.height)
  //   .style('fill', 'url(' + Utils.parseId(TASK_STATUS.OPEN_DARK.id) + ')');
  // progress status completed

  // progressBar.append('rect')
  //   .attr('class', CSS_CLASS.SVG + activeTask.color)
  //   .attr('x', completed - self.box.height)
  //   .attr('y', -self.svg.padding + self.progressBar.height)
  //   .attr('width', self.box.height)
  //   .attr('height', self.box.height)
  //   .style('fill', 'url(' + Utils.parseId(TASK_STATUS.COMPLETE_DARK.id) + ')');

  // progressBar.append('text')
  //   .text('completed ' + activeTask.daysCompleted + '%')
  //   .attr('x', (completed - self.box.height) - 95)
  //   .attr('y', self.progressBar.height - 5)
  //   .attr('style', 'font-size:13px');
  //
  // progressBar.append('text')
  //   .text('In progress ' + activeTask.inProgress + '%')
  //   .attr('x', (completed + inProgress - self.box.height) - 95)
  //   .attr('y', self.progressBar.height - 5)
  //   .attr('style', 'font-size:13px');
  //
  // progressBar.append('text')
  //   .text('Planned ' + activeTask.planned + '%')
  //   .attr('x', (baseWidth - self.box.height) - 80)
  //   .attr('y', self.progressBar.height - 5)
  //   .attr('style', 'font-size:13px');

  // var pathEnd = (-self.svg.padding + self.progressBar.height + 22);
  // progressBar.append('path')
  //   .datum([{x: baseWidth, y: -self.svg.padding}, {x:baseWidth, y: pathEnd}])
  //   .attr('d', line)
  //   .attr('stroke-width', 1)
  //   .attr('stroke', '#282828');
  //
  // progressBar.append('path')
  //   .datum([{x: completed + inProgress, y: -self.svg.padding}, {x:completed + inProgress, y: pathEnd}])
  //   .attr('d', line)
  //   .attr('stroke-width', 1)
  //   .attr('stroke', '#282828');
  //
  // progressBar.append('path')
  //   .datum([{x: completed, y: -self.svg.padding}, {x:completed, y: pathEnd}])
  //   .attr('d', line)
  //   .attr('stroke-width', 1)
  //   .attr('stroke', '#282828');
};

Roadmap.prototype.drawBoxes = function() {
  var self = this;
  var line = d3.svg.line()
  .x(function(d) {
    return d.x;
  })
  .y(function(d) {
    return d.y;
  })
  .interpolate('linear');

  var box = d3.select(Utils.parseId(SVG_ID))
  .select('g')
  .selectAll('rect')
  .data(self.activeTasks)
  .enter();

  box.append('defs').each(function(d) {
    if (d.isExcluded()) {
      return;
    }
    if (!d.status) {
      self.defineBoxPattern({
        name: d.id,
        x: d.box.x,
        y: d.box.y,
        width: d.box.width,
        height: self.box.height,
        className: CSS_CLASS.SVG + d.color
      });
    }
    $(this).remove();
  });

  var boxBase = box.append('g')
  .attr('class', function(d) {
    if (d.id.indexOf(MVP_ID) !== -1) {
      return 'boxBase mvp';
    }
    return 'boxBase ' + ('svg-' + d.color);
  })
  .attr('id', function(d) {
    return d.box.id;
  });

  boxBase.each(function(d) {
    var boxGrp = d3.select(this);
    if (d.id.indexOf(MVP_ID) !== -1) {
      var boxExtend = 5;
      boxGrp.append('path')
      .datum([ { x: d.box.x, y: d.box.y + (self.box.height / 2) },
        { x: d.box.x + boxExtend + (self.box.height / 2), y: d.box.y - boxExtend },
        { x: d.box.x + self.box.height + (boxExtend * 2), y: d.box.y + (self.box.height / 2) },
        { x: d.box.x + boxExtend + (self.box.height / 2), y: d.box.y + self.box.height + boxExtend },
        { x: d.box.x, y: d.box.y + (self.box.height / 2) } ])
      .attr('d', line)
      .attr('class', 'mvpbox');
      return;
    }
    boxGrp.on('mouseover', (d.box.onMouseOver)());
    if (d.box.childrenCount > 1) {
      boxGrp.on('click', (d.box.onClick)());
    }
    boxGrp.on('mouseout', (d.box.onMouseOut)());

    if (d.box.childrenCount <= 1) {
      return;
    }
    var childWidth = ((d.box.width - (4 * (d.box.childrenCount + 1))) / d.box.childrenCount) ;
    var lastPos = { x: 0, y: 0 };
    var start = { x: 0, y: 0 };
    var end = { x: 0, y: 0 };
    for (var i = 0; i < d.box.childrenCount; i++) {
      start.x = (i === 0 ? d.box.x : lastPos.x) + 4;
      start.y = d.box.y + self.box.height + self.box.strokeWidth + 3;
      end.x = start.x + childWidth;
      end.y = start.y;
      lastPos = end;
      boxGrp.append('path')
      .datum([ start, end ])
      .attr('d', line)
      .attr('stroke-width', 5)
      .attr('class', CSS_CLASS.LINE + Utils.getColorLevelDown(d.color));
    }
  });

  boxBase.append('rect')
  .attr('x', function(d) {
    return d.box.x;
  })
  .attr('y', function(d) {
    return d.box.y;
  })
  .attr('width', function(d) {
    return d.box.width;
  })
  .attr('height', self.box.height)
  .attr('class', 'box')
  .attr('style', function(d) {
    if (!d.status) {
      return 'fill: url(' + Utils.parseId(BOX_PATTERN_PREFIX + d.id) + ')';
    }
  })
  .attr('stroke', 'none')
  .attr('stroke-dasharray', function(d) {
    if (d.status === 2) {
      return self.box.strokeDasharray;
    }
    return 'none';
  })
  .attr('opacity', function(d) {
    if (d.status === 2) {
      return 0.8;
    }
    if (d.id.indexOf(MVP_ID) !== -1) {
      return 0;
    }
    return 1;
  });

  // status
  boxBase.append('rect')
    .attr('x', function(d) {
      if (d.id.indexOf(MVP_ID) !== -1) {
        return d.box.x + (self.box.height * 6) + 16;
      }
      return d.box.statusX;
    })
    .attr('y', function(d) {
      return (self.activeTasks.length !== 1) ? d.box.y : 0;
    })
    .attr('width', self.box.height)
    .attr('height', self.box.height)
    .attr('class', 'statusBox')
    .style('fill', function(d) {
      if (d.id.indexOf(MVP_ID) !== -1) {
        return 'url(' + Utils.parseId(TASK_STATUS.OPEN_DARK.id) + ')';
      }
      if (d.status === 0) {
        return 'url(' + Utils.parseId(TASK_STATUS.OPEN.id) + ')';
      }
      if (d.status === 1) {
        return 'url(' + Utils.parseId(TASK_STATUS.COMPLETE.id) + ')';
      }
      if (d.status === 2) {
        return 'url(' + Utils.parseId(TASK_STATUS.PLANNED.id) + ')';
      }
    })
    .attr('opacity', function(d) {
      if (d.id.indexOf(MVP_ID) !== -1) {
        return 0;
      }
      return 1;
    });

  // text
  boxBase.append('text')
  .text(function(d) {
    if (d.id.indexOf(MVP_ID) !== -1) {
      return d.name;
    }
    return Utils.truncateBoxText(d.box);
  })
  .attr('x', function(d) {
    if (d.id.indexOf(MVP_ID) !== -1) {
      return d.box.x + self.box.height + 16;
    }
    return ((self.box.height / 2) + d.box.x);
  })
  .attr('y', function(d) {
    return d.box.y + (self.box.height / 1.3);
  })
  .attr('class', 'taskText')
  .style('fill', function(d) {
    if (d.id.indexOf(MVP_ID) !== -1) {
      return '#000000';
    }
    return '';
  });
};

Roadmap.prototype.prepareBoxes = function(activeTask) {
  var self = this;
  var setDownStreamCount = function() {
    d3.map(self.activeTasks, function(task) {
      if (task.isDownStream()) {
        var targetTask = Utils.getTask(task.target[0]);
        if (!self.downStreamCounts[targetTask.section]) {
          self.downStreamCounts[targetTask.section] = 1;
        } else {
          self.downStreamCounts[targetTask.section] += 1;
        }
      }
    });
  };

  var getIncomingTasks = function(targetTask) {
    var incomingTasks = [];
    d3.map(roadmapTasks, function(task) {
      if (task.target.indexOf(targetTask.id) !== -1) {
        incomingTasks.push(task);
      }
    });
    return incomingTasks;
  };

  var getIncomingNodesForSection = function(section) {
    var incomingCount = 0;
    var incomingTasks = [];
    d3.map(self.activeTasks, function(task) {
      if (task.section === section) {
        incomingTasks = getIncomingTasks(task);
        task.incomingTasks = incomingTasks;
        incomingCount += incomingTasks.length;
      }
    });
    return incomingCount;
  };

  var setStartDates = function() {
    var startDate = null;
    d3.map(roadmapTasks, function(task) {
      if (self.startDates[task.section - 1]) {
        return;
      }
      if (task.section === 1) {
        startDate = task.startDate;
      } else {
        startDate = Utils.addDate(self.startDates[task.section - 2], self.interval);
      }
      var downStreamCount = self.downStreamCounts[task.section - 1] ? self.downStreamCounts[task.section - 1] : 0;
      var incomingCount = getIncomingNodesForSection(task.section);
      self.startDates[task.section - 1] = Utils.addDate(startDate,
        (incomingCount + task.target.length + downStreamCount));
    });
  };

  var setActiveTasks = function() {
    var activeTasks = [];
    d3.map(roadmapTasks, function(task) {
      if (!task.parent) {
        return;
      }
      if (task.parent.id === activeTask.id) {
        activeTasks.push(task);
      }
    });
    if (activeTasks.length === 0) {
      return self.activeTasks.push(activeTask);
    }
    self.activeTasks = activeTasks;
    // print('Active tasks', activeTasks);
  };

  var setBoxParams = function() {
    var progressBarTaskSpacing = 18;
    d3.map(roadmapTasks, function(task) {
      var scaledStart = self.timeScale(self.dateFormat.parse(task.startDate));
      var scaledEnd =  self.timeScale(self.dateFormat.parse(task.endDate));
      var boxYPos = ((task.order - 1) * self.box.height * 2) + progressBarTaskSpacing;
      if (self.activeTasks.length === 1) {
        boxYPos = progressBarTaskSpacing;
      }
      task.box.setParams(scaledStart,
        boxYPos,
        (scaledEnd - scaledStart),
        (scaledEnd - self.box.height),
        Utils.getChildrenTasks(task.id).length);
    });
  };

  setActiveTasks(activeTask);

  setDownStreamCount();

  setStartDates();

  d3.map(roadmapTasks, function(task) {
    task.startDate = self.startDates[task.section - 1];
    task.endDate = Utils.addDate(task.startDate, self.interval);
  });

  setBoxParams();
  self.drawBoxes();
};

Roadmap.prototype.drawLabel = function(labelData) {
  var self = this;
  var labelParent = d3.select(Utils.parseId(SVG_BOX_GRP_ID));

  var label = labelParent.append('g').attr('class', 'connection-label');

  label.append('rect')
    .attr('rx', self.label.borderRadius)
    .attr('ry', self.label.borderRadius)
    .attr('x', labelData.x)
    .attr('y', labelData.y)
    .attr('width', self.label.width)
    .attr('height', self.label.height)
    .attr('stroke-width', function() {
      return labelData.stroke ? self.box.strokeWidth : 0;
    })
    .attr('style', 'font-size: 12px')
    .attr('class', function() {
      var classNames = CSS_CLASS.SVG + labelData.className;
      if (labelData.stroke) {
        classNames += ' ' + (CSS_CLASS.LINE + labelData.stroke);
      }
      return classNames;
    });

  label.append('text')
    .text(Utils.textEllipsis(labelData.desc, 7))
    .attr('x', labelData.x + (self.label.padding / 1.3))
    .attr('y', labelData.y + (self.label.height / 1.3))
    .attr('class', 'labelText');

  label.on('click', function() {
    Utils.setLocationHash(labelData.source);
  });
};

Roadmap.prototype.drawConnections = function() {
  var self = this;

  var line = d3.svg.line()
  .x(function(d) {
    return d.x;
  })
  .y(function(d) {
    return d.y;
  })
  .interpolate('linear');

  var drawConnection = function(connection) {
    var path = [ connection.start, connection.interStart, connection.interEnd, connection.end ];
    d3.select(Utils.parseId(SVG_ID))
    .select('g')
    .datum(path)
    .append('path')
    .attr('id', connection.id)
    .attr('class', CSS_CLASS.LINE + connection.color)
    .attr('d', line)
    .attr('fill', 'none')
    .attr('stroke-width', 2)
    .attr('marker-start', function() {
      var task = Utils.getTask(connection.sourceId);
      if (task.isDownStream()) {
        return null;
      }
      var marker = connection.color ? 'url(#' + ARROW_PREFIX + connection.color + ')' : 'url(#' + ARROW_PREFIX + ')';
      return marker;
    });
  };

  d3.map(self.activeTasks, function(task) {
    if (task.connections.length === 0) {
      return;
    }
    d3.map(task.connections, function(connection) {
      if ($(Utils.parseId(connection.id)).is('path')) {
        return;
      }
      drawConnection(connection);
    });
  });
};

Roadmap.prototype.prepareConnections = function() {
  var self = this;
  if (self.activeTasks.length === 1) {
    return;
  }
  var splitTask = function(targetTask) {
    var upperTasks = [];
    var lowerTasks = [];
    if (!targetTask) {
      return;
    }
    var incomings = targetTask.incomingTasks;
    d3.map(incomings, function(incoming) {
      if (incoming.order > targetTask.order) {
        lowerTasks.unshift(incoming);
      } else {
        upperTasks.unshift(incoming);
      }
    });
    lowerTasks.sort(function(a, b) {
      return a.order - b.order;
    });
    upperTasks.sort(function(a, b) {
      return a.order - b.order;
    });
    return { lowerTasks: lowerTasks, upperTasks: upperTasks };
  };

  var incSecCount = function(task) {
    var incomingCountIndex = task.section - 1;
    if (isNaN(self.sectionCurrentIncomingCounts[incomingCountIndex])) {
      self.sectionCurrentIncomingCounts[incomingCountIndex] = 1;
    } else {
      self.sectionCurrentIncomingCounts[incomingCountIndex] += 1;
    }
  };
  d3.map(self.activeTasks, function(task) {
    var incomingCountIndex = task.section - 1;
    var splitTasks = splitTask(task);
    var createConnection = function(targetId, start, interStart, interEnd, end, color) {
      var connection = new Connection(task.id, targetId);
      connection.setPath(start, interStart, interEnd, end);
      connection.setColor(color);
      task.connections.push(connection);
    };
    // draw upper tasks
    d3.map(splitTasks.upperTasks, function(upperTask, index) {
      incSecCount(task);
      var start = { x: 0, y: 0 };
      var end = { x: 0, y: 0 };
      var interStart = { x: 0, y: 0 };
      var interEnd = { x: 0, y: 0 };

      if (task.connections.length === 0 || (index === 0)) {
        start.x = task.box.x;
        start.y = task.box.y + (self.box.height / 2);
      } else {
        start.x = task.connections[index - 1].interStart.x;
        start.y = task.connections[index - 1].interStart.y - (self.box.height / 2);
      }
      if (upperTask.isExternal() && index !== 0) {
        start.y = start.y - (self.label.height / 2);
      }
      end.x = upperTask.box.x + upperTask.box.width;
      end.y = upperTask.box.y + (self.box.height / 2);

      if (index > 0) {
        interStart.x = start.x - self.getPerUnit();
      } else {
        interStart.x = start.x - (self.sectionCurrentIncomingCounts[incomingCountIndex] * self.getPerUnit());
      }
      interStart.y = start.y;

      interEnd.x = interStart.x;
      interEnd.y = end.y;
      if (upperTask.isExternal()) {
        interEnd = interStart;
        end.x = interEnd.x;
        end.y = -self.svg.padding + self.progressBar.height;
        // var sourceTask = Utils.getTask(upperTask.source);
        // self.drawLabel({
        //   x: interStart.x - (self.label.width + 5),
        //   y: interStart.y - (self.label.height / 2),
        //   className: upperTask.color,
        //   desc: upperTask.desc,
        //   source: sourceTask.id
        // });
      }
      createConnection(upperTask.id, start, interStart, interEnd, end, upperTask.color);
    });
    // draw lower tasks
    d3.map(splitTasks.lowerTasks, function(lowerTask, index) {
      var start = { x: 0, y: 0 };
      var end = { x: 0, y: 0 };
      var interStart = { x: 0, y: 0 };
      var interEnd = { x: 0, y: 0 };
      index += splitTasks.upperTasks.length;

      if (task.connections.length === 0 || index === splitTasks.upperTasks.length) {
        start.x = task.box.x - (self.sectionCurrentIncomingCounts[incomingCountIndex] * self.getPerUnit());
        start.y = task.box.y;
      } else {
        incSecCount(task);
        start.x = task.connections[index - 1].interStart.x;
        start.y = task.connections[index - 1].interStart.y +
          ((index - splitTasks.upperTasks.length) * (self.box.height));
      }

      end.x = lowerTask.box.x + lowerTask.box.width;
      end.y = lowerTask.box.y + (self.box.height / 2);

      if (index > 0) {
        interStart.x = start.x - self.getPerUnit();
      } else {
        interStart.x = start.x - (self.sectionCurrentIncomingCounts[incomingCountIndex] * self.getPerUnit());
      }
      interStart.y = start.y;

      interEnd.x = interStart.x;
      interEnd.y = end.y;
      if (lowerTask.isDownStream()) {
        start.x = task.box.x + task.box.width;
        start.y = task.box.y + (self.box.height / 2);
        var baseWidth = (self.svg.width - (self.svg.padding * 2));
        interStart.x = start.x + (self.sectionCurrentIncomingCounts[incomingCountIndex] || 1) * (self.getPerUnit() / 2);
        if (interStart.x > baseWidth) {
          interStart.x =  start.x + 8;
        }
        interStart.y = start.y;
        interEnd = interStart;
        end.x = interEnd.x;
        end.y = self.svg.height - $(Utils.parseId(BREADCUM_ID)).height() -
          $('.' + CSS_CLASS.CHART_HEADER).height() - (self.svg.padding * 2);
        var sourceTask = Utils.getTask(lowerTask.source);
        var labelColor = sourceTask.color || lowerTask.color;
        var labelData = {
          x: end.x + 8,
          y: end.y - (self.box.height * self.sectionCurrentIncomingCounts[incomingCountIndex]),
          className: labelColor,
          desc: lowerTask.desc,
          source: sourceTask.id,
          stroke: lowerTask.color
        };
        // if end downstream
        if (interStart.x > baseWidth) {
          labelData.x -= self.label.width + 16;
        }
        // self.drawLabel(labelData);
      }
      createConnection(lowerTask.id, start, interStart, interEnd, end, lowerTask.color);
    });
  });
  self.drawConnections();

  // move labels to front
  var labels = $('.connection-label');
  labels.appendTo(labels.parent());
};

Roadmap.prototype.resetChart = function() {
  var self = this;
  $('.' + CSS_CLASS.CHART).remove();
  self.startDates = [];
  self.sectionCurrentIncomingCounts = [];
  self.activeTasks = [];
  self.downStreamCounts = [];
};

Roadmap.prototype.drawChart = function(taskId) {
  var self = this;
  var locationHash = Utils.getLocationHash();
  if (locationHash) {
    taskId = locationHash;
  }
  taskId = taskId || roadmapTasks[0].id;
  var task = Utils.getTask(taskId);
  self.resetChart();
  self.prepareChart();
  self.updateBreadcum(task);
  self.updateChartHeader(task);
  if (!Utils.isDesktopScreen()) {
    return self.drawMobileChart(task);
  }
  self.prepareBoxes(task);
  self.prepareConnections(task);
  self.drawProgressBar(task);
  self.updateSvgDimensions();
};

Roadmap.prototype.updateNav = function(taskId) {
  taskId = taskId || roadmapTasks[0].id;
  var task = Utils.getTask(taskId);
  task.nav.mouseClick();
  $('.roadmapNav').removeClass('open');
};

Roadmap.prototype.addFeatures = function(activeTask) {
  var features = {
    sub: [],
    reliedOn: [],
    relyThis: []
  };

  var mobileChartBase = $(Utils.parseId(MOBILE_CHART_ID));

  var createBase = function(listId) {
    if (!$(Utils.parseId(listId)).is(Utils.parseId(listId))) {
      mobileChartBase.append(Utils.createDiv(listId, [ 'features-list' ]));
    }
  };

  var addTitle = function(title, listId) {
    if (!$(Utils.parseId(listId)).is(Utils.parseId(listId))) {
      return;
    }
    $(Utils.parseId(listId)).append('<h3 class="features-list-h">' + title + '</h3>');
  };

  var addList = function(title, list, listId) {
    createBase(listId);
    addTitle(title, listId);
    var listBase = $('#' + listId);
    d3.map(list, function(item) {
      var task = Utils.getTask(item.taskId);
      var name = task.name;
      var color = task.color;
      var sourceTask = null;
      if (item.type !== TASK_FEATURE_TYPE.SUB_FEATURES) {
        sourceTask = Utils.getTask(task.source);
        name = sourceTask && sourceTask.name ? sourceTask.name : task.source.replace(/_/g, ' ');
      }
      if (item.type === TASK_FEATURE_TYPE.RELY_THIS_FEATURES) {
        sourceTask = Utils.getTask(task.source);
        color = sourceTask ? sourceTask.color : task.color;
      }
      var listEle = Utils.createDiv(item.id,
        [ 'features-list-i', CSS_CLASS.FEATURES + color ]);
      listEle.text(name);
      listEle.on('click', (item.onClick)());
      listBase.append(listEle);
    });
  };

  d3.map(roadmapTasks, function(task) {
    if (!task.parent || task.id.indexOf(MVP_ID) !== -1) {
      return;
    }
    if ((task.parent.id === activeTask.id) && task.isExternal()) {
      return features.reliedOn.push(new TaskFeature(task.id, TASK_FEATURE_TYPE.RELIED_ON_FEATURES));
    }
    if ((task.parent.id === activeTask.id) && task.isDownStream()) {
      return features.relyThis.push(new TaskFeature(task.id, TASK_FEATURE_TYPE.RELY_THIS_FEATURES));
    }
    if (task.parent.id === activeTask.id) {
      return features.sub.push(new TaskFeature(task.id, TASK_FEATURE_TYPE.SUB_FEATURES));
    }
  });
  if (features.sub.length > 0) {
    addList('Sub features:', features.sub, SUB_FEATURES_ID);
  }
  if (features.reliedOn.length > 0) {
    addList('Features relied on:', features.reliedOn, RELIED_ON_FEATURES_ID);
  }
  if (features.relyThis.length > 0) {
    addList('Features relying on this:', features.relyThis, RELY_THIS_FEATURES_ID);
  }
};

Roadmap.prototype.setMobileView = function() {
  var mobileChart = Utils.createDiv(MOBILE_CHART_ID, [ 'roadmapChartMobile-b' ]);
  $(Utils.parseId(CHART_ID)).append(mobileChart);
};

Roadmap.prototype.resetMobileView = function() {
  $(Utils.parseId(MOBILE_CHART_ID)).remove();
};

Roadmap.prototype.drawMobileChart = function(task) {
  var self = this;
  self.resetMobileView();
  self.setMobileView();
  self.addFeatures(task);
};

Roadmap.prototype.draw = function() {
  var self = this;
  init(self);
  $(Utils.parseId(self.targetId)).empty();
  self.prepareTasks();
  self.setNav();
  self.drawChart();
  self.updateNav(Utils.getLocationHash());
};

$(function() {
  $.get('data/roadmapData.json', function(data) {
    new Roadmap({
      data: data,
      target: '#Roadmap',
      interval: 10
    }).draw();
  });
});
