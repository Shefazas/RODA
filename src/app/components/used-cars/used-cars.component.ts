import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-used-cars',
  templateUrl: './used-cars.component.html',
  styleUrls: ['./used-cars.component.css']
})
export class UsedCarsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scroll(0,0);
  }

}
