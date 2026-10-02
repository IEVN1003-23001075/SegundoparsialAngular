import { Component, signal, OnInit } from '@angular/core'; 
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite'; 

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit { 
  protected readonly title = signal('segundoparcialangular');

  ngOnInit(): void {
    initFlowbite(); 
  }
}
