/*=============================================================================
 SceneCustomMenu.js
----------------------------------------------------------------------------
 (C)2020 Triacontane
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.14.4 2021/05/18 一覧ウィンドウを指定しなかった場合やnullで返した場合、単項目表示ウィンドウとして機能するよう修正
 1.14.3 2021/05/15 コマンド直接入力かつフォントサイズを変更した場合に項目の表示位置が不整合になる場合がある問題を修正
 1.14.2 2021/05/15 廃止された一部のプリセットを削除
 1.14.1 2021/05/15 初期表示時にアクターのフェイスグラフィックを表示しようとしたとき、うまく表示されない場合がある問題を修正
 1.14.0 2021/05/14 決定時のイベントで元ウィンドウの選択状態を解除できる機能を追加
 1.13.3 2021/05/12 ウィンドウリストで下にあるウィンドウを『一覧ウィンドウ』に指定するとエラーになる問題を修正
 1.13.2 2021/05/10 ウィンドウ開閉が無効な場合、初期状態で非表示のウィンドウが一瞬表示されてしまう問題を修正
 1.13.1 2021/05/09 ヘルプの誤記、分かりにくい表現の修正
 1.13.0 2021/05/07 戦闘画面からカスタムメニューを呼び出して戻ったときに戦闘状況が初期化されないよう修正
 1.12.2 2021/05/07 メインフォントや項目の高さを変更した場合に項目の表示位置が不整合になる場合がある問題を修正
 1.12.1 2021/05/07 パラメータのScene20が正常に読み込まれていなかった問題を修正
 1.12.0 2021/05/06 カスタムメニュー画面の呼び出しをプラグインコマンド化
                   ウィンドウが重なったときに背後をマスキングしない設定を追加
                   ヘルプの表示揺れ等修正
 1.11.6 2021/04/18 プリセットのスクリプトをMZ向けに修正
 1.11.5 2021/04/11 1.10.4で解消した問題をキャラクターとフェイスグラフィックにも適用
 1.11.4 2021/04/08 キャッシュされていないピクチャを表示しようとしたとき、表示順序がずれる場合がある問題を修正
 1.11.3 2021/04/08 orderAfterアノテーションを追加
                   コマンドウィンドウの文字列の縦の揃えを中央に変更
                   ヘルプウィンドウの行数変更が反映されない問題を修正
                   相対Y座標ウィンドウを指定したウィンドウの表示位置がズレる場合がある問題を修正
 1.11.2 2021/04/07 Scene情報が歯抜けになっていると以後の情報を読み込まない問題を修正
 1.11.1 2021/04/03 スクリプトに凡例を追加
 1.10.0 2021/03/31 MZで動作するよう修正
 1.9.0 2020/09/21 ウィンドウで選択中の項目オブジェクトを変数に格納できる機能を追加
 1.8.0 2020/08/02 利用可能なScene数を20に増やした
 1.7.5 2020/07/28 NobleMushroom.jsとの競合を解消
 1.7.4 2020/07/23 1.7.3で修正した一部のリファクタリングを元に戻す
 1.7.3 2020/07/19 1.7.2の修正でパラメータの設定次第で初期ウィンドウから前の画面に戻れなくなる場合がある問題を修正
 1.7.2 2020/07/19 初期ウィンドウでキャンセルしたとき、別のウィンドウ識別子が指定されていたら前の画面に戻らないよう仕様変更
 1.7.1 2020/07/12 1.7.0の修正でパラメータの再設定をしないとコマンドウィンドウの項目が表示されなくなる問題を修正
 1.7.0 2020/07/12 再描画に同一のスイッチを指定した場合に、すべてのウィンドウが再描画されるよう修正
                  通常コマンドリストにも非表示、選択不可でスクリプトを使用できる機能を追加
                  スクリプト実行でエラーになったときにゲームを停止せずエラーログを出力するよう変更
 1.6.2 2020/07/08 マップ画面にピクチャを表示できるスクリプトを追加
 1.6.1 2020/07/06 任意のウィンドウのインデックスをコモンイベントなどから変更できるスクリプトを追加
 1.6.0 2020/06/21 項目描画で指定したメモ欄のピクチャを表示できる機能を追加
 1.5.0 2020/06/21 遷移元Sceneの情報を破棄するスクリプトを追加
 1.4.0 2020/06/21 別の一覧ウィンドウの詳細情報を表示するウィンドウの作成を支援する機能を追加
 1.3.0 2020/05/01 各画面に背景画像を指定できる機能を追加
 1.2.2 2020/03/28 プリセットのスクリプトに1件追加
 1.2.1 2020/03/26 スイッチによる再描画実行後、当該スイッチにfalseではなく0が入っていたので修正
 1.2.0 2020/03/26 マスキング機能と使用禁止機能を分離し、代わりにフィルタ機能に統合
                  ヘルプの行数を指定できる機能を追加
                  スクリプトからフォーカスを変更できる機能を追加
                  未キャッシュのフェイスとキャラクターを表示できるよう修正
 1.1.1 2020/03/25 マスキング機能をヘルプ欄にも適用
                  一部のスクリプトのプリセットを修正
 1.1.0 2020/03/24 カーソルが動いたときに発生する「カーソルイベント」を追加
                  選択不可能項目を専用の文字列でマスキングできる機能を追加
                  ヘルプテキストに改行「\n」が使えるよう修正
 1.0.1 2020/03/21 スクリプトの凡例追加とヘルプの微修正
 1.0.0 2020/03/21 初版
----------------------------------------------------------------------------
 [Blog]   : https://triacontane.blogspot.jp/
 [Twitter]: https://twitter.com/triacontane/
 [GitHub] : https://github.com/triacontane/
=============================================================================*/

/*:
 * @plugindesc Custom Menu Creation Plugin
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/SceneCustomMenu.js
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author Triacontane
 *
 * @param Scene1
 * @text Scene1
 * @desc Scene information for the custom menu to be generated。
 * @default {"Id":"Scene_ActorList","UseHelp":"true","HelpRows":"0","InitialEvent":"","WindowList":"[\"{\\\"Id\\\":\\\"member_window\\\",\\\"x\\\":\\\"0\\\",\\\"RelativeWindowIdX\\\":\\\"\\\",\\\"y\\\":\\\"0\\\",\\\"RelativeWindowIdY\\\":\\\"\\\",\\\"width\\\":\\\"480\\\",\\\"height\\\":\\\"0\\\",\\\"ColumnNumber\\\":\\\"1\\\",\\\"RowNumber\\\":\\\"4\\\",\\\"ItemHeight\\\":\\\"111\\\",\\\"CommandList\\\":\\\"\\\",\\\"DataScript\\\":\\\"\\\",\\\"ListWindowId\\\":\\\"\\\",\\\"ListScript\\\":\\\"$gameParty.members(); // パーティメンバー\\\",\\\"FilterScript\\\":\\\"\\\",\\\"MappingScript\\\":\\\"\\\",\\\"ItemDrawScript\\\":\\\"[\\\\\\\"this.drawActorSimpleStatus(item, r.x, r.y, r.width); // アクターのステータス\\\\\\\"]\\\",\\\"IsEnableScript\\\":\\\"\\\",\\\"CommonHelpText\\\":\\\"アクターを選択してください。\\\",\\\"DecisionEvent\\\":\\\"{\\\\\\\"CommandId\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FocusWindowId\\\\\\\":\\\\\\\"confirm\\\\\\\",\\\\\\\"FocusWindowIndex\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Script\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"SwitchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"CancelEvent\\\":\\\"{}\\\",\\\"CursorEvent\\\":\\\"{}\\\",\\\"FontSize\\\":\\\"0\\\",\\\"WindowSkin\\\":\\\"\\\",\\\"VisibleSwitchId\\\":\\\"0\\\",\\\"ShowOpenAnimation\\\":\\\"false\\\",\\\"RefreshSwitchId\\\":\\\"0\\\",\\\"IndexVariableId\\\":\\\"0\\\",\\\"ItemVariableId\\\":\\\"0\\\",\\\"Cancelable\\\":\\\"true\\\",\\\"ActorChangeable\\\":\\\"false\\\",\\\"HiddenNoFocus\\\":\\\"false\\\",\\\"MaskingText\\\":\\\"\\\"}\",\"{\\\"Id\\\":\\\"detail_window\\\",\\\"x\\\":\\\"0\\\",\\\"RelativeWindowIdX\\\":\\\"member_window\\\",\\\"y\\\":\\\"0\\\",\\\"RelativeWindowIdY\\\":\\\"\\\",\\\"width\\\":\\\"0\\\",\\\"height\\\":\\\"300\\\",\\\"ColumnNumber\\\":\\\"1\\\",\\\"RowNumber\\\":\\\"0\\\",\\\"ItemHeight\\\":\\\"0\\\",\\\"CommandList\\\":\\\"\\\",\\\"DataScript\\\":\\\"\\\",\\\"ListWindowId\\\":\\\"member_window\\\",\\\"ListScript\\\":\\\"\\\",\\\"FilterScript\\\":\\\"\\\",\\\"MappingScript\\\":\\\"\\\",\\\"ItemDrawScript\\\":\\\"[\\\\\\\"this.drawFace(item.faceName(), item.faceIndex(), r.x, r.y); // フェイスグラフィック\\\\\\\"]\\\",\\\"IsEnableScript\\\":\\\"\\\",\\\"CommonHelpText\\\":\\\"\\\",\\\"DecisionEvent\\\":\\\"{}\\\",\\\"CancelEvent\\\":\\\"{}\\\",\\\"CursorEvent\\\":\\\"{}\\\",\\\"FontSize\\\":\\\"0\\\",\\\"WindowSkin\\\":\\\"\\\",\\\"VisibleSwitchId\\\":\\\"0\\\",\\\"ShowOpenAnimation\\\":\\\"true\\\",\\\"RefreshSwitchId\\\":\\\"0\\\",\\\"IndexVariableId\\\":\\\"0\\\",\\\"ItemVariableId\\\":\\\"0\\\",\\\"Cancelable\\\":\\\"true\\\",\\\"ActorChangeable\\\":\\\"false\\\",\\\"HiddenNoFocus\\\":\\\"false\\\",\\\"MaskingText\\\":\\\"\\\"}\",\"{\\\"Id\\\":\\\"confirm\\\",\\\"x\\\":\\\"0\\\",\\\"RelativeWindowIdX\\\":\\\"member_window\\\",\\\"y\\\":\\\"0\\\",\\\"RelativeWindowIdY\\\":\\\"detail_window\\\",\\\"width\\\":\\\"130\\\",\\\"height\\\":\\\"0\\\",\\\"ColumnNumber\\\":\\\"1\\\",\\\"RowNumber\\\":\\\"2\\\",\\\"ItemHeight\\\":\\\"36\\\",\\\"CommandList\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"Text\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"はい\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"VisibleSwitchId\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"EnableSwitchId\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"HelpText\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"CancelChoice\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"{\\\\\\\\\\\\\\\"Text\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"いいえ\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"VisibleSwitchId\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"EnableSwitchId\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"HelpText\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"CancelChoice\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"true\\\\\\\\\\\\\\\"}\\\\\\\"]\\\",\\\"DataScript\\\":\\\"\\\",\\\"ListScript\\\":\\\"\\\",\\\"FilterScript\\\":\\\"\\\",\\\"MappingScript\\\":\\\"\\\",\\\"ItemDrawScript\\\":\\\"\\\",\\\"IsEnableScript\\\":\\\"\\\",\\\"CommonHelpText\\\":\\\"本当によろしいですか？\\\",\\\"DecisionEvent\\\":\\\"{\\\\\\\"CommandId\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FocusWindowId\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FocusWindowIndex\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Script\\\\\\\":\\\\\\\"SceneManager.callCustomMenu('Scene_ActorListNext'); //\\\\\\\",\\\\\\\"SwitchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"CancelEvent\\\":\\\"{}\\\",\\\"CursorEvent\\\":\\\"{}\\\",\\\"FontSize\\\":\\\"0\\\",\\\"WindowSkin\\\":\\\"\\\",\\\"VisibleSwitchId\\\":\\\"0\\\",\\\"ShowOpenAnimation\\\":\\\"true\\\",\\\"RefreshSwitchId\\\":\\\"0\\\",\\\"IndexVariableId\\\":\\\"0\\\",\\\"Cancelable\\\":\\\"true\\\",\\\"ActorChangeable\\\":\\\"false\\\",\\\"HiddenNoFocus\\\":\\\"true\\\",\\\"MaskingText\\\":\\\"\\\"}\"]","Panorama":""}
 * @type struct<Scene>
 *
 * @param Scene2
 * @text Scene2
 * @desc Scene information for the custom menu to be generated。
 * @default {"Id":"Scene_ActorListNext","UseHelp":"true","InitialEvent":"","WindowList":"[\"{\\\"Id\\\":\\\"window1\\\",\\\"x\\\":\\\"0\\\",\\\"RelativeWindowIdX\\\":\\\"\\\",\\\"y\\\":\\\"0\\\",\\\"RelativeWindowIdY\\\":\\\"\\\",\\\"width\\\":\\\"0\\\",\\\"height\\\":\\\"0\\\",\\\"ColumnNumber\\\":\\\"2\\\",\\\"RowNumber\\\":\\\"0\\\",\\\"ItemHeight\\\":\\\"0\\\",\\\"CommandList\\\":\\\"\\\",\\\"DataScript\\\":\\\"\\\",\\\"ListScript\\\":\\\"$dataClasses.filter(data => !!data); // データベースの職業\\\",\\\"FilterScript\\\":\\\"\\\",\\\"MappingScript\\\":\\\"\\\",\\\"ItemDrawScript\\\":\\\"\\\",\\\"IsEnableScript\\\":\\\"item.meta['value']; // メモ欄に<value>の記述がある\\\",\\\"CommonHelpText\\\":\\\"メモ欄に<value>と書いた職業だけ選択できます。\\\",\\\"DecisionEvent\\\":\\\"{\\\\\\\"CommandId\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FocusWindowId\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FocusWindowIndex\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Script\\\\\\\":\\\\\\\"this.popScene(); // 元のSceneに戻る\\\\\\\",\\\\\\\"SwitchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"CancelEvent\\\":\\\"{}\\\",\\\"FontSize\\\":\\\"0\\\",\\\"WindowSkin\\\":\\\"\\\",\\\"VisibleSwitchId\\\":\\\"0\\\",\\\"ShowOpenAnimation\\\":\\\"true\\\",\\\"RefreshSwitchId\\\":\\\"0\\\",\\\"IndexVariableId\\\":\\\"0\\\",\\\"Cancelable\\\":\\\"true\\\",\\\"ActorChangeable\\\":\\\"false\\\",\\\"HiddenNoFocus\\\":\\\"false\\\"}\"]"}
 * @type struct<Scene>
 *
 * @param Scene3
 * @text Scene3
 * @desc Scene information for the custom menu to be generated。
 * @default {"Id":"Scene_ActorDetail","UseHelp":"true","InitialEvent":"","WindowList":"[\"{\\\"Id\\\":\\\"actor_name\\\",\\\"x\\\":\\\"0\\\",\\\"RelativeWindowIdX\\\":\\\"\\\",\\\"y\\\":\\\"0\\\",\\\"RelativeWindowIdY\\\":\\\"\\\",\\\"width\\\":\\\"420\\\",\\\"height\\\":\\\"0\\\",\\\"ColumnNumber\\\":\\\"1\\\",\\\"RowNumber\\\":\\\"1\\\",\\\"ItemHeight\\\":\\\"0\\\",\\\"CommandList\\\":\\\"\\\",\\\"DataScript\\\":\\\"\\\",\\\"ListScript\\\":\\\"[this._actor]; // メインメニューで選択したアクター\\\",\\\"FilterScript\\\":\\\"\\\",\\\"MappingScript\\\":\\\"\\\",\\\"ItemDrawScript\\\":\\\"[\\\\\\\"this.drawActorSimpleStatus(item, r.x, r.y, r.width); // アクターのステータス\\\\\\\"]\\\",\\\"IsEnableScript\\\":\\\"\\\",\\\"CommonHelpText\\\":\\\"PgUp, PgDnキーでアクターを変更できます。\\\",\\\"DecisionEvent\\\":\\\"{\\\\\\\"CommandId\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FocusWindowId\\\\\\\":\\\\\\\"actor_name\\\\\\\",\\\\\\\"FocusWindowIndex\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Script\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"SwitchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"CancelEvent\\\":\\\"{}\\\",\\\"FontSize\\\":\\\"0\\\",\\\"WindowSkin\\\":\\\"\\\",\\\"VisibleSwitchId\\\":\\\"0\\\",\\\"ShowOpenAnimation\\\":\\\"true\\\",\\\"RefreshSwitchId\\\":\\\"0\\\",\\\"IndexVariableId\\\":\\\"0\\\",\\\"Cancelable\\\":\\\"true\\\",\\\"ActorChangeable\\\":\\\"true\\\",\\\"HiddenNoFocus\\\":\\\"false\\\"}\",\"{\\\"Id\\\":\\\"slot\\\",\\\"x\\\":\\\"0\\\",\\\"RelativeWindowIdX\\\":\\\"\\\",\\\"y\\\":\\\"0\\\",\\\"RelativeWindowIdY\\\":\\\"actor_name\\\",\\\"width\\\":\\\"200\\\",\\\"height\\\":\\\"0\\\",\\\"ColumnNumber\\\":\\\"1\\\",\\\"RowNumber\\\":\\\"0\\\",\\\"ItemHeight\\\":\\\"0\\\",\\\"CommandList\\\":\\\"\\\",\\\"DataScript\\\":\\\"\\\",\\\"ListScript\\\":\\\"this._actor.equipSlots(); // メインメニューで選択したアクターの装備スロット\\\",\\\"FilterScript\\\":\\\"\\\",\\\"MappingScript\\\":\\\"$dataSystem.equipTypes[item]; // 装備スロットIDを装備スロット名称に変換\\\",\\\"ItemDrawScript\\\":\\\"\\\",\\\"IsEnableScript\\\":\\\"\\\",\\\"CommonHelpText\\\":\\\"\\\",\\\"DecisionEvent\\\":\\\"\\\",\\\"CancelEvent\\\":\\\"{}\\\",\\\"FontSize\\\":\\\"0\\\",\\\"WindowSkin\\\":\\\"\\\",\\\"VisibleSwitchId\\\":\\\"0\\\",\\\"ShowOpenAnimation\\\":\\\"true\\\",\\\"RefreshSwitchId\\\":\\\"0\\\",\\\"IndexVariableId\\\":\\\"0\\\",\\\"Cancelable\\\":\\\"true\\\",\\\"ActorChangeable\\\":\\\"true\\\",\\\"HiddenNoFocus\\\":\\\"false\\\"}\",\"{\\\"Id\\\":\\\"equip\\\",\\\"x\\\":\\\"0\\\",\\\"RelativeWindowIdX\\\":\\\"slot\\\",\\\"y\\\":\\\"0\\\",\\\"RelativeWindowIdY\\\":\\\"actor_name\\\",\\\"width\\\":\\\"400\\\",\\\"height\\\":\\\"0\\\",\\\"ColumnNumber\\\":\\\"1\\\",\\\"RowNumber\\\":\\\"0\\\",\\\"ItemHeight\\\":\\\"0\\\",\\\"CommandList\\\":\\\"\\\",\\\"DataScript\\\":\\\"\\\",\\\"ListScript\\\":\\\"this._actor.equips(); // メインメニューで選択したアクターの装備スロットID\\\",\\\"FilterScript\\\":\\\"\\\",\\\"MappingScript\\\":\\\"\\\",\\\"ItemDrawScript\\\":\\\"\\\",\\\"IsEnableScript\\\":\\\"\\\",\\\"CommonHelpText\\\":\\\"\\\",\\\"DecisionEvent\\\":\\\"\\\",\\\"CancelEvent\\\":\\\"{}\\\",\\\"FontSize\\\":\\\"0\\\",\\\"WindowSkin\\\":\\\"\\\",\\\"VisibleSwitchId\\\":\\\"0\\\",\\\"ShowOpenAnimation\\\":\\\"true\\\",\\\"RefreshSwitchId\\\":\\\"0\\\",\\\"IndexVariableId\\\":\\\"0\\\",\\\"Cancelable\\\":\\\"true\\\",\\\"ActorChangeable\\\":\\\"true\\\",\\\"HiddenNoFocus\\\":\\\"false\\\"}\"]"}
 * @type struct<Scene>
 *
 * @param Scene4
 * @text Scene4
 * @desc Scene information for the custom menu to be generated。
 * @default {}
 * @type struct<Scene>
 *
 * @param Scene5
 * @text Scene5
 * @desc Scene information for the custom menu to be generated。
 * @default {}
 * @type struct<Scene>
 *
 * @param Scene6
 * @text Scene6
 * @desc Scene information for the custom menu to be generated。
 * @default {}
 * @type struct<Scene>
 *
 * @param Scene7
 * @text Scene7
 * @desc Scene information for the custom menu to be generated。
 * @default {}
 * @type struct<Scene>
 *
 * @param Scene8
 * @text Scene8
 * @desc Scene information for the custom menu to be generated。
 * @default {}
 * @type struct<Scene>
 *
 * @param Scene9
 * @text Scene9
 * @desc Scene information for the custom menu to be generated。
 * @default {}
 * @type struct<Scene>
 *
 * @param Scene10
 * @text Scene10
 * @desc Scene information for the custom menu to be generated。
 * @default {}
 * @type struct<Scene>
 *
 * @param Scene11
 * @text Scene11
 * @desc Scene information for the custom menu to be generated。
 * @default {}
 * @type struct<Scene>
 *
 * @param Scene12
 * @text Scene12
 * @desc Scene information for the custom menu to be generated。
 * @default {}
 * @type struct<Scene>
 *
 * @param Scene13
 * @text Scene13
 * @desc Scene information for the custom menu to be generated。
 * @default {}
 * @type struct<Scene>
 *
 * @param Scene14
 * @text Scene14
 * @desc Scene information for the custom menu to be generated。
 * @default {}
 * @type struct<Scene>
 *
 * @param Scene15
 * @text Scene15
 * @desc Scene information for the custom menu to be generated。
 * @default {}
 * @type struct<Scene>
 *
 * @param Scene16
 * @text Scene16
 * @desc Scene information for the custom menu to be generated。
 * @default {}
 * @type struct<Scene>
 *
 * @param Scene17
 * @text Scene17
 * @desc Scene information for the custom menu to be generated。
 * @default {}
 * @type struct<Scene>
 *
 * @param Scene18
 * @text Scene18
 * @desc Scene information for the custom menu to be generated。
 * @default {}
 * @type struct<Scene>
 *
 * @param Scene19
 * @text Scene19
 * @desc Scene information for the custom menu to be generated。
 * @default {}
 * @type struct<Scene>
 *
 * @param Scene20
 * @text Scene20
 * @desc Scene information for the custom menu to be generated。
 * @default {}
 * @type struct<Scene>
 *
 * @command CALL_SCENE
 * @text Call Scene
 * @desc Call Scene with the ID specified。
 *
 * @arg id
 * @text Scene Identifier
 * @desc Scene ID to call。
 * @default Scene_ActorList
 *
 * @help SceneCustomMenu.js
 *
 * You can create your own menu screen by defining window information with parameters。
 * It comes with examples that work as a base and a wide variety of script presets.
 * You can see how it works with a quick test.
 * When an error occurs in the scrip, a log will be displayed in the Developer Console.
 * You can use common events for specific requirements.
 *
 * To create a custom menu screen, please follow the steps below。
 *
 * 1. Define a window
 * 　Define a window and its content from the plugin parameters.　
 * 　The content can be a fixed string, database, actor data, etc。
 *
 * 2. Define the connection between windows
 * 　When you make a decision or cancel in a windows, you can move to another window or
 * 　define connections between windows so you can exit the screen and so on。
 *
 * 3. Define the event
 * 　Defines the information about scripts and common events that will be executed
 * 　when a decision is made or cancelled in a window。
 *
 * To summon the custon menu, run the following script。
 * You can also call it from the plugin command。
 * Set the "Scene Identifier" in the "Scene_ActorList" section。
 *
 *  SceneManager.callCustomMenu('Scene_ActorList');
 *
 * There's no way to add custom menu items to the main menu screen。
 * You must do it through other plugins or solutions。
 *
 * ・Script
 * Set the focus to an specific window。
 * SceneManager.changeWindowFocus('window1');
 *
 * Change the index of the specified window。
 * SceneManager.changeWindowIndex('window1', 1);
 *
 * Discard one of the transition source Scene Information。
 * SceneManager.trashScene();
 *
 * Get the specifed window instance (For advanced users)。
 * SceneManager.findCustomMenuWindow('window1');
 *
 * Display a picture on the map screen。
 * SceneManager.showMapPicture(1, 'file-name', 0, 0, 0, 100, 100, 255, 1);
 *
 * Terms of use：
 *  Plugin can be modified or redistributed without permision of the author an can be used
 *  in any way except commercial titles and +18 games.
 *  There's also no additional restrictions on.
 *  This plugin is now yours!
 */

/*~struct~Scene:
 *
 * @param Id
 * @text SceneID
 * @desc This is the SceneID when calling one. Please specifiy a string that does not overlap with other IDs。
 * @default Scene_Test
 * @type string
 *
 * @param UseHelp
 * @text Use Help Window?
 * @desc When enabled, a help window will be displayed at the bottom of the screen。
 * @default true
 * @type boolean
 *
 * @param HelpRows
 * @text Number of help rows
 * @desc Specify this if you want to change the number of rows in the help window from the 2 default。
 * @default 0
 * @type number
 *
 * @param InitialEvent
 * @text Initial Event
 * @desc This event occurs the moment the Scene is displayed. If you cancel in the window specified as the initial event, you will leave the screen.。
 * @default {}
 * @type struct<Event>
 *
 * @param WindowList
 * @text Window List
 * @desc This is the list of windows used in Scene。
 * @default []
 * @type struct<Window>[]
 *
 * @param Panorama
 * @text Background picture
 * @desc Specify a background picture。
 * @default
 * @type struct<Panorama>
 *
 * @param UsePageButtons
 * @text Use page buttons
 * @desc When enabled, the page button will be displayed。
 * @default false
 * @type boolean
 *
 */

/*~struct~Panorama:
 *
 * @param Image
 * @text Image File
 * @desc Specify the image file to be used as the background. If it's not specified, a map blurry picture will be displayed。
 * @default
 * @require 1
 * @dir img/parallaxes
 * @type file
 *
 * @param ScrollX
 * @text ScrollX
 * @desc Scroll speed of the background image in X axis。
 * @default 0
 * @type number
 *
 * @param ScrollY
 * @text ScrollY
 * @desc Scroll speed of the background image in Y axis。
 * @default 0
 * @type number
 */

/*~struct~Window:
 *
 * @param Id
 * @text Window ID
 * @desc ID of the window. It should be a string that doesn't overlap with any other ID in the list。
 * @default window1
 * @type string
 *
 * @param x
 * @text X Coordinate
 * @desc X Coordinate。
 * @default 0
 * @type number
 * @min -2000
 *
 * @param RelativeWindowIdX
 * @text Relative X Coordinates for the window
 * @desc If specified, the X coordinate will be relative to the target window。
 * @default
 *
 * @param y
 * @text Y座標
 * @desc Y座標です。
 * @default 0
 * @type number
 * @min -2000
 *
 * @param RelativeWindowIdY
 * @text Relative Y Coordinates for the window
 * @desc If specified, the X coordinate will be relative to the target window。
 * @default
 *
 * @param width
 * @text width
 * @desc The width. It will be adjusted to the screen width if it's at 0。
 * @default 0
 * @type number
 *
 * @param height
 * @text height
 * @desc The height. It will be adjusted to the screen width if it's at 0。
 * @default 0
 * @type number
 *
 * @param ColumnNumber
 * @text Number of columns
 * @desc The number of columns in the window。
 * @default 1
 * @type number
 * @min 1
 *
 * @param RowNumber
 * @text Number of rows
 * @desc The number of rows in the window。
 * @default 0
 * @type number
 *
 * @param ItemHeight
 * @text Item Height
 * @desc Height of each item. If you use 0, it will be used the default value of the window。
 * @default 0
 * @type number
 *
 * @param CommandList
 * @text Command List
 * @desc Specify directly the items to be displayed in the window and whether or not to display them. This is used when the items are defined at the beginning。
 * @type struct<Command>[]
 *
 * @param DataScript
 * @text Data Script
 * @desc Construct the items to be displayed in the window and whether or not they can be displayed from a script. Leave the command list empty first if you want to use it。
 *
 * @param ListWindowId
 * @parent DataScript
 * @text List Window ID
 * @desc In the case of a window that displays detailed information of another list of window, specify the ID of the list。
 * @default
 *
 * @param ListScript
 * @parent DataScript
 * @text Script list
 * @desc A script that returns a list of items. You can also select from presets. This script is not valid if "List Window Identifier" is specified。
 * @default
 * @type combo
 * @option null; // なし(単項目表示ウィンドウ用)
 * @option $gameParty.members(); // パーティメンバー
 * @option $gameParty.battleMembers(); // 戦闘メンバー
 * @option $gameParty.reserveMembers(); // リザーブメンバー
 * @option $gameParty.items(); // 所持消耗品
 * @option $gameParty.weapons(); // 所持武器
 * @option $gameParty.armors(); // 所持防具
 * @option $gameParty.equipItems(); // 所持装備品
 * @option $gameParty.allItems(); // 所持アイテム
 * @option [this._actor]; // メインメニューで選択したアクター
 * @option this._actor.weapons(); // メインメニューで選択したアクターの装備武器
 * @option $gameParty.members()[v(1)].weapons(); // 変数[1]のPTメンバーの装備武器
 * @option this._actor.armors(); // メインメニューで選択したアクターの装備防具
 * @option this._actor.equips(); // メインメニューで選択したアクターの装備品
 * @option this._actor.equipSlots(); // メインメニューで選択したアクターの装備スロットID
 * @option this._actor.skills(); // メインメニューで選択したアクターの所持スキル
 * @option this._actor.usableSkills(); // メインメニューで選択したアクターの使用可能スキル
 * @option this._actor.currentClass().learnings; //メインメニューで選択したアクターの職業の習得スキル
 * @option $dataActors.filter(data => !!data); // データベースのアクター
 * @option $dataClasses.filter(data => !!data); // データベースの職業
 * @option $dataSkills.filter(data => !!data); // データベースのスキル
 * @option $dataItems.filter(data => !!data); // データベースのアイテム
 * @option $dataWeapons.filter(data => !!data); // データベースの武器
 * @option $dataArmors.filter(data => !!data); // データベースの防具
 * @option $dataEnemies.filter(data => !!data); // データベースの敵キャラ
 * @option $dataTroops.filter(data => !!data); // データベースの敵グループ
 * @option $dataStates.filter(data => !!data); // データベースのステート
 * @option $dataItems.concat($dataWeapons, $dataArmors).filter(data => !!data); // アイテム、武器防具
 * @option $dataSystem.weaponTypes.filter((d, i) => i > 0); // 武器タイプ
 * @option $dataSystem.armorTypes.filter((d, i) => i > 0); // 防具タイプ
 * @option $dataSystem.skillTypes.filter((d, i) => i > 0); // スキルタイプ
 * @option $dataSystem.equipTypes.filter((d, i) => i > 0); // 装備タイプ
 * @option $dataSystem.elements.filter((d, i) => i > 0); // 属性
 * @option $dataSystem.switches; // スイッチ名
 * @option $dataSystem.variables; // 変数名
 * @option $dataSystem.params; // 能力値(用語)
 * @option $dataSystem.commands; // コマンド(用語)
 * @option $dataSystem.basic; // 基本ステータス(用語)
 *
 * @param FilterScript
 * @parent DataScript
 * @text Filter Script
 * @desc Set the display conditions for the list of items. Each element can be referenced from the variable [item]。
 * @default
 * @type combo
 * @option item.meta['value']; // メモ欄に<value>の記述がある
 * @option item.name.match('value'); // 名前にvalueを含む
 * @option item.id > v(10); // IDが変数[10]の値より大きい
 * @option s(parseInt(item.meta['value'])); // <value:n>のスイッチがON
 * @option item !== ''; // 空文字以外
 * @option !!item; // null, undefined, 0, 空文字以外
 * @option item.stypeId === v(10); // スキルタイプが変数[10]の値と等しい
 * @option item.etypeId === v(10); // 装備タイプが変数[10]の値と等しい
 * @option item.wtypeId === v(10); // 武器タイプが変数[10]の値と等しい
 * @option item.atypeId === v(10); // 防具タイプが変数[10]の値と等しい
 * @option item.itypeId === 1; // アイテムタイプが[通常アイテム]
 * @option this._actor.canEquip(item); // メインメニューで選択したアクターが装備可能
 * @option this._actor.canUse(item); // メインメニューで選択したアクターが使用可能
 *
 * @param MappingScript
 * @parent DataScript
 * @text Mapping script
 * @desc Converts an item in the list to another value. Each element can be referenced from the variable [item]. Specify it only if necessary.。
 * @type combo
 * @option item.actor(); // Game_ActorからデータベースのActorに変換
 * @option $dataSkills[item.skillId]; // 習得スキル情報をデータベースのSkillに変換
 * @option $dataSystem.equipTypes[item]; // 装備スロットIDを装備スロット名称に変換
 *
 * @param ItemDrawScript
 * @parent DataScript
 * @text Item Draw Script
 * @desc This is a script for drawing items. Each element can be referenced from the variable [item]. If omitted, it will be drawn by itself。
 * @default []
 * @type combo[]
 * @option this.drawIcon(item.iconIndex, r.x, r.y, r.width); // アイコン
 * @option this.drawFace(item.faceName(), item.faceIndex(), r.x, r.y); // フェイスグラフィック
 * @option this.drawCharacter(item.characterName(), item.characterIndex(), r.x, r.y); // キャラクター
 * @option this.drawActorCharacter(item, r.x + 24, r.y + 48); // アクターキャラクター
 * @option this.drawActorCharacter(this._actor, r.x, r.y); // メインメニューで選択したアクターキャラクター
 * @option this.drawActorFace(item, r.x, r.y); // アクターフェイス
 * @option this.drawActorName(item, r.x, r.y); // アクター名称
 * @option this.drawActorClass(item, r.x, r.y); // アクター職業
 * @option this.drawActorNickname(item, r.x, r.y); // アクターの二つ名
 * @option this.drawActorLevel(item, r.x, r.y); // アクターのレベル
 * @option this.drawActorIcons(item, r.x, r.y); // アクターのステートアイコン
 * @option this.drawActorSimpleStatus(item, r.x, r.y, r.width); // アクターのステータス
 * @option this.drawItemName(item, r.x, r.y, r.width); // アイテムやスキルの名称
 * @option this.drawText($gameParty.numItems(item), r.x, r.y, r.width, 'right'); // アイテムの所持数
 * @option this.drawTextEx(`Text:${item.name}`, r.x, r.y, r.width); // 任意のテキスト描画(制御文字変換あり)
 * @option this.drawText(`Text:${item.name}`, r.x, r.y, r.width, 'right'); // 任意のテキスト描画(制御文字変換なし。右揃え)
 * @option this.changeTextColor(ColorManager.textColor(1)); // テキストカラー変更(drawTextでのみ有効)
 * @option this.drawText(this.findWindowItem('window1').name, r.x, r.y, r.width); // 別ウィンドウで選択している項目名
 * @option this.drawNotePicture('noteValue', r.x, r.y); // 指定したメモ欄のピクチャを描画
 * @option this.placeActorName(item, r.x, r.y); // アクター名称(戦闘用)
 * @option this.placeStateIcon(item, r.x, r.y); // ステートアイコン(戦闘用)
 * @option this.placeGauge(item, 'hp', r.x, r.y); // HPゲージ(戦闘用)
 * @option this.placeBasicGauges(item, r.x, r.y); // ゲージセット(戦闘用)
 *
 * @param IsEnableScript
 * @parent DataScript
 * @text Selectable Script
 * @desc This is a script to determine if an item is selectable or not. Each element can be referenced from the variable [item].。
 * @default
 * @type combo
 * @option item.meta['value']; // メモ欄に<value>の記述がある
 * @option item.name.match('value'); // 名前にvalueを含む
 * @option item.id > v(10); // IDが変数[10]の値より大きい
 * @option s(parseInt(item.meta['value'])); // <value:n>のスイッチがON
 * @option item !== ''; // 空文字以外
 * @option !!item; // null, undefined, 0, 空文字以外
 * @option item.stypeId === v(10); // スキルタイプが変数[10]の値と等しい
 * @option item.etypeId === v(10); // 装備タイプが変数[10]の値と等しい
 * @option item.wtypeId === v(10); // 武器タイプが変数[10]の値と等しい
 * @option item.atypeId === v(10); // 防具タイプが変数[10]の値と等しい
 * @option item.itypeId === 1; // アイテムタイプが[通常アイテム]
 * @option this._actor.canEquip(item); // メインメニューで選択したアクターが装備可能
 * @option this._actor.canUse(item); // メインメニューで選択したアクターが使用可能
 *
 * @param CommonHelpText
 * @text Common Help Text
 * @desc This is the help text that will be displayed regardless of the selected item. Type "\n" to start a new line.。
 * @default
 * @type string
 *
 * @param DecisionEvent
 * @text Decision Event
 * @desc An event occurs the moment an item is chosen。
 * @default {}
 * @type struct<Event>
 *
 * @param CancelEvent
 * @text Cancel Event
 * @desc An event occurs the moment an item is canceled。
 * @default {}
 * @type struct<Event>
 *
 * @param CursorEvent
 * @text Cursor Event
 * @desc This event is trigerred at the moment the cursor moves. The focus of the window is not changed by this event。
 * @default {}
 * @type struct<Event>
 *
 * @param FontSize
 * @text Font Size
 * @desc Default font size. Using 0 means the same size as other windows will be used。
 * @default 0
 * @type number
 *
 * @param OverlapOther
 * @text Overlapping on another window
 * @desc Prevents masking of windows behind other windows when they're overlapped。
 * @default false
 * @type boolean
 *
 * @param WindowSkin
 * @text Window Skin
 * @desc Window skin. If not specified, the default will be used。
 * @default
 * @require 1
 * @dir img/system
 * @type file
 *
 * @param VisibleSwitchId
 * @text Visible when Switch ID is on
 * @desc Displayed on the screen only when the specified switch is on。
 * @default 0
 * @type switch
 *
 * @param ShowOpenAnimation
 * @text Open/Close Animation Display
 * @desc Display a window open/close animation。
 * @default true
 * @type boolean
 *
 * @param RefreshSwitchId
 * @text Redraw Switch
 * @desc When the specified switch is turned on, the window will be redrawn. After redrawing, the switch will be automatically turned off。
 * @default 0
 * @type switch
 *
 * @param IndexVariableId
 * @text Index Storage Variable
 * @desc A variable in which the cursor index is always stored。
 * @default 0
 * @type variable
 *
 * @param ItemVariableId
 * @text Variable containing the selected items
 * @desc This is the variable that always contains the currently selected item object. (Note that non-numeric objects are stored in this variable, so be careful when handling it.
 * A variable in which the cursor index is always stored。
 * @default 0
 * @type variable
 *
 * @param Cancelable
 * @text Cancelable
 * @desc If enabled, it will allow you to cancel the window。
 * @default true
 * @type boolean
 *
 * @param PopCancel
 * @text Scene Return Cancellation
 * @desc When enabled, if this is the first window, it will return to the previous Scene when the window is canceled。
 * @default true
 * @type boolean
 *
 * @param ActorChangeable
 * @text Actor Switching
 * @desc When enabled, PageUp and PageDown will allow switch actors。
 * @default false
 * @type boolean
 *
 * @param HiddenNoFocus
 * @text Hide while no focus
 * @desc If enabled, the window will be hidden when it does not have the focus。
 * @default false
 * @type boolean
 *
 * @param MaskingText
 * @text Masking Text
 * @desc When a command is hidden, it is masked with the specified string instead of disappearing. The help field will also be masked。
 * @default
 * @type string
 */

/*~struct~Command:
 *
 * @param Text
 * @text Item Description
 * @desc Draw a description of the item. You can use icons here。
 * @default value01
 * @type string
 *
 * @param VisibleSwitchId
 * @text Visible Switch ID
 * @desc What switch ID must be on to make this element visible。
 * @default 0
 * @type switch
 *
 * @param VisibleScript
 * @text Display Script
 * @desc It will be displayed on the screen only when the specified script is true. The variable [item] can be used to refer to the selected item of the "List Window Identifier"。
 * @default
 * @type combo
 * @option item.meta['value']; // メモ欄に<value>の記述がある
 * @option item.name.match('value'); // 名前にvalueを含む
 * @option item.id > v(10); // IDが変数[10]の値より大きい
 * @option s(parseInt(item.meta['value'])); // <value:n>のスイッチがON
 * @option item !== ''; // 空文字以外
 * @option !!item; // null, undefined, 0, 空文字以外
 * @option item.stypeId === v(10); // スキルタイプが変数[10]の値と等しい
 * @option item.etypeId === v(10); // 装備タイプが変数[10]の値と等しい
 * @option item.wtypeId === v(10); // 武器タイプが変数[10]の値と等しい
 * @option item.atypeId === v(10); // 防具タイプが変数[10]の値と等しい
 * @option item.itypeId === 1; // アイテムタイプが[通常アイテム]
 * @option this._actor.canEquip(item); // メインメニューで選択したアクターが装備可能
 * @option this._actor.canUse(item); // メインメニューで選択したアクターが使用可能
 *
 * @param EnableSwitchId
 * @text Enable Switch ID
 * @desc Can be selected only when the specified switch is ON, otherwise selection is disabled。
 * @default 0
 * @type switch
 *
 * @param IsEnableScript
 * @text Selectable Script
 * @desc This is a script to determine whether an item can be selected or not. The variable [item] can refer to the selected item of the "List Window Identifier"。
 * @default
 * @type combo
 * @option item.meta['value']; // メモ欄に<value>の記述がある
 * @option item.name.match('value'); // 名前にvalueを含む
 * @option item.id > v(10); // IDが変数[10]の値より大きい
 * @option s(parseInt(item.meta['value'])); // <value:n>のスイッチがON
 * @option item !== ''; // 空文字以外
 * @option !!item; // null, undefined, 0, 空文字以外
 * @option item.stypeId === v(10); // スキルタイプが変数[10]の値と等しい
 * @option item.etypeId === v(10); // 装備タイプが変数[10]の値と等しい
 * @option item.wtypeId === v(10); // 武器タイプが変数[10]の値と等しい
 * @option item.atypeId === v(10); // 防具タイプが変数[10]の値と等しい
 * @option item.itypeId === 1; // アイテムタイプが[通常アイテム]
 * @option this._actor.canEquip(item); // メインメニューで選択したアクターが装備可能
 * @option this._actor.canUse(item); // メインメニューで選択したアクターが使用可能
 *
 * @param HelpText
 * @text Help Text
 * @desc If you are viewing the help window, the help text will be displayed. If you want to start a new line, type \n。
 * @default
 * @type string
 *
 * @param CancelChoice
 * @text Cancel Choice
 * @desc The event that occurs when this item is selected will be the cancel event。
 * @default false
 * @type boolean
 */

/*~struct~Event:
 *
 * @param CommandId
 * @text Common Event ID
 * @desc This is a common event that will be executed when the target event occurs. However, it will not be executed when leaving the scene.。
 * @default 0
 * @type common_event
 *
 * @param FocusWindowId
 * @text Focus Window ID
 * @desc The window identifier that will be focused when the target event occurs. If not specified, it will return to the previous window.。
 * @default
 * @type string
 *
 * @param FocusWindowIndex
 * @text Focus Window Index
 * @desc The cursor index of the window that will be the focus when the target event occurs. -If 1 is specified, no operation will be performed.。
 * @default -1
 * @type number
 * @min -1
 *
 * @param Script
 * @text Script
 * @desc The script that will be executed when the target event occurs。
 * @default
 * @type combo
 * @option SceneManager.callCustomMenu('Scene___'); // 別のカスタムメニューに移動
 * @option this.popScene(); // 元のSceneに戻る
 * @option SceneManager.goto(Scene_Map); // マップ画面に遷移
 * @option SceneManager.changeWindowFocus('window1'); // 指定ウィンドウにフォーカス
 * @option SceneManager.changeWindowIndex('window1', 1); // 指定ウィンドウのインデックス変更
 * @option SceneManager.trashScene(); // 元のScene情報を破棄する
 * @option SceneManager.showMapPicture(1, '', 0, 0, 0, 100, 100, 255, 1); // マップ画面にピクチャを表示
 *
 * @param SwitchId
 * @text Switch ID
 * @desc A switch that turns ON when the target event occurs。
 * @type switch
 *
 * @param Deselect
 * @text Deselect Source Window
 * @desc Deselects the window that was originally the focus when the target event occurred。
 * @default false
 * @type boolean
 */

(() => {
    'use strict';
    const script = document.currentScript;
    const param = PluginManagerEx.createParameter(script);

    param.SceneList = [];
    for (let i = 1; i < 21; i++) {
        if (param[`Scene${i}`]) {
            param.SceneList.push(param[`Scene${i}`]);
        }
    }

    PluginManagerEx.registerCommand(script, 'CALL_SCENE', args => {
        SceneManager.callCustomMenu(args.id);
    });

    const outputError = function (e, script = null) {
        SoundManager.playBuzzer();
        if (script) {
            console.error(`Script Error:${script}`);
        }
        console.error(e);
        if (Utils.isNwjs()) {
            nw.Window.get().showDevTools();
        }
    };

    const _Scene_Battle_start = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function() {
        if (SceneManager.isCalledCustomMenuFromBattle()) {
            SceneManager.resetCalledCustomMenuFromBattle();
            Scene_Base.prototype.start.call(this);
        } else {
            _Scene_Battle_start.apply(this);
        }
    };

    const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() {
        if (SceneManager.isCalledCustomMenuFromBattle()) {
            Scene_Base.prototype.terminate.call(this);
        } else {
            _Scene_Battle_terminate.apply(this, arguments);
        }
    };

    const _Scene_Battle_stop = Scene_Battle.prototype.stop;
    Scene_Battle.prototype.stop = function() {
        if (SceneManager.isCalledCustomMenuFromBattle()) {
            Scene_Base.prototype.stop.call(this);
        } else {
            _Scene_Battle_stop.apply(this, arguments);
        }
    };

    const _Sprite_Actor_initMembers = Sprite_Actor.prototype.initMembers;
    Sprite_Actor.prototype.initMembers = function() {
        _Sprite_Actor_initMembers.apply(this, arguments);
        if (SceneManager.isCalledCustomMenuFromBattle()) {
            this._alreadyEntry = true;
        }
    }

    const _Sprite_Actor_startEntryMotion = Sprite_Actor.prototype.startEntryMotion;
    Sprite_Actor.prototype.startEntryMotion = function() {
        if (this._alreadyEntry) {
            this.startMove(0, 0, 0);
            this._alreadyEntry = false;
        } else {
            _Sprite_Actor_startEntryMotion.apply(this, arguments);
        }
    };

    SceneManager.callCustomMenu = function (sceneId) {
        if (!this.findSceneData(sceneId)) {
            throw new Error(`Scene data '${sceneId}' is not found`);
        }
        if (this._scene instanceof Scene_Battle) {
            this._callCustomMenuFromBattle = true;
        }
        this.push(this.createCustomMenuClass(sceneId));
    };

    SceneManager.isCalledCustomMenuFromBattle = function() {
        return this._callCustomMenuFromBattle;
    };

    SceneManager.resetCalledCustomMenuFromBattle = function() {
        this._callCustomMenuFromBattle = false;
    };

    const _SceneManager_goto = SceneManager.goto;
    SceneManager.goto = function (sceneClass) {
        if (this._scene instanceof Scene_Map) {
            this._mapGameScreen = $gameScreen;
        }
        _SceneManager_goto.apply(this, arguments);
    };

    SceneManager.showMapPicture = function (pictureId, name, origin, x, y,
                                            scaleX, scaleY, opacity, blendMode) {
        if (this._mapGameScreen) {
            this._mapGameScreen.showPicture(pictureId, name, origin, x, y,
                scaleX, scaleY, opacity, blendMode);
        }
    };

    SceneManager.createCustomMenuClass = function (sceneId) {
        let sceneClass = {};
        const createClassEval = `sceneClass = function ${sceneId}(){\n this.initialize.apply(this, arguments)};`;
        eval(createClassEval);
        sceneClass.prototype = Object.create(Scene_CustomMenu.prototype);
        sceneClass.prototype.constructor = sceneClass;
        return sceneClass;
    };

    SceneManager.trashScene = function () {
        if (this._stack.length > 1) {
            this._stack.pop()
        }
    };

    SceneManager.findSceneData = function (sceneId) {
        return param.SceneList.filter(data => data.Id === sceneId)[0];
    };

    const _SceneManager_pop = SceneManager.pop;
    SceneManager.pop = function () {
        _SceneManager_pop.apply(this, arguments);
        this._sceneIndex = 0;
    };

    SceneManager.changeWindowFocus = function (windowId) {
        this._focusWindowId = windowId;
    };

    SceneManager.changeWindowIndex = function (windowId, index) {
        const win = this.findCustomMenuWindow(windowId);
        if (win) {
            win.select(index);
        }
    };

    SceneManager.findChangeWindowFocus = function () {
        const id = this._focusWindowId;
        if (id) {
            this._focusWindowId = null;
        }
        return id;
    };

    SceneManager.findCustomMenuWindow = function (windowId) {
        return this._scene.findWindow ? this._scene.findWindow(windowId) : null;
    };

    Game_Party.prototype.reserveMembers = function () {
        const battleMembers = this.battleMembers();
        return this.members().filter(function (actor) {
            return !battleMembers.contains(actor);
        });
    };

    class Scene_CustomMenu extends Scene_MenuBase {
        create() {
            // super.createのneedsPageButtonsで参照できるように、this._customDataの取得を一番上にする
            this._customData = SceneManager.findSceneData(PluginManagerEx.findClassName(this));
            super.create();
            this.swapGameScreen();
            this._interpreter = new Game_Interpreter();
            this.createAllObjects();
        }

        start() {
            super.start();
            this.refresh();
            this.fireEvent(this._customData.InitialEvent);
        }

        terminate() {
            super.terminate();
            this.restoreGameScreen();
        }

        stop() {
            super.stop();
            if (SceneManager.isNextScene(Scene_Battle) &&
                !SceneManager.isPreviousScene(Scene_Battle)) {
                this.launchBattle();
            }
        }

        swapGameScreen() {
            this._previousGameScreen = $gameScreen;
            window.$gameScreen = new Game_Screen();
        }

        restoreGameScreen() {
            window.$gameScreen = this._previousGameScreen;
        }

        needsPageButtons() {
            // ウィンドウのアクター切り替えを有効にしている場合に、マウスやタッチでも操作可能にするために
            // プラグインパラメータUsePageButtonsがオンの場合ページボタンを作成する
            return this._customData.UsePageButtons;
        }

        createBackground() {
            super.createBackground();
            this._panorama = new TilingSprite();
            this._panorama.move(0, 0, Graphics.width, Graphics.height);
            this.addChild(this._panorama);
        }

        createAllObjects() {
            if (this._customData.UseHelp) {
                this.createHelpWindow();
            }
            this.createCustomMenuWindowList();
            this.createAllMessageWindow();
            this.createSpriteset();
            if (this._customData.Panorama) {
                this.setPanoramaBitmap();
            }
        }

        createCustomMenuWindowList() {
            this._customWindowMap = new Map();
            const list = this._customData.WindowList;
            list.forEach(windowData => this.createCustomMenuWindow(windowData));
            this.refresh();
            list.forEach(windowData => this.setPlacement(windowData));
        }

        refresh() {
            this._customWindowMap.forEach(win => win.refresh());
        }

        createCustomMenuWindow(data) {
            const win = this.createCustomWindowInstance(data);
            win.setHandler('ok', () => this.fireEvent(win.findDecisionEvent()));
            if (this._helpWindow) {
                win.setHelpWindow(this._helpWindow);
            }
            if (data.Cancelable) {
                win.setHandler('cancel', () => {
                    const prevActive = this._activeWindowId;
                    this.fireEvent(data.CancelEvent);
                    if (data.Id === this.findFirstWindowId() && prevActive === this._activeWindowId) {
                        // ウィンドウが一番上にあり、かつキャンセルボタンにpopSceneが設定されている場合二重に戻ってしまう
                        // プラグインパラメータPopCancelをオフにすることで無効化できるようにする
                        if (data.PopCancel === undefined || data.PopCancel) {
                            this.popScene();
                        }
                    }
                    win.select(-1);
                });
            }
            if (data.CursorEvent) {
                win.setHandler('select', () => {
                    this.fireEvent(data.CursorEvent, false);
                });
            }
            if (data.ActorChangeable) {
                win.setHandler('pagedown', this.nextActor.bind(this));
                win.setHandler('pageup', this.previousActor.bind(this));
            }
            this.addWindow(win);
            this._customWindowMap.set(data.Id, win);
        }

        setPanoramaBitmap() {
            const panorama = this._customData.Panorama;
            this._panorama.bitmap = ImageManager.loadParallax(panorama.Image);
        }

        setPlacement(data) {
            const win = this.findWindow(data.Id);
            const parentX = this.findWindow(data.RelativeWindowIdX);
            if (parentX) {
                win.x += parentX.x + parentX.width;
                if (!data.width) {
                    win.width = Graphics.boxWidth - win.x;
                }
            }
            const parentY = this.findWindow(data.RelativeWindowIdY);
            if (parentY) {
                win.y += parentY.y + parentY.height;
            } else {
                win.y += this.mainAreaTop();
            }
        }

        createCustomWindowInstance(data) {
            if (data.CommandList && data.CommandList.length > 0) {
                return new Window_CustomMenuCommand(data, this._actor, this._customWindowMap);
            } else {
                return new Window_CustomMenuDataList(data, this._actor, this._customWindowMap);
            }
        }

        findFirstWindowId() {
            const event = this._customData.InitialEvent;
            if (event && event.FocusWindowId) {
                return event.FocusWindowId;
            }
            const windowList = this._customData.WindowList;
            if (windowList && windowList.length > 0) {
                return windowList[0].Id;
            }
            return null;
        }

        findWindow(id) {
            return this._customWindowMap.get(id);
        }

        update() {
            super.update();
            if (this._interpreter.isRunning()) {
                this.updateInterpreter();
            }
            const focusId = SceneManager.findChangeWindowFocus();
            if (focusId) {
                this.changeWindowFocus(focusId, -1);
            }
            if (this._customData.Panorama) {
                this.updatePanorama();
            }
            this.refreshWindowIfNeed();
        }

        updatePanorama() {
            const panorama = this._customData.Panorama;
            this._panorama.origin.x += panorama.ScrollX;
            this._panorama.origin.y += panorama.ScrollY;
        }

        refreshWindowIfNeed() {
            this._customWindowMap.forEach(win => {
                win.refreshIfNeed();
            });
            this._customWindowMap.forEach(win => {
                win.resetRefreshSwitch();
            });
        };

        fireEvent(event, moveWindowFocus = true) {
            if (event.SwitchId) {
                $gameSwitches.setValue(event.SwitchId, true);
            }
            if (event.Script) {
                try {
                    eval(event.Script);
                } catch (e) {
                    outputError(e, event.Script);
                }
            }
            if (!this._active) {
                return;
            }
            if (moveWindowFocus) {
                if (event.FocusWindowId) {
                    this.changeWindowFocus(event.FocusWindowId, event.FocusWindowIndex);
                } else if (this._previousActiveWindowId && this._activeWindowId !== this.findFirstWindowId()) {
                    this.changeWindowFocus(this._previousActiveWindowId, -1);
                } else {
                    this.changeWindowFocus(this._activeWindowId || this.findFirstWindowId(), -1);
                }
                if (event.Deselect) {
                    const previousWindow = this._customWindowMap.get(this._previousActiveWindowId);
                    previousWindow.deselect();
                }
            }
            if (event.CommandId) {
                this.setupMenuCommonEvent(event.CommandId);
            }
        }

        changeWindowFocus(windowId, index) {
            if (this._activeWindowId !== windowId) {
                this._previousActiveWindowId = this._activeWindowId;
            }
            this._activeWindowId = windowId;
            this._customWindowMap.forEach((win, id) => {
                if (id === windowId) {
                    win.activate();
                    if (index !== -1) {
                        win.select(index || 0);
                    }
                } else {
                    win.deactivate();
                }
            });
        }

        setupMenuCommonEvent(commonEventId) {
            const common = $dataCommonEvents[commonEventId];
            if (!common) {
                return;
            }
            this._interpreter.setup(common.list, 0);
            this.blurAllWindow();
        }

        updateInterpreter() {
            this._interpreter.update();
            if (!this._interpreter.isRunning()) {
                this.changeWindowFocus(this._activeWindowId, -1);
                this._interpreter.terminate();
            }
        }

        blurAllWindow() {
            this._customWindowMap.forEach(win => {
                win.deactivate();
            });
        }

        // 競合したら直す
        createAllMessageWindow() {
            Scene_Message.prototype.createMessageWindow.call(this);
            Scene_Message.prototype.createScrollTextWindow.call(this);
            Scene_Message.prototype.createGoldWindow.call(this);
            Scene_Message.prototype.createNameBoxWindow.call(this);
            Scene_Message.prototype.createChoiceListWindow.call(this);
            Scene_Message.prototype.createNumberInputWindow.call(this);
            Scene_Message.prototype.createEventItemWindow.call(this);
            Scene_Message.prototype.associateWindows.call(this);
        }

        messageWindowRect() {
            return Scene_Message.prototype.messageWindowRect.call(this);
        }

        scrollTextWindowRect() {
            return Scene_Message.prototype.scrollTextWindowRect.call(this);
        }

        goldWindowRect() {
            return Scene_Message.prototype.goldWindowRect.call(this);
        }

        eventItemWindowRect() {
            return Scene_Message.prototype.eventItemWindowRect.call(this);
        }

        createSpriteset() {
            this._spriteset = new Spriteset_Menu();
            this.addChild(this._spriteset);
        }

        refreshActor() {
            this._customWindowMap.forEach(win => {
                win.setActor(this._actor);
            });
        }

        onActorChange() {
            this.refreshActor();
            this.changeWindowFocus(this._activeWindowId, -1);
            // アクター切り替え時にカーソルSEを演奏する
            super.onActorChange();
        }

        launchBattle() {
            BattleManager.saveBgmAndBgs();
            this.stopAudioOnBattleStart();
            SoundManager.playBattleStart();
        }

        stopAudioOnBattleStart() {
            Scene_Map.prototype.stopAudioOnBattleStart.apply(this, arguments);
        }

        helpAreaHeight() {
            const rows = this._customData.HelpRows;
            if (rows) {
                return this.calcWindowHeight(rows, false);
            } else {
                return super.helpAreaHeight();
            }
        }
    }

    const _Window_StatusBase_initialize = Window_StatusBase.prototype.initialize;
    Window_StatusBase.prototype.initialize = function (rect, data) {
        if (data) {
            this._data = data;
            this._list = [];
        }
        _Window_StatusBase_initialize.apply(this, arguments);
    };

    class Window_CustomMenu extends Window_StatusBase {
        constructor(data, actor, windowMap) {
            super(new Rectangle(data.x, data.y, data.width || Graphics.boxWidth - data.x, data.height),
                data);
            this._actor = actor;
            this._windowMap = windowMap;
            if (data.OverlapOther) {
                this._isWindow = false;
            }
            if (this.isShowOpen() || !this.isValid()) {
                this.openness = 0;
            }
            if (this.height === 0) {
                this._dynamicHeight = true;
            }
        }

        update() {
            this.updateOpenClose();
            super.update();
            this.updateIndexVariable();
        }

        select(index) {
            const prevIndex = this._index;
            super.select(index);
            if (prevIndex >= 0 && index >= 0 && index !== prevIndex) {
                this.callHandler('select');
            }
            if (this._windowMap) {
                this.refreshDetailWindow();
            }
        }

        refreshDetailWindow() {
            this._windowMap.forEach(win => {
                if (win.isDetailWindow(this._data.Id)) {
                    win.refresh();
                }
            })
        }

        calcTextHeight(textState) {
            const height = super.calcTextHeight(textState);
            return height + $gameSystem.mainFontSize() - this.contents.fontSize;
        }

        updateOpenClose() {
            if (this.isValid()) {
                if (this.isShowOpen()) {
                    this.open();
                } else {
                    this.openness = 255;
                }
            } else {
                if (this.isShowOpen()) {
                    this.close();
                } else {
                    this.openness = 0;
                }
            }
        }

        updateIndexVariable() {
            if (this._data.IndexVariableId) {
                $gameVariables.setValue(this._data.IndexVariableId, this._index);
            }
            if (this._data.ItemVariableId) {
                $gameVariables.setValue(this._data.ItemVariableId, this.getItem(this._index));
            }
        }

        refreshIfNeed() {
            const switchId = this._data.RefreshSwitchId;
            if (!switchId) {
                return;
            }
            if ($gameSwitches.value(switchId)) {
                this.refresh();
            }
        }

        resetRefreshSwitch() {
            const switchId = this._data.RefreshSwitchId;
            if (switchId) {
                $gameSwitches.setValue(switchId, false);
            }
        }

        isShowOpen() {
            return this._data.ShowOpenAnimation;
        }

        lineHeight() {
            const fontSize = this._data.FontSize;
            return fontSize ? this._data.FontSize + 8 : super.lineHeight();
        }

        itemHeight() {
            return this._data.ItemHeight || super.itemHeight();
        }

        numVisibleRows() {
            return this._data.RowNumber || Math.ceil(this.maxItems() / this.maxCols());
        }

        resetFontSettings() {
            super.resetFontSettings();
            if (this._data.FontSize) {
                this.contents.fontSize = this._data.FontSize;
            }
        };

        isValid() {
            if (this._data.HiddenNoFocus && !this.active) {
                return false;
            }
            return !this._data.VisibleSwitchId || $gameSwitches.value(this._data.VisibleSwitchId);
        }

        isDetailWindow(listWindowId) {
            return this._data.ListWindowId === listWindowId;
        }

        maxCols() {
            return this._data.ColumnNumber || super.maxCols();
        }

        refresh() {
            this._list = this.makeCommandList();
            if (this._dynamicHeight) {
                this.setDynamicHeight();
            }
            super.refresh();
            if (this._data.WindowSkin) {
                this.windowskin = ImageManager.loadSystem(this._data.WindowSkin);
            }
        }

        findMetaData(index) {
            const item = this.getItem(index);
            if (!item) {
                return null;
            }
            if (item.meta) {
                return item.meta;
            } else if (item.actor && item.actor().meta) {
                return item.actor().meta;
            }
            return null;
        }

        drawNotePicture(metaValue, x, y) {
            const meta = this.findMetaData(this._drawingIndex);
            if (!meta) {
                return;
            }
            const fileName = meta[metaValue];
            if (fileName) {
                this.drawPicture(fileName, x, y);
            }
        };

        drawPicture(file, x, y) {
            const bitmap = ImageManager.loadPicture(file);
            if (bitmap.isReady()) {
                this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y);
            } else {
                this.retryDrawItem(bitmap);
            }
        }

        setDynamicHeight() {
            this.height = this.fittingHeight(this.numVisibleRows());
            this.createContents();
        }

        fittingHeight(numLines) {
            return numLines * this.itemHeight() + this.padding * 2;
        }

        makeCommandList() {
        }

        maxItems() {
            return this._list.length;
        }

        drawItem(index) {
            this._drawingIndex = index;
            const item = this.getItem(index);
            const rect = this.findItemRect(index);
            this.changePaintOpacity(this.isEnabled(index));
            if (this.isMasking(index)) {
                this.drawMasking(rect);
            } else {
                this.drawItemSub(item, rect, index);
            }
            this.changePaintOpacity(1);
        }

        findItemRect(index) {
            const rect = this.itemRectWithPadding(index);
            rect.y += this.rowSpacing() / 2;
            return rect;
        }

        drawItemSub(item, rect, index) {
        };

        retryDrawItem(bitmap) {
            const index = this.index();
            bitmap.addLoadListener(() => {
                if (index === this.index()) {
                    this.drawItem(this._drawingIndex);
                }
            });
        }

        drawMasking(rect) {
            this.drawTextEx(this._data.MaskingText, rect.x, rect.y);
        }

        updateHelp() {
            let text = this.findHelpText() || '';
            if (this.isMasking(this.index())) {
                text = this._data.MaskingText;
            }
            this._helpWindow.setText(text.replace(/\\n/g, '\n'));
        }

        findHelpText() {
            return this._data.CommonHelpText;
        }

        findDecisionEvent() {
            return this._data.DecisionEvent;
        }

        findCurrentItem() {
            return this.getItem(this.index());
        }

        findWindowItem(windowId) {
            const win = this._windowMap.get(windowId);
            if (!win) {
                throw new Error(`Window [${windowId}] is not found.`);
            }
            return win.findCurrentItem();
        }

        findListWindowItem() {
            const listWindowId = this._data.ListWindowId;
            return listWindowId ? this.findWindowItem(listWindowId) : null;
        }

        getItem(index) {
            if (index === undefined) {
                index = this.index();
            }
            return this._list[index];
        }

        isCurrentItemEnabled() {
            return this.isEnabled(this.index());
        }

        isEnabled(index) {
            const item = this.getItem(index);
            return item ? this.isEnabledSub(item) && !this.isMasking(index) : false;
        }

        isMasking(index) {
            const item = this.getItem(index);
            const v = $gameVariables.value.bind($gameVariables); // used by eval
            const s = $gameSwitches.value.bind($gameSwitches); // used by eval
            return this.isUseMasking() && !this.isVisible(item, v, s);
        }

        isVisible(item, v, s) {
            return true;
        }

        isEnabledSub(item) {
        };

        activate() {
            if (this._index < 0) {
                this.select(0);
            }
            super.activate();
        }

        isUseMasking() {
            return !!this._data.MaskingText;
        }

        setActor(actor) {
        }

        drawItemBackground(index) {
            if (!this._data.ListWindowId && this._list[0] !== ' ') {
                super.drawItemBackground(index);
            }
        }
    }

    class Window_CustomMenuCommand extends Window_CustomMenu {
        makeCommandList() {
            const list = this._data.CommandList;
            return this.isUseMasking() ? list : list.filter(data => this.isVisible(data));
        }

        isVisible(item) {
            return this.isScriptValid(item.VisibleScript) && this.isSwitchValid(item.VisibleSwitchId);
        }

        drawItemSub(item, rect, index) {
            this.drawTextEx(item.Text, rect.x, rect.y, rect.width);
        }

        findItemRect(index) {
            return this.itemLineRect(index);
        }

        findHelpText() {
            const item = this.getItem();
            return item && item.HelpText ? item.HelpText : super.findHelpText();
        }

        isEnabledSub(item) {
            return this.isScriptValid(item.IsEnableScript) && this.isSwitchValid(item.EnableSwitchId);
        }

        isSwitchValid(id) {
            return !id || $gameSwitches.value(id);
        }

        isScriptValid(script) {
            if (script === '' || script === undefined) {
                return true;
            }
            const v = $gameVariables.value.bind($gameVariables); // used by eval
            const s = $gameSwitches.value.bind($gameSwitches); // used by eval
            const item = this.findListWindowItem(); // used by eval
            if (item === undefined) {
                return false;
            }
            try {
                return eval(script);
            } catch (e) {
                outputError(e, script);
                return true;
            }
        }

        findDecisionEvent() {
            const item = this.getItem();
            if (item && item.CancelChoice) {
                return this._data.CancelEvent;
            } else {
                return super.findDecisionEvent();
            }
        }
    }

    class Window_CustomMenuDataList extends Window_CustomMenu {
        makeCommandList() {
            if (this._data.ListWindowId) {
                const data = this.findListWindowItem();
                return data ? [data] : [];
            }
            const v = $gameVariables.value.bind($gameVariables); // used by eval
            const s = $gameSwitches.value.bind($gameSwitches); // used by eval
            let list;
            try {
                list = eval(this._data.ListScript);
            } catch (e) {
                outputError(e, this._data.ListScript);
                list = [];
            }
            if (!Array.isArray(list)) {
                list = list ? [list] : [' '];
            }
            if (this._data.FilterScript && !this.isUseMasking()) {
                list = list.filter(item => this.isVisible(item, v, s));
            }
            if (this._data.MappingScript) {
                list = list.map(item => {
                    try {
                        return eval(this._data.MappingScript)
                    } catch (e) {
                        outputError(e, this._data.MappingScript);
                        return null;
                    }
                });
            }
            return list;
        }

        isVisible(item, v, s) {
            try {
                return eval(this._data.FilterScript)
            } catch (e) {
                outputError(e, this._data.FilterScript);
                return false;
            }
        }

        drawItemSub(item, r, index) {
            const scriptList = this._data.ItemDrawScript;
            if (scriptList && scriptList.length > 0) {
                scriptList.forEach(script => {
                    try {
                        eval(script)
                    } catch (e) {
                        outputError(e, script);
                    }
                });
            } else if (item === String(item)) {
                this.drawTextEx(item, r.x, r.y);
            } else if (item.hasOwnProperty('iconIndex')) {
                this.drawItemName(item, r.x, r.y, r.width);
            } else if (item instanceof Game_Actor) {
                this.drawActorName(item, r.x, r.y, r.width);
            } else if (item.hasOwnProperty('name')) {
                this.drawTextEx(item.name, r.x, r.y);
            } else {
                this.drawTextEx(item.toString(), r.x, r.y);
                console.warn(item);
            }
        }

        findHelpText() {
            const item = this.getItem();
            return item && item.description ? item.description : super.findHelpText();
        }

        isEnabledSub(item) {
            const v = $gameVariables.value.bind($gameVariables); // used by eval
            const s = $gameSwitches.value.bind($gameSwitches); // used by eval
            const script = this._data.IsEnableScript;
            try {
                return script ? eval(script) : true;
            } catch (e) {
                outputError(e, script);
                return false;
            }

        }

        setActor(actor) {
            if (this._actor !== actor) {
                this._actor = actor;
                this.refresh();
            }
        }

        drawFace(faceName, faceIndex, x, y, width, height) {
            const bitmap = ImageManager.loadFace(faceName);
            if (bitmap.isReady()) {
                super.drawFace(faceName, faceIndex, x, y, width, height);
            } else {
                this.retryDrawItem(bitmap);
            }
        }

        drawCharacter(characterName, characterIndex, x, y) {
            const bitmap = ImageManager.loadCharacter(characterName);
            if (bitmap.isReady()) {
                super.drawCharacter(characterName, characterIndex, x, y);
            } else {
                this.retryDrawItem(bitmap);
            }
        }
    }

    class Spriteset_Menu extends Spriteset_Base {
        createBaseSprite() {
            super.createBaseSprite();
            this._blackScreen.opacity = 0;
        }

        createToneChanger() {
        };

        updateToneChanger() {
        };
    }
})();
