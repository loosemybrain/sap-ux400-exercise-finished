sap.ui.define ([ 
        "sap/ui/core/mvc/Controller", "sap/m/MessageBox"
    ],
         function (Controller, MessageBox) { 
            "use strict"; 
    
             return Controller.extend("sap.training.exc.controller.App", {
                
              //  onSayHello: function () { MessageBox.information("Hello World");
    
              // }
    
              /* ================================================================*/
              /*  lifecycle methods                                              */
              /* ================================================================*/
    
              onInit: function () {
                this.getView().addStyleClass(
                  this.getOwnerComponent().getContentDensityClass()
                );
              },
            }); 
    });