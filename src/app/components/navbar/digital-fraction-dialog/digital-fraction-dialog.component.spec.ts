import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalFractionDialogComponent } from './digital-fraction-dialog.component';

describe('DigitalFractionDialogComponent', () => {
	let component: DigitalFractionDialogComponent;
	let fixture: ComponentFixture<DigitalFractionDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DigitalFractionDialogComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(DigitalFractionDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
