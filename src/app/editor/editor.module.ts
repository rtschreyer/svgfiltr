import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorRoutingModule } from './editor.routing.module';
import { ControlsComponent } from './controls/controls.component';
//import { PlayerComponent } from './player/player.component';
import { FiltersComponent } from './filters/filters.component';
import { EditorComponent } from './editor.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ControlsComponent,
    FiltersComponent,
    EditorComponent,
    EditorRoutingModule
  ],
  exports: [
    EditorComponent
  ]
})
export class EditorModule { }
