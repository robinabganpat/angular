import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HlChartComponent } from "app/dashboard/hl-chart/hl-chart.component";
import { HelloWorldComponent } from "app/dashboard/hello-world/hello-world.component";

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'chart', component: HlChartComponent},
  { path: 'hello', component: HelloWorldComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }