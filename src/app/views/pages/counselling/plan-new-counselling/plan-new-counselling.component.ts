import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { CounsellingService } from '../counselling.service';
import { AlertService } from 'src/app/services/alert.service';
import * as moment from 'moment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// Import common resources.
import * as Generic from '../../../../../assets/js/ckeditor/demos/angular-imports.js';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserSessionService } from 'src/app/services/usersession.service';

@Component({
  selector: 'app-plan-new-counselling',
  templateUrl: './plan-new-counselling.component.html',
  styleUrls: ['./plan-new-counselling.component.scss'],
})
export class PlanNewCounsellingComponent implements OnInit {
  htmlStr: string = '';
  items: MenuItem[];
  counsellingFirstForm: FormGroup;
  OrderTemplate: FormGroup;
  activeIndex: number;
  counsellingTypeList: any[] = [];
  submitted: boolean = false;
  dataHeader: { field: string; header: string; }[];
  selectedColumns: { field: string; header: string; }[];
  staffList: any[] = [];
  CategoryList: any;
  PanelList: any;
  ManagementList: any;
  RuleList: any[];
  dataVacanciesHeader: { field: string; header: string; }[];
  selectedVacanciesColumns: { field: string; header: string; }[];
  firstStepRecords: any;
  StaffTypeList: any[] = [];
  selectedSchCategory: any[] = [];
  selectedSchManage: any[] = [];
  selectedVacancyPanel: any[] = [];
  selectedVacancyCategory: any[] = [];
  selectedVacancyManage: any[] = [];
  selectedSchPanel: any[] = [];
  thirdStepRecords: { Category: any; Management: any; Panel: any; };
  fourthStepRecords: { Category: any; Management: any; Panel: any; };
  SubjectList: any;
  StaffType: any;
  Subject: any;
  selectedCounClmn: { field: string; header: string; }[];
  newPlanCounsellingList: any[] = [

  ];
  IsAddEditPage: boolean = false;
  heading: string;
  RowId: any;
  selectedRule: any[] = [];
  directorateList: { label: string; value: string; }[];
  locationList: { label: string; value: string; }[];
  currentDate: any;
  startStopHeading: string;
  startStopModal: boolean = false;
  stopStartInd: any;
  stopStartVal: any;
  startStopContent: string;
  maxDate: Date;
  current_date: Date;
  minDate: any;
  RcForm: FormGroup;
  uploadUrl: string | ArrayBuffer;
  viewImageModal: boolean;
  photoUrl: any;
  DistrictList: any[] = [];
  BlockList: any[] = [];
  StateList: any[] = [];
  IsShowSubject: boolean = false;
  rcStaffList: any[] = [];
  submitOrder: boolean = false;
  submitRelinguish: boolean = false;
  CounsellingId: any;
  OrderCopyCount: any[] = [];
  IsOrderCount: boolean = true;
  currentTab: any;
  firstTab: boolean = true;
  secondTab: boolean = false;
  orderArray: any[] = [];
  activeIndexId: number = 0;
  StaffDisable: boolean = false;
  Editor = ClassicEditor;
  previewModal: boolean;
  priorityList: { label: string; value: string; }[];
  priority: any = '';
  schType: string;

  @ViewChild("myEditor", { static: false }) myEditor: any;
  public toolbars: Object = {
    toolbar: [
      // 'Imageupload',
      '|', 'heading', '|',
      'alignment', '|',
      , 'MathType', 'ChemType',
      'bold', 'italic', '|',
      'link', '|',
      'outdent', 'indent', '|',
      'bulletedList', 'numberedList', '|',
      'insertTable', '|',
      'blockQuote', '|',
      'undo', 'redo'],
    shouldNotGroupWhenFull: true,
    htmlAllowedTags: ['.*'],
    htmlAllowedAttrs: ['.*'],
  }
  selectedPriorityColumns: any[];
  Level1ApproverList: { label: string; value: string; }[] = [];
  Level1Approver: any;
  Level2Approver: any;
  priorityModal: boolean;
  newPriority: any;
  Level2ApproverList: { label: string; value: string; }[];
  IsSwitch: boolean;
  confirmCategory: any;
  confirmSchCategory: any[]=[];
  confirmSchManage: any[]=[];
  confirmSchPanal: any[]=[];
  selectBtnStr: any;
  archivedList: any[];
  confirmVacCategory: any[]=[];
  confirmVacManage: any[]=[];
  confirmVacPanal: any[]=[];
  directorateLabel: string;
  locationLabel: string;
  counsellingTypeLabel: any;
  Level1ApproverLabel: string;
  Level2ApproverLabel: string;
  vacancyLevelList: { label: string; value: string; }[];
  VacUpdatedBy: any;
  VacUpdatedByLabel: string | { label: string; value: string; }[];
  promotionLabel: any;
  AllPriorityList: { label: string; value: string; }[];
  addedPriorityList: { label: string; value: string; IndexId: string, IsActive:string, PriorityNo: string }[];
  remove: any[]=[];
  locationDisable: boolean;
  staffAddValid: boolean = false;

  ApplicationStatus : boolean;
  VacanyPublish : boolean;
  SeniorityPublish : boolean;
  VacancyChallenge : boolean;
  SeniorityChallenge : boolean;
  PreSelectVacancies : boolean;
  Status : string;
  settingModal: boolean;
  settingRowData: any;
  UpdateCandidate: any;
  VacUptSts: any;
  userType: any;
  userType1: any;
  _selectedCol: any[];

  addedSeniorityList: any[];
  orderList: any;
  order: string;
  allOrderList: any;
  selectedEditRow: any;
  counselling_minority: any;
  vacancy_minority: any;
  isSCERT: boolean = false;
  same_district_sts: any;
  willing_sts: any;
  AllDirectorate: any;

  constructor(
    private counsellingService: CounsellingService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private router: Router,
    private http:HttpClient,
    private userSessionService: UserSessionService
  ) {
    this.activeIndex = 0;
    this.currentDate = new Date()
    this.userType = this.userSessionService.userTypeId();
    this.userType1 = this.userSessionService.emisUsertype1();

    if(this.userType == '5' && this.userType1 == '6'){
      this.isSCERT = true
    } else {
      this.isSCERT = false
    }
  }


  ngOnInit() {
    this.initialValidator();
    this.defaultValues();
    this.GETJSON();
    this.GetAllNewCounselling();
    // this.GetAllRules()
    this.GetPriorityMaster()
  }

  defaultValues() {
    this.items = [{ id: "1", label: 'Date',},
    { id: "2", label: 'Staff Type',},
    { id: "3", label: this.userType == '5' && this.userType1 == '6' ? 'Institution Category' : 'School Category',},
    { id: "4", label: 'Vacancies',
    },
    // {
    //   id: "5",
    //   label: 'Rules',// },
    { id: "5", label: 'Approval',},
    { id: "6", label: 'Priority',
    },
    // {
    //   id: "7",
    //   label: 'RC',// },
    { id: "7", label: 'Order Template',},
    { id: "9", label: 'Seniority Order',},
    { id : "8", label : 'Confirmation',}
    ];

    this.dataHeader = [
      { field: 'sno', header: 'S.No' },
      { field: 'Designation', header: 'Designation' },
      { field: 'Subject', header: 'Subject' },
    ];
    this.selectedColumns = [
      { field: 'DesignationName', header: 'Designation' },
      { field: 'SubjectName', header: 'Subject' },
    ]

    this.selectedCounClmn = [
      { field: 'FromDate', header: 'From - To' },
      // { field: 'ToDate', header: 'To Date' },
      { field: 'Title', header: 'Title' },
      { field: 'Directorate', header: 'Directorate' },
      { field: 'CounsellingType', header: 'Counselling Type' },
    ]

    this.dataVacanciesHeader = [
      { field: 'sno', header: 'S.No' },
      { field: 'Designation', header: 'Designation' },
      { field: 'Subject', header: 'Subject' },
    ];

    this.selectedVacanciesColumns = [
    ]

    this.selectedPriorityColumns = [
    ]

    this.Level1ApproverList = [
      {label:"HM", value:"1"},
    ]

    this.priorityList = []

    this.Level2ApproverList = [
      {label:"BEO", value:"1"},
      {label:"CEO", value:"2"},
      {label:"DEO (Elementary)", value:"3"},
      {label:"DEO (Secondary)", value:"4"},
    ]

    this.vacancyLevelList = [
      {label:"State", value:"1"},
      {label:"CEO", value:"2"},
      {label:"DEO (Elementary)", value:"3"},
      {label:"DEO (Secondary)", value:"4"},
      {label:"BEO", value:"5"},
    ];

    this.directorateList = [
      { label: "DEE", value: "1" },
      { label: "DSE", value: "2" },
      { label: "SAMAGRA SHIKSHA", value: "3", },
      { label: "GCC", value: "4" },
      { label: "SCERT", value: "5", },
      { label: "KALLAR - SCHOOLS", value: "6" },
    ];

    if(this.userType1 == '29'){
      this.locationList = [
        { label: "Within GCC", value: "2" },
      ]
      this.directorateList = [
        { label: "GCC", value: "4" },
      ];
      this.counsellingTypeList = [
        { label: "Deployment", value: '1' },
        { label: "Transfer", value: '2' },
        { label: "Promotion", value: '3' },
        { label: "New Appointment", value: '4' },
        { label: "Mutual Transfer", value: '8' },
      { label: "Unit Transfer", value: '9' }
      ];
      this.vacancyLevelList = [
        {label:"EO-GCC", value:"6"}
      ];
      this.Level2ApproverList = [
        {label:"AEO", value:"5"},  
      ]
      this.schType = '1'
    } else {
       if(this.userType == '5' && this.userType1 == '6') { // SCERT
        this.schType = '1'
        this.directorateList = [
          { label: "SCERT", value: "5", },
        ];
        this.Level1ApproverList = [
          {label:"Deputy Director / DIET Principal", value:"1"},
        ]
        this.Level2ApproverList = [
          {label:"Joint Director", value:"1"},
        ]
        this.vacancyLevelList = [
          {label:"State", value:"1"},
          {label:"DIET Prinicipal", value:"7"},
        ];
        this.locationList = [
          { label: "Within District", value: "2" },
          { label: "Within State", value: "3" }
        ];
        this.counsellingTypeList = [
          { label: "Transfer", value: '2' },
          { label: "Promotion", value: '3' }
        ];
      } else if(this.userType == '5' && this.userType1 == '8') {  // Kallar
        this.directorateList = [
          { label: "KALLAR - SCHOOLS", value: "6" },
        ];
        this.locationList = [
          { label: "Within State", value: "3" }
        ];
        this.Level1ApproverList = [
          {label:"AEO", value:"1"},
        ]
        this.Level2ApproverList = [
          {label:"Joint Director", value:"1"},
        ]
      } else {
        this.directorateList = [
          { label: "DEE", value: "1" },
          { label: "DSE", value: "2" },
          { label: "SAMAGRA SHIKSHA", value: "3", },
        ];
        this.locationList = [
          { label: "Within Block", value: "1" },
          { label: "Within District", value: "2" },
          { label: "Within State", value: "3" }
        ];
        this.counsellingTypeList = [
          { label: "Deployment", value: '1' },
          { label: "Transfer", value: '2' },
          { label: "Promotion", value: '3' },
          { label: "New Appointment", value: '4' },
          { label : "Hill Up", value: '5'},
          { label : "Hill Down", value: '6'},
          { label : "Return To Home Block", value: '7'},
          { label: "Mutual Transfer", value: '8' },
          { label: "Unit Transfer", value: '9' }
        ];
        this.Level1ApproverList = [
          {label:"HM", value:"1"},
        ]
      }
    }

    this._selectedCol = this.selectedCounClmn;
  }

  GETJSON() {
    this.CategoryJson();
    this.ManagementJson();
    this.PanelJson();
    this.StaffTypeJson();
    this.SubjectJson();
    this.DirectorateJson();
  }

  CategoryJson() {
    this.counsellingService.getCategory().subscribe((data) => {
      if(this.userType == '5' && this.userType1 == '6') {
      this.CategoryList = data["SCERTCategory"];
      this.allOrderList = data["ScertSeniorityOrderList"];
      this.orderList = data["ScertSeniorityOrderList"];
      } else {
        this.CategoryList = data["Category"];
        this.allOrderList = data["SeniorityOrderList"];
        this.orderList = data["SeniorityOrderList"];
      }
    });
  }

  DirectorateJson() {
    this.counsellingService.getAllDirectorate().subscribe((data) => {
      this.AllDirectorate = data["AllDirectorateList"];
    });
  }

  ManagementJson() {
    this.counsellingService.getManagement().subscribe((data) => {
      if(this.userType == '5' && this.userType1 == '6') {
        this.ManagementList = data["SCERTManagement"];
      } else if(this.schType == '2'){
        this.ManagementList = data["OfficeManagement"];
      } else {
        this.ManagementList = data["Management"];
      }
    });
  }

  PanelJson() {
    this.counsellingService.getPanel().subscribe((data) => {
      if(this.counsellingFirstForm.value.Directorate == '5'){
      this.PanelList = data["ScertPanel"];
      } else {
      this.PanelList = data["Panel"];
      }
    });
  }

  StaffTypeJson() {
    this.counsellingService.getStaff().subscribe((data) => {
      if(this.userType == '5' && this.userType1 == '6'){
        this.StaffTypeList = data["SCERTStaffType"];
      } else if(this.counsellingFirstForm.value.Directorate == '2') {
        this.StaffTypeList = data["DSEStaffType"];
      }
      else{
        this.StaffTypeList = data["AllStaffType"];
      }
    });
  }


  SubjectJson() {
    this.counsellingService.getSubject().subscribe((data) => {
      this.SubjectList = data["Subject"];
    });
  }

  @Input() get selectedCol(): any[] {
    return this._selectedCol;
  }

  set selectedCol(val: any[]) {
      //restore original order
      this._selectedCol = this.selectedCounClmn.filter((col) => val.includes(col));
  } 

  GetAllNewCounselling() {
//     this.http.get('http://localhost:5000/api/CnslMainPageGetAll').subscribe(data=>{
// console.log(data)
// })
    this.counsellingService.GetNewCounselling().subscribe((res) => {
      if (res.dataStatus) {
        var result;
        if(this.userType == '5' && this.userType1 == '29'){
          result = res.result.filter(x=> x.Directorate == '4');  // GCC LOgin
        } else if(this.userType == '5' && this.userType1 == '6'){ 
          result = res.result.filter(x=> x.Directorate == '5');  // SCERT Login
        } else if(this.userType == '5' && this.userType1 == '8'){ 
          result = res.result.filter(x=> x.Directorate == '6');  // Kallar schools Login
        } else{
          result = res.result.filter(x=> (x.Directorate != '4' && x.Directorate != '5'));
        }

        this.newPlanCounsellingList = result

        for (var i = 0; i < result.length; i++) {
          var counType = this.counsellingTypeList.filter((ct) => ct.value == result[i].CounsellingType)
          this.newPlanCounsellingList[i].CounsellingType = counType.length > 0 ? counType[0].label : result[i].CounsellingType
          var dirct = this.AllDirectorate.filter((ct) => ct.value == result[i].Directorate)
          this.newPlanCounsellingList[i].Directorate = dirct.length > 0 ? dirct[0].label : result[i].Directorate
        }

      this.newPlanCounsellingList = this.newPlanCounsellingList.filter((ftr) => ftr.Status != '3')

      for (let i = 0; i < this.newPlanCounsellingList.length; i++) {
      //  this.newPlanCounsellingList[i].FromDate = moment(this.newPlanCounsellingList[i].FromDate).format("DD-MM-yyyy")
      //  this.newPlanCounsellingList[i].ToDate = moment(this.newPlanCounsellingList[i].ToDate).format("DD-MM-yyyy")
       this.newPlanCounsellingList[i].FromDate = moment(this.newPlanCounsellingList[i].FromDate).format("DD/MM/yyyy") +
       ' - ' + moment(this.newPlanCounsellingList[i].ToDate).format("DD/MM/yyyy")
      }
      this.archivedList = result.filter((ftr) => ftr.Status == '3')
      } else {
        this.alertService.error(res.message)
      }
    });
  }


  // GetAllRules() {
  //   this.counsellingService.getRules().subscribe((res) => {
  //     if (res.dataStatus) {
  //       this.RuleList = res.result
  //     }
  //     else {
  //       this.alertService.error(res.message)
  //     }
  //   });
  // }

  GetPriorityMaster(){
    this.counsellingService.GetPriorityMaster().subscribe((res) => {
      if (res.dataStatus) {
  
        this.priorityList = this.AllPriorityList = res.result.map((mp) => {
          return { label: mp.Priority, value: mp.IndexId}
        })      
      }
      else {
        this.alertService.error(res.message)
      }
    });
  }

  initialValidator() {
    this.counsellingFirstForm = new FormGroup({
      FromDate: new FormControl("", Validators.required),
      ToDate: new FormControl("", Validators.required),
      Title: new FormControl("", Validators.required),
      CounsellingType: new FormControl("", Validators.required),
      Directorate: new FormControl("", Validators.required),
      Location: new FormControl("", Validators.required),
      CandidateUpdatedBy: new FormControl("", Validators.required),
    })

    this.RcForm = this.fb.group({
      Subject: new FormControl("", null),
      RC: this.fb.array([]),
    })

    this.OrderTemplate = new FormGroup({
      IndexId: new FormControl(""),
      Type: new FormControl(""),
      Header: new FormControl("", Validators.required),
      Reference: new FormControl("", Validators.required),
      Reference2: new FormControl("", Validators.required),
      ContentBefore: new FormControl("", Validators.required),
      ContentAfter: new FormControl("", Validators.required),
      CopyTo: new FormControl(""),
      SignAuth: new FormControl("", Validators.required),
    })

  }

  get RC() {
    return this.RcForm.controls["RC"] as FormArray;
  }

  addRcLoop(val) {
    const aryOfObj = this.fb.group({
      DistrictName: val.DisNme,
      RcNo: [val.RcNo],
      OtherNme: [val.OtherNme],
      Sign: [val.signature],
      SignatureKey: [val.signature],
      SignatureURL: [''],
      DistrictId: val.District,
      IndexId: val.IndexId,
    });
    this.RC.push(aryOfObj);
  }

  handleAddNewCoun() {
    this.heading = "Add New Counselling";
    this.IsAddEditPage = true;
    this.activeIndex = 0
    this.counsellingFirstForm.reset();
    this.staffList = [];
    this.selectedSchCategory = [];
    if(this.userType1 == 29){
      this.selectedSchManage = ['2'];
      this.selectedVacancyManage = ['2'];
    }
    else{
      this.selectedSchManage = [];
      this.selectedVacancyManage = [];
    }
    this.selectedSchPanel = this.selectedVacancyCategory =  this.selectedVacancyPanel = this.confirmSchManage = this.confirmSchCategory = 
    this.confirmSchPanal = this.confirmVacCategory = this.confirmVacManage = this.confirmVacPanal = []
    this.OrderTemplate.reset();
    this.StaffDisable = false
    this.addedPriorityList = [{label:"", value:"", IndexId:"", IsActive:"", PriorityNo:""}];
    this.addedSeniorityList = [{label:"", value:"", OrderKey:""}];
    this.handleStaffType()
    this.VacUpdatedBy = this.Level1Approver = this.Level2Approver = this.CounsellingId = this.RowId = this.StaffType = this.vacancy_minority =
    this.counselling_minority = this.schType = ''
    this.submitted = false
    this.activeIndexId = 0
    this.firstTab = true
    this.secondTab = false
    this.priorityList = this.AllPriorityList
    this.orderList = this.allOrderList
    this.staffAddValid = false
    this.remove = []

    this.locationLabel = this.promotionLabel = this.directorateLabel = this.VacUpdatedByLabel = 
    this.Level1ApproverLabel = this.Level2ApproverLabel = this.counsellingTypeLabel = ''
  }
  handleCancel() {
    this.IsAddEditPage = false;
  }
  handleEditCoun(row) {
    this.remove = []
    this.RowId = row.IndexId
    this.selectedEditRow = row
    this.GetOneCounselling()
    this.GetOnePriority(this.RowId, 'edit')
    this.heading = "Update Counselling"
    this.IsAddEditPage = true
    this.activeIndex = 0
    this.activeIndexId = 0
  
    this.counsellingTypeList = [
      { label: "Deployment", value: '1' },
      { label: "Transfer", value: '2' },
      { label: "Promotion", value: '3' },
      { label: "New Appointment", value: '4' },
      { label : "Hill Up", value: '5'},
      { label : "Hill Down", value: '6'},
      { label : "Return To Home Block", value: '7'},
      { label: "Mutual Transfer", value: '8' },
      { label: "Unit Transfer", value: '9' }
    ]

    this.addedSeniorityList = []
    var snty = row.SeniorityOrder && row.SeniorityOrder.split(",")
if(snty){

  for (let i = 0; i < snty.length; i++) {
    var snr = this.allOrderList.filter((ft) => ft.OrderKey == snty[i])
      if(snr.length > 0){
        this.addedSeniorityList.push(snr[0])
      }
        if(snty.length - 1 == i){
          this.addedSeniorityList.push({label:"", value:"", OrderKey:""})
        }
   } 
  } else {
    if(row.CounsellingType == '2'){
      this.addedSeniorityList.push({label:"", value:"", OrderKey:""})
    } else {
      this.addedSeniorityList.push({label:"", value:"", OrderKey:""})
    }
  }


   this.orderList = this.allOrderList.filter(({ value }) => !this.addedSeniorityList.some((e) => e.value === value))
   console.log(this.orderList)
   console.log(this.allOrderList);
   


  }

  GetOneCounselling() {
    this.counsellingService.EditCounselling(this.RowId).subscribe((res) => {
      if (res.dataStatus) {
        if (res.result.length > 0) {
          this.StaffType =  res.result[0].Designation;
          this.handleStaffType()
          this.counsellingFirstForm.patchValue(res.result[0]);
          this.valueBasedOnDropdown()
          this.Level1Approver = res.result[0].Level1Approver
          this.Level2Approver = res.result[0].Level2Approver
          this.VacUpdatedBy = res.result[0].VacUpdatedBy
          this.schType = res.result[0].schType
          this.counselling_minority = res.result[0].counsellingMinority
          this.vacancy_minority = res.result[0].vacancyMinority
          this.ManagementJson()
          
          var vacLabel = this.vacancyLevelList.filter((vl) => vl.value == res.result[0].VacUpdatedBy)
          this.VacUpdatedByLabel = vacLabel.length > 0 ? vacLabel[0].label : vacLabel

          var from = moment(this.counsellingFirstForm.value.FromDate).format("DD-MM-YYYY")

          this.minDate = new Date(res.result[0].FromDate)
          var to = moment(this.counsellingFirstForm.value.ToDate).format("DD-MM-YYYY")

          this.counsellingFirstForm.controls.FromDate.setValue(from)
          this.counsellingFirstForm.controls.ToDate.setValue(to)
          this.CounsellingId = res.result[0].IndexId

          if(this.counsellingFirstForm.value.CounsellingType != '9' && this.userType1 == '29'){
            this.Level2ApproverList = [
              {label:"AEO", value:"5"},
            ]
           } else if(this.counsellingFirstForm.value.Directorate == '5') {
            this.Level2ApproverList = [
              {label:"Joint Director", value:"1"},
            ]
           }else if(this.counsellingFirstForm.value.Directorate == '6') {
            this.Level2ApproverList = [
              {label:"Joint Director", value:"1"},
            ]
           } else {
            this.Level2ApproverList = [
              {label:"BEO", value:"1"},
              {label:"CEO", value:"2"},
              {label:"DEO (Elementary)", value:"3"},
              {label:"DEO (Secondary)", value:"4"},
            ]
           }
     
setTimeout(() => {
  this.staffList = []
  if(res.result[0].Subject){
  var subArr = res.result[0].Subject.split(',')

  for (let i = 0; i < subArr.length; i++) {

    var subName = this.SubjectList.filter((sb) => sb.value == subArr[i])
      this.staffList.push({
        Designation: res.result[0].Designation,
        DesignationName: res.result[0].DesignationName,
        Subject: subArr[i],
        SubjectName: subName.length > 0 ? subName[0].label : subName
      })            
  }
  this.staffAddValid = false

} else {
  this.staffList.push({
    Designation: res.result[0].Designation,
    DesignationName: res.result[0].DesignationName,
    Subject: null,
    SubjectName: null
  })     
  this.staffAddValid = true
}
if(this.StaffType){
  this.StaffDisable = true
} else {
  this.StaffDisable = false
}
    
}, 1000);


          // var des = this.StaffTypeList.filter((ct) => ct.value == res.result[0].Designation)

          
          // var sub = this.SubjectList.filter((ct) => ct.value == res.result[0].Subject)
          

   
          // this.staffList = []
          // this.staffList.push({
          //   Designation: des.length > 0 ? des[0].value : res.result.Designation,
          //   Subject: sub.length > 0 ? sub[0].value : res.result.Subject,
          //   DesignationName: des.length > 0 ? des[0].label : res.result.Designation,
          //   SubjectName: sub.length > 0 ? sub[0].label : res.result.Subject
          // })


          this.rcStaffList = (this.staffList.map((sl) => {
            return { label: sl.SubjectName, value: sl.Subject }
          })).filter((ft) => ft.value)

          
          this.selectedSchCategory = res.result[0].SclCategory.split(",")

          this.selectedSchManage = res.result[0].SclManagement.split(",")
          this.selectedSchPanel = res.result[0].SclPanel.split(",")


          this.selectedVacancyCategory = res.result[0].VacCategory.split(",")
          this.selectedVacancyManage = res.result[0].VacManagement.split(",")
          this.selectedVacancyPanel = res.result[0].VacPanel.split(",")

setTimeout(() => {
  this.confirmationDetails()
}, 500);


          // var rule = res.result[0].Rule.split(",")

          // for (var i = 0; i < this.RuleList.length; i++) {
          //   for (var j = 0; j < rule.length; j++) {
          //     if (rule[j] == this.RuleList[i].RuleId) {
          //       this.RuleList[i].id = true
          //     }
          //   }
          // }

          // this.selectedRule = rule
          this.getOrderTem(1)

        }
      } else {
        this.alertService.error("Something went wrong")
      }

    });
  }

  GetOnePriority(cnsnId, str){
    this.counsellingService.getCnsnPriority(cnsnId).subscribe((res) => {
    this.addedPriorityList = []
      if (res.dataStatus) {
        this.addedPriorityList = res.result.map((mp) => {
          return { label: mp.priority, value: mp.PriorityId, IndexId: mp.IndexId, IsActive:1, PriorityNo: mp.PriorityNo }
        })
        this.addedPriorityList.sort((a, b) => ((+a.PriorityNo) < (+b.PriorityNo) ? -1 : 1)); 
 
        if(str == 'edit'){
          this.addedPriorityList.push({label:"", value:"", IndexId:"", IsActive:"", PriorityNo: ""})
        }

        this.priorityList = this.AllPriorityList.filter(({ value }) => !this.addedPriorityList.some((e) => e.value === value))

      } else {
        if(str == 'edit'){
          this.addedPriorityList.push({label:"", value:"", IndexId:"", IsActive:"", PriorityNo: ""})
        }
      }

    })
  }

  clearToDate() {
    this.minDate = this.counsellingFirstForm.value.FromDate
    this.counsellingFirstForm.controls['ToDate'].setValue(null);
  }

  firstStepSubmit() {
    this.submitted = true
    if (this.counsellingFirstForm.valid) {
      this.firstStepRecords = this.counsellingFirstForm.value

      this.confirmationDetails()


      this.nextPage()
    }
  }
  secondStepSubmit() {

    if (this.staffList.length > 0) {
      this.nextPage()
    } else {
      this.alertService.error("Please add alteast one designation")
    }
  }
  nextPage() {
    this.activeIndex += 1
    this.firstTab = true
    this.secondTab = false
  }
  previousPage() {
    this.activeIndex -= 1
  }

  // addStaff(){

  //   this.RowId = ''

  // if(this.StaffType && this.Subject){

  //     var desigName = this.StaffTypeList.filter((sf) => sf.value == this.StaffType)
  //     var subName = this.SubjectList.filter((sf) => sf.value == this.Subject)

  //   this.staffList.push({
  //         Designation: desigName.length > 0 ? desigName[0].value : "", 
  //         DesignationName: desigName.length > 0 ? desigName[0].label : "", 
  //         SubjectName:subName.length > 0 ? subName[0].label : "", 
  //         Subject: subName.length > 0 ? subName[0].value : ""
  //     })

  //   this.StaffType = '',
  //   this.Subject = ''

  //   } else {
  //     this.alertService.error("Please select staff type and subject")
  //   }
  // }

  addStaff() {
    // this.RowId = ''
    var IsValid = true
    if (this.StaffType || this.Subject) {
      if (this.StaffType == '11' || this.StaffType == '103' || this.StaffType == '7' || this.StaffType == '36' || this.StaffType == '139' || this.StaffType == '138') {
        if (!this.StaffType || !this.Subject) {
          IsValid = false
          this.alertService.error("Please select staff type and subject")
        }
      } else {
        if (!this.StaffType) {
          IsValid = false
          this.alertService.error("Please select staff type")
        } else {
            this.staffAddValid = true
          this.Subject = ""
        }
      }

var duplicate = this.staffList.filter((ftr) => ftr.Subject == this.Subject)

if(duplicate.length > 0){
  IsValid = false
  this.alertService.error("Duplicate entry")
} 
      

      if (IsValid) {

        var desigName = this.StaffTypeList.filter((sf) => sf.value == this.StaffType)
        var subName = this.SubjectList.filter((sf) => sf.value == this.Subject)

        this.staffList.push({
          Designation: desigName.length > 0 ? desigName[0].value : "",
          DesignationName: desigName.length > 0 ? desigName[0].label : "",
          SubjectName: subName.length > 0 ? subName[0].label : "",
          Subject: subName.length > 0 ? subName[0].value : ""
        })

        console.log(this.staffList)

        // this.StaffType = '',
        this.StaffDisable = true
          this.Subject = ''

        this.rcStaffList = (this.staffList.map((sl) => {
          return { label: sl.SubjectName, value: sl.Subject }
        })).filter((ft) => ft.value)



      }
    } else {
      this.alertService.error("Please select mandatory fields")
    }
  }

  deleteStaffList(index){
    this.staffList.splice(index,1);

    if(this.staffList.length == 0){
      this.StaffDisable = false
      this.staffAddValid = false
    }
  }

  removePriorityList(index, obj){

    this.addedPriorityList.splice(index,1);    
    var add = this.AllPriorityList.filter((ft) => ft.value == obj.value)
    this.priorityList.push(add[0])

    this.remove.push({
      CnsId: this.CounsellingId,
IndexId: obj.IndexId,
IsActive: 0,
PriorityId:obj.value,
PriorityNo:obj.PriorityNo,
    })

  }

  thirdStepSubmit() {
    if((this.schType == '1') || (this.schType == '2' && this.counselling_minority)){
      if (this.selectedSchCategory.length != 0 && this.selectedSchManage.length != 0 && this.selectedSchPanel.length != 0) {
        this.thirdStepRecords = {
          Category: this.selectedSchCategory,
          Management: this.selectedSchManage,
          Panel: this.selectedSchPanel
        }
        this.confirmationDetails()
        this.nextPage()
      } else {
        this.alertService.error("Please select atleast one category, management and panel")
      }
    } else {
      if(this.schType == '2'){
      this.alertService.error("Please select minority type")
      } else {
      this.alertService.error("Please select school type")
      }
    }
  }
  
  fourthStepSubmit() {
    if(this.VacUpdatedBy || (this.schType == '2' && this.vacancy_minority)){
    if (this.selectedVacancyCategory.length != 0 && this.selectedVacancyManage.length != 0 && this.selectedVacancyPanel.length != 0) {
      this.fourthStepRecords = {
        Category: this.selectedVacancyCategory,
        Management: this.selectedVacancyManage,
        Panel: this.selectedVacancyPanel
      }
        this.confirmationDetails()

      this.nextPage()
    } else {
      this.alertService.error("Please select atleast one category, management and panel")
    }
  } else {
    this.alertService.error("Please select vacancy updated by, vacancies minority type")
  }
  }
  finalSubmit() {

    if (typeof this.counsellingFirstForm.value.FromDate != 'object') {
      const fromDt = this.counsellingFirstForm.value.FromDate;
      const [fmday, fmmonth, fmyear] = fromDt.split('-');
      var fromResult = [fmyear, fmmonth, fmday].join('-');
    }

    if (typeof this.counsellingFirstForm.value.ToDate != 'object') {
      const toDt = this.counsellingFirstForm.value.ToDate;
      const [day, month, year] = toDt.split('-');
      var toResult = [year, month, day].join('-');
    }


    var sub = []
    for (let i = 0; i < this.staffList.length; i++) {
          sub.push(this.staffList[i].Subject)
    }
    var odr = []
      for (let i = 0; i < this.addedSeniorityList?.length - 1; i++) {
        odr.push(this.addedSeniorityList[i].OrderKey)
      }
    var orderStr = odr.toString()
    console.log(this.selectedEditRow);
    

    var data = {
      records: {
        IndexId: this.RowId ? this.RowId : '',
        FromDate: fromResult ? fromResult : moment(this.counsellingFirstForm.value.FromDate).format('yyyy-MM-DD'),
        ToDate: toResult ? toResult : moment(this.counsellingFirstForm.value.ToDate).format('yyyy-MM-DD'),
        Title: this.counsellingFirstForm.value.Title,
        CounsellingType: this.counsellingFirstForm.value.CounsellingType,
        CandidateUpdatedBy: this.counsellingFirstForm.value.CandidateUpdatedBy, // For Promotion Only
        Location: this.counsellingFirstForm.value.Location,
        Directorate: this.counsellingFirstForm.value.Directorate,

        // TeacherType: this.staffList,
        Subject: sub.toString(),
        TeacherType: this.staffList[0].Designation,
        DesignationName: this.staffList[0].DesignationName,

        schType: this.schType,
        counselling_minority: this.counselling_minority,
        SclCategory:this.selectedSchCategory.toString(),
        SclManagement: this.selectedSchManage.toString(),
        SclPanel: this.selectedSchPanel.toString(),

        VacUpdatedBy: this.VacUpdatedBy,
        vacancy_minority: this.vacancy_minority,
        VacCategory: this.selectedVacancyCategory.toString(),
        VacManagement: this.selectedVacancyManage.toString(),
        VacPanel: this.selectedVacancyPanel.toString(),
        
        Level1Approver: this.Level1Approver,
        Level2Approver: this.Level2Approver,
        AppSts: this.selectedEditRow?.AppSts ? this.selectedEditRow?.AppSts : '2',
        VacanyPublish: this.selectedEditRow?.VacanyPublish ? this.selectedEditRow?.VacanyPublish : '2',
        SeniorityPublish: this.selectedEditRow?.SeniorityPublish ? this.selectedEditRow?.SeniorityPublish : '2',
        VacancyChallenge: this.selectedEditRow?.VacancyChallenge ? this.selectedEditRow?.VacancyChallenge : '2',
        SeniorityChallenge: this.selectedEditRow?.SeniorityChallenge ? this.selectedEditRow?.SeniorityChallenge : '2',
        PreSelectVacancies: this.selectedEditRow?.PreSelectVacancies ? this.selectedEditRow?.PreSelectVacancies : '2',
        UpdateCandidate: this.selectedEditRow?.UpdateCandidate ? this.selectedEditRow?.UpdateCandidate : '2',
        SeniorityOrder: orderStr,
        SeniorityReset: this.selectedEditRow?.SeniorityReset ? this.selectedEditRow?.SeniorityReset : "1",
        // Rule: this.selectedRule.toString(),
      }

    }
    console.log(data)

    this.counsellingService.postPlanCounselling(data).subscribe((res) => {
      if (res.dataStatus) {
        this.CounsellingId = res.IndxID
        // this.handleRcStaff()
        // this.nextPage()
        this.priorityApiSubmit()
        this.handleOrderTemplate()
        // this.GetOnePriority(this.CounsellingId, '')
        // this.alertService.success("Saved successfully")
        // this.IsAddEditPage = false
      } else {
        this.alertService.error(res.message);
      }
    });
  }
  approvalStepSubmit(){
      if(this.Level1Approver){
       this.confirmationDetails()
        this.nextPage();
      } else {
        this.alertService.error("Please select approval level 1")
      }
  }

  // handleSwitch(val, row) {
  //   if (row.id) {
  //     this.selectedRule.push(row.RuleId)
  //   } else {
  //     const index = this.selectedRule.indexOf(row.RuleId);
  //     if (index > -1) {
  //       this.selectedRule.splice(index, 1);
  //     }
  //   }
  // }
  handleConfirm() {
    var data = {}
    // if(!this.IsSwitch){
      if(this.selectBtnStr == 'archived'){
        data = {
          records: {
            IndexId: this.stopStartVal.IndexId,
            Status: "3"
          }
        }
      } else if(this.selectBtnStr == 'setting'){
        data = {
          records: {
            IndexId: this.settingRowData?.IndexId,
            // AppSts: this.newPlanCounsellingList[this.stopStartInd].AppSts ? 1 : 0
            AppSts: this.ApplicationStatus ? '1' : '2',
            VacanyPublish: this.VacanyPublish ? '1' : '2' ,
            SeniorityPublish: this.SeniorityPublish ? '1' : '2' ,
            VacancyChallenge: this.VacancyChallenge ? '1' : '2' ,
            SeniorityChallenge: this.SeniorityChallenge ? '1' : '2' ,
            PreSelectVacancies: this.PreSelectVacancies ? '1' : '2' ,
            UpdateCandidate: this.UpdateCandidate ? '1' : '2' ,
            same_district_sts: this.same_district_sts ? '1' : '2' ,
            willing_sts: this.willing_sts ? '1' : '2' ,
          }
        }
        var desReq = {
          records: {
            Des: this.settingRowData?.Designation,
            VacUptSts: this.VacUptSts ? '1' : '2' 
          }
        }
        this.counsellingService.postVacancyUpdate(desReq).subscribe((res) => {
          if (res.dataStatus) {
          } else {
            this.alertService.error(res.message)
          }
        })

      } else if (this.newPlanCounsellingList[this.stopStartInd].Status == '0' || this.newPlanCounsellingList[this.stopStartInd].Status == '2') {
       data = {
        records: {
          IndexId: this.stopStartVal.IndexId,
          Status: "1"
        }
      }
    } else if (this.newPlanCounsellingList[this.stopStartInd].Status == '1') {
       data = {
        records: {
          IndexId: this.stopStartVal.IndexId,
          Status: "2"
        }
      }
      // this.newPlanCounsellingList[ind].Status = '0'
    }
  // }
  else {
     data = {
      records: {
        IndexId: this.stopStartVal.IndexId,
        AppSts: this.newPlanCounsellingList[this.stopStartInd].AppSts ? '1' : '2'
      }
    }
  }

    this.counsellingService.postPlanCounselling(data).subscribe((res) => {
      if (res.dataStatus) {
        this.alertService.success(this.startStopHeading == "Start Counselling" 
        ? "Counselling started sucessfully" 
        : this.startStopHeading == "Stop Counselling"
          ? "Counselling stopped sucessfully"
          : this.startStopHeading == "Application Start"
            ? "Application started sucessfully"
            : this.startStopHeading == "Application Stop"
              ? "Application stopped sucessfully"
              : res.message)
        // this.newPlanCounsellingList[ind].Status = '1'
        this.GetAllNewCounselling();
        this.startStopModal = false
        this.settingModal = false
      } else {
        this.alertService.error("Something went wrong. Please try again");
      }
    });
  }

  handelCancel() {
    this.startStopModal = false
    this.GetAllNewCounselling()
  }

  stopStartBtn(val, ind, str) {

    this.stopStartVal = val
    // this.stopStartInd = ind
    this.stopStartInd = this.newPlanCounsellingList.findIndex(x => x.IndexId == val.IndexId);
    this.startStopModal = true
    this.selectBtnStr = str


    if(str == 'counselling'){
    if (this.newPlanCounsellingList[this.stopStartInd].Status == '0' || this.newPlanCounsellingList[this.stopStartInd].Status == '2') {
      this.startStopHeading = "Start Counselling"
      this.startStopContent = "Are you sure you want to start this counselling ?"
    } else if (this.newPlanCounsellingList[this.stopStartInd].Status == '1') {
      this.startStopHeading = "Stop Counselling"
      this.startStopContent = "Are you sure you want to stop this counselling ?"
    }
    this.IsSwitch = false
  }

  if(str == 'form'){
      if (this.newPlanCounsellingList[this.stopStartInd].AppSts) {
        this.startStopHeading = "Application Start"
        this.startStopContent = "Are you sure you want to start this counselling's application form ?"
      } else if(!this.newPlanCounsellingList[this.stopStartInd].AppSts) {
        this.startStopHeading = "Application Stop"
        this.startStopContent = "Are you sure you want to stop this counselling's application form ?"
      }
    this.IsSwitch = true
    }

    if(str == 'archived'){
      if (this.newPlanCounsellingList[this.stopStartInd].Status) {
        this.startStopHeading = "Archived"
        this.startStopContent = "Are you sure you want to move to archived this counselling ?"
      }
    }
  }

  handleStaffType() {
    if (this.StaffType == '11' || this.StaffType == '103' || this.StaffType == '7' || this.StaffType == '36' || this.StaffType == '139' || this.StaffType == '138') {
      this.IsShowSubject = true
        this.counsellingService.getSubject().subscribe((data) => {
          this.SubjectList = 
          this.StaffType == '11' || this.StaffType == '260'
           ? data["BTStaffList"] 
           : this.StaffType == '103'
              ? data["BRTEStaffList"]
              : this.StaffType == '7'
                ? data['PartTimeStaffList']
                : this.StaffType == '36'
                  ? data['PGStaffList']
                  : this.StaffType == '139' || this.StaffType == '138' 
                    ? data['LecturerAndJunrLectrStfLst']
                    : data['AllSubject']
        });
      } else {
      this.IsShowSubject = false
      this.SubjectList = []
    }
    this.valueBasedOnDropdown()
  }

  handleRcStaff() {
    this.RcForm = this.fb.group({
      Subject: new FormControl(this.RcForm.value.Subject, null),
      RC: this.fb.array([]),
    })
      this.getRcVal()

    // if (this.counsellingFirstForm.value.Location == '1') {
    //   this.GetAllBlock()
    // } else if (this.counsellingFirstForm.value.Location == '2') {
    //   this.GetAllDistrict()
    // } else if (this.counsellingFirstForm.value.Location == '3') {
    //   this.GetAllState()
    // }
  }

  // GetAllDistrict() {
  //   this.counsellingService.distlist().subscribe((data) => {
  //     if (data.dataStatus) {
  //       this.DistrictList = data.result.schooldist

  //       for (var i = 0; i < this.DistrictList.length; i++) {
  //         this.addRcLoop(this.DistrictList[i])
  //       }

  //     } else {
  //       this.DistrictList = [];
  //     }
  //   });
  // }

  // GetAllState() {
  //   this.counsellingService.getState().subscribe((data) => {
  //     if (data.dataStatus) {
  //       this.StateList = data.result

  //       for (var i = 0; i < this.StateList.length; i++) {
  //         this.addRcLoop(this.StateList[i])
  //       }

  //     } else {
  //       this.StateList = [];
  //     }
  //   });
  // }

  // GetAllBlock() {
  //   this.counsellingService.getBlock().subscribe((data) => {
  //     if (data.dataStatus) {
  //       this.BlockList = data.result

  //       for (var i = 0; i < this.BlockList.length; i++) {
  //         this.addRcLoop(this.BlockList[i])
  //       }

  //     } else {
  //       this.BlockList = [];
  //     }
  //   });
  // }

  onSelectFile(event, i) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size <= 10000000) {
        var doc_file = event.target.files;
        var fileName = event.target.files[0].name;
        var splittedName = fileName.split(".");
        var fileType = splittedName[1];
        if (fileType == 'png' || fileType == 'jpg' || fileType == 'jpeg') {
          const fileReader: FileReader = new FileReader();
          fileReader.readAsDataURL(event.target.files[0]);
          fileReader.onload = (event: Event) => {
            this.uploadUrl = fileReader.result;
            var bucketName = "renewalapplicationemis";
            var filename = splittedName[0];
            var ext = splittedName[1];
            let expiry: number = 300;
            this.counsellingService
              .getSignedUrl(bucketName, ext, filename, expiry)
              .subscribe((result) => {
                if (result) {
                  let files: FileList = doc_file;
                  let file: File = files[0];
                  this.counsellingService
                    .uploadFile(result.url, file)
                    .subscribe((res) => {

                      this.RcForm.controls["RC"]["controls"][i].controls[
                        "SignatureKey"
                      ].setValue(result.key);

                    });
                  this.alertService.success("File Uploaded Successfully")
                } else {
                  this.alertService.error("Error in Uploading File please try again")
                }
              });
          };
        } else {
          this.alertService.error('File must be a valid format');
        }
      } else {
        this.alertService.warning(
          "Image Can`t uploaded because Image size should have less than or equal to 10mb"
        );
      }
    }
  }

  getUploadedFiles(filename) {

    // this.imageviewer = filename;
    var bucketName = "renewalapplicationemis";
    var filename = filename;
    let expiry: number = 1800;
    this.counsellingService
      .getUploadedFiles(bucketName, filename, expiry)
      .subscribe((result) => {
        if (result) {
          this.photoUrl = result.url
          this.viewImageModal = true
        } else {
          this.alertService.error('Error in Uploading File please try again');
        }
      });
  }

  getRcVal(){
var lctn = this.counsellingFirstForm.value.Location == '1' ? '2' : this.counsellingFirstForm.value.Location // Within block also district rc only change
    this.counsellingService.getRc(this.CounsellingId, lctn, this.RcForm.value.Subject).subscribe((data) => {
          if (data.dataStatus) {
            this.DistrictList = data.result

            for (var i = 0; i < this.DistrictList.length; i++) {
              this.addRcLoop(this.DistrictList[i])
            }
    
          } else {
            this.DistrictList = [];
          }
    })
  }

  handleRcSubmit() {
    var isValid = true
for (let i = 0; i < this.RcForm.value.RC.length; i++) {
  if(this.RcForm.value.RC[i].RcNo){
    isValid = true
  } else {
    isValid = false
    break;
  }
  
}
if(!isValid){
  this.nextPage()
} else{
  this.alertService.error("Please fill all fields")
}
  }

  handleTabView(event) {
    this.activeIndexId = event.index;
      if(this.activeIndexId == 0){
        this.getOrderTem(1)
      } else {
      this.getOrderTem(2)
    }
  }

  handleTabSave() {
    if(this.OrderTemplate.valid){
      if(this.counsellingFirstForm.value.CounsellingType == '3'){
          if(this.activeIndexId == 0){
              this.OrderTemplate.controls.Type.setValue('1')
              this.OrderTemplate.controls.IndexId.setValue(this.OrderTemplate.value.IndexId ? this.OrderTemplate.value.IndexId : '')
              this.orderArray.push(this.OrderTemplate.value)
              this.activeIndexId = 1
                this.getOrderTem(2)
          } else if(this.activeIndexId == 1) {
              this.OrderTemplate.controls.Type.setValue('2')
              this.OrderTemplate.value.IndexId = this.OrderTemplate.value.IndexId ? this.OrderTemplate.value.IndexId : ''
              this.orderArray.push(this.OrderTemplate.value)
              this.nextPage();
          }
            this.firstTab = !this.firstTab
              this.secondTab = !this.secondTab
      } else {
          this.nextPage();
      }
      console.log(this.orderArray)
    } else {
      this.alertService.error('Please fill all fields')
    }
  }


  handleOrderCopySubmit() {
    if(this.OrderTemplate.valid){
      this.nextPage();
    } else {
      this.alertService.error('Please fill all fields')
    }
  }

  handleOrderTemplate() {
    this.submitOrder = true;

    // this.OrderTemplate.value.Type = 1
    // this.OrderTemplate.value.CnslId = this.CounsellingId
    // this.orderArray.push(this.OrderTemplate.value)

    if(this.counsellingFirstForm.value.CounsellingType == '3'){
    for (let i = 0; i < this.orderArray.length; i++) {
        this.orderArray[i].CnslId = this.CounsellingId
    }
  } else {
    this.orderArray = []
    this.OrderTemplate.value.Type = 1
    this.OrderTemplate.value.CnslId = this.CounsellingId
    this.orderArray.push(this.OrderTemplate.value)
  }

    var req = {
      records: this.orderArray
    }

      this.counsellingService.PostOrderTempalte(req).subscribe((res) => {
        if (res.dataStatus) {
          this.alertService.success(res.message)
        }
      })

  }

  getOrderTem(type) {
    if(this.CounsellingId){
     this.counsellingService.GetOrderTemplate(this.CounsellingId, type).subscribe((res) => {
      if (res.dataStatus) {
        var type1 = res.result.filter((ft) => ft.Type == '1')
        var type2 = res.result.filter((ft) => ft.Type == '2')
        if (type == 1) {
          this.OrderTemplate.patchValue(type1.length > 0 ? type1[0] : type1)
        } else {
          this.OrderTemplate.patchValue(type2.length > 0 ? type2[0] : type2)
        }
      } else {
        this.OrderTemplate.reset()
      }
    })
   }
  }
  
  // postRC(val, id){
  //   var req = {
  //     records :{
  //       'CnslId' : this.CounsellingId,
  //       'Subject' : this.RcForm.value.Subject,
  //       'RcFlag' : this.counsellingFirstForm.value.Location,
  //       'UserId' :val.DistrictId,
  //       'RcNo': this.RcForm.value.RC[id].RcNo,          
  //       'OtherNme':  this.RcForm.value.RC[id].OtherNme,  
  //       'Sign':  this.RcForm.value.RC[id].SignatureKey,  
  //       'IndexId': this.RcForm.value.RC[id].IndexId
  //     }
  //   }
  //   this.counsellingService.postSingleRc(req).subscribe((res) => {
  //     if (res.dataStatus) {
  //       this.alertService.success(res.message)
  //       this.RcForm.controls["RC"]["controls"][id].controls["IndexId"].setValue(res.IndxID);
  //     } else {
  //       this.alertService.error("Something went wrong. Please try again");
  //     }
  //   });
    
  // }

  handleHTMLPreview(){
    this.previewModal = true
    console.log(this.OrderTemplate.value)
  }

  handleClose(){
    this.previewModal = false
  }

  addOneMorePriority(ind){
    if(this.priority){
        var fil = this.priorityList.filter((ftr) => ftr.value == this.priority)
        if(fil.length > 0){
          this.addedPriorityList[ind].label = fil[0].label
          this.addedPriorityList[ind].value = fil[0].value

          // if(this.priorityList.length != 1){
          this.addedPriorityList.push(
            { label:'', value:'', IndexId:'',IsActive:"", PriorityNo: ''}
          )
          // }
        }

        this.priorityList = this.priorityList.filter(obj => obj.value != this.priority);

        console.log(this.priorityList)
        this.priority = ''
    } else {
      this.alertService.error("Please select a priority")
    }
  }

  addNewPriority(){
    this.priorityModal = true
    this.newPriority = ''
  }

  handlePriorityCancel(){
    this.priorityModal = false
  }

  handleAddNewPriority(){
    var data = {
      records: {
        Priority: this.newPriority,
        IndxId: '',
      }
    }
    if(this.newPriority){
      this.counsellingService.postNewPriority(data).subscribe((res) => {
        if (res.dataStatus) {
          this.alertService.success("New priority added successfully")
          this.priorityModal = false
          this.GetPriorityMaster()
        }
      }
    )
      console.log(this.newPriority)
    } else {
      this.alertService.error("Please fill priority field")
    }
  }

  prioritySubmit(){
    if(this.addedPriorityList.length > 0 && this.addedPriorityList[0].label){
      this.nextPage()
  } else {
    this.alertService.error("Please order priority")
  }

  }

  senioritySubmit(){
    if(this.addedSeniorityList.length > 0 && this.addedSeniorityList[0].label){
      this.nextPage()
  } else {
    this.alertService.error("Please order seniority")
  }

  }

  getOrderCopy(row){
    this.router.navigate(['/counselling/order-copy-details'],  {
      queryParams: {path: row.IndexId},
    })
  }

  confirmationDetails() {

    this.confirmSchCategory = []
    this.confirmSchManage = []
    this.confirmSchPanal = []

    this.confirmVacCategory = []
    this.confirmVacManage = []
    this.confirmVacPanal = []

    this.directorateLabel =  (this.AllDirectorate.filter((sf) => sf.value == this.counsellingFirstForm.value.Directorate))[0].label
    this.locationLabel =  (this.locationList.filter((sf) => sf.value == this.counsellingFirstForm.value.Location))[0].label
    this.counsellingTypeLabel =  (this.counsellingTypeList.filter((sf) => sf.value == this.counsellingFirstForm.value.CounsellingType))[0].label
    this.promotionLabel =  (this.vacancyLevelList.filter((sf) => sf.value == this.counsellingFirstForm.value.CandidateUpdatedBy))[0]?.label
    this.VacUpdatedByLabel =  (this.vacancyLevelList.filter((sf) => sf.value == this.VacUpdatedBy))[0]?.label

    
    for (let i = 0; i < this.CategoryList.length; i++) {
      for (let j = 0; j < this.selectedSchCategory.length; j++) {
        if(this.CategoryList[i].id == this.selectedSchCategory[j]){
          this.confirmSchCategory.push(this.CategoryList[i])
        } 
      }        
    }
    for (let i = 0; i < this.ManagementList.length; i++) {
      for (let j = 0; j < this.selectedSchManage.length; j++) {
        if(this.ManagementList[i].id == this.selectedSchManage[j]){
          this.confirmSchManage.push(this.ManagementList[i])
        } 
      }        
    }
    for (let i = 0; i < this.PanelList.length; i++) {
      for (let j = 0; j < this.selectedSchPanel.length; j++) {
        if(this.PanelList[i].id == this.selectedSchPanel[j]){
          this.confirmSchPanal.push(this.PanelList[i])
        } 
      }        
    }

      
      for (let i = 0; i < this.CategoryList.length; i++) {
        for (let j = 0; j < this.selectedVacancyCategory.length; j++) {
          if(this.CategoryList[i].id == this.selectedVacancyCategory[j]){
            this.confirmVacCategory.push(this.CategoryList[i])
          } 
        }        
      }
      for (let i = 0; i < this.ManagementList.length; i++) {
        for (let j = 0; j < this.selectedVacancyManage.length; j++) {
          if(this.ManagementList[i].id == this.selectedVacancyManage[j]){
            this.confirmVacManage.push(this.ManagementList[i])
          } 
        }        
      }
      for (let i = 0; i < this.PanelList.length; i++) {
        for (let j = 0; j < this.selectedVacancyPanel.length; j++) {
          if(this.PanelList[i].id == this.selectedVacancyPanel[j]){
            this.confirmVacPanal.push(this.PanelList[i])
          } 
        }        
      }


    this.Level1ApproverLabel = ((this.Level1ApproverList.filter((ftr) => ftr.value == this.Level1Approver)))[0]?.label 
    this.Level2ApproverLabel = ((this.Level2ApproverList.filter((ftr) => ftr.value == this.Level2Approver)))[0]?.label 
  }

  priorityApiSubmit(){
    var dataArray = []
    for (let i = 0; i < this.addedPriorityList.length; i++) {
      if(this.addedPriorityList[i].label)
      dataArray.push({
        CnsId: this.CounsellingId,
        PriorityId: this.addedPriorityList[i].value,
        PriorityNo: i+1,
        IndexId: this.addedPriorityList[i].IndexId,
        IsActive: this.addedPriorityList[i].IsActive
      })   
  }

  const withRemove = dataArray.concat(this.remove);

  var fitrAry = []
  for (let i = 0; i < withRemove.length; i++) {
     var lng = Object.keys(withRemove[i]).length;
     if(lng == 5){
      fitrAry.push(withRemove[i])
     }
    }

    var data = {
      records: fitrAry
    }
    
  this.counsellingService.postCnsnPriority(data).subscribe((res) => {
    if (res.dataStatus) {
      this.alertService.success("Submitted successfully")
      this.GetAllNewCounselling();
      this.defaultValues();
      this.IsAddEditPage = false
      // this.nextPage()
    } else {
      this.IsAddEditPage = false
    }
    //  else {
    //   this.alertService.error(res.message)
    // }
  })
  }

  confirmationSubmit(){
    this.finalSubmit()
  }
  // handleCounsellingType(){
  //     if(this.counsellingFirstForm.value.CounsellingType != '2'){
  //    this.counsellingFirstForm.controls['CandidateUpdatedBy'].setValidators([Validators.required]);
  //     } else {
  //       this.counsellingFirstForm.controls['CandidateUpdatedBy'].setValidators(null);
  //       this.counsellingFirstForm.controls['CandidateUpdatedBy'].setValue(null);
  //     }
  //    this.counsellingFirstForm.controls['CandidateUpdatedBy'].updateValueAndValidity();
  //   }

  handleCounsellingType(){
    if(this.counsellingFirstForm.value.CounsellingType == '5' || this.counsellingFirstForm.value.CounsellingType == '6' || this.counsellingFirstForm.value.CounsellingType == '7'){
      this.counsellingFirstForm.controls.Location.setValue('1');
      this.locationDisable = true;
    } else {
      this.locationDisable = false;
      this.counsellingFirstForm.controls.Location.setValue('');
    }

     if(this.counsellingFirstForm.value.CounsellingType != '2' && this.counsellingFirstForm.value.CounsellingType != '8'){
       this.counsellingFirstForm.controls['CandidateUpdatedBy'].setValidators([Validators.required]);
      } else {
        this.counsellingFirstForm.controls['CandidateUpdatedBy'].setValidators(null);
        this.counsellingFirstForm.controls['CandidateUpdatedBy'].setValue(null);
      }
     this.counsellingFirstForm.controls['CandidateUpdatedBy'].updateValueAndValidity();

      this.handleSlctMngmt()
  }

  handleSlctMngmt() {
    if(this.userType1 == "29" && this.counsellingFirstForm.value.CounsellingType != '9'){
      this.selectedSchManage = ['2'];
      this.Level2ApproverList = [
        {label:"AEO", value:"5"},
      ]
     } else {
      if(this.counsellingFirstForm.value.CounsellingType != '4' && this.counsellingFirstForm.value.Directorate != '5'){
        this.selectedSchManage = ['1','2', '3', '4', '5', '6', '7', '9', '31', '32', '36'];
      } else {
        this.selectedSchManage = [];
      }
      // this.Level2ApproverList = [
      //   {label:"CEO", value:"2"}
      // ]
     }
  }

    handleDirectorate(){
      this.counsellingFirstForm.controls.Location.setValue('');
      this.counsellingFirstForm.controls.CounsellingType.setValue('');
      this.counsellingFirstForm.controls.CandidateUpdatedBy.setValue('');
      this.ManagementJson()
      this.PanelJson()
      this.CategoryJson()
      this.valueBasedOnDropdown()
      if(this.counsellingFirstForm.value.Directorate == '5' || this.counsellingFirstForm.value.Directorate == '4') {
        this.schType = '1'
      }
      this.StaffTypeJson()
    }

    valueBasedOnDropdown (){
      if(this.counsellingFirstForm.value.Directorate == '1'){
        this.locationList = [
          { label: "Within Block", value: "1" },
          { label: "Within District", value: "2" },
          { label: "Within State", value: "3" },
          { label: "Within Education District", value: "4" },
          { label: "Within Revenue District", value: "5" }
        ]
        this.counsellingTypeList = [
          { label: "Deployment", value: '1' },
          { label: "Transfer", value: '2' },
          { label: "Promotion", value: '3' },
          { label: "New Appointment", value: '4' },
          { label : "Hill Up", value: '5'},
          { label : "Hill Down", value: '6'},
          { label : "Return To Home Block", value: '7'},
        { label: "Mutual Transfer", value: '8' },
      { label: "Unit Transfer", value: '9' }
        ]
        this.Level1ApproverList = [
          {label:"BEO", value:"1"},
          {label:"DEO (Elementary)", value:"3"},
        ]
      } else if(this.counsellingFirstForm.value.Directorate == '2'){
        this.locationList = [
          // { label: "Within Block", value: "1" },
          { label: "Within District", value: "2" },
          { label: "Within State", value: "3" },
          { label: "Within Education District", value: "4" },
        ]
        this.counsellingTypeList = [
          { label: "Deployment", value: '1' },
          { label: "Transfer", value: '2' },
          { label: "Promotion", value: '3' },
          { label: "New Appointment", value: '4' },
          { label: "Mutual Transfer", value: '8' },
      { label: "Unit Transfer", value: '9' }
          // { label : "Hill Up", value: '5'},
          // { label : "Hill Down", value: '6'},
          // { label : "Return To Home Block", value: '7'}
        ]
        if(this.StaffType == '26'){
          this.Level1ApproverList = [
            {label:"DEO (Secondary)", value:"4"},
          ]
        } else if(this.StaffType == '27'){
          this.Level1ApproverList = [
            {label:"CEO", value:"2"},
          ]
        } else {
          this.Level1ApproverList = [
            {label:"HM", value:"1"},
          ]
        }
      }
      else if(this.counsellingFirstForm.value.Directorate == '4'){
        this.locationList = [
          { label: "Within GCC", value: "2" },
        ]
        this.counsellingTypeList = [
          { label: "Deployment", value: '1' },
          { label: "Transfer", value: '2' },
          { label: "Promotion", value: '3' },
          { label: "New Appointment", value: '4' },
          { label: "Mutual Transfer", value: '8' },
          { label: "Unit Transfer", value: '9' }
        ];
      } else if(this.counsellingFirstForm.value.Directorate == '5'){
        this.locationList = [
          { label: "Within District", value: "2" },
          { label: "Within State", value: "3" }
        ]
        this.counsellingTypeList = [
          { label: "Transfer", value: '2' },
          { label: "Promotion", value: '3' },
        ]
      } else if(this.counsellingFirstForm.value.Directorate == '6') {
        this.locationList = [
          { label: "Within State", value: "3" }
        ]
        this.counsellingTypeList = [
          { label: "Transfer", value: '2' },
          { label: "Promotion", value: '3' },
        ]
        this.vacancyLevelList = [
          {label:"State", value:"1"},
        ];
        this.Level1ApproverList = [
          {label:"AEO", value:"1"},
        ]
        this.Level2ApproverList = [
          {label:"Joint Director", value:"1"},
        ]
        
      } else {
        this.locationList = [
          { label: "Within Block", value: "1" },
          { label: "Within District", value: "2" },
          { label: "Within State", value: "3" }
        ]
        this.counsellingTypeList = [
          { label: "Deployment", value: '1' },
          { label: "Transfer", value: '2' },
          { label: "Promotion", value: '3' },
          { label: "New Appointment", value: '4' },
          { label : "Hill Up", value: '5'},
          { label : "Hill Down", value: '6'},
          { label : "Return To Home Block", value: '7'},
          { label: "Mutual Transfer", value: '8' },
          { label: "Unit Transfer", value: '9' }
        ]
      }

      if(this.StaffType == '134') {
        this.Level1ApproverList = [
          {label:"Joint Director", value:"2"},
        ]
      } else if(this.counsellingFirstForm.value.Directorate == '5') {
        this.Level1ApproverList = [
          {label:"Deputy Director / DIET Principal", value:"1"},
        ]
      }

    }
    handleSetting(rowData){
      this.settingRowData =  rowData
      this.settingModal = true

      this.ApplicationStatus = rowData.AppSts == '1' ? true : false
      this.VacanyPublish = rowData.VacanyPublish == '1' ? true : false
      this.SeniorityPublish = rowData.SeniorityPublish == '1' ? true : false
      this.VacancyChallenge = rowData.VacancyChallenge == '1' ? true : false
      this.SeniorityChallenge = rowData.SeniorityChallenge == '1' ? true : false
      this.PreSelectVacancies = rowData.PreSelectVacancies == '1' ? true : false
      this.UpdateCandidate = rowData.UpdateCandidate == '1' ? true : false
      this.VacUptSts = rowData.VacUptSts == '1' ? true : false
      this.same_district_sts = rowData.same_district_sts == '1' ? true : false
      this.willing_sts = rowData.willing_sts == '1' ? true : false

        this.startStopHeading = 'Setting Submit'
        this.startStopContent = "Are your sure you want to submit this settings ?"
      this.selectBtnStr = "setting"
    } 

    handleSettingClose(){
      this.settingModal = false
    }

    handleSettingSubmit(){
      this.startStopModal = true
    }

    
  addOneMoreSeniority(ind){
    if(this.order){
        var fil = this.orderList.filter((ftr) => ftr.value == this.order)
        if(fil.length > 0){
          this.addedSeniorityList[ind].label = fil[0].label
          this.addedSeniorityList[ind].value = fil[0].value
          this.addedSeniorityList[ind].OrderKey = fil[0].OrderKey

          this.addedSeniorityList.push(
            { label:'', value:'', OrderKey:"" }
          )
        }
        this.orderList = this.orderList.filter(obj => obj.value != this.order);
        this.order = ''
    } else {
      this.alertService.error("Please select a condition")
    }
  }

removeSeniorityList(ind, obj){
  this.addedSeniorityList.splice(ind,1);    
  var add = this.allOrderList.filter((ft) => ft.value == obj.value)
  this.orderList.push(add[0])

      this.remove.push({
        CnsId: this.CounsellingId,
        PriorityId:obj.value,
        PriorityNo:obj.PriorityNo,
      })
}

handleSchType(){
  this.confirmSchManage = []
  if(this.userType1 == 29){
    this.selectedSchManage = ['2'];
    this.selectedVacancyManage = ['2'];
  }
  else{
    this.selectedSchManage = [];
    this.selectedVacancyManage = [];
  }
    this.ManagementJson()
    this.handleSlctMngmt()
}

handleConfirmBtn() {
  window.print();
}


}

