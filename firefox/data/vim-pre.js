/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false, self: false, unsafeWindow: false */
var Module = {
  noInitialRun: false,
  noExitRuntime: true,
  //arguments: ['/usr/local/share/vim/example.js'],
  arguments: ['/root/textarea0'],
  preRun: [
    //function() { window.vimjs.pre_run(); },
    function() {
      window.vimjs.pre_run();
      var textareas = document.getElementsByTagName("textarea");
      var i;
      var textarea;
      var tname;
      //window.FS.mkdir("/root");
      
      // Write all textareas to Emscripten file system
      for (i = 0; i < textareas.length; i++) {
        textarea = textareas[i];
        tname = "vimtextarea" + i;
        textarea.classList.add(tname);
        window.FS.writeFile("/root/textarea" + i, textarea.value);
      }

      // Write all CodeMirror editor values to Emscripten file system
      var codemirrors = unsafeWindow.document.getElementsByClassName("CodeMirror");
      var codemirror;
      var data;
      //var script;
      for (i = 0; i < codemirrors.length; i++) {
        codemirror = codemirrors[i];
        tname = "vimcodemirror" + i;
        codemirror.classList.add(tname);

        data = codemirror.CodeMirror.getValue();
        console.log("cvalue", data);
        window.FS.writeFile("/root/codemirror" + i, data);
      }
      if (codemirrors.length > 0) {
        window.Module.arguments = ['/root/codemirror0'];
      }

      // Add autocommands to vimrc to write back buffer to DOM
      var vimrc = window.FS.readFile('/usr/local/share/vim/vimrc', { encoding: 'utf8' });
      for (i = 0; i < textareas.length; i++) {
        tname = "vimtextarea" + i;
        // slash at the end escapes JS newline
        // slash at the front escapes vimrc newline
        vimrc += "\
        au BufWritePost /root/textarea" + i + " : \n\
        \\ silent !var data = FS.readFile(\"%\", { encoding: \"utf8\" } ); \n\
        \\ var p = document.getElementsByClassName(\"" + tname + "\")[0]; \n\
        \\ p.value = data; \n\
        ";
      }
      for (i = 0; i < codemirrors.length; i++) {
        tname = "vimcodemirror" + i;
        // slash at the end escapes JS newline
        // slash at the front escapes vimrc newline
        vimrc += "\
        au BufWritePost /root/codemirror" + i + " : \n\
        \\ silent !var data = FS.readFile(\"%\", { encoding: \"utf8\" } ); \n\
        \\ var p = unsafeWindow.document.getElementsByClassName(\"" + tname + "\")[0]; \n\
        \\ p.CodeMirror.setValue(data); \n\
        ";

      }
      window.FS.writeFile('/usr/local/share/vim/vimrc', vimrc);

    }
  ],
  postRun: [],
  print: function() { 
    if (console.group !== undefined) {
      console.group.apply(console, arguments); 
      console.groupEnd();
    } else {
      // IE
      console.log(arguments);
    }
  },
  printErr: function() { 
    if (console.group !== undefined) {
      console.group.apply(console, arguments); 
      console.groupEnd();
    } else {
      // IE
      console.log(arguments);
    }
  },
};
window.Module = Module;

