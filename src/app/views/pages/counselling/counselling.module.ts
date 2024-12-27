import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CommonService } from 'src/app/services/common.service';
import { CounsellingService } from './counselling.service';
import { CounsellingComponent } from './counselling.component';
import { PlanNewCounsellingComponent } from './plan-new-counselling/plan-new-counselling.component';
import {StepsModule} from 'primeng/steps';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { TabViewModule } from 'primeng/tabview';
import {InputSwitchModule} from 'primeng/inputswitch';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileUploadModule } from 'primeng/fileupload';
import { SidebarModule } from 'primeng/sidebar';
import { PipeModule } from 'src/app/custompip/pipe.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DashboardComponent } from '../dashboard/dashboard.component';

  const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
  };
  
  const routes: Routes = [
    {
      path: '',
      component: CounsellingComponent,
      children: [
        // {
        //   path: 'dashboard',
        //   component: CounsellingDashboardComponent
        // },
        {
          path: 'dashboard',
          component: PlanNewCounsellingComponent
        },
      ]
 }
]
@NgModule({
  declarations: [
    CounsellingComponent,
    PlanNewCounsellingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    MultiSelectModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    SliderModule,
    CheckboxModule,
    RadioButtonModule,
    TabViewModule,
    CardModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    KeyFilterModule,
    CalendarModule,
    SelectButtonModule,
    ConfirmDialogModule,
    AccordionModule,
    InputTextModule,
    StepsModule,
    InputSwitchModule,
    CKEditorModule,
    FileUploadModule,
    SidebarModule,
    PipeModule,
    ProgressSpinnerModule
  ],
  providers: [
    CommonService,
    CounsellingService,
    ConfirmationService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class CounsellingModule { }
