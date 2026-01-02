import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [CommonModule],
})
export class SidebarComponent {
  activeView = input.required<string>();
  viewChange = output<any>();
}
