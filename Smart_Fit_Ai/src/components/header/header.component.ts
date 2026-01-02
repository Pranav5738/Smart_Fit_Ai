import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserData } from '../../app.types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [CommonModule],
})
export class HeaderComponent {
  isAuthenticated = input.required<boolean>();
  theme = input.required<'light' | 'dark'>();
  activeUser = input.required<'user1' | 'user2'>();
  currentUserData = input.required<UserData>();
  
  themeToggle = output<void>();
  userSwitch = output<'user1' | 'user2'>();
  logout = output<void>();
  viewChange = output<any>();

  isProfileOpen = false;

  toggleProfileDropdown() {
    this.isProfileOpen = !this.isProfileOpen;
  }
  
  onUserSwitch(user: 'user1' | 'user2') {
    this.userSwitch.emit(user);
    this.isProfileOpen = false;
  }
}
