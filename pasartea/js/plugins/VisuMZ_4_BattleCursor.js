//=============================================================================
// VisuStella MZ - Battle Cursor
// VisuMZ_4_BattleCursor.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_BattleCursor = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleCursor = VisuMZ.BattleCursor || {};
VisuMZ.BattleCursor.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.01] [BattleCursor]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_Cursor_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin allows you to set custom cursors when selecting allies and/or
 * enemies for targeting while in battle. This is to help with better visual
 * cues when picking a target if the flashing battler isn't enough.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Use icons, pictures, or system images as battle cursors for selected
 *   actors and enemies.
 * * Decide on how the cursor is anchored and positioned with offsets to fine
 *   tune its location.
 * * Want to animate the cursor? You can do so by following a specific image
 *   format and name schema.
 * * Oscillate the cursor back and forth from a left to right horizontal bounce
 *   or an up to down vertical bounce. Or if you want, just don't have any kind
 *   of oscillation at all!
 * * Customize the battle cursor to appear differently for various actors
 *   and/or enemies through notetags!
 * * Alter the battle cursor mid-battle through Plugin Commands, too!
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Animated Battle Cursor Instructions
 * ============================================================================
 *
 * Save your animated picture into your game project's img/pictures/ folder or
 * the img/system/ folder depending on which you want to load from.
 * 
 * The filename must be named with the following format:
 *
 * filename[HxV]
 *
 * Replace H in the filename with the number of horizontal cells it has.
 * Replace V in the filename with the number of vertical cells it has.
 * The number of total cells it has available is equal the multiplicative
 * product of the horizontal and vertical cells.
 *
 * For example:
 *
 * "Cursor_Blue[3x2]" will have 3 horizontal cells and 2 vertical cells. This
 * means there are a total of 6 cells that will be used for animating.
 *
 * Animations will be played from left to right, then up to down so please
 * arrange them as such. For example, 4x5 will play like this:
 *
 *  1  2  3  4
 *  5  6  7  8
 *  9 10 11 12
 * 13 14 15 16
 * 17 18 19 20
 *
 * Keep this in mind as you format your animated battle selection cursors.
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
 * === Cursor Appearance-Related Notetags ===
 * 
 * ---
 *
 * <Battle Cursor Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the battle select cursor into the specific icon.
 * - Replace 'x' with the icon index you wish to use.
 *
 * ---
 *
 * <Battle Cursor Picture: filename>
 * <Battle Cursor System: filename>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the battle select cursor into the specific image.
 * - The 'Picture' variant loads images from img/pictures/.
 * - The 'System' variant loads images from img/system/.
 * - Replace 'filename' with the filename of the image found in the specific
 *   target folder.
 *   - Do not include the file extension.
 *
 * ---
 *
 * <Battle Cursor Frame Delay: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - If using a 'picture' or 'system' image that has the animated format, you
 *   can adjust how much delay there is between each animated frame.
 * - Replace 'x' with a number representing the delay between frames.
 *   Lower is faster. Higher is slower.
 *
 * ---
 * 
 * === Cursor Location-Related Notetags ===
 * 
 * ---
 *
 * <Battle Cursor Anchor X: Left>
 * <Battle Cursor Anchor X: Center>
 * <Battle Cursor Anchor X: Right>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the origin/anchor X location of the battle cursor sprite for
 *   this specific actor/enemy.
 * 
 * ---
 *
 * <Battle Cursor Anchor Y: Top>
 * <Battle Cursor Anchor Y: Middle>
 * <Battle Cursor Anchor Y: Bottom>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the origin/anchor Y location of the battle cursor sprite for
 *   this specific actor/enemy.
 *
 * ---
 *
 * <Battle Cursor Position X: Left>
 * <Battle Cursor Position X: Center>
 * <Battle Cursor Position X: Right>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the position X location of where the battle cursor sprite
 *   appears on the actor or enemy sprite when targeting them.
 * 
 * ---
 *
 * <Battle Cursor Position Y: Top>
 * <Battle Cursor Position Y: Middle>
 * <Battle Cursor Position Y: Bottom>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the position Y location of where the battle cursor sprite
 *   appears on the actor or enemy sprite when targeting them.
 *
 * ---
 *
 * <Battle Cursor Offset X: +x>
 * <Battle Cursor Offset X: -x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Offsets the X position of the battle cursor sprite by pixels.
 * - Replace 'x' with a number representing the pixels to offset the battle
 *   cursor sprite by.
 *   - Negative numbers go left.
 *   - Positive numbers go right.
 *
 * ---
 *
 * <Battle Cursor Offset Y: +y>
 * <Battle Cursor Offset Y: -y>
 *
 * - Used for: Actor, Enemy Notetags
 * - Offsets the Y position of the battle cursor sprite by pixels.
 * - Replace 'y' with a number representing the pixels to offset the battle
 *   cursor sprite by.
 *   - Negative numbers go up.
 *   - Positive numbers go down.
 *
 * ---
 *
 * === Cursor Wave-Related Notetags ===
 * 
 * ---
 *
 * <Battle Cursor No Wave>
 *
 * - Used for: Actor, Enemy Notetags
 * - Removes any oscillation from the battle cursor.
 *
 * ---
 *
 * <Battle Cursor Horizontal Wave: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - The battle cursor will oscillate back and forth horizontally from the
 *   left to the right.
 * - Replace 'x' with a number representing the pixel distance to oscillate.
 *
 * ---
 *
 * <Battle Cursor Vertical Wave: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - The battle cursor will oscillate back and forth vertically from the
 *   top to the bottom.
 * - Replace 'x' with a number representing the pixel distance to oscillate.
 *
 * ---
 *
 * <Battle Cursor Wave Speed: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Select how fast the cursor oscillates.
 * - Lower is slower. Higher is faster.
 * - Replace 'x' with a number representing the speed at which the cursor will
 *   oscillate at.
 * - Use decimal values between 0 and 1 for the best results.
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
 * === Battle Cursor Plugin Commands ===
 * 
 * ---
 *
 * Battle Cursor: Change Actor Cursor
 * - Change target actor's battle cursor settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Appearance Type:
 *   - Select the appearance type for the battle select cursor.
 *
 *     Icon Index:
 *     - If "icon" is selected as the appearance type, use this icon as
 *       the cursor.
 *
 *     Picture Filename:
 *     - If "picture" is selected as the appearance type, use this image from
 *       img/pictures/ as the cursor.
 *
 *     System Filename:
 *     - If "system" is selected as the appearance type, use this image from
 *       img/system/ as the cursor.
 *
 *     Frame Delay:
 *     - The frame delay for any animated "picture" or "system" cursors before
 *       moving onto the next frame.
 * 
 *   Anchor:
 *
 *     Anchor X:
 *     Anchor Y:
 *     - Select the position to determine where the cursor's Anchor
 *       is located.
 * 
 *   Position:
 *
 *     Position X:
 *     Position Y:
 *     - Select the placement to determine where the cursor's Position
 *       is located.
 * 
 *   Offset:
 * 
 *     Offset X:
 *     Offset Y:
 *     - Select how much to offset the cursor's X/Y position by.
 * 
 *   Wave:
 * 
 *     Wave Type:
 *     - Determine how the cursor moves while active.
 * 
 *     Speed:
 *     - Select how fast the cursor oscillates.
 *     - Lower is slower. Higher is faster.
 * 
 *     Distance:
 *     - Select how far the cursor sprite will oscillate from its origin.
 *
 * ---
 *
 * Battle Cursor: Change Party Member Cursor
 * - Change target party member's battle cursor settings.
 *
 *   Party Index(es):
 *   - Select which party member index(es) to affect.
 *
 *   Appearance Type:
 *   - Select the appearance type for the battle select cursor.
 *
 *     Icon Index:
 *     - If "icon" is selected as the appearance type, use this icon as
 *       the cursor.
 *
 *     Picture Filename:
 *     - If "picture" is selected as the appearance type, use this image from
 *       img/pictures/ as the cursor.
 *
 *     System Filename:
 *     - If "system" is selected as the appearance type, use this image from
 *       img/system/ as the cursor.
 *
 *     Frame Delay:
 *     - The frame delay for any animated "picture" or "system" cursors before
 *       moving onto the next frame.
 * 
 *   Anchor:
 *
 *     Anchor X:
 *     Anchor Y:
 *     - Select the position to determine where the cursor's Anchor
 *       is located.
 * 
 *   Position:
 *
 *     Position X:
 *     Position Y:
 *     - Select the placement to determine where the cursor's Position
 *       is located.
 * 
 *   Offset:
 * 
 *     Offset X:
 *     Offset Y:
 *     - Select how much to offset the cursor's X/Y position by.
 * 
 *   Wave:
 * 
 *     Wave Type:
 *     - Determine how the cursor moves while active.
 * 
 *     Speed:
 *     - Select how fast the cursor oscillates.
 *     - Lower is slower. Higher is faster.
 * 
 *     Distance:
 *     - Select how far the cursor sprite will oscillate from its origin.
 *
 * ---
 *
 * Battle Cursor: Change Enemy Member Cursor
 * - Change target enemy's battle cursor settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy troop index(es) to affect.
 *
 *   Appearance Type:
 *   - Select the appearance type for the battle select cursor.
 *
 *     Icon Index:
 *     - If "icon" is selected as the appearance type, use this icon as
 *       the cursor.
 *
 *     Picture Filename:
 *     - If "picture" is selected as the appearance type, use this image from
 *       img/pictures/ as the cursor.
 *
 *     System Filename:
 *     - If "system" is selected as the appearance type, use this image from
 *       img/system/ as the cursor.
 *
 *     Frame Delay:
 *     - The frame delay for any animated "picture" or "system" cursors before
 *       moving onto the next frame.
 * 
 *   Anchor:
 *
 *     Anchor X:
 *     Anchor Y:
 *     - Select the position to determine where the cursor's Anchor
 *       is located.
 * 
 *   Position:
 *
 *     Position X:
 *     Position Y:
 *     - Select the placement to determine where the cursor's Position
 *       is located.
 * 
 *   Offset:
 * 
 *     Offset X:
 *     Offset Y:
 *     - Select how much to offset the cursor's X/Y position by.
 * 
 *   Wave:
 * 
 *     Wave Type:
 *     - Determine how the cursor moves while active.
 * 
 *     Speed:
 *     - Select how fast the cursor oscillates.
 *     - Lower is slower. Higher is faster.
 * 
 *     Distance:
 *     - Select how far the cursor sprite will oscillate from its origin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor and Enemy Cursor Settings
 * ============================================================================
 *
 * These are the default battle select cursor settings for actors and enemies.
 * All actors will have the same settings as one another unless notetags are
 * used to customize their settings. The same goes for enemies.
 *
 * ---
 *
 * Appearance Type
 * 
 *   Appearance Type:
 *   - Select the appearance type for the battle select cursor.
 *     - Icon - Uses an icon as the cursor
 *     - Picture - Uses a file from img/pictures/ as the cursor
 *     - System - Uses a file from img/system/ as the cursor
 * 
 *   Icon Index:
 *   - If "icon" is selected as the appearance type, use this icon as
 *     the cursor.
 * 
 *   Picture Filename:
 *   - If "picture" is selected as the appearance type, use this image from
 *     img/pictures/ as the cursor.
 * 
 *   System Filename:
 *   - If "system" is selected as the appearance type, use this image from
 *     img/system/ as the cursor.
 * 
 *   Frame Delay:
 *   - The frame delay for any animated "picture" or "system" cursors before
 *     moving onto the next frame.
 *
 * ---
 *
 * Anchor
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Select the position to determine where the cursor's Anchor X/Y
 *     is located.
 *
 * ---
 *
 * Position
 * 
 *   Position X:
 *   Position Y:
 *   - Select the placement to determine where the cursor's Position X/Y
 *     is located.
 *
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   Offset Y:
 *   - Select how much to offset the cursor's X position by.
 *     - X: Negative numbers go left. Positive numbers go right.
 *     - Y: Negative numbers go up. Positive numbers go down.
 *
 * ---
 *
 * Wave
 * 
 *   Wave Type:
 *   - Determine how the cursor moves while active.
 *     - Horizontal - Cursor oscillates left and right
 *     - Vertical - Cursor oscillates up and down
 *     - None - Cursor does not oscillate.
 * 
 *   Speed:
 *   - Select how fast the cursor oscillates.
 *   - Lower is slower. Higher is faster.
 * 
 *   Distance:
 *   - Select how far the cursor sprite will oscillate from its origin.
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
 * Version 1.01: March 19, 2021
 * * Bug Fixes!
 * ** When using the Battle Cursor for front view actors, the cursor no longer
 *    appears out of synch from the sprite positions in the battle status
 *    window area. Fix made by Irina.
 *
 * Version 1.00: January 8, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleCursorChangeActorSettings
 * @text Battle Cursor: Change Actor Cursor
 * @desc Change target actor's battle cursor settings.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg type:str
 * @text Appearance Type
 * @parent Appearance
 * @type select
 * @option Icon - Uses an icon as the cursor
 * @value icon
 * @option Picture - Uses a file from img/pictures/ as the cursor
 * @value picture
 * @option System - Uses a file from img/system/ as the cursor
 * @value system
 * @desc Select the appearance type for the battle select cursor.
 * @default icon
 *
 * @arg iconIndex:num
 * @text Icon Index
 * @parent type:str
 * @desc If "icon" is selected as the appearance type,
 * use this icon as the cursor.
 * @default 112
 *
 * @arg pictureFilename:str
 * @text Picture Filename
 * @parent type:str
 * @type file
 * @dir img/pictures/
 * @desc If "picture" is selected as the appearance type,
 * use this image from img/pictures/ as the cursor.
 * @default 
 *
 * @arg systemFilename:str
 * @text System Filename
 * @parent type:str
 * @type file
 * @dir img/system/
 * @desc If "system" is selected as the appearance type,
 * use this image from img/system/ as the cursor.
 * @default 
 *
 * @arg frameDelay:num
 * @text Frame Delay
 * @parent type:str
 * @desc The frame delay for any animated "picture" or "system"
 * cursors before moving onto the next frame.
 * @default 8
 * 
 * @arg Anchor
 *
 * @arg anchorX:str
 * @text Anchor X
 * @parent Anchor
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the position to determine where the cursor's
 * Anchor X is located.
 * @default right
 *
 * @arg anchorY:str
 * @text Anchor Y
 * @parent Anchor
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the position to determine where the cursor's
 * Anchor Y is located.
 * @default middle
 * 
 * @arg Position
 *
 * @arg positionX:str
 * @text Position X
 * @parent Position
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the placement to determine where the cursor's
 * Position X is located.
 * @default left
 *
 * @arg positionY:str
 * @text Position Y
 * @parent Position
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the placement to determine where the cursor's
 * Position Y is located.
 * @default middle
 * 
 * @arg Offset
 *
 * @arg offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Select how much to offset the cursor's X position by.
 * Negative numbers go left. Positive numbers go right.
 * @default +0
 *
 * @arg offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Select how much to offset the cursor's Y position by.
 * Negative numbers go up. Positive numbers go down.
 * @default +0
 * 
 * @arg Wave
 *
 * @arg waveType:str
 * @text Wave Type
 * @parent Wave
 * @type select
 * @option Horizontal - Cursor oscillates left and right
 * @value horz
 * @option Vertical - Cursor oscillates up and down
 * @value vert
 * @option None - Cursor does not oscillate.
 * @value none
 * @desc Determine how the cursor moves while active.
 * @default horz
 *
 * @arg waveSpeed:num
 * @text Speed
 * @parent Wave
 * @desc Select how fast the cursor oscillates.
 * Lower is slower. Higher is faster.
 * @default 0.05
 *
 * @arg waveDistance:num
 * @text Distance
 * @parent Wave
 * @type number
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleCursorChangePartySettings
 * @text Battle Cursor: Change Party Member Cursor
 * @desc Change target party member's battle cursor settings.
 *
 * @arg PartyIndex:arraynum
 * @text Party Index(es)
 * @type number[]
 * @desc Select which party member index(es) to affect.
 * @default ["0"]
 *
 * @arg type:str
 * @text Appearance Type
 * @parent Appearance
 * @type select
 * @option Icon - Uses an icon as the cursor
 * @value icon
 * @option Picture - Uses a file from img/pictures/ as the cursor
 * @value picture
 * @option System - Uses a file from img/system/ as the cursor
 * @value system
 * @desc Select the appearance type for the battle select cursor.
 * @default icon
 *
 * @arg iconIndex:num
 * @text Icon Index
 * @parent type:str
 * @desc If "icon" is selected as the appearance type,
 * use this icon as the cursor.
 * @default 112
 *
 * @arg pictureFilename:str
 * @text Picture Filename
 * @parent type:str
 * @type file
 * @dir img/pictures/
 * @desc If "picture" is selected as the appearance type,
 * use this image from img/pictures/ as the cursor.
 * @default 
 *
 * @arg systemFilename:str
 * @text System Filename
 * @parent type:str
 * @type file
 * @dir img/system/
 * @desc If "system" is selected as the appearance type,
 * use this image from img/system/ as the cursor.
 * @default 
 *
 * @arg frameDelay:num
 * @text Frame Delay
 * @parent type:str
 * @desc The frame delay for any animated "picture" or "system"
 * cursors before moving onto the next frame.
 * @default 8
 * 
 * @arg Anchor
 *
 * @arg anchorX:str
 * @text Anchor X
 * @parent Anchor
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the position to determine where the cursor's
 * Anchor X is located.
 * @default right
 *
 * @arg anchorY:str
 * @text Anchor Y
 * @parent Anchor
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the position to determine where the cursor's
 * Anchor Y is located.
 * @default middle
 * 
 * @arg Position
 *
 * @arg positionX:str
 * @text Position X
 * @parent Position
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the placement to determine where the cursor's
 * Position X is located.
 * @default left
 *
 * @arg positionY:str
 * @text Position Y
 * @parent Position
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the placement to determine where the cursor's
 * Position Y is located.
 * @default middle
 * 
 * @arg Offset
 *
 * @arg offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Select how much to offset the cursor's X position by.
 * Negative numbers go left. Positive numbers go right.
 * @default +0
 *
 * @arg offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Select how much to offset the cursor's Y position by.
 * Negative numbers go up. Positive numbers go down.
 * @default +0
 * 
 * @arg Wave
 *
 * @arg waveType:str
 * @text Wave Type
 * @parent Wave
 * @type select
 * @option Horizontal - Cursor oscillates left and right
 * @value horz
 * @option Vertical - Cursor oscillates up and down
 * @value vert
 * @option None - Cursor does not oscillate.
 * @value none
 * @desc Determine how the cursor moves while active.
 * @default horz
 *
 * @arg waveSpeed:num
 * @text Speed
 * @parent Wave
 * @desc Select how fast the cursor oscillates.
 * Lower is slower. Higher is faster.
 * @default 0.05
 *
 * @arg waveDistance:num
 * @text Distance
 * @parent Wave
 * @type number
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleCursorChangeEnemySettings
 * @text Battle Cursor: Change Enemy Member Cursor
 * @desc Change target enemy's battle cursor settings.
 * In-battle only!
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy troop index(es) to affect.
 * @default ["0"]
 *
 * @arg type:str
 * @text Appearance Type
 * @parent Appearance
 * @type select
 * @option Icon - Uses an icon as the cursor
 * @value icon
 * @option Picture - Uses a file from img/pictures/ as the cursor
 * @value picture
 * @option System - Uses a file from img/system/ as the cursor
 * @value system
 * @desc Select the appearance type for the battle select cursor.
 * @default icon
 *
 * @arg iconIndex:num
 * @text Icon Index
 * @parent type:str
 * @desc If "icon" is selected as the appearance type,
 * use this icon as the cursor.
 * @default 112
 *
 * @arg pictureFilename:str
 * @text Picture Filename
 * @parent type:str
 * @type file
 * @dir img/pictures/
 * @desc If "picture" is selected as the appearance type,
 * use this image from img/pictures/ as the cursor.
 * @default 
 *
 * @arg systemFilename:str
 * @text System Filename
 * @parent type:str
 * @type file
 * @dir img/system/
 * @desc If "system" is selected as the appearance type,
 * use this image from img/system/ as the cursor.
 * @default 
 *
 * @arg frameDelay:num
 * @text Frame Delay
 * @parent type:str
 * @desc The frame delay for any animated "picture" or "system"
 * cursors before moving onto the next frame.
 * @default 8
 * 
 * @arg Anchor
 *
 * @arg anchorX:str
 * @text Anchor X
 * @parent Anchor
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the position to determine where the cursor's
 * Anchor X is located.
 * @default right
 *
 * @arg anchorY:str
 * @text Anchor Y
 * @parent Anchor
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the position to determine where the cursor's
 * Anchor Y is located.
 * @default middle
 * 
 * @arg Position
 *
 * @arg positionX:str
 * @text Position X
 * @parent Position
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the placement to determine where the cursor's
 * Position X is located.
 * @default left
 *
 * @arg positionY:str
 * @text Position Y
 * @parent Position
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the placement to determine where the cursor's
 * Position Y is located.
 * @default middle
 * 
 * @arg Offset
 *
 * @arg offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Select how much to offset the cursor's X position by.
 * Negative numbers go left. Positive numbers go right.
 * @default +0
 *
 * @arg offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Select how much to offset the cursor's Y position by.
 * Negative numbers go up. Positive numbers go down.
 * @default +0
 * 
 * @arg Wave
 *
 * @arg waveType:str
 * @text Wave Type
 * @parent Wave
 * @type select
 * @option Horizontal - Cursor oscillates left and right
 * @value horz
 * @option Vertical - Cursor oscillates up and down
 * @value vert
 * @option None - Cursor does not oscillate.
 * @value none
 * @desc Determine how the cursor moves while active.
 * @default horz
 *
 * @arg waveSpeed:num
 * @text Speed
 * @parent Wave
 * @desc Select how fast the cursor oscillates.
 * Lower is slower. Higher is faster.
 * @default 0.05
 *
 * @arg waveDistance:num
 * @text Distance
 * @parent Wave
 * @type number
 * @min 1
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
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
 * @param BattleCursor
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ActorCursor:struct
 * @text Actor Cursor
 * @type struct<BattleCursor>
 * @desc Default battle select cursor settings for actors.
 * @default {"type:str":"icon","iconIndex:num":"112","pictureFilename:str":"","systemFilename:str":"","frameDelay:num":"8","Anchor":"","anchorX:str":"right","anchorY:str":"middle","Position":"","positionX:str":"left","positionY:str":"middle","Offset":"","offsetX:num":"+0","offsetY:num":"+0","Wave":"","waveType:str":"horz","waveSpeed:num":"0.05","waveDistance:num":"10"}
 *
 * @param EnemyCursor:struct
 * @text Enemy Cursor
 * @type struct<BattleCursor>
 * @desc Default battle select cursor settings for enemies.
 * @default {"type:str":"icon","iconIndex:num":"112","pictureFilename:str":"","systemFilename:str":"","frameDelay:num":"8","Anchor":"","anchorX:str":"right","anchorY:str":"middle","Position":"","positionX:str":"left","positionY:str":"middle","Offset":"","offsetX:num":"+0","offsetY:num":"+0","Wave":"","waveType:str":"horz","waveSpeed:num":"0.05","waveDistance:num":"10"}
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
 * BattleCursor Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleCursor:
 *
 * @param type:str
 * @text Appearance Type
 * @parent Appearance
 * @type select
 * @option Icon - Uses an icon as the cursor
 * @value icon
 * @option Picture - Uses a file from img/pictures/ as the cursor
 * @value picture
 * @option System - Uses a file from img/system/ as the cursor
 * @value system
 * @desc Select the appearance type for the battle select cursor.
 * @default icon
 *
 * @param iconIndex:num
 * @text Icon Index
 * @parent type:str
 * @desc If "icon" is selected as the appearance type,
 * use this icon as the cursor.
 * @default 112
 *
 * @param pictureFilename:str
 * @text Picture Filename
 * @parent type:str
 * @type file
 * @dir img/pictures/
 * @desc If "picture" is selected as the appearance type,
 * use this image from img/pictures/ as the cursor.
 * @default 
 *
 * @param systemFilename:str
 * @text System Filename
 * @parent type:str
 * @type file
 * @dir img/system/
 * @desc If "system" is selected as the appearance type,
 * use this image from img/system/ as the cursor.
 * @default 
 *
 * @param frameDelay:num
 * @text Frame Delay
 * @parent type:str
 * @desc The frame delay for any animated "picture" or "system"
 * cursors before moving onto the next frame.
 * @default 8
 * 
 * @param Anchor
 *
 * @param anchorX:str
 * @text Anchor X
 * @parent Anchor
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the position to determine where the cursor's
 * Anchor X is located.
 * @default right
 *
 * @param anchorY:str
 * @text Anchor Y
 * @parent Anchor
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the position to determine where the cursor's
 * Anchor Y is located.
 * @default middle
 * 
 * @param Position
 *
 * @param positionX:str
 * @text Position X
 * @parent Position
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the placement to determine where the cursor's
 * Position X is located.
 * @default left
 *
 * @param positionY:str
 * @text Position Y
 * @parent Position
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the placement to determine where the cursor's
 * Position Y is located.
 * @default middle
 * 
 * @param Offset
 *
 * @param offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Select how much to offset the cursor's X position by.
 * Negative numbers go left. Positive numbers go right.
 * @default +0
 *
 * @param offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Select how much to offset the cursor's Y position by.
 * Negative numbers go up. Positive numbers go down.
 * @default +0
 * 
 * @param Wave
 *
 * @param waveType:str
 * @text Wave Type
 * @parent Wave
 * @type select
 * @option Horizontal - Cursor oscillates left and right
 * @value horz
 * @option Vertical - Cursor oscillates up and down
 * @value vert
 * @option None - Cursor does not oscillate.
 * @value none
 * @desc Determine how the cursor moves while active.
 * @default horz
 *
 * @param waveSpeed:num
 * @text Speed
 * @parent Wave
 * @desc Select how fast the cursor oscillates.
 * Lower is slower. Higher is faster.
 * @default 0.05
 *
 * @param waveDistance:num
 * @text Distance
 * @parent Wave
 * @type number
 * @min 1
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
 *
 */
//=============================================================================

const _0xdb2b=['%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','picture','initialize','call','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','updateOpacity','updateFrameIcon','initMembers','middle','offsetY','iconWidth','_enemySprites','anchor','iconIndex','updateAnchor','parse','positionY','bottom','updateFrameColsRows','max','3gYqtTQ','ConvertParams','systemFilename','ActorIDs','width','return\x200','parent','_frameRows','positionX','frameDelay','iconHeight','updateFrame','840683nTJdiH','prototype','updatePosition','106iKzAWR','EnemyIndex','457097egBwDp','ARRAYSTR','map','1766bMpZsg','ActorCursor','17077mpIifk','match','_actorSprites','round','waveSpeed','description','updateBattler','createBattleFieldContainer','PartyIndex','STR','toLowerCase','loadBitmap','top','isSideView','_settings','enemy','updateScale','setBase','Sprite_Actor_initMembers','isActor','filter','concat','917907HDChrr','exit','_battlerContainer','center','IconSet','actor','battleCursor','loadSystem','ARRAYSTRUCT','_battleCursorContainer','_battleCursorData','setFrame','anchorX','setBattler','type','applyBattleCursorNotetags','scale','cos','none','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','JSON','3745gXqyHr','Sprite_Battler_setBattler','EVAL','waveType','2118KnOGcc','makeDeepCopy','frameCount','offsetX','Spriteset_Battle_update','373sNJBzc','toUpperCase','BattleCursorChangeEnemySettings','ARRAYEVAL','ARRAYFUNC','_frameIndex','horz','adjustFlippedBattlefield','Spriteset_Battle_createBattleFieldContainer','_battleSelectCursorSprite','updateBattleCursorContainer','findTargetSprite','FUNC','_frameMax','updateWave','anchorY','determineFrameColsRows','BattleCursor','format','vert','status','loadPicture','_cache','left','addChild','update','isSelected','name','_scene','system','registerCommand','Sprite_Enemy_initMembers','opacity','_frameCols','note','trim','bitmap','floor','addLoadListener','STRUCT','45283PsANmV','isSceneBattle','icon','createBattleCursorData','setBattleCursor','_spriteset','updateBattleSelectCursor','waveDistance','_baseSprite','Settings','Spriteset_Battle_adjustFlippedBattlefield','right','includes','_battler','height','createBattleSelectCursor','constructor','BattleCursorChangePartySettings'];const _0x4874=function(_0x183192,_0xd20e40){_0x183192=_0x183192-0x197;let _0xdb2b9e=_0xdb2b[_0x183192];return _0xdb2b9e;};const _0x531484=_0x4874;(function(_0x22e655,_0x2351fb){const _0xeac7ed=_0x4874;while(!![]){try{const _0x241fc1=parseInt(_0xeac7ed(0x1fe))+parseInt(_0xeac7ed(0x1b8))+parseInt(_0xeac7ed(0x1a2))*-parseInt(_0xeac7ed(0x19b))+parseInt(_0xeac7ed(0x198))+parseInt(_0xeac7ed(0x1cd))*-parseInt(_0xeac7ed(0x1d6))+parseInt(_0xeac7ed(0x19d))*-parseInt(_0xeac7ed(0x224))+parseInt(_0xeac7ed(0x1a0))*parseInt(_0xeac7ed(0x1d1));if(_0x241fc1===_0x2351fb)break;else _0x22e655['push'](_0x22e655['shift']());}catch(_0x4a830b){_0x22e655['push'](_0x22e655['shift']());}}}(_0xdb2b,0xebd23));var label=_0x531484(0x1e7),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x531484(0x1b6)](function(_0x24f47f){const _0x4637d6=_0x531484;return _0x24f47f[_0x4637d6(0x1ea)]&&_0x24f47f[_0x4637d6(0x1a7)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x531484(0x207)]=VisuMZ[label][_0x531484(0x207)]||{},VisuMZ[_0x531484(0x225)]=function(_0x3886f4,_0x301b8f){const _0x1d3988=_0x531484;for(const _0xd2d76e in _0x301b8f){if(_0xd2d76e[_0x1d3988(0x1a3)](/(.*):(.*)/i)){const _0xb443cb=String(RegExp['$1']),_0xc44b29=String(RegExp['$2'])[_0x1d3988(0x1d7)]()['trim']();let _0x26bbb2,_0x303990,_0x33e1cf;switch(_0xc44b29){case'NUM':_0x26bbb2=_0x301b8f[_0xd2d76e]!==''?Number(_0x301b8f[_0xd2d76e]):0x0;break;case'ARRAYNUM':_0x303990=_0x301b8f[_0xd2d76e]!==''?JSON[_0x1d3988(0x21f)](_0x301b8f[_0xd2d76e]):[],_0x26bbb2=_0x303990['map'](_0x23d8a6=>Number(_0x23d8a6));break;case _0x1d3988(0x1cf):_0x26bbb2=_0x301b8f[_0xd2d76e]!==''?eval(_0x301b8f[_0xd2d76e]):null;break;case _0x1d3988(0x1d9):_0x303990=_0x301b8f[_0xd2d76e]!==''?JSON[_0x1d3988(0x21f)](_0x301b8f[_0xd2d76e]):[],_0x26bbb2=_0x303990[_0x1d3988(0x19f)](_0x339472=>eval(_0x339472));break;case _0x1d3988(0x1cc):_0x26bbb2=_0x301b8f[_0xd2d76e]!==''?JSON[_0x1d3988(0x21f)](_0x301b8f[_0xd2d76e]):'';break;case'ARRAYJSON':_0x303990=_0x301b8f[_0xd2d76e]!==''?JSON['parse'](_0x301b8f[_0xd2d76e]):[],_0x26bbb2=_0x303990[_0x1d3988(0x19f)](_0x37998f=>JSON[_0x1d3988(0x21f)](_0x37998f));break;case _0x1d3988(0x1e2):_0x26bbb2=_0x301b8f[_0xd2d76e]!==''?new Function(JSON['parse'](_0x301b8f[_0xd2d76e])):new Function(_0x1d3988(0x229));break;case _0x1d3988(0x1da):_0x303990=_0x301b8f[_0xd2d76e]!==''?JSON[_0x1d3988(0x21f)](_0x301b8f[_0xd2d76e]):[],_0x26bbb2=_0x303990['map'](_0xb460ee=>new Function(JSON['parse'](_0xb460ee)));break;case _0x1d3988(0x1ab):_0x26bbb2=_0x301b8f[_0xd2d76e]!==''?String(_0x301b8f[_0xd2d76e]):'';break;case _0x1d3988(0x19e):_0x303990=_0x301b8f[_0xd2d76e]!==''?JSON['parse'](_0x301b8f[_0xd2d76e]):[],_0x26bbb2=_0x303990[_0x1d3988(0x19f)](_0x13dd98=>String(_0x13dd98));break;case _0x1d3988(0x1fd):_0x33e1cf=_0x301b8f[_0xd2d76e]!==''?JSON[_0x1d3988(0x21f)](_0x301b8f[_0xd2d76e]):{},_0x26bbb2=VisuMZ[_0x1d3988(0x225)]({},_0x33e1cf);break;case _0x1d3988(0x1c0):_0x303990=_0x301b8f[_0xd2d76e]!==''?JSON[_0x1d3988(0x21f)](_0x301b8f[_0xd2d76e]):[],_0x26bbb2=_0x303990[_0x1d3988(0x19f)](_0x556621=>VisuMZ[_0x1d3988(0x225)]({},JSON[_0x1d3988(0x21f)](_0x556621)));break;default:continue;}_0x3886f4[_0xb443cb]=_0x26bbb2;}}return _0x3886f4;},(_0x395e35=>{const _0x4e2614=_0x531484,_0x4fe832=_0x395e35[_0x4e2614(0x1f1)];for(const _0x10c17b of dependencies){if(!Imported[_0x10c17b]){alert(_0x4e2614(0x214)[_0x4e2614(0x1e8)](_0x4fe832,_0x10c17b)),SceneManager[_0x4e2614(0x1b9)]();break;}}const _0x2070bf=_0x395e35[_0x4e2614(0x1a7)];if(_0x2070bf[_0x4e2614(0x1a3)](/\[Version[ ](.*?)\]/i)){const _0x2ad3ef=Number(RegExp['$1']);_0x2ad3ef!==VisuMZ[label]['version']&&(alert(_0x4e2614(0x210)[_0x4e2614(0x1e8)](_0x4fe832,_0x2ad3ef)),SceneManager[_0x4e2614(0x1b9)]());}if(_0x2070bf[_0x4e2614(0x1a3)](/\[Tier[ ](\d+)\]/i)){const _0x2830cd=Number(RegExp['$1']);_0x2830cd<tier?(alert(_0x4e2614(0x1cb)[_0x4e2614(0x1e8)](_0x4fe832,_0x2830cd,tier)),SceneManager[_0x4e2614(0x1b9)]()):tier=Math[_0x4e2614(0x223)](_0x2830cd,tier);}VisuMZ[_0x4e2614(0x225)](VisuMZ[label]['Settings'],_0x395e35['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData[_0x531484(0x1f1)],'BattleCursorChangeActorSettings',_0x587c37=>{const _0x1916c7=_0x531484;VisuMZ[_0x1916c7(0x225)](_0x587c37,_0x587c37);const _0x18be6a=JsonEx[_0x1916c7(0x1d2)](_0x587c37);_0x18be6a[_0x1916c7(0x227)]=undefined;const _0x134039=_0x587c37[_0x1916c7(0x227)][_0x1916c7(0x19f)](_0x145b1b=>$gameActors[_0x1916c7(0x1bd)](_0x145b1b));for(const _0x281c06 of _0x134039){if(!_0x281c06)continue;_0x281c06[_0x1916c7(0x202)](_0x18be6a);if(SceneManager[_0x1916c7(0x1ff)]()){const _0x437c9=SceneManager[_0x1916c7(0x1f2)];if(!_0x437c9)continue;const _0x2d9a07=_0x437c9[_0x1916c7(0x203)];if(!_0x2d9a07)continue;const _0x223bc4=_0x2d9a07['findTargetSprite'](_0x281c06);if(_0x223bc4)_0x223bc4[_0x1916c7(0x204)]();}}}),PluginManager[_0x531484(0x1f4)](pluginData[_0x531484(0x1f1)],_0x531484(0x20f),_0x2374f7=>{const _0x5796ee=_0x531484;VisuMZ[_0x5796ee(0x225)](_0x2374f7,_0x2374f7);const _0x38f416=JsonEx[_0x5796ee(0x1d2)](_0x2374f7);_0x38f416[_0x5796ee(0x1aa)]=undefined;const _0x4cdc05=_0x2374f7['PartyIndex'][_0x5796ee(0x19f)](_0x21f626=>$gameParty['members']()[_0x21f626]);for(const _0x1cf12b of _0x4cdc05){if(!_0x1cf12b)continue;_0x1cf12b[_0x5796ee(0x202)](_0x38f416);if(SceneManager[_0x5796ee(0x1ff)]()){const _0x5b6605=SceneManager[_0x5796ee(0x1f2)];if(!_0x5b6605)continue;const _0x5d14aa=_0x5b6605['_spriteset'];if(!_0x5d14aa)continue;const _0x57ba60=_0x5d14aa[_0x5796ee(0x1e1)](_0x1cf12b);if(_0x57ba60)_0x57ba60[_0x5796ee(0x204)]();}}}),PluginManager[_0x531484(0x1f4)](pluginData[_0x531484(0x1f1)],_0x531484(0x1d8),_0x5e54e7=>{const _0x3f6e82=_0x531484;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x3f6e82(0x225)](_0x5e54e7,_0x5e54e7);const _0x5fee83=JsonEx[_0x3f6e82(0x1d2)](_0x5e54e7);_0x5fee83[_0x3f6e82(0x19c)]=undefined;const _0xc4d1ad=_0x5e54e7[_0x3f6e82(0x19c)][_0x3f6e82(0x19f)](_0x323b98=>$gameTroop['members']()[_0x323b98]);for(const _0x38d08a of _0xc4d1ad){if(!_0x38d08a)continue;_0x38d08a[_0x3f6e82(0x202)](_0x5fee83);if(SceneManager[_0x3f6e82(0x1ff)]()){const _0x2ad2f7=SceneManager[_0x3f6e82(0x1f2)];if(!_0x2ad2f7)continue;const _0x55d32b=_0x2ad2f7[_0x3f6e82(0x203)];if(!_0x55d32b)continue;const _0x897277=_0x55d32b['findTargetSprite'](_0x38d08a);if(_0x897277)_0x897277[_0x3f6e82(0x204)]();}}}),SceneManager[_0x531484(0x1ff)]=function(){const _0x163fa4=_0x531484;return this[_0x163fa4(0x1f2)]&&this[_0x163fa4(0x1f2)]['constructor']===Scene_Battle;},Game_BattlerBase[_0x531484(0x199)]['battleCursor']=function(){const _0x33f63f=_0x531484;return!this[_0x33f63f(0x1c2)]&&this['createBattleCursorData'](),this['_battleCursorData'];},Game_BattlerBase[_0x531484(0x199)]['createBattleCursorData']=function(){const _0x2ccf4c=_0x531484;this[_0x2ccf4c(0x1c2)]={'type':_0x2ccf4c(0x200),'iconIndex':0x70,'pictureFilename':'','systemFilename':'','frameDelay':0xf4240,'anchorX':_0x2ccf4c(0x209),'anchorY':_0x2ccf4c(0x218),'positionX':_0x2ccf4c(0x1ed),'positionY':_0x2ccf4c(0x218),'offsetX':0x0,'offsetY':0x0,'waveType':_0x2ccf4c(0x1dc),'waveSpeed':0.05,'waveDistance':0xa};},Game_BattlerBase[_0x531484(0x199)]['setBattleCursor']=function(_0xbf02da){this['_battleCursorData']=_0xbf02da;},Game_Battler['prototype']['applyBattleCursorNotetags']=function(_0x508c78){const _0x528ebe=_0x531484;if(!_0x508c78)return;const _0x13fdd1=this[_0x528ebe(0x1c2)];_0x508c78[_0x528ebe(0x1a3)](/<BATTLE (?:SELECT CURSOR|CURSOR) ICON:[ ](.*)>/i)&&(this[_0x528ebe(0x1c2)]['type']=_0x528ebe(0x200),this[_0x528ebe(0x1c2)]['iconIndex']=Number(RegExp['$1']));_0x508c78[_0x528ebe(0x1a3)](/<BATTLE (?:SELECT CURSOR|CURSOR) PICTURE:[ ](.*)>/i)&&(this[_0x528ebe(0x1c2)][_0x528ebe(0x1c6)]='picture',this[_0x528ebe(0x1c2)]['pictureFilename']=String(RegExp['$1'])[_0x528ebe(0x1f9)]());_0x508c78[_0x528ebe(0x1a3)](/<BATTLE (?:SELECT CURSOR|CURSOR) SYSTEM:[ ](.*)>/i)&&(this[_0x528ebe(0x1c2)][_0x528ebe(0x1c6)]=_0x528ebe(0x1f3),this[_0x528ebe(0x1c2)][_0x528ebe(0x226)]=String(RegExp['$1'])[_0x528ebe(0x1f9)]());_0x508c78[_0x528ebe(0x1a3)](/<BATTLE (?:SELECT CURSOR|CURSOR) FRAME DELAY:[ ](.*)>/i)&&(this[_0x528ebe(0x1c2)][_0x528ebe(0x22d)]=Number(RegExp['$1']));if(_0x508c78[_0x528ebe(0x1a3)](/<BATTLE (?:SELECT CURSOR|CURSOR) ANCHOR X:[ ](.*)>/i)){const _0x5e9ad1=String(RegExp['$1'])['toLowerCase']()[_0x528ebe(0x1f9)]();[_0x528ebe(0x1ed),_0x528ebe(0x1bb),'right']['includes'](_0x5e9ad1)&&(this[_0x528ebe(0x1c2)][_0x528ebe(0x1c4)]=_0x5e9ad1);}if(_0x508c78['match'](/<BATTLE (?:SELECT CURSOR|CURSOR) ANCHOR Y:[ ](.*)>/i)){const _0x27b11a=String(RegExp['$1'])[_0x528ebe(0x1ac)]()[_0x528ebe(0x1f9)]();[_0x528ebe(0x1ae),_0x528ebe(0x218),_0x528ebe(0x221)][_0x528ebe(0x20a)](_0x27b11a)&&(this[_0x528ebe(0x1c2)][_0x528ebe(0x1e5)]=_0x27b11a);}if(_0x508c78[_0x528ebe(0x1a3)](/<BATTLE (?:SELECT CURSOR|CURSOR) POSITION X:[ ](.*)>/i)){const _0x1b658d=String(RegExp['$1'])[_0x528ebe(0x1ac)]()[_0x528ebe(0x1f9)]();[_0x528ebe(0x1ed),_0x528ebe(0x1bb),'right'][_0x528ebe(0x20a)](_0x1b658d)&&(this[_0x528ebe(0x1c2)][_0x528ebe(0x22c)]=_0x1b658d);}if(_0x508c78[_0x528ebe(0x1a3)](/<BATTLE (?:SELECT CURSOR|CURSOR) POSITION Y:[ ](.*)>/i)){const _0x29e41a=String(RegExp['$1'])[_0x528ebe(0x1ac)]()[_0x528ebe(0x1f9)]();['top',_0x528ebe(0x218),_0x528ebe(0x221)][_0x528ebe(0x20a)](_0x29e41a)&&(this[_0x528ebe(0x1c2)]['positionY']=_0x29e41a);}_0x508c78['match'](/<BATTLE (?:SELECT CURSOR|CURSOR) OFFSET X:[ ](.*)>/i)&&(this[_0x528ebe(0x1c2)][_0x528ebe(0x1d4)]=Number(RegExp['$1'])),_0x508c78[_0x528ebe(0x1a3)](/<BATTLE (?:SELECT CURSOR|CURSOR) OFFSET Y:[ ](.*)>/i)&&(this['_battleCursorData'][_0x528ebe(0x219)]=Number(RegExp['$1'])),_0x508c78[_0x528ebe(0x1a3)](/<BATTLE (?:SELECT CURSOR|CURSOR) (?:NO|NONE) WAVE>/i)&&(this[_0x528ebe(0x1c2)][_0x528ebe(0x1d0)]=_0x528ebe(0x1ca),this[_0x528ebe(0x1c2)][_0x528ebe(0x205)]=0x1),_0x508c78[_0x528ebe(0x1a3)](/<BATTLE (?:SELECT CURSOR|CURSOR) (?:HORZ|HORIZONTAL) WAVE:[ ](.*)>/i)&&(this[_0x528ebe(0x1c2)]['waveType']=_0x528ebe(0x1dc),this['_battleCursorData'][_0x528ebe(0x205)]=Number(RegExp['$1'])),_0x508c78[_0x528ebe(0x1a3)](/<BATTLE (?:SELECT CURSOR|CURSOR) (?:VERT|VERTICAL) WAVE:[ ](.*)>/i)&&(this[_0x528ebe(0x1c2)]['waveType']='vert',this[_0x528ebe(0x1c2)][_0x528ebe(0x205)]=Number(RegExp['$1'])),_0x508c78[_0x528ebe(0x1a3)](/<BATTLE (?:SELECT CURSOR|CURSOR) WAVE SPEED:[ ](.*)>/i)&&(this['_battleCursorData'][_0x528ebe(0x1a6)]=Number(RegExp['$1'])),this[_0x528ebe(0x1c2)][_0x528ebe(0x22d)]=Math[_0x528ebe(0x223)](0x1,this[_0x528ebe(0x1c2)][_0x528ebe(0x22d)]),this[_0x528ebe(0x1c2)][_0x528ebe(0x1c6)]===_0x528ebe(0x200)&&(this[_0x528ebe(0x1c2)][_0x528ebe(0x22d)]=0x186a0);},Game_Actor[_0x531484(0x199)][_0x531484(0x201)]=function(){const _0x1583d4=_0x531484;this[_0x1583d4(0x1c2)]=JsonEx['makeDeepCopy'](VisuMZ[_0x1583d4(0x1e7)][_0x1583d4(0x207)][_0x1583d4(0x1a1)]),this[_0x1583d4(0x1c7)](this[_0x1583d4(0x1bd)]()[_0x1583d4(0x1f8)]);},Game_Enemy['prototype'][_0x531484(0x201)]=function(){const _0x36eb03=_0x531484;this['_battleCursorData']=JsonEx['makeDeepCopy'](VisuMZ[_0x36eb03(0x1e7)][_0x36eb03(0x207)]['EnemyCursor']),this[_0x36eb03(0x1c7)](this[_0x36eb03(0x1b1)]()[_0x36eb03(0x1f8)]);},Sprite_Battler[_0x531484(0x199)][_0x531484(0x20d)]=function(){const _0x14fc97=_0x531484;this[_0x14fc97(0x1df)]=new Sprite_BattleSelectCursor(),this[_0x14fc97(0x1df)][_0x14fc97(0x1b3)](this),this[_0x14fc97(0x1ee)](this[_0x14fc97(0x1df)]);},VisuMZ[_0x531484(0x1e7)][_0x531484(0x1ce)]=Sprite_Battler[_0x531484(0x199)][_0x531484(0x1c5)],Sprite_Battler['prototype'][_0x531484(0x1c5)]=function(_0x5d7431){const _0x4835a8=_0x531484;VisuMZ[_0x4835a8(0x1e7)][_0x4835a8(0x1ce)][_0x4835a8(0x213)](this,_0x5d7431),this['_battleSelectCursorSprite']&&this[_0x4835a8(0x1df)][_0x4835a8(0x1c5)](_0x5d7431);},Sprite_Battler['prototype']['updateBattleSelectCursor']=function(){const _0x1fa9ca=_0x531484;if(!this[_0x1fa9ca(0x1df)])return;this[_0x1fa9ca(0x1df)][_0x1fa9ca(0x1a8)]();},VisuMZ['BattleCursor'][_0x531484(0x1b4)]=Sprite_Actor[_0x531484(0x199)][_0x531484(0x217)],Sprite_Actor[_0x531484(0x199)][_0x531484(0x217)]=function(){const _0x3a1973=_0x531484;VisuMZ['BattleCursor']['Sprite_Actor_initMembers'][_0x3a1973(0x213)](this);if(Imported['VisuMZ_1_BattleCore']&&this['constructor']===Sprite_SvEnemy)return;this[_0x3a1973(0x20d)]();},VisuMZ[_0x531484(0x1e7)][_0x531484(0x1f5)]=Sprite_Enemy[_0x531484(0x199)]['initMembers'],Sprite_Enemy[_0x531484(0x199)][_0x531484(0x217)]=function(){const _0x134b90=_0x531484;VisuMZ[_0x134b90(0x1e7)][_0x134b90(0x1f5)][_0x134b90(0x213)](this),this[_0x134b90(0x20d)]();},VisuMZ[_0x531484(0x1e7)][_0x531484(0x1de)]=Spriteset_Battle['prototype'][_0x531484(0x1a9)],Spriteset_Battle[_0x531484(0x199)][_0x531484(0x1a9)]=function(){const _0x29e745=_0x531484;VisuMZ[_0x29e745(0x1e7)][_0x29e745(0x1de)][_0x29e745(0x213)](this),this['_battleCursorContainer']=new Sprite(),this['_battleField']['addChild'](this[_0x29e745(0x1c1)]);},VisuMZ[_0x531484(0x1e7)][_0x531484(0x208)]=Spriteset_Battle['prototype'][_0x531484(0x1dd)],Spriteset_Battle['prototype'][_0x531484(0x1dd)]=function(){const _0x227170=_0x531484;VisuMZ[_0x227170(0x1e7)][_0x227170(0x208)][_0x227170(0x213)](this),this[_0x227170(0x1c1)]&&this[_0x227170(0x1ba)]&&(this[_0x227170(0x1c1)][_0x227170(0x1c8)]['x']=this[_0x227170(0x1ba)]['scale']['x'],this[_0x227170(0x1c1)][_0x227170(0x1c8)]['y']=this[_0x227170(0x1ba)][_0x227170(0x1c8)]['y'],this[_0x227170(0x1c1)]['x']=this[_0x227170(0x1ba)]['x'],this[_0x227170(0x1c1)]['y']=this[_0x227170(0x1ba)]['y']);},VisuMZ[_0x531484(0x1e7)][_0x531484(0x1d5)]=Spriteset_Battle['prototype'][_0x531484(0x1ef)],Spriteset_Battle[_0x531484(0x199)][_0x531484(0x1ef)]=function(){const _0x1207d2=_0x531484;VisuMZ[_0x1207d2(0x1e7)][_0x1207d2(0x1d5)][_0x1207d2(0x213)](this),this[_0x1207d2(0x1e0)]();},Spriteset_Battle[_0x531484(0x199)][_0x531484(0x1e0)]=function(){const _0x3acb61=_0x531484;if(!this['_battleCursorContainer'])return;let _0x16f47c=this[_0x3acb61(0x21b)];$gameSystem[_0x3acb61(0x1af)]()&&(_0x16f47c=_0x16f47c[_0x3acb61(0x1b7)](this[_0x3acb61(0x1a4)]));for(const _0x1af890 of _0x16f47c){if(!_0x1af890)continue;const _0x362400=_0x1af890[_0x3acb61(0x1df)];_0x362400&&this[_0x3acb61(0x1c1)][_0x3acb61(0x1ee)](_0x362400);}};function Sprite_BattleSelectCursor(){const _0x1bc556=_0x531484;this[_0x1bc556(0x212)](...arguments);}Sprite_BattleSelectCursor[_0x531484(0x199)]=Object['create'](Sprite[_0x531484(0x199)]),Sprite_BattleSelectCursor[_0x531484(0x199)][_0x531484(0x20e)]=Sprite_BattleSelectCursor,Sprite_BattleSelectCursor[_0x531484(0x199)]['initialize']=function(){const _0x4a0686=_0x531484;Sprite[_0x4a0686(0x199)]['initialize'][_0x4a0686(0x213)](this),this[_0x4a0686(0x217)]();},Sprite_BattleSelectCursor[_0x531484(0x199)]['initMembers']=function(){const _0x1b15b3=_0x531484;this[_0x1b15b3(0x20b)]=null,this[_0x1b15b3(0x1b0)]=null,this[_0x1b15b3(0x1db)]=0x0,this['_frameCols']=0x1,this[_0x1b15b3(0x22b)]=0x1,this[_0x1b15b3(0x1e3)]=0x1,this[_0x1b15b3(0x1ec)]={'scale':{'x':0x1,'y':0x1}},this[_0x1b15b3(0x1f6)]=0x0;},Sprite_BattleSelectCursor[_0x531484(0x199)]['setBase']=function(_0xb1a8cb){const _0x5b3404=_0x531484;this[_0x5b3404(0x206)]=_0xb1a8cb;},Sprite_BattleSelectCursor[_0x531484(0x199)][_0x531484(0x1c5)]=function(_0x1f6a6a){const _0x5ec681=_0x531484;if(this[_0x5ec681(0x20b)]===_0x1f6a6a)return;this[_0x5ec681(0x20b)]=_0x1f6a6a,this['_battler']?this[_0x5ec681(0x1a8)]():this[_0x5ec681(0x1b0)]=null;},Sprite_BattleSelectCursor[_0x531484(0x199)]['updateBattler']=function(){const _0x567b1c=_0x531484;this[_0x567b1c(0x1b0)]=this[_0x567b1c(0x20b)][_0x567b1c(0x1be)](),this[_0x567b1c(0x21e)](),this[_0x567b1c(0x1ad)]();},Sprite_BattleSelectCursor['prototype'][_0x531484(0x21e)]=function(){const _0x23e0df=_0x531484;switch(this['_settings'][_0x23e0df(0x1c4)]){case'left':this[_0x23e0df(0x21c)]['x']=0x0;break;case _0x23e0df(0x1bb):this['anchor']['x']=0.5;break;case _0x23e0df(0x209):this['anchor']['x']=0x1;break;}switch(this[_0x23e0df(0x1b0)]['anchorY']){case _0x23e0df(0x1ae):this['anchor']['y']=0x0;break;case _0x23e0df(0x218):this[_0x23e0df(0x21c)]['y']=0.5;break;case _0x23e0df(0x221):this[_0x23e0df(0x21c)]['y']=0x1;break;}},Sprite_BattleSelectCursor[_0x531484(0x199)]['loadBitmap']=function(){const _0x1cad03=_0x531484;if(!this['_settings'])return;switch(this[_0x1cad03(0x1b0)]['type']){case _0x1cad03(0x200):this['bitmap']=ImageManager[_0x1cad03(0x1bf)](_0x1cad03(0x1bc));break;case _0x1cad03(0x211):this[_0x1cad03(0x1fa)]=ImageManager[_0x1cad03(0x1eb)](this[_0x1cad03(0x1b0)]['pictureFilename']),this[_0x1cad03(0x1e6)](this[_0x1cad03(0x1b0)]['pictureFilename']);break;case _0x1cad03(0x1f3):this[_0x1cad03(0x1fa)]=ImageManager[_0x1cad03(0x1bf)](this[_0x1cad03(0x1b0)][_0x1cad03(0x226)]),this[_0x1cad03(0x1e6)](this[_0x1cad03(0x1b0)][_0x1cad03(0x226)]);break;}this[_0x1cad03(0x1db)]=0x0,this[_0x1cad03(0x1fa)][_0x1cad03(0x1fc)](this[_0x1cad03(0x197)]['bind'](this,!![]));},Sprite_BattleSelectCursor[_0x531484(0x199)][_0x531484(0x1e6)]=function(_0xe9c7c2){const _0x163e48=_0x531484;_0xe9c7c2[_0x163e48(0x1a3)](/\[(\d+)x(\d+)\]/i)?(this[_0x163e48(0x1f7)]=Math['max'](0x1,Number(RegExp['$1'])),this[_0x163e48(0x22b)]=Math[_0x163e48(0x223)](0x1,Number(RegExp['$2']))):(this[_0x163e48(0x1f7)]=0x1,this[_0x163e48(0x22b)]=0x1),this['_frameMax']=this['_frameCols']*this[_0x163e48(0x22b)];},Sprite_BattleSelectCursor[_0x531484(0x199)][_0x531484(0x1ef)]=function(){const _0x5d4750=_0x531484;Sprite['prototype'][_0x5d4750(0x1ef)]['call'](this),this[_0x5d4750(0x20b)]&&this['bitmap']&&this['bitmap'][_0x5d4750(0x228)]>0x0?(this['updateOpacity'](),this[_0x5d4750(0x1b2)](),this[_0x5d4750(0x197)](),this[_0x5d4750(0x19a)](),this['updateWave']()):this[_0x5d4750(0x1f6)]=0x0;},Sprite_BattleSelectCursor[_0x531484(0x199)][_0x531484(0x215)]=function(){const _0xdd421e=_0x531484;this[_0xdd421e(0x1f6)]=this[_0xdd421e(0x20b)][_0xdd421e(0x1f0)]()?0xff:0x0;},Sprite_BattleSelectCursor[_0x531484(0x199)][_0x531484(0x1b2)]=function(){const _0x4763ef=_0x531484;if(!this[_0x4763ef(0x22a)])return;if(this[_0x4763ef(0x1f6)]<=0x0)return;if(this['_cache']['scale']['x']===this[_0x4763ef(0x22a)][_0x4763ef(0x1c8)]['x']&&this[_0x4763ef(0x1ec)][_0x4763ef(0x1c8)]['y']===this[_0x4763ef(0x22a)][_0x4763ef(0x1c8)]['y'])return;this[_0x4763ef(0x1c8)]['x']=0x1/this[_0x4763ef(0x22a)][_0x4763ef(0x1c8)]['x'],this['scale']['y']=0x1/this[_0x4763ef(0x22a)][_0x4763ef(0x1c8)]['y'],this[_0x4763ef(0x1ec)][_0x4763ef(0x1c8)]['x']=this[_0x4763ef(0x22a)]['scale']['x'],this[_0x4763ef(0x1ec)]['scale']['y']=this[_0x4763ef(0x22a)]['scale']['y'];},Sprite_BattleSelectCursor[_0x531484(0x199)][_0x531484(0x197)]=function(_0x324c6a){const _0x22ccae=_0x531484;if(!_0x324c6a){if(Graphics[_0x22ccae(0x1d3)]%this['_settings']['frameDelay']>0x0)return;}switch(this[_0x22ccae(0x1b0)][_0x22ccae(0x1c6)]){case _0x22ccae(0x200):this['updateFrameIcon']();break;case _0x22ccae(0x211):case _0x22ccae(0x1f3):this[_0x22ccae(0x222)]();break;};},Sprite_BattleSelectCursor['prototype'][_0x531484(0x216)]=function(){const _0x1c2717=_0x531484,_0x4dd5f=this[_0x1c2717(0x1b0)][_0x1c2717(0x21d)],_0x16a061=ImageManager[_0x1c2717(0x21a)],_0x566c0d=ImageManager[_0x1c2717(0x22e)],_0x3851b1=_0x4dd5f%0x10*_0x16a061,_0x31acc9=Math[_0x1c2717(0x1fb)](_0x4dd5f/0x10)*_0x566c0d;this[_0x1c2717(0x1c3)](_0x3851b1,_0x31acc9,_0x16a061,_0x566c0d);},Sprite_BattleSelectCursor[_0x531484(0x199)][_0x531484(0x222)]=function(){const _0x2e6a11=_0x531484;this[_0x2e6a11(0x1db)]++;if(this[_0x2e6a11(0x1db)]>=this[_0x2e6a11(0x1e3)])this[_0x2e6a11(0x1db)]=0x0;var _0x523491=this[_0x2e6a11(0x1fa)]['width']/this[_0x2e6a11(0x1f7)],_0x1eabf5=this[_0x2e6a11(0x1fa)]['height']/this[_0x2e6a11(0x22b)],_0x46f333=this[_0x2e6a11(0x1db)]%this['_frameCols']*_0x523491,_0x4ca5a2=Math[_0x2e6a11(0x1fb)](this[_0x2e6a11(0x1db)]/this[_0x2e6a11(0x1f7)])*_0x1eabf5;this[_0x2e6a11(0x1c3)](_0x46f333,_0x4ca5a2,_0x523491,_0x1eabf5);},Sprite_BattleSelectCursor[_0x531484(0x199)][_0x531484(0x19a)]=function(){const _0x18e184=_0x531484;if(!this[_0x18e184(0x22a)])return;const _0x1784b7=this[_0x18e184(0x206)]?this[_0x18e184(0x206)]:this[_0x18e184(0x22a)],_0x226a79=_0x1784b7[_0x18e184(0x228)],_0x2dc000=_0x1784b7[_0x18e184(0x20c)];switch(this[_0x18e184(0x1b0)][_0x18e184(0x22c)]){case _0x18e184(0x1ed):this['x']=_0x1784b7['x']+_0x226a79/-0x2;break;case _0x18e184(0x1bb):this['x']=_0x1784b7['x']+0x0;break;case _0x18e184(0x209):this['x']=_0x1784b7['x']+_0x226a79/0x2;break;}switch(this[_0x18e184(0x1b0)][_0x18e184(0x220)]){case _0x18e184(0x1ae):this['y']=_0x1784b7['y']+_0x2dc000*-0x1;break;case _0x18e184(0x218):this['y']=_0x1784b7['y']+_0x2dc000/-0x2;break;case _0x18e184(0x221):this['y']=_0x1784b7['y']+0x0;break;}_0x1784b7&&_0x1784b7[_0x18e184(0x20b)]&&_0x1784b7[_0x18e184(0x20b)][_0x18e184(0x1b5)]()&&!$gameSystem[_0x18e184(0x1af)]()&&(this['x']-=_0x1784b7['x'],this['y']-=_0x1784b7['y']),this['x']+=this[_0x18e184(0x1b0)][_0x18e184(0x1d4)],this['y']+=this[_0x18e184(0x1b0)][_0x18e184(0x219)];},Sprite_BattleSelectCursor[_0x531484(0x199)][_0x531484(0x1e4)]=function(){const _0x181850=_0x531484,_0xb290b0=this[_0x181850(0x1b0)][_0x181850(0x1d0)];if(_0xb290b0===_0x181850(0x1ca))return;if(this[_0x181850(0x1b0)][_0x181850(0x205)]<=0x0)return;const _0x17e1e0=this[_0x181850(0x1b0)]['waveDistance'],_0x194ecd=this[_0x181850(0x1b0)][_0x181850(0x1a6)],_0xe577f3=Math[_0x181850(0x1a5)](Math[_0x181850(0x1c9)](Graphics[_0x181850(0x1d3)]*_0x194ecd)*_0x17e1e0);if(_0xb290b0===_0x181850(0x1dc))this['x']+=_0xe577f3;else _0xb290b0===_0x181850(0x1e9)&&(this['y']+=_0xe577f3);};