//=============================================================================
// VisuStella MZ - Battle System CTB - Charge Turn Battle
// VisuMZ_2_BattleSystemCTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemCTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemCTB = VisuMZ.BattleSystemCTB || {};
VisuMZ.BattleSystemCTB.version = 1.18;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.18] [BattleSystemCTB]
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
 *   Device Friendly:
 *   - Make the calculations more device friendly?
 *   - Or make it for desktop at full strength?
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
 * Version 1.18: June 2, 2022
 * * Bug Fixes!
 * ** Notetag effect for <CTB After Speed: x%> should now be working properly.
 *    Fix made by Olivia.
 * ** Notetag effect for <JS CTB After Speed> should now be working properly.
 *    Fix made by Olivia.
 * 
 * Version 1.17: May 2, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.16: April 28, 2022
 * * Feature Update!
 * ** Added update for CTB-specific idle time to allow a more consistent turn
 *    end processing for actors and enemies with higher than normal AGI values.
 *    Update made by Olivia.
 * 
 * Version 1.15: April 21, 2022
 * * Bug Fixes!
 * ** The endless softlock has been fixed! Much thanks to AndyL for providing a
 *    project that can easily replicate it! Fix made by Yanfly.
 * * Feature Update!
 * ** Slightly more accurate turn order forecasting. However, there is only so
 *    much I can do due to JavaScript's "accuracy" with decimal values. Update
 *    made by Yanfly.
 * 
 * Version 1.14: March 31, 2022
 * * Feature Update!
 * ** Updated anti-softlock check at 180 frames (3 seconds) to automatically
 *    clear any battle states to see if they're the cause of the hangup.
 * ** Updated anti-softlock check at 300 frames (5 seconds) to automatically
 *    clear all states to see if they're the cause of the hangup.
 * ** Updated anti-softlock check at 600 frames (10 seconds) to automatically
 *    abort the battle to salvage the game from freezing.
 * 
 * Version 1.13: March 3, 2022
 * * Feature Update!
 * ** Reserved common events for non-action sequence skills now function
 *    separately from one another when used by a battler with Action Times+.
 *    Update made by Olivia.
 * 
 * Version 1.12: February 17, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: October 28, 2021
 * * Bug Fixes!
 * ** Turn Order display will no longer appear at differing X and Y positions
 *    when using specific battle layouts. Update made by Olivia.
 * 
 * Version 1.10: June 18, 2021
 * * Bug Fixes!
 * ** Fixed turn order icon reappearing for a dying battler. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu!
 * *** Plugin Parameters > Mechanics > General > Device Friendly
 * **** Make the calculations more device friendly? Or make it for desktop at
 *      full strength?
 * 
 * Version 1.09: June 11, 2021
 * * Bug Fixes!
 * ** Plugin Command: "Enemy: Change CTB Turn Order Face" should now properly
 *    change to the correct face index. Fix made by Arisu.
 * 
 * Version 1.08: April 23, 2021
 * * Feature Update!
 * ** When using 100% for After Speed notetag, no other battler is able to
 *    interrupt the action. Update made by Olivia.
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
 * @param DeviceFriendly:eval
 * @text Device Friendly
 * @parent General
 * @type boolean
 * @on Device Friendly
 * @off For Desktops
 * @desc Make the calculations more device friendly?
 * Or make it for desktop at full strength?
 * @default false
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
 * @type number
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
 * @type number
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

const _0x117212=_0x25bd;(function(_0x3347c9,_0x53980a){const _0x2bbc4a=_0x25bd,_0x4f36bd=_0x3347c9();while(!![]){try{const _0x188b3e=-parseInt(_0x2bbc4a(0x290))/0x1*(-parseInt(_0x2bbc4a(0x1f5))/0x2)+-parseInt(_0x2bbc4a(0x1a4))/0x3*(-parseInt(_0x2bbc4a(0x321))/0x4)+-parseInt(_0x2bbc4a(0x25c))/0x5*(-parseInt(_0x2bbc4a(0x29e))/0x6)+-parseInt(_0x2bbc4a(0x2f6))/0x7*(parseInt(_0x2bbc4a(0x282))/0x8)+parseInt(_0x2bbc4a(0x327))/0x9+parseInt(_0x2bbc4a(0x20f))/0xa+-parseInt(_0x2bbc4a(0x253))/0xb;if(_0x188b3e===_0x53980a)break;else _0x4f36bd['push'](_0x4f36bd['shift']());}catch(_0x2a460d){_0x4f36bd['push'](_0x4f36bd['shift']());}}}(_0x3acb,0x995a3));var label=_0x117212(0x20d),tier=tier||0x0,dependencies=[_0x117212(0x29c),_0x117212(0x2f5)],pluginData=$plugins[_0x117212(0x129)](function(_0x5e3aed){const _0x1f807a=_0x117212;return _0x5e3aed['status']&&_0x5e3aed[_0x1f807a(0x2d1)][_0x1f807a(0x21d)]('['+label+']');})[0x0];VisuMZ[label][_0x117212(0x1b8)]=VisuMZ[label][_0x117212(0x1b8)]||{},VisuMZ[_0x117212(0x310)]=function(_0x533af4,_0x2be471){const _0x576fd9=_0x117212;for(const _0x2f027e in _0x2be471){if(_0x2f027e['match'](/(.*):(.*)/i)){const _0x359f94=String(RegExp['$1']),_0x4edea6=String(RegExp['$2'])[_0x576fd9(0x2a4)]()[_0x576fd9(0x2c8)]();let _0x33252b,_0xad8983,_0x28eda8;switch(_0x4edea6){case _0x576fd9(0x23d):_0x33252b=_0x2be471[_0x2f027e]!==''?Number(_0x2be471[_0x2f027e]):0x0;break;case _0x576fd9(0x2e6):_0xad8983=_0x2be471[_0x2f027e]!==''?JSON['parse'](_0x2be471[_0x2f027e]):[],_0x33252b=_0xad8983['map'](_0x4d9869=>Number(_0x4d9869));break;case'EVAL':_0x33252b=_0x2be471[_0x2f027e]!==''?eval(_0x2be471[_0x2f027e]):null;break;case _0x576fd9(0x1f3):_0xad8983=_0x2be471[_0x2f027e]!==''?JSON[_0x576fd9(0x1a1)](_0x2be471[_0x2f027e]):[],_0x33252b=_0xad8983[_0x576fd9(0x20c)](_0x47de99=>eval(_0x47de99));break;case _0x576fd9(0x193):_0x33252b=_0x2be471[_0x2f027e]!==''?JSON['parse'](_0x2be471[_0x2f027e]):'';break;case _0x576fd9(0x213):_0xad8983=_0x2be471[_0x2f027e]!==''?JSON['parse'](_0x2be471[_0x2f027e]):[],_0x33252b=_0xad8983[_0x576fd9(0x20c)](_0x34e748=>JSON[_0x576fd9(0x1a1)](_0x34e748));break;case _0x576fd9(0x147):_0x33252b=_0x2be471[_0x2f027e]!==''?new Function(JSON[_0x576fd9(0x1a1)](_0x2be471[_0x2f027e])):new Function('return\x200');break;case _0x576fd9(0x2ea):_0xad8983=_0x2be471[_0x2f027e]!==''?JSON[_0x576fd9(0x1a1)](_0x2be471[_0x2f027e]):[],_0x33252b=_0xad8983[_0x576fd9(0x20c)](_0x51241a=>new Function(JSON[_0x576fd9(0x1a1)](_0x51241a)));break;case _0x576fd9(0x1c3):_0x33252b=_0x2be471[_0x2f027e]!==''?String(_0x2be471[_0x2f027e]):'';break;case _0x576fd9(0x221):_0xad8983=_0x2be471[_0x2f027e]!==''?JSON[_0x576fd9(0x1a1)](_0x2be471[_0x2f027e]):[],_0x33252b=_0xad8983[_0x576fd9(0x20c)](_0x3b6894=>String(_0x3b6894));break;case _0x576fd9(0x15a):_0x28eda8=_0x2be471[_0x2f027e]!==''?JSON['parse'](_0x2be471[_0x2f027e]):{},_0x33252b=VisuMZ[_0x576fd9(0x310)]({},_0x28eda8);break;case _0x576fd9(0x248):_0xad8983=_0x2be471[_0x2f027e]!==''?JSON[_0x576fd9(0x1a1)](_0x2be471[_0x2f027e]):[],_0x33252b=_0xad8983[_0x576fd9(0x20c)](_0x733b1d=>VisuMZ[_0x576fd9(0x310)]({},JSON[_0x576fd9(0x1a1)](_0x733b1d)));break;default:continue;}_0x533af4[_0x359f94]=_0x33252b;}}return _0x533af4;},(_0x355499=>{const _0x1c1ac2=_0x117212,_0x4bb432=_0x355499[_0x1c1ac2(0x2c2)];for(const _0x30cd43 of dependencies){if('pXlQz'!==_0x1c1ac2(0x19c)){if(!Imported[_0x30cd43]){if(_0x1c1ac2(0x238)==='kuLbd')_0x5ea849[_0x1c1ac2(0x20d)][_0x1c1ac2(0x28b)][_0x1c1ac2(0x225)](this);else{alert(_0x1c1ac2(0x12e)['format'](_0x4bb432,_0x30cd43)),SceneManager[_0x1c1ac2(0x2b7)]();break;}}}else{const _0x3a6e5d=this[_0x1c1ac2(0x1f2)]()[_0x1c1ac2(0x1f8)];if(_0x3a6e5d[_0x1c1ac2(0x134)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x222a73(_0x3ce393['$1']);return _0x2ded99[_0x1c1ac2(0x1b8)][_0x1c1ac2(0x18f)];}}const _0x429447=_0x355499[_0x1c1ac2(0x2d1)];if(_0x429447[_0x1c1ac2(0x134)](/\[Version[ ](.*?)\]/i)){const _0x2c9821=Number(RegExp['$1']);if(_0x2c9821!==VisuMZ[label][_0x1c1ac2(0x24b)]){if('BDQgY'!==_0x1c1ac2(0x2ba))return _0x432133[_0x1c1ac2(0x188)]&&_0xd6b0ec[_0x1c1ac2(0x2d1)][_0x1c1ac2(0x21d)]('['+_0x4ed34c+']');else alert(_0x1c1ac2(0x15c)[_0x1c1ac2(0x258)](_0x4bb432,_0x2c9821)),SceneManager[_0x1c1ac2(0x2b7)]();}}if(_0x429447[_0x1c1ac2(0x134)](/\[Tier[ ](\d+)\]/i)){const _0x15c986=Number(RegExp['$1']);_0x15c986<tier?(alert(_0x1c1ac2(0x127)['format'](_0x4bb432,_0x15c986,tier)),SceneManager['exit']()):tier=Math['max'](_0x15c986,tier);}VisuMZ[_0x1c1ac2(0x310)](VisuMZ[label][_0x1c1ac2(0x1b8)],_0x355499[_0x1c1ac2(0x1b1)]);})(pluginData),PluginManager[_0x117212(0x19b)](pluginData[_0x117212(0x2c2)],_0x117212(0x260),_0x43536e=>{const _0x2c1201=_0x117212;VisuMZ[_0x2c1201(0x310)](_0x43536e,_0x43536e);const _0x56afd1=_0x43536e['Actors'],_0x45462d=_0x43536e[_0x2c1201(0x2f7)];for(const _0x183293 of _0x56afd1){const _0x227b24=$gameActors['actor'](_0x183293);if(!_0x227b24)continue;_0x227b24[_0x2c1201(0x1e7)]=_0x2c1201(0x1b9),_0x227b24[_0x2c1201(0x22c)]=_0x45462d;}}),PluginManager[_0x117212(0x19b)](pluginData[_0x117212(0x2c2)],_0x117212(0x31e),_0x60813b=>{const _0x55f63d=_0x117212;VisuMZ['ConvertParams'](_0x60813b,_0x60813b);const _0x129cef=_0x60813b['Actors'],_0x118217=_0x60813b[_0x55f63d(0x270)],_0x4d58b0=_0x60813b[_0x55f63d(0x2a3)];for(const _0x404d16 of _0x129cef){if(_0x55f63d(0x2f1)===_0x55f63d(0x1f4))this[_0x55f63d(0x1a5)]();else{const _0x3a2bf2=$gameActors[_0x55f63d(0x121)](_0x404d16);if(!_0x3a2bf2)continue;_0x3a2bf2[_0x55f63d(0x1e7)]=_0x55f63d(0x1a0),_0x3a2bf2[_0x55f63d(0x255)]=_0x118217,_0x3a2bf2[_0x55f63d(0x2e7)]=_0x4d58b0;}}}),PluginManager[_0x117212(0x19b)](pluginData[_0x117212(0x2c2)],_0x117212(0x120),_0x5519c5=>{const _0x1a9fab=_0x117212;VisuMZ[_0x1a9fab(0x310)](_0x5519c5,_0x5519c5);const _0x2f1a02=_0x5519c5[_0x1a9fab(0x126)];for(const _0x261577 of _0x2f1a02){if(_0x1a9fab(0x18c)!==_0x1a9fab(0x18c))this[_0x1a9fab(0x189)]=_0x1a9fab(0x14a);else{const _0x4cc740=$gameActors[_0x1a9fab(0x121)](_0x261577);if(!_0x4cc740)continue;_0x4cc740[_0x1a9fab(0x261)]();}}}),PluginManager[_0x117212(0x19b)](pluginData[_0x117212(0x2c2)],_0x117212(0x186),_0x46a7b3=>{const _0x24201c=_0x117212;VisuMZ[_0x24201c(0x310)](_0x46a7b3,_0x46a7b3);const _0xc51bb4=_0x46a7b3[_0x24201c(0x17b)],_0x17c1d8=_0x46a7b3[_0x24201c(0x2f7)];for(const _0x262681 of _0xc51bb4){const _0x5c3c26=$gameTroop[_0x24201c(0x1c7)]()[_0x262681];if(!_0x5c3c26)continue;_0x5c3c26[_0x24201c(0x1e7)]=_0x24201c(0x1b9),_0x5c3c26[_0x24201c(0x22c)]=_0x17c1d8;}}),PluginManager[_0x117212(0x19b)](pluginData['name'],_0x117212(0x2fe),_0x4db0b1=>{const _0x53cfb9=_0x117212;VisuMZ[_0x53cfb9(0x310)](_0x4db0b1,_0x4db0b1);const _0x2f5b02=_0x4db0b1[_0x53cfb9(0x17b)],_0x116a2d=_0x4db0b1[_0x53cfb9(0x270)],_0x5b3c08=_0x4db0b1[_0x53cfb9(0x2a3)];for(const _0x295a4d of _0x2f5b02){if(_0x53cfb9(0x142)!==_0x53cfb9(0x142))return this[_0x53cfb9(0x189)]===_0x53cfb9(0x14f)&&this[_0x53cfb9(0x2aa)]()&&this[_0x53cfb9(0x2aa)]()['item']()&&this[_0x53cfb9(0x2aa)]()[_0x53cfb9(0x11e)]()['speed']<0x0;else{const _0x896330=$gameTroop[_0x53cfb9(0x1c7)]()[_0x295a4d];if(!_0x896330)continue;_0x896330[_0x53cfb9(0x1e7)]=_0x53cfb9(0x1a0),_0x896330['_ctbTurnOrderFaceName']=_0x116a2d,_0x896330[_0x53cfb9(0x2e7)]=_0x5b3c08;}}}),PluginManager[_0x117212(0x19b)](pluginData[_0x117212(0x2c2)],'CtbTurnOrderClearEnemyGraphic',_0x11db4a=>{const _0x5268f7=_0x117212;VisuMZ['ConvertParams'](_0x11db4a,_0x11db4a);const _0x2d2245=_0x11db4a[_0x5268f7(0x17b)];for(const _0x141840 of _0x2d2245){const _0x583763=$gameTroop[_0x5268f7(0x1c7)]()[_0x141840];if(!_0x583763)continue;_0x583763[_0x5268f7(0x261)]();}}),PluginManager[_0x117212(0x19b)](pluginData[_0x117212(0x2c2)],_0x117212(0x13d),_0x17fa15=>{const _0x9fca9a=_0x117212;VisuMZ['ConvertParams'](_0x17fa15,_0x17fa15);const _0x4a0d38=_0x17fa15[_0x9fca9a(0x239)];$gameSystem['setBattleSystemCTBTurnOrderVisible'](_0x4a0d38);}),VisuMZ[_0x117212(0x20d)][_0x117212(0x317)]=Scene_Boot['prototype'][_0x117212(0x1d8)],Scene_Boot[_0x117212(0x2f3)]['onDatabaseLoaded']=function(){const _0x5671e2=_0x117212;this['process_VisuMZ_BattleSystemCTB_CreateRegExp'](),VisuMZ[_0x5671e2(0x20d)][_0x5671e2(0x317)][_0x5671e2(0x225)](this),this[_0x5671e2(0x2de)]();},VisuMZ[_0x117212(0x20d)][_0x117212(0x19a)]={},Scene_Boot[_0x117212(0x2f3)][_0x117212(0x2e0)]=function(){const _0x59b069=_0x117212,_0x35946a=VisuMZ[_0x59b069(0x20d)]['RegExp'],_0x5ec702='<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>',_0x25c2b2=[_0x59b069(0x171),_0x59b069(0x278),_0x59b069(0x27a)];for(const _0xccaf2a of _0x25c2b2){const _0x81961=_0x5ec702['format'](_0xccaf2a[_0x59b069(0x2a4)]()['trim'](),'(?:CTB)',_0x59b069(0x16c)),_0x26917d=new RegExp(_0x81961,'i');VisuMZ[_0x59b069(0x20d)]['RegExp'][_0xccaf2a]=_0x26917d;}VisuMZ['BattleSystemCTB'][_0x59b069(0x19a)][_0x59b069(0x1c5)]=/<JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>\s*([\s\S]*)\s*<\/JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>/i;},Scene_Boot['prototype'][_0x117212(0x2de)]=function(){const _0x4b73cc=_0x117212;if(VisuMZ[_0x4b73cc(0x141)])return;const _0x2ffbec=$dataSkills[_0x4b73cc(0x236)]($dataItems);for(const _0xe3b7a7 of _0x2ffbec){if(!_0xe3b7a7)continue;VisuMZ['BattleSystemCTB']['Parse_Notetags_CreateJS'](_0xe3b7a7);}},VisuMZ['BattleSystemCTB'][_0x117212(0x2cd)]=VisuMZ[_0x117212(0x2cd)],VisuMZ[_0x117212(0x2cd)]=function(_0x42a458){const _0x25a715=_0x117212;VisuMZ['BattleSystemCTB'][_0x25a715(0x2cd)]['call'](this,_0x42a458),VisuMZ[_0x25a715(0x20d)][_0x25a715(0x2e5)](_0x42a458);},VisuMZ[_0x117212(0x20d)][_0x117212(0x234)]=VisuMZ[_0x117212(0x234)],VisuMZ['ParseItemNotetags']=function(_0xb6c4c){const _0x30a1d6=_0x117212;VisuMZ['BattleSystemCTB'][_0x30a1d6(0x234)]['call'](this,_0xb6c4c),VisuMZ['BattleSystemCTB'][_0x30a1d6(0x2e5)](_0xb6c4c);},VisuMZ[_0x117212(0x20d)]['Parse_Notetags_CreateJS']=function(_0x54da05){const _0xf714a=_0x117212,_0xdcc4a2=[_0xf714a(0x171),_0xf714a(0x278),_0xf714a(0x27a)];for(const _0x570902 of _0xdcc4a2){if(_0xf714a(0x2e3)===_0xf714a(0x2e3))VisuMZ[_0xf714a(0x20d)]['createRateJS'](_0x54da05,_0x570902);else return _0xd49175[_0xf714a(0x2b9)]()-_0x5b8f74[_0xf714a(0x2b9)]();}VisuMZ[_0xf714a(0x20d)][_0xf714a(0x180)](_0x54da05,_0xf714a(0x250));},VisuMZ[_0x117212(0x20d)]['JS']={},VisuMZ['BattleSystemCTB'][_0x117212(0x182)]=function(_0x15de9c,_0x2536af){const _0xaa5e86=_0x117212,_0x2e9ab8=_0x15de9c[_0xaa5e86(0x1f8)];if(_0x2e9ab8['match'](VisuMZ[_0xaa5e86(0x20d)][_0xaa5e86(0x19a)][_0x2536af])){const _0x23da4b=String(RegExp['$1']),_0x421d71='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0xaa5e86(0x258)](_0x23da4b,_0x2536af),_0x216537=VisuMZ[_0xaa5e86(0x20d)][_0xaa5e86(0x2cc)](_0x15de9c,_0x2536af);VisuMZ[_0xaa5e86(0x20d)]['JS'][_0x216537]=new Function(_0x421d71);}},VisuMZ[_0x117212(0x20d)][_0x117212(0x180)]=function(_0x2b8427,_0x40eb86){const _0x411188=_0x117212,_0x5a1b0c=_0x2b8427[_0x411188(0x1f8)];if(_0x5a1b0c[_0x411188(0x134)](VisuMZ[_0x411188(0x20d)][_0x411188(0x19a)][_0x411188(0x1c5)])){if(_0x411188(0x1bf)==='wcAbV')_0x395626[_0x411188(0x20d)][_0x411188(0x33a)][_0x411188(0x225)](this);else{const _0xe5309e=String(RegExp['$1']),_0x211927=_0x411188(0x285)[_0x411188(0x258)](_0xe5309e,_0x40eb86),_0x1ed5ac=VisuMZ[_0x411188(0x20d)][_0x411188(0x2cc)](_0x2b8427,_0x40eb86);VisuMZ[_0x411188(0x20d)]['JS'][_0x1ed5ac]=new Function(_0x211927);}}},VisuMZ[_0x117212(0x20d)][_0x117212(0x2cc)]=function(_0x23c490,_0x694f51){const _0x342e53=_0x117212;if(VisuMZ[_0x342e53(0x2cc)])return VisuMZ['createKeyJS'](_0x23c490,_0x694f51);let _0x45bb47='';if($dataActors[_0x342e53(0x21d)](_0x23c490))_0x45bb47=_0x342e53(0x245)[_0x342e53(0x258)](_0x23c490['id'],_0x694f51);if($dataClasses[_0x342e53(0x21d)](_0x23c490))_0x45bb47=_0x342e53(0x301)[_0x342e53(0x258)](_0x23c490['id'],_0x694f51);if($dataSkills[_0x342e53(0x21d)](_0x23c490))_0x45bb47='Skill-%1-%2'[_0x342e53(0x258)](_0x23c490['id'],_0x694f51);if($dataItems[_0x342e53(0x21d)](_0x23c490))_0x45bb47=_0x342e53(0x12a)['format'](_0x23c490['id'],_0x694f51);if($dataWeapons[_0x342e53(0x21d)](_0x23c490))_0x45bb47=_0x342e53(0x312)[_0x342e53(0x258)](_0x23c490['id'],_0x694f51);if($dataArmors[_0x342e53(0x21d)](_0x23c490))_0x45bb47=_0x342e53(0x2ed)['format'](_0x23c490['id'],_0x694f51);if($dataEnemies[_0x342e53(0x21d)](_0x23c490))_0x45bb47='Enemy-%1-%2'[_0x342e53(0x258)](_0x23c490['id'],_0x694f51);if($dataStates['includes'](_0x23c490))_0x45bb47=_0x342e53(0x145)[_0x342e53(0x258)](_0x23c490['id'],_0x694f51);return _0x45bb47;},ImageManager[_0x117212(0x29a)]=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x117212(0x135)]=ImageManager[_0x117212(0x135)]||0x6,VisuMZ[_0x117212(0x20d)][_0x117212(0x15e)]=BattleManager[_0x117212(0x2dc)],BattleManager[_0x117212(0x2dc)]=function(){const _0x35b928=_0x117212;if(this[_0x35b928(0x18e)]())return _0x35b928(0x28d);return VisuMZ[_0x35b928(0x20d)][_0x35b928(0x15e)][_0x35b928(0x225)](this);},BattleManager[_0x117212(0x18e)]=function(){const _0x40a88e=_0x117212;return $gameSystem[_0x40a88e(0x332)]()===_0x40a88e(0x28d);},VisuMZ['BattleSystemCTB'][_0x117212(0x1b6)]=BattleManager['isTpb'],BattleManager[_0x117212(0x224)]=function(){const _0x34826b=_0x117212;if(this[_0x34826b(0x18e)]())return!![];return VisuMZ[_0x34826b(0x20d)][_0x34826b(0x1b6)][_0x34826b(0x225)](this);},VisuMZ[_0x117212(0x20d)][_0x117212(0x17e)]=BattleManager[_0x117212(0x31c)],BattleManager['isActiveTpb']=function(){const _0x399cf9=_0x117212;if(this[_0x399cf9(0x18e)]())return![];return VisuMZ[_0x399cf9(0x20d)][_0x399cf9(0x17e)][_0x399cf9(0x225)](this);},VisuMZ[_0x117212(0x20d)][_0x117212(0x2af)]=BattleManager['updateTurn'],BattleManager[_0x117212(0x323)]=function(_0x3d1017){const _0x788d22=_0x117212;this['isCTB']()?this['updateTurnCTB'](_0x3d1017):VisuMZ[_0x788d22(0x20d)][_0x788d22(0x2af)][_0x788d22(0x225)](this,_0x3d1017);},BattleManager['updateTurnCTB']=function(_0x16abf5){const _0x3b295f=_0x117212;return VisuMZ[_0x3b295f(0x20d)]['BattleManager_updateTurn'][_0x3b295f(0x225)](this,_0x16abf5);},VisuMZ[_0x117212(0x20d)][_0x117212(0x22d)]=BattleManager[_0x117212(0x267)],BattleManager[_0x117212(0x267)]=function(){const _0x58244d=_0x117212;this[_0x58244d(0x18e)]()?_0x58244d(0x17d)!=='xAXlQ'?this[_0x58244d(0x1a5)]():_0x3736c0[_0x58244d(0x18e)]()?this['applyCTBPenalty']():_0x4ad1a0['BattleSystemCTB'][_0x58244d(0x33a)]['call'](this):VisuMZ[_0x58244d(0x20d)][_0x58244d(0x22d)][_0x58244d(0x225)](this);},BattleManager[_0x117212(0x1a5)]=function(){const _0x339ae9=_0x117212,_0x388a67=this[_0x339ae9(0x125)],_0x24254c=_0x388a67[_0x339ae9(0x2aa)]();_0x24254c?(_0x24254c['prepare'](),_0x24254c[_0x339ae9(0x268)]()&&this[_0x339ae9(0x22a)](),_0x388a67[_0x339ae9(0x33b)]()):(_0x388a67[_0x339ae9(0x2fb)](0x0),this[_0x339ae9(0x170)](),this[_0x339ae9(0x125)]=null);},BattleManager[_0x117212(0x19d)]=function(){const _0x3e6c01=_0x117212;if(this[_0x3e6c01(0x125)])return!![];if(this[_0x3e6c01(0x1b7)]!=='turn')return!![];if(this[_0x3e6c01(0x2ca)])return![];const _0x474dbc=this[_0x3e6c01(0x2d0)]()[_0x3e6c01(0x129)](_0x544b09=>_0x544b09&&_0x544b09['isAppeared']());return _0x474dbc[_0x3e6c01(0x1a9)](_0x325c0b=>_0x325c0b[_0x3e6c01(0x241)]());},Game_Battler[_0x117212(0x2f3)][_0x117212(0x241)]=function(){const _0x330ea4=_0x117212;if(this['isTpbCharged']())return!![];if(this['isTpbReady']())return!![];if(this[_0x330ea4(0x16a)]())return!![];return![];},BattleManager[_0x117212(0x331)]=function(){const _0x2abc71=_0x117212;let _0x471865=VisuMZ[_0x2abc71(0x20d)][_0x2abc71(0x1b8)][_0x2abc71(0x2da)][_0x2abc71(0x324)]?0x1e:0xa;if(this[_0x2abc71(0x19d)]()&&this[_0x2abc71(0x276)]()){if(_0x2abc71(0x2d2)==='xeNeg'){const _0x31d485=_0x2b0db6[_0x2abc71(0x1b8)];return this['isHorz']()?_0x31d485[_0x2abc71(0x2b5)]:_0x31d485['SpriteThin'];}else this[_0x2abc71(0x27f)]=this[_0x2abc71(0x27f)]||0x0,this[_0x2abc71(0x27f)]++,this[_0x2abc71(0x27f)]>=_0x471865&&this[_0x2abc71(0x124)]();}else this['_anti_CTB_SoftlockCount']=0x0;},BattleManager[_0x117212(0x276)]=function(){const _0x3cd8a2=_0x117212;if(this[_0x3cd8a2(0x125)])return![];if(this[_0x3cd8a2(0x1b7)]!==_0x3cd8a2(0x17f))return![];if(this[_0x3cd8a2(0x32c)]())return![];return!![];},BattleManager['processCtbAntiSoftlock']=function(){const _0x416d6d=_0x117212;$gameTemp[_0x416d6d(0x309)]()&&this[_0x416d6d(0x27f)]>=0x14&&(_0x416d6d(0x2a2)!==_0x416d6d(0x2a2)?this['onTpbCharged']():console['log'](_0x416d6d(0x2ee),this[_0x416d6d(0x27f)]));this[_0x416d6d(0x125)]=null,this[_0x416d6d(0x1b7)]=_0x416d6d(0x17f),this[_0x416d6d(0x187)]=![],this[_0x416d6d(0x2cf)]=!![];for(const _0xba13cf of this[_0x416d6d(0x2d0)]()){if(!_0xba13cf)continue;if(_0xba13cf[_0x416d6d(0x2bf)]()){_0xba13cf[_0x416d6d(0x2d5)](_0x416d6d(0x2b6)),_0xba13cf['_tpbState']=_0x416d6d(0x240);const _0x18253e=_0xba13cf[_0x416d6d(0x1a3)],_0x377e6e=_0xba13cf[_0x416d6d(0x308)]||0x0;_0xba13cf[_0x416d6d(0x23b)](![]),_0xba13cf['_tpbTurnCount']=_0x18253e,_0xba13cf[_0x416d6d(0x308)]=Math[_0x416d6d(0x2b8)](_0x377e6e,0.99),_0xba13cf[_0x416d6d(0x29f)]();}}this['_anti_CTB_SoftlockCount']===0xb4&&($gameParty[_0x416d6d(0x328)](),$gameParty[_0x416d6d(0x328)][_0x416d6d(0x225)]($gameTroop));if(this['_anti_CTB_SoftlockCount']===0x12c)for(const _0x1764fe of this[_0x416d6d(0x2d0)]()){if(!_0x1764fe)continue;if(_0x1764fe['isDead']())continue;_0x1764fe[_0x416d6d(0x15d)]();}this[_0x416d6d(0x27f)]>=0x258&&(BattleManager['processAbort'](),$gameTemp[_0x416d6d(0x309)]()&&console['log']('Aborting\x20Battle.\x20Softlock\x20cannot\x20be\x20fixed.'));},VisuMZ[_0x117212(0x20d)][_0x117212(0x30a)]=BattleManager[_0x117212(0x27b)],BattleManager['updateAllTpbBattlers']=function(){const _0x339b75=_0x117212;if(this[_0x339b75(0x18e)]()){if(_0x339b75(0x176)!=='SSJaH')return this['processUpdateGraphic']();else this[_0x339b75(0x2ef)]();}else{if(_0x339b75(0x228)!==_0x339b75(0x24e))VisuMZ[_0x339b75(0x20d)][_0x339b75(0x30a)][_0x339b75(0x225)](this);else{if(!this['isCTB']())return;const _0x1fb19d=_0x21ddd5[_0x339b75(0x177)][_0x339b75(0x1fd)];if(!_0x1fb19d)return;_0x1fb19d[_0x339b75(0x20e)](_0x18c872);}}},BattleManager[_0x117212(0x2ef)]=function(){const _0x3498ac=_0x117212,_0x218b3d=this['allBattleMembers']();_0x218b3d[_0x3498ac(0x132)]((_0x555515,_0xab2145)=>{const _0x1cbad6=_0x3498ac;return _0x555515[_0x1cbad6(0x1c9)](0x1)-_0xab2145[_0x1cbad6(0x1c9)](0x1);});for(const _0x19a098 of _0x218b3d){'xvBXY'!==_0x3498ac(0x279)?(_0x139e9e[_0x3498ac(0x2c7)]=_0x3fc068[_0x3498ac(0x16d)]((_0x215764['width']-_0x4bd7bb[_0x3498ac(0x2b8)](_0x2fa50b[_0x3498ac(0x12d)],_0x477b37[_0x3498ac(0x2df)]))/0x2),_0x2b66d8[_0x3498ac(0x247)]=_0x5ebe19['round']((_0x4f57e2['height']-_0x1b1f9f[_0x3498ac(0x2b8)](_0x5b9fd3[_0x3498ac(0x2a5)],_0x64e13a['height']))/0x2)):this['updateTpbBattler'](_0x19a098);}},VisuMZ[_0x117212(0x20d)][_0x117212(0x24c)]=BattleManager[_0x117212(0x1d1)],BattleManager[_0x117212(0x1d1)]=function(){const _0x11a643=_0x117212;VisuMZ[_0x11a643(0x20d)][_0x11a643(0x24c)][_0x11a643(0x225)](this),this[_0x11a643(0x2b4)](!![]);},VisuMZ[_0x117212(0x20d)][_0x117212(0x2eb)]=BattleManager[_0x117212(0x170)],BattleManager[_0x117212(0x170)]=function(){const _0x354643=_0x117212;this[_0x354643(0x2f8)](),VisuMZ[_0x354643(0x20d)][_0x354643(0x2eb)][_0x354643(0x225)](this),this[_0x354643(0x21b)]();},BattleManager[_0x117212(0x2f8)]=function(){const _0x3623ae=_0x117212;if(!this[_0x3623ae(0x18e)]())return;this[_0x3623ae(0x125)]&&this['_subject']['numActions']()<=0x0&&(this[_0x3623ae(0x264)](),this[_0x3623ae(0x125)][_0x3623ae(0x2d5)](_0x3623ae(0x2b6)));},BattleManager[_0x117212(0x21b)]=function(){const _0x99abb3=_0x117212;if(!this[_0x99abb3(0x18e)]())return;if(this[_0x99abb3(0x125)]&&$gameTemp[_0x99abb3(0x1f1)]()){if(_0x99abb3(0x326)!=='PMVtK'){if(!this['isCTB']())return;const _0x34254e=_0x5de0d5[_0x99abb3(0x177)][_0x99abb3(0x1fd)];if(!_0x34254e)return;_0x34254e[_0x99abb3(0x229)](this[_0x99abb3(0x125)]);}else{this[_0x99abb3(0x125)][_0x99abb3(0x189)]=_0x99abb3(0x14a),this[_0x99abb3(0x125)][_0x99abb3(0x319)]=_0x99abb3(0x21c);return;}}this[_0x99abb3(0x2b4)](),this[_0x99abb3(0x125)]&&this[_0x99abb3(0x267)]();},VisuMZ['BattleSystemCTB'][_0x117212(0x185)]=BattleManager[_0x117212(0x2e2)],BattleManager[_0x117212(0x2e2)]=function(){const _0x4c9c21=_0x117212;this[_0x4c9c21(0x2b4)](),VisuMZ[_0x4c9c21(0x20d)][_0x4c9c21(0x185)][_0x4c9c21(0x225)](this);},BattleManager[_0x117212(0x2b4)]=function(_0x48fdb5){const _0x54a9ec=_0x117212;if(!this['isCTB']())return;const _0x4aa574=SceneManager[_0x54a9ec(0x177)][_0x54a9ec(0x1fd)];if(!_0x4aa574)return;_0x4aa574[_0x54a9ec(0x20e)](_0x48fdb5);},BattleManager['rotateCTBSprites']=function(){const _0x634482=_0x117212;if(!this[_0x634482(0x18e)]())return;const _0x22fb1f=SceneManager[_0x634482(0x177)][_0x634482(0x1fd)];if(!_0x22fb1f)return;_0x22fb1f[_0x634482(0x229)](this[_0x634482(0x125)]);},BattleManager[_0x117212(0x311)]=function(){const _0x44b046=_0x117212,_0xe00299=this[_0x44b046(0x2d0)]()[_0x44b046(0x20c)](_0x45fc4b=>String([_0x45fc4b[_0x44b046(0x2c2)](),_0x44b046(0x24f)+_0x45fc4b[_0x44b046(0x1c9)](0x1)]));console['log'](_0xe00299);},VisuMZ[_0x117212(0x20d)][_0x117212(0x1dc)]=Game_System[_0x117212(0x2f3)][_0x117212(0x1f9)],Game_System['prototype'][_0x117212(0x1f9)]=function(){const _0x5cf03c=_0x117212;VisuMZ[_0x5cf03c(0x20d)][_0x5cf03c(0x1dc)]['call'](this),this[_0x5cf03c(0x302)]();},Game_System[_0x117212(0x2f3)][_0x117212(0x302)]=function(){const _0x303e9e=_0x117212;this[_0x303e9e(0x1dd)]=!![];},Game_System[_0x117212(0x2f3)][_0x117212(0x1d7)]=function(){const _0x1d5e76=_0x117212;if(this[_0x1d5e76(0x1dd)]===undefined){if(_0x1d5e76(0x19e)!==_0x1d5e76(0x19e)){const _0x36a9b6=_0x475a3c[_0x1d5e76(0x258)](_0x216fc7['toUpperCase']()[_0x1d5e76(0x2c8)](),'(?:CTB)',_0x1d5e76(0x16c)),_0x246b2b=new _0x586242(_0x36a9b6,'i');_0x2aea5c[_0x1d5e76(0x20d)][_0x1d5e76(0x19a)][_0x5db885]=_0x246b2b;}else this['initBattleSystemCTB']();}return this[_0x1d5e76(0x1dd)];},Game_System['prototype'][_0x117212(0x32a)]=function(_0x24bdc6){const _0x7848c=_0x117212;this[_0x7848c(0x1dd)]===undefined&&this[_0x7848c(0x302)](),this[_0x7848c(0x1dd)]=_0x24bdc6;},VisuMZ[_0x117212(0x20d)][_0x117212(0x181)]=Game_Action['prototype'][_0x117212(0x296)],Game_Action[_0x117212(0x2f3)][_0x117212(0x296)]=function(_0x448a06){const _0x488e2b=_0x117212;VisuMZ[_0x488e2b(0x20d)]['Game_Action_applyItemUserEffect']['call'](this,_0x448a06),this['applyBattleSystemCTBUserEffect'](_0x448a06);},Game_Action[_0x117212(0x2f3)]['applyBattleSystemCTBUserEffect']=function(_0xd2d17){const _0x55c9d0=_0x117212;if(!SceneManager['isSceneBattle']())return;if(!BattleManager[_0x55c9d0(0x18e)]())return;if(this[_0x55c9d0(0x11e)]())this[_0x55c9d0(0x173)](_0xd2d17);},Game_Action[_0x117212(0x2f3)][_0x117212(0x173)]=function(_0x592046){const _0x8a6f2=_0x117212,_0x456b4c=this[_0x8a6f2(0x11e)]()[_0x8a6f2(0x1f8)];if(_0x592046['isCtbChargingState']()){if(_0x8a6f2(0x212)==='QxKrE'){const _0x1bd600=VisuMZ['BattleSystemCTB'][_0x8a6f2(0x2cc)](this['item'](),'Charge');if(VisuMZ['BattleSystemCTB']['JS'][_0x1bd600]){if(_0x8a6f2(0x25a)!==_0x8a6f2(0x25a))this['padding']=0x0;else{const _0x566214=VisuMZ[_0x8a6f2(0x20d)]['JS'][_0x1bd600][_0x8a6f2(0x225)](this,this[_0x8a6f2(0x209)](),_0x592046);_0x592046['setCtbChargeTime'](_0x566214);}}_0x456b4c[_0x8a6f2(0x134)](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&('jrsln'!=='jrsln'?(_0xc5af67[_0x8a6f2(0x178)](),_0x4705bf[_0x8a6f2(0x268)]()&&this[_0x8a6f2(0x22a)](),_0x2a6e9e[_0x8a6f2(0x33b)]()):_0x592046[_0x8a6f2(0x24d)](Number(RegExp['$1'])*0.01));if(_0x456b4c[_0x8a6f2(0x134)](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)){if(_0x8a6f2(0x283)==='LAdRM')_0x592046[_0x8a6f2(0x1cd)](Number(RegExp['$1'])*0.01);else{if(this['_graphicSv']!==_0x3f12ee[_0x8a6f2(0x202)]())return this[_0x8a6f2(0x24a)]();}}}else{if(this['_subject'])return!![];if(this['_phase']!=='turn')return!![];if(this[_0x8a6f2(0x2ca)])return![];const _0x275f1e=this['allBattleMembers']()['filter'](_0x233530=>_0x233530&&_0x233530[_0x8a6f2(0x192)]());return _0x275f1e[_0x8a6f2(0x1a9)](_0x20df6d=>_0x20df6d[_0x8a6f2(0x241)]());}}else{if(_0x592046[_0x8a6f2(0x15f)]()){if(_0x8a6f2(0x1eb)===_0x8a6f2(0x334)){if(this[_0x8a6f2(0x336)]>0x0){const _0x49e886=this[_0x8a6f2(0x336)];this[_0x8a6f2(0x2b2)]=(this[_0x8a6f2(0x2b2)]*(_0x49e886-0x1)+this[_0x8a6f2(0x1a8)])/_0x49e886,this[_0x8a6f2(0x336)]--,this[_0x8a6f2(0x336)]<=0x0&&(this[_0x8a6f2(0x31f)](),this[_0x8a6f2(0x1c2)]=0x0,this[_0x8a6f2(0x2b1)](),this['opacity']=this['_fadeTarget']);}if(this[_0x8a6f2(0x2b0)])return;_0x4feadb['_phase']==='battleEnd'&&(this[_0x8a6f2(0x2b0)]=!![],this[_0x8a6f2(0x293)](0x0));}else{const _0x1bfcf4=VisuMZ['BattleSystemCTB'][_0x8a6f2(0x2cc)](this[_0x8a6f2(0x11e)](),_0x8a6f2(0x278));if(VisuMZ[_0x8a6f2(0x20d)]['JS'][_0x1bfcf4]){if(_0x8a6f2(0x25f)===_0x8a6f2(0x217))_0x52899b[_0x8a6f2(0x2fb)](0x0),this['endAction'](),this[_0x8a6f2(0x125)]=null;else{const _0x3ebd4b=VisuMZ[_0x8a6f2(0x20d)]['JS'][_0x1bfcf4]['call'](this,this[_0x8a6f2(0x209)](),_0x592046);_0x592046[_0x8a6f2(0x13e)](_0x3ebd4b);}}_0x456b4c['match'](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x592046[_0x8a6f2(0x13e)](Number(RegExp['$1'])*0.01);if(_0x456b4c[_0x8a6f2(0x134)](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)){if(_0x8a6f2(0x150)!=='kuaRx')_0x592046[_0x8a6f2(0x2c0)](Number(RegExp['$1'])*0.01);else{if(!_0x4c6d5c[_0x8a6f2(0x1b8)][_0x8a6f2(0x18d)])return;const _0x5a7856=_0x10c808[_0x8a6f2(0x1b8)],_0x4451cd=this[_0x8a6f2(0x12f)]===_0x5b2a73?_0x8a6f2(0x30f):_0x8a6f2(0x338),_0x47f765='%1SystemBorder'['format'](_0x4451cd),_0x34d27a=new _0x3429a0();_0x34d27a['anchor']['x']=this['anchor']['x'],_0x34d27a[_0x8a6f2(0x144)]['y']=this[_0x8a6f2(0x144)]['y'];if(_0x5a7856[_0x47f765])_0x34d27a[_0x8a6f2(0x2ff)]=_0x3781d9['loadSystem'](_0x5a7856[_0x47f765]);else{let _0x45fa82=this[_0x8a6f2(0x2c4)](),_0xd0abab=this[_0x8a6f2(0x1e2)](),_0x5350cd=_0x5a7856[_0x8a6f2(0x128)];_0x34d27a['bitmap']=new _0x28c4fb(_0x45fa82,_0xd0abab);const _0xd4cef4=_0x8a6f2(0x25e),_0x90cfc7=_0x243ab4['getColor'](_0x5a7856[_0x8a6f2(0x231)['format'](_0x4451cd)]);_0x34d27a['bitmap'][_0x8a6f2(0x297)](0x0,0x0,_0x45fa82,_0xd0abab,_0xd4cef4),_0x45fa82-=0x2,_0xd0abab-=0x2,_0x34d27a[_0x8a6f2(0x2ff)][_0x8a6f2(0x297)](0x1,0x1,_0x45fa82,_0xd0abab,_0x90cfc7),_0x45fa82-=_0x5350cd*0x2,_0xd0abab-=_0x5350cd*0x2,_0x34d27a[_0x8a6f2(0x2ff)][_0x8a6f2(0x297)](0x1+_0x5350cd,0x1+_0x5350cd,_0x45fa82,_0xd0abab,_0xd4cef4),_0x45fa82-=0x2,_0xd0abab-=0x2,_0x5350cd+=0x1,_0x34d27a[_0x8a6f2(0x2ff)]['clearRect'](0x1+_0x5350cd,0x1+_0x5350cd,_0x45fa82,_0xd0abab);}this[_0x8a6f2(0x325)]=_0x34d27a,this[_0x8a6f2(0x235)](this['_backgroundSprite']);}}}}}const _0x11bf0b=VisuMZ['BattleSystemCTB']['createKeyJS'](this['item'](),_0x8a6f2(0x250));if(VisuMZ['BattleSystemCTB']['JS'][_0x11bf0b]){if(_0x8a6f2(0x20b)===_0x8a6f2(0x20b)){const _0x14ce0d=VisuMZ[_0x8a6f2(0x20d)]['JS'][_0x11bf0b][_0x8a6f2(0x225)](this,this['subject'](),_0x592046);_0x592046[_0x8a6f2(0x130)](_0x14ce0d);}else{const _0x3053a9=this[_0x8a6f2(0x2d0)]()[_0x8a6f2(0x20c)](_0x3e80d7=>_0x3caca7([_0x3e80d7[_0x8a6f2(0x2c2)](),_0x8a6f2(0x24f)+_0x3e80d7[_0x8a6f2(0x1c9)](0x1)]));_0x57e4ce['log'](_0x3053a9);}}_0x456b4c[_0x8a6f2(0x134)](/<(?:CTB) (?:SET|MAKE|EXACT) ORDER:[ ](\d+)>/i)&&('JfLNt'!=='JfLNt'?_0x26c18a['changeTurnOrderByCTB'](_0x9b025d(_0x41dd56['$1'])):_0x592046[_0x8a6f2(0x130)](Number(RegExp['$1']))),_0x456b4c[_0x8a6f2(0x134)](/<(?:CTB) (?:CHANGE|DELAY|RUSH|SHIFT) ORDER:[ ]([\+\-]\d+)>/i)&&_0x592046['changeTurnOrderByCTB'](Number(RegExp['$1']));},VisuMZ[_0x117212(0x20d)][_0x117212(0x262)]=Game_Action[_0x117212(0x2f3)]['applyGlobal'],Game_Action[_0x117212(0x2f3)][_0x117212(0x2a8)]=function(){const _0x53c3e9=_0x117212;VisuMZ[_0x53c3e9(0x20d)][_0x53c3e9(0x262)][_0x53c3e9(0x225)](this),this[_0x53c3e9(0x1cb)]();},Game_Action[_0x117212(0x2f3)][_0x117212(0x1cb)]=function(){const _0x4c95bf=_0x117212;if(!this[_0x4c95bf(0x11e)]())return;if(!BattleManager['isCTB']())return;const _0x3925f0=this[_0x4c95bf(0x11e)]()[_0x4c95bf(0x1f8)];let _0x2344b2=0x0;this[_0x4c95bf(0x1ba)]&&(_0x2344b2=this[_0x4c95bf(0x209)]()[_0x4c95bf(0x308)]);const _0x286e93=VisuMZ[_0x4c95bf(0x20d)][_0x4c95bf(0x2cc)](this[_0x4c95bf(0x11e)](),_0x4c95bf(0x27a));VisuMZ[_0x4c95bf(0x20d)]['JS'][_0x286e93]&&('OvAvy'===_0x4c95bf(0x329)?_0x2344b2=VisuMZ[_0x4c95bf(0x20d)]['JS'][_0x286e93][_0x4c95bf(0x225)](this,this[_0x4c95bf(0x209)](),this[_0x4c95bf(0x209)]()):_0x2de415['BattleSystemCTB'][_0x4c95bf(0x182)](_0x2a0bb5,_0xaa4ef1));let _0x1bc3a0=this['item']()[_0x4c95bf(0x2c6)]>0x0?this[_0x4c95bf(0x11e)]()[_0x4c95bf(0x2c6)]:0x0;if(this['isAttack']())_0x1bc3a0+=this[_0x4c95bf(0x209)]()[_0x4c95bf(0x2c1)]();_0x2344b2+=(_0x1bc3a0/0xfa0)['clamp'](0x0,0x1);if(_0x3925f0[_0x4c95bf(0x134)](/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)){if(_0x4c95bf(0x2f4)===_0x4c95bf(0x28c))return this['processUpdateGraphic']();else _0x2344b2=Number(RegExp['$1'])*0.01;}const _0x587db2=this['subject']()[_0x4c95bf(0x208)]()[_0x4c95bf(0x236)](this['subject']()[_0x4c95bf(0x1a2)]()),_0x626a2f=/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x5e0f51=_0x587db2[_0x4c95bf(0x20c)](_0x267729=>_0x267729&&_0x267729[_0x4c95bf(0x1f8)][_0x4c95bf(0x134)](_0x626a2f)?Number(RegExp['$1'])*0.01:0x0);_0x2344b2=_0x5e0f51[_0x4c95bf(0x26b)]((_0xa76fba,_0x3b1f90)=>_0xa76fba+_0x3b1f90,_0x2344b2),this[_0x4c95bf(0x209)]()[_0x4c95bf(0x2fb)](_0x2344b2);},Game_BattlerBase[_0x117212(0x2f3)][_0x117212(0x24d)]=function(_0x42e3a2){const _0x346459=_0x117212;this[_0x346459(0x308)]=_0x42e3a2;},Game_BattlerBase[_0x117212(0x2f3)]['changeCtbChargeTime']=function(_0x455c01){const _0x6cb171=_0x117212;this['setCtbChargeTime'](this[_0x6cb171(0x308)]+_0x455c01);},Game_BattlerBase[_0x117212(0x2f3)]['setCtbCastTime']=function(_0x555467){const _0xfea255=_0x117212,_0x215b3c=this[_0xfea255(0x161)]();this[_0xfea255(0x249)]=_0x215b3c*_0x555467;},Game_BattlerBase[_0x117212(0x2f3)]['changeCtbCastTime']=function(_0x52e066){const _0x47486f=_0x117212,_0x3dc947=this[_0x47486f(0x161)](),_0x4d4b63=_0x3dc947*_0x52e066;this[_0x47486f(0x249)]=this[_0x47486f(0x249)]+_0x4d4b63;},VisuMZ['BattleSystemCTB']['Game_BattlerBase_appear']=Game_BattlerBase['prototype'][_0x117212(0x314)],Game_BattlerBase[_0x117212(0x2f3)][_0x117212(0x314)]=function(){const _0x2ef8ec=_0x117212;VisuMZ[_0x2ef8ec(0x20d)][_0x2ef8ec(0x220)][_0x2ef8ec(0x225)](this),BattleManager['updateTurnOrderCTB']();},VisuMZ[_0x117212(0x20d)][_0x117212(0x2cb)]=Game_BattlerBase[_0x117212(0x2f3)][_0x117212(0x1c4)],Game_BattlerBase[_0x117212(0x2f3)]['hide']=function(){const _0x1b94d9=_0x117212;VisuMZ['BattleSystemCTB'][_0x1b94d9(0x2cb)][_0x1b94d9(0x225)](this),BattleManager['updateTurnOrderCTB']();},Game_BattlerBase[_0x117212(0x2f3)]['clearTurnOrderCTBGraphics']=function(){const _0x4541ee=_0x117212;delete this[_0x4541ee(0x1e7)],delete this[_0x4541ee(0x255)],delete this[_0x4541ee(0x2e7)],delete this[_0x4541ee(0x22c)];},Game_BattlerBase[_0x117212(0x2f3)][_0x117212(0x269)]=function(){const _0x34f161=_0x117212;return this['_ctbTurnOrderGraphicType']===undefined&&(this[_0x34f161(0x1e7)]=this[_0x34f161(0x143)]()),this['_ctbTurnOrderGraphicType'];},Game_BattlerBase[_0x117212(0x2f3)][_0x117212(0x143)]=function(){const _0x139c1f=_0x117212;return Window_CTB_TurnOrder[_0x139c1f(0x1b8)][_0x139c1f(0x1c8)];},Game_BattlerBase[_0x117212(0x2f3)][_0x117212(0x1df)]=function(){const _0x11f8d7=_0x117212;return this[_0x11f8d7(0x255)]===undefined&&(this[_0x11f8d7(0x255)]=this[_0x11f8d7(0x322)]()),this['_ctbTurnOrderFaceName'];},Game_BattlerBase['prototype'][_0x117212(0x322)]=function(){const _0x54b52a=_0x117212;return Window_CTB_TurnOrder[_0x54b52a(0x1b8)][_0x54b52a(0x18f)];},Game_BattlerBase['prototype']['TurnOrderCTBGraphicFaceIndex']=function(){const _0xe894d3=_0x117212;return this[_0xe894d3(0x2e7)]===undefined&&(this['_ctbTurnOrderFaceIndex']=this[_0xe894d3(0x160)]()),this['_ctbTurnOrderFaceIndex'];},Game_BattlerBase[_0x117212(0x2f3)]['createTurnOrderCTBGraphicFaceIndex']=function(){const _0x3cfbbf=_0x117212;return Window_CTB_TurnOrder[_0x3cfbbf(0x1b8)]['EnemyBattlerFaceIndex'];},Game_BattlerBase[_0x117212(0x2f3)]['TurnOrderCTBGraphicIconIndex']=function(){const _0x2fcd1e=_0x117212;if(this['_ctbTurnOrderIconIndex']===undefined){if(_0x2fcd1e(0x273)===_0x2fcd1e(0x2bc)){this[_0x2fcd1e(0x125)][_0x2fcd1e(0x189)]='ready',this[_0x2fcd1e(0x125)][_0x2fcd1e(0x319)]=_0x2fcd1e(0x21c);return;}else this[_0x2fcd1e(0x22c)]=this['createTurnOrderCTBGraphicIconIndex']();}return this['_ctbTurnOrderIconIndex'];},Game_BattlerBase[_0x117212(0x2f3)][_0x117212(0x333)]=function(){const _0x5c1686=_0x117212;return Window_CTB_TurnOrder[_0x5c1686(0x1b8)]['EnemyBattlerIcon'];},Game_BattlerBase['prototype']['setCTBGraphicIconIndex']=function(_0x3e4705){const _0xdaf14d=_0x117212;this[_0xdaf14d(0x22c)]=_0x3e4705;},Game_BattlerBase[_0x117212(0x2f3)][_0x117212(0x1c9)]=function(_0x368609,_0x534328){const _0x37652f=_0x117212;if(this[_0x37652f(0x275)]())return Number[_0x37652f(0x257)];if(!this[_0x37652f(0x192)]())return Number[_0x37652f(0x257)];const _0x22f5ca=0x1;_0x368609*=_0x22f5ca;if(_0x368609===_0x22f5ca&&!_0x534328){if(_0x37652f(0x2fd)!=='SGkuc')return 0x0;else{if(this===BattleManager[_0x37652f(0x125)]){if(_0x37652f(0x1e9)!=='sYAmY')this[_0x37652f(0x22a)]();else return Number[_0x37652f(0x26c)]/0xa;}if(this===BattleManager['actor']()){if(_0x37652f(0x1ff)!==_0x37652f(0x1ff))_0x1b7dc2['setTurnOrderCTB'](_0xd028c7(_0x3ee4df['$1']));else return Number[_0x37652f(0x26c)]/0xa;}if(BattleManager[_0x37652f(0x1bb)]&&BattleManager[_0x37652f(0x1bb)]['includes'](this)){let _0x190da1=Number[_0x37652f(0x26c)]/0x1388;return _0x190da1+=BattleManager[_0x37652f(0x1bb)][_0x37652f(0x163)](this)*0x5,_0x190da1;}if(this[_0x37652f(0x189)]===_0x37652f(0x14f))return(this[_0x37652f(0x161)]()*_0x22f5ca-this[_0x37652f(0x249)])/this[_0x37652f(0x1c1)]();}}return _0x368609-=this[_0x37652f(0x233)]()*_0x22f5ca,_0x368609/=this[_0x37652f(0x1c1)]()*_0x22f5ca,_0x368609||0x0;},Game_BattlerBase[_0x117212(0x2f3)][_0x117212(0x1b5)]=function(){const _0x5b5ec7=_0x117212;return this[_0x5b5ec7(0x189)]==='casting'?(this[_0x5b5ec7(0x161)]()-this[_0x5b5ec7(0x249)])/this[_0x5b5ec7(0x1c1)]():0x0;},VisuMZ[_0x117212(0x20d)][_0x117212(0x28a)]=Game_Battler[_0x117212(0x2f3)]['initTpbChargeTime'],Game_Battler['prototype'][_0x117212(0x277)]=function(_0x5b29df){const _0x2db9d2=_0x117212;BattleManager[_0x2db9d2(0x18e)]()?this[_0x2db9d2(0x335)](_0x5b29df):_0x2db9d2(0x25d)===_0x2db9d2(0x2ab)?(_0x5a2a44['BattleSystemCTB'][_0x2db9d2(0x1dc)][_0x2db9d2(0x225)](this),this[_0x2db9d2(0x302)]()):VisuMZ[_0x2db9d2(0x20d)][_0x2db9d2(0x28a)][_0x2db9d2(0x225)](this,_0x5b29df);},Game_Battler['prototype'][_0x117212(0x335)]=function(_0x2b7f94){const _0x39307c=_0x117212,_0x3b0686=VisuMZ[_0x39307c(0x20d)][_0x39307c(0x1b8)][_0x39307c(0x2da)];let _0x5bb358=this[_0x39307c(0x29b)]()*eval(_0x3b0686[_0x39307c(0x205)]);const _0x44efe0=this['traitObjects']()[_0x39307c(0x236)](this[_0x39307c(0x1a2)]()),_0x4d4008=/<(?:CTB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x2472a0=_0x44efe0[_0x39307c(0x20c)](_0x587d89=>_0x587d89&&_0x587d89[_0x39307c(0x1f8)]['match'](_0x4d4008)?Number(RegExp['$1'])*0.01:0x0);_0x5bb358=_0x2472a0[_0x39307c(0x26b)]((_0x48bef8,_0x4ea60e)=>_0x48bef8+_0x4ea60e,_0x5bb358),this[_0x39307c(0x189)]=_0x39307c(0x240),this['_tpbChargeTime']=(_0x2b7f94?0x1:_0x5bb358)[_0x39307c(0x2d8)](0x0,0x1);if(this[_0x39307c(0x1db)]()){if(_0x39307c(0x27c)!==_0x39307c(0x27c)){const _0x3bdc2f=_0x1783b0['BattleSystemCTB']['JS'][_0x474958][_0x39307c(0x225)](this,this['subject'](),_0x2a8366);_0x453ae9[_0x39307c(0x13e)](_0x3bdc2f);}else this[_0x39307c(0x308)]=0x0;}},Game_Battler[_0x117212(0x2f3)]['isCtbChargingState']=function(){const _0xe8764c=_0x117212;return this[_0xe8764c(0x189)]==='charging';},Game_Battler[_0x117212(0x2f3)][_0x117212(0x15f)]=function(){const _0x44d533=_0x117212;return this[_0x44d533(0x189)]==='casting'&&this[_0x44d533(0x2aa)]()&&this[_0x44d533(0x2aa)]()[_0x44d533(0x11e)]()&&this[_0x44d533(0x2aa)]()[_0x44d533(0x11e)]()[_0x44d533(0x2c6)]<0x0;},Game_BattlerBase['prototype'][_0x117212(0x123)]=function(){const _0x4818d2=_0x117212;return this[_0x4818d2(0x15f)]()?this['_tpbCastTime']/this[_0x4818d2(0x161)]():0x0;},Game_Battler[_0x117212(0x2f3)][_0x117212(0x211)]=function(){const _0x4263db=_0x117212;return!this[_0x4263db(0x2a0)]();},Game_Battler[_0x117212(0x2f3)][_0x117212(0x2fb)]=function(_0x32bfb3){const _0x4e14b1=_0x117212;this[_0x4e14b1(0x1f6)]=_0x32bfb3;},VisuMZ[_0x117212(0x20d)][_0x117212(0x28b)]=Game_Battler[_0x117212(0x2f3)][_0x117212(0x23c)],Game_Battler[_0x117212(0x2f3)][_0x117212(0x23c)]=function(){const _0x44d28d=_0x117212;if(BattleManager['isCTB']()){if(_0x44d28d(0x237)!==_0x44d28d(0x237))return _0x226284[_0x44d28d(0x20d)]['Settings'][_0x44d28d(0x2da)][_0x44d28d(0x169)][_0x44d28d(0x225)](this,this);else this[_0x44d28d(0x1ac)]();}else VisuMZ[_0x44d28d(0x20d)]['Game_Battler_updateTpbIdleTime'][_0x44d28d(0x225)](this);},Game_Battler[_0x117212(0x2f3)][_0x117212(0x1ac)]=function(){const _0x3724a4=_0x117212;!this[_0x3724a4(0x2a0)]()&&(_0x3724a4(0x27d)!==_0x3724a4(0x1ef)?this['_tpbIdleTime']+=this[_0x3724a4(0x1c1)]():(this['initMembers'](_0x1a2bff,_0x1714c4,_0x534148),_0x2113c1[_0x3724a4(0x2f3)][_0x3724a4(0x1f9)]['call'](this),this[_0x3724a4(0x136)]()));},VisuMZ[_0x117212(0x20d)][_0x117212(0x298)]=Game_Battler[_0x117212(0x2f3)][_0x117212(0x2ac)],Game_Battler[_0x117212(0x2f3)][_0x117212(0x2ac)]=function(){const _0x5e3442=_0x117212;this['_onRestrictBypassCtbReset']=BattleManager[_0x5e3442(0x18e)](),VisuMZ['BattleSystemCTB'][_0x5e3442(0x298)]['call'](this),this['_onRestrictBypassCtbReset']=undefined;},VisuMZ[_0x117212(0x20d)][_0x117212(0x203)]=Game_Battler[_0x117212(0x2f3)][_0x117212(0x1bc)],Game_Battler['prototype'][_0x117212(0x1bc)]=function(){const _0x2be1af=_0x117212;if(BattleManager[_0x2be1af(0x18e)]()){if('kBrfu'===_0x2be1af(0x1aa)){this[_0x2be1af(0x2ff)]=new _0x368009(0x48,0x24);const _0x5c37a8=this[_0x2be1af(0x21a)]()?this['battler']()[_0x2be1af(0x2c2)]():_0x2be1af(0x168)[_0x2be1af(0x258)](this['_unit'],this['_index'],this[_0x2be1af(0x2a6)]);this[_0x2be1af(0x2ff)][_0x2be1af(0x294)](_0x5c37a8,0x0,0x0,0x48,0x24,_0x2be1af(0x288));}else this[_0x2be1af(0x304)]();}else{if(_0x2be1af(0x13f)===_0x2be1af(0x13f))VisuMZ['BattleSystemCTB'][_0x2be1af(0x203)][_0x2be1af(0x225)](this);else{const _0x2a0e18=_0x234dd4[_0x2be1af(0x20d)][_0x2be1af(0x1b8)][_0x2be1af(0x2da)];let _0x343fa0=this[_0x2be1af(0x29b)]()*_0x3b3343(_0x2a0e18[_0x2be1af(0x205)]);const _0xc85455=this['traitObjects']()[_0x2be1af(0x236)](this[_0x2be1af(0x1a2)]()),_0x49d176=/<(?:CTB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x425a12=_0xc85455[_0x2be1af(0x20c)](_0xd4ad40=>_0xd4ad40&&_0xd4ad40[_0x2be1af(0x1f8)][_0x2be1af(0x134)](_0x49d176)?_0x10e952(_0x517b67['$1'])*0.01:0x0);_0x343fa0=_0x425a12[_0x2be1af(0x26b)]((_0x5222e6,_0x1b99db)=>_0x5222e6+_0x1b99db,_0x343fa0),this[_0x2be1af(0x189)]=_0x2be1af(0x240),this[_0x2be1af(0x308)]=(_0x4da805?0x1:_0x343fa0)['clamp'](0x0,0x1),this['isRestricted']()&&(this['_tpbChargeTime']=0x0);}}},Game_Battler[_0x117212(0x2f3)]['clearTpbChargeTimeCTB']=function(){const _0x43456e=_0x117212;if(this[_0x43456e(0x194)])return;this[_0x43456e(0x189)]=_0x43456e(0x240),this[_0x43456e(0x308)]-=0x1,this[_0x43456e(0x308)]+=this[_0x43456e(0x1f6)]||0x0;},VisuMZ['BattleSystemCTB'][_0x117212(0x33a)]=Game_Battler['prototype'][_0x117212(0x140)],Game_Battler[_0x117212(0x2f3)]['applyTpbPenalty']=function(){const _0x911921=_0x117212;if(BattleManager[_0x911921(0x18e)]()){if(_0x911921(0x2fc)!==_0x911921(0x30c))this[_0x911921(0x232)]();else{if(!_0x12e8bf[_0x911921(0x18e)]())return;if(!_0x11d998['isSceneBattle']())return;if(this===_0xefe047[_0x911921(0x121)]())return;if(this===_0xd680e9['_subject'])return;const _0x47bc0b=this[_0x911921(0x30d)]();if(_0x47bc0b<0x0)return;this[_0x911921(0x130)](_0x47bc0b+_0x4a2c00);}}else VisuMZ[_0x911921(0x20d)][_0x911921(0x33a)][_0x911921(0x225)](this);},Game_Battler[_0x117212(0x2f3)]['applyCTBPenalty']=function(){const _0xa69164=_0x117212;this[_0xa69164(0x189)]=_0xa69164(0x240),this['_tpbChargeTime']+=VisuMZ[_0xa69164(0x20d)][_0xa69164(0x1b8)]['Mechanics'][_0xa69164(0x1d0)]||0x0;},VisuMZ[_0x117212(0x20d)][_0x117212(0x139)]=Game_Battler['prototype'][_0x117212(0x206)],Game_Battler[_0x117212(0x2f3)]['tpbSpeed']=function(){const _0x691e69=_0x117212;if(BattleManager['isCTB']()){if(_0x691e69(0x263)!==_0x691e69(0x1e0))return VisuMZ['BattleSystemCTB'][_0x691e69(0x1b8)][_0x691e69(0x2da)][_0x691e69(0x196)][_0x691e69(0x225)](this,this);else this[_0x691e69(0x124)]();}else return VisuMZ['BattleSystemCTB'][_0x691e69(0x139)]['call'](this);},VisuMZ[_0x117212(0x20d)]['Game_Battler_tpbBaseSpeed']=Game_Battler[_0x117212(0x2f3)]['tpbBaseSpeed'],Game_Battler[_0x117212(0x2f3)]['tpbBaseSpeed']=function(){const _0x41005a=_0x117212;return BattleManager['isCTB']()?VisuMZ[_0x41005a(0x20d)][_0x41005a(0x1b8)][_0x41005a(0x2da)][_0x41005a(0x169)][_0x41005a(0x225)](this,this):VisuMZ[_0x41005a(0x20d)][_0x41005a(0x26e)]['call'](this);},VisuMZ[_0x117212(0x20d)][_0x117212(0x1cf)]=Game_Battler['prototype'][_0x117212(0x29b)],Game_Battler['prototype']['tpbRelativeSpeed']=function(){const _0x1fb77d=_0x117212;if(BattleManager['isCTB']()){if(_0x1fb77d(0x174)==='DyBcq')return VisuMZ['BattleSystemCTB'][_0x1fb77d(0x1b8)][_0x1fb77d(0x2da)][_0x1fb77d(0x21e)][_0x1fb77d(0x225)](this,this);else this[_0x1fb77d(0x24d)](this['_tpbChargeTime']+_0x4a9927);}else{if(_0x1fb77d(0x31b)!==_0x1fb77d(0x183))return VisuMZ[_0x1fb77d(0x20d)][_0x1fb77d(0x1cf)][_0x1fb77d(0x225)](this);else _0x12158a[_0x1fb77d(0x18e)]()?this[_0x1fb77d(0x2d9)]():_0x25fe1a[_0x1fb77d(0x20d)][_0x1fb77d(0x32b)]['call'](this);}},VisuMZ[_0x117212(0x20d)][_0x117212(0x18a)]=Game_Battler['prototype'][_0x117212(0x1c1)],Game_Battler[_0x117212(0x2f3)]['tpbAcceleration']=function(){const _0x4b63a4=_0x117212;if(BattleManager[_0x4b63a4(0x18e)]()){let _0x387c5f=VisuMZ['BattleSystemCTB'][_0x4b63a4(0x1b8)][_0x4b63a4(0x2da)][_0x4b63a4(0x22f)]['call'](this,this);const _0x1adc5b=0x0;return _0x387c5f+_0x1adc5b;}else return VisuMZ[_0x4b63a4(0x20d)]['Game_Battler_tpbAcceleration'][_0x4b63a4(0x225)](this);},VisuMZ[_0x117212(0x20d)]['Game_Battler_tpbRequiredCastTime']=Game_Battler[_0x117212(0x2f3)][_0x117212(0x161)],Game_Battler[_0x117212(0x2f3)][_0x117212(0x161)]=function(){const _0x28893c=_0x117212;return BattleManager[_0x28893c(0x18e)]()?_0x28893c(0x17c)==='tgAEd'?_0x249688['BattleSystemCTB'][_0x28893c(0x1b8)][_0x28893c(0x2da)][_0x28893c(0x21e)][_0x28893c(0x225)](this,this):VisuMZ[_0x28893c(0x20d)]['Settings']['Mechanics']['TpbCastTimeJS'][_0x28893c(0x225)](this,this):VisuMZ[_0x28893c(0x20d)][_0x28893c(0x19f)][_0x28893c(0x225)](this);},Game_Battler['prototype'][_0x117212(0x30d)]=function(){const _0x52ddd9=_0x117212,_0x5acf26=SceneManager[_0x52ddd9(0x177)][_0x52ddd9(0x1fd)];if(!_0x5acf26)return-0x1;const _0x28ea43=_0x5acf26[_0x52ddd9(0x1bd)];if(!_0x28ea43)return-0x1;const _0x411589=_0x28ea43[_0x52ddd9(0x13a)](_0x2c65d5=>_0x2c65d5[_0x52ddd9(0x21a)]()===this);return _0x28ea43[_0x52ddd9(0x163)](_0x411589);},Game_Battler[_0x117212(0x2f3)][_0x117212(0x2dd)]=function(_0x290c5b){const _0x4a9ad2=_0x117212;if(!BattleManager[_0x4a9ad2(0x18e)]())return;if(!SceneManager['isSceneBattle']())return;if(this===BattleManager[_0x4a9ad2(0x121)]())return;if(this===BattleManager['_subject'])return;const _0x12a6cb=this[_0x4a9ad2(0x30d)]();if(_0x12a6cb<0x0)return;this[_0x4a9ad2(0x130)](_0x12a6cb+_0x290c5b);},Game_Battler[_0x117212(0x2f3)][_0x117212(0x130)]=function(_0x131529){const _0x4b2159=_0x117212;if(!BattleManager[_0x4b2159(0x18e)]())return;if(!SceneManager[_0x4b2159(0x2ad)]())return;if(this===BattleManager['actor']())return;if(this===BattleManager[_0x4b2159(0x125)])return;_0x131529=Math['max'](_0x131529,0x1),this['processTurnOrderChangeCTB'](_0x131529);},Game_Battler[_0x117212(0x2f3)][_0x117212(0x330)]=function(_0x536718){const _0x58cf24=_0x117212;if(!BattleManager['isCTB']())return;if(!SceneManager['isSceneBattle']())return;if(this===BattleManager['actor']())return;if(this===BattleManager[_0x58cf24(0x125)])return;const _0x431b5d=SceneManager[_0x58cf24(0x177)]['_ctbTurnOrderWindow'];if(!_0x431b5d)return;const _0x130f61=_0x431b5d['_turnOrderContainer'];if(!_0x130f61)return;const _0x3f410c=this[_0x58cf24(0x30d)]();if(_0x3f410c!==_0x536718){if('kkoFi'==='FVHPc')return _0x3742c6['BattleSystemCTB'][_0x58cf24(0x1b8)][_0x58cf24(0x2da)][_0x58cf24(0x196)][_0x58cf24(0x225)](this,this);else this[_0x58cf24(0x1ee)](_0x536718-_0x3f410c);}let _0x2d9ce7=_0x536718,_0x4e23a4=_0x536718;_0x3f410c>_0x536718?_0x2d9ce7-=0x1:_0x4e23a4+=0x1;const _0x4d43df=_0x130f61[_0x2d9ce7][_0x58cf24(0x2b9)](!![]),_0x522547=_0x130f61[_0x4e23a4][_0x58cf24(0x2b9)](!![]),_0x42b5a8=(_0x4d43df+_0x522547)/0x2;let _0x61a12a=_0x42b5a8*this[_0x58cf24(0x1c1)]();if(this[_0x58cf24(0x189)]==='charging')this['_tpbChargeTime']=0x1-_0x61a12a;else this[_0x58cf24(0x189)]==='casting'&&(this['_tpbCastTime']=this[_0x58cf24(0x161)]()-_0x61a12a);BattleManager['_actionBattlers']=[],BattleManager[_0x58cf24(0x2b4)]();},Game_Battler[_0x117212(0x2f3)][_0x117212(0x1ee)]=function(_0x3675d0){const _0x2c9c37=_0x117212,_0x3e3d0a=VisuMZ[_0x2c9c37(0x20d)][_0x2c9c37(0x1b8)][_0x2c9c37(0x148)],_0x2c492e=_0x3675d0>0x0?'Delay':'Rush';if(_0x3e3d0a[_0x2c9c37(0x1be)[_0x2c9c37(0x258)](_0x2c492e)]){if(_0x2c9c37(0x207)==='jmkCa'){const _0x15d016=_0x3e3d0a[_0x2c9c37(0x1be)[_0x2c9c37(0x258)](_0x2c492e)],_0xeae3cc=_0x3e3d0a[_0x2c9c37(0x271)[_0x2c9c37(0x258)](_0x2c492e)],_0x434635=_0x3e3d0a['%1Mute'[_0x2c9c37(0x258)](_0x2c492e)];$gameTemp[_0x2c9c37(0x133)]([this],_0x15d016,_0xeae3cc,_0x434635);}else return this['_ctbTurnOrderFaceIndex']===_0x375ad9&&(this[_0x2c9c37(0x2e7)]=this[_0x2c9c37(0x160)]()),this[_0x2c9c37(0x2e7)];}if(this['battler']()&&_0x3e3d0a[_0x2c9c37(0x137)[_0x2c9c37(0x258)](_0x2c492e)][_0x2c9c37(0x184)]>0x0){const _0x5c445e=_0x3e3d0a[_0x2c9c37(0x137)[_0x2c9c37(0x258)](_0x2c492e)],_0x2e86af={'textColor':ColorManager[_0x2c9c37(0x2d6)](_0x3e3d0a['%1TextColor'[_0x2c9c37(0x258)](_0x2c492e)]),'flashColor':_0x3e3d0a[_0x2c9c37(0x16f)[_0x2c9c37(0x258)](_0x2c492e)],'flashDuration':_0x3e3d0a[_0x2c9c37(0x16e)[_0x2c9c37(0x258)](_0x2c492e)]};this['setupTextPopup'](_0x5c445e,_0x2e86af);}},VisuMZ['BattleSystemCTB'][_0x117212(0x281)]=Game_Battler['prototype'][_0x117212(0x29f)],Game_Battler[_0x117212(0x2f3)][_0x117212(0x29f)]=function(){const _0x238a6a=_0x117212;if(BattleManager[_0x238a6a(0x2be)](this))return;VisuMZ[_0x238a6a(0x20d)][_0x238a6a(0x281)][_0x238a6a(0x225)](this);},BattleManager[_0x117212(0x2be)]=function(_0x2f54b8){const _0x3ac96e=_0x117212;return BattleManager[_0x3ac96e(0x2d0)]()[_0x3ac96e(0x129)](_0x2e9780=>_0x2e9780!==_0x2f54b8)[_0x3ac96e(0x1a9)](_0x9b3aa=>_0x9b3aa['isAlive']()&&_0x9b3aa[_0x3ac96e(0x2a0)]()&&_0x9b3aa[_0x3ac96e(0x1f6)]>=0x1);},VisuMZ[_0x117212(0x20d)][_0x117212(0x32b)]=Game_Battler[_0x117212(0x2f3)]['updateTpbChargeTime'],Game_Battler[_0x117212(0x2f3)][_0x117212(0x2c9)]=function(){const _0x254f7e=_0x117212;BattleManager[_0x254f7e(0x18e)]()?this[_0x254f7e(0x2d9)]():VisuMZ[_0x254f7e(0x20d)]['Game_Battler_updateTpbChargeTime'][_0x254f7e(0x225)](this);},Game_Battler[_0x117212(0x2f3)][_0x117212(0x2d9)]=function(){const _0x32422e=_0x117212;if(this[_0x32422e(0x189)]===_0x32422e(0x240)){if(_0x32422e(0x131)!==_0x32422e(0x131))return _0xdb69a6['isCTB']()?_0x491825[_0x32422e(0x20d)]['Settings'][_0x32422e(0x2da)]['TpbSpeedCalcJS'][_0x32422e(0x225)](this,this):_0x2a08e0[_0x32422e(0x20d)][_0x32422e(0x139)][_0x32422e(0x225)](this);else this[_0x32422e(0x308)]+=this['tpbAcceleration'](),this[_0x32422e(0x308)]>=0x1&&this[_0x32422e(0x318)]();}},VisuMZ[_0x117212(0x20d)]['Game_Battler_updateTpbCastTime']=Game_Battler['prototype'][_0x117212(0x20a)],Game_Battler['prototype'][_0x117212(0x20a)]=function(){const _0x3b49b4=_0x117212;if(BattleManager[_0x3b49b4(0x18e)]()){if(_0x3b49b4(0x1fc)!==_0x3b49b4(0x201))this[_0x3b49b4(0x2bd)]();else{const _0x299337=this[_0x3b49b4(0x2c4)](),_0x299415=this[_0x3b49b4(0x1e2)]();_0x2a92bf[_0x3b49b4(0x2ff)]=new _0x5b30cf(_0x299337,_0x299415);const _0x574c09=_0x55434f[_0x3b49b4(0x2d6)](_0x46a3d7[_0x3b49b4(0x246)[_0x3b49b4(0x258)](_0x366554)]),_0x427bd8=_0x48ef4a['getColor'](_0x7be7d2[_0x3b49b4(0x230)['format'](_0x28392e)]);_0x2248b5['bitmap']['gradientFillRect'](0x0,0x0,_0x299337,_0x299415,_0x574c09,_0x427bd8,!![]);}}else VisuMZ[_0x3b49b4(0x20d)][_0x3b49b4(0x22e)]['call'](this);},Game_Battler[_0x117212(0x2f3)]['updateTpbCastTimeCTB']=function(){const _0x1cd434=_0x117212;this[_0x1cd434(0x189)]==='casting'&&(this[_0x1cd434(0x249)]+=this['tpbAcceleration'](),this[_0x1cd434(0x249)]>=this[_0x1cd434(0x161)]()&&(this[_0x1cd434(0x189)]='ready'));},Game_Actor[_0x117212(0x2f3)][_0x117212(0x143)]=function(){const _0x90b5f1=_0x117212,_0x369139=this['actor']()[_0x90b5f1(0x1f8)];if(_0x369139[_0x90b5f1(0x134)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x90b5f1(0x1a0);else{if(_0x369139[_0x90b5f1(0x134)](/<CTB TURN ORDER ICON:[ ](\d+)>/i)){if(_0x90b5f1(0x2f9)!==_0x90b5f1(0x30e))return'icon';else _0x488320=_0x5c8eb6(_0x1ee7c5['$1'])*0.01;}}return Window_CTB_TurnOrder[_0x90b5f1(0x1b8)][_0x90b5f1(0x274)];},Game_Actor[_0x117212(0x2f3)][_0x117212(0x1df)]=function(){const _0x34cd4d=_0x117212,_0x2a39b7=this[_0x34cd4d(0x121)]()['note'];if(_0x2a39b7[_0x34cd4d(0x134)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x34cd4d(0x14d)]();},Game_Actor[_0x117212(0x2f3)]['TurnOrderCTBGraphicFaceIndex']=function(){const _0x57b488=_0x117212,_0x14c182=this['actor']()['note'];if(_0x14c182[_0x57b488(0x134)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0x57b488(0x2ae)]();},Game_Actor[_0x117212(0x2f3)][_0x117212(0x333)]=function(){const _0x29173b=_0x117212,_0x1d241b=this[_0x29173b(0x121)]()[_0x29173b(0x1f8)];if(_0x1d241b['match'](/<CTB TURN ORDER ICON:[ ](\d+)>/i)){if(_0x29173b(0x2e8)===_0x29173b(0x280))delete this[_0x29173b(0x1e7)],delete this[_0x29173b(0x255)],delete this[_0x29173b(0x2e7)],delete this[_0x29173b(0x22c)];else return Number(RegExp['$1']);}return Window_CTB_TurnOrder[_0x29173b(0x1b8)][_0x29173b(0x12c)];},Game_Enemy[_0x117212(0x2f3)][_0x117212(0x143)]=function(){const _0x5b8b05=_0x117212,_0x86c85=this['enemy']()[_0x5b8b05(0x1f8)];if(_0x86c85[_0x5b8b05(0x134)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x5b8b05(0x1a0);else{if(_0x86c85[_0x5b8b05(0x134)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x5b8b05(0x195)===_0x5b8b05(0x1f7)?this['processUpdateGraphic']():_0x5b8b05(0x1b9);}return Window_CTB_TurnOrder[_0x5b8b05(0x1b8)][_0x5b8b05(0x1c8)];},Game_Enemy['prototype'][_0x117212(0x322)]=function(){const _0x44bdfe=_0x117212,_0xb1a823=this['enemy']()['note'];if(_0xb1a823[_0x44bdfe(0x134)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_CTB_TurnOrder[_0x44bdfe(0x1b8)][_0x44bdfe(0x18f)];},Game_Enemy[_0x117212(0x2f3)]['createTurnOrderCTBGraphicFaceIndex']=function(){const _0x3b3c35=_0x117212,_0x1e211c=this[_0x3b3c35(0x1f2)]()[_0x3b3c35(0x1f8)];if(_0x1e211c[_0x3b3c35(0x134)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_CTB_TurnOrder[_0x3b3c35(0x1b8)]['EnemyBattlerFaceIndex'];},Game_Enemy[_0x117212(0x2f3)][_0x117212(0x333)]=function(){const _0x31bc6a=_0x117212,_0x564aed=this[_0x31bc6a(0x1f2)]()[_0x31bc6a(0x1f8)];if(_0x564aed['match'](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_CTB_TurnOrder['Settings'][_0x31bc6a(0x1de)];},VisuMZ['BattleSystemCTB'][_0x117212(0x157)]=Scene_Battle[_0x117212(0x2f3)]['createAllWindows'],Scene_Battle[_0x117212(0x2f3)][_0x117212(0x22b)]=function(){const _0x59a0e4=_0x117212;VisuMZ[_0x59a0e4(0x20d)][_0x59a0e4(0x157)][_0x59a0e4(0x225)](this),this[_0x59a0e4(0x16b)]();},Scene_Battle['prototype'][_0x117212(0x16b)]=function(){const _0x15602a=_0x117212;if(!BattleManager[_0x15602a(0x18e)]())return;this[_0x15602a(0x1fd)]=new Window_CTB_TurnOrder();const _0x521a82=this[_0x15602a(0x179)](this[_0x15602a(0x154)]);this['addChildAt'](this[_0x15602a(0x1fd)],_0x521a82),this['repositionLogWindowCTB'](),BattleManager[_0x15602a(0x2b4)](!![]);},Scene_Battle[_0x117212(0x2f3)][_0x117212(0x164)]=function(){const _0x3cea92=_0x117212,_0x3e764b=Window_CTB_TurnOrder['Settings'];if(_0x3e764b['DisplayPosition']!==_0x3cea92(0x291))return;if(!_0x3e764b[_0x3cea92(0x1cc)])return;if(!this[_0x3cea92(0x200)])return;const _0x5c12a0=this[_0x3cea92(0x1fd)]['y']-Math[_0x3cea92(0x16d)]((Graphics[_0x3cea92(0x1fa)]-Graphics['boxHeight'])/0x2),_0x39be35=_0x5c12a0+this['_ctbTurnOrderWindow'][_0x3cea92(0x1fa)];this[_0x3cea92(0x200)]['y']=_0x39be35+_0x3e764b[_0x3cea92(0x162)];};function Sprite_CTB_TurnOrder_Battler(){this['initialize'](...arguments);}Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)]=Object[_0x117212(0x1e3)](Sprite_Clickable['prototype']),Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x1ae)]=Sprite_CTB_TurnOrder_Battler,Sprite_CTB_TurnOrder_Battler['prototype']['initialize']=function(_0x826d7c,_0x418c9b,_0x546e7d){const _0x5470b0=_0x117212;this[_0x5470b0(0x265)](_0x826d7c,_0x418c9b,_0x546e7d),Sprite_Clickable[_0x5470b0(0x2f3)][_0x5470b0(0x1f9)][_0x5470b0(0x225)](this),this[_0x5470b0(0x136)]();},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x265)]=function(_0x515649,_0x5c1616,_0x230398){const _0x1caf81=_0x117212;this[_0x1caf81(0x12f)]=_0x515649,this[_0x1caf81(0x199)]=_0x5c1616,this[_0x1caf81(0x2a6)]=_0x230398;const _0x49e741=Window_CTB_TurnOrder[_0x1caf81(0x1b8)],_0x14ac14=this[_0x1caf81(0x2f2)](),_0x4e4120=this[_0x1caf81(0x1d6)]();this[_0x1caf81(0x1c2)]=0x0,this[_0x1caf81(0x32d)]=_0x14ac14?_0x49e741[_0x1caf81(0x1d5)]*_0x4e4120:0x0,this[_0x1caf81(0x25b)]=_0x14ac14?0x0:_0x49e741[_0x1caf81(0x1d5)]*_0x4e4120,this['_fadeDuration']=0x0,this[_0x1caf81(0x1a8)]=0xff,this[_0x1caf81(0x1b3)]=!![],this[_0x1caf81(0x272)]=!![];},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)]['createChildren']=function(){const _0x14e835=_0x117212;this[_0x14e835(0x198)](),this[_0x14e835(0x305)](),this[_0x14e835(0x1a6)](),this[_0x14e835(0x2a1)](),this[_0x14e835(0x1d9)]();},Sprite_CTB_TurnOrder_Battler['prototype'][_0x117212(0x198)]=function(){const _0x11e0ec=_0x117212;this['x']=this[_0x11e0ec(0x32d)],this['y']=this[_0x11e0ec(0x25b)];},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x2f2)]=function(){const _0x77fbd0=_0x117212,_0x37f80f=Window_CTB_TurnOrder[_0x77fbd0(0x1b8)],_0x5449da=['top',_0x77fbd0(0x197)][_0x77fbd0(0x21d)](_0x37f80f[_0x77fbd0(0x122)]);return _0x5449da;},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x2c4)]=function(){const _0xd6900a=_0x117212,_0x1c896d=Window_CTB_TurnOrder[_0xd6900a(0x1b8)];return this['isHorz']()?_0x1c896d[_0xd6900a(0x1d5)]:_0x1c896d['SpriteLength'];},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x1e2)]=function(){const _0x27b366=_0x117212,_0x551931=Window_CTB_TurnOrder['Settings'];return this[_0x27b366(0x2f2)]()?_0x551931['SpriteLength']:_0x551931[_0x27b366(0x1d5)];},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x11d)]=function(){const _0x2c5aee=_0x117212;this[_0x2c5aee(0x2ff)]=new Bitmap(0x48,0x24);const _0x3c513a=this[_0x2c5aee(0x21a)]()?this[_0x2c5aee(0x21a)]()[_0x2c5aee(0x2c2)]():_0x2c5aee(0x168)[_0x2c5aee(0x258)](this[_0x2c5aee(0x12f)],this[_0x2c5aee(0x199)],this['_dupe']);this[_0x2c5aee(0x2ff)][_0x2c5aee(0x294)](_0x3c513a,0x0,0x0,0x48,0x24,_0x2c5aee(0x288));},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x305)]=function(){const _0x408f19=_0x117212;if(!Window_CTB_TurnOrder['Settings']['ShowMarkerBg'])return;const _0x13c344=Window_CTB_TurnOrder['Settings'],_0x11fc95=this[_0x408f19(0x12f)]===$gameParty?_0x408f19(0x30f):_0x408f19(0x338),_0x41e984=_0x408f19(0x316)[_0x408f19(0x258)](_0x11fc95),_0x14c48e=new Sprite();_0x14c48e[_0x408f19(0x144)]['x']=this['anchor']['x'],_0x14c48e['anchor']['y']=this[_0x408f19(0x144)]['y'];if(_0x13c344[_0x41e984]){if(_0x408f19(0x1b0)!==_0x408f19(0x1b0))return _0x3a4427[_0x408f19(0x1b8)]['EnemyBattlerFaceIndex'];else _0x14c48e[_0x408f19(0x2ff)]=ImageManager[_0x408f19(0x1e5)](_0x13c344[_0x41e984]);}else{const _0xc4ad6a=this[_0x408f19(0x2c4)](),_0x21d6ce=this[_0x408f19(0x1e2)]();_0x14c48e[_0x408f19(0x2ff)]=new Bitmap(_0xc4ad6a,_0x21d6ce);const _0x54f95e=ColorManager[_0x408f19(0x2d6)](_0x13c344[_0x408f19(0x246)[_0x408f19(0x258)](_0x11fc95)]),_0x57c54c=ColorManager[_0x408f19(0x2d6)](_0x13c344[_0x408f19(0x230)[_0x408f19(0x258)](_0x11fc95)]);_0x14c48e['bitmap']['gradientFillRect'](0x0,0x0,_0xc4ad6a,_0x21d6ce,_0x54f95e,_0x57c54c,!![]);}this['_backgroundSprite']=_0x14c48e,this[_0x408f19(0x235)](this[_0x408f19(0x325)]),this['width']=this[_0x408f19(0x325)][_0x408f19(0x2df)],this[_0x408f19(0x1fa)]=this[_0x408f19(0x325)]['height'];},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x1a6)]=function(){const _0x50815f=_0x117212,_0x1a305f=new Sprite();_0x1a305f[_0x50815f(0x144)]['x']=this[_0x50815f(0x144)]['x'],_0x1a305f[_0x50815f(0x144)]['y']=this[_0x50815f(0x144)]['y'],this[_0x50815f(0x18b)]=_0x1a305f,this[_0x50815f(0x235)](this[_0x50815f(0x18b)]),this['processUpdateGraphic']();},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)]['createBorderSprite']=function(){const _0x38c104=_0x117212;if(!Window_CTB_TurnOrder[_0x38c104(0x1b8)]['ShowMarkerBorder'])return;const _0x10c5e8=Window_CTB_TurnOrder[_0x38c104(0x1b8)],_0x1fb276=this[_0x38c104(0x12f)]===$gameParty?_0x38c104(0x30f):_0x38c104(0x338),_0x10f622=_0x38c104(0x21f)[_0x38c104(0x258)](_0x1fb276),_0xef9232=new Sprite();_0xef9232[_0x38c104(0x144)]['x']=this[_0x38c104(0x144)]['x'],_0xef9232[_0x38c104(0x144)]['y']=this['anchor']['y'];if(_0x10c5e8[_0x10f622])_0xef9232['bitmap']=ImageManager['loadSystem'](_0x10c5e8[_0x10f622]);else{let _0x46f83e=this[_0x38c104(0x2c4)](),_0x5aebbe=this['bitmapHeight'](),_0xfffbb3=_0x10c5e8['BorderThickness'];_0xef9232[_0x38c104(0x2ff)]=new Bitmap(_0x46f83e,_0x5aebbe);const _0x546e52=_0x38c104(0x25e),_0x5d23e9=ColorManager[_0x38c104(0x2d6)](_0x10c5e8[_0x38c104(0x231)[_0x38c104(0x258)](_0x1fb276)]);_0xef9232[_0x38c104(0x2ff)][_0x38c104(0x297)](0x0,0x0,_0x46f83e,_0x5aebbe,_0x546e52),_0x46f83e-=0x2,_0x5aebbe-=0x2,_0xef9232['bitmap']['fillRect'](0x1,0x1,_0x46f83e,_0x5aebbe,_0x5d23e9),_0x46f83e-=_0xfffbb3*0x2,_0x5aebbe-=_0xfffbb3*0x2,_0xef9232[_0x38c104(0x2ff)]['fillRect'](0x1+_0xfffbb3,0x1+_0xfffbb3,_0x46f83e,_0x5aebbe,_0x546e52),_0x46f83e-=0x2,_0x5aebbe-=0x2,_0xfffbb3+=0x1,_0xef9232[_0x38c104(0x2ff)]['clearRect'](0x1+_0xfffbb3,0x1+_0xfffbb3,_0x46f83e,_0x5aebbe);}this[_0x38c104(0x325)]=_0xef9232,this[_0x38c104(0x235)](this[_0x38c104(0x325)]);},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x1d9)]=function(){const _0x3e3569=_0x117212,_0x14567e=Window_CTB_TurnOrder['Settings'];if(!_0x14567e['EnemyBattlerDrawLetter'])return;if(this[_0x3e3569(0x12f)]===$gameParty)return;const _0x419bea=this[_0x3e3569(0x2c4)](),_0x46c5ea=this[_0x3e3569(0x1e2)](),_0x517f80=new Sprite();_0x517f80[_0x3e3569(0x144)]['x']=this['anchor']['x'],_0x517f80[_0x3e3569(0x144)]['y']=this[_0x3e3569(0x144)]['y'],_0x517f80[_0x3e3569(0x2ff)]=new Bitmap(_0x419bea,_0x46c5ea),this[_0x3e3569(0x259)]=_0x517f80,this['addChild'](this[_0x3e3569(0x259)]);},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x21a)]=function(){const _0x335fe7=_0x117212;return this[_0x335fe7(0x12f)]?this[_0x335fe7(0x12f)][_0x335fe7(0x1c7)]()[this[_0x335fe7(0x199)]]:null;},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x2b9)]=function(_0x36a5ec){const _0x23ddba=_0x117212,_0x13142e=this[_0x23ddba(0x21a)]();if(!_0x13142e)return Number['MAX_SAFE_INTEGER'];const _0x5e99c6=0x1*(this['_dupe']+0x1);return _0x13142e[_0x23ddba(0x1c9)](_0x5e99c6,_0x36a5ec);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x117212(0x23a)]=function(){const _0x44547a=_0x117212;Sprite_Clickable[_0x44547a(0x2f3)][_0x44547a(0x23a)][_0x44547a(0x225)](this),this[_0x44547a(0x31f)](),this[_0x44547a(0x2b1)](),this[_0x44547a(0x226)](),this[_0x44547a(0x1ea)](),this[_0x44547a(0x216)](),this[_0x44547a(0x175)](),this['updateLetter'](),this[_0x44547a(0x1ce)]();},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x31f)]=function(){const _0x58bf54=_0x117212,_0x4f16b6=this[_0x58bf54(0x2e1)]();if(this[_0x58bf54(0x2bb)]===_0x4f16b6)return;this[_0x58bf54(0x2bb)]=_0x4f16b6;const _0x3af8a5=Window_CTB_TurnOrder[_0x58bf54(0x1b8)],_0x1df47e=this[_0x58bf54(0x2f2)](),_0x82b081=_0x3af8a5[_0x58bf54(0x190)],_0x20ceb4=_0x3af8a5['SubjectDistance'],_0x27350c=SceneManager[_0x58bf54(0x177)][_0x58bf54(0x1fd)];if(!_0x27350c)return;this[_0x58bf54(0x1c2)]=_0x3af8a5[_0x58bf54(0x2e9)],this[_0x58bf54(0x32d)]=_0x1df47e?_0x3af8a5[_0x58bf54(0x1d5)]*_0x4f16b6:0x0,this[_0x58bf54(0x25b)]=_0x1df47e?0x0:_0x3af8a5['SpriteThin']*_0x4f16b6,_0x4f16b6>0x0&&(this[_0x58bf54(0x32d)]+=_0x1df47e?_0x20ceb4:0x0,this['_positionTargetY']+=_0x1df47e?0x0:_0x20ceb4),_0x82b081?'lztgE'===_0x58bf54(0x1fb)?_0x3880b5[_0x58bf54(0x20d)][_0x58bf54(0x30a)]['call'](this):this[_0x58bf54(0x32d)]=_0x1df47e?_0x27350c[_0x58bf54(0x2df)]-this[_0x58bf54(0x32d)]-_0x3af8a5[_0x58bf54(0x1d5)]:0x0:_0x58bf54(0x1ca)!=='wZKlw'?this[_0x58bf54(0x25b)]=_0x1df47e?0x0:_0x27350c[_0x58bf54(0x1fa)]-this[_0x58bf54(0x25b)]-_0x3af8a5[_0x58bf54(0x1d5)]:this[_0x58bf54(0x14c)](_0x4cf706(_0x970699['$1']));},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x2b1)]=function(){const _0x3ea05e=_0x117212;if(this[_0x3ea05e(0x336)]>0x0)return;if(this['_positionDuration']>0x0){if(_0x3ea05e(0x167)!==_0x3ea05e(0x167))_0x317f36['BattleSystemCTB'][_0x3ea05e(0x32b)][_0x3ea05e(0x225)](this);else{const _0x505cc6=this[_0x3ea05e(0x1c2)];this['x']=(this['x']*(_0x505cc6-0x1)+this['_positionTargetX'])/_0x505cc6,this['y']=(this['y']*(_0x505cc6-0x1)+this[_0x3ea05e(0x25b)])/_0x505cc6,this['_positionDuration']--;}}this[_0x3ea05e(0x1c2)]<=0x0&&this[_0x3ea05e(0x1b3)]&&(this['x']=this[_0x3ea05e(0x32d)],this['y']=this[_0x3ea05e(0x25b)],this[_0x3ea05e(0x2b2)]<=0x0&&!this['_isBattleOver']&&this[_0x3ea05e(0x293)](0xff));},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x1d6)]=function(){const _0x179a5d=_0x117212;return Window_CTB_TurnOrder[_0x179a5d(0x1b8)]['TotalHorzSprites']*0x14;},Sprite_CTB_TurnOrder_Battler['prototype']['containerWindow']=function(){const _0x7d1a07=_0x117212;return SceneManager['_scene'][_0x7d1a07(0x1fd)];},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x2e1)]=function(){const _0x5ab670=_0x117212;if(!this[_0x5ab670(0x1ad)]())return this[_0x5ab670(0x1d6)]();const _0x10eddc=this['containerWindow']()[_0x5ab670(0x1bd)];return _0x10eddc['indexOf'](this);},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x223)]=function(){const _0x37935b=_0x117212,_0x33a6e0=Window_CTB_TurnOrder[_0x37935b(0x1b8)],_0x100646=this[_0x37935b(0x2f2)](),_0x117cf4=_0x100646?_0x33a6e0[_0x37935b(0x219)]:_0x33a6e0[_0x37935b(0x155)];this[_0x37935b(0x2a6)]-=0x1;if(this[_0x37935b(0x2a6)]<0x0){if(_0x37935b(0x26a)!=='HSDaf')this[_0x37935b(0x2a6)]=_0x117cf4-0x1,this[_0x37935b(0x293)](0x0);else return _0x1c4a1a['isCTB']()?_0x33d50b[_0x37935b(0x20d)][_0x37935b(0x1b8)][_0x37935b(0x2da)][_0x37935b(0x169)][_0x37935b(0x225)](this,this):_0x532960[_0x37935b(0x20d)][_0x37935b(0x26e)]['call'](this);}},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x293)]=function(_0x21a88f){const _0x3fe548=_0x117212,_0x54717d=Window_CTB_TurnOrder[_0x3fe548(0x1b8)];this[_0x3fe548(0x336)]=_0x54717d[_0x3fe548(0x2e9)],this[_0x3fe548(0x1a8)]=_0x21a88f;},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x226)]=function(){const _0x10db56=_0x117212,_0x3d5cbe=this[_0x10db56(0x21a)]();if(!_0x3d5cbe)return;if(this[_0x10db56(0x1b3)]===_0x3d5cbe[_0x10db56(0x2bf)]()&&this[_0x10db56(0x272)]===_0x3d5cbe['isAppeared']())return;this[_0x10db56(0x1b3)]=_0x3d5cbe[_0x10db56(0x2bf)](),this[_0x10db56(0x272)]=_0x3d5cbe[_0x10db56(0x192)]();let _0x525ccc=this[_0x10db56(0x1b3)]&&this['_isAppeared']?0xff:0x0;this['startFade'](_0x525ccc);},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)]['updateOpacity']=function(){const _0x21dedc=_0x117212;if(this[_0x21dedc(0x336)]>0x0){const _0x416cdd=this[_0x21dedc(0x336)];this[_0x21dedc(0x2b2)]=(this[_0x21dedc(0x2b2)]*(_0x416cdd-0x1)+this['_fadeTarget'])/_0x416cdd,this[_0x21dedc(0x336)]--;if(this[_0x21dedc(0x336)]<=0x0){if(_0x21dedc(0x299)==='aRydC'){const _0x1dd7e3=this[_0x21dedc(0x336)];this[_0x21dedc(0x2b2)]=(this[_0x21dedc(0x2b2)]*(_0x1dd7e3-0x1)+this[_0x21dedc(0x1a8)])/_0x1dd7e3,this[_0x21dedc(0x336)]--,this[_0x21dedc(0x336)]<=0x0&&(this[_0x21dedc(0x31f)](),this[_0x21dedc(0x1c2)]=0x0,this[_0x21dedc(0x2b1)](),this['opacity']=this[_0x21dedc(0x1a8)]);}else this['checkPosition'](),this[_0x21dedc(0x1c2)]=0x0,this['updatePosition'](),this[_0x21dedc(0x2b2)]=this[_0x21dedc(0x1a8)];}}if(this[_0x21dedc(0x2b0)])return;BattleManager[_0x21dedc(0x1b7)]===_0x21dedc(0x27e)&&(this[_0x21dedc(0x2b0)]=!![],this[_0x21dedc(0x293)](0x0));},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x216)]=function(){const _0x1aa6e1=_0x117212,_0x576ce2=this['battler']();if(!_0x576ce2)return;const _0xbfae5f=Window_CTB_TurnOrder[_0x1aa6e1(0x1b8)],_0x2006db=this[_0x1aa6e1(0x12f)]===$gameParty?_0x1aa6e1(0x30f):_0x1aa6e1(0x338);let _0x4de3d2=_0x576ce2[_0x1aa6e1(0x269)]();if(_0x576ce2[_0x1aa6e1(0x256)]()&&_0x4de3d2===_0x1aa6e1(0x1f2)){if(_0x1aa6e1(0x2c3)===_0x1aa6e1(0x210))return _0x3f460a[_0x1aa6e1(0x20d)][_0x1aa6e1(0x26e)][_0x1aa6e1(0x225)](this);else _0x4de3d2=_0x1aa6e1(0x1a0);}else _0x576ce2[_0x1aa6e1(0x1b4)]()&&_0x4de3d2===_0x1aa6e1(0x32e)&&(_0x4de3d2=_0x1aa6e1(0x1f2));if(this[_0x1aa6e1(0x1ed)]!==_0x4de3d2)return this[_0x1aa6e1(0x24a)]();switch(this[_0x1aa6e1(0x1ed)]){case _0x1aa6e1(0x1a0):if(this[_0x1aa6e1(0x13c)]!==_0x576ce2[_0x1aa6e1(0x1df)]()){if(_0x1aa6e1(0x14e)!=='auFQp')return this['processUpdateGraphic']();else _0xf48603[_0x1aa6e1(0x2c0)](_0x2711e4(_0x52936b['$1'])*0.01);}if(this['_graphicFaceIndex']!==_0x576ce2[_0x1aa6e1(0x1da)]()){if(_0x1aa6e1(0x1e8)===_0x1aa6e1(0x2d7))this[_0x1aa6e1(0x302)]();else return this[_0x1aa6e1(0x24a)]();}break;case _0x1aa6e1(0x1b9):if(this[_0x1aa6e1(0x2a9)]!==_0x576ce2[_0x1aa6e1(0x30b)]()){if(_0x1aa6e1(0x1d4)===_0x1aa6e1(0x243))this[_0x1aa6e1(0x2b0)]=!![],this[_0x1aa6e1(0x293)](0x0);else return this[_0x1aa6e1(0x24a)]();}break;case'enemy':if(_0x576ce2['hasSvBattler']()){if(_0x1aa6e1(0x218)===_0x1aa6e1(0x2c5))this[_0x1aa6e1(0x28f)]=_0x45b2aa['isBattleSystemCTBTurnOrderVisible']();else{if(this[_0x1aa6e1(0x306)]!==_0x576ce2[_0x1aa6e1(0x202)]()){if(_0x1aa6e1(0x29d)===_0x1aa6e1(0x146)){const _0x414800=this[_0x1aa6e1(0x1f2)]()[_0x1aa6e1(0x1f8)];if(_0x414800[_0x1aa6e1(0x134)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x1aa6e1(0x1a0);else{if(_0x414800[_0x1aa6e1(0x134)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x1aa6e1(0x1b9);}return _0x47bc25[_0x1aa6e1(0x1b8)]['EnemyBattlerType'];}else return this[_0x1aa6e1(0x24a)]();}}}else{if(this[_0x1aa6e1(0x337)]!==_0x576ce2[_0x1aa6e1(0x14b)]()){if('wFalU'!==_0x1aa6e1(0x286))this[_0x1aa6e1(0x2bd)]();else return this['processUpdateGraphic']();}}break;case _0x1aa6e1(0x32e):if(_0x576ce2[_0x1aa6e1(0x256)]()){if(this[_0x1aa6e1(0x306)]!==_0x576ce2['battlerName']())return this[_0x1aa6e1(0x24a)]();}else{if(this[_0x1aa6e1(0x337)]!==_0x576ce2[_0x1aa6e1(0x14b)]()){if('tPGdG'!=='JsCGo')return this[_0x1aa6e1(0x24a)]();else this['x']=this[_0x1aa6e1(0x32d)],this['y']=this[_0x1aa6e1(0x25b)],this['opacity']<=0x0&&!this[_0x1aa6e1(0x2b0)]&&this['startFade'](0xff);}}break;}},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x24a)]=function(){const _0x434378=_0x117212,_0xf676d2=this[_0x434378(0x21a)]();if(!_0xf676d2)return;this['_graphicType']=_0xf676d2['TurnOrderCTBGraphicType']();if(_0xf676d2[_0x434378(0x256)]()&&this[_0x434378(0x1ed)]===_0x434378(0x1f2))this['_graphicType']='face';else _0xf676d2['isEnemy']()&&this['_graphicType']===_0x434378(0x32e)&&(this['_graphicType']='enemy');let _0x23faa2;switch(this['_graphicType']){case _0x434378(0x1a0):this[_0x434378(0x13c)]=_0xf676d2[_0x434378(0x1df)](),this[_0x434378(0x31d)]=_0xf676d2['TurnOrderCTBGraphicFaceIndex'](),_0x23faa2=ImageManager[_0x434378(0x26f)](this[_0x434378(0x13c)]),_0x23faa2['addLoadListener'](this[_0x434378(0x1fe)][_0x434378(0x153)](this,_0x23faa2));break;case _0x434378(0x1b9):this['_graphicIconIndex']=_0xf676d2[_0x434378(0x333)](),_0x23faa2=ImageManager[_0x434378(0x1e5)]('IconSet'),_0x23faa2[_0x434378(0x191)](this['changeIconGraphicBitmap'][_0x434378(0x153)](this,_0x23faa2));break;case _0x434378(0x1f2):if(_0xf676d2[_0x434378(0x295)]()){if('yUztc'!==_0x434378(0x1a7)){const _0x10eac4=_0x533dbc[_0x434378(0x1b8)];this[_0x434378(0x336)]=_0x10eac4[_0x434378(0x2e9)],this[_0x434378(0x1a8)]=_0x94022e;}else this[_0x434378(0x306)]=_0xf676d2['svBattlerName'](),_0x23faa2=ImageManager[_0x434378(0x15b)](this[_0x434378(0x306)]),_0x23faa2[_0x434378(0x191)](this[_0x434378(0x151)][_0x434378(0x153)](this,_0x23faa2));}else{if($gameSystem[_0x434378(0x303)]())this[_0x434378(0x337)]=_0xf676d2[_0x434378(0x14b)](),_0x23faa2=ImageManager[_0x434378(0x23f)](this[_0x434378(0x337)]),_0x23faa2[_0x434378(0x191)](this[_0x434378(0x1e4)][_0x434378(0x153)](this,_0x23faa2));else{if(_0x434378(0x313)==='cZYBr'){const _0x564bcd=this['containerPosition']();if(this[_0x434378(0x2bb)]===_0x564bcd)return;this[_0x434378(0x2bb)]=_0x564bcd;const _0x396c0e=_0x550890[_0x434378(0x1b8)],_0x330ded=this['isHorz'](),_0x2c9f8b=_0x396c0e[_0x434378(0x190)],_0x5f58a5=_0x396c0e[_0x434378(0x1c0)],_0x15af3a=_0x4684ea[_0x434378(0x177)]['_ctbTurnOrderWindow'];if(!_0x15af3a)return;this[_0x434378(0x1c2)]=_0x396c0e['UpdateFrames'],this[_0x434378(0x32d)]=_0x330ded?_0x396c0e['SpriteThin']*_0x564bcd:0x0,this[_0x434378(0x25b)]=_0x330ded?0x0:_0x396c0e[_0x434378(0x1d5)]*_0x564bcd,_0x564bcd>0x0&&(this['_positionTargetX']+=_0x330ded?_0x5f58a5:0x0,this['_positionTargetY']+=_0x330ded?0x0:_0x5f58a5),_0x2c9f8b?this[_0x434378(0x32d)]=_0x330ded?_0x15af3a[_0x434378(0x2df)]-this[_0x434378(0x32d)]-_0x396c0e[_0x434378(0x1d5)]:0x0:this[_0x434378(0x25b)]=_0x330ded?0x0:_0x15af3a[_0x434378(0x1fa)]-this['_positionTargetY']-_0x396c0e[_0x434378(0x1d5)];}else this[_0x434378(0x337)]=_0xf676d2[_0x434378(0x14b)](),_0x23faa2=ImageManager[_0x434378(0x1d2)](this[_0x434378(0x337)]),_0x23faa2[_0x434378(0x191)](this['changeEnemyGraphicBitmap']['bind'](this,_0x23faa2));}}break;case _0x434378(0x32e):this[_0x434378(0x306)]=_0xf676d2[_0x434378(0x14b)](),_0x23faa2=ImageManager[_0x434378(0x15b)](this[_0x434378(0x306)]),_0x23faa2['addLoadListener'](this[_0x434378(0x151)][_0x434378(0x153)](this,_0x23faa2));break;}},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x1fe)]=function(_0x362da2){const _0x569def=_0x117212,_0x3679f6=this['_graphicFaceIndex'],_0x8e93fd=this[_0x569def(0x2c4)](),_0x2acbef=this[_0x569def(0x1e2)](),_0xa5a730=Math[_0x569def(0x300)](_0x8e93fd,_0x2acbef);this[_0x569def(0x18b)][_0x569def(0x2ff)]=new Bitmap(_0x8e93fd,_0x2acbef);const _0x1359dc=this[_0x569def(0x18b)][_0x569def(0x2ff)],_0x4c1c6f=ImageManager[_0x569def(0x315)],_0x1c4af=ImageManager['faceHeight'],_0x47fe83=_0xa5a730/Math[_0x569def(0x300)](_0x4c1c6f,_0x1c4af),_0x393ec2=ImageManager['faceWidth'],_0x285d43=ImageManager[_0x569def(0x2ec)],_0x425c67=_0x3679f6%0x4*_0x4c1c6f+(_0x4c1c6f-_0x393ec2)/0x2,_0x3ba751=Math[_0x569def(0x254)](_0x3679f6/0x4)*_0x1c4af+(_0x1c4af-_0x285d43)/0x2,_0x25b667=(_0x8e93fd-_0x4c1c6f*_0x47fe83)/0x2,_0x28c8c2=(_0x2acbef-_0x1c4af*_0x47fe83)/0x2;_0x1359dc[_0x569def(0x1af)](_0x362da2,_0x425c67,_0x3ba751,_0x393ec2,_0x285d43,_0x25b667,_0x28c8c2,_0xa5a730,_0xa5a730);},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x1c6)]=function(_0xd085b6){const _0x2bdaf3=_0x117212,_0x1715dc=this[_0x2bdaf3(0x2a9)],_0x17ea63=this[_0x2bdaf3(0x2c4)](),_0x31cc66=this[_0x2bdaf3(0x1e2)]();this[_0x2bdaf3(0x18b)][_0x2bdaf3(0x2ff)]=new Bitmap(_0x17ea63,_0x31cc66);const _0x2119cd=this[_0x2bdaf3(0x18b)][_0x2bdaf3(0x2ff)],_0x346ac9=ImageManager['iconWidth'],_0x29c77e=ImageManager[_0x2bdaf3(0x204)],_0x7bc1ba=Math['min'](_0x346ac9,_0x29c77e,_0x17ea63,_0x31cc66),_0x2e81dd=_0x1715dc%0x10*_0x346ac9,_0x4f3b4c=Math['floor'](_0x1715dc/0x10)*_0x29c77e,_0x38aa95=Math[_0x2bdaf3(0x254)](Math[_0x2bdaf3(0x300)](_0x17ea63-_0x7bc1ba,0x0)/0x2),_0x103386=Math['floor'](Math[_0x2bdaf3(0x300)](_0x31cc66-_0x7bc1ba,0x0)/0x2);_0x2119cd[_0x2bdaf3(0x1af)](_0xd085b6,_0x2e81dd,_0x4f3b4c,_0x346ac9,_0x29c77e,_0x38aa95,_0x103386,_0x7bc1ba,_0x7bc1ba);},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x151)]=function(_0x4ae711){const _0x5eaa6b=_0x117212,_0x493fae=this[_0x5eaa6b(0x2c4)](),_0x38d42d=this[_0x5eaa6b(0x1e2)](),_0x5b3713=Math['min'](_0x493fae,_0x38d42d);this[_0x5eaa6b(0x18b)][_0x5eaa6b(0x2ff)]=new Bitmap(_0x493fae,_0x38d42d);const _0x292228=this[_0x5eaa6b(0x18b)][_0x5eaa6b(0x2ff)],_0x6b991e=this[_0x5eaa6b(0x306)][_0x5eaa6b(0x134)](/\$/i),_0x48ff13=_0x6b991e?0x1:ImageManager['svActorHorzCells'],_0x716762=_0x6b991e?0x1:ImageManager[_0x5eaa6b(0x135)],_0x279351=_0x4ae711[_0x5eaa6b(0x2df)]/_0x48ff13,_0x16a572=_0x4ae711['height']/_0x716762,_0x1682dd=Math[_0x5eaa6b(0x2b8)](0x1,_0x5b3713/_0x279351,_0x5b3713/_0x16a572),_0x5d7f0a=_0x279351*_0x1682dd,_0x1a8701=_0x16a572*_0x1682dd,_0x5561cd=Math[_0x5eaa6b(0x16d)]((_0x493fae-_0x5d7f0a)/0x2),_0x4e29f8=Math[_0x5eaa6b(0x16d)]((_0x38d42d-_0x1a8701)/0x2);_0x292228[_0x5eaa6b(0x1af)](_0x4ae711,0x0,0x0,_0x279351,_0x16a572,_0x5561cd,_0x4e29f8,_0x5d7f0a,_0x1a8701);},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x1e4)]=function(_0x5170a7){const _0x18d66b=_0x117212,_0x192c4b=Window_CTB_TurnOrder[_0x18d66b(0x1b8)],_0x4d1f0d=this[_0x18d66b(0x2c4)](),_0xa7ceaa=this[_0x18d66b(0x1e2)](),_0x1cf177=Math[_0x18d66b(0x2b8)](_0x4d1f0d,_0xa7ceaa);this[_0x18d66b(0x18b)][_0x18d66b(0x2ff)]=new Bitmap(_0x4d1f0d,_0xa7ceaa);const _0x1c7132=this[_0x18d66b(0x18b)][_0x18d66b(0x2ff)],_0x575c0d=Math[_0x18d66b(0x2b8)](0x1,_0x1cf177/_0x5170a7[_0x18d66b(0x2df)],_0x1cf177/_0x5170a7['height']),_0x35edcc=_0x5170a7[_0x18d66b(0x2df)]*_0x575c0d,_0x3c09ba=_0x5170a7[_0x18d66b(0x1fa)]*_0x575c0d,_0x13c8e4=Math[_0x18d66b(0x16d)]((_0x4d1f0d-_0x35edcc)/0x2),_0x462f09=Math['round']((_0xa7ceaa-_0x3c09ba)/0x2);_0x1c7132[_0x18d66b(0x1af)](_0x5170a7,0x0,0x0,_0x5170a7['width'],_0x5170a7[_0x18d66b(0x1fa)],_0x13c8e4,_0x462f09,_0x35edcc,_0x3c09ba);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x117212(0x175)]=function(){const _0x43aa44=_0x117212,_0x378177=this[_0x43aa44(0x21a)]();if(!_0x378177)return;if(!_0x378177[_0x43aa44(0x1b4)]())return;if(this[_0x43aa44(0x1f0)]===_0x378177[_0x43aa44(0x2a7)]())return;this[_0x43aa44(0x1f0)]=_0x378177['battlerHue']();if(_0x378177['hasSvBattler']())this[_0x43aa44(0x1f0)]=0x0;this[_0x43aa44(0x18b)][_0x43aa44(0x11f)](this[_0x43aa44(0x1f0)]);},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x2d4)]=function(){const _0x490ecf=_0x117212;if(!this[_0x490ecf(0x259)])return;const _0x2be3c6=this['battler']();if(!_0x2be3c6)return;if(this['_letter']===_0x2be3c6[_0x490ecf(0x1ec)]&&this['_plural']===_0x2be3c6[_0x490ecf(0x2d3)])return;this[_0x490ecf(0x1ec)]=_0x2be3c6['_letter'],this[_0x490ecf(0x2d3)]=_0x2be3c6[_0x490ecf(0x2d3)];const _0xdac96=Window_CTB_TurnOrder[_0x490ecf(0x1b8)],_0x334186=this[_0x490ecf(0x2f2)](),_0x57d79b=this[_0x490ecf(0x2c4)](),_0x3be4c2=this['bitmapHeight'](),_0x5dc9cb=this[_0x490ecf(0x259)]['bitmap'];_0x5dc9cb[_0x490ecf(0x214)]();if(!this[_0x490ecf(0x2d3)])return;_0x5dc9cb['fontFace']=_0xdac96[_0x490ecf(0x289)]||$gameSystem[_0x490ecf(0x23e)](),_0x5dc9cb['fontSize']=_0xdac96['EnemyBattlerFontSize']||0x10;if(_0x334186){if(_0x490ecf(0x31a)===_0x490ecf(0x31a))_0x5dc9cb[_0x490ecf(0x294)](this[_0x490ecf(0x1ec)][_0x490ecf(0x2c8)](),0x0,_0x3be4c2/0x2,_0x57d79b,_0x3be4c2/0x2,_0x490ecf(0x288));else return this[_0x490ecf(0x255)]===_0x341c5d&&(this[_0x490ecf(0x255)]=this[_0x490ecf(0x322)]()),this[_0x490ecf(0x255)];}else'Kghro'!==_0x490ecf(0x1e6)?_0x5dc9cb[_0x490ecf(0x294)](this[_0x490ecf(0x1ec)][_0x490ecf(0x2c8)](),0x0,0x2,_0x57d79b-0x8,_0x3be4c2-0x4,_0x490ecf(0x17a)):_0x141baa[_0x490ecf(0x18e)]()?this[_0x490ecf(0x2bd)]():_0x5a4128['BattleSystemCTB'][_0x490ecf(0x22e)][_0x490ecf(0x225)](this);},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x1ce)]=function(){const _0x3fd691=_0x117212,_0xf6a20a=this['battler']();if(!_0xf6a20a)return;const _0x428ee3=_0xf6a20a[_0x3fd691(0x21a)]();if(!_0x428ee3)return;const _0x4cadae=_0x428ee3[_0x3fd691(0x284)]();if(!_0x4cadae)return;this[_0x3fd691(0x339)](_0x4cadae[_0x3fd691(0x165)]);},Sprite_CTB_TurnOrder_Battler[_0x117212(0x2f3)][_0x117212(0x292)]=function(){const _0x5a2e22=_0x117212;return this[_0x5a2e22(0x21a)]();},VisuMZ[_0x117212(0x20d)][_0x117212(0x2fa)]=Window_Help['prototype'][_0x117212(0x222)],Window_Help[_0x117212(0x2f3)][_0x117212(0x222)]=function(_0x3903fe){const _0x676406=_0x117212;BattleManager[_0x676406(0x18e)]()&&_0x3903fe&&_0x3903fe[_0x676406(0x1f8)]&&_0x3903fe[_0x676406(0x1f8)][_0x676406(0x134)](/<(?:CTB) HELP>\s*([\s\S]*)\s*<\/(?:CTB) HELP>/i)?this[_0x676406(0x14c)](String(RegExp['$1'])):VisuMZ[_0x676406(0x20d)][_0x676406(0x2fa)][_0x676406(0x225)](this,_0x3903fe);},VisuMZ[_0x117212(0x20d)][_0x117212(0x138)]=Window_StatusBase[_0x117212(0x2f3)][_0x117212(0x287)],Window_StatusBase[_0x117212(0x2f3)][_0x117212(0x287)]=function(_0x56f47d,_0x1203b3,_0x3b1047,_0x20e9fd){const _0x4f7283=_0x117212;if(BattleManager['isCTB']()&&_0x1203b3===_0x4f7283(0x152))return;VisuMZ['BattleSystemCTB'][_0x4f7283(0x138)][_0x4f7283(0x225)](this,_0x56f47d,_0x1203b3,_0x3b1047,_0x20e9fd);};function Window_CTB_TurnOrder(){this['initialize'](...arguments);}function _0x25bd(_0x1e7162,_0x590cec){const _0x3acbf9=_0x3acb();return _0x25bd=function(_0x25bd1c,_0x550c31){_0x25bd1c=_0x25bd1c-0x11d;let _0x11fc0e=_0x3acbf9[_0x25bd1c];return _0x11fc0e;},_0x25bd(_0x1e7162,_0x590cec);}Window_CTB_TurnOrder['prototype']=Object[_0x117212(0x1e3)](Window_Base['prototype']),Window_CTB_TurnOrder[_0x117212(0x2f3)][_0x117212(0x1ae)]=Window_CTB_TurnOrder,Window_CTB_TurnOrder[_0x117212(0x1b8)]=VisuMZ[_0x117212(0x20d)][_0x117212(0x1b8)][_0x117212(0x244)],Window_CTB_TurnOrder[_0x117212(0x2f3)]['initialize']=function(){const _0x504f9b=_0x117212,_0xd820e4=this[_0x504f9b(0x1d3)]();this['_homeX']=_0xd820e4['x'],this['_homeY']=_0xd820e4['y'],Window_Base[_0x504f9b(0x2f3)][_0x504f9b(0x1f9)]['call'](this,_0xd820e4),this['createBattlerSprites'](),this[_0x504f9b(0x172)](),this[_0x504f9b(0x2b2)]=0x0;},Window_CTB_TurnOrder[_0x117212(0x2f3)][_0x117212(0x1d3)]=function(){const _0x4e127d=_0x117212,_0x5d07a8=Window_CTB_TurnOrder['Settings'],_0x1e1089=SceneManager[_0x4e127d(0x177)]['_statusWindow'][_0x4e127d(0x1fa)],_0x4be38d=SceneManager[_0x4e127d(0x177)][_0x4e127d(0x2e4)]['height'],_0x261416=_0x5d07a8[_0x4e127d(0x1c0)];let _0x1d8ef3=0x0,_0x32fa18=0x0,_0x339bce=0x0,_0x1f981b=0x0;switch(_0x5d07a8['DisplayPosition']){case'top':_0x1d8ef3=_0x5d07a8[_0x4e127d(0x1d5)]*_0x5d07a8[_0x4e127d(0x219)]+_0x261416,_0x32fa18=_0x5d07a8[_0x4e127d(0x2b5)],_0x339bce=Math[_0x4e127d(0x266)]((Graphics[_0x4e127d(0x2df)]-_0x1d8ef3)/0x2),_0x1f981b=_0x5d07a8[_0x4e127d(0x162)];break;case _0x4e127d(0x197):_0x1d8ef3=_0x5d07a8[_0x4e127d(0x1d5)]*_0x5d07a8[_0x4e127d(0x219)]+_0x261416,_0x32fa18=_0x5d07a8[_0x4e127d(0x2b5)],_0x339bce=Math['ceil']((Graphics[_0x4e127d(0x2df)]-_0x1d8ef3)/0x2),_0x1f981b=Graphics[_0x4e127d(0x1fa)]-_0x1e1089-_0x32fa18-_0x5d07a8[_0x4e127d(0x162)];break;case _0x4e127d(0x251):_0x1d8ef3=_0x5d07a8[_0x4e127d(0x2b5)],_0x32fa18=_0x5d07a8[_0x4e127d(0x1d5)]*_0x5d07a8['TotalVertSprites']+_0x261416,_0x339bce=_0x5d07a8[_0x4e127d(0x162)],_0x1f981b=Math[_0x4e127d(0x266)]((Graphics[_0x4e127d(0x1fa)]-_0x1e1089+_0x4be38d-_0x32fa18)/0x2);break;case _0x4e127d(0x17a):_0x1d8ef3=_0x5d07a8[_0x4e127d(0x2b5)],_0x32fa18=_0x5d07a8[_0x4e127d(0x1d5)]*_0x5d07a8[_0x4e127d(0x155)]+_0x261416,_0x339bce=Graphics[_0x4e127d(0x2df)]-_0x1d8ef3-_0x5d07a8['ScreenBuffer'],_0x1f981b=Math['ceil']((Graphics[_0x4e127d(0x1fa)]-_0x1e1089+_0x4be38d-_0x32fa18)/0x2);break;}return _0x339bce+=_0x5d07a8['DisplayOffsetX'],_0x1f981b+=_0x5d07a8[_0x4e127d(0x2f0)],new Rectangle(_0x339bce,_0x1f981b,_0x1d8ef3,_0x32fa18);},Window_CTB_TurnOrder[_0x117212(0x2f3)]['updatePadding']=function(){const _0x1eb276=_0x117212;this[_0x1eb276(0x159)]=0x0;},Window_CTB_TurnOrder[_0x117212(0x2f3)]['isHorz']=function(){const _0x47425a=_0x117212,_0x38c7ab=Window_CTB_TurnOrder[_0x47425a(0x1b8)],_0x18fe2e=[_0x47425a(0x291),_0x47425a(0x197)]['includes'](_0x38c7ab[_0x47425a(0x122)]);return _0x18fe2e;},Window_CTB_TurnOrder[_0x117212(0x2f3)][_0x117212(0x2b3)]=function(){const _0x2d9f0e=_0x117212,_0x449340=Window_CTB_TurnOrder[_0x2d9f0e(0x1b8)],_0x67652f=this[_0x2d9f0e(0x2f2)](),_0x3ac564=_0x67652f?_0x449340[_0x2d9f0e(0x219)]:_0x449340[_0x2d9f0e(0x155)];this[_0x2d9f0e(0x320)]=new Sprite(),this['addInnerChild'](this[_0x2d9f0e(0x320)]),this[_0x2d9f0e(0x1bd)]=[];for(let _0x4b7fa1=0x0;_0x4b7fa1<$gameParty['maxBattleMembers']();_0x4b7fa1++){if('odBfO'!==_0x2d9f0e(0x1ab))for(let _0x439fd2=0x0;_0x439fd2<_0x3ac564;_0x439fd2++){const _0x164f00=new Sprite_CTB_TurnOrder_Battler($gameParty,_0x4b7fa1,_0x439fd2);this['_turnOrderInnerSprite'][_0x2d9f0e(0x235)](_0x164f00),this[_0x2d9f0e(0x1bd)][_0x2d9f0e(0x227)](_0x164f00);}else _0x340e86(_0x2d9f0e(0x127)['format'](_0x5becc7,_0x27ead7,_0x5727a2)),_0x3bf68c[_0x2d9f0e(0x2b7)]();}for(let _0x2ae67d=0x0;_0x2ae67d<0x8;_0x2ae67d++){if('kYKaT'===_0x2d9f0e(0x252))for(let _0x1cac23=0x0;_0x1cac23<_0x3ac564;_0x1cac23++){if(_0x2d9f0e(0x28e)!==_0x2d9f0e(0x215)){const _0x526d3b=new Sprite_CTB_TurnOrder_Battler($gameTroop,_0x2ae67d,_0x1cac23);this[_0x2d9f0e(0x320)]['addChild'](_0x526d3b),this[_0x2d9f0e(0x1bd)][_0x2d9f0e(0x227)](_0x526d3b);}else this[_0x2d9f0e(0x1ee)](_0x3cb340-_0x502815);}else!this[_0x2d9f0e(0x2a0)]()&&(this['_tpbIdleTime']+=this[_0x2d9f0e(0x1c1)]());}},Window_CTB_TurnOrder[_0x117212(0x2f3)][_0x117212(0x23a)]=function(){const _0x59a009=_0x117212;Window_Base['prototype'][_0x59a009(0x23a)]['call'](this),this['updatePosition'](),this[_0x59a009(0x172)]();},Window_CTB_TurnOrder[_0x117212(0x2f3)][_0x117212(0x2b1)]=function(){const _0x1bf49a=_0x117212,_0x128ca3=Window_CTB_TurnOrder[_0x1bf49a(0x1b8)];if(_0x128ca3[_0x1bf49a(0x122)]!==_0x1bf49a(0x291))return;if(!_0x128ca3[_0x1bf49a(0x26d)])return;const _0x3e2bc4=SceneManager[_0x1bf49a(0x177)][_0x1bf49a(0x2e4)];if(!_0x3e2bc4)return;_0x3e2bc4[_0x1bf49a(0x28f)]?(this['x']=this[_0x1bf49a(0x12b)]+(_0x128ca3['RepositionTopHelpX']||0x0),this['y']=this['_homeY']+(_0x128ca3[_0x1bf49a(0x1b2)]||0x0)):(this['x']=this['_homeX'],this['y']=this[_0x1bf49a(0x307)]);const _0x22b8bc=SceneManager[_0x1bf49a(0x177)][_0x1bf49a(0x154)];Window_CTB_TurnOrder[_0x1bf49a(0x2c7)]===undefined&&(Window_CTB_TurnOrder[_0x1bf49a(0x2c7)]=Math[_0x1bf49a(0x16d)]((Graphics['width']-Math[_0x1bf49a(0x2b8)](Graphics['boxWidth'],_0x22b8bc[_0x1bf49a(0x2df)]))/0x2),Window_CTB_TurnOrder[_0x1bf49a(0x247)]=Math[_0x1bf49a(0x16d)]((Graphics[_0x1bf49a(0x1fa)]-Math[_0x1bf49a(0x2b8)](Graphics[_0x1bf49a(0x2a5)],_0x22b8bc[_0x1bf49a(0x1fa)]))/0x2)),this['x']+=_0x22b8bc['x']-Window_CTB_TurnOrder['_ogWindowLayerX'],this['y']+=_0x22b8bc['y']-Window_CTB_TurnOrder[_0x1bf49a(0x247)];},Window_CTB_TurnOrder[_0x117212(0x2f3)][_0x117212(0x166)]=function(){const _0x5e4456=_0x117212;if(!this[_0x5e4456(0x320)])return;const _0x58fd85=this[_0x5e4456(0x320)][_0x5e4456(0x1e1)];if(!_0x58fd85)return;_0x58fd85[_0x5e4456(0x132)](this[_0x5e4456(0x2ce)]['bind'](this));},Window_CTB_TurnOrder[_0x117212(0x2f3)][_0x117212(0x2ce)]=function(_0x2f0ddb,_0x44d6db){const _0x58079e=_0x117212,_0x5033cc=this[_0x58079e(0x2f2)](),_0xe5a861=Window_CTB_TurnOrder[_0x58079e(0x1b8)][_0x58079e(0x190)];if(_0x5033cc&&!_0xe5a861)return _0x58079e(0x158)!==_0x58079e(0x158)?_0x3585ae(_0x54822b['$2']):_0x2f0ddb['x']-_0x44d6db['x'];else{if(_0x5033cc&&_0xe5a861){if('lPCSN'!==_0x58079e(0x156))return _0x44d6db['x']-_0x2f0ddb['x'];else this[_0x58079e(0x189)]==='charging'&&(this[_0x58079e(0x308)]+=this[_0x58079e(0x1c1)](),this[_0x58079e(0x308)]>=0x1&&this[_0x58079e(0x318)]());}else{if(!_0x5033cc&&_0xe5a861)return _0x2f0ddb['y']-_0x44d6db['y'];else{if(!_0x5033cc&&!_0xe5a861){if('qiPQh'!==_0x58079e(0x13b)){const _0x1a1d2a=this[_0x58079e(0x1f2)]()[_0x58079e(0x1f8)];if(_0x1a1d2a[_0x58079e(0x134)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x1a3ec5(_0x18b48a['$1']);return _0x362bf7[_0x58079e(0x1b8)][_0x58079e(0x1de)];}else return _0x44d6db['y']-_0x2f0ddb['y'];}}}}},Window_CTB_TurnOrder['prototype'][_0x117212(0x172)]=function(){const _0x21578a=_0x117212;this[_0x21578a(0x28f)]=$gameSystem[_0x21578a(0x1d7)]();},Window_CTB_TurnOrder[_0x117212(0x2f3)][_0x117212(0x20e)]=function(_0x3c8da6){const _0x3057ed=_0x117212;this[_0x3057ed(0x166)](),this[_0x3057ed(0x1bd)][_0x3057ed(0x132)]((_0x11480e,_0x440018)=>{const _0x43f4c6=_0x3057ed;if(_0x43f4c6(0x242)!==_0x43f4c6(0x242))this[_0x43f4c6(0x32f)](_0x31d3e4);else return _0x11480e[_0x43f4c6(0x2b9)]()-_0x440018[_0x43f4c6(0x2b9)]();});if(!_0x3c8da6)return;for(const _0x2b30f8 of this[_0x3057ed(0x1bd)]){if(!_0x2b30f8)continue;_0x2b30f8[_0x3057ed(0x23a)](),_0x2b30f8[_0x3057ed(0x1c2)]=0x0;}},Window_CTB_TurnOrder['prototype'][_0x117212(0x229)]=function(_0x5eecaa){const _0x3d7ad3=_0x117212;for(const _0x2471cc of this[_0x3d7ad3(0x1bd)]){if(_0x3d7ad3(0x2db)===_0x3d7ad3(0x149)){let _0x20feb2=this[_0x3d7ad3(0x2c4)](),_0x349f3c=this[_0x3d7ad3(0x1e2)](),_0x2f90f8=_0x33c9cb['BorderThickness'];_0x586aeb[_0x3d7ad3(0x2ff)]=new _0x36e8b7(_0x20feb2,_0x349f3c);const _0x1f1e18=_0x3d7ad3(0x25e),_0x12b50b=_0x103398[_0x3d7ad3(0x2d6)](_0x2be098['%1BorderColor'[_0x3d7ad3(0x258)](_0x404c66)]);_0x4d23a5[_0x3d7ad3(0x2ff)][_0x3d7ad3(0x297)](0x0,0x0,_0x20feb2,_0x349f3c,_0x1f1e18),_0x20feb2-=0x2,_0x349f3c-=0x2,_0x131ffd[_0x3d7ad3(0x2ff)]['fillRect'](0x1,0x1,_0x20feb2,_0x349f3c,_0x12b50b),_0x20feb2-=_0x2f90f8*0x2,_0x349f3c-=_0x2f90f8*0x2,_0x5ebfd3[_0x3d7ad3(0x2ff)]['fillRect'](0x1+_0x2f90f8,0x1+_0x2f90f8,_0x20feb2,_0x349f3c,_0x1f1e18),_0x20feb2-=0x2,_0x349f3c-=0x2,_0x2f90f8+=0x1,_0x2a6c81[_0x3d7ad3(0x2ff)]['clearRect'](0x1+_0x2f90f8,0x1+_0x2f90f8,_0x20feb2,_0x349f3c);}else{if(!_0x2471cc)continue;if(_0x2471cc['battler']()!==_0x5eecaa)continue;_0x2471cc[_0x3d7ad3(0x223)]();}}};function _0x3acb(){const _0xcb575a=['QxKrE','ARRAYJSON','clear','FPNnO','updateGraphic','LDWIJ','odGyC','TotalHorzSprites','battler','postEndActionCTB','acting','includes','BattlerRelativeSpeedJS','%1SystemBorder','Game_BattlerBase_appear','ARRAYSTR','setItem','rotateDupeNumber','isTpb','call','checkOpacity','push','QnnSt','rotateCTBSprite','startAction','createAllWindows','_ctbTurnOrderIconIndex','BattleManager_processTurn','Game_Battler_updateTpbCastTime','TpbAccelerationJS','%1BgColor2','%1BorderColor','applyCTBPenalty','tpbChargeTime','ParseItemNotetags','addChild','concat','mtJMq','msLKb','Visible','update','onBattleStart','updateTpbIdleTime','NUM','mainFontFace','loadSvEnemy','charging','isPassCTB','xJdFi','Sapfk','TurnOrder','Actor-%1-%2','%1BgColor1','_ogWindowLayerY','ARRAYSTRUCT','_tpbCastTime','processUpdateGraphic','version','BattleManager_startBattle','setCtbChargeTime','RWjJW','Ticks\x20to\x20Goal:\x20','Order','left','kYKaT','7491066xERXCs','floor','_ctbTurnOrderFaceName','isActor','MAX_SAFE_INTEGER','format','_letterSprite','ReHsZ','_positionTargetY','227645wodvlI','Elzfz','#000000','PJKJH','CtbTurnOrderActorIcon','clearTurnOrderCTBGraphics','Game_Action_applyGlobal','mDHal','rotateCTBSprites','initMembers','ceil','processTurn','isValid','TurnOrderCTBGraphicType','AiSVu','reduce','MIN_SAFE_INTEGER','RepositionTopForHelp','Game_Battler_tpbBaseSpeed','loadFace','FaceName','%1Mirror','_isAppeared','rOboS','ActorBattlerType','isDead','otherCtbChecksPassed','initTpbChargeTime','Cast','xvBXY','After','updateAllTpbBattlers','aTemg','ztdQj','battleEnd','_anti_CTB_SoftlockCount','VDsEs','Game_Battler_updateTpb','8ZVebrr','LAdRM','mainSprite','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20position\x20=\x20target.getCurrentTurnOrderPositionCTB();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20order\x20=\x20position;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(order)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20order\x20=\x20position;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20order;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','wFalU','placeGauge','center','EnemyBattlerFontFace','Game_Battler_initTpbChargeTime','Game_Battler_updateTpbIdleTime','pvweb','CTB','QpfRA','visible','4QiuSUY','top','getStateTooltipBattler','startFade','drawText','hasSvBattler','applyItemUserEffect','fillRect','Game_Battler_onRestrict','NMErC','svActorHorzCells','tpbRelativeSpeed','VisuMZ_0_CoreEngine','ytgyQ','30ONxMVL','updateTpb','canMove','createBorderSprite','jgvUc','FaceIndex','toUpperCase','boxHeight','_dupe','battlerHue','applyGlobal','_graphicIconIndex','currentAction','RdwwS','onRestrict','isSceneBattle','faceIndex','BattleManager_updateTurn','_isBattleOver','updatePosition','opacity','createBattlerSprites','updateTurnOrderCTB','SpriteLength','undecided','exit','min','ticksLeft','BDQgY','_position','NqSMQ','updateTpbCastTimeCTB','ctbHasInstantActionAfter','isAlive','changeCtbCastTime','attackSpeed','name','YeQeg','bitmapWidth','BRpad','speed','_ogWindowLayerX','trim','updateTpbChargeTime','_autoBattle','Game_BattlerBase_hide','createKeyJS','ParseSkillNotetags','compareBattlerSprites','_debutCTB','allBattleMembers','description','vruAK','_plural','updateLetter','setActionState','getColor','XTUYV','clamp','updateTpbChargeTimeCTB','Mechanics','afDTb','battleSys','changeTurnOrderByCTB','process_VisuMZ_BattleSystemCTB_JS_Notetags','width','process_VisuMZ_BattleSystemCTB_CreateRegExp','containerPosition','startActorInput','mwsiw','_helpWindow','Parse_Notetags_CreateJS','ARRAYNUM','_ctbTurnOrderFaceIndex','WjWan','UpdateFrames','ARRAYFUNC','BattleManager_endAction','faceHeight','Armor-%1-%2','Anti-CTB\x20Softlock\x20Count:','updateAllTpbBattlersCTB','DisplayOffsetY','ZudzP','isHorz','prototype','HIFLb','VisuMZ_1_BattleCore','3398570DnuTHy','IconIndex','preEndActionCTB','TklYb','Window_Help_setItem','setCtbAfterSpeed','wkRUz','SGkuc','CtbTurnOrderEnemyFace','bitmap','max','Class-%1-%2','initBattleSystemCTB','isSideView','clearTpbChargeTimeCTB','createBackgroundSprite','_graphicSv','_homeY','_tpbChargeTime','isPlaytest','BattleManager_updateAllTpbBattlers','TurnOrderCTBGraphicIconIndex','hucxP','getCurrentTurnOrderPositionCTB','KQRTG','Actor','ConvertParams','logCtbData','Weapon-%1-%2','UHphG','appear','faceWidth','%1SystemBg','Scene_Boot_onDatabaseLoaded','onTpbCharged','_actionState','bTqHH','eDWKg','isActiveTpb','_graphicFaceIndex','CtbTurnOrderActorFace','checkPosition','_turnOrderInnerSprite','628924TgqYuV','createTurnOrderCTBGraphicFaceName','updateTurn','DeviceFriendly','_backgroundSprite','PMVtK','2250909ELfHQg','removeBattleStates','OvAvy','setBattleSystemCTBTurnOrderVisible','Game_Battler_updateTpbChargeTime','isInputting','_positionTargetX','svactor','updateTpbBattler','processTurnOrderChangeCTB','checkCtbAntiSoftlock','getBattleSystem','createTurnOrderCTBGraphicIconIndex','CBCJa','initTpbChargeTimeCTB','_fadeDuration','_graphicEnemy','Enemy','setBlendColor','Game_Battler_applyTpbPenalty','removeCurrentAction','createTestBitmap','item','setHue','CtbTurnOrderClearActorGraphic','actor','DisplayPosition','getCtbCastTimeRate','processCtbAntiSoftlock','_subject','Actors','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','BorderThickness','filter','Item-%1-%2','_homeX','ActorBattlerIcon','boxWidth','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_unit','setTurnOrderCTB','OrvLd','sort','requestFauxAnimation','match','svActorVertCells','createChildren','%1PopupText','Window_StatusBase_placeGauge','Game_Battler_tpbSpeed','find','qiPQh','_graphicFaceName','SystemTurnOrderVisibility','setCtbCastTime','Fnout','applyTpbPenalty','ParseAllNotetags','ShvJi','createTurnOrderCTBGraphicType','anchor','State-%1-%2','MkLMk','FUNC','Effect','WQqSH','ready','battlerName','setText','faceName','Mzazt','casting','gqaVT','changeSvActorGraphicBitmap','time','bind','_windowLayer','TotalVertSprites','CuVxF','Scene_Battle_createAllWindows','wTAYu','padding','STRUCT','loadSvActor','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','clearStates','BattleManager_battleSys','isCtbCastingState','createTurnOrderCTBGraphicFaceIndex','tpbRequiredCastTime','ScreenBuffer','indexOf','repositionLogWindowCTB','_blendColor','updateBattleContainerOrder','yLPat','%1\x20%2\x20%3','TpbBaseSpeedCalcJS','isActing','createCTBTurnOrderWindow','(?:GAUGE|TIME|SPEED)','round','%1FlashDuration','%1FlashColor','endAction','Charge','updateVisibility','applyItemBattleSystemCTBUserEffect','DyBcq','updateGraphicHue','SSJaH','_scene','prepare','getChildIndex','right','Enemies','HzIRC','bIbhd','BattleManager_isActiveTpb','turn','createOrderJS','Game_Action_applyItemUserEffect','createRateJS','kkyWs','length','BattleManager_startActorInput','CtbTurnOrderEnemyIcon','_inputting','status','_tpbState','Game_Battler_tpbAcceleration','_graphicSprite','PcToS','ShowMarkerBorder','isCTB','EnemyBattlerFaceName','OrderDirection','addLoadListener','isAppeared','JSON','_onRestrictBypassCtbReset','RAMIh','TpbSpeedCalcJS','bottom','createInitialPositions','_index','RegExp','registerCommand','accvC','isAnyBattlerReadyCTB','Pnkrl','Game_Battler_tpbRequiredCastTime','face','parse','skills','_tpbTurnCount','6USVBkz','processTurnCTB','createGraphicSprite','yUztc','_fadeTarget','some','bebRY','xHFkq','updateTpbIdleTimeCTB','containerWindow','constructor','blt','csKmw','parameters','RepositionTopHelpY','_isAlive','isEnemy','ctbTicksToGoalAddedCastTime','BattleManager_isTpb','_phase','Settings','icon','_forcing','_actionBattlers','clearTpbChargeTime','_turnOrderContainer','%1AnimationID','hZirP','SubjectDistance','tpbAcceleration','_positionDuration','STR','hide','OrderJS','changeIconGraphicBitmap','members','EnemyBattlerType','ctbTicksToGoal','yiKqT','applyGlobalBattleSystemCTBEffects','RepositionLogWindow','changeCtbChargeTime','updateSelectionEffect','Game_Battler_tpbRelativeSpeed','EscapeFailPenalty','startBattle','loadEnemy','windowRect','AvmgA','SpriteThin','defaultPosition','isBattleSystemCTBTurnOrderVisible','onDatabaseLoaded','createLetterSprite','TurnOrderCTBGraphicFaceIndex','isRestricted','Game_System_initialize','_ctbTurnOrderVisible','EnemyBattlerIcon','TurnOrderCTBGraphicFaceName','iPlPf','children','bitmapHeight','create','changeEnemyGraphicBitmap','loadSystem','wWsgG','_ctbTurnOrderGraphicType','TwhPA','sYAmY','updateOpacity','KVLvz','_letter','_graphicType','onCtbOrderChange','mwKnQ','_graphicHue','isCommonEventReserved','enemy','ARRAYEVAL','DzbmN','417990QhGSOD','_ctbAfterSpeed','VcFer','note','initialize','height','ttFaN','MbMXf','_ctbTurnOrderWindow','changeFaceGraphicBitmap','XRWuv','_logWindow','bRSBF','svBattlerName','Game_Battler_clearTpbChargeTime','iconHeight','InitialGaugeJS','tpbSpeed','jmkCa','traitObjects','subject','updateTpbCastTime','rOzez','map','BattleSystemCTB','updateTurnOrder','1664590JVoNTz','uATpx','ctbStopped'];_0x3acb=function(){return _0xcb575a;};return _0x3acb();}