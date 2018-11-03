@import 'common.js';
@import 'window.js';
@import 'window2.js';
@import 'window3.js';

var window;
var window2;
var window3;
var dialogs = [];

var onRun = function(context) {
try{
  //reference the Sketch Document
  var doc = context.document;
  var selection = context.selection;
  var oc_artboard;
  var artboard;
  var sketch = context.api();
  //var Group = sketch.Group;

if(selection.count() == 0){
  doc.showMessage("Please select something.");
} else {
  for(var i = 0; i < selection.count(); i++){
    if(selection[i].class() == "MSArtboardGroup"){
      oc_artboard = selection[i];
    } 
  }
}

if(oc_artboard){
  sketch.selectedDocument.selectedPage.iterate(function(child){
      if(child.id == [oc_artboard objectID]){
        artboard = child; 
      }
      //artboard.newGroup({frame: new sketch.Rectangle(0, 0, 100, 100), name:"Test"});
  });

  if(artboard){ 
    window = createWindow1(context, 'Step 1. Grid size');
    window2 = createWindow2(context, 'Step 2. Column sizes');
    window3 = createWindow3(context, 'Step 3. Column margins and paddings');
    
    var dialog1 = window[0];
    var dialog2 = window2[0];
    var dialog3 = window3[0];
    var response, response2, response3;

    dialogs.push(dialog1);
    dialogs.push(dialog2);
    dialogs.push(dialog3);

    //var dialog2 = window2[0];
    //var dialog3 = window3[0];

    activeModal(0);

//    response = dialogs[2].runModal();

    /*if(response == '1000'){/*
      response2 = dialog2.runModal();

      if(response2 == '1000'){
        response3 = dialog3.runModal();

        if(response3 == '1000'){
          doc.showMessage('sjjsijisjij');
        }else if(response3 == '1001'){
          response2 = dialog2.runModal(); 
        }
      }else if(response2 == '1001'){
        response1 = dialog.runModal();
      }

      //var numberOfRows = getRowDropdownValue();
      //var numberOfCols = getColDropdownValue();

      //var newContainer = artboard.newGroup({frame: new sketch.Rectangle(0, 0, 100, 100), name:"🗄{container}"});
 /*
      for(var i = 0; i < numberOfRows; i++){
        var newRow = newContainer.newGroup({frame: new sketch.Rectangle(0, 0, 100, 100), name:"🚣‍{row}"});

        for(var j = 0; j < numberOfCols; j++){
          var newCol = newRow.newGroup({frame: new sketch.Rectangle(0, 0, 100, 100), name:"🗂{col} sm:12"});
        } 
      }
    }*/
  }
}else{
  doc.showMessage('Please select an artboard.');
}

function activeModal(index){
   var currentDialog = dialogs[index];

   if(currentDialog){
    var response = currentDialog.runModal();

    if(response == '1000'){
      if(index > 1)
        generateContent();
      else
        activeModal(++index);
    }else if(response == '1001'){
      activeModal(--index);
    }
  }
  //var currentActiveDialog = windows[index];
  //if(currentActiveDialog){
  //  currentActiveDialog.runModal();
  //}
}

function generateContent(){
  var numberOfRows = getRowDropdownValue();
  var numberOfCols = getColDropdownValue();
  var xs = getBreakpointDropdownValue('xs');  
  var sm = getBreakpointDropdownValue('sm');
  var md = getBreakpointDropdownValue('md');
  var lg = getBreakpointDropdownValue('lg');  
  var xl = getBreakpointDropdownValue('xl');

  var frame = [oc_artboard frame];
  var artboardWidth = [frame width];
  var numberOfGroups = xs;
  
  var currentNumberOfCols = 0;
  var xPos = 0;
  var yPos = 0;
  var colIndex = 0;

  if(artboardWidth > 576){
    if(sm != 'inherit')
      numberOfGroups = sm;
    if(md != 'inherit')
      numberOfGroups = md;
    if(lg != 'inherit')
      numberOfGroups = lg;
    if(xl != 'inherit')
      numberOfGroups = xl;
  }

  var colWidth = artboardWidth*(numberOfGroups/12);  
  var newContainer = artboard.newGroup({frame: new sketch.Rectangle(0, 0, artboardWidth, 1), name:"🗄{container}"});

  for(var i = 0; i < numberOfRows; i++){
    var newRow = newContainer.newGroup({frame: new sketch.Rectangle(0, 0, artboardWidth, 1), name:"🚣‍{row}"});

    for(var j = 0; j < numberOfCols; j++){
      currentNumberOfCols += parseInt(numberOfGroups,10);
             // alert('aoj', currentNumberOfCols);
    
                xPos = colIndex*colWidth;

      //alert('i', i + ' ' + currentNumberOfCols + ' xPos: ' + xPos + ' yPos: ' + yPos);
    

      if(currentNumberOfCols > 12){
        //alert('resetting xPos', currentNumberOfCols);
        xPos = 0;
        yPos += 100;
        currentNumberOfCols = 0;
        colIndex = 0;
        //alert('inside','soh');
      }else{
        //alert('else clause: ', 'xPos:' + xPos + ' colIndex: ' + colIndex + ' colWidth: ' + colWidth);
        if((xPos + colWidth) > artboardWidth){
          yPos += 100;
          xPos = 0; 
          currentNumberOfCols = 0;
          colIndex = 0;
        }
      }

      //alert('Position', 'xPos:' + xPos + ' yPos: ' + yPos);

      var newCol = newRow.newGroup({frame: new sketch.Rectangle(xPos, yPos, colWidth, 100), name:"🗂{col}" + " " + getBreakpointString() + " " + getMarginPaddingString()});
      colIndex++;
    }
  }
}

function success(){
}

function fail(){
  doc.showMessage('fail');
}

  }catch(e){
    alert('Oh no!', e);
  }
}