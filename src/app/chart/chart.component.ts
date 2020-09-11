import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent {
  private chart: am4charts.XYChart;

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) {}

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {

am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("chartdiv", am4charts.XYChart);

chart.data = [{
        "part": "C Channel",
        "output": 23.5,
        "target": 25.1
    }, {
        "part": "Ramp Cut",
        "output": 26.2,
        "target": 22.8
    }, {
        "part": "Introducer Attach",
        "output": 30.1,
        "target": 23.9
    }, {
        "part": "Attach Inspect",
        "output": 29.5,
        "target": 25.1
    }, {
        "part": "Ramp Form",
        "output": 24.6,
        "target": 25
    }];

//create category axis for years
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "part";
categoryAxis.renderer.minGridDistance = 40;
categoryAxis.fontSize = 11;
categoryAxis.renderer.labels.template.rotation = -45;



//create value axis for income and expenses
var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
console.log(chart.data);

//create columns
var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.categoryX = "part";
series.dataFields.valueY = "output";
series.name = "Parts";
series.columns.template.fillOpacity = 1;
series.columns.template.strokeOpacity = 0;






series.columns.template.adapter.add("fill", (fill, target) => {
    var dataItem = target.dataItem;
    if (dataItem.valueY >= dataItem.dataContext.target) {
        return am4core.color("#78b711");
    }
    else {
        return am4core.color("red");
    }
})




//create line
var lineSeries = chart.series.push(new am4charts.LineSeries());
lineSeries.dataFields.categoryX = "part";
lineSeries.dataFields.valueY = "target";
lineSeries.name = "Target";
lineSeries.strokeWidth = 3;
lineSeries.stroke = am4core.color("yellow");

//add bullets
var circleBullet = lineSeries.bullets.push(new am4charts.CircleBullet());
circleBullet.circle.fill = am4core.color("#fff");
circleBullet.circle.strokeWidth = 2;
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
