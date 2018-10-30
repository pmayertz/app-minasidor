import PaymentFilter from '../PaymentFilter'
import PaymentsMock from '../../mocks/Payments.mock'

let payments: IPayments
const emptyPayments = {
  klara: [],
  preliminara: [],
  tidigare: []
}

describe('PaymentFilter should', () => {
  beforeEach(() => {
    payments = PaymentsMock
  })

  test('concatenate preliminary and done', () => {
    const concatenatedPayments = PaymentFilter.concatPrelAndDone(payments)

    expect(concatenatedPayments).toHaveLength(10)
  })

  test('summarize next payment', () => {
    const nextPayment = PaymentFilter.nextPaymentSum(payments)

    expect(nextPayment).toEqual([10212, '2018-10-25'])
  })

  test('summarize next payment on Empty object', () => {
    const nextPayment = PaymentFilter.nextPaymentSum(emptyPayments)

    expect(nextPayment).toEqual([0, ''])
  })

  test('sort ascending', () => {
    const concatenatedPayments = PaymentFilter.concatPrelAndDone(payments)
    const sortedPayments = PaymentFilter.sortAscending(concatenatedPayments)

    expect(sortedPayments[0].datum).toEqual('2018-10-25')
  })

  test('sort descending', () => {
    const concatenatedPayments = PaymentFilter.concatPrelAndDone(payments)
    const sortedPayments = PaymentFilter.sortDescending(concatenatedPayments)

    expect(sortedPayments[0].datum).toEqual('2018-12-22')
  })

  test('describe delforman as beloppstypKlartext when AMP', () => {
    const details = {
      delforman: 'ABB',
      delformanKlartext: 'Arbetsmarknadspolitiskt program',
      beloppstyp: 'ABB',
      beloppstypKlartext: 'Barnbidrag',
      ersattningAvdrag: ''
    }

    const delforman = PaymentFilter.getDelforman(details)

    expect(delforman).toEqual('Barnbidrag')
  })

  test('describe delforman as delformanKlartext when not AMP', () => {
    const details = {
      delforman: 'ABB',
      delformanKlartext: 'Föräldrapenning',
      beloppstyp: 'ABB',
      beloppstypKlartext: 'Barnbidrag',
      ersattningAvdrag: ''
    }

    const delforman = PaymentFilter.getDelforman(details)

    expect(delforman).toEqual('Föräldrapenning')
  })

  test('describe delforman as ersattningAvdrag when AMP but no beloppstypKlartext', () => {
    const details = {
      delforman: 'ABB',
      delformanKlartext: 'Arbetsmarknadspolitiskt program',
      beloppstyp: 'ABB',
      ersattningAvdrag: 'Barnbidrag'
    }

    const delforman = PaymentFilter.getDelforman(details)

    expect(delforman).toEqual('Barnbidrag')
  })
})
