import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Navbar } from './navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly title = signal('segundoparcialangular');

  ngOnInit(): void {
    initFlowbite();
  }
}