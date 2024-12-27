import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserSessionService} from '../../../services/usersession.service';
import {ResetPasswordService} from './reset-password.service';
import {AlertService} from '../../../services/alert.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  passwordform: FormGroup;
  Submitted: boolean = false;
  
  constructor(private fb: FormBuilder, private userSessionService: UserSessionService,
              public resetpassword: ResetPasswordService, private alertService: AlertService ) { }

  ngOnInit() {
    // this.initialValidator();
    this.passwordform = this.fb.group({
      old_password: new FormControl('', [Validators.required]),
      new_one_password:new FormControl('',[Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,15}$")]),
      new_password: new FormControl('',[Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,15}$")]),
    });
  }

  save() {
    this.Submitted = true
    console.log(this.passwordform.value.new_one_password)
    console.log(this.passwordform.value.old_password)
    if(this.passwordform.valid){
        if (this.passwordform.value.new_one_password == this.passwordform.value.old_password) {
        this.alertService.error('New Password could not be same old password');
      } else {
        if (this.passwordform.value.new_one_password === this.passwordform.value.new_password) {
          const oldpassword = this.passwordform.value.old_password,
            newpassword = this.passwordform.value.new_password ;
          const data = {old_password : oldpassword, new_password : newpassword};
          this.resetpassword.resetPasswordAPI(data, true).subscribe((res) => {
            if (res.dataStatus) {
              this.alertService.success('Password Updated Successfully');
              setTimeout(()=>{
                window.location.reload();
              },1000);
            } else {
              this.alertService.error(res.message);
            }
          });
        } else {
          this.alertService.error('New Password and Confirm password missmatched');
        }
      }
}
  }
}
