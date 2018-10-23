import { PaymentFilter } from '../PaymentFilter'

import PaymentsMock from '../../resources/mocks/Payments.mock'

let payments: IPayments

describe('PaymentFilter', () => {
  beforeEach(() => {
    payments = PaymentsMock
  })

  test('Concatenate preliminary and done', () => {
    const concatenatedPayments = PaymentFilter.concatPrelAndDone(payments)

    expect(concatenatedPayments).toHaveLength(9)
  })

  test('Summarize next payment', () => {
    const nextPaymentSum = PaymentFilter.nextPaymentSum(payments)

    expect(nextPaymentSum).toEqual([5106, '2018-10-25'])
  })

  test('Next payment', () => {
    const nextPayment = PaymentFilter.nextPaymentSum(payments)

    expect(nextPayment).toHaveLength(2)
  })

  test('Sort Ascending', () => {
    const concatenatedPayments = PaymentFilter.concatPrelAndDone(payments)
    const sortedPayments = PaymentFilter.sortAscending(concatenatedPayments)

    expect(sortedPayments[0].datum).toEqual('2018-10-25')
  })

  test('Sort Descending', () => {
    const concatenatedPayments = PaymentFilter.concatPrelAndDone(payments)
    const sortedPayments = PaymentFilter.sortDescending(concatenatedPayments)

    expect(sortedPayments[0].datum).toEqual('2018-12-21')
  })

  test('Delforman AMP', () => {
    const details = {
      delforman: 'ABB',
      delformanKlartext: 'Barnbidrag',
      beloppstyp: 'ABB',
      beloppstypKlartext: 'Arbetsmarknadspolitiskt program',
      ersattningAvdrag: ''
    }

    const delforman = PaymentFilter.getDelforman(details)

    expect(delforman).toEqual('Barnbidrag')
  })
})
