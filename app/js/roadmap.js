// roadmap chart
var Roadmap = function(payload) {
  this.payload = payload;
  this.excludeNodes = ['EXTERNAL', 'DOWN_STREAM'];
  this.excludeTarget = 'END';
  this.IDs = {
    'NAV': 'RoadmapNav',
    'CHART': 'RoadmapChart',
    'CHART_BASE': 'RoadmapChartBase',
    'CHART_SVG': 'RoadmapChartSvg',
    'CHART_SVG_GRP': 'RoadmapChartSvgGroup',
    'LABEL_GRP': 'LabelGroup'
  };
  this.nodes = [];
  this.perUnit = 20;
  this.taskPrefix = {
    'ID': '_TASK_',
    'CLASS': 'svg-',
    'LINE': 'line-',
    'ARROW': 'ARROW_'
  };
  this.svg = {
    width: 0,
    height: 600,
    padding: 20
  };
  this.box = {
    width: 10,
    height: 20
  };
  this.taskList = [];
  this.dateFormat = null;
};

var createDivElement = function(id, classes) {
  id = id || '';
  classes = typeof classes === 'object' && classes.length > 0 ? classes.join(' ') : '';
  var ele = '<div id="::ID::" class="::CLASS::"></div>'.replace('::ID::', id).replace('::CLASS::', classes);
  return $(ele);
};

var parseNodeName = function(name) {
  name = name.replace(/_/g, ' ').toLowerCase();
  return name[0].toUpperCase() + name.slice(1);
};

var addDate = function(date, count) {
  date = date.split('-');
  var len = date.length - 1;
  date[len] = parseInt(date[len]) + count;
  if (date[len] > 30) {
    date[len] = 30;
  }
  return date.join('-');
};

Roadmap.prototype.timeScale = function(val) {
  var self = this;
  return (d3.time.scale()
    .domain([d3.min(self.taskList, function(d) {
        return self.dateFormat.parse(d.startDate);
      }),
      d3.max(self.taskList, function(d) {
        return self.dateFormat.parse(d.endDate);
      })
    ])
    .range([0, self.svg.width - 150]))(val);
};

Roadmap.prototype.prepareData = function() {
  var self = this;
  var prepareNode = function(node, parent) {
    var nodeInfo = {
      name: node.name,
      desc: node.desc || '',
      color: node.color || '',
      parent: parent || '',
      target: node.target || '',
      startDate: node.startDate,
      endDate: node.endDate,
      section: node.section,
      status: node.status
    };
    if (node.name === self.excludeNodes[0]) {
      nodeInfo.id = node.id;
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
  this.targetEle.append(createDivElement(null, ['roadmap-b']));
  this.prepareData();
};

Roadmap.prototype.handleListEvent = function() {
  var self = this;
  $('.listTitle').on('click', function(e) {
    e.stopPropagation();
    $(this).children().addClass('listClose');
    self.drawChart($(this).attr('id'));
  });
  
  $('.listBase').on('click', function(e) {
    e.stopPropagation();
    $(this).siblings().addClass('listClose');
    $(this).removeClass('listClose');
    self.drawChart($(this).attr('id'));
  });

  $('.listBase').mouseover(function(e) {
    e.stopPropagation();
    $(this).addClass('highlight');
  });

  $('.listBase').mouseout(function(e) {
    e.stopPropagation();
    $(this).removeClass('highlight');
  });
};

Roadmap.prototype.drawNav = function() {
  var self = this;
  var classes = ['roadmapNav'];
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
    parentEle.append(child.html(parseNodeName(node.name)));
  });
  this.handleListEvent();
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

Roadmap.prototype.prepareChart = function() {
  var self = this;
  var roadmapChartBase = createDivElement(self.IDs.CHART_BASE, ['roadmapChart-b']);
  var roadmapChart = createDivElement(self.IDs.CHART, ['roadmapChart']);
  self.targetEle.append(roadmapChart.append(roadmapChartBase));
  self.svg.width = roadmapChartBase.width();
  self.dateFormat = d3.time.format("%Y-%m-%d");

  d3.select('#' + self.IDs.CHART_BASE)
    .append('svg')
    .attr('id', self.IDs.CHART_SVG)
    .attr('width', self.svg.width)
    .attr('height', self.svg.height)
    .append('g')
    .attr('id', self.IDs.CHART_SVG_GRP)
    .attr('transform', 'translate(' + self.svg.padding + ',' + self.svg.padding + ')');
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
    .attr('d', 'M15.2,13.3l-4.5-4.5c0.4-1.1,0.2-2.5-0.7-3.4c-1-1-2.5-1.2-3.6-0.6\
  l2.1,2.1L7,8.4L4.8,6.3C4.2,7.4,4.5,8.9,5.5,9.9c0.9,0.9,2.3,1.2,3.4,\
  0.7l4.5,4.5c0.2,0.2,0.5,0.2,0.7,0l1.1-1.1C15.4,13.8,15.4,13.4,15.2,13.3z');
  // jscs:enable disallowMultipleLineStrings
};

Roadmap.prototype.prepareArrows = function() {
  var self = this;
  var colors = ['blue-1', 'blue-2', 'blue-3', 'orange-1', 'orange-2', 'orange-3',
    'coral-1', 'coral-2', 'coral-3', 'pink-1', 'pink-2', 'pink-3',
    'green-1', 'green-2', 'green-3', 'indigo-1', 'indigo-2', 'indigo-3',
    'cyan-1', 'cyan-2', 'cyan-3', 'turquoise-1', 'turquoise-2', 'turquoise-3',
    'grey-1', 'grey-2', 'grey-3', 'purple-1', 'purple-2', 'purple-3', ''
  ];

  d3.select('#' + self.IDs.CHART_SVG)
    .selectAll('marker')
    .data(colors)
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
  var box = box = d3.select('#' + self.IDs.CHART_SVG)
    .select('g');

  var pattern = box.append('pattern')
    .attr('id', '_PATTERN_' + node.name)
    .attr("x", self.timeScale(self.dateFormat.parse(node.startDate)))
    .attr("y", node.section * self.perUnit * 2)
    .attr("width", 80)
    .attr("height", self.box.height)
    .attr('patternUnits', 'userSpaceOnUse')
    .append('g')
    .attr('opacity', 0.8);

  pattern.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('class', self.taskPrefix.CLASS + node.color)
    .attr("width", (self.timeScale(self.dateFormat.parse(node.endDate)) - self.timeScale(self.dateFormat.parse(node.startDate))))
    .attr('height', self.box.height)
    .attr('opacity', 0.8);

  pattern.append('polygon')
    .attr('class', self.taskPrefix.CLASS + node.color)
    .attr('points', '80,0 61,20 80,20');

  pattern.append('polygon')
    .attr('class', self.taskPrefix.CLASS + node.color)
    .attr('points', '0,0 0,20 21,20 40,0');
};

Roadmap.prototype.drawBoxes = function() {
  var self = this;
  // Box base
  var box = d3.select('#' + self.IDs.CHART_SVG)
    .select('g')
    .selectAll("rect")
    .data(self.taskList)
    .enter();

  box.append('defs').each(function(d) {
    if (!d.status) {
      self.preparePattern(d);
    }
    this.remove();
  });

  var innerBox = box.append("rect")
    .attr("x", function(d) {
      return self.timeScale(self.dateFormat.parse(d.startDate));
    })
    .attr("y", function(d, i) {
      return d.section * self.perUnit * 2;
    })
    .attr("width", function(d, i) {
      return (self.timeScale(self.dateFormat.parse(d.endDate)) - self.timeScale(self.dateFormat.parse(d.startDate)));
    })
    .attr("height", self.box.height)
    .attr("id", function(d) {
      return self.taskPrefix.ID + d.name;
    })
    .attr('class', function(d) {
      var classes = 'box ';
      return d.status ? classes + self.taskPrefix.CLASS + d.color : classes;
    })
    .attr('style', function(d) {
      if (!d.status) {
        return 'fill: url(#_PATTERN_' + d.name + ')';
      }
    })
    .attr("stroke", "none");

  // status box
  var statusBox = box.append('rect')
    .attr("x", function(d) {
      return self.timeScale(self.dateFormat.parse(d.startDate)) +
        (self.timeScale(self.dateFormat.parse(d.endDate)) - self.timeScale(self.dateFormat.parse(d.startDate))) -
        self.box.height;
    })
    .attr("y", function(d, i) {
      return d.section * self.perUnit * 2;
    })
    .attr('width', self.box.height)
    .attr('height', self.box.height)
    .style('fill', function(d) {
      if (!d.hasOwnProperty('status')) {
        return 'url(#STATUS_OPEN)';
      }
      return d.status ? 'url(#STATUS_COMPLETE)' : 'url(#STATUS_OPEN)';
    });

  // text
  var rectText = box.append("text")
    .text(function(d) {
      return parseNodeName(d.name);
    })
    .attr("x", function(d) {
      return ((self.perUnit / 2) + self.timeScale(self.dateFormat.parse(d.startDate)));
    })
    .attr("y", function(d, i) {
      return ((d.section * self.perUnit) * 2) + (self.perUnit / 1.3);
    })
    .attr("class", "taskText");
};

Roadmap.prototype.getIncomings = function(nodeName) {
  var self = this;
  var incomings = [];
  var sortedIncoming = [];
  self.nodes.forEach(function(task) {
    if (task.target.indexOf(nodeName) !== -1) {
      incomings.push(task);
    }
  });
  var index = 0;
  incomings.sort(function(a, b) {
    return b.name === self.excludeNodes[0]
  });
  return incomings;
};

Roadmap.prototype.drawLines = function() {
  var self = this;
  var incomings = null;

  var addPathInfo = function(nodeId, path) {
    self.nodes.forEach(function(node) {
      if (node.id === nodeId) {
        node.path = path;
      }
    })
  };

  var isDown = function(target, node) {
    node.startDate = node.startDate || new Date(1 - 1 - 1947);
    return ((new Date(target.startDate)).getTime() > (new Date(node.startDate)).getTime()) && (target.section < node.section);
  };

  var getNodeCountDetails = function(target) {
    var downCount = 0;
    var incomings = self.getIncomings(target.name);
    incomings.forEach(function(node) {
      node.startDate = node.startDate || new Date(1 - 1 - 1947);
      if (((new Date(target.startDate)).getTime() > (new Date(node.startDate)).getTime()) && (target.section < node.section)) {
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

    path.start.x = self.timeScale(self.dateFormat.parse(target.startDate)) - (order * bottomDist);
    path.start.y = ((target.section * self.perUnit) * 2) + (self.perUnit / 2);
    var nodeCount = getNodeCountDetails(target);
    path.start.y = isDown(target, node) ? (path.start.y - (order * self.perUnit) + ((order - nodeCount.rest) * self.perUnit * 2)) : (path.start.y - (order * self.perUnit));
    path.interBot.x = path.start.x - bottomDist;
    path.interBot.y = path.start.y;
    if (node.name === self.excludeNodes[0]) {
      path.interTop.x = path.interBot.x;
      path.interTop.y = path.end.y;
      path.end = path.interTop;
      addPathInfo(node.id, path);
    } else {
      var nodeEle = $('#' + self.taskPrefix.ID + node.name);
      path.end.x = self.timeScale(self.dateFormat.parse(node.endDate));
      path.end.y = ((node.section * self.perUnit) * 2) + (self.perUnit / 2);
      path.interTop.x = path.interBot.x;
      path.interTop.y = path.end.y;
    }
    return path;
  };

  var drawLine = function(node, path) {
    var pathArr = [path.start, path.interBot, path.interTop, path.end];
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
      .datum(pathArr)
      .append('path')
      .attr('class', self.taskPrefix.LINE + node.color)
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke-width', 2)
      .attr('marker-start', function() {
        return node.color ? 'url(#' + self.taskPrefix.ARROW + node.color + ')' : 'url(#' + self.taskPrefix.ARROW + ')';
      });
  };

  self.taskList.forEach(function(task) {
    incomings = self.getIncomings(task.name);
    incomings.forEach(function(node, i) {
      var path = computePath(task, node, i);
      drawLine(node, path);
    });
  })
};

Roadmap.prototype.drawLabels = function(parentName) {
  var self = this;
  var labelWidth = 100;
  var labelheight = 15;
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
    labelNode.append('rect')
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('x', node.path.interBot.x - (labelWidth + 2))
      .attr('y', node.path.interBot.y)
      .attr('width', labelWidth)
      .attr('height', labelheight)
      .attr('style', 'font-size: 12px; transform: translateZ(20px)')
      .attr('class', self.taskPrefix.CLASS + node.color);

    // text
    labelNode.append("text")
      .text(node.desc)
      .attr('x', node.path.interBot.x - labelWidth)
      .attr('y', node.path.interBot.y + (labelheight / 1.3))
      .attr('style', 'font-size: 11px')
      .attr("class", "taskText");
  };
  d3.map(nodesToAddLabel, function(node) {
    drawLabel(node)
  });
};

Roadmap.prototype.drawChart = function(parentName) {
  this.resetChart();
  this.setTaskList(parentName);
  this.drawBoxes();
  this.drawLines();
  this.drawLabels(parentName);
};

Roadmap.prototype.resetChart = function() {
  var labels = $('#' + this.IDs.LABEL_GRP).remove();
  var svg = $('#' + this.IDs.CHART_SVG_GRP).html('');
  this.taskList = [];
};

Roadmap.prototype.draw = function() {
  this.targetEle = $(this.payload.target);
  this.init();
  this.drawNav();
  this.prepareChart();
  this.prepareTaskStatus();
  this.prepareArrows();
  this.drawChart(this.nodes[0].name);
};

$(function() {
  new Roadmap({
    data: window.roadmapData,
    target: '#Roadmap'
  }).draw();
});
