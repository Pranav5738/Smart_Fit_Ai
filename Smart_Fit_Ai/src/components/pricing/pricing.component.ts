import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingPlan } from '../../app.types';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  imports: [CommonModule],
})
export class PricingComponent {
  plans = signal<PricingPlan[]>([
    {
      name: 'Free',
      price: '$0',
      pricePeriod: '/month',
      features: ['5 scans per month', 'Basic size prediction', 'No history saving'],
      isPopular: false,
    },
    {
      name: 'Pro',
      price: '$9.99',
      pricePeriod: '/month',
      features: ['Unlimited scans', 'Advanced AI prediction', 'Save scan history', 'Multi-user support'],
      isPopular: true,
    },
    {
      name: 'Premium',
      price: '$19.99',
      pricePeriod: '/month',
      features: ['All Pro features', 'Posture analysis', 'Priority support', 'Early access to new features'],
      isPopular: false,
    },
  ]);
}
