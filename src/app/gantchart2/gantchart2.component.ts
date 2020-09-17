import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-gantchart2',
  templateUrl: './gantchart2.component.html',
  styleUrls: ['./gantchart2.component.css']
})
export class Gantchart2Component {
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
      //Themes End

      var chart = am4core.create("chartdiv", am4charts.XYChart);


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
var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "cat";
categoryAxis.renderer.grid.template.disabled = true;


var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;
valueAxis.max = 10;
valueAxis.renderer.grid.template.disabled = true;
valueAxis.renderer.labels.template.disabled = true;
valueAxis.renderer.baseGrid.disabled = true;

// Create series
var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.valueX = "space";
series.dataFields.categoryY = "cat";
series.columns.template.strokeOpacity = 0;
series.columns.template.height = am4core.percent(25);
series.cursorHoverEnabled = true;
series.sequencedInterpolation = true;
// Make it stacked
  series.stacked = true;

  var totalSeries = chart.series.push(new am4charts.ColumnSeries());
  totalSeries.dataFields.valueY = "none";
  totalSeries.dataFields.categoryX = "value";
  totalSeries.stacked = true;
  totalSeries.hiddenInLegend = true;
  totalSeries.columns.template.strokeOpacity = 0;

////////////////////////////
//end of test
////////////////////////////
series.columns.template.adapter.add("fill", (fill:any, target:any) => {
    var dataItem = target.dataItem;

    if ("Running" == dataItem.dataContext.name) {
        return am4core.color("#33cc33");
    }
    else if ("Stopped" == dataItem.dataContext.name) {
        return am4core.color("#ff0000");
    }
    else if ("On Water" == dataItem.dataContext.name) {
        return am4core.color("#0000ff");
    }
    else if ("StartUp/ ShutDown" == dataItem.dataContext.name) {
        return am4core.color("#ff00ff");
    }
    else if ("Idle" == dataItem.dataContext.name) {
        return am4core.color("#ffbf00");
    }
})




series.columns.template.tooltipText = "{name}\n{value}[/]";
// series.columns.template.showTooltipOn = "always";
series.columns.template.tooltipX = am4core.percent(95);




//just here for help
var legend = new am4charts.Legend();
legend.parent = chart.chartContainer;
legend.itemContainers.template.clickable = false;
legend.itemContainers.template.focusable = false;
// legend.itemContainers.template.cursorOverStyle = am4core.MouseCursorStyle.default;
legend.align = "right";
legend.data = [{
  "name": "Running",
  "fill": am4core.color("#33cc33")
}, {
  "name": "Stopped",
  "fill": am4core.color("#ff0000")
}, {
  "name": "On Water",
  "fill": am4core.color("#0000ff")
}, {
  "name": "StartUp/ ShutDown",
  "fill": am4core.color("#ff00ff")
}, {
  "name": "Idle",
  "fill": am4core.color("#ffbf00")
}];


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
