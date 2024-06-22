import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentStatus'
})
export class PaymentStatusPipe implements PipeTransform {

  private statusMap: { [key: string]: string } = {
    'paid': 'Pago',
    'unpaid': 'Pendente',
    'failed': 'Falhou',
    // Adicione outros status conforme necessário
  };

  transform(value: string): string {
    return this.statusMap[value] || value;
  }

}
