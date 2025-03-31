import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'login-failed',
  templateUrl: './failed.component.html',
  styleUrls: ['./failed.component.css'],
  imports:[MatCardModule, RouterLink]
})
export class FailedComponent implements OnInit{
  constructor(){}
ngOnInit(): void {

}
}

