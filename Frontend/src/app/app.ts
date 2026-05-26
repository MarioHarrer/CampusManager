import {Component, inject} from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {AppService} from './api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'CampusManager';
  private appService = inject(AppService);

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.appService.appControllerGetHello().subscribe({next:(value: string) => {
      console.log(value);
      }})
  }
}
