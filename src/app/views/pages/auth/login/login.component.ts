import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserSessionService } from 'src/app/services/usersession.service';
import { AlertService } from 'src/app/services/alert.service';
import { DashboardService } from '../../dashboard/dashboard.service';
import { Idle } from '@ng-idle/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  returnUrl: any;
  loginForm: FormGroup;
  forgetForm: FormGroup;
  emisUserType: any;
  teacherType: any;
  districtId: any;
  IsShow: boolean = true;
  ToDdayDate: Date;
  minDate: Date;
  showLoginForm: boolean = true;
  showForgetForm: boolean;
  stateOptions: any[];
  value1: string = '';
  hideUserNM: boolean = false;
  digitlength11 = "^[0-9]{11,11}$";
  digitlength8 = "^[0-9]{8,8}$";
  hidedigit11: boolean = false;
  hidedigit8: boolean = false;
  successHide: boolean = false;
  backtoLogin:boolean = false;
  UserType1: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private idle: Idle,
    private authService: AuthenticationService,
    private userSessionService: UserSessionService,
    private dashboardService: DashboardService
  ) {
    this.stateOptions = [
      { label: 'School', value: '1' },
      { label: 'Teacher', value: '2' },
    ];
  }

  ngOnInit(): void {
    this.onLogout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.initializeValidators();
    this.ToDdayDate = new Date();

    this.minDate = new Date(
      this.ToDdayDate.getFullYear(),
      this.ToDdayDate.getMonth(),
      this.ToDdayDate.getDate() - 1
    );
  }

  initializeValidators() {
    this.loginForm = new FormGroup({
      userName: new FormControl('33020700907', [Validators.required]),
      password: new FormControl('test@123', [Validators.required]),
    });
    this.forgetForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      userType: new FormControl('', [Validators.required]),
    });
  }

  validateFormControl() {
    Object.keys(this.loginForm.controls).forEach((field) => {
      const control = this.loginForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true,
        });
      }
    });
  }
  validateFormControl1() {
    Object.keys(this.forgetForm.controls).forEach((field) => {
      const control = this.forgetForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true,
        });
      }
    });
  }
  onLoggedin(e: Event) {
    if (this.loginForm.valid) {
      e.preventDefault();
      localStorage.setItem('isLoggedin', 'true');
      if (localStorage.getItem('isLoggedin')) {
        this.router.navigate([this.returnUrl]);
      }
    } else {
      this.validateFormControl();
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService
        .elogin(this.loginForm.value.userName, this.loginForm.value.password, 1)
        .subscribe((data) => {
          if (data.dataStatus) {
            this.emisUserType = this.userSessionService.userTypeId();
            this.teacherType = this.userSessionService.teacherType();
            this.UserType1 = this.userSessionService.emisUsertype1();
            
            
            // if (
            //   (this.emisUserType == 14 && this.teacherType != 103) ||
            //   this.emisUserType == 8 ||
            //   this.emisUserType == 1 ||
            //   this.emisUserType == 22 ||
            //   this.emisUserType == 0 ||
            //   this.emisUserType == 31
            // ) {
            //   if (this.emisUserType == 14 || this.emisUserType == 8) {
            //     this.router.navigate(['/staff/staff-profile']);
            //   } else if (this.emisUserType == 22) {
            //     // this.router.navigate(['/regulatory-compliance'])
            //     this.router.navigate(['/diet/add-videomaping']);
            //   } else if (this.emisUserType == 31) {
            //     this.router.navigate(['/staff/create-questions']);
            //   } else {
            //     this.districtId = localStorage.districtId;
            //     this.router.navigate([this.returnUrl]);
            //   }
            // } else if (this.emisUserType == 28) {
            //   this.router.navigate(['/dashboard']);
            // } else if (this.emisUserType == 30) {
            //   this.router.navigate(['/dashboard']);
            // } else {
            //   this.onLogout();
            //   this.alertService.error(
            //     'Please login from "tnemis.tnschools.gov.in" '
            //   );
            // }

            // if(this.emisUserType == '9' || this.emisUserType == '6' || this.emisUserType == '10'){
            //   this.router.navigate(['/counselling/dashboard']);
            // } else if(this.emisUserType == '30' || this.emisUserType == '41' || this.emisUserType == '63'){
            //   this.router.navigate(['/counselling/aided-sch-approval']);
            // } else if(this.emisUserType == '5' && this.UserType1 == '5'){
            //   this.router.navigate(['/counselling/counseling-reset']);
            // } else if((this.emisUserType == 22) || (this.emisUserType == 5 && this.UserType1 == 7)){
            //   this.router.navigate(['/counselling/teacher-transfer']);
            // } else if(this.emisUserType == 5 && this.UserType1 == 6){
            //   this.router.navigate(['/counselling/plan-new-counselling']);
            // } else{
            //       this.router.navigate(['/counselling/dashboard']);
            //       // this.router.navigate([this.returnUrl]);
            // }
                  this.router.navigate(['/floody/flood-dashboard']);

          } else {
            this.alertService.error(data.message);
          }
        });
    } else {
      this.validateFormControl();
    }
  }
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
    localStorage.clear();
  }

  onForget() {
    this.showLoginForm = false;
    this.showForgetForm = true;
    this.backtoLogin = true;
  }
  onLoginPage(){
    // this.showLoginForm = true;
    // this.showForgetForm = false;
    window.location.reload();
  }
  showLogin() {
    if (this.forgetForm.valid) {
      var records={
        "records":
          {
            "IndexId": "",
            "UserType": this.forgetForm.value.userType,
            "UserId": this.forgetForm.value.userName,
            "Name": "",
            "Ref": "",
            "Email": "",
            "ApproveStatus": "",
            "ApproverUsername": "",
            "RejectRsn": ""  
          }
      }
      this.authService.forgotPassword(records).subscribe((data) => {
        this.alertService.success('Successfully Submitted');
        this.successHide = true;
        this.showForgetForm = false;
      });
    } else {
      this.validateFormControl1();
    }
  }

  eyeClick() {
    this.IsShow = !this.IsShow;
  }
  PrivacyPolicy() {
    this.router.navigate([]).then((result) => {
      window.open('/auth/privacy_policy', '_blank');
    });
  }
  eGovernment() {
    this.router.navigate([]).then((result) => {
      window.open('/auth/eGovernment/IT', '_blank');
    });
  }
  downloadMyFile() {
    var fileName = 'EMIS_TN_Sheet.pdf';
    var bucketName = 'renewalapplicationemis';
    if (fileName) {
      let expiry: number = 1800;
      this.dashboardService
        .getUploadedFiles(bucketName, fileName, expiry)
        .subscribe((res) => {
          if (res) {
            window.open(res.url, '_blank');
          } else {
            this.alertService.error('No files are Found');
          }
        });
    } else {
      this.alertService.error('No files are Found');
    }
  }

  userTypeChange(event){
    this.backtoLogin = false;
    if(event != null){
      this.hideUserNM = true;
    }
    if(event == 1){
      this.hidedigit11 = true;
      this.hidedigit8 = false;
      this.forgetForm = new FormGroup({
        userName: new FormControl('', [Validators.required, Validators.pattern(this.digitlength11)]),
        userType: new FormControl(event, [Validators.required]),
      });
    }
    else{
      this.hidedigit11 = false;
      this.hidedigit8 = true;
      this.forgetForm = new FormGroup({
        userName: new FormControl('', [Validators.required, Validators.pattern(this.digitlength8)]),
        userType: new FormControl(event, [Validators.required]),
      });
    }
  }
}
