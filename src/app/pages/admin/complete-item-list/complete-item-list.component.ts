import {Component, Input, SimpleChanges} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CommonModalComponent} from "../../../common-modal/common-modal.component";
import {BehaviorSubject, Observable, Subject, takeUntil} from "rxjs";
import {ItemService} from "../../../_service/item.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-complete-item-list',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    NgForOf,
    MatHeaderCellDef,
    NgIf,
    AsyncPipe,
    FormsModule
  ],
  template:`
    <section>
      <div class="container">
        <h1>{{title}} Inventory</h1>
        <table mat-table [dataSource]="dataSource" >

          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef> id</th>
            <td mat-cell *matCellDef="let element">
               {{element.flowerDto.id}}</td>
          </ng-container>


          <ng-container matColumnDef="linked_accs">
            <th mat-header-cell *matHeaderCellDef> linked_accs</th>
            <td mat-cell *matCellDef="let element">

              <span *ngFor="let acc of element.accDto; let i=index">
                {{acc.name}} &nbsp;</span>
              <span *ngIf="activatedConnectAcc !== element.flowerDto.id" (click)="activateAccList(element.flowerDto.id)" id="relateAcc_btn">(connect Acc)</span>
              <span *ngIf="activatedConnectAcc === element.flowerDto.id" (click)="deactivateAccList()" id="close_btn">(close)</span>
                <span *ngIf="activatedConnectAcc === element.flowerDto.id">

                   <span class="acc-add-tab">
                    <select class="form-select" id="acc-select-bar" [(ngModel)]="selectedAccId">
                     <option selected>Acc to link..</option>
                      <option *ngFor="let acc of accList | async" [value]="acc.id" >
                        {{acc.name}}
                      </option>

                    </select>

                     <span id="save-btn" (click)="addAccToFlower(element.flowerDto.id, element.accDto)"> (save)</span>
                   </span>

                </span>
            </td>
          </ng-container>

          <ng-container matColumnDef="unlink-all-acc">
            <th mat-header-cell *matHeaderCellDef> unlink all Acc</th>
            <td mat-cell *matCellDef="let element">
              <button class="btn btn-secondary" (click)="removeAllAccFromFlower(element.flowerDto.id)">Unlink</button></td>
          </ng-container>

          <ng-container matColumnDef="flower_detail">
            <th mat-header-cell *matHeaderCellDef> flower_detail</th>
            <td mat-cell *matCellDef="let element">
              <button class="btn btn-secondary" (click)="openModal(element.flowerDto)">Flower detail</button></td>
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
  styleUrl: './complete-item-list.component.css'
})
export class CompleteItemListComponent {

  constructor(public dialog:MatDialog, private itemService:ItemService) {
  }

  @Input("title")
  title:string = '';

  @Input("completeItemList$")
  completeItemList$!:BehaviorSubject<any>;



  // @Input('displayedColumn')
  displayedColumn:string[] = ['id', 'linked_accs','unlink-all-acc', 'flower_detail'];


  accList!: Observable<any>;

  dataSource:any  = new MatTableDataSource<any>();

  activatedConnectAcc:number = 0;



  ngOnInit(){
    console.log("list");
    console.log("input from adminPanel");


    //init accList
    this.itemService.accListDataStream.subscribe(resp=>{
      this.accList = resp;
    });

    //init completItemList
    this.completeItemList$.subscribe(obs=>{
      obs.subscribe((resp:any)=>{
        this.dataSource.data = resp;
        this.length = this.dataSource.data.length;

          this.sortPage(this.dataSource.data);
        this.loadPage(5,0);

      })
    })

  }



  //paginator related
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


  openModal(flowerDto:any){
    console.log(flowerDto );

    const dialogConfig: MatDialogConfig = {
      data: flowerDto
    }
    let matDialogRef = this.dialog.open(CommonModalComponent, dialogConfig);
    // dialog 닫힌 후 추가 액션
    matDialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((res)=>{
      console.log("dialog closed"+`${res}`);
    })
  }

  activateAccList(flowerId:number){
      this.activatedConnectAcc = flowerId;
  }

  deactivateAccList(){
    this.activatedConnectAcc = 0;
  }

  selectedAccId = 0;
  addAccToFlower(flowerId:number, accList:any[]){
    console.log(flowerId);
    console.log(this.selectedAccId);

    //checking dupe acc registration for recommend list
    for(let acc of accList){
      if(acc.id ==this.selectedAccId){
        alert("You already registered this acc for recommended list.");
        return;
      }
    }
    if(this.selectedAccId ===0 || isNaN(this.selectedAccId)){
      alert("please select acc to add..");
    }else{
      this.itemService.relateAcc(flowerId,this.selectedAccId).subscribe(resp=>{
        console.log("relate acc");
        //state update completeItemList
        this.itemService.completeItemListDataStream.next(this.itemService.fetchCompleteItem());
        this.activatedConnectAcc = 0;


      })
    }
  }

  removeAllAccFromFlower(accId:number){
    this.itemService.unrelateAcc(accId).subscribe(resp=>{
      alert(resp);
      //update completeItemList
      this.itemService.completeItemListDataStream.next(this.itemService.fetchCompleteItem());
    });
  }

 private destroy$ = new Subject<void>();

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }


}
