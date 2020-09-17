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


      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create chart instance
      var chart = am4core.create("chartdiv", am4charts.XYChart);
      chart.maskBullets = false;
      chart.numberFormatter.numberFormat = "#.#";

      chart.data =[
        {
              "name": "Running",
              "value": 93000000,
              "space":10,
              "cat":''
            },
            {
              "name": "Stopped",
              "value": 89400000,
              "space":9,
              "cat":''
            },
            {
              "name": "On Water",
              "value": 62000000,
              "space":8,
              "cat":''
            },
            {
              "name": "StartUp/ ShutDown",
              "value": 73000000,
              "space":7,
              "cat":''
            },
            {
              "name": "Idle",
              "value": 73000000,
              "space":6,
              "cat":''
            },
               {
              "name": "Running",
              "value": 73000000,
              "space":5,
              "cat":''
            },
            {
              "name": "Stopped",
              "value": 89400000,
              "space":4,
              "cat":''
            },
            {
             "name": "On Water",
              "value": 62000000,
              "space":3,
              "cat":''
            },
            {
              "name": "StartUp/ ShutDown",
              "value": 73000000,
              "space":2,
              "cat":''
            },
            {
              "name": "Idle",
              "value": 73000000,
              "space":1,
              "cat":''
            }
          ];

      // Create axes
      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "name";
      categoryAxis.renderer.grid.template.location = 0;

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.inside = true;
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.min = 0;
      valueAxis.extraMax = 0.1;
      valueAxis.calculateTotals = true;

      // Create series


        // Set up series
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.name = "State";
        series.dataFields.valueY = "value";
        series.dataFields.categoryX = "name";
        series.sequencedInterpolation = true;

        // Make it stacked
        series.stacked = true;

        // Configure columns
        series.columns.template.width = am4core.percent(60);
        series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";

        // Add label
        var labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.text = "{valueY}";
        labelBullet.label.fill = am4core.color("#fff");
        labelBullet.locationY = 0.5;





      // Create series for total
      // var totalSeries = chart.series.push(new am4charts.ColumnSeries());
      // totalSeries.dataFields.valueY = "none";
      // totalSeries.dataFields.categoryX = "year";
      // totalSeries.stacked = true;
      // totalSeries.hiddenInLegend = true;
      // totalSeries.columns.template.strokeOpacity = 0;
      //
      // var totalBullet = totalSeries.bullets.push(new am4charts.LabelBullet());
      // totalBullet.dy = -20;
      // totalBullet.label.text = "{valueY.total}";
      // totalBullet.label.hideOversized = false;
      // totalBullet.label.fontSize = 18;
      // totalBullet.label.background.fill = totalSeries.stroke;
      // totalBullet.label.background.fillOpacity = 0.2;
      // totalBullet.label.padding(5, 10, 5, 10);


      // Legend
      chart.legend = new am4charts.Legend();
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
