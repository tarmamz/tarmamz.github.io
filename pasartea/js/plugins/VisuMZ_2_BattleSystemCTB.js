//=============================================================================
// VisuStella MZ - Battle System CTB - Charge Turn Battle
// VisuMZ_2_BattleSystemCTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemCTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemCTB = VisuMZ.BattleSystemCTB || {};
VisuMZ.BattleSystemCTB.version = 1.07;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.07] [BattleSystemCTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_CTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin creates a Charge Turn Battle (CTB) system using RPG Maker MZ's
 * TPB as a base. CTB functions by calculating the speed of every battler and
 * balancing them relative to one another. When it's a battler's turn, the
 * battler will either choose an action to perform immediately or charge it
 * for later depending if the skill requires charging.
 * 
 * This is a battle system where agility plays an important factor in the
 * progress of battle where higher agility values give battlers more advantage
 * and additional turns over lower agility values, which give battlers less
 * advantage and less turns.
 * 
 * A turn order display will appear to compensate for the removal of gauges.
 * The turn order display will show a preview of what the turn order could
 * possibly be like. This turn order display is variable and can be changed
 * due to player and enemy influence by using different action speeds, effects
 * provided by this plugin that alter the turn order, and more!
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ctb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Full control over the TPB integrated mechanics converted for CTB such as
 *   speed, calculations, etc.
 * * No more waiting for gauges to show up! In fact, you won't even see the
 *   TPB gauge in-game.
 * * A turn order display that previews a potential lineup for how the
 *   participating battlers in battle will play out.
 * * Notetags that give skills and items access to manipulating a battler's
 *   CTB speed.
 * * Notetags that give skills and items access to directly manipulate a target
 *   batter's position on the Turn Order display.
 * * These mechanics are separate from ATB and TPB itself, so you can still use
 *   either battle system without affecting both of them.
 * * Through the Core Engine, you can switch in and out of CTB for a different
 *   battle system.
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
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
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
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ctb".
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
 * Turn Order Display
 * 
 * Despite the fact that the Battle System CTB plugin uses RPG Maker MZ's TPB
 * as a base, it does not have any gauges to depict the time it takes for a
 * battler's turn to appear. Instead, a turn order display appears on the
 * screen (you pick where it can appear: top, bottom, left, or right) and shows
 * a possible preview of the battler turn order.
 * 
 * This is only a preview of what can happen because lots of different things
 * can influence the position and ordering of the turn order display, ranging
 * from skill/item speeds, notetag effects, changes in AGI, etc. What is seen
 * on the turn order display is the most likely possibility instead of the
 * exact order to occur due to the external influences.
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
 * However, this isn't the case with RPG Maker MZ's TPB. By changing it to CTB,
 * skills and items with positive speed values will have an impact on how full
 * their CTB Speed will be in the following turn. A value of 2000 will put the
 * turn at 50% ready, 1000 will put the gauge at 25% ready, 500 will put it at
 * 12.5% ready, and so on. Notetags can also be used to influence this.
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
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === General CTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <CTB Help>
 *  description
 *  description
 * </CTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under CTB.
 * - This is primarily used if the skill behaves differently in CTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to CTB.
 *
 * ---
 * 
 * === CTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the CTB Turn Order Display
 * 
 * ---
 *
 * <CTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <CTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <CTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === CTB Speed Manipulation-Related Notetags ===
 * 
 * These notetags are used for CTB Speed manipulation purposes.
 * 
 * ---
 *
 * <CTB Set Order: x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the target's CTB Turn Order position to exactly x.
 * - Replace 'x' with a number value depicting the exact position of the turn
 *   order position. 0 is the currently active battler and cannot be used.
 *   1 is closest to taking a turn. Higher numbers are further away.
 * - This does not affect the currently active battler.
 *
 * ---
 *
 * <CTB Change Order: +x>
 * <CTB Change Order: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the target's CTB Turn Order position by x slots.
 * - Replace 'x' with a number value indicating the increase or decrease.
 *   Negative values decrease the turns needed to wait while positive values
 *   increase the turns needed.
 * - This does not affect the currently active battler.
 *
 * ---
 *
 * <CTB After Speed: x%>
 *
 * - Used for: Skill, Item Notetags
 * - After using the skill/item, the user's CTB Speed will be set to x%.
 * - Replace 'x' with a percentile value representing the amount you want the
 *   CTB Speed to reset to after the skill/item's usage.
 * 
 * ---
 * 
 * <CTB Charge Speed: x%>
 * <CTB Charge Speed: +x%>
 * <CTB Charge Speed: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a charging state, change the target's speed amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the CTB
 *   Speed you wish to alter it to/by.
 * - This only affects targets who are in a charging state.
 * 
 * ---
 * 
 * <CTB Cast Speed: x%>
 * <CTB Cast Speed: +x%>
 * <CTB Cast Speed: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a casting state, change the target's speed amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the CTB
 *   Speed you wish to alter it to/by.
 * - This only affects targets who are in a casting state.
 * 
 * ---
 * 
 * === JavaScript Notetags: CTB Speed Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional CTB Speed Manipulation.
 * 
 * ---
 * 
 * <JS CTB Order>
 *  code
 *  code
 *  order = code;
 * </JS CTB Order>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine where to set the target's
 *   order on the CTB Turn Order Display to.
 * - The 'order' variable represents the final position on the Turn Order
 *   Display to place the target.
 * - The 'position' variable represents the target's current position on the
 *   Turn Order Display.
 * - This does not affect the currently active battler.
 * 
 * ---
 * 
 * <JS CTB Charge Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB Charge Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to if the target is in a charging state.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current CTB Speed rate
 *   if the target is in a charging state.
 * 
 * ---
 * 
 * <JS CTB Cast Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB Cast Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to if the target is in a casting state.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current CTB Speed rate
 *   if the target is in a casting state.
 * 
 * ---
 * 
 * <JS CTB After Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB After Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to after performing this skill/item action.
 * - The 'rate' variable represents rate value the CTB Speed will change to
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
 * Actor: Change CTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the CTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 * 
 * Actor: Change CTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the CTB Turn Order.
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
 * Actor: Clear CTB Turn Order Graphic
 * - Clears the CTB Turn Order graphics for the actor(s).
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
 * Enemy: Change CTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the CTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change CTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the CTB Turn Order.
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
 * Enemy: Clear CTB Turn Order Graphic
 * - Clears the CTB Turn Order graphics for the enemy(ies).
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
 * System: CTB Turn Order Visibility
 * - Determine the visibility of the CTB Turn Order Display.
 * 
 *   Visibility:
 *   - Changes the visibility of the CTB Turn Order Display.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings used for Battle System CTB. The majority of these are
 * JavaScript-based and will require knowledge of JavaScript to fully utilize
 * the plugin parameters.
 *
 * ---
 *
 * General
 * 
 *   Escape Fail Penalty:
 *   - Gauge penalty if an escape attempt fails.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Initial Speed:
 *   - JavaScript code to determine how much speed to give each battler at the
 *     start of battle.
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
 * Plugin Parameters: Order Change Effects Settings
 * ============================================================================
 * 
 * Whenever the turn order a battler is changed by a CTB Order notetag, play
 * these effects on the target battler. These effects do not play if the order
 * was changed due to speed changes and only through the specific notetags.
 *
 * ---
 *
 * Delay Turn Order > Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Occurs when the turn order is delayed.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Occurs when the turn order is delayed.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Occurs when the turn order is delayed.
 *
 * ---
 *
 * Delay Turn Order > Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Occurs when the turn order is delayed.
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
 * Rush Turn Order > Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Occurs when the turn order is rushed.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Occurs when the turn order is rushed.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Occurs when the turn order is rushed.
 *
 * ---
 *
 * Rush Turn Order > Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Occurs when the turn order is rushed.
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
 * Plugin Parameters: Turn Order Display Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System CTB. These adjust how the
 * visible turn order appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 * 
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *   Reposition Log?:
 *   - If the display position is at the top, reposition the Battle Log Window
 *     to be lower?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *   - Settings may vary depending on position.
 *   - Left to Right / Down to Up
 *   - Right to Left / Up to Down
 * 
 *   Subject Distance:
 *   - How far do you want the currently active battler to distance itself from
 *     the rest of the Turn Order?
 * 
 *   Screen Buffer:
 *   - What distance do you want the display to be away from the edge of the
 *     screen by?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's coordinates by this much when the Help Window
 *     is visible.
 *
 * ---
 *
 * Slots
 * 
 *   Total Horizontal:
 *   - How many slots do you want to display for top and bottom Turn Order
 *     Display positions?
 * 
 *   Total Vertical:
 *   - How many slots do you want to display for left and right Turn Order
 *     Display positions?
 * 
 *   Length:
 *   - How many pixels long should the slots be on the Turn Order display?
 * 
 *   Thin:
 *   - How many pixels thin should the slots be on the Turn Order display?
 * 
 *   Update Frames:
 *   - How many frames should it take for the slots to update their
 *     positions by?
 *
 * ---
 *
 * Slot Border
 * 
 *   Show Border?:
 *   - Show borders for the slot sprites?
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
 * Slot Sprites
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
 * Slot Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the slot sprite?
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
 * Slot Background
 * 
 *   Show Background?:
 *   - Show the background on the slot sprite?
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
 * Version 1.07: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 * 
 * Version 1.06: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * ** Added in a built-in anti-softlock check.
 * 
 * Version 1.05: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.04: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: November 1, 2020
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Optimization Update!
 * ** Uses less resources for turn order display.
 * * New Features!
 * ** New Plugin Command by Irina!
 * *** Actor: Change CTB Turn Order Face
 * **** Changes the faces used for the specific actor(s) on the CTB Turn Order.
 * 
 * Version 1.02: October 25, 2020
 * * Bug Fixes!
 * ** Turn Order icons no longer stay invisible after rotating out completely.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Feature Update!
 * ** <CTB Turn Order Face: filename, index> notetag now works with actors.
 *    Update made by Irina.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Action times + should no longer freeze the game. Fix made by Yanfly.
 * ** Actors and enemies without actions will no longer softlock the game.
 *    Fix made by Yanfly.
 * ** Auto-battle during CTB should no longer lock the game! Fix by Yanfly.
 * ** Enemies without any actions should no longer cause endless loops.
 *    Fix made by Yanfly.
 * ** SV_Actor graphics on the Turn Order display are now centered.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release: October 19, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderActorIcon
 * @text Actor: Change CTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the CTB Turn Order.
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
 * @command CtbTurnOrderActorFace
 * @text Actor: Change CTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the CTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderClearActorGraphic
 * @text Actor: Clear CTB Turn Order Graphic
 * @desc Clears the CTB Turn Order graphics for the actor(s).
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
 * @command CtbTurnOrderEnemyIcon
 * @text Enemy: Change CTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the CTB Turn Order.
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
 * @command CtbTurnOrderEnemyFace
 * @text Enemy: Change CTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the CTB Turn Order.
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
 * @command CtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear CTB Turn Order Graphic
 * @desc Clears the CTB Turn Order graphics for the enemy(ies).
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
 * @command SystemTurnOrderVisibility
 * @text System: CTB Turn Order Visibility
 * @desc Determine the visibility of the CTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the CTB Turn Order Display.
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
 * @param BattleSystemCTB
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
 * @desc Mechanics settings used for Battle System CTB.
 * @default {"General":"","EscapeFailPenalty:num":"-1.00","JavaScript":"","InitialGaugeJS:str":"Math.random() * 0.50","TpbSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\n\\n// Process Calculation\\nlet speed = Math.sqrt(user.agi) + 1;\\n\\n// Return Value\\nreturn speed;\"","TpbBaseSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\nconst baseAgility = user.paramBasePlus(6);\\n\\n// Process Calculation\\nlet speed = Math.sqrt(baseAgility) + 1;\\n\\n// Return Value\\nreturn speed;\"","BattlerRelativeSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbSpeed()\\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\\n\\n// Process Calculation\\nlet relativeSpeed = speed / partyBaseSpeed;\\n\\n// Return Value\\nreturn relativeSpeed;\"","TpbAccelerationJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbRelativeSpeed();\\nconst referenceTime = $gameParty.tpbReferenceTime();\\n\\n// Process Calculation\\nlet acceleration = speed / referenceTime;\\n\\n// Return Value\\nreturn acceleration;\"","TpbCastTimeJS:func":"\"// Declare Constants\\nconst user = this;\\nconst actions = user._actions.filter(action => action.isValid());\\nconst items = actions.map(action => action.item());\\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\\n\\n// Process Calculation\\nlet time = Math.sqrt(delay) / user.tpbSpeed();\\n\\n// Return Value\\nreturn time;\""}
 *
 * @param Effect:struct
 * @text Order Change Effects
 * @type struct<Effect>
 * @desc Effects to play when the Turn Order is changed in CTB.
 * @default {"Delay":"","DelayAnimation":"","DelayAnimationID:num":"54","DelayMirror:eval":"false","DelayMute:eval":"false","DelayPopups":"","DelayPopupText:str":"DELAY","DelayTextColor:str":"25","DelayFlashColor:eval":"[255, 0, 0, 160]","DelayFlashDuration:num":"60","Rush":"","RushAnimation":"","RushAnimationID:num":"51","RushMirror:eval":"false","RushMute:eval":"false","RushPopups":"","RushPopupText:str":"RUSH","RushTextColor:str":"24","RushFlashColor:eval":"[0, 255, 0, 160]","RushFlashDuration:num":"60"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System CTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","TotalHorzSprites:num":"16","TotalVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
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
 * @param JavaScript
 *
 * @param InitialGaugeJS:str
 * @text JS: Initial Speed
 * @parent JavaScript
 * @desc JavaScript code to determine how much speed to give
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
 * Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Effect:
 *
 * @param Delay
 * @text Delay Turn Order
 * 
 * @param DelayAnimation
 * @text Animation
 * @parent Delay
 *
 * @param DelayAnimationID:num
 * @text Animation ID
 * @parent DelayAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Occurs when the turn order is delayed.
 * @default 54
 *
 * @param DelayMirror:eval
 * @text Mirror Animation
 * @parent DelayAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Occurs when the turn order is delayed.
 * @default false
 *
 * @param DelayMute:eval
 * @text Mute Animation
 * @parent DelayAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Occurs when the turn order is delayed.
 * @default false
 *
 * @param DelayPopups
 * @text Popups
 * @parent Delay
 *
 * @param DelayPopupText:str
 * @text Text
 * @parent DelayPopups
 * @desc Text displayed upon the effect activating.
 * Occurs when the turn order is delayed.
 * @default DELAY
 *
 * @param DelayTextColor:str
 * @text Text Color
 * @parent DelayPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param DelayFlashColor:eval
 * @text Flash Color
 * @parent DelayPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param DelayFlashDuration:num
 * @text Flash Duration
 * @parent DelayPopups
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Rush
 * @text Rush Turn Order
 * 
 * @param RushAnimation
 * @text Animation
 * @parent Rush
 *
 * @param RushAnimationID:num
 * @text Animation ID
 * @parent RushAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Occurs when the turn order is rushed.
 * @default 51
 *
 * @param RushMirror:eval
 * @text Mirror Animation
 * @parent RushAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Occurs when the turn order is rushed.
 * @default false
 *
 * @param RushMute:eval
 * @text Mute Animation
 * @parent RushAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Occurs when the turn order is rushed.
 * @default false
 *
 * @param RushPopups
 * @text Popups
 * @parent Rush
 *
 * @param RushPopupText:str
 * @text Text
 * @parent RushPopups
 * @desc Text displayed upon the effect activating.
 * Occurs when the turn order is rushed.
 * @default RUSH
 *
 * @param RushTextColor:str
 * @text Text Color
 * @parent RushPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param RushFlashColor:eval
 * @text Flash Color
 * @parent RushPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 255, 0, 160]
 * 
 * @param RushFlashDuration:num
 * @text Flash Duration
 * @parent RushPopups
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Turn Order Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TurnOrder:
 *
 * @param General
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Turn Order will appear on the screen.
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
 * display when the help window is open?
 * @default true
 *
 * @param RepositionLogWindow:eval
 * @text Reposition Log?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * Battle Log Window to be lower?
 * @default true
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Down to Up
 * @off Right to Left / Up to Down
 * @desc Decide on the direction of the Turn Order.
 * Settings may vary depending on position.
 * @default true
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 8
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 20
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default 96
 * 
 * @param Slots
 *
 * @param TotalHorzSprites:num
 * @text Total Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many slots do you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param TotalVertSprites:num
 * @text Total Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many slots do you want to display for left and
 * right Turn Order Display positions?
 * @default 10
 *
 * @param SpriteLength:num
 * @text Length
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels long should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteThin:num
 * @text Thin
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels thin should the slots be on the
 * Turn Order display?
 * @default 36
 *
 * @param UpdateFrames:num
 * @text Update Frames
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many frames should it take for the slots to
 * update their positions by?
 * @default 24
 *
 * @param Border
 * @text Slot Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the slot sprites?
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
 * @text Slot Sprites
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
 * @text Slot Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the slot sprite?
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
 * @text Slot Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the slot sprite?
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
 * @default 19
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
 * @default 19
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
 */
//=============================================================================

const _0x52cf=['Actor','changeEnemyGraphicBitmap','bitmap','%1FlashColor','createTurnOrderCTBGraphicFaceName','_anti_CTB_SoftlockCount','SpriteThin','_index','updateTpbCastTime','faceHeight','prepare','_graphicSv','%1\x20%2\x20%3','format','Window_Help_setItem','battleEnd','Delay','updatePosition','%1PopupText','(?:CTB)','description','IconSet','FUNC','return\x200','_graphicFaceIndex','_isBattleOver','EVAL','appear','max','onDatabaseLoaded','startFade','min','createAllWindows','item','TpbCastTimeJS','createGraphicSprite','18736xeeAAM','TurnOrder','FaceName','updateTurnOrder','applyCTBPenalty','sort','ParseAllNotetags','Enemy','ParseItemNotetags','_letterSprite','checkPosition','changeFaceGraphicBitmap','Game_Action_applyGlobal','Cast','clearRect','isValid','createTestBitmap','skills','DisplayPosition','updateTpbBattler','initMembers','iconHeight','createCTBTurnOrderWindow','version','setTurnOrderCTB','_forcing','EnemyBattlerType','ctbTicksToGoalAddedCastTime','isAnyBattlerReadyCTB','updateTpbChargeTimeCTB','isCtbChargingState','processUpdateGraphic','%1Mute','RepositionTopForHelp','isHorz','opacity','loadSystem','allBattleMembers','_graphicType','isActing','battleSys','_turnOrderContainer','compareBattlerSprites','SpriteLength','width','battler','removeCurrentAction','changeSvActorGraphicBitmap','_positionDuration','Game_Battler_tpbSpeed','606121FgROMI','17QclXNU','_homeY','EnemyBattlerFaceIndex','_graphicEnemy','DisplayOffsetX','_position','fontSize','BattleSystemCTB','updateTpbChargeTime','TotalVertSprites','loadSvEnemy','ShowMarkerBorder','_logWindow','Game_Battler_tpbRequiredCastTime','%1Mirror','rotateCTBSprites','registerCommand','floor','IconIndex','isDead','loadFace','isEnemy','Actors','isActiveTpb','includes','actor','ConvertParams','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','BattleManager_isTpb','clearTpbChargeTime','_graphicSprite','(?:GAUGE|TIME|SPEED)','CtbTurnOrderClearActorGraphic','_positionTargetY','processTurnOrderChangeCTB','setCtbChargeTime','1EcgSQF','round','clearTpbChargeTimeCTB','bottom','After','Game_Battler_tpbRelativeSpeed','Game_Battler_onRestrict','EnemyBattlerIcon','filter','_ctbTurnOrderGraphicType','ActorBattlerIcon','BattleManager_updateTurn','isAlive','_subject','addInnerChild','createTurnOrderCTBGraphicFaceIndex','ARRAYFUNC','isTpb','battlerHue','tpbAcceleration','bind','processCtbAntiSoftlock','createRateJS','OrderJS','updateBattleContainerOrder','prototype','getColor','CtbTurnOrderClearEnemyGraphic','Game_BattlerBase_hide','isCTB','changeTurnOrderByCTB','updateTpb','map','checkOpacity','_actionBattlers','TurnOrderCTBGraphicIconIndex','updateTurnCTB','numActions','_unit','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','ARRAYJSON','casting','trim','createBorderSprite','%1TextColor','createTurnOrderCTBGraphicIconIndex','log','RegExp','startBattle','Enemies','_isAlive','isPlaytest','isSceneBattle','ParseSkillNotetags','applyItemBattleSystemCTBUserEffect','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Game_Battler_applyTpbPenalty','updatePadding','changeCtbCastTime','_tpbChargeTime','clamp','windowRect','setBattleSystemCTBTurnOrderVisible','exit','startAction','#000000','anchor','faceIndex','subject','process_VisuMZ_BattleSystemCTB_JS_Notetags','rotateDupeNumber','CtbTurnOrderEnemyFace','updateGraphicHue','createBackgroundSprite','processTurn','_fadeTarget','concat','%1BgColor2','maxBattleMembers','RepositionLogWindow','createOrderJS','tpbChargeTime','_ctbTurnOrderFaceName','right','Game_Action_applyItemUserEffect','Anti-CTB\x20Softlock\x20Count:','enemy','updateVisibility','Class-%1-%2','call','visible','_isAppeared','toUpperCase','1343379vdzkum','createTurnOrderCTBGraphicType','CtbTurnOrderActorIcon','onTpbCharged','addLoadListener','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20position\x20=\x20target.getCurrentTurnOrderPositionCTB();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20order\x20=\x20position;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(order)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20order\x20=\x20position;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20order;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','height','updateTurn','BattlerRelativeSpeedJS','boxHeight','mainFontFace','Game_Battler_updateTpbChargeTime','getBattleSystem','updateAllTpbBattlers','_scene','charging','EnemyBattlerFontSize','face','_turnOrderInnerSprite','TurnOrderCTBGraphicType','_graphicHue','_positionTargetX','_ctbTurnOrderFaceIndex','tpbBaseSpeed','createInitialPositions','setActionState','updateSelectionEffect','containerPosition','otherCtbChecksPassed','813825QlVNUG','createChildren','VisuMZ_1_BattleCore','Game_Battler_tpbBaseSpeed','push','STR','icon','MIN_SAFE_INTEGER','VisuMZ_0_CoreEngine','svBattlerName','Window_StatusBase_placeGauge','FaceIndex','updateGraphic','constructor','changeIconGraphicBitmap','placeGauge','updateAllTpbBattlersCTB','svactor','%1BgColor1','ctbStopped','drawText','some','Game_System_initialize','tpbSpeed','updateTurnOrderCTB','_ogWindowLayerY','%1AnimationID','ceil','BattleManager_updateAllTpbBattlers','hasSvBattler','applyGlobal','1vUkcce','631577BkWFQR','match','BattleManager_startActorInput','children','tpbRequiredCastTime','createBattlerSprites','_tpbState','_graphicFaceName','initTpbChargeTimeCTB','preEndActionCTB','_inputting','setCtbCastTime','gradientFillRect','TurnOrderCTBGraphicFaceIndex','EnemyBattlerFontFace','_graphicIconIndex','BorderThickness','create','initTpbChargeTime','_ctbTurnOrderIconIndex','_fadeDuration','Mechanics','checkCtbAntiSoftlock','name','TurnOrderCTBGraphicFaceName','battlerName','Game_Battler_tpbAcceleration','mainSprite','ctbTicksToGoal','Settings','requestMotionRefresh','isSideView','rotateCTBSprite','Scene_Battle_createAllWindows','_ctbTurnOrderVisible','top','TpbAccelerationJS','endAction','bitmapWidth','onRestrict','speed','isAttack','Order','ActorBattlerType','getCurrentTurnOrderPositionCTB','_dupe','%1SystemBg','iconWidth','Scene_Boot_onDatabaseLoaded','_ctbAfterSpeed','ARRAYEVAL','TpbBaseSpeedCalcJS','Weapon-%1-%2','reduce','_letter','requestFauxAnimation','EnemyBattlerFaceName','isBattleSystemCTBTurnOrderVisible','applyItemUserEffect','Armor-%1-%2','initialize','setCtbAfterSpeed','SystemTurnOrderVisibility','Game_Battler_clearTpbChargeTime','Game_Battler_updateTpbCastTime','postEndActionCTB','process_VisuMZ_BattleSystemCTB_CreateRegExp','turn','RepositionTopHelpX','ARRAYSTRUCT','ShowMarkerBg','_onRestrictBypassCtbReset','members','TotalHorzSprites','tpbRelativeSpeed','updateTpbCastTimeCTB','blt','changeCtbChargeTime','isAppeared','defaultPosition','isActor','hide','applyBattleSystemCTBUserEffect','fillRect','traitObjects','ticksLeft','Visible','DisplayOffsetY','CtbTurnOrderActorFace','EscapeFailPenalty','initBattleSystemCTB','createKeyJS','note','612757AzpIVM','SubjectDistance','_homeX','undecided','bitmapHeight','Skill-%1-%2','_phase','CTB','updateOpacity','createLetterSprite','setItem','Parse_Notetags_CreateJS','left','BattleManager_endAction','CtbTurnOrderEnemyIcon','ARRAYSTR','center','update','_windowLayer','_plural','<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>','currentAction','isInputting','getCtbCastTimeRate','updateLetter','_backgroundSprite','_ogWindowLayerX','InitialGaugeJS','Charge','ScreenBuffer','MAX_SAFE_INTEGER','Rush','parse','applyTpbPenalty','loadSvActor','isPassCTB','status','getChildIndex','Game_Battler_initTpbChargeTime','addChild','faceWidth','clearTurnOrderCTBGraphics','repositionLogWindowCTB','JSON','_ctbTurnOrderWindow','BattleManager_startBattle','46090fcEPtp','Enemy-%1-%2','isCtbCastingState','_helpWindow','UpdateFrames','RepositionTopHelpY','indexOf','onCtbOrderChange','_tpbCastTime','containerWindow'];const _0xa66d=function(_0x33d45d,_0xe05755){_0x33d45d=_0x33d45d-0xc9;let _0x52cff4=_0x52cf[_0x33d45d];return _0x52cff4;};const _0x1dd8db=_0xa66d;(function(_0x3efccc,_0x4649b6){const _0x440142=_0xa66d;while(!![]){try{const _0x421ee9=parseInt(_0x440142(0xf1))+-parseInt(_0x440142(0x26d))+-parseInt(_0x440142(0x1f0))*-parseInt(_0x440142(0x176))+parseInt(_0x440142(0x210))+parseInt(_0x440142(0x152))*parseInt(_0x440142(0x11f))+parseInt(_0x440142(0x151))+-parseInt(_0x440142(0x1d3))*parseInt(_0x440142(0x20f));if(_0x421ee9===_0x4649b6)break;else _0x3efccc['push'](_0x3efccc['shift']());}catch(_0x367f5d){_0x3efccc['push'](_0x3efccc['shift']());}}}(_0x52cf,0x704d5));var label=_0x1dd8db(0x159),tier=tier||0x0,dependencies=[_0x1dd8db(0x1f8),_0x1dd8db(0x1f2)],pluginData=$plugins[_0x1dd8db(0x17e)](function(_0x2b0a66){const _0xb3749c=_0x1dd8db;return _0x2b0a66[_0xb3749c(0xe7)]&&_0x2b0a66[_0xb3749c(0x10f)][_0xb3749c(0x16a)]('['+label+']');})[0x0];VisuMZ[label][_0x1dd8db(0x22d)]=VisuMZ[label][_0x1dd8db(0x22d)]||{},VisuMZ[_0x1dd8db(0x16c)]=function(_0x5a13cd,_0x14d86b){const _0x14cc97=_0x1dd8db;for(const _0x318d0c in _0x14d86b){if(_0x318d0c[_0x14cc97(0x211)](/(.*):(.*)/i)){const _0x2eb899=String(RegExp['$1']),_0x5632fc=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x25e0fb,_0x4b2e19,_0x18ecfe;switch(_0x5632fc){case'NUM':_0x25e0fb=_0x14d86b[_0x318d0c]!==''?Number(_0x14d86b[_0x318d0c]):0x0;break;case'ARRAYNUM':_0x4b2e19=_0x14d86b[_0x318d0c]!==''?JSON['parse'](_0x14d86b[_0x318d0c]):[],_0x25e0fb=_0x4b2e19[_0x14cc97(0x196)](_0x5568d8=>Number(_0x5568d8));break;case _0x14cc97(0x115):_0x25e0fb=_0x14d86b[_0x318d0c]!==''?eval(_0x14d86b[_0x318d0c]):null;break;case _0x14cc97(0x242):_0x4b2e19=_0x14d86b[_0x318d0c]!==''?JSON[_0x14cc97(0xe3)](_0x14d86b[_0x318d0c]):[],_0x25e0fb=_0x4b2e19[_0x14cc97(0x196)](_0x4de599=>eval(_0x4de599));break;case _0x14cc97(0xee):_0x25e0fb=_0x14d86b[_0x318d0c]!==''?JSON[_0x14cc97(0xe3)](_0x14d86b[_0x318d0c]):'';break;case _0x14cc97(0x19e):_0x4b2e19=_0x14d86b[_0x318d0c]!==''?JSON['parse'](_0x14d86b[_0x318d0c]):[],_0x25e0fb=_0x4b2e19[_0x14cc97(0x196)](_0x420383=>JSON[_0x14cc97(0xe3)](_0x420383));break;case _0x14cc97(0x111):_0x25e0fb=_0x14d86b[_0x318d0c]!==''?new Function(JSON[_0x14cc97(0xe3)](_0x14d86b[_0x318d0c])):new Function(_0x14cc97(0x112));break;case _0x14cc97(0x186):_0x4b2e19=_0x14d86b[_0x318d0c]!==''?JSON[_0x14cc97(0xe3)](_0x14d86b[_0x318d0c]):[],_0x25e0fb=_0x4b2e19[_0x14cc97(0x196)](_0x1e614d=>new Function(JSON[_0x14cc97(0xe3)](_0x1e614d)));break;case _0x14cc97(0x1f5):_0x25e0fb=_0x14d86b[_0x318d0c]!==''?String(_0x14d86b[_0x318d0c]):'';break;case _0x14cc97(0xd2):_0x4b2e19=_0x14d86b[_0x318d0c]!==''?JSON['parse'](_0x14d86b[_0x318d0c]):[],_0x25e0fb=_0x4b2e19[_0x14cc97(0x196)](_0xff1809=>String(_0xff1809));break;case'STRUCT':_0x18ecfe=_0x14d86b[_0x318d0c]!==''?JSON[_0x14cc97(0xe3)](_0x14d86b[_0x318d0c]):{},_0x25e0fb=VisuMZ[_0x14cc97(0x16c)]({},_0x18ecfe);break;case _0x14cc97(0x255):_0x4b2e19=_0x14d86b[_0x318d0c]!==''?JSON['parse'](_0x14d86b[_0x318d0c]):[],_0x25e0fb=_0x4b2e19[_0x14cc97(0x196)](_0x59e45a=>VisuMZ[_0x14cc97(0x16c)]({},JSON[_0x14cc97(0xe3)](_0x59e45a)));break;default:continue;}_0x5a13cd[_0x2eb899]=_0x25e0fb;}}return _0x5a13cd;},(_0x5ec379=>{const _0x470bd0=_0x1dd8db,_0x1d8e4b=_0x5ec379[_0x470bd0(0x227)];for(const _0x3f3f29 of dependencies){if(!Imported[_0x3f3f29]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x470bd0(0x108)](_0x1d8e4b,_0x3f3f29)),SceneManager['exit']();break;}}const _0x326b3f=_0x5ec379[_0x470bd0(0x10f)];if(_0x326b3f[_0x470bd0(0x211)](/\[Version[ ](.*?)\]/i)){const _0x14345f=Number(RegExp['$1']);_0x14345f!==VisuMZ[label][_0x470bd0(0x136)]&&(alert(_0x470bd0(0x16d)[_0x470bd0(0x108)](_0x1d8e4b,_0x14345f)),SceneManager[_0x470bd0(0x1b5)]());}if(_0x326b3f[_0x470bd0(0x211)](/\[Tier[ ](\d+)\]/i)){const _0x287802=Number(RegExp['$1']);_0x287802<tier?(alert(_0x470bd0(0x1ad)[_0x470bd0(0x108)](_0x1d8e4b,_0x287802,tier)),SceneManager[_0x470bd0(0x1b5)]()):tier=Math[_0x470bd0(0x117)](_0x287802,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x5ec379['parameters']);})(pluginData),PluginManager[_0x1dd8db(0x162)](pluginData[_0x1dd8db(0x227)],_0x1dd8db(0x1d5),_0x326f04=>{const _0x496669=_0x1dd8db;VisuMZ[_0x496669(0x16c)](_0x326f04,_0x326f04);const _0x2166f8=_0x326f04[_0x496669(0x168)],_0xe2a636=_0x326f04[_0x496669(0x164)];for(const _0x60d1e7 of _0x2166f8){const _0x3cd64b=$gameActors['actor'](_0x60d1e7);if(!_0x3cd64b)continue;_0x3cd64b['_ctbTurnOrderGraphicType']='icon',_0x3cd64b['_ctbTurnOrderIconIndex']=_0xe2a636;}}),PluginManager[_0x1dd8db(0x162)](pluginData[_0x1dd8db(0x227)],_0x1dd8db(0x268),_0x2a49e0=>{const _0x204e23=_0x1dd8db;VisuMZ[_0x204e23(0x16c)](_0x2a49e0,_0x2a49e0);const _0x5ab995=_0x2a49e0[_0x204e23(0x168)],_0xc495f8=_0x2a49e0[_0x204e23(0x121)],_0x23ca43=_0x2a49e0[_0x204e23(0x1fb)];for(const _0x2f7683 of _0x5ab995){const _0x15a2a3=$gameActors[_0x204e23(0x16b)](_0x2f7683);if(!_0x15a2a3)continue;_0x15a2a3['_ctbTurnOrderGraphicType']='face',_0x15a2a3[_0x204e23(0x1c8)]=_0xc495f8,_0x15a2a3[_0x204e23(0x1e9)]=_0x23ca43;}}),PluginManager[_0x1dd8db(0x162)](pluginData[_0x1dd8db(0x227)],_0x1dd8db(0x172),_0x39a033=>{const _0x2db7e4=_0x1dd8db;VisuMZ[_0x2db7e4(0x16c)](_0x39a033,_0x39a033);const _0x2411b1=_0x39a033['Actors'];for(const _0x346132 of _0x2411b1){const _0x37e93b=$gameActors[_0x2db7e4(0x16b)](_0x346132);if(!_0x37e93b)continue;_0x37e93b['clearTurnOrderCTBGraphics']();}}),PluginManager[_0x1dd8db(0x162)](pluginData[_0x1dd8db(0x227)],_0x1dd8db(0xd1),_0x145f84=>{const _0x241e88=_0x1dd8db;VisuMZ[_0x241e88(0x16c)](_0x145f84,_0x145f84);const _0x42cdc8=_0x145f84[_0x241e88(0x1a7)],_0x302a9c=_0x145f84[_0x241e88(0x164)];for(const _0x3c5741 of _0x42cdc8){const _0x49e74d=$gameTroop[_0x241e88(0x258)]()[_0x3c5741];if(!_0x49e74d)continue;_0x49e74d['_ctbTurnOrderGraphicType']=_0x241e88(0x1f6),_0x49e74d[_0x241e88(0x223)]=_0x302a9c;}}),PluginManager[_0x1dd8db(0x162)](pluginData[_0x1dd8db(0x227)],_0x1dd8db(0x1bd),_0x3ad081=>{const _0xf27563=_0x1dd8db;VisuMZ[_0xf27563(0x16c)](_0x3ad081,_0x3ad081);const _0x4b7193=_0x3ad081[_0xf27563(0x1a7)],_0x3c8485=_0x3ad081[_0xf27563(0x121)],_0x185926=_0x3ad081[_0xf27563(0x1fb)];for(const _0x109263 of _0x4b7193){const _0x141b54=$gameTroop[_0xf27563(0x258)]()[_0x109263];if(!_0x141b54)continue;_0x141b54['_ctbTurnOrderGraphicType']='face',_0x141b54[_0xf27563(0x1c8)]=_0x3c8485,_0x141b54[_0xf27563(0x1e9)]=_0x109263;}}),PluginManager[_0x1dd8db(0x162)](pluginData[_0x1dd8db(0x227)],_0x1dd8db(0x191),_0x36d3b8=>{const _0x4ffbe2=_0x1dd8db;VisuMZ[_0x4ffbe2(0x16c)](_0x36d3b8,_0x36d3b8);const _0x1ac1cf=_0x36d3b8['Enemies'];for(const _0x4a1c8e of _0x1ac1cf){const _0x22467c=$gameTroop[_0x4ffbe2(0x258)]()[_0x4a1c8e];if(!_0x22467c)continue;_0x22467c[_0x4ffbe2(0xec)]();}}),PluginManager['registerCommand'](pluginData[_0x1dd8db(0x227)],_0x1dd8db(0x24e),_0x2217df=>{const _0x2f841c=_0x1dd8db;VisuMZ['ConvertParams'](_0x2217df,_0x2217df);const _0x23b6c3=_0x2217df[_0x2f841c(0x266)];$gameSystem[_0x2f841c(0x1b4)](_0x23b6c3);}),VisuMZ[_0x1dd8db(0x159)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x1dd8db(0x18f)][_0x1dd8db(0x118)],Scene_Boot['prototype'][_0x1dd8db(0x118)]=function(){const _0x2d32d5=_0x1dd8db;this[_0x2d32d5(0x252)](),VisuMZ[_0x2d32d5(0x159)][_0x2d32d5(0x240)][_0x2d32d5(0x1cf)](this),this[_0x2d32d5(0x1bb)]();},VisuMZ[_0x1dd8db(0x159)]['RegExp']={},Scene_Boot[_0x1dd8db(0x18f)][_0x1dd8db(0x252)]=function(){const _0x10b6fa=_0x1dd8db,_0xdc832e=VisuMZ[_0x10b6fa(0x159)][_0x10b6fa(0x1a5)],_0x58c8ac=_0x10b6fa(0xd7),_0xd3382=[_0x10b6fa(0xdf),_0x10b6fa(0x12c),_0x10b6fa(0x17a)];for(const _0xa5ba32 of _0xd3382){const _0x45146f=_0x58c8ac[_0x10b6fa(0x108)](_0xa5ba32[_0x10b6fa(0x1d2)]()[_0x10b6fa(0x1a0)](),_0x10b6fa(0x10e),_0x10b6fa(0x171)),_0x43be6=new RegExp(_0x45146f,'i');VisuMZ['BattleSystemCTB'][_0x10b6fa(0x1a5)][_0xa5ba32]=_0x43be6;}VisuMZ[_0x10b6fa(0x159)][_0x10b6fa(0x1a5)][_0x10b6fa(0x18d)]=/<JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>\s*([\s\S]*)\s*<\/JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>/i;},Scene_Boot[_0x1dd8db(0x18f)][_0x1dd8db(0x1bb)]=function(){const _0x3532cc=_0x1dd8db;if(VisuMZ[_0x3532cc(0x125)])return;const _0x3e5192=$dataSkills[_0x3532cc(0x1c2)]($dataItems);for(const _0x1e2b50 of _0x3e5192){if(!_0x1e2b50)continue;VisuMZ['BattleSystemCTB'][_0x3532cc(0xce)](_0x1e2b50);}},VisuMZ[_0x1dd8db(0x159)][_0x1dd8db(0x1ab)]=VisuMZ[_0x1dd8db(0x1ab)],VisuMZ[_0x1dd8db(0x1ab)]=function(_0x1a2709){const _0x3b36a6=_0x1dd8db;VisuMZ[_0x3b36a6(0x159)][_0x3b36a6(0x1ab)][_0x3b36a6(0x1cf)](this,_0x1a2709),VisuMZ[_0x3b36a6(0x159)][_0x3b36a6(0xce)](_0x1a2709);},VisuMZ[_0x1dd8db(0x159)]['ParseItemNotetags']=VisuMZ[_0x1dd8db(0x127)],VisuMZ[_0x1dd8db(0x127)]=function(_0x3f508f){const _0x22855b=_0x1dd8db;VisuMZ[_0x22855b(0x159)][_0x22855b(0x127)][_0x22855b(0x1cf)](this,_0x3f508f),VisuMZ[_0x22855b(0x159)][_0x22855b(0xce)](_0x3f508f);},VisuMZ[_0x1dd8db(0x159)][_0x1dd8db(0xce)]=function(_0xd47463){const _0x17cf6b=_0x1dd8db,_0x199661=[_0x17cf6b(0xdf),_0x17cf6b(0x12c),'After'];for(const _0x45b62f of _0x199661){VisuMZ[_0x17cf6b(0x159)]['createRateJS'](_0xd47463,_0x45b62f);}VisuMZ[_0x17cf6b(0x159)]['createOrderJS'](_0xd47463,_0x17cf6b(0x23a));},VisuMZ[_0x1dd8db(0x159)]['JS']={},VisuMZ[_0x1dd8db(0x159)][_0x1dd8db(0x18c)]=function(_0x214b98,_0x5c74ba){const _0x1bf4bc=_0x1dd8db,_0x4a2f1c=_0x214b98['note'];if(_0x4a2f1c[_0x1bf4bc(0x211)](VisuMZ[_0x1bf4bc(0x159)][_0x1bf4bc(0x1a5)][_0x5c74ba])){const _0x5ce3f1=String(RegExp['$1']),_0x4b129a=_0x1bf4bc(0x19d)['format'](_0x5ce3f1,_0x5c74ba),_0x11576c=VisuMZ[_0x1bf4bc(0x159)]['createKeyJS'](_0x214b98,_0x5c74ba);VisuMZ[_0x1bf4bc(0x159)]['JS'][_0x11576c]=new Function(_0x4b129a);}},VisuMZ[_0x1dd8db(0x159)][_0x1dd8db(0x1c6)]=function(_0x4d8982,_0x3e20e4){const _0x25c468=_0x1dd8db,_0x29e814=_0x4d8982[_0x25c468(0x26c)];if(_0x29e814[_0x25c468(0x211)](VisuMZ[_0x25c468(0x159)]['RegExp'][_0x25c468(0x18d)])){const _0x2bae49=String(RegExp['$1']),_0x537bb4=_0x25c468(0x1d8)[_0x25c468(0x108)](_0x2bae49,_0x3e20e4),_0x5453ca=VisuMZ['BattleSystemCTB'][_0x25c468(0x26b)](_0x4d8982,_0x3e20e4);VisuMZ[_0x25c468(0x159)]['JS'][_0x5453ca]=new Function(_0x537bb4);}},VisuMZ['BattleSystemCTB']['createKeyJS']=function(_0x8c6a0b,_0x5ed61e){const _0x5f0726=_0x1dd8db;let _0x26ad5e='';if($dataActors[_0x5f0726(0x16a)](_0x8c6a0b))_0x26ad5e='Actor-%1-%2'[_0x5f0726(0x108)](_0x8c6a0b['id'],_0x5ed61e);if($dataClasses[_0x5f0726(0x16a)](_0x8c6a0b))_0x26ad5e=_0x5f0726(0x1ce)[_0x5f0726(0x108)](_0x8c6a0b['id'],_0x5ed61e);if($dataSkills[_0x5f0726(0x16a)](_0x8c6a0b))_0x26ad5e=_0x5f0726(0x272)['format'](_0x8c6a0b['id'],_0x5ed61e);if($dataItems[_0x5f0726(0x16a)](_0x8c6a0b))_0x26ad5e='Item-%1-%2'[_0x5f0726(0x108)](_0x8c6a0b['id'],_0x5ed61e);if($dataWeapons[_0x5f0726(0x16a)](_0x8c6a0b))_0x26ad5e=_0x5f0726(0x244)[_0x5f0726(0x108)](_0x8c6a0b['id'],_0x5ed61e);if($dataArmors[_0x5f0726(0x16a)](_0x8c6a0b))_0x26ad5e=_0x5f0726(0x24b)[_0x5f0726(0x108)](_0x8c6a0b['id'],_0x5ed61e);if($dataEnemies['includes'](_0x8c6a0b))_0x26ad5e=_0x5f0726(0xf2)[_0x5f0726(0x108)](_0x8c6a0b['id'],_0x5ed61e);if($dataStates[_0x5f0726(0x16a)](_0x8c6a0b))_0x26ad5e='State-%1-%2'[_0x5f0726(0x108)](_0x8c6a0b['id'],_0x5ed61e);return _0x26ad5e;},VisuMZ[_0x1dd8db(0x159)]['BattleManager_battleSys']=BattleManager[_0x1dd8db(0x147)],BattleManager['battleSys']=function(){const _0xc9e80b=_0x1dd8db;if(this['isCTB']())return _0xc9e80b(0xca);return VisuMZ[_0xc9e80b(0x159)]['BattleManager_battleSys']['call'](this);},BattleManager[_0x1dd8db(0x193)]=function(){const _0xb27802=_0x1dd8db;return $gameSystem[_0xb27802(0x1df)]()===_0xb27802(0xca);},VisuMZ[_0x1dd8db(0x159)]['BattleManager_isTpb']=BattleManager['isTpb'],BattleManager[_0x1dd8db(0x187)]=function(){const _0x464a4a=_0x1dd8db;if(this[_0x464a4a(0x193)]())return!![];return VisuMZ[_0x464a4a(0x159)][_0x464a4a(0x16e)]['call'](this);},VisuMZ[_0x1dd8db(0x159)]['BattleManager_isActiveTpb']=BattleManager['isActiveTpb'],BattleManager[_0x1dd8db(0x169)]=function(){const _0x57c449=_0x1dd8db;if(this[_0x57c449(0x193)]())return![];return VisuMZ[_0x57c449(0x159)]['BattleManager_isActiveTpb']['call'](this);},VisuMZ['BattleSystemCTB'][_0x1dd8db(0x181)]=BattleManager[_0x1dd8db(0x1da)],BattleManager[_0x1dd8db(0x1da)]=function(_0x26949b){const _0x2d580a=_0x1dd8db;this[_0x2d580a(0x193)]()?this[_0x2d580a(0x19a)](_0x26949b):VisuMZ[_0x2d580a(0x159)]['BattleManager_updateTurn']['call'](this,_0x26949b);},BattleManager[_0x1dd8db(0x19a)]=function(_0xa2a59d){const _0x2ca461=_0x1dd8db;$gameParty[_0x2ca461(0x22e)]();for(;;){if(this['isAnyBattlerReadyCTB']())break;_0xa2a59d&&this[_0x2ca461(0x195)](),!this['_subject']&&(this[_0x2ca461(0x183)]=this['getNextSubject']()),this[_0x2ca461(0x183)]&&(this[_0x2ca461(0x1c0)](),this[_0x2ca461(0x208)]());}this[_0x2ca461(0x226)]();},VisuMZ['BattleSystemCTB']['BattleManager_processTurn']=BattleManager[_0x1dd8db(0x1c0)],BattleManager[_0x1dd8db(0x1c0)]=function(){this['isCTB']()?this['processTurnCTB']():VisuMZ['BattleSystemCTB']['BattleManager_processTurn']['call'](this);},BattleManager['processTurnCTB']=function(){const _0x4e2620=_0x1dd8db,_0x136bed=this[_0x4e2620(0x183)],_0x16f0e2=_0x136bed[_0x4e2620(0xd8)]();_0x16f0e2?(_0x16f0e2[_0x4e2620(0x105)](),_0x16f0e2[_0x4e2620(0x12e)]()?(this[_0x4e2620(0x1b6)](),_0x136bed[_0x4e2620(0x14d)]()):(_0x136bed[_0x4e2620(0x14d)](),_0x136bed[_0x4e2620(0x24d)](0x0),this[_0x4e2620(0x235)](),this[_0x4e2620(0x183)]=null)):(_0x136bed['setCtbAfterSpeed'](0x0),this['endAction'](),this['_subject']=null);},BattleManager['isAnyBattlerReadyCTB']=function(){const _0x4ef063=_0x1dd8db;if(this[_0x4ef063(0x183)])return!![];if(this[_0x4ef063(0xc9)]!==_0x4ef063(0x253))return!![];if(this[_0x4ef063(0xd9)]())return!![];if(this['_autoBattle'])return![];const _0x10ed43=this[_0x4ef063(0x144)]()[_0x4ef063(0x17e)](_0x30fe66=>_0x30fe66&&_0x30fe66[_0x4ef063(0x25e)]());return _0x10ed43[_0x4ef063(0x205)](_0x1dd584=>_0x1dd584['isPassCTB']());},Game_Battler['prototype'][_0x1dd8db(0xe6)]=function(){const _0x40c71c=_0x1dd8db;if(this['isTpbCharged']())return!![];if(this['isTpbReady']())return!![];if(this[_0x40c71c(0x146)]())return!![];return![];},BattleManager[_0x1dd8db(0x226)]=function(){const _0x3fd8b2=_0x1dd8db;this[_0x3fd8b2(0x13b)]()&&this[_0x3fd8b2(0x1ef)]()?(this[_0x3fd8b2(0x100)]=this[_0x3fd8b2(0x100)]||0x0,this[_0x3fd8b2(0x100)]++,this[_0x3fd8b2(0x100)]>=0xa&&this['processCtbAntiSoftlock']()):this[_0x3fd8b2(0x100)]=0x0;},BattleManager[_0x1dd8db(0x1ef)]=function(){const _0x3cb5ee=_0x1dd8db;if(this[_0x3cb5ee(0x183)])return![];if(this[_0x3cb5ee(0xc9)]!==_0x3cb5ee(0x253))return![];if(this[_0x3cb5ee(0xd9)]())return![];return!![];},BattleManager[_0x1dd8db(0x18b)]=function(){const _0x22a320=_0x1dd8db;$gameTemp[_0x22a320(0x1a9)]()&&console[_0x22a320(0x1a4)](_0x22a320(0x1cb),this[_0x22a320(0x100)]);for(const _0x46efad of this['allBattleMembers']()){if(!_0x46efad)continue;_0x46efad[_0x22a320(0x182)]()&&(_0x46efad[_0x22a320(0x1ec)](_0x22a320(0x270)),_0x46efad['_tpbState']=_0x22a320(0x1e2));}this[_0x22a320(0x183)]=null,this[_0x22a320(0xc9)]=_0x22a320(0x253),this[_0x22a320(0x21a)]=![];},VisuMZ[_0x1dd8db(0x159)][_0x1dd8db(0x20c)]=BattleManager[_0x1dd8db(0x1e0)],BattleManager[_0x1dd8db(0x1e0)]=function(){const _0x31124b=_0x1dd8db;this[_0x31124b(0x193)]()?this[_0x31124b(0x200)]():VisuMZ[_0x31124b(0x159)][_0x31124b(0x20c)]['call'](this);},BattleManager[_0x1dd8db(0x200)]=function(){const _0x1c7e92=_0x1dd8db,_0x16ce74=this[_0x1c7e92(0x144)]();_0x16ce74[_0x1c7e92(0x124)]((_0x3b4ee6,_0x3ae115)=>{const _0x623e3f=_0x1c7e92;return _0x3b4ee6[_0x623e3f(0x22c)](0x1)-_0x3ae115[_0x623e3f(0x22c)](0x1);});for(const _0x2b6b73 of _0x16ce74){this[_0x1c7e92(0x132)](_0x2b6b73);}},VisuMZ[_0x1dd8db(0x159)][_0x1dd8db(0xf0)]=BattleManager[_0x1dd8db(0x1a6)],BattleManager[_0x1dd8db(0x1a6)]=function(){const _0x58660c=_0x1dd8db;VisuMZ[_0x58660c(0x159)][_0x58660c(0xf0)][_0x58660c(0x1cf)](this),this[_0x58660c(0x208)](!![]);},VisuMZ['BattleSystemCTB']['BattleManager_endAction']=BattleManager['endAction'],BattleManager[_0x1dd8db(0x235)]=function(){const _0x1004fb=_0x1dd8db;this['preEndActionCTB'](),VisuMZ[_0x1004fb(0x159)][_0x1004fb(0xd0)]['call'](this),this['postEndActionCTB']();},BattleManager[_0x1dd8db(0x219)]=function(){const _0xd9844e=_0x1dd8db;if(!this[_0xd9844e(0x193)]())return;this[_0xd9844e(0x183)]&&this[_0xd9844e(0x183)][_0xd9844e(0x19b)]()<=0x0&&(this[_0xd9844e(0x161)](),this[_0xd9844e(0x183)][_0xd9844e(0x1ec)](_0xd9844e(0x270)));},BattleManager[_0x1dd8db(0x251)]=function(){const _0x223702=_0x1dd8db;if(!this[_0x223702(0x193)]())return;this['updateTurnOrderCTB'](),this['_subject']&&this[_0x223702(0x1c0)]();},VisuMZ['BattleSystemCTB'][_0x1dd8db(0x212)]=BattleManager['startActorInput'],BattleManager['startActorInput']=function(){const _0x20393a=_0x1dd8db;this[_0x20393a(0x208)](),VisuMZ[_0x20393a(0x159)][_0x20393a(0x212)]['call'](this);},BattleManager[_0x1dd8db(0x208)]=function(_0x27f81b){const _0x2c7541=_0x1dd8db;if(!this['isCTB']())return;const _0x4825a4=SceneManager['_scene'][_0x2c7541(0xef)];if(!_0x4825a4)return;_0x4825a4[_0x2c7541(0x122)](_0x27f81b);},BattleManager['rotateCTBSprites']=function(){const _0x30cd39=_0x1dd8db;if(!this[_0x30cd39(0x193)]())return;const _0x5402a0=SceneManager[_0x30cd39(0x1e1)][_0x30cd39(0xef)];if(!_0x5402a0)return;_0x5402a0['rotateCTBSprite'](this[_0x30cd39(0x183)]);},VisuMZ[_0x1dd8db(0x159)][_0x1dd8db(0x206)]=Game_System[_0x1dd8db(0x18f)][_0x1dd8db(0x24c)],Game_System[_0x1dd8db(0x18f)][_0x1dd8db(0x24c)]=function(){const _0x4ef918=_0x1dd8db;VisuMZ[_0x4ef918(0x159)]['Game_System_initialize'][_0x4ef918(0x1cf)](this),this[_0x4ef918(0x26a)]();},Game_System['prototype'][_0x1dd8db(0x26a)]=function(){this['_ctbTurnOrderVisible']=!![];},Game_System[_0x1dd8db(0x18f)]['isBattleSystemCTBTurnOrderVisible']=function(){const _0x523f26=_0x1dd8db;return this['_ctbTurnOrderVisible']===undefined&&this['initBattleSystemCTB'](),this[_0x523f26(0x232)];},Game_System[_0x1dd8db(0x18f)]['setBattleSystemCTBTurnOrderVisible']=function(_0x29591a){const _0x45ae70=_0x1dd8db;this[_0x45ae70(0x232)]===undefined&&this['initBattleSystemCTB'](),this[_0x45ae70(0x232)]=_0x29591a;},VisuMZ[_0x1dd8db(0x159)][_0x1dd8db(0x1ca)]=Game_Action[_0x1dd8db(0x18f)][_0x1dd8db(0x24a)],Game_Action['prototype'][_0x1dd8db(0x24a)]=function(_0x58cf29){const _0x1099cb=_0x1dd8db;VisuMZ[_0x1099cb(0x159)]['Game_Action_applyItemUserEffect'][_0x1099cb(0x1cf)](this,_0x58cf29),this[_0x1099cb(0x262)](_0x58cf29);},Game_Action['prototype'][_0x1dd8db(0x262)]=function(_0x19b62b){const _0x147e55=_0x1dd8db;if(!SceneManager['isSceneBattle']())return;if(!BattleManager[_0x147e55(0x193)]())return;if(this['item']())this[_0x147e55(0x1ac)](_0x19b62b);},Game_Action[_0x1dd8db(0x18f)]['applyItemBattleSystemCTBUserEffect']=function(_0x17bf65){const _0x11747c=_0x1dd8db,_0x337353=this[_0x11747c(0x11c)]()[_0x11747c(0x26c)];if(_0x17bf65[_0x11747c(0x13d)]()){const _0x144cdb=VisuMZ[_0x11747c(0x159)][_0x11747c(0x26b)](this[_0x11747c(0x11c)](),'Charge');if(VisuMZ[_0x11747c(0x159)]['JS'][_0x144cdb]){const _0x316f5c=VisuMZ['BattleSystemCTB']['JS'][_0x144cdb][_0x11747c(0x1cf)](this,this[_0x11747c(0x1ba)](),_0x17bf65);_0x17bf65[_0x11747c(0x175)](_0x316f5c);}_0x337353[_0x11747c(0x211)](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x17bf65[_0x11747c(0x175)](Number(RegExp['$1'])*0.01),_0x337353[_0x11747c(0x211)](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x17bf65['changeCtbChargeTime'](Number(RegExp['$1'])*0.01);}else{if(_0x17bf65[_0x11747c(0xf3)]()){const _0x253a7b=VisuMZ[_0x11747c(0x159)][_0x11747c(0x26b)](this[_0x11747c(0x11c)](),_0x11747c(0x12c));if(VisuMZ[_0x11747c(0x159)]['JS'][_0x253a7b]){const _0x2bc007=VisuMZ[_0x11747c(0x159)]['JS'][_0x253a7b][_0x11747c(0x1cf)](this,this[_0x11747c(0x1ba)](),_0x17bf65);_0x17bf65['setCtbCastTime'](_0x2bc007);}_0x337353[_0x11747c(0x211)](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x17bf65[_0x11747c(0x21b)](Number(RegExp['$1'])*0.01),_0x337353[_0x11747c(0x211)](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x17bf65[_0x11747c(0x1b0)](Number(RegExp['$1'])*0.01);}}const _0x3762c8=VisuMZ[_0x11747c(0x159)]['createKeyJS'](this[_0x11747c(0x11c)](),_0x11747c(0x23a));if(VisuMZ[_0x11747c(0x159)]['JS'][_0x3762c8]){const _0x5c30f4=VisuMZ[_0x11747c(0x159)]['JS'][_0x3762c8]['call'](this,this['subject'](),_0x17bf65);_0x17bf65[_0x11747c(0x137)](_0x5c30f4);}_0x337353[_0x11747c(0x211)](/<(?:CTB) (?:SET|MAKE|EXACT) ORDER:[ ](\d+)>/i)&&_0x17bf65[_0x11747c(0x137)](Number(RegExp['$1'])),_0x337353[_0x11747c(0x211)](/<(?:CTB) (?:CHANGE|DELAY|RUSH|SHIFT) ORDER:[ ]([\+\-]\d+)>/i)&&_0x17bf65[_0x11747c(0x194)](Number(RegExp['$1']));},VisuMZ[_0x1dd8db(0x159)][_0x1dd8db(0x12b)]=Game_Action[_0x1dd8db(0x18f)][_0x1dd8db(0x20e)],Game_Action[_0x1dd8db(0x18f)][_0x1dd8db(0x20e)]=function(){const _0x4576c4=_0x1dd8db;VisuMZ[_0x4576c4(0x159)][_0x4576c4(0x12b)][_0x4576c4(0x1cf)](this),this['applyGlobalBattleSystemCTBEffects']();},Game_Action[_0x1dd8db(0x18f)]['applyGlobalBattleSystemCTBEffects']=function(){const _0x23084c=_0x1dd8db;if(!this[_0x23084c(0x11c)]())return;if(!BattleManager[_0x23084c(0x193)]())return;const _0x86eea=this[_0x23084c(0x11c)]()[_0x23084c(0x26c)];let _0x2c6ac4=0x0;this[_0x23084c(0x138)]&&(_0x2c6ac4=this[_0x23084c(0x1ba)]()[_0x23084c(0x1b1)]);const _0x1f443a=VisuMZ['BattleSystemCTB'][_0x23084c(0x26b)](this[_0x23084c(0x11c)](),_0x23084c(0x17a));VisuMZ['BattleSystemCTB']['JS'][_0x1f443a]&&(_0x2c6ac4+=VisuMZ[_0x23084c(0x159)]['JS'][_0x1f443a][_0x23084c(0x1cf)](this,this[_0x23084c(0x1ba)](),this['subject']()));let _0x3e6161=this[_0x23084c(0x11c)]()['speed']>0x0?this[_0x23084c(0x11c)]()[_0x23084c(0x238)]:0x0;if(this[_0x23084c(0x239)]())_0x3e6161+=this[_0x23084c(0x1ba)]()['attackSpeed']();_0x2c6ac4+=(_0x3e6161/0xfa0)[_0x23084c(0x1b2)](0x0,0x1);this['item']()['note'][_0x23084c(0x211)](/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x2c6ac4+=Number(RegExp['$1'])*0.01);const _0x27df47=this[_0x23084c(0x1ba)]()[_0x23084c(0x264)]()[_0x23084c(0x1c2)](this[_0x23084c(0x1ba)]()[_0x23084c(0x130)]()),_0x1db6ed=/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x529287=_0x27df47[_0x23084c(0x196)](_0x178af1=>_0x178af1&&_0x178af1[_0x23084c(0x26c)][_0x23084c(0x211)](_0x1db6ed)?Number(RegExp['$1'])*0.01:0x0);_0x2c6ac4=_0x529287[_0x23084c(0x245)]((_0x5b7090,_0x221b41)=>_0x5b7090+_0x221b41,_0x2c6ac4),this[_0x23084c(0x1ba)]()[_0x23084c(0x24d)](_0x2c6ac4);},Game_BattlerBase[_0x1dd8db(0x18f)][_0x1dd8db(0x175)]=function(_0x36ec4c){const _0x25ec40=_0x1dd8db;this[_0x25ec40(0x1b1)]=_0x36ec4c;},Game_BattlerBase[_0x1dd8db(0x18f)][_0x1dd8db(0x25d)]=function(_0x25ad24){const _0x563803=_0x1dd8db;this[_0x563803(0x175)](this[_0x563803(0x1b1)]+_0x25ad24);},Game_BattlerBase[_0x1dd8db(0x18f)]['setCtbCastTime']=function(_0x21c37b){const _0x7f664=_0x1dd8db,_0xb064f4=this[_0x7f664(0x214)]();this['_tpbCastTime']=_0xb064f4*_0x21c37b;},Game_BattlerBase[_0x1dd8db(0x18f)]['changeCtbCastTime']=function(_0x234874){const _0x423885=_0x1dd8db,_0x4bc25d=this[_0x423885(0x214)](),_0x4ab71c=_0x4bc25d*_0x234874;this[_0x423885(0xf9)]=this['_tpbCastTime']+_0x4ab71c;},VisuMZ[_0x1dd8db(0x159)]['Game_BattlerBase_appear']=Game_BattlerBase[_0x1dd8db(0x18f)][_0x1dd8db(0x116)],Game_BattlerBase[_0x1dd8db(0x18f)]['appear']=function(){const _0x57cf97=_0x1dd8db;VisuMZ[_0x57cf97(0x159)]['Game_BattlerBase_appear'][_0x57cf97(0x1cf)](this),BattleManager[_0x57cf97(0x208)]();},VisuMZ[_0x1dd8db(0x159)][_0x1dd8db(0x192)]=Game_BattlerBase[_0x1dd8db(0x18f)]['hide'],Game_BattlerBase[_0x1dd8db(0x18f)][_0x1dd8db(0x261)]=function(){const _0x12c42f=_0x1dd8db;VisuMZ['BattleSystemCTB'][_0x12c42f(0x192)][_0x12c42f(0x1cf)](this),BattleManager[_0x12c42f(0x208)]();},Game_BattlerBase[_0x1dd8db(0x18f)][_0x1dd8db(0xec)]=function(){const _0x320483=_0x1dd8db;delete this['_ctbTurnOrderGraphicType'],delete this[_0x320483(0x1c8)],delete this[_0x320483(0x1e9)],delete this[_0x320483(0x223)];},Game_BattlerBase[_0x1dd8db(0x18f)]['TurnOrderCTBGraphicType']=function(){const _0x4d94bb=_0x1dd8db;return this[_0x4d94bb(0x17f)]===undefined&&(this['_ctbTurnOrderGraphicType']=this[_0x4d94bb(0x1d4)]()),this['_ctbTurnOrderGraphicType'];},Game_BattlerBase[_0x1dd8db(0x18f)][_0x1dd8db(0x1d4)]=function(){const _0x47caf9=_0x1dd8db;return Window_CTB_TurnOrder[_0x47caf9(0x22d)][_0x47caf9(0x139)];},Game_BattlerBase['prototype'][_0x1dd8db(0x228)]=function(){const _0x300e3c=_0x1dd8db;return this['_ctbTurnOrderFaceName']===undefined&&(this[_0x300e3c(0x1c8)]=this[_0x300e3c(0xff)]()),this[_0x300e3c(0x1c8)];},Game_BattlerBase[_0x1dd8db(0x18f)][_0x1dd8db(0xff)]=function(){const _0x53f232=_0x1dd8db;return Window_CTB_TurnOrder[_0x53f232(0x22d)][_0x53f232(0x248)];},Game_BattlerBase[_0x1dd8db(0x18f)][_0x1dd8db(0x21d)]=function(){const _0x4a6984=_0x1dd8db;return this[_0x4a6984(0x1e9)]===undefined&&(this[_0x4a6984(0x1e9)]=this[_0x4a6984(0x185)]()),this[_0x4a6984(0x1e9)];},Game_BattlerBase[_0x1dd8db(0x18f)]['createTurnOrderCTBGraphicFaceIndex']=function(){const _0x29f71b=_0x1dd8db;return Window_CTB_TurnOrder[_0x29f71b(0x22d)][_0x29f71b(0x154)];},Game_BattlerBase[_0x1dd8db(0x18f)]['TurnOrderCTBGraphicIconIndex']=function(){const _0x4fb97f=_0x1dd8db;return this[_0x4fb97f(0x223)]===undefined&&(this[_0x4fb97f(0x223)]=this[_0x4fb97f(0x1a3)]()),this[_0x4fb97f(0x223)];},Game_BattlerBase[_0x1dd8db(0x18f)][_0x1dd8db(0x1a3)]=function(){const _0x57dbba=_0x1dd8db;return Window_CTB_TurnOrder[_0x57dbba(0x22d)][_0x57dbba(0x17d)];},Game_BattlerBase[_0x1dd8db(0x18f)]['setCTBGraphicIconIndex']=function(_0x353330){const _0x565849=_0x1dd8db;this[_0x565849(0x223)]=_0x353330;},Game_BattlerBase[_0x1dd8db(0x18f)][_0x1dd8db(0x22c)]=function(_0x382f9c,_0x5af17c){const _0x59fd90=_0x1dd8db;if(this[_0x59fd90(0x165)]())return Number['MAX_SAFE_INTEGER'];if(!this[_0x59fd90(0x25e)]())return Number[_0x59fd90(0xe1)];if(_0x382f9c===0x1&&!_0x5af17c){if(this===BattleManager[_0x59fd90(0x183)])return Number[_0x59fd90(0x1f7)]/0xa;if(this===BattleManager[_0x59fd90(0x16b)]())return Number[_0x59fd90(0x1f7)]/0xa;if(BattleManager[_0x59fd90(0x198)]&&BattleManager[_0x59fd90(0x198)][_0x59fd90(0x16a)](this)){let _0x27ae42=Number[_0x59fd90(0x1f7)]/0x1388;return _0x27ae42+=BattleManager[_0x59fd90(0x198)]['indexOf'](this)*0x5,_0x27ae42;}}return _0x382f9c-=this[_0x59fd90(0x1c7)](),_0x382f9c/=this[_0x59fd90(0x189)](),_0x382f9c+=this[_0x59fd90(0x13a)](),_0x382f9c;},Game_BattlerBase[_0x1dd8db(0x18f)][_0x1dd8db(0x13a)]=function(){const _0x4ec3b3=_0x1dd8db;return this['_tpbState']===_0x4ec3b3(0x19f)?(this['tpbRequiredCastTime']()-this[_0x4ec3b3(0xf9)])/this[_0x4ec3b3(0x189)]():0x0;},VisuMZ[_0x1dd8db(0x159)][_0x1dd8db(0xe9)]=Game_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x222)],Game_Battler['prototype'][_0x1dd8db(0x222)]=function(_0x479fa4){const _0x40af34=_0x1dd8db;BattleManager[_0x40af34(0x193)]()?this['initTpbChargeTimeCTB'](_0x479fa4):VisuMZ[_0x40af34(0x159)]['Game_Battler_initTpbChargeTime'][_0x40af34(0x1cf)](this,_0x479fa4);},Game_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x218)]=function(_0x4cb674){const _0x210ff3=_0x1dd8db,_0x1054e3=VisuMZ[_0x210ff3(0x159)][_0x210ff3(0x22d)][_0x210ff3(0x225)];let _0x2ca694=this[_0x210ff3(0x25a)]()*eval(_0x1054e3[_0x210ff3(0xde)]);const _0x4a91fd=this['traitObjects']()[_0x210ff3(0x1c2)](this[_0x210ff3(0x130)]()),_0x311244=/<(?:CTB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x462eb8=_0x4a91fd['map'](_0xd585c8=>_0xd585c8&&_0xd585c8[_0x210ff3(0x26c)][_0x210ff3(0x211)](_0x311244)?Number(RegExp['$1'])*0.01:0x0);_0x2ca694=_0x462eb8['reduce']((_0x19b756,_0x1fa8e3)=>_0x19b756+_0x1fa8e3,_0x2ca694),this[_0x210ff3(0x216)]=_0x210ff3(0x1e2),this[_0x210ff3(0x1b1)]=(_0x4cb674?0x1:_0x2ca694)[_0x210ff3(0x1b2)](0x0,0x1),this['isRestricted']()&&(this[_0x210ff3(0x1b1)]=0x0);},Game_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x13d)]=function(){const _0x5ad745=_0x1dd8db;return this[_0x5ad745(0x216)]==='charging';},Game_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0xf3)]=function(){const _0x47c63f=_0x1dd8db;return this[_0x47c63f(0x216)]==='casting'&&this[_0x47c63f(0xd8)]()&&this[_0x47c63f(0xd8)]()[_0x47c63f(0x11c)]()&&this[_0x47c63f(0xd8)]()[_0x47c63f(0x11c)]()[_0x47c63f(0x238)]<0x0;},Game_BattlerBase[_0x1dd8db(0x18f)][_0x1dd8db(0xda)]=function(){const _0x2f19aa=_0x1dd8db;return this[_0x2f19aa(0xf3)]()?this['_tpbCastTime']/this['tpbRequiredCastTime']():0x0;},Game_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x203)]=function(){return!this['canMove']();},Game_Battler['prototype'][_0x1dd8db(0x24d)]=function(_0x30ef24){const _0x2612bd=_0x1dd8db;this[_0x2612bd(0x241)]=_0x30ef24;},VisuMZ['BattleSystemCTB']['Game_Battler_onRestrict']=Game_Battler['prototype']['onRestrict'],Game_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x237)]=function(){const _0x97e6eb=_0x1dd8db;this[_0x97e6eb(0x257)]=BattleManager[_0x97e6eb(0x193)](),VisuMZ[_0x97e6eb(0x159)][_0x97e6eb(0x17c)]['call'](this),this['_onRestrictBypassCtbReset']=undefined;},VisuMZ[_0x1dd8db(0x159)][_0x1dd8db(0x24f)]=Game_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x16f)],Game_Battler['prototype'][_0x1dd8db(0x16f)]=function(){const _0x5f273b=_0x1dd8db;BattleManager[_0x5f273b(0x193)]()?this['clearTpbChargeTimeCTB']():VisuMZ['BattleSystemCTB'][_0x5f273b(0x24f)][_0x5f273b(0x1cf)](this);},Game_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x178)]=function(){const _0x53481e=_0x1dd8db;if(this[_0x53481e(0x257)])return;this[_0x53481e(0x216)]=_0x53481e(0x1e2),this['_tpbChargeTime']-=0x1,this[_0x53481e(0x1b1)]+=this['_ctbAfterSpeed']||0x0;},VisuMZ[_0x1dd8db(0x159)][_0x1dd8db(0x1ae)]=Game_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0xe4)],Game_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0xe4)]=function(){const _0x1fc8f0=_0x1dd8db;BattleManager[_0x1fc8f0(0x193)]()?this[_0x1fc8f0(0x123)]():VisuMZ[_0x1fc8f0(0x159)][_0x1fc8f0(0x1ae)]['call'](this);},Game_Battler[_0x1dd8db(0x18f)]['applyCTBPenalty']=function(){const _0x22428c=_0x1dd8db;this[_0x22428c(0x216)]='charging',this[_0x22428c(0x1b1)]+=VisuMZ[_0x22428c(0x159)][_0x22428c(0x22d)][_0x22428c(0x225)][_0x22428c(0x269)]||0x0;},VisuMZ[_0x1dd8db(0x159)]['Game_Battler_tpbSpeed']=Game_Battler['prototype'][_0x1dd8db(0x207)],Game_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x207)]=function(){const _0x3fc20a=_0x1dd8db;return BattleManager[_0x3fc20a(0x193)]()?VisuMZ[_0x3fc20a(0x159)][_0x3fc20a(0x22d)][_0x3fc20a(0x225)]['TpbSpeedCalcJS'][_0x3fc20a(0x1cf)](this,this):VisuMZ['BattleSystemCTB'][_0x3fc20a(0x150)][_0x3fc20a(0x1cf)](this);},VisuMZ['BattleSystemCTB'][_0x1dd8db(0x1f3)]=Game_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x1ea)],Game_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x1ea)]=function(){const _0x4453ae=_0x1dd8db;return BattleManager[_0x4453ae(0x193)]()?VisuMZ[_0x4453ae(0x159)][_0x4453ae(0x22d)][_0x4453ae(0x225)][_0x4453ae(0x243)]['call'](this,this):VisuMZ[_0x4453ae(0x159)][_0x4453ae(0x1f3)][_0x4453ae(0x1cf)](this);},VisuMZ[_0x1dd8db(0x159)][_0x1dd8db(0x17b)]=Game_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x25a)],Game_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x25a)]=function(){const _0x3340cb=_0x1dd8db;return BattleManager[_0x3340cb(0x193)]()?VisuMZ[_0x3340cb(0x159)]['Settings'][_0x3340cb(0x225)][_0x3340cb(0x1db)][_0x3340cb(0x1cf)](this,this):VisuMZ[_0x3340cb(0x159)][_0x3340cb(0x17b)][_0x3340cb(0x1cf)](this);},VisuMZ[_0x1dd8db(0x159)][_0x1dd8db(0x22a)]=Game_Battler['prototype'][_0x1dd8db(0x189)],Game_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x189)]=function(){const _0x15f589=_0x1dd8db;if(BattleManager[_0x15f589(0x193)]()){let _0x22af69=VisuMZ[_0x15f589(0x159)]['Settings']['Mechanics'][_0x15f589(0x234)][_0x15f589(0x1cf)](this,this);const _0x439aa2=0x0;return _0x22af69+_0x439aa2;}else return VisuMZ[_0x15f589(0x159)][_0x15f589(0x22a)][_0x15f589(0x1cf)](this);},VisuMZ['BattleSystemCTB'][_0x1dd8db(0x15f)]=Game_Battler['prototype'][_0x1dd8db(0x214)],Game_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x214)]=function(){const _0x3345a3=_0x1dd8db;return BattleManager[_0x3345a3(0x193)]()?VisuMZ[_0x3345a3(0x159)][_0x3345a3(0x22d)][_0x3345a3(0x225)][_0x3345a3(0x11d)][_0x3345a3(0x1cf)](this,this):VisuMZ['BattleSystemCTB'][_0x3345a3(0x15f)][_0x3345a3(0x1cf)](this);},Game_Battler['prototype'][_0x1dd8db(0x23c)]=function(){const _0x15afc4=_0x1dd8db,_0x24c3c5=SceneManager[_0x15afc4(0x1e1)][_0x15afc4(0xef)];if(!_0x24c3c5)return-0x1;const _0x29bd5f=_0x24c3c5['_turnOrderContainer'];if(!_0x29bd5f)return-0x1;const _0x257659=_0x29bd5f['find'](_0x18b7e2=>_0x18b7e2[_0x15afc4(0x14c)]()===this);return _0x29bd5f['indexOf'](_0x257659);},Game_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x194)]=function(_0x214940){const _0x59d9ee=_0x1dd8db;if(!BattleManager[_0x59d9ee(0x193)]())return;if(!SceneManager[_0x59d9ee(0x1aa)]())return;if(this===BattleManager[_0x59d9ee(0x16b)]())return;if(this===BattleManager[_0x59d9ee(0x183)])return;const _0xe3bf00=this[_0x59d9ee(0x23c)]();if(_0xe3bf00<0x0)return;this[_0x59d9ee(0x137)](_0xe3bf00+_0x214940);},Game_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x137)]=function(_0x56e97b){const _0x3c9739=_0x1dd8db;if(!BattleManager[_0x3c9739(0x193)]())return;if(!SceneManager[_0x3c9739(0x1aa)]())return;if(this===BattleManager['actor']())return;if(this===BattleManager[_0x3c9739(0x183)])return;_0x56e97b=Math[_0x3c9739(0x117)](_0x56e97b,0x1),this[_0x3c9739(0x174)](_0x56e97b);},Game_Battler['prototype'][_0x1dd8db(0x174)]=function(_0x1b5cf9){const _0x28480d=_0x1dd8db;if(!BattleManager[_0x28480d(0x193)]())return;if(!SceneManager[_0x28480d(0x1aa)]())return;if(this===BattleManager[_0x28480d(0x16b)]())return;if(this===BattleManager[_0x28480d(0x183)])return;const _0x11574b=SceneManager['_scene'][_0x28480d(0xef)];if(!_0x11574b)return;const _0x4c40dc=_0x11574b['_turnOrderContainer'];if(!_0x4c40dc)return;const _0x23efc0=this[_0x28480d(0x23c)]();_0x23efc0!==_0x1b5cf9&&this[_0x28480d(0xf8)](_0x1b5cf9-_0x23efc0);let _0x5c83a9=_0x1b5cf9,_0x2056fc=_0x1b5cf9;_0x23efc0>_0x1b5cf9?_0x5c83a9-=0x1:_0x2056fc+=0x1;const _0x27b9a8=_0x4c40dc[_0x5c83a9][_0x28480d(0x265)](!![]),_0x59a95c=_0x4c40dc[_0x2056fc]['ticksLeft'](!![]),_0x4d52e6=(_0x27b9a8+_0x59a95c)/0x2;let _0x3982dd=_0x4d52e6*this[_0x28480d(0x189)]();if(this[_0x28480d(0x216)]===_0x28480d(0x1e2))this[_0x28480d(0x1b1)]=0x1-_0x3982dd;else this[_0x28480d(0x216)]===_0x28480d(0x19f)&&(this[_0x28480d(0xf9)]=this['tpbRequiredCastTime']()-_0x3982dd);BattleManager['_actionBattlers']=[],BattleManager[_0x28480d(0x208)]();},Game_Battler[_0x1dd8db(0x18f)]['onCtbOrderChange']=function(_0x393392){const _0x1efe03=_0x1dd8db,_0x39a014=VisuMZ[_0x1efe03(0x159)][_0x1efe03(0x22d)]['Effect'],_0x1d5965=_0x393392>0x0?_0x1efe03(0x10b):_0x1efe03(0xe2);if(_0x39a014['%1AnimationID'[_0x1efe03(0x108)](_0x1d5965)]){const _0x308946=_0x39a014[_0x1efe03(0x20a)[_0x1efe03(0x108)](_0x1d5965)],_0x1f7985=_0x39a014[_0x1efe03(0x160)['format'](_0x1d5965)],_0x1a821c=_0x39a014[_0x1efe03(0x13f)[_0x1efe03(0x108)](_0x1d5965)];$gameTemp[_0x1efe03(0x247)]([this],_0x308946,_0x1f7985,_0x1a821c);}if(this[_0x1efe03(0x14c)]()&&_0x39a014[_0x1efe03(0x10d)[_0x1efe03(0x108)](_0x1d5965)]['length']>0x0){const _0x42b300=_0x39a014['%1PopupText'[_0x1efe03(0x108)](_0x1d5965)],_0x3be7c5={'textColor':ColorManager[_0x1efe03(0x190)](_0x39a014[_0x1efe03(0x1a2)['format'](_0x1d5965)]),'flashColor':_0x39a014[_0x1efe03(0xfe)[_0x1efe03(0x108)](_0x1d5965)],'flashDuration':_0x39a014['%1FlashDuration'[_0x1efe03(0x108)](_0x1d5965)]};this['setupTextPopup'](_0x42b300,_0x3be7c5);}},VisuMZ['BattleSystemCTB'][_0x1dd8db(0x1de)]=Game_Battler[_0x1dd8db(0x18f)]['updateTpbChargeTime'],Game_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x15a)]=function(){const _0x32a238=_0x1dd8db;BattleManager[_0x32a238(0x193)]()?this[_0x32a238(0x13c)]():VisuMZ[_0x32a238(0x159)][_0x32a238(0x1de)]['call'](this);},Game_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x13c)]=function(){const _0x34a623=_0x1dd8db;this['_tpbState']===_0x34a623(0x1e2)&&(this[_0x34a623(0x1b1)]+=this[_0x34a623(0x189)](),this[_0x34a623(0x1b1)]>=0x1&&this[_0x34a623(0x1d6)]());},VisuMZ[_0x1dd8db(0x159)][_0x1dd8db(0x250)]=Game_Battler[_0x1dd8db(0x18f)]['updateTpbCastTime'],Game_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x103)]=function(){const _0x326ce9=_0x1dd8db;BattleManager[_0x326ce9(0x193)]()?this['updateTpbCastTimeCTB']():VisuMZ[_0x326ce9(0x159)][_0x326ce9(0x250)][_0x326ce9(0x1cf)](this);},Game_Battler['prototype'][_0x1dd8db(0x25b)]=function(){const _0x3ab347=_0x1dd8db;this[_0x3ab347(0x216)]===_0x3ab347(0x19f)&&(this[_0x3ab347(0xf9)]+=this['tpbAcceleration'](),this['_tpbCastTime']>=this['tpbRequiredCastTime']()&&(this[_0x3ab347(0x216)]='ready'));},Game_Actor[_0x1dd8db(0x18f)][_0x1dd8db(0x1d4)]=function(){const _0x2c2218=_0x1dd8db,_0x1fa2c0=this[_0x2c2218(0x16b)]()[_0x2c2218(0x26c)];if(_0x1fa2c0[_0x2c2218(0x211)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x2c2218(0x1e4);else{if(_0x1fa2c0['match'](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x2c2218(0x1f6);}return Window_CTB_TurnOrder[_0x2c2218(0x22d)][_0x2c2218(0x23b)];},Game_Actor[_0x1dd8db(0x18f)][_0x1dd8db(0x228)]=function(){const _0x55e303=_0x1dd8db,_0x32769e=this['actor']()['note'];if(_0x32769e[_0x55e303(0x211)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this['faceName']();},Game_Actor[_0x1dd8db(0x18f)][_0x1dd8db(0x21d)]=function(){const _0x1e08fe=_0x1dd8db,_0xeb652e=this[_0x1e08fe(0x16b)]()[_0x1e08fe(0x26c)];if(_0xeb652e['match'](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0x1e08fe(0x1b9)]();},Game_Actor[_0x1dd8db(0x18f)][_0x1dd8db(0x1a3)]=function(){const _0x457745=_0x1dd8db,_0x22291b=this[_0x457745(0x16b)]()['note'];if(_0x22291b[_0x457745(0x211)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_CTB_TurnOrder['Settings'][_0x457745(0x180)];},Game_Enemy[_0x1dd8db(0x18f)][_0x1dd8db(0x1d4)]=function(){const _0x2bbc94=_0x1dd8db,_0xf4401a=this[_0x2bbc94(0x1cc)]()['note'];if(_0xf4401a['match'](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x2bbc94(0x1e4);else{if(_0xf4401a['match'](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x2bbc94(0x1f6);}return Window_CTB_TurnOrder[_0x2bbc94(0x22d)][_0x2bbc94(0x139)];},Game_Enemy['prototype'][_0x1dd8db(0xff)]=function(){const _0x12fe4b=_0x1dd8db,_0x57d41f=this[_0x12fe4b(0x1cc)]()[_0x12fe4b(0x26c)];if(_0x57d41f[_0x12fe4b(0x211)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_CTB_TurnOrder[_0x12fe4b(0x22d)]['EnemyBattlerFaceName'];},Game_Enemy[_0x1dd8db(0x18f)][_0x1dd8db(0x185)]=function(){const _0x44480f=_0x1dd8db,_0x6567ae=this[_0x44480f(0x1cc)]()[_0x44480f(0x26c)];if(_0x6567ae[_0x44480f(0x211)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_CTB_TurnOrder['Settings'][_0x44480f(0x154)];},Game_Enemy[_0x1dd8db(0x18f)][_0x1dd8db(0x1a3)]=function(){const _0x55d2b9=_0x1dd8db,_0x33a236=this['enemy']()[_0x55d2b9(0x26c)];if(_0x33a236['match'](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_CTB_TurnOrder[_0x55d2b9(0x22d)]['EnemyBattlerIcon'];},VisuMZ[_0x1dd8db(0x159)][_0x1dd8db(0x231)]=Scene_Battle[_0x1dd8db(0x18f)][_0x1dd8db(0x11b)],Scene_Battle['prototype'][_0x1dd8db(0x11b)]=function(){const _0x2cc6f3=_0x1dd8db;VisuMZ[_0x2cc6f3(0x159)]['Scene_Battle_createAllWindows'][_0x2cc6f3(0x1cf)](this),this[_0x2cc6f3(0x135)]();},Scene_Battle[_0x1dd8db(0x18f)][_0x1dd8db(0x135)]=function(){const _0x1e1e38=_0x1dd8db;if(!BattleManager['isCTB']())return;this[_0x1e1e38(0xef)]=new Window_CTB_TurnOrder();const _0x5b7c1e=this[_0x1e1e38(0xe8)](this[_0x1e1e38(0xd5)]);this['addChildAt'](this[_0x1e1e38(0xef)],_0x5b7c1e),this[_0x1e1e38(0xed)](),BattleManager[_0x1e1e38(0x208)](!![]);},Scene_Battle['prototype'][_0x1dd8db(0xed)]=function(){const _0x229816=_0x1dd8db,_0x305e85=Window_CTB_TurnOrder[_0x229816(0x22d)];if(_0x305e85[_0x229816(0x131)]!==_0x229816(0x233))return;if(!_0x305e85[_0x229816(0x1c5)])return;if(!this[_0x229816(0x15e)])return;const _0x2a0fdf=this['_ctbTurnOrderWindow']['y']-Math[_0x229816(0x177)]((Graphics['height']-Graphics[_0x229816(0x1dc)])/0x2),_0x5f272c=_0x2a0fdf+this[_0x229816(0xef)]['height'];this['_logWindow']['y']=_0x5f272c+_0x305e85[_0x229816(0xe0)];};function Sprite_CTB_TurnOrder_Battler(){const _0x5bdb60=_0x1dd8db;this[_0x5bdb60(0x24c)](...arguments);}Sprite_CTB_TurnOrder_Battler['prototype']=Object[_0x1dd8db(0x221)](Sprite_Clickable['prototype']),Sprite_CTB_TurnOrder_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x1fd)]=Sprite_CTB_TurnOrder_Battler,Sprite_CTB_TurnOrder_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x24c)]=function(_0x136785,_0x175656,_0x4e7d37){const _0x228d3e=_0x1dd8db;this[_0x228d3e(0x133)](_0x136785,_0x175656,_0x4e7d37),Sprite_Clickable[_0x228d3e(0x18f)][_0x228d3e(0x24c)][_0x228d3e(0x1cf)](this),this[_0x228d3e(0x1f1)]();},Sprite_CTB_TurnOrder_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x133)]=function(_0x2d3642,_0x550ded,_0x767e28){const _0x4387ac=_0x1dd8db;this['_unit']=_0x2d3642,this['_index']=_0x550ded,this[_0x4387ac(0x23d)]=_0x767e28;const _0x303c11=Window_CTB_TurnOrder[_0x4387ac(0x22d)],_0x4ba3bb=this[_0x4387ac(0x141)](),_0x4706ed=this['defaultPosition']();this[_0x4387ac(0x14f)]=0x0,this[_0x4387ac(0x1e8)]=_0x4ba3bb?_0x303c11[_0x4387ac(0x101)]*_0x4706ed:0x0,this['_positionTargetY']=_0x4ba3bb?0x0:_0x303c11[_0x4387ac(0x101)]*_0x4706ed,this[_0x4387ac(0x224)]=0x0,this['_fadeTarget']=0xff,this[_0x4387ac(0x1a8)]=!![],this['_isAppeared']=!![];},Sprite_CTB_TurnOrder_Battler['prototype'][_0x1dd8db(0x1f1)]=function(){const _0x34353d=_0x1dd8db;this[_0x34353d(0x1eb)](),this[_0x34353d(0x1bf)](),this['createGraphicSprite'](),this[_0x34353d(0x1a1)](),this[_0x34353d(0xcc)]();},Sprite_CTB_TurnOrder_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x1eb)]=function(){this['x']=this['_positionTargetX'],this['y']=this['_positionTargetY'];},Sprite_CTB_TurnOrder_Battler['prototype'][_0x1dd8db(0x141)]=function(){const _0x58788c=_0x1dd8db,_0x48ae9d=Window_CTB_TurnOrder['Settings'],_0x37179e=['top',_0x58788c(0x179)][_0x58788c(0x16a)](_0x48ae9d['DisplayPosition']);return _0x37179e;},Sprite_CTB_TurnOrder_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x236)]=function(){const _0x3b943e=_0x1dd8db,_0x464308=Window_CTB_TurnOrder['Settings'];return this['isHorz']()?_0x464308['SpriteThin']:_0x464308[_0x3b943e(0x14a)];},Sprite_CTB_TurnOrder_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x271)]=function(){const _0x1e6fd3=_0x1dd8db,_0x57cb97=Window_CTB_TurnOrder[_0x1e6fd3(0x22d)];return this[_0x1e6fd3(0x141)]()?_0x57cb97[_0x1e6fd3(0x14a)]:_0x57cb97[_0x1e6fd3(0x101)];},Sprite_CTB_TurnOrder_Battler['prototype'][_0x1dd8db(0x12f)]=function(){const _0x541cbf=_0x1dd8db;this['bitmap']=new Bitmap(0x48,0x24);const _0x5ed73d=this[_0x541cbf(0x14c)]()?this[_0x541cbf(0x14c)]()[_0x541cbf(0x227)]():_0x541cbf(0x107)[_0x541cbf(0x108)](this['_unit'],this[_0x541cbf(0x102)],this[_0x541cbf(0x23d)]);this[_0x541cbf(0xfd)][_0x541cbf(0x204)](_0x5ed73d,0x0,0x0,0x48,0x24,_0x541cbf(0xd3));},Sprite_CTB_TurnOrder_Battler[_0x1dd8db(0x18f)]['createBackgroundSprite']=function(){const _0x582fc6=_0x1dd8db;if(!Window_CTB_TurnOrder['Settings'][_0x582fc6(0x256)])return;const _0x42d1d4=Window_CTB_TurnOrder[_0x582fc6(0x22d)],_0x30c8b3=this[_0x582fc6(0x19c)]===$gameParty?_0x582fc6(0xfb):'Enemy',_0x2a95ef=_0x582fc6(0x23e)[_0x582fc6(0x108)](_0x30c8b3),_0x4f2fed=new Sprite();_0x4f2fed[_0x582fc6(0x1b8)]['x']=this['anchor']['x'],_0x4f2fed[_0x582fc6(0x1b8)]['y']=this['anchor']['y'];if(_0x42d1d4[_0x2a95ef])_0x4f2fed[_0x582fc6(0xfd)]=ImageManager[_0x582fc6(0x143)](_0x42d1d4[_0x2a95ef]);else{const _0xe276f8=this[_0x582fc6(0x236)](),_0x39726d=this[_0x582fc6(0x271)]();_0x4f2fed['bitmap']=new Bitmap(_0xe276f8,_0x39726d);const _0x46a74f=ColorManager['getColor'](_0x42d1d4[_0x582fc6(0x202)['format'](_0x30c8b3)]),_0x1fa9bb=ColorManager['getColor'](_0x42d1d4[_0x582fc6(0x1c3)[_0x582fc6(0x108)](_0x30c8b3)]);_0x4f2fed[_0x582fc6(0xfd)][_0x582fc6(0x21c)](0x0,0x0,_0xe276f8,_0x39726d,_0x46a74f,_0x1fa9bb,!![]);}this[_0x582fc6(0xdc)]=_0x4f2fed,this['addChild'](this['_backgroundSprite']),this[_0x582fc6(0x14b)]=this[_0x582fc6(0xdc)][_0x582fc6(0x14b)],this[_0x582fc6(0x1d9)]=this[_0x582fc6(0xdc)][_0x582fc6(0x1d9)];},Sprite_CTB_TurnOrder_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x11e)]=function(){const _0x3d1031=_0x1dd8db,_0x201115=new Sprite();_0x201115['anchor']['x']=this['anchor']['x'],_0x201115['anchor']['y']=this[_0x3d1031(0x1b8)]['y'],this[_0x3d1031(0x170)]=_0x201115,this[_0x3d1031(0xea)](this[_0x3d1031(0x170)]),this['processUpdateGraphic']();},Sprite_CTB_TurnOrder_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x1a1)]=function(){const _0x372244=_0x1dd8db;if(!Window_CTB_TurnOrder[_0x372244(0x22d)][_0x372244(0x15d)])return;const _0x4713e1=Window_CTB_TurnOrder[_0x372244(0x22d)],_0x520ffa=this[_0x372244(0x19c)]===$gameParty?_0x372244(0xfb):_0x372244(0x126),_0x97710a='%1SystemBorder'['format'](_0x520ffa),_0x2b8914=new Sprite();_0x2b8914[_0x372244(0x1b8)]['x']=this['anchor']['x'],_0x2b8914[_0x372244(0x1b8)]['y']=this[_0x372244(0x1b8)]['y'];if(_0x4713e1[_0x97710a])_0x2b8914[_0x372244(0xfd)]=ImageManager['loadSystem'](_0x4713e1[_0x97710a]);else{let _0x518709=this[_0x372244(0x236)](),_0x138808=this[_0x372244(0x271)](),_0x5bd7b5=_0x4713e1[_0x372244(0x220)];_0x2b8914[_0x372244(0xfd)]=new Bitmap(_0x518709,_0x138808);const _0x5f253c=_0x372244(0x1b7),_0x4ea4b9=ColorManager[_0x372244(0x190)](_0x4713e1['%1BorderColor'[_0x372244(0x108)](_0x520ffa)]);_0x2b8914['bitmap'][_0x372244(0x263)](0x0,0x0,_0x518709,_0x138808,_0x5f253c),_0x518709-=0x2,_0x138808-=0x2,_0x2b8914[_0x372244(0xfd)][_0x372244(0x263)](0x1,0x1,_0x518709,_0x138808,_0x4ea4b9),_0x518709-=_0x5bd7b5*0x2,_0x138808-=_0x5bd7b5*0x2,_0x2b8914[_0x372244(0xfd)][_0x372244(0x263)](0x1+_0x5bd7b5,0x1+_0x5bd7b5,_0x518709,_0x138808,_0x5f253c),_0x518709-=0x2,_0x138808-=0x2,_0x5bd7b5+=0x1,_0x2b8914[_0x372244(0xfd)][_0x372244(0x12d)](0x1+_0x5bd7b5,0x1+_0x5bd7b5,_0x518709,_0x138808);}this[_0x372244(0xdc)]=_0x2b8914,this[_0x372244(0xea)](this[_0x372244(0xdc)]);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x1dd8db(0xcc)]=function(){const _0x30538d=_0x1dd8db,_0x375b47=Window_CTB_TurnOrder[_0x30538d(0x22d)];if(!_0x375b47['EnemyBattlerDrawLetter'])return;if(this[_0x30538d(0x19c)]===$gameParty)return;const _0x52362f=this[_0x30538d(0x236)](),_0x5393a1=this[_0x30538d(0x271)](),_0x1d5e14=new Sprite();_0x1d5e14['anchor']['x']=this[_0x30538d(0x1b8)]['x'],_0x1d5e14['anchor']['y']=this[_0x30538d(0x1b8)]['y'],_0x1d5e14['bitmap']=new Bitmap(_0x52362f,_0x5393a1),this['_letterSprite']=_0x1d5e14,this[_0x30538d(0xea)](this['_letterSprite']);},Sprite_CTB_TurnOrder_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x14c)]=function(){const _0x2aabf3=_0x1dd8db;return this[_0x2aabf3(0x19c)]?this[_0x2aabf3(0x19c)][_0x2aabf3(0x258)]()[this['_index']]:null;},Sprite_CTB_TurnOrder_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x265)]=function(_0x5423b7){const _0x55e0b1=_0x1dd8db,_0x503e3f=this[_0x55e0b1(0x14c)]();if(!_0x503e3f)return Number[_0x55e0b1(0xe1)];const _0xfce5d6=0x1*(this[_0x55e0b1(0x23d)]+0x1);return _0x503e3f[_0x55e0b1(0x22c)](_0xfce5d6,_0x5423b7);},Sprite_CTB_TurnOrder_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0xd4)]=function(){const _0x5569fa=_0x1dd8db;Sprite_Clickable[_0x5569fa(0x18f)][_0x5569fa(0xd4)][_0x5569fa(0x1cf)](this),this[_0x5569fa(0x129)](),this[_0x5569fa(0x10c)](),this[_0x5569fa(0x197)](),this['updateOpacity'](),this[_0x5569fa(0x1fc)](),this[_0x5569fa(0x1be)](),this[_0x5569fa(0xdb)](),this[_0x5569fa(0x1ed)]();},Sprite_CTB_TurnOrder_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x129)]=function(){const _0x270525=_0x1dd8db,_0x41a35e=this[_0x270525(0x1ee)]();if(this[_0x270525(0x157)]===_0x41a35e)return;this[_0x270525(0x157)]=_0x41a35e;const _0x202825=Window_CTB_TurnOrder[_0x270525(0x22d)],_0x1beb89=this[_0x270525(0x141)](),_0x16e0c9=_0x202825['OrderDirection'],_0x313e8d=_0x202825[_0x270525(0x26e)],_0x8346b7=SceneManager[_0x270525(0x1e1)][_0x270525(0xef)];if(!_0x8346b7)return;this[_0x270525(0x14f)]=_0x202825[_0x270525(0xf5)],this[_0x270525(0x1e8)]=_0x1beb89?_0x202825[_0x270525(0x101)]*_0x41a35e:0x0,this[_0x270525(0x173)]=_0x1beb89?0x0:_0x202825[_0x270525(0x101)]*_0x41a35e,_0x41a35e>0x0&&(this[_0x270525(0x1e8)]+=_0x1beb89?_0x313e8d:0x0,this[_0x270525(0x173)]+=_0x1beb89?0x0:_0x313e8d),_0x16e0c9?this[_0x270525(0x1e8)]=_0x1beb89?_0x8346b7[_0x270525(0x14b)]-this[_0x270525(0x1e8)]-_0x202825[_0x270525(0x101)]:0x0:this['_positionTargetY']=_0x1beb89?0x0:_0x8346b7['height']-this['_positionTargetY']-_0x202825['SpriteThin'];},Sprite_CTB_TurnOrder_Battler['prototype']['updatePosition']=function(){const _0x5ecccb=_0x1dd8db;if(this[_0x5ecccb(0x224)]>0x0)return;if(this[_0x5ecccb(0x14f)]>0x0){const _0x3c08a9=this[_0x5ecccb(0x14f)];this['x']=(this['x']*(_0x3c08a9-0x1)+this[_0x5ecccb(0x1e8)])/_0x3c08a9,this['y']=(this['y']*(_0x3c08a9-0x1)+this[_0x5ecccb(0x173)])/_0x3c08a9,this[_0x5ecccb(0x14f)]--;}this[_0x5ecccb(0x14f)]<=0x0&&(this['x']=this[_0x5ecccb(0x1e8)],this['y']=this[_0x5ecccb(0x173)],this[_0x5ecccb(0x142)]<=0x0&&!this[_0x5ecccb(0x114)]&&this[_0x5ecccb(0x119)](0xff));},Sprite_CTB_TurnOrder_Battler['prototype'][_0x1dd8db(0x25f)]=function(){const _0x260f67=_0x1dd8db;return Window_CTB_TurnOrder[_0x260f67(0x22d)][_0x260f67(0x259)]*0x14;},Sprite_CTB_TurnOrder_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0xfa)]=function(){const _0x31d7c1=_0x1dd8db;return SceneManager[_0x31d7c1(0x1e1)][_0x31d7c1(0xef)];},Sprite_CTB_TurnOrder_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x1ee)]=function(){const _0x3a2eb8=_0x1dd8db;if(!this[_0x3a2eb8(0xfa)]())return this['defaultPosition']();const _0x14d143=this[_0x3a2eb8(0xfa)]()['_turnOrderContainer'];return _0x14d143[_0x3a2eb8(0xf7)](this);},Sprite_CTB_TurnOrder_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x1bc)]=function(){const _0x19c6ca=_0x1dd8db,_0x224759=Window_CTB_TurnOrder[_0x19c6ca(0x22d)],_0xdb8e62=this[_0x19c6ca(0x141)](),_0x212a52=_0xdb8e62?_0x224759[_0x19c6ca(0x259)]:_0x224759[_0x19c6ca(0x15b)];this[_0x19c6ca(0x23d)]-=0x1,this[_0x19c6ca(0x23d)]<0x0&&(this[_0x19c6ca(0x23d)]=_0x212a52-0x1,this[_0x19c6ca(0x119)](0x0));},Sprite_CTB_TurnOrder_Battler['prototype'][_0x1dd8db(0x119)]=function(_0x4f08f7){const _0x49065b=_0x1dd8db,_0x591140=Window_CTB_TurnOrder[_0x49065b(0x22d)];this[_0x49065b(0x224)]=_0x591140[_0x49065b(0xf5)],this['_fadeTarget']=_0x4f08f7;},Sprite_CTB_TurnOrder_Battler[_0x1dd8db(0x18f)]['checkOpacity']=function(){const _0x1292c4=_0x1dd8db,_0x43114a=this[_0x1292c4(0x14c)]();if(!_0x43114a)return;if(this[_0x1292c4(0x1a8)]===_0x43114a[_0x1292c4(0x182)]()&&this['_isAppeared']===_0x43114a[_0x1292c4(0x25e)]())return;this[_0x1292c4(0x1a8)]=_0x43114a[_0x1292c4(0x182)](),this[_0x1292c4(0x1d1)]=_0x43114a[_0x1292c4(0x25e)]();let _0x7718c5=this[_0x1292c4(0x1a8)]&&this[_0x1292c4(0x1d1)]?0xff:0x0;this[_0x1292c4(0x119)](_0x7718c5);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x1dd8db(0xcb)]=function(){const _0x20c2a1=_0x1dd8db;if(this[_0x20c2a1(0x224)]>0x0){const _0x241dbe=this[_0x20c2a1(0x224)];this[_0x20c2a1(0x142)]=(this[_0x20c2a1(0x142)]*(_0x241dbe-0x1)+this[_0x20c2a1(0x1c1)])/_0x241dbe,this['_fadeDuration']--,this['_fadeDuration']<=0x0&&(this[_0x20c2a1(0x129)](),this['_positionDuration']=0x0,this[_0x20c2a1(0x10c)](),this['opacity']=this[_0x20c2a1(0x1c1)]);}if(this[_0x20c2a1(0x114)])return;BattleManager[_0x20c2a1(0xc9)]===_0x20c2a1(0x10a)&&(this[_0x20c2a1(0x114)]=!![],this[_0x20c2a1(0x119)](0x0));},Sprite_CTB_TurnOrder_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x1fc)]=function(){const _0x22ccca=_0x1dd8db,_0x33f137=this[_0x22ccca(0x14c)]();if(!_0x33f137)return;const _0x292eec=Window_CTB_TurnOrder['Settings'],_0x3721eb=this[_0x22ccca(0x19c)]===$gameParty?_0x22ccca(0xfb):'Enemy';let _0x5c2e66=_0x33f137['TurnOrderCTBGraphicType']();if(_0x33f137['isActor']()&&_0x5c2e66===_0x22ccca(0x1cc))_0x5c2e66=_0x22ccca(0x1e4);else _0x33f137['isEnemy']()&&_0x5c2e66===_0x22ccca(0x201)&&(_0x5c2e66=_0x22ccca(0x1cc));if(this[_0x22ccca(0x145)]!==_0x5c2e66)return this[_0x22ccca(0x13e)]();switch(this['_graphicType']){case _0x22ccca(0x1e4):if(this[_0x22ccca(0x217)]!==_0x33f137[_0x22ccca(0x228)]())return this[_0x22ccca(0x13e)]();if(this[_0x22ccca(0x113)]!==_0x33f137[_0x22ccca(0x21d)]())return this[_0x22ccca(0x13e)]();break;case _0x22ccca(0x1f6):if(this['_graphicIconIndex']!==_0x33f137[_0x22ccca(0x199)]())return this['processUpdateGraphic']();break;case _0x22ccca(0x1cc):if(_0x33f137[_0x22ccca(0x20d)]()){if(this[_0x22ccca(0x106)]!==_0x33f137[_0x22ccca(0x1f9)]())return this[_0x22ccca(0x13e)]();}else{if(this[_0x22ccca(0x155)]!==_0x33f137['battlerName']())return this['processUpdateGraphic']();}break;case _0x22ccca(0x201):if(_0x33f137[_0x22ccca(0x260)]()){if(this[_0x22ccca(0x106)]!==_0x33f137[_0x22ccca(0x229)]())return this[_0x22ccca(0x13e)]();}else{if(this['_graphicEnemy']!==_0x33f137[_0x22ccca(0x229)]())return this[_0x22ccca(0x13e)]();}break;}},Sprite_CTB_TurnOrder_Battler['prototype'][_0x1dd8db(0x13e)]=function(){const _0x5d2cc7=_0x1dd8db,_0xfd2b4d=this[_0x5d2cc7(0x14c)]();if(!_0xfd2b4d)return;this[_0x5d2cc7(0x145)]=_0xfd2b4d[_0x5d2cc7(0x1e6)]();if(_0xfd2b4d[_0x5d2cc7(0x260)]()&&this[_0x5d2cc7(0x145)]==='enemy')this['_graphicType']='face';else _0xfd2b4d[_0x5d2cc7(0x167)]()&&this[_0x5d2cc7(0x145)]===_0x5d2cc7(0x201)&&(this['_graphicType']=_0x5d2cc7(0x1cc));let _0x254dce;switch(this[_0x5d2cc7(0x145)]){case'face':this[_0x5d2cc7(0x217)]=_0xfd2b4d['TurnOrderCTBGraphicFaceName'](),this[_0x5d2cc7(0x113)]=_0xfd2b4d[_0x5d2cc7(0x21d)](),_0x254dce=ImageManager[_0x5d2cc7(0x166)](this['_graphicFaceName']),_0x254dce['addLoadListener'](this[_0x5d2cc7(0x12a)][_0x5d2cc7(0x18a)](this,_0x254dce));break;case _0x5d2cc7(0x1f6):this[_0x5d2cc7(0x21f)]=_0xfd2b4d[_0x5d2cc7(0x1a3)](),_0x254dce=ImageManager['loadSystem'](_0x5d2cc7(0x110)),_0x254dce[_0x5d2cc7(0x1d7)](this[_0x5d2cc7(0x1fe)][_0x5d2cc7(0x18a)](this,_0x254dce));break;case _0x5d2cc7(0x1cc):if(_0xfd2b4d[_0x5d2cc7(0x20d)]())this[_0x5d2cc7(0x106)]=_0xfd2b4d['svBattlerName'](),_0x254dce=ImageManager[_0x5d2cc7(0xe5)](this[_0x5d2cc7(0x106)]),_0x254dce['addLoadListener'](this['changeSvActorGraphicBitmap'][_0x5d2cc7(0x18a)](this,_0x254dce));else $gameSystem[_0x5d2cc7(0x22f)]()?(this[_0x5d2cc7(0x155)]=_0xfd2b4d['battlerName'](),_0x254dce=ImageManager[_0x5d2cc7(0x15c)](this['_graphicEnemy']),_0x254dce[_0x5d2cc7(0x1d7)](this[_0x5d2cc7(0xfc)][_0x5d2cc7(0x18a)](this,_0x254dce))):(this[_0x5d2cc7(0x155)]=_0xfd2b4d['battlerName'](),_0x254dce=ImageManager['loadEnemy'](this[_0x5d2cc7(0x155)]),_0x254dce[_0x5d2cc7(0x1d7)](this[_0x5d2cc7(0xfc)][_0x5d2cc7(0x18a)](this,_0x254dce)));break;case'svactor':this['_graphicSv']=_0xfd2b4d['battlerName'](),_0x254dce=ImageManager['loadSvActor'](this[_0x5d2cc7(0x106)]),_0x254dce['addLoadListener'](this[_0x5d2cc7(0x14e)][_0x5d2cc7(0x18a)](this,_0x254dce));break;}},Sprite_CTB_TurnOrder_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x12a)]=function(_0x5947f0){const _0x5ca0d8=_0x1dd8db,_0x395530=this[_0x5ca0d8(0x113)],_0x440c52=this['bitmapWidth'](),_0x1bbac4=this[_0x5ca0d8(0x271)](),_0x29b7c1=Math[_0x5ca0d8(0x117)](_0x440c52,_0x1bbac4);this['_graphicSprite'][_0x5ca0d8(0xfd)]=new Bitmap(_0x440c52,_0x1bbac4);const _0xaeb622=this[_0x5ca0d8(0x170)][_0x5ca0d8(0xfd)],_0x19c70e=ImageManager[_0x5ca0d8(0xeb)],_0x35f0cd=ImageManager[_0x5ca0d8(0x104)],_0x3b592f=_0x29b7c1/Math[_0x5ca0d8(0x117)](_0x19c70e,_0x35f0cd),_0x33bafb=ImageManager[_0x5ca0d8(0xeb)],_0x578be6=ImageManager['faceHeight'],_0x13368c=_0x395530%0x4*_0x19c70e+(_0x19c70e-_0x33bafb)/0x2,_0x2c63a0=Math[_0x5ca0d8(0x163)](_0x395530/0x4)*_0x35f0cd+(_0x35f0cd-_0x578be6)/0x2,_0x1d6845=(_0x440c52-_0x19c70e*_0x3b592f)/0x2,_0x4cab95=(_0x1bbac4-_0x35f0cd*_0x3b592f)/0x2;_0xaeb622['blt'](_0x5947f0,_0x13368c,_0x2c63a0,_0x33bafb,_0x578be6,_0x1d6845,_0x4cab95,_0x29b7c1,_0x29b7c1);},Sprite_CTB_TurnOrder_Battler['prototype']['changeIconGraphicBitmap']=function(_0xb380eb){const _0x38ea01=_0x1dd8db,_0x13aaa0=this[_0x38ea01(0x21f)],_0x308438=this[_0x38ea01(0x236)](),_0x2332cf=this[_0x38ea01(0x271)]();this['_graphicSprite'][_0x38ea01(0xfd)]=new Bitmap(_0x308438,_0x2332cf);const _0x2d6e35=this[_0x38ea01(0x170)][_0x38ea01(0xfd)],_0x4393ca=ImageManager[_0x38ea01(0x23f)],_0x57d3e8=ImageManager[_0x38ea01(0x134)],_0x49c568=Math[_0x38ea01(0x11a)](_0x4393ca,_0x57d3e8,_0x308438,_0x2332cf),_0x5403c0=_0x13aaa0%0x10*_0x4393ca,_0x11aa37=Math['floor'](_0x13aaa0/0x10)*_0x57d3e8,_0xde68a3=Math[_0x38ea01(0x163)](Math[_0x38ea01(0x117)](_0x308438-_0x49c568,0x0)/0x2),_0x2a0aa6=Math[_0x38ea01(0x163)](Math['max'](_0x2332cf-_0x49c568,0x0)/0x2);_0x2d6e35[_0x38ea01(0x25c)](_0xb380eb,_0x5403c0,_0x11aa37,_0x4393ca,_0x57d3e8,_0xde68a3,_0x2a0aa6,_0x49c568,_0x49c568);},Sprite_CTB_TurnOrder_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x14e)]=function(_0x102c5d){const _0x545b28=_0x1dd8db,_0x183b41=this[_0x545b28(0x236)](),_0x66bca0=this['bitmapHeight'](),_0x1cdf4c=Math['min'](_0x183b41,_0x66bca0);this[_0x545b28(0x170)]['bitmap']=new Bitmap(_0x183b41,_0x66bca0);const _0x56392b=this['_graphicSprite'][_0x545b28(0xfd)],_0x148561=0x9,_0x34f42b=0x6,_0x1dab7f=_0x102c5d[_0x545b28(0x14b)]/_0x148561,_0x2c3490=_0x102c5d[_0x545b28(0x1d9)]/_0x34f42b,_0x2fc5cf=Math[_0x545b28(0x11a)](0x1,_0x1cdf4c/_0x1dab7f,_0x1cdf4c/_0x2c3490),_0x52466e=_0x1dab7f*_0x2fc5cf,_0x1d474e=_0x2c3490*_0x2fc5cf,_0x5d25f1=Math['round']((_0x183b41-_0x52466e)/0x2),_0x48932f=Math[_0x545b28(0x177)]((_0x66bca0-_0x1d474e)/0x2);_0x56392b['blt'](_0x102c5d,0x0,0x0,_0x1dab7f,_0x2c3490,_0x5d25f1,_0x48932f,_0x52466e,_0x1d474e);},Sprite_CTB_TurnOrder_Battler[_0x1dd8db(0x18f)]['changeEnemyGraphicBitmap']=function(_0x1e7882){const _0x4b1f52=_0x1dd8db,_0x16187a=Window_CTB_TurnOrder['Settings'],_0x31407a=this['bitmapWidth'](),_0x280a59=this['bitmapHeight'](),_0x5c13e1=Math['min'](_0x31407a,_0x280a59);this[_0x4b1f52(0x170)][_0x4b1f52(0xfd)]=new Bitmap(_0x31407a,_0x280a59);const _0x4d9158=this[_0x4b1f52(0x170)][_0x4b1f52(0xfd)],_0x3e3e14=Math[_0x4b1f52(0x11a)](0x1,_0x5c13e1/_0x1e7882[_0x4b1f52(0x14b)],_0x5c13e1/_0x1e7882[_0x4b1f52(0x1d9)]),_0x32c455=_0x1e7882[_0x4b1f52(0x14b)]*_0x3e3e14,_0x3b810c=_0x1e7882[_0x4b1f52(0x1d9)]*_0x3e3e14,_0x1daed9=Math[_0x4b1f52(0x177)]((_0x31407a-_0x32c455)/0x2),_0x2c4b1c=Math[_0x4b1f52(0x177)]((_0x280a59-_0x3b810c)/0x2);_0x4d9158[_0x4b1f52(0x25c)](_0x1e7882,0x0,0x0,_0x1e7882[_0x4b1f52(0x14b)],_0x1e7882['height'],_0x1daed9,_0x2c4b1c,_0x32c455,_0x3b810c);},Sprite_CTB_TurnOrder_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0x1be)]=function(){const _0x59cb31=_0x1dd8db,_0x2ba605=this[_0x59cb31(0x14c)]();if(!_0x2ba605)return;if(!_0x2ba605[_0x59cb31(0x167)]())return;if(this['_graphicHue']===_0x2ba605['battlerHue']())return;this[_0x59cb31(0x1e7)]=_0x2ba605[_0x59cb31(0x188)]();if(_0x2ba605[_0x59cb31(0x20d)]())this[_0x59cb31(0x1e7)]=0x0;this['_graphicSprite']['setHue'](this[_0x59cb31(0x1e7)]);},Sprite_CTB_TurnOrder_Battler[_0x1dd8db(0x18f)][_0x1dd8db(0xdb)]=function(){const _0x2a817c=_0x1dd8db;if(!this[_0x2a817c(0x128)])return;const _0x89d030=this[_0x2a817c(0x14c)]();if(!_0x89d030)return;if(this[_0x2a817c(0x246)]===_0x89d030[_0x2a817c(0x246)]&&this[_0x2a817c(0xd6)]===_0x89d030[_0x2a817c(0xd6)])return;this[_0x2a817c(0x246)]=_0x89d030['_letter'],this[_0x2a817c(0xd6)]=_0x89d030[_0x2a817c(0xd6)];const _0x51165f=Window_CTB_TurnOrder['Settings'],_0x47fde9=this['isHorz'](),_0x4042a1=this[_0x2a817c(0x236)](),_0x3448e6=this[_0x2a817c(0x271)](),_0xa53131=this[_0x2a817c(0x128)][_0x2a817c(0xfd)];_0xa53131['clear']();if(!this[_0x2a817c(0xd6)])return;_0xa53131['fontFace']=_0x51165f[_0x2a817c(0x21e)]||$gameSystem[_0x2a817c(0x1dd)](),_0xa53131[_0x2a817c(0x158)]=_0x51165f[_0x2a817c(0x1e3)]||0x10,_0x47fde9?_0xa53131[_0x2a817c(0x204)](this[_0x2a817c(0x246)][_0x2a817c(0x1a0)](),0x0,_0x3448e6/0x2,_0x4042a1,_0x3448e6/0x2,'center'):_0xa53131[_0x2a817c(0x204)](this['_letter'][_0x2a817c(0x1a0)](),0x0,0x2,_0x4042a1-0x8,_0x3448e6-0x4,_0x2a817c(0x1c9));},Sprite_CTB_TurnOrder_Battler[_0x1dd8db(0x18f)]['updateSelectionEffect']=function(){const _0x5ec330=_0x1dd8db,_0x3fd2d0=this[_0x5ec330(0x14c)]();if(!_0x3fd2d0)return;const _0x271741=_0x3fd2d0['battler']();if(!_0x271741)return;const _0x5b5751=_0x271741[_0x5ec330(0x22b)]();if(!_0x5b5751)return;this['setBlendColor'](_0x5b5751['_blendColor']);},Sprite_CTB_TurnOrder_Battler['prototype']['getStateTooltipBattler']=function(){const _0x510c98=_0x1dd8db;return this[_0x510c98(0x14c)]();},VisuMZ['BattleSystemCTB'][_0x1dd8db(0x109)]=Window_Help[_0x1dd8db(0x18f)]['setItem'],Window_Help[_0x1dd8db(0x18f)][_0x1dd8db(0xcd)]=function(_0x123ae2){const _0x15dda5=_0x1dd8db;BattleManager[_0x15dda5(0x193)]()&&_0x123ae2&&_0x123ae2[_0x15dda5(0x26c)]&&_0x123ae2['note'][_0x15dda5(0x211)](/<(?:CTB) HELP>\s*([\s\S]*)\s*<\/(?:CTB) HELP>/i)?this['setText'](String(RegExp['$1'])):VisuMZ[_0x15dda5(0x159)][_0x15dda5(0x109)][_0x15dda5(0x1cf)](this,_0x123ae2);},VisuMZ[_0x1dd8db(0x159)][_0x1dd8db(0x1fa)]=Window_StatusBase[_0x1dd8db(0x18f)][_0x1dd8db(0x1ff)],Window_StatusBase[_0x1dd8db(0x18f)][_0x1dd8db(0x1ff)]=function(_0x15a529,_0x41f4e4,_0x620a7f,_0x3d28fc){const _0x27075e=_0x1dd8db;if(BattleManager[_0x27075e(0x193)]()&&_0x41f4e4==='time')return;VisuMZ['BattleSystemCTB'][_0x27075e(0x1fa)]['call'](this,_0x15a529,_0x41f4e4,_0x620a7f,_0x3d28fc);};function Window_CTB_TurnOrder(){const _0x330b27=_0x1dd8db;this[_0x330b27(0x24c)](...arguments);}Window_CTB_TurnOrder[_0x1dd8db(0x18f)]=Object[_0x1dd8db(0x221)](Window_Base[_0x1dd8db(0x18f)]),Window_CTB_TurnOrder['prototype'][_0x1dd8db(0x1fd)]=Window_CTB_TurnOrder,Window_CTB_TurnOrder[_0x1dd8db(0x22d)]=VisuMZ[_0x1dd8db(0x159)][_0x1dd8db(0x22d)][_0x1dd8db(0x120)],Window_CTB_TurnOrder['prototype'][_0x1dd8db(0x24c)]=function(){const _0x24f362=_0x1dd8db,_0xdf7cb5=this[_0x24f362(0x1b3)]();this['_homeX']=_0xdf7cb5['x'],this[_0x24f362(0x153)]=_0xdf7cb5['y'],Window_Base['prototype'][_0x24f362(0x24c)]['call'](this,_0xdf7cb5),this['createBattlerSprites'](),this[_0x24f362(0x1cd)](),this[_0x24f362(0x142)]=0x0;},Window_CTB_TurnOrder[_0x1dd8db(0x18f)][_0x1dd8db(0x1b3)]=function(){const _0x107a6b=_0x1dd8db,_0x444ba5=Window_CTB_TurnOrder[_0x107a6b(0x22d)],_0x334d58=SceneManager[_0x107a6b(0x1e1)]['_statusWindow']['height'],_0x21f97d=SceneManager[_0x107a6b(0x1e1)][_0x107a6b(0xf4)]['height'],_0x317430=_0x444ba5[_0x107a6b(0x26e)];let _0x2f9f43=0x0,_0x51e490=0x0,_0x41fa5c=0x0,_0x3f2fcb=0x0;switch(_0x444ba5[_0x107a6b(0x131)]){case _0x107a6b(0x233):_0x2f9f43=_0x444ba5['SpriteThin']*_0x444ba5[_0x107a6b(0x259)]+_0x317430,_0x51e490=_0x444ba5[_0x107a6b(0x14a)],_0x41fa5c=Math['ceil']((Graphics[_0x107a6b(0x14b)]-_0x2f9f43)/0x2),_0x3f2fcb=_0x444ba5[_0x107a6b(0xe0)];break;case _0x107a6b(0x179):_0x2f9f43=_0x444ba5[_0x107a6b(0x101)]*_0x444ba5[_0x107a6b(0x259)]+_0x317430,_0x51e490=_0x444ba5['SpriteLength'],_0x41fa5c=Math[_0x107a6b(0x20b)]((Graphics[_0x107a6b(0x14b)]-_0x2f9f43)/0x2),_0x3f2fcb=Graphics['height']-_0x334d58-_0x51e490-_0x444ba5[_0x107a6b(0xe0)];break;case _0x107a6b(0xcf):_0x2f9f43=_0x444ba5[_0x107a6b(0x14a)],_0x51e490=_0x444ba5[_0x107a6b(0x101)]*_0x444ba5[_0x107a6b(0x15b)]+_0x317430,_0x41fa5c=_0x444ba5[_0x107a6b(0xe0)],_0x3f2fcb=Math[_0x107a6b(0x20b)]((Graphics[_0x107a6b(0x1d9)]-_0x334d58+_0x21f97d-_0x51e490)/0x2);break;case'right':_0x2f9f43=_0x444ba5[_0x107a6b(0x14a)],_0x51e490=_0x444ba5[_0x107a6b(0x101)]*_0x444ba5[_0x107a6b(0x15b)]+_0x317430,_0x41fa5c=Graphics[_0x107a6b(0x14b)]-_0x2f9f43-_0x444ba5[_0x107a6b(0xe0)],_0x3f2fcb=Math[_0x107a6b(0x20b)]((Graphics['height']-_0x334d58+_0x21f97d-_0x51e490)/0x2);break;}return _0x41fa5c+=_0x444ba5[_0x107a6b(0x156)],_0x3f2fcb+=_0x444ba5[_0x107a6b(0x267)],new Rectangle(_0x41fa5c,_0x3f2fcb,_0x2f9f43,_0x51e490);},Window_CTB_TurnOrder[_0x1dd8db(0x18f)][_0x1dd8db(0x1af)]=function(){this['padding']=0x0;},Window_CTB_TurnOrder[_0x1dd8db(0x18f)]['isHorz']=function(){const _0x4c96f0=_0x1dd8db,_0x524173=Window_CTB_TurnOrder[_0x4c96f0(0x22d)],_0x2d0cdf=[_0x4c96f0(0x233),_0x4c96f0(0x179)][_0x4c96f0(0x16a)](_0x524173['DisplayPosition']);return _0x2d0cdf;},Window_CTB_TurnOrder[_0x1dd8db(0x18f)][_0x1dd8db(0x215)]=function(){const _0x1aef61=_0x1dd8db,_0x552dc8=Window_CTB_TurnOrder[_0x1aef61(0x22d)],_0x3d0498=this[_0x1aef61(0x141)](),_0x22d944=_0x3d0498?_0x552dc8[_0x1aef61(0x259)]:_0x552dc8[_0x1aef61(0x15b)];this['_turnOrderInnerSprite']=new Sprite(),this[_0x1aef61(0x184)](this[_0x1aef61(0x1e5)]),this[_0x1aef61(0x148)]=[];for(let _0x412392=0x0;_0x412392<$gameParty[_0x1aef61(0x1c4)]();_0x412392++){for(let _0x417049=0x0;_0x417049<_0x22d944;_0x417049++){const _0x5a1177=new Sprite_CTB_TurnOrder_Battler($gameParty,_0x412392,_0x417049);this['_turnOrderInnerSprite'][_0x1aef61(0xea)](_0x5a1177),this['_turnOrderContainer'][_0x1aef61(0x1f4)](_0x5a1177);}}for(let _0x5e113e=0x0;_0x5e113e<0x8;_0x5e113e++){for(let _0x46ccd0=0x0;_0x46ccd0<_0x22d944;_0x46ccd0++){const _0x220955=new Sprite_CTB_TurnOrder_Battler($gameTroop,_0x5e113e,_0x46ccd0);this['_turnOrderInnerSprite']['addChild'](_0x220955),this[_0x1aef61(0x148)]['push'](_0x220955);}}},Window_CTB_TurnOrder[_0x1dd8db(0x18f)][_0x1dd8db(0xd4)]=function(){const _0x3c550a=_0x1dd8db;Window_Base[_0x3c550a(0x18f)][_0x3c550a(0xd4)][_0x3c550a(0x1cf)](this),this[_0x3c550a(0x10c)](),this[_0x3c550a(0x18e)](),this[_0x3c550a(0x1cd)]();},Window_CTB_TurnOrder['prototype'][_0x1dd8db(0x10c)]=function(){const _0x406fea=_0x1dd8db,_0x5c5c81=Window_CTB_TurnOrder['Settings'];if(_0x5c5c81[_0x406fea(0x131)]!==_0x406fea(0x233))return;if(!_0x5c5c81[_0x406fea(0x140)])return;const _0x4a12b8=SceneManager[_0x406fea(0x1e1)]['_helpWindow'];if(!_0x4a12b8)return;_0x4a12b8[_0x406fea(0x1d0)]?(this['x']=this[_0x406fea(0x26f)]+(_0x5c5c81[_0x406fea(0x254)]||0x0),this['y']=this['_homeY']+(_0x5c5c81[_0x406fea(0xf6)]||0x0)):(this['x']=this[_0x406fea(0x26f)],this['y']=this[_0x406fea(0x153)]);const _0x50c09d=SceneManager[_0x406fea(0x1e1)]['_windowLayer'];this[_0x406fea(0xdd)]===undefined&&(this[_0x406fea(0xdd)]=Math[_0x406fea(0x177)]((Graphics[_0x406fea(0x14b)]-Math['min'](Graphics['boxWidth'],_0x50c09d[_0x406fea(0x14b)]))/0x2),this[_0x406fea(0x209)]=Math['round']((Graphics[_0x406fea(0x1d9)]-Math['min'](Graphics[_0x406fea(0x1dc)],_0x50c09d[_0x406fea(0x1d9)]))/0x2)),this['x']+=_0x50c09d['x']-this['_ogWindowLayerX'],this['y']+=_0x50c09d['y']-this[_0x406fea(0x209)];},Window_CTB_TurnOrder['prototype'][_0x1dd8db(0x18e)]=function(){const _0x31c2ca=_0x1dd8db;if(!this[_0x31c2ca(0x1e5)])return;const _0x2d2aee=this[_0x31c2ca(0x1e5)][_0x31c2ca(0x213)];if(!_0x2d2aee)return;_0x2d2aee[_0x31c2ca(0x124)](this[_0x31c2ca(0x149)][_0x31c2ca(0x18a)](this));},Window_CTB_TurnOrder[_0x1dd8db(0x18f)][_0x1dd8db(0x149)]=function(_0x412905,_0x2bf278){const _0x3e470d=_0x1dd8db,_0x2979a4=this['isHorz'](),_0x8636fb=Window_CTB_TurnOrder[_0x3e470d(0x22d)]['OrderDirection'];if(_0x2979a4&&!_0x8636fb)return _0x412905['x']-_0x2bf278['x'];else{if(_0x2979a4&&_0x8636fb)return _0x2bf278['x']-_0x412905['x'];else{if(!_0x2979a4&&_0x8636fb)return _0x412905['y']-_0x2bf278['y'];else{if(!_0x2979a4&&!_0x8636fb)return _0x2bf278['y']-_0x412905['y'];}}}},Window_CTB_TurnOrder['prototype'][_0x1dd8db(0x1cd)]=function(){const _0xc880d=_0x1dd8db;this[_0xc880d(0x1d0)]=$gameSystem[_0xc880d(0x249)]();},Window_CTB_TurnOrder['prototype'][_0x1dd8db(0x122)]=function(_0x2c7647){const _0x1410ff=_0x1dd8db;this['_turnOrderContainer'][_0x1410ff(0x124)]((_0x5253f6,_0x20de16)=>{const _0x2cbc86=_0x1410ff;return _0x5253f6[_0x2cbc86(0x265)]()-_0x20de16[_0x2cbc86(0x265)]();});if(!_0x2c7647)return;for(const _0x205ed0 of this[_0x1410ff(0x148)]){if(!_0x205ed0)continue;_0x205ed0[_0x1410ff(0xd4)](),_0x205ed0['_positionDuration']=0x0;}},Window_CTB_TurnOrder[_0x1dd8db(0x18f)][_0x1dd8db(0x230)]=function(_0x1d0d7a){const _0x3382cf=_0x1dd8db;for(const _0x55a5e9 of this[_0x3382cf(0x148)]){if(!_0x55a5e9)continue;if(_0x55a5e9['battler']()!==_0x1d0d7a)continue;_0x55a5e9[_0x3382cf(0x1bc)]();}};