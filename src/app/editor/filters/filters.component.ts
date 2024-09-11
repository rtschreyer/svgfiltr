import { Component, Input, Injectable, OnInit, SimpleChanges } from '@angular/core';
import { globalEventBus, Observer } from '../event.bus';

import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'st-filters',
  standalone: true,
  imports: [NgFor, NgIf],
  providers: [],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements  OnInit, Observer {

  @Input()
  rCoord?: string;
  @Input()
  gCoord?: string;
  @Input()
  bCoord?: string;


  @Input() channel = "pink";
  @Input() debug = true;

  constructor(){
    globalEventBus.registerObserver('CURVES',this);
  }

  ngOnInit(): void {
    /*  */
  }

  notify(data: any ){
    const filterValues: string[] = [];
    const cp = JSON.parse(
        JSON.stringify(    data as Object   )
    );
    this.channel = cp.channel;
    for ( const v of cp.aPoints.values() ) {
      let x = ( (v[0] / v[1]) / 7 ).toFixed(3);
      filterValues.push(x);
    }

    const c = cp.channel;
    const f = filterValues.toString().replace(/,/g,' ');
    if(c=='red') this.rCoord = f;
    if(c=='green') this.gCoord = f;
    if(c=='blue') this.bCoord = f;
  }

}
