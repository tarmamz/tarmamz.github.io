
/*: 
* @target MZ
* Version 1.02
* @author Crucible Gaming
* @plugindesc Allows for collectibles to be added throughout your game.
*
* @param Collectible Title
* @type text
* @default Collectibles
* @desc This is what your collectibles will be called.  ex: 'Action figures', 'stories', 'collectibles'
*
* @param Hide Collectibles On Start
* @type boolean
* @default false
* @desc Collectibles will show up as '??????' until they are discovered. 
*
* @param Collectibles Learned on Start
* @type boolean
* @default true
* @desc Collectibles that are not learned will not show up in the window at all.
*
* @param Hide Pictures When Collecible Is Hidden
* @type boolean
* @default true
* @desc Pictures will not show up unless the collectible is shown.
*
* @param Show Menu Key
* @type number
* @default 67
* @desc The ASCII key to bring menu. '67' is 'C'. Empty for no keyboard access.
* @command unhide
* @text Unhide Collectible
* @desc unhides the collectible with the index of the number chosen.
* @arg unhideID
* @type number
* @default 0
* @text Collectible Index
* @desc unhides the collectible with the index of the number chosen.
*
* @command hide
* @text hide Collectible
* @desc hides the collectible with the index of the number chosen.
* @arg hideID
* @type number
* @default 0
* @text Collectible Index
* @desc hides the collectible with the index of the number chosen.
*
* @command learn
* @text learn Collectible
* @desc learns the collectible with the index of the number chosen.
* @arg learnID
* @type number
* @default 0
* @text Collectible Index
* @desc learns the collectible with the index of the number chosen.
*
* @command forget
* @text forget Collectible
* @desc forgets the collectible with the index of the number chosen.
* @arg forgetID
* @type number
* @default 0
* @text Collectible Index
* @desc forgets the collectible with the index of the number chosen.
*
* @command showmenu
* @text Show Collectible Menu
* @desc Shows the Collectible Menu. 
*
* @help
v1.01 This plugin is a Collectible menu that can be used in a variety of different 
ways, but primarily shows a list of "collectibles".

To use it, first add Data under the "collectibles" paramater.  It's VERY
important, that you keep the indexes consistent.  Meaning for "Collectible 1",
the name, description, and image would all be under the same exact index
(or line number) for each of those attributes.  That's how the script tracks
the collectibles.  Images are optional.  Names and descriptions will show
as "undefined" if you don't put anything in.

To add an image, type the filename of any image file within your "Pictures" folder.

To show the menu, press the key that aligns with the "Show Menu Key" parameter.
Alternatively, use the plugin command "Show Collectible Menu" from inside an 
event.  

Hide collectibles on start will cause all collectibles to show as "???".
Setting "Collectibles Learned at Start" to false, will cause no collectibles
to show up in the menu.  Both of these can be used together to create a comlex
Collectible system.  To interact with both, use the plugin commands "Show",
"Hide", "Learn", "Forget".  

If you have any questions, email florocruciblegaming@gmail.com for support.

* 
* @param Collectibles
* @type struct<Collectibles>
*/
/*~struct~Collectibles:
 *Make sure to keep the indexes the same.
 * @param Collectible Names
 * @type text[]
 * @help Type the name for each collectible.  Keep an eye on the index, because for the other fields you will use the same indexes as this one.
 * @param Collectible Descriptions
 * @type note[]
 * @param Collectible Images
 * @type text[] 
 * @dir img
 * @require 1
 * @desc It's suggested that your images are 330x350.  If they aren't you may need to modify the code.
 */

/*
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. This plugin may be used in free or commercial games as long as you have obtained this plugin from an official source, provided by Crucible Gaming. 
 *If this is a paid plugin, you must have paid for this plugin to use it.

 * 2. You must give credit to "Crucible Gaming"

 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you.
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. 
 * This plugin is distributed under the Creative Commons Attribution No-Derivatives CC, found here: https://creativecommons.org/licenses/by-nd/4.0/
 */





//Set initial variables
var params = PluginManager.parameters("Crucible_Collectibles");
var selectIndex = 0;
var CollectiblesListJSON = params["Collectibles"];
var CollectiblesList = JSON.parse(CollectiblesListJSON);
var hideBool = params["Hide Collectibles On Start"];
var learnBool = params["Collectibles Learned on Start"]
var hidePicWhenHidden = params["Hide Pictures When Collecible Is Hidden"];
var nameList = JSON.parse(CollectiblesList["Collectible Names"])
var descList = JSON.parse(CollectiblesList["Collectible Descriptions"])
var picList = JSON.parse(CollectiblesList["Collectible Images"])
var testSelect;
const Crucible_pluginName = "Crucible_Collectibles";
var indexMatcher = [];

//Set Collectibles to hidden if param is true
var collectiblesVisible = [];
if(hideBool == "true") {
	for(i=0; i<nameList.length; i++) {
		collectiblesVisible[i] = false
	}
} else {
	for(i=0; i<nameList.length; i++) {
		collectiblesVisible[i] = true
	}
}

var collectiblesLearned = [];
if(learnBool == "false") {
	for(i=0; i<nameList.length; i++) {
		collectiblesLearned[i] = false
	}
} else {
	for(i=0; i<nameList.length; i++) {
		collectiblesLearned[i] = true
	}
}
for(var i=0; i<nameList.length;i++) {
	indexMatcher[i] = i;
}

//Register Plug-in commands
PluginManager.registerCommand(Crucible_pluginName, "unhide", args => {
    var unhideIndex = Number(args.unhideID);
    collectiblesVisible[unhideIndex] = true;
});
PluginManager.registerCommand(Crucible_pluginName, "hide", args => {
    var hideIndex = Number(args.hideID);
    collectiblesVisible[hideIndex] = false;
});

PluginManager.registerCommand(Crucible_pluginName, "learn", args => {
    var learnIndex = Number(args.learnID);
    collectiblesLearned[learnIndex] = true;
});
PluginManager.registerCommand(Crucible_pluginName, "forget", args => {
    var forgetIndex = Number(args.forgetID);
    collectiblesLearned[forgetIndex] = false;
});
PluginManager.registerCommand(Crucible_pluginName, "showmenu", args => {
	SceneManager.push(Scene_CollectiblesWindow);
});


//Key 80 is 'P'
Input.keyMapper[params["Show Menu Key"]] = "collectibleMenu";

_alias_scene_map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_alias_scene_map_update.call(this);
	if(Input.isTriggered("collectibleMenu")) SceneManager.push(Scene_CollectiblesWindow);
};


function Scene_CollectiblesWindow() {
    this.initialize.apply(this, arguments);
}

Scene_CollectiblesWindow.prototype = Object.create(Scene_MenuBase.prototype);
Scene_CollectiblesWindow.prototype.constructor = Scene_CollectiblesWindow;

Scene_CollectiblesWindow.prototype.initialize = function() {
	//ImageManager.loadFace("Actor3");
	//ImageManager.loadCharacter("People1")
    Scene_Base.prototype.initialize.call(this);
};

var menu = Scene_CollectiblesWindow.prototype.create = function() {

	//Scene for Data display
	Scene_MenuBase.prototype.create.call(this);
	this._collectiblesWindow = new Window_Collectibles(Graphics.boxWidth/3, Graphics.boxHeight/10,(Graphics.boxWidth / 3)*2,(Graphics.boxHeight/10)*9)
	this.addWindow(this._collectiblesWindow);
	this._collectiblesTitle = new Window_CollectiblesTitle(0, 0,Graphics.boxWidth,Graphics.boxHeight/10)
	this.addWindow(this._collectiblesTitle);

	//Scene for choosing a collectible
	this._collectiblesSelectableWindow = new Window_CollectiblesSelectable(0,Graphics.boxHeight/10,Graphics.boxWidth/3,(Graphics.boxHeight/10)*9)
    this._collectiblesSelectableWindow.select(0);
    this._collectiblesSelectableWindow.activate();
    //this._collectiblesSelectableWindow.setHandler("ok", this.command1.bind(this));
	this._collectiblesSelectableWindow.setHandler("cancel",this.popScene.bind(this));
	this.addWindow (this._collectiblesSelectableWindow);
}




Scene_CollectiblesWindow.prototype.start = function() {
	Scene_MenuBase.prototype.start.call(this);
	testSelect = this._collectiblesSelectableWindow;
    //this._collectiblesSelectableWindow.refresh();
    selectIndex = this._collectiblesSelectableWindow.index();
   	ImageManager.clear();
    this._collectiblesWindow.destroyContents();
    this._collectiblesWindow.createContents();
    this._collectiblesWindow.drawAllItems();

}

Window_Selectable.prototype.processCursorMove = function() {
    if (this.isCursorMovable()) {
        const lastIndex = this.index();
        if (Input.isRepeated("down")) {
            this.cursorDown(Input.isTriggered("down"));
        }
        if (Input.isRepeated("up")) {
            this.cursorUp(Input.isTriggered("up"));
        }
        if (Input.isRepeated("right")) {
            this.cursorRight(Input.isTriggered("right"));
        }
        if (Input.isRepeated("left")) {
            this.cursorLeft(Input.isTriggered("left"));
        }
        if (!this.isHandled("pagedown") && Input.isTriggered("pagedown")) {
            this.cursorPagedown();
        }
        if (!this.isHandled("pageup") && Input.isTriggered("pageup")) {
            this.cursorPageup();
        }
        if (this.index() !== lastIndex) {
            this.playCursorSound();
        }
    }
}

Scene_CollectiblesWindow.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this); // Run those updates
    if(Input.isTriggered("cancel")) SceneManager.pop();
    if (Input.isTriggered("down")) {
    	console.log("image manager triggered")
    	;
	    selectIndex = this._collectiblesSelectableWindow.index();
	   	ImageManager.clear();
	    this._collectiblesWindow.destroyContents();
	    this._collectiblesWindow.createContents();
	    this._collectiblesWindow.drawAllItems();
	    
	}
    if (Input.isTriggered("up")) {
    	console.log("image manager triggered")
	    selectIndex = this._collectiblesSelectableWindow.index();
	   	ImageManager.clear();
	    this._collectiblesWindow.destroyContents();
	    this._collectiblesWindow.createContents();
	    this._collectiblesWindow.drawAllItems();

	}

}

//Window Collectibles
function Window_Collectibles() {
	this.initialize.apply(this, arguments);
}

Window_Collectibles.prototype = Object.create(Window_Base.prototype);
Window_Collectibles.prototype.constructor = Window_Collectibles;

Window_Collectibles.prototype.initialize = function(x, y, width, height) {
	Window_Base.prototype.initialize.call(this, new Rectangle(x,y,width,height));
	this.drawAllItems();
}


Bitmap.prototype.clear = function() {
    this.clearRect(0, 0, this.width, this.height);
};
//Show names and description, images of items
Window_Collectibles.prototype.drawAllItems = function() {
	var matchedIndex = indexMatcher[selectIndex];
	console.log(matchedIndex);
	this.contents.clear() 
	var learnedItems = 0;
	for(var i=0;i<nameList.length;i++) {
		if(collectiblesLearned[i]) {
			learnedItems++;
		}
	}
	if(learnedItems == 0) {
		this.drawText("?????????", 0, 0, this.width - this.padding * 2, "center");
		this.drawText("?????????", 0, 100, this.width - this.padding * 2, "center");
	} else {
		if(collectiblesVisible[matchedIndex] == false) {
			this.drawText("?????????", 0, 0, this.width - this.padding * 2, "center");
			if(hidePicWhenHidden == "true") {
				this.drawText("?????????", 0, 100, this.width - this.padding * 2, "center");
			} else {
				if(picList[matchedIndex]) {
					this._sprite = new Sprite();
					this._sprite.bitmap = ImageManager.loadPicture(picList[matchedIndex]);
					this._sprite.x = 250;
					this._sprite.y = 100;
					this.addChild(this._sprite);
					this.drawText("?????????", 0, 500, this.width - this.padding * 2, "center");				
				} else {
					this.drawText("?????????", 0, 100, this.width - this.padding * 2, "center");
				}

			}
		} else {
			this.drawText(nameList[matchedIndex], 0, 0, this.width - this.padding * 2, "center");
			if(picList[matchedIndex]) {
				this.drawText(descList[matchedIndex], 0, 500, this.width - this.padding * 2, "center");	
				this._sprite = new Sprite();
				this._sprite.bitmap = ImageManager.loadPicture(picList[matchedIndex]);
				this._sprite.x = 190;
				this._sprite.y = 100;
				this.addChild(this._sprite);
			} else {
				this.drawText(descList[matchedIndex], 0, 100, this.width - this.padding * 2, "center");	
			}
		}
	}
	return;

}

//Window Collectibles Title
function Window_CollectiblesTitle() {
	this.initialize.apply(this,arguments)
}

Window_CollectiblesTitle.prototype = Object.create(Window_Base.prototype);
Window_CollectiblesTitle.prototype.constructor = Window_Collectibles;

Window_CollectiblesTitle.prototype.initialize = function(x, y, width, height) {
	Window_Base.prototype.initialize.call(this, new Rectangle(x,y,width,height));
	this.drawAllItems();
}
Window_CollectiblesTitle.prototype.drawAllItems = function() {
	this.drawText(params["Collectible Title"], 0, 0, this.width - this.padding * 2, "center");
}


//Window Collectible Selectable
function Window_CollectiblesSelectable () {
    this.initialize.apply (this, arguments);
}

Window_CollectiblesSelectable.prototype = Object.create (Window_Selectable.prototype);
Window_CollectiblesSelectable.prototype.constructor = Window_Selectable;

Window_CollectiblesSelectable.prototype.initialize = function (x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this,new Rectangle(x, y, width, height));
    this.refresh();
    //this.hide();
}



//THIS SETS HOW MANY ITEMS WILL BE DRAWN.  The name is confusing.  It's called 'maxItems', but the truth is the game WILL draw this many items.  This determines how many times are drawn.
Window_CollectiblesSelectable.prototype.maxItems = function () {
	var learnedItems = 0;
	for(var i=0;i<nameList.length;i++) {
		if(collectiblesLearned[i]) {
			learnedItems++;
		}
	}
    return learnedItems;
}

Window_CollectiblesSelectable.prototype.maxPageRows = function () {
    return 2;
}

Window_CollectiblesSelectable.prototype.maxPageItems = function () {
    return this.maxPageRows() * this.maxCols();
}
var testWindowVar;

//Code determines which items are drawn

Window_CollectiblesSelectable.prototype.drawAllItems = function() {
	var itemsSkipped = 0;
	var learnedItems = 0;
	for(var i=0;i<nameList.length;i++) {
		if(collectiblesLearned[i]) {
			learnedItems++;
		}
	}
    const topIndex = this.topIndex();
    for (let i = 0; i < this.maxVisibleItems(); i++) {
        const index = topIndex + i;
    	if(collectiblesLearned[index]) {
    		newIndex = index - itemsSkipped;
    		indexMatcher[newIndex] = index;
    		this.drawItemBackground(newIndex);
        	this.drawItem(newIndex, index);
    	} else {
    		itemsSkipped++;
    	}
    }
};



Window_CollectiblesSelectable.prototype.drawItem = function(index, itemIndex) {
		var itemRect = this.itemRect(index);
	    if(collectiblesVisible[itemIndex] == false) {
	    	testWindowVar = this;
	    	this.contents.fontItalic = true;
	    	this.contents.textColor = "#c5c7c4";
	    	this.drawText("????????????", itemRect.x + 5, itemRect.y, itemRect.width / 2, itemRect.height / 2, 'center');
	    } else {
	    	this.contents.textColor = "#ffffff";
	    	this.contents.fontItalic = false;
	   		this.drawText(nameList[itemIndex], itemRect.x + 5, itemRect.y, itemRect.width / 2, itemRect.height / 2, 'center');
	    }		
};
