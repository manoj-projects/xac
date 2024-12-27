import { Injectable } from '@angular/core';
import { DataService } from '../../../services/data.service';

@Injectable()
export class ResetPasswordService {
  constructor(private dataService: DataService) {}

  resetPasswordAPI(data , refresh) {
     
    return this.dataService.post('/api/ResetPassword', data);
  }

}
