import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RentalDetailsComponent } from 'src/app/components/rental-details/rental-details.component';
import { Rental } from 'src/app/models/Rental';
import { User } from 'src/app/models/User';
import { ArticleQuantityService } from 'src/app/services/article-quantity.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userId: number;
  user: User;
  rentals: Rental[] = [];
  totalArticles: number;
  totals = {
    articles: 0,
    returned: 0,
  };
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private rentalService: RentalService,
    private invoiceService: InvoiceService,
    private modalService: NgbModal,
    private articleQuantityService: ArticleQuantityService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((param) => {
      this.userId = param.id;
      this.userService.getOne(this.userId).subscribe((user_) => {
        this.user = user_;
        this.rentals = [];
        this.user.rental.forEach((rentalId) => {
          this.rentalService.getOne(rentalId).subscribe((rental: Rental) => {
            this.invoiceService.getOne(rental.invoice).subscribe((invoice) => {
              rental.invoiceEn = invoice;
            });
            this.rentals.push(rental);
            this.totals = this.getAllRentedArticles(this.rentals);
          });
        });
      });
    });
  }

  getAllRentedArticles(rentals: Rental[]): any {
    let totals = {
      articles: 0,
      returned: 0,
    };

    rentals.forEach((rental) => {
      totals.articles += rental.articleQuantity.length;
      rental.articleQuantity.forEach((quantity) => {
        this.articleQuantityService.getOne(quantity).subscribe(quantity_ => {
          if (quantity_.returned) {
            totals.returned++;
          }
        });        
      });
    });

    return totals;
  }

  openRentalDetails(id: number) {
    const modalRef = this.modalService.open(RentalDetailsComponent, {
      windowClass: 'modal-class',
      backdrop:'static',
    });

    modalRef.componentInstance.rentalId = id;

    modalRef.result.then((data:any) => {
      if(data.returned) {
        this.ngOnInit();
      }
    });
  }
}
