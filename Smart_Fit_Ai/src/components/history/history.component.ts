import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanHistory } from '../../app.types';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  imports: [CommonModule],
})
export class HistoryComponent {
  history = input.required<ScanHistory[]>();
}
