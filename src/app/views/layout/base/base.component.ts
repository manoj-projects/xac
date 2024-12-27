import { Component, OnInit } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserSessionService } from 'src/app/services/usersession.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  isLoading: boolean;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  displayModal: boolean;

  constructor(private router: Router,
    private idle: Idle,
    private userSessionService:UserSessionService,
    private authService:AuthenticationService) { 

    // Spinner for lazyload modules
    router.events.forEach((event) => { 
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }
    });

    idle.setIdle(1800);
    // sets a timeout period of 1800 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(10);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle';
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.onLogout();
      this.displayModal=false;
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = "You've gone idle!";
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState =  countdown.toString();
      this.displayModal=true;
    });

    // sets the ping interval to 15 seconds
    // keepalive.interval(15);

    // keepalive.onPing.subscribe(() => (this.lastPing = new Date()));
    if (window.location.pathname.includes('/auth/login')) {
      idle.stop();
    } else {
      idle.watch();
      this.timedOut = false;
    }

    
  }

  ngOnInit(): void {
  }
  reset() {
    this.idle.watch();
    //xthis.idleState = 'Started.';
    this.timedOut = false;
  }
  onLogout() {
    this.idle.stop();
    var path = this.userSessionService.localStorageSessionKey;
    localStorage.removeItem(path);
    this.authService.logOut();
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

}
