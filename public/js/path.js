//one link is 2 nodes and a line between them
// each link is a group
// each node can be part of many links
// each line can be part of only one link
// each node has a text




var nodeObjects = {

}

var lineObject = {

}

var rootId = createNode(100, 150, 20, "red");

var selectedNode = null;



function setText(s){
	nodeObjects[selectedNode].text.content = s;
}

function removeNodeAndLine(node){
	var linesToRemove = nodeObjects[node.id].lines;
	for(var i = 0; i < linesToRemove.length; i++){
		lineObject[linesToRemove[i]].remove();
	}
	if(node.parent){
		//select(node.parent);
	}
	node.remove();
}

function createNode(x, y, r, c){
	var tempNode = new Path.Circle(new Point(x, y), r);

	tempNode.onDoubleClick = function(event){
		removeNodeAndLine(this);
	}
	tempNode.text = new PointText(new Point(x-r-10, y+r+10));
	tempNode.fillColor = c;
	tempNode.lines = [];
	nodeObjects[tempNode.id] = tempNode;
	return tempNode.id;
}

function createLine(p1, p2){
	var tempLine = new Path.Line(p1.position, p2.position);
	tempLine.strokeColor = "red";
	lineObject[tempLine.id] = tempLine;
	lineObject[tempLine.id].nodes = [p1, p2];
	return tempLine.id;
}

function connectNode(id1, id2){
	var o = nodeObjects[id2];
	o.parent = nodeObjects[id1];
	var line = createLine(nodeObjects[id1], o);
	o.lines.push(line);
	nodeObjects[id1].lines.push(line);
	nodeObjects[id2].lines.push(line);
}

function onMouseDrag(event){
	if(event.item && event.item.id == selectedNode){
		event.item.position += event.delta;
		event.item.text.position += event.delta;
		if(event.item.lines){
			var lines = event.item.lines;		
			for(var i = 0; i < lines.length; i++){
				var myLine = lineObject[lines[i]];
				myLine.segments = [myLine.nodes[0].position, myLine.nodes[1].position];
			}
		}		
	}
}

function select(node){
	if(selectedNode!=node.id){
		deselect();
	}
	node.fillColor = "blue";
	selectedNode = node.id;
}

function deselect(){
	// there was a bug here, selectedNode has a value that is not in nodeObjects
	if(nodeObjects[selectedNode]){
		nodeObjects[selectedNode].fillColor = "red";
		selectedNode = null;
	}
}

function onMouseDown(event){
	if(!event.item){
		if(selectedNode){
			connectNode(selectedNode, createNode(event.point.x, event.point.y, 20, "red"));
		}else{
			connectNode(rootId, createNode(event.point.x, event.point.y, 20, "red"));
		}
	}else if(event.item){
		select(event.item);
	}
}

$(document).ready(function(){
	var pathLink = $('#currentPathLink');
	pathLink.on('input change', function(e){
		var linkText = pathLink.val();
		setText(linkText);

	});
});