/*global $:false, document:false, RoadmapChart:false */
var RoadmapNav = {
  data: null,
  rootNode: null,
  parentId: 'RoadmapNav',
  idPrefix: '_LIST_',
  nodes: {},
  breadcrumb: [
    'SAFE Network'
  ],
  capitalize: function(text) {
    text = text.toLowerCase();
    text = text[0].toUpperCase() + text.slice(1);
    return text;
  },
  createEle: function(node, parent) {
    var self = this;
    var nodeName = node.name;
    nodeName = nodeName.replace(new RegExp('_', 'g'), ' ');
    var child = document.createElement('div');
    var childId = self.idPrefix + node.name;
    child.innerHTML = self.capitalize(nodeName);
    child.setAttribute('id', childId);
    child.classList.add('listBase');
    child.onclick = function(e) {
      e.stopPropagation();
      self.showChart(childId);
    };
    child.onmouseover = function(e) {
      e.stopPropagation();
      self.highlightNode(childId, true);
    };
    child.onmouseout = function(e) {
      e.stopPropagation();
      self.highlightNode(childId, false);
    };
    self.nodes[childId] = node;
    if (node.hasOwnProperty('color')) {
      child.classList.add('list-' + node.color);
    }
    if (node.hasOwnProperty('children')) {
      node.children.forEach(function(val) {
        self.parseObject(val, child);
      });
    }
    parent.appendChild(child);
    parent.classList.add('listClose');
    self.rootNode = child;
  },
  parseObject: function(node, parent) {
    var self = this;
    if (node.name === 'EXTERNAL' || node.name === 'DOWN_STREAM') {
      return;
    }
    if (typeof node === 'object') {
      self.createEle(node, parent);
    }
  },
  showChart: function(id) {
    var self = this;
    var ele = $('#' + id);
    var data = self.nodes[id];
    var nodeName = self.capitalize(data.name);

    var reset = function() {
      var siblings = ele.siblings();
      for (var i = 0; i < siblings.length; i++) {
        $(siblings[i]).addClass('listClose');
      }
    };

    if (!data.hasOwnProperty('children')) {
      return;
    }

    RoadmapChart.reset();
    if (!ele.hasClass('listClose')) {
      ele.addClass('listClose');
      var parentId = ele.parent().attr('id');
      if (self.nodes.hasOwnProperty(parentId)) {
        var parentName = self.capitalize(self.nodes[parentId].name);
        self.setHeader(parentName, self.nodes[parentId].desc);
        self.updateBreadcrumb(parentId);
        RoadmapChart.draw(self.nodes[parentId]);
        return;
      }
      self.rootNode.click();
      return;
    } else {
      self.setHeader(nodeName, data.desc);
      ele.removeClass('listClose');
      reset();
      self.updateBreadcrumb(id);
      RoadmapChart.draw(data);
    }
  },
  setHeader: function(title, desc) {
    $('#RoadmapTitle').text(title);
    $('#RoadmapDesc').text(desc);
  },
  highlightList: function(id, status) {
    var ele = $('#_LIST_' + id);
    return status ? ele.addClass('highlight') : ele.removeClass('highlight');
  },
  highlightNode: function(id, status) {
    RoadmapChart.highlightNode(id, status);
  },
  toggleNavList: function(id) {
    var self = this;
    self.highlightList(id, false);
    self.showChart('_LIST_' + id);
  },
  updateBreadcrumb: function(id) {
    var self = this;
    var targetEle = $('#RoadmapBreadcrumb');
    var tempBread = [];
    var updateParent = function(childId) {
      var childName = self.nodes[childId].name;
      tempBread.push(self.capitalize(childName));
      var parentEle = self.getParentEle(childName);
      if (!parentEle) {
        return;
      }
      updateParent('_LIST_' + parentEle.name);
    };
    self.breadcrumb.splice(1);
    if (id) {
      updateParent(id);
    }
    self.breadcrumb = self.breadcrumb.concat(tempBread.reverse());
    targetEle.html('');
    self.breadcrumb.forEach(function(val) {
      targetEle.append('<span class="breadcrumb-i">' + val + '</span>');
    });
  },
  getParentEle: function(clientId) {
    var self = this;
    var parentNode = null;
    var addParent = function(node) {
      if (node.name === clientId) {
        parentNode = self.nodes[key];
      }
    };
    for (var key in self.nodes) {
      if (self.nodes[key].hasOwnProperty('children')) {
        self.nodes[key].children.forEach(addParent);
      }
    }
    return parentNode;
  },
  init: function(data) {
    var self = this;
    self.data = data;
    self.updateBreadcrumb(null);
    var parentEle = document.getElementById(self.parentId);
    self.parseObject(self.data, parentEle);
    parentEle.classList.remove('listClose');
    self.rootNode.click();
  }
};

// toggle roadmap header
var toggleRoadmapHeader = function() {
  $('#RoadmapTitle').on('click', function() {
    var target = $('#RoadmapHeader');
    if (target.hasClass('active')) {
      target.removeClass('active');
      return;
    }
    target.addClass('active');
  });
};

$(function() {
  toggleRoadmapHeader();
  $.get('data/roadmapData.json', function(data) {
    RoadmapNav.init(data);
  });
});
