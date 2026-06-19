import { Component, OnInit } from '@angular/core';

function fib(n: number): number {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

@Component({
  selector: 'app-heavy-simulation',
  standalone: true,
  template: `
    <section>
      <h3>Heavy simulation loaded</h3>
      <p>Traitement simulé terminé.</p>
    </section>
  `
})
export class HeavySimulationComponent implements OnInit {

  ngOnInit(): void {
    const start = performance.now();

    const a = fib(45)

    console.log(a)

    console.log(
      '[HeavySimulation] Temps de calcul :',
      Math.round(performance.now() - start),
      'ms'
    );
  }
}