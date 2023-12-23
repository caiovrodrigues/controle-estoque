import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { RouterModule } from '@angular/router';
import { PRODUCTS_ROUTING } from './products.routing';
import { ProductsHomeComponent } from './page/products-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsTableComponent } from './products-table/products-table.component';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [ProductsHomeComponent, ProductsTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(PRODUCTS_ROUTING),
    //PrimeNG
    CardModule,
    TableModule,
    ButtonModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    ConfirmDialogModule,
    ToastModule,
    //Shared
    SharedModule
  ],
  providers: [ConfirmationService, MessageService],
  exports: []
})
export class ProductsModule { }
