var xsDropdown;
var smDropdown;
var mdDropdown;
var lgDropdown;
var xlDropdown;
var dropdowns = {};


var getBreakpointDropdownValue = function(breakpoint) {
    if(dropdowns[breakpoint]) {
        return dropdowns[breakpoint].titleOfSelectedItem();
    } else {
        return null;
    }
}

var getBreakpointString = function() {
    var bp = '';

    if(dropdowns['xs'].titleOfSelectedItem() != 'inherit')
        bp += 'xs:' + dropdowns['xs'].titleOfSelectedItem() + ' ';
    if(dropdowns['sm'].titleOfSelectedItem() != 'inherit')
        bp += 'sm:' + dropdowns['sm'].titleOfSelectedItem() + ' ';
    if(dropdowns['md'].titleOfSelectedItem() != 'inherit')
        bp += 'md:' + dropdowns['md'].titleOfSelectedItem() + ' ';
    if(dropdowns['lg'].titleOfSelectedItem() != 'inherit')
        bp += 'lg:' + dropdowns['lg'].titleOfSelectedItem() + ' ';
    if(dropdowns['xl'].titleOfSelectedItem() != 'inherit')
        bp += 'xl:' + dropdowns['xl'].titleOfSelectedItem() + ' ';    
    return bp;
}

function createWindow2(context, title) {

    var alert = COSAlertWindow.new();

    alert.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("sketch2react-app-icon.png").path()));
    alert.setMessageText(title)

    // Creating dialog buttons
    alert.addButtonWithTitle("Next");
    alert.addButtonWithTitle("Previous");

    // Creating the view
    var viewWidth = 500;
    var viewHeight = 200;

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
    infoLabel.setStringValue("Please visit sketch2react.io/docs/cheatsheet.php");
    view.addSubview(infoLabel);    


    // Create Info label
    var infoLabel2 = NSTextField.alloc().initWithFrame(NSMakeRect(0,viewHeight-37,(viewWidth - 10),20));
    [infoLabel2 setBezeled:false];
    [infoLabel2 setDrawsBackground:false];
    [infoLabel2 setEditable:false];
    [infoLabel2 setSelectable:false];

    // Add label
    infoLabel2.setStringValue("for more info about Bootstrap's breakpoints.");
    view.addSubview(infoLabel2);  

    // Create XS selection

    // Create label
    var xsLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0,viewHeight-85,(viewWidth - 200),25));
    [xsLabel setBezeled:false];
    [xsLabel setDrawsBackground:false];
    [xsLabel setEditable:false];
    [xsLabel setSelectable:false];
    // Add label
    xsLabel.setStringValue("X-small (xs):");
    view.addSubview(xsLabel);    

    // Creating the input
    xsDropdown = NSPopUpButton.alloc().initWithFrame(NSMakeRect(125, viewHeight - 82, 80, 22));
    var names = ['1','2','3','4','5','6','7','8','9','10','11','12'];
    for(var i = 0; i < names.length; i++) {
        var name = names[i];
        [xsDropdown addItemWithTitle:name];
    }
    // Filling the PopUpButton with options    
    xsDropdown.selectItemAtIndex(names.length-1);
    dropdowns['xs'] = xsDropdown;
    // Adding the PopUpButton to the dialog
    view.addSubview(xsDropdown);

    // Create SM selection

    // Create label
    var smLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0,viewHeight-115,(viewWidth - 200),25));
    [smLabel setBezeled:false];
    [smLabel setDrawsBackground:false];
    [smLabel setEditable:false];
    [smLabel setSelectable:false];
    // Add label
    smLabel.setStringValue("Small (sm):");
    view.addSubview(smLabel);    

    // Creating the input
    smDropdown = NSPopUpButton.alloc().initWithFrame(NSMakeRect(125, viewHeight - 110, 80, 22));
    var names = ['inherit','1','2','3','4','5','6','7','8','9','10','11','12'];
    for(var i = 0; i < names.length; i++) {
        var name = names[i];
        [smDropdown addItemWithTitle:name];
    }
    // Filling the PopUpButton with options    
    smDropdown.selectItemAtIndex(0);
    dropdowns['sm'] = smDropdown;
    // Adding the PopUpButton to the dialog
    view.addSubview(smDropdown);


    // Create MD selection 

    // Create and configure your inputs here
    // Create label
    var mdLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0,viewHeight-145,(viewWidth - 100),25));
    [mdLabel setBezeled:false];
    [mdLabel setDrawsBackground:false];
    [mdLabel setEditable:false];
    [mdLabel setSelectable:false];
    // Add label
    mdLabel.setStringValue("Medium (md):");
    view.addSubview(mdLabel);    

    // Creating the input
    mdDropdown = NSPopUpButton.alloc().initWithFrame(NSMakeRect(125, viewHeight - 140, 80, 22));
    var names = ['inherit','1','2','3','4','5','6','7','8','9','10','11','12'];
    for(var i = 0; i < names.length; i++) {
        var name = names[i];
        [mdDropdown addItemWithTitle:name];
    }
    // Filling the PopUpButton with options    
    mdDropdown.selectItemAtIndex(0);
    dropdowns['md'] = mdDropdown;
    // Adding the PopUpButton to the dialog
    view.addSubview(mdDropdown);


    // Create LG selection 

    // Create and configure your inputs here
    // Create label
    var lgLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0,viewHeight-175,(viewWidth - 100),25));
    [lgLabel setBezeled:false];
    [lgLabel setDrawsBackground:false];
    [lgLabel setEditable:false];
    [lgLabel setSelectable:false];
    // Add label
    lgLabel.setStringValue("Large (lg):");
    view.addSubview(lgLabel);    

    // Creating the input
    lgDropdown = NSPopUpButton.alloc().initWithFrame(NSMakeRect(125, viewHeight - 170, 80, 22));
    var names = ['inherit','1','2','3','4','5','6','7','8','9','10','11','12'];
    for(var i = 0; i < names.length; i++) {
        var name = names[i];
        [lgDropdown addItemWithTitle:name];
    }
    // Filling the PopUpButton with options
    lgDropdown.selectItemAtIndex(0);
    dropdowns['lg'] = lgDropdown;
    // Adding the PopUpButton to the dialog
    view.addSubview(lgDropdown);     


    // Create XL selection 

    // Create and configure your inputs here
    // Create label
    var xlLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0,viewHeight-205,(viewWidth - 100),25));
    [xlLabel setBezeled:false];
    [xlLabel setDrawsBackground:false];
    [xlLabel setEditable:false];
    [xlLabel setSelectable:false];
    // Add label
    xlLabel.setStringValue("X-large (xl):");
    view.addSubview(xlLabel);    

    // Creating the input
    xlDropdown = NSPopUpButton.alloc().initWithFrame(NSMakeRect(125, viewHeight - 200, 80, 22));
    var names = ['inherit','1','2','3','4','5','6','7','8','9','10','11','12'];
    for(var i = 0; i < names.length; i++) {
        var name = names[i];
        [xlDropdown addItemWithTitle:name];
    }
    // Filling the PopUpButton with options
    xlDropdown.selectItemAtIndex(0);
    dropdowns['xl'] = xlDropdown;
    // Adding the PopUpButton to the dialog
    view.addSubview(xlDropdown);   

    // Show the dialog
    return [alert]
    
}