import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlowersComponent } from './flowers.component';
import {ItemDetailComponent} from "./item-detail/item-detail.component";

const routes: Routes = [{ path: '', component: FlowersComponent },
  {path: ':id', component: ItemDetailComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowersRoutingModule { }
