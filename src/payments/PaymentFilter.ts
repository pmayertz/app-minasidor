export class PaymentFilter {
  public static nextPaymentSum(payments: IPayments): [number, string] {
    const filteredPayments = this.nextPayment(payments)
    if (filteredPayments.length > 0) {
      const sum = this.nextPayment(payments)
        .map(p => p.nettobelopp)
        .reduce((total, current) => total + current)
      return [sum, filteredPayments[0].datum]
    } else {
      return [0, '']
    }
  }

  public static nextPayment(payments: IPayments): IPayment[] {
    if (payments.klara.length > 0 || payments.preliminara.length > 0) {
      let mappedPayments = payments.preliminara.map(p => {
        p.status = 'PREL'
        return p
      })
      mappedPayments = mappedPayments.concat(
        payments.klara.map(p => {
          p.status = 'KLAR'
          return p
        })
      )

      const earliestPayment = mappedPayments.reduce((earliestDate, p) => {
        if (earliestDate.datum > p.datum) {
          earliestDate = p
        }
        return earliestDate
      })

      return mappedPayments.filter(p => p.datum === earliestPayment.datum)
    }
    return []
  }
}
