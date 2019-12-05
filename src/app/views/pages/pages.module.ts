import { TestComponent } from './test/test.component';
import { ExampleService } from './../../core/_ku/services/example.service';
import { HttpKuUtilsService } from './../../core/_ku/utils/http-ku-utils.service';
// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';
import { MyPageComponent } from './my-page/my-page.component';
import { KuHttpService } from '../../core/_ku/services/ku-http-services';

@NgModule({
	declarations: [
		MyPageComponent,
		TestComponent
	],
	exports: [],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		CoreModule,
		PartialsModule,
	],
	providers: [
		ExampleService,
		HttpKuUtilsService,
		KuHttpService
	]
})
export class PagesModule {
}
