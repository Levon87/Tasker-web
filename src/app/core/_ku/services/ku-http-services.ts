import { InboundRequestEmpty, InboundRequest } from './../ku_models/api/system.entites';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpKuUtilsService } from '../utils/http-ku-utils.service';
import { KuRequest } from '../ku_config/ku-request';
import { KuConfig } from '../ku_config/ku-config';
// import { QueryParamsModel } from '../models/query-models/query-params.model';


// Real REST API
@Injectable()
export class KuHttpService {
	public progress: number;
	public message: string;

	constructor(
		private http: HttpClient,
		private httpUtils: HttpKuUtilsService,
	) {}

	operateFile(url): Observable<File> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body: InboundRequestEmpty = {data: {}};
		console.log(body);
		return this.http.post<File>(`${KuConfig.ApiUrl}/${url}`, body, { headers: httpHeaders });
	}

	operateGet<Tout>(url): Observable<KuRequest<Tout>> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.get<Tout>(`${KuConfig.ApiUrl}/${url}`, { headers: httpHeaders });
	}

	operateGetFile<Tout>(url): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.get<Tout>(url, { headers: httpHeaders });
	}

	operate<Tout>(url): Observable<KuRequest<Tout>> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body: InboundRequestEmpty = {data: {}};
		console.log('BODY', body);
		return this.http.post<KuRequest<Tout>>(`${KuConfig.ApiUrl}/${url}`, body, { headers: httpHeaders });
	}

	/*
	*
	* @param body
	* @param url
	* @param - Tout - 1
	* @param - Tbody - 2
	*/
	operateWithBody<Tout, Tbody>(body: Tbody, url): Observable<DtoResultRequest<Tout>> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const item: InboundRequest<Tbody> = { data: body };
		const endPointUrl = `${KuConfig.ApiUrl}/${url}`;

		console.log(item);
		console.log(endPointUrl);
		console.log('There is edit');

		const result = this.http.post<DtoResultRequest<Tout>>(endPointUrl, item, { headers: httpHeaders });

		console.log(result);
		return result;
	}

	operateWithMultipart<Tout, Tbody>(body: Tbody, url): Observable<Tout> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		console.log(body);
		console.log(httpHeaders);
		return this.http.post<Tout>(`${KuConfig.ApiUrl}/${url}`, body, { headers: httpHeaders });
	}

	upload(item, url) {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		console.log('sadas', item);
		return this.http.post(`${KuConfig.ApiUrl}/${url}`, item, {
			headers: httpHeaders,
			reportProgress: true,
			observe: 'events'
		  })
			.subscribe(event => {
			  console.log(event); // handle event here
			});
	}

	// uploadFiles(files, url) {
	// 	if (files.length === 0) {
	// 		return;
	// 		  }

	// 	const httpHeaders = this.httpUtils.getHTTPHeaders();
	// 	const formData = new FormData();

	// 	for (const file of files) {
	// 	formData.append(file.name, file);
	// 	}


	// 	const uploadReq = new HttpRequest('POST', `${KuConfig.ApiUrl}/${url}`, formData, {
	// 		headers: httpHeaders,
	// 	});

	// 	return this.http.request<IImg[]>(uploadReq);

	// }
}

export class DtoResultRequest<T> {
	data: T;
}
