import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/card.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  actualUserId: any;
  totalitem: number;

  constructor(
    private cardService: CardService
  ) {
    this.totalitem = 0;
    this.cardService.getCartContent().subscribe(content => {
      console.log(content);
      this.totalitem = content.length;
    });
  }

  ngOnInit(): void {
    this.actualUserId = localStorage.getItem('id');
  }

}
