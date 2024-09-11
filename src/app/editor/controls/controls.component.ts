import { Component} from '@angular/core';
import { ControlsRoutingModule } from './controls.routing.module';
import { ActivatedRoute, RouterOutlet, RouterLink } from '@angular/router';
import { CurvesComponent } from './curves/curves.component';

@Component({
  selector: 'st-controls',
  standalone: true,
  imports: [CurvesComponent, RouterOutlet, RouterLink],
  providers: [RouterOutlet],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss'
})
export class ControlsComponent {

  constructor(private route: ActivatedRoute){}
  
}