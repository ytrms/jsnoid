parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"jj7q":[function(require,module,exports) {

var t,e,n=module.exports={};function r(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function i(e){if(t===setTimeout)return setTimeout(e,0);if((t===r||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}function u(t){if(e===clearTimeout)return clearTimeout(t);if((e===o||!e)&&clearTimeout)return e=clearTimeout,clearTimeout(t);try{return e(t)}catch(n){try{return e.call(null,t)}catch(n){return e.call(this,t)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:r}catch(n){t=r}try{e="function"==typeof clearTimeout?clearTimeout:o}catch(n){e=o}}();var c,s=[],l=!1,a=-1;function f(){l&&c&&(l=!1,c.length?s=c.concat(s):a=-1,s.length&&h())}function h(){if(!l){var t=i(f);l=!0;for(var e=s.length;e;){for(c=s,s=[];++a<e;)c&&c[a].run();a=-1,e=s.length}c=null,l=!1,u(t)}}function m(t,e){this.fun=t,this.array=e}function p(){}n.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];s.push(new m(t,e)),1!==s.length||l||i(h)},m.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.env={},n.argv=[],n.version="",n.versions={},n.on=p,n.addListener=p,n.once=p,n.off=p,n.removeListener=p,n.removeAllListeners=p,n.emit=p,n.prependListener=p,n.prependOnceListener=p,n.listeners=function(t){return[]},n.binding=function(t){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(t){throw new Error("process.chdir is not supported")},n.umask=function(){return 0};
},{}],"E66h":[function(require,module,exports) {
var define;
var process = require("process");
var global = arguments[3];
},{"process":"jj7q"}],"P0Io":[function(require,module,exports) {
module.exports="sprites.1d110c00.png";
},{}],"CRbR":[function(require,module,exports) {
module.exports={frames:[{filename:"ball.png",frame:{x:0,y:0,w:20,h:20},rotated:!1,trimmed:!1,spriteSourceSize:{x:0,y:0,w:20,h:20},sourceSize:{w:20,h:20}},{filename:"brick.png",frame:{x:20,y:0,w:64,h:32},rotated:!1,trimmed:!1,spriteSourceSize:{x:0,y:0,w:64,h:32},sourceSize:{w:64,h:32}}],meta:{app:"https://www.codeandweb.com/texturepacker",version:"1.0",image:"sprites.png",format:"RGBA8888",size:{w:84,h:32},scale:"1",smartupdate:"$TexturePacker:SmartUpdate:7303c0ea4972494110956ca1065a85c3:a7c035eb8013fb6f535ba534acfbad4b:1eabdf11f75e3a4fe3147baf7b5be24b$"}};
},{}],"NiZL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=i(require("phaser")),e=i(require("./../assets/sprites.png")),s=i(require("./../assets/sprites.json"));function i(t){return t&&t.__esModule?t:{default:t}}function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var s=0;s<e.length;s++){var i=e[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function n(t,e,s){return e&&o(t.prototype,e),s&&o(t,s),Object.defineProperty(t,"prototype",{writable:!1}),t}function l(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&c(t,e)}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function h(t){var e=p();return function(){var s,i=f(t);if(e){var r=f(this).constructor;s=Reflect.construct(i,arguments,r)}else s=i.apply(this,arguments);return u(this,s)}}function u(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return d(t)}function d(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function p(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var y=function(i){l(o,t.default.Scene);var r=h(o);function o(){return a(this,o),r.apply(this,arguments)}return n(o,[{key:"preload",value:function(){this.load.atlas("assets",e.default,s.default)}},{key:"create",value:function(){var t=this;this.physics.world.setBoundsCollision(!0,!0,!0,!1),this.bricks=this.physics.add.staticGroup({key:"assets",frame:["brick.png","brick.png","brick.png","brick.png","brick.png"],frameQuantity:7,gridAlign:{width:7,height:5,cellWidth:64,cellHeight:32,x:60,y:50}}),this.states={WAITING:"waiting",PLAYING:"playing",PAUSED:"paused"},this.gameState=this.states.WAITING,this.paddle=this.add.rectangle(this.cameras.main.centerX,630,100,20,16777215,1),this.physics.add.existing(this.paddle,!0),this.ball=this.physics.add.image(this.paddle.x,this.paddle.y-20,"assets","ball.png"),this.physics.add.existing(this.ball),this.ball.setBounce(1,1),this.ball.setCollideWorldBounds(!0,1,1,!0),this.resetLevel=function(){this.gameState=this.states.WAITING,this.ballsUsed=0,this.scoreBoard.setText("Press UP to start."),this.bricks.children.each(function(t){t.enableBody(!1,0,0,!0,!0)})},this.hitBrick=function(t,e){e.disableBody(!0,!0),0===this.bricks.countActive()&&this.resetLevel()},this.hitPaddle=function(t,e){var s=0;t.x<e.x?(s=e.x-t.x,t.setVelocityX(-8*s)):t.x>e.x&&(s=t.x-e.x,t.setVelocityX(8*s))},this.physics.add.collider(this.ball,this.paddle,this.hitPaddle,null,this),this.physics.add.collider(this.ball,this.bricks,this.hitBrick,null,this),this.ballsUsed=0,this.scoreBoard=this.add.text(0,0,"Press UP to start."),this.cursors=this.input.keyboard.createCursorKeys(),this.input.keyboard.on("keydown-P",function(){t.gameState!==t.states.PAUSED?(t.previousGameState=t.gameState,t.previousBallVelocityX=t.ball.body.velocity.x,t.previousBallVelocityY=t.ball.body.velocity.y,t.ball.setVelocity(0),t.pausedText=t.add.text(t.cameras.main.width/2,t.cameras.main.height/2,"PAUSED",{fontSize:28}).setOrigin(.5),t.gameState=t.states.PAUSED):t.gameState===t.states.PAUSED&&(t.gameState=t.previousGameState,t.ball.setVelocity(t.previousBallVelocityX,t.previousBallVelocityY),t.pausedText.destroy())})}},{key:"update",value:function(){this.gameState!==this.states.PAUSED&&(this.cursors.left.isDown?this.paddle.x-this.paddle.width/2>0&&(this.paddle.x-=5,this.paddle.body.updateFromGameObject()):this.cursors.right.isDown&&this.paddle.x+this.paddle.width/2<this.cameras.main.width&&(this.paddle.x+=5,this.paddle.body.updateFromGameObject()),this.gameState==this.states.WAITING&&this.cursors.up.isDown&&(this.gameState=this.states.PLAYING,this.ball.setVelocity(60,-300),this.ballsUsed++,this.scoreBoard.setText("Balls used: ".concat(this.ballsUsed)))),this.gameState==this.states.WAITING&&(this.ball.x=this.paddle.x,this.ball.y=this.paddle.y-this.ball.height,this.ball.setVelocity(0,0)),this.ball.y>this.paddle.y&&(this.gameState=this.states.WAITING)}}]),o}();exports.default=y;
},{"phaser":"E66h","./../assets/sprites.png":"P0Io","./../assets/sprites.json":"CRbR"}],"epB2":[function(require,module,exports) {
"use strict";var e=t(require("phaser")),a=t(require("./scenes/Game"));function t(e){return e&&e.__esModule?e:{default:e}}var r={width:504,height:672,type:e.default.AUTO,physics:{default:"arcade",arcade:{gravity:{y:0},debug:!1}}},d=new e.default.Game(r);d.scene.add("game",a.default),d.scene.start("game");
},{"phaser":"E66h","./scenes/Game":"NiZL"}]},{},["epB2"], null)