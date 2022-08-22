import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  constructor(public el:ElementRef) { 
    console.log("Esto es lo que imprime la directiva: ",el.nativeElement);
     
    el.nativeElement.style.background="blue";
    el.nativeElement.style.color="white";
    el.nativeElement.style.padding="20px";
    el.nativeElement.style.width="50%";
    el.nativeElement.style.margin="20px";
    el.nativeElement.style.textAlign="center";
    el.nativeElement.style.fontSize="50px";
    el.nativeElement.style.border="3px solid green";

  }

  ngOnInit(){
    this.el.nativeElement.innerText=this.el.nativeElement.innerText.toUpperCase();
    console.log("Texto innerText:", this.el.nativeElement.innerText)

  }

}
