//=============================================================================
// RPG Maker MZ - MewglesCustomMapName
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (V1.0.1) Allows customization of the map name display
 * @author Mewgles
 * @url https://www.atelier-mew.com/index.php/rpg-maker-mz/map-processing/custom-map-name
 *
 * @param -----Map behaviour-----
 * @desc Controls the behaviour of the mapname window during 
 * Scene_Map. Read help section for further info
 *
 * @param Window_X
 * @desc Sets X-coordinates for the mapname display
 * @default 0
 * @type number
 *
 * @param Window_Y
 * @desc Sets Y-coordinates for the mapname display
 * @default 0
 * @type number
 *
 * @param Background_X
 * @desc Sets the X-coordinates for the mapname background
 * inside the window
 * @default 0
 * @type number
 *
 * @param Background_Y
 * @desc Sets the Y-coordinates for the mapname background
 * inside the window
 * @default 0
 * @type number
 *
 * @param Window_Width
 * @desc Sets the mapname window width
 * @default 360
 * @type number
 *
 * @param Window_Height
 * @desc Sets the mapname window height
 * @default 110
 * @type number
 *
 * @param MapName_Timer
 * @desc Sets the duration of the mapname display in frames
 * 60 frames = 1 second
 * @default 150
 * @type number
 * 
 * @param -----Fonts and Images-----
 * @desc Controls the fonts and images used
 *
 * @param FontName
 * @desc Sets the font name. Read help section to find
 * out where to put the fonts
 * @default GameFont
 * @type string
 *
 * @param FontSize
 * @desc Sets the fontsize
 * @default 28
 * @type number
 *
 * @param BackgroundImage
 * @desc Sets the background image. Read help section to
 * find out where to put the images
 * @default
 * @type file
 * @dir img/system
 * @require 1
 *
 * @param -----Menu behaviour-----
 * @desc Controls the map window during the menu screen
 * Check the help section for detailed info
 *
 * @param UseInMenu
 * @desc Activates/deactivates the mapname display during menu
 * (true/false)
 * @default false
 * @type string
 *
 * @param ShowWhenNoName
 * @desc Sets whether you want to show the window even if
 * the mapname is empty (true, false)
 * @default true
 * @type select
 * @option true
 * @option false
 *
 * @param MenuWindow_X
 * @desc Sets the X-coordinates for the menu window
 * (default 0)
 * @default 0
 * @type number
 *
 * @param MenuWindow_Y
 * @desc Sets the Y-coordinates for the menu window
 * (default 0)
 * @default 0
 * @type number
 *
 * @param MenuWindow_Height
 * @desc Sets the height of the menu window
 * (default 0)
 * @default 0
 * @type number
 *
 * @param MenuWindow_Width
 * @desc sets the width of the menu window
 * (default 0)
 * @default 0
 * @type number
 *
 * @param -----Other options-----
 * @desc Other options this plugin provides
 *
 * @param Synonym_For_EmptyName
 * @desc Sets a synonym if the map has no name. Leave
 * blank if none wanted.
 * @default
 * @type string
 *
 *------------------------------------------------------------------------------
 * @command set
 * @text Map name settings
 * @desc Allows to adjust map name display during the game
 *
 * @arg fontName
 * @type string
 * @default
 * @text Set font
 * @desc Changes the font of the map name
 *
 * @arg fontSize
 * @type number
 * @default 28
 * @text Set font size
 * @desc Changes the font size of the map name
 *
 * @arg backgroundImage
 * @default
 * @type file
 * @dir img/system
 * @require 1
 * @text Set background image
 * @desc Changes the map name background image
 *
 * @arg timer
 * @type number
 * @default 150
 * @text Set display timer
 * @desc Changes the map name display timer
 *
 * @arg synonym
 * @type string
 * @default
 * @text Set synonym
 * @desc Changes the map name synonym for non existant map names
 *
 *------------------------------------------------------------------------------
 * @command clear
 * @text Clear map name settings
 * @desc Resets settings to their default values
 * in the plugin manager
 *
 * @arg fontName
 * @type select
 * @option Keep
 * @option Reset
 * @desc Resets the font
 *
 * @arg fontSize
 * @type select
 * @option Keep
 * @option Reset
 * @desc Resets the font size
 *
 * @arg backgroundImage
 * @type select
 * @option Keep
 * @option Reset
 * @desc Resets the background image
 *
 * @arg timer
 * @type select
 * @option Keep
 * @option Reset
 * @desc Resets the map name display timer
 *
 * @arg synonym
 * @type select
 * @option Keep
 * @option Reset
 * @desc Resets the synonym
 *
 * @help 
 * Mewgles Custom MapName
 *------------------------------------------------------------------------------
 * ## Terms of use ##
 *
 * Note: 
 * Since RMMZ is very new I do not guarantee that this plugin works with other
 * plugins without causing errors. For further info see the support and
 * bug report section.
 *
 * Non-commercial use:
 * This Plugin may be used for non-commercial projects as long as you give
 * credit and notify me in case you release your game. 
 * (Discord Mewgles#5913)
 *
 * Commercial use:
 * This Plugin may be used for commercial projects as long as you give credit
 * and notify me on release. (Discord Mewgles#5913)
 *
 * 
 * Important if you downloaded the demo project:
 * The demo uses a font called "Quikhand". It's a royalty free font which can
 * be used in both non-commercial and commercial ways. Make sure to read
 * it's readme file in case you want to use it.
 *
 *------------------------------------------------------------------------------
 * ## Features ##
 * 
 * - Adjust map name window position and size
 * - Change font and font size of the map name display
 * - Add a background image to the map name display
 * - Adjust map name display time
 * - Show the current map on the menu screen
 * - Adjustable menu screen window
 * - Set a synonym for maps without name
 * - Plugin commands to adjust the following values during the game:
 *   	- Font
 *		- Font size
 *		- Background image
 *		- Timer
 *		- Synonym
 *
 *------------------------------------------------------------------------------
 * ## Background setup ##
 * 
 * While you can adjust the X and Y coordinates for the background image
 * within the map name window it is strongly recommended to use a png image
 * with transparency that completely fills the width of the window in order
 * to make aligning it easier. A base width of 360px and height of 110px
 * are recommended, though you can of course make them smaller. Just note
 * that any text and images taller than the window will be cut off.
 * 
 * The images you want to use for the map name have to be located inside
 * the img/system folder.
 *
 * If you don't specify a map name, the plugin will use the default 
 * animation style for it.
 *
 *------------------------------------------------------------------------------
 * ## Font changes ##
 *
 * Changing the font of the map name is fairly easy. All you need to do is 
 * make sure to put the font file (.ttf or .woff) into the fonts folder of 
 * the project. If you plan on using a standard font that is preinstalled
 * with windows or whatever device you want to run it on then you just need
 * to set the name without having to provide the font file.
 *
 *------------------------------------------------------------------------------
 * ## Menu window setup ##
 *
 * The menu window standard position is above the gold window for the 
 * standard menu optics. This goes also for its size. If you change any 
 * of the numbers to anything greater than 0 it will override that base 
 * configuration and use your preferences instead. This allows for very 
 * individual placement of the window aswell as adjusting the size.
 *
 * Make sure to set the option whether you want the window to show if 
 * the mapname is empty or not.
 * 
 *------------------------------------------------------------------------------
 * ## Using the map name synonym ##
 *
 * If you want to give your maps a standard synonym for the case they don't
 * have a regular name you can set the synonym to anything you like. It
 * will automatically be used. If you don't want to use it, just leave it blank.
 *
 * Caution!: This will override your setting on showing the map name window
 * in the menu when no name is set. Of course it won't show if the window is
 * switched off completely.
 *
 *------------------------------------------------------------------------------
 * ## Using the plugin commands ##
 *
 * This plugin provides 2 commands.
 
 * Map name settings:
 * This command allows you to change the font, font size, background image
 * and the synonym for the map name display during gameplay. Set them
 * to the values you want. Blanks are ignored.
 *
 * Clear map name settings: 
 * This command restores the settings to their original values which were set
 * through the plugin manager. The values you want to keep you can set
 * to "Keep" or leave blank. For the ones you want to reset, choose "Reset".
 *
 *------------------------------------------------------------------------------
 * ## Support and Bug reports ##
 *
 * If you have any issues feel free to contact me on Discord at Mewgles#5913
 * or you can join my server for special text channels, in-depth support
 * and news regarding my work at https://discord.gg/b4MwdG3
 *
 * You can always get the newest versions of my plugins at my website
 * (atelier-mew.com). I try to keep things up to date on steam too, but
 * workshop has been buggy lately and refused ot update.
 *
 *------------------------------------------------------------------------------
 * ## To Do / Planned Udpates ##
 *
 * - Different animation styles for the map name display
 *
 *------------------------------------------------------------------------------
 * ## Changelog ##
 *
 * 16.09.2020:
 * - Small quality of life update to a few option selectors for the background
 *   images and the ShowWhenNoName option.
 *
 * 15.09.2020:
 * - Fixed a bug that prevented the game from loading the correct font even
 *   when being placed into the fonts folder.
 *------------------------------------------------------------------------------
 */
 
(() => {

	const pluginName = "MewglesCustomMapName";
	const parameters = PluginManager.parameters('MewglesCustomMapName');
	
	
//Variables used in the plugin (varname = Type(parameters['ParameterName']|| StandardValue))

	//Map processing
	const mn_window_x = Number(parameters['Window_X'] || 0);
	const mn_window_y = Number(parameters['Window_Y'] || 0);
	const mn_background_x = Number(parameters['Background_X'] || 0);
	const mn_background_y = Number(parameters['Background_Y'] || 0);
	const mn_window_width = Number(parameters['Window_Width'] || 360);
	const mn_window_height = Number(parameters['Window_Height'] || 110);
	let mn_mapname_timer = Number(parameters['MapName_Timer'] || 150);
	
	//Fonts and images
	let mn_font_name = String(parameters['FontName'] || 'GameFont');
	let mn_font_size = Number(parameters['FontSize'] || 28);
	let mn_background_image = String(parameters['BackgroundImage'] || '');
	
	//Menu processing
	const mn_use_in_menu = String(parameters['UseInMenu'] || "false");
	const mn_show_when_no_name = String(parameters['ShowWhenNoName'] || "true");
	const mn_menu_window_x = Number(parameters['MenuWindow_X'] || 0);
	const mn_menu_window_y = Number(parameters['MenuWindow_Y'] || 0);
	const mn_menu_window_height = Number(parameters['MenuWindow_Height'] || 0);
	const mn_menu_window_width = Number(parameters['MenuWindow_Width'] || 0);
	
	//Other options
	let mn_synonym_for_empty_name = String(parameters['Synonym_For_EmptyName'] || "");
	
	
//########### Commands #######################################
	
	PluginManager.registerCommand(pluginName, "set", args => {
		if(args.fontName.length > 0){
			mn_font_name = String(args.fontName);
		}
		if(args.fontSize > 0){
			mn_font_size = Number(args.fontSize);
		}
		if(args.backgroundImage.length > 0){
			mn_background_image = String(args.backgroundImage);
		}
		if(args.timer > 0){
			mn_mapname_timer = Number(args.timer);
		}
		if(args.synonym.length > 0){
			mn_synonym_for_empty_name = String(args.synonym);
		}
    });
	
	
	PluginManager.registerCommand(pluginName, "clear", args => {
		if(args.fontName === "Reset"){
			mn_font_name = String(parameters['FontName'] || 'GameFont');
		}
		if(args.fontSize === "Reset"){
			mn_font_size = Number(parameters['FontSize'] || 28);
		}
		if(args.backgroundImage === "Reset"){
			mn_background_image = String(parameters['BackgroundImage'] || '');
		}
		if(args.timer === "Reset"){
			mn_mapname_timer = Number(parameters['MapName_Timer'] || 150);
		}
		if(args.synonym === "Reset"){
			mn_synonym_for_empty_name = String(parameters['Synonym_For_EmptyName'] || "");
		}
	});
	
	
//########### Game_System changes - Custom - #######################################

	Game_System.prototype.mapFontFace = function() {
		return "rmmz-mapnamefont, " + $dataSystem.advanced.fallbackFonts;
	};
	

//########### Scene_Boot changes - alias - #######################################
	
	const _mew_mn_Scene_Boot_loadGameFonts = Scene_Boot.prototype.loadGameFonts;
	Scene_Boot.prototype.loadGameFonts = function() {
		_mew_mn_Scene_Boot_loadGameFonts.apply(this, arguments);
		FontManager.load("rmmz-mapnamefont", mn_font_name);
	};
	
	
//########### Scene_Map changes	- overrides - #######################################

	Scene_Map.prototype.mapNameWindowRect = function() {
		const wx = mn_window_x;
		const wy = mn_window_y;
		const ww = mn_window_width;
		const wh = mn_window_height;
		return new Rectangle(wx, wy, ww, wh);
	};


//########### Window_MapName changes - overrides - #######################################	

	Window_MapName.prototype.initialize = function(rect) {
		Window_Base.prototype.initialize.call(this, rect);
		this.opacity = 0;
		this.contentsOpacity = 0;
		this._showCount = 0;
		if(mn_background_image.length > 0){
			this.drawMapNameBackgroundImage();
		}
		this.refresh();
	};
	

	Window_MapName.prototype.update = function() {
		Window_Base.prototype.update.call(this);
		if (this._showCount > 0 && $gameMap.isNameDisplayEnabled()) {
			this.updateFadeIn();
			this._showCount--;
		} else {
			this.updateFadeOut();
		}
	};
	

	Window_MapName.prototype.updateFadeIn = function() {
		this.contentsOpacity += 16;
		if(mn_background_image.length > 0 && ($gameMap.displayName() || mn_synonym_for_empty_name.length > 0)){
			this._image.opacity += 16;
		}
	};


	Window_MapName.prototype.updateFadeOut = function() {
		this.contentsOpacity -= 16;
		if(mn_background_image.length > 0 && ($gameMap.displayName() || mn_synonym_for_empty_name.length > 0)){
			this._image.opacity -= 16;
		}
	};


	Window_MapName.prototype.open = function() {
		this.refresh();
		this._showCount = mn_mapname_timer;
	};


	Window_MapName.prototype.close = function() {
		this._showCount = 0;
	};


	Window_MapName.prototype.refresh = function() {
		this.contents.clear();
		if ($gameMap.displayName() || mn_synonym_for_empty_name.length > 0) {
			const width = this.innerWidth;
			this.contents.fontSize = mn_font_size;
			this.contents.fontFace = $gameSystem.mapFontFace();
			if(mn_background_image.length === 0){
				this.drawBackground(0, 0, width, this.lineHeight());
			}
			if(mn_synonym_for_empty_name.length > 0 && !$gameMap.displayName()){
				this.drawText(mn_synonym_for_empty_name, 0, 0, width, "center");
			} else {
				this.drawText($gameMap.displayName(), 0, 0, width, "center");
			}
		}
	};
	
	
	Window_MapName.prototype.drawBackground = function(x, y, width, height) {
		const color1 = ColorManager.dimColor1();
		const color2 = ColorManager.dimColor2();
		const half = width / 2;
		this.contents.gradientFillRect(x, y, half, height, color2, color1);
		this.contents.gradientFillRect(x + half, y, half, height, color1, color2);
	};
	
	
	Window_MapName.prototype.drawMapNameBackgroundImage = function() {
		const img = ImageManager.loadSystem(mn_background_image);
		this._image = new Sprite(img);
		this._image.x = mn_background_x;
		this._image.y = mn_background_y;
		this._image.opacity = 0;
		if($gameMap.displayName() || mn_synonym_for_empty_name.length > 0){
			this.addChildToBack(this._image);
		}
	};
	
	 
//########### Scene_Menu changes - alias + custom function - #######################################

	const _mew_Scene_Menu_create = Scene_Menu.prototype.create;
	Scene_Menu.prototype.create = function() {
		_mew_Scene_Menu_create.apply(this, arguments);
		if(mn_use_in_menu === "true" && mn_show_when_no_name === "true"){
			this.createMenuMapNameWindow();
		} else if(mn_use_in_menu === "true" && ($gameMap.displayName() || mn_synonym_for_empty_name.length > 0)){
			this.createMenuMapNameWindow();
		}
	};
	
	
	Scene_Menu.prototype.createMenuMapNameWindow = function() {
		const rect = this.MenuMapNameWindowRect();
		this._MenuMapNameWindow = new Window_MenuMapName(rect);
		this.addWindow(this._MenuMapNameWindow);
	};
	
	
	Scene_Menu.prototype.MenuMapNameWindowRect = function() {
		return new Rectangle(this.getMapWX(), this.getMapWY(), this.getMapWW(), this.getMapWH());
	};
	
	
	Scene_Menu.prototype.getMapWW = function() {
		if(mn_menu_window_width > 0){
			return mn_menu_window_width;
		} else {
			return this.mainCommandWidth();
		}
	}
	
	
	Scene_Menu.prototype.getMapWH = function() {
		if(mn_menu_window_height > 0){
			return mn_menu_window_height;
		} else {
			return this.calcWindowHeight(1, true);
		}
	}
	
	
	Scene_Menu.prototype.getMapWX = function() {
		if(mn_menu_window_x > 0){
			return mn_menu_window_x;
		} else {
			return this.isRightInputMode() ? Graphics.boxWidth - this.mainCommandWidth() : 0;
		}
	}
	
	
	Scene_Menu.prototype.getMapWY = function() {
		if(mn_menu_window_y > 0){
			return mn_menu_window_y;
		} else {
			return this.mainAreaBottom() - (this.calcWindowHeight(1, true) * 2);
		}
	}


//########### Custom Window_MenuMapName #######################################

	function Window_MenuMapName(){
		this.initialize(...arguments)
	}


	Window_MenuMapName.prototype = Object.create(Window_Selectable.prototype);
	Window_MenuMapName.prototype.constructor = Window_MenuMapName;

	Window_MenuMapName.prototype.initialize = function(rect) {
		Window_Selectable.prototype.initialize.call(this, rect);
		this.refresh();
	};
	

	Window_MenuMapName.prototype.colSpacing = function() {
		return 0;
	};


	Window_MenuMapName.prototype.refresh = function() {
		const rect = this.itemLineRect(0);
		const x = rect.x;
		const y = rect.y;
		const width = rect.width;
		this.contents.clear();
		if(mn_synonym_for_empty_name.length > 0 && !$gameMap.displayName()){
			this.drawText(mn_synonym_for_empty_name, 0, 0, width, "center");
		} else {
			this.drawText($gameMap.displayName(), 0, 0, width, "center");
		}
	};


	Window_MenuMapName.prototype.open = function() {
		this.refresh();
		Window_Selectable.prototype.open.call(this);
	};

})();