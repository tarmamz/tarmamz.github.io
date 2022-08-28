//=============================================================================
// VisuStella MZ - Item Crafting System
// VisuMZ_2_ItemCraftingSys.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_ItemCraftingSys = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemCraftingSys = VisuMZ.ItemCraftingSys || {};
VisuMZ.ItemCraftingSys.version = 1.16;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.16] [ItemCraftingSys]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Item_Crafting_System_VisuStella_MZ
 * @base VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Item crafting has become a common feature in many RPG's. However, it is not
 * a feature included by default with RPG Maker MZ. This plugin adds in a scene
 * that supports item crafting, either through the main menu, or through an
 * event initiated command.
 * 
 * Craftable items are normally all available by default, but they can be
 * barred away through switch requirements. Upon crafting items, switches can
 * also be turned on/off to make a progression system if desired.
 * 
 * Item ingredients can be items, weapons, armors, and cost gold as well.
 * Multiple ingredients can be required at a time or just one. Some items can
 * also be set to only be craftable at custom crafting areas.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Adds an item crafting scene to the game.
 * * Item crafting scene can be accessible from the Main Menu or through
 *   event-based Plugin Commands.
 * * Crafting ingredients can consist of items, weapons, armors, and gold.
 * * Crafting specific items can require switches to be turned on in order to
 *   be listed in the crafting list.
 * * Upon crafting specific items, they can also turn on/off other switches,
 *   making a progression system to be possible.
 * * Custom item crafting effects can occur for those who understand JavaScript
 *   to implement.
 * * This plugin can mask the names of uncrafted items, too.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * - VisuMZ_1_ItemsEquipsCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Proxy Items
 * 
 * Proxy Items are temporary substitutes for another. When they are acquired
 * through crafting, they will turn into the item, weapon, or armor they are a
 * proxy for. Only the icon, name, help description, and status details will
 * match up. Everything else will remain separate such as the notetag data and
 * the ingredients list. This allows you to effectively have multiple ways to
 * craft the same item using different recipes.
 * 
 * For more details, look inside of the Notetags section for Proxy items.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * VisuMZ_2_ShopCommonEvents
 * 
 * If VisuStella MZ's Shop Common Events is present, you can utilize its
 * Common Event function to trigger upon crafting items, weapons, and/or armors
 * to take the player outside of the shop and returning back.
 * 
 * The following notetags will become usable:
 * 
 *   <Once Craft Common Event: id>
 * 
 *   <Once Craft Common Event Switch: id>
 *   <Once Craft Common Event All Switches: id, id, id>
 *   <Once Craft Common Event Any Switches: id, id, id>
 * 
 *   <Repeat Craft Common Event: id>
 *
 *   <Repeat Craft Common Event Switch: id>
 *   <Repeat Craft Common Event All Switches: id, id, id>
 *   <Repeat Craft Common Event Any Switches: id, id, id>
 * 
 * The following Plugin Commands will become usable:
 * 
 *   Scene: Common Event Return
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 * 
 * === General Notetags ===
 * 
 * These notetags are used to mark the item as a craftable item or as items
 * that can only be crafted through a custom crafting list.
 *
 * ---
 *
 * <Crafting Ingredients>
 *  Item id: x
 *  Item name: x
 *  Weapon id: x
 *  Weapon name: x
 *  Armor id: x
 *  Armor name: x
 *  Gold: x
 *  Category name: x
 * </Crafting Ingredients>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Turns this item/weapon/armor into a craftable item by using the listed
 *   ingredients to craft with.
 * - If the 'Category name' variant is used, it will draw from all items,
 *   weapons, and armors that have matching <Category: x> notetag data.
 * - Insert/delete any number of copies of the ingredients as needed.
 * - Replace 'id' with the item/weapon/armor ID of the ingredient to be used.
 * - Replace 'name' with the name of the item/weapon/armor/category to be used.
 * - Replace 'x' with the number of ingredients needed to be used for crafting.
 * 
 * Category Rules:
 * 
 * - If the 'Category name' variant is used, it will draw from all items,
 *   weapons, and armors that have matching <Category: x> notetag data.
 * - Multiples of the same category name can be used. However, the player must
 *   select different items each time.
 * - If the selected category item already exists as a static ingredient, that
 *   item cannot be selected either.
 * 
 * Examples:
 * 
 * <Crafting Ingredients>
 *  Item 5: 1
 *  Item 6: 3
 *  Gold: 100
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Item Potion: 1
 *  Item Magic Water: 3
 *  Gold: 100
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Weapon 1: 4
 *  Armor 2: 2
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Weapon Sword: 4
 *  Armor Hat: 2
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Category Fruit: 2
 *  Category Meat: 3
 * </Crafting Ingredients>
 * 
 * ---
 *
 * <Custom Crafting Only>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - This item can only be crafted with custom crafting lists selected through
 *   the Plugin Command.
 *
 * ---
 * 
 * === Proxy Notetags ===
 * 
 * ---
 * 
 * <Proxy: id>
 * <Proxy: name>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - REQUIRES the most up to date VisuMZ Items and Equips Core!
 * - Turns this item, weapon, or armor into a proxy for another item, allowing
 *   you to create recipes with different ingredients in <Crafting Ingredients>
 *   notetag contents and yield the same item.
 * - The proxy item itself will take on the name, icon, and description of the
 *   original item it is supposed to represent.
 * - No other properties are carried over from the original.
 * - When viewed through the Window_ShopStatus window, the contents will
 *   reference the original item and not the proxy item.
 * - Proxy items themselves cannot be acquired. This includes event commands,
 *   item drops, or equips.
 * - When crafted, the item yielded won't be the proxy item but the item it is
 *   a proxy for.
 * - Replace 'id' with a number representing the item, weapon, or armor ID of
 *   the same item type. If the proxy is an item, this will reference an item.
 *   If the proxy is a weapon, this will reference a weapon. Same for armors.
 * - Replace 'name' with text representing the item, weapon, or armor's name.
 *   The referenced item needs to be the same item type as the proxy. Item for
 *   item, weapon for weapon, armor for armor.
 * 
 * ---
 * 
 * === Switch-Related Notetags ===
 * 
 * These notetags can make item crafting require certain switches to be on,
 * or turn switches on/off upon crafting items.
 *
 * ---
 *
 * <Crafting Show Switch: x>
 * 
 * <Crafting Show All Switches: x,x,x>
 * <Crafting Show Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the craftable item in the crafting scene.
 * - Replace 'x' with the switch ID to determine the item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 * - Insert as many switch ID's as needed.
 * - This can be bypassed with the custom Item Crafting list plugin command
 *   option if enabled.
 *
 * ---
 *
 * <Crafting Turn On Switch: x>
 * <Crafting Turn On Switches: x,x,x>
 * 
 * <Crafting Turn Off Switch: x>
 * <Crafting Turn Off Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Upon crafting this item, turn on/off the marked switch(es).
 * - Replace 'x' with the switch ID to turn on/off.
 *
 * ---
 * 
 * === Masking-Related Notetags ===
 * 
 * These notetags can are used to determine name-masking properties for
 * uncrafted items.
 *
 * ---
 *
 * <Crafting Mask: text>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Displays the specific 'text' when the item has not yet been crafted.
 * - Replace 'text' with the text you wish to display if the item has not yet
 *   been crafted by the player.
 * - This can be bypassed with the custom Item Crafting list plugin command
 *   option if enabled.
 *
 * ---
 *
 * <Crafting No Mask>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Bypasses name masking even if the item has not yet been crafted.
 *
 * ---
 * 
 * === JavaScript Notetag: Effect-Related ===
 * 
 * The following are notetags made for users with JavaScript knowledge to
 * make custom effects that occur upon crafting the item.
 *
 * ---
 *
 * <JS Crafting Effect>
 *  code
 *  code
 *  code
 * </JS Crafting Effect>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' with JavaScript code to determine what kinds of effects you
 *   want to occur upon crafting this item.
 * - The 'item' variable represents the item being crafted.
 * - The 'number' variable represents the number of items being crafted.
 *
 * ---
 * 
 * === Crafting Animation-Related Notetags ===
 * 
 * These notetags let you set custom crafting animations when a specific item,
 * weapon, or armor is crafted so that way, they don't all have to use the
 * default crafting animation from the plugin parameters.
 * 
 * ---
 * 
 * <Crafting Animation: id>
 * <Crafting Animation: id, id, id>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - Plays the animation(s) when this item, weapon, or armor is crafted.
 * - This will override the default animation settings found in the plugin
 *   parameters and use the unique one set through notetags instead.
 * - Replace 'id' with the ID of the animation you wish to play.
 * - If multiple ID's are found, then each animation will play one by one in
 *   the order they are listed.
 * 
 * ---
 * 
 * <Crafting Fade Speed: x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - This determines the speed at which the item's icon fades in during the
 *   crafting animation.
 * - Replace 'x' with a number value to determine how fast the icon fades in.
 * - Use lower numbers for slower fade speeds and higher numbers for faster
 *   fade speeds.
 * 
 * ---
 * 
 * <Crafting Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   item, weapon, or armor's icon during crafting instead.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of crafting, too.
 * - The size used for the image will vary based on your game's resolution.
 * 
 * ---
 * 
 * === Crafting Common Event Notetags ===
 * 
 * ---
 *
 * <Once Craft Common Event: id>
 * <Repeat Craft Common Event: id>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Requires VisuMZ_2_ShopCommonEvents!
 * - This will cause a specific Common Event to launch when crafted.
 * - Replace 'id' with a number representing the ID of the Common Event that
 *   you wish to launch upon this item being crafted.
 * - The "Once" notetag variant will only occur once when crafted.
 *   - Any subsequent purchases of the item will not launch the Common Event.
 * - The "Repeat" notetag variant will occur repeatedly when crafted.
 * - If both "Once" and "Repeat" notetags are present in the item, then the
 *   "Once" variant will take priority first. Any subsequent purchases will go
 *   to the "Repeat" variant.
 * - Any switch requirement notetags need to be met in order for either
 *   notetag to have any effect.
 * - Use the Plugin Command "Scene: Common Event Return" to return back to the
 *   last Item Crafting scene.
 *
 * ---
 * 
 * === Crafting Common Event Requirement-Related Notetags ===
 * 
 * ---
 *
 * <Once Craft Common Event Switch: id>
 * <Once Craft Common Event All Switches: id, id, id>
 * <Once Craft Common Event Any Switches: id, id, id>
 *
 * <Repeat Craft Common Event Switch: id>
 * <Repeat Craft Common Event All Switches: id, id, id>
 * <Repeat Craft Common Event Any Switches: id, id, id>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Requires the respective Craft Common Events to have these Switches enabled
 *   in the "ON" position in order for them to launch.
 *   - "Once" variant will only affect the "Once" notetag variants.
 *   - "Repeat" variant will only affect the "Repeat" notetag variants.
 * - The "All" variant will require all listed Switch ID's to be "ON".
 * - The "Any" variant will require only one listed Switch ID to be "ON".
 * - Replace 'id' with a number representing the Switch ID that needs to be in
 *   the "ON" position for the requirement to be met.
 *   - Insert multiple 'id' to require more Switch ID's.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Scene ===
 * 
 * ---
 *
 * Scene: Item Crafting (All)
 * - Go to the Item Crafting scene.
 * - All enabled recipes will be available.
 *
 * ---
 *
 * Scene: Item Crafting (Custom)
 * - Go to the Item Crafting scene.
 * - Select specific items to craft here.
 * - Some items can only appear through custom lists like this by using the
 *   <Custom Crafting Only> notetag.
 *
 *   Items:
 *   - Select which Item ID(s) to become craftable.
 *
 *   Weapons:
 *   - Select which Weapon ID(s) to become craftable.
 *
 *   Armors:
 *   - Select which armor ID(s) to become craftable.
 *
 *   Bypass Switches?:
 *   - Bypass any of the requirement switches?
 *
 *   Bypass Masks?:
 *   - Bypass name masking for uncrafted items?
 *
 * ---
 * 
 * Scene: Common Event Return
 * - Return to the last shop if coming from a Crafting Common Event.
 * - Requires VisuMZ_2_ShopCommonEvents!
 * 
 * ---
 * 
 * === System ===
 * 
 * ---
 *
 * System: Enable Crafting in Menu?
 * - Enables/disables Crafting menu inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables Crafting menu inside the main menu.
 *
 * ---
 *
 * System: Show Crafting in Menu?
 * - Shows/hides Crafting menu inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Crafting menu inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings pertaining to Item Crafting.
 *
 * ---
 *
 * Scene_ItemCrafting
 * 
 *   Assist Button:
 *   - Text used to for the Button Assist Window's OK button when about ready
 *     to craft an item.
 * 
 *   Crafted Icon:
 *   - Icon used to depict of an item has already been crafted.
 * 
 *   Ingredient Bridge:
 *   - Text used to bridge ingredients in the item crafting scene.
 *
 * ---
 * 
 * Switches
 * 
 *   Switch: Craft:
 *   - Crafting items in Crafting Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Crafting Scene opens.
 * 
 * ---
 * 
 * Categories
 * 
 *   Category Title:
 *   - Text format used for display categories.
 *   - %1 - Category Name, %2 - Needed Quantity
 * 
 *   Selected Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Selected Text:
 *   - This is the add on text that is displayed after an item's name that's
 *     already an ingredient.
 * 
 *   Uncategorized Text:
 *   - Text used for an uncategorized item category.
 * 
 *   Uncategorized Icon:
 *   - Icon used for uncategorized item category.
 * 
 * ---
 * 
 * Vocabulary
 * 
 *   Owned:
 *   -Text used for how much of an item is owned.
 * 
 *   Shift:
 *   - Text used for the change in value.
 * 
 *   Net:
 *   - Text used for the net result.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Listing:
 *   - Code that is run globally across all items when checking if an item
 *     should be listed or not.
 * 
 *   JS: Craft Effect:
 *   - Code that is run globally across all items when crafted.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Masking Settings
 * ============================================================================
 *
 * Masking settings related to uncrafted items.
 *
 * ---
 *
 * Masking
 * 
 *   Enable Masking:
 *   - Enable masking for uncrafted items?
 * 
 *   Italics For Masking:
 *   - Use Italics when masking?
 * 
 *   Mask Character:
 *   - Text used for masking per individual character.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Menu Settings
 * ============================================================================
 *
 * Main Menu settings for Item Crafting.
 *
 * ---
 *
 * Main Menu
 * 
 *   Command Name:
 *   - Name of the 'Crafting' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'Crafting' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'Crafting' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Animation Settings
 * ============================================================================
 *
 * Default settings for playing animations after crafting.
 *
 * ---
 *
 * General
 * 
 *   Show Animations?:
 *   - Show animations when crafting an item?
 * 
 *   Show Windows?:
 *   - Show windows during an item crafting animation?
 * 
 *   Default Animations:
 *   - Default animation(s) do you want to play when crafting.
 *
 * ---
 *
 * Sprite
 * 
 *   Scale:
 *   - How big do you want the item sprite to be on screen?
 * 
 *   Fade Speed:
 *   - How fast do you want the item to fade in?
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Crafting Sound Settings
 * ============================================================================
 *
 * Default settings for the sound effect played when crafting an item.
 *
 * ---
 *
 * Sound
 * 
 *   Filename:
 *   - Filename of the sound effect played.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_ItemCrafting.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   Background 2:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings pertaining to Item Crafting.
 *
 * ---
 *
 * Windows
 * 
 *   Requirement Font Size:
 *   - Font size used for requirement quantity.
 * 
 *   Show Tooltips:
 *   - Show tooltips when the mouse hovers over an ingredient?
 * 
 *   Custom Window Skin:
 *   - Select a custom window skin if you want the tooltip window to have one.
 *
 * ---
 *
 * Background Types
 * 
 *   Help Window:
 *   Category Window:
 *   Gold Window:
 *   List Window:
 *   Status Window:
 *   Ingredient Title:
 *   Ingredient List:
 *   Number Window:
 *   Button Assist Window:
 *   - Select background type for the specific window.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.16: May 12, 2022
 * * Compatibility Update
 * ** Compatibility with VisuMZ Shop Common Events added.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag effects added by Irina and sponsored by MirageV:
 * *** <Once Craft Common Event: id>
 * *** <Repeat Craft Common Event: id>
 * **** Requires VisuMZ_2_ShopCommonEvents!
 * **** This will cause a specific Common Event to launch when crafted.
 * *** <Once Craft Common Event Switch: id>
 * *** <Once Craft Common Event All Switches: id, id, id>
 * *** <Once Craft Common Event Any Switches: id, id, id>
 * *** <Repeat Craft Common Event Switch: id>
 * *** <Repeat Craft Common Event All Switches: id, id, id>
 * *** <Repeat Craft Common Event Any Switches: id, id, id>
 * **** Requires the respective Craft Common Events to have these Switches
 *      enabled in the "ON" position in order for them to launch.
 * ** New Plugin Command added by Irina and sponsored by MirageV:
 * *** Scene: Common Event Return
 * **** Requires VisuMZ_2_ShopCommonEvents!
 * **** Return to the last shop if coming from a Crafting Common Event.
 * 
 * Version 1.15: April 7, 2022
 * * Feature Update!
 * ** Any disappearing categories as a result of hiding recipes after crafting
 *    an item will result in the first category being selected.
 * 
 * Version 1.14: March 31, 2022
 * * Feature Update!
 * ** Failsafe added for situations where if the game dev decides to force an
 *    impossible situation in the Item Crafting scene (such as turning on a
 *    switch that erases all recipes), then the Item Scene will automatically
 *    exit out of it with zero prompts. Update made by Olivia.
 * 
 * Version 1.13: January 20, 2022
 * * Bug Fixes!
 * ** Tooltips for proxy items no longer show the original item's materials.
 *    Fix made by Olivia.
 * 
 * Version 1.12: December 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added Major Changes section for "Proxy Items".
 * * Feature Update!
 * ** Number window is now updated to show how much of an ingredient the player
 *    owns, how much will be consumed, and the number result of the crafting.
 * * New Features!
 * ** New notetags added by Arisu!
 * *** <Proxy: id>
 * *** <Proxy: name>
 * **** REQUIRES the most up to date VisuMZ Items and Equips Core!
 * **** Turns this item, weapon, or armor into a proxy for another item,
 *      allowing you to create recipes with different ingredients in
 *      <Crafting Ingredients> notetag contents and yield the same item.
 * **** The proxy item itself will take on the name, icon, and description of
 *      the original item it is supposed to represent.
 * **** No other properties are carried over from the original.
 * **** When viewed through the Window_ShopStatus window, the contents will
 *      reference the original item and not the proxy item.
 * **** Proxy items themselves cannot be acquired. This includes event
 *      commands, item drops, or equips.
 * **** When crafted, the item yielded won't be the proxy item but the item it
 *      is a proxy for.
 * **** Replace 'id' with a number representing the item, weapon, or armor ID
 *      of the same item type. If the proxy is an item, this will reference an
 *      item. If the proxy is a weapon, this will reference a weapon. Same for
 *      armors.
 * **** Replace 'name' with text representing the item, weapon, or armor's
 *      name. The referenced item needs to be the same item type as the proxy.
 *      Item for item, weapon for weapon, armor for armor.
 * ** New Plugin Parameters added by Arisu!
 * *** Plugin Parameters > General > Vocab > Owned
 * *** Plugin Parameters > General > Vocab > Shift
 * *** Plugin Parameters > General > Vocab > Net
 * **** These are new vocabulary terms for the new number window appearance.
 * 
 * Version 1.11: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.10: June 25, 2021
 * * Bug Fixes!
 * ** When exiting out of the ingredients list back towards the item selection
 *    window, the help window should now be properly updated. Fix by Irina.
 * 
 * Version 1.09: March 12, 2021
 * * Bug Fixes!
 * ** Having extra spaces before an ingredient's name should no longer cause
 *    problems to information parsing. Fix made by Irina.
 * 
 * Version 1.08: March 5, 2021
 * * Feature Update!
 * ** Plugin Commands and Item Crafting Scene option will not appear if you do
 *    not have any recipes prepared at all in your game. Update made by Irina.
 * 
 * Version 1.07: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > General Settings > Switches > Switch: Craft
 * **** Crafting items in Crafting Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Crafting Scene opens.
 * **** This can be used after an "Item Crafting" plugin command to determine
 *      if the player has crafted an item or not.
 * 
 * Version 1.06: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly.
 * *** <Crafting Picture: filename> and <Picture: filename>
 * **** Uses a picture from your project's /img/pictures/ folder instead of the
 *      item, weapon, or armor's icon during crafting instead.
 * 
 * Version 1.05: November 29, 2020
 * * Bug Fixes!
 * ** If on-screen touch buttons are disabled, they will no longer cause crash
 *    errors. Fix made by Arisu.
 * 
 * Version 1.04: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: November 8, 2020
 * * Feature Update!
 * ** Animations are now more compatible with the sprites. Update by Irina.
 * 
 * Version 1.02: October 25, 2020
 * * Bug Fixes!
 * ** Masked Names no longer show in the number input window. Fixed by Irina.
 * ** Plugin no longer requires a new game to be started in order for Item
 *    Crafting to work for the main menu. Fix made by Irina.
 * ** Touch Button for OK will no longer bypass the item requirements.
 *    Fix made by Irina.
 * ** Uncategorized items will now default to a newly created Uncategorized
 *    list of items. Fix made by Irina.
 * * Documentation Update!
 * ** Plugin Parameters > General is updated with "Uncategorized Text" and
 *    "Uncategorized Icon" for uncategorized items.
 *
 * Version 1.01: October 18, 2020
 * * Feature Update!
 * ** Bounce SFX pitch plugin parameter is now uncapped.
 * * Bug Fixes!
 * ** Color matches no longer crash the game if the matching amount is set to
 *    zero. Bug fixed by Yanfly.
 * ** Selecting a category without modern controls will now activate the list
 *    window. Bug fixed by Yanfly.
 * ** The Category Window no longer disappears when there's only one
 *    category. Bug fixed by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.00 Official Release Date: November 2, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ItemCraftingSceneOpen
 * @text Scene: Item Crafting (All)
 * @desc Go to the Item Crafting scene.
 * All enabled recipes will be available.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CustomItemCraftingSceneOpen
 * @text Scene: Item Crafting (Custom)
 * @desc Go to the Item Crafting scene.
 * Select specific items to craft here.
 * 
 * @arg Contents
 *
 * @arg Items:arraynum
 * @text Items
 * @type item[]
 * @parent Contents
 * @desc Select which Item ID(s) to become craftable.
 * @default []
 *
 * @arg Weapons:arraynum
 * @text Weapons
 * @type weapon[]
 * @parent Contents
 * @desc Select which Weapon ID(s) to become craftable.
 * @default []
 *
 * @arg Armors:arraynum
 * @text Armors
 * @type armor[]
 * @parent Contents
 * @desc Select which armor ID(s) to become craftable.
 * @default []
 * 
 * @arg Settings
 *
 * @arg BypassSwitches:eval
 * @text Bypass Switches?
 * @parent Settings
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass any of the requirement switches?
 * @default false
 *
 * @arg BypassMasks:eval
 * @text Bypass Masks?
 * @parent Settings
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass name masking for uncrafted items?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ReturnToLastCrafting
 * @text Scene: Common Event Return
 * @desc Return to the last shop if coming from a Crafting Common Event.
 * Requires VisuMZ_2_ShopCommonEvents!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableItemCraftingMenu
 * @text System: Enable Crafting in Menu?
 * @desc Enables/disables Crafting menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables Crafting menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowItemCraftingMenu
 * @text System: Show Crafting in Menu?
 * @desc Shows/hides Crafting menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Crafting menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemCraftingSys
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings pertaining to Item Crafting.
 * @default {"Scene":"","CraftAssistButton:str":"Craft","CraftedIcon:num":"223","IngredientBridge:str":"+","Categories":"","CategoryIcon:num":"16","CategoryTitle:str":"Pick %1 Type (Quantity: %2)","SelectedColor:str":"17","SelectedText:str":" (Selected)","Uncategorized:str":"Uncategorized","NoCategoryIcon:num":"160","JS":"","jsGlobalListing:func":"\"// Declare Variables\\nlet item = arguments[0]; // This is the item being crafted.\\nlet listed = true;       // Default listing value.\\n\\n// Perform Checks\\n\\n\\n// Return Boolean\\nreturn listed;\"","jsGlobalCraftEffect:func":"\"// Declare Variables\\nlet item = arguments[0];   // This is the item being crafted.\\nlet number = arguments[1]; // This is the number of them being crafted.\\n\\n// Perform Actions\""}
 *
 * @param Mask:struct
 * @text Masking Settings
 * @type struct<Mask>
 * @desc Masking settings related to uncrafted items.
 * @default {"Enable:eval":"true","MaskItalics:eval":"true","MaskLetter:str":"?"}
 *
 * @param MainMenu:struct
 * @text Main Menu Settings
 * @type struct<MainMenu>
 * @desc Main Menu settings for Item Crafting.
 * @default {"Name:str":"Crafting","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 * 
 * @param Animation:struct
 * @text Animation Settings
 * @type struct<Animation>
 * @desc Default settings for playing animations after crafting.
 * @default {"General":"","ShowAnimations:eval":"true","ShowWindows:eval":"false","Animations:arraynum":"[\"44\",\"47\"]","Sprite":"","Scale:num":"8.0","FadeSpeed:num":"4"}
 *
 * @param Sound:struct
 * @text Crafting Sound Settings
 * @type struct<Sound>
 * @desc Default settings for the sound effect played when crafting an item.
 * @default {"name:str":"Skill2","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_ItemCrafting.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Window settings for Scene_ItemCrafting.
 * The window positions are the same as Scene_Shop.
 * @default {"ReqQuantityFontSize:num":"18","ToolTips:eval":"true","name:str":"","BgTypes":"","HelpBgType:num":"0","CategoryBgType:num":"0","GoldBgType:num":"0","ListBgType:num":"0","StatusBgType:num":"0","IngredientTitle:num":"0","IngredientList:num":"0","NumberBgType:num":"0","ButtonAssistBgType:num":"0"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param Scene
 * @text Scene_ItemCrafting
 *
 * @param CraftAssistButton:str
 * @text Assist Button
 * @parent Scene
 * @desc Text used to for the Button Assist Window's OK button when about ready to craft an item.
 * @default Craft
 *
 * @param CraftedIcon:num
 * @text Crafted Icon
 * @parent Scene
 * @desc Icon used to depict of an item has already been crafted.
 * @default 223
 *
 * @param IngredientBridge:str
 * @text Ingredient Bridge
 * @parent Scene
 * @desc Text used to bridge ingredients in the item crafting scene.
 * @default +
 *
 * @param Switches
 *
 * @param SwitchCraft:num
 * @text Switch: Craft
 * @parent Switches
 * @type switch
 * @desc Crafting items in Crafting Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Crafting Scene opens.
 * @default 0
 * 
 * @param Categories
 *
 * @param CategoryIcon:num
 * @text Category Icon
 * @parent Categories
 * @desc Icon used for open-ended ingredients.
 * @default 16
 *
 * @param CategoryTitle:str
 * @text Category Title
 * @parent Categories
 * @desc Text format used for display categories.
 * %1 - Category Name, %2 - Needed Quantity
 * @default Pick %1 Type (Quantity: %2)
 *
 * @param SelectedColor:str
 * @text Selected Color
 * @parent Categories
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param SelectedText:str
 * @text Selected Text
 * @parent Categories
 * @desc This is the add on text that is displayed after an
 * item's name that's already an ingredient.
 * @default  (Selected)
 *
 * @param Uncategorized:str
 * @text Uncategorized Text
 * @parent Categories
 * @desc Text used for an uncategorized item category.
 * @default Uncategorized
 *
 * @param NoCategoryIcon:num
 * @text Uncategorized Icon
 * @parent Categories
 * @desc Icon used for uncategorized item category.
 * @default 160
 * 
 * @param Vocab
 * @text Vocabulary
 *
 * @param NumWindowOwned:str
 * @text Owned
 * @parent Vocab
 * @desc Text used for how much of an item is owned.
 * @default Owned
 *
 * @param NumWindowShift:str
 * @text Shift
 * @parent Vocab
 * @desc Text used for the change in value.
 * @default Change
 *
 * @param NumWindowNet:str
 * @text Net
 * @parent Vocab
 * @desc Text used for the net result.
 * @default Net
 *
 * @param JS
 * @text Global JS Effects
 *
 * @param jsGlobalListing:func
 * @text JS: Listing
 * @parent JS
 * @type note
 * @desc Code that is run globally across all items when checking if an item should be listed or not.
 * @default "// Declare Variables\nlet item = arguments[0]; // This is the item being crafted.\nlet listed = true;       // Default listing value.\n\n// Perform Checks\n\n\n// Return Boolean\nreturn listed;"
 *
 * @param jsGlobalCraftEffect:func
 * @text JS: Craft Effect
 * @parent JS
 * @type note
 * @desc Code that is run globally across all items when crafted.
 * @default "// Declare Variables\nlet item = arguments[0];   // This is the item being crafted.\nlet number = arguments[1]; // This is the number of them being crafted.\n\n// Perform Actions"
 *
 */
/* ----------------------------------------------------------------------------
 * Masking Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mask:
 *
 * @param Enable:eval
 * @text Enable Masking
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable masking for uncrafted items?
 * @default true
 *
 * @param MaskItalics:eval
 * @text Italics For Masking
 * @type boolean
 * @on Italics
 * @off Normal
 * @desc Use Italics when masking?
 * @default true
 *
 * @param MaskLetter:str
 * @text Mask Character
 * @desc Text used for masking per individual character.
 * @default ?
 *
 */
/* ----------------------------------------------------------------------------
 * MainMenu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Crafting' option in the Main Menu.
 * @default Crafting
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Crafting' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Crafting' option to the Main Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Animation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Animation:
 *
 * @param General
 *
 * @param ShowAnimations:eval
 * @text Show Animations?
 * @parent General
 * @type boolean
 * @on Show
 * @off Skip
 * @desc Show animations when crafting an item?
 * @default true
 *
 * @param ShowWindows:eval
 * @text Show Windows?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show windows during an item crafting animation?
 * @default false
 *
 * @param Animations:arraynum
 * @text Default Animations
 * @parent General
 * @type animation[]
 * @desc Default animation(s) do you want to play when crafting.
 * @default ["44","47"]
 *
 * @param Sprite
 * @text Item Sprite
 *
 * @param Scale:num
 * @text Scale
 * @parent Sprite
 * @desc How big do you want the item sprite to be on screen?
 * @default 8.0
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent Sprite
 * @type number
 * @min 1
 * @desc How fast do you want the item to fade in?
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param name:str
 * @text Filename
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Skill2
 *
 * @param volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @type number
 * @max 100
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param ReqQuantityFontSize:num
 * @text Requirement Font Size
 * @parent Windows
 * @desc Font size used for requirement quantity.
 * @default 18
 *
 * @param ToolTips:eval
 * @text Show Tooltips
 * @parent Windows
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show tooltips when the mouse hovers over an ingredient?
 * @default true
 *
 * @param name:str
 * @text Custom Window Skin
 * @parent ToolTips:eval
 * @type file
 * @dir img/system/
 * @desc Select a custom window skin if you want the tooltip window to have one.
 * @default 
 *
 * @param BgTypes
 * @text Background Types
 * @parent Windows
 *
 * @param HelpBgType:num
 * @text Help Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Help Window.
 * @default 0
 *
 * @param CategoryBgType:num
 * @text Category Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Category Window.
 * @default 0
 *
 * @param GoldBgType:num
 * @text Gold Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Gold Window.
 * @default 0
 *
 * @param ListBgType:num
 * @text List Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the List Window.
 * @default 0
 *
 * @param StatusBgType:num
 * @text Status Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Status Window.
 * @default 0
 *
 * @param IngredientTitle:num
 * @text Ingredient Title
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Ingredient Title Window.
 * @default 0
 *
 * @param IngredientList:num
 * @text Ingredient List
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Ingredient List Window.
 * @default 0
 *
 * @param NumberBgType:num
 * @text Number Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Number Window.
 * @default 0
 *
 * @param ButtonAssistBgType:num
 * @text Button Assist Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Number Window.
 * @default 0
 *
 */
//=============================================================================

function _0x2f51(){const _0x13b377=['imrFy','JSON','isTouchOkEnabled','xFHvf','drawTooltipBackground','itemLineRect','buttonAssistText2','drawIngredientCategory','addUncategorizedItemCategory','join','OZdDB','SystemEnableItemCraftingMenu','ParseArmorNotetags','changePaintOpacity','trim','dimColor2','drawIcon','WoNsZ','dHuQp','playItemCrafting','\x20+\x20','_ingredientSelectList','getItemIdWithName','MainMenu','getArmorIdWithName','buttonY','VisuMZ_1_MainMenuCore','ItemsEquipsCore','processCraftCommonEvent','call','_armorIDs','getInputMultiButtonStrings','ShopScene','ARRAYEVAL','ChxGO','ConvertParams','version','goto','isArmor','ParseAllNotetags','setItem','updateCraftingAnimation','_number','Weapons','ARRAYSTR','deactivate','active','Enable','getColor','itemHasCraftCommonEvent','buttonAssistKey2','oZUDM','onNumberCancel','_itemIDs','MRlgV','YsGVD','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','craftableArmors','height','2073seabHe','isItemCraftingCommandVisible','pCgcK','buttonAssistSmallIncrement','_helpWindow','contains','FMexK','createStatusWindow','createCraftingIngredientsLists','ReturnToLastCrafting','refresh','onCategoryOk','bind','EVAL','jsOnCraft','index','maskItalics','JIDCM','RAYFb','Gold','onAnimationFinish','612171iHMgVk','setBackgroundOpacity','ItemScene','isEnabled','scrollTo','length','callUpdateHelp','NoCategoryIcon','%1/%2','postCreateItemWindowModernControls','_lastSymbol','parse','WarningMsg','match','JZNIt','craftPicture','setTooltipWindowText','destroyItemSprite','findSymbol','drawCurrencyValue','Scene_Menu_createCommandWindow','_animationSprite','setItemSpriteFrame','buttonAssistLargeIncrement','ovTFV','initItemCraftingEvents','anchor','visualGoldDisplayNoCost','gYpfl','_item','buyWindowRectItemsEquipsCore','hasCustomWindowSkin','_itemSprite','note','processItemCrafting','bQVge','setHandler','getCustomItemCraftingSettings','AnySwitches','SKwAF','checkItemCraftingResultsValid','CheckAnySwitches','setClickHandler','_craftPicture','gold','applyInverse','onNumberOk','Ingredients','adjustSprite','RGcTK','Armor','lineHeight','TfjaW','popScene','_text','_amount','itemCraftingNumberWindowOk','FadeSpeed','numItems','_tooltipWindow','startAnimation','GoldBgType','smoothSelect','max','onButtonOk','drawBigItemImage','_iconSprite','ItemCraftingNoCategory','_scene','kZEmY','drawBigItemIcon','itemNameY','WGbrW','NumWindowOwned','constructor','_customItemCraftingSettings','isFinishedAnimating','ShowWindows','vfZkD','tooltipFrameCheckRequirements','isCraftingItemMasked','drawCraftingIngredients','drawItemIngredient','ZkKOW','isSceneItemCrafting','innerWidth','_animationPlaying','setItemSpritePosition','_goldWindow','setMainMenuItemCraftingEnabled','Game_System_initialize','OaBUk','addItemCraftingCommand','fuqdN','split','prototype','registerCraftedItem','ItemCraftingMenuCommand','VisuMZ_0_CoreEngine','Mask','DgCJw','initItemCraftingMainMenu','HLmBj','resetFontSettings','craftableItems','\x20=\x20','SelectedText','isMainMenuItemCraftingEnabled','MqMcW','placeButtons','loadSystem','addLoadListener','itemHeight','dgPfh','CraftOnce','changeOkButtonEnable','_windowLayer','weapon','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20item\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20number\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','_weaponIDs','playCancel','getProxyItem','_list','onItemOk','YTeLW','smooth','Window_Selectable_select','fAjiV','createAnimationIDs','EnableMainMenu','STR','tooltipSkin','170keMBov','IconSet','selectedIngredientList','PjQZx','2703964iAGvyM','You\x20do\x20not\x20have\x20any\x20craftable\x20items!\x0aRefer\x20to\x20the\x20help\x20file\x20on\x20how\x20to\x20create\x20crafting\x20recipes.','_clickHandler','setupNumberWindow','contents','powerDownColor','drawCraftedIcon','setValue','hasCraftingEventOccurred','ListBgType','ReqQuantityFontSize','toUpperCase','TurnSwitches','BypassSwitches','bitmap','getCraftingIngredients','updateHelp','setMainMenuItemCraftingVisible','getBackgroundOpacity','Zrvbh','drawCategories','drawGoldIngredient','ChWxb','allCraftableWeapons','setWindowBackgroundTypes','commandItemCrafting','opacity','PeycU','Item','BgFilename1','loseGold','MaDOj','isTouchedInsideFrame','destroy','buttonAssistText4','drawPicture','_backSprite1','_maxIngredientsSize','loadTitle1','BgFilename2','drawIngredientGold','isPlaying','fillRect','drawMathMarks','XVmqn','setBackgroundType','update','bigPicture','_category','drawTotalPrice','parseCraftingIngredientsData','changeTextColor','uXaSI','RJmVr','ItemCraftingSys','Window_MenuCommand_addOriginalCommands','fontItalic','visible','wKqSJ','yWHKm','createContents','process_VisuMZ_ItemCraftingSys_Notetags','enabled','_nonCategoryItemCraftingItems','yNsEB','_max','visualGoldDisplayAutosize','Uncategorized','_ItemCrafting_MainMenu','determineMax','categoryWindowRect','windowskin','createTooltipWindow','itemCraftingIngredientsBridge','Armors','center','createJS','refreshCursor','_ingredientCategories','CraftEventRepeat','NumWindowNet','_craftingIngredients','setFrame','addOriginalCommands','meetsCraftingCommonEventSwitches','drawCraftingItemName','weapons','systemColor','setItemSpriteOpacity','itemCrafting','CategoryBgType','ParseWeaponNotetags','NumWindowShift','KdPzn','scale','GAqbi','eclBX','clearUserSelectedIngredients','setItemSpriteBitmap','JlepZ','format','addCommand','isSceneBattle','needsSelection','baseTextRect','currentCraftableItems','createItemWindow','sQGIu','cursorWidth','SXdZs','qeYPk','%1%2','lNESs','_itemWindow','424194BOhlta','resetCraftingSwitches','onItemCrafted','OnSwitches','itemWindowRect','createNumberWindow','OcvZz','CraftRepeat','return\x200','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','onIngredientListOk','AqUjh','drawFadedItemBackground','#%1','all','isItem','Animation','8YWZEpt','iconHeight','drawText','gOHmT','addChild','CraftedIcon','boxHeight','processFinishAnimation','scaleSprite','Settings','CraftEventOnce','frames','SwitchCraft','down','initialize','pJJDr','activateItemWindow','createCommandWindow','AnySw','_animationWait','NUM','owned','setupSelectIngredientWindow','1346681ZvitGT','name','addItemCategory','reserveCommonEvent','makeItemList','select','fittingHeight','round','totalPriceY','process_VisuMZ_ItemCraftingSys_JS_TraitObject_Notetags','GoldIcon','hanni','vzXmA','xFIsK','show','Sound','_ingredientIndex','finishAnimation','_alreadySelected','Window_ItemCategory_addItemCategory','cancel','right','number','XvvEg','status','_categoryWindow','Owned','maxItems','onItemCancel','armor','goldWindowRectItemsEquipsCore','items','remove','setText','SOGZU','isItemCraftingCategoryValid','addItemCraftingCommandAutomatically','_ingredientsList','onDatabaseLoaded','isReleased','ShowAnimations','loseItem','clear','_ingredientSelectTitle','drawTextEx','allCraftableItems','createAnimation','concat','left','allItems','_bypassProxy','allCraftableArmors','\x20%1','Mbxzd','FQbKz','createIngredientSelectionList','956BevuCz','shift','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ceil','SZtnk','ItemCraftingNumberWindow','category','_craftingEvents','createBackground','isOkEnabled','worldTransform','2687875tjaKiW','imageSmoothingEnabled','_craftingCommonEventScene','makeCommandList','_data','SystemShowItemCraftingMenu','_numberWindow','pSDSi','drawIngredientItem','_allCraftableWeapons','dZyIO','kvneP','OffSwitches','floor','removeChild','RgjUH','mUwAj','getItemCraftedTimes','CoreEngine','ButtonAssistBgType','customCraftingOnly','2469102swdRBU','description','fontSize','windowPadding','destroyAnimationSprite','setHelpWindow','buttonAssistKey1','doesItemHaveOpenCategories','min','CustomItemCraftingSceneOpen','drawItem','Type','CheckAllSwitches','fCghI','loadPicture','goldWindowRect','CategoryTitle','quantityFontSize','ItemQuantityFmt','setup','isPlaytest','itemPadding','STRUCT','enableCraftingSwitches','returnBackToItemWindow','_ingredientAmounts','addWindow','innerHeight','gainItem','textColor','pop','map','hide','isTriggered','categoryList','_buttons','updateAnimationSprite','klwHP','createItemWindowBase','General','eDzjw','aBCNg','LvHlT','Items','Window_ItemCategory_needsSelection','_allCraftableArmors','itemCraftedIcon','exit','string','CdnPV','_statusWindow','parameters','buttonAssistCategory','AllSwitches','net','dimColor1','nGCbN','NoMask','StatusBgType','textWidth','XnTJB','terminate','registerCommand','Snnfl','loadTitle2','XjePs','drawItemName','_buttonAssistWindow','HelpBgType','itemCraftingMask','Name','includes','iconIndex','qeOOk','categories','BypassMasks','itemRectWithPadding','maxGold','fsHcU','updateItemSpriteOpacity','EAQis','JvuGE','animationIDs','KXuuU','_itemsCrafted','CategoryIcon','create','Net','_backSprite2','isItemCrafted','playStaticSe','shown','_itemSpriteOpacitySpeed','initItemCraftingSys','_animationIDs','Icon','item','push','_context','getWeaponIdWithName','Parse_Notetags_CreateJS','_categoryIndex','onIngredientListCancel','jsGlobalListing','ivjne','iconWidth','ARRAYNUM','armors','gradientFillRect','buttonAssistText1','createIngredientSelectionTitle','isCraftItemListed','maskItemName','filter','drawItemBackground','updateTooltipWindow','NumberBgType','VisuMZ_2_ShopCommonEvents','currencyUnit','buttonAssistItemListRequirement','drawIngredients','bXGRV','isMVAnimation','isWeapon','SGrIq','_commandWindow','VgfEQ','setCustomItemCraftingSettings','ParseItemNotetags','IngredientTitle','BgSettings','Cunip','SelectedColor','_allCraftableItems','Animations','RegExp','ItemCraftingSceneOpen','Window_ItemCategory_makeCommandList','createItemSprite','createCraftingItemKey','value','boxWidth','Vxxpo','isItemCraftingCommandEnabled','craftableWeapons','clearCustomItemCraftingSettings','width','activate'];_0x2f51=function(){return _0x13b377;};return _0x2f51();}function _0x2345(_0x5f2578,_0x1e66b1){const _0x2f511a=_0x2f51();return _0x2345=function(_0x2345aa,_0x1475d3){_0x2345aa=_0x2345aa-0x1c4;let _0x355986=_0x2f511a[_0x2345aa];return _0x355986;},_0x2345(_0x5f2578,_0x1e66b1);}const _0x32630c=_0x2345;(function(_0x477c80,_0x297f09){const _0x4a6ee9=_0x2345,_0x22fa5f=_0x477c80();while(!![]){try{const _0x57fd0c=parseInt(_0x4a6ee9(0x403))/0x1+-parseInt(_0x4a6ee9(0x205))/0x2*(-parseInt(_0x4a6ee9(0x2f4))/0x3)+parseInt(_0x4a6ee9(0x391))/0x4+-parseInt(_0x4a6ee9(0x210))/0x5+parseInt(_0x4a6ee9(0x225))/0x6+parseInt(_0x4a6ee9(0x1cd))/0x7*(parseInt(_0x4a6ee9(0x414))/0x8)+-parseInt(_0x4a6ee9(0x309))/0x9*(parseInt(_0x4a6ee9(0x38d))/0xa);if(_0x57fd0c===_0x297f09)break;else _0x22fa5f['push'](_0x22fa5f['shift']());}catch(_0x422868){_0x22fa5f['push'](_0x22fa5f['shift']());}}}(_0x2f51,0x53205));var label=_0x32630c(0x3c7),tier=tier||0x0,dependencies=['VisuMZ_1_ItemsEquipsCore'],pluginData=$plugins[_0x32630c(0x296)](function(_0x149dbf){const _0x200f2a=_0x32630c;return _0x149dbf[_0x200f2a(0x1e5)]&&_0x149dbf[_0x200f2a(0x226)][_0x200f2a(0x26c)]('['+label+']');})[0x0];VisuMZ[label][_0x32630c(0x41d)]=VisuMZ[label][_0x32630c(0x41d)]||{},VisuMZ[_0x32630c(0x2dc)]=function(_0x4cff67,_0x1ea3d7){const _0x3b4548=_0x32630c;for(const _0x10782b in _0x1ea3d7){if(_0x10782b[_0x3b4548(0x316)](/(.*):(.*)/i)){if(_0x3b4548(0x305)===_0x3b4548(0x305)){const _0x208aa8=String(RegExp['$1']),_0x2b368f=String(RegExp['$2'])[_0x3b4548(0x39c)]()[_0x3b4548(0x2c7)]();let _0x446ec7,_0x3fe642,_0x503cf4;switch(_0x2b368f){case _0x3b4548(0x1ca):_0x446ec7=_0x1ea3d7[_0x10782b]!==''?Number(_0x1ea3d7[_0x10782b]):0x0;break;case _0x3b4548(0x28f):_0x3fe642=_0x1ea3d7[_0x10782b]!==''?JSON[_0x3b4548(0x314)](_0x1ea3d7[_0x10782b]):[],_0x446ec7=_0x3fe642[_0x3b4548(0x244)](_0x41abd7=>Number(_0x41abd7));break;case _0x3b4548(0x301):_0x446ec7=_0x1ea3d7[_0x10782b]!==''?eval(_0x1ea3d7[_0x10782b]):null;break;case _0x3b4548(0x2da):_0x3fe642=_0x1ea3d7[_0x10782b]!==''?JSON[_0x3b4548(0x314)](_0x1ea3d7[_0x10782b]):[],_0x446ec7=_0x3fe642['map'](_0x56bd8e=>eval(_0x56bd8e));break;case _0x3b4548(0x2ba):_0x446ec7=_0x1ea3d7[_0x10782b]!==''?JSON[_0x3b4548(0x314)](_0x1ea3d7[_0x10782b]):'';break;case'ARRAYJSON':_0x3fe642=_0x1ea3d7[_0x10782b]!==''?JSON[_0x3b4548(0x314)](_0x1ea3d7[_0x10782b]):[],_0x446ec7=_0x3fe642['map'](_0xa9bc12=>JSON[_0x3b4548(0x314)](_0xa9bc12));break;case'FUNC':_0x446ec7=_0x1ea3d7[_0x10782b]!==''?new Function(JSON[_0x3b4548(0x314)](_0x1ea3d7[_0x10782b])):new Function(_0x3b4548(0x40b));break;case'ARRAYFUNC':_0x3fe642=_0x1ea3d7[_0x10782b]!==''?JSON[_0x3b4548(0x314)](_0x1ea3d7[_0x10782b]):[],_0x446ec7=_0x3fe642[_0x3b4548(0x244)](_0x5ac247=>new Function(JSON['parse'](_0x5ac247)));break;case _0x3b4548(0x38b):_0x446ec7=_0x1ea3d7[_0x10782b]!==''?String(_0x1ea3d7[_0x10782b]):'';break;case _0x3b4548(0x2e5):_0x3fe642=_0x1ea3d7[_0x10782b]!==''?JSON[_0x3b4548(0x314)](_0x1ea3d7[_0x10782b]):[],_0x446ec7=_0x3fe642[_0x3b4548(0x244)](_0x1a6a51=>String(_0x1a6a51));break;case _0x3b4548(0x23b):_0x503cf4=_0x1ea3d7[_0x10782b]!==''?JSON[_0x3b4548(0x314)](_0x1ea3d7[_0x10782b]):{},_0x446ec7=VisuMZ['ConvertParams']({},_0x503cf4);break;case'ARRAYSTRUCT':_0x3fe642=_0x1ea3d7[_0x10782b]!==''?JSON[_0x3b4548(0x314)](_0x1ea3d7[_0x10782b]):[],_0x446ec7=_0x3fe642[_0x3b4548(0x244)](_0x3951ed=>VisuMZ[_0x3b4548(0x2dc)]({},JSON[_0x3b4548(0x314)](_0x3951ed)));break;default:continue;}_0x4cff67[_0x208aa8]=_0x446ec7;}else this[_0x3b4548(0x283)]=[],this[_0x3b4548(0x326)][_0x3b4548(0x32a)][_0x3b4548(0x316)](_0x3a0a5c[_0x3b4548(0x3c7)][_0x3b4548(0x2ac)][_0x3b4548(0x277)])?this[_0x3b4548(0x283)]=_0x428865['$1']['split'](',')[_0x3b4548(0x244)](_0x47345b=>_0x5e62ff(_0x47345b)):this[_0x3b4548(0x283)]=this['_animationIDs'][_0x3b4548(0x1fc)](_0x5db81b[_0x3b4548(0x3c7)][_0x3b4548(0x41d)][_0x3b4548(0x413)][_0x3b4548(0x2ab)]);}}return _0x4cff67;},(_0x288386=>{const _0x26cc29=_0x32630c,_0x186b62=_0x288386['name'];for(const _0x1808ac of dependencies){if(_0x26cc29(0x275)===_0x26cc29(0x325)){const _0x5c152a=_0x53922a[_0x323860];if(!_0x5c152a)return;const _0x5b4d03=this[_0x26cc29(0x29f)](_0x5c152a);this['_animationSprite']=new(_0x5b4d03?_0x546839:_0xc08906)();const _0x1dbfa1=[this['_itemSprite']],_0x3da769=0x0;this[_0x26cc29(0x31e)][_0x26cc29(0x238)](_0x1dbfa1,_0x5c152a,![],_0x3da769,null),this[_0x26cc29(0x418)](this[_0x26cc29(0x31e)]);}else{if(!Imported[_0x1808ac]){alert(_0x26cc29(0x2f1)[_0x26cc29(0x3f5)](_0x186b62,_0x1808ac)),SceneManager[_0x26cc29(0x254)]();break;}}}const _0x4ce8cc=_0x288386['description'];if(_0x4ce8cc['match'](/\[Version[ ](.*?)\]/i)){const _0x37f51f=Number(RegExp['$1']);if(_0x37f51f!==VisuMZ[label][_0x26cc29(0x2dd)]){if(_0x26cc29(0x209)!==_0x26cc29(0x209)){if(this['_category']===_0x26cc29(0x34c)){const _0x545a4b=_0x53ff00[_0x26cc29(0x34d)];if(_0x545a4b&&_0x545a4b[_0x26cc29(0x1e6)]&&_0x545a4b[_0x26cc29(0x1e6)]['_nonCategoryItemCraftingItems'])return _0x545a4b[_0x26cc29(0x1e6)][_0x26cc29(0x3d0)][_0x26cc29(0x26c)](_0xd02099);}return _0x51395e[_0x26cc29(0x368)]['includes'][_0x26cc29(0x2d6)](this,_0xbc1f7c);}else alert(_0x26cc29(0x40c)[_0x26cc29(0x3f5)](_0x186b62,_0x37f51f)),SceneManager[_0x26cc29(0x254)]();}}if(_0x4ce8cc[_0x26cc29(0x316)](/\[Tier[ ](\d+)\]/i)){const _0xddbcda=Number(RegExp['$1']);_0xddbcda<tier?(alert(_0x26cc29(0x207)[_0x26cc29(0x3f5)](_0x186b62,_0xddbcda,tier)),SceneManager[_0x26cc29(0x254)]()):tier=Math[_0x26cc29(0x348)](_0xddbcda,tier);}VisuMZ[_0x26cc29(0x2dc)](VisuMZ[label][_0x26cc29(0x41d)],_0x288386[_0x26cc29(0x258)]);})(pluginData),VisuMZ[_0x32630c(0x3c7)][_0x32630c(0x315)]=_0x32630c(0x392),PluginManager[_0x32630c(0x263)](pluginData['name'],_0x32630c(0x2ad),_0x4f7646=>{const _0x1f8179=_0x32630c;if(SceneManager[_0x1f8179(0x3f7)]())return;if(SceneManager[_0x1f8179(0x35d)]())return;if($gameSystem['_craftingCommonEventScene'])return;if(DataManager['currentCraftableItems']()[_0x1f8179(0x30e)]<=0x0){$gameTemp[_0x1f8179(0x239)]()&&(_0x1f8179(0x2ef)==='HqKiA'?this['windowskin']=_0x335a06[_0x1f8179(0x377)](_0x5c6171[_0x1f8179(0x38c)]):alert(VisuMZ['ItemCraftingSys'][_0x1f8179(0x315)]));return;}SceneManager[_0x1f8179(0x286)](Scene_ItemCrafting);}),PluginManager[_0x32630c(0x263)](pluginData[_0x32630c(0x1ce)],_0x32630c(0x22e),_0x38bbea=>{const _0x33da5b=_0x32630c;if(SceneManager['isSceneBattle']())return;if(SceneManager['isSceneItemCrafting']())return;if($gameSystem['_craftingCommonEventScene'])return;VisuMZ[_0x33da5b(0x2dc)](_0x38bbea,_0x38bbea);const _0x1007cc={'items':_0x38bbea[_0x33da5b(0x250)]['map'](_0x6c788e=>$dataItems[_0x6c788e])['filter'](_0x50fa19=>DataManager['allCraftableItems']()['includes'](_0x50fa19)),'weapons':_0x38bbea[_0x33da5b(0x2e4)][_0x33da5b(0x244)](_0x4604cf=>$dataWeapons[_0x4604cf])[_0x33da5b(0x296)](_0xe4ecc0=>DataManager[_0x33da5b(0x3a8)]()[_0x33da5b(0x26c)](_0xe4ecc0)),'armors':_0x38bbea[_0x33da5b(0x3db)][_0x33da5b(0x244)](_0x33cd9a=>$dataArmors[_0x33cd9a])[_0x33da5b(0x296)](_0x43c795=>DataManager['allCraftableArmors']()[_0x33da5b(0x26c)](_0x43c795)),'BypassSwitches':_0x38bbea['BypassSwitches'],'BypassMasks':_0x38bbea[_0x33da5b(0x270)]};_0x1007cc[_0x33da5b(0x411)]=_0x1007cc['items'][_0x33da5b(0x1fc)](_0x1007cc['weapons'],_0x1007cc[_0x33da5b(0x290)]);if(_0x1007cc[_0x33da5b(0x411)][_0x33da5b(0x30e)]<=0x0){if(_0x33da5b(0x3fe)!=='SXdZs'){let _0x3977df=_0x98da2a[0x0],_0x4da7e1='';if(_0x3977df==='gold')_0x4da7e1=_0x32632c[_0x33da5b(0x29b)];else typeof _0x3977df===_0x33da5b(0x255)&&_0x3977df[_0x33da5b(0x316)](/CATEGORY/i)?(_0x3977df[_0x33da5b(0x316)](/CATEGORY: (.*)/i),_0x4da7e1=_0x3fe5f0(_0x4726b8['$1'])[_0x33da5b(0x2c7)]()):_0x4da7e1=_0x3977df[_0x33da5b(0x1ce)];this[_0x33da5b(0x344)][_0x33da5b(0x1ee)](_0x4da7e1[_0x33da5b(0x2c7)]());return;}else{if($gameTemp[_0x33da5b(0x239)]()){if('ovTFV'!==_0x33da5b(0x321)){if(!_0x37adcb[_0x33da5b(0x27e)](_0x22cd69))return;const _0x4ab132=_0x5db620[_0x33da5b(0x253)];let _0x2d5061=_0x470a6e['x']+_0x17a9a6[_0x33da5b(0x2b7)]-_0x2943e6['iconWidth'],_0x14b0a7=_0x46cd3b['y']+0x2;this[_0x33da5b(0x2c9)](_0x4ab132,_0x2d5061,_0x14b0a7);}else alert(VisuMZ['ItemCraftingSys'][_0x33da5b(0x315)]);}return;}}$gameTemp[_0x33da5b(0x2a4)](_0x1007cc),SceneManager[_0x33da5b(0x286)](Scene_ItemCrafting);}),PluginManager[_0x32630c(0x263)](pluginData[_0x32630c(0x1ce)],_0x32630c(0x2fd),_0x48f2d4=>{const _0x18eeeb=_0x32630c;if(!SceneManager['isSceneMap']())return;if(!$gameSystem['_craftingCommonEventScene'])return;$gameSystem[_0x18eeeb(0x212)]=undefined,SceneManager[_0x18eeeb(0x286)](Scene_ItemCrafting);}),PluginManager[_0x32630c(0x263)](pluginData['name'],_0x32630c(0x2c4),_0x21202b=>{const _0x4a1bc2=_0x32630c;VisuMZ[_0x4a1bc2(0x2dc)](_0x21202b,_0x21202b),$gameSystem[_0x4a1bc2(0x362)](_0x21202b[_0x4a1bc2(0x2e8)]);}),PluginManager['registerCommand'](pluginData['name'],_0x32630c(0x215),_0x333583=>{const _0x358108=_0x32630c;VisuMZ['ConvertParams'](_0x333583,_0x333583),$gameSystem[_0x358108(0x3a2)](_0x333583['Show']);}),VisuMZ[_0x32630c(0x3c7)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x32630c(0x368)][_0x32630c(0x1f3)],Scene_Boot[_0x32630c(0x368)][_0x32630c(0x1f3)]=function(){const _0x3c51e9=_0x32630c;VisuMZ[_0x3c51e9(0x3c7)]['Scene_Boot_onDatabaseLoaded'][_0x3c51e9(0x2d6)](this),this[_0x3c51e9(0x3ce)]();},Scene_Boot['prototype'][_0x32630c(0x3ce)]=function(){const _0xae4f7a=_0x32630c;this[_0xae4f7a(0x1d6)]();},VisuMZ[_0x32630c(0x3c7)][_0x32630c(0x2ac)]={'Ingredients':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) INGREDIENTS>\s*([\s\S]*)\s*<\/(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) INGREDIENTS>/i,'AllSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) SHOW (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'AnySwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) SHOW (?:ANY SWITCH|ANY SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'OnSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) TURN ON (?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'OffSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) TURN OFF (?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'MaskText':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) MASK:[ ](.*)>/i,'NoMask':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) NO MASK>/i,'customCraftingOnly':/<CUSTOM (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) ONLY>/i,'jsOnCraft':/<JS (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) EFFECT>\s*([\s\S]*)\s*<\/JS (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) EFFECT>/i,'animationIDs':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) (?:ANIMATION|ANIMATIONS|ANI):[ ](.*)>/i,'opacitySpeed':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) FADE SPEED:[ ](\d+)>/i,'craftPicture':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'CraftEventOnce':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT):[ ](\d+)>/i,'CraftEventRepeat':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT):[ ](\d+)>/i,'CraftOnceAllSw':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:SWITCH|SWITCHES|ALL SWITCHES):[ ](.*)>/i,'CraftOnceAnySw':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:ANY SWITCH|ANY SWITCHES):[ ](.*)>/i,'CraftRepeatAllSw':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:SWITCH|SWITCHES|ALL SWITCHES):[ ](.*)>/i,'CraftRepeatAnySw':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:ANY SWITCH|ANY SWITCHES):[ ](.*)>/i},Scene_Boot['prototype'][_0x32630c(0x1d6)]=function(){const _0x7f7e27=_0x32630c;if(VisuMZ[_0x7f7e27(0x2e0)])return;const _0x3fc3c4=$dataItems[_0x7f7e27(0x1fc)]($dataWeapons,$dataArmors);for(const _0x26b71f of _0x3fc3c4){if(!_0x26b71f)continue;VisuMZ[_0x7f7e27(0x3c7)]['Parse_Notetags_CreateJS'](_0x26b71f);}},VisuMZ[_0x32630c(0x3c7)]['ParseItemNotetags']=VisuMZ[_0x32630c(0x2a5)],VisuMZ[_0x32630c(0x2a5)]=function(_0x5d02ba){const _0x1fa716=_0x32630c;VisuMZ[_0x1fa716(0x3c7)][_0x1fa716(0x2a5)][_0x1fa716(0x2d6)](this,_0x5d02ba),VisuMZ[_0x1fa716(0x3c7)][_0x1fa716(0x289)](_0x5d02ba);},VisuMZ['ItemCraftingSys'][_0x32630c(0x3ec)]=VisuMZ['ParseWeaponNotetags'],VisuMZ[_0x32630c(0x3ec)]=function(_0x5c702c){const _0x23ee2f=_0x32630c;VisuMZ[_0x23ee2f(0x3c7)][_0x23ee2f(0x3ec)][_0x23ee2f(0x2d6)](this,_0x5c702c),VisuMZ[_0x23ee2f(0x3c7)][_0x23ee2f(0x289)](_0x5c702c);},VisuMZ[_0x32630c(0x3c7)][_0x32630c(0x2c5)]=VisuMZ[_0x32630c(0x2c5)],VisuMZ[_0x32630c(0x2c5)]=function(_0x2d9ec9){const _0x6f1bcb=_0x32630c;VisuMZ[_0x6f1bcb(0x3c7)]['ParseArmorNotetags'][_0x6f1bcb(0x2d6)](this,_0x2d9ec9),VisuMZ[_0x6f1bcb(0x3c7)][_0x6f1bcb(0x289)](_0x2d9ec9);},VisuMZ['ItemCraftingSys'][_0x32630c(0x289)]=function(_0x1bd9c8){const _0x1bc372=_0x32630c;if(_0x1bd9c8[_0x1bc372(0x32a)][_0x1bc372(0x316)](VisuMZ[_0x1bc372(0x3c7)][_0x1bc372(0x2ac)]['jsOnCraft'])){if(_0x1bc372(0x264)===_0x1bc372(0x2a3)){let _0x374212=_0x3543b8['itemCraftingIngredientsBridge'],_0x4eba52=_0x3aab1a['y']+(_0x27b4f6[_0x1bc372(0x2f3)]-this[_0x1bc372(0x33c)]()*1.5);this['drawText'](_0x374212,_0x40a81d,_0x4eba52,_0x6decf7,_0x1bc372(0x3dc));}else VisuMZ[_0x1bc372(0x3c7)][_0x1bc372(0x3dd)](_0x1bd9c8,RegExp['$1']);}},VisuMZ[_0x32630c(0x3c7)]['JS']={},VisuMZ[_0x32630c(0x3c7)]['createJS']=function(_0x155099,_0x1c3e08){const _0xf904cd=_0x32630c,_0x5d43cf=_0xf904cd(0x37f)['format'](_0x1c3e08),_0x1f8e85=DataManager['createCraftingItemKey'](_0x155099);VisuMZ['ItemCraftingSys']['JS'][_0x1f8e85]=new Function(_0x5d43cf);},DataManager[_0x32630c(0x294)]=function(_0x2788b6){const _0xba024a=_0x32630c;if(!_0x2788b6)return![];if(DataManager[_0xba024a(0x3a0)](_0x2788b6)[_0xba024a(0x30e)]<=0x0){if('WGbrW'===_0xba024a(0x351))return![];else this['initialize'](...arguments);}if(_0x2788b6[_0xba024a(0x32a)][_0xba024a(0x316)](VisuMZ['ItemCraftingSys'][_0xba024a(0x2ac)][_0xba024a(0x224)])){if(_0xba024a(0x357)===_0xba024a(0x357)){if(!$gameTemp['getCustomItemCraftingSettings']())return![];}else{const _0x38e572=_0x421e63[_0xba024a(0x3c7)][_0xba024a(0x41d)][_0xba024a(0x24c)];let _0x896226=_0x550dd2-_0x56496c[_0xba024a(0x1d4)](_0x17ed34[_0xba024a(0x28e)]/0x2),_0xbb1164=_0x3ee36f+_0x3c2385[_0xba024a(0x1d4)]((this[_0xba024a(0x33c)]()-_0x514440[_0xba024a(0x415)])/0x2);this[_0xba024a(0x2c9)](_0x38e572[_0xba024a(0x27a)],_0x896226,_0xbb1164),_0x2659c8['match'](/CATEGORY: (.*)/i);const _0x166902=_0x53df40(_0x31087e['$1'])[_0xba024a(0x2c7)]();let _0x208b4d=_0xbf90fe-_0x2e5759['round'](_0x70fe20/0x2),_0x1b4ffa=_0x3743cb;this[_0xba024a(0x395)][_0xba024a(0x227)]=_0x2649c3[_0xba024a(0x236)],this['drawText'](_0x166902,_0x208b4d,_0x1b4ffa,_0x1ba437,_0xba024a(0x3dc));let _0x3eec35=_0x1082a1-_0x39fe48['round'](_0x57eeaf/0x2),_0x1edde6=_0x2683e9+this[_0xba024a(0x33c)]();const _0x57c68d=_0x250f71[_0xba024a(0x2d4)]['Settings']['ItemScene'][_0xba024a(0x237)];let _0x4f4f3c=_0x57c68d[_0xba024a(0x3f5)](_0x3d351e);this[_0xba024a(0x395)][_0xba024a(0x227)]=_0x933e04[_0xba024a(0x236)],this['drawText'](_0x4f4f3c,_0x3eec35,_0x1edde6,_0x5824f5,_0xba024a(0x3dc));}}if(!VisuMZ[_0xba024a(0x3c7)]['Settings'][_0xba024a(0x24c)][_0xba024a(0x28c)][_0xba024a(0x2d6)](this,_0x2788b6))return![];if(!VisuMZ[_0xba024a(0x3c7)]['CheckAllSwitches'](_0x2788b6))return![];if(!VisuMZ[_0xba024a(0x3c7)]['CheckAnySwitches'](_0x2788b6))return![];return!![];},VisuMZ[_0x32630c(0x3c7)][_0x32630c(0x231)]=function(_0x131426){const _0x209a21=_0x32630c,_0x477f2e=$gameTemp['getCustomItemCraftingSettings']();if(_0x477f2e&&_0x477f2e[_0x209a21(0x39e)])return!![];const _0x2b1a13=VisuMZ['ItemCraftingSys'][_0x209a21(0x2ac)][_0x209a21(0x25a)],_0x4fd2f0=_0x131426[_0x209a21(0x32a)][_0x209a21(0x316)](_0x2b1a13);if(_0x4fd2f0)for(const _0x37eb1b of _0x4fd2f0){if(_0x209a21(0x375)===_0x209a21(0x375)){if(!_0x37eb1b)continue;_0x37eb1b['match'](_0x2b1a13);const _0x4b7238=JSON[_0x209a21(0x314)]('['+RegExp['$1'][_0x209a21(0x316)](/\d+/g)+']');for(const _0x5db7fa of _0x4b7238){if(_0x209a21(0x3b0)===_0x209a21(0x3b0)){if(!$gameSwitches[_0x209a21(0x2b1)](_0x5db7fa))return![];}else _0x1c8064=_0x27ba9b[_0x209a21(0x382)](_0x3c776c);}}else{if(_0x1a8f6a[_0x209a21(0x2b1)](_0x136832)===![])return![];}}return!![];},VisuMZ[_0x32630c(0x3c7)][_0x32630c(0x332)]=function(_0x38a4a9){const _0x49b58f=_0x32630c,_0x428cb6=$gameTemp[_0x49b58f(0x32e)]();if(_0x428cb6&&_0x428cb6[_0x49b58f(0x39e)])return!![];const _0x32fe38=VisuMZ[_0x49b58f(0x3c7)]['RegExp'][_0x49b58f(0x32f)],_0x55e18d=_0x38a4a9[_0x49b58f(0x32a)][_0x49b58f(0x316)](_0x32fe38);if(_0x55e18d){for(const _0x16b91a of _0x55e18d){if(!_0x16b91a)continue;_0x16b91a['match'](_0x32fe38);const _0x5f89e7=JSON[_0x49b58f(0x314)]('['+RegExp['$1'][_0x49b58f(0x316)](/\d+/g)+']');for(const _0x30654e of _0x5f89e7){if(_0x49b58f(0x1d9)!=='CBvVx'){if($gameSwitches[_0x49b58f(0x2b1)](_0x30654e))return!![];}else _0x1949d1[_0x49b58f(0x398)](_0x236e20,_0x42c87f);}}return![];}return!![];},DataManager[_0x32630c(0x3fa)]=function(){const _0x3b8b04=_0x32630c,_0x2417c7=$gameTemp[_0x3b8b04(0x32e)]();if(_0x2417c7)return _0x2417c7['all'][_0x3b8b04(0x296)](_0x5074df=>this[_0x3b8b04(0x294)](_0x5074df));const _0x4567fa=this[_0x3b8b04(0x371)](),_0x14b330=this[_0x3b8b04(0x2b5)](),_0x13ced7=this['craftableArmors']();return _0x4567fa[_0x3b8b04(0x1fc)](_0x14b330,_0x13ced7);},DataManager[_0x32630c(0x371)]=function(){const _0x3f2ba0=_0x32630c;return this[_0x3f2ba0(0x1fa)]()[_0x3f2ba0(0x296)](_0x156170=>this[_0x3f2ba0(0x294)](_0x156170));},DataManager[_0x32630c(0x1fa)]=function(){const _0x2de381=_0x32630c;if(this[_0x2de381(0x2aa)]!==undefined)return this[_0x2de381(0x2aa)];this['_allCraftableItems']=[];for(const _0x323733 of $dataItems){if('ORekF'===_0x2de381(0x401)){if(!_0x38ea0f)return![];if(this['_itemsCrafted']===_0x3bfffb)this[_0x2de381(0x282)]();_0x571e4a=_0x9cf276||0x1;let _0x5105ee={};if(_0x377f64[_0x2de381(0x412)](_0x5339c3))_0x5105ee=this[_0x2de381(0x279)][_0x2de381(0x1ec)];if(_0x1853c9['isWeapon'](_0x1dc299))_0x5105ee=this[_0x2de381(0x279)]['weapons'];if(_0x2a554a[_0x2de381(0x2df)](_0x1e7760))_0x5105ee=this['_itemsCrafted'][_0x2de381(0x290)];_0x5105ee[_0x14502f['id']]=_0x5105ee[_0x166af9['id']]||0x0,_0x5105ee[_0x472add['id']]+=_0x3cc068;}else{if(!_0x323733)continue;_0x323733[_0x2de381(0x32a)][_0x2de381(0x316)](VisuMZ['ItemCraftingSys'][_0x2de381(0x2ac)][_0x2de381(0x338)])&&this[_0x2de381(0x2aa)][_0x2de381(0x286)](_0x323733);}}return this[_0x2de381(0x2aa)];},DataManager[_0x32630c(0x2b5)]=function(){const _0x2e138e=_0x32630c;return this[_0x2e138e(0x3a8)]()[_0x2e138e(0x296)](_0x96700e=>this[_0x2e138e(0x294)](_0x96700e));},DataManager['allCraftableWeapons']=function(){const _0x327d0e=_0x32630c;if(this[_0x327d0e(0x219)]!==undefined)return this[_0x327d0e(0x219)];this['_allCraftableWeapons']=[];for(const _0x2fa2a6 of $dataWeapons){if('pSDSi'===_0x327d0e(0x217)){if(!_0x2fa2a6)continue;_0x2fa2a6['note'][_0x327d0e(0x316)](VisuMZ[_0x327d0e(0x3c7)]['RegExp'][_0x327d0e(0x338)])&&this[_0x327d0e(0x219)][_0x327d0e(0x286)](_0x2fa2a6);}else return _0x2ced74[_0x327d0e(0x1e5)]&&_0x2418e0[_0x327d0e(0x226)][_0x327d0e(0x26c)]('['+_0x3adc47+']');}return this[_0x327d0e(0x219)];},DataManager[_0x32630c(0x2f2)]=function(){const _0x4b5f7e=_0x32630c;return this[_0x4b5f7e(0x200)]()['filter'](_0x402e0f=>this['isCraftItemListed'](_0x402e0f));},DataManager[_0x32630c(0x200)]=function(){const _0x397c62=_0x32630c;if(this[_0x397c62(0x252)]!==undefined)return this[_0x397c62(0x252)];this[_0x397c62(0x252)]=[];for(const _0x1b5c59 of $dataArmors){if(!_0x1b5c59)continue;if(_0x1b5c59[_0x397c62(0x32a)]['match'](VisuMZ[_0x397c62(0x3c7)][_0x397c62(0x2ac)][_0x397c62(0x338)])){if(_0x397c62(0x3a4)!==_0x397c62(0x2cb))this[_0x397c62(0x252)]['push'](_0x1b5c59);else{let _0x52b278=_0x54a697[0x0];this['resetFontSettings'](),this[_0x397c62(0x3bc)](_0x5d9126,'-'),_0x52b278===_0x397c62(0x335)?this['drawGoldIngredient'](_0x725364,_0x4ac7a9,!![]):this[_0x397c62(0x35b)](_0x1e1a89,_0x22749a,!![],![]);}}}return this[_0x397c62(0x252)];},DataManager[_0x32630c(0x3a0)]=function(_0x3b0d6d){const _0x166807=_0x32630c;if(!_0x3b0d6d)return[];const _0x3c2d0e=this['createCraftingItemKey'](_0x3b0d6d);return this['_craftingIngredients']===undefined&&this[_0x166807(0x2fc)](),this['_craftingIngredients'][_0x3c2d0e]||[];},DataManager[_0x32630c(0x2b0)]=function(_0x1c91fc){const _0x3b0b1b=_0x32630c;let _0xc2eb57=_0x3b0b1b(0x400);if(this[_0x3b0b1b(0x412)](_0x1c91fc))return _0xc2eb57[_0x3b0b1b(0x3f5)](_0x3b0b1b(0x3ad),_0x1c91fc['id']);if(this[_0x3b0b1b(0x2a0)](_0x1c91fc))return _0xc2eb57[_0x3b0b1b(0x3f5)]('Weapon',_0x1c91fc['id']);if(this[_0x3b0b1b(0x2df)](_0x1c91fc))return _0xc2eb57[_0x3b0b1b(0x3f5)](_0x3b0b1b(0x33b),_0x1c91fc['id']);return'';},DataManager[_0x32630c(0x2fc)]=function(){const _0x45b2f6=_0x32630c;this[_0x45b2f6(0x3e2)]={};const _0x20c7c4=$dataItems['concat']($dataWeapons,$dataArmors);for(const _0x440359 of _0x20c7c4){if(!_0x440359)continue;if(_0x440359['note'][_0x45b2f6(0x316)](VisuMZ[_0x45b2f6(0x3c7)][_0x45b2f6(0x2ac)][_0x45b2f6(0x338)])){if(_0x45b2f6(0x3f0)===_0x45b2f6(0x3f0)){const _0x8858f8=String(RegExp['$1'])['split'](/[\r\n]+/),_0xda37ab=this[_0x45b2f6(0x3c3)](_0x440359,_0x8858f8);if(_0xda37ab[_0x45b2f6(0x30e)]<=0x0)continue;const _0x947dc7=this[_0x45b2f6(0x2b0)](_0x440359);this[_0x45b2f6(0x3e2)][_0x947dc7]=_0xda37ab;}else{if(this[_0x45b2f6(0x216)]&&this[_0x45b2f6(0x216)][_0x45b2f6(0x2e7)])return _0x3ef6bd[_0x45b2f6(0x2d8)](_0x45b2f6(0x1fd),_0x45b2f6(0x1e2));return _0x10ae0f[_0x45b2f6(0x368)][_0x45b2f6(0x22b)][_0x45b2f6(0x2d6)](this);}}}},DataManager['parseCraftingIngredientsData']=function(_0xfe0b62,_0x37a388){const _0x1882b2=_0x32630c;let _0x414415=[];for(let _0x1575b7 of _0x37a388){if(_0x1882b2(0x266)==='XjePs'){_0x1575b7=_0x1575b7[_0x1882b2(0x2c7)]();if(_0x1575b7['match'](/GOLD:[ ](\d+)/i))_0x414415[_0x1882b2(0x286)](['gold',Number(RegExp['$1'])]);else{if(_0x1575b7[_0x1882b2(0x316)](/CATEGORY[ ](.*):[ ](\d+)/i)){const _0x4ceee6=String(RegExp['$1'])[_0x1882b2(0x2c7)](),_0x5dcb79=Number(RegExp['$2'])||0x1,_0x2ac931='category:\x20%1'[_0x1882b2(0x3f5)](_0x4ceee6);_0x414415[_0x1882b2(0x286)]([_0x2ac931,_0x5dcb79]);}else{if(_0x1575b7[_0x1882b2(0x316)](/(.*?)[ ](\d+):[ ](\d+)/i)){const _0x4c1539=RegExp['$1']['toLowerCase']()[_0x1882b2(0x2c7)](),_0x36e381=Number(RegExp['$2'])||0x0,_0x5f5d5c=Number(RegExp['$3'])||0x1;let _0x2efe04=null;if([_0x1882b2(0x285),_0x1882b2(0x1ec)]['includes'](_0x4c1539))_0x2efe04=$dataItems;if([_0x1882b2(0x37e),_0x1882b2(0x3e7)]['includes'](_0x4c1539))_0x2efe04=$dataWeapons;if([_0x1882b2(0x1ea),_0x1882b2(0x290)][_0x1882b2(0x26c)](_0x4c1539))_0x2efe04=$dataArmors;if(this[_0x1882b2(0x331)](_0xfe0b62,_0x2efe04,_0x36e381,_0x414415)){if(_0x1882b2(0x24d)!=='sggDR')_0x414415[_0x1882b2(0x286)]([_0x2efe04[_0x36e381],_0x5f5d5c]);else{this['_category']=_0x4104ad[_0x1882b2(0x230)];for(const _0xbe52e5 of _0x51b438){_0x13e77a[_0x1882b2(0x368)][_0x1882b2(0x26c)][_0x1882b2(0x2d6)](this,_0xbe52e5)&&_0x89c9c[_0x1882b2(0x286)](_0xbe52e5);}}}}else{if(_0x1575b7[_0x1882b2(0x316)](/(.*?)[ ](.*):[ ](\d+)/i)){if(_0x1882b2(0x366)===_0x1882b2(0x366)){const _0x12a85c=RegExp['$1']['toLowerCase']()[_0x1882b2(0x2c7)](),_0x5cf16e=RegExp['$2'][_0x1882b2(0x2c7)](),_0x329d94=Number(RegExp['$3'])||0x1;let _0x5de167=null,_0x4aab56=0x0;['item',_0x1882b2(0x1ec)][_0x1882b2(0x26c)](_0x12a85c)&&(_0x5de167=$dataItems,_0x4aab56=this[_0x1882b2(0x2cf)](_0x5cf16e));[_0x1882b2(0x37e),'weapons']['includes'](_0x12a85c)&&(_0x5de167=$dataWeapons,_0x4aab56=this[_0x1882b2(0x288)](_0x5cf16e));if([_0x1882b2(0x1ea),_0x1882b2(0x290)][_0x1882b2(0x26c)](_0x12a85c)){if(_0x1882b2(0x21b)!=='kvneP'){const _0x2f3f59=_0x3cc95a[_0x55c5e5],_0x54aa6d=_0x5617a4['ItemCraftingNumberWindow'][_0x2f3f59];this[_0x1882b2(0x416)](_0x54aa6d,_0x1132b2+_0x280d78*_0x251c8e+_0x14ef69,_0x3a8897,_0x239b18-_0x57bb5f,_0x1882b2(0x3dc));}else _0x5de167=$dataArmors,_0x4aab56=this[_0x1882b2(0x2d1)](_0x5cf16e);}this[_0x1882b2(0x331)](_0xfe0b62,_0x5de167,_0x4aab56,_0x414415)&&_0x414415['push']([_0x5de167[_0x4aab56],_0x329d94]);}else{if(!this[_0x1882b2(0x344)])return;this['tooltipFrameCheckRequirements']()?this[_0x1882b2(0x319)]():this[_0x1882b2(0x344)][_0x1882b2(0x1ee)]('');const _0x176fcb=new _0x3926(_0x2bbcd7['x'],_0x4d7917['y']),_0x456768=this['worldTransform']['applyInverse'](_0x176fcb);this[_0x1882b2(0x344)]['x']=_0x456768['x']-this[_0x1882b2(0x344)]['width']/0x2,this[_0x1882b2(0x344)]['y']=_0x456768['y']-this[_0x1882b2(0x344)][_0x1882b2(0x2f3)];}}}}}}else _0x4f3a4a[_0x1882b2(0x316)](/CATEGORY: (.*)/i),_0x4df4ea=_0x315fc4(_0x6d7fa3['$1'])[_0x1882b2(0x2c7)]();}return _0x414415;},DataManager[_0x32630c(0x331)]=function(_0x287f06,_0x530f98,_0x8942a8,_0x408e8a){if(!_0x530f98)return![];if(!_0x530f98[_0x8942a8])return![];const _0x25b06e=_0x530f98[_0x8942a8];if(_0x25b06e===_0x287f06)return![];for(const _0x3b6b1b of _0x408e8a){if(!_0x3b6b1b)continue;if(_0x3b6b1b[0x0]===_0x25b06e)return![];}return!![];},DataManager['getItemIdWithName']=function(_0x545ed9){const _0xd3cc4d=_0x32630c;_0x545ed9=_0x545ed9[_0xd3cc4d(0x39c)]()['trim'](),this[_0xd3cc4d(0x2ee)]=this['_itemIDs']||{};if(this[_0xd3cc4d(0x2ee)][_0x545ed9])return this[_0xd3cc4d(0x2ee)][_0x545ed9];for(const _0x32f0d8 of $dataItems){if(!_0x32f0d8)continue;this['_itemIDs'][_0x32f0d8[_0xd3cc4d(0x1ce)][_0xd3cc4d(0x39c)]()[_0xd3cc4d(0x2c7)]()]=_0x32f0d8['id'];}return this['_itemIDs'][_0x545ed9]||0x0;},DataManager[_0x32630c(0x288)]=function(_0xe9a4b0){const _0x11c9fd=_0x32630c;_0xe9a4b0=_0xe9a4b0[_0x11c9fd(0x39c)]()[_0x11c9fd(0x2c7)](),this[_0x11c9fd(0x380)]=this['_weaponIDs']||{};if(this[_0x11c9fd(0x380)][_0xe9a4b0])return this[_0x11c9fd(0x380)][_0xe9a4b0];for(const _0x12f565 of $dataWeapons){if(!_0x12f565)continue;this[_0x11c9fd(0x380)][_0x12f565[_0x11c9fd(0x1ce)]['toUpperCase']()[_0x11c9fd(0x2c7)]()]=_0x12f565['id'];}return this[_0x11c9fd(0x380)][_0xe9a4b0]||0x0;},DataManager[_0x32630c(0x2d1)]=function(_0x3917f1){const _0x585d0b=_0x32630c;_0x3917f1=_0x3917f1['toUpperCase']()[_0x585d0b(0x2c7)](),this[_0x585d0b(0x2d7)]=this[_0x585d0b(0x2d7)]||{};if(this['_armorIDs'][_0x3917f1])return this[_0x585d0b(0x2d7)][_0x3917f1];for(const _0x1ede58 of $dataArmors){if(!_0x1ede58)continue;this['_armorIDs'][_0x1ede58[_0x585d0b(0x1ce)]['toUpperCase']()['trim']()]=_0x1ede58['id'];}return this['_armorIDs'][_0x3917f1]||0x0;},DataManager[_0x32630c(0x359)]=function(_0xa414a1){const _0x3ff812=_0x32630c;if(!_0xa414a1)return![];if(!VisuMZ[_0x3ff812(0x3c7)][_0x3ff812(0x41d)]['Mask']['Enable'])return![];DataManager[_0x3ff812(0x382)]&&(_0xa414a1=DataManager[_0x3ff812(0x382)](_0xa414a1));const _0x2800bf=$gameTemp[_0x3ff812(0x32e)]();if(_0x2800bf&&_0x2800bf[_0x3ff812(0x270)])return![];if(_0xa414a1[_0x3ff812(0x32a)][_0x3ff812(0x316)](VisuMZ[_0x3ff812(0x3c7)][_0x3ff812(0x2ac)][_0x3ff812(0x25e)]))return![];return!$gameSystem[_0x3ff812(0x27e)](_0xa414a1);},ImageManager[_0x32630c(0x253)]=VisuMZ['ItemCraftingSys'][_0x32630c(0x41d)][_0x32630c(0x24c)][_0x32630c(0x419)],SoundManager['playItemCrafting']=function(_0x5ef27c){const _0xb77828=_0x32630c;AudioManager[_0xb77828(0x27f)](VisuMZ[_0xb77828(0x3c7)][_0xb77828(0x41d)][_0xb77828(0x1dc)]);},TextManager[_0x32630c(0x3da)]=VisuMZ[_0x32630c(0x3c7)]['Settings'][_0x32630c(0x24c)]['IngredientBridge'],TextManager[_0x32630c(0x341)]=VisuMZ[_0x32630c(0x3c7)][_0x32630c(0x41d)][_0x32630c(0x24c)]['CraftAssistButton'],TextManager[_0x32630c(0x26a)]=VisuMZ[_0x32630c(0x3c7)][_0x32630c(0x41d)][_0x32630c(0x36c)]['MaskLetter'],TextManager['ItemCraftingMenuCommand']=VisuMZ[_0x32630c(0x3c7)]['Settings'][_0x32630c(0x2d0)][_0x32630c(0x26b)],TextManager[_0x32630c(0x20a)]={'owned':VisuMZ[_0x32630c(0x3c7)][_0x32630c(0x41d)][_0x32630c(0x24c)][_0x32630c(0x352)]||_0x32630c(0x1e7),'shift':VisuMZ[_0x32630c(0x3c7)][_0x32630c(0x41d)]['General'][_0x32630c(0x3ed)]||'Change','net':VisuMZ[_0x32630c(0x3c7)]['Settings'][_0x32630c(0x24c)][_0x32630c(0x3e1)]||_0x32630c(0x27c)},ColorManager['getColor']=function(_0x18694d){const _0x51a2eb=_0x32630c;return _0x18694d=String(_0x18694d),_0x18694d[_0x51a2eb(0x316)](/#(.*)/i)?_0x51a2eb(0x3c5)!==_0x51a2eb(0x364)?_0x51a2eb(0x410)[_0x51a2eb(0x3f5)](String(RegExp['$1'])):this[_0x51a2eb(0x216)]&&this['_numberWindow'][_0x51a2eb(0x2e7)]?_0x246900[_0x51a2eb(0x341)]:_0x3c5142[_0x51a2eb(0x368)]['buttonAssistText4'][_0x51a2eb(0x2d6)](this):this[_0x51a2eb(0x242)](Number(_0x18694d));},SceneManager['isSceneBattle']=function(){const _0x2a0893=_0x32630c;return this[_0x2a0893(0x34d)]&&this['_scene'][_0x2a0893(0x353)]===Scene_Battle;},SceneManager[_0x32630c(0x35d)]=function(){const _0x3199b1=_0x32630c;return this[_0x3199b1(0x34d)]&&this[_0x3199b1(0x34d)][_0x3199b1(0x353)]===Scene_ItemCrafting;},Game_Temp[_0x32630c(0x368)]['getCustomItemCraftingSettings']=function(){const _0x2d1962=_0x32630c;return this[_0x2d1962(0x354)];},Game_Temp[_0x32630c(0x368)]['clearCustomItemCraftingSettings']=function(){const _0x443728=_0x32630c;this[_0x443728(0x354)]=undefined;},Game_Temp[_0x32630c(0x368)][_0x32630c(0x2a4)]=function(_0xb8a904){this['_customItemCraftingSettings']=_0xb8a904;},VisuMZ[_0x32630c(0x3c7)]['Game_System_initialize']=Game_System[_0x32630c(0x368)][_0x32630c(0x1c4)],Game_System[_0x32630c(0x368)][_0x32630c(0x1c4)]=function(){const _0x4c96c8=_0x32630c;VisuMZ[_0x4c96c8(0x3c7)][_0x4c96c8(0x363)]['call'](this),this[_0x4c96c8(0x36e)](),this[_0x4c96c8(0x282)](),this[_0x4c96c8(0x322)]();},Game_System['prototype'][_0x32630c(0x36e)]=function(){const _0x44ec02=_0x32630c;this[_0x44ec02(0x3d5)]={'shown':VisuMZ[_0x44ec02(0x3c7)]['Settings']['MainMenu']['ShowMainMenu'],'enabled':VisuMZ[_0x44ec02(0x3c7)][_0x44ec02(0x41d)][_0x44ec02(0x2d0)][_0x44ec02(0x38a)]};},Game_System['prototype']['isMainMenuItemCraftingVisible']=function(){const _0x89f4f7=_0x32630c;if(this[_0x89f4f7(0x3d5)]===undefined)this[_0x89f4f7(0x36e)]();return this[_0x89f4f7(0x3d5)][_0x89f4f7(0x280)];},Game_System[_0x32630c(0x368)][_0x32630c(0x3a2)]=function(_0x86458e){const _0x19217f=_0x32630c;if(this[_0x19217f(0x3d5)]===undefined)this[_0x19217f(0x36e)]();this['_ItemCrafting_MainMenu'][_0x19217f(0x280)]=_0x86458e;},Game_System[_0x32630c(0x368)][_0x32630c(0x374)]=function(){const _0x2a8683=_0x32630c;if(this[_0x2a8683(0x3d5)]===undefined)this[_0x2a8683(0x36e)]();return this[_0x2a8683(0x3d5)][_0x2a8683(0x3cf)];},Game_System[_0x32630c(0x368)][_0x32630c(0x362)]=function(_0xd1af34){const _0x27bd04=_0x32630c;if(this[_0x27bd04(0x3d5)]===undefined)this[_0x27bd04(0x36e)]();this['_ItemCrafting_MainMenu'][_0x27bd04(0x3cf)]=_0xd1af34;},Game_System[_0x32630c(0x368)][_0x32630c(0x282)]=function(){const _0x109cfe=_0x32630c;this[_0x109cfe(0x279)]={'items':{},'weapons':{},'armors':{}};},Game_System[_0x32630c(0x368)][_0x32630c(0x27e)]=function(_0x2356d9){const _0x32977c=_0x32630c;return!!this[_0x32977c(0x221)](_0x2356d9);},Game_System[_0x32630c(0x368)][_0x32630c(0x221)]=function(_0x4f1bac){const _0x4590d4=_0x32630c;if(!_0x4f1bac)return![];if(this['_itemsCrafted']===undefined)this['initItemCraftingSys']();let _0x549949={};if(DataManager[_0x4590d4(0x412)](_0x4f1bac))_0x549949=this[_0x4590d4(0x279)]['items'];if(DataManager[_0x4590d4(0x2a0)](_0x4f1bac))_0x549949=this['_itemsCrafted'][_0x4590d4(0x3e7)];if(DataManager[_0x4590d4(0x2df)](_0x4f1bac))_0x549949=this[_0x4590d4(0x279)][_0x4590d4(0x290)];return _0x549949[_0x4f1bac['id']]||0x0;},Game_System['prototype'][_0x32630c(0x369)]=function(_0x3d918c,_0xf8d94f){const _0x487a5f=_0x32630c;if(!_0x3d918c)return![];if(this[_0x487a5f(0x279)]===undefined)this[_0x487a5f(0x282)]();_0xf8d94f=_0xf8d94f||0x1;let _0x1d2fdb={};if(DataManager[_0x487a5f(0x412)](_0x3d918c))_0x1d2fdb=this['_itemsCrafted'][_0x487a5f(0x1ec)];if(DataManager[_0x487a5f(0x2a0)](_0x3d918c))_0x1d2fdb=this[_0x487a5f(0x279)]['weapons'];if(DataManager[_0x487a5f(0x2df)](_0x3d918c))_0x1d2fdb=this[_0x487a5f(0x279)][_0x487a5f(0x290)];_0x1d2fdb[_0x3d918c['id']]=_0x1d2fdb[_0x3d918c['id']]||0x0,_0x1d2fdb[_0x3d918c['id']]+=_0xf8d94f;},Game_System[_0x32630c(0x368)][_0x32630c(0x322)]=function(){const _0x1ffe3b=_0x32630c;this[_0x1ffe3b(0x20c)]={'items':[],'weapons':[],'armors':[]};},Game_System[_0x32630c(0x368)]['registerCraftingEvent']=function(_0x329376){const _0x363fa6=_0x32630c;if(this[_0x363fa6(0x20c)]===undefined)this[_0x363fa6(0x322)]();let _0x56a5b1=[];if(DataManager[_0x363fa6(0x412)](_0x329376)){if(_0x363fa6(0x306)===_0x363fa6(0x306))_0x56a5b1=this[_0x363fa6(0x20c)][_0x363fa6(0x1ec)];else{const _0x1fc0ba=this['itemPadding']();let _0x4525cc=_0x1fc0ba*0x2;const _0x55d8a4=this[_0x363fa6(0x35e)]-_0x4525cc-_0x1fc0ba*0x3,_0x324db0=_0x4525cc+_0x51170b[_0x363fa6(0x208)](_0x55d8a4/0x3),_0x242dc1=_0x28c7c9['floor'](_0x55d8a4*0x2/0x3/0x3),_0xf88213=_0x5314a8[_0x363fa6(0x348)](this[_0x363fa6(0x260)](_0x363fa6(0x2cd)),this[_0x363fa6(0x260)]('\x20=\x20')),_0x3f9f97=_0xac8a8[0x0],_0x5cf0f5=_0x4df1fb[0x1],_0xcd08f3=_0x5cf0f5*this[_0x363fa6(0x2e3)],_0x4692dd=_0x49d159['CoreEngine']?_0x4e2e1e[_0x363fa6(0x222)][_0x363fa6(0x41d)][_0x363fa6(0x307)][_0x363fa6(0x1d7)]:0x0;if(_0x4692dd>0x0){const _0x4472f3=_0x383927+(this['lineHeight']()-_0x3485e9[_0x363fa6(0x415)])/0x2;this[_0x363fa6(0x2c9)](_0x4692dd,_0x4525cc,_0x4472f3);const _0x2d9d3a=_0x519ea3[_0x363fa6(0x28e)]+0x4;_0x4525cc+=_0x2d9d3a;}this[_0x363fa6(0x3c4)](_0x5afa16[_0x363fa6(0x3e8)]()),this['drawText'](_0x17bee6[_0x363fa6(0x29b)],_0x4525cc,_0x50c2d6,_0x242dc1,_0x363fa6(0x1fd));const _0x406f40=_0x412d73['gold']();this[_0x363fa6(0x31c)](_0x406f40,_0x182be7[_0x363fa6(0x29b)],_0x324db0,_0x2ca290,_0x242dc1);const _0x530054=_0x324db0+_0x242dc1*0x1+_0xf88213,_0x3650b6=_0x242dc1-_0xf88213;this[_0x363fa6(0x31c)](_0xcd08f3,_0x47151d[_0x363fa6(0x29b)],_0x530054,_0x8a43ed,_0x3650b6);const _0x642101=_0x324db0+_0x242dc1*0x2+_0xf88213,_0x35deba=_0x242dc1-_0xf88213,_0x2bc5fa=_0x4a5003['min'](_0x406f40+_0xcd08f3*(_0x44cd55?-0x1:0x1),_0x263bf2['maxGold']());this[_0x363fa6(0x31c)](_0x2bc5fa,_0x40c0ab['currencyUnit'],_0x642101,_0x2d517c,_0x35deba);}}else{if(DataManager[_0x363fa6(0x2a0)](_0x329376))_0x56a5b1=this[_0x363fa6(0x20c)][_0x363fa6(0x3e7)];else{if(DataManager[_0x363fa6(0x2df)](_0x329376)){if(_0x363fa6(0x21f)!==_0x363fa6(0x21f)){const _0x5e2478=_0x1e316a[_0x363fa6(0x3c7)]['Settings']['Animation']['Scale']||0x8;this['_iconSprite'][_0x363fa6(0x3ef)]['x']=_0x5e2478,this[_0x363fa6(0x34b)][_0x363fa6(0x3ef)]['y']=_0x5e2478;}else _0x56a5b1=this[_0x363fa6(0x20c)][_0x363fa6(0x290)];}}}!_0x56a5b1[_0x363fa6(0x26c)](_0x329376['id'])&&_0x56a5b1[_0x363fa6(0x286)](_0x329376['id']);},Game_System[_0x32630c(0x368)][_0x32630c(0x399)]=function(_0xb9ae56){const _0x1e4aa1=_0x32630c;if(this[_0x1e4aa1(0x20c)]===undefined)this[_0x1e4aa1(0x322)]();let _0x553d6e=[];if(DataManager['isItem'](_0xb9ae56)){if(_0x1e4aa1(0x1d8)!=='vIQSY')_0x553d6e=this[_0x1e4aa1(0x20c)][_0x1e4aa1(0x1ec)];else{if(!_0x2e73f3)return![];if(_0x143980[_0x1e4aa1(0x3a0)](_0x212f97)['length']<=0x0)return![];if(_0x86aec0[_0x1e4aa1(0x32a)][_0x1e4aa1(0x316)](_0x435d4c['ItemCraftingSys'][_0x1e4aa1(0x2ac)][_0x1e4aa1(0x224)])){if(!_0x22f700['getCustomItemCraftingSettings']())return![];}if(!_0x486cf6[_0x1e4aa1(0x3c7)][_0x1e4aa1(0x41d)][_0x1e4aa1(0x24c)][_0x1e4aa1(0x28c)][_0x1e4aa1(0x2d6)](this,_0x5a2cbd))return![];if(!_0x46d56b[_0x1e4aa1(0x3c7)][_0x1e4aa1(0x231)](_0x4ccfc3))return![];if(!_0x3d8de7[_0x1e4aa1(0x3c7)][_0x1e4aa1(0x332)](_0x1bed15))return![];return!![];}}else{if(DataManager[_0x1e4aa1(0x2a0)](_0xb9ae56))_0x553d6e=this[_0x1e4aa1(0x20c)][_0x1e4aa1(0x3e7)];else DataManager['isArmor'](_0xb9ae56)&&(_0x553d6e=this[_0x1e4aa1(0x20c)][_0x1e4aa1(0x290)]);}return _0x553d6e[_0x1e4aa1(0x26c)](_0xb9ae56['id']);},VisuMZ[_0x32630c(0x3c7)]['Scene_Menu_createCommandWindow']=Scene_Menu[_0x32630c(0x368)]['createCommandWindow'],Scene_Menu[_0x32630c(0x368)][_0x32630c(0x1c7)]=function(){const _0x48c7e3=_0x32630c;VisuMZ[_0x48c7e3(0x3c7)][_0x48c7e3(0x31d)][_0x48c7e3(0x2d6)](this);const _0x1f6311=this['_commandWindow'];_0x1f6311[_0x48c7e3(0x32d)](_0x48c7e3(0x3ea),this[_0x48c7e3(0x3aa)][_0x48c7e3(0x300)](this));},Scene_Menu[_0x32630c(0x368)][_0x32630c(0x3aa)]=function(){const _0x4fc487=_0x32630c;SceneManager[_0x4fc487(0x286)](Scene_ItemCrafting);};function Scene_ItemCrafting(){const _0x27a17a=_0x32630c;this[_0x27a17a(0x1c4)](...arguments);}Scene_ItemCrafting[_0x32630c(0x368)]=Object[_0x32630c(0x27b)](Scene_Item[_0x32630c(0x368)]),Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x353)]=Scene_ItemCrafting,Scene_ItemCrafting[_0x32630c(0x368)]['initialize']=function(){const _0x287201=_0x32630c;Scene_Item['prototype'][_0x287201(0x1c4)][_0x287201(0x2d6)](this),$gameSystem['_craftingCommonEventScene']=undefined;},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x3bf)]=function(){const _0x40363a=_0x32630c;Scene_Item['prototype'][_0x40363a(0x3bf)][_0x40363a(0x2d6)](this),this[_0x40363a(0x2e2)]();},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x27b)]=function(){const _0xb8a0ef=_0x32630c;Scene_Item[_0xb8a0ef(0x368)]['create'][_0xb8a0ef(0x2d6)](this),this['createGoldWindow'](),this['createNumberWindow'](),this[_0xb8a0ef(0x293)](),this[_0xb8a0ef(0x204)](),this['isUseModernControls']()&&(_0xb8a0ef(0x2b9)!=='imrFy'?this[_0xb8a0ef(0x354)]=_0x5aafe1:this['onCategoryOk']()),this['setWindowBackgroundTypes'](),this['resetCraftingSwitches']();},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x3a9)]=function(){const _0x420e14=_0x32630c,_0x2bfa8c=VisuMZ['ItemCraftingSys'][_0x420e14(0x41d)]['Window'];this['_helpWindow']&&this[_0x420e14(0x2f8)][_0x420e14(0x3be)](_0x2bfa8c[_0x420e14(0x269)]),this['_categoryWindow']&&(_0x420e14(0x232)!==_0x420e14(0x3ee)?this['_categoryWindow'][_0x420e14(0x3be)](_0x2bfa8c[_0x420e14(0x3eb)]):this[_0x420e14(0x1d6)]()),this['_goldWindow']&&this['_goldWindow']['setBackgroundType'](_0x2bfa8c[_0x420e14(0x346)]),this[_0x420e14(0x402)]&&(_0x420e14(0x3cb)!==_0x420e14(0x3cb)?this['_craftPicture']=_0x49179c(_0x3ef52e['$1']):this[_0x420e14(0x402)]['setBackgroundType'](_0x2bfa8c[_0x420e14(0x39a)])),this[_0x420e14(0x257)]&&this[_0x420e14(0x257)][_0x420e14(0x3be)](_0x2bfa8c[_0x420e14(0x25f)]),this[_0x420e14(0x1f8)]&&this[_0x420e14(0x1f8)][_0x420e14(0x3be)](_0x2bfa8c[_0x420e14(0x2a6)]),this[_0x420e14(0x2ce)]&&this[_0x420e14(0x2ce)]['setBackgroundType'](_0x2bfa8c['IngredientList']),this[_0x420e14(0x216)]&&this[_0x420e14(0x216)]['setBackgroundType'](_0x2bfa8c[_0x420e14(0x299)]),this[_0x420e14(0x268)]&&(_0x420e14(0x417)===_0x420e14(0x390)?this[_0x420e14(0x257)][_0x420e14(0x2e1)](_0x41c79d):this[_0x420e14(0x268)][_0x420e14(0x3be)](_0x2bfa8c[_0x420e14(0x223)]));},Scene_ItemCrafting[_0x32630c(0x368)]['helpWindowRect']=function(){const _0x4df6e1=_0x32630c;return Scene_Shop[_0x4df6e1(0x368)]['helpWindowRectItemsEquipsCore'][_0x4df6e1(0x2d6)](this);},Scene_ItemCrafting[_0x32630c(0x368)]['createGoldWindow']=function(){const _0x1b30ac=_0x32630c,_0x4cd37d=this['goldWindowRect']();this[_0x1b30ac(0x361)]=new Window_Gold(_0x4cd37d),this['addWindow'](this[_0x1b30ac(0x361)]);},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x234)]=function(){const _0x5a2972=_0x32630c;return Scene_Shop['prototype'][_0x5a2972(0x1eb)][_0x5a2972(0x2d6)](this);},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x3d7)]=function(){const _0x2f37c9=_0x32630c;return Scene_Shop['prototype']['commandWindowRectItemsEquipsCore'][_0x2f37c9(0x2d6)](this);},Scene_ItemCrafting['prototype'][_0x32630c(0x3fb)]=function(){const _0x28d249=_0x32630c;this['createItemWindowBase']();if(this['isUseModernControls']()){if(_0x28d249(0x220)===_0x28d249(0x278)){_0xdfd79d['ItemCraftingSys']['Scene_Menu_createCommandWindow'][_0x28d249(0x2d6)](this);const _0x282e0c=this[_0x28d249(0x2a2)];_0x282e0c[_0x28d249(0x32d)](_0x28d249(0x3ea),this[_0x28d249(0x3aa)]['bind'](this));}else this[_0x28d249(0x312)]();}this['allowCreateStatusWindow']()&&(_0x28d249(0x2ec)!==_0x28d249(0x2ec)?(this['scaleSprite'](_0x47ede6),this['centerSprite'](_0x407cdb)):(this[_0x28d249(0x2fb)](),this[_0x28d249(0x23f)](this[_0x28d249(0x402)])));},Scene_ItemCrafting['prototype'][_0x32630c(0x24b)]=function(){const _0xbcdc38=_0x32630c,_0x22c360=this[_0xbcdc38(0x407)]();this[_0xbcdc38(0x402)]=new Window_ItemCraftingList(_0x22c360),this['_itemWindow']['setHelpWindow'](this[_0xbcdc38(0x2f8)]),this['_itemWindow'][_0xbcdc38(0x32d)]('ok',this['onItemOk'][_0xbcdc38(0x300)](this)),this[_0xbcdc38(0x402)][_0xbcdc38(0x32d)](_0xbcdc38(0x1e1),this[_0xbcdc38(0x1e9)][_0xbcdc38(0x300)](this)),this[_0xbcdc38(0x23f)](this[_0xbcdc38(0x402)]),this[_0xbcdc38(0x1e6)]['setItemWindow'](this[_0xbcdc38(0x402)]),!this[_0xbcdc38(0x1e6)][_0xbcdc38(0x3f8)]()&&(this[_0xbcdc38(0x402)]['y']-=this[_0xbcdc38(0x1e6)][_0xbcdc38(0x2f3)],this[_0xbcdc38(0x402)]['height']+=this[_0xbcdc38(0x1e6)][_0xbcdc38(0x2f3)],this['_categoryWindow'][_0xbcdc38(0x245)](),this[_0xbcdc38(0x1e6)][_0xbcdc38(0x2e6)](),this[_0xbcdc38(0x2ff)]());},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x407)]=function(){const _0x161a50=_0x32630c;return this['_commandWindow']=this[_0x161a50(0x1e6)],Scene_Shop[_0x161a50(0x368)][_0x161a50(0x327)]['call'](this);},Scene_ItemCrafting[_0x32630c(0x368)]['statusWindowRect']=function(){return Scene_Shop['prototype']['statusWindowRectItemsEquipsCore']['call'](this);},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x408)]=function(){const _0x14d6bd=_0x32630c,_0x18ec26=this[_0x14d6bd(0x407)]();this[_0x14d6bd(0x216)]=new Window_ItemCraftingNumber(_0x18ec26),this[_0x14d6bd(0x216)][_0x14d6bd(0x245)](),this[_0x14d6bd(0x216)][_0x14d6bd(0x32d)]('ok',this[_0x14d6bd(0x337)]['bind'](this)),this[_0x14d6bd(0x216)][_0x14d6bd(0x32d)](_0x14d6bd(0x1e1),this[_0x14d6bd(0x2ed)][_0x14d6bd(0x300)](this)),this[_0x14d6bd(0x23f)](this[_0x14d6bd(0x216)]);},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x293)]=function(){const _0x17b5e9=_0x32630c,_0x425ec9=this[_0x17b5e9(0x3d7)]();this[_0x17b5e9(0x1f8)]=new Window_Selectable(_0x425ec9),this[_0x17b5e9(0x1f8)][_0x17b5e9(0x245)](),this[_0x17b5e9(0x23f)](this[_0x17b5e9(0x1f8)]);},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x204)]=function(){const _0x3a391e=_0x32630c,_0x1bf4e1=this[_0x3a391e(0x407)](),_0x23eb0d=new Window_ItemCraftingIngredient(_0x1bf4e1);_0x23eb0d[_0x3a391e(0x245)](),_0x23eb0d[_0x3a391e(0x22a)](this[_0x3a391e(0x2f8)]),_0x23eb0d['setStatusWindow'](this[_0x3a391e(0x257)]),_0x23eb0d[_0x3a391e(0x32d)]('ok',this['onIngredientListOk'][_0x3a391e(0x300)](this)),_0x23eb0d['setHandler'](_0x3a391e(0x1e1),this[_0x3a391e(0x28b)][_0x3a391e(0x300)](this)),this[_0x3a391e(0x2ce)]=_0x23eb0d,this[_0x3a391e(0x23f)](this[_0x3a391e(0x2ce)]);},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x2ff)]=function(){const _0x103f49=_0x32630c;this[_0x103f49(0x402)][_0x103f49(0x2b8)](),this['_itemWindow']['smoothSelect'](0x0);},Scene_ItemCrafting['prototype'][_0x32630c(0x384)]=function(){const _0x2ca66b=_0x32630c;$gameTemp['_bypassProxy']=!![],this[_0x2ca66b(0x326)]=this[_0x2ca66b(0x402)][_0x2ca66b(0x285)](),this['_itemWindow'][_0x2ca66b(0x245)](),this['clearUserSelectedIngredients'](),this[_0x2ca66b(0x22c)]()?this[_0x2ca66b(0x1cc)]():this[_0x2ca66b(0x394)](),$gameTemp[_0x2ca66b(0x1ff)]=![],this['_item']=this[_0x2ca66b(0x402)][_0x2ca66b(0x285)]();},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x394)]=function(){const _0x54bf0a=_0x32630c;this['_ingredientSelectTitle']['hide'](),this['_ingredientSelectList'][_0x54bf0a(0x245)](),this['_categoryWindow'][_0x54bf0a(0x1db)](),$gameTemp[_0x54bf0a(0x1ff)]=!![],this['_numberWindow'][_0x54bf0a(0x238)](this[_0x54bf0a(0x402)][_0x54bf0a(0x285)]()),$gameTemp[_0x54bf0a(0x1ff)]=![],this[_0x54bf0a(0x216)][_0x54bf0a(0x1db)](),this[_0x54bf0a(0x216)][_0x54bf0a(0x2b8)]();},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x1c6)]=function(){const _0x3fa3bd=_0x32630c;this[_0x3fa3bd(0x216)][_0x3fa3bd(0x245)](),this[_0x3fa3bd(0x1f8)]['hide'](),this[_0x3fa3bd(0x2ce)][_0x3fa3bd(0x245)](),this[_0x3fa3bd(0x1e6)][_0x3fa3bd(0x1db)](),this[_0x3fa3bd(0x402)][_0x3fa3bd(0x1db)](),this[_0x3fa3bd(0x402)][_0x3fa3bd(0x2b8)](),this[_0x3fa3bd(0x402)][_0x3fa3bd(0x3a1)]();},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x337)]=function(){const _0x52ac2d=_0x32630c;if(VisuMZ['ItemCraftingSys'][_0x52ac2d(0x41d)][_0x52ac2d(0x413)][_0x52ac2d(0x1f5)]){if('SPfZP'===_0x52ac2d(0x261))return _0x22e9e5=_0x34506b(_0x23f2bc),_0x8f7b9b[_0x52ac2d(0x316)](/#(.*)/i)?_0x52ac2d(0x410)[_0x52ac2d(0x3f5)](_0x38f76d(_0x4f2501['$1'])):this[_0x52ac2d(0x242)](_0x346cb9(_0x2de802));else this['startAnimation']();}else this['finishAnimation']();},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x1de)]=function(){const _0x240726=_0x32630c;this[_0x240726(0x37d)][_0x240726(0x3ca)]=!![],this[_0x240726(0x35f)]=![],this['processItemCrafting'](),this[_0x240726(0x405)](),this[_0x240726(0x308)]();},Scene_ItemCrafting[_0x32630c(0x368)]['onAnimationFinish']=function(){const _0x143767=_0x32630c;if(this[_0x143767(0x2ea)]()){if(_0x143767(0x33a)!==_0x143767(0x273))this[_0x143767(0x2d5)]();else{const _0x306fc6=_0x18fb04[_0x143767(0x233)](_0x72afb7);_0x306fc6[_0x143767(0x378)](this[_0x143767(0x3b4)]['bind'](this,_0x4baf13,_0x306fc6));}}else this[_0x143767(0x23d)]();},Scene_ItemCrafting['prototype']['returnBackToItemWindow']=function(){const _0x13fc4e=_0x32630c;this['activateItemWindow'](),this[_0x13fc4e(0x402)][_0x13fc4e(0x2fe)](),this[_0x13fc4e(0x1e6)][_0x13fc4e(0x2fe)](),this[_0x13fc4e(0x1e6)][_0x13fc4e(0x3de)](),this['_categoryWindow'][_0x13fc4e(0x30f)](),this[_0x13fc4e(0x361)][_0x13fc4e(0x2fe)](),this[_0x13fc4e(0x402)][_0x13fc4e(0x3a1)]();},Scene_ItemCrafting['prototype'][_0x32630c(0x32b)]=function(){const _0x532c9d=_0x32630c;$gameTemp['_bypassProxy']=!![];let _0x518a03=this['_itemWindow']['item']();$gameTemp[_0x532c9d(0x1ff)]=![];const _0x220078=this['_numberWindow'][_0x532c9d(0x1e3)](),_0x16dced=DataManager[_0x532c9d(0x3a0)](_0x518a03);let _0x18f4c0=0x0;for(const _0xe659fa of _0x16dced){if('LpEpT'==='eETXY')this[_0x532c9d(0x216)][_0x532c9d(0x3be)](_0x172c29[_0x532c9d(0x299)]);else{if(!_0xe659fa)continue;let _0x2893b1=_0xe659fa[0x0];const _0xb529da=_0xe659fa[0x1]*_0x220078;if(_0x2893b1===_0x532c9d(0x335))$gameParty[_0x532c9d(0x3af)](_0xb529da);else{if(_0x532c9d(0x29e)===_0x532c9d(0x1ef))this[_0x532c9d(0x35b)](_0x592b28,_0x40827b,!![],![]);else{if(typeof _0x2893b1===_0x532c9d(0x255)&&_0x2893b1[_0x532c9d(0x316)](/CATEGORY/i)){if(_0x532c9d(0x1da)===_0x532c9d(0x3bd)){const _0x36acb4=new _0x5e240a(_0x56c782,_0x3de065,_0x25f2da,this['lineHeight']());this['drawCraftingItemName'](_0x452865,_0x36acb4),this[_0x532c9d(0x2c9)](_0x277b85[_0x532c9d(0x26d)],_0x36acb4['x'],_0x36acb4['y']);}else _0x2893b1=this[_0x532c9d(0x1f2)][_0x18f4c0],_0x18f4c0+=0x1;}$gameParty[_0x532c9d(0x1f6)](_0x2893b1,_0xb529da,![]);}}}}_0x518a03=this['_itemWindow'][_0x532c9d(0x285)](),$gameParty[_0x532c9d(0x241)](_0x518a03,_0x220078),this[_0x532c9d(0x216)]['number']()>0x0?SoundManager[_0x532c9d(0x2cc)]():SoundManager[_0x532c9d(0x381)](),$gameSystem[_0x532c9d(0x369)](_0x518a03,_0x220078);},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x405)]=function(){const _0x394706=_0x32630c,_0x539d31=this['_item'],_0x3a9fbf=this[_0x394706(0x216)][_0x394706(0x1e3)]();VisuMZ['ItemCraftingSys'][_0x394706(0x39d)](_0x539d31,!![]),VisuMZ[_0x394706(0x3c7)][_0x394706(0x39d)](_0x539d31,![]),this[_0x394706(0x23c)]();const _0x48d696=DataManager['createCraftingItemKey'](_0x539d31);if(VisuMZ['ItemCraftingSys']['JS'][_0x48d696]){if(_0x394706(0x3d1)==='wHUEr'){const _0x45ec8c=_0xb3e86b[_0x394706(0x3c7)][_0x394706(0x41d)][_0x394706(0x24c)];this['contents'][_0x394706(0x242)]=_0x1b6b23['getColor'](_0x45ec8c[_0x394706(0x2a9)]),_0x112b73+=_0x45ec8c[_0x394706(0x373)];}else VisuMZ[_0x394706(0x3c7)]['JS'][_0x48d696][_0x394706(0x2d6)](this,_0x539d31,_0x3a9fbf);}VisuMZ[_0x394706(0x3c7)][_0x394706(0x41d)]['General']['jsGlobalCraftEffect'][_0x394706(0x2d6)](this,_0x539d31,_0x3a9fbf);},VisuMZ[_0x32630c(0x3c7)][_0x32630c(0x39d)]=function(_0x3b4ae9,_0x4d2527){const _0x4bef3c=_0x32630c,_0x1192e4=_0x4d2527?VisuMZ[_0x4bef3c(0x3c7)][_0x4bef3c(0x2ac)][_0x4bef3c(0x406)]:VisuMZ['ItemCraftingSys']['RegExp'][_0x4bef3c(0x21c)],_0x373f58=_0x3b4ae9[_0x4bef3c(0x32a)][_0x4bef3c(0x316)](_0x1192e4);if(_0x373f58)for(const _0x721f87 of _0x373f58){if(_0x4bef3c(0x2ca)!=='WoNsZ')return _0x4d7ca1['floor'](this['totalPriceY']()+this['lineHeight']()*0x2);else{if(!_0x721f87)continue;_0x721f87[_0x4bef3c(0x316)](_0x1192e4);const _0xfbee3b=JSON[_0x4bef3c(0x314)]('['+RegExp['$1'][_0x4bef3c(0x316)](/\d+/g)+']');for(const _0x4d122d of _0xfbee3b){$gameSwitches[_0x4bef3c(0x398)](_0x4d122d,_0x4d2527);}}}},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x2ed)]=function(){const _0x1b8d6e=_0x32630c;SoundManager[_0x1b8d6e(0x381)](),this['onIngredientListCancel']();},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x40d)]=function(){const _0x3b4953=_0x32630c,_0x12bcb6=this[_0x3b4953(0x2ce)][_0x3b4953(0x285)]();this[_0x3b4953(0x1f2)][this[_0x3b4953(0x1dd)]]=_0x12bcb6,this[_0x3b4953(0x1dd)]++,this[_0x3b4953(0x1cc)]();},Scene_ItemCrafting['prototype'][_0x32630c(0x28b)]=function(){const _0x1f6e00=_0x32630c;this[_0x1f6e00(0x1f2)][_0x1f6e00(0x243)](),this['_ingredientIndex']--,this[_0x1f6e00(0x1dd)]<0x0?this[_0x1f6e00(0x1c6)]():this[_0x1f6e00(0x1cc)]();},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x3f2)]=function(){const _0x40ddfb=_0x32630c;this['_ingredientCategories']=[],this[_0x40ddfb(0x23e)]=[],this[_0x40ddfb(0x1f2)]=[],this[_0x40ddfb(0x1dd)]=0x0;},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x22c)]=function(){const _0x3fd984=_0x32630c;if(!this[_0x3fd984(0x326)])return![];const _0x201b85=DataManager['getCraftingIngredients'](this[_0x3fd984(0x326)]);for(const _0x23e67e of _0x201b85){if(_0x3fd984(0x385)!==_0x3fd984(0x2a1)){if(!_0x23e67e)continue;const _0x10dd84=_0x23e67e[0x0];if(!_0x10dd84)continue;if(typeof _0x10dd84===_0x3fd984(0x255)&&_0x10dd84[_0x3fd984(0x316)](/CATEGORY/i)){_0x10dd84[_0x3fd984(0x316)](/CATEGORY: (.*)/i);const _0x49ebd7=String(RegExp['$1'])['trim']();this[_0x3fd984(0x3df)][_0x3fd984(0x286)](_0x49ebd7),this[_0x3fd984(0x23e)][_0x3fd984(0x286)](_0x23e67e[0x1]||0x1);}}else this['_item']=_0x126730,this[_0x3fd984(0x3d2)]=this[_0x3fd984(0x3d6)](),this['_number']=_0x282805['min'](0x1,this[_0x3fd984(0x3d2)]),this[_0x3fd984(0x376)](),this[_0x3fd984(0x2fe)]();}return this[_0x3fd984(0x3df)][_0x3fd984(0x30e)]>0x0;},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x1cc)]=function(){const _0x3994ed=_0x32630c;if(this[_0x3994ed(0x1dd)]>=this['_ingredientCategories'][_0x3994ed(0x30e)])return this[_0x3994ed(0x394)]();this[_0x3994ed(0x1e6)]['hide'](),this[_0x3994ed(0x216)][_0x3994ed(0x245)]();const _0x5c51eb=this[_0x3994ed(0x3df)][this['_ingredientIndex']],_0x1deb20=this[_0x3994ed(0x23e)][this[_0x3994ed(0x1dd)]];this[_0x3994ed(0x1f8)]['show'](),this['_ingredientSelectList'][_0x3994ed(0x1db)](),this[_0x3994ed(0x1f8)][_0x3994ed(0x395)][_0x3994ed(0x1f7)]();const _0x5c8e66=VisuMZ[_0x3994ed(0x3c7)][_0x3994ed(0x41d)][_0x3994ed(0x24c)][_0x3994ed(0x235)],_0x6e0306=VisuMZ[_0x3994ed(0x2d4)]['Settings']['ItemScene'][_0x3994ed(0x237)],_0x592b94=_0x5c8e66['format'](_0x5c51eb,_0x6e0306[_0x3994ed(0x3f5)](_0x1deb20)),_0x12af48=this[_0x3994ed(0x1f8)][_0x3994ed(0x2be)](0x0);this[_0x3994ed(0x1f8)][_0x3994ed(0x1f9)](_0x592b94,_0x12af48['x'],_0x12af48['y']),this[_0x3994ed(0x2ce)][_0x3994ed(0x238)](_0x5c51eb,_0x1deb20);},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x22b)]=function(){const _0x5de851=_0x32630c;if(this[_0x5de851(0x216)]&&this['_numberWindow'][_0x5de851(0x2e7)])return TextManager[_0x5de851(0x2d8)](_0x5de851(0x1fd),_0x5de851(0x1e2));return Scene_Item['prototype'][_0x5de851(0x22b)][_0x5de851(0x2d6)](this);},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x2eb)]=function(){const _0xcb11fa=_0x32630c;if(this['_numberWindow']&&this['_numberWindow'][_0xcb11fa(0x2e7)])return TextManager[_0xcb11fa(0x2d8)]('up',_0xcb11fa(0x421));return Scene_Item['prototype'][_0xcb11fa(0x2eb)][_0xcb11fa(0x2d6)](this);},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x292)]=function(){const _0x40bea9=_0x32630c;if(this[_0x40bea9(0x29c)]())return VisuMZ[_0x40bea9(0x2d4)][_0x40bea9(0x41d)][_0x40bea9(0x30b)][_0x40bea9(0x259)];else{if(this[_0x40bea9(0x216)]&&this[_0x40bea9(0x216)][_0x40bea9(0x2e7)])return VisuMZ['ItemsEquipsCore'][_0x40bea9(0x41d)][_0x40bea9(0x2d9)]['buttonAssistSmallIncrement'];}return Scene_Item[_0x40bea9(0x368)][_0x40bea9(0x292)][_0x40bea9(0x2d6)](this);},Scene_ItemCrafting['prototype'][_0x32630c(0x2bf)]=function(){const _0x4e8df1=_0x32630c;if(this['_numberWindow']&&this['_numberWindow'][_0x4e8df1(0x2e7)])return VisuMZ[_0x4e8df1(0x2d4)][_0x4e8df1(0x41d)][_0x4e8df1(0x2d9)][_0x4e8df1(0x320)];return Scene_Item['prototype'][_0x4e8df1(0x2bf)]['call'](this);},Scene_ItemCrafting['prototype'][_0x32630c(0x3b3)]=function(){const _0x3928ca=_0x32630c;return this['_numberWindow']&&this['_numberWindow']['active']?TextManager['itemCraftingNumberWindowOk']:Scene_Item[_0x3928ca(0x368)][_0x3928ca(0x3b3)][_0x3928ca(0x2d6)](this);},Scene_ItemCrafting['prototype'][_0x32630c(0x20d)]=function(){const _0xe0bee4=_0x32630c;Scene_MenuBase[_0xe0bee4(0x368)]['createBackground']['call'](this),this[_0xe0bee4(0x30a)](this['getBackgroundOpacity']()),this['createCustomBackgroundImages']();},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x3a3)]=function(){const _0x167169=_0x32630c;return VisuMZ['ItemCraftingSys'][_0x167169(0x41d)][_0x167169(0x2a7)]['SnapshotOpacity'];},Scene_ItemCrafting['prototype']['createCustomBackgroundImages']=function(){const _0x5334f8=_0x32630c,_0x19974c={'BgFilename1':VisuMZ[_0x5334f8(0x3c7)]['Settings'][_0x5334f8(0x2a7)]['BgFilename1'],'BgFilename2':VisuMZ[_0x5334f8(0x3c7)][_0x5334f8(0x41d)]['BgSettings'][_0x5334f8(0x3b8)]};_0x19974c&&(_0x19974c[_0x5334f8(0x3ae)]!==''||_0x19974c[_0x5334f8(0x3b8)]!=='')&&(this[_0x5334f8(0x3b5)]=new Sprite(ImageManager[_0x5334f8(0x3b7)](_0x19974c['BgFilename1'])),this[_0x5334f8(0x27d)]=new Sprite(ImageManager[_0x5334f8(0x265)](_0x19974c[_0x5334f8(0x3b8)])),this[_0x5334f8(0x418)](this['_backSprite1']),this[_0x5334f8(0x418)](this[_0x5334f8(0x27d)]),this[_0x5334f8(0x3b5)]['bitmap'][_0x5334f8(0x378)](this['adjustSprite'][_0x5334f8(0x300)](this,this[_0x5334f8(0x3b5)])),this['_backSprite2']['bitmap']['addLoadListener'](this[_0x5334f8(0x339)]['bind'](this,this['_backSprite2'])));},Scene_ItemCrafting['prototype'][_0x32630c(0x339)]=function(_0x3bf414){const _0x2b9da6=_0x32630c;this[_0x2b9da6(0x41c)](_0x3bf414),this['centerSprite'](_0x3bf414);},Scene_ItemCrafting['prototype'][_0x32630c(0x345)]=function(){const _0x29b4e0=_0x32630c;this['_animationPlaying']=!![],this[_0x29b4e0(0x1c9)]=0x14,this['_windowLayer'][_0x29b4e0(0x3ca)]=VisuMZ['ItemCraftingSys'][_0x29b4e0(0x41d)][_0x29b4e0(0x413)][_0x29b4e0(0x356)]||![],this['createItemSprite']();},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x2af)]=function(){const _0x4b4fcc=_0x32630c;this[_0x4b4fcc(0x329)]=new Sprite(),this[_0x4b4fcc(0x418)](this[_0x4b4fcc(0x329)]),this[_0x4b4fcc(0x3f3)](),this[_0x4b4fcc(0x31f)](),this['setItemSpritePosition'](),this['setItemSpriteOpacity'](),this[_0x4b4fcc(0x389)](),this[_0x4b4fcc(0x1fb)](this[_0x4b4fcc(0x283)]['shift']());},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x3f3)]=function(){const _0x560a34=_0x32630c,_0x10438e=VisuMZ[_0x560a34(0x3c7)][_0x560a34(0x2ac)],_0x3b7c56=this['_item']['note'];this['_craftPicture']='';if(_0x3b7c56['match'](_0x10438e['craftPicture']))_0x560a34(0x256)===_0x560a34(0x256)?this[_0x560a34(0x334)]=String(RegExp['$1']):_0x11e24e[_0x560a34(0x333)](this[_0x560a34(0x349)][_0x560a34(0x300)](this));else _0x3b7c56[_0x560a34(0x316)](_0x10438e[_0x560a34(0x3c0)])&&(this['_craftPicture']=String(RegExp['$1']));this[_0x560a34(0x34b)]=new Sprite();this[_0x560a34(0x334)]?_0x560a34(0x24a)!==_0x560a34(0x24a)?_0x377aa0=_0x3ef16b(_0x4f7d57['$1']):this[_0x560a34(0x34b)][_0x560a34(0x39f)]=ImageManager[_0x560a34(0x233)](this[_0x560a34(0x334)]):'RJmVr'===_0x560a34(0x3c6)?(this[_0x560a34(0x34b)][_0x560a34(0x39f)]=ImageManager[_0x560a34(0x377)](_0x560a34(0x38e)),this[_0x560a34(0x34b)][_0x560a34(0x39f)][_0x560a34(0x386)]=![]):(_0x551b37=_0x2a8135[_0x560a34(0x34d)][_0x560a34(0x1f2)][this['_categoryIndex']],this['_categoryIndex']+=0x1);this[_0x560a34(0x34b)]['anchor']['x']=0.5,this['_iconSprite'][_0x560a34(0x323)]['y']=0.5;if(!this[_0x560a34(0x334)]){const _0x3581b4=VisuMZ[_0x560a34(0x3c7)]['Settings']['Animation']['Scale']||0x8;this[_0x560a34(0x34b)]['scale']['x']=_0x3581b4,this[_0x560a34(0x34b)][_0x560a34(0x3ef)]['y']=_0x3581b4;}this[_0x560a34(0x329)][_0x560a34(0x418)](this['_iconSprite']);},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x31f)]=function(){const _0x24ba10=_0x32630c;if(this[_0x24ba10(0x334)])return;const _0x3fcaf3=this[_0x24ba10(0x326)],_0x293378=_0x3fcaf3[_0x24ba10(0x26d)],_0x928f41=ImageManager['iconWidth'],_0x2a49cc=ImageManager[_0x24ba10(0x415)],_0x17a05c=_0x293378%0x10*_0x928f41,_0x363e6b=Math[_0x24ba10(0x21d)](_0x293378/0x10)*_0x2a49cc;this['_iconSprite'][_0x24ba10(0x3e3)](_0x17a05c,_0x363e6b,_0x928f41,_0x2a49cc);},Scene_ItemCrafting['prototype'][_0x32630c(0x360)]=function(){const _0x503b1f=_0x32630c;this[_0x503b1f(0x329)]['x']=Math[_0x503b1f(0x1d4)](Graphics[_0x503b1f(0x2b7)]/0x2);const _0x17f8ac=Math[_0x503b1f(0x1d4)](ImageManager[_0x503b1f(0x415)]*this[_0x503b1f(0x329)][_0x503b1f(0x3ef)]['y']);this[_0x503b1f(0x329)]['y']=Math[_0x503b1f(0x1d4)]((Graphics[_0x503b1f(0x2f3)]+_0x17f8ac)/0x2);},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x3e9)]=function(){const _0x291a8a=_0x32630c;this[_0x291a8a(0x281)]=VisuMZ[_0x291a8a(0x3c7)][_0x291a8a(0x41d)][_0x291a8a(0x413)][_0x291a8a(0x342)]||0x1,this['_item'][_0x291a8a(0x32a)][_0x291a8a(0x316)](VisuMZ['ItemCraftingSys'][_0x291a8a(0x2ac)]['opacitySpeed'])&&(this['_itemSpriteOpacitySpeed']=Math[_0x291a8a(0x348)](Number(RegExp['$1']),0x1)),this[_0x291a8a(0x329)][_0x291a8a(0x3ab)]=0x0;},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x389)]=function(){const _0x4680d5=_0x32630c;this[_0x4680d5(0x283)]=[],this['_item'][_0x4680d5(0x32a)][_0x4680d5(0x316)](VisuMZ[_0x4680d5(0x3c7)][_0x4680d5(0x2ac)][_0x4680d5(0x277)])?this[_0x4680d5(0x283)]=RegExp['$1'][_0x4680d5(0x367)](',')[_0x4680d5(0x244)](_0x20676c=>Number(_0x20676c)):this[_0x4680d5(0x283)]=this['_animationIDs'][_0x4680d5(0x1fc)](VisuMZ['ItemCraftingSys'][_0x4680d5(0x41d)][_0x4680d5(0x413)][_0x4680d5(0x2ab)]);},Scene_ItemCrafting[_0x32630c(0x368)]['createAnimation']=function(_0x3a756c){const _0xf3d916=_0x32630c,_0xe78c28=$dataAnimations[_0x3a756c];if(!_0xe78c28)return;const _0x276e82=this[_0xf3d916(0x29f)](_0xe78c28);this[_0xf3d916(0x31e)]=new(_0x276e82?Sprite_AnimationMV:Sprite_Animation)();const _0x4fee44=[this[_0xf3d916(0x329)]],_0x3bd6fa=0x0;this['_animationSprite']['setup'](_0x4fee44,_0xe78c28,![],_0x3bd6fa,null),this[_0xf3d916(0x418)](this[_0xf3d916(0x31e)]);},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x29f)]=function(_0x4ba642){const _0x43d059=_0x32630c;return!!_0x4ba642[_0x43d059(0x41f)];},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x2e2)]=function(){const _0x219316=_0x32630c;if(!this['_animationPlaying'])return;this[_0x219316(0x274)](),this[_0x219316(0x249)]();if(this['isFinishedAnimating']()){if('xFHvf'!==_0x219316(0x2bc)){if(this[_0x219316(0x334)])return;const _0x159fc0=this['_item'],_0x516080=_0x159fc0[_0x219316(0x26d)],_0x202df1=_0x384dac[_0x219316(0x28e)],_0x7760d5=_0x43a362[_0x219316(0x415)],_0x109cbf=_0x516080%0x10*_0x202df1,_0x1d2e80=_0xd5ff32[_0x219316(0x21d)](_0x516080/0x10)*_0x7760d5;this['_iconSprite']['setFrame'](_0x109cbf,_0x1d2e80,_0x202df1,_0x7760d5);}else this[_0x219316(0x41b)]();}},Scene_ItemCrafting['prototype'][_0x32630c(0x274)]=function(){const _0x8061a5=_0x32630c;this[_0x8061a5(0x329)]['opacity']+=this[_0x8061a5(0x281)];},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x249)]=function(){const _0x4a22bc=_0x32630c;if(!this[_0x4a22bc(0x31e)])return;if(this['_animationSprite'][_0x4a22bc(0x3ba)]())return;this['destroyAnimationSprite'](),this[_0x4a22bc(0x1fb)](this[_0x4a22bc(0x283)][_0x4a22bc(0x206)]());},Scene_ItemCrafting['prototype'][_0x32630c(0x229)]=function(){const _0x254a99=_0x32630c;if(!this[_0x254a99(0x31e)])return;this[_0x254a99(0x21e)](this[_0x254a99(0x31e)]),this['_animationSprite'][_0x254a99(0x3b2)](),this[_0x254a99(0x31e)]=undefined;},Scene_ItemCrafting['prototype'][_0x32630c(0x31a)]=function(){const _0x359ed5=_0x32630c;if(!this[_0x359ed5(0x329)])return;this[_0x359ed5(0x21e)](this[_0x359ed5(0x329)]),this[_0x359ed5(0x329)][_0x359ed5(0x3b2)](),this[_0x359ed5(0x329)]=undefined;},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x355)]=function(){const _0x10ab93=_0x32630c;if(TouchInput[_0x10ab93(0x1f4)]())return!![];if(Input[_0x10ab93(0x246)]('ok'))return!![];if(Input[_0x10ab93(0x246)](_0x10ab93(0x1e1)))return!![];if(this[_0x10ab93(0x329)][_0x10ab93(0x3ab)]<0xff)return![];if(this['_animationSprite'])return![];return this[_0x10ab93(0x1c9)]--<=0x0;},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x41b)]=function(){const _0x23d9a5=_0x32630c;this['destroyAnimationSprite'](),this['destroyItemSprite'](),this[_0x23d9a5(0x1de)](),TouchInput['clear'](),Input['clear']();},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x262)]=function(){const _0x1c53e5=_0x32630c;Scene_Item[_0x1c53e5(0x368)]['terminate']['call'](this);if($gameSystem[_0x1c53e5(0x212)])return;$gameTemp[_0x1c53e5(0x2b6)]();},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x404)]=function(){const _0x6cc16e=_0x32630c;if(!SceneManager[_0x6cc16e(0x35d)]())return;const _0x283ec2=VisuMZ[_0x6cc16e(0x3c7)][_0x6cc16e(0x41d)][_0x6cc16e(0x24c)];if(_0x283ec2[_0x6cc16e(0x420)]){if(_0x6cc16e(0x1c5)==='pJJDr')$gameSwitches[_0x6cc16e(0x398)](_0x283ec2[_0x6cc16e(0x420)],![]);else return _0x4f8abf[_0x6cc16e(0x341)];}},Scene_ItemCrafting['prototype'][_0x32630c(0x23c)]=function(){const _0x57d808=_0x32630c;if(!SceneManager[_0x57d808(0x35d)]())return;const _0x453bc3=VisuMZ[_0x57d808(0x3c7)][_0x57d808(0x41d)][_0x57d808(0x24c)];_0x453bc3[_0x57d808(0x420)]&&('VJcNI'!=='VJcNI'?this[_0x57d808(0x2fc)]():$gameSwitches[_0x57d808(0x398)](_0x453bc3[_0x57d808(0x420)],!![]));},Scene_ItemCrafting[_0x32630c(0x368)][_0x32630c(0x2ea)]=function(){const _0xd81bf5=_0x32630c;if(!Imported[_0xd81bf5(0x29a)])return![];const _0x2bee2b=this[_0xd81bf5(0x326)]?this[_0xd81bf5(0x326)][_0xd81bf5(0x32a)]||'':'',_0x4633b4=VisuMZ['ItemCraftingSys']['RegExp'];if(_0x2bee2b['match'](_0x4633b4['CraftEventOnce'])&&!$gameSystem[_0xd81bf5(0x399)](this[_0xd81bf5(0x326)])&&this['meetsCraftingCommonEventSwitches'](!![]))return!![];else{if(_0x2bee2b[_0xd81bf5(0x316)](_0x4633b4[_0xd81bf5(0x3e0)])&&this[_0xd81bf5(0x3e5)](![]))return!![];}return![];},Scene_ItemCrafting['prototype']['meetsCraftingCommonEventSwitches']=function(_0x2ae79a){const _0x5c9226=_0x32630c,_0x30ef16=this[_0x5c9226(0x326)]?this[_0x5c9226(0x326)][_0x5c9226(0x32a)]:'',_0x38ae98=VisuMZ['ItemCraftingSys'][_0x5c9226(0x2ac)],_0x306950=_0x2ae79a?_0x5c9226(0x37b):_0x5c9226(0x40a);if(_0x30ef16[_0x5c9226(0x316)](_0x38ae98[_0x306950+'AllSw'])){const _0x78149c=RegExp['$1']['split'](',')[_0x5c9226(0x244)](_0x51505a=>Number(_0x51505a));for(const _0x40137e of _0x78149c){if($gameSwitches[_0x5c9226(0x2b1)](_0x40137e)===![])return![];}}if(_0x30ef16[_0x5c9226(0x316)](_0x38ae98[_0x306950+_0x5c9226(0x1c8)])){const _0x2b6d31=RegExp['$1']['split'](',')[_0x5c9226(0x244)](_0x4d4dc8=>Number(_0x4d4dc8));for(const _0x42b5f8 of _0x2b6d31){if(_0x5c9226(0x2fa)===_0x5c9226(0x2fa)){if($gameSwitches[_0x5c9226(0x2b1)](_0x42b5f8)===!![])return!![];}else _0x4c06df[_0x5c9226(0x27f)](_0x5efbf6[_0x5c9226(0x3c7)]['Settings'][_0x5c9226(0x1dc)]);}return![];}return!![];},Scene_ItemCrafting['prototype'][_0x32630c(0x2d5)]=function(){const _0xcd8bb8=_0x32630c,_0x7bd554=this[_0xcd8bb8(0x326)]?this[_0xcd8bb8(0x326)][_0xcd8bb8(0x32a)]:'',_0x1ea324=VisuMZ[_0xcd8bb8(0x3c7)][_0xcd8bb8(0x2ac)];let _0x3597da=0x0;if(this[_0xcd8bb8(0x3e5)](!![])&&_0x7bd554[_0xcd8bb8(0x316)](_0x1ea324[_0xcd8bb8(0x41e)])&&!$gameSystem[_0xcd8bb8(0x399)](this['_item']))_0x3597da=Number(RegExp['$1'])||0x1,$gameSystem['registerCraftingEvent'](this['_item']);else{if(this['meetsCraftingCommonEventSwitches'](![])&&_0x7bd554[_0xcd8bb8(0x316)](_0x1ea324[_0xcd8bb8(0x3e0)])){if(_0xcd8bb8(0x28d)===_0xcd8bb8(0x2a8)){if((this['_number']||0x0)<=0x0)return![];return _0x45de08['prototype'][_0xcd8bb8(0x20e)][_0xcd8bb8(0x2d6)](this);}else _0x3597da=Number(RegExp['$1'])||0x1;}}if(_0x3597da<=0x0){if(_0xcd8bb8(0x33d)!==_0xcd8bb8(0x25d)){this[_0xcd8bb8(0x23d)]();return;}else _0x1700ce[_0xcd8bb8(0x3c7)][_0xcd8bb8(0x2a5)][_0xcd8bb8(0x2d6)](this,_0xcd2a90),_0x41c66b['ItemCraftingSys']['Parse_Notetags_CreateJS'](_0x77560d);}$gameSystem[_0xcd8bb8(0x212)]=!![],$gameTemp[_0xcd8bb8(0x1d0)](_0x3597da),SceneManager[_0xcd8bb8(0x2de)](Scene_Map);},VisuMZ[_0x32630c(0x3c7)][_0x32630c(0x3c8)]=Window_MenuCommand[_0x32630c(0x368)][_0x32630c(0x3e4)],Window_MenuCommand['prototype'][_0x32630c(0x3e4)]=function(){const _0x15a19e=_0x32630c;VisuMZ[_0x15a19e(0x3c7)][_0x15a19e(0x3c8)]['call'](this),this[_0x15a19e(0x365)]();},Window_MenuCommand[_0x32630c(0x368)]['addItemCraftingCommand']=function(){const _0x4f07dc=_0x32630c;if(!this['addItemCraftingCommandAutomatically']())return;if(!this[_0x4f07dc(0x2f5)]())return;const _0x479ed8=TextManager[_0x4f07dc(0x36a)],_0x47f7c6=this[_0x4f07dc(0x2b4)]();this[_0x4f07dc(0x3f6)](_0x479ed8,_0x4f07dc(0x3ea),_0x47f7c6);},Window_MenuCommand[_0x32630c(0x368)][_0x32630c(0x1f1)]=function(){const _0x137551=_0x32630c;return Imported[_0x137551(0x2d3)]?![]:!![];},Window_MenuCommand[_0x32630c(0x368)][_0x32630c(0x2f5)]=function(){return $gameSystem['isMainMenuItemCraftingVisible']();},Window_MenuCommand[_0x32630c(0x368)][_0x32630c(0x2b4)]=function(){const _0xade758=_0x32630c;if(DataManager[_0xade758(0x3fa)]()[_0xade758(0x30e)]<=0x0)return![];return $gameSystem[_0xade758(0x374)]();},VisuMZ['ItemCraftingSys']['Window_ItemCategory_makeCommandList']=Window_ItemCategory[_0x32630c(0x368)][_0x32630c(0x213)],Window_ItemCategory[_0x32630c(0x368)][_0x32630c(0x213)]=function(){const _0x219532=_0x32630c;if(SceneManager['isSceneItemCrafting']()){if(_0x219532(0x3cc)===_0x219532(0x202))return _0x308cde[_0x219532(0x368)][_0x219532(0x3b3)][_0x219532(0x2d6)](this);else{this['addItemCategories']();if(this[_0x219532(0x383)][_0x219532(0x30e)]<=0x0){if(_0x219532(0x24e)===_0x219532(0x24e)){this[_0x219532(0x2c1)](),SceneManager[_0x219532(0x34d)][_0x219532(0x33e)]();return;}else this[_0x219532(0x37d)][_0x219532(0x3ca)]=!![],this['_animationPlaying']=![],this[_0x219532(0x32b)](),this[_0x219532(0x405)](),this['onAnimationFinish']();}this['createUncategorizedItemCategory']();let _0x331450=this[_0x219532(0x303)]();if(this[_0x219532(0x313)]){const _0x4ed5e1=this[_0x219532(0x31b)](this[_0x219532(0x313)]);if(_0x4ed5e1>=0x0)_0x331450=_0x4ed5e1;}_0x331450=_0x331450>=this['_list'][_0x219532(0x30e)]?0x0:_0x331450,this[_0x219532(0x1d2)](_0x331450);}}else VisuMZ[_0x219532(0x3c7)][_0x219532(0x2ae)][_0x219532(0x2d6)](this);},Window_ItemCategory[_0x32630c(0x368)]['createUncategorizedItemCategory']=function(){const _0x1c2c2f=_0x32630c,_0xb1d6f8=Window_ItemCategory[_0x1c2c2f(0x247)],_0x3eecf2=DataManager[_0x1c2c2f(0x3fa)]()['clone'](),_0x3cef39=[];for(const _0x3f7402 of _0xb1d6f8){this[_0x1c2c2f(0x3c1)]=_0x3f7402[_0x1c2c2f(0x230)];for(const _0x2a6321 of _0x3eecf2){Window_ItemList['prototype']['includes'][_0x1c2c2f(0x2d6)](this,_0x2a6321)&&_0x3cef39[_0x1c2c2f(0x286)](_0x2a6321);}}this['_category']=null;for(const _0x58ec3c of _0x3cef39){_0x3eecf2[_0x1c2c2f(0x1ed)](_0x58ec3c);}_0x3eecf2[_0x1c2c2f(0x30e)]>0x0&&this[_0x1c2c2f(0x2c1)](),this[_0x1c2c2f(0x3d0)]=_0x3eecf2;},Window_ItemCategory[_0x32630c(0x368)][_0x32630c(0x2c1)]=function(){const _0x102c9e=_0x32630c,_0x15df0b=VisuMZ[_0x102c9e(0x3c7)]['Settings'][_0x102c9e(0x24c)];let _0xf91230=_0x15df0b[_0x102c9e(0x3d4)]||_0x102c9e(0x3d4),_0x574181=_0x15df0b[_0x102c9e(0x310)]||0xa0;_0xf91230='\x5cI[%1]%2'['format'](_0x574181,_0xf91230),this[_0x102c9e(0x3f6)](_0xf91230,_0x102c9e(0x20b),!![],'ItemCraftingNoCategory');},VisuMZ['ItemCraftingSys']['Window_ItemCategory_addItemCategory']=Window_ItemCategory[_0x32630c(0x368)][_0x32630c(0x1cf)],Window_ItemCategory[_0x32630c(0x368)][_0x32630c(0x1cf)]=function(_0x3e7ef8){const _0x12d067=_0x32630c;if(SceneManager[_0x12d067(0x35d)]()&&!this[_0x12d067(0x1f0)](_0x3e7ef8))return;VisuMZ[_0x12d067(0x3c7)][_0x12d067(0x1e0)]['call'](this,_0x3e7ef8);},Window_ItemCategory[_0x32630c(0x368)][_0x32630c(0x1f0)]=function(_0x2ebe68){const _0x3a3056=_0x32630c,_0x110b73=DataManager[_0x3a3056(0x3fa)](),_0x201efe=_0x2ebe68[_0x3a3056(0x230)],_0x55ec60=_0x2ebe68[_0x3a3056(0x284)];this[_0x3a3056(0x3c1)]=_0x201efe;for(const _0x3ef625 of _0x110b73){if(!_0x3ef625)continue;if(Window_ItemList['prototype'][_0x3a3056(0x26c)][_0x3a3056(0x2d6)](this,_0x3ef625))return _0x3a3056(0x3ac)!=='PeycU'?_0x1cd8f2[_0x3a3056(0x2d8)](_0x3a3056(0x1fd),_0x3a3056(0x1e2)):(this[_0x3a3056(0x3c1)]=null,!![]);}return this['_category']=null,![];},VisuMZ[_0x32630c(0x3c7)][_0x32630c(0x251)]=Window_ItemCategory[_0x32630c(0x368)][_0x32630c(0x3f8)],Window_ItemCategory[_0x32630c(0x368)][_0x32630c(0x3f8)]=function(){const _0x2eccc2=_0x32630c;if(SceneManager[_0x2eccc2(0x35d)]())return!![];return VisuMZ['ItemCraftingSys'][_0x2eccc2(0x251)][_0x2eccc2(0x2d6)](this);},VisuMZ[_0x32630c(0x3c7)][_0x32630c(0x387)]=Window_Selectable[_0x32630c(0x368)][_0x32630c(0x1d2)],Window_Selectable[_0x32630c(0x368)][_0x32630c(0x1d2)]=function(_0x2b7294){const _0x4446d1=_0x32630c;VisuMZ[_0x4446d1(0x3c7)][_0x4446d1(0x387)][_0x4446d1(0x2d6)](this,_0x2b7294),this[_0x4446d1(0x353)]===Window_ItemCategory&&SceneManager[_0x4446d1(0x35d)]()&&_0x2b7294>=0x0&&(_0x4446d1(0x1e4)==='uQNvf'?this[_0x4446d1(0x1df)]=!![]:this[_0x4446d1(0x313)]=this['commandSymbol'](_0x2b7294)||'');};function Window_ItemCraftingList(){const _0x3ee808=_0x32630c;this[_0x3ee808(0x1c4)](...arguments);}Window_ItemCraftingList['prototype']=Object['create'](Window_ItemList[_0x32630c(0x368)]),Window_ItemCraftingList['prototype'][_0x32630c(0x353)]=Window_ItemCraftingList,Window_ItemCraftingList[_0x32630c(0x236)]=VisuMZ[_0x32630c(0x3c7)][_0x32630c(0x41d)]['Window'][_0x32630c(0x39b)],Window_ItemCraftingList[_0x32630c(0x304)]=VisuMZ[_0x32630c(0x3c7)][_0x32630c(0x41d)]['Mask']['MaskItalics'],Window_ItemCraftingList['prototype'][_0x32630c(0x1c4)]=function(_0xc4db35){const _0x5ab7ad=_0x32630c;Window_ItemList[_0x5ab7ad(0x368)][_0x5ab7ad(0x1c4)][_0x5ab7ad(0x2d6)](this,_0xc4db35),this[_0x5ab7ad(0x3d9)]();},Window_ItemCraftingList['prototype']['maxCols']=function(){return 0x1;},Window_ItemCraftingList[_0x32630c(0x368)][_0x32630c(0x379)]=function(){const _0x14088e=_0x32630c;return Window_Scrollable[_0x14088e(0x368)][_0x14088e(0x379)][_0x14088e(0x2d6)](this)*0x3+0x8;},Window_ItemCraftingList[_0x32630c(0x368)][_0x32630c(0x30c)]=function(_0x562db1){return!![];},Window_ItemCraftingList[_0x32630c(0x368)]['makeItemList']=function(){const _0x518df2=_0x32630c;this[_0x518df2(0x214)]=DataManager[_0x518df2(0x3fa)]()[_0x518df2(0x296)](_0x4cdf66=>this['includes'](_0x4cdf66));const _0x541c74=this['_data']['map'](_0x59f751=>DataManager['getCraftingIngredients'](_0x59f751)[_0x518df2(0x30e)]);this[_0x518df2(0x3b6)]=Math['max'](..._0x541c74)+0x1;},Window_ItemCraftingList[_0x32630c(0x368)]['includes']=function(_0x201367){const _0x555042=_0x32630c;if(this['_category']===_0x555042(0x34c)){const _0x2247ae=SceneManager[_0x555042(0x34d)];if(_0x2247ae&&_0x2247ae['_categoryWindow']&&_0x2247ae[_0x555042(0x1e6)]['_nonCategoryItemCraftingItems'])return _0x2247ae[_0x555042(0x1e6)][_0x555042(0x3d0)][_0x555042(0x26c)](_0x201367);}return Window_ItemList['prototype'][_0x555042(0x26c)]['call'](this,_0x201367);},Window_ItemCraftingList[_0x32630c(0x368)]['selectLast']=function(){},Window_ItemCraftingList[_0x32630c(0x368)][_0x32630c(0x22f)]=function(_0x3863dc){const _0x4a6540=_0x32630c,_0x5cfe44=this['itemAt'](_0x3863dc);if(!_0x5cfe44)return;const _0x1fbbdc=this['itemRectWithPadding'](_0x3863dc);this[_0x4a6540(0x370)](),this['drawFadedItemBackground'](_0x1fbbdc,0x2),this[_0x4a6540(0x34a)](_0x3863dc,_0x5cfe44,_0x1fbbdc),this[_0x4a6540(0x397)](_0x5cfe44,_0x1fbbdc),this[_0x4a6540(0x3e6)](_0x5cfe44,_0x1fbbdc),this[_0x4a6540(0x35a)](_0x5cfe44,_0x1fbbdc);},Window_ItemCraftingList[_0x32630c(0x368)][_0x32630c(0x40f)]=function(_0x19ba7e,_0xe163a9){const _0xbbe536=_0x32630c;_0xe163a9=_0xe163a9||0x1,this['changePaintOpacity'](![]);const _0x13f1e1=ColorManager['dimColor1'](),_0x1af86c=ColorManager[_0xbbe536(0x2c8)](),_0x3bc019=_0x19ba7e['width']/0x2,_0x26d4e3=this[_0xbbe536(0x33c)]();while(_0xe163a9--){this[_0xbbe536(0x395)][_0xbbe536(0x291)](_0x19ba7e['x'],_0x19ba7e['y'],_0x3bc019,_0x26d4e3,_0x1af86c,_0x13f1e1),this[_0xbbe536(0x395)][_0xbbe536(0x291)](_0x19ba7e['x']+_0x3bc019,_0x19ba7e['y'],_0x3bc019,_0x26d4e3,_0x13f1e1,_0x1af86c);}this[_0xbbe536(0x2c6)](!![]);},Window_Base[_0x32630c(0x368)][_0x32630c(0x3e6)]=function(_0x1183c9,_0x5334c7){const _0xfc282a=_0x32630c;let _0x23e607=_0x1183c9[_0xfc282a(0x1ce)],_0x24e8d0=_0x5334c7['height']+this[_0xfc282a(0x23a)]()*0x2,_0x1bf36b=_0x5334c7['y'],_0x8c95f1=_0x5334c7[_0xfc282a(0x2b7)]-_0x24e8d0-this['itemPadding']()-ImageManager[_0xfc282a(0x28e)];if(DataManager['isCraftingItemMasked'](_0x1183c9)){if(_0xfc282a(0x3a7)===_0xfc282a(0x203))return!![];else _0x23e607=VisuMZ[_0xfc282a(0x3c7)]['maskItemName'](_0x1183c9),this['contents'][_0xfc282a(0x3c9)]=Window_ItemCraftingList['maskItalics'];}this[_0xfc282a(0x416)](_0x23e607,_0x24e8d0,_0x1bf36b,_0x8c95f1,_0xfc282a(0x1fd)),this[_0xfc282a(0x395)][_0xfc282a(0x3c9)]=![];},VisuMZ[_0x32630c(0x3c7)][_0x32630c(0x295)]=function(_0x21ede0){const _0x42d892=_0x32630c;DataManager[_0x42d892(0x382)]&&(_0x21ede0=DataManager['getProxyItem'](_0x21ede0));if(_0x21ede0[_0x42d892(0x32a)]['match'](VisuMZ[_0x42d892(0x3c7)][_0x42d892(0x2ac)]['MaskText']))return String(RegExp['$1']);else{if(_0x42d892(0x330)!==_0x42d892(0x40e)){const _0x3995cb=TextManager[_0x42d892(0x26a)];return Array(_0x21ede0[_0x42d892(0x1ce)][_0x42d892(0x30e)]+0x1)[_0x42d892(0x2c2)](_0x3995cb);}else{_0x5802c1[_0x42d892(0x239)]()&&_0x54b5ab(_0x5b66b4[_0x42d892(0x3c7)][_0x42d892(0x315)]);return;}}},Window_ItemCraftingList[_0x32630c(0x368)]['drawBigItemImage']=function(_0x5beb48,_0x35486c,_0x461ef0){const _0x261314=_0x32630c,_0x483597=VisuMZ[_0x261314(0x3c7)][_0x261314(0x2ac)],_0x54f2c5=_0x35486c[_0x261314(0x32a)];let _0x475bcd='';if(_0x54f2c5[_0x261314(0x316)](_0x483597[_0x261314(0x318)]))_0x475bcd=String(RegExp['$1']);else _0x54f2c5[_0x261314(0x316)](_0x483597[_0x261314(0x3c0)])&&(_0x475bcd=String(RegExp['$1']));if(_0x475bcd){if(_0x261314(0x36f)===_0x261314(0x36f)){const _0x166e82=ImageManager['loadPicture'](_0x475bcd);_0x166e82[_0x261314(0x378)](this[_0x261314(0x3b4)][_0x261314(0x300)](this,_0x5beb48,_0x166e82));}else this[_0x261314(0x395)][_0x261314(0x1f7)](),this[_0x261314(0x2b7)]=0x0;}else this[_0x261314(0x34f)](_0x35486c,_0x461ef0);},Window_ItemCraftingList[_0x32630c(0x368)][_0x32630c(0x3b4)]=function(_0x9c4cfc,_0x59dc84){const _0x19aa9a=_0x32630c,_0x4e50f8=this['itemRectWithPadding'](_0x9c4cfc);let _0x229bc3=_0x4e50f8['x']+this[_0x19aa9a(0x23a)](),_0x5772dc=_0x4e50f8['y']+0x4,_0x1a2f21=_0x4e50f8[_0x19aa9a(0x2b7)]-this[_0x19aa9a(0x23a)]()*0x2,_0x475b07=_0x4e50f8[_0x19aa9a(0x2f3)]-0x8,_0x54be26=Math['min'](_0x1a2f21,_0x475b07);const _0x4eb893=_0x54be26/_0x59dc84[_0x19aa9a(0x2b7)],_0x15c3c8=_0x54be26/_0x59dc84['height'],_0x234eb0=Math[_0x19aa9a(0x22d)](_0x4eb893,_0x15c3c8,0x1);let _0x2ff542=Math[_0x19aa9a(0x1d4)](_0x59dc84[_0x19aa9a(0x2b7)]*_0x234eb0),_0x2366c5=Math[_0x19aa9a(0x1d4)](_0x59dc84[_0x19aa9a(0x2f3)]*_0x234eb0);_0x229bc3+=Math[_0x19aa9a(0x1d4)]((_0x54be26-_0x2ff542)/0x2),_0x5772dc+=Math[_0x19aa9a(0x1d4)]((_0x54be26-_0x2366c5)/0x2);const _0x3597f5=_0x59dc84['width'],_0x5581e2=_0x59dc84['height'];this['contents']['_context']['imageSmoothingEnabled']=!![],this[_0x19aa9a(0x395)]['blt'](_0x59dc84,0x0,0x0,_0x3597f5,_0x5581e2,_0x229bc3,_0x5772dc,_0x2ff542,_0x2366c5),this[_0x19aa9a(0x395)][_0x19aa9a(0x287)][_0x19aa9a(0x211)]=!![];},Window_ItemCraftingList['prototype']['drawBigItemIcon']=function(_0x36bd62,_0x388f17){const _0x559f5b=_0x32630c,_0x314393=_0x36bd62['iconIndex'];let _0x52dea1=_0x388f17['x']+this[_0x559f5b(0x23a)](),_0x1a8c7c=_0x388f17['y']+0x4,_0x5a72d2=_0x388f17[_0x559f5b(0x2b7)]-this[_0x559f5b(0x23a)]()*0x2,_0x4beb81=_0x388f17[_0x559f5b(0x2f3)]-0x8,_0x3bbddc=Math[_0x559f5b(0x22d)](_0x5a72d2,_0x4beb81);_0x3bbddc=Math[_0x559f5b(0x21d)](_0x3bbddc/ImageManager[_0x559f5b(0x28e)])*ImageManager[_0x559f5b(0x28e)],_0x1a8c7c+=(_0x4beb81-_0x3bbddc)/0x2;const _0x51c295=ImageManager['loadSystem'](_0x559f5b(0x38e)),_0x31d811=ImageManager[_0x559f5b(0x28e)],_0x4e5421=ImageManager[_0x559f5b(0x415)],_0xed1088=_0x314393%0x10*_0x31d811,_0x53f475=Math[_0x559f5b(0x21d)](_0x314393/0x10)*_0x4e5421;this[_0x559f5b(0x395)]['_context'][_0x559f5b(0x211)]=![],this[_0x559f5b(0x395)]['blt'](_0x51c295,_0xed1088,_0x53f475,_0x31d811,_0x4e5421,_0x52dea1,_0x1a8c7c,_0x3bbddc,_0x3bbddc),this[_0x559f5b(0x395)][_0x559f5b(0x287)][_0x559f5b(0x211)]=!![];},Window_ItemCraftingList[_0x32630c(0x368)]['drawCraftedIcon']=function(_0x202192,_0x40ddaf){const _0x332135=_0x32630c;if(!$gameSystem[_0x332135(0x27e)](_0x202192))return;const _0x40e761=ImageManager[_0x332135(0x253)];let _0x5ef038=_0x40ddaf['x']+_0x40ddaf[_0x332135(0x2b7)]-ImageManager[_0x332135(0x28e)],_0x1325a5=_0x40ddaf['y']+0x2;this['drawIcon'](_0x40e761,_0x5ef038,_0x1325a5);},Window_ItemCraftingList['prototype'][_0x32630c(0x35a)]=function(_0x40d0cc,_0x414603){const _0xcef76=_0x32630c,_0x181840=DataManager[_0xcef76(0x3a0)](_0x40d0cc);let _0x11139c=_0x414603[_0xcef76(0x2f3)]+this[_0xcef76(0x23a)]()*0x2,_0x521767=_0x414603['y']+Math[_0xcef76(0x1d4)](this[_0xcef76(0x33c)]()*1.2),_0x278d67=_0x414603[_0xcef76(0x2b7)]-_0x11139c-this['itemPadding'](),_0x4ff92f=Math['floor'](_0x278d67/this[_0xcef76(0x3b6)]),_0x1fec5b=!![];for(const _0x2f8683 of _0x181840){if(!_0x1fec5b){if('tejSP'!==_0xcef76(0x3f4)){let _0x1bb37f=TextManager[_0xcef76(0x3da)],_0x5b37fa=_0x414603['y']+(_0x414603['height']-this[_0xcef76(0x33c)]()*1.5);this[_0xcef76(0x416)](_0x1bb37f,_0x11139c,_0x5b37fa,_0x4ff92f,_0xcef76(0x3dc));}else _0x1340a6[_0xcef76(0x3c7)][_0xcef76(0x2ae)][_0xcef76(0x2d6)](this);}_0x11139c+=_0x4ff92f;const _0x27ccbf=_0x2f8683[0x0],_0x367d10=_0x2f8683[0x1],_0x41252c=_0x27ccbf===_0xcef76(0x335)?$gameParty['gold']():$gameParty[_0xcef76(0x343)](_0x27ccbf);if(_0x27ccbf===_0xcef76(0x335))this['drawIngredientGold'](_0x367d10,_0x41252c,_0x11139c,_0x521767,_0x4ff92f);else typeof _0x27ccbf===_0xcef76(0x255)&&_0x27ccbf['match'](/CATEGORY/i)?this['drawIngredientCategory'](_0x27ccbf,_0x367d10,_0x11139c,_0x521767,_0x4ff92f):this[_0xcef76(0x218)](_0x27ccbf,_0x367d10,_0x41252c,_0x11139c,_0x521767,_0x4ff92f);this[_0xcef76(0x370)](),_0x1fec5b=![];}},Window_ItemCraftingList[_0x32630c(0x368)][_0x32630c(0x3b9)]=function(_0x2b173f,_0x237980,_0x61aa84,_0xe1aa01,_0x4da051){const _0x6f5caa=_0x32630c;if(Imported[_0x6f5caa(0x36b)]){let _0x5258e7=_0x61aa84-Math[_0x6f5caa(0x1d4)](ImageManager[_0x6f5caa(0x28e)]/0x2),_0x25e192=_0xe1aa01+Math['round']((this[_0x6f5caa(0x33c)]()-ImageManager['iconHeight'])/0x2);const _0x4b16e5=VisuMZ[_0x6f5caa(0x222)]?VisuMZ[_0x6f5caa(0x222)][_0x6f5caa(0x41d)]['Gold'][_0x6f5caa(0x1d7)]:0x0;this['drawIcon'](_0x4b16e5,_0x5258e7,_0x25e192);}else{if(_0x6f5caa(0x3f1)===_0x6f5caa(0x409)){if(this[_0x6f5caa(0x3d5)]===_0x57b0c1)this[_0x6f5caa(0x36e)]();this[_0x6f5caa(0x3d5)][_0x6f5caa(0x280)]=_0x59929e;}else{let _0x371abd=_0x61aa84-Math[_0x6f5caa(0x1d4)](_0x4da051/0x2),_0x30b383=_0xe1aa01+Math[_0x6f5caa(0x1d4)]((this[_0x6f5caa(0x33c)]()-ImageManager['iconHeight'])/0x2);this['changeTextColor'](ColorManager[_0x6f5caa(0x3e8)]()),this['makeFontBigger'](),this['drawText'](TextManager[_0x6f5caa(0x29b)],_0x371abd,_0x30b383,_0x4da051,_0x6f5caa(0x3dc)),this[_0x6f5caa(0x370)]();}}let _0x45c0ec=_0x61aa84-Math[_0x6f5caa(0x1d4)](_0x4da051/0x2),_0x56b8f7=_0xe1aa01+this['lineHeight']();const _0x29500b=VisuMZ[_0x6f5caa(0x2d4)]['Settings']['ItemScene'][_0x6f5caa(0x237)];let _0x1bd279=_0x29500b[_0x6f5caa(0x3f5)](_0x2b173f);if(_0x2b173f>_0x237980){if(_0x6f5caa(0x3ff)!==_0x6f5caa(0x3ff))return _0x48581b[_0x6f5caa(0x2d4)]['Settings']['ShopScene'][_0x6f5caa(0x2f7)];else this[_0x6f5caa(0x3c4)](ColorManager[_0x6f5caa(0x396)]());}this[_0x6f5caa(0x395)][_0x6f5caa(0x227)]=Window_ItemCraftingList[_0x6f5caa(0x236)],this[_0x6f5caa(0x416)](_0x1bd279,_0x45c0ec,_0x56b8f7,_0x4da051,'center');},Window_ItemCraftingList[_0x32630c(0x368)][_0x32630c(0x2c0)]=function(_0x534ef8,_0x450e1a,_0x3f182b,_0x4d64a7,_0xcb4dd4){const _0x22c728=_0x32630c,_0xd06133=VisuMZ[_0x22c728(0x3c7)][_0x22c728(0x41d)]['General'];let _0x348363=_0x3f182b-Math[_0x22c728(0x1d4)](ImageManager[_0x22c728(0x28e)]/0x2),_0x389d1b=_0x4d64a7+Math[_0x22c728(0x1d4)]((this[_0x22c728(0x33c)]()-ImageManager[_0x22c728(0x415)])/0x2);this[_0x22c728(0x2c9)](_0xd06133[_0x22c728(0x27a)],_0x348363,_0x389d1b),_0x534ef8[_0x22c728(0x316)](/CATEGORY: (.*)/i);const _0x138b2b=String(RegExp['$1'])['trim']();let _0x569744=_0x3f182b-Math[_0x22c728(0x1d4)](_0xcb4dd4/0x2),_0x2ea86a=_0x4d64a7;this[_0x22c728(0x395)][_0x22c728(0x227)]=Window_ItemCraftingList[_0x22c728(0x236)],this[_0x22c728(0x416)](_0x138b2b,_0x569744,_0x2ea86a,_0xcb4dd4,_0x22c728(0x3dc));let _0x4aaa42=_0x3f182b-Math[_0x22c728(0x1d4)](_0xcb4dd4/0x2),_0xd121c6=_0x4d64a7+this[_0x22c728(0x33c)]();const _0x4d6fcb=VisuMZ[_0x22c728(0x2d4)][_0x22c728(0x41d)][_0x22c728(0x30b)][_0x22c728(0x237)];let _0x6ad32e=_0x4d6fcb[_0x22c728(0x3f5)](_0x450e1a);this[_0x22c728(0x395)][_0x22c728(0x227)]=Window_ItemCraftingList['quantityFontSize'],this[_0x22c728(0x416)](_0x6ad32e,_0x4aaa42,_0xd121c6,_0xcb4dd4,_0x22c728(0x3dc));},Window_ItemCraftingList[_0x32630c(0x368)][_0x32630c(0x218)]=function(_0x1a8fd5,_0x3ed4fc,_0x92a696,_0x53ddd1,_0x4c9f05,_0x5c2751){const _0x45cd57=_0x32630c;let _0x2b06de=_0x53ddd1-Math[_0x45cd57(0x1d4)](ImageManager['iconWidth']/0x2),_0x425edd=_0x4c9f05+Math[_0x45cd57(0x1d4)]((this[_0x45cd57(0x33c)]()-ImageManager[_0x45cd57(0x415)])/0x2);this[_0x45cd57(0x2c9)](_0x1a8fd5[_0x45cd57(0x26d)],_0x2b06de,_0x425edd);let _0x4d634e=_0x53ddd1-Math[_0x45cd57(0x1d4)](_0x5c2751/0x2),_0xad7f12=_0x4c9f05+this['lineHeight']();const _0x254086=VisuMZ[_0x45cd57(0x2d4)][_0x45cd57(0x41d)]['ItemScene']['ItemQuantityFmt'];let _0x18f348=_0x254086[_0x45cd57(0x3f5)](_0x45cd57(0x311)[_0x45cd57(0x3f5)](_0x92a696,_0x3ed4fc));_0x3ed4fc>_0x92a696&&this['changeTextColor'](ColorManager[_0x45cd57(0x396)]()),this[_0x45cd57(0x395)]['fontSize']=Window_ItemCraftingList['quantityFontSize'],this[_0x45cd57(0x416)](_0x18f348,_0x4d634e,_0xad7f12,_0x5c2751,_0x45cd57(0x3dc));},Window_ItemCraftingList['prototype'][_0x32630c(0x3d9)]=function(){const _0x3f0766=_0x32630c;if(!VisuMZ[_0x3f0766(0x3c7)][_0x3f0766(0x41d)]['Window']['ToolTips'])return;const _0x5aec1f=new Rectangle(0x0,0x0,Graphics[_0x3f0766(0x2b2)],Window_Base[_0x3f0766(0x368)][_0x3f0766(0x1d3)](0x1));this[_0x3f0766(0x344)]=new Window_ItemCraftingTooltip(_0x5aec1f),this[_0x3f0766(0x418)](this['_tooltipWindow']);},Window_ItemCraftingList[_0x32630c(0x368)]['update']=function(){const _0x4b606e=_0x32630c;Window_ItemList['prototype']['update']['call'](this),this[_0x4b606e(0x298)]();},Window_ItemCraftingList[_0x32630c(0x368)][_0x32630c(0x298)]=function(){const _0x4f04b6=_0x32630c;if(!this[_0x4f04b6(0x344)])return;this['tooltipFrameCheckRequirements']()?_0x4f04b6(0x2b3)===_0x4f04b6(0x2b3)?this[_0x4f04b6(0x319)]():this[_0x4f04b6(0x1c4)](...arguments):this[_0x4f04b6(0x344)][_0x4f04b6(0x1ee)]('');const _0x750646=new Point(TouchInput['x'],TouchInput['y']),_0x565813=this[_0x4f04b6(0x20f)]['applyInverse'](_0x750646);this[_0x4f04b6(0x344)]['x']=_0x565813['x']-this['_tooltipWindow']['width']/0x2,this[_0x4f04b6(0x344)]['y']=_0x565813['y']-this['_tooltipWindow']['height'];},Window_ItemCraftingList[_0x32630c(0x368)][_0x32630c(0x358)]=function(){const _0x2ae402=_0x32630c;if(!this[_0x2ae402(0x2e7)])return![];if(!this['item']())return![];if(!this[_0x2ae402(0x3b1)]())return![];if(this['hitIndex']()!==this[_0x2ae402(0x303)]())return![];return!![];},Window_ItemCraftingList[_0x32630c(0x368)][_0x32630c(0x319)]=function(){const _0x5b9165=_0x32630c,_0x23bc8=this[_0x5b9165(0x271)](this['index']());$gameTemp['_bypassProxy']=!![];const _0x280623=DataManager[_0x5b9165(0x3a0)](this[_0x5b9165(0x285)]());$gameTemp[_0x5b9165(0x1ff)]=![];const _0x5b1439=new Point(TouchInput['x'],TouchInput['y']),_0x5aefda=this['worldTransform'][_0x5b9165(0x336)](_0x5b1439);let _0x21fa67=_0x23bc8[_0x5b9165(0x2f3)]+this['itemPadding']()*0x2,_0x6d3d15=_0x23bc8['y']+this[_0x5b9165(0x33c)](),_0x2638bb=_0x23bc8['width']-_0x21fa67-this[_0x5b9165(0x23a)](),_0xf59a48=Math[_0x5b9165(0x21d)](_0x2638bb/this['_maxIngredientsSize']);for(const _0x1db8bc of _0x280623){_0x21fa67+=_0xf59a48;const _0x388562=new Rectangle(_0x21fa67-ImageManager['iconWidth'],0x0,ImageManager[_0x5b9165(0x28e)]*0x2,Graphics[_0x5b9165(0x41a)]);if(_0x388562[_0x5b9165(0x2f9)](_0x5aefda['x'],_0x5aefda['y'])){let _0x2a1258=_0x1db8bc[0x0],_0x2e954f='';if(_0x2a1258===_0x5b9165(0x335)){if('HmasH'===_0x5b9165(0x2db)){if(!_0x17b1f3)return![];if(!_0x2144db['ItemCraftingSys'][_0x5b9165(0x41d)][_0x5b9165(0x36c)][_0x5b9165(0x2e8)])return![];_0x29e10d[_0x5b9165(0x382)]&&(_0x4e405b=_0x25a4b1[_0x5b9165(0x382)](_0x4ffdd1));const _0x241a1b=_0x385939['getCustomItemCraftingSettings']();if(_0x241a1b&&_0x241a1b['BypassMasks'])return![];if(_0x3208b0[_0x5b9165(0x32a)][_0x5b9165(0x316)](_0x119979[_0x5b9165(0x3c7)][_0x5b9165(0x2ac)][_0x5b9165(0x25e)]))return![];return!_0x5223b1[_0x5b9165(0x27e)](_0x3413f2);}else _0x2e954f=TextManager[_0x5b9165(0x29b)];}else typeof _0x2a1258===_0x5b9165(0x255)&&_0x2a1258[_0x5b9165(0x316)](/CATEGORY/i)?'YZXdc'!=='QXGaF'?(_0x2a1258[_0x5b9165(0x316)](/CATEGORY: (.*)/i),_0x2e954f=String(RegExp['$1'])[_0x5b9165(0x2c7)]()):(_0x35725a(_0x5b9165(0x40c)[_0x5b9165(0x3f5)](_0x3e63ec,_0x54ce5b)),_0x3b1b3f[_0x5b9165(0x254)]()):_0x5b9165(0x24f)==='jVbHo'?this[_0x5b9165(0x257)][_0x5b9165(0x3be)](_0x5d67d2[_0x5b9165(0x25f)]):_0x2e954f=_0x2a1258[_0x5b9165(0x1ce)];this[_0x5b9165(0x344)][_0x5b9165(0x1ee)](_0x2e954f[_0x5b9165(0x2c7)]());return;}}this[_0x5b9165(0x344)][_0x5b9165(0x1ee)]('');},Window_ItemCraftingList[_0x32630c(0x368)]['updateHelp']=function(){const _0x8fadb2=_0x32630c,_0x48a7f1=this[_0x8fadb2(0x285)]()&&DataManager[_0x8fadb2(0x359)](this['item']())?null:this[_0x8fadb2(0x285)]();this['setHelpWindowItem'](_0x48a7f1),this['_statusWindow']&&this[_0x8fadb2(0x257)]['constructor']===Window_ShopStatus&&this[_0x8fadb2(0x257)]['setItem'](_0x48a7f1);};function Window_ItemCraftingTooltip(){const _0x35e8c1=_0x32630c;this[_0x35e8c1(0x1c4)](...arguments);}Window_ItemCraftingTooltip['prototype']=Object[_0x32630c(0x27b)](Window_Base[_0x32630c(0x368)]),Window_ItemCraftingTooltip[_0x32630c(0x368)][_0x32630c(0x353)]=Window_ItemCraftingTooltip,Window_ItemCraftingTooltip[_0x32630c(0x38c)]=VisuMZ['ItemCraftingSys'][_0x32630c(0x41d)]['Window']['name'],Window_ItemCraftingTooltip[_0x32630c(0x368)][_0x32630c(0x1c4)]=function(_0x4a5ad5){const _0x36a8b0=_0x32630c;Window_Base[_0x36a8b0(0x368)]['initialize'][_0x36a8b0(0x2d6)](this,_0x4a5ad5),this[_0x36a8b0(0x3be)](this[_0x36a8b0(0x328)]()?0x0:0x2),this[_0x36a8b0(0x1ee)]('');},Window_ItemCraftingTooltip[_0x32630c(0x368)][_0x32630c(0x328)]=function(){return Window_ItemCraftingTooltip['tooltipSkin']!=='';},Window_ItemCraftingTooltip[_0x32630c(0x368)]['loadWindowskin']=function(){const _0x2c2dba=_0x32630c;if(Window_ItemCraftingTooltip[_0x2c2dba(0x38c)]!=='')this[_0x2c2dba(0x3d8)]=ImageManager[_0x2c2dba(0x377)](Window_ItemCraftingTooltip[_0x2c2dba(0x38c)]);else{if(_0x2c2dba(0x26e)===_0x2c2dba(0x2c3)){if(this['_numberWindow']&&this[_0x2c2dba(0x216)][_0x2c2dba(0x2e7)])return _0x3d119f[_0x2c2dba(0x2d8)]('up',_0x2c2dba(0x421));return _0x179c57[_0x2c2dba(0x368)][_0x2c2dba(0x2eb)]['call'](this);}else Window_Base[_0x2c2dba(0x368)]['loadWindowskin'][_0x2c2dba(0x2d6)](this);}},Window_ItemCraftingTooltip[_0x32630c(0x368)]['setText']=function(_0x206430){const _0x53167e=_0x32630c;this[_0x53167e(0x33f)]!==_0x206430&&(_0x53167e(0x35c)===_0x53167e(0x35c)?(this[_0x53167e(0x33f)]=_0x206430,this['refresh']()):this[_0x53167e(0x3a6)](_0x1de09f,_0x3e3946,!![]));},Window_ItemCraftingTooltip[_0x32630c(0x368)][_0x32630c(0x1f7)]=function(){const _0x4824f5=_0x32630c;this[_0x4824f5(0x1ee)]('');},Window_ItemCraftingTooltip[_0x32630c(0x368)][_0x32630c(0x2e1)]=function(_0x4cf82c){const _0x30ec67=_0x32630c;this[_0x30ec67(0x1ee)](_0x4cf82c?_0x4cf82c[_0x30ec67(0x1ce)]:'');},Window_ItemCraftingTooltip[_0x32630c(0x368)]['refresh']=function(){const _0x2277a9=_0x32630c,_0x13cb5c=this[_0x2277a9(0x3f9)]();this[_0x2277a9(0x2bd)](),this[_0x2277a9(0x416)](this[_0x2277a9(0x33f)],0x0,0x0,this[_0x2277a9(0x35e)],'center');},Window_ItemCraftingTooltip[_0x32630c(0x368)][_0x32630c(0x2bd)]=function(){const _0x4fabd8=_0x32630c;if(this[_0x4fabd8(0x33f)]===''){if(_0x4fabd8(0x37a)==='GdlpX')return this['setupNumberWindow']();else this['contents']['clear'](),this[_0x4fabd8(0x2b7)]=0x0;}else{let _0x22c96a=this['textWidth'](this[_0x4fabd8(0x33f)])+this[_0x4fabd8(0x23a)]()*0x4;this[_0x4fabd8(0x2b7)]=_0x22c96a+$gameSystem[_0x4fabd8(0x228)]()*0x2,this[_0x4fabd8(0x3cd)]();if(this[_0x4fabd8(0x328)]())return;const _0x39ed00=ColorManager[_0x4fabd8(0x25c)]();this[_0x4fabd8(0x395)][_0x4fabd8(0x3bb)](0x0,0x0,this['innerWidth'],this[_0x4fabd8(0x240)],_0x39ed00);}};function Window_ItemCraftingNumber(){const _0x31579f=_0x32630c;this[_0x31579f(0x1c4)](...arguments);}Window_ItemCraftingNumber[_0x32630c(0x368)]=Object['create'](Window_ShopNumber[_0x32630c(0x368)]),Window_ItemCraftingNumber[_0x32630c(0x368)]['constructor']=Window_ItemCraftingNumber,Window_ItemCraftingNumber[_0x32630c(0x368)]['initialize']=function(_0x26817e){const _0x45e94b=_0x32630c;Window_ShopNumber[_0x45e94b(0x368)][_0x45e94b(0x1c4)][_0x45e94b(0x2d6)](this,_0x26817e);},Window_ItemCraftingNumber[_0x32630c(0x368)][_0x32630c(0x238)]=function(_0x2d3560){const _0x3b91dc=_0x32630c;this[_0x3b91dc(0x326)]=_0x2d3560,this[_0x3b91dc(0x3d2)]=this[_0x3b91dc(0x3d6)](),this[_0x3b91dc(0x2e3)]=Math[_0x3b91dc(0x22d)](0x1,this['_max']),this[_0x3b91dc(0x376)](),this[_0x3b91dc(0x2fe)]();},Window_ItemCraftingNumber[_0x32630c(0x368)][_0x32630c(0x3d6)]=function(){const _0x189762=_0x32630c,_0x162412=[],_0x1df6b5=this[_0x189762(0x326)],_0xe0f530=DataManager[_0x189762(0x3a0)](_0x1df6b5);let _0xef65b8=0x0;for(const _0x3bc5bd of _0xe0f530){if(_0x189762(0x2f6)!==_0x189762(0x2f0)){if(!_0x3bc5bd)continue;let _0x490db7=_0x3bc5bd[0x0];const _0x2d6b85=_0x3bc5bd[0x1];_0x490db7===_0x189762(0x335)?_0x162412['push'](Math[_0x189762(0x21d)]($gameParty[_0x189762(0x335)]()/_0x2d6b85)):_0x189762(0x317)===_0x189762(0x21a)?_0x2a01d1(_0x58bf12[_0x189762(0x3c7)][_0x189762(0x315)]):(typeof _0x490db7===_0x189762(0x255)&&_0x490db7['match'](/CATEGORY/i)&&(_0x490db7=SceneManager[_0x189762(0x34d)][_0x189762(0x1f2)][_0xef65b8],_0xef65b8+=0x1),_0x162412[_0x189762(0x286)](Math[_0x189762(0x21d)]($gameParty[_0x189762(0x343)](_0x490db7)/_0x2d6b85)));}else this[_0x189762(0x219)][_0x189762(0x286)](_0x8d6665);}if(_0x162412[_0x189762(0x30e)]<=0x0)_0x162412[_0x189762(0x286)](0x0);return _0x162412[_0x189762(0x286)]($gameParty[_0x189762(0x1e8)](_0x1df6b5)-$gameParty[_0x189762(0x343)](_0x1df6b5)),Math['min'](..._0x162412);},Window_ItemCraftingNumber[_0x32630c(0x368)][_0x32630c(0x2fe)]=function(){const _0x5b44fd=_0x32630c;Window_Selectable[_0x5b44fd(0x368)][_0x5b44fd(0x2fe)][_0x5b44fd(0x2d6)](this),this[_0x5b44fd(0x37c)](),this[_0x5b44fd(0x297)](0x0),this[_0x5b44fd(0x3c2)](),this['drawHorzLine'](),this['drawCurrentItemName']();},Window_ItemCraftingNumber[_0x32630c(0x368)][_0x32630c(0x37c)]=function(){const _0x1efcbe=_0x32630c,_0x346561=this[_0x1efcbe(0x248)][0x4];if(!_0x346561)return;this[_0x1efcbe(0x20e)]()?_0x346561[_0x1efcbe(0x333)](this[_0x1efcbe(0x349)][_0x1efcbe(0x300)](this)):_0x346561[_0x1efcbe(0x393)]=null;},Window_ItemCraftingNumber['prototype'][_0x32630c(0x350)]=function(){const _0x3797b7=_0x32630c;return Math['floor'](this[_0x3797b7(0x1d5)]()+this[_0x3797b7(0x33c)]()*0x2);},Window_ItemCraftingNumber[_0x32630c(0x368)]['totalPriceY']=function(){const _0x5c9b9e=_0x32630c;return Math['floor'](this[_0x5c9b9e(0x240)]-this[_0x5c9b9e(0x33c)]()*6.5);},Window_ItemCraftingNumber[_0x32630c(0x368)][_0x32630c(0x2d2)]=function(){const _0xb213ad=_0x32630c;return Math[_0xb213ad(0x21d)](this['itemNameY']()+this[_0xb213ad(0x33c)]()*0x2);},Window_ItemCraftingNumber[_0x32630c(0x368)][_0x32630c(0x20e)]=function(){const _0x17a479=_0x32630c;if((this[_0x17a479(0x2e3)]||0x0)<=0x0)return![];return Window_ShopNumber['prototype'][_0x17a479(0x20e)][_0x17a479(0x2d6)](this);},Window_ItemCraftingNumber['prototype'][_0x32630c(0x2bb)]=function(){const _0x59fd1b=_0x32630c;return this[_0x59fd1b(0x20e)]();},Window_ItemCraftingNumber[_0x32630c(0x368)]['drawTotalPrice']=function(){const _0x5f22cb=_0x32630c,_0x2e6f26=DataManager[_0x5f22cb(0x3a0)](this[_0x5f22cb(0x326)]);let _0x17a5ac=this[_0x5f22cb(0x1d5)]();_0x17a5ac-=this[_0x5f22cb(0x33c)]()*_0x2e6f26[_0x5f22cb(0x30e)],this['_categoryIndex']=0x0,this[_0x5f22cb(0x3a5)](_0x17a5ac);for(const _0x5be80e of _0x2e6f26){_0x17a5ac+=this[_0x5f22cb(0x33c)]();if(!_0x5be80e)continue;this[_0x5f22cb(0x29d)](_0x5be80e,_0x17a5ac);};},Window_ItemCraftingNumber[_0x32630c(0x368)][_0x32630c(0x3a5)]=function(_0x29c942){const _0x32cc23=_0x32630c,_0x65c426=this[_0x32cc23(0x23a)]();let _0x5dfd2d=_0x65c426*0x2;const _0xe003bd=this[_0x32cc23(0x35e)]-_0x5dfd2d-_0x65c426*0x3,_0x287c81=_0x5dfd2d+Math[_0x32cc23(0x208)](_0xe003bd/0x3),_0x5ad660=Math[_0x32cc23(0x21d)](_0xe003bd*0x2/0x3/0x3),_0x544996=Math[_0x32cc23(0x348)](this[_0x32cc23(0x260)](_0x32cc23(0x2cd)),this[_0x32cc23(0x260)]('\x20=\x20'));this['resetFontSettings'](),this[_0x32cc23(0x3c4)](ColorManager[_0x32cc23(0x3e8)]());const _0x1f2aab=[_0x32cc23(0x1cb),_0x32cc23(0x206),_0x32cc23(0x25b)];for(let _0x1688f7=0x0;_0x1688f7<0x3;_0x1688f7++){if(_0x32cc23(0x34e)===_0x32cc23(0x3fc))this[_0x32cc23(0x361)][_0x32cc23(0x3be)](_0x472d29['GoldBgType']);else{const _0x5257d8=_0x1f2aab[_0x1688f7],_0x47623c=TextManager['ItemCraftingNumberWindow'][_0x5257d8];this[_0x32cc23(0x416)](_0x47623c,_0x287c81+_0x5ad660*_0x1688f7+_0x544996,_0x29c942,_0x5ad660-_0x544996,'center');}}},Window_ItemCraftingNumber[_0x32630c(0x368)][_0x32630c(0x3bc)]=function(_0x435200,_0x56f120){const _0xc55bc6=_0x32630c,_0x5256b7=this[_0xc55bc6(0x23a)]();let _0x472ea4=_0x5256b7*0x2;const _0x1d1e59=this[_0xc55bc6(0x35e)]-_0x472ea4-_0x5256b7*0x3,_0x4d6125=_0x472ea4+Math[_0xc55bc6(0x208)](_0x1d1e59/0x3),_0x1d0659=Math[_0xc55bc6(0x21d)](_0x1d1e59*0x2/0x3/0x3);_0x56f120=_0xc55bc6(0x201)[_0xc55bc6(0x3f5)](_0x56f120),this[_0xc55bc6(0x416)](_0x56f120,_0x4d6125+_0x1d0659*0x1,_0x435200,_0x1d0659,_0xc55bc6(0x1fd)),this[_0xc55bc6(0x416)]('\x20=',_0x4d6125+_0x1d0659*0x2,_0x435200,_0x1d0659,_0xc55bc6(0x1fd));},Window_ItemCraftingNumber[_0x32630c(0x368)][_0x32630c(0x29d)]=function(_0x357721,_0x1e1be7){const _0x2a20be=_0x32630c;let _0x4bf253=_0x357721[0x0];this['resetFontSettings'](),this[_0x2a20be(0x3bc)](_0x1e1be7,'-'),_0x4bf253===_0x2a20be(0x335)?this['drawGoldIngredient'](_0x357721,_0x1e1be7,!![]):this[_0x2a20be(0x35b)](_0x357721,_0x1e1be7,!![],![]);},Window_ItemCraftingNumber['prototype']['drawCurrentItemName']=function(){const _0x2a215f=_0x32630c,_0x1c9aad=[this[_0x2a215f(0x326)],0x1],_0x31e5d5=this[_0x2a215f(0x350)](),_0x46fc2d=DataManager[_0x2a215f(0x359)](this['_item']);this[_0x2a215f(0x35b)](_0x1c9aad,_0x31e5d5,![],_0x46fc2d),this[_0x2a215f(0x3bc)](_0x31e5d5,'+');},Window_ItemCraftingNumber['prototype'][_0x32630c(0x3d3)]=function(){return!![];},Window_ItemCraftingNumber[_0x32630c(0x368)][_0x32630c(0x324)]=function(){return![];},Window_ItemCraftingNumber[_0x32630c(0x368)]['drawGoldIngredient']=function(_0x2d748a,_0x209192,_0x74cac8){const _0x3e7aaf=_0x32630c,_0x1120d9=this[_0x3e7aaf(0x23a)]();let _0x3ae115=_0x1120d9*0x2;const _0x19d1da=this[_0x3e7aaf(0x35e)]-_0x3ae115-_0x1120d9*0x3,_0x4aafc2=_0x3ae115+Math['ceil'](_0x19d1da/0x3),_0x1a2067=Math[_0x3e7aaf(0x21d)](_0x19d1da*0x2/0x3/0x3),_0xe67da4=Math[_0x3e7aaf(0x348)](this[_0x3e7aaf(0x260)](_0x3e7aaf(0x2cd)),this[_0x3e7aaf(0x260)](_0x3e7aaf(0x372))),_0xc0f9ce=_0x2d748a[0x0],_0x570398=_0x2d748a[0x1],_0x56df4c=_0x570398*this[_0x3e7aaf(0x2e3)],_0x4ba67c=VisuMZ['CoreEngine']?VisuMZ[_0x3e7aaf(0x222)][_0x3e7aaf(0x41d)][_0x3e7aaf(0x307)][_0x3e7aaf(0x1d7)]:0x0;if(_0x4ba67c>0x0){if('bQVge'===_0x3e7aaf(0x32c)){const _0x15388c=_0x209192+(this[_0x3e7aaf(0x33c)]()-ImageManager['iconHeight'])/0x2;this[_0x3e7aaf(0x2c9)](_0x4ba67c,_0x3ae115,_0x15388c);const _0x4925d7=ImageManager[_0x3e7aaf(0x28e)]+0x4;_0x3ae115+=_0x4925d7;}else{if(_0x4d2e0b['isSceneItemCrafting']()&&!this['isItemCraftingCategoryValid'](_0x4c8764))return;_0x513799[_0x3e7aaf(0x3c7)][_0x3e7aaf(0x1e0)]['call'](this,_0x57b669);}}this[_0x3e7aaf(0x3c4)](ColorManager[_0x3e7aaf(0x3e8)]()),this[_0x3e7aaf(0x416)](TextManager[_0x3e7aaf(0x29b)],_0x3ae115,_0x209192,_0x1a2067,_0x3e7aaf(0x1fd));const _0x597f00=$gameParty['gold']();this[_0x3e7aaf(0x31c)](_0x597f00,TextManager[_0x3e7aaf(0x29b)],_0x4aafc2,_0x209192,_0x1a2067);const _0x4bb334=_0x4aafc2+_0x1a2067*0x1+_0xe67da4,_0x31e344=_0x1a2067-_0xe67da4;this[_0x3e7aaf(0x31c)](_0x56df4c,TextManager[_0x3e7aaf(0x29b)],_0x4bb334,_0x209192,_0x31e344);const _0x5aff6b=_0x4aafc2+_0x1a2067*0x2+_0xe67da4,_0x487df9=_0x1a2067-_0xe67da4,_0x36e8b5=Math[_0x3e7aaf(0x22d)](_0x597f00+_0x56df4c*(_0x74cac8?-0x1:0x1),$gameParty[_0x3e7aaf(0x272)]());this[_0x3e7aaf(0x31c)](_0x36e8b5,TextManager['currencyUnit'],_0x5aff6b,_0x209192,_0x487df9);},Window_ItemCraftingNumber['prototype']['drawItemIngredient']=function(_0x398434,_0x49a784,_0x60aaf1,_0x53bf9c){const _0x575b3a=_0x32630c,_0x12e116=this['itemPadding']();let _0x57b0a8=_0x12e116*0x2;const _0x52ca9a=this[_0x575b3a(0x35e)]-_0x57b0a8-_0x12e116*0x3,_0x5bc783=_0x57b0a8+Math['ceil'](_0x52ca9a/0x3),_0x46aec4=Math[_0x575b3a(0x21d)](_0x52ca9a*0x2/0x3/0x3),_0x143ce0=Math['max'](this['textWidth'](_0x575b3a(0x2cd)),this['textWidth']('\x20=\x20'));let _0x72f1b2=_0x398434[0x0];typeof _0x72f1b2===_0x575b3a(0x255)&&_0x72f1b2[_0x575b3a(0x316)](/CATEGORY/i)&&(_0x72f1b2=SceneManager[_0x575b3a(0x34d)]['_ingredientsList'][this[_0x575b3a(0x28a)]],this['_categoryIndex']+=0x1);const _0x5bad90=_0x398434[0x1],_0x4eacdd=_0x5bad90*this[_0x575b3a(0x2e3)];let _0x1d5282=_0x72f1b2[_0x575b3a(0x26d)];const _0xb7a8dd=_0x1d5282>0x0?ImageManager['iconWidth']+0x4:0x0;if(_0x53bf9c){if(_0x575b3a(0x36d)!=='DgCJw'){const _0x5b982e=this[_0x575b3a(0x23a)]();let _0x9f48f5=_0x5b982e*0x2;const _0x19f769=this['innerWidth']-_0x9f48f5-_0x5b982e*0x3,_0x5e06f7=_0x9f48f5+_0x148aaf[_0x575b3a(0x208)](_0x19f769/0x3),_0x4e0be2=_0xfdb8cd[_0x575b3a(0x21d)](_0x19f769*0x2/0x3/0x3);_0x4d3d2e=_0x575b3a(0x201)['format'](_0x317c67),this['drawText'](_0x480663,_0x5e06f7+_0x4e0be2*0x1,_0x4b599b,_0x4e0be2,_0x575b3a(0x1fd)),this['drawText']('\x20=',_0x5e06f7+_0x4e0be2*0x2,_0x302cec,_0x4e0be2,'left');}else{const _0x5edc43=new Rectangle(_0x57b0a8,_0x49a784,_0x52ca9a,this[_0x575b3a(0x33c)]());this[_0x575b3a(0x3e6)](_0x72f1b2,_0x5edc43),this[_0x575b3a(0x2c9)](_0x72f1b2['iconIndex'],_0x5edc43['x'],_0x5edc43['y']);}}else _0x575b3a(0x276)!==_0x575b3a(0x388)?this[_0x575b3a(0x267)](_0x72f1b2,_0x57b0a8,_0x49a784,_0x52ca9a):_0x7a3f77[_0x575b3a(0x32a)][_0x575b3a(0x316)](_0x56599b[_0x575b3a(0x3c7)]['RegExp'][_0x575b3a(0x302)])&&_0x524dc5['ItemCraftingSys'][_0x575b3a(0x3dd)](_0x4f60da,_0x271cc9['$1']);const _0x1c9772=_0x5bc783+_0x46aec4*0x0,_0x2b56e4=_0x46aec4-_0xb7a8dd,_0x8d1a92=$gameParty['numItems'](_0x72f1b2);this[_0x575b3a(0x416)](_0x8d1a92,_0x1c9772,_0x49a784,_0x2b56e4,'right'),this[_0x575b3a(0x2c9)](_0x1d5282,_0x1c9772+_0x2b56e4+0x4,_0x49a784);const _0x163fac=_0x5bc783+_0x46aec4*0x1+_0x143ce0,_0x53c19b=_0x46aec4-_0x143ce0-_0xb7a8dd;this[_0x575b3a(0x416)](_0x4eacdd,_0x163fac,_0x49a784,_0x53c19b,_0x575b3a(0x1e2)),this[_0x575b3a(0x2c9)](_0x1d5282,_0x163fac+_0x53c19b+0x4,_0x49a784);const _0x19f18f=_0x5bc783+_0x46aec4*0x2+_0x143ce0,_0x4d3713=_0x46aec4-_0x143ce0-_0xb7a8dd,_0x55d1b8=_0x8d1a92+_0x4eacdd*(_0x60aaf1?-0x1:0x1);this[_0x575b3a(0x416)](_0x55d1b8,_0x19f18f,_0x49a784,_0x4d3713,'right'),this[_0x575b3a(0x2c9)](_0x1d5282,_0x19f18f+_0x4d3713+0x4,_0x49a784);},Window_ItemCraftingNumber[_0x32630c(0x368)]['itemRect']=function(){const _0x509763=_0x32630c,_0x4e9523=this['itemPadding']();let _0x248c7c=_0x4e9523*0x2;const _0x5a8cb7=this[_0x509763(0x35e)]-_0x248c7c-_0x4e9523*0x3,_0x453ed0=_0x248c7c+Math[_0x509763(0x208)](_0x5a8cb7/0x3),_0x1079ee=this['itemNameY'](),_0x4adecc=Math['floor'](_0x5a8cb7*0x2/0x3/0x3),_0x4cff05=Math['max'](this[_0x509763(0x260)](_0x509763(0x2cd)),this[_0x509763(0x260)](_0x509763(0x372))),_0x1f2d7a=this[_0x509763(0x326)]?.[_0x509763(0x26d)]>0x0?ImageManager['iconWidth']:0x0,_0x58562a=this[_0x509763(0x3fd)](),_0x396cdc=new Rectangle(Math[_0x509763(0x21d)](_0x453ed0+_0x4adecc*0x2-this[_0x509763(0x3fd)]()-_0x1f2d7a+this[_0x509763(0x23a)]()/0x2-0x2),_0x1079ee,this[_0x509763(0x3fd)](),this[_0x509763(0x33c)]());return _0x396cdc;};function Window_ItemCraftingIngredient(){this['initialize'](...arguments);}Window_ItemCraftingIngredient[_0x32630c(0x368)]=Object[_0x32630c(0x27b)](Window_ItemList[_0x32630c(0x368)]),Window_ItemCraftingIngredient[_0x32630c(0x368)][_0x32630c(0x353)]=Window_ItemCraftingIngredient,Window_ItemCraftingIngredient['prototype'][_0x32630c(0x1c4)]=function(_0x566a7c){const _0x3feedc=_0x32630c;Window_Selectable[_0x3feedc(0x368)][_0x3feedc(0x1c4)][_0x3feedc(0x2d6)](this,_0x566a7c),this['_amount']=0x0;},Window_ItemCraftingIngredient[_0x32630c(0x368)]['isShowNew']=function(){return![];},Window_ItemCraftingIngredient['prototype'][_0x32630c(0x238)]=function(_0x4aa0d5,_0x155031){const _0x2e348a=_0x32630c;this[_0x2e348a(0x3c1)]=_0x4aa0d5,this[_0x2e348a(0x340)]=_0x155031||0x1,this['refresh'](),this[_0x2e348a(0x30d)](0x0,0x0),this['activate'](),this[_0x2e348a(0x347)](0x0);},Window_ItemCraftingIngredient[_0x32630c(0x368)][_0x32630c(0x1d1)]=function(){const _0x339d0b=_0x32630c;this[_0x339d0b(0x214)]=$gameParty[_0x339d0b(0x1fe)]()[_0x339d0b(0x296)](_0xa05be7=>this['includes'](_0xa05be7));},Window_ItemCraftingIngredient[_0x32630c(0x368)][_0x32630c(0x26c)]=function(_0x2929a3){const _0x5540d3=_0x32630c;if(!_0x2929a3)return![];if(_0x2929a3===SceneManager[_0x5540d3(0x34d)][_0x5540d3(0x326)])return![];return _0x2929a3[_0x5540d3(0x26f)]['includes'](this[_0x5540d3(0x3c1)][_0x5540d3(0x39c)]()[_0x5540d3(0x2c7)]());},Window_ItemCraftingIngredient['prototype'][_0x32630c(0x30c)]=function(_0x5ee3ac){const _0x2249ff=_0x32630c;if(!_0x5ee3ac)return![];if(this[_0x2249ff(0x38f)]()[_0x2249ff(0x26c)](_0x5ee3ac))return![];return $gameParty[_0x2249ff(0x343)](_0x5ee3ac)>=this[_0x2249ff(0x340)];},Window_ItemCraftingIngredient['prototype'][_0x32630c(0x38f)]=function(){const _0x1c2da0=_0x32630c,_0x2ef42a=[],_0x1a264e=DataManager[_0x1c2da0(0x3a0)](SceneManager[_0x1c2da0(0x34d)][_0x1c2da0(0x326)]);for(const _0x3182c5 of _0x1a264e){if(!_0x3182c5)continue;const _0x33af50=_0x3182c5[0x0];(DataManager[_0x1c2da0(0x412)](_0x33af50)||DataManager[_0x1c2da0(0x2a0)](_0x33af50)||DataManager[_0x1c2da0(0x2df)](_0x33af50))&&_0x2ef42a['push'](_0x33af50);}return _0x2ef42a[_0x1c2da0(0x1fc)](SceneManager[_0x1c2da0(0x34d)][_0x1c2da0(0x1f2)]);},Window_ItemCraftingIngredient['prototype']['drawItemName']=function(_0x161345,_0x1a51de,_0xe01c45,_0x4e8f1c){const _0x3fed97=_0x32630c;_0x161345&&this['selectedIngredientList']()[_0x3fed97(0x26c)](_0x161345)&&(this[_0x3fed97(0x1df)]=!![]),Window_ItemList['prototype'][_0x3fed97(0x267)][_0x3fed97(0x2d6)](this,_0x161345,_0x1a51de,_0xe01c45,_0x4e8f1c),this['_alreadySelected']=![];},Window_ItemCraftingIngredient['prototype'][_0x32630c(0x416)]=function(_0x48e1ce,_0x2d6af7,_0x5f04c3,_0x19d67d,_0x607c7c){const _0x2ec895=_0x32630c;if(this[_0x2ec895(0x1df)]){if('oDMzQ'==='oDMzQ'){const _0x5139d6=VisuMZ['ItemCraftingSys'][_0x2ec895(0x41d)][_0x2ec895(0x24c)];this[_0x2ec895(0x395)]['textColor']=ColorManager[_0x2ec895(0x2e9)](_0x5139d6[_0x2ec895(0x2a9)]),_0x48e1ce+=_0x5139d6['SelectedText'];}else _0x4ee946['ItemCraftingSys'][_0x2ec895(0x3c8)][_0x2ec895(0x2d6)](this),this[_0x2ec895(0x365)]();}Window_Base['prototype'][_0x2ec895(0x416)]['call'](this,_0x48e1ce,_0x2d6af7,_0x5f04c3,_0x19d67d,_0x607c7c);};