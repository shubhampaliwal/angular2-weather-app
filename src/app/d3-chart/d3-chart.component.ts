import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {nvD3} from 'ng2-nvd3';
declare let d3: any;

@Component({
  selector: 'app-d3-chart',
  template: `
    <div>
      <nvd3 [options]="options" [data]="data"></nvd3>
    </div>
  `
})
export class D3ChartComponent implements OnInit {
    @Input() activeData;
    options;
    data;
    oldActiveData;

    // creation of chart with injected data from data on initialisation
    ngOnInit() { 
      this.options = {
        chart: {
          type: 'discreteBarChart',
          height: 450,
          margin : {
            top: 20,
            right: 20,
            bottom: 50,
            left: 55
          },
          x: function(d){return d.dt_txt.split(' ')[1].split(':')[0]+":00";},
          y: function(d){return d.main.temp;},
          showValues: true,
          valueFormat: function(d){
            return d3.format(',.2f')(d);
          },
          color:function(){
              return 'rgb(255, 204, 0)';
            },
          tooltip: {
               contentGenerator: function (e) {
                  var series = e.series[0];
                  if (series.value === null) return;

                    var rows =
                        "<tr>" +
                            "<td class='key' style='text-transform:capitalize;'><strong>" + e.data.weather[0].description + "</strong></td>" +
                        "</tr>"+
                        "<tr>" +
                            "<td class='x-value'>Temp: " + e.data.main.temp + "&#186;</td>" +
                        "</tr>";

                    var header =
                        "<thead>" +
                          "<tr>" +
                            "<td class='key'>"+"<img src=http://openweathermap.org/img/w/"+e.data.weather[0].icon+".png> </td>" +
                          "</tr>" +
                        "</thead>";

                    return "<table style='background-color:#ecf0f1;'>" +
                              header +
                              "<tbody>"+rows+"</tboby>"+
                            "</table>";
                    }
             },
          duration: 500,
          xAxis: {
            axisLabel: 'Time (24-hour)'
          },
          yAxis: {
            axisLabel: 'Temperature',
            axisLabelDistance: -10
          }
        }
      }
      this.data = [
        {
          key: "Cumulative Return",
          values: this.activeData
        }
      ];
    }

    // lifecycle hook to watch for changes in data from parent component
    ngDoCheck() {
    if (this.activeData !== this.oldActiveData) {
      this.data = [
        {
          key: "Cumulative Return",
          values: this.activeData
        }
      ];
      this.oldActiveData = this.activeData;
    }
  }
  }
