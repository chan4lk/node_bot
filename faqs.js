const commonFaqs = [{
        questions: ['Hi', 'Hello', 'Good Morning', 'Good Afternoon'],
        answers: ['Hi I\'m Vortex bot. What can I do for you', 'Hello, Nice to meet you']
    },
    {
        questions: ['VortexBot', 'Who are you'],
        answers: ['Welcome to Vortex Faq Bot.\n Ask questions from view faq section. Any other message will be echoed.']
    },
    {
        questions: ['chandima'],
        answers: ['Welcome Chandima, Hope you are doing well :)']
    }
];

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

const answerCommon = (question) => {
    let foundAnswer = false;
    let answer = '';
    commonFaqs.forEach(function (faq) {
        if (foundAnswer) return;
        faq.questions.forEach(function (q) {
            if (foundAnswer) return;
            if (q.toLowerCase() === question.replace('?', '').toLowerCase()) {
                answer = faq.answers[getRandomInt(0,faq.answers.length - 1)];
                foundAnswer = true;
                return;
            }
        }, this)
    }, this);

    return answer;
};

/**
 * Get answer for given question
 * 
 * @param {string} question 
 */
const getAnswer = (question, faqs) => {
    let answer = 'you said ' + question;
    let foundAnswer = false;
    faqs.forEach((faq) => {
        if (foundAnswer) return;
        if (faq.question.toLowerCase().indexOf(question.replace('?', '').toLowerCase()) > -1) {
            answer = faq.answer;
            foundAnswer = true;
            return;
        }
    });

    return answer;
}

module.exports = {    
    answerCommon,
    getAnswer
};