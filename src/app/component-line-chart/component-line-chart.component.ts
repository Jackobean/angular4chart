import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-component-line-chart',
  templateUrl: './component-line-chart.component.html',
  styleUrls: ['./component-line-chart.component.css']
})
export class ComponentLineChartComponent {
  private chart: am4charts.XYChart;

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) { }

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
        //Themes End

        var chart = am4core.create("chartdiv", am4charts.XYChart);


        chart.data = [
          {
            target: "128",
            actual: "76",
            date: new Date(2018, 3, 20, 10, 1)
          },
          {
            target: "128",
            actual: "80",
            date: new Date(2018, 3, 20, 10, 22)
          },
          {
            target: "128",
            actual: "76",
            date: new Date(2018, 3, 20, 10, 30)
          },
          {
            target: "128",
            actual: "78",
            date: new Date(2018, 3, 20, 10, 40)
          },
          {
            target: "128",
            actual: "70",
            date: new Date(2018, 3, 20, 10, 55)
          },
          {
            target: "128",
            actual: "68",
            date: new Date(2018, 3, 20, 11, 0)
          }
        ];

        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.strictMinMax = true;
        // Create value axis
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;



        // Create series
        var lineSeries = chart.series.push(new am4charts.LineSeries());
        lineSeries.dataFields.valueY = "actual";
        lineSeries.dataFields.dateX = "date";
        lineSeries.name = "Sales";
        lineSeries.strokeWidth = 3;
        lineSeries.stroke = am4core.color('red');
        lineSeries.fillOpacity = .3;
        lineSeries.fill =  am4core.color('green');


        // lineSeries.tooltip.label.fill = am4core.color(this._options.labelTextColor);

        // var fillModifier = new am4core.LinearGradientModifier();
        // fillModifier.opacities = [1, 0];
        // fillModifier.offsets = [0, 1];
        // fillModifier.gradient.rotation = 90;
        // lineSeries.segments.template.fillModifier = fillModifier;

        // Add simple bullet
        var bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
        bullet.circle.fill = am4core.color('red');
        bullet.circle.strokeWidth = 2;
        bullet.tooltipText = "Actual: [bold]{actual}[\bold]\n{date}{data.hour}";



        var targetSeries = chart.series.push(new am4charts.LineSeries());
        targetSeries.dataFields.valueY = "target";
        targetSeries.dataFields.dateX = "date";
        targetSeries.strokeWidth = 3;
        targetSeries.stroke = am4core.color('black');



        /////////////////////////////////////////




      });  ////end of chart code // end am4core.ready()



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
