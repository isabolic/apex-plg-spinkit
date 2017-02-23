/**
 * [created by isabolic sabolic.ivan@gmail.com]
 */


// namespace
(function(){
   if(window.apex.plugins === undefined){
      window.apex.plugins = {};
   }
}());

(function($, x) {
    var options = {
        spinnerClass : "sk-rotating-plane",
        parent: "body",
        overlay: true,
        autoShow: false,
        delayHide: 1000,
        listenToApexRegEvents: true
    }

    var type = {
        "sk-rotating-plane" : {
            "element": "<div class='spinKit sk-rotating-plane'></div>"
        },
        "sk-fading-circle"  : {
            "element" : "<div class='spinKit sk-fading-circle'>"          +
                            "<div class='sk-circle1 sk-circle'></div>"    +
                            "<div class='sk-circle2 sk-circle'></div>"    +
                            "<div class='sk-circle3 sk-circle'></div>"    +
                            "<div class='sk-circle4 sk-circle'></div>"    +
                            "<div class='sk-circle5 sk-circle'></div>"    +
                            "<div class='sk-circle6 sk-circle'></div>"    +
                            "<div class='sk-circle7 sk-circle'></div>"    +
                            "<div class='sk-circle8 sk-circle'></div>"    +
                            "<div class='sk-circle9 sk-circle'></div>"    +
                            "<div class='sk-circle10 sk-circle'></div>"   +
                            "<div class='sk-circle11 sk-circle'></div>"   +
                            "<div class='sk-circle12 sk-circle'></div>"   +
                        "</div>"
        },
         "sk-folding-cube"    : {
            "element": "<div class='spinKit sk-folding-cube'>"      +
                            "<div class='sk-cube1 sk-cube'></div>"  +
                            "<div class='sk-cube2 sk-cube'></div>"  +
                            "<div class='sk-cube4 sk-cube'></div>"  +
                            "<div class='sk-cube3 sk-cube'></div>"  +
                        "</div>"
        },
        "sk-double-bounce" : {
            "element":  "<div class='spinKit sk-double-bounce'>"           +
                          "<div class='sk-child sk-double-bounce1'></div>" +
                          "<div class='sk-child sk-double-bounce2'></div>" +
                        "</div>"
        },
        "sk-wave" : {
            "element" : "<div class='spinKit sk-wave'>"          +
                          "<div class='sk-rect sk-rect1'></div>" +
                          "<div class='sk-rect sk-rect2'></div>" +
                          "<div class='sk-rect sk-rect3'></div>" +
                          "<div class='sk-rect sk-rect4'></div>" +
                          "<div class='sk-rect sk-rect5'></div>" +
                        "</div>"
        },
        "sk-wandering-cubes" : {
          "element" : "<div class='spinKit sk-wandering-cubes'>" +
                        "<div class='sk-cube sk-cube1'></div>"   +
                        "<div class='sk-cube sk-cube2'></div>"   +
                      "</div>"
        },
        "sk-spinner-pulse" : {
          "element" : "<div class='spinKit sk-spinner sk-spinner-pulse'></div>"
        },
        "sk-chasing-dots" : {
          "element" : "<div class='spinKit sk-chasing-dots'>"  +
                        "<div class='sk-child sk-dot1'></div>" +
                        "<div class='sk-child sk-dot2'></div>" +
                      "</div>"
        },
        "sk-three-bounce" : {
          "element": "<div class='spinKit sk-three-bounce'>"       +
                        "<div class='sk-child sk-bounce1'></div>"  +
                        "<div class='sk-child sk-bounce2'></div>"  +
                        "<div class='sk-child sk-bounce3'></div>"  +
                      "</div>"
        },
        "sk-circle" : {
          "element": "<div class='spinKit sk-circle'>"             +
                        "<div class='sk-circle1 sk-child'></div>"  +
                        "<div class='sk-circle2 sk-child'></div>"  +
                        "<div class='sk-circle3 sk-child'></div>"  +
                        "<div class='sk-circle4 sk-child'></div>"  +
                        "<div class='sk-circle5 sk-child'></div>"  +
                        "<div class='sk-circle6 sk-child'></div>"  +
                        "<div class='sk-circle7 sk-child'></div>"  +
                        "<div class='sk-circle8 sk-child'></div>"  +
                        "<div class='sk-circle9 sk-child'></div>"  +
                        "<div class='sk-circle10 sk-child'></div>" +
                        "<div class='sk-circle11 sk-child'></div>" +
                        "<div class='sk-circle12 sk-child'></div>" +
                      "</div>"
        },
        "sk-cube-grid" : {
          "element": "<div class='spinKit sk-cube-grid'>"       +
                        "<div class='sk-cube sk-cube1'></div>"  +
                        "<div class='sk-cube sk-cube2'></div>"  +
                        "<div class='sk-cube sk-cube3'></div>"  +
                        "<div class='sk-cube sk-cube4'></div>"  +
                        "<div class='sk-cube sk-cube5'></div>"  +
                        "<div class='sk-cube sk-cube6'></div>"  +
                        "<div class='sk-cube sk-cube7'></div>"  +
                        "<div class='sk-cube sk-cube8'></div>"  +
                        "<div class='sk-cube sk-cube9'></div>"  +
                      "</div>"
        }
    }


    /**
     * [xDebug - PRIVATE function for debug]
     * @param  string   functionName  caller function
     * @param  array    params        caller arguments
     */
    var xDebug = function xDebug(functionName, params){
        x.debug(this.jsName || " - " || functionName, params, this);
    };

    /**
     * [triggerEvent     - PRIVATE handler fn - trigger apex events]
     * @param String evt - apex event name to trigger
     */
    var triggerEvent = function triggerEvent(evt, evtData) {
        xDebug.call(this, arguments.callee.name, arguments);
        this.container.trigger(evt, [evtData]);
        $(this).trigger(evt + "." + this.apexname, [evtData]);
    };

    var  browserSupportsCSSProperty = function browserSupportsCSSProperty(propertyName) {
        xDebug.call(this, arguments.callee.name, arguments);
        var elm = document.createElement('div');
        propertyName = propertyName.toLowerCase();

        if (elm.style[propertyName] != undefined){
           return true;
        }

        var propertyNameCapital = propertyName.charAt(0).toUpperCase() + propertyName.substr(1),
        domPrefixes = 'Webkit Moz ms O'.split(' ');

        for (var i = 0; i < domPrefixes.length; i++) {
           if (elm.style[domPrefixes[i] + propertyNameCapital] != undefined){
              return true;
           }
        }

        return false;
    }

    setPosition = function setPosition(){
        xDebug.call(this, arguments.callee.name, arguments);

        if(this.container.is("body")){
           this.container
               .find(".spinKit")
               .css({
                      "top":  (($(window).height() - this.spinner.outerHeight()) / 2) - 40,
                      "left": (($(window).width()  - this.spinner.outerWidth() ) / 2) - 20
                    }
                );
        } else {
           this.container
               .find(".spinKit")
               .addClass("element");
        }
        this.isRendered = true;
    }

    /**
     * [intervalFlag call passed function repeatedly "fnIntervat", stop only when flagForClear is set to true ]
     * @param  {[type]} fnIntervat   [function for repeatedly call]
     * @param  {[type]} flagForClear [key prop. on this scope]
     * @param  {[type]} timer        [timer, def. 200]
     */
    var intervalFlag = function (fnIntervat, flagForClear, timer){
      var interval;

      xDebug.call(this, arguments.callee.name, arguments);

      interval = setInterval(function(){
                    fnIntervat.call(this);

                    if (this[flagForClear]){
                      clearInterval(interval);
                    }
                  }.bind(this), (timer || 200));
    }

    applyOverlay = function applyOverlay(){
      var overlay = $("<div>",{"class":"spinKit-overlay"});

      xDebug.call(this, arguments.callee.name, arguments);

      if (this.container.is("body") === false){
          overlay.addClass("element");
      }

      if (this.options.autoShow === false){
          overlay.css({"display":"none"});
      }

      this.container
          .append(overlay);

      return overlay;
    }

    setUp = function setUp(){
        xDebug.call(this, arguments.callee.name, arguments);

        this.options.parent = $(this.options.parent);

        if ( browserSupportsCSSProperty.call(this, "animation") === false ) {
            console.warn("this browser doesn't support css animation");
            return;
        }

        this.container = $("<div>",{"class":"spinKit-container"});

        this.options
            .parent
            .append(this.container);

        this.type = type[this.options.spinnerClass];

        if (this.options.overlay === true) {
            this.overlay = applyOverlay.call(this);
        }

        if (this.overlay !== null){
            this.overlay.append(this.type.element);
        }else{
            this.container.append(this.type.element);
        }

        this.spinner =
            this.container
                .find(".spinKit")
                .addClass(this.options.spinnerClass);

        if ($.isEmptyObject(this.type.style) === false) {
          this.spinner.css(this.type.style);

          if (this.type.childClass !== undefined){
              this.spinner
                  .find("." + this.type.childClass)
                  .css(this.type.style);
          }
        }

        setPosition.call(this);

        // reg. resize event
        $(window).resize(function(){

              this.isRendered = false;

              intervalFlag.call(
                  this, setPosition, "isRendered", 500
              );

        }.bind(this));

        this.options.parent.data("spinKit", this);
    }

    apex.plugins.spinKit = function (opts){
        this.options     = {};
        this.parent      = null;
        this.spinner     = null;
        this.overlay     = null;
        this.isRendered  = false;
        this.type        = {};
        this.$container  =  null;
        this.init = function(){

            xDebug.call(this, arguments.callee.name, arguments);

            if ($.isPlainObject(opts)) {
                this.options = $.extend(true, {}, options, opts);
            } else {
                throw this.jsName || ": Invalid options passed.";
            }

            setUp.call(this);

            if (this.options.listenToApexRegEvents === true){
               this.options.parent.on("apexbeforerefresh", this.hideShow.bind(this, true ));
               this.options.parent.on("apexafterrefresh",  this.hideShow.bind(this, false));
            }

            return this;
        }

        return this.init();
    }

    apex.plugins.spinKit.prototype = {
       hideShow: function hideShow (show, autoHideTimer){
          var el = this.overlay || this.container.find(".spinKit");

          if (show === true){
            el.show();
          } else {
            el.delay(this.options.delayHide).hide(0);
          }

          if($.isNumeric(autoHideTimer) === true){
            el.delay(autoHideTimer).hide(0);
          }
       },

       changeType : function (spinnerClass){
          var defType = type[spinnerClass];

          if (defType !== undefined){
              this.options.spinnerClass = spinnerClass;
              this.container.find(".spinKit").remove()
              setUp.call(this);
          }
       },

       destoy: function destoy(){
          this.container.remove();
          this.options.parent.off("apexbeforerefresh", this.hideShow.bind(this, true ));
          this.options.parent.off("apexafterrefresh" , this.hideShow.bind(this, false));
          $.removeData(this.options.parent, "spinKit");
          delete this;
       }
    };

})(apex.jQuery, apex);



