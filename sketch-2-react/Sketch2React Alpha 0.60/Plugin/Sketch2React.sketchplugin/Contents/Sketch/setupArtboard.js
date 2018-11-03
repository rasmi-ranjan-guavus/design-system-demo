@import 'common.js';
@import 'setupArtboardWindow.js';

var dialogs = [];
var MAX_INDEX = 0;

var onRun = function(context) {
try{
  var doc = context.document;

    var window = createWindow(context, 'Setup artboard');
    var dialog = window[0];
    //var response;

    dialogs.push(dialog);

    activeModal(0);
  

  //alert('osj',sketch.selectedDocument.selectedPage.iterate);
/*
  sketch.selectedDocument.selectedPage.iterate(function(child){
      //alert('aaa', child);
      //artboard.newGroup({frame: new sketch.Rectangle(0, 0, 100, 100), name:"Test"});
  });
*/


function activeModal(index){
   var currentDialog = dialogs[index];

   if(currentDialog){
    var response = currentDialog.runModal();

    if(response == '1000'){
      if(index == MAX_INDEX)
        generateArtboard();
      else
        activeModal(++index);
    }else if(response == '1001'){
      activeModal(--index);
    }
  }
}

function generateArtboard(){

  var mode = getDropdownValue('artboardMode');
  var totalGridWidth = (mode == 'Desktop') ? 1140 : 576;
  var isGuttersOutside = (mode == 'Desktop') ? true : false;

  //alert('aok', mode + ' ' + totalGridWidth + ' ' + isGuttersOutside);

  var currentPage = [doc currentPage];
  [currentPage setName:'Start here'];

  var artboard = [MSArtboardGroup new]
  [artboard setName:'Start']

  var frame = [artboard frame]
  [frame setX:0]
  [frame setY:0]
  [frame setWidth:totalGridWidth]
  [frame setHeight:1200]
  [[doc currentPage] addLayer:artboard]

  artboard.layout = MSDefaultLayoutGrid.defaultLayout();
  var layoutGrid = artboard.layout(); // class: MSLayoutGrid

  layoutGrid.setTotalWidth(totalGridWidth);
  layoutGrid.setNumberOfColumns(12);
  layoutGrid.setGutterWidth(15);
  layoutGrid.setGuttersOutside(isGuttersOutside);
  layoutGrid.determineAppropriateColumnWidth();

}

  }catch(e){
    alert('Oh no!', e);
  }
}