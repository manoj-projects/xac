import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FloodyService {
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
}

