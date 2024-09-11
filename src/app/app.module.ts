import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { MyFormsModule } from './forms/myforms.module';
import { AppComponent } from './app.component';
import { EditorModule } from './editor/editor.module';



@NgModule({
  declarations: [],
  imports: [
    AppComponent,
    CommonModule,
    EditorModule
   // MyFormsModule,
  ]
})
export class AppModule { }