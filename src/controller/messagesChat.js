const MessagesChatService = require("../services/messagesChat");
const messageChat = new MessagesChatService();

const { normalize, schema } = require("normalizr");

exports.createMsg = async (req, res, next) => {
  try {
    const msgCreated = await messageChat.createMessage(req.body);
    res.json({ msg: "Message Chat created!", messageChat: msgCreated });
  } catch (error) {
    console.log(error);
    const errorMsg = {
      message: "No se creó mensaje",
      mesgCreated: false,
      error: error,
    };
    res.status(400).json(errorMsg);
  }
};

exports.getAllMsgChat = async (req, res, next) => {
  try {
    const allMsgChat = await messageChat.getAllMessage();
    const historyChat = { id: 1, content: allMsgChat };
    const userSchema = new schema.Entity("author");

    /* Con este esquema con este atributo id lo que hace es crear la entidad author, donde cada autor el ID es su ALIAS: 

     const userSchema = new schema.Entity('authors',{}, {idAttribute: (value) => value.alias});

     pero si no le colocamos nada lo que hace es leer por defecto dentro de author (consignado en el entry schema "author:userSchema") la propiedad ID, que en nuestra DB es el mail. Si en vez de ponerle author le pongo otra cosa se va a romper. 

    */

    const entrySchema = new schema.Entity(
      "entries",
      {
        author: userSchema,
      },
      { idAttribute: (value) => value._id.toString() }
    ); /*Este es el ID del mensaje de chat */

    const chatSchema = new schema.Entity("chat", {
      content: [entrySchema],
    });

    const normalizedChat = normalize(historyChat, chatSchema);

    /*
    Se han comentado las opciones según como se ejecuta la APP. Actualmente se ejecuta el chat bajo socketIO; por lo cual lo que renderiza es solo la página.
    */

    //Sirve para cuando hay renderizado del lado del cliente
    // res.json(normalizedChat)

    //Sirve para la petición HTTP
    // console.log(allMsgChat);
    // res.render("./pages/chat", { allMsgChat });

    // Sirve para SocketIo
    res.render("./pages/chat");
  } catch (error) {
    console.log(error);
    const errorMsg = {
      message: "No se cargaron mensajes",
      mesgFounded: false,
      error: error,
    };
    res.status(400).json(errorMsg);
  }
};

exports.getMsgByEmail = async (req, res, next) => {
  try {
    res.render("./pages/chat-by-email", { layout: "chat-private" });
  } catch (error) {
    console.log(error);
    const errorMsg = {
      message: "No se cargaron mensajes",
      mesgFounded: false,
      error: error,
    };
    res.status(400).json(errorMsg);
  }
};
