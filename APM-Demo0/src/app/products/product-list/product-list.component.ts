import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.actions';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  componentActive = true;

  constructor(private productService: ProductService,
              private store: Store<fromProduct.State>) { }

  ngOnInit(): void {

    this.store.pipe(select(fromProduct.getError),
    takeWhile(() => this.componentActive)).subscribe(
      err => this.errorMessage = err
    );

    this.store.pipe(select(fromProduct.getCurrentProduct),
    takeWhile(() => this.componentActive)).subscribe(
      currenctProduct => this.selectedProduct = currenctProduct
    );

    this.store.dispatch(new productActions.Load());
    this.store.pipe(select(fromProduct.getProducts),
    takeWhile(() => this.componentActive))
      .subscribe((products: Product[]) => this.products = products);

    this.store.pipe(select(fromProduct.getShowProductCode),
    takeWhile(() => this.componentActive)).subscribe(
      showProductCode => this.displayCode = showProductCode
    );
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

}
