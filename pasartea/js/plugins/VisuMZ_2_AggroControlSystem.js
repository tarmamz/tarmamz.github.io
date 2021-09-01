//=============================================================================
// VisuStella MZ - Aggro Control System
// VisuMZ_2_AggroControlSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_AggroControlSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AggroControlSystem = VisuMZ.AggroControlSystem || {};
VisuMZ.AggroControlSystem.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.02] [AggroControlSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Aggro_Control_System_VisuStella_MZ
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * A common mechanic found in many RPG's nowadays is the ability to steer the
 * way enemies target party members. This can be in the form of provocations, 
 * taunts, and aggro.
 *
 * Provocations come in the form of states, where when a unit applies a provoke
 * state on a target, the target must attack the provoker when using single
 * target skills. This plugin provides support for multiple provocations and
 * such provocations will be given focus based on the state's priority value.
 *
 * Taunts are a third way to steer an opponent to focus on a party member. The
 * taunt effects can be split up into global, physical, magical, or certain hit
 * only taunts and these can be applied to almost any trait object.
 *
 * Aggro is a numeric value that determines the likelihood and/or priority
 * level of how often a target party member is to be attacked by an enemy unit.
 * The higher the aggro value, the more likely the chances of being targeted.
 * A option can be turned on (or through notetags) to set enemies to always
 * target the party member with the highest aggro.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Three different ways to influencing which targets enemies should attack:
 *   Provoke, taunt, and aggro.
 * * Provoke and taunt effects work both ways for actors and enemies.
 * * Aggro effects accumulate through battle and can be manipulated through
 *   notetag values, Plugin Commands, and/or Plugin Parameters.
 * * Provoked battlers can have provoke lines displayed to indicate which
 *   unit has provoked them.
 * * Taunting units can have animations played on them repeatedly to quickly
 *   relay information to the player about their taunt properties.
 * * Gauges that can be displayed over the heads of actor sprites to display
 *   how much aggro that actor holds in comparison to the other actors.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
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
 * VisuMZ_1_BattleCore
 *
 * - Provoke Priority Lines and Taunt animations become available if these
 *   plugins are installed.
 *
 * ---
 *
 * ============================================================================
 * How Aggro, Provoke, and Taunts Work
 * ============================================================================
 *
 * This section will explain how aggro, provoke, and taunts work.
 *
 * ---
 *
 * Provoke
 *
 * - Provocations come in the form of states, where when a unit applies a
 * provoke state on a target, the target must attack the provoker when using
 * single target skills. This plugin provides support for multiple provocations
 * and such provocations will be given focus based on the state's database
 * priority value.
 *
 * - The provoke will last only as long as the duration of the state itself. If
 * the state's duration is refreshed by reapplying the Provoke state, then the
 * provoker of that state will then switch over to the one applying the newly
 * added state.
 *
 * - When an actor selects a target for an action and the actor is provoked by
 * an enemy on the other team, the player's choice selection becomes limited to
 * only the provoker.
 *
 * - Provoke can be bypassed through the <Bypass Provoke> notetag.
 *
 * ---
 *
 * Taunts
 *
 * - Taunts are a third way to steer an opponent to focus on a party member.
 * The taunt effects can be split up into global, physical, magical, or certain
 * hit only taunts and these can be applied to almost any trait object.
 *
 * - When an actor selects a target and the enemy team has a taunting unit,
 * the player's choice selection becomes limited to only the targets with the
 * associated taunt type.
 *
 * - Taunts can be bypassed through the <Bypass Taunt> notetag.
 *
 * ---
 *
 * Aggro
 *
 * - Aggro is a numeric value that determines the likelihood and/or priority
 * level of how often a target party member is to be attacked by an enemy unit.
 * The higher the aggro value, the more likely the chances of being targeted.
 * A option can be turned on (or through notetags) to set enemies to always
 * target the party member with the highest aggro.
 *
 * - Skills and items can raise its user's aggro value through notetags and/or
 * how much damage they've dealt or healed. Skills and items can also change a
 * target's aggro value through notetags, too.
 *
 * - Through the Plugin Parameters, you can set Aggro to automatically raised
 * based on how much damage or healing dealt by a user.
 *
 * - Some enemies can be bypass forced aggro target through the <Bypass Aggro>
 * notetag while other enemies can be forced to target the highest aggro target
 * through the <Target Highest Aggro> notetag;
 *
 * ---
 *
 * Priorities
 *
 * - Priority will be given in the order of provokes, taunts, and then aggro.
 * This means if an enemy is provoked, the opposing side has a taunt, and there
 * is a member with high aggro, then the enemy will always attack the provoker
 * first before targeting a taunting unit before targeting the unit with high
 * aggro values.
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
 * === Provoke-Related Notetags ===
 *
 * The following notetags enable you to utilize the Provoke effects added by
 * this plugin. Provoked targets can only attack the provoking unit for single
 * target actions.
 *
 * ---
 *
 * <Provoke>
 *
 * - Used for: State Notetags
 * - Causes the state affected unit to be able to only attack the caster of the
 *   provoke state for single target actions.
 * - If multiple provoke states are applied, then the provoker is the one who
 *   applied the highest priority provoke state.
 *
 * ---
 *
 * <Bypass Provoke>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Makes the affected unit to ignore any and all provoke effects applied by
 *   any provoke states, allowing them to target foes as if they are unaffected
 *   by provoke states altogether.
 *
 * ---
 * 
 * <Provoke Height Origin: x%>
 * 
 * - Used for: Actor, Enemy Notetags
 * - Sets the provoke height origin point to x% of the sprite's height.
 * - This is the landing point for the provoke trails.
 * - Replace 'x' with a number presenting what rate of the sprite's height to
 *   set as the provoke height origin point.
 * 
 * ---
 *
 * === Taunt-Related Notetags ===
 *
 * ---
 *
 * <Taunt>
 * <All Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the taunting unit to become the target of the opposing team's
 *   single target actions for physical, magical, and certain hit actions.
 * - If multiple taunters exist, then the opposing team can select between any
 *   of the taunters for targets.
 *
 * ---
 *
 * <Physical Taunt>
 * <Magical Taunt>
 * <Certain Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the taunting unit to become the target of the opposing team's
 *   single target actions for physical, magical, and certain hit actions
 *   respectively.
 * - Add/remove any combination of the above to cause the affected unit to
 *   become the target of those types of actions.
 * - If multiple taunters exist, then the opposing team can select between any
 *   of the taunters for targets.
 *
 * ---
 *
 * <Bypass Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The affected unit will ignore any and all taunt effects created by the
 *   opposing team, allowing them to use single target actions as if no
 *   taunters exist on the opposing team.
 *
 * ---
 *
 * === Aggro-Related Notetags ===
 *
 * ---
 *
 * <User Aggro: +x>
 * <User Aggro: -x>
 *
 * - Used for: Skill, Item
 * - Upon using this action, raise the user's battle aggro value by 'x'.
 * - Replace 'x' with the amount of battle aggro to increase/decrease by.
 * - This effect will only apply once per usage regardless of the number of
 *   successful hits landed by the action.
 *
 * ---
 *
 * <Target Aggro: +x>
 * <Target Aggro: -x>
 *
 * - Used for: Skill, Item
 * - Upon using this action, raise the target's battle aggro value by 'x'.
 * - Replace 'x' with the amount of battle aggro to increase/decrease by.
 * - This effect will apply multiple times based on the number of successful
 *   hits landed by the action.
 *
 * ---
 *
 * <Aggro: +x>
 * <Aggro: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected unit to passively have increased/decreased aggro
 *   values independent of the amount of aggro it earns in battle.
 * - Replace 'x' with the amount of aggro this object increases/decreases by.
 *
 * ---
 *
 * <Aggro Multiplier: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected unit to increase the amount of perceived aggro it has
 *   by the aggro multiplier.
 * - Replace 'x' with a number representing the percentage to increase/decrease
 *   the perceived aggro by.
 * - If multiple of these traits exist across different trait objects, the
 *   effects are increased multiplicatively.
 *
 * ---
 *
 * <Bypass Highest Aggro>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills or items, the action will decide targets by aggro weight
 *   instead of always picking the highest aggro unit(s).
 * - If used on trait objects, the affected unit will decide targets by aggro
 *   weight instead of always picking the highest aggro unit(s).
 * - This is used for enemy A.I. or Actor auto battle A.I.
 *
 * ---
 *
 * <Target Highest Aggro>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills or items, the action will always decide its targets by
 *   the highest aggro value.
 * - If used on trait objects, the affected unit will always decide on targets
 *   by the highest aggro value.
 * - If the <Bypass Highest Aggro> notetag exists, this effect is ignored.
 * - This is used for enemy A.I. or Actor auto battle A.I.
 *
 * ---
 *
 * === JavaScript Notetags: Aggro-Related ===
 *
 * ---
 *
 * <JS User Aggro>
 *  code
 *  code
 *  value = code
 * </JS User Aggro>
 *
 * - Used for: Skill, Item
 * - Replace 'code' with JavaScript code to determine the final 'value' to
 *   change the user's battle aggro to upon using this skill.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 * - This effect will only apply once per usage regardless of the number of
 *   successful hits landed by the action.
 *
 * ---
 *
 * <JS Target Aggro>
 *  code
 *  code
 *  value = code
 * </JS Target Aggro>
 *
 * - Used for: Skill, Item
 * - Replace 'code' with JavaScript code to determine the final 'value' to
 *   change target's battle aggro to upon using this skill.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 * - This effect will apply multiple times based on the number of successful
 *   hits landed by the action.
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
 * Actor: Change Aggro
 * - Changes target actor's aggro value.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Change Aggro By:
 *   - Change aggro by this amount.
 *   - Use negative numbers to reduce aggro.
 *
 * ---
 *
 * Actor: Set Aggro
 * - Set target actor's aggro value.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Set Aggro To:
 *   - Sets target's aggro to this amount.
 *   - Aggro must be at least a value of 1.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change Aggro
 * - Changes target enemy's aggro value.
 *
 *   Enemy Index:
 *   - Select which Enemy Index to affect.
 *
 *   Change Aggro By:
 *   - Change aggro by this amount.
 *   - Use negative numbers to reduce aggro.
 *
 * ---
 *
 * Enemy: Set Aggro
 * - Set target enemy's aggro value.
 *
 *   Enemy Index:
 *   - Select which Enemy Index to affect.
 *
 *   Set Aggro To:
 *   - Sets target's aggro to this amount.
 *   - Aggro must be at least a value of 1.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Provoke Settings
 * ============================================================================
 *
 * The Provoke Settings Plugin Parameters adjust the visual aspects related to
 * the provoke effect. These settings will require VisuMZ_1_BattleCore to be
 * installed in order for them to work due to dependencies. 
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 * 
 *   Show Priority Lines?:
 *   - Show priority target lines for this plugin?
 *   - Requires VisuMZ_1_BattleCore.
 *
 * ---
 *
 * Line Settings
 * 
 *   Arc Height:
 *   - How tall should the line arc in pixels?
 * 
 *   Blend Mode:
 *   - The blend mode used for the sprite.
 * 
 *   Height Origin:
 *   - The rate from the battler's sprite base to determine where the line
 *     starts from.
 * 
 *   Line Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Opacity:
 *   - The highest possible opacity for active provoke lines.
 * 
 *   Opacity Speed:
 *   - The speed at which opacity fluctuates for the line sprite.
 * 
 *   Parts:
 *   - The number of joint parts to split up the sprite as.
 * 
 *   Parts Size:
 *   - The number in pixels for the diameter of each part.
 *
 * ---
 * 
 * Options
 * 
 *   Add Provoke Option?
 *   - Add the 'Show Provoke Origin' option to the Options menu?
 * 
 *   Adjust Window Height
 *   - Automatically adjust the options window height?
 * 
 *   Option Name
 *   - Command name of the option.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Taunt Settings
 * ============================================================================
 *
 * Battlers with specific taunt types can have animations playing on them over
 * and over to relay information to the player. These settings require you to
 * have both VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore installed in your
 * project's plugin list in order to use.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine & VisuMZ_1_BattleCore
 * 
 *   Show Animations?:
 *   - Show animations for each of the taunt effects?
 *   - Requires VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore.
 *
 * ---
 *
 * Animation ID's
 * 
 *   Physical Taunt:
 *   - The animation ID used for physical taunts.
 *   - Use 0 or 'None' to bypass this type.
 * 
 *   Magical Taunt:
 *   - The animation ID used for magical taunts.
 *   - Use 0 or 'None' to bypass this type.
 * 
 *   Certain Hit Taunt:
 *   - The animation ID used for certain hit taunts.
 *   - Use 0 or 'None' to bypass this type.
 *
 * ---
 *
 * Animation Settings
 * 
 *   Cycle Time:
 *   - The amount of frames to wait before each animation cycle.
 *   - WARNING: Lower numbers can jeopardize game performance.
 * 
 *   Mirror Actor Ani?:
 *   - Mirror animations played on actors?
 * 
 *   Mute Animation SFX?:
 *   - Mute sounds played by animations?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Aggro Settings
 * ============================================================================
 *
 * This lets you adjust the settings for this plugin's Aggro mechanics. Most of
 * these settings focus on the visual gauge display of the Aggro gauge, but you
 * can also change up the settings for how aggro is utilized.
 *
 * ---
 *
 * General
 * 
 *   Priority: Highest TGR:
 *   - When enemies target actors for an single target attack, always target
 *     the highest members or make it weighted?
 *
 *   Aggro Per Damage:
 *   - The amount of aggro generated per point of HP damage dealt to an enemy.
 *
 *   Aggro Per Heal:
 *   - The amount of aggro generated per point of HP recovered to an ally.
 *
 * ---
 *
 * Gauge
 * 
 *   Visible Battler Gauge:
 *   - Display an aggro gauge over an SV actor's head to show current aggro
 *     level compared to other party members.
 * 
 *   Visible Status Gauge:
 *   - Display an aggro gauge in the Battle Status Window to show the current
 *     aggro level compared to others.
 * 
 *   Gauge Color 1:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Gauge Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Gauge Width:
 *   - Width in pixels you want the gauge to be.
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the Aggro Gauge sprite's anchor X/Y to be?
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the Aggro Gauge to be scaled?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the Aggro Gauge's X/Y by?
 *
 * ---
 * 
 * Options
 * 
 *   Add Provoke Option?
 *   - Add the 'Show Aggro Gauge' option to the Options menu?
 * 
 *   Adjust Window Height
 *   - Automatically adjust the options window height?
 * 
 *   Option Name
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
 * Version 1.02: November 1, 2020
 * * Compatibility Update!
 * ** Plugin is made more compatible with other plugins.
 * 
 * Version 1.01: October 4, 2020
 * * Bug Fixes!
 * ** Provoke lines should now be placed correctly if the UI area is smaller
 *    than the resolution area.
 * ** The Plugin Commands should no longer cause crashes. Fix made by Irina.
 *
 * Version 1.00: September 28, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeAggro
 * @text Actor: Change Aggro
 * @desc Changes target actor's aggro value.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Aggro:num
 * @text Change Aggro By
 * @desc Change aggro by this amount.
 * Use negative numbers to reduce aggro.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorSetAggro
 * @text Actor: Set Aggro
 * @desc Set target actor's aggro value.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Aggro:num
 * @text Set Aggro To
 * @desc Sets target's aggro to this amount.
 * Aggro must be at least a value of 1.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeAggro
 * @text Enemy: Change Aggro
 * @desc Changes target enemy's aggro value.
 *
 * @arg EnemyIndex:num
 * @text Enemy Index
 * @type actor
 * @desc Select which Enemy Index to affect.
 * @default 0
 *
 * @arg Aggro:num
 * @text Change Aggro By
 * @desc Change aggro by this amount.
 * Use negative numbers to reduce aggro.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemySetAggro
 * @text Enemy: Set Aggro
 * @desc Set target enemy's aggro value.
 *
 * @arg EnemyIndex:num
 * @text Enemy Index
 * @type actor
 * @desc Select which Enemy Index to affect.
 * @default 0
 *
 * @arg Aggro:num
 * @text Set Aggro To
 * @desc Sets target's aggro to this amount.
 * Aggro must be at least a value of 1.
 * @default 1
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
 * @param AggroControl
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Provoke:struct
 * @text Provoke Settings
 * @type struct<Provoke>
 * @desc Settings related to the Provoke mechanic.
 * These settings require VisuMZ_1_BattleCore.
 * @default {"VisuMZ_1_BattleCore":"","ShowLines:eval":"true","LineSettings":"","ArcHeight:num":"125","BlendMode:num":"1","HeightOrigin:num":"0.8","LineColor:str":"#ff0000","Opacity:num":"255","OpacitySpeed:num":"4","Parts:num":"256","PartsSize:num":"5","Options":"","AddOption:eval":"true","AdjustOptionsRect:eval":"true","OptionName:str":"Show Provoke Origin"}
 *
 * @param Taunt:struct
 * @text Taunt Settings
 * @type struct<Taunt>
 * @desc Settings related to the Taunt mechanic.
 * @default {"Dependency":"VisuMZ_1_BattleCore","ShowAnimation:eval":"true","AnimationID":"","AniPhysical:num":"1","AniMagical:num":"2","AniCertain:num":"3","AnimationSettings":"","CycleTime:num":"60","MirrorActorAni:eval":"true","MuteAnimations:eval":"true"}
 *
 * @param Aggro:struct
 * @text Aggro Settings
 * @type struct<Aggro>
 * @desc Settings related to the Aggro mechanic.
 * @default {"General":"","PriorityHighest:eval":"true","AggroPerDmg:num":"0.1","AggroPerHeal:num":"0.5","Gauge":"","VisibleGauge:eval":"false","StatusGauge:eval":"true","GaugeColor1:str":"#959595","GaugeColor2:str":"#ffffff","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"2","Options":"","AddOption:eval":"true","AdjustOptionsRect:eval":"true","OptionName:str":"Show Aggro Gauge"}
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
 * Provoke Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Provoke:
 *
 * @param VisuMZ_1_BattleCore
 *
 * @param ShowLines:eval
 * @text Show Priority Lines?
 * @parent VisuMZ_1_BattleCore
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show priority target lines for this plugin?
 * Requires VisuMZ_1_BattleCore.
 * @default true
 *
 * @param LineSettings
 * @text Line Settings
 *
 * @param ArcHeight:num
 * @text Arc Height
 * @parent LineSettings
 * @type number
 * @desc How tall should the line arc in pixels?
 * @default 125
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent LineSettings
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used for the sprite.
 * @default 1
 *
 * @param HeightOrigin:num
 * @text Height Origin
 * @parent LineSettings
 * @desc The rate from the battler's sprite base to determine where the line starts from.
 * @default 0.8
 *
 * @param LineColor:str
 * @text Line Color
 * @parent LineSettings
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ff0000
 *
 * @param Opacity:num
 * @text Opacity
 * @parent LineSettings
 * @type number
 * @min 1
 * @max 255
 * @desc The highest possible opacity for active provoke lines.
 * @default 255
 *
 * @param OpacitySpeed:num
 * @text Opacity Speed
 * @parent Opacity:num
 * @type number
 * @min 1
 * @desc The speed at which opacity fluctuates for the line sprite.
 * @default 4
 *
 * @param Parts:num
 * @text Parts
 * @parent LineSettings
 * @type number
 * @min 1
 * @desc The number of joint parts to split up the sprite as.
 * @default 256
 *
 * @param PartsSize:num
 * @text Parts Size
 * @parent Parts:num
 * @type number
 * @min 1
 * @desc The number in pixels for the diameter of each part.
 * @default 5
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Provoke Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Provoke Origin' option to the Options menu?
 * @default true
 *
 * @param AdjustOptionsRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param OptionName:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show Provoke Origin
 *
 */
/* ----------------------------------------------------------------------------
 * Taunt Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Taunt:
 *
 * @param Dependency
 * @text VisuMZ_0_CoreEngine
 * @default VisuMZ_1_BattleCore
 *
 * @param ShowAnimation:eval
 * @text Show Animations?
 * @parent Dependency
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show animations for each of the taunt effects?
 * Requires VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore.
 * @default true
 *
 * @param AnimationID
 * @text Animation ID's
 *
 * @param AniPhysical:num
 * @text Physical Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for physical taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 13
 *
 * @param AniMagical:num
 * @text Magical Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for magical taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 14
 *
 * @param AniCertain:num
 * @text Certain Hit Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for certain hit taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 15
 *
 * @param AnimationSettings
 * @text Animation Settings
 *
 * @param CycleTime:num
 * @text Cycle Time
 * @parent AnimationSettings
 * @type number
 * @min 1
 * @desc The amount of frames to wait before each animation cycle.
 * WARNING: Lower numbers can jeopardize game performance.
 * @default 60
 *
 * @param MirrorActorAni:eval
 * @text Mirror Actor Ani?
 * @parent AnimationSettings
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror animations played on actors?
 * @default true
 *
 * @param MuteAnimations:eval
 * @text Mute Animation SFX?
 * @parent AnimationSettings
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute sounds played by animations?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Aggro Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Aggro:
 *
 * @param General
 *
 * @param PriorityHighest:eval
 * @text Priority: Highest TGR
 * @parent General
 * @type boolean
 * @on Always
 * @off Weighted
 * @desc When enemies target actors for an single target attack,
 * always target the highest members or make it weighted?
 * @default true
 *
 * @param AggroPerDmg:num
 * @text Aggro Per Damage
 * @parent General
 * @desc The amount of aggro generated per point of HP damage dealt to an enemy.
 * @default 0.1
 *
 * @param AggroPerHeal:num
 * @text Aggro Per Heal
 * @parent General
 * @desc The amount of aggro generated per point of HP recovered to an ally.
 * @default 0.5
 *
 * @param Gauge
 *
 * @param VisibleGauge:eval
 * @text Visible Battler Gauge
 * @parent Gauge
 * @type boolean
 * @on Visible
 * @off None
 * @desc Display an aggro gauge over an SV actor's head to show
 * current aggro level compared to other party members.
 * @default false
 *
 * @param StatusGauge:eval
 * @text Visible Status Gauge
 * @parent Gauge
 * @type boolean
 * @on Visible
 * @off None
 * @desc Display an aggro gauge in the Battle Status Window
 * to show the current aggro level compared to others.
 * @default true
 *
 * @param GaugeColor1:str
 * @text Gauge Color 1
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #959595
 *
 * @param GaugeColor2:str
 * @text Gauge Color 2
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Gauge
 * @desc Where do you want the Aggro Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Gauge
 * @desc Where do you want the Aggro Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent Gauge
 * @desc How large/small do you want the Aggro Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Gauge
 * @desc How many pixels to offset the Aggro Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Gauge
 * @desc How many pixels to offset the Aggro Gauge's Y by?
 * @default 2
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
 * @desc Add the 'Show Aggro Gauge' option to the Options menu?
 * @default true
 *
 * @param AdjustOptionsRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param OptionName:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show Aggro Gauge
 *
 */
//=============================================================================

const _0x4788=['updateAggroControl','Window_StatusBase_placeActorName','HITTYPE_PHYSICAL','Scene_Options_maxCommands','addGeneralOptions','fHbPh','provoke-line-color','gaugeHeight','reduce','opacity','checkCacheKey','ARRAYEVAL','isAggroAffected','round','height','initAggroControl','isBypassHighestAggro','aggro-gauge-color-2','Settings','_tauntAnimationTimer','provokeOrigin','certainHitTaunt','Game_Battler_addState','bitmapWidth','Spriteset_Battle_update','tgrMax','isSideView','initTauntAnimations','some','VjxnQ','placeActorName','_targetIndex','JUcjR','updateTauntAnimations','BlendMode','heightOrigin','xxjVh','scope','applySubjectAggro','OpacitySpeed','createProvokeHeightOrigin','inputtingAction','isMagical','_homeY','Sducj','createStateSprite','toUpperCase','VisibleGauge','sNgSu','randomInt','AggroControlSystem','createAggroGauge','list','STR','Sprite_Gauge_gaugeRate','XUGty','friendsUnit','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','ARRAYJSON','battleLayoutStyle','traitObjects','abs','_scene','_%1TauntAnimation','_tauntAnimationCycle','applyProvokeEffect','ekiJC','battler','StatusGauge','provokeHeightOrigin','Game_Action_targetsForAlive','aggroGaugeColor2','Sprite_Actor_update','aggroGauge','exit','getColor','aggro','createInnerSprite','isTpb','_muteTauntAnimations','indexOf','nameY','drawCircle','isAggroGaugeVisible','updateOpacity','ActorID','boxHeight','Provoke','onBattleStart','min','randomTarget','parse','stateHasProvoke','isBypassProvoke','ShowLines','_statusWindow','convertBattleTargetToString','_enemies','UUhmu','Sprite_Gauge_gaugeX','Game_Action_applyItemUserEffect','ndzZI','STRUCT','drawValue','GaugeColor1','maxCommands','applyData','create','lWeuU','length','push','match','trim','currentValueAggroControl','parameters','isBypassTaunt','%1Taunt','tauntTargetsForAlive','magicalTaunt','itemRect','Sprite_Gauge_currentMaxValue','sortEnemies','note','PartsSize','clearProvokers','tgrMin','applyProvokeFilters','_aggro','kMPVV','AggroPerDmg','updateChildrenOpacity','currentValue','currentMaxValue','ARRAYSTR','Sprite_Gauge_update','children','getNextTauntAnimation','_subject','provokeLineColor','aggroGaugeColor1','tgrSumFromGroup','status','_homeX','updateAggroGaugeSprite','fhEXk','Atkag','PriorityHighest','bypassProvoke','isAggroType','isSceneBattle','ConvertParams','addAggroControlSystemAggroCommand','createBattleFieldAggroControl','setup','Game_BattlerBase_sparam','AniPhysical','addChildAt','Sprite_Battler_initialize','AnchorY','CycleTime','ARRAYNUM','CvziS','RroMT','applyItemUserEffect','battleUIOffsetX','format','applyGlobal','MuteAnimations','EnemyChangeAggro','drawAggroGauge','addAggroControlSystemProvokeCommand','bitmap','item','rZkXR','index','_provokeBitmap','DJzHt','Sprite_Gauge_currentValue','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','anchor','isEnemy','initMembers','makeData','_menuAggroType','fdevL','DZVvm','VQQOS','GaugeColor2','optDisplayTp','Game_BattlerBase_refresh','Battle\x20Enemy\x20%1','provokeBitmap','taunting','actor%1-gauge-aggro','emkFJ','_mainSprite','width','setBattler','findTgrMember','states','ConfigManager_applyData','_targetY','_provoker','AdjustOptionsRect','addCommand','aggroGaugeY','log','hpYah','BattleCore','setAggro','OffsetY','_colorCache','Spriteset_Battle_createBattleField','isPhysical','Tljgp','AniMagical','_battleField','nameX','_opacitySpeed','convertStringToBattleTarget','refresh','clamp','aggroGaugeX','gaugeRate','max','isCertainHit','ActorChangeAggro','AddOption','addAggroControlSystemCommands','JSON','initialize','VisuMZ_2_BattleSystemATB','isShowPriorityLines','_damageContainer','uyCPJ','isTauntAffected','ARRAYSTRUCT','maxSprites','inBattle','isDead','kUqmk','clearAggro','name','Window_Options_addGeneralOptions','GjLxx','hNbbO','_cache','Sprite_Battler_initMembers','PRVqC','VisuMZ_1_BattleCore','_targetX','ripvd','aggroMultiplier','isAtbGaugeVisible','randomTauntTarget','call','executeHpDamageAggroControl','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','updateBattlerPositions','baseAggro','bitmapHeight','addChild','alwaysTargetHighestAggro','#%1','getColorDataFromPluginParameters','wZnai','leftwardAnimation','executeHpDamage','createChildSprites','Taunt','createProvokeSprite','isActor','HeightOrigin','constructor','OptionName','Parts','_provokeContainer','Game_Action_executeHpDamage','description','boxWidth','AhcEC','isPlaytest','isAlive','filter','Sprite_Gauge_drawValue','registerCommand','hitType','yiHgt','Sprite_Gauge_gaugeColor2','updateOpacityAggroControl','_spriteset','itemRectWithPadding','isStateAffected','OffsetX','updateSubPositions','_aggroGaugeSprite','time','Sprite_Actor_createStateSprite','_animationCycleTime','IOJLq','targetsForAlive','parentContainer','Aggro','actorId','LineColor','startNewTauntAnimation','AnchorX','scale','MirrorActorAni','textColor','visible','sparam','_battler','isProvokeAffected','qRXPy','loseAggro','_mirrorActorTauntAnimations','ConfigManager_makeData','bypassHighestAggro','hebZg','certainHit','Sprite_Battler_update','bBlRk','LUFNB','_sprites','makeProvokeTarget','xBoVI','tgr','Game_BattlerBase_initMembers','yYHiF','psPdB','gainAggro','return\x200','Sprite_Battler_setBattler','showVisualAtbGauge','maxOpacity','physicalTauntMembers','addState','opponentsUnit','version','provoker','rScnu','_physicalTauntAnimation','battleAggro','padding','_provokeSprite','ZlEmU','includes','blendMode','faceWidth','certainHitTauntMembers','LIAyq','requestFauxAnimation','AniCertain','matchTauntType','HITTYPE_CERTAIN','currentMaxValueAggroControl','QVpcM','prototype','gaugeColor2','EVAL','applyTauntFilters','Opacity','Game_Battler_onBattleStart','enemy','kPNWv','rlsaR','OFYYj','Game_Action_applyGlobal','aliveMembers','RrIlP','subject','update','EnemySetAggro','TaRVg','VUeGk','isAggroGaugeShown','applyItemUserEffectAggroControl','map','isTargetHighestTGR','Sprite_Gauge_gaugeColor1','physicalTaunt','bypassTaunt','Window_BattleEnemy_refresh','magical','BattleLayout','HITTYPE_MAGICAL','members','actor','magicalTauntMembers','physical'];(function(_0x30b623,_0x478869){const _0x25b9ea=function(_0x5eaf1e){while(--_0x5eaf1e){_0x30b623['push'](_0x30b623['shift']());}};_0x25b9ea(++_0x478869);}(_0x4788,0x1e3));const _0x25b9=function(_0x30b623,_0x478869){_0x30b623=_0x30b623-0x0;let _0x25b9ea=_0x4788[_0x30b623];return _0x25b9ea;};const _0x4c669b=_0x25b9;var label=_0x4c669b('0x15d'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x4c669b('0xbf')](function(_0x57cd04){const _0x39f278=_0x4c669b;return _0x57cd04[_0x39f278('0x31')]&&_0x57cd04['description'][_0x39f278('0xff')]('['+label+']');})[0x0];VisuMZ[label][_0x4c669b('0x13d')]=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0xc4ffd0,_0x5231fb){const _0x57f916=_0x4c669b;for(const _0x45cdf5 in _0x5231fb){if(_0x45cdf5['match'](/(.*):(.*)/i)){if(_0x57f916('0x45')===_0x57f916('0x45')){const _0x7fd266=String(RegExp['$1']),_0x4015a7=String(RegExp['$2'])[_0x57f916('0x159')]()[_0x57f916('0x14')]();let _0x2e8a92,_0x2ed6e6,_0x353e8f;switch(_0x4015a7){case'NUM':_0x2e8a92=_0x5231fb[_0x45cdf5]!==''?Number(_0x5231fb[_0x45cdf5]):0x0;break;case _0x57f916('0x44'):_0x2ed6e6=_0x5231fb[_0x45cdf5]!==''?JSON[_0x57f916('0x186')](_0x5231fb[_0x45cdf5]):[],_0x2e8a92=_0x2ed6e6[_0x57f916('0x11e')](_0xf48a70=>Number(_0xf48a70));break;case _0x57f916('0x10c'):_0x2e8a92=_0x5231fb[_0x45cdf5]!==''?eval(_0x5231fb[_0x45cdf5]):null;break;case _0x57f916('0x136'):_0x2ed6e6=_0x5231fb[_0x45cdf5]!==''?JSON[_0x57f916('0x186')](_0x5231fb[_0x45cdf5]):[],_0x2e8a92=_0x2ed6e6[_0x57f916('0x11e')](_0x57b5d8=>eval(_0x57b5d8));break;case _0x57f916('0x89'):_0x2e8a92=_0x5231fb[_0x45cdf5]!==''?JSON[_0x57f916('0x186')](_0x5231fb[_0x45cdf5]):'';break;case _0x57f916('0x165'):_0x2ed6e6=_0x5231fb[_0x45cdf5]!==''?JSON[_0x57f916('0x186')](_0x5231fb[_0x45cdf5]):[],_0x2e8a92=_0x2ed6e6[_0x57f916('0x11e')](_0x51ce53=>JSON[_0x57f916('0x186')](_0x51ce53));break;case'FUNC':_0x2e8a92=_0x5231fb[_0x45cdf5]!==''?new Function(JSON[_0x57f916('0x186')](_0x5231fb[_0x45cdf5])):new Function(_0x57f916('0xf0'));break;case'ARRAYFUNC':_0x2ed6e6=_0x5231fb[_0x45cdf5]!==''?JSON[_0x57f916('0x186')](_0x5231fb[_0x45cdf5]):[],_0x2e8a92=_0x2ed6e6[_0x57f916('0x11e')](_0x108d65=>new Function(JSON[_0x57f916('0x186')](_0x108d65)));break;case _0x57f916('0x160'):_0x2e8a92=_0x5231fb[_0x45cdf5]!==''?String(_0x5231fb[_0x45cdf5]):'';break;case _0x57f916('0x29'):_0x2ed6e6=_0x5231fb[_0x45cdf5]!==''?JSON[_0x57f916('0x186')](_0x5231fb[_0x45cdf5]):[],_0x2e8a92=_0x2ed6e6[_0x57f916('0x11e')](_0xb38b26=>String(_0xb38b26));break;case _0x57f916('0xa'):_0x353e8f=_0x5231fb[_0x45cdf5]!==''?JSON[_0x57f916('0x186')](_0x5231fb[_0x45cdf5]):{},_0x2e8a92=VisuMZ['ConvertParams']({},_0x353e8f);break;case _0x57f916('0x90'):_0x2ed6e6=_0x5231fb[_0x45cdf5]!==''?JSON[_0x57f916('0x186')](_0x5231fb[_0x45cdf5]):[],_0x2e8a92=_0x2ed6e6[_0x57f916('0x11e')](_0x258ade=>VisuMZ[_0x57f916('0x3a')]({},JSON[_0x57f916('0x186')](_0x258ade)));break;default:continue;}_0xc4ffd0[_0x7fd266]=_0x2e8a92;}else{function _0x3dc1cc(){const _0x2f3234=_0x57f916;if(this[_0x2f3234('0x23')]===_0xbf37ac)this[_0x2f3234('0x95')]();this[_0x2f3234('0x23')]=_0x262fb9[_0x2f3234('0x84')](0x1,_0xc07d7a['round'](this[_0x2f3234('0x23')]));}}}}return _0xc4ffd0;},(_0x366b7f=>{const _0x383fb1=_0x4c669b,_0x5d3c15=_0x366b7f[_0x383fb1('0x96')];for(const _0x35823f of dependencies){if(_0x383fb1('0x9c')===_0x383fb1('0x6')){function _0xd7aac0(){const _0x2af82f=_0x383fb1;return _0x2d5d11[_0x2af82f('0x128')](_0x2f5e1e(_0x508f69['$1']));}}else{if(!Imported[_0x35823f]){alert(_0x383fb1('0x164')[_0x383fb1('0x49')](_0x5d3c15,_0x35823f)),SceneManager[_0x383fb1('0x175')]();break;}}}const _0x4102f7=_0x366b7f[_0x383fb1('0xba')];if(_0x4102f7[_0x383fb1('0x13')](/\[Version[ ](.*?)\]/i)){const _0x15c6c9=Number(RegExp['$1']);_0x15c6c9!==VisuMZ[label][_0x383fb1('0xf7')]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x383fb1('0x49')](_0x5d3c15,_0x15c6c9)),SceneManager[_0x383fb1('0x175')]());}if(_0x4102f7[_0x383fb1('0x13')](/\[Tier[ ](\d+)\]/i)){if('uyCPJ'===_0x383fb1('0x8e')){const _0x388e68=Number(RegExp['$1']);_0x388e68<tier?(alert(_0x383fb1('0x56')[_0x383fb1('0x49')](_0x5d3c15,_0x388e68,tier)),SceneManager[_0x383fb1('0x175')]()):tier=Math[_0x383fb1('0x84')](_0x388e68,tier);}else{function _0x125451(){const _0x2a066a=_0x383fb1;this[_0x2a066a('0x174')]=!![];}}}VisuMZ[_0x383fb1('0x3a')](VisuMZ[label]['Settings'],_0x366b7f[_0x383fb1('0x16')]);})(pluginData),PluginManager[_0x4c669b('0xc1')](pluginData[_0x4c669b('0x96')],_0x4c669b('0x86'),_0x1c1382=>{const _0x441813=_0x4c669b;if(!$gameParty[_0x441813('0x92')]())return;VisuMZ[_0x441813('0x3a')](_0x1c1382,_0x1c1382);const _0x5e6b45=$gameActors[_0x441813('0x128')](_0x1c1382[_0x441813('0x180')]),_0x22c01e=_0x1c1382[_0x441813('0xd2')];if(_0x5e6b45)_0x5e6b45[_0x441813('0xef')](_0x22c01e);}),PluginManager[_0x4c669b('0xc1')](pluginData[_0x4c669b('0x96')],'ActorSetAggro',_0x1f7bb3=>{const _0x5bee7d=_0x4c669b;if(!$gameParty[_0x5bee7d('0x92')]())return;VisuMZ[_0x5bee7d('0x3a')](_0x1f7bb3,_0x1f7bb3);const _0x2db9cb=$gameActors['actor'](_0x1f7bb3[_0x5bee7d('0x180')]),_0x67aa13=_0x1f7bb3['Aggro'];if(_0x2db9cb)_0x2db9cb[_0x5bee7d('0x75')](_0x67aa13);}),PluginManager['registerCommand'](pluginData[_0x4c669b('0x96')],_0x4c669b('0x4c'),_0x53c7e4=>{const _0x121cb0=_0x4c669b;if(!$gameParty[_0x121cb0('0x92')]())return;VisuMZ['ConvertParams'](_0x53c7e4,_0x53c7e4);const _0x2f672e=$gameTroop[_0x121cb0('0x127')]()[_0x53c7e4['EnemyIndex']],_0x348df8=_0x53c7e4['Aggro'];if(_0x2f672e)_0x2f672e['gainAggro'](_0x348df8);}),PluginManager[_0x4c669b('0xc1')](pluginData[_0x4c669b('0x96')],_0x4c669b('0x119'),_0x1ecc06=>{const _0x59717f=_0x4c669b;if(!$gameParty[_0x59717f('0x92')]())return;VisuMZ[_0x59717f('0x3a')](_0x1ecc06,_0x1ecc06);const _0x35ebbb=$gameTroop['members']()[_0x1ecc06['EnemyIndex']],_0x1d7ead=_0x1ecc06[_0x59717f('0xd2')];if(_0x35ebbb)_0x35ebbb[_0x59717f('0x75')](_0x1d7ead);}),DataManager[_0x4c669b('0x0')]=function(_0x202169){const _0x3faa23=_0x4c669b;if(!_0x202169)return![];return _0x202169[_0x3faa23('0x1e')][_0x3faa23('0x13')](/<PROVOKE>/i);},DataManager['isBypassProvoke']=function(_0x5629b8){const _0x19d0c9=_0x4c669b;if(!_0x5629b8)return![];return _0x5629b8[_0x19d0c9('0x1e')][_0x19d0c9('0x13')](/<BYPASS PROVOKE>/i);},DataManager['isBypassTaunt']=function(_0xac82e4){const _0x919ccc=_0x4c669b;if(!_0xac82e4)return![];return _0xac82e4[_0x919ccc('0x1e')][_0x919ccc('0x13')](/<BYPASS TAUNT>/i);},DataManager[_0x4c669b('0x13b')]=function(_0x152fb5){const _0x527b99=_0x4c669b;if(!_0x152fb5)return![];return _0x152fb5[_0x527b99('0x1e')][_0x527b99('0x13')](/<BYPASS HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);},DataManager[_0x4c669b('0xaa')]=function(_0x1ec28b){const _0x19f061=_0x4c669b;if(!_0x1ec28b)return![];return _0x1ec28b[_0x19f061('0x1e')][_0x19f061('0x13')](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);},ImageManager[_0x4c669b('0x63')]=function(){const _0xb8db1c=_0x4c669b;if(this[_0xb8db1c('0x53')])return this[_0xb8db1c('0x53')];return this['_provokeBitmap']=new Bitmap(0x64,0x64),this['_provokeBitmap'][_0xb8db1c('0x17d')](0x32,0x32,0x32,ColorManager[_0xb8db1c('0x2e')]()),this['_provokeBitmap'];},ConfigManager[_0x4c669b('0x174')]=!![],ConfigManager[_0x4c669b('0x13f')]=!![],VisuMZ[_0x4c669b('0x15d')][_0x4c669b('0xe1')]=ConfigManager['makeData'],ConfigManager[_0x4c669b('0x5a')]=function(){const _0x53f112=_0x4c669b,_0x43dd15=VisuMZ[_0x53f112('0x15d')]['ConfigManager_makeData'][_0x53f112('0xa3')](this);return _0x43dd15[_0x53f112('0x174')]=this['aggroGauge'],_0x43dd15[_0x53f112('0x13f')]=this[_0x53f112('0x13f')],_0x43dd15;},VisuMZ[_0x4c669b('0x15d')][_0x4c669b('0x6c')]=ConfigManager[_0x4c669b('0xe')],ConfigManager['applyData']=function(_0x23f776){const _0x3510d4=_0x4c669b;VisuMZ['AggroControlSystem']['ConfigManager_applyData'][_0x3510d4('0xa3')](this,_0x23f776);if(_0x3510d4('0x174')in _0x23f776){if(_0x3510d4('0x66')!==_0x3510d4('0x66')){function _0x3ff459(){if(_0x55c5a5['isPlaytest']())_0x6cb84['log'](_0x3ee026);}}else this[_0x3510d4('0x174')]=_0x23f776[_0x3510d4('0x174')];}else this[_0x3510d4('0x174')]=!![];if(_0x3510d4('0x13f')in _0x23f776){if('pJqwv'!==_0x3510d4('0x14f'))this[_0x3510d4('0x13f')]=_0x23f776[_0x3510d4('0x13f')];else{function _0x1fbd1a(){const _0x430ddb=_0x3510d4;return _0x1ec6f2=_0x5bb914(_0x455346),this['_colorCache']=this[_0x430ddb('0x77')]||{},_0x49d41b[_0x430ddb('0x13')](/#(.*)/i)?this['_colorCache'][_0x36bb64]=_0x430ddb('0xab')[_0x430ddb('0x49')](_0x195d37(_0x3a7403['$1'])):this[_0x430ddb('0x77')][_0x4f48c4]=this[_0x430ddb('0xd9')](_0x45fcf5(_0xdf0f33)),this[_0x430ddb('0x77')][_0x340e48];}}}else this['provokeOrigin']=!![];},TextManager[_0x4c669b('0x174')]=VisuMZ[_0x4c669b('0x15d')][_0x4c669b('0x13d')]['Aggro'][_0x4c669b('0xb6')],TextManager[_0x4c669b('0x13f')]=VisuMZ[_0x4c669b('0x15d')][_0x4c669b('0x13d')][_0x4c669b('0x182')][_0x4c669b('0xb6')],ColorManager[_0x4c669b('0xac')]=function(_0x3aa182,_0x8ce325){const _0x3dc5ff=_0x4c669b;return _0x8ce325=String(_0x8ce325),this[_0x3dc5ff('0x77')]=this[_0x3dc5ff('0x77')]||{},_0x8ce325[_0x3dc5ff('0x13')](/#(.*)/i)?this['_colorCache'][_0x3aa182]=_0x3dc5ff('0xab')['format'](String(RegExp['$1'])):this[_0x3dc5ff('0x77')][_0x3aa182]=this[_0x3dc5ff('0xd9')](Number(_0x8ce325)),this[_0x3dc5ff('0x77')][_0x3aa182];},ColorManager[_0x4c669b('0x176')]=function(_0x12ac91){const _0x56c2fa=_0x4c669b;_0x12ac91=String(_0x12ac91);if(_0x12ac91[_0x56c2fa('0x13')](/#(.*)/i)){if(_0x56c2fa('0x5c')==='fdevL')return _0x56c2fa('0xab')[_0x56c2fa('0x49')](String(RegExp['$1']));else{function _0x5b08ec(){const _0x1243d3=_0x56c2fa,_0x2e85dc=this[_0x1243d3('0x144')](),_0x96eca7=this[_0x1243d3('0x115')]()[_0x1243d3('0xbf')](_0x31a879=>_0x31a879[_0x1243d3('0xeb')]===_0x2e85dc);return _0x96eca7[_0x2b03c6[_0x1243d3('0x15c')](_0x96eca7['length'])]||this[_0x1243d3('0x185')]();}}}else return this[_0x56c2fa('0xd9')](Number(_0x12ac91));},ColorManager[_0x4c669b('0x2e')]=function(){const _0x153f39=_0x4c669b,_0x293f1e=_0x153f39('0x131');this[_0x153f39('0x77')]=this[_0x153f39('0x77')]||{};if(this[_0x153f39('0x77')][_0x293f1e])return this['_colorCache'][_0x293f1e];const _0x117e3d=VisuMZ['AggroControlSystem'][_0x153f39('0x13d')][_0x153f39('0x182')][_0x153f39('0xd4')];return this[_0x153f39('0xac')](_0x293f1e,_0x117e3d);},ColorManager[_0x4c669b('0x2f')]=function(){const _0x2b5c08=_0x4c669b,_0x496c46='aggro-gauge-color-1';this[_0x2b5c08('0x77')]=this['_colorCache']||{};if(this[_0x2b5c08('0x77')][_0x496c46])return this[_0x2b5c08('0x77')][_0x496c46];const _0xf051e2=VisuMZ[_0x2b5c08('0x15d')][_0x2b5c08('0x13d')][_0x2b5c08('0xd2')][_0x2b5c08('0xc')];return this[_0x2b5c08('0xac')](_0x496c46,_0xf051e2);},ColorManager[_0x4c669b('0x172')]=function(){const _0x267430=_0x4c669b,_0x38e5f5=_0x267430('0x13c');this[_0x267430('0x77')]=this[_0x267430('0x77')]||{};if(this[_0x267430('0x77')][_0x38e5f5])return this[_0x267430('0x77')][_0x38e5f5];const _0x269a7e=VisuMZ[_0x267430('0x15d')][_0x267430('0x13d')][_0x267430('0xd2')][_0x267430('0x5f')];return this[_0x267430('0xac')](_0x38e5f5,_0x269a7e);},SceneManager['isSceneBattle']=function(){const _0x27307b=_0x4c669b;return this[_0x27307b('0x169')]&&this[_0x27307b('0x169')]['constructor']===Scene_Battle;},BattleManager[_0x4c669b('0x4')]=function(_0x28def3){const _0x45b8ee=_0x4c669b,_0xda79cb=this[_0x45b8ee('0x2d')];if(!_0xda79cb){if(_0x45b8ee('0xde')!==_0x45b8ee('0xbc'))return null;else{function _0x34041d(){const _0x24adc6=_0x45b8ee;_0x12771c+=this['_battler'][_0x24adc6('0x48')]();}}}if(_0xda79cb[_0x45b8ee('0xb3')]()&&_0x28def3['isEnemy']())return'Battle\x20Actor\x20%1'[_0x45b8ee('0x49')](_0xda79cb['actorId']());else{if(_0xda79cb[_0x45b8ee('0x58')]()&&_0x28def3[_0x45b8ee('0xb3')]())return _0x45b8ee('0x62')['format'](_0xda79cb['index']());}return null;},BattleManager['convertStringToBattleTarget']=function(_0x2dd28b){const _0x10695a=_0x4c669b;if(!_0x2dd28b)return null;if(_0x2dd28b[_0x10695a('0x13')](/BATTLE ACTOR (\d+)/i))return $gameActors['actor'](Number(RegExp['$1']));else{if(_0x2dd28b[_0x10695a('0x13')](/BATTLE ENEMY (\d+)/i))return $gameTroop[_0x10695a('0x127')]()[Number(RegExp['$1'])];}return null;},BattleManager[_0x4c669b('0x11f')]=function(){const _0x22d5f6=_0x4c669b;return VisuMZ[_0x22d5f6('0x15d')][_0x22d5f6('0x13d')][_0x22d5f6('0xd2')][_0x22d5f6('0x36')];},VisuMZ[_0x4c669b('0x15d')][_0x4c669b('0x171')]=Game_Action[_0x4c669b('0x10a')][_0x4c669b('0xd0')],Game_Action[_0x4c669b('0x10a')][_0x4c669b('0xd0')]=function(_0x410ea0){const _0x53b9a8=_0x4c669b;if(this['isProvokeAffected']()){if(_0x53b9a8('0x109')===_0x53b9a8('0x5d')){function _0xb67fe0(){return _0x6d6ed1(_0x5e7b4c['$1'])*0.01;}}else return this[_0x53b9a8('0xe9')]();}else{if(this[_0x53b9a8('0x8f')]()){if(_0x53b9a8('0x103')!==_0x53b9a8('0x11a'))return this['tauntTargetsForAlive'](_0x410ea0);else{function _0x41015f(){const _0x3f80bd=_0x53b9a8;this[_0x3f80bd('0x134')]=0x0;}}}else return this[_0x53b9a8('0x137')]()?[_0x410ea0['highestTgrMember']()]:VisuMZ[_0x53b9a8('0x15d')][_0x53b9a8('0x171')][_0x53b9a8('0xa3')](this,_0x410ea0);}},Game_Action[_0x4c669b('0x10a')][_0x4c669b('0xdd')]=function(){const _0x1184d2=_0x4c669b;if(this['item']()[_0x1184d2('0x150')]!==0x1)return![];if(DataManager[_0x1184d2('0x1')](this[_0x1184d2('0x50')]()))return![];if(this[_0x1184d2('0x117')]()['bypassProvoke']())return![];return this[_0x1184d2('0x117')]()[_0x1184d2('0xdd')]();},Game_Action['prototype']['makeProvokeTarget']=function(){const _0x3f644c=_0x4c669b;return[this[_0x3f644c('0x117')]()[_0x3f644c('0xf8')]()];},Game_Action[_0x4c669b('0x10a')][_0x4c669b('0x8f')]=function(){const _0x1c0f8a=_0x4c669b;if(this[_0x1c0f8a('0x50')]()[_0x1c0f8a('0x150')]!==0x1)return![];if(DataManager[_0x1c0f8a('0x17')](this['item']()))return![];if(this[_0x1c0f8a('0x117')]()[_0x1c0f8a('0x122')]())return![];const _0x59587d=this[_0x1c0f8a('0xf6')]();if(this[_0x1c0f8a('0x79')]()&&_0x59587d[_0x1c0f8a('0xf4')]()[_0x1c0f8a('0x11')]>0x0)return!![];if(this['isMagical']()&&_0x59587d[_0x1c0f8a('0x129')]()[_0x1c0f8a('0x11')]>0x0)return!![];if(this[_0x1c0f8a('0x85')]()&&_0x59587d[_0x1c0f8a('0x102')]()[_0x1c0f8a('0x11')]>0x0)return!![];return![];},Game_Action[_0x4c669b('0x10a')][_0x4c669b('0x19')]=function(_0x2e26c1){const _0x5ab8db=_0x4c669b;if(this[_0x5ab8db('0x14a')]<0x0){if('fyskz'!=='fyskz'){function _0x30d068(){const _0x1407b0=_0x5ab8db;if(this[_0x1407b0('0x166')]()===_0x1407b0('0x15f')){let _0x8bd5a6=this[_0x1407b0('0x1b')](_0x45ed4a);_0x1189b7=_0x4a01c0[_0x1407b0('0x138')](_0x8bd5a6['y']+(_0x8bd5a6[_0x1407b0('0x139')]-_0x1037a0['prototype'][_0x1407b0('0xa8')]())/0x2);}}}else return[_0x2e26c1['randomTauntTarget'](this[_0x5ab8db('0x50')]()[_0x5ab8db('0xc2')])];}else{if('hNbbO'!==_0x5ab8db('0x99')){function _0x130c1b(){const _0x25eee4=_0x5ab8db,_0x3004a5=!![];return this[_0x25eee4('0x6a')](_0x198257,_0x3004a5);}}else{const _0x2d1d33=_0x2e26c1['smoothTarget'](this[_0x5ab8db('0x14a')]);if(_0x2d1d33['matchTauntType'](this[_0x5ab8db('0x50')]()[_0x5ab8db('0xc2')]))return[_0x2d1d33];else{if(_0x5ab8db('0x7a')===_0x5ab8db('0x7a'))return[_0x2e26c1['randomTauntTarget']()];else{function _0x46256d(){const _0x5b4ec9=_0x5ab8db;if(this[_0x5b4ec9('0xc8')](_0x225363)){if(this[_0x5b4ec9('0x6e')]===_0x7ac845)this[_0x5b4ec9('0x20')]();const _0x25734e=_0x8ec488[_0x5b4ec9('0x4')](this);this[_0x5b4ec9('0x6e')][_0x4d8028]=_0x25734e,!this[_0x5b4ec9('0x6e')][_0x216cee]&&delete this[_0x5b4ec9('0x6e')][_0x3a1c26];}}}}}}},Game_Action[_0x4c669b('0x10a')][_0x4c669b('0x137')]=function(){const _0x2af31f=_0x4c669b;if(this[_0x2af31f('0x50')]()[_0x2af31f('0x150')]!==0x1)return![];if(this[_0x2af31f('0x14a')]>=0x0)return![];if(DataManager[_0x2af31f('0x13b')](this[_0x2af31f('0x50')]()))return![];if(this[_0x2af31f('0x117')]()[_0x2af31f('0xe2')]())return![];if(DataManager[_0x2af31f('0xaa')](this['item']()))return!![];if(this[_0x2af31f('0x117')]()['alwaysTargetHighestAggro']())return!![];return BattleManager[_0x2af31f('0x11f')]();},VisuMZ[_0x4c669b('0x15d')]['Game_Action_applyGlobal']=Game_Action[_0x4c669b('0x10a')]['applyGlobal'],Game_Action[_0x4c669b('0x10a')][_0x4c669b('0x4a')]=function(){const _0x33dd02=_0x4c669b;VisuMZ[_0x33dd02('0x15d')][_0x33dd02('0x114')][_0x33dd02('0xa3')](this),this[_0x33dd02('0x151')]();},Game_Action[_0x4c669b('0x10a')][_0x4c669b('0x151')]=function(){const _0x5bd116=_0x4c669b,_0x1d5f38=this[_0x5bd116('0x50')]()[_0x5bd116('0x1e')];if(_0x1d5f38[_0x5bd116('0x13')](/<(?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT): ([\+\-]\d+)>/i)){const _0x4323d5=Number(RegExp['$1']);this[_0x5bd116('0x117')]()[_0x5bd116('0xef')](_0x4323d5);}if(_0x1d5f38[_0x5bd116('0x13')](/<JS (?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT)>\s*([\s\S]*)\s*<\/JS (?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT)>/i)){const _0x1bd512=String(RegExp['$1']),_0x2d5133=this[_0x5bd116('0x117')](),_0x45da4a=this[_0x5bd116('0x50')](),_0x10c218=this[_0x5bd116('0x117')](),_0x4a87ed=_0x10c218;let _0x3143fb=_0x2d5133[_0x5bd116('0xfb')]();try{eval(_0x1bd512);}catch(_0x4d7cf7){if('sNgSu'!==_0x5bd116('0x15b')){function _0x19ba96(){return _0x310b18+_0x4b43f4(_0x1136d2['$1'])/0x64;}}else{if($gameTemp[_0x5bd116('0xbd')]())console[_0x5bd116('0x72')](_0x4d7cf7);}}_0x2d5133['setAggro'](_0x3143fb);}},VisuMZ[_0x4c669b('0x15d')][_0x4c669b('0x8')]=Game_Action[_0x4c669b('0x10a')]['applyItemUserEffect'],Game_Action[_0x4c669b('0x10a')][_0x4c669b('0x47')]=function(_0x1e5875){const _0x58d131=_0x4c669b;VisuMZ[_0x58d131('0x15d')][_0x58d131('0x8')][_0x58d131('0xa3')](this,_0x1e5875),this['applyItemUserEffectAggroControl'](_0x1e5875);},Game_Action[_0x4c669b('0x10a')][_0x4c669b('0x11d')]=function(_0x4ae648){const _0x60e5c5=_0x4c669b;if(!this[_0x60e5c5('0x50')]())return;const _0x155992=this[_0x60e5c5('0x50')]()[_0x60e5c5('0x1e')];if(_0x155992[_0x60e5c5('0x13')](/<TARGET (?:AGGRO|ENMITY|THREAT): ([\+\-]\d+)>/i)){if(_0x60e5c5('0x112')==='lVfRs'){function _0x5e9e34(){const _0x2e3c76=_0x60e5c5,_0x3481f1=_0x28c7ca(_0xd56e47['$1']),_0x560977=this[_0x2e3c76('0x117')](),_0x12ca66=this[_0x2e3c76('0x50')](),_0x19b9ad=this[_0x2e3c76('0x117')](),_0xc43dcc=_0x19b9ad;let _0x34c43e=_0x560977['battleAggro']();try{_0x2258db(_0x3481f1);}catch(_0x1fbfb8){if(_0x2117c9[_0x2e3c76('0xbd')]())_0x5bf402['log'](_0x1fbfb8);}_0x560977['setAggro'](_0x34c43e);}}else{const _0x6b9522=Number(RegExp['$1']);_0x4ae648[_0x60e5c5('0xef')](_0x6b9522);}}if(_0x155992['match'](/<JS TARGET (?:AGGRO|ENMITY|THREAT)>\s*([\s\S]*)\s*<\/JS TARGET (?:AGGRO|ENMITY|THREAT)>/i)){const _0x4f39c5=String(RegExp['$1']),_0x54cc41=this[_0x60e5c5('0x117')](),_0x4d70e1=this['item'](),_0x160a43=this[_0x60e5c5('0x117')](),_0x1c4e91=_0x4ae648;let _0x38e3d0=_0x4ae648['battleAggro']();try{if('wFvce'===_0x60e5c5('0xad')){function _0x17c332(){const _0x1a89c1=_0x60e5c5,_0x184ee6=_0x256834[_0x1a89c1('0x15d')][_0x1a89c1('0x13d')][_0x1a89c1('0x182')];this[_0x1a89c1('0x57')]['x']=0.5,this[_0x1a89c1('0x57')]['y']=0.5,this[_0x1a89c1('0x32')]=0x0,this[_0x1a89c1('0x156')]=0x0,this[_0x1a89c1('0x9e')]=0x0,this[_0x1a89c1('0x6d')]=0x0,this[_0x1a89c1('0x134')]=0x0,this[_0x1a89c1('0x7e')]=_0x184ee6[_0x1a89c1('0x152')],this[_0x1a89c1('0x100')]=_0x184ee6[_0x1a89c1('0x14d')];}}else eval(_0x4f39c5);}catch(_0x16bd8e){if($gameTemp[_0x60e5c5('0xbd')]())console[_0x60e5c5('0x72')](_0x16bd8e);}_0x4ae648['setAggro'](_0x38e3d0);}},VisuMZ['AggroControlSystem'][_0x4c669b('0xb9')]=Game_Action['prototype'][_0x4c669b('0xaf')],Game_Action[_0x4c669b('0x10a')]['executeHpDamage']=function(_0x4f3470,_0x5ad00f){const _0xbba426=_0x4c669b;VisuMZ[_0xbba426('0x15d')]['Game_Action_executeHpDamage'][_0xbba426('0xa3')](this,_0x4f3470,_0x5ad00f),this[_0xbba426('0xa4')](_0x4f3470,_0x5ad00f);},Game_Action['prototype'][_0x4c669b('0xa4')]=function(_0x4b2e85,_0x3cd958){const _0x4b2f26=_0x4c669b,_0x138807=VisuMZ[_0x4b2f26('0x15d')][_0x4b2f26('0x13d')][_0x4b2f26('0xd2')];if(_0x3cd958>0x0&&_0x4b2e85['isActor']()!==this['subject']()['isActor']()){const _0xa9da38=_0x138807[_0x4b2f26('0x25')];this[_0x4b2f26('0x117')]()['gainAggro'](_0xa9da38*_0x3cd958);}if(_0x3cd958<0x0&&_0x4b2e85['isActor']()===this[_0x4b2f26('0x117')]()[_0x4b2f26('0xb3')]()){const _0x229b6b=_0x138807['AggroPerHeal'];this[_0x4b2f26('0x117')]()[_0x4b2f26('0xef')](_0x229b6b*Math[_0x4b2f26('0x168')](_0x3cd958));}},VisuMZ[_0x4c669b('0x15d')]['Game_BattlerBase_initMembers']=Game_BattlerBase['prototype'][_0x4c669b('0x59')],Game_BattlerBase[_0x4c669b('0x10a')][_0x4c669b('0x59')]=function(){const _0x344e77=_0x4c669b;this[_0x344e77('0x9a')]={},VisuMZ[_0x344e77('0x15d')][_0x344e77('0xec')][_0x344e77('0xa3')](this),this[_0x344e77('0x13a')]();},Game_BattlerBase[_0x4c669b('0x10a')]['initAggroControl']=function(){this['clearProvokers'](),this['clearAggro']();},Game_BattlerBase[_0x4c669b('0x10a')]['clearProvokers']=function(){this['_provoker']={};},VisuMZ[_0x4c669b('0x15d')][_0x4c669b('0x61')]=Game_BattlerBase['prototype'][_0x4c669b('0x80')],Game_BattlerBase[_0x4c669b('0x10a')][_0x4c669b('0x80')]=function(){const _0x2f5198=_0x4c669b;this[_0x2f5198('0x9a')]={},VisuMZ['AggroControlSystem'][_0x2f5198('0x61')][_0x2f5198('0xa3')](this);},Game_BattlerBase[_0x4c669b('0x10a')]['checkCacheKey']=function(_0x1ebaa7){const _0x246a04=_0x4c669b;return this[_0x246a04('0x9a')]=this[_0x246a04('0x9a')]||{},this['_cache'][_0x1ebaa7]!==undefined;},Game_BattlerBase[_0x4c669b('0x10a')][_0x4c669b('0xf8')]=function(){const _0x9a30c7=_0x4c669b;for(const _0xb9af00 of this['states']()){if(DataManager[_0x9a30c7('0x0')](_0xb9af00)){if(this[_0x9a30c7('0x6e')]===undefined)this[_0x9a30c7('0x20')]();const _0xcc1b89=this[_0x9a30c7('0x6e')][_0xb9af00['id']],_0x813dfe=BattleManager[_0x9a30c7('0x7f')](_0xcc1b89);if(_0x813dfe&&_0x813dfe['isAlive']())return _0x813dfe;}}return null;},Game_BattlerBase[_0x4c669b('0x10a')][_0x4c669b('0xdd')]=function(){const _0x20343d=_0x4c669b;return!!this[_0x20343d('0xf8')]();},Game_BattlerBase[_0x4c669b('0x10a')][_0x4c669b('0x37')]=function(){const _0x34db04=_0x4c669b;return this['traitObjects']()['some'](_0x2eae89=>_0x2eae89&&_0x2eae89[_0x34db04('0x1e')][_0x34db04('0x13')](/<BYPASS PROVOKE>/i));},Game_BattlerBase[_0x4c669b('0x10a')][_0x4c669b('0x170')]=function(){const _0x5dad3c=_0x4c669b;let _0x5aabfb=_0x5dad3c('0x170');if(this[_0x5dad3c('0x135')](_0x5aabfb))return this[_0x5dad3c('0x9a')][_0x5aabfb];return this[_0x5dad3c('0x9a')][_0x5aabfb]=this[_0x5dad3c('0x153')](),this[_0x5dad3c('0x9a')][_0x5aabfb];},Game_BattlerBase[_0x4c669b('0x10a')][_0x4c669b('0x153')]=function(){const _0xfd024b=_0x4c669b,_0x512193=this[_0xfd024b('0xb3')]()?this['actor']()[_0xfd024b('0x1e')]:this['isEnemy']()?this[_0xfd024b('0x110')]()[_0xfd024b('0x1e')]:'';if(_0x512193[_0xfd024b('0x13')](/<PROVOKE HEIGHT ORIGIN: (\d+)([%％])>/i))return Number(RegExp['$1'])*0.01;return VisuMZ['AggroControlSystem'][_0xfd024b('0x13d')][_0xfd024b('0x182')][_0xfd024b('0xb4')];},Game_BattlerBase[_0x4c669b('0x10a')][_0x4c669b('0x106')]=function(_0x1a4182){const _0x34bc6c=_0x4c669b;switch(_0x1a4182){case Game_Action[_0x34bc6c('0x12d')]:return this['physicalTaunt']();break;case Game_Action['HITTYPE_MAGICAL']:return this[_0x34bc6c('0x1a')]();break;case Game_Action[_0x34bc6c('0x107')]:return this['certainHitTaunt']();break;}},Game_BattlerBase[_0x4c669b('0x10a')][_0x4c669b('0x64')]=function(){const _0x396e78=_0x4c669b;return this[_0x396e78('0x121')]()||this[_0x396e78('0x1a')]()||this[_0x396e78('0x140')]();},Game_BattlerBase[_0x4c669b('0x10a')]['physicalTaunt']=function(){const _0x384253=_0x4c669b;return this['traitObjects']()[_0x384253('0x147')](_0x5ddd78=>_0x5ddd78&&_0x5ddd78['note'][_0x384253('0x13')](/<(?:TAUNT|PHYSICAL TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x4c669b('0x10a')][_0x4c669b('0x1a')]=function(){const _0x1728f9=_0x4c669b;return this[_0x1728f9('0x167')]()['some'](_0x1ac41d=>_0x1ac41d&&_0x1ac41d['note']['match'](/<(?:TAUNT|MAGICAL TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x4c669b('0x10a')][_0x4c669b('0x140')]=function(){const _0x37dc88=_0x4c669b;return this[_0x37dc88('0x167')]()[_0x37dc88('0x147')](_0x585e5a=>_0x585e5a&&_0x585e5a[_0x37dc88('0x1e')][_0x37dc88('0x13')](/<(?:TAUNT|CERTAIN TAUNT|CERTAIN HIT TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x4c669b('0x10a')][_0x4c669b('0x122')]=function(){const _0x2750e7=_0x4c669b;return this['traitObjects']()[_0x2750e7('0x147')](_0x2f1466=>_0x2f1466&&_0x2f1466[_0x2750e7('0x1e')][_0x2750e7('0x13')](/<BYPASS TAUNT>/i));},Game_BattlerBase['prototype'][_0x4c669b('0x95')]=function(){this['_aggro']=0x1;},VisuMZ['AggroControlSystem'][_0x4c669b('0x3e')]=Game_BattlerBase['prototype'][_0x4c669b('0xdb')],Game_BattlerBase[_0x4c669b('0x10a')][_0x4c669b('0xdb')]=function(_0x3f51a1){const _0x463c70=_0x4c669b;let _0x4200b5=VisuMZ[_0x463c70('0x15d')]['Game_BattlerBase_sparam'][_0x463c70('0xa3')](this,_0x3f51a1);if(_0x3f51a1===0x0){if(this[_0x463c70('0x23')]===undefined)this[_0x463c70('0x95')]();_0x4200b5*=this[_0x463c70('0x177')]();}return _0x4200b5;},Game_BattlerBase[_0x4c669b('0x10a')][_0x4c669b('0x75')]=function(_0x1709c2){const _0x1f9c13=_0x4c669b;if(this[_0x1f9c13('0x23')]===undefined)this[_0x1f9c13('0x95')]();this['_aggro']=Math['max'](0x1,Math['round'](this[_0x1f9c13('0x23')]));},Game_BattlerBase[_0x4c669b('0x10a')][_0x4c669b('0xef')]=function(_0x20ba9e){const _0x45fa9e=_0x4c669b;if(this['_aggro']===undefined)this[_0x45fa9e('0x95')]();this[_0x45fa9e('0x23')]=Math[_0x45fa9e('0x84')](0x1,this[_0x45fa9e('0x23')]+Math['round'](_0x20ba9e));},Game_BattlerBase[_0x4c669b('0x10a')][_0x4c669b('0xdf')]=function(_0x1d38ab){const _0x3abb68=_0x4c669b;this[_0x3abb68('0xef')](-_0x1d38ab);},Game_BattlerBase[_0x4c669b('0x10a')]['aggro']=function(){const _0x3d7646=_0x4c669b;if(this[_0x3d7646('0x93')]())return 0x0;return this[_0x3d7646('0xa7')]()*this['aggroMultiplier']();},Game_BattlerBase['prototype'][_0x4c669b('0xfb')]=function(){const _0x2e2065=_0x4c669b;return this[_0x2e2065('0x23')]===undefined&&this[_0x2e2065('0x95')](),this['_aggro'];},Game_BattlerBase['prototype'][_0x4c669b('0xa7')]=function(){const _0x407a07=_0x4c669b;return this['traitObjects']()[_0x407a07('0x133')]((_0x3886af,_0x2caa67)=>{const _0xf64083=_0x407a07;if(_0x2caa67&&_0x2caa67['note'][_0xf64083('0x13')](/<(?:AGGRO|ENMITY|THREAT): ([\+\-]\d+)>/i)){if(_0xf64083('0x111')===_0xf64083('0x148')){function _0x37430a(){return _0x443677+_0x22a4fa(_0x1b67b7['$1'])/0x64;}}else return _0x3886af+Number(RegExp['$1'])/0x64;}else return _0x3886af;},this[_0x407a07('0xfb')]());},Game_BattlerBase[_0x4c669b('0x10a')][_0x4c669b('0xa0')]=function(){const _0x5ab044=_0x4c669b;return this[_0x5ab044('0x167')]()[_0x5ab044('0x133')]((_0x5afed0,_0x85eae9)=>{const _0x222507=_0x5ab044;if('PvTXR'==='ekLsX'){function _0x5501bb(){const _0x4b6e88=_0x25b9;return[_0x3440d9[_0x4b6e88('0xa2')](this[_0x4b6e88('0x50')]()[_0x4b6e88('0xc2')])];}}else{if(_0x85eae9&&_0x85eae9[_0x222507('0x1e')]['match'](/<(?:AGGRO|ENMITY|THREAT) MULTIPLIER: (\d+)%>/i))return _0x5afed0+Number(RegExp['$1'])/0x64;else{if(_0x222507('0x51')!==_0x222507('0xee'))return _0x5afed0;else{function _0x5aebe4(){const _0x1bbae0=_0x222507;_0x46a473=_0x581f51['x']+_0x417d67[_0x1bbae0('0x101')]+0x8;}}}}},0x1);},Game_BattlerBase[_0x4c669b('0x10a')][_0x4c669b('0xe2')]=function(){const _0x41942d=_0x4c669b;return this[_0x41942d('0x167')]()['some'](_0x1e6e4c=>_0x1e6e4c&&_0x1e6e4c[_0x41942d('0x1e')][_0x41942d('0x13')](/<BYPASS HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));},Game_BattlerBase[_0x4c669b('0x10a')][_0x4c669b('0xaa')]=function(){const _0x3fecfd=_0x4c669b;return this[_0x3fecfd('0x167')]()[_0x3fecfd('0x147')](_0x27bb73=>_0x27bb73&&_0x27bb73['note']['match'](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));},VisuMZ[_0x4c669b('0x15d')][_0x4c669b('0x10f')]=Game_Battler[_0x4c669b('0x10a')][_0x4c669b('0x183')],Game_Battler[_0x4c669b('0x10a')][_0x4c669b('0x183')]=function(_0x25efcd){const _0x418914=_0x4c669b;VisuMZ[_0x418914('0x15d')][_0x418914('0x10f')][_0x418914('0xa3')](this,_0x25efcd),this[_0x418914('0x95')]();},VisuMZ[_0x4c669b('0x15d')][_0x4c669b('0x141')]=Game_Battler[_0x4c669b('0x10a')][_0x4c669b('0xf5')],Game_Battler['prototype'][_0x4c669b('0xf5')]=function(_0x8a23db){const _0x339817=_0x4c669b;VisuMZ[_0x339817('0x15d')][_0x339817('0x141')]['call'](this,_0x8a23db),this[_0x339817('0x16c')](_0x8a23db);},Game_Battler[_0x4c669b('0x10a')][_0x4c669b('0x16c')]=function(_0x5e21da){const _0x2e92a9=_0x4c669b;if(this[_0x2e92a9('0xc8')](_0x5e21da)){if(this[_0x2e92a9('0x6e')]===undefined)this[_0x2e92a9('0x20')]();const _0x4228ee=BattleManager[_0x2e92a9('0x4')](this);this[_0x2e92a9('0x6e')][_0x5e21da]=_0x4228ee,!this[_0x2e92a9('0x6e')][_0x5e21da]&&delete this[_0x2e92a9('0x6e')][_0x5e21da];}},Game_Unit['prototype']['physicalTauntMembers']=function(){const _0x5edd15=_0x4c669b;return this[_0x5edd15('0x115')]()[_0x5edd15('0xbf')](_0x5673eb=>_0x5673eb&&_0x5673eb[_0x5edd15('0x121')]());},Game_Unit['prototype']['magicalTauntMembers']=function(){const _0x507b42=_0x4c669b;return this[_0x507b42('0x115')]()[_0x507b42('0xbf')](_0x5828a0=>_0x5828a0&&_0x5828a0['magicalTaunt']());},Game_Unit[_0x4c669b('0x10a')]['certainHitTauntMembers']=function(){const _0x508d1a=_0x4c669b;return this[_0x508d1a('0x115')]()[_0x508d1a('0xbf')](_0x1eae31=>_0x1eae31&&_0x1eae31[_0x508d1a('0x140')]());},Game_Unit[_0x4c669b('0x10a')]['randomTauntTarget']=function(_0x3ad5f8){const _0xa0daa2=_0x4c669b;let _0x31a17e=[];switch(_0x3ad5f8){case Game_Action[_0xa0daa2('0x12d')]:_0x31a17e=this[_0xa0daa2('0xf4')]();break;case Game_Action[_0xa0daa2('0x126')]:_0x31a17e=this[_0xa0daa2('0x129')]();break;case Game_Action['HITTYPE_CERTAIN']:_0x31a17e=this[_0xa0daa2('0x102')]();break;}let _0x4fb9cb=Math['random']()*this[_0xa0daa2('0x30')](_0x31a17e),_0x2542b5=null;if(BattleManager[_0xa0daa2('0x11f')]()){if(_0xa0daa2('0xea')!==_0xa0daa2('0xea')){function _0x44ff21(){const _0x3f331f=_0xa0daa2;if(this[_0x3f331f('0x53')])return this[_0x3f331f('0x53')];return this[_0x3f331f('0x53')]=new _0x1f0752(0x64,0x64),this['_provokeBitmap']['drawCircle'](0x32,0x32,0x32,_0x2c450b[_0x3f331f('0x2e')]()),this[_0x3f331f('0x53')];}}else{const _0x38e1fe=!![];return this[_0xa0daa2('0x6a')](_0x31a17e,_0x38e1fe);}}else{if(_0xa0daa2('0x157')!==_0xa0daa2('0x10')){for(const _0x4de89d of _0x31a17e){_0x4fb9cb-=_0x4de89d[_0xa0daa2('0xeb')];if(_0x4fb9cb<=0x0&&!_0x2542b5){if('JUcjR'!==_0xa0daa2('0x14b')){function _0x18d460(){const _0x36aa71=_0xa0daa2;this[_0x36aa71('0x20')](),this[_0x36aa71('0x95')]();}}else _0x2542b5=_0x4de89d;}}return _0x2542b5||this[_0xa0daa2('0x185')]();}else{function _0x555883(){const _0x2027cb=_0xa0daa2;for(const _0x14e194 of this[_0x2027cb('0x6b')]()){if(_0x4ea9c3[_0x2027cb('0x0')](_0x14e194)){if(this[_0x2027cb('0x6e')]===_0x1913f0)this[_0x2027cb('0x20')]();const _0x5017e1=this[_0x2027cb('0x6e')][_0x14e194['id']],_0x367413=_0x348cca[_0x2027cb('0x7f')](_0x5017e1);if(_0x367413&&_0x367413[_0x2027cb('0xbe')]())return _0x367413;}}return null;}}}},Game_Unit['prototype'][_0x4c669b('0x30')]=function(_0x23bae8){const _0xbff1b5=_0x4c669b;return _0x23bae8[_0xbff1b5('0x133')]((_0x5dd0d9,_0x501c7b)=>_0x5dd0d9+_0x501c7b[_0xbff1b5('0xeb')],0x0);},Game_Unit[_0x4c669b('0x10a')][_0x4c669b('0x144')]=function(){const _0xb5bcef=_0x4c669b,_0x164d0e=this[_0xb5bcef('0x115')]()[_0xb5bcef('0x11e')](_0x1933e3=>_0x1933e3['tgr']);return Math['max'](..._0x164d0e);},Game_Unit['prototype'][_0x4c669b('0x21')]=function(){const _0x8f6c6d=_0x4c669b,_0x2d3b4f=this[_0x8f6c6d('0x115')]()[_0x8f6c6d('0x11e')](_0x5c3a81=>_0x5c3a81[_0x8f6c6d('0xeb')]);return Math['min'](..._0x2d3b4f);},Game_Unit[_0x4c669b('0x10a')]['highestTgrMember']=function(){const _0x52ba78=_0x4c669b,_0x3d9e27=this['tgrMax'](),_0xd2eaf6=this[_0x52ba78('0x115')]()['filter'](_0x10c33e=>_0x10c33e[_0x52ba78('0xeb')]===_0x3d9e27);return _0xd2eaf6[Math[_0x52ba78('0x15c')](_0xd2eaf6[_0x52ba78('0x11')])]||this[_0x52ba78('0x185')]();},Game_Unit[_0x4c669b('0x10a')]['lowestTgrMember']=function(){const _0x37a9b6=_0x4c669b,_0x551492=this[_0x37a9b6('0x21')](),_0x2fe3dd=this[_0x37a9b6('0x115')]()['filter'](_0x1d7266=>_0x1d7266['tgr']===_0x551492);return _0x2fe3dd[Math['randomInt'](_0x2fe3dd[_0x37a9b6('0x11')])]||this['randomTarget']();},Game_Unit[_0x4c669b('0x10a')][_0x4c669b('0x6a')]=function(_0x2306ef,_0x1551b){const _0x27280c=_0x4c669b,_0x246cc9=_0x2306ef['map'](_0x444ae1=>_0x444ae1[_0x27280c('0xeb')]),_0x578bab=_0x1551b?Math[_0x27280c('0x84')](..._0x246cc9):Math[_0x27280c('0x184')](..._0x246cc9),_0x5b1a01=_0x2306ef[_0x27280c('0xbf')](_0x3aae91=>_0x3aae91[_0x27280c('0xeb')]===_0x578bab);return _0x5b1a01[Math[_0x27280c('0x15c')](_0x5b1a01[_0x27280c('0x11')])]||this[_0x27280c('0x185')]();},VisuMZ[_0x4c669b('0x15d')][_0x4c669b('0x12e')]=Scene_Options[_0x4c669b('0x10a')]['maxCommands'],Scene_Options[_0x4c669b('0x10a')][_0x4c669b('0xd')]=function(){const _0x22a4ce=_0x4c669b;let _0x13c24f=VisuMZ['AggroControlSystem'][_0x22a4ce('0x12e')][_0x22a4ce('0xa3')](this);const _0x40a537=VisuMZ['AggroControlSystem'][_0x22a4ce('0x13d')];if(_0x40a537[_0x22a4ce('0x182')][_0x22a4ce('0x87')]&&_0x40a537['Provoke'][_0x22a4ce('0x6f')])_0x13c24f++;if(_0x40a537[_0x22a4ce('0xd2')][_0x22a4ce('0x87')]&&_0x40a537[_0x22a4ce('0xd2')][_0x22a4ce('0x6f')])_0x13c24f++;return _0x13c24f;},Sprite_Battler['_animationCycleTime']=VisuMZ['AggroControlSystem'][_0x4c669b('0x13d')][_0x4c669b('0xb1')][_0x4c669b('0x43')],Sprite_Battler[_0x4c669b('0xfa')]=VisuMZ[_0x4c669b('0x15d')][_0x4c669b('0x13d')]['Taunt'][_0x4c669b('0x3f')],Sprite_Battler['_magicalTauntAnimation']=VisuMZ[_0x4c669b('0x15d')]['Settings']['Taunt'][_0x4c669b('0x7b')],Sprite_Battler['_certainHitTauntAnimation']=VisuMZ[_0x4c669b('0x15d')]['Settings'][_0x4c669b('0xb1')][_0x4c669b('0x105')],Sprite_Battler[_0x4c669b('0xe0')]=VisuMZ[_0x4c669b('0x15d')][_0x4c669b('0x13d')]['Taunt'][_0x4c669b('0xd8')],Sprite_Battler[_0x4c669b('0x17a')]=VisuMZ[_0x4c669b('0x15d')][_0x4c669b('0x13d')][_0x4c669b('0xb1')][_0x4c669b('0x4b')],VisuMZ[_0x4c669b('0x15d')][_0x4c669b('0x41')]=Sprite_Battler[_0x4c669b('0x10a')]['initialize'],Sprite_Battler[_0x4c669b('0x10a')][_0x4c669b('0x8a')]=function(_0x198a5b){const _0x2973af=_0x4c669b;VisuMZ[_0x2973af('0x15d')][_0x2973af('0x41')][_0x2973af('0xa3')](this,_0x198a5b),this[_0x2973af('0x8c')]()&&setTimeout(this[_0x2973af('0xb2')]['bind'](this),0x3e8);},VisuMZ[_0x4c669b('0x15d')][_0x4c669b('0x9b')]=Sprite_Battler[_0x4c669b('0x10a')][_0x4c669b('0x59')],Sprite_Battler[_0x4c669b('0x10a')][_0x4c669b('0x59')]=function(){const _0x3ecf30=_0x4c669b;VisuMZ['AggroControlSystem'][_0x3ecf30('0x9b')][_0x3ecf30('0xa3')](this),this[_0x3ecf30('0x146')]();},Sprite_Battler[_0x4c669b('0x10a')][_0x4c669b('0x146')]=function(){const _0x4b67aa=_0x4c669b;this[_0x4b67aa('0x13e')]=VisuMZ[_0x4b67aa('0x15d')][_0x4b67aa('0x13d')][_0x4b67aa('0xb1')][_0x4b67aa('0x43')],this[_0x4b67aa('0x16b')]=[_0x4b67aa('0x12a'),_0x4b67aa('0x124'),_0x4b67aa('0xe4')];},Sprite_Battler[_0x4c669b('0x10a')][_0x4c669b('0x8c')]=function(){const _0x35089d=_0x4c669b;if(!Imported[_0x35089d('0x9d')])return![];if(![Sprite_Actor,Sprite_Enemy]['includes'](this[_0x35089d('0xb5')]))return![];return ConfigManager[_0x35089d('0x13f')]&&VisuMZ['AggroControlSystem'][_0x35089d('0x13d')]['Provoke'][_0x35089d('0x2')];},Sprite_Battler['prototype'][_0x4c669b('0xb2')]=function(){const _0x173db6=_0x4c669b;if(!SceneManager[_0x173db6('0x39')]())return;this[_0x173db6('0xfd')]=new Sprite_ProvokeTrail(this),this[_0x173db6('0xfd')][_0x173db6('0xd1')]()['addChild'](this['_provokeSprite']);},VisuMZ['AggroControlSystem'][_0x4c669b('0xf1')]=Sprite_Battler[_0x4c669b('0x10a')][_0x4c669b('0x69')],Sprite_Battler[_0x4c669b('0x10a')][_0x4c669b('0x69')]=function(_0x4ad620){const _0x438881=_0x4c669b;VisuMZ[_0x438881('0x15d')]['Sprite_Battler_setBattler'][_0x438881('0xa3')](this,_0x4ad620);if(this[_0x438881('0xcb')])this[_0x438881('0xcb')][_0x438881('0xdc')]=_0x4ad620;},VisuMZ[_0x4c669b('0x15d')]['Sprite_Battler_update']=Sprite_Battler['prototype']['update'],Sprite_Battler[_0x4c669b('0x10a')]['update']=function(){const _0xd388e9=_0x4c669b;VisuMZ['AggroControlSystem'][_0xd388e9('0xe5')][_0xd388e9('0xa3')](this),this[_0xd388e9('0x14c')]();},Sprite_Battler[_0x4c669b('0x10a')][_0x4c669b('0x14c')]=function(){const _0x2d8921=_0x4c669b;if(!Imported['VisuMZ_0_CoreEngine'])return;if(!Imported[_0x2d8921('0x9d')])return;if(!VisuMZ[_0x2d8921('0x15d')]['Settings'][_0x2d8921('0xb1')]['ShowAnimation'])return;if(!this[_0x2d8921('0xdc')])return;this[_0x2d8921('0x13e')]--,this['_tauntAnimationTimer']<=0x0&&this[_0x2d8921('0xd5')]();},Sprite_Battler[_0x4c669b('0x10a')][_0x4c669b('0xd5')]=function(){const _0x59a915=_0x4c669b;this[_0x59a915('0x13e')]=Sprite_Battler[_0x59a915('0xce')];if(!this[_0x59a915('0xdc')])return;if(!this['_battler'][_0x59a915('0x64')]())return;const _0x45d922=[this[_0x59a915('0xdc')]],_0x5a8eed=this[_0x59a915('0x2c')](),_0x384508=this[_0x59a915('0xdc')][_0x59a915('0xb3')]()&&Sprite_Battler[_0x59a915('0xe0')],_0x17cc93=Sprite_Battler['_muteTauntAnimations'];$gameTemp[_0x59a915('0x104')](_0x45d922,_0x5a8eed,_0x384508,_0x17cc93);},Sprite_Battler['prototype'][_0x4c669b('0x2c')]=function(){const _0x15bd59=_0x4c669b;let _0x1e6467=this['_tauntAnimationCycle'][_0x15bd59('0x11')];while(_0x1e6467){const _0x2b8085=this[_0x15bd59('0x16b')]['shift']();this[_0x15bd59('0x16b')][_0x15bd59('0x12')](_0x2b8085);const _0x1c77d1=_0x15bd59('0x18')['format'](_0x2b8085);if(this['_battler'][_0x1c77d1]()){const _0x5ab5a9=_0x15bd59('0x16a')[_0x15bd59('0x49')](_0x2b8085),_0x1ad9cf=Sprite_Battler[_0x5ab5a9];if(_0x1ad9cf)return _0x1ad9cf;}_0x1e6467--;}return Sprite_Battler['_certainHitTauntAnimation'];},VisuMZ[_0x4c669b('0x15d')][_0x4c669b('0xcd')]=Sprite_Actor[_0x4c669b('0x10a')][_0x4c669b('0x158')],Sprite_Actor[_0x4c669b('0x10a')]['createStateSprite']=function(){const _0x108f7c=_0x4c669b;VisuMZ[_0x108f7c('0x15d')][_0x108f7c('0xcd')][_0x108f7c('0xa3')](this),this[_0x108f7c('0x15e')]();},Sprite_Actor[_0x4c669b('0x10a')][_0x4c669b('0x15e')]=function(){const _0x1c8deb=_0x4c669b;if(this['constructor']!==Sprite_Actor)return;if(!this[_0x1c8deb('0x17e')]())return;if(!SceneManager['isSceneBattle']())return;const _0x15c86b=VisuMZ[_0x1c8deb('0x15d')][_0x1c8deb('0x13d')]['Aggro'],_0x30268c=new Sprite_Gauge();_0x30268c['anchor']['x']=_0x15c86b[_0x1c8deb('0xd6')],_0x30268c[_0x1c8deb('0x57')]['y']=_0x15c86b[_0x1c8deb('0x42')];const _0x19dfb9=Sprite_Gauge[_0x1c8deb('0x10a')][_0x1c8deb('0x142')]();_0x30268c[_0x1c8deb('0xd7')]['x']=_0x30268c[_0x1c8deb('0xd7')]['y']=_0x15c86b['Scale'],this[_0x1c8deb('0xcb')]=_0x30268c,this[_0x1c8deb('0xa9')](_0x30268c);},Sprite_Actor[_0x4c669b('0x10a')]['isAggroGaugeVisible']=function(){const _0x2167c2=_0x4c669b;if(Imported[_0x2167c2('0x9d')]&&this['constructor']===Sprite_SvEnemy)return![];return ConfigManager[_0x2167c2('0x174')]&&VisuMZ[_0x2167c2('0x15d')][_0x2167c2('0x13d')][_0x2167c2('0xd2')][_0x2167c2('0x15a')];},VisuMZ[_0x4c669b('0x15d')][_0x4c669b('0x173')]=Sprite_Actor['prototype'][_0x4c669b('0x118')],Sprite_Actor['prototype'][_0x4c669b('0x118')]=function(){const _0x561b2d=_0x4c669b;VisuMZ[_0x561b2d('0x15d')]['Sprite_Actor_update'][_0x561b2d('0xa3')](this),this['updateAggroGaugeSprite']();},Sprite_Actor[_0x4c669b('0x10a')][_0x4c669b('0x33')]=function(){const _0x98273a=_0x4c669b;if(!this[_0x98273a('0xdc')])return;if(!this['_aggroGaugeSprite'])return;const _0x1eb35c=VisuMZ[_0x98273a('0x15d')][_0x98273a('0x13d')][_0x98273a('0xd2')],_0x992af0=this[_0x98273a('0xcb')];let _0x5a3824=_0x1eb35c[_0x98273a('0xc9')];this[_0x98273a('0xdc')][_0x98273a('0x48')]&&(_0x5a3824+=this[_0x98273a('0xdc')][_0x98273a('0x48')]());let _0x22e8bb=_0x1eb35c[_0x98273a('0x76')];this['_battler']['battleUIOffsetY']&&(_0x22e8bb+=this[_0x98273a('0xdc')]['battleUIOffsetY']());_0x992af0['x']=_0x5a3824,_0x992af0['y']=-this[_0x98273a('0x139')]+_0x22e8bb;this[_0x98273a('0xdc')]&&_0x992af0['_statusType']!=='aggro'&&(_0x992af0[_0x98273a('0xda')]=!![],_0x992af0['setup'](this['_battler'],_0x98273a('0x177')));if(this[_0x98273a('0xd7')]['x']<0x0){if(_0x98273a('0xe6')!==_0x98273a('0x9f'))_0x992af0[_0x98273a('0xd7')]['x']=-Math[_0x98273a('0x168')](_0x992af0[_0x98273a('0xd7')]['x']);else{function _0x22bbf8(){const _0x3e8dfb=_0x98273a;_0x542091[_0x3e8dfb('0x15d')][_0x3e8dfb('0x97')][_0x3e8dfb('0xa3')](this),this['addAggroControlSystemCommands']();}}}},Sprite_Gauge[_0x4c669b('0x10a')]['isAggroType']=function(){const _0x127da4=_0x4c669b;return this[_0x127da4('0xdc')]&&this['_statusType']===_0x127da4('0x177');},VisuMZ[_0x4c669b('0x15d')][_0x4c669b('0x7')]=Sprite_Gauge[_0x4c669b('0x10a')]['gaugeX'],Sprite_Gauge[_0x4c669b('0x10a')]['gaugeX']=function(){const _0x17ae70=_0x4c669b;if(this['isAggroType']()){if(_0x17ae70('0x130')===_0x17ae70('0x130'))return 0x0;else{function _0x17decb(){const _0x43ea89=_0x17ae70;if(this['item']()[_0x43ea89('0x150')]!==0x1)return![];if(_0x205fea[_0x43ea89('0x17')](this[_0x43ea89('0x50')]()))return![];if(this['subject']()['bypassTaunt']())return![];const _0x5b5495=this[_0x43ea89('0xf6')]();if(this['isPhysical']()&&_0x5b5495[_0x43ea89('0xf4')]()[_0x43ea89('0x11')]>0x0)return!![];if(this[_0x43ea89('0x155')]()&&_0x5b5495[_0x43ea89('0x129')]()[_0x43ea89('0x11')]>0x0)return!![];if(this['isCertainHit']()&&_0x5b5495[_0x43ea89('0x102')]()['length']>0x0)return!![];return![];}}}else return VisuMZ[_0x17ae70('0x15d')][_0x17ae70('0x7')]['call'](this);},VisuMZ[_0x4c669b('0x15d')][_0x4c669b('0x161')]=Sprite_Gauge[_0x4c669b('0x10a')][_0x4c669b('0x83')],Sprite_Gauge['prototype'][_0x4c669b('0x83')]=function(){const _0x1b5165=_0x4c669b;let _0x4e088c=VisuMZ[_0x1b5165('0x15d')][_0x1b5165('0x161')]['call'](this);if(this['isAggroType']()&&this[_0x1b5165('0xdc')]){if(this[_0x1b5165('0xdc')]['isDead']())return 0x0;if(this['_battler'][_0x1b5165('0xbe')]()&&this[_0x1b5165('0xdc')][_0x1b5165('0x163')]()[_0x1b5165('0x115')]()[_0x1b5165('0x11')]===0x1)return 0x1;}return _0x4e088c[_0x1b5165('0x81')](0x0,0x1);},VisuMZ[_0x4c669b('0x15d')][_0x4c669b('0x55')]=Sprite_Gauge[_0x4c669b('0x10a')][_0x4c669b('0x27')],Sprite_Gauge[_0x4c669b('0x10a')][_0x4c669b('0x27')]=function(){const _0x3765f8=_0x4c669b;if(this['isAggroType']()){if('UCbpZ'!==_0x3765f8('0xc3'))return this[_0x3765f8('0x15')]();else{function _0x41174a(){const _0x4ef9c5=_0x3765f8;if(!_0x52832e)return![];return _0xe009bc[_0x4ef9c5('0x1e')][_0x4ef9c5('0x13')](/<BYPASS PROVOKE>/i);}}}else{if('yYHiF'!==_0x3765f8('0xed')){function _0x14916a(){const _0x536b30=_0x3765f8;let _0x4856e0=this[_0x536b30('0x1b')](_0x2fa9a1);_0x449052=_0x318012[_0x536b30('0x138')](_0x4856e0['y']+(_0x4856e0['height']-_0x2bef4a[_0x536b30('0x10a')][_0x536b30('0xa8')]())/0x2);}}else return VisuMZ[_0x3765f8('0x15d')]['Sprite_Gauge_currentValue'][_0x3765f8('0xa3')](this);}},Sprite_Gauge[_0x4c669b('0x10a')][_0x4c669b('0x15')]=function(){const _0x2fcc6c=_0x4c669b,_0x2e80ef=this['_battler']['friendsUnit'](),_0x148620=this[_0x2fcc6c('0xdc')][_0x2fcc6c('0xeb')]-_0x2e80ef[_0x2fcc6c('0x21')](),_0x2a7111=_0x2e80ef['tgrMax']()-_0x2e80ef[_0x2fcc6c('0x21')]();if(_0x148620>=_0x2a7111)return 0x64;return _0x148620/Math[_0x2fcc6c('0x84')](_0x2a7111,0x1)*0x64;},VisuMZ[_0x4c669b('0x15d')][_0x4c669b('0x1c')]=Sprite_Gauge[_0x4c669b('0x10a')][_0x4c669b('0x28')],Sprite_Gauge[_0x4c669b('0x10a')][_0x4c669b('0x28')]=function(){const _0x59effc=_0x4c669b;if(this[_0x59effc('0x38')]()){if('kYwxK'===_0x59effc('0x162')){function _0x35662d(){const _0x2636b0=_0x59effc,_0x215020=this[_0x2636b0('0x1b')](_0x2f8b08);let _0x5a61d4=this[_0x2636b0('0x17c')](_0x215020);if(_0x20dc75['VisuMZ_1_BattleCore']){if(this[_0x2636b0('0x166')]()===_0x2636b0('0x15f')){let _0x29ae5b=this[_0x2636b0('0x1b')](_0x41c553);_0x5a61d4=_0x4d306a[_0x2636b0('0x138')](_0x29ae5b['y']+(_0x29ae5b[_0x2636b0('0x139')]-_0x23b119[_0x2636b0('0x10a')][_0x2636b0('0xa8')]())/0x2);}}if(this['isAtbGaugeVisible']())_0x5a61d4-=_0x42c92d[_0x2636b0('0x10a')][_0x2636b0('0x132')]()-0x1;return _0x5a61d4;}}else return this[_0x59effc('0x108')]();}else{if('GjLxx'!==_0x59effc('0x98')){function _0x278f66(){const _0x16a766=_0x59effc;return this[_0x16a766('0x167')]()[_0x16a766('0x147')](_0x209feb=>_0x209feb&&_0x209feb[_0x16a766('0x1e')]['match'](/<BYPASS TAUNT>/i));}}else return VisuMZ[_0x59effc('0x15d')][_0x59effc('0x1c')]['call'](this);}},Sprite_Gauge[_0x4c669b('0x10a')]['currentMaxValueAggroControl']=function(){return 0x64;},VisuMZ[_0x4c669b('0x15d')]['Sprite_Gauge_gaugeColor1']=Sprite_Gauge[_0x4c669b('0x10a')]['gaugeColor1'],Sprite_Gauge[_0x4c669b('0x10a')]['gaugeColor1']=function(){const _0x49c827=_0x4c669b;if(this[_0x49c827('0x38')]()){if(_0x49c827('0xf9')===_0x49c827('0x54')){function _0x353730(){const _0x3561c0=_0x49c827;_0x4d976a['AggroControlSystem']['Game_Battler_onBattleStart']['call'](this,_0x30c637),this[_0x3561c0('0x95')]();}}else return ColorManager[_0x49c827('0x2f')]();}else return VisuMZ[_0x49c827('0x15d')][_0x49c827('0x120')]['call'](this);},VisuMZ[_0x4c669b('0x15d')][_0x4c669b('0xc4')]=Sprite_Gauge[_0x4c669b('0x10a')]['gaugeColor2'],Sprite_Gauge[_0x4c669b('0x10a')][_0x4c669b('0x10b')]=function(){const _0x2cea64=_0x4c669b;if(this['isAggroType']()){if(_0x2cea64('0x113')!==_0x2cea64('0x113')){function _0x2e51a2(){const _0x30a9bf=_0x2cea64,_0x46efc4=_0x34ef77(_0x33d1a3['$1']);_0x46efc4!==_0x3962be[_0x304132]['version']&&(_0x1e4ceb(_0x30a9bf('0xa5')[_0x30a9bf('0x49')](_0x1d3383,_0x46efc4)),_0x3c0ec7['exit']());}}else return ColorManager[_0x2cea64('0x172')]();}else{if(_0x2cea64('0x9')===_0x2cea64('0x9'))return VisuMZ[_0x2cea64('0x15d')][_0x2cea64('0xc4')][_0x2cea64('0xa3')](this);else{function _0x2454a1(){const _0x2404e2=_0x2cea64;return this[_0x2404e2('0x108')]();}}}},VisuMZ['AggroControlSystem'][_0x4c669b('0x2a')]=Sprite_Gauge[_0x4c669b('0x10a')][_0x4c669b('0x118')],Sprite_Gauge[_0x4c669b('0x10a')][_0x4c669b('0x118')]=function(){const _0x240908=_0x4c669b;VisuMZ['AggroControlSystem']['Sprite_Gauge_update'][_0x240908('0xa3')](this),this['updateOpacityAggroControl']();},Sprite_Gauge[_0x4c669b('0x10a')][_0x4c669b('0xc5')]=function(){const _0x24d3d4=_0x4c669b;if(!this[_0x24d3d4('0x38')]())return;if(!Imported['VisuMZ_1_BattleCore'])return;const _0x318c59=this['_battler']['battler']();if(this[_0x24d3d4('0x5b')]){if(_0x24d3d4('0x46')!==_0x24d3d4('0x46')){function _0x55d40e(){const _0x3d503d=_0x24d3d4;if(!_0x2db2f2['inBattle']())return;_0x377484[_0x3d503d('0x3a')](_0x4116e0,_0x37ed73);const _0x3baaf6=_0x2742e0['actor'](_0x53196e['ActorID']),_0x1a0f3f=_0x305663['Aggro'];if(_0x3baaf6)_0x3baaf6[_0x3d503d('0xef')](_0x1a0f3f);}}else this[_0x24d3d4('0x134')]=0xff;}else _0x318c59&&_0x318c59[_0x24d3d4('0x134')]>0x0?this['opacity']=0xff:this[_0x24d3d4('0x134')]=0x0;},VisuMZ['AggroControlSystem']['Sprite_Gauge_drawValue']=Sprite_Gauge[_0x4c669b('0x10a')][_0x4c669b('0xb')],Sprite_Gauge[_0x4c669b('0x10a')][_0x4c669b('0xb')]=function(){const _0xc94c78=_0x4c669b;if(this['isAggroType']())return;VisuMZ['AggroControlSystem'][_0xc94c78('0xc0')][_0xc94c78('0xa3')](this);};function Sprite_ProvokeTrail(){this['initialize'](...arguments);}Sprite_ProvokeTrail[_0x4c669b('0x10a')]=Object[_0x4c669b('0xf')](Sprite[_0x4c669b('0x10a')]),Sprite_ProvokeTrail[_0x4c669b('0x10a')][_0x4c669b('0xb5')]=Sprite_ProvokeTrail,Sprite_ProvokeTrail[_0x4c669b('0x10a')]['initialize']=function(_0x14a874){const _0x571492=_0x4c669b;this[_0x571492('0x67')]=_0x14a874,Sprite['prototype']['initialize'][_0x571492('0xa3')](this),this[_0x571492('0x59')](),this[_0x571492('0xb0')]();},Sprite_ProvokeTrail[_0x4c669b('0x10a')][_0x4c669b('0x59')]=function(){const _0xc81dbb=_0x4c669b,_0x35c545=VisuMZ[_0xc81dbb('0x15d')][_0xc81dbb('0x13d')][_0xc81dbb('0x182')];this['anchor']['x']=0.5,this[_0xc81dbb('0x57')]['y']=0.5,this[_0xc81dbb('0x32')]=0x0,this[_0xc81dbb('0x156')]=0x0,this[_0xc81dbb('0x9e')]=0x0,this['_targetY']=0x0,this[_0xc81dbb('0x134')]=0x0,this[_0xc81dbb('0x7e')]=_0x35c545[_0xc81dbb('0x152')],this[_0xc81dbb('0x100')]=_0x35c545[_0xc81dbb('0x14d')];},Sprite_ProvokeTrail['prototype'][_0x4c669b('0x91')]=function(){const _0x5042a9=_0x4c669b;return VisuMZ['AggroControlSystem'][_0x5042a9('0x13d')][_0x5042a9('0x182')][_0x5042a9('0xb7')];},Sprite_ProvokeTrail['prototype']['partsSize']=function(){const _0xbd63b0=_0x4c669b;return VisuMZ[_0xbd63b0('0x15d')]['Settings']['Provoke'][_0xbd63b0('0x1f')]/0x64;},Sprite_ProvokeTrail['prototype']['createChildSprites']=function(){const _0x269d81=_0x4c669b;this['_sprites']=[];let _0x3191a4=0x0;for(let _0x7a6c6=0x0;_0x7a6c6<=this['maxSprites']();_0x7a6c6++){const _0x5298d7=new Sprite();_0x5298d7[_0x269d81('0x4f')]=ImageManager[_0x269d81('0x63')](),_0x5298d7['anchor']['x']=0.5,_0x5298d7[_0x269d81('0x57')]['y']=0.5,_0x5298d7[_0x269d81('0xd7')]['x']=_0x5298d7['scale']['y']=this['partsSize'](),_0x5298d7['opacity']=_0x3191a4,_0x5298d7[_0x269d81('0x100')]=this[_0x269d81('0x100')],this[_0x269d81('0xa9')](_0x5298d7),this[_0x269d81('0xe8')][_0x269d81('0x12')](_0x5298d7),_0x3191a4+=this['_opacitySpeed'];if(_0x3191a4>=0xff)_0x3191a4=0x0;}},Sprite_ProvokeTrail[_0x4c669b('0x10a')]['leftwardAnimation']=function(){const _0xc2f3f2=_0x4c669b;return this[_0xc2f3f2('0x67')][_0xc2f3f2('0xb5')]===Sprite_Actor;},Sprite_ProvokeTrail[_0x4c669b('0x10a')][_0x4c669b('0xd1')]=function(){const _0x1e62ca=_0x4c669b;return SceneManager['_scene'][_0x1e62ca('0xc6')]['_provokeContainer'];},Sprite_ProvokeTrail[_0x4c669b('0x10a')]['update']=function(){const _0x4db038=_0x4c669b;Sprite[_0x4db038('0x10a')][_0x4db038('0x118')]['call'](this),this[_0x4db038('0xa6')](),this['updateSubPositions'](),this[_0x4db038('0x17f')](),this[_0x4db038('0x26')]();},Sprite_ProvokeTrail['prototype'][_0x4c669b('0x14e')]=function(){const _0x55acef=_0x4c669b;return VisuMZ[_0x55acef('0x15d')][_0x55acef('0x13d')][_0x55acef('0x182')]['HeightOrigin'];},Sprite_ProvokeTrail[_0x4c669b('0x10a')]['updateBattlerPositions']=function(){const _0x48c001=_0x4c669b;if(!this['_mainSprite'][_0x48c001('0xdc')])return;if(!this[_0x48c001('0x67')][_0x48c001('0xdc')][_0x48c001('0xf8')]())return;const _0x7529ab=this[_0x48c001('0x67')][_0x48c001('0xdc')]['provoker']()[_0x48c001('0x16e')]();if(!_0x7529ab)return;const _0x1acfd1=this[_0x48c001('0x67')][_0x48c001('0xdc')][_0x48c001('0x170')](),_0x33dd63=this[_0x48c001('0x67')][_0x48c001('0xdc')][_0x48c001('0xf8')]()[_0x48c001('0x170')]();this[_0x48c001('0x32')]=this[_0x48c001('0x67')]['x'],this['_homeY']=this[_0x48c001('0x67')]['y']-this['_mainSprite']['height']*_0x1acfd1,this[_0x48c001('0x9e')]=_0x7529ab['x'],this[_0x48c001('0x6d')]=_0x7529ab['y']-_0x7529ab['height']*_0x33dd63,this[_0x48c001('0x32')]+=Math['round']((Graphics[_0x48c001('0x68')]-Graphics[_0x48c001('0xbb')])/0x2),this[_0x48c001('0x156')]+=Math[_0x48c001('0x138')]((Graphics[_0x48c001('0x139')]-Graphics[_0x48c001('0x181')])/0x2),this[_0x48c001('0x9e')]+=Math['round']((Graphics[_0x48c001('0x68')]-Graphics[_0x48c001('0xbb')])/0x2),this[_0x48c001('0x6d')]+=Math['round']((Graphics[_0x48c001('0x139')]-Graphics[_0x48c001('0x181')])/0x2);if(!$gameSystem[_0x48c001('0x145')]()){if(_0x7529ab['_battler'][_0x48c001('0xb3')]()){if(_0x48c001('0x94')==='FaKof'){function _0x2debb3(){const _0x5705a1=_0x48c001;return _0x2f463c[_0x5705a1('0x31')]&&_0x4e0b5e[_0x5705a1('0xba')][_0x5705a1('0xff')]('['+_0x18bb17+']');}}else visible=!![],this[_0x48c001('0x9e')]+=SceneManager[_0x48c001('0x169')][_0x48c001('0x3')]['x'],this['_targetY']+=SceneManager['_scene'][_0x48c001('0x3')]['y'];}else _0x7529ab[_0x48c001('0xdc')][_0x48c001('0x58')]()&&(visible=!![],this[_0x48c001('0x32')]+=SceneManager['_scene']['_statusWindow']['x'],this[_0x48c001('0x156')]+=SceneManager[_0x48c001('0x169')][_0x48c001('0x3')]['y']);}},Sprite_ProvokeTrail['prototype']['arcHeight']=function(){const _0x10152f=_0x4c669b;return VisuMZ['AggroControlSystem'][_0x10152f('0x13d')][_0x10152f('0x182')]['ArcHeight'];},Sprite_ProvokeTrail['prototype'][_0x4c669b('0xca')]=function(){const _0x2b1488=_0x4c669b;if(!this['_mainSprite'][_0x2b1488('0xdc')])return;if(!this[_0x2b1488('0x67')][_0x2b1488('0xdc')]['provoker']())return;if(!this[_0x2b1488('0xe8')])return;if(this[_0x2b1488('0xe8')]['length']<=0x0)return;const _0x47aebc=(this[_0x2b1488('0x9e')]-this[_0x2b1488('0x32')])/this['maxSprites'](),_0x35cf62=(this[_0x2b1488('0x6d')]-this[_0x2b1488('0x156')])/this[_0x2b1488('0x91')]();for(let _0x1191c5=0x0;_0x1191c5<=this[_0x2b1488('0x91')]();_0x1191c5++){const _0x5b673b=this['_sprites'][_0x1191c5];if(!_0x5b673b)continue;_0x5b673b['x']=this[_0x2b1488('0x32')]+_0x47aebc*_0x1191c5;const _0x2fbc83=this[_0x2b1488('0x91')]()-_0x1191c5,_0x5d3b6b=this['maxSprites']()/0x2,_0x476195=this['arcHeight'](),_0x34c61d=-_0x476195/Math['pow'](_0x5d3b6b,0x2),_0x190a50=_0x34c61d*Math['pow'](_0x2fbc83-_0x5d3b6b,0x2)+_0x476195;_0x5b673b['y']=this[_0x2b1488('0x156')]+_0x35cf62*_0x1191c5-_0x190a50;}},Sprite_ProvokeTrail[_0x4c669b('0x10a')][_0x4c669b('0xf3')]=function(){const _0x53a948=_0x4c669b;return VisuMZ[_0x53a948('0x15d')]['Settings']['Provoke'][_0x53a948('0x10e')];},Sprite_ProvokeTrail['prototype'][_0x4c669b('0x17f')]=function(){const _0x4e6301=_0x4c669b,_0x385535=this[_0x4e6301('0x67')]['_battler'];if(!_0x385535){if(_0x4e6301('0x35')===_0x4e6301('0x35'))this[_0x4e6301('0x134')]=0x0;else{function _0x1785d3(){_0x339348=_0x64d062;}}}else{if(_0x385535['isAlive']()&&_0x385535[_0x4e6301('0xf8')]()){if(_0x4e6301('0xe3')===_0x4e6301('0x5e')){function _0x42638e(){const _0x389da8=_0x4e6301;this[_0x389da8('0x77')][_0x26f02b]=this[_0x389da8('0xd9')](_0x30f38d(_0x52970b));}}else this[_0x4e6301('0x134')]=0xff;}else this[_0x4e6301('0x134')]=0x0;}},Sprite_ProvokeTrail['prototype'][_0x4c669b('0x26')]=function(){const _0x4ea62b=_0x4c669b;if(!this[_0x4ea62b('0x67')]['_battler'])return;if(!this['_mainSprite']['_battler'][_0x4ea62b('0xf8')]())return;if(!this[_0x4ea62b('0xe8')])return;if(this[_0x4ea62b('0xe8')][_0x4ea62b('0x11')]<=0x0)return;for(let _0xf43364=0x0;_0xf43364<=this[_0x4ea62b('0x91')]();_0xf43364++){const _0x306405=this[_0x4ea62b('0xe8')][this[_0x4ea62b('0xae')]()?this['maxSprites']()-_0xf43364:_0xf43364];if(!_0x306405)continue;_0x306405['opacity']-=this[_0x4ea62b('0x7e')];if(_0x306405[_0x4ea62b('0x134')]<=0x0)_0x306405[_0x4ea62b('0x134')]=0xff;}},VisuMZ['AggroControlSystem'][_0x4c669b('0x78')]=Spriteset_Battle[_0x4c669b('0x10a')]['createBattleField'],Spriteset_Battle[_0x4c669b('0x10a')]['createBattleField']=function(){const _0x3e511b=_0x4c669b;VisuMZ[_0x3e511b('0x15d')]['Spriteset_Battle_createBattleField'][_0x3e511b('0xa3')](this),this[_0x3e511b('0x3c')]();},Spriteset_Battle[_0x4c669b('0x10a')][_0x4c669b('0x3c')]=function(){const _0x352ca5=_0x4c669b;if(!Imported['VisuMZ_1_BattleCore'])return;const _0x3731ac=this[_0x352ca5('0x7c')]['x'],_0x3089ab=this[_0x352ca5('0x7c')]['y'],_0x5d3839=this[_0x352ca5('0x7c')]['width'],_0x2476aa=this[_0x352ca5('0x7c')]['height'];this[_0x352ca5('0xb8')]=new Sprite(),this['_provokeContainer']['setFrame'](0x0,0x0,_0x5d3839,_0x2476aa),this[_0x352ca5('0xb8')]['x']=_0x3731ac,this[_0x352ca5('0xb8')]['y']=_0x3089ab;if(Imported[_0x352ca5('0x9d')]){const _0x1a3eca=this[_0x352ca5('0x2b')][_0x352ca5('0x17b')](this['_damageContainer']);this[_0x352ca5('0x40')](this[_0x352ca5('0xb8')],_0x1a3eca);}else this[_0x352ca5('0xa9')](this[_0x352ca5('0xb8')]);},VisuMZ[_0x4c669b('0x15d')][_0x4c669b('0x143')]=Spriteset_Battle[_0x4c669b('0x10a')][_0x4c669b('0x118')],Spriteset_Battle[_0x4c669b('0x10a')][_0x4c669b('0x118')]=function(){const _0x11e706=_0x4c669b;VisuMZ[_0x11e706('0x15d')][_0x11e706('0x143')][_0x11e706('0xa3')](this),this[_0x11e706('0x12b')]();},Spriteset_Battle[_0x4c669b('0x10a')][_0x4c669b('0x12b')]=function(){const _0x175b40=_0x4c669b;if(!this['_provokeContainer'])return;if(!this[_0x175b40('0x8d')])return;this[_0x175b40('0xb8')]['x']=this[_0x175b40('0x8d')]['x'],this[_0x175b40('0xb8')]['y']=this[_0x175b40('0x8d')]['y'];},VisuMZ['AggroControlSystem'][_0x4c669b('0x123')]=Window_BattleEnemy[_0x4c669b('0x10a')][_0x4c669b('0x80')],Window_BattleEnemy[_0x4c669b('0x10a')][_0x4c669b('0x80')]=function(){const _0x4ef77f=_0x4c669b;if(this[_0x4ef77f('0x22')]())Imported['VisuMZ_1_BattleCore']&&this['sortEnemies'](),Window_Selectable[_0x4ef77f('0x10a')][_0x4ef77f('0x80')]['call'](this);else{if(this[_0x4ef77f('0x10d')]()){if('GSdNH'!==_0x4ef77f('0x24'))Imported['VisuMZ_1_BattleCore']&&this[_0x4ef77f('0x1d')](),Window_Selectable[_0x4ef77f('0x10a')]['refresh']['call'](this);else{function _0x57b308(){const _0x15479b=_0x4ef77f;if(![_0x43e937,_0x5a7b6f][_0x15479b('0xff')](this['constructor']))return![];if(!_0x10dc4b[_0x15479b('0x39')]())return![];return _0x2cccc9['aggroGauge']&&_0x5a1ae1[_0x15479b('0x15d')]['Settings'][_0x15479b('0xd2')][_0x15479b('0x16f')];}}}else VisuMZ[_0x4ef77f('0x15d')]['Window_BattleEnemy_refresh'][_0x4ef77f('0xa3')](this);}},Window_BattleEnemy[_0x4c669b('0x10a')][_0x4c669b('0x22')]=function(){const _0x5a9f58=_0x4c669b,_0x47b2a8=BattleManager['inputtingAction'](),_0x47a010=BattleManager[_0x5a9f58('0x128')]();if(!_0x47b2a8)return![];if(!_0x47a010)return![];if(DataManager[_0x5a9f58('0x1')](_0x47b2a8[_0x5a9f58('0x50')]()))return![];if(_0x47a010[_0x5a9f58('0x37')]())return![];if(_0x47a010[_0x5a9f58('0xdd')]()){if(_0x5a9f58('0x73')===_0x5a9f58('0xe7')){function _0x2dde9d(){const _0x29bff4=_0x5a9f58;return this[_0x29bff4('0x67')][_0x29bff4('0xb5')]===_0x35d8e9;}}else return this[_0x5a9f58('0x5')]=[_0x47a010[_0x5a9f58('0xf8')]()],!![];}else{if(_0x5a9f58('0xfe')===_0x5a9f58('0x116')){function _0x4fc8cc(){const _0x1559bb=_0x5a9f58;_0x524078['AggroControlSystem'][_0x1559bb('0x143')][_0x1559bb('0xa3')](this),this['updateAggroControl']();}}else return![];}},Window_BattleEnemy['prototype'][_0x4c669b('0x10d')]=function(){const _0x1c1bf5=_0x4c669b,_0x1faf3b=BattleManager[_0x1c1bf5('0x154')](),_0x12173f=BattleManager[_0x1c1bf5('0x128')](),_0x81328f=$gameTroop;if(!_0x1faf3b)return![];if(!_0x12173f)return![];if(!_0x1faf3b[_0x1c1bf5('0x50')]())return![];if(DataManager[_0x1c1bf5('0x17')](_0x1faf3b[_0x1c1bf5('0x50')]()))return![];if(_0x12173f[_0x1c1bf5('0x122')]())return![];if(_0x1faf3b[_0x1c1bf5('0x79')]()&&_0x81328f[_0x1c1bf5('0xf4')]()[_0x1c1bf5('0x11')]>0x0){if(_0x1c1bf5('0x34')==='PPGXu'){function _0x15df1d(){const _0x3e92de=_0x1c1bf5,_0x208ff0=_0x367bea[_0x3e92de('0x13f')],_0x33057a=_0x3e92de('0x13f');this['addCommand'](_0x208ff0,_0x33057a);}}else this[_0x1c1bf5('0x5')]=_0x81328f['physicalTauntMembers']();}else{if(_0x1faf3b[_0x1c1bf5('0x155')]()&&_0x81328f[_0x1c1bf5('0x129')]()[_0x1c1bf5('0x11')]>0x0)this[_0x1c1bf5('0x5')]=_0x81328f[_0x1c1bf5('0x129')]();else{if(_0x1faf3b[_0x1c1bf5('0x85')]()&&_0x81328f[_0x1c1bf5('0x102')]()[_0x1c1bf5('0x11')]>0x0)this[_0x1c1bf5('0x5')]=_0x81328f[_0x1c1bf5('0x102')]();else return![];}}return!![];},VisuMZ[_0x4c669b('0x15d')][_0x4c669b('0x97')]=Window_Options[_0x4c669b('0x10a')][_0x4c669b('0x12f')],Window_Options[_0x4c669b('0x10a')][_0x4c669b('0x12f')]=function(){const _0x1756d6=_0x4c669b;VisuMZ[_0x1756d6('0x15d')]['Window_Options_addGeneralOptions'][_0x1756d6('0xa3')](this),this[_0x1756d6('0x88')]();},Window_Options[_0x4c669b('0x10a')][_0x4c669b('0x88')]=function(){const _0xf49054=_0x4c669b;VisuMZ[_0xf49054('0x15d')][_0xf49054('0x13d')][_0xf49054('0x182')]['AddOption']&&this[_0xf49054('0x4e')]();if(VisuMZ['AggroControlSystem'][_0xf49054('0x13d')]['Aggro'][_0xf49054('0x87')]){if('dTpss'!=='rzLnH')this['addAggroControlSystemAggroCommand']();else{function _0x53b79b(){const _0x1378f3=_0xf49054;return this['aliveMembers']()[_0x1378f3('0xbf')](_0x5318b7=>_0x5318b7&&_0x5318b7[_0x1378f3('0x121')]());}}}},Window_Options['prototype']['addAggroControlSystemProvokeCommand']=function(){const _0x1d128f=_0x4c669b,_0x536b8e=TextManager[_0x1d128f('0x13f')],_0x27df3f=_0x1d128f('0x13f');this[_0x1d128f('0x70')](_0x536b8e,_0x27df3f);},Window_Options[_0x4c669b('0x10a')][_0x4c669b('0x3b')]=function(){const _0x45bc3a=_0x4c669b,_0x156399=TextManager[_0x45bc3a('0x174')],_0x412fdf='aggroGauge';this[_0x45bc3a('0x70')](_0x156399,_0x412fdf);},VisuMZ[_0x4c669b('0x15d')][_0x4c669b('0x12c')]=Window_StatusBase[_0x4c669b('0x10a')][_0x4c669b('0x149')],Window_StatusBase[_0x4c669b('0x10a')][_0x4c669b('0x149')]=function(_0x45bb53,_0x570523,_0x230a4a){const _0xe94b88=_0x4c669b;if(this[_0xe94b88('0x11c')]())this[_0xe94b88('0x4d')](_0x45bb53[_0xe94b88('0x52')]());VisuMZ[_0xe94b88('0x15d')]['Window_StatusBase_placeActorName'][_0xe94b88('0xa3')](this,_0x45bb53,_0x570523,_0x230a4a);},Window_StatusBase[_0x4c669b('0x10a')][_0x4c669b('0x11c')]=function(){const _0x5066bd=_0x4c669b;if(![Window_BattleActor,Window_BattleStatus][_0x5066bd('0xff')](this['constructor']))return![];if(!SceneManager[_0x5066bd('0x39')]())return![];return ConfigManager[_0x5066bd('0x174')]&&VisuMZ[_0x5066bd('0x15d')][_0x5066bd('0x13d')][_0x5066bd('0xd2')][_0x5066bd('0x16f')];},Window_BattleStatus[_0x4c669b('0x10a')][_0x4c669b('0x4d')]=function(_0x1431d6){const _0x2a5024=_0x4c669b,_0x3f4399=this[_0x2a5024('0x128')](_0x1431d6),_0x35c4f2=this[_0x2a5024('0x82')](_0x1431d6),_0x297200=this['aggroGaugeY'](_0x1431d6),_0x9703a3=_0x2a5024('0x65')[_0x2a5024('0x49')](_0x3f4399[_0x2a5024('0xd3')]()),_0x285333=this['createInnerSprite'](_0x9703a3,Sprite_Gauge);_0x285333['x']=_0x35c4f2,_0x285333['y']=_0x297200,_0x285333['_menuAggroType']=!![],_0x285333[_0x2a5024('0x3d')](_0x3f4399,_0x2a5024('0x177')),_0x285333['visible']=!![];},Window_BattleStatus['prototype'][_0x4c669b('0x82')]=function(_0x2c1b02){const _0x2d705f=_0x4c669b;let _0x54ef12=this[_0x2d705f('0xc7')](_0x2c1b02),_0x39f993=this[_0x2d705f('0x7d')](_0x54ef12);if(Imported['VisuMZ_1_BattleCore']){if(_0x2d705f('0x11b')===_0x2d705f('0x16d')){function _0x469546(){const _0x1f84fa=_0x2d705f;if(_0x168822[_0x1f84fa('0xbd')]())_0xf43e6d['log'](_0x1daab3);}}else{let _0x4e0c56=this['itemRect'](_0x2c1b02);if(this[_0x2d705f('0x166')]()===_0x2d705f('0x15f')){if(_0x2d705f('0xcf')===_0x2d705f('0xcf')){const _0x3c9adb=$dataSystem[_0x2d705f('0x60')]?0x4:0x3,_0x2519dc=_0x3c9adb*0x80+(_0x3c9adb-0x1)*0x8+0x4,_0x390e8c=this[_0x2d705f('0x128')](_0x2c1b02);let _0x35b35d=_0x4e0c56['x']+this[_0x2d705f('0xfc')];VisuMZ[_0x2d705f('0x74')][_0x2d705f('0x13d')][_0x2d705f('0x125')]['ShowFacesListStyle']&&(_0x35b35d=_0x4e0c56['x']+ImageManager[_0x2d705f('0x101')]+0x8),_0x39f993=Math[_0x2d705f('0x138')](Math[_0x2d705f('0x184')](_0x4e0c56['x']+_0x4e0c56[_0x2d705f('0x68')]-_0x2519dc,_0x35b35d)),_0x39f993-=0x4;}else{function _0x29216a(){const _0x15f832=_0x2d705f,_0x4437c1=this['actor'](_0x2a69b5),_0x2a731f=this[_0x15f832('0x82')](_0xcd714b),_0x2ef2ea=this['aggroGaugeY'](_0x272008),_0x55bebc='actor%1-gauge-aggro'[_0x15f832('0x49')](_0x4437c1['actorId']()),_0x3706ad=this[_0x15f832('0x178')](_0x55bebc,_0x10572f);_0x3706ad['x']=_0x2a731f,_0x3706ad['y']=_0x2ef2ea,_0x3706ad[_0x15f832('0x5b')]=!![],_0x3706ad[_0x15f832('0x3d')](_0x4437c1,_0x15f832('0x177')),_0x3706ad[_0x15f832('0xda')]=!![];}}}else _0x39f993=Math[_0x2d705f('0x138')](_0x4e0c56['x']+(_0x4e0c56[_0x2d705f('0x68')]-0x80)/0x2);}}return _0x39f993;},Window_BattleStatus['prototype'][_0x4c669b('0x71')]=function(_0x236542){const _0xa22efa=_0x4c669b,_0x2679df=this[_0xa22efa('0x1b')](_0x236542);let _0x2cea8b=this[_0xa22efa('0x17c')](_0x2679df);if(Imported[_0xa22efa('0x9d')]){if(this[_0xa22efa('0x166')]()==='list'){let _0x1dc6c7=this[_0xa22efa('0x1b')](_0x236542);_0x2cea8b=Math[_0xa22efa('0x138')](_0x1dc6c7['y']+(_0x1dc6c7[_0xa22efa('0x139')]-Sprite_Name[_0xa22efa('0x10a')]['bitmapHeight']())/0x2);}}if(this[_0xa22efa('0xa1')]())_0x2cea8b-=Sprite_Gauge[_0xa22efa('0x10a')][_0xa22efa('0x132')]()-0x1;return _0x2cea8b;},Window_BattleStatus[_0x4c669b('0x10a')][_0x4c669b('0xa1')]=function(){const _0x2ab205=_0x4c669b;if(!BattleManager[_0x2ab205('0x179')]())return![];if(Imported[_0x2ab205('0x8b')])return this[_0x2ab205('0xf2')](_0x2ab205('0xcc'));return!![];};