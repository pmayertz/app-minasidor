interface IPayment {
   nettobelopp: number
   datum: string
   utbetalningsfamilj: string
   utbetalningsfamiljKlartext: string
   specifikation: number
   status: string
   detaljer: IPaymentDetail[]
}

interface IPaymentDetail {
  delforman: string
  delformanKlartext: string
  beloppstyp: string
  beloppstypKlartext: string
  ersattningAvdrag: string
}

interface IPayments {
  klara: IPayment[]
  preliminara: IPayment[]
  tidigare: IPayment[]
}
