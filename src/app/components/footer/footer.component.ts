import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  actualUserId: any;
  totalitem: number;

  constructor() {
    this.totalitem = 0;
  }

  ngOnInit(): void {
    this.actualUserId = localStorage.getItem('id');
    this.countTotalCardItem();
  }

  countTotalCardItem() {
    const items: Array<any> = JSON.parse(localStorage.getItem('cart'));
    this.totalitem = items.length;
  }

}
