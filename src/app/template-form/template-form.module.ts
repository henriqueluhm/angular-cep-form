import { HttpClientModule  } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateFormComponent } from './template-form.component';
import { FormsModule } from '@angular/forms';
import { CampoControlErroComponent } from './../campo-control-erro/campo-control-erro.component';
import { FormDebugComponent } from './../form-debug/form-debug.component';


@NgModule({
  declarations: [
    TemplateFormComponent,
    FormDebugComponent,
    CampoControlErroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule 
  ]
})
export class TemplateFormModule { }
