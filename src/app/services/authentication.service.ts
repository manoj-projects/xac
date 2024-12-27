import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserSessionService } from './usersession.service';
import { DataService } from '../services/data.service'
import { UserSession } from '../core/models/usersession'


import jwtDecode from 'jwt-decode';
import * as momenttz from 'moment-timezone';
import * as _ from 'lodash';

// import 'rxjs/add/operator/map';
import { map } from 'rxjs';
import { CommonService } from './common.service';
// import { debug } from 'util';
declare var require: any;
const timezone = require('src/assets/timezones.json');

@Injectable()
export class AuthenticationService {

  private loginbaseUrl = environment.loginApiBaseUrl;
  private baseUrl = environment.apiBaseUrl;
  timeZones: any[];
  sessionData = new UserSession();
  schoolName: string;
  schoolTypeId: string;
  districtId: string;
  cateType:string;
  edn_dist_name: any;
  teacherId:any;
  CattyID:any;
  rowData: any;
  SelectedCounselling: any;

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private commonService: CommonService,
    private sessionService: UserSessionService) {
    this.getTimeZones();
  }

  School_Registration_API(data:any,refresh:any){
     
    return this.dataService.post('/api/schlReg',data);
  }

  elogin(username: string, password: string, cnType: number) {
    // const data = 'emis_username=' + username + 'emis_password=' + password;
 const data =   {"records":{"emis_username": username,"emis_password": password, "IsCnsl": cnType
}}
 
    return this.http.post<any>(this.loginbaseUrl, data)
    .pipe(map(user => {
        if (user && user.dataStatus) {
          localStorage.setItem('token',user.records.token);
          // let test = user.records.token;
          // var decode = this.commonService.assignLetters(test)
          const decodedToken:any = jwtDecode(user.records.token);

          // const decodedToken:any = jwtDecode(decode);
           
          this.sessionData.schoolName = decodedToken['school_name'];
          this.sessionData.cate_id = decodedToken['cate_id'];
          this.sessionData.manage_id = decodedToken['manage_id'];

          this.sessionData.teacherName = decodedToken['teacher_name']
          this.sessionData.schoolId = decodedToken['school_id'];
          this.sessionData.schoolKeyId = decodedToken['school_key_id'];
          this.sessionData.edu_dist_name = decodedToken['edu_dist_name'];
          this.sessionData.userId = decodedToken['emis_user_id'];
          this.sessionData.username = decodedToken['emis_username'];
          this.sessionData.edn_dist_name = decodedToken['edn_dist_name'];
          this.sessionData.edu_district_id = decodedToken['edu_district_id'];
          this.sessionData.usertype = decodedToken['user_type'];
          this.sessionData.usertypeid = decodedToken['emis_usertype'];
          this.sessionData.schoolTypeId = decodedToken['school_type_id'];
          this.sessionData.lowClass = decodedToken['low_class'];
          this.sessionData.highClass = decodedToken['high_class'];
          this.sessionData.emisUsertype1 = decodedToken['emis_usertype1'];
          this.sessionData.districtId = decodedToken['district_id'];
          this.sessionData.districtName = decodedToken['district_name'];
          this.sessionData.blockId = decodedToken['block_id'];
          this.sessionData.blockName = decodedToken['block_name'];
          this.sessionData.cateType = decodedToken['cate_type'];
          this.sessionData.teacherId = decodedToken['teacher_id'];
          this.sessionData.catty_id = decodedToken['catty_id'];
          this.sessionData.subjects = decodedToken['subjects'];
          this.sessionData.teacherType = decodedToken['teacher_type'];
          this.sessionData.udise_code = decodedToken['udise_code'];


          if(decodedToken['emis_usertype'] == 5 ||  decodedToken['emis_usertype'] == 6 || decodedToken['emis_usertype'] == 9 || decodedToken['emis_usertype'] == 10 || decodedToken['emis_usertype'] == 22){
          this.sessionData.offKeyId = decodedToken['off_key_id']; localStorage.setItem('officeKeyID', decodedToken['off_key_id']);
           
        }
          this.schoolTypeId = decodedToken['school_type_id'];
          this.edn_dist_name = decodedToken['edn_dist_name'];
          this.districtId = decodedToken['district_id'];
          this.CattyID = decodedToken['catty_id'];
          // localStorage.setItem('edn_dist_name', this.edn_dist_name);
          // localStorage.setItem('schoolTypeId', this.schoolTypeId);
          // localStorage.setItem('districtId', this.districtId);
          // localStorage.setItem('emisUserType', this.schoolTypeId);
          // localStorage.setItem('CattyId', this.CattyID);
          //localStorage.setItem('teacherId', this.teacherId);
          this.sessionData.authToken = user.records.token;
          this.sessionService.create(this.sessionData);

        }
        return user;
      }));
  }
  forgotPassword(data:any)
  {
    
    return this.dataService.post('/api/FrgtPswTrkCUD',data);
  }

  getEmail(data:any)
  {
     
    return this.dataService.post('/api/auth/userDetails',data);
  }
  getSelectEmail1(data:any)
  {
    return this.dataService.post('/api/auth/mailDetails',data);
  }
  getSelectEmail2(data:any    )
  {
    return this.dataService.post('/api/auth/mailDetails',data);
  }


  isAuthenticated() {
     
    return (this.sessionService.userTypeId() != 17) && !!this.sessionService.authToken();
  }

  //studentlist for ceo
  sample()
  {
    //  const usertype =  this.sessionData.usertypeid;
    // console.log(usertype);
     
    return (this.sessionService.userTypeId() != 9) && !!this.sessionService.authToken();
  }

  getTimeZones() {
    this.timeZones = timezone.timeZone;
  }

  getBrowserTimeZone(): string {
    const zoneName = momenttz.tz.guess();
    const temptimezone = momenttz.tz(zoneName).zoneAbbr();
    const filterZone = this.timeZones.find(i => i.abbr === temptimezone);
    if (filterZone) {
      return filterZone.value;
    }
    return '';
  }

  clearCachedMenu() {
    this.dataService.clearCache();
  }

  clearSession() {
    this.sessionService.destroy();
    this.clearCachedMenu();
  }

  logOut() {
    this.clearCachedMenu();
    this.sessionService.destroy();
  }

  rowDataVal(rowdata){
    this.rowData = rowdata
 }
 getRowDataVal(){
   return this.rowData
 }
 counsellingData(val){
   this.SelectedCounselling = val
 }
 getCounsellingData(){
   return this.SelectedCounselling
 }
 
}
