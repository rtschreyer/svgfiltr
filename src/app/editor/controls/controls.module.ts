import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsComponent } from './controls.component';
import { CurvesComponent } from './curves/curves.component';
import { ControlsRoutingModule } from './controls.routing.module';
import { EqualizerComponent } from './equalizer/equalizer.component';
import { Router, RouterOutlet } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ControlsComponent,
    ControlsRoutingModule,
    CurvesComponent,
    EqualizerComponent
  ],
  providers: [RouterOutlet, ReactiveFormsModule],
  exports: [
    ControlsComponent,
    EqualizerComponent
  ]
})
export class ControlsModule { }