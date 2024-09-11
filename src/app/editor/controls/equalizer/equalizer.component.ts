import { Component } from '@angular/core';
import {ReactiveFormsModule, FormControl} from '@angular/forms';
import { globalEventBus } from '../../event.bus';

@Component({
  selector: 'st-equalizer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './equalizer.component.html',
  styleUrl: './equalizer.component.scss'
})
export class EqualizerComponent {

 
    saturation = new FormControl('');



    paramChange(paramName: string,value:string){
        console.log(paramName,value);
        this.changeChannelParams(paramName,value);
    }

    changeChannelParams(paramName:string,value:string){
      const paramsObj = {paramName,value};
      console.log('EQ',paramsObj);
      globalEventBus.notifyObservers('EQ',paramsObj);
     }

}
