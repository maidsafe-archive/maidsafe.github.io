/*global window:false */
var $ = window.$;
var jQuery = window.jQuery;
var d3 = window.d3;
var document = window.document;

var createDivElement = function(id, classes, text) {
  id = id || '';
  classes = typeof classes === 'object' && classes.length > 0 ? classes.join(' ') : '';
  var ele = $('<div id="::ID::" class="::CLASS::"></div>'.replace('::ID::', id).replace('::CLASS::', classes));
  if (text) {
    ele.html(text);
  }
  return ele;
};

var addDate = function(dateStr, num) {
  if (isNaN(num)) {
    throw 'num is not Numeric';
  }
  var date = new Date(dateStr);
  var newDate = new Date(date.getTime() + (parseInt(num) * 24 * 60 * 60 * 1000));
  return newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + (newDate.getDate());
};

var parseDate = function(dateStr) {
  var makeDoubleDigit = function(num) {
    if (num.length === 1) {
      num = '0' + num;
    }
    return num;
  };

  if (!dateStr) {
    var date = new Date();
    dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }
  dateStr = dateStr.split('-');
  dateStr[1] = makeDoubleDigit(dateStr[1]);
  dateStr[2] = makeDoubleDigit(dateStr[2]);
  return dateStr.join('-');
};

var parseNodeName = function(name) {
  name = name.replace(/_/g, ' ').toLowerCase();
  return name[0].toUpperCase() + name.slice(1);
};

var textEllipsis = function(str, length) {
  length = length || 0;
  return length < str.length ? (str.slice(0, length) + '...') : str;
};

var toggleSvgClass = function(self, className, toggle) {
  if (!self || !className) {
    return;
  }
  var classList = self.attr('class');
  if (!classList) {
    return;
  }
  classList = classList.split(' ');
  var index = classList.indexOf(className);
  if (!toggle) {
    if (index !== -1) {
      classList.splice(index, 1);
    }
  } else {
    if (index === -1) {
      classList.push(className);
    }
  }
  classList = classList.join(' ');
  self.attr('class', classList);
};

var isBoxDown = function(target, node) {
  node.startDate = node.startDate || new Date(1 - 1 - 1947);
  return ((new Date(target.startDate)).getTime() > (new Date(node.startDate)).getTime()) &&
    (target.section < node.section);
};

var isDesktopScreen = function() {
  return $(window).width() > 1134;
};

var changeLocation = function(taskName) {
  window.location.assign('#' + taskName.toLowerCase());
};

var resetLocation = function() {
  window.location.hash = '';
};

resetLocation();

// roadmap chart
var Roadmap = function(payload) {
  this.payload = payload;
  this.isChartReady = false;
  this.isMobileChartReady = false;
  this.excludeNodes = [ 'EXTERNAL', 'DOWN_STREAM' ];
  this.excludeTarget = 'END';
  this.IDs = {
    'NAV': 'RoadmapNav',
    'CHART': 'RoadmapChart',
    'CHART_BASE': 'RoadmapChartBase',
    'CHART_SVG': 'RoadmapChartSvg',
    'CHART_SVG_GRP': 'RoadmapChartSvgGroup',
    'LABEL_GRP': 'LabelGroup',
    'BREADCUM': 'RoadmapBreadcum',
    'PROGRESS': 'RoadmapProgress',
    'TITLE': 'RoadmapTitle',
    'DESC': 'RoadmapDesc',
    'MOBILE_BASE': 'RoadmapChartMobileView',
    'MOBILE_MENU': 'RoadmapChartMobileMenu',
    'SUB_FEATURES': 'RoadmapChartSubFeatures',
    'RELIED_ON_FEATURES': 'RoadmapChartReliedOnFeatures',
    'RELY_THIS_FEATURES': 'RoadmapChartRelyThisFeatures'
  };
  this.nodes = [];
  this.nodeColors = [ 'blue-1', 'blue-2', 'blue-3', 'orange-1', 'orange-2', 'orange-3',
    'coral-1', 'coral-2', 'coral-3', 'pink-1', 'pink-2', 'pink-3',
    'green-1', 'green-2', 'green-3', 'indigo-1', 'indigo-2', 'indigo-3',
    'cyan-1', 'cyan-2', 'cyan-3', 'turquoise-1', 'turquoise-2', 'turquoise-3',
    'grey-1', 'grey-2', 'grey-3', 'purple-1', 'purple-2', 'purple-3', ''
  ];
  this.breadcumList = [];
  this.perUnit = 22;
  this.progress = {
    height: 10
  };
  this.taskPrefix = {
    'ID': '_TASK_',
    'CLASS': 'svg-',
    'LINE': 'line-',
    'ARROW': 'ARROW_',
    'PATH': 'PATH_',
    'STATUS_BOX': 'STATUS_',
    'BOX_TEXT': 'BOX_TEXT_',
    'FEATURE_ITEM': 'features-',
    'FEATURE_ID': 'FEATURE_'
  };
  this.svg = {
    width: 0,
    height: 600,
    padding: 15
  };
  this.box = {
    width: 10,
    height: 22,
    strokeWidth: 2
  };
  this.label = {
    width: 65,
    height: 12,
    padding: 8,
    borderRadius: 3
  };
  this.boxPattern = {
    path: '22,0 0,22 43,22 62,0'
  };
  this.taskList = [];
  this.dateFormat = null;
};

Roadmap.prototype.getNode = function(nodeName) {
  var targetNode = null;
  this.nodes.forEach(function(node) {
    if (node.name === nodeName) {
      targetNode = node;
    }
  });
  return targetNode;
};

Roadmap.prototype.getStartDate = function(node) {
  var self = this;
  var getSourceNodeStartDate = function(nodeName) {
    var startDate = null;
    self.nodes.forEach(function(node) {
      if ((node.target === nodeName)) {
        startDate = node.startDate;
      }
    });
    return startDate;
  };

  var getPreviousNode = function(targetNode) {
    var prevNode = null;
    self.nodes.forEach(function(node) {
      if ((node.order < targetNode.order) && (node.section < targetNode.section) &&
        (node.parent === targetNode.parent)) {
        prevNode = node;
      }
    });
    return prevNode;
  };

  if (node.order === 1) {
    var parentNode = self.getNode(node.parent);
    if (!parentNode) {
      return;
    }
    return parentNode.startDate;
  }
  var prevNode = getPreviousNode(node);
  var downStreamNodes = [];
  if (prevNode) {
    downStreamNodes = self.getDownStreamsNodeForTask(prevNode.name);
  }
  var incomings = self.getIncomings(node.name);
  var sourceStartDate = getSourceNodeStartDate(node.name, node.section);
  var gap = self.payload.interval + incomings.length + downStreamNodes.length + 1;
  if (!sourceStartDate) {
    sourceStartDate = self.payload.data.startDate;
    gap *= node.order > 1 ? (node.order - 1) : node.order;
  }
  console.log(node.name, addDate(sourceStartDate, gap));
  return addDate(sourceStartDate, gap);
};

Roadmap.prototype.getDownStreamsNodeForTask = function(taskName) {
  var self = this;
  var downStreamNodes = [];
  self.nodes.forEach(function(node) {
    if ((node.name === self.excludeNodes[1]) && (node.source === taskName)) {
      downStreamNodes.push(node);
    }
  });
  return downStreamNodes;
};
Roadmap.prototype.prepareStartDate = function() {
  var self = this;
  self.nodes.forEach(function(node, i) {
    self.nodes[i].startDate = self.getStartDate(node);
    self.nodes[i].endDate = addDate(node.startDate, self.payload.interval);
  });
};

Roadmap.prototype.timeScale = function(val) {
  var self = this;
  return (d3.time.scale()
    .domain([ d3.min(self.taskList, function(d) {
        return self.dateFormat.parse(d.startDate);
      }),
      d3.max(self.taskList, function(d) {
        return self.dateFormat.parse(d.endDate);
      })
    ])
    .range([ 0, self.svg.width - 150 ]))(val);
};

// prepare data
Roadmap.prototype.prepareNodes = function() {
  var self = this;
  var prepareNode = function(node, parent) {
    var nodeInfo = {
      name: node.name,
      desc: node.desc || '',
      color: node.color || '',
      parent: parent || '',
      target: node.target || '',
      daysCompleted: node.daysCompleted || 0,
      startDate: parseDate(node.startDate),
      order: node.order || null,
      section: node.section || null,
      status: node.status || null
    };

    if (node.name === self.excludeNodes[0]) {
      nodeInfo.id = node.id;
    }
    if (node.name === self.excludeNodes[1]) {
      nodeInfo.source = node.source;
    }
    return nodeInfo;
  };

  var addChild = function(parent) {
    if (parent.hasOwnProperty('children')) {
      parent.children.forEach(function(child) {
        self.nodes.push(prepareNode(child, parent.name));
        if (child.hasOwnProperty('children')) {
          addChild(child);
        }
      });
    }
  };

  this.nodes.push(prepareNode(this.payload.data, null));
  addChild(this.payload.data);
};

Roadmap.prototype.init = function() {
  var self = this;
  self.prepareNodes();
  self.prepareStartDate();
  $(window).on('resize', function() {
    resetLocation();
    self.clearChartSection();
    self.cleanMobileView();
    self.drawChart();
  });
  $(window).on('hashchange', function() {
    var taskId = window.location.hash.slice(1).toUpperCase();
    self.drawChart(taskId);
    if (taskId) {
      self.openNavList($('#' + taskId));
    } else {
      $('#' + self.nodes[0].name).children().addClass('listClose');
    }
  });
};

Roadmap.prototype.getNodeName = function(source) {
  var self = this;
  source = source instanceof jQuery ? source : $(source);
  var nodeId = source.children('.box').attr('id');
  if (!nodeId) {
    return;
  }
  return nodeId.slice(self.taskPrefix.ID.length);
};

Roadmap.prototype.getPathClassList = function(targetEle, isLevelUp) {
  var self = this;
  var pathClass = targetEle.attr('class').split(' ')[0].slice(self.taskPrefix.LINE.length);
  var level = parseInt(pathClass.substr(pathClass.length - 1));
  pathClass = pathClass.substr(0, pathClass.length - 1) + (isLevelUp ? (level - 1) : level);
  return pathClass;
};

Roadmap.prototype.openNavList = function(source, fromBox) {
  var removeClasses = [ 'listClose' ];
  if (fromBox) {
    source = '#' + this.getNodeName(source);
    removeClasses.push('highlight');
  }
  $(source).siblings().addClass('listClose');
  $(source).removeClass(removeClasses.join(' '));
};

Roadmap.prototype.toggleListHighlight = function(source, toggle, fromBox) {
  var self = this;
  if (fromBox) {
    var taskId = self.getNodeName(source);
    source = '#' + taskId;
  }
  return toggle ? $(source).addClass('highlight') : $(source).removeClass('highlight');
};

Roadmap.prototype.togglePathHighlight = function(taskId, toggle) {
  var self = this;
  var pathId = self.taskPrefix.PATH + taskId;
  var targetEle = $('#' + pathId);
  if (!targetEle.is('path')) {
    return;
  }
  var pathClass = self.getPathClassList(targetEle, toggle);
  targetEle.attr('marker-start', 'url(#' + (self.taskPrefix.ARROW + pathClass) + ')');
  var targetEleDownStream = $('#' + pathId + '_DOWNSTREAM');
  if (!toggle) {
    toggleSvgClass(targetEle, 'highlight', false);
    toggleSvgClass(targetEleDownStream, 'highlight', false);
    return;
  }
  toggleSvgClass(targetEle, 'highlight', true);
  toggleSvgClass(targetEleDownStream, 'highlight', true);
};

Roadmap.prototype.isTaskValid = function(taskName) {
  var isValid = false;
  this.taskList.forEach(function(task) {
    if (task.name === taskName) {
      isValid = true;
    }
  });
  return isValid;
};

Roadmap.prototype.taskHasChildren = function(taskId) {
  var self = this;
  var check = false;
  self.nodes.forEach(function(node) {
    if (node.parent === taskId) {
      check = true;
    }
  });
  return check;
};

Roadmap.prototype.toggleTaskHighlight = function(source, toggle, isList) {
  var self = this;
  if (isList) {
    var id = $(source).attr('id');
    if (!self.isTaskValid(id)) {
      return;
    }
    source = $('#' + self.taskPrefix.ID + id).parent('.boxBase');
  }
  toggleSvgClass($(source), 'highlight', toggle);
  var taskId = self.getNodeName(source);
  self.togglePathHighlight(taskId, toggle);
  self.toggleListHighlight(source, toggle, true);
};

Roadmap.prototype.handleListEvents = function() {
  var self = this;
  var hideNav = function() {
    $('#' + self.IDs.NAV).removeClass('open');
  };

  $('.listTitle').on('click', function(e) {
    e.stopPropagation();
    $(this).children().addClass('listClose');
    if (!isDesktopScreen()) {
      hideNav();
      var taskName = $(this).attr('id');
      changeLocation(taskName);
      return;
    }
    self.drawChart();
  });

  $('.listBase').on('click', function(e) {
    e.stopPropagation();
    var taskName = $(this).attr('id');
    if (!self.taskHasChildren(taskName)) {
      return;
    }
    self.openNavList(this);
    self.toggleTaskHighlight(this, false, true);
    if (!isDesktopScreen()) {
      hideNav();
      changeLocation(taskName);
      return;
    }
    self.drawChart(taskName);
  });

  $('.listBase').mouseover(function(e) {
    e.stopPropagation();
    self.toggleListHighlight(this, true);
    self.toggleTaskHighlight(this, true, true);
  });

  $('.listBase').mouseout(function(e) {
    e.stopPropagation();
    self.toggleListHighlight(this, false);
    self.toggleTaskHighlight(this, false, true);
  });
};

Roadmap.prototype.handleBoxEvents = function() {
  var self = this;
  $('.boxBase').on('click', function(e) {
    e.stopPropagation();
    var taskId = self.getNodeName(this);
    if (!self.taskHasChildren(taskId)) {
      return;
    }
    self.openNavList(this, true);
    self.drawChart(taskId);
  });

  $('.boxBase').mouseover(function(e) {
    e.stopPropagation();
    self.toggleTaskHighlight(this, true);
  });

  $('.boxBase').mouseout(function(e) {
    e.stopPropagation();
    self.toggleTaskHighlight(this, false);
  });
};

Roadmap.prototype.handleHeaderEvents = function() {
  var self = this;
  $('#' + self.IDs.TITLE).on('click', function(e) {
    e.stopPropagation();
    $(this).toggleClass('active');
  });
};

Roadmap.prototype.drawNav = function() {
  var self = this;
  var classes = [ 'roadmapNav' ];
  this.targetEle.append(createDivElement(this.IDs.NAV, classes));
  var rootEle = $('#' + this.IDs.NAV);
  this.nodes.forEach(function(node, i) {
    if (self.excludeNodes.indexOf(node.name) !== -1) {
      return;
    }
    var parentEle = node.parent.length > 0 ? $('#' + node.parent) : rootEle;
    var classes = [ node.color ];
    if (i === 0) {
      classes.push('listTitle');
    } else {
      parentEle.addClass('listClose');
      classes.push('listBase');
    }
    var child = createDivElement(node.name, classes);
    var nodeName = parseNodeName(node.name);
    child = child.append('<span class="listPadding">' + nodeName + '</span>');
    parentEle.append(child);
  });
  this.handleListEvents();
};

Roadmap.prototype.setTaskList = function(parentName) {
  var self = this;
  var tasks = [];
  self.nodes.forEach(function(task) {
    if (self.excludeNodes.indexOf(task.name) !== -1) {
      return;
    }
    if (task.parent === parentName) {
      tasks.push(task);
    }
  });
  self.taskList = tasks;
};

// add breadcum element
Roadmap.prototype.addBreadcum = function(parentId) {
  var self = this;
  var breadcumEle = createDivElement(self.IDs.BREADCUM, [ 'roadmapBreadcrumb' ]);
  $(parentId).append(breadcumEle);
};

// add header element
Roadmap.prototype.addHeader = function(parentId) {
  var self = this;
  var header = createDivElement(null, [ 'roadmapChart-h' ]);
  var headerTitle = createDivElement(self.IDs.TITLE, [ 'roadmapChart-h-t' ]);
  var headerDesc = createDivElement(null, [ 'roadmapChart-h-desc' ]);
  var headerDescCntx = createDivElement(self.IDs.DESC, []);
  if (!isDesktopScreen()) {
    var menuicon = createDivElement(self.IDs.MOBILE_MENU, [ 'roadmapChart-h-menu' ]);
    header.append(menuicon);
    var descTitle = createDivElement(null, [ 'roadmapChart-h-desc-title' ]);
    descTitle.text('Description');
    headerDesc.append(descTitle);
  }
  header.append(headerTitle);
  header.append(headerDesc.append(headerDescCntx));
  $(parentId).append(header);
};

Roadmap.prototype.prepareChart = function() {
  var self = this;
  var roadmapChartBase = createDivElement(self.IDs.CHART_BASE, [ 'roadmapChart-b' ]);
  var roadmapChart = createDivElement(self.IDs.CHART, [ 'roadmapChart' ]);
  self.targetEle.append(roadmapChart.append(roadmapChartBase));
  self.svg.width = roadmapChartBase.width();
  self.dateFormat = d3.time.format('%Y-%m-%d');
  var chartBaseId = '#' + self.IDs.CHART_BASE;
  self.addBreadcum(chartBaseId);
  self.addHeader(chartBaseId);
  d3.selectAll(chartBaseId)
    .append('svg')
    .attr('id', self.IDs.CHART_SVG)
    .attr('width', self.svg.width)
    .attr('height', self.svg.height)
    .append('g')
    .attr('id', self.IDs.CHART_SVG_GRP)
    .attr('transform', 'translate(' + self.svg.padding + ',' + (self.svg.padding + self.progress.height) + ')');

  self.isChartReady = true;
};

Roadmap.prototype.prepareTaskStatus = function() {
  var self = this;
  var statusEle = d3.select('#' + self.IDs.CHART_SVG);
  // complete
  statusEle.append('svg:pattern')
    .attr('id', 'STATUS_COMPLETE')
    .attr('patternUnits', 'objectBoundingBox')
    .attr('width', self.box.height)
    .attr('height', self.box.height)
    .append('polygon')
    .attr('fill', '#FFFFFF')
    .attr('points', '14.9,4.9 7.7,12.1 4.9,9.2 3.5,10.6 7.7,14.9 16.3,6.3');

  // status open
  statusEle.append('svg:pattern')
    .attr('id', 'STATUS_OPEN')
    .attr('patternUnits', 'objectBoundingBox')
    .attr('width', self.box.height)
    .attr('height', self.box.height)
    .append('path')
    .attr('fill', '#FFFFFF')
    // jscs:disable disallowMultipleLineStrings
    .attr('d', 'M15.2,13.3l-4.5-4.5c0.4-1.1,0.2-2.5-0.7-3.4c-1-1-2.5-1.2-3.6-0.6' +
      'l2.1,2.1L7,8.4L4.8,6.3C4.2,7.4,4.5,8.9,5.5,9.9c0.9,0.9,2.3,1.2,3.4,' +
      '0.7l4.5,4.5c0.2,0.2,0.5,0.2,0.7,0l1.1-1.1C15.4,13.8,15.4,13.4,15.2,13.3z');
  // jscs:enable disallowMultipleLineStrings
};

Roadmap.prototype.prepareArrows = function() {
  var self = this;
  d3.select('#' + self.IDs.CHART_SVG)
    .selectAll('marker')
    .data(self.nodeColors)
    .enter()
    .append('svg:marker')
    .attr('id', function(d) {
      return self.taskPrefix.ARROW + d;
    })
    .attr('class', function(d) {
      return self.taskPrefix.LINE + d;
    })
    .attr('viewBox', '0 0 20 20')
    .attr('refX', '12')
    .attr('refY', '10')
    .attr('markerUnits', 'strokeWidth')
    .attr('markerWidth', '6')
    .attr('markerHeight', '6')
    .attr('fill', 'none')
    .append('svg:path')
    .attr('stroke-width', 3)
    .attr('d', 'M 0 20L 10 10 L 0 0');
};

Roadmap.prototype.preparePattern = function(node) {
  var self = this;
  var box = d3.select('#' + self.IDs.CHART_SVG)
    .select('g');

  var pattern = box.append('pattern')
    .attr('id', '_PATTERN_' + node.name)
    .attr('x', self.timeScale(self.dateFormat.parse(node.startDate)))
    .attr('y', node.section * self.perUnit)
    .attr('width', 80)
    .attr('height', self.box.height)
    .attr('patternUnits', 'userSpaceOnUse')
    .append('g')
    .attr('opacity', 0.8);

  pattern.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('class', self.taskPrefix.CLASS + node.color)
    .attr('width', (self.timeScale(self.dateFormat.parse(node.endDate)) -
      self.timeScale(self.dateFormat.parse(node.startDate))))
    .attr('height', self.box.height)
    .attr('opacity', 0.8);

  pattern.append('polygon')
    .attr('class', self.taskPrefix.CLASS + node.color)
    .attr('points', self.boxPattern.path);
};

Roadmap.prototype.drawBoxes = function() {
  var self = this;
  // Box base
  var box = d3.select('#' + self.IDs.CHART_SVG)
    .select('g')
    .selectAll('rect')
    .data(self.taskList)
    .enter();

  box.append('defs').each(function(d) {
    if (!d.status) {
      self.preparePattern(d);
    }
    $(this).remove();
  });

  var boxBase = box.append('g')
    .attr('class', function(d) {
      return 'boxBase ' + (self.taskPrefix.CLASS + d.color);
    });

  boxBase.append('rect')
    .attr('x', function(d) {
      return self.timeScale(self.dateFormat.parse(d.startDate));
    })
    .attr('y', function(d) {
      return (d.section - 1) * self.perUnit * 2;
    })
    .attr('width', function(d) {
      return (self.timeScale(self.dateFormat.parse(d.endDate)) - self.timeScale(self.dateFormat.parse(d.startDate)));
    })
    .attr('height', self.box.height)
    .attr('id', function(d) {
      return self.taskPrefix.ID + d.name;
    })
    .attr('class', 'box')
    .attr('style', function(d) {
      if (!d.status) {
        return 'fill: url(#_PATTERN_' + d.name + ')';
      }
    })
    .attr('stroke', 'none');

  // status box
  boxBase.append('rect')
    .attr('x', function(d) {
      return self.timeScale(self.dateFormat.parse(d.startDate)) +
        (self.timeScale(self.dateFormat.parse(d.endDate)) - self.timeScale(self.dateFormat.parse(d.startDate))) -
        self.box.height;
    })
    .attr('y', function(d) {
      return (d.section - 1) * self.perUnit * 2;
    })
    .attr('width', self.box.height)
    .attr('height', self.box.height)
    .attr('class', 'statusBox')
    .attr('id', function(d) {
      return self.taskPrefix.STATUS_BOX + d.name;
    })
    .style('fill', function(d) {
      if (!d.hasOwnProperty('status')) {
        return 'url(#STATUS_OPEN)';
      }
      return d.status ? 'url(#STATUS_COMPLETE)' : 'url(#STATUS_OPEN)';
    });

  // text
  boxBase.append('text')
    .text(function(d) {
      return parseNodeName(d.name);
    })
    .attr('x', function(d) {
      return ((self.perUnit / 2) + self.timeScale(self.dateFormat.parse(d.startDate)));
    })
    .attr('y', function(d) {
      return (((d.section - 1) * self.perUnit) * 2) + (self.perUnit / 1.3);
    })
    .attr('id', function(d) {
      return self.taskPrefix.BOX_TEXT + d.name;
    })
    .attr('class', 'taskText');
};

Roadmap.prototype.getIncomings = function(nodeName) {
  var self = this;
  var incomings = [];
  self.nodes.forEach(function(task) {
    if (task.target === nodeName) {
      incomings.push(task);
    }
  });
  incomings.sort(function(a, b) {
    return b.name === self.excludeNodes[0];
  });
  return incomings;
};

Roadmap.prototype.getDownStreamsNodeForTasks = function() {
  var self = this;
  var downStreamNodes = [];
  self.nodes.forEach(function(node) {
    if (node.name !== self.excludeNodes[1]) {
      return;
    }
    self.taskList.forEach(function(task) {
      if (task.name === node.source) {
        downStreamNodes.push(node);
      }
    });
  });
  return downStreamNodes;
};

Roadmap.prototype.drawLines = function() {
  var self = this;
  var incomings = null;

  var addPathInfo = function(nodeId, path) {
    self.nodes.forEach(function(node) {
      if (node.id === nodeId) {
        node.path = path;
      }
    });
  };

  var getNodeCountDetails = function(target) {
    var downCount = 0;
    var incomings = self.getIncomings(target.name);
    incomings.forEach(function(node) {
      node.startDate = node.startDate || new Date(1 - 1 - 1947);
      if (((new Date(target.startDate)).getTime() > (new Date(node.startDate)).getTime()) &&
        (target.section < node.section)) {
        downCount++;
      }
    });
    return {
      down: downCount,
      rest: incomings.length - downCount,
      total: incomings.length
    };
  };

  var computePath = function(target, node, order) {
    var bottomDist = 16;
    var path = {
      start: {
        x: 0,
        y: 0
      },
      interTop: {
        x: 0,
        y: 0
      },
      interBot: {
        x: 0,
        y: 0
      },
      end: {
        x: 0,
        y: 0
      }
    };

    var nodeCount = getNodeCountDetails(target);
    path.start.x = self.timeScale(self.dateFormat.parse(target.startDate)) - (order * bottomDist);
    path.start.y = (((target.section - 1) * self.perUnit) * 2) + (self.perUnit / 2);
    path.start.y = isBoxDown(target, node) ? (path.start.y - (order * self.perUnit) +
      ((order - nodeCount.rest) * self.perUnit * 2)) : (path.start.y - (order * self.perUnit));
    path.interBot.x = path.start.x - bottomDist;
    path.interBot.y = path.start.y;
    if (node.name === self.excludeNodes[0]) {
      path.interTop.x = path.interBot.x;
      path.interTop.y = -path.end.y - self.svg.padding;
      path.end = path.interTop;
      addPathInfo(node.id, path);
    } else {
      path.end.x = self.timeScale(self.dateFormat.parse(node.endDate));
      path.end.y = (((node.section - 1) * self.perUnit) * 2) + (self.perUnit / 2);
      path.interTop.x = path.interBot.x;
      path.interTop.y = path.end.y;
    }
    return [ path.start, path.interBot, path.interTop, path.end ];
  };

  var computeDownStreamPath = function(target, id) {
    var padding = 16;
    var path = {
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 0,
        y: 0
      }
    };

    path.start.x = self.timeScale(self.dateFormat.parse(target.endDate)) + padding;
    path.start.y = (((target.section - 1) * self.perUnit) * 2) + (self.perUnit / 2);
    path.end.x = path.start.x;
    path.end.y = self.svg.height;
    addPathInfo(id, path);
    return [ path.start, path.end ];
  };

  var drawLine = function(node, path, isDownStream) {
    var line = d3.svg.line()
      .x(function(d) {
        return d.x;
      })
      .y(function(d) {
        return d.y;
      })
      .interpolate('linear');

    d3.select('#' + self.IDs.CHART_SVG)
      .select('g')
      .datum(path)
      .append('path')
      .attr('class', self.taskPrefix.LINE + node.color)
      .attr('d', line)
      .attr('id', function() {
        var id = self.taskPrefix.PATH + node.name;
        if (isDownStream) {
          id += '_DOWNSTREAM';
        }
        return id;
      })
      .attr('fill', 'none')
      .attr('stroke-width', 2)
      .attr('marker-start', function() {
        if (isDownStream) {
          return '';
        }
        return node.color ? 'url(#' + self.taskPrefix.ARROW + node.color + ')' : 'url(#' + self.taskPrefix.ARROW + ')';
      });
  };

  self.taskList.forEach(function(task) {
    incomings = self.getIncomings(task.name);
    incomings.forEach(function(node, i) {
      var path = computePath(task, node, i);
      drawLine(node, path);
    });
  });

  var downStreamNodes = self.getDownStreamsNodeForTasks();
  downStreamNodes.forEach(function(task) {
    var target = null;
    self.nodes.forEach(function(node) {
      if (node.name === task.source) {
        target = node;
      }
    });
    var path = computeDownStreamPath(target, task.id);
    drawLine(target, path, true);
  });
};

Roadmap.prototype.drawLabels = function(parentName) {
  var self = this;
  var getNodesToAddLabel = function(parentName) {
    var resultArr = [];
    self.nodes.forEach(function(node) {
      if (self.excludeNodes.indexOf(node.name) !== -1 && node.parent === parentName) {
        resultArr.push(node);
      }
    });
    return resultArr;
  };
  var nodesToAddLabel = getNodesToAddLabel(parentName);
  var labelNode = d3.select('#' + self.IDs.CHART_SVG)
    .select('g').append('g').attr('id', self.IDs.LABEL_GRP);

  var drawLabel = function(node) {
    var downStreamLableBottom = 300;
    labelNode.append('rect')
      .attr('rx', self.label.borderRadius)
      .attr('ry', self.label.borderRadius)
      .attr('x', function() {
        if (node.name === self.excludeNodes[1]) {
          return node.path.start.x + self.label.padding;
        }
        return node.path.interBot.x - (self.label.width + self.label.padding);
      })
      .attr('y', function() {
        if (node.name === self.excludeNodes[1]) {
          return node.path.end.y - downStreamLableBottom;
        }
        return node.path.interBot.y - (self.label.height / 2);
      })
      .attr('width', self.label.width)
      .attr('height', self.label.height)
      .attr('style', 'font-size: 12px;')
      .attr('class', function() {
        var color = node.color;
        if (node.name === self.excludeNodes[1]) {
          self.nodes.forEach(function(item) {
            if (item.name === node.source) {
              color = item.color;
            }
          });
        }
        return self.taskPrefix.CLASS + color;
      });

    // text
    labelNode.append('text')
      .text(textEllipsis(node.desc, 7))
      .attr('x', function() {
        if (node.name === self.excludeNodes[1]) {
          return node.path.start.x + (self.label.padding * 1.3);
        }
        return node.path.interBot.x - (self.label.width + (self.label.padding / 1.3));
      })
      .attr('y', function() {
        if (node.name === self.excludeNodes[1]) {
          return node.path.end.y - (downStreamLableBottom - (self.label.height / 1.3));
        }
        return node.path.interBot.y + (self.label.height / 3);
      })
      .attr('class', 'labelText');
  };
  d3.map(nodesToAddLabel, function(node) {
    drawLabel(node);
  });
};

Roadmap.prototype.updateBreadcum = function(parentName) {
  var self = this;
  var list = [];
  self.breadcumList = [];
  var init = function() {
    $('#' + self.IDs.BREADCUM).html('');
    self.breadcumList.push('SAFE Network');
  };

  var getBreadcumList = function(nodeName) {
    self.nodes.forEach(function(node) {
      if (node.name === nodeName && node.parent) {
        getBreadcumList(node.parent);
      }
    });
    list.push(parseNodeName(nodeName));
  };
  getBreadcumList(parentName);
  init();
  self.breadcumList = self.breadcumList.concat(list);
  var target = $('#' + self.IDs.BREADCUM);
  self.breadcumList.forEach(function(item) {
    var breadcumItem = createDivElement(null, [ 'breadcrumb-i' ], item);
    target.append(breadcumItem);
  });
};

Roadmap.prototype.updateHeader = function(parentName) {
  if (!parentName) {
    return;
  }
  var self = this;
  var target = null;
  self.nodes.forEach(function(node) {
    if (node.name === parentName) {
      target = node;
    }
  });
  var titleEle = $('#' + self.IDs.TITLE);
  var descEle = $('#' + self.IDs.DESC);
  titleEle.text(parseNodeName(target.name)).removeClass('active');
  descEle.text(target.desc);
};

Roadmap.prototype.prepareProgressPattern = function(node) {
  var self = this;
  var box = d3.select('#' + self.IDs.CHART_SVG);

  var pattern = box.append('pattern')
    .attr('id', '_PATTERN_' + node.name)
    .attr('x', node.x)
    .attr('y', node.y)
    .attr('width', 80)
    .attr('height', node.height)
    .attr('patternUnits', 'userSpaceOnUse')
    .append('g');

  pattern.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('class', self.taskPrefix.CLASS + 'blue-3')
    .attr('width', node.width)
    .attr('height', node.height)
    .attr('opacity', 0.8);

  pattern.append('polygon')
    .attr('class', self.taskPrefix.CLASS + 'blue-2')
    .attr('points', self.boxPattern.path);
};

Roadmap.prototype.drawProgress = function(parentName) {
  var self = this;
  var target = null;
  self.nodes.forEach(function(node) {
    if (node.name === parentName) {
      target = node;
    }
  });

  var minDate = d3.min(self.taskList, function(d) {
    return self.dateFormat.parse(d.startDate);
  });
  var completedDate = minDate.getFullYear() + '-' + (minDate.getMonth() + 1) +
    '-' + (minDate.getDate() + target.daysCompleted);

  self.prepareProgressPattern({
    name: self.IDs.PROGRESS,
    x: self.svg.padding,
    y: 0,
    width: self.svg.width - (self.svg.padding * 2),
    height: self.progress.height
  });

  var progressContainer = d3.select('#' + self.IDs.CHART_SVG)
    .append('g')
    .attr('id', self.IDs.PROGRESS);

  // header base
  progressContainer
    .append('rect')
    .attr('class', 'chart-progress-b')
    .attr('x', self.svg.padding)
    .attr('y', 0)
    .attr('width', self.svg.width - (self.svg.padding * 2))
    .attr('height', self.progress.height)
    .attr('style', 'fill: url(#_PATTERN_' + self.IDs.PROGRESS + ')');

  // progress
  progressContainer
    .append('rect')
    .attr('class', self.taskPrefix.CLASS + 'blue-2')
    .attr('x', self.svg.padding)
    .attr('y', 0)
    .attr('width', self.timeScale(self.dateFormat.parse(completedDate)))
    .attr('height', self.progress.height);
};

Roadmap.prototype.clearChartSection = function() {
  $('#' + this.IDs.CHART).remove();
  this.isChartReady = false;
};

Roadmap.prototype.resetChart = function() {
  $('#' + this.IDs.LABEL_GRP).remove();
  $('#' + this.IDs.CHART_SVG_GRP).children().remove();
};

Roadmap.prototype.initChart = function() {
  this.prepareChart();
  this.handleHeaderEvents();
  this.prepareTaskStatus();
  this.prepareArrows();
};

Roadmap.prototype.drawChart = function(parentName) {
  parentName = parentName || this.nodes[0].name;

  if (!isDesktopScreen()) {
    return this.drawMobileChart(parentName);
  }
  if (!this.isChartReady) {
    this.initChart();
  }
  this.setTaskList(parentName);
  if (this.taskList.length === 0) {
    return;
  }
  this.resetChart();
  this.updateBreadcum(parentName);
  this.updateHeader(parentName);
  this.drawProgress(parentName);
  this.drawBoxes();
  this.drawLines();
  this.drawLabels(parentName);
  this.handleBoxEvents();
};

Roadmap.prototype.resetMobileView = function() {
  $('.features-list').remove();
};

Roadmap.prototype.cleanMobileView = function() {
  $('#' + this.IDs.MOBILE_BASE).remove();
  this.isMobileChartReady = false;
};

Roadmap.prototype.addFeatures = function(parentName) {
  var self = this;
  var features = {
    sub: [],
    reliedOn: [],
    relyThis: []
  };

  var mobileBase = $('#' + self.IDs.MOBILE_BASE);

  var createBase = function(listId) {
    if (!$('#' + listId).is('#' + listId)) {
      mobileBase.append(createDivElement(listId, [ 'features-list' ]));
    }
  };

  var addTitle = function(title, listId) {
    if (!$('#' + listId).is('#' + listId)) {
      return;
    }
    $('#' + listId).append('<h3 class="features-list-h">' + title + '</h3>');
  };

  var addList = function(title, list, listId) {
    createBase(listId);
    addTitle(title, listId);
    var listBase = $('#' + listId);
    list.forEach(function(item) {
      var listEle = createDivElement(self.taskPrefix.FEATURE_ID + item.name,
        [ 'features-list-i', self.taskPrefix.FEATURE_ITEM + item.color ]);
      listEle.text(parseNodeName(item.name));
      listBase.append(listEle);
    });
  };

  self.nodes.forEach(function(node) {
    if (node.parent === parentName && node.name === self.excludeNodes[0]) {
      return features.reliedOn.push(node);
    }
    if (node.parent === parentName && node.name === self.excludeNodes[1]) {
      return features.relyThis.push(node);
    }
    if (node.parent === parentName) {
      return features.sub.push(node);
    }
  });
  if (features.sub.length > 0) {
    addList('Sub-fetures:', features.sub, self.IDs.SUB_FEATURES);
  }
  if (features.reliedOn.length > 0) {
    addList('Features relied on:', features.reliedOn, self.IDs.RELIED_ON_FEATURES);
  }
  if (features.relyThis.length > 0) {
    addList('Features that rely this:', features.relyThis, self.IDs.RELY_THIS_FEATURES);
  }
};

Roadmap.prototype.handleMobileEvents = function() {
  var self = this;
  var navEle = $('#' + self.IDs.NAV);

  $('#' + self.IDs.MOBILE_MENU).on('click', function() {
    navEle.addClass('open');
  });

  navEle.on('click', function(e) {
    e.stopPropagation();
    if (e.target !== this) {
      return;
    }
    navEle.removeClass('open');
  });

  $(document).on('click', '.features-list-i', function(e) {
    e.stopPropagation();
    var taskId = $(this).attr('id').slice(self.taskPrefix.FEATURE_ID.length);
    if (!self.taskHasChildren(taskId)) {
      return;
    }
    changeLocation(taskId);
  });
};

Roadmap.prototype.prepareMobileViewChart = function() {
  var self = this;
  self.clearChartSection();

  //  set navigation
  var navEle = $('#' + self.IDs.NAV);
  var navBgClassList = [ 'roadmapNav-bg' ];
  if (navEle.has('.' + navBgClassList[0]).length === 0) {
    var navBg = createDivElement(null, navBgClassList);
    navEle.append(navBg);
  }

  var mobileBase = createDivElement(self.IDs.MOBILE_BASE, [ 'roadmapChartMobile-b' ]);
  self.targetEle.append(mobileBase);
  self.addBreadcum('#' + self.IDs.MOBILE_BASE);
  self.addHeader('#' + self.IDs.MOBILE_BASE);
  self.handleMobileEvents();
  self.isMobileChartReady = true;
};

Roadmap.prototype.drawMobileChart = function(parentName) {
  var self = this;
  if (!self.isMobileChartReady) {
    self.prepareMobileViewChart();
  }
  self.resetMobileView();
  self.updateBreadcum(parentName);
  self.updateHeader(parentName);
  self.addFeatures(parentName);
};

Roadmap.prototype.draw = function() {
  this.targetEle = $(this.payload.target);
  this.init();
  this.drawNav();
  this.drawChart();
};

$(function() {
  $.get('data/roadmapData.json', function(data) {
    new Roadmap({
      data: data,
      target: '#Roadmap',
      interval: 10
    }).draw();
  });
  // new Roadmap({
  //   data: jsonData,
  //   target: '#Roadmap',
  //   interval: 10
  // }).draw();
});
