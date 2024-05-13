import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {

  isBrowser: boolean = isPlatformBrowser(this.platformId);

  @ViewChild('acquisitions', { static: false }) acquisitions!: ElementRef<any>;

  data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: any
  ) { this.isBrowser = isPlatformBrowser(this.platformId); }


  ngOnInit(): void {

  }


  ngAfterViewInit(): void {
    new Chart(
      this.acquisitions.nativeElement,
      {
        type: 'bar',
        data: {
          labels: this.data.map(row => row.year),
          datasets: [
            {
              label: 'adquisiciones por año',
              data: this.data.map(row => row.count)
            }
          ]
        }
      }
    );    
  }


}
