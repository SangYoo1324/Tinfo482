import {Component, ContentChildren, Input, QueryList, SimpleChanges, TemplateRef} from '@angular/core';
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
import {NgForOf, NgTemplateOutlet} from "@angular/common";
import {BehaviorSubject} from "rxjs";
import {ItemService} from "../../../_service/item.service";

@Component({
  selector: 'app-list-admin-panel',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule,
    NgForOf,
    NgTemplateOutlet
  ],
  template: `

    <section>
      <div class="container">
        <h1>{{title}} Inventory</h1>
        <table mat-table [dataSource]="dataSource" >

          <ng-container *ngFor="let column of actualDisplayedColumn let i=index" [matColumnDef]="displayedColumn[i]">
            <th mat-header-cell *matHeaderCellDef> {{column}}</th>
            <td mat-cell *matCellDef="let element">{{element[displayedColumn[i]]}}</td>
          </ng-container>


          <ng-container matColumnDef="delete">
            <th mat-header-cell *matHeaderCellDef> Delete</th>
            <td mat-cell *matCellDef="let element">
              <button class="btn btn-danger delete-btn" (click)="deleteTarget(element.id)"> Delete</button></td>
          </ng-container>


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


  constructor(private itemService:ItemService) {
  }

  @Input("title")
  title:string = '';

  @Input("items$")
  items$!:BehaviorSubject<any>;



  dataSource:any  = new MatTableDataSource<any>();

  @Input('displayedColumn')
  displayedColumn:string[] = [];
  // 'id','name','category', 'delivery', 'price', 'stock'
  @Input('actualDisplayedColumn')
  actualDisplayedColumn:string[] = [];
  ngOnInit(){
    console.log("input from adminPanel");
    this.items$.subscribe(obs=>{
      obs.subscribe((resp:any)=>{
        this.dataSource.data = resp;
        this.length = this.dataSource.data.length;
      })
    })
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

    this.dataSource.data = this.dataSource.data.slice(startIdx,endIdx); // 0~5 5is exclusive;
  }

  sortPage(items:any){

    items.sort((a:any,b:any)=> b.id-a.id);
  }


  deleteTarget(id:number) {
    switch (this.title){
      case 'Flower':
        this.itemService.deleteFlower(id).subscribe(resp=>{
          alert("Successfully deleted");
          this.itemService.flowerListDataStream.next(this.itemService.fetchFlowers());
          this.itemService.completeItemListDataStream.next(this.itemService.fetchCompleteItem());
        }, error => {
          alert("Something went wrong...");
        });
        break;

      case 'Acc':
        this.itemService.deleteAcc(id).subscribe(resp=>{
          alert("Successfully deleted");
          this.itemService.accListDataStream.next(this.itemService.fetchAccs());
          this.itemService.completeItemListDataStream.next(this.itemService.fetchCompleteItem());
        }, error => {
          alert("Something went wrong...");
        });
        break;
    }


  }


}
