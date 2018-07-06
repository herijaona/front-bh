import { Injectable } from "@angular/core";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
	constructor() {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		let tk = localStorage.getItem("bh-token");
		let my_comp = localStorage.getItem("my_company");
		let headR = {};

		if (my_comp) {
			headR["X-Ccompany-Id"] = my_comp;
		}
		if (tk) {
			headR["Authorization"] = `Bearer ${tk}`;
		}
		request = request.clone({
			setHeaders: headR
		});
		return next.handle(request);
	}
}
