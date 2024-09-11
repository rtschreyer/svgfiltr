import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'st-forms',
  standalone: true,
  imports: [FormsModule,JsonPipe],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements AfterViewInit, OnDestroy {

 
  @ViewChild( NgForm, {static: true} )
  ngForm!: NgForm;
  private nameChange: Subscription = new Subscription();

  ngAfterViewInit(): void {
    this.nameChange  = this.ngForm.valueChanges!.subscribe(
      value => console.log(value)
    )
  }

  ngOnDestroy(): void {
    this.nameChange.unsubscribe();
  }

  passwordChange(text: string){
    console.log(text);
  }

  updateMail(e: Event){
    let c = this.ngForm.controls['credentials'] as FormGroup;
    console.log('Update mail: ',c.controls['email'].value);
  }
}
