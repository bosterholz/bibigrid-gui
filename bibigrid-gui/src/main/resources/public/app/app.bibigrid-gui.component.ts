import {Component, OnInit, AfterViewChecked} from "@angular/core";
import {ServerCommunication} from "./server/app.server-communication";
import {Observable}     from 'rxjs/Observable';
import {BiBiGridGuiNavbar} from './core/app.bibigrid-gui.navbar';
import {SafeHtml} from "./shared/app.insert-html.pipe";
import {welcomePage} from './welcome_page/app.welcome-page.component';
import {mainPage} from "./core/app.main.component"


import {Flag} from './shared/flag';


@Component({
    selector: 'bibigui',
    template: `
<welcome *ngIf="seeit"></welcome>
<mainpage *ngIf="!seeit"></mainpage>
<button class="btn btn-primary btn-lg btn-block" type="submit" (click)="setSwitch()" id="switch">
Switch
</button>
<!--<navbar ></navbar>-->

`,
    providers: [ServerCommunication, BiBiGridGuiNavbar]
})

export class BiBiGridGui implements OnInit,AfterViewChecked {

    seeit:boolean = false;

    ngOnInit() {
    }

    ngAfterViewChecked() {
    }

    setSwitch(): void {
        this.seeit = !this.seeit;
    }

    constructor(private server: ServerCommunication) {
    }
}

