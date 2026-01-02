import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackReview } from '../../app.types';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  imports: [CommonModule],
})
export class FeedbackComponent {
  reviews = signal<FeedbackReview[]>([
    {
      name: 'Sarah D.',
      avatar: `https://i.pravatar.cc/150?u=sarah`,
      rating: 5,
      message: 'Perfect fit prediction! This app is a game-changer for online shopping. No more returns!'
    },
    {
      name: 'Mike R.',
      avatar: `https://i.pravatar.cc/150?u=mike`,
      rating: 5,
      message: 'Incredibly accurate and easy to use. The multi-user feature is fantastic for me and my partner.'
    },
    {
      name: 'Jessica L.',
      avatar: `https://i.pravatar.cc/150?u=jessica`,
      rating: 4,
      message: 'Really impressed with the technology. A few more brands would make it perfect. Keep up the great work!'
    },
    {
      name: 'David C.',
      avatar: `https://i.pravatar.cc/150?u=david`,
      rating: 5,
      message: 'Saves me so much time. I just scan and I know my size instantly. Highly recommend!'
    },
  ]);

  feedbackSubmitted = signal(false);

  submitFeedback(event: Event) {
    event.preventDefault();
    this.feedbackSubmitted.set(true);
  }
}
