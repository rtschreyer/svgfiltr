import { Component, Input, Injectable, OnInit, SimpleChanges } from '@angular/core';
import { globalEventBus, Observer } from '../../event.bus';

import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'st-filters',
  standalone: true,
  imports: [NgFor, NgIf],
  providers: [],
  templateUrl: './eq.filter.component.html',
  styleUrl: './eq.filter.component.scss'
})
export class EqFilterComponent implements  OnInit, Observer {

    @Input() gammaRa = 1;
    @Input() gammaGa = 1;
    @Input() gammaBa = 1;
    @Input() saturation = 1;

    constructor(){
        globalEventBus.registerObserver('EQ',this);
      }

    ngOnInit(): void {
        
    }

    notify(data: any ){
        this.gammaRa = 1.0;
        this.gammaGa = 1.0;
        this.gammaBa = 1.0;
      if(data.paramName=='saturation')
      {  this.saturation = data.value;   }

    }

}