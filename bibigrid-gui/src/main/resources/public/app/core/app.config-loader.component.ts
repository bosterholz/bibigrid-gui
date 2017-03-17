import {Component} from "@angular/core";
import {FormsModule} from '@angular/forms';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {ServerCommunication} from "../server/app.server-communication";
import {presetFlag} from '../shared/presetFlag';

@Component({
    selector: 'config-loader',
    template: `

<span defaultOverlayTarget></span>

<button type="button" class="btn btn-primary btn-block" data-toggle="modal" data-target="#configModal" (click)="getMasterConfig()">
  choose config
</button>

<div class="modal fade" id="configModal" tabindex="-1" role="dialog" aria-labelledby="configModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="configModalLabel">Load predefined configuration</h4>
      </div>
        <div class="modal-body">
            <h2>Select configuration</h2>
                <select [(ngModel)]="selectedCity">
                    <option *ngFor="let c of cities" [ngValue]="c"> {{c.sFlag}} </option>
                </select>
                {{selectedCity.value}}
        </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

`,
    providers: [Modal]
})

export class configLoader {

    errorMessage: string;
    private masterConfigUrl: string = "https://raw.githubusercontent.com/bosterholz/bibigrid-gui/master/bibigrid-gui/src/main/resources/public/app/shared/masterConfig.json";
    cities = [{'sFlag': 'SF', 'value': 'SF'}];
    selectedCity = this.cities[0];

    constructor(private server: ServerCommunication, public modal: Modal) {
    }

    getMasterConfig() {

        this.server.getConfig(this.masterConfigUrl)
            .subscribe(
                conf => this.listFoundConfigs(conf),
                error => this.errorMessage = <any>error);
    }

    listFoundConfigs(configLinks: presetFlag[]) {
        this.cities = configLinks;
    }

    setConfig(config: presetFlag[]) { // Alle Felder vorher löschen, damit nur die Config übernommen wird
        let error: boolean = false;

        for (let flag of config) {
            if ((<HTMLInputElement>document.getElementById(flag.sFlag))) {
                switch ((<HTMLInputElement>document.getElementById(flag.sFlag)).type) {
                    case "checkbox":
                        (<HTMLInputElement>document.getElementById(flag.sFlag)).checked = (flag.value == "true");
                        break;
                    default:
                        (<HTMLInputElement>document.getElementById(flag.sFlag)).value = flag.value;
                        break;
                }
            } else {
                error = true;
            }
        }

        if (error) {
            this.modal.alert()
                .size('lg')
                .showClose(false)
                .body(`
            <b>Configuration file invalide:</b>
            <br>
            Some flags defined by the configuration file you are loading, are missing in BiBiGrid.
            Either your configuration file is outdated/falty or your BiBiGrid version is too old.
            Missing flags are skipped. The program may not function properly.   
            `)
                .open();
        }
    }

    chooseConfig() {

        this.modal.confirm()
            .size('lg')
            .showClose(false)
            .body(`
            <h2>Select demo</h2>
            <select [(ngModel)]="selectedCity" (ngModelChange)="onChange($event)" >
                <option *ngFor="let c of cities" [ngValue]="c"> {{c.name}} </option>
            </select>
            `)
            .open();
    }
}