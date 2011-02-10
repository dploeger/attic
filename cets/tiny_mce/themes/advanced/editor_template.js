// Import theme specific language pack
tinyMCE.importThemeLanguagePack();

var TinyMCE_advanced_autoImportCSSClasses = true;
var TinyMCE_advanced_foreColor = "#000000";

function TinyMCE_advanced_getButtonHTML(button_name) {
	switch (button_name) {
		case "bold":
			return '<img id="{$editor_id}_bold" src="{$themeurl}/images/{$lang_bold_img}" title="{$lang_bold_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'Bold\')">';

		case "italic":
			return '<img id="{$editor_id}_italic" src="{$themeurl}/images/{$lang_italic_img}" title="{$lang_italic_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'Italic\')">';

		case "underline":
			return '<img id="{$editor_id}_underline" src="{$themeurl}/images/underline.gif" title="{$lang_underline_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'Underline\')">';

		case "strikethrough":
			return '<img id="{$editor_id}_strikethrough" src="{$themeurl}/images/strikethrough.gif" title="{$lang_striketrough_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'Strikethrough\')">';

		case "justifyleft":
			return '<img id="{$editor_id}_left" src="{$themeurl}/images/left.gif" title="{$lang_justifyleft_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'JustifyLeft\')">';

		case "justifycenter":
			return '<img id="{$editor_id}_center" src="{$themeurl}/images/center.gif" title="{$lang_justifycenter_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'JustifyCenter\')">';

		case "justifyright":
			return '<img id="{$editor_id}_right" src="{$themeurl}/images/right.gif" title="{$lang_justifyright_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'JustifyRight\')">';

		case "justifyfull":
			return '<img id="{$editor_id}_full" src="{$themeurl}/images/full.gif" title="{$lang_justifyfull_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'JustifyFull\')">';

		case "styleselect":
			return '<select id="{$editor_id}_styleSelect" onmousedown="TinyMCE_advanced_setupCSSClasses(\'{$editor_id}\');" name="{$editor_id}_styleSelect" onchange="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'mceSetCSSClass\',false,this.options[this.selectedIndex].value);" class="mceSelectList">{$style_select_options}</select>';

		case "bullist":
			return '<img id="{$editor_id}_bullist" src="{$themeurl}/images/bullist.gif" title="{$lang_bullist_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'InsertUnorderedList\')">';

		case "numlist":
			return '<img id="{$editor_id}_numlist" src="{$themeurl}/images/numlist.gif" title="{$lang_numlist_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'InsertOrderedList\')">';

		case "outdent":
			return '<img id="{$editor_id}_outdent" src="{$themeurl}/images/outdent.gif" title="{$lang_outdent_desc}" width="20" height="20" class="mceButtonDisabled" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'Outdent\')">';

		case "indent":
			return '<img src="{$themeurl}/images/indent.gif" title="{$lang_indent_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'Indent\')">';

		case "undo":
			return '<img id="{$editor_id}_undo" src="{$themeurl}/images/undo.gif" title="{$lang_undo_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'Undo\')">';

		case "redo":
			return '<img id="{$editor_id}_redo" src="{$themeurl}/images/redo.gif" title="{$lang_redo_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'Redo\')">';

		case "link":
			return '<img id="{$editor_id}_link" src="{$themeurl}/images/link.gif" title="{$lang_link_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'mceLink\', true)">';

		case "unlink":
			return '<img src="{$themeurl}/images/unlink.gif" title="{$lang_unlink_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'unlink\')">';

		case "image":
			return '<img id="{$editor_id}_image" src="{$themeurl}/images/image.gif" title="{$lang_image_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'mceImage\', true)">';

		case "cleanup":
			return '<img src="{$themeurl}/images/cleanup.gif" title="{$lang_cleanup_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'mceCleanup\')">';

		case "help":
			return '<img src="{$themeurl}/images/help.gif" title="{$lang_help_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'mceHelp\')">';

		case "code":
			return '<img id="{$editor_id}_code" src="{$themeurl}/images/code.gif" title="{$lang_theme_code_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="TinyMCE_advanced_openHTMLSourceEditor(\'{$editor_id}\');">';

		case "table":
			return '<img id="{$editor_id}_table" src="{$themeurl}/images/table.gif" title="{$lang_theme_table_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'mceInsertTable\',true);">';

		case "row_before":
			return '<img id="{$editor_id}_table_insert_row_before" src="{$themeurl}/images/table_insert_row_before.gif" title="{$lang_theme_table_insert_row_before_desc}" width="20" height="20" class="mceButtonDisabled" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'mceTableInsertRowBefore\');">';

		case "row_after":
			return '<img id="{$editor_id}_table_insert_row_after" src="{$themeurl}/images/table_insert_row_after.gif" title="{$lang_theme_table_insert_row_after_desc}" width="20" height="20" class="mceButtonDisabled" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'mceTableInsertRowAfter\');">';

		case "delete_row":
			return '<img id="{$editor_id}_table_delete_row" src="{$themeurl}/images/table_delete_row.gif" title="{$lang_theme_table_delete_row_desc}" width="20" height="20" class="mceButtonDisabled" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'mceTableDeleteRow\');">';

		case "col_before":
			return '<img id="{$editor_id}_table_insert_col_before" src="{$themeurl}/images/table_insert_col_before.gif" title="{$lang_theme_table_insert_col_before_desc}" width="20" height="20" class="mceButtonDisabled" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'mceTableInsertColBefore\');">';

		case "col_after":
			return '<img id="{$editor_id}_table_insert_col_after" src="{$themeurl}/images/table_insert_col_after.gif" title="{$lang_theme_table_insert_col_after_desc}" width="20" height="20" class="mceButtonDisabled" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'mceTableInsertColAfter\');">';

		case "delete_col":
			return '<img id="{$editor_id}_table_delete_col" src="{$themeurl}/images/table_delete_col.gif" title="{$lang_theme_table_delete_col_desc}" width="20" height="20" class="mceButtonDisabled" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'mceTableDeleteCol\');">';

		case "hr":
			return '<img id="{$editor_id}_hr" src="{$themeurl}/images/hr.gif" title="{$lang_theme_hr_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'inserthorizontalrule\');">';

		case "removeformat":
			return '<img id="{$editor_id}_removeformat" src="{$themeurl}/images/removeformat.gif" title="{$lang_theme_removeformat_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'removeformat\');">';

		case "sub":
			return '<img id="{$editor_id}_sub" src="{$themeurl}/images/sub.gif" title="{$lang_theme_sub_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'subscript\');">';

		case "sup":
			return '<img id="{$editor_id}_sup" src="{$themeurl}/images/sup.gif" title="{$lang_theme_sup_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'superscript\');">';

		case "formatselect":
			return '<select id="{$editor_id}_formatSelect" name="{$editor_id}_formatSelect" onchange="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'FormatBlock\',false,this.options[this.selectedIndex].value);" class="mceSelectList">\
					<option value="<p>">{$lang_theme_paragraph}</option>\
					<!-- <option value="<div>">{$lang_theme_div}</option> -->\
					<option value="<address>">{$lang_theme_address}</option>\
					<option value="<pre>">{$lang_theme_pre}</option>\
					<option value="<h1>">{$lang_theme_h1}</option>\
					<option value="<h2>">{$lang_theme_h2}</option>\
					<option value="<h3>">{$lang_theme_h3}</option>\
					<option value="<h4>">{$lang_theme_h4}</option>\
					<option value="<h5>">{$lang_theme_h5}</option>\
					<option value="<h6>">{$lang_theme_h6}</option>\
					</select>';

		case "fontselect":
			return '<select id="{$editor_id}_fontNameSelect" name="{$editor_id}_fontNameSelect" onchange="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'FontName\',false,this.options[this.selectedIndex].value);" class="mceSelectList">\
					<option value="">{$lang_theme_fontdefault}</option>\
					<option value="arial,helvetica,sans-serif">Arial</option>\
					<option value="times new roman,times,serif">Times New Roman</option>\
					<option value="verdana,arial,helvetica,sans-serif">Verdana</option>\
					<option value="courier new,courier,monospace">Courier</option>\
					<option value="georgia,times new roman,times,serif">Georgia</option>\
					<option value="tahoma,arial,helvetica,sans-serif">Tahoma</option>\
					</select>';

		case "fontsizeselect":
			return '<select id="{$editor_id}_fontSizeSelect" name="{$editor_id}_fontSizeSelect" onchange="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'FontSize\',false,this.options[this.selectedIndex].value);" class="mceSelectList">\
					<option value="1">1 (8 pt)</option>\
					<option value="2">2 (10 pt)</option>\
					<option value="3">3 (12 pt)</option>\
					<option value="4">4 (14 pt)</option>\
					<option value="5">5 (18 pt)</option>\
					<option value="6">6 (24 pt)</option>\
					<option value="7">7 (36 pt)</option>\
					</select>';

		case "forecolor":
			return '<img id="{$editor_id}_custom1" src="{$themeurl}/images/forecolor.gif" title="{$lang_theme_forecolor_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="TinyMCE_advanced_openColorPicker(\'{$editor_id}\',\'forecolor\',TinyMCE_advanced_foreColor);">';

		case "custom1":
			return '<img id="{$editor_id}_custom1" src="{$themeurl}/images/custom_1.gif" title="{$lang_theme_custom1_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'mceRemoveEditor\',false,\'{$editor_id}\');">';

		case "separator":
			return '<img src="{$themeurl}/images/spacer.gif" width="1" height="15" class="mceSeparatorLine">';
	}

	return "";
}

function TinyMCE_advanced_getEditorTemplate(settings) {
	function removeFromArray(in_array, remove_array) {
		var outArray = new Array();
		for (var i=0; i<in_array.length; i++) {
			skip = false;

			for (var j=0; j<remove_array.length; j++) {
				if (in_array[i] == remove_array[j])
					skip = true;
			}

			if (!skip)
				outArray.push(in_array[i]);
		}

		return outArray; 
	}

	var template = new Array();

	template['html'] = '\
	<table class="mceEditor" border="0" cellpadding="0" cellspacing="0" width="{$width}" height="{$height}">\
	<tr><td align="center">\
	<iframe id="{$editor_id}" class="mceEditorArea" border="1" frameborder="0" src="{$default_document}" marginwidth="0" marginheight="0" leftmargin="0" topmargin="0" style="width:{$area_width};height:{$area_height}" width="{$area_width}" height="{$area_height}"></iframe>\
	</td></tr>\
	<tr><td class="mceToolbar" align="center" height="1">';

	// Render row 1
	var buttonNamesRow1 = tinyMCE.getParam("theme_advanced_buttons1", "bold,italic,underline,strikethrough,separator,justifyleft,justifycenter,justifyright,justifyfull,separator,styleselect,formatselect").split(',');
	buttonNamesRow1 = removeFromArray(buttonNamesRow1, tinyMCE.getParam("theme_advanced_disable", "").split(','));
	for (var i=0; i<buttonNamesRow1.length; i++)
		template['html'] += TinyMCE_advanced_getButtonHTML(buttonNamesRow1[i]);

	if (buttonNamesRow1.length > 0)
		template['html'] += "<br>";

	// Render row 2
	var buttonNamesRow2 = tinyMCE.getParam("theme_advanced_buttons2", "bullist,numlist,separator,outdent,indent,separator,undo,redo,separator,link,unlink,image,cleanup,help,code").split(',');
	buttonNamesRow2 = removeFromArray(buttonNamesRow2, tinyMCE.getParam("theme_advanced_disable", "").split(','));
	for (var i=0; i<buttonNamesRow2.length; i++)
		template['html'] += TinyMCE_advanced_getButtonHTML(buttonNamesRow2[i]);

	if (buttonNamesRow2.length > 0)
		template['html'] += "<br>";

	// Render row 3
	var buttonNamesRow3 = tinyMCE.getParam("theme_advanced_buttons3", "table,separator,row_before,row_after,delete_row,separator,col_before,col_after,delete_col,separator,hr,removeformat,separator,sub,sup").split(',');
	buttonNamesRow3 = removeFromArray(buttonNamesRow3, tinyMCE.getParam("theme_advanced_disable", "").split(','));
	for (var i=0; i<buttonNamesRow3.length; i++)
		template['html'] += TinyMCE_advanced_getButtonHTML(buttonNamesRow3[i]);

	template['html'] += '</td></tr></table>';

	// Setup style select options
	var styleSelectHTML = '<option value="">-- {$lang_theme_style_select} --</option>';
	if (settings['theme_advanced_styles']) {
		var stylesAr = settings['theme_advanced_styles'].split(';');
		for (var i=0; i<stylesAr.length; i++) {
			var key, value;

			key = stylesAr[i].split('=')[0];
			value = stylesAr[i].split('=')[1];

			styleSelectHTML += '<option value="' + value + '">' + key + '</option>';
		}

		TinyMCE_advanced_autoImportCSSClasses = false;
	}

	template['html'] = tinyMCE.replaceVar(template['html'], 'style_select_options', styleSelectHTML);
	template['delta_width'] = 0;
	template['delta_height'] = -40;

	return template;
}

function TinyMCE_advanced_getInsertLinkTemplate() {
	var template = new Array();

	template['file'] = 'link.htm';
	template['width'] = 320;
	template['height'] = 130;

	return template;
}

function TinyMCE_advanced_getInsertImageTemplate() {
	var template = new Array();

	template['file'] = 'image.htm';
	template['width'] = 340;
	template['height'] = 260;

	// Language specific width addon
	if (typeof tinyMCELang['lang_insert_image_delta_width'] != "undefined")
		template['width'] += tinyMCELang['lang_insert_image_delta_width'];

	// Language specific height addon
	if (typeof tinyMCELang['lang_insert_image_delta_height'] != "undefined")
		template['height'] += tinyMCELang['lang_insert_image_delta_height'];

	return template;
}

function TinyMCE_advanced_getInsertTableTemplate(settings) {
	var template = new Array();

	template['file'] = 'table.htm';
	template['width'] = 330;
	template['height'] = 200;

	// Language specific width addon
	if (typeof tinyMCELang['lang_insert_table_delta_width'] != "undefined")
		template['width'] += tinyMCELang['lang_insert_table_delta_width'];

	// Language specific height addon
	if (typeof tinyMCELang['lang_insert_table_delta_height'] != "undefined")
		template['height'] += tinyMCELang['lang_insert_table_delta_height'];

	return template;
}

function TinyMCE_advanced_handleNodeChange(editor_id, node, undo_index, undo_levels) {
	function selectByValue(select_elm, value) {
		if (select_elm) {
			for (var i=0; i<select_elm.options.length; i++) {
				if (select_elm.options[i].value == value) {
					select_elm.selectedIndex = i;
					return true;
				}
			}
		}

		return false;
	}

	// Get element color
	var colorElm = tinyMCE.getParentElement(node, "font", "color")
	if (colorElm)
		TinyMCE_advanced_foreColor = "" + colorElm.color.toUpperCase();

	// Reset old states
	tinyMCE.switchClassSticky(editor_id + '_left', 'mceButtonNormal');
	tinyMCE.switchClassSticky(editor_id + '_right', 'mceButtonNormal');
	tinyMCE.switchClassSticky(editor_id + '_center', 'mceButtonNormal');
	tinyMCE.switchClassSticky(editor_id + '_full', 'mceButtonNormal');
	tinyMCE.switchClassSticky(editor_id + '_bold', 'mceButtonNormal');
	tinyMCE.switchClassSticky(editor_id + '_italic', 'mceButtonNormal');
	tinyMCE.switchClassSticky(editor_id + '_underline', 'mceButtonNormal');
	tinyMCE.switchClassSticky(editor_id + '_strikethrough', 'mceButtonNormal');
	tinyMCE.switchClassSticky(editor_id + '_bullist', 'mceButtonNormal');
	tinyMCE.switchClassSticky(editor_id + '_numlist', 'mceButtonNormal');
	tinyMCE.switchClassSticky(editor_id + '_sub', 'mceButtonNormal');
	tinyMCE.switchClassSticky(editor_id + '_sup', 'mceButtonNormal');

	tinyMCE.switchClassSticky(editor_id + '_table', 'mceButtonNormal');
	tinyMCE.switchClassSticky(editor_id + '_table_insert_row_before', 'mceButtonDisabled', true);
	tinyMCE.switchClassSticky(editor_id + '_table_insert_row_after', 'mceButtonDisabled', true);
	tinyMCE.switchClassSticky(editor_id + '_table_delete_row', 'mceButtonDisabled', true);
	tinyMCE.switchClassSticky(editor_id + '_table_insert_col_before', 'mceButtonDisabled', true);
	tinyMCE.switchClassSticky(editor_id + '_table_insert_col_after', 'mceButtonDisabled', true);
	tinyMCE.switchClassSticky(editor_id + '_table_delete_col', 'mceButtonDisabled', true);
	tinyMCE.switchClassSticky(editor_id + '_outdent', 'mceButtonDisabled', true);

	if (undo_levels != -1) {
		tinyMCE.switchClassSticky(editor_id + '_undo', 'mceButtonDisabled', true);
		tinyMCE.switchClassSticky(editor_id + '_redo', 'mceButtonDisabled', true);
	}

	// Within a td element
	if (tinyMCE.getParentElement(node, "td")) {
		tinyMCE.switchClassSticky(editor_id + '_table_insert_row_before', 'mceButtonNormal', false);
		tinyMCE.switchClassSticky(editor_id + '_table_insert_row_after', 'mceButtonNormal', false);
		tinyMCE.switchClassSticky(editor_id + '_table_delete_row', 'mceButtonNormal', false);
		tinyMCE.switchClassSticky(editor_id + '_table_insert_col_before', 'mceButtonNormal', false);
		tinyMCE.switchClassSticky(editor_id + '_table_insert_col_after', 'mceButtonNormal', false);
		tinyMCE.switchClassSticky(editor_id + '_table_delete_col', 'mceButtonNormal', false);
	}

	// Within table
	if (tinyMCE.getParentElement(node, "table"))
		tinyMCE.switchClassSticky(editor_id + '_table', 'mceButtonSelected');

	// Within li, blockquote
	if (tinyMCE.getParentElement(node, "li,blockquote"))
		tinyMCE.switchClassSticky(editor_id + '_outdent', 'mceButtonNormal', false);

	// Has redo levels
	if (undo_index != -1 && (undo_index < undo_levels-1 && undo_levels > 0))
		tinyMCE.switchClassSticky(editor_id + '_redo', 'mceButtonNormal', false);

	// Has undo levels
	if (undo_index != -1 && (undo_index > 0 && undo_levels > 0))
		tinyMCE.switchClassSticky(editor_id + '_undo', 'mceButtonNormal', false);

	// Select class in select box
	var selectElm = document.getElementById(editor_id + "_styleSelect");
	if (selectElm) {
		classNode = node;
		breakOut = false;
		var index = 0;

		do {
			if (classNode && classNode.className) {
				for (var i=0; i<selectElm.options.length; i++) {
					if (selectElm.options[i].value == classNode.className) {
						index = i;
						breakOut = true;
						break;
					}
				}
			}
		} while (!breakOut && (classNode = classNode.parentNode));

		selectElm.selectedIndex = index;
	}

	// Select formatblock
	var selectElm = document.getElementById(editor_id + "_formatSelect");
	if (selectElm) {
		var elm = tinyMCE.getParentElement(node, "p,div,h1,h2,h3,h4,h5,h6,pre,address");
		if (elm) {
			selectByValue(selectElm, "<" + elm.nodeName.toLowerCase() + ">");
		} else
			selectByValue(selectElm, "<p>");
	}

	// Select fontselect
	var selectElm = document.getElementById(editor_id + "_fontNameSelect");
	if (selectElm) {
		var elm = tinyMCE.getParentElement(node, "font", "face");
		if (elm)
			selectByValue(selectElm, elm.getAttribute("face"));
		else
			selectByValue(selectElm, "");
	}

	// Select fontsize
	var selectElm = document.getElementById(editor_id + "_fontSizeSelect");
	if (selectElm) {
		var elm = tinyMCE.getParentElement(node, "font", "size");
		if (elm)
			selectByValue(selectElm, elm.getAttribute("size"));
		else
			selectByValue(selectElm, "1");
	}

	// Handle align attributes
	alignNode = node;
	breakOut = false;
	do {
		if (!alignNode.getAttribute || !alignNode.getAttribute('align'))
			continue;

		switch (alignNode.getAttribute('align').toLowerCase()) {
			case "left":
				tinyMCE.switchClassSticky(editor_id + '_left', 'mceButtonSelected');
				breakOut = true;
			break;

			case "right":
				tinyMCE.switchClassSticky(editor_id + '_right', 'mceButtonSelected');
				breakOut = true;
			break;

			case "middle":
			case "center":
				tinyMCE.switchClassSticky(editor_id + '_center', 'mceButtonSelected');
				breakOut = true;
			break;

			case "justify":
				tinyMCE.switchClassSticky(editor_id + '_full', 'mceButtonSelected');
				breakOut = true;
			break;
		}
	} while (!breakOut && (alignNode = alignNode.parentNode));

	// Handle elements
	do {
		switch (node.nodeName.toLowerCase()) {
			case "b":
			case "strong":
				tinyMCE.switchClassSticky(editor_id + '_bold', 'mceButtonSelected');
			break;

			case "i":
			case "em":
				tinyMCE.switchClassSticky(editor_id + '_italic', 'mceButtonSelected');
			break;

			case "u":
				tinyMCE.switchClassSticky(editor_id + '_underline', 'mceButtonSelected');
			break;

			case "strike":
				tinyMCE.switchClassSticky(editor_id + '_strikethrough', 'mceButtonSelected');
			break;
			
			case "ul":
				tinyMCE.switchClassSticky(editor_id + '_bullist', 'mceButtonSelected');
			break;

			case "ol":
				tinyMCE.switchClassSticky(editor_id + '_numlist', 'mceButtonSelected');
			break;

			case "sub":
				tinyMCE.switchClassSticky(editor_id + '_sub', 'mceButtonSelected');
			break;

			case "sup":
				tinyMCE.switchClassSticky(editor_id + '_sup', 'mceButtonSelected');
			break;
		}
	} while ((node = node.parentNode));
}

// Custom HTML editor function
function TinyMCE_advanced_openHTMLSourceEditor(editor_id) {
	var template = new Array();

	template['file'] = 'source_editor.htm';
	template['width'] = tinyMCE.getParam("theme_advanced_source_editor_width", 340);
	template['height'] = tinyMCE.getParam("theme_advanced_source_editor_height", 270);

	tinyMCE.openWindow(template, {editor_id : editor_id});
}

// Custom HTML editor function
function TinyMCE_advanced_openColorPicker(editor_id, command, input_color) {
	var template = new Array();

	if (!input_color)
		input_color = "#000000";

	template['file'] = 'color_picker.htm';
	template['width'] = 170;
	template['height'] = 205;

	tinyMCE.openWindow(template, {editor_id : editor_id, command : command, input_color : input_color});
}

// This function auto imports CSS classes into the class selection droplist
function TinyMCE_advanced_setupCSSClasses(editor_id) {
	if (!TinyMCE_advanced_autoImportCSSClasses)
		return;

	var selectElm = document.getElementById(editor_id + '_styleSelect');

	if (selectElm && selectElm.getAttribute('cssImported') != 'true') {
		var csses = tinyMCE.getCSSClasses(editor_id);
		if (csses && selectElm) {
			for (var i=0; i<csses.length; i++)
				selectElm.options[selectElm.length] = new Option(csses[i], csses[i]);
		}

		// Only do this once
		selectElm.setAttribute('cssImported', 'true');
	}
}
