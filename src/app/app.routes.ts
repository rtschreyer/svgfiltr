import { Routes } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: 'full' },
    { path:  "forms", component: FormsComponent },
    { path:  "login", component: LoginComponent },
    { path: "editor", loadChildren: () => import('./editor/editor.module')
        .then(m => m.EditorModule)  },
    { path: "controls", loadChildren: () => import('./editor/controls/controls.module')
        .then(m => m.ControlsModule)  } 
];
