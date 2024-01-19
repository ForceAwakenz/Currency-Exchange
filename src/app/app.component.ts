/* eslint-disable curly */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversionComponent } from './components/conversion/conversion.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, NavbarComponent, ConversionComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
