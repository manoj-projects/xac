import { Injectable } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readingFileApi = environment.readingFileApi;

  constructor(private dataService: DataService) { }

  getSpecialDay() {
    return this.dataService.getJSON("../../../assets/json/today_special.json");
  }
  getQuotes() {
    return this.dataService.getJSON("../../../assets/json/Quotes.json");
  }
  getDashboardData(data: any, refresh: boolean) {
    return this.dataService.post('/api/schoolsDashboard', data);
  }
  getDashboardBirthday(schlId: any) {
    return this.dataService.getData('/api/DBoardBirthInfo?School_id=' + schlId, true)
  }
  Getsclcommlist(school_id,utype_id){
    return this.dataService.getData('/api/SclCommgetlist?schlId=' + school_id + '&UType=' + utype_id,true);
  }
  getUploadedFiles(bucketName,fileName,expiry) {
    let params = {"bcktId":bucketName,"filename":fileName,"expiry":expiry};
    return this.dataService.getDataWithParams(this.readingFileApi,params, true)
  }
  Getsclcommlistbyid(index_id){
    return this.dataService.getData('/api/SclCommgetDetail?Id=' + index_id ,true);
  }
}
