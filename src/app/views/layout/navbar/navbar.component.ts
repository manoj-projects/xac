import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
// import { SCHOOLMENU, STAFFMENU, MODELSCHOOLMENU, DATAENTRYMENU } from './menu';
import { MenuItem } from './menu.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserSessionService } from 'src/app/services/usersession.service';
import { Idle } from '@ng-idle/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  menuItems: MenuItem[] = [];
  instDistrict: any;
  userType: any;
  userName: any;
  schoolName: any;
  userTypeId: any;
  teacherType: any;
  isHide: boolean = false;
  SCHOOLMENU: any[] = [];

  DIETMENU: any[] = [];
  STAFFMENU: any[] = [];
  CEOMENU: any[] = [];
  MODELSCHOOLMENU: any[] = [];
  DATAENTRYMENU: any[] = [];
  DCGCCMENU: any[]=[];
  schooltypeId: any;
  cateType: any;
  catty_id: any;
  isSubMenuHide: boolean = false;
  ADMINMENU: any[] = [];
  BEOMENU: any[] = [];
  DEOMENU: any[] = [];
  DEEADMIN: any[] = [];
  DSEADMIN: any[] = [];
  AEOMENU: any[] = [];
  MONITOR: any[] = []
  userTypeId1: any;
  VIEWMENU: any[] = [];
  JUNIORASSITANT: { label: string; isMegaMenu: boolean; subMenus: { subMenuItems: { label: string; link: string; }[]; }[]; }[];
  PATOCEO: { label: string; isMegaMenu: boolean; subMenus: { subMenuItems: { label: string; link: string; }[]; }[]; }[];
  SUPERINTENDENT: { label: string; isMegaMenu: boolean; subMenus: { subMenuItems: { label: string; link: string; }[]; }[]; }[];
  SCERTMENU: MenuItem[];
  JDMENU: ({ label: string; link: string; isMegaMenu?: undefined; subMenus?: undefined; } | { label: string; isMegaMenu: boolean; subMenus: { subMenuItems: { label: string; link: string; }[]; }[]; link?: undefined; })[];
  KALLARMENU: ({ label: string; link: string; isMegaMenu?: undefined; subMenus?: undefined; } | { label: string; isMegaMenu: boolean; subMenus: { subMenuItems: { label: string; link: string; }[]; }[]; link?: undefined; })[];
  AEEOMENU: MenuItem[];
  APOMENU: MenuItem[];

  /**
   * Fixed header menu on scroll
   */
  @HostListener('window:scroll', ['$event']) getScrollHeight() {
    if (window.matchMedia('(min-width: 992px)').matches) {
      let header: HTMLElement = document.querySelector(
        '.horizontal-menu'
      ) as HTMLElement;
      if (window.pageYOffset >= 60) {
        header.parentElement!.classList.add('fixed-on-scroll');
      } else {
        header.parentElement!.classList.remove('fixed-on-scroll');
      }
    }
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private idle: Idle,
    private authService: AuthenticationService,
    private navigationService: NavigationService,
    private userSessionService: UserSessionService
  ) {
    this.schoolName = this.userSessionService.schoolName();
    this.userName = this.userSessionService.userName();
    this.userType = this.userSessionService.userType();
    this.instDistrict = this.userSessionService.eduDistName();
    this.userTypeId = this.userSessionService.userTypeId();
    this.userTypeId1 = this.userSessionService.emisUsertype1();
    this.schooltypeId = this.userSessionService.schoolTypeId();
    this.cateType = this.userSessionService.cateType();
    this.catty_id = this.userSessionService.catty_id();
  }

  ngOnInit(): void {


    this.ADMINMENU = [
      // {
      //   label: 'Dashboard',
      //   link: '/counselling/dashboard',
      // },
      {
        label: 'Area Dashboard',
        link: '/floody/area-dashboard'
      }
        ]

      this.menuItems = this.ADMINMENU

    var pathName = window.location.pathname;
    var check = false;
    if (pathName == '/reset-password' || pathName == '/counselling/dee' ||
     pathName == '/counselling/plan-new-counselling' || pathName == '/counselling/order-copy-details' || pathName == '/counselling/vacancies-challenge' ||
     pathName == '/counselling/vacancy-update' ||  pathName == '/counselling/vacancy-update-aided-sch' || pathName == '/auth/order-copy-pdf' || pathName == '/counselling/seniority-approval' ||
     pathName == '/counselling/promotion-candidate' || pathName == '/counselling/teacherview-pdf' || pathName == '/counselling/counselling-reset') {
      check=true;
    } else {
      this.menuItems.map((res1) => {
        if (pathName == res1.link) {
          check = true;
        }
        if (res1.subMenus) {
          res1.subMenus.map((res2) => {
            res2.subMenuItems.map((res3) => {
              if (pathName == res3.link) {
                check = true;
              }
              if (
                  pathName.includes('/order-copy-pdf') ||
                  pathName.includes('/counselling/teacherview-pdf') || 
                  pathName.includes('/counselling/seniority-order') || 
                  pathName.includes('/counselling/seniority-type') || 
                  pathName.includes('/counselling/seniority-excel-upload') 
              ) {
                check = true;
              }
            });
          });
        }
      });
    }
    if (!check) {
      this.onLogout();
    }
    /**
     * closing the header menu after route change in tablet/mobile devices
     */
    if (window.matchMedia('(max-width: 991px)').matches) {
      this.router.events.forEach((event) => {
        if (event instanceof NavigationEnd) {
          document
            .querySelector('.horizontal-menu .bottom-navbar')!
            .classList.remove('header-toggled');
        }
      });
    }
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */

  hasItems(item: MenuItem) {
    return item.subMenus !== undefined ? item.subMenus.length > 0 : false;
  }

  /**
   * Logout
   */
  onLogout() {
    // e.preventDefault();
    // localStorage.removeItem('isLoggedin');

    // if (!localStorage.getItem('isLoggedin')) {
    //   this.router.navigate(['/auth/login']);
    // }
    this.idle.stop();
    var path = this.userSessionService.localStorageSessionKey;
    localStorage.removeItem(path);
    this.authService.logOut();
    this.navigationService.goToLogin();
    localStorage.clear();
  }
  onResetPassword() {
    this.router.navigate(['/reset-password']);
  }
  // refreshHome() {
  //   if (window.location.pathname == '/dashboard') {
  //     window.location.reload();
  //   }
  // }

  /**
   * Toggle header menu in tablet/mobile devices
   */
  toggleHeaderMenu() {
    document
      .querySelector('.horizontal-menu .bottom-navbar')!
      .classList.toggle('header-toggled');
  }
  ToggleNavBar() {
    let element: HTMLElement = document.getElementsByClassName(
      'navbar-toggler'
    )[0] as HTMLElement;
    if (element.getAttribute('aria-expanded') == 'true') {
      element.click();
    }
  }
  handleHoverHide(){
    this.toggleHeaderMenu()
  }
  menuMouseEnter(){
    this.isHide = false
  }

}
