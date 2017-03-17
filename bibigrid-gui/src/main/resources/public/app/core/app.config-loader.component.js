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
        this.masterConfigUrl = "https://raw.githubusercontent.com/bosterholz/bibigrid-gui/master/bibigrid-gui/src/main/resources/public/app/shared/masterConfig.json";
        this.links = [{'name': '', 'description': '', 'link': ""}];
        this.selectedLinks = this.links[0];
    }
    configLoader.prototype.getMasterConfig = function () {
        var _this = this;
        this.server.getConfLinks(this.masterConfigUrl)
            .subscribe(function (conf) { return _this.listFoundConfigs(conf); }, function (error) { return _this.errorMessage = error; });
    };
    configLoader.prototype.getConfig = function () {
        var _this = this;
        this.server.getConfig(this.selectedLinks.link)
            .subscribe(function (conf) {
                return _this.setConfig(conf);
            }, function (error) {
                return _this.errorMessage = error;
            });
    };
    configLoader.prototype.listFoundConfigs = function (configLinks) {
        this.links = configLinks;
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
        this.modal.confirm()
            .size('lg')
            .showClose(false)
            .body("\n            <h2>Select demo</h2>\n            <select [(ngModel)]=\"selectedCity\" (ngModelChange)=\"onChange($event)\" >\n                <option *ngFor=\"let c of cities\" [ngValue]=\"c\"> {{c.name}} </option>\n            </select>\n            ")
            .open();
    };
    configLoader = __decorate([
        core_1.Component({
            selector: 'config-loader',
            template: "\n\n<span defaultOverlayTarget></span>\n\n<button type=\"button\" class=\"btn btn-primary btn-block\" data-toggle=\"modal\" data-target=\"#configModal\" (click)=\"getMasterConfig()\">\n  choose config\n</button>\n\n<div class=\"modal fade\" id=\"configModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"configModalLabel\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h4 class=\"modal-title\" id=\"configModalLabel\">Load predefined configuration</h4>\n      </div>\n        <div class=\"modal-body\">\n            <h2>Select configuration</h2>\n                <select [(ngModel)]=\"selectedLinks\">\n                    <option *ngFor=\"let link of links\" [ngValue]=\"link\"> {{link.name}} </option>\n                </select>\n                {{selectedLinks.description}}\n        </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"getConfig()\">Load configuration</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n",
            providers: [bootstrap_1.Modal]
        }),
        __metadata('design:paramtypes', [app_server_communication_1.ServerCommunication, bootstrap_1.Modal])
    ], configLoader);
    return configLoader;
}());
exports.configLoader = configLoader;
//# sourceMappingURL=app.config-loader.component.js.map