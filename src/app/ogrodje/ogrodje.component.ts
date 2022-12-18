import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ogrodje',
  templateUrl: './ogrodje.component.html',
  styleUrls: ['./ogrodje.component.css']
})
export class OgrodjeComponent implements OnInit {
  public currentPage: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public redirect(url: string, value: number) {
    this.router.navigate([url]);
    this.currentPage = value;
  }

}
