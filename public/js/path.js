//one link is 2 nodes and a line between them
// each link is a group
// each node can be part of many links
// each line can be part of only one link
// each node has a text

// format for full graph



var nodeObjects = {

}

var lineObject = {

}

var globalId = 0;

var rootId = setRoot(createNode(100, 150, 20, "red"));

var selectedNodeId = 1;


function getPercenDimen(x, y){
	console.log(view.viewSize);
}

function setRoot(id){
	nodeObjects[id].isRoot = true;
	return id;
}

function setText(s){
	nodeObjects[selectedNodeId].text.content = s;
	view.draw();
}

function setLinkObject(o){
	nodeObjects[selectedNodeId].linkObject = o;
}

function removeNodeAndLine(node){
	var linesToRemove = nodeObjects[node.myId].lines;
	for(var i = 0; i < linesToRemove.length; i++){
		lineObject[linesToRemove[i]].remove();
	}

	if(node.myParent){
		var i = node.myParent.myChild.indexOf(node)
		if(i!=-1){
			node.myParent.myChild.splice(i, 1);
		}
		select(node.myParent);
	}
	node.text.remove();
	node.remove();
}

function getId(){
	return globalId+=1;
}

function createNode(x, y, r, c){
	var tempNode = new Path.Circle(new Point(x, y), r);
	tempNode.myId = getId();
	tempNode.onDoubleClick = function(event){
		if(!this.myChild.length && !this.isRoot)
			removeNodeAndLine(this);
	}
	tempNode.text = new PointText(new Point(x-r-30, y+r+20));
	tempNode.fillColor = c;
	tempNode.lines = [];
	tempNode.myChild = [];
	nodeObjects[globalId] = tempNode;
	tempNode.isRoot = false;
	return globalId;
}

function createLine(p1, p2){
	var tempLine = new Path.Line(p1.position, p2.position);
	tempLine.strokeColor = "red";
	tempLine.myId = getId();
	lineObject[tempLine.myId] = tempLine;
	lineObject[tempLine.myId].nodes = [p1, p2];
	return tempLine.myId;
}

function connectNode(id1, id2){
	var oParent = nodeObjects[id1];
	var oChild = nodeObjects[id2];
	oParent.myChild.push(oChild);	
	oChild.myParent = oParent;
	var line = createLine(oParent, oChild);
	oChild.lines.push(line);
	nodeObjects[id1].lines.push(line);
	nodeObjects[id2].lines.push(line);
}

function onMouseDrag(event){
	if(event.item && event.item.myId == selectedNodeId){
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
	if(selectedNodeId != node.myId){
		deselect();
	}
	node.fillColor = "blue";
	selectedNodeId = node.myId;
}

function deselect(){
	// there was a bug here, selectedNodeId has a value that is not in nodeObjects
	if(nodeObjects[selectedNodeId]){
		nodeObjects[selectedNodeId].fillColor = "red";
		selectedNodeId = null;
	}
}

function onMouseDown(event){
	// console.log(event.event.button); maybe can use to distinguish right and left click
	if(!event.item){
		if(selectedNodeId){
			connectNode(selectedNodeId, createNode(event.point.x, event.point.y, 20, "red"));
		}else{
			connectNode(rootId, createNode(event.point.x, event.point.y, 20, "red"));
		}
	}else if(event.item){
		select(event.item);
	}
}

function isConnected(id1, id2){
	var o1 = nodeObjects[id1];
	var o2 = nodeObjects[id2];
	if(o1.myParent){
		if(o1.myParent.myId === id2){
			return true;
		}
	}
	if(o2.myParent){
		if(o2.myParent.myId === id1){
			return true;
		}
	}
	return false;
}

$(document).ready(function(){
	var pathLink = $('#currentPathLink');
	pathLink.on('input change', function(e){
		var linkText = pathLink.val();
		setText(linkText);

	});

		var links = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		remote:{
			url:'/api/link-search/?q=%QUERY',
			wildcard: '%QUERY'
		}
	});
	$('.path-search').typeahead(null,{
		name: 'link-search',
		display: 'title',
		source: links
	}).on('typeahead:selected typeahead:autocompleted', function($e, datum){
		setText(datum.title);
		setLinkObject(datum._id);
		getPercenDimen(12,12);
	});
});