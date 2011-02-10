<?php

// +----------------------------------------------------------------------+
// | PHP version 4                                                        |
// +----------------------------------------------------------------------+
// | Copyright (c) 1997-2004 The PHP Group                                |
// +----------------------------------------------------------------------+
// | This source file is subject to version 3.0 of the PHP license,       |
// | that is bundled with this package in the file LICENSE, and is        |
// | available through the world-wide-web at the following url:           |
// | http://www.php.net/license/3_0.txt.                                  |
// | If you did not receive a copy of the PHP license and are unable to   |
// | obtain it through the world-wide-web, please send a note to          |
// | license@php.net so we can mail you a copy immediately.               |
// +----------------------------------------------------------------------+
// | Authors: Dennis Ploeger <develop@dieploegers.de>                     |
// +----------------------------------------------------------------------+

require_once('DB.php');

/**
 * C!ETS
 * Cool! Edit This Site
 *
 * Sometimes it's hard to keep it simple.
 *
 * I was searching for a veeery simple Wiki to use in a portal I was making and found-- nothing. No Wiki I've seen was just
 * "move the script here, set some code and implement it in your pages like this:...". So I finally wrote me one myself.
 *
 * Here it is: C!ETS. It is basically a wrapper around database-SQL and HTML to make it easy for you to implement a site,
 * that can be edited quite simple and using a HTML-WYSIWYG-Editor.
 * The basic functionality is done using Pear_DB and tinymce.
 * Please have a look at the manual in docs/manual.
 *
 * @category  HTML
 * @package   cets
 * @author    Dennis Ploeger <develop@dieploegers.de>
 * @version   0.1b
 * @access    public
 * @copyright 2004 Dennis Ploeger
 */
class cets 
{

    // {{{ properties

    /**
     * The DSN of your database for Pear_DB
     *
     * Example: 'mysql://foo:bar@example.com/foobar'
     *
     * @var string
     */

    var $dsn = '';

    /**
     * The table holding the contents for C!ETS
     *
     * @var string
     */

    var $table="cets_content";

    /**
     * The path to fckeditor.js to be included in the <head>-area
     *
     * @var string
     */

    var $path_tinymce="lib/tiny_mce/tiny_mce.js";

    /**
     * The handler for the Pear_DB-Connection
     * 
     * @var object
     * @access private
     */

    var $_db;

    /**
     * The number of the last error that occured
     *
     * @var integer
     * @access private
     */
 
    var $_err_no;

    /**
     * The message of the last error that occured
     *
     * @var integer
     * @access private
     */

    var $_err_msg;

    // }}}
    // {{{ cets()

    /**
     * The constructor of the cets-class
     *
     * @param  string dsn The DSN of your database for Pear_DB (can also be set
     *                      using setDSN)
     * @return object A cets-object.
     * @access public
     */

    function cets($dsn="")
    {
        $this->dsn=$dsn;
    }

    // }}}
    // {{{ setDSN()

    /**
     * Set the used DSN
     *
     * @param  string dsn The DSN of your database for Pear_DB
     * @access public
     */

    function setDSN($dsn)
    {
        $this->dsn=$dsn;
    }

    // }}}
    // {{{ setTable()

    /**
     * Sets the used table
     *
     * @param  string table The name of the table, C!ETS uses to store its data
     * @access public
     */

    function setTable($table)
    {
        $this->table=$table;
    }

    // }}}
    // {{{ _setError()

    /**
     * Sets the internal error properties
     *
     * @access private
     * @param  integer  err_no  The new error number (errors above 1000 are
     *                          considered as DB-errors)
     * @param  string   err_msg The new error message
     */

    function _setError($errno,$errmsg)
    {
        $this->_err_no=$errno;
        $this->_err_msg=$errmsg;
    }

    // }}}
    // {{{ getErrNo()

    /**
     * Returns the number of the last error that occured
     *
     * @access public
     * @return int  error number
     */

    function getErrNo()
    {
        return $this->_err_no;
    }

    // }}}
    // {{{ getErrMsg()

    /**
     * Returns the message of the last error that occured
     *
     * @access public
     * @return string   error message
     */

    function getErrMsg()
    {
        return $this->_err_msg;
    }

    // }}}
    // {{{ displayContent

    /**
     * Call this method to get the content identified by $contentname
     *
     * @access public
     * @param  string   contentname The identifier for the content
     * @return string   the content
     */

    function displayContent($contentname)
    {

        // Build up database connection

        $this->_db = &DB::connect($this->dsn);

        if (DB::isError($this->dbconn)) {

            _setError(1000+$this->_db->getCode(), $this->_db->getUserInfo());
            return false;

        }

        // Select content from database

        $res = &$this->_db->query("select content from ".$this->table." where".
                                  " contentname='".$content_name."'");

        if (DB::isError($res)) {
        
            _setError(1000+$res->getCode(), $res->getUserInfo());
            return false;

        }

        $row = &$res->fetchRow(DB_FETCHMODE_ASSOC);

        $res->free();

        $this->_db->disconnect();

        // Return content

        return $row['content'];
    }

    // }}}
    // {{{ getHeadTags()

    /**
     * Returns the tags needed with the <head>...</head>-tags when using
     * editContent
     *
     * @access public
     * @param  string   mceoptions  An array of optional tinymce-options in
     *                              $name=>$value pairs
     * @return string   HTML-tags
     */
     
    function getHeadTags($mceoptions=NULL)
    {
        $returnvalue='

        <!-- tinyMCE -->
        <script language="javascript" type="text/javascript" src="';
       
        $returnvalue.=$this->path_tinymce;

        $returnvalue='
        "></script>
        <script language="javascript" type="text/javascript">
            tinyMCE.init({
                mode : "textareas"';

        if (is_null($mceoptions)) {

            $returnvalue.='
                ,theme : "advanced"';

        } else {
        
            foreach ($mceoptions as $key => $value) {
                $returnvalue.=",\n".$key.':\"'.$value.'"';
            }

        }

        $returnvalue.='
        });
        </script>
        <!-- /tinyMCE -->';

        return $returnvalue;
    }

    // }}}
    // {{{ editContent()

    /**
     * Returns the editor within a form, that calls $scriptname with the ability
     * of hidden form elements which you can use for controlling the script.
     *
     * @access public
     * @param  contentname   String  the name of the content to be edited
     * @param  scriptname    String  the name of the script the form calls
     * @param  hidden        array   An array consisting out of $name => $value
     *                               pairs for the hidden form variables
     * @param  method        String  wether the form uses POST or GET-method when
     * @param  submit        String  the value for the <submit-button
     * @param  name          String  the name of the textarea element
     * @param  cols          int     the cols-value of the textarea
     * @param  rows          int     the rows-value of the textarea
     * @return String        The output for the editor 
     */

    function editContent($contentname, $scriptname, $hidden=NULL,
                         $method='POST', $submit="Submit", $name='CETSTextarea', $cols="100", $rows="30")
    {

        // Select content from database

        $content = $this->displayContent($contentname);

        if (!($content)) {
        
            // Error fetching content, so set the content to blank

            $content="";	

        }

        $returnvalue='<form action="'.$scriptname.'" method="'.$method.'"
                       name="cets_edit">\n';

        if (!(is_null($hidden))) {
        
            foreach ($hidden as $hidden_name => $hidden_value) {
            
                $returnvalue.="<input type=\"hidden\" name=\"".$hidden_name."\"
                                value=\"".$hidden_value."\">\n";

            }

        }

        $returnvalue .= '<textarea cols="'.$cols.'" rows="'.$rows.'"
                          name="'.$name.'">'.$content.'</textarea>';
        $returnvalue .= '<input type="submit" value="'.$submit.'">';
        $returnvalue .= '</form>';               

        return $returnvalue;
    }

    // }}}
    // {{{ saveContent()

    /**
     * Saves the content back to the database after editing it.
     * @access public
     * @param  string   contentname the name of the content to be saved
     * @param  string   content     the new content
     */

    function saveContent($contentname,$content)
    {
        // Build up database connection

        $this->_db = &DB::connect($this->dsn);

        if (DB::isError($this->_db)) {

            _setError(1000+$this->_db->getCode(), $this->_db->getUserInfo());
            return false;

        }
        
        // Look, if we need to do an update or an insert on the table

        $res = &$this->_db->query("select * from ".$this->table." where contentname='".$contentname."'");

        if (DB::isError($res))
        {
            _setError(1000+$res->getCode(), $res->getUserInfo());
            return false;
        }

        if ($res->numRows()>0) {

            // Update content

            $res = &$this->_db->query("update ".$this->table." set content='".
                                      $this->_db->escapeSimple($content).
                                      "' where contentname='".$contentname."'");

            if (DB::isError($res))
            {
                _setError(1000+$res->getCode(),$res->getUserInfo());
                return false;
            }

        } else {

            // Insert content

            $res = &$this->_db->query("insert into ".$this->table.
                                      " (content,contentname) values('".
                                      $this->_db->escapeSimple($content)."','".
                                      $contentname."')");

            if (DB::isError($res)) {

                _setError(1000+$res->getCode(),$res->getUserInfo());
                return false;

            }
        }

        $this->_db->disconnect();

        // All went right, return true

        return true;
    
    }

    // }}}

}


?>
