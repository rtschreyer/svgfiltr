import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlsComponent } from './controls.component';
import { CurvesComponent } from './curves/curves.component';
import { EqualizerComponent } from './equalizer/equalizer.component';

const routes: Routes = [
  { path: '', component: ControlsComponent,
      children: [
        {  path: 'curves', component: CurvesComponent },
        {  path: 'equalizer', component: EqualizerComponent }
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlsRoutingModule { }
