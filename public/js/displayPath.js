var nodeObjects = {}
var lineObject = {}
var globalId = 0;
var GS = {};
var selectedNodeId = 1;

paper.setup('myCanvas');

function setRoot(id){
	nodeObjects[id].isRoot = true;
	return id;
}

function setNodeText(id, s){
	nodeObjects[id].text.content = s;
}

function setNodeLinkObject(o){
	nodeObjects[selectedNodeId].linkObject = o;
}

function setNodeLink(url){
	nodeObjects[selectedNodeId].link = url;
}

function getId(){
	return globalId += 1;
}

function setCenter(pos){
	GS.CENTER = pos;
	console.log(GS);
}

function createNode(x, y, r, c){
	var tempNode = new paper.Path.Circle(new paper.Point(x, y), r);
	tempNode.myId = getId();
	tempNode.onDoubleClick = function(event){
		if(paper.view.zoom != 1){
			paper.view.zoom = 1;
			paper.view.center = GS.CENTER;
		}else{
			paper.view.center = this.position;
			paper.view.zoom = 4;
		}
	}
	tempNode.text = new paper.PointText(new paper.Point(x-r-30, y+r+20));
	tempNode.fillColor = c;
	tempNode.lines = [];
	tempNode.myChildren = [];
	tempNode.myParents = [];
	nodeObjects[globalId] = tempNode;
	tempNode.isRoot = false;
	return globalId;
}

function createLine(p1, p2){
	var tempLine = new paper.Path.Line(p1.position, p2.position);
	tempLine.strokeColor = "red";
	tempLine.myId = getId();
	lineObject[tempLine.myId] = tempLine;
	lineObject[tempLine.myId].nodes = [p1, p2];
	return tempLine.myId;
}

function connectNode(id1, id2){
	var oParent = nodeObjects[id1];
	var oChild = nodeObjects[id2];
	oParent.myChildren.push(oChild);
	oChild.myParents.push(oParent);
	var line = createLine(oParent, oChild);
	oChild.lines.push(line);
	nodeObjects[id1].lines.push(line);
	nodeObjects[id2].lines.push(line);
}


var rootId;

function connectNodes(path){
	var keys = Object.keys(path);
	keys.forEach(function(key){
		if(key!="GS"){
			var node = path[key];
			node.children.forEach(function(child){
				connectNode(key, child);
			});
			setNodeText(key, path[key].link.title);
		}
	});
}


function decodeEncoded(encoded){
	// later loop through all and do it for each canvas
	var encodedObj = encoded[0];
	var path = JSON.parse(encodedObj.path);
	var keys = Object.keys(path);
	var prevNodeId = null;
	GS = path.GS;
	setCenter(paper.view.center);
	keys.forEach(function(key){
		var nodeInfo = path[key];
		if(nodeInfo.id===1){
			rootId = createNode(GS.ROOT_NODE_X, GS.ROOT_NODE_Y, GS.NODE_RADIUS, "red");
			nodeObjects[rootId].isRoot = true;
			prevNodeId = rootId;
		}else if(key!="GS") {
			var x = path[key].posRatio.x * paper.view.viewSize._width;
			var y = path[key].posRatio.y * paper.view.viewSize._height;
			connectNode(prevNodeId, prevNodeId = createNode(x, y, GS.NODE_RADIUS, "red"));
			paper.view.draw();
		}
	});
	paper.view.draw();
	connectNodes(path);
}
