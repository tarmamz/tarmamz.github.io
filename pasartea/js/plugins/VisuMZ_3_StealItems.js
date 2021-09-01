//=============================================================================
// VisuStella MZ - Steal Items
// VisuMZ_3_StealItems.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_StealItems = true;

var VisuMZ = VisuMZ || {};
VisuMZ.StealItems = VisuMZ.StealItems || {};
VisuMZ.StealItems.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.02] [StealItems]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Steal_Items_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Thieves with the ability to steal items from enemies aren't an uncommon
 * class in RPG's. This plugin lets you set up enemies with items that can be
 * stolen from with different types of effects that can occur upon stealing.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create a pool of stealable items for each enemy.
 * * Make skills or items that have stealing properties attached to them.
 * * Some skills/items can be dedicated towards stealing specific types of loot
 *   (Gold, Items, Weapons, and/or Armor).
 * * Have different success rates for skills and items.
 * * Actors can gain trait effects that increase or decrease success rates.
 * * Enemies can gain resistance towards stealing.
 * * JavaScript uses can enable special effects to occur upon successfully
 *   stealing, failing, or emptying out an enemy's loot.
 * * Automatically translate drop items from the database into stealable loot.
 * * If weapons or armors are stolen, they can debuff the enemy and lower their
 *   parameters by their base bonuses.
 * * Use a Snatch effect to directly target a specific item to be stolen from
 *   the enemy.
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
 * * VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
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
 * Gold and Item Drop Removals
 * 
 * This is an optional effect that can be enabled from the Plugin Parameters.
 * 
 * If you have enabled Automatic Gold Drop and Item Drop inclusions from the
 * plugin parameters as well as enabled their respective "Loot Removal" plugin
 * parameters, then once the gold/items have been stolen a target enemy, that
 * enemy will not drop the specific gold value or specific item drop during the
 * victory aftermath phase.
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
 * ---
 * 
 * === Steal Action-Related Notetags ===
 * 
 * The following are notetags that are used to place on skills/items that you
 * want to have stealing properties for.
 * 
 * ---
 *
 * <Steal>
 * <Steal type>
 * <Steal type, type, type>
 *
 * - Used for: Skill, Item Notetags
 * - Gives the skill/item stealing properties.
 * - Replace 'type' with 'All', 'Gold', 'Item', 'Weapon', 'Armor' to restrict
 *   steal targets to those types.
 *
 * ---
 *
 * <Steal type: x%>
 *
 * - Used for: Skill, Item Notetags
 * - Gives the skill/item stealing properties with increased/decreased
 *   multiplicative success rates.
 * - Replace 'type' with 'All', 'Gold', 'Item', 'Weapon', 'Armor' to restrict
 *   steal targets to those types.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate multiplicatively by.
 * 
 * ---
 *
 * <Steal type: +x%>
 * <Steal type: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - Gives the skill/item stealing properties with increased/decreased
 *   additive success rates.
 * - Replace 'type' with 'All', 'Gold', 'Item', 'Weapon', 'Armor' to restrict
 *   steal targets to those types.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate additively by.
 *
 * ---
 * 
 * <Snatch>
 * <Targeting Steal>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the steal action from targeting a random item from the stealable
 *   types pool to a specific item that the player can select.
 * - If the snatch attempt fails, it will not attempt to steal other items.
 * - Both the <Snatch> and <Targeting Steal> notetags do the same thing.
 * - This does not work with abilities that target multiple enemies, random
 *   enemies, or actors.
 * - Use this in addition to the <Steal>, <Steal type>, or
 *   <Steal type, type, type> notetags as this does not have any steal
 *   properties on its own.
 * 
 * ---
 * 
 * === JavaScript Notetags: Steal Action-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * apply special effects for steal-related skills/items.
 * 
 * ---
 *
 * <JS Steal Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS On Steal Success>
 *  code
 *  code
 *  code
 * </JS On Steal Success>
 *
 * - Used for: Skill, Item Notetags
 * - Runs the inserted JavaScript code upon successfully stealing.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 * - The 'item' variable represents the item that was stolen if there is one.
 *   This will return a null value if gold was stolen instead.
 * - The 'gold' variable represents the gold quantity that was stolen if any.
 *   This will return a 0 value if there was no gold stolen.
 *
 * ---
 *
 * <JS On Steal Failure>
 *  code
 *  code
 *  code
 * </JS On Steal Failure>
 *
 * - Used for: Skill, Item Notetags
 * - Runs the inserted JavaScript code upon failing a stealth attempt.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was the theft target.
 *
 * ---
 *
 * <JS On Steal Empty>
 *  code
 *  code
 *  code
 * </JS On Steal Empty>
 *
 * - Used for: Skill, Item Notetags
 * - Runs the inserted JavaScript code if there was nothing to steal.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was the theft target.
 *
 * ---
 * 
 * === Steal Loot Setup-Related Notetags ===
 * 
 * The following notetags are made for enemies and used to set up the loot that
 * can be stolen.
 * 
 * ---
 *
 * <Steal Gold value: x%>
 * 
 * <Steal Item id: x%>
 * <Steal Item name: x%>
 * 
 * <Steal Weapon id: x%>
 * <Steal Weapon name: x%>
 * 
 * <Steal Armor id: x%>
 * <Steal Armor name: x%>
 *
 * - Used for: Enemy Notetags
 * - Sets up droppable loot for the enemy.
 * - When setting up gold loot, replace 'value' with the amount of gold that
 *   will be stolen from this loot entry.
 * - When setting up items, weapons, or armors, replace 'id' with the ID of the
 *   item, weapon, or armor for the loot entry.
 * - When setting up items, weapons, or armors, replace 'name' with the name of
 *   the item, weapon, or armor for the loot entry.
 * - Replace 'x' with a number value representing the base percent chance of
 *   successfully stealing this loot entry.
 * - Insert multiple notetags for multiple loot entries to be stolen.
 *
 * ---
 *
 * <Steal>
 *  Gold value: x%
 * 
 *  Item id: x%
 *  Item name: x%
 * 
 *  Weapon id: x%
 *  Weapon name: x%
 * 
 *  Armor id: x%
 *  Armor name: x%
 * </Steal>
 *
 * - Used for: Enemy Notetags
 * - Sets up a batch setup of droppable loot for the enemy.
 * - When setting up gold loot, replace 'value' with the amount of gold that
 *   will be stolen from this loot entry.
 * - When setting up items, weapons, or armors, replace 'id' with the ID of the
 *   item, weapon, or armor for the loot entry.
 * - When setting up items, weapons, or armors, replace 'name' with the name of
 *   the item, weapon, or armor for the loot entry.
 * - Replace 'x' with a number value representing the base percent chance of
 *   successfully stealing this loot entry.
 * - Insert/remove multiple copies of the loot entries inside the <Steal>
 *   notetags to add more or reduce entries.
 *
 * ---
 * 
 * === Steal Rate Traits-Related Notetags ===
 * 
 * The following notetags are made for trait objects that can alter the
 * success rates of steal skills/items.
 * 
 * ---
 *
 * <Steal Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Alters the steal rate for the stealing actor multiplicatively.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate multiplicatively by.
 * 
 * ---
 *
 * <Steal Rate: +x%>
 * <Steal Rate: -x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Alters the steal rate for the stealing actor multiplicatively.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate additively by.
 *
 * ---
 *
 * <Steal Resist: +x%>
 * <Steal Resist: -x%>
 *
 * - Used for: Enemy Notetags
 * - Alters the steal resistance for enemies. Higher numbers mean higher steal
 *   resistance.
 * - Replace 'x' with a number representing the percent value to alter the
 *   steal resistance by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Automatic Settings
 * ============================================================================
 *
 * Automatic settings pertaining to the steal mechanics of the game.
 *
 * ---
 *
 * Settings
 * 
 *   Add Gold Drop?:
 *   - Automatically include enemy gold drop into stealable items?
 * 
 *     Success Rate:
 *     - If automatically include gold drop, what is the steal rate?
 *     - Use a number between 0 and 1.
 * 
 *     Loot Removal:
 *     - If using automatic gold, remove the rewards from the enemy gold
 *       when defeated?
 * 
 *   Add Item Drops?:
 *   - Automatically include enemy item drop into stealable items?
 * 
 *     Success Modifier:
 *     - If automatically include item drops, how much do you want to alter
 *       their drop modifiers by?
 * 
 *     Loot Removal:
 *     - If using automatic drops, remove the rewards from the enemy items
 *       when defeated?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Log Settings
 * ============================================================================
 *
 * Settings pertaining to the steal-related messages that appear in the Battle
 * Log Window.
 *
 * ---
 *
 * Settings
 * 
 *   Show Messages:
 *   - Show messages regarding stolen items in the Battle Log window?
 * 
 *   Steal Item:
 *   - Message displayed when stealing an item.
 *   - %1 - Item's Name, %2 - Item's Icon
 * 
 *   Steal Gold:
 *   - Message displayed when stealing gold.
 *   - %1 - Gold Name, %2 - Gold Amount
 * 
 *   Steal Fail:
 *   - Message displayed when a steal attempt fails.
 * 
 *   Steal Empty:
 *   - Message displayed when there is nothing to steal.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Special game mechanics related to stealing.
 *
 * ---
 *
 * General
 * 
 *   Equip Debuff:
 *   - When weapons/armors are stolen, decrease the enemy's parameters based
 *     on the weapon/armor parameters?
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Bonus Steal %:
 *   - Code used to determine an additive bonus steal rate.
 * 
 *   JS: Steal Resist %:
 *   - Code used to determine an additive steal resistance.
 * 
 *   JS: On Steal Success:
 *   - What kind of code do you want to run when stealing succeeds?
 * 
 *   JS: On Steal Failure:
 *   - What kind of code do you want to run when stealing fails?
 * 
 *   JS: On Steal Empty:
 *   - What kind of code do you want to run when there is nothing to steal?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Popup Settings
 * ============================================================================
 *
 * Popup settings related to stealing.
 *
 * ---
 *
 * Success
 * 
 * Failure
 * 
 * Empty
 * 
 *   Text:
 *   - Text displayed upon stealing an item.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Snatch Settings
 * ============================================================================
 *
 * These are the settings for the effect when used with the <Snatch> notetag.
 * When snatching an item, the player can target a specific item in the enemy's
 * loot to be stolen from. The success rates and lists of items will be visible
 * at the expense of only being able to steal just that item.
 *
 * ---
 *
 * Gold
 * 
 *   Icon:
 *   - Icon used to represent gold.
 *   - Ignore if VisuMZ_0_CoreEngine is present.
 * 
 *   Name Format:
 *   - Name format on how gold is displayed.
 *   - %1 - Icon, %2 - Quantity, %3 - Current Name
 * 
 *   Help Text:
 *   - Text that's displayed in the help window when gold is selected in the
 *     Snatch window.
 *
 * ---
 *
 * Success Rate
 * 
 *   Display Success Rate:
 *   - Display success rates in the Snatch window?
 * 
 *   Already Stolen:
 *   - Text displayed when an item has already been stolen.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Sound Settings
 * ============================================================================
 *
 * Determine the sound effects played related to stealing.
 *
 * ---
 *
 * Successful Gold Steal
 * 
 * Successful Item Steal
 * 
 * Successful Weapon Steal
 * 
 * Successful Armor Steal
 * 
 * Failure
 * 
 * Empty
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
 * Version 1.02: April 2, 2021
 * * Feature Update!
 * ** Success rate calculation should no longer be skewed by JavaScript's float
 *    value math quirks. Update made by Yanfly.
 * 
 * Version 1.01: December 11, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.00: December 9, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param StealItems
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Auto:struct
 * @text Automatic Settings
 * @type struct<Auto>
 * @desc Automatic settings pertaining to the steal mechanics of the game.
 * @default {"AutoGold:eval":"true","GoldRate:num":"0.50","GoldRemoval:eval":"true","AutoItem:eval":"true","ItemRate:num":"1.50","ItemRemoval:eval":"true"}
 *
 * @param BattleLog:struct
 * @text Battle Log Settings
 * @type struct<BattleLog>
 * @desc Settings pertaining to the steal-related messages that appear in the Battle Log Window.
 * @default {"ShowMessages:eval":"true","StealItem:str":"Stole %2%1!","StealGold:str":"Stole %2 \\C[16]%1\\C[0]!","StealFail:str":"Steal attempt unsuccessful!","StealEmpty:str":"Nothing to steal!"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Special game mechanics related to stealing.
 * @default {"General":"","EquipDebuff:eval":"true","JavaScript":"","JsBonusSteal:func":"\"// Declare Variables\\nconst user = this;\\nlet bonusRate = 0;\\n\\n// Calculate Bonus Rate\\nbonusRate = (user.luk / (512 + user.luk)) / 3;\\n\\n// Return Bonus Rate\\nreturn bonusRate;\"","JsStealResist:func":"\"// Declare Variables\\nconst user = this;\\nlet resistRate = 0;\\n\\n// Calculate Resist Rate\\nresistRate = (user.luk / (512 + user.luk)) / 8;\\n\\n// Return Resist Rate\\nreturn resistRate;\"","JsOnStealSuccess:func":"\"// Declare Variables\\nconst user = arguments[0];\\nconst target = arguments[1];\\nconst a = user;\\nconst b = target;\\n\\n// Perform Action\\n\"","JsOnStealFail:func":"\"// Declare Variables\\nconst user = arguments[0];\\nconst target = arguments[1];\\nconst a = user;\\nconst b = target;\\n\\n// Perform Action\\n\"","JsOnStealEmpty:func":"\"// Declare Variables\\nconst user = arguments[0];\\nconst target = arguments[1];\\nconst a = user;\\nconst b = target;\\n\\n// Perform Action\\n\""}
 *
 * @param Popup:struct
 * @text Popup Settings
 * @type struct<Popup>
 * @desc Popup settings related to stealing.
 * @default {"Success":"","SuccessPopupText:str":"STOLEN","SuccessItemName:eval":"true","SuccessTextColor:str":"0","SuccessFlashColor:eval":"[255, 255, 255, 0]","SuccessFlashDuration:num":"60","Failure":"","FailurePopupText:str":"FAILED","FailureTextColor:str":"8","FailureFlashColor:eval":"[255, 255, 255, 0]","FailureFlashDuration:num":"60","Empty":"","EmptyPopupText:str":"EMPTY","EmptyTextColor:str":"8","EmptyFlashColor:eval":"[255, 255, 255, 0]","EmptyFlashDuration:num":"60"}
 *
 * @param Snatch:struct
 * @text Snatch Settings
 * @type struct<Snatch>
 * @desc Settings related to the snatch mechanic.
 * @default {"Gold":"","GoldIcon:num":"314","GoldNameFmt:str":"%1%2\\C[16]%3\\C[0]","GoldHelp:json":"\"Steal gold from this target!\"","Success":"","DisplaySuccess:eval":"true","AlreadyStolen:str":"Stolen"}
 *
 * @param Sound:struct
 * @text Sound Settings
 * @type struct<Sound>
 * @desc Determine the sound effects played related to stealing.
 * @default {"Successful":"","SuccessGold":"","gold_name:str":"Shop2","gold_volume:num":"90","gold_pitch:num":"120","gold_pan:num":"0","SuccessItem":"","item_name:str":"Item1","item_volume:num":"90","item_pitch:num":"120","item_pan:num":"0","SuccessWeapon":"","weapon_name:str":"Equip1","weapon_volume:num":"90","weapon_pitch:num":"120","weapon_pan:num":"0","SuccessArmor":"","armor_name:str":"Equip2","armor_volume:num":"90","armor_pitch:num":"120","armor_pan:num":"0","Failure":"","fail_name:str":"Buzzer2","fail_volume:num":"90","fail_pitch:num":"120","fail_pan:num":"0","Empty":"","empty_name:str":"Evasion1","empty_volume:num":"90","empty_pitch:num":"120","empty_pan:num":"0"}
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
 * Auto Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Auto:
 *
 * @param AutoGold:eval
 * @text Add Gold Drop?
 * @parent Auto
 * @type boolean
 * @on Include
 * @off Don't Include
 * @desc Automatically include enemy gold drop into stealable items?
 * @default true
 *
 * @param GoldRate:num
 * @text Success Rate
 * @parent AutoGold:eval
 * @desc If automatically include gold drop, what is the steal rate?
 * Use a number between 0 and 1.
 * @default 0.50
 *
 * @param GoldRemoval:eval
 * @text Loot Removal
 * @parent AutoGold:eval
 * @type boolean
 * @on Remove
 * @off Keep
 * @desc If using automatic gold, remove the rewards from the
 * enemy gold when defeated?
 * @default true
 *
 * @param AutoItem:eval
 * @text Add Item Drops?
 * @parent Auto
 * @type boolean
 * @on Include
 * @off Don't Include
 * @desc Automatically include enemy item drop into stealable items?
 * @default true
 *
 * @param ItemRate:num
 * @text Success Modifier
 * @parent AutoItem:eval
 * @desc If automatically include item drops, how much do you want
 * to alter their drop modifiers by?
 * @default 1.50
 *
 * @param ItemRemoval:eval
 * @text Loot Removal
 * @parent AutoItem:eval
 * @type boolean
 * @on Remove
 * @off Keep
 * @desc If using automatic drops, remove the rewards from the
 * enemy items when defeated?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLog:
 *
 * @param ShowMessages:eval
 * @text Show Messages
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show messages regarding stolen items in the Battle Log window?
 * @default true
 * 
 * @param StealItem:str
 * @text Steal Item
 * @desc Message displayed when stealing an item.
 * %1 - Item's Name, %2 - Item's Icon
 * @default Stole %2%1!
 * 
 * @param StealGold:str
 * @text Steal Gold
 * @desc Message displayed when stealing gold.
 * %1 - Gold Name, %2 - Gold Amount
 * @default Stole %2 \C[16]%1\C[0]!
 * 
 * @param StealFail:str
 * @text Steal Fail
 * @desc Message displayed when a steal attempt fails.
 * @default Steal attempt unsuccessful!
 * 
 * @param StealEmpty:str
 * @text Steal Empty
 * @desc Message displayed when there is nothing to steal.
 * @default Nothing to steal!
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param General
 *
 * @param EquipDebuff:eval
 * @text Equip Debuff
 * @parent General
 * @type boolean
 * @on Debuff
 * @off No Effects
 * @desc When weapons/armors are stolen, decrease the enemy's
 * parameters based on the weapon/armor parameters?
 * @default true
 *
 * @param JavaScript
 *
 * @param JsBonusSteal:func
 * @text JS: Bonus Steal %
 * @parent JavaScript
 * @type note
 * @desc Code used to determine an additive bonus steal rate.
 * @default "// Declare Variables\nconst user = this;\nlet bonusRate = 0;\n\n// Calculate Bonus Rate\nbonusRate = (user.luk / (512 + user.luk)) / 3;\n\n// Return Bonus Rate\nreturn bonusRate;"
 *
 * @param JsStealResist:func
 * @text JS: Steal Resist %
 * @parent JavaScript
 * @type note
 * @desc Code used to determine an additive steal resistance.
 * @default "// Declare Variables\nconst user = this;\nlet resistRate = 0;\n\n// Calculate Resist Rate\nresistRate = (user.luk / (512 + user.luk)) / 8;\n\n// Return Resist Rate\nreturn resistRate;"
 *
 * @param JsOnStealSuccess:func
 * @text JS: On Steal Success
 * @parent JavaScript
 * @type note
 * @desc What kind of code do you want to run when stealing succeeds?
 * @default "// Declare Variables\nconst user = arguments[0];\nconst target = arguments[1];\nconst a = user;\nconst b = target;\n\n// Perform Action\n"
 *
 * @param JsOnStealFail:func
 * @text JS: On Steal Failure
 * @parent JavaScript
 * @type note
 * @desc What kind of code do you want to run when stealing fails?
 * @default "// Declare Variables\nconst user = arguments[0];\nconst target = arguments[1];\nconst a = user;\nconst b = target;\n\n// Perform Action\n"
 *
 * @param JsOnStealEmpty:func
 * @text JS: On Steal Empty
 * @parent JavaScript
 * @type note
 * @desc What kind of code do you want to run when there is nothing to steal?
 * @default "// Declare Variables\nconst user = arguments[0];\nconst target = arguments[1];\nconst a = user;\nconst b = target;\n\n// Perform Action\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Popup:
 *
 * @param Success
 *
 * @param SuccessPopupText:str
 * @text Text
 * @parent Success
 * @desc Text displayed upon successfully stealing an item.
 * @default STOLEN
 *
 * @param SuccessItemName:eval
 * @text Show Item Name
 * @parent SuccessPopupText:str
 * @type boolean
 * @on Show
 * @off Don't
 * @desc Show the name of the item that is stolen, too?
 * @default true
 *
 * @param SuccessTextColor:str
 * @text Text Color
 * @parent Success
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param SuccessFlashColor:eval
 * @text Flash Color
 * @parent Success
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 0]
 * 
 * @param SuccessFlashDuration:num
 * @text Flash Duration
 * @parent Success
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Failure
 *
 * @param FailurePopupText:str
 * @text Text
 * @parent Failure
 * @desc Text displayed upon failing a steal attempt.
 * @default FAILED
 *
 * @param FailureTextColor:str
 * @text Text Color
 * @parent Failure
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 * @param FailureFlashColor:eval
 * @text Flash Color
 * @parent Failure
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 0]
 * 
 * @param FailureFlashDuration:num
 * @text Flash Duration
 * @parent Failure
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Empty
 *
 * @param EmptyPopupText:str
 * @text Text
 * @parent Empty
 * @desc Text displayed upon there is nothing to steal.
 * @default EMPTY
 *
 * @param EmptyTextColor:str
 * @text Text Color
 * @parent Empty
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 * @param EmptyFlashColor:eval
 * @text Flash Color
 * @parent Empty
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 0]
 * 
 * @param EmptyFlashDuration:num
 * @text Flash Duration
 * @parent Empty
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Snatch Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Snatch:
 *
 * @param Gold
 *
 * @param GoldIcon:num
 * @text Icon
 * @parent Gold
 * @desc Icon used to represent gold.
 * Ignore if VisuMZ_0_CoreEngine is present.
 * @default 314
 *
 * @param GoldNameFmt:str
 * @text Name Format
 * @parent Gold
 * @desc Name format on how gold is displayed.
 * %1 - Icon, %2 - Quantity, %3 - Current Name
 * @default %1%2\C[16]%3\C[0]
 *
 * @param GoldHelp:json
 * @text Help Text
 * @type note
 * @parent Gold
 * @desc Text that's displayed in the help window when gold is selected in the Snatch window.
 * @default "Steal gold from this target!"
 *
 * @param Success
 * @text Success Rate
 *
 * @param DisplaySuccess:eval
 * @text Display Success Rate
 * @parent Success
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display success rates in the Snatch window?
 * @default true
 *
 * @param AlreadyStolen:str
 * @text Already Stolen
 * @parent Success
 * @desc Text displayed when an item has already been stolen.
 * @default Stolen
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param Successful
 * 
 * @param SuccessGold
 * @text Gold Steal
 * @parent Successful
 *
 * @param gold_name:str
 * @text Filename
 * @parent SuccessGold
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Shop2
 *
 * @param gold_volume:num
 * @text Volume
 * @parent SuccessGold
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param gold_pitch:num
 * @text Pitch
 * @parent SuccessGold
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param gold_pan:num
 * @text Pan
 * @parent SuccessGold
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param SuccessItem
 * @text Item Steal
 * @parent Successful
 *
 * @param item_name:str
 * @text Filename
 * @parent SuccessItem
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Item1
 *
 * @param item_volume:num
 * @text Volume
 * @parent SuccessItem
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param item_pitch:num
 * @text Pitch
 * @parent SuccessItem
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param item_pan:num
 * @text Pan
 * @parent SuccessItem
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param SuccessWeapon
 * @text Weapon Steal
 * @parent Successful
 *
 * @param weapon_name:str
 * @text Filename
 * @parent SuccessWeapon
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Equip1
 *
 * @param weapon_volume:num
 * @text Volume
 * @parent SuccessWeapon
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param weapon_pitch:num
 * @text Pitch
 * @parent SuccessWeapon
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param weapon_pan:num
 * @text Pan
 * @parent SuccessWeapon
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param SuccessArmor
 * @text Armor Steal
 * @parent Successful
 *
 * @param armor_name:str
 * @text Filename
 * @parent SuccessArmor
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Equip2
 *
 * @param armor_volume:num
 * @text Volume
 * @parent SuccessArmor
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param armor_pitch:num
 * @text Pitch
 * @parent SuccessArmor
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param armor_pan:num
 * @text Pan
 * @parent SuccessArmor
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param Failure
 *
 * @param fail_name:str
 * @text Filename
 * @parent Failure
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Buzzer2
 *
 * @param fail_volume:num
 * @text Volume
 * @parent Failure
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param fail_pitch:num
 * @text Pitch
 * @parent Failure
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param fail_pan:num
 * @text Pan
 * @parent Failure
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param Empty
 *
 * @param empty_name:str
 * @text Filename
 * @parent Empty
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Evasion1
 *
 * @param empty_volume:num
 * @text Volume
 * @parent Empty
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param empty_pitch:num
 * @text Pitch
 * @parent Empty
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param empty_pan:num
 * @text Pan
 * @parent Empty
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
//=============================================================================

const _0x234a=['Game_Action_applyItemUserEffect','onStealSnatchOk','Game_Enemy_setupEnemyLevels','random','processStealItemsNothingLogWindow','JsBonusSteal','JsOnStealNothing','EmptyPopupText','Item-%1-%2','processStealItemsSuccessSFX','processStealItemsFailureSFX','createStealRateJS','snatchGoldIcon','ARRAYFUNC','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','EmptyTextColor','_weaponIDs','SuccessFlashColor','createOnStealJS','GoldHelp','JsOnStealSuccess','rate','drawItemName','StealableItemSingle','846399RugpEG','FailureTextColor','StealAction2','parse','ConvertParams','ParseStealObject','%1_name','_data','VisuMZ_4_ExtraEnemyDrops','setupIconTextPopup','EmptyFlashColor','max','refresh','active','isSnatchEffect','currencyUnit','_logWindow','playSe','AlreadyStolen','ARRAYNUM','isAnyInputWindowActive','exit','hide','startStealSnatchSelection','process_VisuMZ_StealItems_JS','deactivate','dropItems','processStealItemsFailure','Scene_Battle_isAnyInputWindowActive','fail','format','processStealItemsSuccessJS','RegExp','members','StealRate','ARMOR','JsStealRate','VisuMZ_0_CoreEngine','snatchGoldNameFmt','type','makeDropItems','StealData','1BZQQGU','weapon','name','_cache','FailureFlashColor','_stealableItems','ARRAYSTRUCT','setItem','drawTextEx','processStealItemsSuccessEquipDebuff','getWeaponIdWithName','types','_visualDrops','Scene_Battle_onEnemyOk','_itemIDs','\x5cI[%1]','Game_BattlerBase_refresh','stealResist','initialize','CoreEngine','ARRAYSTR','DetermineStealData','%1_volume','constructor','textSizeEx','475958TOtJmW','snatchAlreadyStolen','837717AeCXKI','Game_Enemy_gold','processStealItemsFailureJS','processStealItemsNothingPopup','plus','processStealItemsNothing','Sound','makeDeepCopy','StealItem','index','description','Scene_Boot_onDatabaseLoaded','split','cancel','FailureFlashDuration','armor','STRUCT','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','log','length','addParam','clamp','call','StealAction1','processStealItemsNothingSFX','createStealSnatchWindow','_scene','createStealRate','_enemyWindow','SuccessFlashDuration','snatchGoldHelpText','Snatch','version','toLowerCase','applyItemUserEffect','kind','subject','processStealItemsNothingJS','ARRAYEVAL','stealRate','trim','Enemy-%1-%2','STR','Popup','Armor-%1-%2','addStealText','ShowMessages','setHelpWindowItem','startStealItemsUserEffect','StealResist','546226TbCtQa','dropIndex','Skill-%1-%2','processStealItemsAttempt','2777453glQRsF','StealEmpty','_helpWindow','denominator','note','concat','_lines','GoldRemoval','item','%1_pan','show','StealableItems','Mechanics','textWidth','_snatchEnemyIndex','NUM','ARRAYJSON','setupEnemyLevels','JsOnStealFail','processStealItemsFailureLogWindow','includes','AutoItem','88.88%','create','_enemy','setupTextPopup','getSnatchTarget','setHandler','StealableItemBatch','Scene_Battle_hideSubInputWindows','Game_Enemy_makeDropItems','params','GoldNameFmt','Scene_Battle_createEnemyWindow','activate','GoldRate','GOLD','JsOnStealEmpty','getArmorIdWithName','_numberWidth','createStealPlus','drawItemNumber','empty','checkCacheKey','map','ShuffleArray','createStealResist','processStealItemsSuccessPopup','JsStealResist','prototype','createEnemyWindow','31471epdhIR','1dZrJxE','ITEM','JSON','push','drop','FailurePopupText','DisplaySuccess','BattleLog','gold','Settings','addWindow','isForOpponent','all','toUpperCase','EmptyFlashDuration','Parse_Notetags_JS','createKeyJS','VisuMZ_1_BattleCore','_snatchItemIndex','enemyIndex','enemy','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','autoSelect','Class-%1-%2','StealItems','hideSubInputWindows','makeItemList','Game_Enemy_setup','%1_pitch','indexOf','onDatabaseLoaded','onEnemyOk','stolen','_stealSnatchWindow','setDetails','onStealSnatchCancel','processStealItemsFailurePopup','setup','stealPlus','bind','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x20arguments[2];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Rate\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','match','ParseSkillNotetags','width','processStealItemsSuccess','11IqTtJS','ItemRemoval','EquipDebuff','EVAL','gainItem','GoldIcon','SuccessPopupText','857215XJilRD','processStealItemsSuccessLogWindow','setupStealableItems','getStealableItems','inputtingAction','FUNC','_armorIDs','WEAPON','filter','_action','ParseItemNotetags','Auto','none','iconIndex'];const _0x2b87=function(_0x225a6e,_0x7b6b83){_0x225a6e=_0x225a6e-0x68;let _0x234a32=_0x234a[_0x225a6e];return _0x234a32;};const _0x1ce5ac=_0x2b87;(function(_0x53f86e,_0xd80fe7){const _0x6e7130=_0x2b87;while(!![]){try{const _0x4a9b07=-parseInt(_0x6e7130(0x10f))*-parseInt(_0x6e7130(0xe1))+parseInt(_0x6e7130(0x76))+-parseInt(_0x6e7130(0x166))*parseInt(_0x6e7130(0xaa))+-parseInt(_0x6e7130(0x116))+-parseInt(_0x6e7130(0x78))+parseInt(_0x6e7130(0xe2))*-parseInt(_0x6e7130(0x13c))+parseInt(_0x6e7130(0xae));if(_0x4a9b07===_0xd80fe7)break;else _0x53f86e['push'](_0x53f86e['shift']());}catch(_0x1ddbf1){_0x53f86e['push'](_0x53f86e['shift']());}}}(_0x234a,0x7d023));var label=_0x1ce5ac(0xfa),tier=tier||0x0,dependencies=['VisuMZ_1_BattleCore'],pluginData=$plugins[_0x1ce5ac(0x11e)](function(_0x1c6eea){const _0x3fb4dc=_0x1ce5ac;return _0x1c6eea['status']&&_0x1c6eea[_0x3fb4dc(0x82)][_0x3fb4dc(0xc2)]('['+label+']');})[0x0];VisuMZ[label][_0x1ce5ac(0xeb)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x1ce5ac(0x140)]=function(_0x3e23f3,_0x42257b){const _0x1bf790=_0x1ce5ac;for(const _0xf5a413 in _0x42257b){if(_0xf5a413[_0x1bf790(0x10b)](/(.*):(.*)/i)){const _0x1d805a=String(RegExp['$1']),_0x4a0f03=String(RegExp['$2'])[_0x1bf790(0xef)]()[_0x1bf790(0xa0)]();let _0x13c2b6,_0x39b9be,_0x2d1d75;switch(_0x4a0f03){case _0x1bf790(0xbd):_0x13c2b6=_0x42257b[_0xf5a413]!==''?Number(_0x42257b[_0xf5a413]):0x0;break;case _0x1bf790(0x14f):_0x39b9be=_0x42257b[_0xf5a413]!==''?JSON['parse'](_0x42257b[_0xf5a413]):[],_0x13c2b6=_0x39b9be[_0x1bf790(0xda)](_0x250810=>Number(_0x250810));break;case _0x1bf790(0x112):_0x13c2b6=_0x42257b[_0xf5a413]!==''?eval(_0x42257b[_0xf5a413]):null;break;case _0x1bf790(0x9e):_0x39b9be=_0x42257b[_0xf5a413]!==''?JSON[_0x1bf790(0x13f)](_0x42257b[_0xf5a413]):[],_0x13c2b6=_0x39b9be[_0x1bf790(0xda)](_0x5c7fd4=>eval(_0x5c7fd4));break;case _0x1bf790(0xe4):_0x13c2b6=_0x42257b[_0xf5a413]!==''?JSON[_0x1bf790(0x13f)](_0x42257b[_0xf5a413]):'';break;case _0x1bf790(0xbe):_0x39b9be=_0x42257b[_0xf5a413]!==''?JSON['parse'](_0x42257b[_0xf5a413]):[],_0x13c2b6=_0x39b9be[_0x1bf790(0xda)](_0x41dffe=>JSON[_0x1bf790(0x13f)](_0x41dffe));break;case _0x1bf790(0x11b):_0x13c2b6=_0x42257b[_0xf5a413]!==''?new Function(JSON[_0x1bf790(0x13f)](_0x42257b[_0xf5a413])):new Function('return\x200');break;case _0x1bf790(0x131):_0x39b9be=_0x42257b[_0xf5a413]!==''?JSON['parse'](_0x42257b[_0xf5a413]):[],_0x13c2b6=_0x39b9be[_0x1bf790(0xda)](_0x2136fa=>new Function(JSON['parse'](_0x2136fa)));break;case _0x1bf790(0xa2):_0x13c2b6=_0x42257b[_0xf5a413]!==''?String(_0x42257b[_0xf5a413]):'';break;case _0x1bf790(0x71):_0x39b9be=_0x42257b[_0xf5a413]!==''?JSON[_0x1bf790(0x13f)](_0x42257b[_0xf5a413]):[],_0x13c2b6=_0x39b9be[_0x1bf790(0xda)](_0x4b9907=>String(_0x4b9907));break;case _0x1bf790(0x88):_0x2d1d75=_0x42257b[_0xf5a413]!==''?JSON[_0x1bf790(0x13f)](_0x42257b[_0xf5a413]):{},_0x13c2b6=VisuMZ[_0x1bf790(0x140)]({},_0x2d1d75);break;case _0x1bf790(0x16c):_0x39b9be=_0x42257b[_0xf5a413]!==''?JSON[_0x1bf790(0x13f)](_0x42257b[_0xf5a413]):[],_0x13c2b6=_0x39b9be['map'](_0x12a938=>VisuMZ[_0x1bf790(0x140)]({},JSON[_0x1bf790(0x13f)](_0x12a938)));break;default:continue;}_0x3e23f3[_0x1d805a]=_0x13c2b6;}}return _0x3e23f3;},(_0x69261b=>{const _0x452082=_0x1ce5ac,_0x6c1a2a=_0x69261b['name'];for(const _0x4609c1 of dependencies){if(!Imported[_0x4609c1]){alert(_0x452082(0xf7)['format'](_0x6c1a2a,_0x4609c1)),SceneManager[_0x452082(0x151)]();break;}}const _0x332212=_0x69261b[_0x452082(0x82)];if(_0x332212[_0x452082(0x10b)](/\[Version[ ](.*?)\]/i)){const _0x17b9f4=Number(RegExp['$1']);_0x17b9f4!==VisuMZ[label][_0x452082(0x98)]&&(alert(_0x452082(0x89)[_0x452082(0x15a)](_0x6c1a2a,_0x17b9f4)),SceneManager[_0x452082(0x151)]());}if(_0x332212[_0x452082(0x10b)](/\[Tier[ ](\d+)\]/i)){const _0x326d4b=Number(RegExp['$1']);_0x326d4b<tier?(alert(_0x452082(0x132)[_0x452082(0x15a)](_0x6c1a2a,_0x326d4b,tier)),SceneManager['exit']()):tier=Math[_0x452082(0x147)](_0x326d4b,tier);}VisuMZ[_0x452082(0x140)](VisuMZ[label][_0x452082(0xeb)],_0x69261b['parameters']);})(pluginData),VisuMZ['StealItems'][_0x1ce5ac(0x83)]=Scene_Boot[_0x1ce5ac(0xdf)][_0x1ce5ac(0x100)],Scene_Boot[_0x1ce5ac(0xdf)][_0x1ce5ac(0x100)]=function(){const _0x364d76=_0x1ce5ac;VisuMZ[_0x364d76(0xfa)]['Scene_Boot_onDatabaseLoaded'][_0x364d76(0x8e)](this),this['process_VisuMZ_StealItems']();},Scene_Boot['prototype']['process_VisuMZ_StealItems']=function(){const _0x128aec=_0x1ce5ac;if(VisuMZ['ParseAllNotetags'])return;this[_0x128aec(0x154)]();},VisuMZ['StealItems']['RegExp']={'StealAction1':/<STEAL>/i,'StealAction2':/<STEAL[ ](.*)>/gi,'Snatch':/<(?:SNATCH|TARGETING STEAL)>/i,'JsStealRate':/<JS STEAL RATE>\s*([\s\S]*)\s*<\/JS STEAL RATE>/i,'JsOnStealSuccess':/<JS ON STEAL SUCCESS>\s*([\s\S]*)\s*<\/JS ON STEAL SUCCESS>/i,'JsOnStealFail':/<JS ON STEAL FAILURE>\s*([\s\S]*)\s*<\/JS ON STEAL FAILURE>/i,'JsOnStealNothing':/<JS ON STEAL EMPTY>\s*([\s\S]*)\s*<\/JS ON STEAL EMPTY>/i,'StealableItemSingle':/<STEAL[ ](.*):[ ](.*)([%％])>/gi,'StealableItemBatch':/<STEAL>\s*([\s\S]*)\s*<\/STEAL>/i,'StealRate':/<STEAL RATE:[ ](\d+)([%％])>/i,'StealPlus':/<STEAL RATE:[ ]([\+\-]\d+)([%％])>/i,'StealResist':/<STEAL RESIST:[ ]([\+\-]\d+)([%％])>/i},Scene_Boot[_0x1ce5ac(0xdf)]['process_VisuMZ_StealItems_JS']=function(){const _0x1558c9=_0x1ce5ac,_0x4800e4=$dataSkills[_0x1558c9(0xb3)]($dataItems);for(const _0x3608ad of _0x4800e4){if(!_0x3608ad)continue;VisuMZ[_0x1558c9(0xfa)][_0x1558c9(0xf1)](_0x3608ad);}},VisuMZ[_0x1ce5ac(0xfa)][_0x1ce5ac(0x10c)]=VisuMZ[_0x1ce5ac(0x10c)],VisuMZ[_0x1ce5ac(0x10c)]=function(_0x4dc1eb){const _0x257e22=_0x1ce5ac;VisuMZ['StealItems'][_0x257e22(0x10c)]['call'](this,_0x4dc1eb),VisuMZ['StealItems'][_0x257e22(0xf1)](_0x4dc1eb);},VisuMZ[_0x1ce5ac(0xfa)][_0x1ce5ac(0x120)]=VisuMZ['ParseItemNotetags'],VisuMZ['ParseItemNotetags']=function(_0x1db003){const _0x16f249=_0x1ce5ac;VisuMZ[_0x16f249(0xfa)][_0x16f249(0x120)][_0x16f249(0x8e)](this,_0x1db003),VisuMZ['StealItems']['Parse_Notetags_JS'](_0x1db003);},VisuMZ['StealItems']['Parse_Notetags_JS']=function(_0x12f450){const _0x3e4910=_0x1ce5ac,_0x4bffa6=VisuMZ[_0x3e4910(0xfa)][_0x3e4910(0x15c)];let _0x222c51=_0x3e4910(0x160),_0x4c5e6e=_0x4bffa6[_0x3e4910(0x160)];VisuMZ[_0x3e4910(0xfa)][_0x3e4910(0x12f)](_0x12f450,_0x222c51,_0x4c5e6e),_0x222c51=_0x3e4910(0x138),_0x4c5e6e=_0x4bffa6[_0x3e4910(0x138)],VisuMZ[_0x3e4910(0xfa)][_0x3e4910(0x136)](_0x12f450,_0x222c51,_0x4c5e6e),_0x222c51=_0x3e4910(0xc0),_0x4c5e6e=_0x4bffa6[_0x3e4910(0xc0)],VisuMZ['StealItems'][_0x3e4910(0x136)](_0x12f450,_0x222c51,_0x4c5e6e),_0x222c51=_0x3e4910(0x12a),_0x4c5e6e=_0x4bffa6['JsOnStealNothing'],VisuMZ[_0x3e4910(0xfa)][_0x3e4910(0x136)](_0x12f450,_0x222c51,_0x4c5e6e);},VisuMZ[_0x1ce5ac(0xfa)]['JS']={},VisuMZ[_0x1ce5ac(0xfa)]['createStealRateJS']=function(_0x2def5e,_0x5aea0c,_0x1fbd8f){const _0x3889ef=_0x1ce5ac,_0x4b0c38=_0x2def5e[_0x3889ef(0xb2)];if(_0x4b0c38['match'](_0x1fbd8f)){const _0x2b17f8=String(RegExp['$1']),_0xd9f0fb=_0x3889ef(0x10a)['format'](_0x2b17f8),_0x102683=VisuMZ['StealItems'][_0x3889ef(0xf2)](_0x2def5e,_0x5aea0c);console[_0x3889ef(0x8a)](_0x102683),VisuMZ[_0x3889ef(0xfa)]['JS'][_0x102683]=new Function(_0xd9f0fb);}},VisuMZ['StealItems'][_0x1ce5ac(0x136)]=function(_0x4fc5f7,_0x2baa73,_0x5b54ea){const _0xe521a2=_0x1ce5ac,_0x7e4331=_0x4fc5f7['note'];if(_0x7e4331[_0xe521a2(0x10b)](_0x5b54ea)){const _0x173dee=String(RegExp['$1']),_0x5ca93a='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20arguments[2];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20gold\x20=\x20arguments[3];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0xe521a2(0x15a)](_0x173dee),_0x468dcc=VisuMZ[_0xe521a2(0xfa)][_0xe521a2(0xf2)](_0x4fc5f7,_0x2baa73);VisuMZ[_0xe521a2(0xfa)]['JS'][_0x468dcc]=new Function(_0x5ca93a);}},VisuMZ['StealItems'][_0x1ce5ac(0xf2)]=function(_0xf72b7e,_0x5c6105){const _0x2787ed=_0x1ce5ac;let _0x229a8e='';if($dataActors['includes'](_0xf72b7e))_0x229a8e='Actor-%1-%2'[_0x2787ed(0x15a)](_0xf72b7e['id'],_0x5c6105);if($dataClasses['includes'](_0xf72b7e))_0x229a8e=_0x2787ed(0xf9)['format'](_0xf72b7e['id'],_0x5c6105);if($dataSkills['includes'](_0xf72b7e))_0x229a8e=_0x2787ed(0xac)[_0x2787ed(0x15a)](_0xf72b7e['id'],_0x5c6105);if($dataItems[_0x2787ed(0xc2)](_0xf72b7e))_0x229a8e=_0x2787ed(0x12c)[_0x2787ed(0x15a)](_0xf72b7e['id'],_0x5c6105);if($dataWeapons[_0x2787ed(0xc2)](_0xf72b7e))_0x229a8e='Weapon-%1-%2'[_0x2787ed(0x15a)](_0xf72b7e['id'],_0x5c6105);if($dataArmors[_0x2787ed(0xc2)](_0xf72b7e))_0x229a8e=_0x2787ed(0xa4)[_0x2787ed(0x15a)](_0xf72b7e['id'],_0x5c6105);if($dataEnemies[_0x2787ed(0xc2)](_0xf72b7e))_0x229a8e=_0x2787ed(0xa1)[_0x2787ed(0x15a)](_0xf72b7e['id'],_0x5c6105);if($dataStates[_0x2787ed(0xc2)](_0xf72b7e))_0x229a8e='State-%1-%2'[_0x2787ed(0x15a)](_0xf72b7e['id'],_0x5c6105);return _0x229a8e;},DataManager['getItemIdWithName']=function(_0x1ff9e1){const _0x1591cb=_0x1ce5ac;_0x1ff9e1=_0x1ff9e1[_0x1591cb(0xef)]()[_0x1591cb(0xa0)](),this[_0x1591cb(0x6b)]=this['_itemIDs']||{};if(this[_0x1591cb(0x6b)][_0x1ff9e1])return this[_0x1591cb(0x6b)][_0x1ff9e1];for(const _0x2029c0 of $dataItems){if(!_0x2029c0)continue;this[_0x1591cb(0x6b)][_0x2029c0[_0x1591cb(0x168)][_0x1591cb(0xef)]()[_0x1591cb(0xa0)]()]=_0x2029c0['id'];}return this[_0x1591cb(0x6b)][_0x1ff9e1]||0x0;},DataManager[_0x1ce5ac(0x170)]=function(_0xda8382){const _0xf67647=_0x1ce5ac;_0xda8382=_0xda8382[_0xf67647(0xef)]()[_0xf67647(0xa0)](),this[_0xf67647(0x134)]=this[_0xf67647(0x134)]||{};if(this['_weaponIDs'][_0xda8382])return this['_weaponIDs'][_0xda8382];for(const _0x393754 of $dataWeapons){if(!_0x393754)continue;this[_0xf67647(0x134)][_0x393754[_0xf67647(0x168)][_0xf67647(0xef)]()['trim']()]=_0x393754['id'];}return this['_weaponIDs'][_0xda8382]||0x0;},DataManager['getArmorIdWithName']=function(_0x19dc82){const _0x30990a=_0x1ce5ac;_0x19dc82=_0x19dc82[_0x30990a(0xef)]()['trim'](),this['_armorIDs']=this['_armorIDs']||{};if(this[_0x30990a(0x11c)][_0x19dc82])return this[_0x30990a(0x11c)][_0x19dc82];for(const _0x471a11 of $dataArmors){if(!_0x471a11)continue;this[_0x30990a(0x11c)][_0x471a11['name'][_0x30990a(0xef)]()[_0x30990a(0xa0)]()]=_0x471a11['id'];}return this[_0x30990a(0x11c)][_0x19dc82]||0x0;},ImageManager[_0x1ce5ac(0x130)]=Imported[_0x1ce5ac(0x161)]?VisuMZ[_0x1ce5ac(0x70)]['Settings']['Gold'][_0x1ce5ac(0x114)]:VisuMZ['StealItems']['Settings']['Snatch'][_0x1ce5ac(0x114)],TextManager[_0x1ce5ac(0x162)]=VisuMZ[_0x1ce5ac(0xfa)][_0x1ce5ac(0xeb)][_0x1ce5ac(0x97)][_0x1ce5ac(0xce)],TextManager[_0x1ce5ac(0x96)]=VisuMZ[_0x1ce5ac(0xfa)]['Settings'][_0x1ce5ac(0x97)][_0x1ce5ac(0x137)],TextManager['snatchAlreadyStolen']=VisuMZ[_0x1ce5ac(0xfa)][_0x1ce5ac(0xeb)][_0x1ce5ac(0x97)][_0x1ce5ac(0x14e)],VisuMZ[_0x1ce5ac(0xfa)][_0x1ce5ac(0x124)]=Game_Action['prototype']['applyItemUserEffect'],Game_Action[_0x1ce5ac(0xdf)][_0x1ce5ac(0x9a)]=function(_0x1c69bd){const _0x16d3ef=_0x1ce5ac;VisuMZ[_0x16d3ef(0xfa)]['Game_Action_applyItemUserEffect']['call'](this,_0x1c69bd),this['startStealItemsUserEffect'](_0x1c69bd);},Game_Action[_0x1ce5ac(0xdf)][_0x1ce5ac(0xa8)]=function(_0x31c2f7){const _0x5a3045=_0x1ce5ac;if(!this[_0x5a3045(0xb6)]())return;if(!_0x31c2f7['isEnemy']())return;if(this[_0x5a3045(0x9c)]()['isEnemy']())return;const _0x43c3e0=VisuMZ[_0x5a3045(0xfa)][_0x5a3045(0x72)](this,_0x31c2f7);if(_0x43c3e0[_0x5a3045(0x68)]['length']<=0x0)return;const _0x53876e=_0x31c2f7[_0x5a3045(0x119)]();if(_0x53876e[_0x5a3045(0x8b)]<=0x0)return;let _0x52b33a=[];this['isSnatchEffect']()?_0x52b33a=this[_0x5a3045(0xc8)](_0x31c2f7):_0x52b33a=_0x53876e[_0x5a3045(0x11e)](_0x113200=>{const _0x2165cb=_0x5a3045;return _0x43c3e0['types'][_0x2165cb(0xc2)](_0x113200[_0x2165cb(0x163)]);});_0x52b33a=_0x52b33a[_0x5a3045(0x11e)](_0x14ce4d=>{const _0x1e873c=_0x5a3045;return!_0x14ce4d[_0x1e873c(0x102)];});if(_0x52b33a['length']<=0x0)return this[_0x5a3045(0x7d)](_0x31c2f7);this[_0x5a3045(0xad)](_0x31c2f7,_0x43c3e0,_0x52b33a);},VisuMZ[_0x1ce5ac(0xfa)]['DetermineStealData']=function(_0x40f735,_0x15f94c){const _0x50ffe2=_0x1ce5ac,_0x366946=VisuMZ[_0x50ffe2(0xfa)][_0x50ffe2(0x15c)],_0x38732f=_0x40f735['item']()[_0x50ffe2(0xb2)];let _0x787747=[],_0x427593={'all':_0x40f735[_0x50ffe2(0x9c)]()[_0x50ffe2(0x9f)](),'gold':0x1,'item':0x1,'weapon':0x1,'armor':0x1},_0x498035={'all':_0x40f735[_0x50ffe2(0x9c)]()[_0x50ffe2(0x108)]()-_0x15f94c[_0x50ffe2(0x6e)](),'gold':0x0,'item':0x0,'weapon':0x0,'armor':0x0};_0x38732f[_0x50ffe2(0x10b)](_0x366946[_0x50ffe2(0x8f)])&&(_0x787747=[_0x50ffe2(0xd2),_0x50ffe2(0xe3),'WEAPON','ARMOR']);const _0x264b4e=_0x38732f[_0x50ffe2(0x10b)](_0x366946[_0x50ffe2(0x13e)]);if(_0x264b4e)for(const _0x41ca67 of _0x264b4e){if(!_0x41ca67)continue;if(_0x41ca67[_0x50ffe2(0x10b)](/ALL/i)){_0x787747=[_0x50ffe2(0xd2),_0x50ffe2(0xe3),'WEAPON',_0x50ffe2(0x15f)];if(_0x41ca67[_0x50ffe2(0x10b)](/([\+\-]\d+)([%％])/i))_0x498035[_0x50ffe2(0xee)]+=Number(RegExp['$1'])*0.01;else _0x41ca67[_0x50ffe2(0x10b)](/(\d+)([%％])/i)&&(_0x427593[_0x50ffe2(0xee)]*=Number(RegExp['$1'])*0.01);}if(_0x41ca67[_0x50ffe2(0x10b)](/GOLD/i)){_0x787747[_0x50ffe2(0xe5)](_0x50ffe2(0xd2));if(_0x41ca67['match'](/([\+\-]\d+)([%％])/i))_0x498035[_0x50ffe2(0xea)]+=Number(RegExp['$1'])*0.01;else _0x41ca67[_0x50ffe2(0x10b)](/(\d+)([%％])/i)&&(_0x427593['gold']*=Number(RegExp['$1'])*0.01);}if(_0x41ca67[_0x50ffe2(0x10b)](/ITEM/i)){_0x787747[_0x50ffe2(0xe5)]('ITEM');if(_0x41ca67['match'](/([\+\-]\d+)([%％])/i))_0x498035[_0x50ffe2(0xb6)]+=Number(RegExp['$1'])*0.01;else _0x41ca67[_0x50ffe2(0x10b)](/(\d+)([%％])/i)&&(_0x427593[_0x50ffe2(0xb6)]*=Number(RegExp['$1'])*0.01);}if(_0x41ca67[_0x50ffe2(0x10b)](/WEAPON/i)){_0x787747[_0x50ffe2(0xe5)](_0x50ffe2(0x11d));if(_0x41ca67['match'](/([\+\-]\d+)([%％])/i))_0x498035[_0x50ffe2(0x167)]+=Number(RegExp['$1'])*0.01;else _0x41ca67[_0x50ffe2(0x10b)](/(\d+)([%％])/i)&&(_0x427593[_0x50ffe2(0x167)]*=Number(RegExp['$1'])*0.01);}if(_0x41ca67['match'](/ARMOR/i)){_0x787747[_0x50ffe2(0xe5)](_0x50ffe2(0x15f));if(_0x41ca67['match'](/([\+\-]\d+)([%％])/i))_0x498035[_0x50ffe2(0x87)]+=Number(RegExp['$1'])*0.01;else _0x41ca67[_0x50ffe2(0x10b)](/(\d+)([%％])/i)&&(_0x427593[_0x50ffe2(0x87)]*=Number(RegExp['$1'])*0.01);}}return{'types':_0x787747,'rate':_0x427593,'plus':_0x498035};},VisuMZ['StealItems'][_0x1ce5ac(0xdb)]=function(_0x24edcf){const _0x34472b=_0x1ce5ac;var _0x28f303,_0x215436,_0x318a8a;for(_0x318a8a=_0x24edcf[_0x34472b(0x8b)]-0x1;_0x318a8a>0x0;_0x318a8a--){_0x28f303=Math['floor'](Math['random']()*(_0x318a8a+0x1)),_0x215436=_0x24edcf[_0x318a8a],_0x24edcf[_0x318a8a]=_0x24edcf[_0x28f303],_0x24edcf[_0x28f303]=_0x215436;}return _0x24edcf;},Game_Action[_0x1ce5ac(0xdf)]['processStealItemsAttempt']=function(_0x54dda8,_0x5a16aa,_0xb0252){const _0x2196df=_0x1ce5ac;VisuMZ['StealItems'][_0x2196df(0xdb)](_0xb0252),this['makeSuccess'](_0x54dda8);for(const _0x2c8dca of _0xb0252){if(!_0x2c8dca)continue;let _0xe93344=_0x5a16aa[_0x2196df(0x139)][_0x2196df(0xee)]*_0x2c8dca[_0x2196df(0x139)],_0x297b38=_0x5a16aa[_0x2196df(0x7c)]['all'];_0xe93344*=_0x5a16aa[_0x2196df(0x139)][_0x2c8dca[_0x2196df(0x163)][_0x2196df(0x99)]()],_0x297b38+=_0x5a16aa[_0x2196df(0x7c)][_0x2c8dca['type'][_0x2196df(0x99)]()];const _0x525391=_0xe93344+_0x297b38;if(Math[_0x2196df(0x127)]()<_0x525391)return this['processStealItemsSuccess'](_0x54dda8,_0x2c8dca);}this[_0x2196df(0x157)](_0x54dda8);},Game_Action[_0x1ce5ac(0xdf)][_0x1ce5ac(0x14a)]=function(){const _0x33e6a1=_0x1ce5ac;if(!this['isForOne']())return![];if(!this[_0x33e6a1(0xed)]())return![];if(!this['needsSelection']())return![];const _0x1fd7b9=VisuMZ[_0x33e6a1(0xfa)][_0x33e6a1(0x15c)],_0x46bd3f=this[_0x33e6a1(0xb6)]()[_0x33e6a1(0xb2)];return _0x46bd3f['match'](_0x1fd7b9[_0x33e6a1(0x97)])&&(_0x46bd3f[_0x33e6a1(0x10b)](_0x1fd7b9[_0x33e6a1(0x8f)])||_0x46bd3f['match'](_0x1fd7b9['StealAction2']));},Game_Action['prototype']['registerSnatchTarget']=function(_0x54a48c,_0x354185){const _0x10b4b4=_0x1ce5ac;this[_0x10b4b4(0xbc)]=_0x54a48c[_0x10b4b4(0x81)]();const _0x3ff6e3=_0x54a48c['getStealableItems']();this[_0x10b4b4(0xf4)]=_0x3ff6e3[_0x10b4b4(0xff)](_0x354185);},Game_Action[_0x1ce5ac(0xdf)]['getSnatchTarget']=function(_0x4884bd){const _0x3a5d18=_0x1ce5ac;if(_0x4884bd[_0x3a5d18(0x81)]()!==this['_snatchEnemyIndex'])return[];this[_0x3a5d18(0xf4)]=this[_0x3a5d18(0xf4)]||0x0;const _0x2598ee=_0x4884bd[_0x3a5d18(0x119)]();return[_0x2598ee[this[_0x3a5d18(0xf4)]]];},Game_Action[_0x1ce5ac(0xdf)][_0x1ce5ac(0x10e)]=function(_0x29c051,_0x5f4c26){const _0x240e50=_0x1ce5ac;_0x5f4c26[_0x240e50(0x102)]=!![],this[_0x240e50(0x117)](_0x29c051,_0x5f4c26),this[_0x240e50(0x12d)](_0x5f4c26),this[_0x240e50(0xdd)](_0x29c051,_0x5f4c26),this['processStealItemsSuccessEquipDebuff'](_0x29c051,_0x5f4c26),this[_0x240e50(0x15b)](_0x29c051,_0x5f4c26);},Game_Action[_0x1ce5ac(0xdf)]['processStealItemsSuccessLogWindow']=function(_0x2944cb,_0x492c5e){const _0xc0f0a1=_0x1ce5ac,_0x269343=VisuMZ['StealItems'][_0xc0f0a1(0xeb)][_0xc0f0a1(0xe9)];let _0x4e04f7=_0x269343[_0xc0f0a1(0x80)],_0x31006d='';if(_0x492c5e[_0xc0f0a1(0x163)]===_0xc0f0a1(0xd2))$gameParty['gainGold'](_0x492c5e['id']),_0x4e04f7=_0x269343['StealGold'],_0x31006d=_0x4e04f7['format'](TextManager[_0xc0f0a1(0x14b)],_0x492c5e['id']),Imported[_0xc0f0a1(0x144)]&&(_0x2944cb[_0xc0f0a1(0x69)]=_0x2944cb[_0xc0f0a1(0x69)]||{},_0x2944cb[_0xc0f0a1(0x69)][_0xc0f0a1(0xea)]=0x0);else{if(_0x492c5e[_0xc0f0a1(0x163)]==='ITEM'){const _0x179c12=$dataItems[_0x492c5e['id']];if(!_0x179c12)return;$gameParty[_0xc0f0a1(0x113)](_0x179c12,0x1);const _0x415bce='\x5cI[%1]'[_0xc0f0a1(0x15a)](_0x179c12[_0xc0f0a1(0x123)]);_0x31006d=_0x4e04f7[_0xc0f0a1(0x15a)](_0x179c12[_0xc0f0a1(0x168)],_0x415bce);}else{if(_0x492c5e['type']===_0xc0f0a1(0x11d)){const _0x48ea50=$dataWeapons[_0x492c5e['id']];if(!_0x48ea50)return;$gameParty[_0xc0f0a1(0x113)](_0x48ea50,0x1);const _0x37f720=_0xc0f0a1(0x6c)[_0xc0f0a1(0x15a)](_0x48ea50[_0xc0f0a1(0x123)]);_0x31006d=_0x4e04f7[_0xc0f0a1(0x15a)](_0x48ea50[_0xc0f0a1(0x168)],_0x37f720);}else{if(_0x492c5e['type']===_0xc0f0a1(0x15f)){const _0x21652d=$dataArmors[_0x492c5e['id']];if(!_0x21652d)return;$gameParty[_0xc0f0a1(0x113)](_0x21652d,0x1);const _0x498b29=_0xc0f0a1(0x6c)['format'](_0x21652d[_0xc0f0a1(0x123)]);_0x31006d=_0x4e04f7[_0xc0f0a1(0x15a)](_0x21652d['name'],_0x498b29);}}}}if(_0x269343['ShowMessages']){const _0x320817=SceneManager['_scene']['_logWindow'];if(_0x320817&&_0x31006d!=='')_0x320817[_0xc0f0a1(0xa5)](_0x31006d);}},Game_Action['prototype']['processStealItemsSuccessSFX']=function(_0x9cafe1){const _0x160fc1=_0x1ce5ac,_0x5b937b=VisuMZ['StealItems'][_0x160fc1(0xeb)][_0x160fc1(0x7e)];if(!_0x5b937b)return;const _0x5870c7=_0x9cafe1['type']['toLowerCase']()['trim'](),_0x598c8e={'name':_0x5b937b[_0x160fc1(0x142)['format'](_0x5870c7)]||'','volume':_0x5b937b[_0x160fc1(0x73)[_0x160fc1(0x15a)](_0x5870c7)]||0x0,'pitch':_0x5b937b[_0x160fc1(0xfe)['format'](_0x5870c7)]||0x0,'pan':_0x5b937b['%1_pan'['format'](_0x5870c7)]||0x0};if(_0x598c8e[_0x160fc1(0x168)]!=='')AudioManager[_0x160fc1(0x14d)](_0x598c8e);},Game_Action['prototype'][_0x1ce5ac(0xdd)]=function(_0x442d8c,_0x2f6e0a){const _0x489c76=_0x1ce5ac;if(!_0x2f6e0a)return;if(!_0x442d8c)return;const _0x595be8=VisuMZ[_0x489c76(0xfa)][_0x489c76(0xeb)][_0x489c76(0xa3)];if(!_0x595be8)return;if(_0x595be8[_0x489c76(0x115)]==='')return;const _0x4e5101=_0x595be8[_0x489c76(0x115)],_0x2336e8={'textColor':_0x595be8['SuccessTextColor']||0x0,'flashColor':_0x595be8[_0x489c76(0x135)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x595be8[_0x489c76(0x95)]||0x3c};_0x442d8c[_0x489c76(0xc7)](_0x4e5101,_0x2336e8);if(_0x595be8['SuccessItemName']&&_0x2f6e0a['type']!=='GOLD'){let _0x4f88c7=null;if(_0x2f6e0a['type']===_0x489c76(0xe3))_0x4f88c7=$dataItems[_0x2f6e0a['id']];else{if(_0x2f6e0a[_0x489c76(0x163)]==='WEAPON')_0x4f88c7=$dataWeapons[_0x2f6e0a['id']];else _0x2f6e0a[_0x489c76(0x163)]===_0x489c76(0x15f)&&(_0x4f88c7=$dataArmors[_0x2f6e0a['id']]);}_0x4f88c7&&_0x442d8c[_0x489c76(0x145)](_0x4f88c7[_0x489c76(0x123)],_0x4f88c7['name'],_0x2336e8);}},Game_Action[_0x1ce5ac(0xdf)][_0x1ce5ac(0x16f)]=function(_0x209b9f,_0x5af11f){const _0x536703=_0x1ce5ac;if(!_0x209b9f)return;const _0x190dac=VisuMZ[_0x536703(0xfa)][_0x536703(0xeb)]['Mechanics'];if(!_0x190dac)return;if(!_0x190dac[_0x536703(0x111)])return;if(![_0x536703(0x11d),'ARMOR'][_0x536703(0xc2)](_0x5af11f[_0x536703(0x163)]))return;let _0x210a91=null;if(_0x5af11f[_0x536703(0x163)]==='WEAPON')_0x210a91=$dataWeapons[_0x5af11f['id']];else _0x5af11f[_0x536703(0x163)]===_0x536703(0x15f)&&(_0x210a91=$dataArmors[_0x5af11f['id']]);if(!_0x210a91)return;for(let _0x2e2152=0x0;_0x2e2152<0x8;_0x2e2152++){const _0x14dcad=_0x210a91[_0x536703(0xcd)][_0x2e2152];_0x209b9f[_0x536703(0x8c)](_0x2e2152,-_0x14dcad);}},Game_Action[_0x1ce5ac(0xdf)][_0x1ce5ac(0x15b)]=function(_0x3f26f2,_0x49c970){const _0x2a09dc=_0x1ce5ac;if(!_0x3f26f2)return;let _0x1dc7b1=null,_0x2c098d=0x0;if(_0x49c970['type']===_0x2a09dc(0xd2))_0x2c098d=_0x49c970['id'];else{if(_0x49c970[_0x2a09dc(0x163)]==='ITEM')_0x1dc7b1=$dataItems[_0x49c970['id']];else{if(_0x49c970['type']==='WEAPON')_0x1dc7b1=$dataWeapons[_0x49c970['id']];else _0x49c970[_0x2a09dc(0x163)]===_0x2a09dc(0x15f)&&(_0x1dc7b1=$dataArmors[_0x49c970['id']]);}}const _0x2460dc=VisuMZ[_0x2a09dc(0xfa)][_0x2a09dc(0xeb)][_0x2a09dc(0xba)];_0x2460dc&&_0x2460dc[_0x2a09dc(0x138)]&&_0x2460dc[_0x2a09dc(0x138)][_0x2a09dc(0x8e)](this,this[_0x2a09dc(0x9c)](),_0x3f26f2,_0x1dc7b1,_0x2c098d);const _0x13f8dc=VisuMZ[_0x2a09dc(0xfa)][_0x2a09dc(0xf2)](this[_0x2a09dc(0xb6)](),_0x2a09dc(0x138));VisuMZ[_0x2a09dc(0xfa)]['JS'][_0x13f8dc]&&VisuMZ[_0x2a09dc(0xfa)]['JS'][_0x13f8dc][_0x2a09dc(0x8e)](this,this['subject'](),_0x3f26f2,_0x1dc7b1,_0x2c098d);},Game_Action['prototype'][_0x1ce5ac(0x157)]=function(_0x100297){const _0x5cd3b7=_0x1ce5ac;this['processStealItemsFailureLogWindow'](_0x100297),this[_0x5cd3b7(0x12e)](),this['processStealItemsFailurePopup'](_0x100297),this[_0x5cd3b7(0x7a)](_0x100297);},Game_Action['prototype'][_0x1ce5ac(0xc1)]=function(_0x27a55c){const _0x1dd90f=_0x1ce5ac,_0x39e195=VisuMZ[_0x1dd90f(0xfa)][_0x1dd90f(0xeb)][_0x1dd90f(0xe9)];if(_0x39e195[_0x1dd90f(0xa6)]){const _0x2d9fa4=_0x39e195['StealFail'],_0xf255aa=SceneManager[_0x1dd90f(0x92)][_0x1dd90f(0x14c)];if(_0xf255aa&&_0x2d9fa4!=='')_0xf255aa['addStealText'](_0x2d9fa4);}},Game_Action[_0x1ce5ac(0xdf)][_0x1ce5ac(0x12e)]=function(){const _0x4f72da=_0x1ce5ac,_0x36083c=VisuMZ[_0x4f72da(0xfa)][_0x4f72da(0xeb)][_0x4f72da(0x7e)];if(!_0x36083c)return;const _0x4b20e3=_0x4f72da(0x159),_0x3a605d={'name':_0x36083c[_0x4f72da(0x142)[_0x4f72da(0x15a)](_0x4b20e3)]||'','volume':_0x36083c[_0x4f72da(0x73)[_0x4f72da(0x15a)](_0x4b20e3)]||0x0,'pitch':_0x36083c[_0x4f72da(0xfe)[_0x4f72da(0x15a)](_0x4b20e3)]||0x0,'pan':_0x36083c['%1_pan'['format'](_0x4b20e3)]||0x0};if(_0x3a605d[_0x4f72da(0x168)]!=='')AudioManager[_0x4f72da(0x14d)](_0x3a605d);},Game_Action[_0x1ce5ac(0xdf)][_0x1ce5ac(0x106)]=function(_0x4ce24f){const _0x43a8c5=_0x1ce5ac;if(!_0x4ce24f)return;const _0x2789df=VisuMZ[_0x43a8c5(0xfa)][_0x43a8c5(0xeb)][_0x43a8c5(0xa3)];if(!_0x2789df)return;if(_0x2789df['FailurePopupText']==='')return;const _0x2f828e=_0x2789df[_0x43a8c5(0xe7)],_0x5cfe11={'textColor':_0x2789df[_0x43a8c5(0x13d)]||0x0,'flashColor':_0x2789df[_0x43a8c5(0x16a)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x2789df[_0x43a8c5(0x86)]||0x3c};_0x4ce24f[_0x43a8c5(0xc7)](_0x2f828e,_0x5cfe11);},Game_Action[_0x1ce5ac(0xdf)][_0x1ce5ac(0x7a)]=function(_0x316325){const _0x55cdfa=_0x1ce5ac;if(!_0x316325)return;const _0x334e90=VisuMZ[_0x55cdfa(0xfa)][_0x55cdfa(0xeb)][_0x55cdfa(0xba)];_0x334e90&&_0x334e90['JsOnStealFail']&&_0x334e90[_0x55cdfa(0xc0)]['call'](this,this['subject'](),_0x316325);const _0x259d73=VisuMZ['StealItems'][_0x55cdfa(0xf2)](this[_0x55cdfa(0xb6)](),'JsOnStealFail');VisuMZ[_0x55cdfa(0xfa)]['JS'][_0x259d73]&&VisuMZ[_0x55cdfa(0xfa)]['JS'][_0x259d73][_0x55cdfa(0x8e)](this,this['subject'](),_0x316325);},Game_Action[_0x1ce5ac(0xdf)][_0x1ce5ac(0x7d)]=function(_0x7df9d){const _0x5f4457=_0x1ce5ac;this['processStealItemsNothingLogWindow'](_0x7df9d),this[_0x5f4457(0x90)](),this[_0x5f4457(0x7b)](_0x7df9d),this[_0x5f4457(0x9d)](_0x7df9d);},Game_Action[_0x1ce5ac(0xdf)][_0x1ce5ac(0x128)]=function(_0x39eda9){const _0x528416=_0x1ce5ac,_0x4df1d2=VisuMZ['StealItems'][_0x528416(0xeb)][_0x528416(0xe9)];if(_0x4df1d2['ShowMessages']){const _0x2c8a1d=_0x4df1d2[_0x528416(0xaf)],_0x7ec5e9=SceneManager[_0x528416(0x92)]['_logWindow'];if(_0x7ec5e9&&_0x2c8a1d!=='')_0x7ec5e9[_0x528416(0xa5)](_0x2c8a1d);}},Game_Action['prototype'][_0x1ce5ac(0x90)]=function(){const _0x422d84=_0x1ce5ac,_0x1c9aec=VisuMZ[_0x422d84(0xfa)][_0x422d84(0xeb)][_0x422d84(0x7e)];if(!_0x1c9aec)return;const _0x1fcab4=_0x422d84(0xd8),_0x3fc3fe={'name':_0x1c9aec[_0x422d84(0x142)['format'](_0x1fcab4)]||'','volume':_0x1c9aec['%1_volume'[_0x422d84(0x15a)](_0x1fcab4)]||0x0,'pitch':_0x1c9aec[_0x422d84(0xfe)[_0x422d84(0x15a)](_0x1fcab4)]||0x0,'pan':_0x1c9aec[_0x422d84(0xb7)[_0x422d84(0x15a)](_0x1fcab4)]||0x0};if(_0x3fc3fe[_0x422d84(0x168)]!=='')AudioManager[_0x422d84(0x14d)](_0x3fc3fe);},Game_Action[_0x1ce5ac(0xdf)][_0x1ce5ac(0x7b)]=function(_0x258374){const _0x588aba=_0x1ce5ac;if(!_0x258374)return;const _0x2d2d53=VisuMZ[_0x588aba(0xfa)][_0x588aba(0xeb)]['Popup'];if(!_0x2d2d53)return;if(_0x2d2d53['FailurePopupText']==='')return;const _0x435438=_0x2d2d53[_0x588aba(0x12b)],_0x506657={'textColor':_0x2d2d53[_0x588aba(0x133)]||0x0,'flashColor':_0x2d2d53[_0x588aba(0x146)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x2d2d53[_0x588aba(0xf0)]||0x3c};_0x258374[_0x588aba(0xc7)](_0x435438,_0x506657);},Game_Action[_0x1ce5ac(0xdf)]['processStealItemsNothingJS']=function(_0x3afce7){const _0x58b5dc=_0x1ce5ac;if(!_0x3afce7)return;const _0x23a29b=VisuMZ[_0x58b5dc(0xfa)]['Settings']['Mechanics'];_0x23a29b&&_0x23a29b[_0x58b5dc(0xd3)]&&_0x23a29b[_0x58b5dc(0xd3)][_0x58b5dc(0x8e)](this,this[_0x58b5dc(0x9c)](),_0x3afce7);const _0xea1a7f=VisuMZ[_0x58b5dc(0xfa)][_0x58b5dc(0xf2)](this[_0x58b5dc(0xb6)](),_0x58b5dc(0x12a));VisuMZ[_0x58b5dc(0xfa)]['JS'][_0xea1a7f]&&VisuMZ['StealItems']['JS'][_0xea1a7f]['call'](this,this['subject'](),_0x3afce7);},VisuMZ[_0x1ce5ac(0xfa)][_0x1ce5ac(0x6d)]=Game_BattlerBase['prototype'][_0x1ce5ac(0x148)],Game_BattlerBase[_0x1ce5ac(0xdf)][_0x1ce5ac(0x148)]=function(){const _0x5acd46=_0x1ce5ac;this['_cache']={},VisuMZ[_0x5acd46(0xfa)][_0x5acd46(0x6d)][_0x5acd46(0x8e)](this);},Game_BattlerBase[_0x1ce5ac(0xdf)][_0x1ce5ac(0xd9)]=function(_0x1bce3d){const _0x1cf7de=_0x1ce5ac;return this[_0x1cf7de(0x169)]=this['_cache']||{},this[_0x1cf7de(0x169)][_0x1bce3d]!==undefined;},Game_BattlerBase[_0x1ce5ac(0xdf)]['stealRate']=function(){const _0x4da1ef=_0x1ce5ac;let _0x4336e4=_0x4da1ef(0x9f);if(this[_0x4da1ef(0xd9)](_0x4336e4))return this[_0x4da1ef(0x169)][_0x4336e4];return this[_0x4da1ef(0x169)][_0x4336e4]=this[_0x4da1ef(0x93)](),this['_cache'][_0x4336e4];},Game_BattlerBase[_0x1ce5ac(0xdf)][_0x1ce5ac(0x93)]=function(){const _0x377f7d=_0x1ce5ac,_0x449a4f=VisuMZ[_0x377f7d(0xfa)][_0x377f7d(0x15c)];let _0x309e88=0x1;for(const _0x59e93f of this['traitObjects']()){if(!_0x59e93f)continue;const _0x56306b=_0x59e93f[_0x377f7d(0xb2)];_0x56306b[_0x377f7d(0x10b)](_0x449a4f[_0x377f7d(0x15e)])&&(_0x309e88*=Number(RegExp['$1'])*0.01);}return Math['max'](0x0,_0x309e88);},Game_BattlerBase[_0x1ce5ac(0xdf)][_0x1ce5ac(0x108)]=function(){const _0x342f65=_0x1ce5ac;let _0xcf0f21=_0x342f65(0x108);if(this[_0x342f65(0xd9)](_0xcf0f21))return this[_0x342f65(0x169)][_0xcf0f21];return this['_cache'][_0xcf0f21]=this[_0x342f65(0xd6)](),this[_0x342f65(0x169)][_0xcf0f21];},Game_BattlerBase[_0x1ce5ac(0xdf)]['createStealPlus']=function(){const _0x303e4a=_0x1ce5ac,_0x136e11=VisuMZ[_0x303e4a(0xfa)][_0x303e4a(0x15c)];let _0x124c9a=0x0;const _0x1c3db1=VisuMZ['StealItems'][_0x303e4a(0xeb)][_0x303e4a(0xba)];_0x1c3db1&&_0x1c3db1[_0x303e4a(0x129)]&&(_0x124c9a+=_0x1c3db1[_0x303e4a(0x129)][_0x303e4a(0x8e)](this));for(const _0x1a201a of this['traitObjects']()){if(!_0x1a201a)continue;const _0x560b98=_0x1a201a[_0x303e4a(0xb2)];_0x560b98[_0x303e4a(0x10b)](_0x136e11['StealPlus'])&&(_0x124c9a+=Number(RegExp['$1'])*0.01);}return _0x124c9a;},Game_BattlerBase[_0x1ce5ac(0xdf)][_0x1ce5ac(0x6e)]=function(){const _0xbff07f=_0x1ce5ac;let _0x592c60=_0xbff07f(0x6e);if(this[_0xbff07f(0xd9)](_0x592c60))return this['_cache'][_0x592c60];return this[_0xbff07f(0x169)][_0x592c60]=this[_0xbff07f(0xdc)](),this[_0xbff07f(0x169)][_0x592c60];},Game_BattlerBase['prototype'][_0x1ce5ac(0xdc)]=function(){const _0x25e4ff=_0x1ce5ac,_0x573833=VisuMZ[_0x25e4ff(0xfa)]['RegExp'];let _0x1615a1=0x0;const _0x3c8715=VisuMZ[_0x25e4ff(0xfa)][_0x25e4ff(0xeb)][_0x25e4ff(0xba)];_0x3c8715&&_0x3c8715[_0x25e4ff(0xde)]&&(_0x1615a1+=_0x3c8715[_0x25e4ff(0xde)][_0x25e4ff(0x8e)](this));for(const _0x3058a4 of this['traitObjects']()){if(!_0x3058a4)continue;const _0x15bf2d=_0x3058a4[_0x25e4ff(0xb2)];_0x15bf2d[_0x25e4ff(0x10b)](_0x573833[_0x25e4ff(0xa9)])&&(_0x1615a1+=Number(RegExp['$1'])*0.01);}return _0x1615a1;},VisuMZ[_0x1ce5ac(0xfa)][_0x1ce5ac(0xfd)]=Game_Enemy[_0x1ce5ac(0xdf)]['setup'],Game_Enemy[_0x1ce5ac(0xdf)][_0x1ce5ac(0x107)]=function(_0x152b9a,_0x15f131,_0x47568c){const _0x2c87ac=_0x1ce5ac;VisuMZ[_0x2c87ac(0xfa)][_0x2c87ac(0xfd)][_0x2c87ac(0x8e)](this,_0x152b9a,_0x15f131,_0x47568c),!Imported['VisuMZ_3_EnemyLevels']&&this[_0x2c87ac(0x118)]();},VisuMZ[_0x1ce5ac(0xfa)][_0x1ce5ac(0x126)]=Game_Enemy['prototype'][_0x1ce5ac(0xbf)],Game_Enemy[_0x1ce5ac(0xdf)][_0x1ce5ac(0xbf)]=function(){const _0x31b621=_0x1ce5ac;VisuMZ[_0x31b621(0xfa)][_0x31b621(0x126)][_0x31b621(0x8e)](this),this[_0x31b621(0x118)]();},Game_Enemy['prototype'][_0x1ce5ac(0x119)]=function(){const _0x2fe5bd=_0x1ce5ac;if(this['_stealableItems']===undefined)this[_0x2fe5bd(0x118)]();return this[_0x2fe5bd(0x16b)];},Game_Enemy['prototype']['setupStealableItems']=function(){const _0x3f36cb=_0x1ce5ac,_0x120e88=this[_0x3f36cb(0xf6)]();if(!_0x120e88)return;this[_0x3f36cb(0x16b)]=VisuMZ[_0x3f36cb(0xfa)][_0x3f36cb(0xb9)](this,_0x120e88);},VisuMZ['StealItems'][_0x1ce5ac(0x165)]={},VisuMZ['StealItems'][_0x1ce5ac(0xb9)]=function(_0x50c77a,_0xae699e){const _0x1fb3fc=_0x1ce5ac;if(!_0xae699e)return[];if(VisuMZ[_0x1fb3fc(0xfa)][_0x1fb3fc(0x165)][_0xae699e['id']])return JsonEx[_0x1fb3fc(0x7f)](VisuMZ['StealItems']['StealData'][_0xae699e['id']]);VisuMZ[_0x1fb3fc(0xfa)]['StealData'][_0xae699e['id']]=[];const _0x57ff7b=VisuMZ[_0x1fb3fc(0xfa)][_0x1fb3fc(0xeb)][_0x1fb3fc(0x121)],_0x28683f=VisuMZ[_0x1fb3fc(0xfa)][_0x1fb3fc(0x15c)],_0x58054d=_0xae699e[_0x1fb3fc(0xb2)];if(_0x57ff7b['AutoGold']&&_0xae699e[_0x1fb3fc(0xea)]>0x0){const _0xd5083c={'type':'GOLD','id':_0xae699e['gold'],'rate':_0x57ff7b[_0x1fb3fc(0xd1)],'stolen':![],'drop':!![]};VisuMZ[_0x1fb3fc(0xfa)][_0x1fb3fc(0x165)][_0xae699e['id']][_0x1fb3fc(0xe5)](_0xd5083c);}if(_0x57ff7b['AutoItem']){const _0x5001ca=_0xae699e[_0x1fb3fc(0x156)];for(const _0x100186 of _0x5001ca){if(_0x100186){const _0x76ee21={'type':_0x1fb3fc(0x122),'id':_0x100186['dataId'],'rate':0x1/Math[_0x1fb3fc(0x147)](0x1,_0x100186[_0x1fb3fc(0xb1)])*_0x57ff7b['ItemRate'],'stolen':![],'drop':!![],'dropIndex':_0x5001ca[_0x1fb3fc(0xff)](_0x100186)};_0x76ee21[_0x1fb3fc(0x163)]=[_0x1fb3fc(0x122),'ITEM','WEAPON','ARMOR'][_0x100186[_0x1fb3fc(0x9b)]];if(_0x76ee21[_0x1fb3fc(0x163)]===_0x1fb3fc(0x122))continue;VisuMZ[_0x1fb3fc(0xfa)]['StealData'][_0xae699e['id']]['push'](_0x76ee21);}}}const _0x45884f=_0x58054d['match'](_0x28683f[_0x1fb3fc(0x13b)]);if(_0x45884f)for(const _0x4b04fa of _0x45884f){if(!_0x4b04fa)continue;_0x4b04fa[_0x1fb3fc(0x10b)](_0x28683f['StealableItemSingle']);const _0x4e24e2=String(RegExp['$1'])[_0x1fb3fc(0xa0)](),_0x5d8de6=Number(RegExp['$2'])*0.01,_0x477d6c=VisuMZ[_0x1fb3fc(0xfa)][_0x1fb3fc(0x141)](_0x4e24e2,_0x5d8de6);if(!!_0x477d6c)VisuMZ[_0x1fb3fc(0xfa)][_0x1fb3fc(0x165)][_0xae699e['id']][_0x1fb3fc(0xe5)](_0x477d6c);}if(_0x58054d[_0x1fb3fc(0x10b)](_0x28683f[_0x1fb3fc(0xca)])){const _0x882097=String(RegExp['$1'])[_0x1fb3fc(0x84)](/[\r\n]+/);for(const _0x49e932 of _0x882097){if(_0x49e932[_0x1fb3fc(0x10b)](/(.*):[ ](.*)([%％])/i)){const _0x55cd61=String(RegExp['$1'])[_0x1fb3fc(0xa0)](),_0x2aec89=Number(RegExp['$2'])*0.01,_0x2f840d=VisuMZ[_0x1fb3fc(0xfa)][_0x1fb3fc(0x141)](_0x55cd61,_0x2aec89);if(!!_0x2f840d)VisuMZ['StealItems'][_0x1fb3fc(0x165)][_0xae699e['id']][_0x1fb3fc(0xe5)](_0x2f840d);}}}return JsonEx[_0x1fb3fc(0x7f)](VisuMZ[_0x1fb3fc(0xfa)]['StealData'][_0xae699e['id']]);},VisuMZ[_0x1ce5ac(0xfa)][_0x1ce5ac(0x141)]=function(_0x4c045f,_0x430c8b){const _0x32d731=_0x1ce5ac,_0x19fa96={'type':_0x32d731(0x122),'id':0x0,'rate':_0x430c8b,'stolen':![],'drop':![]};_0x4c045f['match'](/GOLD[ ](\d+)/i)&&(_0x19fa96[_0x32d731(0x163)]=_0x32d731(0xd2),_0x19fa96['id']=Number(RegExp['$1']));if(_0x4c045f['match'](/ITEM[ ](\d+)/i))_0x19fa96['type']=_0x32d731(0xe3),_0x19fa96['id']=Number(RegExp['$1']);else _0x4c045f[_0x32d731(0x10b)](/ITEM[ ](.*)/i)&&(_0x19fa96['type']=_0x32d731(0xe3),_0x19fa96['id']=DataManager['getItemIdWithName'](RegExp['$1']));if(_0x4c045f['match'](/WEAPON[ ](\d+)/i))_0x19fa96[_0x32d731(0x163)]=_0x32d731(0x11d),_0x19fa96['id']=Number(RegExp['$1']);else _0x4c045f[_0x32d731(0x10b)](/WEAPON[ ](.*)/i)&&(_0x19fa96['type']=_0x32d731(0x11d),_0x19fa96['id']=DataManager[_0x32d731(0x170)](RegExp['$1']));if(_0x4c045f[_0x32d731(0x10b)](/ARMOR[ ](\d+)/i))_0x19fa96[_0x32d731(0x163)]='ARMOR',_0x19fa96['id']=Number(RegExp['$1']);else _0x4c045f[_0x32d731(0x10b)](/ARMOR[ ](.*)/i)&&(_0x19fa96[_0x32d731(0x163)]='ARMOR',_0x19fa96['id']=DataManager[_0x32d731(0xd4)](RegExp['$1']));return _0x19fa96;},VisuMZ[_0x1ce5ac(0xfa)][_0x1ce5ac(0x79)]=Game_Enemy['prototype'][_0x1ce5ac(0xea)],Game_Enemy[_0x1ce5ac(0xdf)]['gold']=function(){const _0x57e703=_0x1ce5ac,_0x1dd2ce=VisuMZ[_0x57e703(0xfa)][_0x57e703(0xeb)][_0x57e703(0x121)];if(_0x1dd2ce['AutoGold']&&_0x1dd2ce[_0x57e703(0xb5)]){const _0x2a7d2f=this['getStealableItems']();for(const _0x14a50d of _0x2a7d2f){if(!_0x14a50d)continue;if(_0x14a50d[_0x57e703(0xe6)]&&_0x14a50d['type']==='GOLD'){if(_0x14a50d[_0x57e703(0x102)])return 0x0;}}}return VisuMZ[_0x57e703(0xfa)]['Game_Enemy_gold'][_0x57e703(0x8e)](this);},VisuMZ[_0x1ce5ac(0xfa)][_0x1ce5ac(0xcc)]=Game_Enemy['prototype'][_0x1ce5ac(0x164)],Game_Enemy[_0x1ce5ac(0xdf)][_0x1ce5ac(0x164)]=function(){const _0x4fa5ad=_0x1ce5ac,_0x2b1906=JsonEx[_0x4fa5ad(0x7f)](this[_0x4fa5ad(0xf6)]()['dropItems']),_0x4ca6e3=VisuMZ[_0x4fa5ad(0xfa)][_0x4fa5ad(0xeb)][_0x4fa5ad(0x121)];if(_0x4ca6e3[_0x4fa5ad(0xc3)]&&_0x4ca6e3[_0x4fa5ad(0x110)]){const _0x478301=this[_0x4fa5ad(0x119)]();for(const _0x1b0ac4 of _0x478301){if(!_0x1b0ac4)continue;if(_0x1b0ac4[_0x4fa5ad(0xe6)]&&_0x1b0ac4[_0x4fa5ad(0x163)]!=='GOLD'){if(!_0x1b0ac4[_0x4fa5ad(0x102)])continue;const _0x392656=_0x1b0ac4[_0x4fa5ad(0xab)],_0x9699d=this[_0x4fa5ad(0xf6)]()[_0x4fa5ad(0x156)][_0x392656];_0x9699d['kind']=0x0;}}}let _0x43bcdd=VisuMZ[_0x4fa5ad(0xfa)][_0x4fa5ad(0xcc)][_0x4fa5ad(0x8e)](this);return this['enemy']()[_0x4fa5ad(0x156)]=_0x2b1906,_0x43bcdd;},VisuMZ[_0x1ce5ac(0xfa)][_0x1ce5ac(0xcf)]=Scene_Battle['prototype'][_0x1ce5ac(0xe0)],Scene_Battle['prototype']['createEnemyWindow']=function(){const _0xa00c71=_0x1ce5ac;VisuMZ[_0xa00c71(0xfa)][_0xa00c71(0xcf)][_0xa00c71(0x8e)](this),this[_0xa00c71(0x91)]();},Scene_Battle[_0x1ce5ac(0xdf)][_0x1ce5ac(0x91)]=function(){const _0x1215e6=_0x1ce5ac,_0x1ab9bc=this['itemWindowRect']();this[_0x1215e6(0x103)]=new Window_StealSnatch(_0x1ab9bc),this[_0x1215e6(0x103)]['setHelpWindow'](this[_0x1215e6(0xb0)]),this['_stealSnatchWindow'][_0x1215e6(0xc9)]('ok',this[_0x1215e6(0x125)][_0x1215e6(0x109)](this)),this['_stealSnatchWindow']['setHandler'](_0x1215e6(0x85),this[_0x1215e6(0x105)][_0x1215e6(0x109)](this)),this[_0x1215e6(0xec)](this[_0x1215e6(0x103)]);},VisuMZ[_0x1ce5ac(0xfa)]['Scene_Battle_isAnyInputWindowActive']=Scene_Battle['prototype'][_0x1ce5ac(0x150)],Scene_Battle[_0x1ce5ac(0xdf)][_0x1ce5ac(0x150)]=function(){const _0x4a86f4=_0x1ce5ac;if(this[_0x4a86f4(0x103)]&&this[_0x4a86f4(0x103)][_0x4a86f4(0x149)])return!![];return VisuMZ['StealItems'][_0x4a86f4(0x158)]['call'](this);},VisuMZ[_0x1ce5ac(0xfa)][_0x1ce5ac(0xcb)]=Scene_Battle[_0x1ce5ac(0xdf)][_0x1ce5ac(0xfb)],Scene_Battle[_0x1ce5ac(0xdf)][_0x1ce5ac(0xfb)]=function(){const _0x116ffe=_0x1ce5ac;VisuMZ[_0x116ffe(0xfa)][_0x116ffe(0xcb)][_0x116ffe(0x8e)](this),this['_stealSnatchWindow']&&(this[_0x116ffe(0x103)][_0x116ffe(0x155)](),this['_stealSnatchWindow'][_0x116ffe(0x152)]());},VisuMZ['StealItems'][_0x1ce5ac(0x6a)]=Scene_Battle['prototype'][_0x1ce5ac(0x101)],Scene_Battle[_0x1ce5ac(0xdf)][_0x1ce5ac(0x101)]=function(){const _0x263f64=_0x1ce5ac,_0x521ffa=BattleManager['inputtingAction']();this[_0x263f64(0x103)]&&_0x521ffa[_0x263f64(0x14a)]()?this[_0x263f64(0x153)]():VisuMZ[_0x263f64(0xfa)]['Scene_Battle_onEnemyOk'][_0x263f64(0x8e)](this);},Scene_Battle[_0x1ce5ac(0xdf)][_0x1ce5ac(0x153)]=function(){const _0x99c996=_0x1ce5ac,_0x54bf74=$gameTroop[_0x99c996(0x15d)]()[this[_0x99c996(0x94)][_0x99c996(0xf5)]()],_0x13ec80=BattleManager[_0x99c996(0x11a)]();this[_0x99c996(0x103)][_0x99c996(0x104)](_0x54bf74,_0x13ec80),this[_0x99c996(0x103)][_0x99c996(0x148)](),this[_0x99c996(0x103)]['show'](),this[_0x99c996(0x103)][_0x99c996(0xd0)]();},Scene_Battle[_0x1ce5ac(0xdf)][_0x1ce5ac(0x125)]=function(){const _0x3129da=_0x1ce5ac,_0x898835=BattleManager['inputtingAction'](),_0x5bf4d3=$gameTroop[_0x3129da(0x15d)]()[this['_enemyWindow'][_0x3129da(0xf5)]()],_0x2caedf=this[_0x3129da(0x103)][_0x3129da(0xb6)]();_0x898835['registerSnatchTarget'](_0x5bf4d3,_0x2caedf),VisuMZ[_0x3129da(0xfa)][_0x3129da(0x6a)]['call'](this);},Scene_Battle['prototype'][_0x1ce5ac(0x105)]=function(){const _0x12ce56=_0x1ce5ac;this['_stealSnatchWindow']['hide'](),this['_stealSnatchWindow'][_0x12ce56(0x155)](),this[_0x12ce56(0x94)][_0x12ce56(0xb8)](),this[_0x12ce56(0x94)][_0x12ce56(0xd0)](),Imported[_0x12ce56(0xf3)]&&this[_0x12ce56(0x94)][_0x12ce56(0xf8)]();},Window_BattleLog[_0x1ce5ac(0xdf)][_0x1ce5ac(0xa5)]=function(_0x492b82){const _0x58ca0d=_0x1ce5ac;this[_0x58ca0d(0xb4)][_0x58ca0d(0xe5)](_0x492b82),this[_0x58ca0d(0x148)]();};function Window_StealSnatch(){const _0x102e24=_0x1ce5ac;this[_0x102e24(0x6f)](...arguments);}Window_StealSnatch[_0x1ce5ac(0xdf)]=Object[_0x1ce5ac(0xc5)](Window_ItemList['prototype']),Window_StealSnatch[_0x1ce5ac(0xdf)][_0x1ce5ac(0x74)]=Window_StealSnatch,Window_StealSnatch[_0x1ce5ac(0xdf)]['initialize']=function(_0x2e48fc){const _0x51ec52=_0x1ce5ac;Window_ItemList[_0x51ec52(0xdf)][_0x51ec52(0x6f)][_0x51ec52(0x8e)](this,_0x2e48fc),this[_0x51ec52(0x152)](),this[_0x51ec52(0xc6)]=null,this[_0x51ec52(0x11f)]=null;},Window_StealSnatch['prototype'][_0x1ce5ac(0x104)]=function(_0x7aad51,_0x1626fa){const _0x27f103=_0x1ce5ac;this[_0x27f103(0xc6)]=_0x7aad51,this[_0x27f103(0x11f)]=_0x1626fa,this['refresh'](),this[_0x27f103(0xb8)](),this['forceSelect'](0x0);},Window_StealSnatch[_0x1ce5ac(0xdf)][_0x1ce5ac(0xfc)]=function(){const _0x8efe34=_0x1ce5ac;this[_0x8efe34(0x143)]=[];if(!this[_0x8efe34(0xc6)])return;const _0x5a3b5e=VisuMZ[_0x8efe34(0xfa)][_0x8efe34(0x72)](this[_0x8efe34(0x11f)],this['_enemy']);if(_0x5a3b5e[_0x8efe34(0x68)][_0x8efe34(0x8b)]<=0x0)return;this['_data']=this[_0x8efe34(0xc6)][_0x8efe34(0x119)]()[_0x8efe34(0x11e)](_0x3f5241=>{const _0x54717f=_0x8efe34;return _0x5a3b5e[_0x54717f(0x68)]['includes'](_0x3f5241[_0x54717f(0x163)]);});},Window_StealSnatch[_0x1ce5ac(0xdf)]['isEnabled']=function(_0x217faf){return _0x217faf&&!_0x217faf['stolen'];},Window_StealSnatch[_0x1ce5ac(0xdf)]['numberWidth']=function(){const _0x2300ab=_0x1ce5ac;if(this['_numberWidth'])return this[_0x2300ab(0xd5)];return this[_0x2300ab(0xd5)]=this[_0x2300ab(0xbb)](_0x2300ab(0xc4)),this[_0x2300ab(0xd5)]=Math['max'](this['_numberWidth'],this[_0x2300ab(0x75)](TextManager[_0x2300ab(0x77)])[_0x2300ab(0x10d)]),this[_0x2300ab(0xd5)];},Window_StealSnatch[_0x1ce5ac(0xdf)][_0x1ce5ac(0x13a)]=function(_0x47ea26,_0x57ec70,_0x35d9eb,_0x25327f){const _0x5439d8=_0x1ce5ac;if(!_0x47ea26)return;switch(_0x47ea26[_0x5439d8(0x163)][_0x5439d8(0xef)]()[_0x5439d8(0xa0)]()){case _0x5439d8(0xd2):const _0x5c584c=TextManager[_0x5439d8(0x162)][_0x5439d8(0x15a)](_0x5439d8(0x6c)[_0x5439d8(0x15a)](ImageManager['snatchGoldIcon']),_0x47ea26['id'],TextManager['currencyUnit']);this[_0x5439d8(0x16e)](_0x5c584c,_0x57ec70,_0x35d9eb);break;case _0x5439d8(0xe3):Window_Base[_0x5439d8(0xdf)]['drawItemName']['call'](this,$dataItems[_0x47ea26['id']],_0x57ec70,_0x35d9eb,_0x25327f);break;case _0x5439d8(0x11d):Window_Base[_0x5439d8(0xdf)]['drawItemName']['call'](this,$dataWeapons[_0x47ea26['id']],_0x57ec70,_0x35d9eb,_0x25327f);break;case _0x5439d8(0x15f):Window_Base[_0x5439d8(0xdf)][_0x5439d8(0x13a)][_0x5439d8(0x8e)](this,$dataArmors[_0x47ea26['id']],_0x57ec70,_0x35d9eb,_0x25327f);break;}},Window_StealSnatch[_0x1ce5ac(0xdf)][_0x1ce5ac(0xd7)]=function(_0xdf063f,_0x488974,_0x1d9af7,_0x1766b2){const _0x3ff748=_0x1ce5ac;if(_0xdf063f[_0x3ff748(0x102)]){const _0x56921e=TextManager[_0x3ff748(0x77)];_0x488974+=_0x1766b2-this[_0x3ff748(0x75)](_0x56921e)['width'],this[_0x3ff748(0x16e)](_0x56921e,_0x488974,_0x1d9af7);}else{if(VisuMZ[_0x3ff748(0xfa)][_0x3ff748(0xeb)][_0x3ff748(0x97)][_0x3ff748(0xe8)]){const _0x2fe2aa=VisuMZ[_0x3ff748(0xfa)][_0x3ff748(0x72)](this[_0x3ff748(0x11f)],this[_0x3ff748(0xc6)]);let _0x340eeb=_0x2fe2aa[_0x3ff748(0x139)][_0x3ff748(0xee)]*_0xdf063f[_0x3ff748(0x139)],_0x179dcd=_0x2fe2aa[_0x3ff748(0x7c)][_0x3ff748(0xee)];_0x340eeb*=_0x2fe2aa[_0x3ff748(0x139)][_0xdf063f[_0x3ff748(0x163)]['toLowerCase']()],_0x179dcd+=_0x2fe2aa[_0x3ff748(0x7c)][_0xdf063f[_0x3ff748(0x163)]['toLowerCase']()];let _0x4f224b=(_0x340eeb+_0x179dcd)[_0x3ff748(0x8d)](0x0,0x1)*0x64;_0x4f224b>0x0&&_0x4f224b<0x64&&(_0x4f224b=_0x4f224b['toFixed'](0x2)),_0x4f224b=String(_0x4f224b)+'%',_0x488974+=_0x1766b2-this[_0x3ff748(0x75)](_0x4f224b)[_0x3ff748(0x10d)],this[_0x3ff748(0x16e)](_0x4f224b,_0x488974,_0x1d9af7);}}},Window_StealSnatch['prototype'][_0x1ce5ac(0xa7)]=function(_0x596c7d){const _0x24ad8d=_0x1ce5ac;if(this[_0x24ad8d(0xb0)])switch(_0x596c7d[_0x24ad8d(0x163)]['toUpperCase']()[_0x24ad8d(0xa0)]()){case _0x24ad8d(0xd2):this['_helpWindow']['setText'](TextManager['snatchGoldHelpText']);break;case _0x24ad8d(0xe3):this[_0x24ad8d(0xb0)][_0x24ad8d(0x16d)]($dataItems[_0x596c7d['id']]);break;case _0x24ad8d(0x11d):this[_0x24ad8d(0xb0)][_0x24ad8d(0x16d)]($dataWeapons[_0x596c7d['id']]);break;case _0x24ad8d(0x15f):this[_0x24ad8d(0xb0)][_0x24ad8d(0x16d)]($dataArmors[_0x596c7d['id']]);break;}};