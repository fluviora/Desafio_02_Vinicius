import { Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map: google.maps.Map;
  minhaPosicao: google.maps.LatLng;

  @ViewChild('map') mapRef: ElementRef;
 /*  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef; */

  /* map: google.maps.Map:   */

  constructor(private geolocation: Geolocation) {}

  ionViewWillEnter(){
    this.exibirMapa();
  }

  exibirMapa(){
    const posicao = new google.maps.LatLng(-15.663328, -47.855380);
    const opcoes = {
      center: posicao,
      zoom: 15,
      /* disableDefaultUI: true */
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, opcoes);

    this.buscarPosicao();

  }

  buscarPosicao(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.minhaPosicao = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

      this.irParaPosicao();
      
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  irParaPosicao(){
    this.map.setCenter(this.minhaPosicao);
    this.map.setZoom(15)

    new google.maps.Marker({
      position: this.minhaPosicao,
      map: this.map,
      title: 'Minha Posição!',
      animation: google.maps.Animation.BOUNCE
    });
  }
}
