// This loads the environment variables from the .env file
require('dotenv-extended').load();

var builder = require('botbuilder');
var restify = require('restify');
const {
    answerCommon,
    getAnswer
} = require('./faqs');

const {
    getFaqs
} = require('./graph/graphclient');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});


// Create connector and listen for messages
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
server.post('/api/messages', connector.listen());

var instructions = 'Welcome to Vortex Faq Bot.\n' +
    'Ask questions from view faq section. Any other message will be echoed.';

var bot = new builder.UniversalBot(connector, function (session) {
    var reply = new builder.Message()
        .address(session.message.address);
    var text = session.message.text.toLocaleLowerCase();
    const answer = answerCommon(text);
    if (answer) {
        reply.text(answer);
        session.send(reply);
    } else {
        getFaqs().then(function (faqs) {
            switch (text) {
                case 'show me a hero card':
                    reply.text('Sample message with a HeroCard attachment')
                        .addAttachment(new builder.HeroCard(session)
                            .title('Sample Hero Card')
                            .text('Displayed in the DirectLine client'));
                    break;

                case 'send me a botframework image':
                    reply.text('Sample message with an Image attachment')
                        .addAttachment({
                            contentUrl: 'https://docs.microsoft.com/en-us/bot-framework/media/how-it-works/architecture-resize.png',
                            contentType: 'image/png',
                            name: 'BotFrameworkOverview.png'
                        });

                    break;

                default:
                    reply.text(getAnswer(session.message.text, faqs));
                    break;
            }


            session.send(reply);
        }, function (error) {
            reply.text('I can\'t help you sorry');
            session.send(reply)
        });

    }


});


bot.on('conversationUpdate', function (activity) {
    // when user joins conversation, send instructions
    if (activity.membersAdded) {
        activity.membersAdded.forEach(function (identity) {
            if (identity.id === activity.address.bot.id) {
                var reply = new builder.Message()
                    .address(activity.address)
                    .text(instructions);
                bot.send(reply);
            }
        });
    }
});