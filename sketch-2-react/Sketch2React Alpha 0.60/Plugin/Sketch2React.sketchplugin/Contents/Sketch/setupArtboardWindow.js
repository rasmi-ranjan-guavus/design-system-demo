var xsDropdown;
var dropdowns = {};

var getDropdownValue = function(key) {
    if(dropdowns[key]) {
        return dropdowns[key].titleOfSelectedItem();
    } else {
        return null;
    }
}

function createWindow(context, title) {

    var alert = COSAlertWindow.new();

    alert.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("sketch2react-app-icon.png").path()));
    alert.setMessageText(title)

    // Creating dialog buttons
    alert.addButtonWithTitle("Ok");
    alert.addButtonWithTitle("Cancel");

    // Creating the view
    var viewWidth = 500;
    var viewHeight = 150;

    var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight));
    alert.addAccessoryView(view);

    // Create and configure your inputs here

    // Create Info label
    var infoLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0,viewHeight-20,(viewWidth - 10),20));
    [infoLabel setBezeled:false];
    [infoLabel setDrawsBackground:false];
    [infoLabel setEditable:false];
    [infoLabel setSelectable:false];

    // Add label
    infoLabel.setStringValue("Please select artboard mode:");
    view.addSubview(infoLabel);    


    /* Create Info label
    var infoLabel2 = NSTextField.alloc().initWithFrame(NSMakeRect(0,viewHeight-37,(viewWidth - 10),20));
    [infoLabel2 setBezeled:false];
    [infoLabel2 setDrawsBackground:false];
    [infoLabel2 setEditable:false];
    [infoLabel2 setSelectable:false];

    // Add label
    infoLabel2.setStringValue("for more info about Bootstrap's breakpoints.");
    view.addSubview(infoLabel2);  
*/
    // Create XS selection

    // Create label
    var xsLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0,viewHeight-60,(viewWidth - 200),25));
    [xsLabel setBezeled:false];
    [xsLabel setDrawsBackground:false];
    [xsLabel setEditable:false];
    [xsLabel setSelectable:false];
    // Add label
    xsLabel.setStringValue("Artboard mode:");
    view.addSubview(xsLabel);    

    // Creating the input
    xsDropdown = NSPopUpButton.alloc().initWithFrame(NSMakeRect(100, viewHeight - 57, 100, 22));
    var names = ['Desktop','Mobile'];
    for(var i = 0; i < names.length; i++) {
        var name = names[i];
        [xsDropdown addItemWithTitle:name];
    }
    // Filling the PopUpButton with options    
    xsDropdown.selectItemAtIndex(0);
    dropdowns['artboardMode'] = xsDropdown;
    // Adding the PopUpButton to the dialog
    view.addSubview(xsDropdown);

    // Create SM selection

    // Show the dialog
    return [alert]
    
}