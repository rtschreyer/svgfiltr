import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './editor.component';
import { ControlsComponent } from './controls/controls.component';
import { CurvesComponent } from './controls/curves/curves.component';
import { EqualizerComponent } from './controls/equalizer/equalizer.component';
import { FiltersComponent } from './filters/filters.component';
import { EqFilterComponent } from './filters/eq.filter/eq.filter.component';

const routes: Routes = [
  { path: '', component: EditorComponent,
      children: [
        { path: '', component: CurvesComponent, outlet: 'control' },
        { path: '', component: FiltersComponent, outlet: 'filter' },
        { path: 'equalizer', component: EqualizerComponent, outlet: 'control' },
  ]},

  { path: 'curves', component: EditorComponent,
    children: [
      { path: '', component: CurvesComponent, outlet: 'control' },
      { path: '', component: FiltersComponent, outlet: 'filter' }
  ]},
  
  { path: 'equalizer', component: EditorComponent,
    children: [
      { path: '', component: EqualizerComponent, outlet: 'control' },
      { path: '', component: EqFilterComponent, outlet: 'filter' }
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
