const faqs = [];

/**
 * Get answer for given question
 * 
 * @param {string} question 
 */
const getAnswer = (question, faqs) => {
    let answer = 'you said ' + question;
    let foundAnswer = false;
    faqs.forEach((faq) => {
        if (faq.question.toLowerCase().indexOf(question.replace('?', '').toLowerCase()) > -1) {
            answer = faq.answer;
            foundAnswer = true;
            return;
        }
        if (foundAnswer) return;
    });

    return answer;
}

module.exports = {
    faqs,
    getAnswer
};