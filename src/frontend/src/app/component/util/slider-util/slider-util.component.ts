import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-slider-util',
  templateUrl: './slider-util.component.html',
  styleUrls: ['./slider-util.component.css']
})
export class SliderUtilComponent implements OnInit {

  constructor() { }

 images: any[];
 value:any;
  ngOnInit() {
    this.images = [];
     this.images.push({source:'../../../assets/image/1.jpg', alt:'Description for Image 1', title:'Title 1'});
     this.images.push({source:'../../../assets/image/2.jpg', alt:'Description for Image 2', title:'Title 2'});
      this.images.push({source:'../../../assets/image/3.jpg', alt:'Description for Image 3', title:'Title 3'});
  }

}
