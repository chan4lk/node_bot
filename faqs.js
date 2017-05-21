const faqs = [{
        answer: 'You will have to use gasoline and lots of wood to do this.',
        questions: ['How to burn the company', 'How to start a fire']
    },
    {
        answer: '1996.',
        questions: ['What is year of foundation', 'When is year of foundation?']
    },
    {
        answer: 'Write your password on a paper and give it the admin. They will reset it for you.',
        questions: ['How to reset the password'],
    },
     {
        answer: 'Hello I\'m vortex bot. Nice to meet you',
        questions: ['Hi', 'Hello'],
    }
];

/**
 * Get answer for given question
 * 
 * @param {string} question 
 */
const getAnswer = (question) => {
    let answer = 'you said ' + question;
    let foundAnswer = false;
    faqs.forEach((faq) => {
        faq.questions.forEach((q) => {
            if(q.toLowerCase().indexOf(question.replace('?','').toLowerCase()) > -1){
                answer = faq.answer;
                foundAnswer = true;
                return;
            }
        });

        if(foundAnswer) return;
    });

    return answer;
}

module.exports = { faqs, getAnswer };