# vim.js-plugin
Firefox plugin based on vim.js.

Replaces the biggest textarea, CodeMirror or Ace Editor per page with vim.js.
There is only support for one vim instance per page because of the way
emscripten works (there does exist multiple heap experimental support, but I
haven't tried it). Besides, it would be prohibitively expensive memory-wise to
have more than one. You can still edit all elements on page, because:

The DOM elements are editable as files in /root, with names
 - /root/textarea0
 - /root/textarea1
 - ...
 - /root/codemirror0
 - /root/codemirror1
 - ...
 - /root/ace0
 - /root/ace1
 - ...

It currently doesn't hide the original element, so you can see whether it's updating the content.

TODO:
 - Chrome plugin

# Alternatives
 - [Windows only: Text Editor Anywhere](http://www.listary.com/text-editor-anywhere) (Works with CodeMirror.)
 - [Firefox plugin: It's all text](https://addons.mozilla.org/en-US/firefox/addon/its-all-text/?src=ss)
 - [Chrome alternatives to It's all text](http://superuser.com/questions/261689/its-all-text-for-chrome)
