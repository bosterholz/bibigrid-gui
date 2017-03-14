import {Component} from "@angular/core";
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {ServerCommunication} from "../server/app.server-communication";
import {presetFlag} from '../shared/presetFlag';

@Component({
    selector: 'config-loader',
    template: `

<span defaultOverlayTarget></span>

<button class="btn btn-primary btn-lg btn-block" type="submit" (click)="getConfig()" id="config">
    <span class="glyphicon glyphicon-send" aria-hidden="true"></span> Get Config
</button>

<button class="btn btn-primary btn-lg btn-block" type="submit" (click)="chooseConfig()" id="cconfig">
    <span class="glyphicon glyphicon-send" aria-hidden="true"></span> Choose Config
</button>

`,
    providers: [Modal]
})

export class configLoader {

    errorMessage: string;
    private masterConfigUrl: string = "https://raw.githubusercontent.com/bosterholz/bibigrid-gui/master/bibigrid-gui/src/main/resources/public/app/shared/config.json";


    constructor(private server: ServerCommunication, public modal: Modal) {
    }

    getConfig() {

        this.server.getConfig(this.masterConfigUrl)
            .subscribe(
                conf => this.setConfig(conf),
                error => this.errorMessage = <any>error);
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

        this.modal.alert()
            .size('lg')
            .showClose(false)
            .body(`
            <div class="dropdown">
            <button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown trigger
            <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dLabel">
                <li><a href="#">Test1</a></li>
                <li><a href="#">Test2</a></li>
                <li><a href="#">Test3</a></li>
            </ul>
            </div>  
             
            <select>
                <option>Test</option>
                <option>Test2</option>
            </select>
            `)
            .open();
    }
}