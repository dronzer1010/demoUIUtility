export class Urlconfig{
    billtreeurl:string
    gsturl:string
    supplierurl:string;

    constructor(){
        //this.billtreeurl="http://localhost:4100/#/" //Local
        this.billtreeurl="http://utility-test.aquapay.in/#/"  //Test
        //this.billtreeurl="https://billtree.aquapay.in/#/" //Production

        //this.gsturl="http://localhost:4000/" //Local
        this.gsturl="http://test-gst.aquapay.in/" //Test
        //this.gsturl="https://gst-payments.aquapay.in/" //Production


        //this.supplierurl="http://localhost:4200/" //Local
        this.supplierurl="http://test-supplier.aquapay.in/" //Test
        //this.supplierurl="https://supplier-payments.aquapay.in/" //Production
        

    }

    getBilltreeURL(){
        return this.billtreeurl
    }
  
    getGstURL(){
        return this.gsturl
    }


    getSupplierURL(){
        return this.supplierurl
    }

   
  

}