import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CounsellingService {
  private readingFileApi = environment.readingFileApi;
  private getSignedUrlApi = environment.getSignedUrlApi;
  rowData: any;
  SelectedCounselling: any;
  // getIndexDBValue: any;
  constructor(private dataService: DataService, private http: HttpClient) {}
  GetSclName(udise: any) {
    return this.dataService.getData('/api/GetSclName?UdiseCode=' + udise, true);
  }
  getCategory() {
    return this.dataService.getJSON('../assets/json/Category.json');
  }
  getManagement() {
    return this.dataService.getJSON('../assets/json/Management.json');
  }
  getPanel() {
    return this.dataService.getJSON('../assets/json/Panel.json');
  }
  getStaff(){
    return this.dataService.getJSON('../assets/json/StaffType.json');
  }
  getSubject(){
    return this.dataService.getJSON('../assets/json/Subject.json');
  }
  getSchCategory(){
    return this.dataService.getJSON('../assets/json/SchCategory.json');
  }
  getAllDistrict(){
    return this.dataService.getJSON('../assets/json/district.json');
  }
  getAllDirectorate(){
    return this.dataService.getJSON('../assets/json/Directorate.json');
  }

// File API
getSignedUrl(bucketName, ext, fileName, expiry) {
  let params = {
    bcktId: bucketName,
    ext: ext,
    filename: fileName,
    expiry: expiry,
  };
  return this.dataService.getDataWithParams(
    this.getSignedUrlApi,
    params,
    true
  );
}
uploadFile(path, file) {
  return this.dataService.put(path, file);
}
getUploadedFiles(bucketName, fileName, expiry) {
  let params = { bcktId: bucketName, filename: fileName, expiry: expiry };
  return this.dataService.getDataWithParams(
    this.readingFileApi,
    params,
    true
  );
}


// Plan New Counselling API

  postPlanCounselling(data: any) {
    return this.dataService.post('/api/CnslMainPage', data);
  }
   
  GetNewCounselling() {
    return this.dataService.getData('/api/CnslMainPageGetAll', true);
  }

  EditCounselling(CnsId) {
    return this.dataService.getData('/api/CnslMainPageGet?CnsId=' + CnsId, true);
  }

  getRules(){
    return this.dataService.getData('/api/CnslRulesGet', true);
  }

  getTeacherList(records){
    // return this.dataService.getData("/api/CnslTchListGet?CnsId=" + records.counType + "&PanelType=" + records.panelType + "&MngId=" + records.manageType, true)
    return this.dataService.getData("/api/CnslTchListGet?CnsId=" + records.counType + "&PanelType=" + records.panelType + "&Sub=" + records.sub + "&Loc=" + records.Loc + '&BlkId=' + records.BlkId + '&MngId=' + records.MngId, true)
  }

  getTeacherList1(records){
    // return this.dataService.getData("/api/CnslTchListGet?CnsId=" + records.counType + "&PanelType=" + records.panelType + "&MngId=" + records.manageType, true)
    return this.dataService.getData("/api/CnslTchListGet1?CnsId=" + records.counType + "&PanelType=" + records.panelType + "&Sub=" + records.sub + "&Loc=" + records.Loc + '&BlkId=' + records.BlkId + '&MngId=' + records.MngId, true)
  }

  getTeacherList2(records){
    // return this.dataService.getData("/api/CnslTchListGet?CnsId=" + records.counType + "&PanelType=" + records.panelType + "&MngId=" + records.manageType, true)
    return this.dataService.getData("/api/CnslTchListGet2?CnsId=" + records.counType + "&PanelType=" + records.panelType + "&Sub=" + records.sub + "&Loc=" + records.Loc + '&BlkId=' + records.BlkId + '&MngId=' + records.MngId, true)
  }

  getCounTransfer(records){
    return this.dataService.post("/api/CnslTrnsferCUD", records)
  }

  getCounTransferLog(records){
    return this.dataService.post("/api/CnslTransferLog", records)
  }

  staffCounsellingPost(records){
    return this.dataService.post("/api/ResetTchrDtlsUpdate", records)
  }

  getVacancy(cnsId, gender, subject, panId, blkid, MngId, minority){
    // return this.dataService.getData('/api/CnslTrnsferGetVacList?CnsId='+cnsId, true);
    return this.dataService.getData('/api/CnslTrnsferGetVacList?CnsId=' + cnsId + '&Gender=' + gender + '&Sub=' + subject + '&PanId=' + panId + '&BlkId=' + blkid + '&MngId=' + MngId + '&minType=' + minority,  true);

    // http://13.232.216.80/emis1APICode/api/CnslTrnsferGetVacList?Gender=2&Sub=3&CnsId=368&PanId=16
  }

  getSelectVacancy(data){
    return this.dataService.getData('/api/CnslTrnsferGetVacPriList?CnsId=' + data.CnsnId + '&TchrId=' + data.teach + '&panId=' + data.panel + '&Sub=' + data.sub + '&BlkId=' + data.blkId + '&MngId=' + data.MngId,  true);
  }

  getState() {
    return this.dataService.getData('/api/alldistrictlist', true);
  }

  getEduDist(EduDis){
    return this.dataService.getData('/api/GetEduDist?Dist=' + EduDis,true);
   }

  getBlock() {
    return this.dataService.getData('/api/alldistrictlist', true);
  }

  getDisBlock(dis) {
    return this.dataService.getData('/api/getAllBlock?DisId=' + dis, true);
  }

  getEduDisBlock(EduDis) {
    return this.dataService.getData('/api/getAllBlock?EduDistId=' + EduDis, true);
  } 

  getAllBlocks() {
    return this.dataService.getData('/api/GetAllBlocks', true);
  } 




  transferVacAddSub(records){
    return this.dataService.post("/api/TransUpdtTchrVacList", records)
  }

  transferVacAddSub2(records){
    return this.dataService.post("/api/TransUpdtTchrVacList2", records)
  }

  GetPriorityMaster(){
    return this.dataService.getData('/api/GetPriorityMaster', true);
  }
  postNewPriority(records){
    return this.dataService.post("/api/PriorityMasterAdd", records)
  }
  postCnsnPriority(records){
    return this.dataService.post("/api/PriorityListCUD", records)
  }
  getCnsnPriority(cnsn){
    return this.dataService.getData('/api/GetPriorityList?CnslId='+cnsn, true);
  }
  
  // postApprovalLevel(cnsn){
  //   return this.dataService.post("/api/GetPriorityList?CnslId="+cnsn, true)
  // }


  // Counselling Update Status
  
  distlist() {
    return this.dataService.getData('/api/alldistrictlist', true);
  }
  
  getcounsellingstatus(DistId) {
    return this.dataService.getData('/api/CounsellingUptSts?DistId=' + DistId, true)
  }

  postcouncellingupdate(data) {
    return this.dataService.post('/api/CounsellingUpdate', data)
  }

  Allpostcouncellingupdate(data) {
    return this.dataService.post('/api/AllCounsellingUpdate', data)
  }

  // Counselling Live Updates
  Livegetcounsellingstatus(CnsId) {
    return this.dataService.getData("/api/LiveCounsellingUpdate?CnsId=" + CnsId, true);
  }

  // Counselling Status
  getCounsellingStatus(){
    return this.dataService.getData('/api/CounsellingStatus', true);
  }

  getCounsellingWiseStatus(cnsn){
    return this.dataService.getData('/api/CounsellingStatus?cnsn=' + cnsn, true);
  }

  // Counselling Order Copy

  GetTchrTyp(){
    return this.dataService.getData('/api/GetTchrTyp', true);
  }
  GetRcNum(type,teachId, typeId){
    return this.dataService.getData('/api/GetRcNum?Typ='+ type +'&TchrTyp=' + teachId +'&TrTyp=' + typeId, true);
  }
  GetOfcrDetails(){
    return this.dataService.getData('/api/GetOfcrDetails', true);
  }
  UpdateOfcrDetails(data){
    return this.dataService.post('/api/UpdateOfcrDetails', data)
  }
  UpdateRcNum(data){
    return this.dataService.post('/api/UpdateRcNum', data)
  }

  // Admin Panel 
  getCheckVacancy(udise){
    return this.dataService.getData('/api/CnslChckVacList?Udise=' + udise, true)
  }
  getCheckCandidate(tchId){
    return this.dataService.getData('/api/CnslChckTchList?TchId=' + tchId, true)
  }
  PostOrderTempalte(data){
    return this.dataService.post('/api/CnslOrderCopyCUD', data)
  }
  GetOrderTemplate(cnsid, type){
    return this.dataService.getData('/api/CnslOrderCopyGet?CnslId=' + cnsid + '&Type=' + type, true )
  }

  // Update Vacancy and Need
  getVacancyNeedList(udiseCode,des,sub,panel, flg){
    return this.dataService.getData('/api/GetVacancyNeed?UdiseCode=' + udiseCode +'&Des=' + des + '&Sub=' + sub + '&Panel=' + panel + '&Flag=' + flg, true )
  }
  postVacancyNeed(data){
    return this.dataService.post('/api/CnsnUpdVacancyNeed', data)
  }
  addVacancyNeed(data){
    return this.dataService.post('/api/CnslVacCUD', data)
  }
  addVacancyNeedLog(data){
    return this.dataService.post('/api/CnslVacLog', data)
  }


  // Rc 
  getRc(CnslId, RcFlag, Subject){
    return this.dataService.getData('/api/CnslRcNoGet?CnslId=' + CnslId + '&RcFlag=' + RcFlag + '&Subject=' + Subject, true )
  }
  postSingleRc(data){
    return this.dataService.post('/api/CnslRcNoCUD', data)
  }
  getPdfOrderCopy(data){
    return this.dataService.getData('/api/CnslPdfDwnGet?CnslId=' + data.CnslId + '&RcFlag=' + data.RcFlag + '&Type=' + data.type + '&TeacherId=' + data.teacherid + '&TchSts=' + data.teacher_status + '&Sub=' + data.subject, true )
  }
  // getPdf(data){
  //   return this.dataService.getData('/api/CnslPdfDwnGet?CnslId=' + data.CnslId + '&RcFlag=' + data.RcFlag + '&Type=' + data.type + '&TeacherId=' + data.teacherid + '&TchSts=' + data.teacher_status, true )
  // }
// Promotion List 
GetStaffTran(EmisId: any) {
  return this.dataService.getData(
    '/api/GetStaffTranDet?EmisId=' + EmisId,
    true
  );
}
postPromotion(data){
  return this.dataService.post(
    '/api/TeacherTransPromCUD',
    data
  ); 
}

  // Authentication APi for Counselling Start
  CslnAuth(data){
    return this.dataService.post('/api/StrtCnsnAuthGet',data);
  }

  // For SMS 
  smsSending(data){
    return this.dataService.post('/api/SendingSmsParGet1', data);
   }
   PostSMSSendingOTPHistory(data){
     return this.dataService.post('/api/SendingSmsOtpHistory', data);
    }

    GetTchrPnlDistSts(loc, userId){
      return this.dataService.getData(
        '/api/GetTchrPnlDistSts?loc=' + loc + '&user_id=' + userId,
        true
      );
    }
    
//////////// Component to another component val ///////
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

 // BEO, DEO and CEO Approval 
 getdropdownsteachingstaff(refresh: any) {
  return this.dataService.getData('/api/GetDropdown_Staff', refresh);
}
GetHmAprveSatus(cnsnId){
  return this.dataService.getData('/api/GetTeacherTransAppDet2?CnsId=' + cnsnId, true)
}
GetHmAprveSatusTechId(cnsnId, techId){
  return this.dataService.getData('/api/GetTeacherTransAppDet2?CnsId=' + cnsnId + '&TechId=' + techId, true)
}
GetHmAprveSatusMutual(cnsnId, cnsnType){
  return this.dataService.getData('/api/GetTeacherTransAppDet2?CnsId=' + cnsnId + '&cnsnType=' + cnsnType, true)
}
getAllBlock(){
  return this.dataService.getData('/api/getAllBlock', true);
 }

 PostcherTransProm(data){
  return this.dataService.post('/api/TeacherTransPromCUD', data)
}
updateStaffDetails(data: any) {
  return this.dataService.post('/api/stfupdateall', data);
}
GetTeacherTransAll(EmisId: any,counsId) {
  return this.dataService.getData(
    '/api/GetTeacherTransAppDet?EmisId=' + EmisId + "&cns_id=" + counsId,
    true
  );
}
GetVacncyUpdateSts(desig) {
  return this.dataService.getData(
    '/api/TchrDesVacSts?TchrType='+ desig,
    true
  );
}
// Seniority Challenge
getOneSeniorityChallenge(teachId, csnId, vacId){
  return this.dataService.getData('/api/ChlCnsSenVacGet?TchrId=' + teachId + '&CnslId=' + csnId + '&SenVacId=' + vacId, true);
 }
 postVacancyChallenge(data){
  return this.dataService.post('/api/ChlCnsSenVacCUD', data);
 }

 postVacancyUpdate(data){
  return this.dataService.post('/api/TchrDesVacStsCUD', data);
 }
 getSeniorityChallenge(csnId){
  return this.dataService.getData('/api/GetTeacherTransChlAprv?CnsId=' + csnId, true);
 }
// Dashboard
getEduDistDashboard(cnsId, directorate){
  return this.dataService.getData('/api/ChlCuntDist?CnslId='+cnsId+'&direc='+directorate,true);
 }
 getAllEduDist(){
  return this.dataService.getData('/api/GetAllEduDist',true);
 }
 // Chnage Vacancy
 getDesgVacNeed(des, udise){
  return this.dataService.getData('/api/getDesVacNeed?Desig=' + des + '&udise=' + udise, true);
 }

 getTrackChangeData(udise){
  return this.dataService.getData('/api/SchlDetlSate?UdiseCode='+udise,true);
 }

 getInterDistrict(distId){
  return this.dataService.getData('/api/CnsStsCheckGet?DistId=' + distId,true);
 }

 // For Vacancy insert and update
 getTechVac(SchlId, panel, des, sub, aided){
  return this.dataService.getData('/api/GetCnslVaccancy?SchlId=' + SchlId + '&Panel=' + panel + '&Desgn=' + des + '&Sub=' + sub + '&Aided=' + aided, true);
 }
 techTransferVacPost(data){
  return this.dataService.post('/api/CnslVacNewCUD', data);
 }
 techTransferVacPostAided(data){
  return this.dataService.post('/api/CnslVacNewCUDAided', data);
 }

 // Change school details 
 getSchDetails(udise){
  return this.dataService.getData('/api/TchrPanelSchlGet?Udise=' + udise,true);
 }
 postChangeSch(data){
  return this.dataService.post('/api/TchrPanelSchlCUD', data);
 }

//  Subject Summary
 getOneCnsnSubSumry(cnsn){
  return this.dataService.getData('/api/CounsellingStatusSub?CnsId=' + cnsn,true);
 }

 // Seniority Order 
 getSeniorityOrder(data){
  return this.dataService.post('/api/CnslTchListGetSen', data);
 }

 bulkUploadSeniority(data){
  return this.dataService.post('/api/CnslSenUpdtCUD', data);
 }

 // Application Summary
 getOverAll(cnsn, flag){
  return this.dataService.getData('/api/CnsSummaryApp?UserId=' + cnsn + '&Flag=' + flag, true);
 }

 // Challenge Vacancies
 getChallengeVac(csnId){
  return this.dataService.getData('/api/GetVacChlng?CnsId=' + csnId, true);
 }

 postChallenge(data){
  return this.dataService.post('/api/PostVacChlng', data);
 }

 getChallengeDetails(indId){
  return this.dataService.getData('/api/GetChlngAprGet?Id=' + indId, true);
 }

 // Bulk Vacancy 
 getBulkSchFromUdise(data){
  return this.dataService.post('/api/getBulkSchId', data);
 }

 // Aided School 
 getAidedSchTchList(cnsId){
  return this.dataService.getData('/api/CnslTchListGetopn?cnsnId=' + cnsId, true);
 }

 vcntGoPost(data){
  return this.dataService.post('/api/CnslGoCUD', data);
 }

 getVcntGo(vacId){
  return this.dataService.getData('/api/GetGoNo?VacId=' + vacId, true);
 }
 
 vcntApprovalPost(data) {
  return this.dataService.post('/api/aidedSchVcntApproval', data);
 }

 bulkVacancy() {
  return this.dataService.getData('/api/VacBulkReprt', true);
 }

 // Counselling Mapping for teacher
 postCnsnMapping(data) {
  return this.dataService.post('/api/postCnsnMapping', data);
 }

 getTeacherListForMpg(cnsnId) {
  return this.dataService.getData('/api/getTchlistForMpng?cnsnId=' + cnsnId, true);
 }

 getTknCnsn(data) {
  return this.dataService.post('/api/tknCnsnRmveCndt', data);
 }
      
//  // IndexDB set and get

//  addDataToIndexDB(keyName, data) {
//   this.commonservice.add(keyName, data).then(res => {
//     if (res) {
//       return res
//     }
//   })
// }
// // get the Json  in Index DB
// getIndexedDbjson(name) {
//   this.commonservice.get(name).then(res => {
//     this.setIndexDB(res)
//   })
// }

// setIndexDB(res) {
//   this.getIndexDBValue = res
// }

// getIndexDB() {
//   return this.getIndexDBValue;
// }
 

}

