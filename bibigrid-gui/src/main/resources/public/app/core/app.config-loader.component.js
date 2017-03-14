"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var bootstrap_1 = require('angular2-modal/plugins/bootstrap');
var app_server_communication_1 = require("../server/app.server-communication");
var configLoader = (function () {
    function configLoader(server, modal) {
        this.server = server;
        this.modal = modal;
        this.masterConfigUrl = "https://raw.githubusercontent.com/bosterholz/bibigrid-gui/master/bibigrid-gui/src/main/resources/public/app/shared/config.json";
    }
    configLoader.prototype.getConfig = function () {
        var _this = this;
        this.server.getConfig(this.masterConfigUrl)
            .subscribe(function (conf) { return _this.setConfig(conf); }, function (error) { return _this.errorMessage = error; });
    };
    configLoader.prototype.setConfig = function (config) {
        var error = false;
        for (var _i = 0, config_1 = config; _i < config_1.length; _i++) {
            var flag = config_1[_i];
            if (document.getElementById(flag.sFlag)) {
                switch (document.getElementById(flag.sFlag).type) {
                    case "checkbox":
                        document.getElementById(flag.sFlag).checked = (flag.value == "true");
                        break;
                    default:
                        document.getElementById(flag.sFlag).value = flag.value;
                        break;
                }
            }
            else {
                error = true;
            }
        }
        if (error) {
            this.modal.alert()
                .size('lg')
                .showClose(false)
                .body("\n            <b>Configuration file invalide:</b>\n            <br>\n            Some flags defined by the configuration file you are loading, are missing in BiBiGrid.\n            Either your configuration file is outdated/falty or your BiBiGrid version is too old.\n            Missing flags are skipped. The program may not function properly.   \n            ")
                .open();
        }
    };
    configLoader.prototype.chooseConfig = function () {
        this.modal.alert()
            .size('lg')
            .showClose(false)
            .body("\n            <div class=\"dropdown\">\n            <button id=\"dLabel\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n            Dropdown trigger\n            <span class=\"caret\"></span>\n            </button>\n            <ul class=\"dropdown-menu\" aria-labelledby=\"dLabel\">\n                <li><a href=\"#\">Test1</a></li>\n                <li><a href=\"#\">Test2</a></li>\n                <li><a href=\"#\">Test3</a></li>\n            </ul>\n            </div>  \n             \n            <select>\n                <option>Test</option>\n                <option>Test2</option>\n            </select>\n            ")
            .open();
    };
    configLoader = __decorate([
        core_1.Component({
            selector: 'config-loader',
            template: "\n\n<span defaultOverlayTarget></span>\n\n<button class=\"btn btn-primary btn-lg btn-block\" type=\"submit\" (click)=\"getConfig()\" id=\"config\">\n    <span class=\"glyphicon glyphicon-send\" aria-hidden=\"true\"></span> Get Config\n</button>\n\n<button class=\"btn btn-primary btn-lg btn-block\" type=\"submit\" (click)=\"chooseConfig()\" id=\"cconfig\">\n    <span class=\"glyphicon glyphicon-send\" aria-hidden=\"true\"></span> Choose Config\n</button>\n\n",
            providers: [bootstrap_1.Modal]
        }), 
        __metadata('design:paramtypes', [app_server_communication_1.ServerCommunication, bootstrap_1.Modal])
    ], configLoader);
    return configLoader;
}());
exports.configLoader = configLoader;
//# sourceMappingURL=app.config-loader.component.js.map