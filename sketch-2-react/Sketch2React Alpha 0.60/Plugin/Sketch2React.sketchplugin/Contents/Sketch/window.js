var colDropdown;
var rowDropdown;

var getRowDropdownValue = function() {
    if(rowDropdown) {
        return rowDropdown.titleOfSelectedItem();
    } else {
        return null;
    }
}

var getColDropdownValue = function() {
    if(colDropdown) {
        return colDropdown.titleOfSelectedItem();
    } else {
        return null;
    }
}

function createWindow1(context, title) {

    var alert = COSAlertWindow.new();

    alert.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("sketch2react-app-icon.png").path()));
    alert.setMessageText(title)

    // Creating dialog buttons
    alert.addButtonWithTitle("Next");
    alert.addButtonWithTitle("Cancel");

    // Creating the view
    var viewWidth = 300;
    var viewHeight = 100;

    var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight));
    alert.addAccessoryView(view);

    // Create and configure your inputs here


    // Create Row selection

    // Create label
    var rowLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0,viewHeight-25,(viewWidth - 200),25));
    [rowLabel setBezeled:false];
    [rowLabel setDrawsBackground:false];
    [rowLabel setEditable:false];
    [rowLabel setSelectable:false];
    // Add label
    rowLabel.setStringValue("Number of rows");
    view.addSubview(rowLabel);    

    // Creating the input
    rowDropdown = NSPopUpButton.alloc().initWithFrame(NSMakeRect(125, viewHeight - 22, 80, 22));
    var names = ['1','2','3','4','5'];
    for(var i = 0; i < names.length; i++) {
        var name = names[i];
        [rowDropdown addItemWithTitle:name];
    }
    // Filling the PopUpButton with options    
    rowDropdown.selectItemAtIndex(0);
    // Adding the PopUpButton to the dialog
    view.addSubview(rowDropdown);


    // Create Col selection 

    // Create and configure your inputs here
    // Create label
    var colLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0,viewHeight-55,(viewWidth - 100),25));
    [colLabel setBezeled:false];
    [colLabel setDrawsBackground:false];
    [colLabel setEditable:false];
    [colLabel setSelectable:false];
    // Add label
    colLabel.setStringValue("Number of columns");
    view.addSubview(colLabel);    

    // Creating the input
    colDropdown = NSPopUpButton.alloc().initWithFrame(NSMakeRect(125, viewHeight - 50, 80, 22));
    var names = ['1','2','3','4','5','6','7','8','9','10','11','12'];
    for(var i = 0; i < names.length; i++) {
        var name = names[i];
        [colDropdown addItemWithTitle:name];
    }
    // Filling the PopUpButton with options    
    colDropdown.selectItemAtIndex(0);
    // Adding the PopUpButton to the dialog
    view.addSubview(colDropdown);    

    // Show the dialog
    return [alert]
    
}