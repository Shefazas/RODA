import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as AOS from 'aos';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  partners: any;
  team: any;

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    window.scroll(0,0);
    AOS.init({
      duration: 1200,
    })
    this.api.notifyObservable$.subscribe(res => {
      if(res.refresh){
          window.location.reload()
      }   
})
    this.listPartners();
    this.listTeam();

  }
  listPartners(){
    this.api.GetPartner().subscribe(res=>{
      this.partners=res['response'];
    })
  }
  listTeam() {
    this.api.GetTeam().subscribe(res=>{
      this.team=res['response'];
    })
  }

////////////////owl carousel////////////
   ////brand////
   brandOptions: OwlOptions = {
    autoWidth: true,
    items: 1,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1500,
    autoplayHoverPause: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 100,
    navText: ['', ''],
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 5,
      },
    },
  };

}
