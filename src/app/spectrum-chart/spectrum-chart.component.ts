import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';


@Component({
  selector: 'app-spectrum-chart',
  templateUrl: './spectrum-chart.component.html',
  styleUrls: ['./spectrum-chart.component.css']
})
export class SpectrumChartComponent  {
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
          ////chart code starts here.

          am4core.ready(function() {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chartdiv", am4charts.XYChart);

        // Add data
        chart.data = [{
          "category": "",
          "from": new Date(2019, 0, 1, 11, 0),
          "to": new Date(2019, 0, 1, 12, 30),
          "color": am4core.color("#69a74f")
        }, {
          "category": "",
          "from": new Date(2019, 0, 1, 12, 30),
          "to": new Date(2019, 0, 1, 12, 45),
          "color": am4core.color("#fb9900")
        }, {
          "category": "",
          "from": new Date(2019, 0, 1, 12, 45),
          "to": new Date(2019, 0, 1, 14, 3),
          "color": am4core.color("#69a74f")
        }, {
          "category": "",
          "from": new Date(2019, 0, 1, 14, 3),
          "to": new Date(2019, 0, 1, 14, 14),
          "color": am4core.color("#664ea6")
        }, {
          "category": "",
          "from": new Date(2019, 0, 1, 14, 14),
          "to": new Date(2019, 0, 1, 14, 38),
          "color": am4core.color("#cc0c00")
        }, {
          "category": "",
          "from": new Date(2019, 0, 1, 14, 38),
          "to": new Date(2019, 0, 1, 15, 1),
          "color": am4core.color("#fb9900")
        }, {
          "category": "",
          "from": new Date(2019, 0, 1, 15, 1),
          "to": new Date(2019, 0, 1, 16, 37),
          "color": am4core.color("#69a74f")
        }, {
          "category": "",
          "from": new Date(2019, 0, 1, 16, 37),
          "to": new Date(2019, 0, 1, 16, 55),
          "color": am4core.color("#9900ff")
        }, {
          "category": "",
          "from": new Date(2019, 0, 1, 16, 55),
          "to": new Date(2019, 0, 1, 17, 7),
          "color": am4core.color("#69a74f")
        }, {
          "category": "",
          "from": new Date(2019, 0, 1, 17, 7),
          "to": new Date(2019, 0, 1, 17, 30),
          "color": am4core.color("#fb9900")
        }];

        // Create axes
        var yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        yAxis.dataFields.category = "category";
        yAxis.renderer.grid.template.disabled = true;
        yAxis.renderer.labels.template.disabled = true;

        var xAxis = chart.xAxes.push(new am4charts.DateAxis());
        xAxis.renderer.grid.template.disabled = true;
        xAxis.renderer.grid.template.disabled = true;
        xAxis.renderer.labels.template.disabled = true;
        xAxis.baseInterval = {
          "timeUnit": "minute",
          "count": 1
        };

        // Create series
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.dateX = "to";
        series.dataFields.openDateX = "from";
        series.dataFields.categoryY = "category";
        series.columns.template.propertyFields.fill = "color";
        series.columns.template.strokeOpacity = 0;
        series.columns.template.height = am4core.percent(100);
        series.columns.template.tooltipText = "{categoryX}: {valueY}";
        // Ranges/labels
        chart.events.on("beforedatavalidated", function(ev) {
          var data = chart.data;
          for(var i = 0; i < data.length; i++) {
            var range = xAxis.axisRanges.create();
            range.date = data[i].from;
            range.endDate = data[i].to;
            range.label.text = chart.dateFormatter.format(data[i].from, "HH:mm");
            range.label.horizontalCenter = "left";
            range.label.paddingLeft = 5;
            range.label.paddingTop = 5;
            range.label.fontSize = 10;
            range.grid.strokeOpacity = 0.2;
            range.tick.length = 18;
            range.tick.strokeOpacity = 0.2;
          }
        });

        // Legend
        var legend = new am4charts.Legend();
        legend.parent = chart.chartContainer;
        legend.itemContainers.template.clickable = false;
        legend.itemContainers.template.focusable = false;
        legend.itemContainers.template.cursorOverStyle = am4core.MouseCursorStyle.default;
        legend.align = "right";
        legend.data = [{
          "name": "Normal operation",
          "fill": am4core.color("#69a74f")
        }, {
          "name": "Minor alarm",
          "fill": am4core.color("#fb9900")
        }, {
          "name": "Anomaly",
          "fill": am4core.color("#664ea6")
        }, {
          "name": "Critical error",
          "fill": am4core.color("#cc0c00")
        }];

        }); // end am4core.ready()  ////end of chart code // end am4core.ready()



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
