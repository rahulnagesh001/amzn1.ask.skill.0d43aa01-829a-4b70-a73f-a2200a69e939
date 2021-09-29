/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const persistenceAdapter = require('ask-sdk-s3-persistence-adapter');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
       // const speakOutput = 'Welcome, you can say Hello or Help. Which would you like to try?';
        const speakOutput = 'Welcome to food recall. Which meal do you want to report?';
        //const repromptText = ' '
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt()
            .getResponse();
    }
};

const SetMealIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SetMealIntent';
    },
    async handle(handlerInput) {
    
    //const food = handlerInput.requestEnvelope.request.intent.slots.food.value;
    const meal = handlerInput.requestEnvelope.request.intent.slots.meal.value;
//    const place = handlerInput.requestEnvelope.request.intent.slots.place.value;
  //  const attributesManager = handlerInput.attributesManager;

  //  const mealAttributes = {
//  "meal" : meal,
 //   "food" : food,
//    "place" : place
//   0 };
    //const speechtext = 'You had ' + foodname + ' for ' + meal;
//    attributesManager.setPersistentAttributes(mealAttributes);
  //  await attributesManager.savePersistentAttributes();    

//    const speakOutput = `Thanks, I'll remember you had ${food} at ${place} .`;
 //   const question = `Have you entered all your foods and drinks?`
 

 
    return handlerInput.responseBuilder
    .addDelegateDirective({
        name: 'SetFoodIntent',
       confirmationStatus: 'NONE',
       slots: {}
    })
    .getResponse();

   // return handlerInput.responseBuilder
     // .speak(speakOutput + question)
      
        
    }
};


const SetFoodIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SetFoodIntent';
    },
    async handle(handlerInput) {
    
    const food = handlerInput.requestEnvelope.request.intent.slots.food.value;
    const where = handlerInput.requestEnvelope.request.intent.slots.where.value;
    const homemade = handlerInput.requestEnvelope.request.intent.slots.homemade.value;
    const details = handlerInput.requestEnvelope.request.intent.slots.details.value;
    const all = handlerInput.requestEnvelope.request.intent.slots.all.value;
    

    const speakOutput = `Thanks, I'll remember you had ${food}.`;
    const question = ` Have you entered all your foods and drinks?`
    
    if( all === 'yes'){
    return handlerInput.responseBuilder
    .addDelegateDirective({
        name: 'forgottenFoodIntent',
        confirmationStatus: 'NONE',
        slots: {}
    })
    .speak('Certain foods are forgotten.')
    .getResponse();
    }
    
    if (all === 'no'){
    return handlerInput.responseBuilder
      .addDelegateDirective({
        name: 'setFoodIntent',
        confirmationStatus: 'NONE',
        slots: {}
    })
    .speak('Please let me know what else you had')
    .getResponse();
    }
    }
};


const forgottenFoodIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'forgottenFoodIntent';
    },
    async handle(handlerInput) {
    const beverages= handlerInput.requestEnvelope.request.intent.slots.beverages.value;
    const sweet= handlerInput.requestEnvelope.request.intent.slots.sweet.value;
    const snack= handlerInput.requestEnvelope.request.intent.slots.snack.value;
    const fruits= handlerInput.requestEnvelope.request.intent.slots.fruits.value;
    const breads= handlerInput.requestEnvelope.request.intent.slots.breads.value;
    const supplements= handlerInput.requestEnvelope.request.intent.slots.supplements.value;
    
    if(beverages === 'yes' || sweet === 'yes' || snack === 'yes' || fruits === 'yes'|| breads === 'yes'|| supplements === 'yes' ){
    return handlerInput.responseBuilder
    .addDelegateDirective({
        name: 'SetFoodIntent',
        confirmationStatus: 'NONE',
        slots: {}
    })
    .speak('ok you had a forgotten food.')
    .getResponse();
        
    }
  //  else  if(sweet === 'yes'){
//    return handlerInput.responseBuilder
 //   .addDelegateDirective({
  //      name: 'SetFoodIntent',
//        confirmationStatus: 'NONE',
//        slots: {}
 //   })
 //   .speak('ok you had a sweet.')
 //   .getResponse();
        
  //  }
    return handlerInput.responseBuilder
     .addDelegateDirective({
        name: 'otherIntent',
        confirmationStatus: 'NONE',
        slots: {}
    })
    .speak(`you didnt have extras.`)
    .getResponse();
    
    }
};




const otherIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'otherIntent';
    },
    async handle(handlerInput) {
        
        const view= handlerInput.requestEnvelope.request.intent.slots.view.value;
        
        if (view === 'yes'){
        //const speakOutput = 'Hello World!';
        return handlerInput.responseBuilder
         //   .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .speak('Here is your report')
            .getResponse();
            
        }
        
         return handlerInput.responseBuilder
         //   .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .speak('Your meal has been recorded.')
            .getResponse();
            
        
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const PauseIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.PauseIntent';
    },
    handle(handlerInput) {
        

        return handlerInput.responseBuilder
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .withPersistenceAdapter(
    new persistenceAdapter.S3PersistenceAdapter({bucketName:process.env.S3_PERSISTENCE_BUCKET})
    )
    .addRequestHandlers(
        LaunchRequestHandler,
    //    NoIntentHandler,
    //    YesIntentHandler,
        SetFoodIntentHandler,
        SetMealIntentHandler,
        forgottenFoodIntentHandler,
        otherIntentHandler,
    //    HelloWorldIntentHandler,
        HelpIntentHandler,
        PauseIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)

    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();