import { Component, ChangeDetectionStrategy, signal, computed, effect, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeroComponent } from './components/hero/hero.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CheckFitComponent } from './components/check-fit/check-fit.component';
import { HistoryComponent } from './components/history/history.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { FooterComponent } from './components/footer/footer.component';
import { Users, UserData, ScanHistory } from './app.types';

type ActiveView = 'hero' | 'dashboard' | 'check-fit' | 'history' | 'pricing' | 'feedback';
type Theme = 'light' | 'dark';
type ActiveUser = 'user1' | 'user2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    HeroComponent,
    DashboardComponent,
    CheckFitComponent,
    HistoryComponent,
    PricingComponent,
    FeedbackComponent,
    FooterComponent
  ],
})
export class AppComponent {
  isAuthenticated = signal(false);
  activeView = signal<ActiveView>('hero');
  theme = signal<Theme>(this.getInitialTheme());
  activeUser = signal<ActiveUser>('user1');

  users = signal<Users>({
    user1: {
      name: 'Alex',
      avatar: `https://i.pravatar.cc/150?u=alex`,
      lastTopSize: 'M',
      lastBottomSize: 'L',
      history: [
        { id: 1, date: '2024-07-20', predictions: { bust: '38in', waist: '32in', hips: '40in', topSize: 'M', bottomSize: 'L' } },
        { id: 2, date: '2024-06-15', predictions: { bust: '37.5in', waist: '31.5in', hips: '39.5in', topSize: 'M', bottomSize: 'M' } },
      ]
    },
    user2: {
      name: 'Jordan',
      avatar: `https://i.pravatar.cc/150?u=jordan`,
      lastTopSize: 'S',
      lastBottomSize: 'S',
      history: [
        { id: 1, date: '2024-07-18', predictions: { bust: '34in', waist: '28in', hips: '36in', topSize: 'S', bottomSize: 'S' } }
      ]
    }
  });

  currentUserData = computed<UserData>(() => this.users()[this.activeUser()]);

  constructor(private renderer: Renderer2, private el: ElementRef) {
    effect(() => {
      const currentTheme = this.theme();
      if (currentTheme === 'dark') {
        this.renderer.addClass(document.documentElement, 'dark');
      } else {
        this.renderer.removeClass(document.documentElement, 'dark');
      }
      localStorage.setItem('smartfit-theme', currentTheme);
    });
  }

  private getInitialTheme(): Theme {
    if (typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('smartfit-theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
    }
    return 'light';
  }

  handleLogin(provider: 'google' | 'apple' | 'guest') {
    this.isAuthenticated.set(true);
    this.activeView.set('dashboard');
  }

  handleLogout() {
    this.isAuthenticated.set(false);
    this.activeView.set('hero');
  }

  handleViewChange(view: ActiveView) {
    this.activeView.set(view);
  }

  handleThemeToggle() {
    this.theme.update(current => (current === 'light' ? 'dark' : 'light'));
  }

  handleUserSwitch(user: ActiveUser) {
    this.activeUser.set(user);
  }
  
  handleScanSaved(newScan: ScanHistory) {
    this.users.update(users => {
      const updatedUser = {
        ...users[this.activeUser()],
        history: [newScan, ...users[this.activeUser()].history],
        lastTopSize: newScan.predictions.topSize,
        lastBottomSize: newScan.predictions.bottomSize,
      };
      return { ...users, [this.activeUser()]: updatedUser };
    });
    this.activeView.set('history');
  }
}
