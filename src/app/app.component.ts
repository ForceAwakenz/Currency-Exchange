import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ExchangeControlComponent } from '@app/components/exchange-control/exchange-control.component';
import { ApiService } from './shared/services/api.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, ExchangeControlComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
	protected currencies!: any;
	private apiService = inject(ApiService);
	ngOnInit(): void {
		this.currencies = this.apiService.getAllRates();
	}
}
