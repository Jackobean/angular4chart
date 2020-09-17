import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';


@Component({
  selector: 'app-tidy-gant2',
  templateUrl: './tidy-gant2.component.html',
  styleUrls: ['./tidy-gant2.component.css']
})
export class TidyGant2Component {
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
      ///////////////////
      ////////////////////


      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end

      var chart = am4core.create("chartdiv", am4charts.XYChart);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      chart.paddingRight = 30;
      chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm";

      var colorSet = new am4core.ColorSet();
      colorSet.saturation = 0.4;

      chart.data = [
        {
          state: "Running",
          fromDate: "2018-01-01 08:00",
          toDate: "2018-01-01 08:06"
        },
        {
          state: "Start Up/Shut Down",
          fromDate: "2018-01-01 08:06",
          toDate: "2018-01-01 08:08"
        },
        {
          state: "Running",
          fromDate: "2018-01-01 08:08",
          toDate: "2018-01-01 08:16"
        },

        {
          state: "CIP",
          fromDate: "2018-01-01 08:16",
          toDate: "2018-01-01 08:19"
        },
        {
          state: "On Water",
          fromDate: "2018-01-01 08:19",
          toDate: "2018-01-01 08:22"
        },
        {
          state: "Running",
          fromDate: "2018-01-01 08:22",
          toDate: "2018-01-01 08:48"
        }, {
          state: "CIP",
          fromDate: "2018-01-01 08:48",
          toDate: "2018-01-01 08:50"
        },
        {
          state: "On Water",
          fromDate: "2018-01-01 08:50",
          toDate: "2018-01-01 08:54"
        }, {
          state: "Start Up/Shut Down",
          fromDate: "2018-01-01 08:54",
          toDate: "2018-01-01 09:00"
        }, {
          state: "Running",
          fromDate: "2018-01-01 09:00",
          toDate: "2018-01-01 09:30"
        }, {
          state: "Stopped",
          fromDate: "2018-01-01 09:30",
          toDate: "2018-01-01 09:35"
        },
      ];

      chart.data.forEach((item:any):void => {
        //needed to create stacked column
        item.name = 'State';
      })


      var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "name";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.inversed = true;
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.renderer.baseGrid.disabled = true;
      categoryAxis.renderer.labels.template.disabled = false


      var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.dateFormatter.dateFormat = "yyyy-MM-dd HH:mm";
      dateAxis.renderer.minGridDistance = 70;
      dateAxis.strictMinMax = true;
      dateAxis.renderer.tooltipLocation = 0;
      dateAxis.renderer.grid.template.disabled = true;
      dateAxis.renderer.labels.template.disabled = true;


      var series1 = chart.series.push(new am4charts.ColumnSeries());



      series1.columns.template.tooltipText = "[bold]{state}:[\bold]\n {openDateX} - {dateX}\n";
      series1.tooltip.pointerOrientation = "up"
      series1.columns.template.strokeOpacity = 0;
      series1.dataFields.openDateX = "fromDate";
      series1.dataFields.dateX = "toDate";
      series1.dataFields.categoryY = "name";
      series1.columns.template.adapter.add("fill", (fill: any, target: any) => {
        var dataItem = target.dataItem;

        if ("Running" == dataItem.dataContext.state) {
          return am4core.color("#33cc33");
        }
        else if ("Stopped" == dataItem.dataContext.state) {
          return am4core.color("#ff0000");
        }
        else if ("On Water" == dataItem.dataContext.state) {
          return am4core.color("#0000ff");
        }
        else if ("Start Up/Shut Down" == dataItem.dataContext.state) {
          return am4core.color("#ff00ff");
        }
        else if ("CIP" == dataItem.dataContext.state) {
          return am4core.color("#ffbf00");
        }
      })



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




      ///////////////////
      //////////////////
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
