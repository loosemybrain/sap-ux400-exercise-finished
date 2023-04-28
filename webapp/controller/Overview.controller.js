sap.ui.define(
    [
      "sap/ui/core/mvc/Controller",
      "sap/ui/core/syncStyleClass",
      "sap/ui/model/json/JSONModel",
      "sap/ui/model/Filter",
      "sap/ui/model/FilterOperator",
      "sap/m/MessageToast",
      "sap/m/MessageBox"
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, syncStyleClass, JSONModel, Filter, FilterOperator, MessageToast, MessageBox) {
      ("use strict");
  
     
  
      return Controller.extend("sap.training.exc.controller.Overview", {
        /* ================================================================*/
        /*  lifecycle methods                                              */
        /* ================================================================*/
  
        onInit: function () {
          var oModel = new JSONModel();
          -this.getView().setModel(oModel, "customer");
        },
  
        /* ================================================================*/
        /*  event methods                                                  */
        /* ================================================================*/
  
        // Laden der Dialog.fragment.xml
        onSave: function () {
          /*if (!this.pDialog) {
            this.pDialog = this.loadFragment({
              name: "sap.training.exc.view.Dialog",
            }).then(
              function (oDialog) {
                syncStyleClass(
                  this.getOwnerComponent().getContentDensityClass(),
                  this.getView(),
                  oDialog
                );
                return oDialog;
              }.bind(this)
            );
          }
          // Schließen der Dialog.fragment.xml über ok Button
          this.pDialog.then(function (oDialog) {
            oDialog.open();
          }); */
  
          var oModelData = this.getView().getModel("customer").getData();
          var oResourceBundle = this.getView()
            .getModel("i18n")
            .getResourceBundle();
  
          if (oModelData.Discount === undefined) {
            oModelData.Discount = 0;
          }
  
          this.byId("customerTable")
            .getBinding("items")
            .create({
              Form: oModelData.Form,
              CustomerName: oModelData.CustomerName,
              Discount: oModelData.Discount + "", //Values for property 'Discount'
              // must be quoted in the payload
              Street: oModelData.Street,
              PostCode: oModelData.PostCode,
              City: oModelData.City,
              Country: oModelData.Country,
              Email: oModelData.Email,
              Telephone: oModelData.Telephone,
            })
            .created()
            .then(function () {
              MessageToast.show(
                oResourceBundle.getText("customerCreatedMessage")
              );
            });
        },
  
        onCloseDialog: function () {
          this.byId("dialog").close();
        },
  
        onCustomerChange: function (oEvent) {
          var oBindingContext = oEvent
            .getParameter("listItem")
            .getBindingContext();
          this.byId("bookingTable").setBindingContext(oBindingContext);
        },
  
        onFilterCustomers: function (oEvent) {
          // build filter array
          var aFilter = [];
          var sQuery = oEvent.getParameter("query");
          if (sQuery && sQuery.length > 0) {
            aFilter.push(
              new Filter("CustomerName", FilterOperator.Contains, sQuery)
            );
          }
          //filter binding
          var oTable = this.byId("customerTable");
          var oBinding = oTable.getBinding("items");
          oBinding.filter(aFilter);
        },
  
        /*       onNavToDetails: function () {
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("detail");
        }, */
  
        onNavToDetails: function (oEvent) {
          var oItem = oEvent.getSource();
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("detail", {
            customerId: oItem
              .getBindingContext()
              .getPath()
              .substring("/UX_Customer".length),
          });
        },
        
      });
    }
  );