var RoadmapNav = {
  data: null,
  parentId: 'RoadmapNav',
  idPrefix: "_LIST_",
  nodes: {},
  capitalize: function(text) {
    text = text.toLowerCase();
    text = text[0].toUpperCase() + text.slice(1);
    return text;
  },
  createEle: function(node, parent) {
    var self = this;
    var child = document.createElement('div');
    var childId = self.idPrefix + node.name;
    child.innerHTML = self.capitalize(node.name);
    child.setAttribute('id', childId);
    child.classList.add('listBase');
    child.onclick = function(e) { e.stopPropagation(); self.showChart(childId)};
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
    var reset = function() {
      var siblings = ele.siblings();
      for(var i=0; i<siblings.length; i++) {
        $(siblings[i]).addClass('listClose');
      }
    };
    if(!data.hasOwnProperty('children')) {
      return;
    }
    RoadmapChart.reset();
    if(!ele.hasClass('listClose')) {
      ele.addClass('listClose');
      RoadmapChart.reset();
      var parentId = ele.parent().attr('id');
      if (self.nodes.hasOwnProperty(parentId)) {
        RoadmapChart.draw(self.nodes[parentId]);
      }
    } else {
      ele.removeClass('listClose');
      reset();
      RoadmapChart.draw(data);
    }
  },
  highlightList: function(id, status) {
    var ele = $('#_LIST_'+id);
    status ? ele.addClass('highlight') : ele.removeClass('highlight');
  },
  toggleNavList: function(id) {
    var self = this;
    self.highlightList(id, false)
    self.showChart('_LIST_'+id);
  },
  init: function(data) {
    var self = this;
    self.data = data;
    var parentEle = document.getElementById(self.parentId);
    self.parseObject(self.data, parentEle);
  }
};
$(function() {
  $.get('js/roadmap/data.json', function(data) {
    // var chartData = JSON.parse(data);
    RoadmapNav.init(data);
    // console.log(RoadmapNav);
    RoadmapChart.draw(data);
  });
});
