import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


declare var $: any;

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() anchura:number;
  @Input() etiquetas: boolean;

  @Output() conseguirAutor=new EventEmitter();

  public autor:any;

  constructor() { 
    this.anchura=0;
    this.etiquetas=false;
    this.autor={
      nombre:"Diego Polverelli",
      website: "www.nutremas.com.ar",
      youtube: "DiegoPolverelli"
    }
  }

  ngOnInit(): void {
    $("#logo").click(function (e: any) {
      e.preventDefault();
      $("header").css("background", "green")
        .css("height", "50px")
    });

    // $(".galeria").css("border","5px solid blue")

    $('.galeria').bxSlider({
      mode: 'fade',
      captions: this.etiquetas,
      slideWidth: this.anchura
    });

    // Lanzo el evento (sin esperar el click)
    this.conseguirAutor.emit(this.autor)

  }


  lanzar(event:any){
    console.log(event);
    this.conseguirAutor.emit(this.autor)
  }

}
