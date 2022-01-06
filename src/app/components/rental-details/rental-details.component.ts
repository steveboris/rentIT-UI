import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ArticleQuantity } from 'src/app/models/ArticleQuantity';
import { Invoice } from 'src/app/models/Invoice';
import { Rental } from 'src/app/models/Rental';
import { ArticleQuantityService } from 'src/app/services/article-quantity.service';
import { ArticleService } from 'src/app/services/article.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-details',
  templateUrl: './rental-details.component.html',
  styleUrls: ['./rental-details.component.css']
})
export class RentalDetailsComponent implements OnInit {

  @Input() rentalId: number;
  actualRental: Rental;
  articleQuantities: ArticleQuantity[] = [];
  invoice: Invoice;

  constructor(
    public activeModal: NgbActiveModal,
    private rentalService: RentalService,
    private invoiceService: InvoiceService,
    private articleQuantityService: ArticleQuantityService,
    private articleService: ArticleService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.rentalService.getOne(this.rentalId).subscribe((rental: Rental) => {
      this.actualRental = rental;
      this.invoiceService.getOne(rental.invoice).subscribe(invoice => {
        this.invoice = invoice;
        this.articleQuantities = [];
        rental.articleQuantity.forEach(quantity => {
          this.articleQuantityService.getOne(quantity).subscribe(articleQuantitie => {
            this.articleService.getOne(articleQuantitie.article).subscribe(article_ => {
              articleQuantitie.article = article_;              
              this.articleQuantities.push(articleQuantitie);
            });
          });
        });
      });
    });
  }

  returnArticle(id: number) {
    let toReturn = {
      "ids" : [
        id
      ]
    }

    this.articleQuantityService.return(toReturn).subscribe(response => {
      this.toastr.success(response.message, "Success!");
      this.ngOnInit();
    }, error => {
      this.toastr.error("Error while returning the article", "Error!");
    });
  }

  closeModal() {
    this.activeModal.close({
      returned: true
    });
  }

}
