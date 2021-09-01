//=============================================================================
// VisuStella MZ - Auto Skill Triggers
// VisuMZ_3_AutoSkillTriggers.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_AutoSkillTriggers = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AutoSkillTriggers = VisuMZ.AutoSkillTriggers || {};
VisuMZ.AutoSkillTriggers.version = 1.08;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.08] [AutoSkillTriggers]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Auto_Skill_Triggers_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Sometimes you want some skills that only occur after a specific condition
 * triggers (ie. death, receiving specific elemental damage, or allies
 * performing skills of a specific type). These skill triggers are now made
 * possible through this plugin.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Skill triggers that launch at the start of battle or winning a battle.
 * * Skills that let actors/enemies do one last hurrah before dying.
 * * Skills that function as a reaction to the user performing specific actions
 *   ranging from basic attacks, guarding, items, physical attacks, magical
 *   attacks, certain hit attacks, skills from specific skill types, or actions
 *   that inflict any specific kind of elemental damage.
 * * A total of 60 different auto triggers for a variety of situations.
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
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
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
 * === Skill Trigger-Related Notetags ===
 *
 * <No Auto Skill Trigger>
 *
 * - Used for: Skill, Item State Notetags
 * - This prevents Auto Skill Triggers from occurring upon using this
 *   skill or item.
 *
 * ---
 *
 * <Auto Trigger: condition>
 *
 * <Auto Trigger x%: condition>
 *
 * - Used for: Skill Notetags
 * - Turns this skill into an Auto Trigger Skill, where it will automatically
 *   be used if the 'condition' has been met.
 * - If using the x% variant, the Auto Trigger has a x% chance to occur.
 *   - Replace 'x' with a number value representing the chance to succeed.
 * - Skill must be usable normally outside of the occasion in order to trigger.
 * - This marked skill cannot trigger any other Auto Skill Triggers in order to
 *   prevent an infinite loop.
 * - Skills can have multiple Auto Triggers and will trigger upon meeting the
 *   conditions of any of them.
 * - Replace 'condition' with any of the below keywords:
 * 
 *   *Note1*: Being the target of an action means the potential target must be
 *     a part of the original scope, regardless of how the targets are changed
 *     up later by Action Sequences.
 * 
 * Keywords:
 * 
 *   ---
 * 
 *   Battle Start
 *   - Triggers skill when the battle starts.
 * 
 *   Battle Win
 *   - Triggers skill when the battle is won.
 * 
 *   Death
 *   - Triggers skill moments before the user's death.
 *   - If the user recovers enough HP from the skill trigger, then the
 *     user won't die. However, any other Death triggered effects will
 *     still continue to prompt.
 * 
 *   ---
 * 
 *   Attack User
 *   - Triggers skill when the user uses a basic attack.
 * 
 *   Guard User
 *   - Triggers skill when the user guards.
 * 
 *   Item User
 *   - Triggers skill when the user uses any item.
 * 
 *   Physical User
 *   - Triggers skill when the user performs any physical action.
 * 
 *   Magical User
 *   - Triggers skill when the user performs any magical action.
 * 
 *   Certain Hit User
 *   - Triggers skill when the user performs a certain hit action.
 * 
 *   Skill Type name User
 *   - Triggers skill when the user performs a skill of the named
 *     Skill Type.
 * 
 *   Element name User
 *   - Triggers skill when the user performs an action with the named
 *     element type.
 * 
 *   ---
 * 
 *   Attack Target
 *   - Triggers skill when user is the target of a basic attack.
 *   - See Note1 Above.
 * 
 *   Guard Target
 *   - Triggers skill when user is the target of a guard action.
 *   - See Note1 Above.
 * 
 *   Item Target
 *   - Triggers skill when user is the target of an item action.
 *   - See Note1 Above.
 * 
 *   Physical Target
 *   - Triggers skill when user is the target of a physical action.
 *   - See Note1 Above.
 * 
 *   Magical Target
 *   - Triggers skill when user is the target of a magical action.
 *   - See Note1 Above.
 * 
 *   Certain Hit Target
 *   - Triggers skill when user is the target of a certain hit action.
 *   - See Note1 Above.
 * 
 *   Skill Type name Target
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type.
 *   - See Note1 Above.
 * 
 *   Element name Target
 *   - Triggers skill when user is the target of of an action with the named
 *     element type.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Ally
 *   - Triggers skill when user is the target of a basic attack
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Guard Ally
 *   - Triggers skill when user is the target of a guard action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Item Ally
 *   - Triggers skill when user is the target of an item action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Physical Ally
 *   - Triggers skill when user is the target of a physical action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Magical Ally
 *   - Triggers skill when user is the target of a magical action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Certain Hit Ally
 *   - Triggers skill when user is the target of a certain hit action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Skill Type name Ally
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Element name Ally
 *   - Triggers skill when user is the target of of an action with the named
 *     element type and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Enemy
 *   - Triggers skill when user is the target of a basic attack
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Guard Enemy
 *   - Triggers skill when user is the target of a guard action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Item Enemy
 *   - Triggers skill when user is the target of an item action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Physical Enemy
 *   - Triggers skill when user is the target of a physical action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Magical Enemy
 *   - Triggers skill when user is the target of a magical action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Certain Hit Enemy
 *   - Triggers skill when user is the target of a certain hit action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Skill Type name Enemy
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Element name Enemy
 *   - Triggers skill when user is the target of of an action with the named
 *     element type and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Friends
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Guard Friends
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Item Friends
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Physical Friends
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Magical Friends
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Certain Hit Friends
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Skill Type name Friends
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's allied team.
 * 
 *   Element name Friends
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's allied team.
 * 
 *   ---
 * 
 *   Attack Friends Only
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Guard Friends Only
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Item Friends Only
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Physical Friends Only
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Magical Friends Only
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Certain Hit Friends Only
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Skill Type name Friends Only
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's allied team, but the active battler
 *     cannot be the user.
 * 
 *   Element name Friends Only
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's allied team, but the active battler
 *     cannot be the user.
 * 
 *   ---
 * 
 *   Attack Opponents
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Guard Opponents
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Item Opponents
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Physical Opponents
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Magical Opponents
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Certain Hit Opponents
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Skill Type name Opponents
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's opposing team.
 * 
 *   Element name Opponents
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's opposing team.
 * 
 *   ---
 * 
 * Examples:
 * 
 *   <Auto Trigger: Battle Start>
 *   <Auto Trigger: Death>
 *   <Auto Trigger: Attack User>
 *   <Auto Trigger: Guard User>
 *   <Auto Trigger: Physical Target>
 *   <Auto Trigger: Magical Target>
 *   <Auto Trigger: Certain Hit Ally>
 *   <Auto Trigger: Item Enemy>
 *   <Auto Trigger: Skill Type Magic Ally>
 *   <Auto Trigger: Skill Type Special Enemy>
 *   <Auto Trigger: Element Fire Friends>
 *   <Auto Trigger: Element Ice Opponents>
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
 * Version 1.08: March 19, 2021
 * * Bug Fixes!
 * ** Death Triggers that cannot be used will no longer cause the battler to
 *    become immortal. Fix made by Irina.
 * 
 * Version 1.07: March 12, 2021
 * * Bug Fixes!
 * ** Battle Start auto-triggers should now work properly for actors when using
 *    auto-skills set up to be battle screen only. Fix made by Irina.
 * 
 * Version 1.06: February 12, 2021
 * * Optimization Update!
 * ** Skills that cannot be used will no longer be checked for auto triggers.
 *    Update made by Olivia.
 * 
 * Version 1.05: January 22, 2021
 * * Bug Fixes!
 * ** Triggers involving the user should now work properly. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Arisu:
 * *** <Auto Trigger x%: condition>
 * **** If using the x% variant, the Auto Trigger has a x% chance to occur.
 * **** Replace 'x' with a number value representing the chance to succeed.
 * 
 * Version 1.04: December 25, 2020
 * * Compatibility Update
 * ** Added compatibility functionality for Battle System - STB.
 * 
 * Version 1.03: November 22, 2020
 * * Bug Fixes!
 * ** Auto Skill Triggers no long clear battler speed in TPB. Fixed by Yanfly.
 * 
 * Version 1.02: November 1, 2020
 * * Bug Fixes!
 * ** Stunned enemies will have their auto triggers bypassed. Fix made
 *    by Olivia.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Skills and Items used outside of battle should no longer crash the game.
 *    Fix made by Yanfly.
 * ** Specific trigger types should no longer crash the game.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release Date: October 28, 2020
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
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 */
//=============================================================================

const _0x1d07=['(?:GUARD\x20%1|GUARD\x20%1)','call','exit','Enemy','item','return\x200','(?:ATTACK\x20%1|STRIKE\x20%1)','BattleManager_checkBattleEnd','note','_deathAutoSkillTriggerActive','getSkillTypes','Scene_Boot_onDatabaseLoaded','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','on%2SType%1','refresh','Target','name','getAutoSkillTriggerSTypes','59796ZaYuGH','includes','version','max','map','parse','User','description','513272KdjqvZ','isActor','deathStateId','isMagical','(?:SKILL\x20TYPE\x20%1\x20%2|STYPE\x20%1\x20%2)','243943hxnVTr','performAutoSkillTriggers','getAutoSkillTriggerElements','Game_Action_applyGlobal','on%2Element%1','constructor','elementId','CreateNotetag','FUNC','<AUTO\x20TRIGGER:[\x20]%1>','(?:ITEM\x20%1|ITEM\x20%1)','_actions','filter','subject','canUse','Game_BattlerBase_addNewState','skills','on%1Guard','JSON','ARRAYSTRUCT','skillTypes','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ARRAYFUNC','isAlive','meetsDeathAutoSkillTrigger','Game_Action_clear','NUM','1lrqCiZ','on%1Element%2','attackElements','getSkillTypeNameFromID','_inBattle','ConvertParams','checkBattleEnd','friendsUnit','applyAutoSkillTriggers','_savedAutoSkillTriggerActions','checkDeathAutoSkillTriggerRemoval','onBattleStart','isAutoSkillTrigger','VisuMZ_1_ElementStatusCore','(?:BATTLE\x20WIN|WIN\x20BATTLE|VICTORY|VICTORY\x20CRY|VICTORYCRY)','_action','BattleManager_endAction','Opponents','on%1Physical','USER','onAllActionsEnd','push','addNewState','_autoSkillTrigger','Game_BattlerBase_revive','Game_BattlerBase_isImmortal','isSkill','_autoSkillTriggerBypassTpbClear','1WCuzta','TARGET','_targets','applyGlobal','180241JqWiLK','_deathAutoSkillTriggerPerformed','on%1Item','<AUTO\x20TRIGGER\x20(.*)([%％]):[\x20]%1>','clearTpbChargeTime','_onBattleWinAutoSkillTriggerOn','revive','onDatabaseLoaded','match','VisuMZ_1_SkillsStatesCore','isImmortal','ARRAYEVAL','clearDeathAutoSkillTrigger','status','RegExp','Game_Unit_onBattleStart','prototype','opponentsUnit','on%1Certain','stripNameTextCodes','getElementNameFromID','elements','FriendsOnly','process_VisuMZ_AutoSkillTriggers_Notetags','occasion','processOnBattleWinAutoSkillTriggers','STR','endAction','setAutoSkillTrigger','stypeId','EVAL','forceAction','returnSavedAutoSkillTriggerActions','VisuMZ_1_BattleCore','ENEMY','isGuard','processAutoSkillTrigger','179774RqSZNa','224778rBGjnd','ONDEATH','isValid','isSceneBattle','damage','Ally','(?:ELEMENT\x20%1\x20%2|ELE\x20%1\x20%2)','_forcedBattlers','onDeath','STRUCT','processAutoSkillTriggers','Game_Battler_onBattleStart','forceAutoSkillTrigger','isItem','parameters','ALLY','toUpperCase','length','Game_Action_isValid','Game_Battler_onBattleEnd','format','on%1Magical','trim','canMove','AutoSkillTriggers','isAllDead','ARRAYSTR','FRIENDS','processDeathAutoSkillTriggerEffects','onBattleWin','Game_Battler_clearTpbChargeTime','aliveMembers','_subject','79277uiBjup','replace','Settings','on%1Attack','onBattleEnd','clear','_CHANCE','CreateNotetags','(?:DEATH|DEATHRATTLE|DEATH\x20RATTLE|LASTWORD|LAST\x20WORD|FINAL\x20ATTACK)','ARRAYNUM'];const _0x5533=function(_0x326493,_0x49b2e2){_0x326493=_0x326493-0x70;let _0x1d0777=_0x1d07[_0x326493];return _0x1d0777;};const _0x5cf5f2=_0x5533;(function(_0xd54b27,_0x5dcc9a){const _0x46a18d=_0x5533;while(!![]){try{const _0xa07e59=parseInt(_0x46a18d(0xbc))*-parseInt(_0x46a18d(0xdc))+-parseInt(_0x46a18d(0x78))+parseInt(_0x46a18d(0x94))+-parseInt(_0x46a18d(0x101))+-parseInt(_0x46a18d(0x102))+parseInt(_0x46a18d(0xa1))+-parseInt(_0x46a18d(0x9c))*-parseInt(_0x46a18d(0xd8));if(_0xa07e59===_0x5dcc9a)break;else _0xd54b27['push'](_0xd54b27['shift']());}catch(_0x2c6774){_0xd54b27['push'](_0xd54b27['shift']());}}}(_0x1d07,0x2556d));var label=_0x5cf5f2(0x11a),tier=tier||0x0,dependencies=[_0x5cf5f2(0xfd)],pluginData=$plugins[_0x5cf5f2(0xad)](function(_0x3de730){const _0x30ac64=_0x5cf5f2;return _0x3de730[_0x30ac64(0xe9)]&&_0x3de730[_0x30ac64(0x9b)][_0x30ac64(0x95)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x5cf5f2(0xc1)]=function(_0x5fe589,_0x36214d){const _0x4e9138=_0x5cf5f2;for(const _0x9d3936 in _0x36214d){if(_0x9d3936[_0x4e9138(0xe4)](/(.*):(.*)/i)){const _0x58de5b=String(RegExp['$1']),_0xf18161=String(RegExp['$2'])[_0x4e9138(0x112)]()['trim']();let _0x5d1fb2,_0x3fea95,_0xa0eb02;switch(_0xf18161){case _0x4e9138(0xbb):_0x5d1fb2=_0x36214d[_0x9d3936]!==''?Number(_0x36214d[_0x9d3936]):0x0;break;case _0x4e9138(0x81):_0x3fea95=_0x36214d[_0x9d3936]!==''?JSON[_0x4e9138(0x99)](_0x36214d[_0x9d3936]):[],_0x5d1fb2=_0x3fea95[_0x4e9138(0x98)](_0x10a325=>Number(_0x10a325));break;case _0x4e9138(0xfa):_0x5d1fb2=_0x36214d[_0x9d3936]!==''?eval(_0x36214d[_0x9d3936]):null;break;case _0x4e9138(0xe7):_0x3fea95=_0x36214d[_0x9d3936]!==''?JSON[_0x4e9138(0x99)](_0x36214d[_0x9d3936]):[],_0x5d1fb2=_0x3fea95[_0x4e9138(0x98)](_0x2ab211=>eval(_0x2ab211));break;case _0x4e9138(0xb3):_0x5d1fb2=_0x36214d[_0x9d3936]!==''?JSON[_0x4e9138(0x99)](_0x36214d[_0x9d3936]):'';break;case'ARRAYJSON':_0x3fea95=_0x36214d[_0x9d3936]!==''?JSON['parse'](_0x36214d[_0x9d3936]):[],_0x5d1fb2=_0x3fea95[_0x4e9138(0x98)](_0x4e6788=>JSON[_0x4e9138(0x99)](_0x4e6788));break;case _0x4e9138(0xa9):_0x5d1fb2=_0x36214d[_0x9d3936]!==''?new Function(JSON[_0x4e9138(0x99)](_0x36214d[_0x9d3936])):new Function(_0x4e9138(0x87));break;case _0x4e9138(0xb7):_0x3fea95=_0x36214d[_0x9d3936]!==''?JSON[_0x4e9138(0x99)](_0x36214d[_0x9d3936]):[],_0x5d1fb2=_0x3fea95[_0x4e9138(0x98)](_0xbbcff7=>new Function(JSON[_0x4e9138(0x99)](_0xbbcff7)));break;case _0x4e9138(0xf6):_0x5d1fb2=_0x36214d[_0x9d3936]!==''?String(_0x36214d[_0x9d3936]):'';break;case _0x4e9138(0x71):_0x3fea95=_0x36214d[_0x9d3936]!==''?JSON[_0x4e9138(0x99)](_0x36214d[_0x9d3936]):[],_0x5d1fb2=_0x3fea95[_0x4e9138(0x98)](_0x21131b=>String(_0x21131b));break;case _0x4e9138(0x10b):_0xa0eb02=_0x36214d[_0x9d3936]!==''?JSON[_0x4e9138(0x99)](_0x36214d[_0x9d3936]):{},_0x5d1fb2=VisuMZ[_0x4e9138(0xc1)]({},_0xa0eb02);break;case _0x4e9138(0xb4):_0x3fea95=_0x36214d[_0x9d3936]!==''?JSON[_0x4e9138(0x99)](_0x36214d[_0x9d3936]):[],_0x5d1fb2=_0x3fea95[_0x4e9138(0x98)](_0x59cc95=>VisuMZ['ConvertParams']({},JSON['parse'](_0x59cc95)));break;default:continue;}_0x5fe589[_0x58de5b]=_0x5d1fb2;}}return _0x5fe589;},(_0x534dd4=>{const _0x3d118a=_0x5cf5f2,_0x1eb78e=_0x534dd4[_0x3d118a(0x92)];for(const _0x5c49ec of dependencies){if(!Imported[_0x5c49ec]){alert(_0x3d118a(0x8e)['format'](_0x1eb78e,_0x5c49ec)),SceneManager[_0x3d118a(0x84)]();break;}}const _0x344ab9=_0x534dd4[_0x3d118a(0x9b)];if(_0x344ab9[_0x3d118a(0xe4)](/\[Version[ ](.*?)\]/i)){const _0x318ba4=Number(RegExp['$1']);_0x318ba4!==VisuMZ[label][_0x3d118a(0x96)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x3d118a(0x116)](_0x1eb78e,_0x318ba4)),SceneManager[_0x3d118a(0x84)]());}if(_0x344ab9[_0x3d118a(0xe4)](/\[Tier[ ](\d+)\]/i)){const _0x1c7860=Number(RegExp['$1']);_0x1c7860<tier?(alert(_0x3d118a(0xb6)['format'](_0x1eb78e,_0x1c7860,tier)),SceneManager[_0x3d118a(0x84)]()):tier=Math[_0x3d118a(0x97)](_0x1c7860,tier);}VisuMZ[_0x3d118a(0xc1)](VisuMZ[label][_0x3d118a(0x7a)],_0x534dd4[_0x3d118a(0x110)]);})(pluginData),VisuMZ[_0x5cf5f2(0x11a)][_0x5cf5f2(0x8d)]=Scene_Boot['prototype'][_0x5cf5f2(0xe3)],Scene_Boot['prototype'][_0x5cf5f2(0xe3)]=function(){const _0x18fd92=_0x5cf5f2;VisuMZ['AutoSkillTriggers'][_0x18fd92(0x8d)]['call'](this),this[_0x18fd92(0xf3)]();},Scene_Boot[_0x5cf5f2(0xec)][_0x5cf5f2(0xf3)]=function(){const _0x5149e6=_0x5cf5f2;VisuMZ[_0x5149e6(0x11a)][_0x5149e6(0x7f)]();},VisuMZ['AutoSkillTriggers'][_0x5cf5f2(0xea)]={},VisuMZ[_0x5cf5f2(0x11a)]['CreateNotetags']=function(){const _0x1511ce=_0x5cf5f2;let _0x562d72=[[_0x1511ce(0x9a),_0x1511ce(0xcf)],[_0x1511ce(0x91),_0x1511ce(0xd9)],['Ally',_0x1511ce(0x111)],[_0x1511ce(0x85),_0x1511ce(0xfe)],['Friends',_0x1511ce(0x72)],[_0x1511ce(0xf2),'FRIENDS\x20ONLY'],['Opponents','OPPONENTS']],_0x1b2d39=[['onBattleStart','(?:BATTLE\x20START|START\x20BATTLE|BATTLECRY|BATTLE\x20CRY|FANFARE|SNEAK\x20ATTACK)'],['onBattleWin',_0x1511ce(0xca)],[_0x1511ce(0x10a),_0x1511ce(0x80)]];for(const _0x74291a of _0x562d72){if(!_0x74291a)continue;_0x1b2d39[_0x1511ce(0xd1)]([_0x1511ce(0x7b)[_0x1511ce(0x116)](_0x74291a[0x0]),_0x1511ce(0x88)[_0x1511ce(0x116)](_0x74291a[0x1])]),_0x1b2d39[_0x1511ce(0xd1)]([_0x1511ce(0xb2)[_0x1511ce(0x116)](_0x74291a[0x0]),_0x1511ce(0x82)['format'](_0x74291a[0x1])]),_0x1b2d39[_0x1511ce(0xd1)]([_0x1511ce(0xde)[_0x1511ce(0x116)](_0x74291a[0x0]),_0x1511ce(0xab)[_0x1511ce(0x116)](_0x74291a[0x1])]),_0x1b2d39['push']([_0x1511ce(0xce)[_0x1511ce(0x116)](_0x74291a[0x0]),'(?:PHYSICAL\x20%1|PHYSICAL\x20ATTACK\x20%1)'['format'](_0x74291a[0x1])]),_0x1b2d39[_0x1511ce(0xd1)](['on%1Magical'[_0x1511ce(0x116)](_0x74291a[0x0]),'(?:MAGICAL\x20%1|MAGICAL\x20ATTACK\x20%1)'['format'](_0x74291a[0x1])]),_0x1b2d39[_0x1511ce(0xd1)]([_0x1511ce(0xee)[_0x1511ce(0x116)](_0x74291a[0x0]),'(?:CERTAIN\x20%1|CERTAIN\x20HIT\x20%1)'['format'](_0x74291a[0x1])]);}for(const _0x49f54f of $dataSystem[_0x1511ce(0xb5)]){if(!_0x49f54f)continue;let _0x864302=DataManager[_0x1511ce(0xef)](_0x49f54f);for(const _0x1c1c84 of _0x562d72){if(!_0x1c1c84)continue;_0x1b2d39[_0x1511ce(0xd1)]([_0x1511ce(0x8f)[_0x1511ce(0x116)](_0x864302['replace'](/[ ]/gi,''),_0x1c1c84[0x0]),_0x1511ce(0xa0)[_0x1511ce(0x116)](_0x864302,_0x1c1c84[0x1])]);}}for(const _0x36e07d of $dataSystem[_0x1511ce(0xf1)]){if(!_0x36e07d)continue;let _0x36a055=DataManager[_0x1511ce(0xef)](_0x36e07d);for(const _0x475128 of _0x562d72){if(!_0x475128)continue;_0x1b2d39[_0x1511ce(0xd1)]([_0x1511ce(0xa5)['format'](_0x36a055[_0x1511ce(0x79)](/[ ]/gi,''),_0x475128[0x0]),_0x1511ce(0x108)[_0x1511ce(0x116)](_0x36a055,_0x475128[0x1])]);}}for(const _0x42d605 of _0x1b2d39){this[_0x1511ce(0xa8)](_0x42d605[0x0],_0x42d605[0x1]);}},VisuMZ[_0x5cf5f2(0x11a)][_0x5cf5f2(0xa8)]=function(_0x3c360e,_0x1299fc){const _0x542a2e=_0x5cf5f2;_0x3c360e=_0x3c360e['toUpperCase']()[_0x542a2e(0x118)]();const _0x155e8d=_0x542a2e(0xaa)['format'](_0x1299fc);VisuMZ[_0x542a2e(0x11a)][_0x542a2e(0xea)][_0x3c360e]=new RegExp(_0x155e8d,'i');const _0x2f189d=_0x3c360e+_0x542a2e(0x7e),_0x4242c6=_0x542a2e(0xdf)[_0x542a2e(0x116)](_0x1299fc);VisuMZ['AutoSkillTriggers'][_0x542a2e(0xea)][_0x2f189d]=new RegExp(_0x4242c6,'i');},DataManager[_0x5cf5f2(0xbf)]=function(_0x348bc3){const _0x3ee48=_0x5cf5f2;return this[_0x3ee48(0xef)]($dataSystem['skillTypes'][_0x348bc3]);},DataManager['stripNameTextCodes']=function(_0x8f659e){const _0x57bcb9=_0x5cf5f2;if(!_0x8f659e)return'';return _0x8f659e=_0x8f659e['replace'](/\\V\[(\d+)\]/gi,''),_0x8f659e=_0x8f659e['replace'](/\\I\[(\d+)\]/gi,''),_0x8f659e=_0x8f659e[_0x57bcb9(0x79)](/\\C\[(\d+)\]/gi,''),_0x8f659e=_0x8f659e['replace'](/\\N\[(\d+)\]/gi,''),_0x8f659e=_0x8f659e[_0x57bcb9(0x79)](/\\P\[(\d+)\]/gi,''),(_0x8f659e||'')[_0x57bcb9(0x112)]()[_0x57bcb9(0x118)]();},DataManager[_0x5cf5f2(0xf0)]=function(_0x53c47e){const _0x24f0bb=_0x5cf5f2;return this['stripNameTextCodes']($dataSystem[_0x24f0bb(0xf1)][_0x53c47e]);},VisuMZ[_0x5cf5f2(0x11a)][_0x5cf5f2(0xcc)]=BattleManager[_0x5cf5f2(0xf7)],BattleManager[_0x5cf5f2(0xf7)]=function(){const _0x4184ed=_0x5cf5f2,_0x1baac0=this[_0x4184ed(0xcb)]&&this[_0x4184ed(0xcb)][_0x4184ed(0xc8)](),_0x5efde7=this['_subject'];_0x1baac0&&(this['_subject'][_0x4184ed(0xd7)]=!![]),VisuMZ['AutoSkillTriggers'][_0x4184ed(0xcc)][_0x4184ed(0x83)](this),_0x5efde7&&_0x1baac0&&_0x5efde7['returnSavedAutoSkillTriggerActions']();},VisuMZ[_0x5cf5f2(0x11a)][_0x5cf5f2(0x89)]=BattleManager['checkBattleEnd'],BattleManager[_0x5cf5f2(0xc2)]=function(){const _0xfaa2f3=_0x5cf5f2;if($gameTroop[_0xfaa2f3(0x70)]())$gameParty[_0xfaa2f3(0xf5)]();if(this['_forcedBattlers'][_0xfaa2f3(0x113)]>0x0)return![];return VisuMZ[_0xfaa2f3(0x11a)]['BattleManager_checkBattleEnd'][_0xfaa2f3(0x83)](this);},VisuMZ['AutoSkillTriggers'][_0x5cf5f2(0xba)]=Game_Action[_0x5cf5f2(0xec)][_0x5cf5f2(0x7d)],Game_Action[_0x5cf5f2(0xec)]['clear']=function(){const _0x27945b=_0x5cf5f2;VisuMZ[_0x27945b(0x11a)][_0x27945b(0xba)][_0x27945b(0x83)](this),this['setAutoSkillTrigger'](![]);},Game_Action[_0x5cf5f2(0xec)][_0x5cf5f2(0xf8)]=function(_0x1dde1a){const _0x77b148=_0x5cf5f2;this[_0x77b148(0xd3)]=_0x1dde1a;},Game_Action[_0x5cf5f2(0xec)][_0x5cf5f2(0xc8)]=function(){const _0x599df2=_0x5cf5f2;return!!this[_0x599df2(0xd3)];},VisuMZ['AutoSkillTriggers'][_0x5cf5f2(0x114)]=Game_Action[_0x5cf5f2(0xec)][_0x5cf5f2(0x104)],Game_Action[_0x5cf5f2(0xec)][_0x5cf5f2(0x104)]=function(){const _0x53642e=_0x5cf5f2;let _0x3b0ae7=VisuMZ[_0x53642e(0x11a)][_0x53642e(0x114)][_0x53642e(0x83)](this),_0x533461=this[_0x53642e(0x86)]()?this[_0x53642e(0x86)]()[_0x53642e(0xf4)]:-0x1;return this[_0x53642e(0x86)]()&&this[_0x53642e(0xc8)]()?(this[_0x53642e(0x86)]()[_0x53642e(0xf4)]=0x0,_0x3b0ae7=_0x3b0ae7&&this[_0x53642e(0xae)]()[_0x53642e(0xaf)](this[_0x53642e(0x86)]()),this['item']()[_0x53642e(0xf4)]=_0x533461,_0x3b0ae7):_0x3b0ae7;},VisuMZ[_0x5cf5f2(0x11a)][_0x5cf5f2(0xa4)]=Game_Action[_0x5cf5f2(0xec)]['applyGlobal'],Game_Action[_0x5cf5f2(0xec)][_0x5cf5f2(0xdb)]=function(){const _0x204a2c=_0x5cf5f2;VisuMZ[_0x204a2c(0x11a)][_0x204a2c(0xa4)]['call'](this),this['applyAutoSkillTriggers']();},Game_Action[_0x5cf5f2(0xec)]['getAutoSkillTriggerSTypes']=function(){const _0x1e0370=_0x5cf5f2;if(!this[_0x1e0370(0xd6)]())return[];let _0x4d3c11=[];return Imported[_0x1e0370(0xe5)]?_0x4d3c11=DataManager[_0x1e0370(0x8c)](this[_0x1e0370(0x86)]()):_0x4d3c11[_0x1e0370(0xd1)](this[_0x1e0370(0x86)]()[_0x1e0370(0xf9)]),_0x4d3c11[_0x1e0370(0x98)](_0x1a39bb=>DataManager[_0x1e0370(0xbf)](_0x1a39bb));},Game_Action[_0x5cf5f2(0xec)][_0x5cf5f2(0xa3)]=function(){const _0x3d362a=_0x5cf5f2;let _0x5f3ab7=[];if(Imported[_0x3d362a(0xc9)])_0x5f3ab7=this[_0x3d362a(0xf1)]();else{if(this[_0x3d362a(0x86)]()[_0x3d362a(0x106)]['elementId']<0x0){const _0x251db3=this[_0x3d362a(0xae)]();_0x5f3ab7=_0x251db3[_0x3d362a(0xbe)]();}else _0x5f3ab7=[this[_0x3d362a(0x86)]()['damage'][_0x3d362a(0xa7)]];}return _0x5f3ab7['map'](_0x37bff1=>DataManager[_0x3d362a(0xf0)](_0x37bff1));},Game_Action[_0x5cf5f2(0xec)][_0x5cf5f2(0xc4)]=function(){const _0x265403=_0x5cf5f2;if(!SceneManager[_0x265403(0x105)]())return;if(!this['item']())return;if(this['item']()[_0x265403(0x8a)]['match'](/<NO AUTO SKILL TRIGGER>/i))return;if(this[_0x265403(0x86)]()[_0x265403(0x8a)][_0x265403(0xe4)](/<AUTO TRIGGER:[ ](.*)>/i))return;const _0x4dc889=this[_0x265403(0xae)](),_0x3446d7=BattleManager[_0x265403(0xda)][_0x265403(0xad)]((_0x3f2ebf,_0x36e79a,_0x16cb05)=>_0x16cb05['indexOf'](_0x3f2ebf)===_0x36e79a),_0xcc15dd=_0x4dc889[_0x265403(0xc3)]()['aliveMembers'](),_0x1c5228=_0x4dc889[_0x265403(0xed)]()[_0x265403(0x76)]();this[_0x265403(0xa2)](_0x4dc889,_0x265403(0x9a));for(const _0x2ae352 of _0x3446d7){this['performAutoSkillTriggers'](_0x2ae352,'Target');if(_0x2ae352['isActor']()===_0x4dc889['isActor']())this[_0x265403(0xa2)](_0x2ae352,_0x265403(0x107));else _0x2ae352[_0x265403(0x9d)]()!==_0x4dc889[_0x265403(0x9d)]()&&this[_0x265403(0xa2)](_0x2ae352,'Enemy');}for(const _0x4547d3 of _0xcc15dd){this[_0x265403(0xa2)](_0x4547d3,'Friends'),_0x4547d3!==_0x4dc889&&this[_0x265403(0xa2)](_0x4547d3,_0x265403(0xf2));}for(const _0x552717 of _0x1c5228){this[_0x265403(0xa2)](_0x552717,_0x265403(0xcd));}},Game_Action[_0x5cf5f2(0xec)]['performAutoSkillTriggers']=function(_0x87e213,_0xd3d3c3){const _0x2e1836=_0x5cf5f2;if(!_0x87e213)return;if(this['isAttack']())_0x87e213[_0x2e1836(0x100)](_0x2e1836(0x7b)[_0x2e1836(0x116)](_0xd3d3c3));if(this[_0x2e1836(0xff)]())_0x87e213[_0x2e1836(0x100)]('on%1Guard'['format'](_0xd3d3c3));if(this[_0x2e1836(0x10f)]())_0x87e213['processAutoSkillTrigger'](_0x2e1836(0xde)['format'](_0xd3d3c3));if(this['isPhysical']())_0x87e213['processAutoSkillTrigger']('on%1Physical'['format'](_0xd3d3c3));if(this[_0x2e1836(0x9f)]())_0x87e213[_0x2e1836(0x100)](_0x2e1836(0x117)[_0x2e1836(0x116)](_0xd3d3c3));if(this['isCertainHit']())_0x87e213[_0x2e1836(0x100)](_0x2e1836(0xee)[_0x2e1836(0x116)](_0xd3d3c3));const _0x2d6f5c=this[_0x2e1836(0x93)]();for(let _0x3e0d1e of _0x2d6f5c){if(!_0x3e0d1e)continue;_0x3e0d1e=_0x3e0d1e[_0x2e1836(0x79)](/[ ]/gi,''),_0x87e213['processAutoSkillTrigger']('on%1SType%2'[_0x2e1836(0x116)](_0xd3d3c3,_0x3e0d1e));}const _0x1e4a0f=this[_0x2e1836(0xa3)]();for(let _0xc0b104 of _0x1e4a0f){if(!_0xc0b104)continue;_0xc0b104=_0xc0b104[_0x2e1836(0x79)](/[ ]/gi,''),_0x87e213['processAutoSkillTrigger'](_0x2e1836(0xbd)[_0x2e1836(0x116)](_0xd3d3c3,_0xc0b104));}},VisuMZ[_0x5cf5f2(0x11a)][_0x5cf5f2(0xb0)]=Game_BattlerBase[_0x5cf5f2(0xec)][_0x5cf5f2(0xd2)],Game_BattlerBase[_0x5cf5f2(0xec)][_0x5cf5f2(0xd2)]=function(_0x268c68){const _0x10e22e=_0x5cf5f2;if(_0x268c68===this[_0x10e22e(0x9e)]()&&this['hasDeathAutoSkillTrigger']())return this['processDeathAutoSkillTriggerEffects']();VisuMZ[_0x10e22e(0x11a)][_0x10e22e(0xb0)][_0x10e22e(0x83)](this,_0x268c68);},Game_BattlerBase[_0x5cf5f2(0xec)]['hasDeathAutoSkillTrigger']=function(){const _0x56699c=_0x5cf5f2;if(!SceneManager['isSceneBattle']())return![];if(!this[_0x56699c(0x119)]())return![];if(this[_0x56699c(0xdd)])return![];return this[_0x56699c(0xb1)]()['some'](_0x8f3e6f=>this[_0x56699c(0xb9)](_0x8f3e6f));},Game_BattlerBase['prototype'][_0x5cf5f2(0xb9)]=function(_0x19706a){const _0x39103d=_0x5cf5f2,_0x4e1b51=VisuMZ['AutoSkillTriggers'][_0x39103d(0xea)][_0x39103d(0x103)];return _0x19706a&&_0x19706a[_0x39103d(0x8a)][_0x39103d(0xe4)](_0x4e1b51)&&this[_0x39103d(0xaf)](_0x19706a);},VisuMZ[_0x5cf5f2(0x11a)][_0x5cf5f2(0xd5)]=Game_BattlerBase[_0x5cf5f2(0xec)][_0x5cf5f2(0xe6)],Game_BattlerBase[_0x5cf5f2(0xec)][_0x5cf5f2(0xe6)]=function(){const _0x82d515=_0x5cf5f2;if(this[_0x82d515(0x8b)])return!![];return VisuMZ[_0x82d515(0x11a)][_0x82d515(0xd5)][_0x82d515(0x83)](this);},Game_Battler['prototype'][_0x5cf5f2(0x100)]=function(_0xa83b3a){const _0x2c893d=_0x5cf5f2;if(!SceneManager['isSceneBattle']())return;_0xa83b3a=_0xa83b3a[_0x2c893d(0x112)]()['trim']();const _0x23e4e2=VisuMZ[_0x2c893d(0x11a)]['RegExp'][_0xa83b3a],_0x153c4d=_0xa83b3a+_0x2c893d(0x7e),_0x15f56c=VisuMZ[_0x2c893d(0x11a)]['RegExp'][_0x153c4d];if(!_0x23e4e2&&!_0x15f56c)return;if(!this[_0x2c893d(0x119)]())return;for(const _0x420a22 of this[_0x2c893d(0xb1)]()){if(!_0x420a22)continue;if(!this[_0x2c893d(0xaf)](_0x420a22))continue;let _0x1f46f8=![];if(_0x420a22[_0x2c893d(0x8a)][_0x2c893d(0xe4)](_0x23e4e2))_0x1f46f8=!![];else{if(_0x420a22[_0x2c893d(0x8a)][_0x2c893d(0xe4)](_0x15f56c)){const _0x16aa80=(Number(RegExp['$1'])||0x0)*0.01;_0x1f46f8=Math['random']()<_0x16aa80;}}if(_0x1f46f8){this[_0x2c893d(0x10e)](_0x420a22['id']);const _0x19ba2e=BattleManager['_actionBattlers']['clone'](),_0x5f53ba=BattleManager[_0x2c893d(0x77)];BattleManager[_0x2c893d(0x77)]=null,BattleManager[_0x2c893d(0xfb)](this),BattleManager['_actionBattlers']=_0x19ba2e,BattleManager[_0x2c893d(0x77)]=_0x5f53ba;}}},Game_Battler[_0x5cf5f2(0xec)]['forceAutoSkillTrigger']=function(_0x512b63){const _0x437a5e=_0x5cf5f2;!this[_0x437a5e(0xc5)]&&(this['_savedAutoSkillTriggerActions']=this[_0x437a5e(0xac)]['clone']());this[_0x437a5e(0xfb)](_0x512b63,-0x2);if(!this['_actions'])return;const _0x396bf0=this[_0x437a5e(0xac)][this[_0x437a5e(0xac)][_0x437a5e(0x113)]-0x1];_0x396bf0[_0x437a5e(0xf8)](!![]);},Game_Battler['prototype'][_0x5cf5f2(0xfc)]=function(){const _0x384c18=_0x5cf5f2;if(!this[_0x384c18(0xc5)])return;if(this[_0x384c18(0xac)]['length']>0x0)return;this['_actions']=this[_0x384c18(0xc5)],this[_0x384c18(0xc5)]=undefined;},VisuMZ[_0x5cf5f2(0x11a)][_0x5cf5f2(0x115)]=Game_Battler[_0x5cf5f2(0xec)]['onBattleEnd'],Game_Battler[_0x5cf5f2(0xec)][_0x5cf5f2(0x7c)]=function(){const _0x107853=_0x5cf5f2;this['_savedAutoSkillTriggerActions']=undefined,VisuMZ['AutoSkillTriggers']['Game_Battler_onBattleEnd'][_0x107853(0x83)](this);},VisuMZ[_0x5cf5f2(0x11a)][_0x5cf5f2(0x75)]=Game_Battler[_0x5cf5f2(0xec)][_0x5cf5f2(0xe0)],Game_Battler[_0x5cf5f2(0xec)][_0x5cf5f2(0xe0)]=function(){const _0xec3399=_0x5cf5f2;if(this[_0xec3399(0xd7)]){this['_autoSkillTriggerBypassTpbClear']=undefined;return;}VisuMZ[_0xec3399(0x11a)][_0xec3399(0x75)][_0xec3399(0x83)](this);},VisuMZ[_0x5cf5f2(0x11a)]['Game_Battler_onBattleStart']=Game_Battler[_0x5cf5f2(0xec)]['onBattleStart'],Game_Battler[_0x5cf5f2(0xec)][_0x5cf5f2(0xc7)]=function(_0x2e5d03){const _0x41029e=_0x5cf5f2;this['_savedAutoSkillTriggerActions']=undefined,$gameParty[_0x41029e(0xc0)]=!![],VisuMZ['AutoSkillTriggers'][_0x41029e(0x10d)][_0x41029e(0x83)](this,_0x2e5d03),this[_0x41029e(0x100)](_0x41029e(0xc7)),this[_0x41029e(0xe8)]();},VisuMZ[_0x5cf5f2(0x11a)]['Game_BattlerBase_revive']=Game_BattlerBase[_0x5cf5f2(0xec)][_0x5cf5f2(0xe2)],Game_BattlerBase[_0x5cf5f2(0xec)][_0x5cf5f2(0xe2)]=function(){const _0x1feb64=_0x5cf5f2;VisuMZ['AutoSkillTriggers'][_0x1feb64(0xd4)]['call'](this),this['clearDeathAutoSkillTrigger']();},Game_Battler[_0x5cf5f2(0xec)]['clearDeathAutoSkillTrigger']=function(){const _0x8cbc58=_0x5cf5f2;this[_0x8cbc58(0x8b)]=![],this[_0x8cbc58(0xdd)]=![];},Game_Battler[_0x5cf5f2(0xec)][_0x5cf5f2(0x73)]=function(){const _0x9ccec3=_0x5cf5f2;if(!this[_0x9ccec3(0x119)]())return;if(!SceneManager['isSceneBattle']())return;this[_0x9ccec3(0x8b)]=!![],this[_0x9ccec3(0x100)](_0x9ccec3(0x10a));};const _Game_Battler_onAllActionsEnd_=Game_Battler[_0x5cf5f2(0xec)][_0x5cf5f2(0xd0)];Game_Battler[_0x5cf5f2(0xec)][_0x5cf5f2(0xd0)]=function(){const _0x5a3d51=_0x5cf5f2;_Game_Battler_onAllActionsEnd_[_0x5a3d51(0x83)](this),this[_0x5a3d51(0xc6)]();},Game_Battler[_0x5cf5f2(0xec)][_0x5cf5f2(0xc6)]=function(){const _0x43d280=_0x5cf5f2;if(!this[_0x43d280(0x8b)])return;if(this[_0x43d280(0xdd)])return;const _0x518e9b=BattleManager[_0x43d280(0x109)];for(const _0x1fd4ad of _0x518e9b){if(!_0x1fd4ad)continue;if(_0x1fd4ad[0x0]===this)return;}this[_0x43d280(0x8b)]=![],this[_0x43d280(0xdd)]=!![],this[_0x43d280(0x90)]();if(this[_0x43d280(0xb8)]())this[_0x43d280(0xe8)]();},VisuMZ[_0x5cf5f2(0x11a)][_0x5cf5f2(0xeb)]=Game_Unit[_0x5cf5f2(0xec)]['onBattleStart'],Game_Unit[_0x5cf5f2(0xec)][_0x5cf5f2(0xc7)]=function(_0x4a4382){const _0xfa180b=_0x5cf5f2;VisuMZ['AutoSkillTriggers'][_0xfa180b(0xeb)][_0xfa180b(0x83)](this,_0x4a4382);if(this[_0xfa180b(0xa6)]===Game_Party)this[_0xfa180b(0xe1)]=![];},Game_Unit[_0x5cf5f2(0xec)]['processAutoSkillTriggers']=function(_0x3607dd,_0x3c6468){const _0x321f16=_0x5cf5f2;_0x3c6468=_0x3c6468||null;const _0x9d9b69=this[_0x321f16(0x76)]()[_0x321f16(0xad)](_0x3ac6db=>_0x3ac6db!==_0x3c6468);for(const _0x1d6d37 of _0x9d9b69){if(!_0x1d6d37)continue;_0x1d6d37[_0x321f16(0x100)](_0x3607dd);}},Game_Party[_0x5cf5f2(0xec)][_0x5cf5f2(0xf5)]=function(){const _0x3febb3=_0x5cf5f2;if(this[_0x3febb3(0xe1)])return;this[_0x3febb3(0xe1)]=!![],this[_0x3febb3(0x10c)](_0x3febb3(0x74));};