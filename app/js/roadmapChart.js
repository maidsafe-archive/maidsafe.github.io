/*global d3:false, window:false, document:false, RoadmapNav:false */
/*jshint unused:false, multistr: true*/

var RoadmapChart = {
  svg: {
    width: 1000,
    height: 1000,
    padding: 20,
    perUnit: 20,
    target: null,
    parentId: '#RoadmapChart'
  },
  boxesContainer: {
    id: 'boxBase',
    target: null
  },
  lineMarkers: {
    colors: [ 'blue-1', 'blue-2', 'blue-3', 'orange-1', 'orange-2', 'orange-3',
      'coral-1', 'coral-2', 'coral-3', 'pink-1', 'pink-2', 'pink-3',
      'green-1', 'green-2', 'green-3', 'indigo-1', 'indigo-2', 'indigo-3',
      'cyan-1', 'cyan-2', 'cyan-3', 'turquoise-1', 'turquoise-2', 'turquoise-3',
      'grey-1', 'grey-2', 'grey-3', 'purple-1', 'purple-2', 'purple-3', 'default' ],
    nodes: {}
  },
  box: {
    width: 0,
    height: 0
  },
  boxLastPos: {
    x: 0,
    y: 0
  },
  targets: {
    nodes: {},
    count: 0
  },
  nodeChildren: [],
  boxes: [],
  maxRowIndex: 0,
  xScale: function(val) {
    var self = this;
    var x = d3.scale.linear()
    .domain([ self.svg.padding, self.svg.width ])
    .range([ 0, self.svg.width - self.svg.padding ]);
    return x(val);
  },
  yScale: function(val) {
    var self = this;
    var y = d3.scale.linear()
    .domain([ 0, self.svg.height ])
    .range([ 0, self.svg.height - self.svg.padding ]);
    return y(val);
  },
  prepareMarkers: function() {
    var self = this;
    self.svg.target.append('svg:defs')
    .selectAll('marker')
    .data(self.lineMarkers.colors)
    .enter()
    .append('svg:marker')
    .attr('id', function(d) {
      return 'svg-' + d;
    })
    .attr('class', function(d) {
      return 'lineMarker lineMarker-' + d;
    })
    .attr('viewBox', '0 0 20 20')
    .attr('refX', '10')
    .attr('refY', '10')
    .attr('markerUnits', 'strokeWidth')
    .attr('markerWidth', '10')
    .attr('markerHeight', '10')
    .attr('orient', 'auto')
    .append('svg:path')
    .attr('d', 'M 0 20L 10 10 L 0 0');
  },
  prepareStatusElements: function() {
    var self = this;
    var statusEle = self.svg.target.append('svg:defs');
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
    .attr('d', 'M15.2,13.3l-4.5-4.5c0.4-1.1,0.2-2.5-0.7-3.4c-1-1-2.5-1.2-3.6-0.\
    6l2.1,2.1L7,8.4L4.8,6.3C4.2,7.4,4.5,8.9,5.5,9.9c0.9,0.9,2.3,1.2,3.4,\
    0.7l4.5,4.5c0.2,0.2,0.5,0.2,0.7,0l1.1-1.1C15.4,13.8,15.4,13.4,15.2,13.3z');
    // jscs:enable disallowMultipleLineStrings
  },
  appendSvg: function() {
    var self = this;
    self.svg.height = window.screen.height - 120;
    self.svg.target = d3.select(self.svg.parentId)
    .append('svg')
    .attr('width', self.svg.width)
    .attr('height', self.svg.height);
  },
  appendBoxesContainer: function() {
    var self = this;
    self.boxesContainer.target = self.svg.target
    .append('g')
    .attr('id', 'boxBase')
    .attr('transform', 'translate(' + self.svg.padding + ',' + self.svg.padding + ')');
  },
  computeBoxes: function() {
    var self = this;
    var nodes = self.nodeChildren;
    var boxes = [];
    d3.map(nodes, function(node) {
      if (!boxes[ node.section - 1 ]) {
        boxes[node.section - 1] = [ 0 ];
      }
      boxes[ node.section - 1 ][ node.order - 1 ] = node;
    });
    self.boxes = boxes;
  },
  computeTargetNodes: function() {
    var self = this;
    var targetNodes = {};
    var nodes = self.nodeChildren;
    d3.map(nodes, function(node) {
      // source nodes
      if (node.hasOwnProperty('source')) {
        if (!targetNodes.hasOwnProperty('sourceOutcomes')) {
          targetNodes.sourceOutcomes = [];
        }
        var obj = {};
        obj[node.name] = node.source;
        targetNodes.sourceOutcomes.push(obj);
        return;
      }

      // target nodes
      if (node.hasOwnProperty('target')) {
        d3.map(node.target, function(id) {
          if (id === 'END') {
            return;
          }
          if (!targetNodes.hasOwnProperty(id)) {
            targetNodes[id] = [];
          }
          targetNodes[id].push(node.name);
        });
      }
    });
    self.targets.nodes = targetNodes;
  },
  countTargetNodes: function() {
    var self = this;
    var count = 0;
    var targetNodes = self.targets.nodes;
    for (var key in targetNodes) {
      if (targetNodes[key]) {
        if (key === 'sourceOutcomes') {
          continue;
        }
        count += targetNodes[key].length;
      }
    }
    self.targets.count = count;
  },
  computeBoxDimentions: function() {
    var self = this;
    var boxWidth = 0;
    var maxBox = 0;
    var boxes = self.boxes;
    // set box height
    self.box.height = self.svg.perUnit;

    // set box width
    d3.map(boxes, function(box, index) {
      var boxLen = box.length;
      if (maxBox < boxLen) {
        maxBox = boxLen;
        // set index of row which has higher number of nodes
        self.maxRowIndex = index;
      }
    });
    boxWidth = (self.svg.width - (self.targets.count * self.svg.perUnit)) / maxBox;
    self.box.width = boxWidth;
  },
  drawHeader: function(value) {
    var self = this;
    var headerContainer = self.svg.target.append('g').attr('id', 'Header');

    // header base
    headerContainer
    .append('rect')
    .attr('class', 'chart-header-b')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', self.svg.width)
    .attr('height', self.svg.padding / 2);

    // progress
    headerContainer
    .append('rect')
    .attr('class', 'chart-header-progress')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', (self.svg.width * (value / 100)))
    .attr('height', (self.svg.perUnit / 2));
  },
  drawBox: function(box, x, y) {
    var self = this;
    var xPos = x + (parseFloat(box.offsetX) * self.svg.perUnit);
    var yPos = y + (parseFloat(box.offsetY) * self.svg.perUnit);
    var classname = 'box ';
    classname += box.hasOwnProperty('color') ? 'svg-' + box.color : '';
    if (!box.status) {
      var pattern = self.svg.target
      .append('defs')
      .append('pattern')
      .attr('id', '_PATTERN_' + box.name)
      .attr('x', self.xScale(xPos))
      .attr('y', self.yScale(yPos))
      .attr('width', 80)
      .attr('height', 20)
      .attr('patternUnits', 'userSpaceOnUse')
      .append('g')
      .attr('opacity', 0.8);

      pattern.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('class', classname)
      .attr('width', self.box.width)
      .attr('height', self.box.height)
      .attr('opacity', 0.8);

      pattern.append('polygon')
      .attr('class', classname)
      .attr('points', '80,0 61,20 80,20');

      pattern.append('polygon')
      .attr('class', classname)
      .attr('points', '0,0 0,20 21,20 40,0');
    }

    // box
    var boxBase = self.boxesContainer.target
    .append('rect')
    .attr('data-arrow', classname)
    .attr('x', self.xScale(xPos))
    .attr('y', self.yScale(yPos))
    .attr('width', self.box.width)
    .attr('height', self.box.height)
    .attr('id', box.name)
    .on('mouseover', function() {
      self.highlightNav(box.name, true);
    })
    .on('mouseout', function() {
      self.highlightNav(box.name, false);
    })
    .on('click', function() {
      d3.event.stopPropagation();
      self.toggleNavList(box.name);
    });

    if (box.status) {
      boxBase.attr('class', classname);
    } else {
      boxBase.attr('style', 'fill: url(#_PATTERN_' + box.name + ')').attr('class', 'box');
    }

    // status box
    self.boxesContainer.target
    .append('rect')
    .attr('x', self.xScale(xPos + self.box.width - self.box.height))
    .attr('y', self.yScale(yPos))
    .attr('width', self.box.height)
    .attr('height', self.box.height)
    .style('fill', function() {
      if (!box.hasOwnProperty('status')) {
        return 'url(#STATUS_OPEN)';
      }
      return box.status ? 'url(#STATUS_COMPLETE)' : 'url(#STATUS_OPEN)';
    });

    var boxName = box.name.toLowerCase();
    boxName = boxName.replace(new RegExp('_', 'g'), ' ');

    // text
    self.boxesContainer.target
    .append('text')
    .attr('x', self.xScale(xPos) + (self.svg.perUnit / 2))
    .attr('y', self.yScale(yPos) + (self.svg.perUnit / 1.3))
    .attr('fill', '#FFFFFF')
    .text(boxName)
    .on('mouseover', function() {
      self.highlightNav(box.name, true);
    })
    .on('mouseout', function() {
      self.highlightNav(box.name, false);
    })
    .on('click', function() {
      d3.event.stopPropagation();
      self.toggleNavList(box.name);
    });
  },
  drawBoxs: function() {
    var self = this;
    var boxes = self.boxes;
    d3.map(boxes, function(row, rowIndex) {
      var lastNodePos = { x: 0, y: 0 };
      var nodePos = lastNodePos;
      d3.map(row, function(col, colIndex) {
        if (typeof col !== 'object') {
          return;
        }
        if (col.name === 'EXTERNAL' || col.name === 'DOWN_STREAM') {
          return;
        }
        var nodeOffset = 0;
        if (self.targets.nodes.hasOwnProperty(col.name)) {
          nodeOffset = self.targets.nodes[col.name].length * self.svg.perUnit;
        }
        nodePos.x += (colIndex === 0) ? nodeOffset : self.box.width + nodeOffset;
        if (rowIndex === 0 && colIndex === 0) {
          nodePos.y = 0;
        } else {
          nodePos.y = self.boxLastPos.y + (nodeOffset / 2);
        }
        self.boxLastPos.y = nodePos.y + self.svg.perUnit;
        self.drawBox(col, nodePos.x, nodePos.y);
      });
    });
  },
  drawLine: function(path, color) {
    var self = this;
    var line = d3.svg.line()
    .x(function(d) {
      return d.x;
    })
    .y(function(d) {
      return d.y;
    })
    .interpolate('linear');
    var classname = 'line ';
    classname += color ? color + '-line' : '';
    self.svg.target.select('#boxBase')
    .datum(path)
    .append('path')
    .attr('class', classname)
    .attr('d', line)
    .attr('marker-end', function() {
      return color ? 'url(#' + color + ')' : 'url(#svg-default)';
    });
  },
  drawLines: function() {
    var self = this;
    var targetNodes = self.targets.nodes;
    var getTargets = function(target) {
      for (var key in target) {
        if (target[key]) {
          sourceEle = document.getElementById(target[key]);
          srcPos.x = parseFloat(sourceEle.getAttribute('x')) + (self.box.width + (self.svg.perUnit / 4));
          srcPos.y = parseFloat(sourceEle.getAttribute('y')) + (self.svg.perUnit / 2);
          trgPos.x = srcPos.x;
          trgPos.y = self.svg.height;
          self.drawLine([ srcPos, trgPos ]);
        }
      }
    };
    var getBoxs = function(targetId, index) {
      var color = '';
      srcPos.x = parseFloat(sourceEle.getAttribute('x')) - (index * (self.svg.perUnit / 2));
      srcPos.y = parseFloat(sourceEle.getAttribute('y')) +
        (self.svg.perUnit / 2) - (index * (self.svg.perUnit / 2));
      if (targetId === 'DOWN_STREAM') {
        console.log(srcPos.x);
        srcPos.y -= (targetIds.length * (self.svg.perUnit / 2));
        trgPos.x = 0;
        trgPos.y = self.svg.height;
      } else if (targetId === 'EXTERNAL') {
        trgPos.x = srcPos.x - (self.svg.perUnit / 2);
        trgPos.y = -(self.svg.perUnit / 2);
      } else {
        targetEle = document.getElementById(targetId);
        trgPos.x = parseFloat(targetEle.getAttribute('x')) + self.box.width;
        trgPos.y = parseFloat(targetEle.getAttribute('y')) + (self.svg.perUnit / 2);
        color = targetEle.getAttribute('data-arrow').split(' ')[1];
      }
      interBot = {
        x: parseFloat(srcPos.x) - (self.svg.perUnit / 2),
        y: srcPos.y
      };
      interTop = {
        x: parseFloat(interBot.x),
        y: parseFloat(trgPos.y)
      };
      self.drawLine([ trgPos, interTop, interBot, srcPos ], color);
    };
    for (var target in targetNodes) {
      if (targetNodes[target]) {
        var sourceId = target;
        var targetIds = targetNodes[target];
        var srcPos = { x: 0, y: 0 };
        var trgPos = { x: 0, y: 0 };
        var interBot = { x: 0, y: 0 };
        var interTop = { x: 0, y: 0 };
        var sourceEle = null;
        var targetEle = null;
        if (target === 'sourceOutcomes') {
          d3.map(targetIds, getTargets);
          return;
        }
        sourceEle = document.getElementById(sourceId);
        d3.map(targetIds, getBoxs);
      }
    }
  },
  init: function() {
    var self = this;
    self.svg.width = document.getElementById(self.svg.parentId.slice(1)).offsetWidth;
    self.computeBoxes(); // compute given object to array of boxes
    self.computeTargetNodes(); // compute target nodes
    self.countTargetNodes(); // count targets nodes
    self.computeBoxDimentions(); // compute box width and height

    self.appendSvg(); // append svg element to target element
    self.prepareMarkers();
    self.prepareStatusElements();
    self.appendBoxesContainer(); // append box base to svg
  },
  reset: function() {
    var self = this;
    var chart = document.getElementById(self.svg.parentId.slice(1));
    if (chart.firstChild) {
      chart.removeChild(chart.firstChild);
    }
    self.svg.target = null;
    self.boxesContainer.target = null;
    self.lineMarkers.nodes = {};
    self.box.width = 0;
    self.box.height = 0;
    self.boxLastPos.x = 0;
    self.boxLastPos.y = 0;
    self.targets.nodes = {};
    self.targets.count = 0;
    self.nodeChildren = [];
    self.boxes = [];
    self.maxRowIndex = 0;
  },
  draw: function(rootNode) {
    var self = this;
    if (!rootNode || !rootNode.hasOwnProperty('children')) {
      console.error('Please provide valid data');
      return;
    }
    self.nodeChildren = rootNode.children;
    self.init();
    self.drawHeader(rootNode.header); // draw chart header
    self.drawBoxs();
    self.drawLines();
  },
  highlightNav: function(id, status) {
    RoadmapNav.highlightList(id, status);
  },
  highlightNode: function(id, status) {
    var nodeId = id.replace('_LIST_', '');
    var node = document.getElementById(nodeId);
    if (node) {
      if (status) {
        node.classList.add('highlight');
      } else {
        node.classList.remove('highlight');
      }
    }
  },
  toggleNavList: function(id) {
    RoadmapNav.toggleNavList(id);
  }
};
