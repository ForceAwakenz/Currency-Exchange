import { Component, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
	selector: 'exr-exchange-control',
	standalone: true,
	imports: [MatInputModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
	templateUrl: './exchange-control.component.html',
	styleUrl: './exchange-control.component.scss',
})
export class ExchangeControlComponent {
	@Input() label?: string;
	currencies = [
		{
			value: 'usd',
			viewValue: 'USD',
		},
		{
			value: 'eur',
			viewValue: 'EUR',
		},
		{
			value: 'uah',
			viewValue: 'UAH',
		},
	];
}
