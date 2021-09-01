//=============================================================================
// VisuStella MZ - Battle System ATB - Active Turn Battle
// VisuMZ_2_BattleSystemATB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemATB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemATB = VisuMZ.BattleSystemATB || {};
VisuMZ.BattleSystemATB.version = 1.08;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.08] [BattleSystemATB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_ATB_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The RPG Maker MZ Time Progress Battle (TPB) system is only a few steps away
 * from the acclaimed Active Turn Battle (ATB) system. This plugin will grant
 * it the various features needed to turn it from TPB into ATB.
 * 
 * This plugin will grant control over how the various mechanics work, ranging
 * from penalties to calculations, to actions that can manipulate the ATB gauge
 * of battlers. Battlers that are in the middle of casting a spell can also be
 * interrupted with specific notetag traits.
 * 
 * ATB Gauges can also be displayed on enemies and/or allies, giving the player
 * full access to the current battle state. The ATB Gauges are also improved,
 * showing different colors for different states and showing a new gauge for
 * the casting state.
 * 
 * *NOTE* You will need to set the game project to run in either TPB mode,
 * Time Progress (Active) or Time Progress (Wait), for these new ATB effects
 * to work. You can find this setting in Database > System 1.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Full control over the TPB/ATB mechanics such as speed, calculations, etc.
 * * Notetags that give skills and items access to ATB Gauge manipulation, by
 *   altering how filled they are.
 * * Interrupts can be used on battlers in the middle of casting a skill.
 * * Visual ATB Gauges can be displayed over battlers' heads.
 * * ATB Gauges have extra coloring options added to them to let the player
 *   quickly know the current speed state of the ATB Gauge.
 * * A field-wide ATB Gauge that positions actor and enemy markers on it to
 *   show how far along actors and enemies are relative to each other's turns.
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
 * - VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 * 
 * *NOTE* You will need to set the game project to run in either TPB mode,
 * Time Progress (Active) or Time Progress (Wait), for these new ATB effects
 * to work. You can find this setting in Database > System 1.
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
 * ATB Gauges
 * 
 * The gauges are now revamped to show different colors to depict the various
 * ATB states a battler can be in. These various states include the following:
 * 
 * - When a battler's speed is fully stopped.
 * - When a battler's speed is slower/faster past a specific rating.
 * - When a battler is ready for an action.
 * - When a battler is casting an action (those with negative speed values).
 * 
 * The colors used for these states can be found and altered in the Plugin
 * Parameters under Gauge Color Settings.
 *
 * ---
 * 
 * Skill & Item Speeds
 * 
 * With TPB, skills and items with negative speed values will cause the battler
 * to enter a "casting" state, meaning they have to wait extra time before the
 * action takes off. With this delayed action execution, one might assume that
 * if there is a positive speed value, the battler would require less time for
 * their next turn.
 * 
 * However, this isn't the case with RPG Maker MZ's TPB. By changing it to ATB,
 * skills and items with positive speed values will have an impact on how full
 * their ATB Gauges will be in the following turn. A value of 2000 will put the
 * gauge at 50% full, 1000 will put the gauge at 25% full, 500 will put it at
 * 12.5% full, and so on. Notetags can also be used to influence this.
 * 
 * ---
 * 
 * JS Calculation Mechanics
 * 
 * While the calculation mechanics aren't changed from their original RPG Maker
 * MZ formulas, the functions for them have been overwritten to allow you, the
 * game developer, to alter them as you see fit.
 * 
 * ---
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine
 *
 * - ATB Interrupts can have animations played when they trigger if the
 * VisuStella Core Engine is installed.
 *
 * ---
 * 
 * VisuMZ_1_OptionsCore
 * 
 * - Having the VisuStella Options Core available will allow you to adjust the
 * speed at which the ATB gauges fill up.
 * 
 * - The VisuStella Options Core also gives the player the option to toggle
 * between Active and Wait-based ATB.
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
 * === General ATB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 *
 * ---
 * 
 * <ATB Help>
 *  description
 *  description
 * </ATB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under TPB/ATB.
 * - This is primarily used if the skill behaves differently in TPB/ATB versus
 *   any other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to TPB/ATB.
 * 
 * ---
 *
 * <Hide ATB Gauge>
 *
 * - Used for: Enemy Notetags
 * - If you don't want an enemy to show their ATB Gauge, use this notetag.
 * 
 * ---
 * 
 * === ATB Field Gauge-Related Notetags ===
 * 
 * These notetags only work if the ATB Field Gauge is enabled.
 * 
 * ---
 *
 * <ATB Field Gauge Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the marker graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <ATB Field Gauge Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the marker graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <ATB Field Gauge Face: Monster, 1>
 * 
 * ---
 * 
 * === ATB Gauge Manipulation-Related Notetags ===
 * 
 * These notetags are used for ATB Gauge manipulation purposes.
 * 
 * ---
 *
 * <ATB After Gauge: x%>
 *
 * - Used for: Skill, Item Notetags
 * - After using the skill/item, the user's ATB Gauge will be set to x%.
 * - Replace 'x' with a percentile value representing the amount you want the
 *   ATB Gauge to reset to after the skill/item's usage.
 * 
 * ---
 * 
 * <ATB Charge Gauge: x%>
 * <ATB Charge Gauge: +x%>
 * <ATB Charge Gauge: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a charging state, change the target's gauge amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the ATB
 *   Gauge you wish to alter it to/by.
 * - This only affects targets who are in a charging state.
 * 
 * ---
 * 
 * <ATB Cast Gauge: x%>
 * <ATB Cast Gauge: +x%>
 * <ATB Cast Gauge: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a casting state, change the target's gauge amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the ATB
 *   Gauge you wish to alter it to/by.
 * - This only affects targets who are in a casting state.
 * 
 * ---
 *
 * <ATB Interrupt>
 *
 * - Used for: Skill, Item Notetags
 * - If this skill/item hits a target who is in a casting state, interrupt that
 *   action to cancel it and reset the target's ATB Gauge to 0%.
 * 
 * ---
 *
 * <ATB Cannot Be Interrupted>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill/item immune to ATB Interruptions.
 * 
 * ---
 * 
 * <ATB Battle Start Gauge: +x%>
 * <ATB Battle Start Gauge: -x%>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Determine how much extra or less ATB Gauge the battler will start with if
 *   associated with one of these database objects.
 * - Replace 'x' with a percentile value determining how much extra or less ATB
 *   Gauge value the battler will start battle with.
 * - These values are additive when stacked.
 *
 * ---
 * 
 * <ATB After Gauge: +x%>
 * <ATB After Gauge: -x%>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Determine how much influence there is on the ATB Gauge after finishing a
 *   skill/item. Increase or decrease the amount after each action.
 * - Replace 'x' with a percentile value determining how much influence there
 *   is on the ATB Gauge after the skill/item has finished performing.
 * - These values are additive when stacked.
 *
 * ---
 * 
 * === JavaScript Notetags: ATB Gauge Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional ATB Gauge Manipulation.
 * 
 * ---
 * 
 * <JS ATB Charge Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB Charge Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to if the target is in a charging state.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current ATB Gauge rate
 *   if the target is in a charging state.
 * 
 * ---
 * 
 * <JS ATB Cast Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB Cast Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to if the target is in a casting state.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current ATB Gauge rate
 *   if the target is in a casting state.
 * 
 * ---
 * 
 * <JS ATB After Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB After Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to after performing this skill/item action.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to 0.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Field Gauge Icon
 * - Changes the icons used for the specific actor(s) on the ATB Field Gauge.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 * 
 * Actor: Change Field Gauge Face
 * - Changes the faces used for the specific actor(s) on the ATB Field Gauge.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   Face Name:
 *   - This is the filename for the target face graphic.
 * 
 *   Face Index:
 *   - This is the index for the target face graphic.
 * 
 * ---
 *
 * Actor: Clear Field Gauge Graphic
 * - Clears the ATB Field Gauge graphics for the actor(s).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change Field Gauge Icon
 * - Changes the icons used for the specific enemy(ies) on the ATB Field Gauge.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change Field Gauge Face
 * - Changes the faces used for the specific enemy(ies) on the ATB Field Gauge.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Enemy: Clear Field Gauge Graphic
 * - Clears the ATB Field Gauge graphics for the enemy(ies).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 * 
 * System: ATB Field Gauge Visibility
 * - Determine the visibility of the ATB Field Gauge.
 * 
 *   Visibility:
 *   - Changes the visibility of the ATB Field Gauge.
 * 
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings used for Battle System ATB. The majority of these are
 * JavaScript-based and will require knowledge of JavaScript to fully utilize
 * the plugin parameters.
 *
 * ---
 *
 * Mechanics
 * 
 *   Escape Fail Penalty:
 *   - Gauge penalty if an escape attempt fails.
 * 
 *   Stuns Reset Gauge?:
 *   - Should stuns reset the ATB Gauge?
 * 
 *   JS: Initial Gauge:
 *   - JavaScript code to determine how much ATB gauge to give each battler at
 *     the start of battle.
 * 
 *   JS: Speed:
 *   - JavaScript code to determine how much speed a battler has.
 * 
 *   JS: Base Speed:
 *   - JavaScript code to determine how much base speed a battler has.
 * 
 *   JS: Relative Speed:
 *   - JavaScript code to determine what is the relative speed of a battler.
 * 
 *   JS: Acceleration:
 *   - JavaScript code to determine how much gauges accelerate by relative to
 *     reference time.
 * 
 *   JS: Cast Time:
 *   - JavaScript code to determine how much cast time is used for skills/items
 *     with negative speed modifiers.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Interrupt Settings
 * ============================================================================
 *
 * Interrupt settings used for Battle System ATB.
 *
 * ---
 *
 * Interrupt
 * 
 *   Animation ID:
 *   - Play this animation when a unit is interrupted.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mirror Animation:
 *     - Mirror the interrupt animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mute Animation:
 *     - Mute the interrupt animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *   Text Popup:
 *   - Text used for popup when interrupts happen.
 *   - Leave empty for no popup.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *     Flash Color:
 *     - Adjust the popup's flash color.
 *     - Format: [red, green, blue, alpha]
 * 
 *     Flash Duration:
 *     - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Gauge Settings
 * ============================================================================
 *
 * General gauge settings used for ATB Gauges.
 *
 * ---
 *
 * General
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the ATB Gauge sprite's anchor X/Y to be?
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the ATB Gauge to be scaled?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the ATB Gauge's X/Y by?
 *
 * ---
 *
 * AGI Gauge Rates
 * 
 *   Slow Rate:
 *   - How much should the AGI rate be at to be considered slow?
 * 
 *   Fast Rate:
 *   - How much should the AGI rate be at to be considered fast?
 *
 * ---
 *
 * Actors
 * 
 *   Show Sprite Gauges:
 *   - Show ATB Gauges over the actor sprites' heads?
 *   - Requires SV Actors to be visible.
 * 
 *   Show Status Gauges:
 *   - Show ATB Gauges in the status window?
 *   - Applies only to sideview.
 *
 * ---
 *
 * Enemies
 * 
 *   Show Sprite Gauges:
 *   - Show ATB Gauges over the enemy sprites' heads?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Field Gauge Settings
 * ============================================================================
 * 
 * The ATB Field Gauge is a large gauge placed on the screen with all of the
 * current battle's active participants shown on it. The participants are
 * represented by a marker. Each marker's position on the gauge indicates its
 * battler's ATB progress towards a turn.
 * 
 * In order for this feature to work, enable "Use Field Gauge?" in the
 * Plugin Parameters.
 *
 * ---
 *
 * General
 * 
 *   Use Field Gauge?:
 *   - This value must be set to true in order for the ATB Field Gauge
 *     to appear.
 *   - This needs to be on in order for this feature to work.
 * 
 *   Display Position:
 *   - Select where the Field Gauge will appear on the screen.
 *   - Top
 *   - Bottom
 *   - Left
 *   - Right
 * 
 *   Offset X:
 *   Offset Y:
 *   - How much to offset the X/Y coordinates by.
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the gauge when the
 *     help window is open?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Field Gauge.
 *   - Settings may vary depending on position.
 *   - Left to Right
 *   - Right to Left
 *   - Up to Down
 *   - Down to Up
 *
 * ---
 *
 * Field Gauge Settings
 * 
 *   Gauge Skin:
 *   - Optional. Select an image to place behind the gauge.
 *   - This will be centered on the Field Gauge's position.
 * 
 *   Show Gauge?:
 *   - Decide if you want the gauge to be shown.
 * 
 *   Horizontal Length:
 *   - The length of the Field Gauge if placed horizontally.
 * 
 *   Vertical Length:
 *   - The length of the Field Gauge if placed vertically.
 * 
 *   Thickness:
 *   - The thickness of the Field Gauge for either direction.
 * 
 *   Split Location:
 *   - Determine where the gauge should split.
 *   - Use 0.00 for the start. Use 1.00 for the end.
 *
 * ---
 *
 * Marker Sprites
 * 
 *   Actor Marker Side:
 *   - Which side do you want the actor markers to appear?
 * 
 *   Enemy Marker Side:
 *   - Which side do you want the enemy markers to appear?
 * 
 *   Marker Offset:
 *   - How many pixels do you want to offset the markers by?
 * 
 *   Marker Size:
 *   - How pixels wide and tall do you want the markers to be?
 * 
 *   Marker Speed:
 *   - How many pixels maximum can a marker travel in one frame?
 * 
 *   Opacity Rate:
 *   - If a marker has to change opacity, how fast should it change by?
 *
 * ---
 *
 * Marker Border
 * 
 *   Show Border?:
 *   - Show borders for the marker sprites?
 * 
 *   Border Thickness:
 *   - How many pixels thick should the colored portion of the border be?
 * 
 *   Actors
 *   Enemies
 * 
 *     Border Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 *
 * ---
 *
 * Marker Sprites
 * 
 *   Actors
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the actor graphic.
 *     - Face Graphic - Show the actor's face.
 *     - Icon - Show a specified icon.
 *     - Sideview Actor - Show the actor's sideview battler.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for actors by default?
 * 
 *   Enemies
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the enemy graphic.
 *     - Face Graphic - Show a specified face graphic.
 *     - Icon - Show a specified icon.
 *     - Enemy - Show the enemy's graphic or sideview battler.
 * 
 *     Default Face Name:
 *     - Use this default face graphic if there is no specified face.
 * 
 *     Default Face Index:
 *     - Use this default face index if there is no specified index.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for enemies by default?
 * 
 *     Match Hue?:
 *     - Match the hue for enemy battlers?
 *     - Does not apply if there's a sideview battler.
 *
 * ---
 *
 * Marker Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the marker sprite?
 * 
 *   Font Name:
 *   - The font name used for the text of the Letter.
 *   - Leave empty to use the default game's font.
 * 
 *   Font Size:
 *   - The font size used for the text of the Letter.
 *
 * ---
 *
 * Marker Background
 * 
 *   Show Background?:
 *   - Show the background on the marker sprite?
 * 
 *   Actors
 *   Enemies
 * 
 *     Background Color 1:
 *     Background Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
 *
 * ---
 *
 * Marker Arrow
 * 
 *   Show Arrow?:
 *   - Show the arrow sprite pointing towards the Field Gauge?
 * 
 *   Arrow Skin:
 *   - Pick a window skin to draw arrows from.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Color Settings
 * ============================================================================
 *
 * Gauge color settings used for ATB Gauges.
 *
 * ---
 *
 * Colors
 * 
 *   Default Color 1:
 *   Default Color 2:
 *   Full Color 1:
 *   Full Color 2:
 *   Cast Color 1:
 *   Cast Color 2:
 *   Fast Color 1:
 *   Fast Color 2:
 *   Slow Color 1:
 *   Slow Color 2:
 *   Stop Color 1:
 *   Stop Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Settings
 * ============================================================================
 *
 * Options settings used for Battle System ATB.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the 'Show ATB Gauges' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
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
 * Version 1.08: November 22, 2020
 * * Feature Update!
 * ** ATB Interrupts will not clear all actions (including queued ones) for
 *    mechanical compatibility. Change made by Yanfly.
 * 
 * Version 1.07: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: November 1, 2020
 * * Documentation Update!
 * ** Help file updated with new features.
 * * New Features!
 * ** New Plugin Command by Irina!
 * *** Actor: Change Field Gauge Face
 * **** Changes the faces used for the specific actor(s) on the ATB
 *      Field Gauge.
 * 
 * Version 1.05: October 25, 2020
 * * Bug Fixes!
 * ** Plugin should now be compatible with older saves when changing to a save
 *    that didn't use a Field Gauge to one that does. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Feature Update!
 * ** <ATB Field Gauge Face: filename, index> notetag now works with actors.
 *    Update made by Irina.
 *
 * Version 1.04: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.03: October 11, 2020
 * * Documentation Update
 * ** Help file updated with new features.
 * * Feature Update!
 * ** Enemy letters are no longer drawn on the Field Gauge unless there are
 *    multiple enemies of the same type. Added by Arisu.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and Yanfly.
 * *** Plugin Parameters > Field Gauge > Offset X and Y
 * **** How much to offset the X/Y coordinates of the Field Gauge by.
 * 
 * Version 1.02: October 4, 2020
 * * New Features!
 * ** New Plugin Command added "System: ATB Field Gauge Visibility" to let you
 *    show or hide the Field Gauge during battle. Added by Arisu.
 * 
 * Version 1.01: September 27, 2020
 * * Bug Fixes!
 * ** ATB Cast and Charge notetags no longer cause crashes. Fix made by Olivia.
 * * New Features!
 * ** New plugin parameter added by Olivia.
 * *** Plugin Parameters > Mechanics > Stuns Reset Gauge?
 * **** Should stuns reset the ATB Gauge?
 *
 * Version 1.00: September 21, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeActorIcon
 * @text Actor: Change Field Gauge Icon
 * @desc Changes the icons used for the specific actor(s) on the ATB Field Gauge.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 84
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeActorFace
 * @text Actor: Change Field Gauge Face
 * @desc Changes the faces used for the specific actor(s) on the ATB Field Gauge.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeClearActorGraphic
 * @text Actor: Clear Field Gauge Graphic
 * @desc Clears the ATB Field Gauge graphics for the actor(s).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeEnemyIcon
 * @text Enemy: Change Field Gauge Icon
 * @desc Changes the icons used for the specific enemy(ies) on the ATB Field Gauge.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 298
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeEnemyFace
 * @text Enemy: Change Field Gauge Face
 * @desc Changes the faces used for the specific enemy(ies) on the ATB Field Gauge.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Monster
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeClearEnemyGraphic
 * @text Enemy: Clear Field Gauge Graphic
 * @desc Clears the ATB Field Gauge graphics for the enemy(ies).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemFieldGaugeVisibility
 * @text System: ATB Field Gauge Visibility
 * @desc Determine the visibility of the ATB Field Gauge.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the ATB Field Gauge.
 * @default true
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
 * @param BattleSystemATB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanics settings used for Battle System ATB.
 * @default {"General":"","EscapeFailPenalty:num":"-1.00","StunsResetGauge:eval":"false","JavaScript":"","InitialGaugeJS:str":"Math.random() * 0.5","TpbSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\n\\n// Process Calculation\\nlet speed = Math.sqrt(user.agi) + 1;\\n\\n// Return Value\\nreturn speed;\"","TpbBaseSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\nconst baseAgility = user.paramBasePlus(6);\\n\\n// Process Calculation\\nlet speed = Math.sqrt(baseAgility) + 1;\\n\\n// Return Value\\nreturn speed;\"","BattlerRelativeSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbSpeed()\\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\\n\\n// Process Calculation\\nlet relativeSpeed = speed / partyBaseSpeed;\\n\\n// Return Value\\nreturn relativeSpeed;\"","TpbAccelerationJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbRelativeSpeed();\\nconst referenceTime = $gameParty.tpbReferenceTime();\\n\\n// Process Calculation\\nlet acceleration = speed / referenceTime;\\n\\n// Return Value\\nreturn acceleration;\"","TpbCastTimeJS:func":"\"// Declare Constants\\nconst user = this;\\nconst actions = user._actions.filter(action => action.isValid());\\nconst items = actions.map(action => action.item());\\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\\n\\n// Process Calculation\\nlet time = Math.sqrt(delay) / user.tpbSpeed();\\n\\n// Return Value\\nreturn time;\""}
 *
 * @param Interrupt:struct
 * @text Interrupt Settings
 * @type struct<Interrupt>
 * @desc Interrupt settings used for Battle System ATB.
 * @default {"Interrupt":"","InterruptAnimationID:num":"11","InterruptMirror:eval":"false","InterruptMute:eval":"false","InterruptText:str":"INTERRUPTED!","InterruptTextColor:str":"0","InterruptFlashColor:eval":"[255, 0, 0, 160]","InterruptFlashDuration:num":"60"}
 *
 * @param Gauge:struct
 * @text General Gauge Settings
 * @type struct<Gauge>
 * @desc General gauge settings used for ATB Gauges.
 * @default {"General":"","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"2","AGIGaugeRates":"","SlowRate:num":"0.60","FastRate:num":"1.40","Actors":"","ShowActorGauge:eval":"true","ShowStatusGauge:eval":"false","Enemies":"","ShowEnemyGauge:eval":"true"}
 *
 * @param FieldGauge:struct
 * @text Field Gauge Settings
 * @type struct<FieldGauge>
 * @desc Make a field-wide ATB gauge for all the battlers.
 * @default {"General":"","UseFieldGauge:eval":"false","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","GaugeDirection:eval":"true","Gauge":"","GaugeSystemSkin:str":"","DrawGauge:eval":"true","GaugeLengthHorz:num":"600","GaugeLengthVert:num":"400","GaugeThick:num":"16","GaugeSplit:num":"0.70","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"48","Markers":"","ActorSide:eval":"true","EnemySide:eval":"false","MarkerOffset:num":"28","MarkerSize:num":"32","MarkerSpeed:num":"36","OpacityRate:num":"4","BorderThickness:num":"2","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"1","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"10","EnemyBgColor2:str":"18","EnemySystemBg:str":"","Arrow":"","ShowMarkerArrow:eval":"true","MarkerArrowWindowSkin:str":"Window"}
 *
 * @param Color:struct
 * @text Gauge Color Settings
 * @type struct<Color>
 * @desc Gauge color settings used for ATB Gauges.
 * @default {"default1:str":"26","default2:str":"27","full1:str":"14","full2:str":"6","cast1:str":"2","cast2:str":"10","fast1:str":"27","fast2:str":"18","slow1:str":"22","slow2:str":"23","stop1:str":"7","stop2:str":"8"}
 *
 * @param Options:struct
 * @text Options Settings
 * @type struct<Options>
 * @desc Options settings used for Battle System ATB.
 * @default {"Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Show ATB Gauges"}
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
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param General
 * 
 * @param EscapeFailPenalty:num
 * @text Escape Fail Penalty
 * @parent General
 * @desc Gauge penalty if an escape attempt fails.
 * @default -1.00
 *
 * @param StunsResetGauge:eval
 * @text Stuns Reset Gauge?
 * @parent General
 * @type boolean
 * @on Reset Gauge
 * @off Don't Reset
 * @desc Should stuns reset the ATB Gauge?
 * @default false
 *
 * @param JavaScript
 *
 * @param InitialGaugeJS:str
 * @text JS: Initial Gauge
 * @parent JavaScript
 * @desc JavaScript code to determine how much ATB gauge to give
 * each battler at the start of battle.
 * @default Math.random() * 0.5
 *
 * @param TpbSpeedCalcJS:func
 * @text JS: Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much speed a battler has.
 * @default "// Declare Constants\nconst user = this;\n\n// Process Calculation\nlet speed = Math.sqrt(user.agi) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param TpbBaseSpeedCalcJS:func
 * @text JS: Base Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much base speed a battler has.
 * @default "// Declare Constants\nconst user = this;\nconst baseAgility = user.paramBasePlus(6);\n\n// Process Calculation\nlet speed = Math.sqrt(baseAgility) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param BattlerRelativeSpeedJS:func
 * @text JS: Relative Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine what is the relative speed of a battler.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbSpeed()\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\n\n// Process Calculation\nlet relativeSpeed = speed / partyBaseSpeed;\n\n// Return Value\nreturn relativeSpeed;"
 * 
 * @param TpbAccelerationJS:func
 * @text JS: Acceleration
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much gauges accelerate by relative to reference time.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbRelativeSpeed();\nconst referenceTime = $gameParty.tpbReferenceTime();\n\n// Process Calculation\nlet acceleration = speed / referenceTime;\n\n// Return Value\nreturn acceleration;"
 * 
 * @param TpbCastTimeJS:func
 * @text JS: Cast Time
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much cast time is used for skills/items with negative speed modifiers.
 * @default "// Declare Constants\nconst user = this;\nconst actions = user._actions.filter(action => action.isValid());\nconst items = actions.map(action => action.item());\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\n\n// Process Calculation\nlet time = Math.sqrt(delay) / user.tpbSpeed();\n\n// Return Value\nreturn time;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Interrupt Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Interrupt:
 *
 * @param Interrupt
 *
 * @param InterruptAnimationID:num
 * @text Animation ID
 * @parent Interrupt
 * @type animation
 * @desc Play this animation when a unit is interrupted.
 * Requires VisuMZ_0_CoreEngine.
 * @default 11
 *
 * @param InterruptMirror:eval
 * @text Mirror Animation
 * @parent InterruptAnimationID:num
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the interrupt animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param InterruptMute:eval
 * @text Mute Animation
 * @parent InterruptAnimationID:num
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the interrupt animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param InterruptText:str
 * @text Text Popup
 * @parent Interrupt
 * @desc Text used for popup when interrupts happen.
 * Leave empty for no popup.
 * @default INTERRUPTED!
 *
 * @param InterruptTextColor:str
 * @text Text Color
 * @parent InterruptText:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param InterruptFlashColor:eval
 * @text Flash Color
 * @parent InterruptText:str
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param InterruptFlashDuration:num
 * @text Flash Duration
 * @parent InterruptText:str
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param General
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent General
 * @desc Where do you want the ATB Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent General
 * @desc Where do you want the ATB Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent General
 * @desc How large/small do you want the ATB Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent General
 * @desc How many pixels to offset the ATB Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent General
 * @desc How many pixels to offset the ATB Gauge's Y by?
 * @default 2
 *
 * @param AGIGaugeRates
 * @text AGI Gauge Rates
 *
 * @param SlowRate:num
 * @text Slow Rate
 * @parent AGIGaugeRates
 * @desc How much should the AGI rate be at to be considered slow?
 * @default 0.60
 *
 * @param FastRate:num
 * @text Fast Rate
 * @parent AGIGaugeRates
 * @desc How much should the AGI rate be at to be considered fast?
 * @default 1.40
 *
 * @param Actors
 *
 * @param ShowActorGauge:eval
 * @text Show Sprite Gauges
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges over the actor sprites' heads?
 * Requires SV Actors to be visible.
 * @default true
 *
 * @param ShowStatusGauge:eval
 * @text Show Status Gauges
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges in the status window?
 * Applies only to sideview.
 * @default false
 *
 * @param Enemies
 *
 * @param ShowEnemyGauge:eval
 * @text Show Sprite Gauges
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges over the enemy sprites' heads?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param default1:str
 * @text Default Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param default2:str
 * @text Default Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param full1:str
 * @text Full Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param full2:str
 * @text Full Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param cast1:str
 * @text Cast Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param cast2:str
 * @text Cast Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 10
 *
 * @param fast1:str
 * @text Fast Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param fast2:str
 * @text Fast Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param slow1:str
 * @text Slow Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param slow2:str
 * @text Slow Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param stop1:str
 * @text Stop Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param stop2:str
 * @text Stop Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 */
/* ----------------------------------------------------------------------------
 * Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show ATB Gauges' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show ATB Gauges
 *
 */
/* ----------------------------------------------------------------------------
 * Field Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~FieldGauge:
 *
 * @param General
 *
 * @param UseFieldGauge:eval
 * @text Use Field Gauge?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc This value must be set to true in order for the ATB Field Gauge to appear.
 * @default false
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Field Gauge will appear on the screen.
 * @default top
 * 
 * @param DisplayOffsetX:num
 * @text Offset X
 * @parent DisplayPosition:str
 * @desc How much to offset the X coordinate by.
 * Negative: left. Positive: right.
 * @default 0
 * 
 * @param DisplayOffsetY:num
 * @text Offset Y
 * @parent DisplayPosition:str
 * @desc How much to offset the Y coordinate by.
 * Negative: up. Positive: down.
 * @default 0
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * gauge when the help window is open?
 * @default true
 *
 * @param GaugeDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Up to Down
 * @off Right to Left / Down to Up
 * @desc Decide on the direction of the Field Gauge.
 * Settings may vary depending on position.
 * @default true
 *
 * @param Gauge
 * @text Field Gauge Settings
 *
 * @param GaugeSystemSkin:str
 * @text Gauge Skin
 * @parent Gauge
 * @type file
 * @dir img/system/
 * @desc Optional. Select an image to place behind the gauge.
 * This will be centered on the Field Gauge's position.
 * @default 
 *
 * @param DrawGauge:eval
 * @text Show Gauge?
 * @parent Gauge
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Decide if you want the gauge to be shown.
 * @default true
 *
 * @param GaugeLengthHorz:num
 * @text Horizontal Length
 * @parent Gauge
 * @type number
 * @min 10
 * @desc The length of the Field Gauge if placed horizontally.
 * @default 600
 *
 * @param GaugeLengthVert:num
 * @text Vertical Length
 * @parent Gauge
 * @type number
 * @min 10
 * @desc The length of the Field Gauge if placed vertically.
 * @default 400
 *
 * @param GaugeThick:num
 * @text Thickness
 * @parent Gauge
 * @type number
 * @min 3
 * @desc The thickness of the Field Gauge for either direction.
 * @default 16
 *
 * @param GaugeSplit:num
 * @text Split Location
 * @parent Gauge
 * @desc Determine where the gauge should split.
 * Use 0.00 for the start. Use 1.00 for the end.
 * @default 0.70
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the gauge's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the gauge's Y coordinates by this much when
 * the Help Window is visible.
 * @default 48
 *
 * @param Markers
 * @text Marker Sprites
 *
 * @param ActorSide:eval
 * @text Actor Marker Side
 * @parent Markers
 * @type boolean
 * @on Top / Right
 * @off Bottom / Left
 * @desc Which side do you want the actor markers to appear?
 * @default true
 *
 * @param EnemySide:eval
 * @text Enemy Marker Side
 * @parent Markers
 * @type boolean
 * @on Top / Right
 * @off Bottom / Left
 * @desc Which side do you want the enemy markers to appear?
 * @default false
 *
 * @param MarkerOffset:num
 * @text Marker Offset
 * @parent Markers
 * @desc How many pixels do you want to offset the markers by?
 * @default 28
 *
 * @param MarkerSize:num
 * @text Marker Size
 * @parent Markers
 * @type number
 * @min 10
 * @desc How pixels wide and tall do you want the markers to be?
 * @default 32
 *
 * @param MarkerSpeed:num
 * @text Marker Speed
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels maximum can a marker travel in one frame?
 * @default 36
 *
 * @param OpacityRate:num
 * @text Opacity Rate
 * @parent Markers
 * @type number
 * @min 1
 * @desc If a marker has to change opacity, how fast should it change by?
 * @default 4
 *
 * @param Border
 * @text Marker Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the marker sprites?
 * @default true
 *
 * @param BorderThickness:num
 * @text Border Thickness
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels thick should the colored portion of the border be?
 * @default 2
 *
 * @param BorderActor
 * @text Actors
 * @parent Border
 *
 * @param ActorBorderColor:str
 * @text Border Color
 * @parent BorderActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param BorderEnemy
 * @text Enemies
 * @parent Border
 *
 * @param EnemyBorderColor:str
 * @text Border Color
 * @parent BorderEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param Sprite
 * @text Marker Sprites
 *
 * @param ActorSprite
 * @text Actors
 * @parent Sprite
 *
 * @param ActorBattlerType:str
 * @text Sprite Type
 * @parent ActorSprite
 * @type select
 * @option Face Graphic - Show the actor's face.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Sideview Actor - Show the actor's sideview battler.
 * @value svactor
 * @desc Select the type of sprite used for the actor graphic.
 * @default face
 *
 * @param ActorBattlerIcon:num
 * @text Default Icon
 * @parent ActorSprite
 * @desc Which icon do you want to use for actors by default?
 * @default 84
 *
 * @param EnemySprite
 * @text Enemies
 * @parent Sprite
 *
 * @param EnemyBattlerType:str
 * @text Sprite Type
 * @parent EnemySprite
 * @type select
 * @option Face Graphic - Show a specified face graphic.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Enemy - Show the enemy's graphic or sideview battler.
 * @value enemy
 * @desc Select the type of sprite used for the enemy graphic.
 * @default enemy
 *
 * @param EnemyBattlerFaceName:str
 * @text Default Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc Use this default face graphic if there is no specified face.
 * @default Monster
 *
 * @param EnemyBattlerFaceIndex:num
 * @text Default Face Index
 * @parent EnemySprite
 * @type number
 * @desc Use this default face index if there is no specified index.
 * @default 1
 *
 * @param EnemyBattlerIcon:num
 * @text Default Icon
 * @parent EnemySprite
 * @desc Which icon do you want to use for enemies by default?
 * @default 298
 *
 * @param EnemyBattlerMatchHue:eval
 * @text Match Hue?
 * @parent EnemySprite
 * @type boolean
 * @on Match
 * @off Don't Match
 * @desc Match the hue for enemy battlers?
 * Does not apply if there's a sideview battler.
 * @default true
 *
 * @param Letter
 * @text Marker Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the marker sprite?
 * @default true
 *
 * @param EnemyBattlerFontFace:str
 * @text Font Name
 * @parent Letter
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param EnemyBattlerFontSize:num
 * @text Font Size
 * @parent Letter
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 * @param Background
 * @text Marker Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the marker sprite?
 * @default true
 *
 * @param BackgroundActor
 * @text Actors
 * @parent Background
 *
 * @param ActorBgColor1:str
 * @text Background Color 1
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 1
 *
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param BackgroundEnemy
 * @text Enemies
 * @parent Background
 *
 * @param EnemyBgColor1:str
 * @text Background Color 1
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 10
 *
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 * @param Arrow
 * @text Marker Arrow
 *
 * @param ShowMarkerArrow:eval
 * @text Show Arrow?
 * @parent Arrow
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the arrow sprite pointing towards the Field Gauge?
 * @default true
 *
 * @param MarkerArrowWindowSkin:str
 * @text Arrow Skin
 * @parent Arrow
 * @type file
 * @dir img/system/
 * @desc Pick a window skin to draw arrows from.
 * @default Window
 *
 */
//=============================================================================

const _0x1daf=['Color','createAllWindows','icon','skills','Game_Action_applyGlobal','hgshw','MZtSf','Game_Battler_tpbRequiredCastTime','ConfigManager_makeData','wTfZn','setAtbAfterSpeed','_letterSprite','ActorBattlerIcon','GaugeDirection','_homeY','Aggro','battler','After','registerCommand','stop','stop%1','AnchorX','sort','_scene','iiIJU','GaugeSystemSkin','snzje','addBattleSystemATBCommands','fast','ARRAYJSON','ARRAYSTR','applyTpbPenalty','EnemyBattlerFaceName','AnchorY','abs','updateMain','Cast','traitObjects','_index','UseFieldGauge','isBattleSystemATBFieldGaugeVisible','Charge','left','charging','currentValue','ctGaugeColor1','bihBj','bitmap','#000000','%1Side','updateGraphic','DrawGauge','XAcic','targetOpacity','blt','getChildIndex','EnemyBattlerIcon','EVAL','_graphicType','InterruptFlashColor','initTpbChargeTimeATB','fast%1','Weapon-%1-%2','VisuMZ_2_BattleSystemCTB','MarkerSize','InterruptMute','TpbAccelerationJS','InterruptText','constructor','RepositionTopHelpX','ARRAYSTRUCT','battlerName','Sprite_Gauge_gaugeColor1','applyGlobalBattleSystemATBEffects','AddOption','isGaugeHorizontal','cast','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','createAtbGaugeSprite','Enemies','changeFaceGraphicBitmap','reduce','_fieldAtbGaugeFaceName','_blendColor','_atbAfterSpeed','OffsetY','FastRate','process_VisuMZ_BattleSystemATB_JS_Notetags','changeAtbCastTime','%1BorderColor','makeDeepCopy','addChildAt','process_VisuMZ_BattleSystemATB_CreateRegExp','createGaugeSprite','uEwPz','GaugeLengthVert','lSyJo','GgwGO','Actor','FieldGaugeEnemyIcon','Sprite_Battler_updateMain','updatePositionOffset','mPoWM','slow','isEnemy','VisuMZ_1_BattleCore','ParseAllNotetags','opacity','Sprite_Gauge_currentValue','faceName','battlerHue','FieldGaugeActorFace','OffsetX','includes','currentAction','EnemyBattlerFaceIndex','changeAtbChargeTime','EiEMy','faceWidth','ceil','MarkerSpeed','_fieldAtbGaugeGraphicType','Enemy','HEBFW','default%1','createBattlerContainer','iconHeight','default','max','VisibleGauge','speed','createBattlerSprite','_tpbChargeTime','updateAtbGaugeSpritePosition','_gaugeSprite','face','_graphicFaceName','createJS','updateGraphicHue','_battler','updateSelectionEffect','setupArrowSprite','Window_Help_setItem','Parse_Notetags_CreateJS','IconIndex','ActorBattlerType','Skill-%1-%2','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Enemy-%1-%2','ANprq','DisplayOffsetY','_windowLayer','Sprite_Gauge_gaugeColor2','fieldAtbGraphicFaceName','FaceName','xnINa','ithCK','Settings','InterruptMirror','Sprite_Enemy_createStateIconSprite','clearActions','atbColor','fieldAtbGraphicType','(?:GAUGE|TIME|SPEED)','XOfOL','Scene_Battle_createAllWindows','right','_atbFieldGaugeVisible','Class-%1-%2','isAtbChargingState','GaugeThick','casting','_horz','Scene_Boot_onDatabaseLoaded','_tpbState','return\x200','initTpbChargeTime','setItem','isTpb','prototype','note','isActiveTpb','_homeX','YIYoS','FieldGaugeClearActorGraphic','trim','exit','create','Game_Battler_initTpbChargeTime','VisuMZ_2_AggroControlSystem','setAtbCastTime','height','cKClm','TKgYC','applyData','parameters','oBVGR','gaugeHeight','scale','ParseSkillNotetags','gaugeColor2','_fieldGaugeATB','ParseItemNotetags','createFieldGaugeSkin','pzLpR','cast%1','_subject','GsbjG','drawText','TpbBaseSpeedCalcJS','Name','isActor','Interrupt','%1SystemBorder','calcWindowHeight','createStateIconSprite','isSceneBattle','%1BgColor2','iconWidth','parse','Sprite_Gauge_currentMaxValue','BxYDv','atbActive','FXGFO','loadSystem','_graphicSprite','(?:ATB|TPB)','BattleManager_isActiveTpb','createFieldGaugeATB','round','anchor','tpbRelativeSpeed','onAtbInterrupt','slow%1','fillRect','createBorderSprite','Game_System_initialize','enemy','createFieldAtbGraphicType','_fieldGaugeATB_Container','Game_Battler_onRestrict','ShowMarkerArrow','concat','GaugeSplit','applyItemUserEffect','BattleSystemATB','InitialGaugeJS','QsnKS','isTZh','subject','clear','onRestrict','TpbSpeedCalcJS','ARRAYFUNC','ConfigManager_applyData','tpbSpeed','EnemyBattlerFontFace','boxWidth','atbStopped','createStateSprite','DisplayPosition','updateLetter','placeGauge','_statusType','AggroControlSystem','setFrame','processUpdateGraphic','_graphicSv','rfkBA','createFieldAtbGraphicFaceIndex','initialize','gaugeColor1','changeEnemyGraphicBitmap','tpbAcceleration','applyItemBattleSystemATBUserEffect','createGraphicSprite','gradientFillRect','battleUIOffsetX','createArrowSprite','uMzkj','AKaDS','BattlerRelativeSpeedJS','setHomeLocation','hasSvBattler','JSON','ShowMarkerBg','applyBattleSystemATBUserEffect','targetPositionOnGauge','loadEnemy','_unit','updateBattleContainerOrder','fieldAtbGraphicIconIndex','ebsiY','BmRAF','createKeyJS','ABRYJ','HKzdb','_letter','RegExp','State-%1-%2','createBattlerSprites','setupTextPopup','Window_Options_addGeneralOptions','hZfoi','EnemyBattlerType','changeSvActorGraphicBitmap','match','cast2','onDatabaseLoaded','svBattlerName','atbInterrupt','FieldGaugeActorIcon','Options','Scene_Options_maxCommands','%1BgColor1','toUpperCase','clearFieldAtbGraphics','drawGaugeBitmap','Dnrik','bind','_atbColors','isCTB','setBattler','loadSvEnemy','AdjustRect','isAtbCastingState','lfEJN','_backgroundSprite','TAoLz','atbAcceleration','ShowMarkerBorder','uIukQ','initBattleSystemATB','makeData','yenfP','fontFace','maxCommands','Gauge','createBackgroundSprite','YJfMF','Mechanics','currentMaxValue','SystemFieldGaugeVisibility','setupAtbGaugeSprite','loadSvActor','faceIndex','Sprite_Battler_setBattler','status','IconSet','lIyGF','mainFontFace','Item-%1-%2','createChildren','maxBattleMembers','RepositionTopHelpY','map','checkAggroControlSystemOffsetYAdjustment','atbGaugeColor','width','_graphicHue','STR','qVlHs','Game_Battler_tpbSpeed','setText','ShowEnemyGauge','createFieldAtbGraphicFaceName','addCommand','GwSfF','isSideView','children','OCfvs','loadWindowskin','InterruptFlashDuration','faceHeight','addLoadListener','boxHeight','tpbBaseSpeed','visualAtbGauge','filter','length','nPgVA','wIfew','ARRAYEVAL','cZuNn','loadFace','isRestricted','zzALQ','_helpWindow','paramRate','LuqAv','FieldGaugeEnemyFace','_fieldAtbGaugeIconIndex','FaceIndex','DzDKd','applyGlobal','PQJMI','addChild','setAtbChargeTime','atbCurrentValue','CnUdS','applyATBPenalty','updatePosition','top','isAttack','clearTpbChargeTime','Actors','clearRect','_atbGaugeSprite','TOMgI','Game_Battler_tpbBaseSpeed','Window_StatusBase_placeGauge','#%1','actor','textColor','tpbChargeTime','ehYoc','setup','StunsResetGauge','version','XbTYd','cast1','name','time','_plural','ojCII','_fieldAtbGaugeFaceIndex','IiFDa','showVisualAtbGauge','svactor','createEnemySprites','fieldAtbGraphicFaceIndex','MarkerOffset','atbSpeed','item','visible','Scale','createGaugeBitmap','_tpbCastTime','setBlendColor','_graphicFaceIndex','cmgUF','update','getColor','mAeXk','battleMembers','addBattleSystemATBShowGaugeCommand','floor','gKqdq','_onRestrictBypassAtbReset','_graphicIconIndex','initMembers','_skinSprite','createFieldAtbGraphicIconIndex','mBbkU','wcUUQ','MarkerArrowWindowSkin','call','gaugeBackColor','ConvertParams','isDead','Game_Battler_applyTpbPenalty','battleUIOffsetY','toLowerCase','RhGry','DqmQN','InterruptAnimationID','NUM','compareBattlerSprites','_battlerContainer','setBattleSystemATBFieldGaugeVisible','NncGz','full','tpbRequiredCastTime','ctGaugeColor2','sXgZY','Sprite_Actor_createStateSprite','ColorManager_loadWindowskin','RepositionTopForHelp','Game_Battler_tpbRelativeSpeed','ShowStatusGauge','updatePositionOnGauge','DisplayOffsetX','InterruptTextColor','setupBattleSystemATBColors','removeChild','EnemyBattlerFontSize','isATB','updateOpacity','ARRAYNUM','Visible','BattleCore','description','VisuMZ_0_CoreEngine','members','setHue','clamp','sQNOV','format','min','ugQVx','attackSpeed','isHidden','Game_Battler_clearTpbChargeTime','requestFauxAnimation','_graphicEnemy','hJJNf'];(function(_0x4fef44,_0x4cc8ca){const _0x1daf2b=function(_0x2c5177){while(--_0x2c5177){_0x4fef44['push'](_0x4fef44['shift']());}};_0x1daf2b(++_0x4cc8ca);}(_0x1daf,0xeb));const _0x2c51=function(_0x4fef44,_0x4cc8ca){_0x4fef44=_0x4fef44-0x127;let _0x1daf2b=_0x1daf[_0x4fef44];return _0x1daf2b;};const _0xd096ab=_0x2c51;var label=_0xd096ab(0x131),tier=tier||0x0,dependencies=[_0xd096ab(0x29f)],pluginData=$plugins[_0xd096ab(0x1b6)](function(_0x123c69){const _0x7252c5=_0xd096ab;return _0x123c69[_0x7252c5(0x197)]&&_0x123c69[_0x7252c5(0x227)][_0x7252c5(0x2a7)]('['+label+']');})[0x0];VisuMZ[label][_0xd096ab(0x2d3)]=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x3af0f0,_0x12869b){const _0x33f36e=_0xd096ab;for(const _0xc1588d in _0x12869b){if(_0x33f36e(0x1be)===_0x33f36e(0x187)){function _0x18d9e1(){return _0x3fb563['x']-_0x545cb6['x'];}}else{if(_0xc1588d[_0x33f36e(0x16e)](/(.*):(.*)/i)){const _0x44edac=String(RegExp['$1']),_0x38899a=String(RegExp['$2'])[_0x33f36e(0x177)]()[_0x33f36e(0x2ef)]();let _0x456c12,_0x1b1bac,_0x56923e;switch(_0x38899a){case _0x33f36e(0x20e):_0x456c12=_0x12869b[_0xc1588d]!==''?Number(_0x12869b[_0xc1588d]):0x0;break;case _0x33f36e(0x224):_0x1b1bac=_0x12869b[_0xc1588d]!==''?JSON[_0x33f36e(0x311)](_0x12869b[_0xc1588d]):[],_0x456c12=_0x1b1bac[_0x33f36e(0x19f)](_0x24b52e=>Number(_0x24b52e));break;case _0x33f36e(0x26f):_0x456c12=_0x12869b[_0xc1588d]!==''?eval(_0x12869b[_0xc1588d]):null;break;case _0x33f36e(0x1ba):_0x1b1bac=_0x12869b[_0xc1588d]!==''?JSON[_0x33f36e(0x311)](_0x12869b[_0xc1588d]):[],_0x456c12=_0x1b1bac[_0x33f36e(0x19f)](_0x57d30f=>eval(_0x57d30f));break;case _0x33f36e(0x158):_0x456c12=_0x12869b[_0xc1588d]!==''?JSON['parse'](_0x12869b[_0xc1588d]):'';break;case _0x33f36e(0x253):_0x1b1bac=_0x12869b[_0xc1588d]!==''?JSON[_0x33f36e(0x311)](_0x12869b[_0xc1588d]):[],_0x456c12=_0x1b1bac[_0x33f36e(0x19f)](_0x573fb1=>JSON['parse'](_0x573fb1));break;case'FUNC':_0x456c12=_0x12869b[_0xc1588d]!==''?new Function(JSON['parse'](_0x12869b[_0xc1588d])):new Function(_0x33f36e(0x2e5));break;case _0x33f36e(0x139):_0x1b1bac=_0x12869b[_0xc1588d]!==''?JSON[_0x33f36e(0x311)](_0x12869b[_0xc1588d]):[],_0x456c12=_0x1b1bac[_0x33f36e(0x19f)](_0x3e2a0c=>new Function(JSON[_0x33f36e(0x311)](_0x3e2a0c)));break;case _0x33f36e(0x1a4):_0x456c12=_0x12869b[_0xc1588d]!==''?String(_0x12869b[_0xc1588d]):'';break;case _0x33f36e(0x254):_0x1b1bac=_0x12869b[_0xc1588d]!==''?JSON['parse'](_0x12869b[_0xc1588d]):[],_0x456c12=_0x1b1bac[_0x33f36e(0x19f)](_0x4ac4d0=>String(_0x4ac4d0));break;case'STRUCT':_0x56923e=_0x12869b[_0xc1588d]!==''?JSON[_0x33f36e(0x311)](_0x12869b[_0xc1588d]):{},_0x456c12=VisuMZ[_0x33f36e(0x206)]({},_0x56923e);break;case _0x33f36e(0x27c):_0x1b1bac=_0x12869b[_0xc1588d]!==''?JSON['parse'](_0x12869b[_0xc1588d]):[],_0x456c12=_0x1b1bac[_0x33f36e(0x19f)](_0x5965b1=>VisuMZ[_0x33f36e(0x206)]({},JSON[_0x33f36e(0x311)](_0x5965b1)));break;default:continue;}_0x3af0f0[_0x44edac]=_0x456c12;}}}return _0x3af0f0;},(_0x3ba5e0=>{const _0x276f65=_0xd096ab,_0x5425a1=_0x3ba5e0['name'];for(const _0x164e22 of dependencies){if(!Imported[_0x164e22]){alert(_0x276f65(0x2c9)[_0x276f65(0x22d)](_0x5425a1,_0x164e22)),SceneManager[_0x276f65(0x2f0)]();break;}}const _0x4b04e5=_0x3ba5e0['description'];if(_0x4b04e5['match'](/\[Version[ ](.*?)\]/i)){const _0xd84130=Number(RegExp['$1']);_0xd84130!==VisuMZ[label][_0x276f65(0x1de)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x276f65(0x22d)](_0x5425a1,_0xd84130)),SceneManager[_0x276f65(0x2f0)]());}if(_0x4b04e5[_0x276f65(0x16e)](/\[Tier[ ](\d+)\]/i)){const _0x5943ef=Number(RegExp['$1']);if(_0x5943ef<tier){if(_0x276f65(0x199)!==_0x276f65(0x2cb))alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x276f65(0x22d)](_0x5425a1,_0x5943ef,tier)),SceneManager[_0x276f65(0x2f0)]();else{function _0x10864b(){const _0x547398=_0x276f65;if(_0x4f821a[_0x547398(0x275)]&&this['isCTB']())return![];return this['isTpb']();}}}else{if(_0x276f65(0x1f7)!==_0x276f65(0x1f7)){function _0x28e188(){const _0x512140=_0x276f65;_0x17adbc[_0x512140(0x131)][_0x512140(0x29a)]['call'](this),this[_0x512140(0x2bb)]();}}else tier=Math[_0x276f65(0x2b6)](_0x5943ef,tier);}}VisuMZ['ConvertParams'](VisuMZ[label][_0x276f65(0x2d3)],_0x3ba5e0[_0x276f65(0x2f9)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0xd096ab(0x1e1)],_0xd096ab(0x173),_0x23fe13=>{const _0x531a68=_0xd096ab;VisuMZ['ConvertParams'](_0x23fe13,_0x23fe13);const _0x55c0bc=_0x23fe13[_0x531a68(0x1d1)],_0x38ff02=_0x23fe13[_0x531a68(0x2c6)];for(const _0x419998 of _0x55c0bc){if(_0x531a68(0x23f)==='wTfZn'){const _0x3243cb=$gameActors[_0x531a68(0x1d8)](_0x419998);if(!_0x3243cb)continue;_0x3243cb[_0x531a68(0x2af)]=_0x531a68(0x238),_0x3243cb[_0x531a68(0x1c3)]=_0x38ff02;}else{function _0x388369(){const _0x5e603d=_0x531a68;return _0x5e603d(0x238);}}}}),PluginManager[_0xd096ab(0x248)](pluginData[_0xd096ab(0x1e1)],_0xd096ab(0x2a5),_0x141a24=>{const _0x2b79dc=_0xd096ab;VisuMZ[_0x2b79dc(0x206)](_0x141a24,_0x141a24);const _0x3ba172=_0x141a24[_0x2b79dc(0x1d1)],_0x21d085=_0x141a24[_0x2b79dc(0x2d0)],_0x3d5b2c=_0x141a24[_0x2b79dc(0x1c4)];for(const _0x404dfa of _0x3ba172){if(_0x2b79dc(0x1fb)!==_0x2b79dc(0x2d1)){const _0x24742a=$gameActors[_0x2b79dc(0x1d8)](_0x404dfa);if(!_0x24742a)continue;_0x24742a[_0x2b79dc(0x2af)]=_0x2b79dc(0x2bd),_0x24742a[_0x2b79dc(0x288)]=_0x21d085,_0x24742a[_0x2b79dc(0x1e5)]=_0x3d5b2c;}else{function _0x20a34b(){const _0x2105b9=_0x2b79dc;return _0x1596eb[_0x2105b9(0x131)][_0x2105b9(0x21a)][_0x2105b9(0x204)](this);}}}}),PluginManager[_0xd096ab(0x248)](pluginData[_0xd096ab(0x1e1)],_0xd096ab(0x2ee),_0x300e92=>{const _0x551801=_0xd096ab;VisuMZ[_0x551801(0x206)](_0x300e92,_0x300e92);const _0x4f592b=_0x300e92[_0x551801(0x1d1)];for(const _0x3b5e44 of _0x4f592b){const _0x181bcc=$gameActors[_0x551801(0x1d8)](_0x3b5e44);if(!_0x181bcc)continue;_0x181bcc[_0x551801(0x178)]();}}),PluginManager[_0xd096ab(0x248)](pluginData[_0xd096ab(0x1e1)],_0xd096ab(0x299),_0x288cb6=>{const _0x136193=_0xd096ab;VisuMZ[_0x136193(0x206)](_0x288cb6,_0x288cb6);const _0xccc2aa=_0x288cb6['Enemies'],_0x275885=_0x288cb6[_0x136193(0x2c6)];for(const _0x5ef214 of _0xccc2aa){const _0x37d554=$gameTroop[_0x136193(0x229)]()[_0x5ef214];if(!_0x37d554)continue;_0x37d554['_fieldAtbGaugeGraphicType']=_0x136193(0x238),_0x37d554['_fieldAtbGaugeIconIndex']=_0x275885;}}),PluginManager[_0xd096ab(0x248)](pluginData['name'],_0xd096ab(0x1c2),_0x574137=>{const _0x288eff=_0xd096ab;VisuMZ[_0x288eff(0x206)](_0x574137,_0x574137);const _0x9eda4e=_0x574137[_0x288eff(0x285)],_0x443a42=_0x574137[_0x288eff(0x2d0)],_0x629628=_0x574137[_0x288eff(0x1c4)];for(const _0x3a1461 of _0x9eda4e){const _0x22d250=$gameTroop[_0x288eff(0x229)]()[_0x3a1461];if(!_0x22d250)continue;_0x22d250[_0x288eff(0x2af)]=_0x288eff(0x2bd),_0x22d250[_0x288eff(0x288)]=_0x443a42,_0x22d250[_0x288eff(0x1e5)]=_0x629628;}}),PluginManager[_0xd096ab(0x248)](pluginData[_0xd096ab(0x1e1)],'FieldGaugeClearEnemyGraphic',_0x278486=>{const _0xfff09a=_0xd096ab;VisuMZ[_0xfff09a(0x206)](_0x278486,_0x278486);const _0x545054=_0x278486[_0xfff09a(0x285)];for(const _0x4981d4 of _0x545054){if(_0xfff09a(0x1f4)!==_0xfff09a(0x1f4)){function _0x1c1717(){const _0x49a0c1=_0xfff09a;this[_0x49a0c1(0x210)]&&this[_0x49a0c1(0x2bc)][_0x49a0c1(0x220)](this[_0x49a0c1(0x210)]),this[_0x49a0c1(0x210)]=new _0x4ac163(),this[_0x49a0c1(0x2bc)][_0x49a0c1(0x1c8)](this['_battlerContainer']),this[_0x49a0c1(0x168)]();}}else{const _0x529fea=$gameTroop[_0xfff09a(0x229)]()[_0x4981d4];if(!_0x529fea)continue;_0x529fea[_0xfff09a(0x178)]();}}}),PluginManager[_0xd096ab(0x248)](pluginData[_0xd096ab(0x1e1)],_0xd096ab(0x192),_0x323513=>{const _0x45a0e9=_0xd096ab;VisuMZ[_0x45a0e9(0x206)](_0x323513,_0x323513);const _0x1d5eab=_0x323513[_0x45a0e9(0x225)];$gameSystem[_0x45a0e9(0x211)](_0x1d5eab);}),VisuMZ['BattleSystemATB'][_0xd096ab(0x2e3)]=Scene_Boot[_0xd096ab(0x2e9)][_0xd096ab(0x170)],Scene_Boot[_0xd096ab(0x2e9)][_0xd096ab(0x170)]=function(){const _0x253211=_0xd096ab;this[_0x253211(0x292)](),VisuMZ[_0x253211(0x131)][_0x253211(0x2e3)][_0x253211(0x204)](this),this[_0x253211(0x28d)]();},VisuMZ[_0xd096ab(0x131)]['RegExp']={},Scene_Boot[_0xd096ab(0x2e9)][_0xd096ab(0x292)]=function(){const _0x503f2f=_0xd096ab,_0x157b15=VisuMZ[_0x503f2f(0x226)][_0x503f2f(0x166)],_0x2c24f='<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>',_0x697942=[_0x503f2f(0x25f),_0x503f2f(0x25a),_0x503f2f(0x247)];for(const _0x1964b9 of _0x697942){if('EjFuq'!=='EjFuq'){function _0xcff43e(){const _0x34b0b3=_0x503f2f,_0x4cceca=[_0x34b0b3(0x25f),_0x34b0b3(0x25a),_0x34b0b3(0x247)];for(const _0x3d56fd of _0x4cceca){_0x582a13[_0x34b0b3(0x131)][_0x34b0b3(0x2bf)](_0x4ecc5d,_0x3d56fd);}}}else{const _0x20abbe=_0x2c24f['format'](_0x1964b9[_0x503f2f(0x177)]()[_0x503f2f(0x2ef)](),_0x503f2f(0x318),_0x503f2f(0x2d9)),_0x5108e3=new RegExp(_0x20abbe,'i');VisuMZ[_0x503f2f(0x131)][_0x503f2f(0x166)][_0x1964b9]=_0x5108e3;}}},Scene_Boot[_0xd096ab(0x2e9)]['process_VisuMZ_BattleSystemATB_JS_Notetags']=function(){const _0x51da3d=_0xd096ab;if(VisuMZ[_0x51da3d(0x2a0)])return;const _0x182509=$dataSkills[_0x51da3d(0x12e)]($dataItems);for(const _0x45397a of _0x182509){if(_0x51da3d(0x2ab)!==_0x51da3d(0x2ab)){function _0x53821b(){const _0x22cd5d=_0x51da3d;_0x53addf+=this[_0x22cd5d(0x2c1)]['battleUIOffsetX']();}}else{if(!_0x45397a)continue;VisuMZ[_0x51da3d(0x131)][_0x51da3d(0x2c5)](_0x45397a);}}},VisuMZ[_0xd096ab(0x131)]['ParseSkillNotetags']=VisuMZ[_0xd096ab(0x2fd)],VisuMZ['ParseSkillNotetags']=function(_0x2d511e){const _0x103034=_0xd096ab;VisuMZ[_0x103034(0x131)][_0x103034(0x2fd)][_0x103034(0x204)](this,_0x2d511e),VisuMZ[_0x103034(0x131)][_0x103034(0x2c5)](_0x2d511e);},VisuMZ[_0xd096ab(0x131)][_0xd096ab(0x300)]=VisuMZ['ParseItemNotetags'],VisuMZ['ParseItemNotetags']=function(_0x2aba74){const _0x141ccc=_0xd096ab;VisuMZ[_0x141ccc(0x131)][_0x141ccc(0x300)][_0x141ccc(0x204)](this,_0x2aba74),VisuMZ[_0x141ccc(0x131)][_0x141ccc(0x2c5)](_0x2aba74);},VisuMZ[_0xd096ab(0x131)][_0xd096ab(0x2c5)]=function(_0x3c6a98){const _0x1a1ff2=_0xd096ab,_0x5bdab3=[_0x1a1ff2(0x25f),_0x1a1ff2(0x25a),_0x1a1ff2(0x247)];for(const _0x1a440b of _0x5bdab3){VisuMZ['BattleSystemATB'][_0x1a1ff2(0x2bf)](_0x3c6a98,_0x1a440b);}},VisuMZ[_0xd096ab(0x131)]['JS']={},VisuMZ[_0xd096ab(0x131)][_0xd096ab(0x2bf)]=function(_0x16fde9,_0x2faf68){const _0x1e0b87=_0xd096ab,_0x44f713=_0x16fde9[_0x1e0b87(0x2ea)];if(_0x44f713['match'](VisuMZ[_0x1e0b87(0x131)][_0x1e0b87(0x166)][_0x2faf68])){const _0x52ae69=String(RegExp['$1']),_0x4e0e1a=_0x1e0b87(0x283)[_0x1e0b87(0x22d)](_0x52ae69,_0x2faf68),_0x189b1e=VisuMZ['BattleSystemATB'][_0x1e0b87(0x162)](_0x16fde9,_0x2faf68);VisuMZ['BattleSystemATB']['JS'][_0x189b1e]=new Function(_0x4e0e1a);}},VisuMZ[_0xd096ab(0x131)][_0xd096ab(0x162)]=function(_0x167fc3,_0x3c4de6){const _0x5d40cf=_0xd096ab;let _0x3874cf='';if($dataActors[_0x5d40cf(0x2a7)](_0x167fc3))_0x3874cf='Actor-%1-%2'[_0x5d40cf(0x22d)](_0x167fc3['id'],_0x3c4de6);if($dataClasses[_0x5d40cf(0x2a7)](_0x167fc3))_0x3874cf=_0x5d40cf(0x2de)['format'](_0x167fc3['id'],_0x3c4de6);if($dataSkills['includes'](_0x167fc3))_0x3874cf=_0x5d40cf(0x2c8)[_0x5d40cf(0x22d)](_0x167fc3['id'],_0x3c4de6);if($dataItems[_0x5d40cf(0x2a7)](_0x167fc3))_0x3874cf=_0x5d40cf(0x19b)[_0x5d40cf(0x22d)](_0x167fc3['id'],_0x3c4de6);if($dataWeapons[_0x5d40cf(0x2a7)](_0x167fc3))_0x3874cf=_0x5d40cf(0x274)['format'](_0x167fc3['id'],_0x3c4de6);if($dataArmors[_0x5d40cf(0x2a7)](_0x167fc3))_0x3874cf='Armor-%1-%2'[_0x5d40cf(0x22d)](_0x167fc3['id'],_0x3c4de6);if($dataEnemies['includes'](_0x167fc3))_0x3874cf=_0x5d40cf(0x2ca)[_0x5d40cf(0x22d)](_0x167fc3['id'],_0x3c4de6);if($dataStates[_0x5d40cf(0x2a7)](_0x167fc3))_0x3874cf=_0x5d40cf(0x167)[_0x5d40cf(0x22d)](_0x167fc3['id'],_0x3c4de6);return _0x3874cf;},ConfigManager[_0xd096ab(0x1b5)]=!![],VisuMZ['BattleSystemATB'][_0xd096ab(0x23e)]=ConfigManager[_0xd096ab(0x189)],ConfigManager[_0xd096ab(0x189)]=function(){const _0x1b2adc=_0xd096ab,_0x3a1b51=VisuMZ[_0x1b2adc(0x131)]['ConfigManager_makeData']['call'](this);return _0x3a1b51['visualAtbGauge']=this['visualAtbGauge'],_0x3a1b51;},VisuMZ[_0xd096ab(0x131)][_0xd096ab(0x13a)]=ConfigManager[_0xd096ab(0x2f8)],ConfigManager[_0xd096ab(0x2f8)]=function(_0x22da58){const _0x48886f=_0xd096ab;VisuMZ['BattleSystemATB'][_0x48886f(0x13a)][_0x48886f(0x204)](this,_0x22da58);if('visualAtbGauge'in _0x22da58){if(_0x48886f(0x2ed)!==_0x48886f(0x18a))this[_0x48886f(0x1b5)]=_0x22da58[_0x48886f(0x1b5)];else{function _0x32d644(){const _0x13d884=_0x48886f,_0x47f7d5=_0x2302e1[_0x13d884(0x276)];_0x780a14[_0x13d884(0x265)]=new _0x1c083e(_0x47f7d5,_0x47f7d5);const _0x254f03=_0x33be00[_0x13d884(0x1f6)](_0x84ae9e['%1BgColor1'[_0x13d884(0x22d)](_0x385d17)]),_0x19383a=_0x3de175[_0x13d884(0x1f6)](_0x353551['%1BgColor2'[_0x13d884(0x22d)](_0x3d0bd4)]);_0x1324fd['bitmap'][_0x13d884(0x150)](0x0,0x0,_0x47f7d5,_0x47f7d5,_0x254f03,_0x19383a,!![]);}}}else this[_0x48886f(0x1b5)]=!![];},TextManager[_0xd096ab(0x1b5)]=VisuMZ[_0xd096ab(0x131)][_0xd096ab(0x2d3)][_0xd096ab(0x174)][_0xd096ab(0x308)],VisuMZ[_0xd096ab(0x131)][_0xd096ab(0x218)]=ColorManager[_0xd096ab(0x1af)],ColorManager[_0xd096ab(0x1af)]=function(){const _0x4896e8=_0xd096ab;VisuMZ['BattleSystemATB'][_0x4896e8(0x218)]['call'](this),this['_windowskin'][_0x4896e8(0x1b2)](this['setupBattleSystemATBColors'][_0x4896e8(0x17b)](this));},ColorManager[_0xd096ab(0x1f6)]=function(_0x1ba1d9){const _0x57840d=_0xd096ab;return _0x1ba1d9=String(_0x1ba1d9),_0x1ba1d9[_0x57840d(0x16e)](/#(.*)/i)?_0x57840d(0x1d7)[_0x57840d(0x22d)](String(RegExp['$1'])):this[_0x57840d(0x1d9)](Number(_0x1ba1d9));},ColorManager[_0xd096ab(0x21f)]=function(){const _0x4e3410=_0xd096ab,_0x59fcd1=[_0x4e3410(0x2b5),_0x4e3410(0x213),_0x4e3410(0x282),_0x4e3410(0x252),_0x4e3410(0x29d),_0x4e3410(0x249)],_0x5357a1=VisuMZ[_0x4e3410(0x131)]['Settings'][_0x4e3410(0x236)];this[_0x4e3410(0x17c)]={};for(const _0x3f858c of _0x59fcd1){for(let _0x4b0998=0x1;_0x4b0998<=0x2;_0x4b0998++){if(_0x4e3410(0x302)==='pzLpR'){const _0xd8d0ca=_0x3f858c+_0x4b0998;this[_0x4e3410(0x17c)][_0xd8d0ca]=this[_0x4e3410(0x1f6)](_0x5357a1[_0xd8d0ca]);}else{function _0x3aa3d2(){const _0x2d173f=_0x4e3410;return _0x2ba621[_0x2d173f(0x314)];}}}}},ColorManager['atbColor']=function(_0x1210cb){const _0x215de6=_0xd096ab;if(this[_0x215de6(0x17c)]===undefined)this[_0x215de6(0x21f)]();return this[_0x215de6(0x17c)][_0x1210cb]||_0x215de6(0x266);},SceneManager[_0xd096ab(0x30e)]=function(){const _0xa667a4=_0xd096ab;return this[_0xa667a4(0x24d)]&&this[_0xa667a4(0x24d)][_0xa667a4(0x27a)]===Scene_Battle;},BattleManager[_0xd096ab(0x222)]=function(){const _0x386fae=_0xd096ab;if(Imported['VisuMZ_2_BattleSystemCTB']&&this[_0x386fae(0x17d)]()){if(_0x386fae(0x20b)!==_0x386fae(0x20b)){function _0x30040f(){const _0x4e0deb=_0x386fae,_0x17e9d6=_0x471a84['Settings'],_0x342907=_0x17e9d6[_0x4e0deb(0x276)],_0x668095=this[_0x4e0deb(0x1f3)];this[_0x4e0deb(0x317)][_0x4e0deb(0x265)]=new _0x503532(_0x342907,_0x342907);const _0x420128=this[_0x4e0deb(0x317)]['bitmap'],_0x17db89=_0x12eb94[_0x4e0deb(0x2ac)],_0x2fe9de=_0x34474d[_0x4e0deb(0x1b1)],_0x2234ef=_0x175e84['faceWidth'],_0x44bea9=_0x4b44a7[_0x4e0deb(0x1b1)],_0x10e944=_0x668095%0x4*_0x17db89+(_0x17db89-_0x2234ef)/0x2,_0xc98871=_0x4620ab[_0x4e0deb(0x1fa)](_0x668095/0x4)*_0x2fe9de+(_0x2fe9de-_0x44bea9)/0x2;_0x420128[_0x4e0deb(0x26c)](_0x2fb214,_0x10e944,_0xc98871,_0x2234ef,_0x44bea9,0x0,0x0,_0x342907,_0x342907);}}else return![];}return this['isTpb']();},VisuMZ[_0xd096ab(0x131)][_0xd096ab(0x319)]=BattleManager[_0xd096ab(0x2eb)],BattleManager[_0xd096ab(0x2eb)]=function(){const _0x439664=_0xd096ab;if(!this[_0x439664(0x2e8)]()){if(_0x439664(0x160)===_0x439664(0x1ab)){function _0x56a142(){this['initialize'](...arguments);}}else return![];}else return ConfigManager&&ConfigManager['atbActive']!==undefined?ConfigManager[_0x439664(0x314)]:VisuMZ[_0x439664(0x131)][_0x439664(0x319)][_0x439664(0x204)](this);},VisuMZ[_0xd096ab(0x131)][_0xd096ab(0x128)]=Game_System[_0xd096ab(0x2e9)][_0xd096ab(0x14a)],Game_System[_0xd096ab(0x2e9)][_0xd096ab(0x14a)]=function(){const _0x36d439=_0xd096ab;VisuMZ[_0x36d439(0x131)][_0x36d439(0x128)][_0x36d439(0x204)](this),this['initBattleSystemATB']();},Game_System[_0xd096ab(0x2e9)][_0xd096ab(0x188)]=function(){const _0x3bd791=_0xd096ab;this[_0x3bd791(0x2dd)]=!![];},Game_System[_0xd096ab(0x2e9)][_0xd096ab(0x25e)]=function(){const _0x5276c9=_0xd096ab;return this['_atbFieldGaugeVisible']===undefined&&this[_0x5276c9(0x188)](),this[_0x5276c9(0x2dd)];},Game_System[_0xd096ab(0x2e9)]['setBattleSystemATBFieldGaugeVisible']=function(_0x509e8c){this['_atbFieldGaugeVisible']===undefined&&this['initBattleSystemATB'](),this['_atbFieldGaugeVisible']=_0x509e8c;},VisuMZ[_0xd096ab(0x131)]['Game_Action_applyItemUserEffect']=Game_Action[_0xd096ab(0x2e9)][_0xd096ab(0x130)],Game_Action['prototype'][_0xd096ab(0x130)]=function(_0x4fd9d6){const _0x64708c=_0xd096ab;VisuMZ[_0x64708c(0x131)]['Game_Action_applyItemUserEffect']['call'](this,_0x4fd9d6),this[_0x64708c(0x15a)](_0x4fd9d6);},Game_Action[_0xd096ab(0x2e9)]['applyBattleSystemATBUserEffect']=function(_0x326bbf){const _0x40cbc5=_0xd096ab;if(!SceneManager[_0x40cbc5(0x30e)]())return;if(!BattleManager[_0x40cbc5(0x222)]())return;if(this['item']())this[_0x40cbc5(0x14e)](_0x326bbf);},Game_Action['prototype'][_0xd096ab(0x14e)]=function(_0x3e34f1){const _0x2b29d6=_0xd096ab,_0x2c8d85=this[_0x2b29d6(0x1ed)]()[_0x2b29d6(0x2ea)];if(_0x3e34f1[_0x2b29d6(0x2df)]()){if('ybMPQ'===_0x2b29d6(0x1db)){function _0x28a38e(){const _0x1d74dd=_0x2b29d6,_0x1a07eb=this['actor']()[_0x1d74dd(0x2ea)];if(_0x1a07eb['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0xab2514(_0x4ff63a['$1']);return _0x438d63[_0x1d74dd(0x2d3)][_0x1d74dd(0x242)];}}else{const _0xb98293=VisuMZ[_0x2b29d6(0x131)][_0x2b29d6(0x162)](this[_0x2b29d6(0x1ed)](),_0x2b29d6(0x25f));if(VisuMZ[_0x2b29d6(0x131)]['JS'][_0xb98293]){if(_0x2b29d6(0x22f)===_0x2b29d6(0x1ae)){function _0x422530(){return![];}}else{const _0x180698=VisuMZ[_0x2b29d6(0x131)]['JS'][_0xb98293][_0x2b29d6(0x204)](this,this[_0x2b29d6(0x135)](),_0x3e34f1);_0x3e34f1[_0x2b29d6(0x1c9)](_0x180698);}}_0x2c8d85[_0x2b29d6(0x16e)](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x3e34f1[_0x2b29d6(0x1c9)](Number(RegExp['$1'])*0.01);if(_0x2c8d85[_0x2b29d6(0x16e)](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)){if(_0x2b29d6(0x2b1)==='HEBFW')_0x3e34f1[_0x2b29d6(0x2aa)](Number(RegExp['$1'])*0.01);else{function _0x3dc829(){const _0x5f5339=_0x2b29d6,_0x562612=_0x2d48a7[_0x5f5339(0x20d)],_0x264f35=_0x22a4f1[_0x5f5339(0x2d4)],_0x5169af=_0xd84e43['InterruptMute'];_0x488aa5[_0x5f5339(0x233)]([this],_0x562612,_0x264f35,_0x5169af);}}}}}else{if(_0x3e34f1[_0x2b29d6(0x181)]()){if(_0x2b29d6(0x153)===_0x2b29d6(0x153)){const _0x999fa5=VisuMZ[_0x2b29d6(0x131)][_0x2b29d6(0x162)](this[_0x2b29d6(0x1ed)](),'Cast');if(VisuMZ['BattleSystemATB']['JS'][_0x999fa5]){const _0x5f1fd3=VisuMZ[_0x2b29d6(0x131)]['JS'][_0x999fa5]['call'](this,this[_0x2b29d6(0x135)](),_0x3e34f1);_0x3e34f1['setAtbCastTime'](_0x5f1fd3);}_0x2c8d85[_0x2b29d6(0x16e)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x3e34f1[_0x2b29d6(0x2f4)](Number(RegExp['$1'])*0.01);if(_0x2c8d85[_0x2b29d6(0x16e)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)){if(_0x2b29d6(0x29c)==='yDYFW'){function _0x9af842(){const _0x38cc22=_0x2b29d6;this[_0x38cc22(0x288)]=this[_0x38cc22(0x1a9)]();}}else _0x3e34f1[_0x2b29d6(0x28e)](Number(RegExp['$1'])*0.01);}if(_0x2c8d85[_0x2b29d6(0x16e)](/<(?:ATB|TPB) INTERRUPT>/i)){if(_0x2b29d6(0x1b9)===_0x2b29d6(0x2f7)){function _0x515719(){const _0x59d721=_0x2b29d6;_0x1109b0[_0x59d721(0x206)](_0x4c8ba8,_0x2cfc81);const _0x38b485=_0x119d66[_0x59d721(0x225)];_0x35fc10[_0x59d721(0x211)](_0x38b485);}}else _0x3e34f1[_0x2b29d6(0x172)]();}}else{function _0x33627a(){const _0x1a1e6c=_0x2b29d6,_0x3112d5=this[_0x1a1e6c(0x246)]();if(!_0x3112d5)return;const _0x4cc531=_0x26c03b['Settings'],_0x5437e8=this[_0x1a1e6c(0x281)](),_0x4e84d6=this[_0x1a1e6c(0x15b)](),_0x4b4a71=_0x2c3ebc?_0x1b8d27:_0x4cc531[_0x1a1e6c(0x2ae)];if(_0x5437e8&&this['x']!==_0x4e84d6){if(this['x']>_0x4e84d6)this['x']=_0x1545c3[_0x1a1e6c(0x2b6)](_0x4e84d6,this['x']-_0x4b4a71);if(this['x']<_0x4e84d6)this['x']=_0x3eab7b[_0x1a1e6c(0x22e)](_0x4e84d6,this['x']+_0x4b4a71);}else{if(!_0x5437e8&&this['x']!==_0x4e84d6){if(this['y']>_0x4e84d6)this['y']=_0x1c8ad2[_0x1a1e6c(0x2b6)](_0x4e84d6,this['y']-_0x4b4a71);if(this['y']<_0x4e84d6)this['y']=_0x4ae46b['min'](_0x4e84d6,this['y']+_0x4b4a71);}}}}}}},VisuMZ['BattleSystemATB'][_0xd096ab(0x23a)]=Game_Action[_0xd096ab(0x2e9)][_0xd096ab(0x1c6)],Game_Action[_0xd096ab(0x2e9)][_0xd096ab(0x1c6)]=function(){const _0x310ce2=_0xd096ab;VisuMZ['BattleSystemATB'][_0x310ce2(0x23a)][_0x310ce2(0x204)](this),this[_0x310ce2(0x27f)]();},Game_Action['prototype'][_0xd096ab(0x27f)]=function(){const _0x1502ec=_0xd096ab;if(!this[_0x1502ec(0x1ed)]())return;if(!BattleManager['isATB']())return;const _0x26aafa=this[_0x1502ec(0x1ed)]()[_0x1502ec(0x2ea)];let _0x1afef7=0x0;this['_forcing']&&(_0x1afef7=this[_0x1502ec(0x135)]()[_0x1502ec(0x2ba)]);const _0x9824cb=VisuMZ[_0x1502ec(0x131)][_0x1502ec(0x162)](this[_0x1502ec(0x1ed)](),_0x1502ec(0x247));VisuMZ[_0x1502ec(0x131)]['JS'][_0x9824cb]&&(_0x1afef7+=VisuMZ[_0x1502ec(0x131)]['JS'][_0x9824cb][_0x1502ec(0x204)](this,this[_0x1502ec(0x135)](),this[_0x1502ec(0x135)]()));let _0x435492=this['item']()[_0x1502ec(0x2b8)]>0x0?this['item']()['speed']:0x0;if(this[_0x1502ec(0x1cf)]())_0x435492+=this[_0x1502ec(0x135)]()[_0x1502ec(0x230)]();_0x1afef7+=(_0x435492/0xfa0)[_0x1502ec(0x22b)](0x0,0x1);this['item']()['note'][_0x1502ec(0x16e)](/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x1afef7+=Number(RegExp['$1'])*0.01);const _0x46e1c3=this['subject']()[_0x1502ec(0x25b)]()[_0x1502ec(0x12e)](this[_0x1502ec(0x135)]()[_0x1502ec(0x239)]()),_0x600a54=/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x1e4ef2=_0x46e1c3[_0x1502ec(0x19f)](_0x3bccd7=>_0x3bccd7&&_0x3bccd7[_0x1502ec(0x2ea)]['match'](_0x600a54)?Number(RegExp['$1'])*0.01:0x0);_0x1afef7=_0x1e4ef2[_0x1502ec(0x287)]((_0x2a284a,_0x232937)=>_0x2a284a+_0x232937,_0x1afef7);if(this[_0x1502ec(0x1ed)]()[_0x1502ec(0x2ea)][_0x1502ec(0x16e)](/<(?:ATB|TPB) INSTANT>/i)){if(_0x1502ec(0x202)===_0x1502ec(0x202))_0x1afef7=0xa;else{function _0x4678d3(){const _0x523f83=_0x1502ec;_0x531761[_0x523f83(0x28e)](_0x52d6af(_0x367d78['$1'])*0.01);}}}this['subject']()[_0x1502ec(0x240)](_0x1afef7);},Game_BattlerBase[_0xd096ab(0x2e9)][_0xd096ab(0x1c9)]=function(_0x12b2ae){const _0x40cf48=_0xd096ab;this[_0x40cf48(0x2ba)]=_0x12b2ae[_0x40cf48(0x22b)](0x0,0x1);},Game_BattlerBase[_0xd096ab(0x2e9)][_0xd096ab(0x2aa)]=function(_0x66aba1){this['setAtbChargeTime'](this['_tpbChargeTime']+_0x66aba1);},Game_BattlerBase['prototype'][_0xd096ab(0x2f4)]=function(_0x3d9889){const _0x546b14=_0xd096ab,_0x576cc0=this[_0x546b14(0x214)]();this['_tpbCastTime']=(_0x576cc0*_0x3d9889)[_0x546b14(0x22b)](0x0,_0x576cc0);},Game_BattlerBase[_0xd096ab(0x2e9)][_0xd096ab(0x28e)]=function(_0x2ffcc1){const _0x3caecb=_0xd096ab,_0x3b3ffe=this[_0x3caecb(0x214)](),_0x5d4fde=_0x3b3ffe*_0x2ffcc1;this[_0x3caecb(0x1f1)]=(this[_0x3caecb(0x1f1)]+_0x5d4fde)['clamp'](0x0,_0x3b3ffe);},VisuMZ[_0xd096ab(0x131)][_0xd096ab(0x2f2)]=Game_Battler['prototype'][_0xd096ab(0x2e6)],Game_Battler['prototype']['initTpbChargeTime']=function(_0x1eabcb){const _0x1aba12=_0xd096ab;if(BattleManager[_0x1aba12(0x222)]()){if(_0x1aba12(0x297)!==_0x1aba12(0x297)){function _0x596619(){const _0x5b5509=_0x1aba12;_0x423af6=_0x4eb6c9-0x1,_0x39ff58=_0x311e52-0x3-_0x22b8ce,_0x2a9f28[_0x5b5509(0x150)](0x1,0x1,_0x391f4,_0x3c74df-0x2,_0x135526,_0x58c1d3,![]),_0x4b1bc3[_0x5b5509(0x150)](0x2+_0x4a2a38,0x1,_0x4957a0,_0x1b99f1-0x2,_0x13c49d,_0x7c0844,![]);}}else this[_0x1aba12(0x272)](_0x1eabcb);}else VisuMZ[_0x1aba12(0x131)][_0x1aba12(0x2f2)]['call'](this,_0x1eabcb);},Game_Battler[_0xd096ab(0x2e9)][_0xd096ab(0x272)]=function(_0x5142e6){const _0x1d6821=_0xd096ab,_0x50bcbc=VisuMZ[_0x1d6821(0x131)][_0x1d6821(0x2d3)]['Mechanics'];let _0x2e4318=this['tpbRelativeSpeed']()*eval(_0x50bcbc[_0x1d6821(0x132)]);const _0x5c4454=this[_0x1d6821(0x25b)]()[_0x1d6821(0x12e)](this[_0x1d6821(0x239)]()),_0x3e1bc5=/<(?:ATB|TPB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x16cbee=_0x5c4454[_0x1d6821(0x19f)](_0x5dc3be=>_0x5dc3be&&_0x5dc3be[_0x1d6821(0x2ea)][_0x1d6821(0x16e)](_0x3e1bc5)?Number(RegExp['$1'])*0.01:0x0);_0x2e4318=_0x16cbee['reduce']((_0x313f83,_0xace9a0)=>_0x313f83+_0xace9a0,_0x2e4318),this[_0x1d6821(0x2e4)]=_0x1d6821(0x261),this[_0x1d6821(0x2ba)]=(_0x5142e6?0x1:_0x2e4318)[_0x1d6821(0x22b)](0x0,0x1);if(this[_0x1d6821(0x1bd)]()){if('hZfoi'===_0x1d6821(0x16b))this[_0x1d6821(0x2ba)]=0x0;else{function _0x1509a4(){const _0x12035e=_0x1d6821;this['opacity']=_0x205903[_0x12035e(0x2b6)](_0xe1acb1,this[_0x12035e(0x2a1)]-_0x4155bd);}}}},Game_Battler[_0xd096ab(0x2e9)][_0xd096ab(0x2df)]=function(){const _0x571367=_0xd096ab;return this[_0x571367(0x2e4)]===_0x571367(0x261);},Game_Battler[_0xd096ab(0x2e9)][_0xd096ab(0x181)]=function(){const _0x27c06e=_0xd096ab;return this[_0x27c06e(0x2e4)]===_0x27c06e(0x2e1)&&this[_0x27c06e(0x2a8)]()&&this[_0x27c06e(0x2a8)]()['item']()&&this[_0x27c06e(0x2a8)]()[_0x27c06e(0x1ed)]()[_0x27c06e(0x2b8)]<0x0;},Game_BattlerBase[_0xd096ab(0x2e9)]['getAtbCastTimeRate']=function(){const _0x185347=_0xd096ab;return this[_0x185347(0x181)]()?this[_0x185347(0x1f1)]/this[_0x185347(0x214)]():0x0;},Game_Battler[_0xd096ab(0x2e9)][_0xd096ab(0x13e)]=function(){return!this['canMove']();},Game_Battler[_0xd096ab(0x2e9)][_0xd096ab(0x240)]=function(_0x50b820){const _0x1321f0=_0xd096ab;this[_0x1321f0(0x28a)]=_0x50b820;},VisuMZ[_0xd096ab(0x131)][_0xd096ab(0x232)]=Game_Battler[_0xd096ab(0x2e9)][_0xd096ab(0x1d0)],Game_Battler[_0xd096ab(0x2e9)][_0xd096ab(0x1d0)]=function(){const _0x5b1b92=_0xd096ab;if(this[_0x5b1b92(0x1fc)])return;VisuMZ[_0x5b1b92(0x131)][_0x5b1b92(0x232)]['call'](this),this['_tpbChargeTime']+=this[_0x5b1b92(0x28a)]||0x0;},Game_Battler['prototype']['atbInterrupt']=function(){const _0x43d996=_0xd096ab;if(!this['isAtbCastingState']())return;if(!this[_0x43d996(0x2a8)]())return;if(!this[_0x43d996(0x2a8)]()[_0x43d996(0x1ed)]())return;if(this[_0x43d996(0x2a8)]()[_0x43d996(0x1ed)]()[_0x43d996(0x2ea)][_0x43d996(0x16e)](/<(?:ATB|TPB) CANNOT (?:BE INTERRUPTED|INTERRUPT)>/i))return;this[_0x43d996(0x2d6)](),this[_0x43d996(0x1d0)](),this[_0x43d996(0x1f1)]=0x0,this['onAtbInterrupt']();},Game_Battler[_0xd096ab(0x2e9)][_0xd096ab(0x31e)]=function(){const _0x4008e1=_0xd096ab,_0x1dc206=VisuMZ[_0x4008e1(0x131)][_0x4008e1(0x2d3)]['Interrupt'];if(Imported[_0x4008e1(0x228)]){if('SqVZs'!=='qKHYK'){const _0x1dfaf0=_0x1dc206[_0x4008e1(0x20d)],_0x4fcf33=_0x1dc206[_0x4008e1(0x2d4)],_0xb7d7f4=_0x1dc206[_0x4008e1(0x277)];$gameTemp[_0x4008e1(0x233)]([this],_0x1dfaf0,_0x4fcf33,_0xb7d7f4);}else{function _0x21ae83(){const _0x4ddae6=_0xeb0a46['BattleSystemATB']['JS'][_0x36fd9e]['call'](this,this['subject'](),_0x3dea7a);_0x261f90['setAtbChargeTime'](_0x4ddae6);}}}if(this[_0x4008e1(0x246)]()&&_0x1dc206[_0x4008e1(0x279)][_0x4008e1(0x1b7)]>0x0){if(_0x4008e1(0x235)===_0x4008e1(0x235)){const _0x4db06c=_0x1dc206[_0x4008e1(0x279)],_0x3b26a5={'textColor':ColorManager[_0x4008e1(0x1f6)](_0x1dc206[_0x4008e1(0x21e)]),'flashColor':_0x1dc206[_0x4008e1(0x271)],'flashDuration':_0x1dc206[_0x4008e1(0x1b0)]};this['setupTextPopup'](_0x4db06c,_0x3b26a5);}else{function _0x469d6b(){_0x5640c2=_0x15fe46*_0x297959;}}}},VisuMZ['BattleSystemATB']['Game_Battler_onRestrict']=Game_Battler[_0xd096ab(0x2e9)]['onRestrict'],Game_Battler[_0xd096ab(0x2e9)][_0xd096ab(0x137)]=function(){const _0x2c1243=_0xd096ab;!VisuMZ['BattleSystemATB'][_0x2c1243(0x2d3)][_0x2c1243(0x190)][_0x2c1243(0x1dd)]&&(this[_0x2c1243(0x1fc)]=BattleManager[_0x2c1243(0x222)]()),VisuMZ[_0x2c1243(0x131)][_0x2c1243(0x12c)][_0x2c1243(0x204)](this),this[_0x2c1243(0x1fc)]=undefined;},VisuMZ[_0xd096ab(0x131)][_0xd096ab(0x208)]=Game_Battler[_0xd096ab(0x2e9)][_0xd096ab(0x255)],Game_Battler[_0xd096ab(0x2e9)][_0xd096ab(0x255)]=function(){const _0x1456ac=_0xd096ab;if(BattleManager[_0x1456ac(0x222)]())this[_0x1456ac(0x1cc)]();else{if(_0x1456ac(0x182)==='GiODZ'){function _0x4d29a9(){const _0x54f23b=_0x1456ac;this[_0x54f23b(0x1c9)](this[_0x54f23b(0x2ba)]+_0x2f40da);}}else VisuMZ[_0x1456ac(0x131)][_0x1456ac(0x208)][_0x1456ac(0x204)](this);}},Game_Battler[_0xd096ab(0x2e9)][_0xd096ab(0x1cc)]=function(){const _0x27adfa=_0xd096ab;this[_0x27adfa(0x2e4)]=_0x27adfa(0x261),this['_tpbChargeTime']+=VisuMZ[_0x27adfa(0x131)][_0x27adfa(0x2d3)][_0x27adfa(0x190)]['EscapeFailPenalty']||0x0;},VisuMZ[_0xd096ab(0x131)][_0xd096ab(0x1a6)]=Game_Battler[_0xd096ab(0x2e9)]['tpbSpeed'],Game_Battler[_0xd096ab(0x2e9)][_0xd096ab(0x13b)]=function(){const _0x486615=_0xd096ab;if(BattleManager['isATB']())return VisuMZ[_0x486615(0x131)]['Settings']['Mechanics'][_0x486615(0x138)][_0x486615(0x204)](this,this);else{if(_0x486615(0x1c5)!==_0x486615(0x26a))return VisuMZ['BattleSystemATB'][_0x486615(0x1a6)][_0x486615(0x204)](this);else{function _0x4fe41a(){const _0x2923fa=_0x486615;this[_0x2923fa(0x1e9)](),this['createActorSprites']();}}}},VisuMZ[_0xd096ab(0x131)][_0xd096ab(0x1d5)]=Game_Battler['prototype']['tpbBaseSpeed'],Game_Battler[_0xd096ab(0x2e9)][_0xd096ab(0x1b4)]=function(){const _0x2c3036=_0xd096ab;if(BattleManager[_0x2c3036(0x222)]())return VisuMZ[_0x2c3036(0x131)][_0x2c3036(0x2d3)]['Mechanics'][_0x2c3036(0x307)][_0x2c3036(0x204)](this,this);else{if(_0x2c3036(0x184)===_0x2c3036(0x184))return VisuMZ[_0x2c3036(0x131)][_0x2c3036(0x1d5)][_0x2c3036(0x204)](this);else{function _0x3f1c8f(){const _0x5bd6af=_0x2c3036,_0x58042d=_0x5f4930[_0x5bd6af(0x279)],_0x1626b2={'textColor':_0x394c5d[_0x5bd6af(0x1f6)](_0x37538c[_0x5bd6af(0x21e)]),'flashColor':_0xd8b3cf[_0x5bd6af(0x271)],'flashDuration':_0x465fc1[_0x5bd6af(0x1b0)]};this[_0x5bd6af(0x169)](_0x58042d,_0x1626b2);}}}},VisuMZ['BattleSystemATB'][_0xd096ab(0x21a)]=Game_Battler[_0xd096ab(0x2e9)][_0xd096ab(0x31d)],Game_Battler[_0xd096ab(0x2e9)][_0xd096ab(0x31d)]=function(){const _0x44b2ba=_0xd096ab;if(BattleManager['isATB']())return VisuMZ[_0x44b2ba(0x131)]['Settings'][_0x44b2ba(0x190)][_0x44b2ba(0x155)][_0x44b2ba(0x204)](this,this);else{if(_0x44b2ba(0x216)!==_0x44b2ba(0x1df))return VisuMZ['BattleSystemATB'][_0x44b2ba(0x21a)]['call'](this);else{function _0x5f3948(){this['setText'](_0x5d609c(_0x24b00b['$1']));}}}},VisuMZ[_0xd096ab(0x131)]['Game_Battler_tpbAcceleration']=Game_Battler[_0xd096ab(0x2e9)][_0xd096ab(0x14d)],Game_Battler[_0xd096ab(0x2e9)]['tpbAcceleration']=function(){const _0x9ef974=_0xd096ab;if(BattleManager['isATB']())return this[_0x9ef974(0x185)]();else{if(_0x9ef974(0x18f)!==_0x9ef974(0x1cb))return VisuMZ[_0x9ef974(0x131)]['Game_Battler_tpbAcceleration'][_0x9ef974(0x204)](this);else{function _0x2181a2(){const _0x121b6a=_0x9ef974;this['_skinSprite']=new _0x35f2f8(),this['_skinSprite'][_0x121b6a(0x31c)]['x']=0.5,this[_0x121b6a(0x1ff)]['anchor']['y']=0.5,this[_0x121b6a(0x1c8)](this[_0x121b6a(0x1ff)]);const _0xad6c84=_0x27c429[_0x121b6a(0x2d3)][_0x121b6a(0x24f)];if(_0xad6c84)this[_0x121b6a(0x1ff)]['bitmap']=_0x48363c[_0x121b6a(0x316)](_0xad6c84);}}}},Game_Battler[_0xd096ab(0x2e9)][_0xd096ab(0x185)]=function(){const _0xe82658=_0xd096ab;let _0x539974=VisuMZ[_0xe82658(0x131)][_0xe82658(0x2d3)]['Mechanics'][_0xe82658(0x278)][_0xe82658(0x204)](this,this);if(ConfigManager&&ConfigManager[_0xe82658(0x1ec)]!==undefined){const _0x41dfbd=ConfigManager['atbSpeed']-0x3;if(_0x41dfbd>0x0)return _0x539974*(_0x41dfbd*0x2);else{if(_0x41dfbd<0x0)return _0x539974*(0x1/(_0x41dfbd*-0x2));}}return _0x539974;},VisuMZ['BattleSystemATB'][_0xd096ab(0x23d)]=Game_Battler[_0xd096ab(0x2e9)]['tpbRequiredCastTime'],Game_Battler[_0xd096ab(0x2e9)]['tpbRequiredCastTime']=function(){const _0x16cc44=_0xd096ab;if(BattleManager[_0x16cc44(0x222)]()){if(_0x16cc44(0x148)!=='rfkBA'){function _0x16cdd9(){const _0xd34439=_0x16cc44;return this[_0xd34439(0x146)]();}}else return VisuMZ[_0x16cc44(0x131)][_0x16cc44(0x2d3)][_0x16cc44(0x190)]['TpbCastTimeJS'][_0x16cc44(0x204)](this,this);}else return VisuMZ['BattleSystemATB'][_0x16cc44(0x23d)][_0x16cc44(0x204)](this);},VisuMZ[_0xd096ab(0x131)]['Scene_Options_maxCommands']=Scene_Options[_0xd096ab(0x2e9)]['maxCommands'],Scene_Options['prototype'][_0xd096ab(0x18c)]=function(){const _0x31a7b2=_0xd096ab;let _0x311ed8=VisuMZ[_0x31a7b2(0x131)][_0x31a7b2(0x175)]['call'](this);const _0x14fc21=VisuMZ[_0x31a7b2(0x131)][_0x31a7b2(0x2d3)];if(_0x14fc21[_0x31a7b2(0x174)][_0x31a7b2(0x280)]&&_0x14fc21[_0x31a7b2(0x174)][_0x31a7b2(0x180)]&&BattleManager[_0x31a7b2(0x222)]())_0x311ed8++;return _0x311ed8;},Sprite_Battler[_0xd096ab(0x2e9)][_0xd096ab(0x284)]=function(){const _0x18b2ef=_0xd096ab;if(!BattleManager[_0x18b2ef(0x222)]())return;if(!ConfigManager[_0x18b2ef(0x1b5)])return;const _0x79574b=VisuMZ[_0x18b2ef(0x131)][_0x18b2ef(0x2d3)]['Gauge'],_0x2a8f06=new Sprite_Gauge();_0x2a8f06[_0x18b2ef(0x31c)]['x']=_0x79574b[_0x18b2ef(0x24b)],_0x2a8f06[_0x18b2ef(0x31c)]['y']=_0x79574b['AnchorY'],_0x2a8f06[_0x18b2ef(0x2fc)]['x']=_0x2a8f06['scale']['y']=_0x79574b[_0x18b2ef(0x1ef)],this[_0x18b2ef(0x1d3)]=_0x2a8f06,this[_0x18b2ef(0x1c8)](this[_0x18b2ef(0x1d3)]);},VisuMZ[_0xd096ab(0x131)][_0xd096ab(0x196)]=Sprite_Battler[_0xd096ab(0x2e9)]['setBattler'],Sprite_Battler[_0xd096ab(0x2e9)][_0xd096ab(0x17e)]=function(_0x331c2c){const _0x18f3d6=_0xd096ab;VisuMZ[_0x18f3d6(0x131)][_0x18f3d6(0x196)][_0x18f3d6(0x204)](this,_0x331c2c),this[_0x18f3d6(0x193)](_0x331c2c);},Sprite_Battler[_0xd096ab(0x2e9)][_0xd096ab(0x193)]=function(_0x83771e){const _0xfc013d=_0xd096ab;if(!_0x83771e)return;if(!this['_atbGaugeSprite'])return;if(_0x83771e[_0xfc013d(0x309)]()){}else{if(_0x83771e[_0xfc013d(0x29e)]()){if(this['constructor']===Sprite_Enemy&&_0x83771e[_0xfc013d(0x157)]())return;if(this[_0xfc013d(0x27a)]===Sprite_SvEnemy&&!_0x83771e[_0xfc013d(0x157)]())return;}}this[_0xfc013d(0x1d3)][_0xfc013d(0x1dc)](_0x83771e,'time');},VisuMZ[_0xd096ab(0x131)][_0xd096ab(0x29a)]=Sprite_Battler[_0xd096ab(0x2e9)][_0xd096ab(0x259)],Sprite_Battler[_0xd096ab(0x2e9)][_0xd096ab(0x259)]=function(){const _0x5d0ea1=_0xd096ab;VisuMZ[_0x5d0ea1(0x131)][_0x5d0ea1(0x29a)][_0x5d0ea1(0x204)](this),this[_0x5d0ea1(0x2bb)]();},Sprite_Battler['prototype']['updateAtbGaugeSpritePosition']=function(){const _0xc7d38=_0xd096ab;if(!this['_battler'])return;if(!this[_0xc7d38(0x1d3)])return;const _0x247ac3=VisuMZ[_0xc7d38(0x131)][_0xc7d38(0x2d3)]['Gauge'],_0x26a6d5=this[_0xc7d38(0x1d3)];let _0x56acaa=_0x247ac3['OffsetX'];this[_0xc7d38(0x2c1)][_0xc7d38(0x151)]&&(_0x56acaa+=this[_0xc7d38(0x2c1)][_0xc7d38(0x151)]());let _0x8126ce=_0x247ac3[_0xc7d38(0x28b)];if(this[_0xc7d38(0x2c1)][_0xc7d38(0x209)]){if(_0xc7d38(0x305)!==_0xc7d38(0x2d2))_0x8126ce+=this[_0xc7d38(0x2c1)]['battleUIOffsetY']();else{function _0x4a113a(){const _0x48821c=_0xc7d38;return _0x48821c(0x2bd);}}}_0x26a6d5['x']=_0x56acaa,_0x26a6d5['y']=-this[_0xc7d38(0x2f5)]+_0x8126ce;if(this[_0xc7d38(0x2c1)][_0xc7d38(0x29e)]()){if(_0xc7d38(0x2da)===_0xc7d38(0x313)){function _0x1a8ed6(){_0x1fd82f=0xa;}}else{if(this[_0xc7d38(0x2c1)][_0xc7d38(0x129)]()['note']['match'](/<HIDE (?:ATB|TPB) GAUGE>/i)){if(_0xc7d38(0x1a5)==='qVlHs')_0x26a6d5[_0xc7d38(0x1ee)]=![];else{function _0x327c7a(){const _0x4a2ae9=_0xc7d38;_0x362190[_0x4a2ae9(0x145)](_0x1ffcff+_0x313e56+_0xcd77a0,_0x17405d+_0xc4779b,_0x15da62,_0x5ea489),_0x403195['x']+=_0x1d421c['ceil'](_0x4deef9*1.75),_0x49580d[_0x4a2ae9(0x31c)]['x']=0x1;}}}}}this[_0xc7d38(0x1a0)]()&&(_0x26a6d5['y']+=_0x26a6d5[_0xc7d38(0x2fb)]()*_0x247ac3[_0xc7d38(0x1ef)]-0x1),this[_0xc7d38(0x2fc)]['x']<0x0&&(_0x26a6d5[_0xc7d38(0x2fc)]['x']=-Math[_0xc7d38(0x258)](_0x26a6d5[_0xc7d38(0x2fc)]['x']));},Sprite_Battler[_0xd096ab(0x2e9)][_0xd096ab(0x1a0)]=function(){const _0x19eb0f=_0xd096ab;if(!Imported[_0x19eb0f(0x2f3)])return![];if(this[_0x19eb0f(0x2c1)]&&this[_0x19eb0f(0x2c1)][_0x19eb0f(0x29e)]())return![];const _0x1f5870=VisuMZ[_0x19eb0f(0x144)][_0x19eb0f(0x2d3)][_0x19eb0f(0x245)];if(!_0x1f5870[_0x19eb0f(0x2b7)])return![];if(!ConfigManager['aggroGauge'])return![];const _0x5980b5=VisuMZ[_0x19eb0f(0x131)][_0x19eb0f(0x2d3)]['Gauge'];return _0x1f5870[_0x19eb0f(0x1ef)]===_0x5980b5['Scale']&&_0x1f5870[_0x19eb0f(0x24b)]===_0x5980b5[_0x19eb0f(0x24b)]&&_0x1f5870[_0x19eb0f(0x257)]===_0x5980b5['AnchorY']&&_0x1f5870[_0x19eb0f(0x2a6)]===_0x5980b5[_0x19eb0f(0x2a6)]&&_0x1f5870[_0x19eb0f(0x28b)]===_0x5980b5[_0x19eb0f(0x28b)]&&!![];},VisuMZ[_0xd096ab(0x131)][_0xd096ab(0x217)]=Sprite_Actor[_0xd096ab(0x2e9)][_0xd096ab(0x13f)],Sprite_Actor[_0xd096ab(0x2e9)]['createStateSprite']=function(){const _0x4d5119=_0xd096ab;VisuMZ[_0x4d5119(0x131)][_0x4d5119(0x217)][_0x4d5119(0x204)](this),VisuMZ['BattleSystemATB'][_0x4d5119(0x2d3)][_0x4d5119(0x18d)]['ShowActorGauge']&&this['createAtbGaugeSprite']();},VisuMZ[_0xd096ab(0x131)][_0xd096ab(0x2d5)]=Sprite_Enemy[_0xd096ab(0x2e9)][_0xd096ab(0x30d)],Sprite_Enemy['prototype'][_0xd096ab(0x30d)]=function(){const _0x7f397d=_0xd096ab;VisuMZ['BattleSystemATB'][_0x7f397d(0x2d3)]['Gauge'][_0x7f397d(0x1a8)]&&this[_0x7f397d(0x284)](),VisuMZ[_0x7f397d(0x131)][_0x7f397d(0x2d5)][_0x7f397d(0x204)](this);},VisuMZ[_0xd096ab(0x131)][_0xd096ab(0x27e)]=Sprite_Gauge[_0xd096ab(0x2e9)][_0xd096ab(0x14b)],Sprite_Gauge['prototype'][_0xd096ab(0x14b)]=function(){const _0x2f4ad7=_0xd096ab;if(this['_statusType']===_0x2f4ad7(0x1e2))return this[_0x2f4ad7(0x1a1)](0x1);return VisuMZ[_0x2f4ad7(0x131)][_0x2f4ad7(0x27e)][_0x2f4ad7(0x204)](this);},VisuMZ[_0xd096ab(0x131)][_0xd096ab(0x2ce)]=Sprite_Gauge[_0xd096ab(0x2e9)][_0xd096ab(0x2fe)],Sprite_Gauge[_0xd096ab(0x2e9)][_0xd096ab(0x2fe)]=function(){const _0x258b0d=_0xd096ab;if(this[_0x258b0d(0x143)]===_0x258b0d(0x1e2))return this['atbGaugeColor'](0x2);return VisuMZ[_0x258b0d(0x131)][_0x258b0d(0x2ce)]['call'](this);},Sprite_Gauge[_0xd096ab(0x2e9)][_0xd096ab(0x1a1)]=function(_0x16c119){const _0x5762f6=_0xd096ab;if(!this['_battler'])return ColorManager[_0x5762f6(0x2d7)](_0x5762f6(0x2b2)[_0x5762f6(0x22d)](_0x16c119));if(this[_0x5762f6(0x2c1)]['atbStopped']())return ColorManager[_0x5762f6(0x2d7)](_0x5762f6(0x24a)['format'](_0x16c119));if(this['_battler'][_0x5762f6(0x181)]())return ColorManager[_0x5762f6(0x2d7)](_0x5762f6(0x303)[_0x5762f6(0x22d)](_0x16c119));if(this['gaugeRate']()>=0x1)return ColorManager[_0x5762f6(0x2d7)]('full%1'[_0x5762f6(0x22d)](_0x16c119));const _0x2a8b56=VisuMZ[_0x5762f6(0x131)][_0x5762f6(0x2d3)][_0x5762f6(0x18d)],_0x5722da=this[_0x5762f6(0x2c1)][_0x5762f6(0x1c0)](0x6)*this['_battler']['paramBuffRate'](0x6);if(_0x5722da<=_0x2a8b56['SlowRate'])return ColorManager[_0x5762f6(0x2d7)](_0x5762f6(0x31f)[_0x5762f6(0x22d)](_0x16c119));if(_0x5722da>=_0x2a8b56[_0x5762f6(0x28c)])return ColorManager[_0x5762f6(0x2d7)](_0x5762f6(0x273)[_0x5762f6(0x22d)](_0x16c119));return ColorManager[_0x5762f6(0x2d7)](_0x5762f6(0x2b2)[_0x5762f6(0x22d)](_0x16c119));},VisuMZ[_0xd096ab(0x131)][_0xd096ab(0x2a2)]=Sprite_Gauge['prototype'][_0xd096ab(0x262)],Sprite_Gauge[_0xd096ab(0x2e9)][_0xd096ab(0x262)]=function(){const _0x8fc029=_0xd096ab;if(this['_battler']&&this[_0x8fc029(0x143)]===_0x8fc029(0x1e2))return this[_0x8fc029(0x1ca)]();return VisuMZ[_0x8fc029(0x131)][_0x8fc029(0x2a2)][_0x8fc029(0x204)](this);},Sprite_Gauge[_0xd096ab(0x2e9)][_0xd096ab(0x1ca)]=function(){const _0x1f4303=_0xd096ab;if(this[_0x1f4303(0x2c1)][_0x1f4303(0x181)]()){if(_0x1f4303(0x315)===_0x1f4303(0x1c7)){function _0x36cb18(){const _0x3a1fef=_0x1f4303;return this[_0x3a1fef(0x288)]===_0x2122a1&&(this['_fieldAtbGaugeFaceName']=this[_0x3a1fef(0x1a9)]()),this['_fieldAtbGaugeFaceName'];}}else return Math[_0x1f4303(0x2b6)](this[_0x1f4303(0x2c1)][_0x1f4303(0x1f1)],0x0);}else return VisuMZ[_0x1f4303(0x131)][_0x1f4303(0x2a2)][_0x1f4303(0x204)](this);},VisuMZ['BattleSystemATB'][_0xd096ab(0x312)]=Sprite_Gauge['prototype'][_0xd096ab(0x191)],Sprite_Gauge['prototype'][_0xd096ab(0x191)]=function(){const _0x577144=_0xd096ab;if(this['_battler']&&this[_0x577144(0x143)]===_0x577144(0x1e2))return this['atbCurrentMaxValue']();return VisuMZ[_0x577144(0x131)][_0x577144(0x312)][_0x577144(0x204)](this);},Sprite_Gauge[_0xd096ab(0x2e9)]['atbCurrentMaxValue']=function(){const _0x3532a5=_0xd096ab;if(this[_0x3532a5(0x2c1)]['isAtbCastingState']()){if(_0x3532a5(0x1c1)==='LuqAv')return Math['max'](this['_battler'][_0x3532a5(0x214)](),0x1);else{function _0x3ded05(){const _0x346ac1=_0x3532a5;this[_0x346ac1(0x234)]=_0x36f746[_0x346ac1(0x27d)](),_0x3fe2e7=_0x468b91['loadEnemy'](this[_0x346ac1(0x234)]),_0x1b7c14[_0x346ac1(0x1b2)](this[_0x346ac1(0x14c)][_0x346ac1(0x17b)](this,_0x18efeb));}}}else return VisuMZ[_0x3532a5(0x131)][_0x3532a5(0x312)][_0x3532a5(0x204)](this);},VisuMZ[_0xd096ab(0x131)][_0xd096ab(0x2c4)]=Window_Help[_0xd096ab(0x2e9)][_0xd096ab(0x2e7)],Window_Help['prototype'][_0xd096ab(0x2e7)]=function(_0xdb0068){const _0x2e34fa=_0xd096ab;BattleManager[_0x2e34fa(0x222)]()&&_0xdb0068&&_0xdb0068['note']&&_0xdb0068[_0x2e34fa(0x2ea)][_0x2e34fa(0x16e)](/<(?:ATB|TPB) HELP>\s*([\s\S]*)\s*<\/(?:ATB|TPB) HELP>/i)?this[_0x2e34fa(0x1a7)](String(RegExp['$1'])):VisuMZ[_0x2e34fa(0x131)][_0x2e34fa(0x2c4)]['call'](this,_0xdb0068);},VisuMZ['BattleSystemATB']['Window_StatusBase_placeGauge']=Window_StatusBase['prototype']['placeGauge'],Window_StatusBase[_0xd096ab(0x2e9)][_0xd096ab(0x142)]=function(_0x3e00da,_0x49630f,_0x467833,_0x3588ec){const _0x1bad17=_0xd096ab;if(!this[_0x1bad17(0x1e7)](_0x49630f))return;VisuMZ[_0x1bad17(0x131)][_0x1bad17(0x1d6)][_0x1bad17(0x204)](this,_0x3e00da,_0x49630f,_0x467833,_0x3588ec);},Window_StatusBase['prototype'][_0xd096ab(0x1e7)]=function(_0x414a44){const _0x56af04=_0xd096ab;if(_0x414a44!==_0x56af04(0x1e2))return!![];if(this[_0x56af04(0x27a)]!==Window_BattleStatus)return![];if(!BattleManager['isATB']())return![];if(!ConfigManager[_0x56af04(0x1b5)])return![];return VisuMZ[_0x56af04(0x131)][_0x56af04(0x2d3)][_0x56af04(0x18d)][_0x56af04(0x21b)];},VisuMZ['BattleSystemATB'][_0xd096ab(0x16a)]=Window_Options[_0xd096ab(0x2e9)]['addGeneralOptions'],Window_Options[_0xd096ab(0x2e9)]['addGeneralOptions']=function(){const _0x33fcec=_0xd096ab;VisuMZ[_0x33fcec(0x131)][_0x33fcec(0x16a)][_0x33fcec(0x204)](this),this[_0x33fcec(0x251)]();},Window_Options[_0xd096ab(0x2e9)][_0xd096ab(0x251)]=function(){const _0x180b05=_0xd096ab;if(!BattleManager['isATB']())return;VisuMZ[_0x180b05(0x131)][_0x180b05(0x2d3)][_0x180b05(0x174)]['AddOption']&&this[_0x180b05(0x1f9)]();},Window_Options[_0xd096ab(0x2e9)][_0xd096ab(0x1f9)]=function(){const _0x3716e2=_0xd096ab,_0x25a60d=TextManager[_0x3716e2(0x1b5)],_0x5e978b=_0x3716e2(0x1b5);this[_0x3716e2(0x1aa)](_0x25a60d,_0x5e978b);},Game_BattlerBase[_0xd096ab(0x2e9)]['clearFieldAtbGraphics']=function(){const _0x4bbdef=_0xd096ab;delete this[_0x4bbdef(0x2af)],delete this[_0x4bbdef(0x288)],delete this[_0x4bbdef(0x1e5)],delete this['_fieldAtbGaugeIconIndex'];},Game_BattlerBase[_0xd096ab(0x2e9)][_0xd096ab(0x2d8)]=function(){const _0x32b1ef=_0xd096ab;if(this['_fieldAtbGaugeGraphicType']===undefined){if(_0x32b1ef(0x1d4)==='TOMgI')this[_0x32b1ef(0x2af)]=this[_0x32b1ef(0x12a)]();else{function _0x26f8ec(){const _0x12c7b4=_0x32b1ef;_0x2a81d2=this['subject']()[_0x12c7b4(0x2ba)];}}}return this[_0x32b1ef(0x2af)];},Game_BattlerBase['prototype'][_0xd096ab(0x12a)]=function(){const _0x465e80=_0xd096ab;return Sprite_FieldGaugeATB[_0x465e80(0x2d3)][_0x465e80(0x16c)];},Game_BattlerBase[_0xd096ab(0x2e9)]['fieldAtbGraphicFaceName']=function(){const _0x5cadf2=_0xd096ab;return this[_0x5cadf2(0x288)]===undefined&&(this[_0x5cadf2(0x288)]=this[_0x5cadf2(0x1a9)]()),this['_fieldAtbGaugeFaceName'];},Game_BattlerBase[_0xd096ab(0x2e9)][_0xd096ab(0x1a9)]=function(){const _0x3f6017=_0xd096ab;return Sprite_FieldGaugeATB[_0x3f6017(0x2d3)][_0x3f6017(0x256)];},Game_BattlerBase['prototype'][_0xd096ab(0x1ea)]=function(){const _0xb3a8b4=_0xd096ab;return this['_fieldAtbGaugeFaceIndex']===undefined&&(this[_0xb3a8b4(0x1e5)]=this[_0xb3a8b4(0x149)]()),this[_0xb3a8b4(0x1e5)];},Game_BattlerBase[_0xd096ab(0x2e9)][_0xd096ab(0x149)]=function(){const _0x58fc46=_0xd096ab;return Sprite_FieldGaugeATB['Settings'][_0x58fc46(0x2a9)];},Game_BattlerBase[_0xd096ab(0x2e9)][_0xd096ab(0x15f)]=function(){const _0x53c401=_0xd096ab;return this[_0x53c401(0x1c3)]===undefined&&(this[_0x53c401(0x1c3)]=this[_0x53c401(0x200)]()),this[_0x53c401(0x1c3)];},Game_BattlerBase[_0xd096ab(0x2e9)][_0xd096ab(0x200)]=function(){const _0x2286a5=_0xd096ab;return Sprite_FieldGaugeATB['Settings'][_0x2286a5(0x26e)];},Game_BattlerBase[_0xd096ab(0x2e9)]['setAtbGraphicIconIndex']=function(_0x510567){const _0x4f5b61=_0xd096ab;this[_0x4f5b61(0x1c3)]=_0x510567;},Game_Actor[_0xd096ab(0x2e9)]['createFieldAtbGraphicType']=function(){const _0x3f8aa1=_0xd096ab,_0x57fae0=this[_0x3f8aa1(0x1d8)]()[_0x3f8aa1(0x2ea)];if(_0x57fae0['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0x3f8aa1(0x2bd);else{if(_0x57fae0[_0x3f8aa1(0x16e)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i)){if(_0x3f8aa1(0x296)===_0x3f8aa1(0x296))return _0x3f8aa1(0x238);else{function _0x1c1247(){const _0x45381f=_0x3f8aa1;_0x56c096[_0x45381f(0x131)][_0x45381f(0x2c4)][_0x45381f(0x204)](this,_0x52c4ec);}}}}return Sprite_FieldGaugeATB['Settings'][_0x3f8aa1(0x2c7)];},Game_Actor[_0xd096ab(0x2e9)][_0xd096ab(0x2cf)]=function(){const _0x4f503f=_0xd096ab,_0x2929e5=this[_0x4f503f(0x1d8)]()[_0x4f503f(0x2ea)];if(_0x2929e5['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x4f503f(0x2a3)]();},Game_Actor['prototype']['fieldAtbGraphicFaceIndex']=function(){const _0x1f74e9=_0xd096ab,_0x410292=this[_0x1f74e9(0x1d8)]()[_0x1f74e9(0x2ea)];if(_0x410292[_0x1f74e9(0x16e)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0x1f74e9(0x195)]();},Game_Actor[_0xd096ab(0x2e9)][_0xd096ab(0x200)]=function(){const _0x1e11e5=_0xd096ab,_0x5a7b03=this[_0x1e11e5(0x1d8)]()[_0x1e11e5(0x2ea)];if(_0x5a7b03[_0x1e11e5(0x16e)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Sprite_FieldGaugeATB[_0x1e11e5(0x2d3)][_0x1e11e5(0x242)];},Game_Enemy[_0xd096ab(0x2e9)][_0xd096ab(0x12a)]=function(){const _0x8b8562=_0xd096ab,_0x5f226c=this['enemy']()[_0x8b8562(0x2ea)];if(_0x5f226c[_0x8b8562(0x16e)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0x8b8562(0x2bd);else{if(_0x5f226c[_0x8b8562(0x16e)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return'icon';}return Sprite_FieldGaugeATB[_0x8b8562(0x2d3)][_0x8b8562(0x16c)];},Game_Enemy['prototype']['createFieldAtbGraphicFaceName']=function(){const _0x1c005c=_0xd096ab,_0x51f78d=this[_0x1c005c(0x129)]()[_0x1c005c(0x2ea)];if(_0x51f78d['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Sprite_FieldGaugeATB[_0x1c005c(0x2d3)][_0x1c005c(0x256)];},Game_Enemy[_0xd096ab(0x2e9)]['createFieldAtbGraphicFaceIndex']=function(){const _0xfd75c3=_0xd096ab,_0x3a5fca=this[_0xfd75c3(0x129)]()[_0xfd75c3(0x2ea)];if(_0x3a5fca[_0xfd75c3(0x16e)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Sprite_FieldGaugeATB[_0xfd75c3(0x2d3)][_0xfd75c3(0x2a9)];},Game_Enemy['prototype']['createFieldAtbGraphicIconIndex']=function(){const _0x2438ce=_0xd096ab,_0x418a6c=this[_0x2438ce(0x129)]()[_0x2438ce(0x2ea)];if(_0x418a6c['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i)){if('snzje'===_0x2438ce(0x250))return Number(RegExp['$1']);else{function _0x3ac667(){const _0x140db9=_0x2438ce,_0x1d8c9f=_0x49bfef['BattleSystemATB']['Settings'][_0x140db9(0x30a)];if(_0x49c58a['VisuMZ_0_CoreEngine']){const _0x4f318c=_0x1d8c9f[_0x140db9(0x20d)],_0x980995=_0x1d8c9f[_0x140db9(0x2d4)],_0x4a53fc=_0x1d8c9f['InterruptMute'];_0x3adbce[_0x140db9(0x233)]([this],_0x4f318c,_0x980995,_0x4a53fc);}if(this[_0x140db9(0x246)]()&&_0x1d8c9f['InterruptText']['length']>0x0){const _0x34e4ef=_0x1d8c9f[_0x140db9(0x279)],_0xcb5f2c={'textColor':_0x2d8d1f[_0x140db9(0x1f6)](_0x1d8c9f[_0x140db9(0x21e)]),'flashColor':_0x1d8c9f[_0x140db9(0x271)],'flashDuration':_0x1d8c9f[_0x140db9(0x1b0)]};this['setupTextPopup'](_0x34e4ef,_0xcb5f2c);}}}}return Sprite_FieldGaugeATB[_0x2438ce(0x2d3)]['EnemyBattlerIcon'];},VisuMZ[_0xd096ab(0x131)][_0xd096ab(0x2db)]=Scene_Battle[_0xd096ab(0x2e9)][_0xd096ab(0x237)],Scene_Battle[_0xd096ab(0x2e9)][_0xd096ab(0x237)]=function(){const _0x17f7da=_0xd096ab;this[_0x17f7da(0x31a)](),VisuMZ['BattleSystemATB'][_0x17f7da(0x2db)][_0x17f7da(0x204)](this);},Scene_Battle[_0xd096ab(0x2e9)]['createFieldGaugeATB']=function(){const _0x38afe8=_0xd096ab;if(!BattleManager['isATB']())return;if(!Sprite_FieldGaugeATB[_0x38afe8(0x2d3)][_0x38afe8(0x25d)])return;if(!ConfigManager['visualAtbGauge'])return;this[_0x38afe8(0x12b)]=new Window_Base(new Rectangle(0x0,0x0,0x0,0x0));const _0x5be2c1=this[_0x38afe8(0x26d)](this[_0x38afe8(0x2cd)]);this[_0x38afe8(0x291)](this['_fieldGaugeATB_Container'],_0x5be2c1),this['_fieldGaugeATB']=new Sprite_FieldGaugeATB(),this[_0x38afe8(0x12b)][_0x38afe8(0x1c8)](this[_0x38afe8(0x2ff)]);};function Sprite_FieldGaugeATB(){const _0x125695=_0xd096ab;this[_0x125695(0x14a)](...arguments);}Sprite_FieldGaugeATB[_0xd096ab(0x2e9)]=Object[_0xd096ab(0x2f1)](Sprite[_0xd096ab(0x2e9)]),Sprite_FieldGaugeATB[_0xd096ab(0x2e9)]['constructor']=Sprite_FieldGaugeATB,Sprite_FieldGaugeATB[_0xd096ab(0x2d3)]=JsonEx[_0xd096ab(0x290)](VisuMZ[_0xd096ab(0x131)][_0xd096ab(0x2d3)]['FieldGauge']),Sprite_FieldGaugeATB[_0xd096ab(0x2e9)][_0xd096ab(0x14a)]=function(){const _0x40d6af=_0xd096ab;Sprite['prototype'][_0x40d6af(0x14a)][_0x40d6af(0x204)](this),this[_0x40d6af(0x1fe)](),this[_0x40d6af(0x156)](),this[_0x40d6af(0x19c)]();},Sprite_FieldGaugeATB[_0xd096ab(0x2e9)][_0xd096ab(0x1fe)]=function(){const _0x2f55ae=_0xd096ab;this[_0x2f55ae(0x31c)]['x']=0.5,this[_0x2f55ae(0x31c)]['y']=0.5;},Sprite_FieldGaugeATB[_0xd096ab(0x2e9)][_0xd096ab(0x281)]=function(){const _0x24bb83=_0xd096ab;if(this['_horz']!==undefined)return this['_horz'];const _0x1d2a8b=Sprite_FieldGaugeATB[_0x24bb83(0x2d3)][_0x24bb83(0x140)];return this[_0x24bb83(0x2e2)]=[_0x24bb83(0x1ce),'bottom'][_0x24bb83(0x2a7)](_0x1d2a8b),this[_0x24bb83(0x2e2)];},Sprite_FieldGaugeATB[_0xd096ab(0x2e9)]['setHomeLocation']=function(){const _0x5a37a4=_0xd096ab,_0x48b922=Sprite_FieldGaugeATB[_0x5a37a4(0x2d3)][_0x5a37a4(0x140)][_0x5a37a4(0x20a)]()[_0x5a37a4(0x2ef)](),_0x4d7840=Math[_0x5a37a4(0x31b)](SceneManager[_0x5a37a4(0x24d)][_0x5a37a4(0x30c)](4.5,!![]));this['_homeX']=0x0,this['_homeY']=0x0;switch(_0x48b922){case'top':this[_0x5a37a4(0x2ec)]=Math[_0x5a37a4(0x31b)](Graphics[_0x5a37a4(0x13d)]*0.5),this[_0x5a37a4(0x244)]=0x60;break;case'bottom':this[_0x5a37a4(0x2ec)]=Math[_0x5a37a4(0x31b)](Graphics[_0x5a37a4(0x13d)]*0.5),this['_homeY']=Graphics[_0x5a37a4(0x1b3)]-_0x4d7840;break;case _0x5a37a4(0x260):this[_0x5a37a4(0x2ec)]=0x50,this[_0x5a37a4(0x244)]=Math[_0x5a37a4(0x31b)]((Graphics['boxHeight']-_0x4d7840)/0x2);break;case _0x5a37a4(0x2dc):this[_0x5a37a4(0x2ec)]=Graphics[_0x5a37a4(0x13d)]-0x50,this[_0x5a37a4(0x244)]=Math['round']((Graphics[_0x5a37a4(0x1b3)]-_0x4d7840)/0x2);break;}this[_0x5a37a4(0x2ec)]+=Sprite_FieldGaugeATB[_0x5a37a4(0x2d3)][_0x5a37a4(0x21d)]||0x0,this[_0x5a37a4(0x244)]+=Sprite_FieldGaugeATB['Settings'][_0x5a37a4(0x2cc)]||0x0,this['x']=this[_0x5a37a4(0x2ec)],this['y']=this[_0x5a37a4(0x244)];},Sprite_FieldGaugeATB['prototype'][_0xd096ab(0x19c)]=function(){const _0x4b10c2=_0xd096ab;this['createFieldGaugeSkin'](),this[_0x4b10c2(0x293)](),this[_0x4b10c2(0x2b3)]();},Sprite_FieldGaugeATB[_0xd096ab(0x2e9)][_0xd096ab(0x301)]=function(){const _0x96c97a=_0xd096ab;this[_0x96c97a(0x1ff)]=new Sprite(),this['_skinSprite'][_0x96c97a(0x31c)]['x']=0.5,this[_0x96c97a(0x1ff)][_0x96c97a(0x31c)]['y']=0.5,this[_0x96c97a(0x1c8)](this[_0x96c97a(0x1ff)]);const _0x367455=Sprite_FieldGaugeATB['Settings'][_0x96c97a(0x24f)];if(_0x367455)this['_skinSprite'][_0x96c97a(0x265)]=ImageManager[_0x96c97a(0x316)](_0x367455);},Sprite_FieldGaugeATB[_0xd096ab(0x2e9)][_0xd096ab(0x293)]=function(){const _0x4f9296=_0xd096ab;this['_gaugeSprite']=new Sprite(),this['addChild'](this['_gaugeSprite']),this[_0x4f9296(0x1f0)]();},Sprite_FieldGaugeATB[_0xd096ab(0x2e9)]['createGaugeBitmap']=function(){const _0x25d5ad=_0xd096ab,_0x5d2ff1=Sprite_FieldGaugeATB[_0x25d5ad(0x2d3)],_0x5ad7c5=this[_0x25d5ad(0x281)](),_0x29f1c8=_0x5ad7c5?_0x5d2ff1['GaugeLengthHorz']:_0x5d2ff1[_0x25d5ad(0x2e0)],_0xdef89f=_0x5ad7c5?_0x5d2ff1[_0x25d5ad(0x2e0)]:_0x5d2ff1[_0x25d5ad(0x295)];this[_0x25d5ad(0x2bc)]['bitmap']=new Bitmap(_0x29f1c8,_0xdef89f),this[_0x25d5ad(0x179)](),this['_gaugeSprite']['x']=Math[_0x25d5ad(0x2ad)](_0x29f1c8/-0x2),this[_0x25d5ad(0x2bc)]['y']=Math[_0x25d5ad(0x2ad)](_0xdef89f/-0x2);},Sprite_FieldGaugeATB[_0xd096ab(0x2e9)][_0xd096ab(0x179)]=function(){const _0x499e53=_0xd096ab;if(!Sprite_FieldGaugeATB[_0x499e53(0x2d3)][_0x499e53(0x269)])return;const _0x255e13=Sprite_FieldGaugeATB[_0x499e53(0x2d3)],_0x52e0e7=this['_gaugeSprite'][_0x499e53(0x265)],_0x19a750=_0x52e0e7[_0x499e53(0x1a2)],_0x39c64b=_0x52e0e7[_0x499e53(0x2f5)],_0x2f7bd7=ColorManager[_0x499e53(0x205)](),_0x4463fb=ColorManager[_0x499e53(0x263)](),_0x1edf6d=ColorManager[_0x499e53(0x215)](),_0x54c21a=ColorManager[_0x499e53(0x2d7)](_0x499e53(0x1e0)),_0x309541=ColorManager[_0x499e53(0x2d7)](_0x499e53(0x16f)),_0x4fb562=this['isGaugeHorizontal'](),_0x22a310=_0x255e13[_0x499e53(0x243)],_0xf03dde=_0x255e13[_0x499e53(0x12f)][_0x499e53(0x22b)](0x0,0x1),_0x91dba=Math['ceil'](((_0x4fb562?_0x19a750:_0x39c64b)-0x2)*_0xf03dde);_0x52e0e7[_0x499e53(0x320)](0x0,0x0,_0x19a750,_0x39c64b,_0x2f7bd7);let _0x3776af=0x0,_0x208625=0x0,_0x111d01=0x0,_0x43b380=0x0;if(_0x4fb562&&_0x22a310){if('dwnZq'!=='dwnZq'){function _0x31d387(){const _0x43faec=_0x499e53;if(!this[_0x43faec(0x181)]())return;if(!this[_0x43faec(0x2a8)]())return;if(!this[_0x43faec(0x2a8)]()[_0x43faec(0x1ed)]())return;if(this['currentAction']()['item']()[_0x43faec(0x2ea)][_0x43faec(0x16e)](/<(?:ATB|TPB) CANNOT (?:BE INTERRUPTED|INTERRUPT)>/i))return;this[_0x43faec(0x2d6)](),this[_0x43faec(0x1d0)](),this[_0x43faec(0x1f1)]=0x0,this['onAtbInterrupt']();}}else _0x3776af=_0x91dba-0x1,_0x111d01=_0x19a750-0x3-_0x3776af,_0x52e0e7['gradientFillRect'](0x1,0x1,_0x3776af,_0x39c64b-0x2,_0x4463fb,_0x1edf6d,![]),_0x52e0e7['gradientFillRect'](0x2+_0x3776af,0x1,_0x111d01,_0x39c64b-0x2,_0x54c21a,_0x309541,![]);}else{if(_0x4fb562&&!_0x22a310)_0x3776af=_0x91dba-0x1,_0x111d01=_0x19a750-0x3-_0x3776af,_0x52e0e7[_0x499e53(0x150)](0x2+_0x111d01,0x1,_0x3776af,_0x39c64b-0x2,_0x4463fb,_0x1edf6d,![]),_0x52e0e7[_0x499e53(0x150)](0x1,0x1,_0x111d01,_0x39c64b-0x2,_0x54c21a,_0x309541,![]);else{if(!_0x4fb562&&_0x22a310)_0x208625=_0x91dba-0x1,_0x43b380=_0x39c64b-0x3-_0x208625,_0x52e0e7['gradientFillRect'](0x1,0x1,_0x19a750-0x2,_0x208625,_0x4463fb,_0x1edf6d,!![]),_0x52e0e7[_0x499e53(0x150)](0x1,0x2+_0x208625,_0x19a750-0x2,_0x43b380,_0x54c21a,_0x309541,!![]);else{if(!_0x4fb562&&!_0x22a310){if(_0x499e53(0x201)!==_0x499e53(0x154))_0x208625=_0x91dba-0x1,_0x43b380=_0x39c64b-0x3-_0x208625,_0x52e0e7[_0x499e53(0x150)](0x1,0x2+_0x43b380,_0x19a750-0x2,_0x208625,_0x4463fb,_0x1edf6d,!![]),_0x52e0e7[_0x499e53(0x150)](0x1,0x1,_0x19a750-0x2,_0x43b380,_0x54c21a,_0x309541,!![]);else{function _0x33e4c2(){const _0x2e8d78=_0x499e53;this[_0x2e8d78(0x270)]=_0x2e8d78(0x129);}}}}}}},Sprite_FieldGaugeATB[_0xd096ab(0x2e9)][_0xd096ab(0x2b3)]=function(){const _0x1003b2=_0xd096ab;this['_battlerContainer']&&this[_0x1003b2(0x2bc)][_0x1003b2(0x220)](this[_0x1003b2(0x210)]),this['_battlerContainer']=new Sprite(),this[_0x1003b2(0x2bc)][_0x1003b2(0x1c8)](this['_battlerContainer']),this['createBattlerSprites']();},Sprite_FieldGaugeATB['prototype'][_0xd096ab(0x168)]=function(){const _0x10683f=_0xd096ab;this[_0x10683f(0x1e9)](),this['createActorSprites']();},Sprite_FieldGaugeATB[_0xd096ab(0x2e9)][_0xd096ab(0x1e9)]=function(){const _0x34a2ad=_0xd096ab,_0x31f5bb=$gameTroop[_0x34a2ad(0x229)](),_0x55a9da=_0x31f5bb[_0x34a2ad(0x1b7)];for(let _0x16fa99=0x0;_0x16fa99<_0x55a9da;_0x16fa99++){if('JvxJs'===_0x34a2ad(0x2f6)){function _0x2b7eb2(){return![];}}else this[_0x34a2ad(0x2b9)](_0x16fa99,$gameTroop);}},Sprite_FieldGaugeATB[_0xd096ab(0x2e9)]['createActorSprites']=function(){const _0x4f3987=_0xd096ab,_0x59b94d=$gameParty[_0x4f3987(0x19d)]();for(let _0x3506f4=0x0;_0x3506f4<_0x59b94d;_0x3506f4++){if(_0x4f3987(0x23b)===_0x4f3987(0x23b))this[_0x4f3987(0x2b9)](_0x3506f4,$gameParty);else{function _0x1a26cb(){const _0x2535b2=_0x4f3987,_0x435abc=_0x1cb735[_0x2535b2(0x131)][_0x2535b2(0x2d3)]['Mechanics'];let _0x3cdde6=this[_0x2535b2(0x31d)]()*_0x5a8873(_0x435abc[_0x2535b2(0x132)]);const _0x3cb6e6=this[_0x2535b2(0x25b)]()[_0x2535b2(0x12e)](this[_0x2535b2(0x239)]()),_0x3dcea1=/<(?:ATB|TPB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x15dbe1=_0x3cb6e6[_0x2535b2(0x19f)](_0x247ad2=>_0x247ad2&&_0x247ad2[_0x2535b2(0x2ea)][_0x2535b2(0x16e)](_0x3dcea1)?_0x5ec571(_0x4ac556['$1'])*0.01:0x0);_0x3cdde6=_0x15dbe1[_0x2535b2(0x287)]((_0x32d9f7,_0x33fc8d)=>_0x32d9f7+_0x33fc8d,_0x3cdde6),this[_0x2535b2(0x2e4)]=_0x2535b2(0x261),this['_tpbChargeTime']=(_0x2fe3db?0x1:_0x3cdde6)['clamp'](0x0,0x1),this[_0x2535b2(0x1bd)]()&&(this[_0x2535b2(0x2ba)]=0x0);}}}},Sprite_FieldGaugeATB[_0xd096ab(0x2e9)][_0xd096ab(0x2b9)]=function(_0x4e84c1,_0x54a4b4){const _0x5256fe=_0xd096ab,_0x582f0b=new Sprite_FieldMarkerATB(_0x4e84c1,_0x54a4b4,this['_gaugeSprite']);this['_battlerContainer'][_0x5256fe(0x1c8)](_0x582f0b);},Sprite_FieldGaugeATB['prototype']['update']=function(){const _0x500038=_0xd096ab;Sprite[_0x500038(0x2e9)][_0x500038(0x1f5)][_0x500038(0x204)](this),this[_0x500038(0x1cd)](),this[_0x500038(0x15e)](),this['updateVisibility']();},Sprite_FieldGaugeATB[_0xd096ab(0x2e9)]['updatePosition']=function(){const _0x30c862=_0xd096ab,_0x6182c9=Sprite_FieldGaugeATB[_0x30c862(0x2d3)];if(_0x6182c9['DisplayPosition']!=='top')return;if(!_0x6182c9[_0x30c862(0x219)])return;const _0x13a77b=SceneManager[_0x30c862(0x24d)][_0x30c862(0x1bf)];if(!_0x13a77b)return;_0x13a77b[_0x30c862(0x1ee)]?(this['x']=this[_0x30c862(0x2ec)]+(_0x6182c9[_0x30c862(0x27b)]||0x0),this['y']=this[_0x30c862(0x244)]+(_0x6182c9[_0x30c862(0x19e)]||0x0)):(this['x']=this[_0x30c862(0x2ec)],this['y']=this[_0x30c862(0x244)]);const _0x38eefa=SceneManager['_scene']['_windowLayer'];this['x']+=_0x38eefa['x'],this['y']+=_0x38eefa['y'];},Sprite_FieldGaugeATB[_0xd096ab(0x2e9)]['updateBattleContainerOrder']=function(){const _0x587628=_0xd096ab;if(!this['_battlerContainer'])return;const _0x4df6db=this['_battlerContainer'][_0x587628(0x1ad)];if(!_0x4df6db)return;_0x4df6db[_0x587628(0x24c)](this[_0x587628(0x20f)]['bind'](this));},Sprite_FieldGaugeATB[_0xd096ab(0x2e9)]['compareBattlerSprites']=function(_0x2b25b7,_0x18dce9){const _0x285427=_0xd096ab,_0x26eb21=this['isGaugeHorizontal'](),_0x5979be=Sprite_FieldGaugeATB[_0x285427(0x2d3)][_0x285427(0x243)];if(_0x26eb21&&_0x5979be)return _0x2b25b7['x']-_0x18dce9['x'];else{if(_0x26eb21&&!_0x5979be){if(_0x285427(0x1b8)===_0x285427(0x1b8))return _0x18dce9['x']-_0x2b25b7['x'];else{function _0x22b485(){const _0x19dd0e=_0x285427;if(this['_atbColors']===_0x263c37)this['setupBattleSystemATBColors']();return this[_0x19dd0e(0x17c)][_0x343e51]||_0x19dd0e(0x266);}}}else{if(!_0x26eb21&&_0x5979be){if('iiIJU'===_0x285427(0x24e))return _0x2b25b7['y']-_0x18dce9['y'];else{function _0x3dcc72(){const _0x101dff=_0x285427;return this['isAtbCastingState']()?this['_tpbCastTime']/this[_0x101dff(0x214)]():0x0;}}}else{if(!_0x26eb21&&!_0x5979be)return _0x18dce9['y']-_0x2b25b7['y'];}}}},Sprite_FieldGaugeATB['prototype']['updateVisibility']=function(){const _0x2698e6=_0xd096ab;this[_0x2698e6(0x1ee)]=$gameSystem[_0x2698e6(0x25e)]();};function Sprite_FieldMarkerATB(){this['initialize'](...arguments);}Sprite_FieldMarkerATB[_0xd096ab(0x2e9)]=Object[_0xd096ab(0x2f1)](Sprite[_0xd096ab(0x2e9)]),Sprite_FieldMarkerATB[_0xd096ab(0x2e9)][_0xd096ab(0x27a)]=Sprite_FieldMarkerATB,Sprite_FieldMarkerATB[_0xd096ab(0x2e9)][_0xd096ab(0x14a)]=function(_0x21cd88,_0x3e8e8c,_0x672333){const _0xb44005=_0xd096ab;this[_0xb44005(0x25c)]=_0x21cd88,this[_0xb44005(0x15d)]=_0x3e8e8c,this[_0xb44005(0x2bc)]=_0x672333,Sprite[_0xb44005(0x2e9)][_0xb44005(0x14a)][_0xb44005(0x204)](this),this[_0xb44005(0x1fe)](),this[_0xb44005(0x19c)](),this['opacity']=this['targetOpacity']();},Sprite_FieldMarkerATB[_0xd096ab(0x2e9)]['initMembers']=function(){const _0x1b6ed5=_0xd096ab;this[_0x1b6ed5(0x31c)]['x']=0.5,this['anchor']['y']=0.5;},Sprite_FieldMarkerATB[_0xd096ab(0x2e9)][_0xd096ab(0x19c)]=function(){const _0x274d90=_0xd096ab;this[_0x274d90(0x18e)](),this[_0x274d90(0x14f)](),this[_0x274d90(0x127)](),this['createLetterSprite'](),this[_0x274d90(0x152)](),this['updatePositionOnGauge'](!![]);},Sprite_FieldMarkerATB['prototype'][_0xd096ab(0x18e)]=function(){const _0x2ed7d5=_0xd096ab;if(!Sprite_FieldGaugeATB['Settings'][_0x2ed7d5(0x159)])return;const _0x1194e0=Sprite_FieldGaugeATB[_0x2ed7d5(0x2d3)],_0x561a70=this[_0x2ed7d5(0x15d)]===$gameParty?_0x2ed7d5(0x298):_0x2ed7d5(0x2b0),_0x2b4904='%1SystemBg'[_0x2ed7d5(0x22d)](_0x561a70),_0x110b8d=new Sprite();_0x110b8d[_0x2ed7d5(0x31c)]['x']=this[_0x2ed7d5(0x31c)]['x'],_0x110b8d[_0x2ed7d5(0x31c)]['y']=this[_0x2ed7d5(0x31c)]['y'];if(_0x1194e0[_0x2b4904]){if(_0x2ed7d5(0x20c)!=='LXMTr')_0x110b8d[_0x2ed7d5(0x265)]=ImageManager[_0x2ed7d5(0x316)](_0x1194e0[_0x2b4904]);else{function _0x5dbb3f(){const _0x3eedb4=_0x2ed7d5;if(this['_statusType']==='time')return this[_0x3eedb4(0x1a1)](0x2);return _0x161bf4[_0x3eedb4(0x131)]['Sprite_Gauge_gaugeColor2'][_0x3eedb4(0x204)](this);}}}else{const _0x219538=_0x1194e0[_0x2ed7d5(0x276)];_0x110b8d[_0x2ed7d5(0x265)]=new Bitmap(_0x219538,_0x219538);const _0x1dda0a=ColorManager[_0x2ed7d5(0x1f6)](_0x1194e0[_0x2ed7d5(0x176)[_0x2ed7d5(0x22d)](_0x561a70)]),_0x33f96b=ColorManager[_0x2ed7d5(0x1f6)](_0x1194e0[_0x2ed7d5(0x30f)[_0x2ed7d5(0x22d)](_0x561a70)]);_0x110b8d[_0x2ed7d5(0x265)][_0x2ed7d5(0x150)](0x0,0x0,_0x219538,_0x219538,_0x1dda0a,_0x33f96b,!![]);}this['_backgroundSprite']=_0x110b8d,this[_0x2ed7d5(0x1c8)](this[_0x2ed7d5(0x183)]);},Sprite_FieldMarkerATB[_0xd096ab(0x2e9)][_0xd096ab(0x14f)]=function(){const _0x63be05=_0xd096ab,_0x49c798=new Sprite();_0x49c798['anchor']['x']=this[_0x63be05(0x31c)]['x'],_0x49c798['anchor']['y']=this[_0x63be05(0x31c)]['y'],this[_0x63be05(0x317)]=_0x49c798,this[_0x63be05(0x1c8)](this[_0x63be05(0x317)]),this[_0x63be05(0x146)]();},Sprite_FieldMarkerATB['prototype']['createBorderSprite']=function(){const _0x4d1f65=_0xd096ab;if(!Sprite_FieldGaugeATB['Settings'][_0x4d1f65(0x186)])return;const _0x21abb9=Sprite_FieldGaugeATB[_0x4d1f65(0x2d3)],_0x41359d=this[_0x4d1f65(0x15d)]===$gameParty?_0x4d1f65(0x298):_0x4d1f65(0x2b0),_0x350cb8=_0x4d1f65(0x30b)['format'](_0x41359d),_0x716991=new Sprite();_0x716991[_0x4d1f65(0x31c)]['x']=this[_0x4d1f65(0x31c)]['x'],_0x716991['anchor']['y']=this[_0x4d1f65(0x31c)]['y'];if(_0x21abb9[_0x350cb8])_0x716991[_0x4d1f65(0x265)]=ImageManager[_0x4d1f65(0x316)](_0x21abb9[_0x350cb8]);else{let _0xb6f52e=_0x21abb9[_0x4d1f65(0x276)],_0x28d09d=_0x21abb9['BorderThickness'];_0x716991[_0x4d1f65(0x265)]=new Bitmap(_0xb6f52e,_0xb6f52e);const _0x1d8472='#000000',_0x1a06d2=ColorManager['getColor'](_0x21abb9[_0x4d1f65(0x28f)['format'](_0x41359d)]);_0x716991[_0x4d1f65(0x265)][_0x4d1f65(0x320)](0x0,0x0,_0xb6f52e,_0xb6f52e,_0x1d8472),_0xb6f52e-=0x2,_0x716991['bitmap'][_0x4d1f65(0x320)](0x1,0x1,_0xb6f52e,_0xb6f52e,_0x1a06d2),_0xb6f52e-=_0x28d09d*0x2,_0x716991[_0x4d1f65(0x265)]['fillRect'](0x1+_0x28d09d,0x1+_0x28d09d,_0xb6f52e,_0xb6f52e,_0x1d8472),_0xb6f52e-=0x2,_0x28d09d+=0x1,_0x716991[_0x4d1f65(0x265)][_0x4d1f65(0x1d2)](0x1+_0x28d09d,0x1+_0x28d09d,_0xb6f52e,_0xb6f52e);}this[_0x4d1f65(0x183)]=_0x716991,this[_0x4d1f65(0x1c8)](this[_0x4d1f65(0x183)]);},Sprite_FieldMarkerATB[_0xd096ab(0x2e9)]['createLetterSprite']=function(){const _0x33c2da=_0xd096ab,_0x5f1ccc=Sprite_FieldGaugeATB[_0x33c2da(0x2d3)];if(!_0x5f1ccc['EnemyBattlerDrawLetter'])return;if(this[_0x33c2da(0x15d)]===$gameParty)return;const _0x1067d6=_0x5f1ccc['MarkerSize'],_0x58c3a0=new Sprite();_0x58c3a0[_0x33c2da(0x31c)]['x']=this[_0x33c2da(0x31c)]['x'],_0x58c3a0[_0x33c2da(0x31c)]['y']=this[_0x33c2da(0x31c)]['y'],_0x58c3a0[_0x33c2da(0x265)]=new Bitmap(_0x1067d6,_0x1067d6),this[_0x33c2da(0x241)]=_0x58c3a0,this[_0x33c2da(0x1c8)](this[_0x33c2da(0x241)]);},Sprite_FieldMarkerATB['prototype'][_0xd096ab(0x152)]=function(){const _0x20c354=_0xd096ab,_0x2cfa56=Sprite_FieldGaugeATB[_0x20c354(0x2d3)];if(!_0x2cfa56[_0x20c354(0x12d)])return;const _0x5c97f8=new Sprite();_0x5c97f8[_0x20c354(0x31c)]['x']=this[_0x20c354(0x31c)]['x'],_0x5c97f8[_0x20c354(0x31c)]['y']=this[_0x20c354(0x31c)]['y'],this['setupArrowSprite'](_0x5c97f8),this['_arrowSprite']=_0x5c97f8,this[_0x20c354(0x1c8)](this['_arrowSprite']);},Sprite_FieldMarkerATB[_0xd096ab(0x2e9)][_0xd096ab(0x2c3)]=function(_0x504172){const _0x280101=_0xd096ab,_0x1645ca=Sprite_FieldGaugeATB['Settings'],_0x2c356a=_0x1645ca['MarkerSize'],_0x43da69=Math[_0x280101(0x31b)](_0x2c356a/0x2),_0x4240e5=this[_0x280101(0x281)](),_0x55470c=this['_unit']===$gameParty?_0x280101(0x298):_0x280101(0x2b0),_0x2bbeb4=_0x1645ca['%1Side'[_0x280101(0x22d)](_0x55470c)];_0x504172[_0x280101(0x265)]=ImageManager['loadSystem'](_0x1645ca[_0x280101(0x203)]);const _0x112be6=0x18,_0x3f1c0a=_0x112be6/0x2,_0x160725=0x60+_0x112be6,_0x372a06=0x0+_0x112be6;if(_0x4240e5&&_0x2bbeb4){if('sQNOV'!==_0x280101(0x22c)){function _0x199693(){const _0x1fd810=_0x280101;this[_0x1fd810(0x1c3)]=_0x5503a3;}}else _0x504172[_0x280101(0x145)](_0x160725+_0x3f1c0a,_0x372a06+_0x3f1c0a+_0x112be6,_0x112be6,_0x3f1c0a),_0x504172['y']+=_0x43da69,_0x504172[_0x280101(0x31c)]['y']=0x0;}else{if(_0x4240e5&&!_0x2bbeb4)_0x504172[_0x280101(0x145)](_0x160725+_0x3f1c0a,_0x372a06,_0x112be6,_0x3f1c0a),_0x504172['y']-=_0x43da69,_0x504172[_0x280101(0x31c)]['y']=0x1;else{if(!_0x4240e5&&_0x2bbeb4){if(_0x280101(0x17a)===_0x280101(0x1e6)){function _0x20f05a(){const _0x27def0=_0x280101;this[_0x27def0(0x31a)](),_0x2fc003[_0x27def0(0x131)]['Scene_Battle_createAllWindows'][_0x27def0(0x204)](this);}}else _0x504172[_0x280101(0x145)](_0x160725,_0x372a06+_0x3f1c0a,_0x3f1c0a,_0x112be6),_0x504172['x']-=Math['ceil'](_0x43da69*1.75),_0x504172['anchor']['x']=0x0;}else{if(!_0x4240e5&&!_0x2bbeb4){if(_0x280101(0x2fa)==='oBVGR')_0x504172[_0x280101(0x145)](_0x160725+_0x112be6+_0x3f1c0a,_0x372a06+_0x3f1c0a,_0x3f1c0a,_0x112be6),_0x504172['x']+=Math[_0x280101(0x2ad)](_0x43da69*1.75),_0x504172[_0x280101(0x31c)]['x']=0x1;else{function _0x363452(){const _0x39418f=_0x280101;return this[_0x39418f(0x146)]();}}}}}}},Sprite_FieldMarkerATB[_0xd096ab(0x2e9)][_0xd096ab(0x246)]=function(){const _0x2db6b9=_0xd096ab;if(this[_0x2db6b9(0x15d)]===$gameParty)return $gameParty[_0x2db6b9(0x1f8)]()[this[_0x2db6b9(0x25c)]];else{if('ojCII'!==_0x2db6b9(0x1e4)){function _0x18db1a(){const _0x2ffec6=_0x2db6b9;return _0x2c306a[_0x2ffec6(0x2d3)][_0x2ffec6(0x2a9)];}}else return $gameTroop[_0x2db6b9(0x229)]()[this['_index']];}},Sprite_FieldMarkerATB[_0xd096ab(0x2e9)]['update']=function(){const _0x4ce7d5=_0xd096ab;Sprite[_0x4ce7d5(0x2e9)][_0x4ce7d5(0x1f5)][_0x4ce7d5(0x204)](this),this[_0x4ce7d5(0x223)](),this[_0x4ce7d5(0x29b)](),this[_0x4ce7d5(0x21c)](),this[_0x4ce7d5(0x268)](),this['updateGraphicHue'](),this[_0x4ce7d5(0x141)](),this[_0x4ce7d5(0x2c2)]();},Sprite_FieldMarkerATB['prototype'][_0xd096ab(0x223)]=function(){const _0xcc4902=_0xd096ab,_0x21dcbd=this['targetOpacity'](),_0xc8ee24=Sprite_FieldGaugeATB[_0xcc4902(0x2d3)]['OpacityRate'];if(this[_0xcc4902(0x2a1)]>_0x21dcbd)this[_0xcc4902(0x2a1)]=Math[_0xcc4902(0x2b6)](_0x21dcbd,this[_0xcc4902(0x2a1)]-_0xc8ee24);else this[_0xcc4902(0x2a1)]<_0x21dcbd&&(this[_0xcc4902(0x2a1)]=Math[_0xcc4902(0x22e)](_0x21dcbd,this[_0xcc4902(0x2a1)]+_0xc8ee24));},Sprite_FieldMarkerATB['prototype'][_0xd096ab(0x26b)]=function(){const _0x1bf026=_0xd096ab,_0x5f1b50=this['battler']();if(!_0x5f1b50)return 0x0;if(_0x5f1b50[_0x1bf026(0x231)]())return 0x0;if(_0x5f1b50[_0x1bf026(0x207)]())return 0x0;return 0xff;},Sprite_FieldMarkerATB[_0xd096ab(0x2e9)][_0xd096ab(0x281)]=function(){const _0x528800=_0xd096ab;if(this[_0x528800(0x2e2)]!==undefined)return this[_0x528800(0x2e2)];const _0x1d9220=Sprite_FieldGaugeATB[_0x528800(0x2d3)][_0x528800(0x140)];return this[_0x528800(0x2e2)]=['top','bottom'][_0x528800(0x2a7)](_0x1d9220),this[_0x528800(0x2e2)];},Sprite_FieldMarkerATB[_0xd096ab(0x2e9)][_0xd096ab(0x29b)]=function(){const _0x5ddb54=_0xd096ab,_0x32bdd1=Sprite_FieldGaugeATB[_0x5ddb54(0x2d3)],_0x2125c6=this[_0x5ddb54(0x281)](),_0x83b4fd=this['_unit']===$gameParty?_0x5ddb54(0x298):'Enemy',_0x206292=_0x32bdd1[_0x5ddb54(0x1eb)],_0x1ff8c9=_0x32bdd1[_0x5ddb54(0x267)['format'](_0x83b4fd)];_0x2125c6?(this['y']=_0x32bdd1['GaugeThick']/0x2,this['y']+=_0x1ff8c9?-_0x206292:_0x206292):(this['x']=_0x32bdd1['GaugeThick']/0x2,this['x']+=_0x1ff8c9?_0x206292:-_0x206292);},Sprite_FieldMarkerATB[_0xd096ab(0x2e9)]['updatePositionOnGauge']=function(_0x52dcf6){const _0x18581d=_0xd096ab,_0x3e05a1=this[_0x18581d(0x246)]();if(!_0x3e05a1)return;const _0x49cc01=Sprite_FieldGaugeATB[_0x18581d(0x2d3)],_0x167dba=this[_0x18581d(0x281)](),_0x590a09=this[_0x18581d(0x15b)](),_0x165ff1=_0x52dcf6?Infinity:_0x49cc01[_0x18581d(0x2ae)];if(_0x167dba&&this['x']!==_0x590a09){if(this['x']>_0x590a09)this['x']=Math[_0x18581d(0x2b6)](_0x590a09,this['x']-_0x165ff1);if(this['x']<_0x590a09)this['x']=Math['min'](_0x590a09,this['x']+_0x165ff1);}else{if(!_0x167dba&&this['x']!==_0x590a09){if(_0x18581d(0x23c)===_0x18581d(0x133)){function _0x550efd(){if(this['y']>_0x111bab)this['y']=_0x3d371a['max'](_0x1bc027,this['y']-_0xc2fcc5);if(this['y']<_0x480720)this['y']=_0x263725['min'](_0x3286a6,this['y']+_0x194b97);}}else{if(this['y']>_0x590a09)this['y']=Math[_0x18581d(0x2b6)](_0x590a09,this['y']-_0x165ff1);if(this['y']<_0x590a09)this['y']=Math[_0x18581d(0x22e)](_0x590a09,this['y']+_0x165ff1);}}}},Sprite_FieldMarkerATB[_0xd096ab(0x2e9)][_0xd096ab(0x15b)]=function(){const _0x588ac5=_0xd096ab,_0x2bf363=Sprite_FieldGaugeATB['Settings'],_0x59e1c2=this['battler'](),_0x3e4551=this[_0x588ac5(0x281)](),_0x50917d=this['_gaugeSprite'][_0x588ac5(0x265)][_0x588ac5(0x1a2)],_0x4b5d10=this[_0x588ac5(0x2bc)]['bitmap']['height'],_0x463344=_0x2bf363[_0x588ac5(0x12f)][_0x588ac5(0x22b)](0x0,0x1),_0x1e217b=_0x2bf363[_0x588ac5(0x243)];let _0x51e32a=_0x59e1c2[_0x588ac5(0x1da)]()*_0x463344;_0x51e32a+=(0x1-_0x463344)*_0x59e1c2['getAtbCastTimeRate']();if(_0x59e1c2===BattleManager[_0x588ac5(0x304)])_0x51e32a=0x1;if(!_0x1e217b)_0x51e32a=0x1-_0x51e32a;let _0x44595a=0x0;if(_0x3e4551)_0x44595a=_0x51e32a*_0x50917d;else!_0x3e4551&&(_0x44595a=_0x51e32a*_0x4b5d10);return Math[_0x588ac5(0x31b)](_0x44595a);},Sprite_FieldMarkerATB[_0xd096ab(0x2e9)]['updateGraphic']=function(){const _0x2008f8=_0xd096ab,_0x49960f=this['battler']();if(!_0x49960f)return;const _0x458eab=Sprite_FieldGaugeATB['Settings'],_0x23c75d=this[_0x2008f8(0x15d)]===$gameParty?_0x2008f8(0x298):_0x2008f8(0x2b0);let _0x4e9097=_0x49960f[_0x2008f8(0x2d8)]();if(_0x49960f[_0x2008f8(0x309)]()&&_0x4e9097===_0x2008f8(0x129))_0x4e9097=_0x2008f8(0x2bd);else _0x49960f[_0x2008f8(0x29e)]()&&_0x4e9097===_0x2008f8(0x1e8)&&(_0x4e9097='enemy');if(this[_0x2008f8(0x270)]!==_0x4e9097){if(_0x2008f8(0x1bb)===_0x2008f8(0x264)){function _0x55305c(){return _0x689a99(_0x47cb8b['$2']);}}else return this[_0x2008f8(0x146)]();}switch(this['_graphicType']){case _0x2008f8(0x2bd):if(this[_0x2008f8(0x2be)]!==_0x49960f[_0x2008f8(0x2cf)]())return this[_0x2008f8(0x146)]();if(this[_0x2008f8(0x1f3)]!==_0x49960f[_0x2008f8(0x1ea)]())return this[_0x2008f8(0x146)]();break;case _0x2008f8(0x238):if(this[_0x2008f8(0x1fd)]!==_0x49960f['fieldAtbGraphicIconIndex']())return this[_0x2008f8(0x146)]();break;case _0x2008f8(0x129):if(_0x49960f[_0x2008f8(0x157)]()){if(this[_0x2008f8(0x147)]!==_0x49960f[_0x2008f8(0x171)]()){if('ZrfKU'===_0x2008f8(0x294)){function _0x3c57f8(){const _0x364110=_0x2008f8;this[_0x364110(0x284)]();}}else return this['processUpdateGraphic']();}}else{if(this[_0x2008f8(0x234)]!==_0x49960f[_0x2008f8(0x27d)]()){if(_0x2008f8(0x163)==='ABRYJ')return this[_0x2008f8(0x146)]();else{function _0x12d534(){const _0x178fac=_0x2008f8;this['createBackgroundSprite'](),this[_0x178fac(0x14f)](),this[_0x178fac(0x127)](),this['createLetterSprite'](),this[_0x178fac(0x152)](),this[_0x178fac(0x21c)](!![]);}}}}break;case _0x2008f8(0x1e8):if(_0x49960f['isActor']()){if(_0x2008f8(0x161)==='uRUgV'){function _0x2ce114(){const _0x1c19e2=_0x2008f8;this['x']=_0x305b42[_0x1c19e2(0x2e0)]/0x2,this['x']+=_0x1ee3bd?_0x96862e:-_0xab553e;}}else{if(this['_graphicSv']!==_0x49960f[_0x2008f8(0x27d)]())return this['processUpdateGraphic']();}}else{if(this[_0x2008f8(0x234)]!==_0x49960f[_0x2008f8(0x27d)]())return this[_0x2008f8(0x146)]();}break;}},Sprite_FieldMarkerATB[_0xd096ab(0x2e9)][_0xd096ab(0x146)]=function(){const _0x2cdb1c=_0xd096ab,_0xb60b45=this[_0x2cdb1c(0x246)]();if(!_0xb60b45)return;this[_0x2cdb1c(0x270)]=_0xb60b45[_0x2cdb1c(0x2d8)]();if(_0xb60b45[_0x2cdb1c(0x309)]()&&this[_0x2cdb1c(0x270)]===_0x2cdb1c(0x129)){if('hJgwk'!==_0x2cdb1c(0x212))this['_graphicType']=_0x2cdb1c(0x2bd);else{function _0x535f85(){const _0x40e518=_0x2cdb1c;_0x45569d['BattleSystemATB'][_0x40e518(0x300)]['call'](this,_0xc5c0ff),_0x20371a[_0x40e518(0x131)][_0x40e518(0x2c5)](_0x4623d1);}}}else _0xb60b45[_0x2cdb1c(0x29e)]()&&this[_0x2cdb1c(0x270)]===_0x2cdb1c(0x1e8)&&(this['_graphicType']='enemy');let _0x5e1fd7;switch(this[_0x2cdb1c(0x270)]){case _0x2cdb1c(0x2bd):this[_0x2cdb1c(0x2be)]=_0xb60b45[_0x2cdb1c(0x2cf)](),this['_graphicFaceIndex']=_0xb60b45[_0x2cdb1c(0x1ea)](),_0x5e1fd7=ImageManager[_0x2cdb1c(0x1bc)](this[_0x2cdb1c(0x2be)]),_0x5e1fd7['addLoadListener'](this[_0x2cdb1c(0x286)][_0x2cdb1c(0x17b)](this,_0x5e1fd7));break;case _0x2cdb1c(0x238):this[_0x2cdb1c(0x1fd)]=_0xb60b45[_0x2cdb1c(0x15f)](),_0x5e1fd7=ImageManager[_0x2cdb1c(0x316)](_0x2cdb1c(0x198)),_0x5e1fd7[_0x2cdb1c(0x1b2)](this['changeIconGraphicBitmap'][_0x2cdb1c(0x17b)](this,_0x5e1fd7));break;case _0x2cdb1c(0x129):if(_0xb60b45[_0x2cdb1c(0x157)]()){if(_0x2cdb1c(0x164)===_0x2cdb1c(0x164))this[_0x2cdb1c(0x147)]=_0xb60b45[_0x2cdb1c(0x171)](),_0x5e1fd7=ImageManager[_0x2cdb1c(0x194)](this[_0x2cdb1c(0x147)]),_0x5e1fd7['addLoadListener'](this[_0x2cdb1c(0x16d)][_0x2cdb1c(0x17b)](this,_0x5e1fd7));else{function _0x3a98f4(){const _0x30a3c5=_0x2cdb1c;for(let _0x56b8a9=0x1;_0x56b8a9<=0x2;_0x56b8a9++){const _0x1c8103=_0x4795ae+_0x56b8a9;this[_0x30a3c5(0x17c)][_0x1c8103]=this[_0x30a3c5(0x1f6)](_0x45fcf2[_0x1c8103]);}}}}else{if($gameSystem[_0x2cdb1c(0x1ac)]()){if(_0x2cdb1c(0x134)!=='pFFwk')this[_0x2cdb1c(0x234)]=_0xb60b45[_0x2cdb1c(0x27d)](),_0x5e1fd7=ImageManager[_0x2cdb1c(0x17f)](this[_0x2cdb1c(0x234)]),_0x5e1fd7[_0x2cdb1c(0x1b2)](this['changeEnemyGraphicBitmap']['bind'](this,_0x5e1fd7));else{function _0x87dbba(){const _0xe3fc62=_0x2cdb1c;return this[_0xe3fc62(0x1c3)]===_0x4e15eb&&(this['_fieldAtbGaugeIconIndex']=this[_0xe3fc62(0x200)]()),this[_0xe3fc62(0x1c3)];}}}else this['_graphicEnemy']=_0xb60b45[_0x2cdb1c(0x27d)](),_0x5e1fd7=ImageManager[_0x2cdb1c(0x15c)](this[_0x2cdb1c(0x234)]),_0x5e1fd7[_0x2cdb1c(0x1b2)](this[_0x2cdb1c(0x14c)][_0x2cdb1c(0x17b)](this,_0x5e1fd7));}break;case'svactor':this['_graphicSv']=_0xb60b45[_0x2cdb1c(0x27d)](),_0x5e1fd7=ImageManager[_0x2cdb1c(0x194)](this[_0x2cdb1c(0x147)]),_0x5e1fd7[_0x2cdb1c(0x1b2)](this['changeSvActorGraphicBitmap']['bind'](this,_0x5e1fd7));break;}},Sprite_FieldMarkerATB[_0xd096ab(0x2e9)]['changeFaceGraphicBitmap']=function(_0x40d25c){const _0xcfc680=_0xd096ab,_0x1dd18b=Sprite_FieldGaugeATB['Settings'],_0xdee560=_0x1dd18b['MarkerSize'],_0x159577=this['_graphicFaceIndex'];this[_0xcfc680(0x317)]['bitmap']=new Bitmap(_0xdee560,_0xdee560);const _0x396c51=this['_graphicSprite'][_0xcfc680(0x265)],_0x364fb1=ImageManager[_0xcfc680(0x2ac)],_0x97aa8c=ImageManager[_0xcfc680(0x1b1)],_0x52cb6f=ImageManager['faceWidth'],_0x3163e2=ImageManager[_0xcfc680(0x1b1)],_0x5ab7a5=_0x159577%0x4*_0x364fb1+(_0x364fb1-_0x52cb6f)/0x2,_0x15034e=Math['floor'](_0x159577/0x4)*_0x97aa8c+(_0x97aa8c-_0x3163e2)/0x2;_0x396c51[_0xcfc680(0x26c)](_0x40d25c,_0x5ab7a5,_0x15034e,_0x52cb6f,_0x3163e2,0x0,0x0,_0xdee560,_0xdee560);},Sprite_FieldMarkerATB['prototype']['changeIconGraphicBitmap']=function(_0x17120f){const _0x2bc87c=_0xd096ab,_0x502963=Sprite_FieldGaugeATB['Settings'],_0x1c99ab=_0x502963['MarkerSize'],_0x58c2cf=this['_graphicIconIndex'];this[_0x2bc87c(0x317)]['bitmap']=new Bitmap(_0x1c99ab,_0x1c99ab);const _0x55506=this[_0x2bc87c(0x317)][_0x2bc87c(0x265)],_0xaa9c41=ImageManager[_0x2bc87c(0x310)],_0x11ff51=ImageManager[_0x2bc87c(0x2b4)],_0x3c25eb=_0x58c2cf%0x10*_0xaa9c41,_0x581302=Math[_0x2bc87c(0x1fa)](_0x58c2cf/0x10)*_0x11ff51;_0x55506[_0x2bc87c(0x26c)](_0x17120f,_0x3c25eb,_0x581302,_0xaa9c41,_0x11ff51,0x0,0x0,_0x1c99ab,_0x1c99ab);},Sprite_FieldMarkerATB[_0xd096ab(0x2e9)]['changeSvActorGraphicBitmap']=function(_0x453aae){const _0x3c2b34=_0xd096ab,_0x5cef7a=Sprite_FieldGaugeATB[_0x3c2b34(0x2d3)],_0x136f58=_0x5cef7a[_0x3c2b34(0x276)];this[_0x3c2b34(0x317)][_0x3c2b34(0x265)]=new Bitmap(_0x136f58,_0x136f58);const _0x13230c=this['_graphicSprite']['bitmap'],_0x4155ad=0x9,_0x4726dd=0x6,_0x28169b=_0x453aae['width']/_0x4155ad,_0x1f1fe1=_0x453aae[_0x3c2b34(0x2f5)]/_0x4726dd,_0x384048=Math[_0x3c2b34(0x22e)](0x1,_0x136f58/_0x28169b,_0x136f58/_0x1f1fe1),_0x110755=_0x28169b*_0x384048,_0x3d8772=_0x1f1fe1*_0x384048,_0x581717=Math['round']((_0x136f58-_0x110755)/0x2),_0x139773=Math['round']((_0x136f58-_0x3d8772)/0x2);_0x13230c['blt'](_0x453aae,0x0,0x0,_0x28169b,_0x1f1fe1,_0x581717,_0x139773,_0x110755,_0x3d8772);},Sprite_FieldMarkerATB[_0xd096ab(0x2e9)]['changeEnemyGraphicBitmap']=function(_0x21dc04){const _0x18168c=_0xd096ab,_0x3c9311=Sprite_FieldGaugeATB[_0x18168c(0x2d3)],_0x56951f=_0x3c9311['MarkerSize'];this[_0x18168c(0x317)][_0x18168c(0x265)]=new Bitmap(_0x56951f,_0x56951f);const _0x293c0c=this['_graphicSprite'][_0x18168c(0x265)],_0x2f4abc=Math[_0x18168c(0x22e)](0x1,_0x56951f/_0x21dc04[_0x18168c(0x1a2)],_0x56951f/_0x21dc04['height']),_0x37ae02=_0x21dc04[_0x18168c(0x1a2)]*_0x2f4abc,_0x2b00f9=_0x21dc04[_0x18168c(0x2f5)]*_0x2f4abc,_0x19a7c7=Math[_0x18168c(0x31b)]((_0x56951f-_0x37ae02)/0x2),_0x2e47be=Math[_0x18168c(0x31b)]((_0x56951f-_0x2b00f9)/0x2);_0x293c0c[_0x18168c(0x26c)](_0x21dc04,0x0,0x0,_0x21dc04['width'],_0x21dc04[_0x18168c(0x2f5)],_0x19a7c7,_0x2e47be,_0x37ae02,_0x2b00f9);},Sprite_FieldMarkerATB[_0xd096ab(0x2e9)][_0xd096ab(0x2c0)]=function(){const _0x457bf8=_0xd096ab,_0x6f8323=this[_0x457bf8(0x246)]();if(!_0x6f8323)return;if(!_0x6f8323[_0x457bf8(0x29e)]())return;if(this[_0x457bf8(0x1a3)]===_0x6f8323[_0x457bf8(0x2a4)]())return;this[_0x457bf8(0x1a3)]=_0x6f8323[_0x457bf8(0x2a4)]();if(_0x6f8323[_0x457bf8(0x157)]())this[_0x457bf8(0x1a3)]=0x0;this[_0x457bf8(0x317)][_0x457bf8(0x22a)](this['_graphicHue']);},Sprite_FieldMarkerATB[_0xd096ab(0x2e9)]['updateLetter']=function(){const _0x480dd5=_0xd096ab;if(!this[_0x480dd5(0x241)])return;const _0x35f083=this[_0x480dd5(0x246)]();if(!_0x35f083)return;if(this[_0x480dd5(0x165)]===_0x35f083[_0x480dd5(0x165)]&&this[_0x480dd5(0x1e3)]===_0x35f083[_0x480dd5(0x1e3)])return;this[_0x480dd5(0x165)]=_0x35f083[_0x480dd5(0x165)],this[_0x480dd5(0x1e3)]=_0x35f083[_0x480dd5(0x1e3)];const _0x5e0c0a=Sprite_FieldGaugeATB['Settings'],_0xfe1a22=_0x5e0c0a[_0x480dd5(0x276)],_0x1f6f98=Math[_0x480dd5(0x1fa)](_0xfe1a22/0x2),_0x26df4d=this[_0x480dd5(0x241)][_0x480dd5(0x265)];_0x26df4d[_0x480dd5(0x136)]();if(!this[_0x480dd5(0x1e3)])return;_0x26df4d[_0x480dd5(0x18b)]=_0x5e0c0a[_0x480dd5(0x13c)]||$gameSystem[_0x480dd5(0x19a)](),_0x26df4d['fontSize']=_0x5e0c0a[_0x480dd5(0x221)]||0x10,_0x26df4d[_0x480dd5(0x306)](this[_0x480dd5(0x165)],0x2,_0x1f6f98,_0xfe1a22-0x4,_0x1f6f98-0x2,_0x480dd5(0x2dc));},Sprite_FieldMarkerATB[_0xd096ab(0x2e9)][_0xd096ab(0x2c2)]=function(){const _0x5e9075=_0xd096ab,_0x5694be=this['battler']();if(!_0x5694be)return;const _0x3d44e5=_0x5694be[_0x5e9075(0x246)]();if(!_0x3d44e5)return;const _0x383e37=_0x3d44e5['mainSprite']();if(!_0x383e37)return;this[_0x5e9075(0x1f2)](_0x383e37[_0x5e9075(0x289)]);};