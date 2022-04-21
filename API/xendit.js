const Xendit = require("xendit-node");
const x = new Xendit({
  secretKey: process.env.XENDIT_SECRET,
});

const { Invoice } = x;
const invoice = new Invoice({});

class XenditInvoice {
  static createInvoice(externalID, amount, customer) {
    console.log(process.env.XENDIT_SECRET)
    return invoice.createInvoice({
      externalID: externalID,
      amount,
      successRedirectURL: "https://jajan-vinyl.web.app/",
      payerEmail: customer.email,
    });
  }
  static expireInvoice(invoiceID) {
    return invoice.expireInvoice({ invoiceID })
  }
  static getInvoice(invoiceID) {
    return invoice.getInvoice({ invoiceID })
  }
}
module.exports = XenditInvoice