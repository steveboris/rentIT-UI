import { Injectable } from '@angular/core';
import { setClassMetadata } from '@angular/core/src/r3_symbols';
import { BehaviorSubject, Observable } from 'rxjs';
import { Article } from './models/Article';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  placeHolder = [];
  cartItems = new BehaviorSubject([]);
  items: any[];
  

  constructor() {

    let ls = JSON.parse(localStorage.getItem('cart'));
    if (ls) this.cartItems.next(ls);
  }

  addItem(product: any) {
    let ls : any[] = JSON.parse(localStorage.getItem('cart'));

    let exist: any;

    if(ls) {
      exist = ls.find(item => {
        return item?.articleId === product?.articleId;
      });
    }

    if(exist) {
      //exist.quantity++;
      this.setData(ls);
    } else {
      if(ls) {
        let newData = [...ls, product];
        this.setData(newData);
        this.cartItems.next(JSON.parse(localStorage.getItem('cart')));
      } else {
        this.placeHolder.push(product);
        this.setData(this.placeHolder);
        this.cartItems.next(this.placeHolder);
      }
    }
  }

  setData(item: any) {
    localStorage.setItem('cart', JSON.stringify(item));
    this.cartItems.next([]);
  }

  removeData(id: number) {
    let ls : any[] = JSON.parse(localStorage.getItem('cart'));

    let exist: any;

    if(ls) {
      exist = ls.find(item => {
        return item?.articleId === id;
      });
    }

    ls.forEach((element, index) => {
      if(element?.articleId === id) ls.splice(index, 1);
    });

    this.setData(ls);
    this.cartItems.next(JSON.parse(localStorage.getItem('cart')));
  }

  removeAll() {
    localStorage.removeItem('cart');
  }

  getCartContent(): Observable<any> {
    return this.cartItems.asObservable();
  }
}
