//var colDropdown;
//var rowDropdown;
var mtInput;
var mbInput;
var ptInput;
var pbInput;
var plInput;
var prInput;

var mp = {};

var getMarginPaddingValue = function(key) {
    if(mp[key]) {
        return mp[key].stringValue();
    } else {
        return null;
    }
}

var getMarginPaddingString = function() {
    var ret = '[';

    if(mp['mt'].stringValue() != '0')
        ret += 'mt' + mp['mt'].stringValue() + ' ';
    if(mp['mb'].stringValue() != '0')
        ret += 'mb' + mp['mb'].stringValue() + ' ';
    if(mp['pt'].stringValue() != '0')
        ret += 'pt' + mp['pt'].stringValue() + ' ';
    if(mp['pb'].stringValue() != '0') 
        ret += 'pb' + mp['pb'].stringValue() + ' ';
    if(mp['pl'].stringValue() != '0')
        ret += 'pl' + mp['pl'].stringValue() + ' ';
    if(mp['pr'].stringValue() != '0')
        ret += 'pr' + mp['pr'].stringValue() + ' ';   

    ret.trim();
    ret += ']';
    return ret;
}
/*
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
*/

function createWindow3(context, title) {

    var alert = COSAlertWindow.new();

    alert.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("sketch2react-app-icon.png").path()));
    alert.setMessageText(title)

    // Creating dialog buttons
    alert.addButtonWithTitle("Finish");
    alert.addButtonWithTitle("Previous");

    // Creating the view
    var viewWidth = 300;
    var viewHeight = 300;

    var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight));
    alert.addAccessoryView(view);

    // Create and configure your inputs here
    var marginsBox = NSBox.alloc().initWithFrame(NSMakeRect(0,viewHeight-280,(viewWidth - 10),280));
    [marginsBox setBorderType:NSBezelBorder];
    [marginsBox setTitle:@"Margins"];
    view.addSubview(marginsBox);

    var paddingsBox = NSBox.alloc().initWithFrame(NSMakeRect(0,viewHeight-252,(viewWidth - 10),220));
    [paddingsBox setBorderType:NSBezelBorder];
    [paddingsBox setTitle:@"Paddings"];
    view.addSubview(paddingsBox);


    var contentBox = NSBox.alloc().initWithFrame(NSMakeRect(60,90,(viewWidth - 140),135));
    [contentBox setBorderType:NSBezelBorder];
    [contentBox setTitle:@""];
    view.addSubview(contentBox);
// MARGIN TOP

    // Create input field
    mtInput = NSTextField.alloc().initWithFrame(NSMakeRect(115,viewHeight-40,(viewWidth - 270),20));
    [mtInput setBezeled:true];
    [mtInput setDrawsBackground:true];
    [mtInput setEditable:true];
    [mtInput setSelectable:true];
    // Add label
    mtInput.setStringValue("0");

    view.addSubview(mtInput); 

    // Create label
    var mtLabel = NSTextField.alloc().initWithFrame(NSMakeRect(145,viewHeight-42,(viewWidth-280),20));
    [mtLabel setBezeled:false];
    [mtLabel setDrawsBackground:false];
    [mtLabel setEditable:false];
    [mtLabel setSelectable:false];
    // Add label
    mtLabel.setStringValue("px");
    mp['mt'] = mtInput;
    view.addSubview(mtLabel);    

// MARGIN BOTTOM

    // Create input field
    mbInput = NSTextField.alloc().initWithFrame(NSMakeRect(115,viewHeight-272,(viewWidth - 270),20));
    [mbInput setBezeled:true];
    [mbInput setDrawsBackground:true];
    [mbInput setEditable:true];
    [mbInput setSelectable:true];
    // Add label
    mbInput.setStringValue("0");
    mp['mb'] = mbInput;
    view.addSubview(mbInput); 

    // Create label
    var mbLabel = NSTextField.alloc().initWithFrame(NSMakeRect(145,viewHeight-274,(viewWidth-280),20));
    [mbLabel setBezeled:false];
    [mbLabel setDrawsBackground:false];
    [mbLabel setEditable:false];
    [mbLabel setSelectable:false];
    // Add label
    mbLabel.setStringValue("px");
    view.addSubview(mbLabel);


// PADDING TOP

    // Create input field
    ptInput = NSTextField.alloc().initWithFrame(NSMakeRect(115,viewHeight-72,(viewWidth - 270),20));
    [ptInput setBezeled:true];
    [ptInput setDrawsBackground:true];
    [ptInput setEditable:true];
    [ptInput setSelectable:true];
    // Add label
    ptInput.setStringValue("0");
    mp['pt'] = ptInput;
    view.addSubview(ptInput); 

    // Create label
    var ptLabel = NSTextField.alloc().initWithFrame(NSMakeRect(145,viewHeight-74,(viewWidth-280),20));
    [ptLabel setBezeled:false];
    [ptLabel setDrawsBackground:false];
    [ptLabel setEditable:false];
    [ptLabel setSelectable:false];
    // Add label
    ptLabel.setStringValue("px");
    view.addSubview(ptLabel);  

// PADDING BOTTOM

    // Create input field
    pbInput = NSTextField.alloc().initWithFrame(NSMakeRect(115,viewHeight-240,(viewWidth - 270),20));
    [pbInput setBezeled:true];
    [pbInput setDrawsBackground:true];
    [pbInput setEditable:true];
    [pbInput setSelectable:true];
    // Add label
    pbInput.setStringValue("0");
    mp['pb'] = pbInput;
    view.addSubview(pbInput); 

    // Create label
    var pbLabel = NSTextField.alloc().initWithFrame(NSMakeRect(145,viewHeight-242,(viewWidth-280),20));
    [pbLabel setBezeled:false];
    [pbLabel setDrawsBackground:false];
    [pbLabel setEditable:false];
    [pbLabel setSelectable:false];
    // Add label
    pbLabel.setStringValue("px");
    view.addSubview(pbLabel);

// PADDING LEFT

    // Create input field
    plInput = NSTextField.alloc().initWithFrame(NSMakeRect(10,viewHeight-160,(viewWidth - 270),20));
    [plInput setBezeled:true];
    [plInput setDrawsBackground:true];
    [plInput setEditable:true];
    [plInput setSelectable:true];
    // Add label
    plInput.setStringValue("0");
    mp['pl'] = plInput;
    view.addSubview(plInput); 

    // Create label
    var plLabel = NSTextField.alloc().initWithFrame(NSMakeRect(40,viewHeight-162,(viewWidth-280),20));
    [plLabel setBezeled:false];
    [plLabel setDrawsBackground:false];
    [plLabel setEditable:false];
    [plLabel setSelectable:false];
    // Add label
    plLabel.setStringValue("px");
    view.addSubview(plLabel);

// PADDING RIGHT

    // Create input field
    prInput = NSTextField.alloc().initWithFrame(NSMakeRect(230,viewHeight-160,(viewWidth - 270),20));
    [prInput setBezeled:true];
    [prInput setDrawsBackground:true];
    [prInput setEditable:true];
    [prInput setSelectable:true];
    // Add label
    prInput.setStringValue("0");
    mp['pr'] = prInput;
    view.addSubview(prInput); 

    // Create label
    var prLabel = NSTextField.alloc().initWithFrame(NSMakeRect(260,viewHeight-162,(viewWidth-280),20));
    [prLabel setBezeled:false];
    [prLabel setDrawsBackground:false];
    [prLabel setEditable:false];
    [prLabel setSelectable:false];
    // Add label
    prLabel.setStringValue("px");
    view.addSubview(prLabel);

    // Create label
    var content = NSTextField.alloc().initWithFrame(NSMakeRect(75,viewHeight-162,(viewWidth-150),20));
    [content setBezeled:false];
    [content setDrawsBackground:false];
    [content setEditable:false];
    [content setSelectable:false];
    // Add label
    content.setStringValue("[COLUMN CONTENT]");
    view.addSubview(content);    
    // Show the dialog
    return [alert]
    
}