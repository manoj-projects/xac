import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';


@Component({
  selector: 'app-flood-dashboard',
  templateUrl: './flood-dashboard.component.html',
  styleUrls: ['./flood-dashboard.component.scss']
})
export class FloodDashboardComponent implements OnInit {
  locations: any[]=[];
  lctn: any[]=[];
  lctnPer: any[]=[
  ];

  constructor() {
    this.locations = [
        {
            "cctv_id": 1,
            "flood_flag": 0,
            "flood_status_cm": null,
            "flood_status_per": 100,
            "id": 1,
            "location": "Marina Beach",
        },
        {
            "cctv_id": 2,
            "flood_flag": 0,
            "flood_status_cm": null,
            "flood_status_per": 34,
            "id": 2,
            "location": "Anna Nagar",
        },
        {
            "cctv_id": 3,
            "flood_flag": 0,
            "flood_status_cm": null,
            "flood_status_per": 86,
            "id": 3,
            "location": "T Nagar",
        },
        {
            "cctv_id": 4,
            "flood_flag": 0,
            "flood_status_cm": null,
            "flood_status_per": 90,
            "id": 4,
            "location": "Mylapore",
        },
        {
            "cctv_id": 5,
            "flood_flag": 0,
            "flood_status_cm": null,
            "flood_status_per": 87,
            "id": 5,
            "location": "Adyar",
        },
        {
            "cctv_id": 6,
            "flood_flag": 0,
            "flood_status_cm": null,
            "flood_status_per": 23,
            "id": 6,
            "location": "Velachery",
        },
        {
            "cctv_id": 7,
            "flood_flag": 0,
            "flood_status_cm": null,
            "flood_status_per": 10,
            "id": 7,
            "location": "Kodambakkam",
        },
        {
            "cctv_id": 8,
            "flood_flag": 0,
            "flood_status_cm": null,
            "flood_status_per": 70,
            "id": 8,
            "location": "Egmore",
        },
        {
            "cctv_id": 9,
            "flood_flag": 0,
            "flood_status_cm": null,
            "flood_status_per": 50,
            "id": 9,
            "location": "Nungambakkam",
        },
        {
            "cctv_id": 10,
            "flood_flag": 0,
            "flood_status_cm": null,
            "flood_status_per": 70,
            "id": 10,
            "location": "Guindy",
        }
    ]
   }

  ngOnInit(): void {
    this.dataFormat()
  }

  dataFormat() {
    for (let i = 0; i < this.locations.length; i++) {
      this.lctn.push(this.locations[i].location);
      this.lctnPer.push(this.locations[i].flood_status_per)
    }
    this.chartData()
    console.log(this.lctn);
    
  }

  chartData() {
    var myChart = echarts.init(document.getElementById('bar_chart') as HTMLDivElement);

    myChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        // data: this.lctn,
        data: ['Marina Beach', 'Anna Nagar', 'T Nagar', 'Mylapore', 'Adyar', 'Velachery', 'Kodambakkam', 'Egmore', 'Nungambakkam', 'Guindy'],
        // data: ['asfasdfasdf', 'asfd asfdasfd', 'gasd safdasfd', 'io asfdasfd', 'asdf safasfdasfdsda', 'eer', 'asf', 'asfd', 'gasd', 'io', 'asdf', 'eer'],
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: this.lctnPer,
          data: this.lctnPer,
          barWidth: '60%',
          type: 'bar'
        }
      ]
    })
  }

}
