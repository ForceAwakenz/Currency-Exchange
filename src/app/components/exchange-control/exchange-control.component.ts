import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CurrencyType } from '@src/app/shared/services/models/responses';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'exr-exchange-control',
	standalone: true,
	imports: [CommonModule, MatInputModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
	templateUrl: './exchange-control.component.html',
	styleUrl: './exchange-control.component.scss',
})
export class ExchangeControlComponent {
	@Input() label?: string;
	@Input() currencies: CurrencyType[] = [];

	@Output() formUpdated = new EventEmitter<any>();
}
