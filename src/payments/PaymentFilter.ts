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

  public static concatPrelAndDone(payments: IPayments): IPayment[] {
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

    return mappedPayments
  }

  public static sortByDate(payments: IPayment[]): IPayment[] {
    return payments.sort((first, second) => {
      if (first.datum < second.datum) {
        return -1
      }
      if (first.datum > second.datum) {
        return 1
      }
      return 0
    })
  }

  public static nextPayment(payments: IPayments): IPayment[] {
    if (
      payments &&
      (payments.klara.length > 0 || payments.preliminara.length > 0)
    ) {
      const mappedPayments = this.concatPrelAndDone(payments)

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
