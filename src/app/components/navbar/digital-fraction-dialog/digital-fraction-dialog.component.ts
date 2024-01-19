import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
	MAT_DIALOG_DATA,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
	selector: 'exr-digital-fraction-dialog',
	standalone: true,
	imports: [
		FormsModule,
		MatFormFieldModule,
		MatDialogClose,
		MatSelectModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatButtonModule,
	],
	templateUrl: './digital-fraction-dialog.component.html',
	styleUrl: './digital-fraction-dialog.component.scss',
})
export class DigitalFractionDialogComponent {
	constructor(
		protected dialogRef: MatDialogRef<DigitalFractionDialogComponent>,
		@Inject(MAT_DIALOG_DATA) protected data: { decimalsNumber: number }
	) {}

	onCancel(): void {
		this.dialogRef.close();
	}
}
