import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndianCurrency } from './indianCurrency.pipe';



@NgModule({
  declarations: [IndianCurrency],
  imports: [
    CommonModule
  ],
  exports:[IndianCurrency]
})
export class PipeModule { }
