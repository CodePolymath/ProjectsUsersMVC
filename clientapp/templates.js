(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof root["app"] === 'undefined' || root["app"] !== Object(root["app"])) {
        throw new Error('templatizer: window["app"] does not exist or is not an object');
    } else {
        root["app"].templatizer = factory();
    }
}(this, function () {
    var jade=function(){function e(e){return null!=e&&""!==e}function n(t){return(Array.isArray(t)?t.map(n):t&&"object"==typeof t?Object.keys(t).filter(function(e){return t[e]}):[t]).filter(e).join(" ")}var t={};return t.merge=function r(n,t){if(1===arguments.length){for(var a=n[0],i=1;i<n.length;i++)a=r(a,n[i]);return a}var o=n["class"],s=t["class"];(o||s)&&(o=o||[],s=s||[],Array.isArray(o)||(o=[o]),Array.isArray(s)||(s=[s]),n["class"]=o.concat(s).filter(e));for(var l in t)"class"!=l&&(n[l]=t[l]);return n},t.joinClasses=n,t.cls=function(e,r){for(var a=[],i=0;i<e.length;i++)a.push(r&&r[i]?t.escape(n([e[i]])):n(e[i]));var o=n(a);return o.length?' class="'+o+'"':""},t.style=function(e){return e&&"object"==typeof e?Object.keys(e).map(function(n){return n+":"+e[n]}).join(";"):e},t.attr=function(e,n,r,a){return"style"===e&&(n=t.style(n)),"boolean"==typeof n||null==n?n?" "+(a?e:e+'="'+e+'"'):"":0==e.indexOf("data")&&"string"!=typeof n?(-1!==JSON.stringify(n).indexOf("&")&&console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"),n&&"function"==typeof n.toISOString&&console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0")," "+e+"='"+JSON.stringify(n).replace(/'/g,"&apos;")+"'"):r?(n&&"function"==typeof n.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+e+'="'+t.escape(n)+'"'):(n&&"function"==typeof n.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+e+'="'+n+'"')},t.attrs=function(e,r){var a=[],i=Object.keys(e);if(i.length)for(var o=0;o<i.length;++o){var s=i[o],l=e[s];"class"==s?(l=n(l))&&a.push(" "+s+'="'+l+'"'):a.push(t.attr(s,l,!1,r))}return a.join("")},t.escape=function(e){var n=String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");return n===""+e?e:n},t.rethrow=function a(e,n,t,r){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&n||r))throw e.message+=" on line "+t,e;try{r=r||require("fs").readFileSync(n,"utf8")}catch(i){a(e,null,t)}var o=3,s=r.split("\n"),l=Math.max(t-o,0),f=Math.min(s.length,t+o),o=s.slice(l,f).map(function(e,n){var r=n+l+1;return(r==t?"  > ":"    ")+r+"| "+e}).join("\n");throw e.path=n,e.message=(n||"Jade")+":"+t+"\n"+o+"\n\n"+e.message,e},t}();

    var templatizer = {};
    templatizer["controls"] = {};

    // controls/projectuser.jade compiled template
    templatizer["controls"]["projectuser"] = function tmpl_controls_projectuser(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(projectid) {
            buf.push('<div class="form-horizontal"><form class="divControls"><select' + jade.attr("data-id", projectid, true, false) + jade.attr("id", "selProject-" + projectid, true, false) + ' class="form-control selAddUser">Please select</select><label class="radio-inline"><input type="radio" name="radCredential" value="1" checked="checked"/>web</label><label class="radio-inline"><input type="radio" name="radCredential" value="2"/>ssh</label><label class="radio-inline"><input type="radio" name="radCredential" value="3"/>ftp</label></form><button' + jade.attr("data-id", projectid, true, false) + ' class="btn btn-success"><span class="glyphicon glyphicon-plus"></span></button><span class="spnMessage">Add a User</span></div>');
        }).call(this, "projectid" in locals_for_with ? locals_for_with.projectid : typeof projectid !== "undefined" ? projectid : undefined);
        return buf.join("");
    };

    // home.jade compiled template
    templatizer["home"] = function tmpl_home() {
        return '<h1>Login to the Blackbook App</h1><div class="form-inline"><h4>Please login below:</h4><div class="form-group"><label for="username">User Name:</label><input type="text" name="username" class="form-control"/></div><div class="form-group"><label for="password">Password:</label><input id="inpPassword" type="password" name="password" class="form-control"/></div><div class="form-group"><button id="btnLogin" type="button" class="btn btn-success">Login</button></div></div><div id="divMessage" class="hidden"></div>';
    };

    // newproject.jade compiled template
    templatizer["newproject"] = function tmpl_newproject() {
        return '<h1>Create a New Project</h1><div class="divNewProject"><h4>All data is required:</h4><div class="divProjectData"><div class="form-group"><label for="projectname">Project Name:</label><input type="text" name="projectname" class="form-control"/></div><div class="form-group"><label for="description">Description:</label><input type="text" name="description" class="form-control"/></div><div id="divMessage" class="hidden"></div><button type="button" id="btnCreateProject" class="btn btn-success">Create New Project</button></div></div>';
    };

    // newuser.jade compiled template
    templatizer["newuser"] = function tmpl_newuser() {
        return '<h1>Create a New User</h1><div class="divNewUser"><h4>All data is required:</h4><div class="divUserData"><div class="form-group"><label for="username">User Name:</label><input id="inpUserName" type="text" name="username" class="form-control"/></div><div class="form-group"><label for="password">Password:</label><input type="password" name="password" class="form-control"/></div><div class="form-group"><label for="username">Email:</label><input type="text" name="email" class="form-control"/></div><div class="form-group"><label for="password">City:</label><input type="text" name="city" class="form-control"/></div><div class="form-group"><label for="username">State:</label><input type="text" name="state" maxlength="2" class="form-control"/></div><div class="form-group"><h5>Gender:</h5><label class="radio-inline control-label"><input id="radFemale" type="radio" name="gender" value="F" checked="checked"/>Female</label><label class="radio-inline control-label"><input id="radMale" type="radio" name="gender" value="M"/>Male</label></div><div class="form-group"><label for="username">Age:</label><input type="text" name="age" maxlength="3" class="form-control"/></div><div id="divMessage" class="hidden"></div><button type="button" id="btnCreate" class="btn btn-success">Create New User</button></div></div>';
    };

    // projects.jade compiled template
    templatizer["projects"] = function tmpl_projects(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(models, undefined) {
            buf.push('<h1>Current Projects</h1><h4><span id="spnProjectCount">No Projects Found</span></h4><ul class="ulProjects">');
            (function() {
                var $obj = models;
                if ("number" == typeof $obj.length) {
                    for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                        var model = $obj[$index];
                        if (model.showing) {
                            buf.push("<li" + jade.attr("id", "liProject-" + model.id, true, false) + ' class="liProjects list-unstyled"><dl class="dl-horizontal"><dt>ProjectName:</dt><dd>' + jade.escape(null == (jade_interp = model.attributes.projectname) ? "" : jade_interp) + '</dd><div class="divDescription">' + jade.escape(null == (jade_interp = model.attributes.description) ? "" : jade_interp) + "</div></dl><div" + jade.attr("id", "divProjectUsers-" + model.attributes.id, true, false) + jade.attr("data-id", model.attributes.id, true, false) + ' class="divProjectUser"></div><ul' + jade.attr("id", "ulUsers-" + model.attributes.id, true, false) + ' class="ulUsers hidden"></ul><a' + jade.attr("data-id", model.attributes.id, true, false) + ' class="glyphicon glyphicon-trash"></a></li>');
                        }
                    }
                } else {
                    var $l = 0;
                    for (var $index in $obj) {
                        $l++;
                        var model = $obj[$index];
                        if (model.showing) {
                            buf.push("<li" + jade.attr("id", "liProject-" + model.id, true, false) + ' class="liProjects list-unstyled"><dl class="dl-horizontal"><dt>ProjectName:</dt><dd>' + jade.escape(null == (jade_interp = model.attributes.projectname) ? "" : jade_interp) + '</dd><div class="divDescription">' + jade.escape(null == (jade_interp = model.attributes.description) ? "" : jade_interp) + "</div></dl><div" + jade.attr("id", "divProjectUsers-" + model.attributes.id, true, false) + jade.attr("data-id", model.attributes.id, true, false) + ' class="divProjectUser"></div><ul' + jade.attr("id", "ulUsers-" + model.attributes.id, true, false) + ' class="ulUsers hidden"></ul><a' + jade.attr("data-id", model.attributes.id, true, false) + ' class="glyphicon glyphicon-trash"></a></li>');
                        }
                    }
                }
            }).call(this);
            buf.push("</ul>");
        }).call(this, "models" in locals_for_with ? locals_for_with.models : typeof models !== "undefined" ? models : undefined, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined);
        return buf.join("");
    };

    // users.jade compiled template
    templatizer["users"] = function tmpl_users(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(models, undefined) {
            buf.push('<h1>Current Users</h1><div class="divCountrols"><div class="form-inline"><h4>Enter a filter:</h4><div class="form-group"><label for="selField">Field:</label><select id="selField" class="form-control"><option value="null">Please Select:</option><option value="city">City</option><option value="state">State</option><option value="gender">Gender</option></select><label for="selValue">Value:</label><select id="selValue" class="form-control"><option value="null">Please Select:</option></select><button id="btnReset" type="button" class="btn btn-default">Reset</button></div></div></div><h4><span id="spnUserCount">No Users Found</span></h4><ul>');
            (function() {
                var $obj = models;
                if ("number" == typeof $obj.length) {
                    for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                        var model = $obj[$index];
                        if (model.showing) {
                            buf.push("<li" + jade.attr("id", "liUser-" + model.attributes.id, true, false) + ' class="list-unstyled liUsers"><dl class="dl-horizontal"><dt>UserName:</dt><dd>' + jade.escape(null == (jade_interp = model.attributes.username) ? "" : jade_interp) + "</dd><dt>Email:</dt><dd>" + jade.escape(null == (jade_interp = model.attributes.email) ? "" : jade_interp) + "</dd><dt>City:</dt><dd>" + jade.escape(null == (jade_interp = model.attributes.city) ? "" : jade_interp) + "</dd><dt>State:</dt><dd>" + jade.escape(null == (jade_interp = model.attributes.state) ? "" : jade_interp) + "</dd><dt>Age:</dt><dd>" + jade.escape(null == (jade_interp = model.attributes.age) ? "" : jade_interp) + "</dd><dt>Gender:</dt><dd>" + jade.escape(null == (jade_interp = model.attributes.gender) ? "" : jade_interp) + "</dd></dl><a" + jade.attr("data-id", model.attributes.id, true, false) + ' class="glyphicon glyphicon-trash"></a></li>');
                        }
                    }
                } else {
                    var $l = 0;
                    for (var $index in $obj) {
                        $l++;
                        var model = $obj[$index];
                        if (model.showing) {
                            buf.push("<li" + jade.attr("id", "liUser-" + model.attributes.id, true, false) + ' class="list-unstyled liUsers"><dl class="dl-horizontal"><dt>UserName:</dt><dd>' + jade.escape(null == (jade_interp = model.attributes.username) ? "" : jade_interp) + "</dd><dt>Email:</dt><dd>" + jade.escape(null == (jade_interp = model.attributes.email) ? "" : jade_interp) + "</dd><dt>City:</dt><dd>" + jade.escape(null == (jade_interp = model.attributes.city) ? "" : jade_interp) + "</dd><dt>State:</dt><dd>" + jade.escape(null == (jade_interp = model.attributes.state) ? "" : jade_interp) + "</dd><dt>Age:</dt><dd>" + jade.escape(null == (jade_interp = model.attributes.age) ? "" : jade_interp) + "</dd><dt>Gender:</dt><dd>" + jade.escape(null == (jade_interp = model.attributes.gender) ? "" : jade_interp) + "</dd></dl><a" + jade.attr("data-id", model.attributes.id, true, false) + ' class="glyphicon glyphicon-trash"></a></li>');
                        }
                    }
                }
            }).call(this);
            buf.push("</ul>");
        }).call(this, "models" in locals_for_with ? locals_for_with.models : typeof models !== "undefined" ? models : undefined, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined);
        return buf.join("");
    };

    return templatizer;
}));