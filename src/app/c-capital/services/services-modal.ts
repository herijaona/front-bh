import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class ServicesModal {
    private items = new BehaviorSubject<any>(Boolean);
    _item = this.items.asObservable();

    guardFiltre(value: Boolean) {
        this.items.next(value);
    }
}