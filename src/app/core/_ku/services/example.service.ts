import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, subscribeOn } from 'rxjs/operators';
import { KuHttpService } from './ku-http-services';

@Injectable()
export class ExampleService {
	constructor(private kuService: KuHttpService) {}

	// public getFeeForServicesList(taskId: string): Observable<DtoFeeForServiceList> {
	// 	return this.kuService
	// 	.operate<DtoFeeForServiceList>(KuConfig.GetFeeForServicesList + '/' + taskId).pipe(map(res => res.data));
	// }

	// public createFeeForServiceItem(data: DtoCreateFeeForServiceItem): Observable<DtoCreateFeeForServiceItem> {
	// 	return this.kuService
	// 	.operateWithBody<DtoCreateFeeForServiceItem, DtoCreateFeeForServiceItem>(
	// 		data,
	// 		KuConfig.CreateFeeForServiceItem
	// 	)
	// 	.pipe(map(res => res.data));
	// }

	// public getReportXML(key: string): Observable<any> {
	// 	return this.kuService
	// 	.operateGet<any>(KuConfig.GetReportXML + '/' + key + '.xml').pipe(map(res => res.data));
	// }

	// public PrepareReport(key: string): Observable<any> {
	// 	return this.kuService
	// 	.operateGetFile<any>('https://prod-snet-report-api.azurewebsites.net/api/ku/prepare-template?key=' + key).pipe();
	// }

	// public uploadFiles(data: FormData) {
	// 	return this.kuService.operateWithMultipart(data, KuConfig.UploadFiles);
	// }
}
