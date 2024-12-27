import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/app/services/usersession.service';
import { DashboardService } from './dashboard.service';
import * as bootstrap from 'bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as echarts from 'echarts';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  preserveWhitespaces: true,
})
export class DashboardComponent implements OnInit {
  studentClassColumns: any;
  studentCommunityColumns: any;
  teacherTypeColumns: any;
  teacherDesignation: any;
  studentVisible: boolean = true;
  teacherVisible: boolean = false;
  inboxVisible: boolean = false;
  dashboardVisible: boolean = false;
  first = 0;
  studentCountList: any[] = [];
  teacherTypeCountList: any[] = [];
  teacherDesignationCountList: any[] = [];
  month: number;
  date: any;
  monthNme: string;
  inboxtextMsg: boolean = false;
  todayQuotes: any;
  data: any;

  schoolUdiseCode: any;
  schoolId: any;
  userTypeId: any;

  dashboardData: any;
  overAllStudents: any;
  overAllStudentsTotal: any;
  overAllStudentsTotalBoys: any;
  overAllStudentsTotalGirls: any;
  overAllStaffTotal: any;
  overAllStaffTotalGents: any;
  overAllStaffTotalLadies: any;
  studentCount: any;
  staffCount: any;
  displayModal: boolean = false;
  tablelist: any;
  mailSubject: any;
  mailSender: any;
  mailContent: any;
  attachFile: any;
  mailReceiveDate: any;
  eventModal: boolean = false;
  addEventForm: FormGroup;
  todaySpl: any;
  todayQuotesAuthor: any;
  teacherBirthdayList: any[] = [];
  stuBirthdayList: any[] = [];
  teacherBirthCount: number = 0;
  stuBirthCount: number = 0;
  stdCoummunity: any;
  mailCount: number=0;
  readMailCount: number=0;
  unReadMailCount: number=0;

  constructor(
    private dashboardService: DashboardService,
    private usersessionService: UserSessionService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private datepipe: DatePipe
  ) {
    this.schoolUdiseCode = this.usersessionService.userName();
    this.schoolId = this.usersessionService.schoolId();
    this.userTypeId = this.usersessionService.userTypeId();
  }

  ngOnInit(): void {
    // this.getSpecialDay();
    this.getDay();
    // this.getBirthday();
    this.getMonthName(this.month);
    this.getDashBoardData();
    // this.getTodayQuotes();
    this.getcommlist();
    this.studentClassColumns = [
      { field: 'class', header: 'Class' },
      { field: 'section', header: 'Section' },
      { field: 'boys', header: 'Boys' },
      { field: 'girls', header: 'Girls' },
      { field: 'total', header: 'Total' },
    ];
    this.studentCommunityColumns=[
      {field: 'communtiy', header: 'Community'},
      {field: 'total', header:'Total'}
    ];

    this.teacherTypeColumns = [
      { field: 'body_type', header: 'Type' },
      { field: 'male', header: 'Male' },
      { field: 'female', header: 'Female' },
      { field: 'total', header: 'Total' },
    ];

    this.teacherDesignation = [
      { field: 'body_type', header: 'Designation' },
      { field: 'male', header: 'Male' },
      { field: 'female', header: 'Female' },
      { field: 'total', header: 'Total' },
    ];

    this.dashboardVisible = false;
    this.addEventForm = this.fb.group({
      venue: new FormControl(''),
      time: new FormControl(''),
      conductedBy: new FormControl(''),
      topics: new FormControl(''),
    });
    // this.pieChart()
  }
  // pieChart(){
  //   var myChart = echarts.init(document.getElementById('piChart'));
  //   // Draw the chart
  //   var option = {
  //     series: [
  //       {
  //         type: 'pie',
  //         data: [
  //           {
  //             value: 335,
  //             name: 'Direct Visit'
  //           },
  //           {
  //             value: 234,
  //             name: 'Union Ad'
  //           },
  //           {
  //             value: 1548,
  //             name: 'Search Engine'
  //           }
  //         ]
  //       }
  //     ]
  //   };
  //   myChart.setOption(option);
  // }
  stuToggle = true;
  teacherToggle = false;
  inboxToggle = false;

  showEvents() {
    this.studentVisible = true;
    this.teacherVisible = false;
    this.inboxVisible = false;
    this.inboxtextMsg = false;
    this.stuToggle = true;
    this.teacherToggle = false;
    this.inboxToggle = false;
    this.dashboardVisible = false;
  }

  showStudentDashboard() {
    this.studentVisible = true;
    this.teacherVisible = false;
    this.inboxVisible = false;
    this.inboxtextMsg = false;
    this.stuToggle = true;
    this.teacherToggle = false;
    this.inboxToggle = false;
    this.dashboardVisible = false;
  }
  showTeacherDashboard() {
    this.studentVisible = false;
    this.teacherVisible = true;
    this.inboxVisible = false;
    this.inboxtextMsg = false;
    this.stuToggle = false;
    this.teacherToggle = true;
    this.inboxToggle = false;
    this.dashboardVisible = false;
  }
  showInboxDashboard() {
    this.studentVisible = false;
    this.teacherVisible = false;
    this.inboxVisible = true;
    this.inboxtextMsg = false;
    this.stuToggle = false;
    this.teacherToggle = false;
    this.inboxToggle = true;
    this.dashboardVisible = false;
    // this.getcommlist();
  }
  getSpecialDay() {
    this.dashboardService.getSpecialDay().subscribe((res) => {
      var date = this.datepipe.transform(Date(), 'dd-MM-yyyy');
      if (res) {
        for (let i = 0; i < res.length; i++) {
          if (res[i].Date == date) {
            this.todaySpl = res[i].Special;
          }
        }
      }
    });
  }
  getDay() {
    var day = new Date();
    var date = day.getDate();
    this.month = day.getMonth() + 1;
    this.date = date;
    this.date = String(this.date);
    if (this.date.length == 1) {
      this.date = '0' + this.date;
    }
  }
  getMonthName(month: number) {
    const d = new Date();
    d.setMonth(month - 1);
    const monthName = d.toLocaleString('default', { month: 'short' });
    this.monthNme = monthName.toUpperCase();
  }
  getTodayQuotes() {
    this.dashboardService.getQuotes().subscribe((res) => {
      var date = this.datepipe.transform(Date(), 'dd-MM-yyyy');
      if (res) {
        for (let i = 0; i < res.length; i++) {
          if (res[i].Date == date) {
            this.todayQuotes = res[i].Quote;
            this.todayQuotesAuthor = res[i].Written_by;
          }
        }
      }
    });
  }
  getBirthday() {
    this.dashboardService
      .getDashboardBirthday(this.schoolId)
      .subscribe((res) => {
        if (res.dataStatus) {
          for (let i = 0; i < res.result.length; i++) {
            if (res.result[i].type == '1') {
              this.teacherBirthdayList.push(res.result[i]);
              this.teacherBirthCount += 1;
            } else if (res.result[i].type == '2') {
              this.stuBirthdayList.push(res.result[i]);
              this.stuBirthCount += 1;
            }
          }
        }
      });
  }
  showBirthdayModal() {
    if (!this.displayModal) {
      this.displayModal = true;
    } else {
      this.displayModal = false;
    }
  }
  inboxMsg(data) {
    this.dashboardVisible = false;
    this.studentVisible = false;
    this.teacherVisible = false;
    this.inboxVisible = false;
    this.inboxtextMsg = true;
    this.dashboardService.Getsclcommlistbyid(data.IndexId).subscribe((res) => {
      this.mailContent = res.result[0].Message;
      this.mailSender = res.result[0].FUsrType;
      this.mailSubject = res.result[0].Title;
      this.mailReceiveDate = res.result[0].CommDate;
      this.getUploadedFiles(res.result[0].File);
    });
  }
  getUploadedFiles(filename) {
    var bucketName = 'renewalapplicationemis';
    var filename = filename;
    let expiry: number = 1800;
    this.dashboardService
      .getUploadedFiles(bucketName, filename, expiry)
      .subscribe((result) => {
        if (result) {
          this.attachFile = result.url;
          // this.messageService.add({severity:'success', summary: 'File Uploaded Successfully', detail:''});
        } else {
          // this.messageService.add({severity:'warn', summary: 'Error in Uploading File please try again', detail:''});
        }
      });
  }
  showAttachments() {
    if (this.attachFile) {
      window.open(this.attachFile, '_blank');
    } else {
      this.alertService.error('No Files To View');
    }
  }
  getDashBoardData() {
    this.data = {
      records: {
        school_udise_code: this.schoolUdiseCode,
        user_id: this.schoolId,
        school_id: this.schoolId,
        user_type_id: this.userTypeId,
      },
    };
    this.dashboardService.getDashboardData(this.data, true).subscribe((res) => {
      if (res) {
        this.dashboardData = res.result;
        this.stdCoummunity=[
          {communtiy:'BC' ,total: this.dashboardData.student_castwise['bc'] ? this.dashboardData.student_castwise['bc'] : '0'},
          {communtiy:'DNC' ,total: this.dashboardData.student_castwise['dnc'] ? this.dashboardData.student_castwise['dnc'] : '0'},
          {communtiy:'MBC' ,total: this.dashboardData.student_castwise['mbc'] ? this.dashboardData.student_castwise['mbc'] : '0'},
          {communtiy:'OC' ,total: this.dashboardData.student_castwise['oc'] ? this.dashboardData.student_castwise['oc'] : '0'},
          {communtiy:'SC' ,total: this.dashboardData.student_castwise['sc'] ? this.dashboardData.student_castwise['sc'] : '0'},
          {communtiy:'ST' ,total: this.dashboardData.student_castwise['st'] ? this.dashboardData.student_castwise['st'] : '0'}
        ];
        this.overAllStudents =
          this.dashboardData.overall_schools_students['total'];
        // this.overAllStudentsTotal = this.dashboardData['overall_schools_students']['total'];
        this.overAllStudentsTotalBoys =
          this.dashboardData.overall_schools_students['total_boys'];
        this.overAllStudentsTotalGirls =
          this.dashboardData.overall_schools_students['total_girls'];

        var totalStaff = 0;
        var totalMaleStaff = 0;
        var totalFemaleStaff = 0;
        this.dashboardData.categorized_staff_details.map((x: any) => {
          if (
            x['body_type'] == 'Teaching' ||
            x['body_type'] == 'Non Teaching'
          ) {
            totalStaff += x['total'];
            totalMaleStaff += parseInt(x['male']);
            totalFemaleStaff += parseInt(x['female']);
          }
        });
        this.overAllStaffTotal = totalStaff;
        this.overAllStaffTotalGents = totalMaleStaff;
        this.overAllStaffTotalLadies = totalFemaleStaff;

        this.teacherTypeCountList =
          this.dashboardData.categorized_staff_details.filter((x: any) => {
            if (
              x['body_type'] == 'Teaching' ||
              x['body_type'] == 'Non Teaching'
            ) {
              return x;
            }
          });
        this.teacherDesignationCountList =
          this.dashboardData.categorized_staff_details.filter((x: any) => {
            if (
              x['body_type'] == 'Teaching' ||
              x['body_type'] == 'Non Teaching'
            ) {
            } else {
              return x;
            }
          });
        this.studentCountList =
          this.dashboardData.categorized_classwise_count.map((x: any) => {
            return x;
          });
      }
      this.staffCount = res.result.categorized_staff_details;
      this.staffCount.splice(2);
    });
  }
  getcommlist() {
    this.dashboardService
      .Getsclcommlist(this.schoolId, this.userTypeId)
      .subscribe((res) => {
        if(res.result){
        this.mailCount=res.result.length;
        this.tablelist = res.result;
        res.result.map(x=>{
          if(x.ViewSatus=='1'){
            this.readMailCount++;
          }
          else{
            this.unReadMailCount++;
          }
        })
      }
      });
  }
  addEvent() {
    this.eventModal = true;
  }
}
