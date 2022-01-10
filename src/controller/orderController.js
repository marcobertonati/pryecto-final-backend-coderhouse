/*Requerimos persistencia del servicio a fin de que si es en memoria no envie mail ni mensaje de texto */
const { PERSISTENCE } = require("../config/globals");
const { productService } = require("../services/index");

/*Servicios de mensajería y mailing */
const mailingService = require("../services/mailingService");
const createHtml = require("../utils/ticketHTML");
const whatsAppTwilio = require("../services/twilio.whatsapp");
const { twilioSmsFinishBuy } = require("../sms/twilio");

const orderController = (service) => {
  return {
    createOrder: async (req, res, next) => {
      try {
        const cartBody = req.body;
        const orderNumber = await service.getAllOrders();
        const finalCart = {
          productsOnCart: [],
          orderNumber: orderNumber.length + 1,
          timestamp: new Date().toLocaleDateString(),
          state: "generated",
          email: req.session.passport.user.email,
        };

        for (i = 0; i < cartBody.length; i++) {
          let productFinded = await productService.getProduct(cartBody[i].id);
          finalCart.productsOnCart.push({
            product: productFinded,
            quantity: cartBody[i].quantity,
          });
        }

        const orderCreated = await service.createOrder(finalCart);

        /* Funcionalidad para cargar orden a la base de datos de la persona que solicitó la orden: funcionalidad en desarrollo*/
        // const idUser = { _id: req.session.passport.user._id };
        // const cartAddToUser = await user.addCartToUser(idUser, finalCart);


        /*Si está en MEMORY no se ejecutaran estos servicios a fin de evitar spam y gasto de saldo */
        if (PERSISTENCE === "mongodb") {
          const emailSubject = `Nuevo pedido de: ${req.session.passport.user.name} @ mail: ${req.session.passport.user.email}`;

          const emailBody = createHtml.createHtml(orderCreated);

          await mailingService.mailingGmail({
            from: "Servidor de Node.js",
            to: ["df2euol6wwi5u2ix@ethereal.email", process.env.GMAIL_USER],
            subject: emailSubject,
            html: emailBody,
          });
          await whatsAppTwilio(emailSubject, req.session.passport.user.number);
          await twilioSmsFinishBuy(
            req.session.passport.user.number,
            "hemos recibido su pedido y se encuentra en proceso ✅"
          );
        }

        delete req.session.cartSession;

        res.render("./pages/welcome");
        
      } catch (error) {
        console.log(error);
        const errorMsg = {
          message: `No se pudo crear orden`,
          orderCreated: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },

    getAllOrder: async (req, res, next) => {
      try {
        const response = await service.getAllOrders();
        res.json(response);
      } catch (error) {
        console.log(error);
        const errorMsg = {
          message: `No se encontró ordenes.`,
          orderFinded: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },
  };
};

module.exports = orderController;
