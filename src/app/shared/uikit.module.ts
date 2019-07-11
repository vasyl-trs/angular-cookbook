import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';

const uiKitModules = [
	CardModule,
	PanelModule,
	ButtonModule,
];

@NgModule({
	imports: uiKitModules,
	exports: uiKitModules,
}) export class UIKitModule {}
