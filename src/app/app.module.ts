import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { GantchartComponent } from './gantchart/gantchart.component';
import { StackedSeriesExampleComponent } from './stacked-series-example/stacked-series-example.component';
import { SpectrumChartComponent } from './spectrum-chart/spectrum-chart.component';
import { Gantchart2Component } from './gantchart2/gantchart2.component';
import { TidyGant2Component } from './tidy-gant2/tidy-gant2.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ComponentLineChartComponent } from './component-line-chart/component-line-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    GantchartComponent,
    StackedSeriesExampleComponent,
    SpectrumChartComponent,
    Gantchart2Component,
    TidyGant2Component,
    PieChartComponent,
    ComponentLineChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
