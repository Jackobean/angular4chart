import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {

  readonly DEFAULT_SLICE_STROKE_WIDTH: number = 2;
  readonly DEFAULT_SLICE_OPACITY: number = 1;
  readonly DEFAULT_ANIMATION_START_ANGLE: number = -90;
  readonly DEFAULT_ANIMATION_END_ANGLE: number = -90;
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

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chartdiv", am4charts.PieChart);

        // Add data
        chart.data = [{
          "x": "C Channel",
          "y-bar": 13.5
        }, {
          "x": "Ramp Cut",
          "y-bar": 26.2
        }];


        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.colors.list = [
          am4core.color("#33CC33"),
          am4core.color("red"),
          am4core.color("#FF6F91"),
          am4core.color("#FF9671"),
          am4core.color("#FFC75F"),
          am4core.color("#F9F871")
        ];
        pieSeries.dataFields.value = "y-bar";
        pieSeries.dataFields.category = "x";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = this.DEFAULT_SLICE_STROKE_WIDTH;
        pieSeries.slices.template.strokeOpacity = this.DEFAULT_SLICE_OPACITY;
        // pieSeries.slices.template.fill = chart.colors.list
        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = this.DEFAULT_SLICE_OPACITY;
        pieSeries.hiddenState.properties.endAngle = this.DEFAULT_ANIMATION_END_ANGLE;
        pieSeries.hiddenState.properties.startAngle = this.DEFAULT_ANIMATION_START_ANGLE;


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
