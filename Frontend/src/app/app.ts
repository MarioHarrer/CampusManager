import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {AppService} from './api';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  title = 'CampusManager';
  private appService = inject(AppService);
  private keycloak = inject(Keycloak);

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.appService.appControllerGetHello().subscribe({next:(value: string) => {
        console.log(value);
      }})
  }

  logout() {
    this.keycloak.logout({ redirectUri: window.location.origin });
  }
}
