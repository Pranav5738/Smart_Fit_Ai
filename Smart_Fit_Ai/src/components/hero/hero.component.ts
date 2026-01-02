import { Component, ChangeDetectionStrategy, output } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  login = output<'google' | 'apple' | 'guest'>();
}
