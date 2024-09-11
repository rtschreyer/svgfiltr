import { Component } from '@angular/core';
import { FiltersComponent } from './filters/filters.component';
import { ControlsComponent } from './controls/controls.component';
//import { PlayerComponent } from './player/player.component';
import { ActivatedRoute, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'st-editor',
  standalone: true,
  imports: [ 
    ControlsComponent, 
    RouterOutlet, 
    RouterLink,
    FiltersComponent
],
  providers: [],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {

  constructor(private route: ActivatedRoute){ }
  
}
