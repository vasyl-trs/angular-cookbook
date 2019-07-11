import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIKitModule } from './uikit.module';

@NgModule({
	imports: [CommonModule, UIKitModule],
	exports: [CommonModule, UIKitModule],
}) export class SharedModule {}
