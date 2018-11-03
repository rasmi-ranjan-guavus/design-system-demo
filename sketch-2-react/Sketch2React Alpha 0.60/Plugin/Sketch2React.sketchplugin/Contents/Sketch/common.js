function alert(title, message){
  var app = [NSApplication sharedApplication];
  [app displayDialog:message withTitle:title];
}

function debugLayerTypes(artboard){
  var layers = [artboard layers];
  var ret = "";

  for(var i = 0; i < layers.count(); i++){
    ret += layers[i].class() + "  ";
  }

  alert('Layer types', ret);
}

function debugLayerNames(artboard){
  var layers = [artboard layers];
  var ret = "";

  for(var i = 0; i < layers.count(); i++){
    ret += layers[i].name() + "  ";
  }

  alert('Layer names', ret);
}