import { 
    Component, Input,
    ContentChild, OnInit, AfterViewInit, 
    TemplateRef, ElementRef, HostListener 
  } from '@angular/core';
  import { NgFor } from '@angular/common';
  import { GridlineDirective } from '../gridline.directive';
  import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
  import { bootstrapApplication } from '@angular/platform-browser';
  import { globalEventBus } from '../../event.bus';
  
  
  @Component({
    selector: 'st-curves',
    templateUrl: './curves.component.html',
    styleUrl: './curves.component.scss',
    standalone: true,
    imports: [NgFor, ReactiveFormsModule]
  })
  export class CurvesComponent implements OnInit, AfterViewInit{
  
    @Input() 
    myactiveColor: string = '';
  
    @Input()
    absX: number = 0;
  
    @Input()
    absY: number = 0;
  
    colorChange(event: Event, value: string){
      this.myactiveColor = value;
      const list = document.getElementsByClassName('activated');
      for(let item of Object.values(list)){
        item.classList.remove('activated');
      }
      const list2 = document.getElementsByClassName(this.myactiveColor);
      for(let item of Object.values(list2)){
        item.classList.add('activated');
      }
      console.log(this.myactiveColor);
      this.aPoints = (this.myactiveColor == 'green') ? this.gPoints :
                     (this.myactiveColor == 'blue') ? this.bPoints : this.rPoints;
    }
  
    activatedColor = new FormGroup({
        activeColor: new FormControl('', { nonNullable: true })
    });
  
    reset = () => {};
  
    num_x: number = 10;
    num_y: number = 10;
  
    gridLinesX: number[] = [...Array(this.num_x)];
    gridLinesY: Array<number> = [...Array(this.num_y)];
    gridContext = { gridLinesX: this.gridLinesX, gridLinesY: this.gridLinesY }
  
    @ContentChild ( GridlineDirective, {static: false, read: TemplateRef} )
    gL!: TemplateRef<any>
  
    draggedObject: Element | undefined;
    startPos: [number, number] = [0,0];
    startI: number = 1;
    dropZone:[number, number] [] = [[75, 75], [525, 525]];
    rPoints: [number, number] [] = [[75, 525], [525, 75]];
    gPoints: [number, number] [] = [[75, 525], [525, 75]];
    bPoints: [number, number] [] = [[75, 525], [525, 75]];
  
    aPoints: [number, number] [] = [[75, 525], [525, 75]];
  
     constructor( private elem: ElementRef){
        //this.elem.nativeElement
     }
     ngOnInit(): void {
      globalEventBus.notifyObservers(
        'CURVES',
        {channel:'master',aPoints: [[75, 75], [525, 525]]}
      );
     }
     ngAfterViewInit(){
      const doc = this.elem.nativeElement as HTMLElement;
      const list = doc.getElementsByClassName('activated');
  
      for(let item of Object.values(list)){
        if(item.classList)
          item.classList.remove('activated');
      }
      try {
          const bc = doc.firstChild! as HTMLElement;
          const bcr = bc.getBoundingClientRect();
          this.absX = bcr.left;
          this.absY = bcr.top;
      } catch {}
  
  
       const onReset = () => {
          if(this.aPoints.length > 2)
            this.aPoints.splice(1,this.aPoints.length - 2);
          this.aPoints.sort( (a, b) => a[0] - b[0] );
          this.changeChannelParams([this.aPoints,this.myactiveColor]);
        }
        this.reset = onReset;
     }
  
  
     changeChannelParams(params:[[number, number] [],string]){
      const paramsObj = {aPoints:params[0],channel:params[1]};
      globalEventBus.notifyObservers('CURVES',paramsObj);
     }
  
  
    getCircle(event: MouseEvent, flag?: string) {
      if( (event.target as Element).nodeName == 'circle' ){
        var x: string = (event.target as Element).getAttribute('cx') as string;
        var y: string = (event.target as Element).getAttribute('cy') as string;
        const p: [number, number] = [parseInt(x) as number,parseInt(y) as number];
  
        let v = this.aPoints.values();
        let result: any;
        for(const i of v){
          if( i[0]==p[0] && i[1]==p[1]){
            flag == ('i') ? result = this.aPoints.indexOf(i) :
            flag == ('p') ?
                (this.aPoints.indexOf(i) > 0 || this.aPoints.indexOf(i) <= this.aPoints.length ) ?
                result =  this.aPoints[this.aPoints.indexOf(i)] : null  :
                result =  [this.aPoints.indexOf(i),this.aPoints.slice(this.aPoints.indexOf(i),1)]
          }
        }
        return result;
  
      }
    }
  
  
     @HostListener("click", ['$event']) onClick(event: MouseEvent){
      
      const elem = event.target as Element;
      /** MouseClick on activated Line: create new Point */
      if(  elem.nodeName == 'path' && elem.classList.contains('activated') ){
        let x: number = Math.abs(event.clientX-this.absX);
        let y: number = Math.abs(event.clientY-this.absY);
        (event.target as Element).setAttributeNS('style','cursor','grab');
        this.aPoints.push([x, y]);
        this.aPoints.sort( (a, b) => a[0] - b[0] );
      }
    }
  
  
    @HostListener("mousedown", ['$event']) onDragStart(event: DragEvent, draggedObject: Element) {
      const elem = event.target as Element;
      if( elem.nodeName == 'circle' && elem.classList.contains('activated')) {
        if(event.shiftKey){
            /** MouseClick + shiftKeyDown on activated Point: delete Point */ 
            this.aPoints.splice(this.getCircle(event, 'i'),1);
            this.aPoints.sort( (a, b) => a[0] - b[0] );
            this.changeChannelParams([this.aPoints,this.myactiveColor]);
        } else {
          /** Else: MouseDown on Circle: start dragging **/
            event.preventDefault();  
            this.draggedObject = event.target as Element;
            this.startPos = this.getCircle(event, 'p');
            this.startI = this.getCircle(event, 'i');
            (event.target as Element).setAttribute('draggable','true') ;
            //console.log('1-> ',this.startPos,this.draggedObject,event);
        }
      }
    }
  
    @HostListener("mouseup", ['$event']) onDragEnd(event: DragEvent, draggedObject: Element) {
      if( (event.target as Element).nodeName == 'circle' ){
        let i = this.startI;
        let x: number = Math.abs(event.clientX-this.absX);
        let y: number = Math.abs(event.clientY-this.absY);
        const p: [number, number] = [x as number,y as number];
          if(
            ( x <= this.dropZone[0][0] ) || ( y <= this.dropZone[0][1] ) ||
            ( x >= this.dropZone[1][0] ) || ( y >= this.dropZone[1][1] ) 
          ){
            /* outside dropzone: roll back */
            this.aPoints[i] = this.startPos;
            this.aPoints.sort( (a, b) => a[0] - b[0] );
            if (this.draggedObject != undefined){
              this.draggedObject.setAttribute('cx',this.startPos[0].toString());
              this.draggedObject.setAttribute('cy',this.startPos[1].toString());
            
            } 
          }else {
              /* Drop */
              this.aPoints[i] = p;
              this.aPoints.sort( (a, b) => a[0] - b[0] );
              if (this.draggedObject != undefined){
                this.draggedObject.setAttribute('cx',p[0].toString());
                this.draggedObject.setAttribute('cy',p[1].toString());
              }
          }
          this.changeChannelParams([this.aPoints,this.myactiveColor]);
          (this.draggedObject as Element).setAttribute('draggable','false') ;
          this.draggedObject = undefined;
          this.aPoints.sort( (a, b) => a[0] - b[0] );
      }
    }
  
  
    @HostListener("mousemove", ['$event']) onDrag(event: DragEvent, draggedObject: Element) {
      if( (event.target as Element).nodeName == 'circle' ){
        if (this.draggedObject != undefined){
          let x: number = Math.abs(event.clientX-this.absX);
          let y: number = Math.abs(event.clientY-this.absY);
          this.draggedObject.setAttribute('cx',(x).toString());
          this.draggedObject.setAttribute('cy',(y).toString());
  
          this.changeChannelParams([this.aPoints,this.myactiveColor]);
        }   
      } 
    }
  
  }
  
  