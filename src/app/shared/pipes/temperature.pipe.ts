import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
  standalone: true
})
export class TemperaturePipe implements PipeTransform {

  /**
   * Transforma um valor de temperatura adicionando símbolo da unidade
   * @param value Valor da temperatura em Celsius
   * @param unit Unidade ('metric' para Celsius ou 'imperial' para Fahrenheit)
   * @param decimals Número de casas decimais (padrão: 1)
   * @returns Temperatura formatada com unidade
   */
  transform(value: number | null | undefined, unit: 'metric' | 'imperial' = 'metric', decimals: number = 1): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '--';
    }

    let convertedValue = value;
    if (unit === 'imperial') {
      convertedValue = (value * 9/5) + 32;
    }

    const symbol = unit === 'metric' ? '°C' : '°F';
    const temperature = convertedValue.toFixed(decimals);

    return `${temperature}${symbol}`;
  }
}
