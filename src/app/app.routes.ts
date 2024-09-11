import { Routes } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
//import { NewComponent } from './forms/new/new.component';

export const routes: Routes = [
    { path: "", redirectTo: "editor", pathMatch: 'full' },
    { path:  "forms", component: FormsComponent },
  //  { path:  "new", component: NewComponent },
    { path: "editor", loadChildren: () => import('./editor/editor.module')
        .then(m => m.EditorModule)  },
    { path: "controls", loadChildren: () => import('./editor/controls/controls.module')
        .then(m => m.ControlsModule)  } 
];
