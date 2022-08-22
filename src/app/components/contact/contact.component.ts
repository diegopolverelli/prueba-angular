import { Component, OnInit, ViewChild } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public widthSlider: number;
  public anchuraToSlider:number;
  public captions: boolean;
  public autor: any;
  
  @ViewChild("textos") textos: any;

  constructor() { 
    this.widthSlider=0;
    this.anchuraToSlider=0;
    this.captions=false;
  }

  ngOnInit(): void {

    var opcion_clasica=document.querySelector("#texto")?.innerHTML
    console.log("Con JavaScript:",opcion_clasica);

  }

  ngAfterViewInit() {
    console.log("Con Viewchild:",this.textos)
    console.log("Imprimo el texto con Viewchild:",this.textos.nativeElement.textContent)
  }  

  cargarSlider(){
    this.anchuraToSlider=this.widthSlider;
  }

  resetearSlider(){
    this.anchuraToSlider=0;
  }

  getAutor(event:any){
    console.log(event);
    this.autor=event;
  }

}
