import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';

import { DASHBOARD_ROUTES } from 'src/app/components/dashboard/dashboard-routing';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DASHBOARD_ROUTES),
    //Prime NG
    ToastModule,
    ChartModule,
    CardModule,
    //Shared
    SharedModule
  ],
  providers: [CookieService, MessageService]
})
export class DashboardModule { }
