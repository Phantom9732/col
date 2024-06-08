var http = require('http');
var fs = require('fs');
const WebSocket = require( "ws");
var request = require('request').defaults({ encoding: null });

var index = fs.readFileSync('index.html');

const server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
}).listen(8080);

const drinks = {
   'tea': ['https://img.freepik.com/premium-photo/concept-of-hot-drink-with-tea-on-white-background_185193-69230.jpg', 'https://img.freepik.com/premium-photo/cup-of-green-tea-and-linden-on-wooden-background-useful-linden-flowers-folk-medicine-concept_194017-375.jpg', 'https://img.freepik.com/premium-photo/the-hand-holds-a-transparent-teapot-with-mint-tea-isolated-with-backlight_508835-4209.jpg'],
   'coffee': ['https://img.freepik.com/free-photo/delicious-coffee-beans-and-cup_23-2150691429.jpg', 'https://img.freepik.com/free-photo/espresso-on-a-dark-background-the-steam-rises-above-the-coffee-coffee-for-breakfast-in-an-italian-cafe-shop-vertical-shot-selective-focus_166373-2022.jpg', 'https://img.freepik.com/free-photo/latte-coffee-cup_1203-7772.jpg'],
   'juice': ['https://img.freepik.com/free-photo/delicious-glass-of-orange-juice_144627-16582.jpg', 'https://img.freepik.com/free-photo/front-view-of-fresh-natural-delicious-juice-in-two-glasses-with-red-apple-limes-on-black-background_140725-140202.jpg', 'https://img.freepik.com/premium-photo/tomato-juice-in-glasses-and-fresh-ripe-tomatoes_78677-7973.jpg']
 }
 let item


const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on('connection', ws => {
   console.log('New client connected!')
   ws.on('message', m => {
   try {
      const jsonMessage = JSON.parse(m);
      console.log(jsonMessage)
      switch (jsonMessage.action) {
         case 'SelectList':
            if (!drinks.hasOwnProperty(jsonMessage.data)) {
               ws.send(JSON.stringify({action: null, data: 'ERROR: Unknown item!'}));
               break
            }
            item = drinks[jsonMessage.data]
            ws.send(JSON.stringify({ action: "SelectItem", data: "Please input number of link:"}));
            for (let i = 0; i < item.length; i++) { 
               ws.send(JSON.stringify({ action: "SelectItem", data: i + ".) " + item[i]}));
               }
            break;
         case 'SelectItem':
            let link = item[jsonMessage.data]
            //ws.send(JSON.stringify({action: null, data: link}));
               request.get(link, function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                     data = "data:" + response.headers["content-type"] + ";base64," + Buffer.from(body).toString('base64');
                     ws.send(JSON.stringify({ action: "SaveFile", data: data}));
                  }
               });
            break;
        default:
          console.log('Unknown item');
          ws.send(JSON.stringify({action: null, data: 'Unknown item'}));
          break;
      }
    } catch (error) {
      console.log('Ошибка', error);
    }
    
   });

   ws.on("error", e => ws.send(e));
   ws.send(JSON.stringify({ action: 'SelectList', data: 'Hello! Connected to ws server'}));
   ws.send(JSON.stringify({ action: 'SelectList', data: 'Please select one drink of: '}));
   drinksKeys = Object.keys(drinks)
   for (let i = 0; i < drinksKeys.length; i++) { 
      ws.send(JSON.stringify({ action: "SelectList", data: drinksKeys[i]}));
   }
});
