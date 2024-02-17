import {Component, Input, SimpleChanges} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-list-admin-panel',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule,
    NgForOf
  ],
  template: `

    <section>
      <div class="container">
        <h1>{{title}} Inventory</h1>
        <table mat-table [dataSource]="dataSource" >

          <ng-container *ngFor="let column of displayedColumn let i=index" [matColumnDef]="column">
            <th mat-header-cell *matHeaderCellDef> {{column}}</th>
            <td mat-cell *matCellDef="let element">{{element[column]}}</td>
          </ng-container>

<!--          <ng-container matColumnDef="name">-->
<!--            <th  mat-header-cell *matHeaderCellDef>Name</th>-->
<!--            <td mat-cell *matCellDef="let element">{{element.name}}</td>-->
<!--          </ng-container>-->

<!--          <ng-container matColumnDef="category">-->
<!--            <th  mat-header-cell *matHeaderCellDef>Category</th>-->
<!--            <td mat-cell *matCellDef="let element">{{element.category}}</td>-->
<!--          </ng-container>-->

<!--          <ng-container matColumnDef="price">-->
<!--            <th  mat-header-cell *matHeaderCellDef>Price</th>-->
<!--            <td mat-cell *matCellDef="let element">{{element.price}}</td>-->
<!--          </ng-container>-->

<!--          <ng-container matColumnDef="stock">-->
<!--            <th  mat-header-cell *matHeaderCellDef>Stock</th>-->
<!--            <td mat-cell *matCellDef="let element">{{element.stock}}</td>-->
<!--          </ng-container>-->

<!--          <ng-container matColumnDef="delivery">-->
<!--            <th  mat-header-cell *matHeaderCellDef>Deliverable</th>-->
<!--            <td mat-cell *matCellDef="let element">{{element.delivery}}</td>-->
<!--          </ng-container>-->

          <tr mat-header-row *matHeaderRowDef="displayedColumn"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumn"></tr>
        </table>


      </div>


    </section>
    <mat-paginator
      [length] = "length"
      [pageSize]="5"
      [showFirstLastButtons] = true
      [pageSizeOptions]="[5,10,20]"
      [pageIndex]="currentPage"
      (page) ="handlePageEvent($event)"
    >
    </mat-paginator>
  `,
  styleUrl: './list-admin-panel.component.css'
})
export class ListAdminPanelComponent {



  @Input("title")
  title:string = '';

  @Input("items")
  items: any[] = [
    // {id: 1, name: 'item1', category: 'wedding'},
    // {id: 2, name: 'item1', category: 'wedding'},
    // {id: 3, name: 'item1', category: 'wedding'},
    // {id: 4, name: 'item1', category: 'wedding'},
    // {id: 5, name: 'item1', category: 'wedding'},
    // {id: 6, name: 'item1', category: 'wedding'},
    // {id: 7, name: 'item1', category: 'wedding'}
  ];


  // detects the change of the
  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChange");
    if ('items' in changes) {
      this.length = this.items.length;
    }
  }

  dataSource:any  = new MatTableDataSource<any>(this.items);

  @Input('displayedColumn')
  displayedColumn:string[] = [];
  // 'id','name','category', 'delivery', 'price', 'stock'
  ngOnInit(){
    console.log("input from adminPanel");
    console.log(this.items);
    this.sortPage(this.dataSource.data);
    this.loadPage(5,0);
  }

  @Input('length')
  length: number = 0;
  currentPage: number =0;

  handlePageEvent(e: PageEvent){
    console.log(e.pageIndex);
    this.currentPage = e.pageIndex;
    this.loadPage(e.pageSize, e.pageIndex);
  }

  loadPage(pageSize: number, pageIdx: number){
    const startIdx = pageIdx*pageSize;
    const endIdx = startIdx+ pageSize;

    this.dataSource.data = this.items.slice(startIdx,endIdx); // 0~5 5is exclusive;
  }

  sortPage(items:any){

    items.sort((a:any,b:any)=> b.id-a.id);
  }

}
