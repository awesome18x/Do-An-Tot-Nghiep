import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { AuthService } from '../../views/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {

  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  async logout() {
    await this.authService.logout();
  }
}
