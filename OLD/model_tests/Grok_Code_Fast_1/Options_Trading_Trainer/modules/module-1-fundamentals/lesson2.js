// Lesson 2: Call and Put Options - Interactive JavaScript
// Built with Grok Code Fast 1

class Lesson2 {
    constructor() {
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.questions = this.getQuestions();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateCalculators();
        this.initializeQuiz();
        this.setupProgressTracking();
    }

    // Setup Event Listeners
    setupEventListeners() {
        // Call option calculator inputs
        const callInputs = ['call-strike', 'call-premium', 'call-stock-price'];
        callInputs.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', () => this.updateCallCalculator());
            }
        });

        // Put option calculator inputs
        const putInputs = ['put-strike', 'put-premium', 'put-stock-price'];
        putInputs.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', () => this.updatePutCalculator());
            }
        });

        // Quiz navigation
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousQuestion());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }
    }

    // Call Option Calculator
    updateCallCalculator() {
        const strike = parseFloat(document.getElementById('call-strike')?.value) || 0;
        const premium = parseFloat(document.getElementById('call-premium')?.value) || 0;
        const stockPrice = parseFloat(document.getElementById('call-stock-price')?.value) || 0;

        // Calculate intrinsic value
        const intrinsicValue = Math.max(0, stockPrice - strike);

        // Calculate profit/loss
        const profitLoss = (intrinsicValue - premium) * 100;

        // Calculate breakeven
        const breakeven = strike + premium;

        // Update display
        this.updateElement('call-intrinsic', `$${intrinsicValue.toFixed(2)}`);
        this.updateElement('call-profit-loss', this.formatCurrency(profitLoss));
        this.updateElement('call-breakeven', `$${breakeven.toFixed(2)}`);

        // Add visual feedback
        this.updateCalculatorStyling('call-profit-loss', profitLoss);
    }

    // Put Option Calculator
    updatePutCalculator() {
        const strike = parseFloat(document.getElementById('put-strike')?.value) || 0;
        const premium = parseFloat(document.getElementById('put-premium')?.value) || 0;
        const stockPrice = parseFloat(document.getElementById('put-stock-price')?.value) || 0;

        // Calculate intrinsic value
        const intrinsicValue = Math.max(0, strike - stockPrice);

        // Calculate profit/loss
        const profitLoss = (intrinsicValue - premium) * 100;

        // Calculate breakeven
        const breakeven = strike - premium;

        // Update display
        this.updateElement('put-intrinsic', `$${intrinsicValue.toFixed(2)}`);
        this.updateElement('put-profit-loss', this.formatCurrency(profitLoss));
        this.updateElement('put-breakeven', `$${breakeven.toFixed(2)}`);

        // Add visual feedback
        this.updateCalculatorStyling('put-profit-loss', profitLoss);
    }

    // Update Calculators on Load
    updateCalculators() {
        this.updateCallCalculator();
        this.updatePutCalculator();
    }

    // Helper Methods
    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    formatCurrency(amount) {
        const formatted = Math.abs(amount).toFixed(2);
        const sign = amount >= 0 ? '+' : '-';
        return `${sign}$${formatted}`;
    }

    updateCalculatorStyling(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            // Remove existing classes
            element.classList.remove('profit', 'loss', 'breakeven');

            // Add appropriate class
            if (value > 0) {
                element.classList.add('profit');
            } else if (value < 0) {
                element.classList.add('loss');
            } else {
                element.classList.add('breakeven');
            }
        }
    }

    // Quiz System
    getQuestions() {
        return [
            {
                question: "What does a call option give you the right to do?",
                options: [
                    "Sell the underlying stock at the strike price",
                    "Buy the underlying stock at the strike price",
                    "Hold the underlying stock indefinitely",
                    "Short the underlying stock"
                ],
                correct: 1,
                explanation: "A call option gives you the right (but not the obligation) to buy the underlying stock at the strike price."
            },
            {
                question: "When should you buy a call option?",
                options: [
                    "When you expect the stock price to fall",
                    "When you expect the stock price to rise",
                    "When you want to sell the stock",
                    "When you want to hold the stock long-term"
                ],
                correct: 1,
                explanation: "Call options are bought when you have a bullish outlook and expect the stock price to rise."
            },
            {
                question: "What is the maximum risk when buying a call option?",
                options: [
                    "The full value of the underlying stock",
                    "Unlimited loss potential",
                    "The premium paid for the option",
                    "Twice the premium paid"
                ],
                correct: 2,
                explanation: "The maximum risk for a call option buyer is limited to the premium paid - you can always let the option expire worthless."
            },
            {
                question: "What does a put option give you the right to do?",
                options: [
                    "Buy the underlying stock at the strike price",
                    "Sell the underlying stock at the strike price",
                    "Hold the underlying stock indefinitely",
                    "Short the underlying stock"
                ],
                correct: 1,
                explanation: "A put option gives you the right (but not the obligation) to sell the underlying stock at the strike price."
            },
            {
                question: "When should you buy a put option?",
                options: [
                    "When you expect the stock price to rise",
                    "When you expect the stock price to fall",
                    "When you want to buy more stock",
                    "When you want to hold the stock long-term"
                ],
                correct: 1,
                explanation: "Put options are bought when you have a bearish outlook and expect the stock price to fall."
            },
            {
                question: "What is the breakeven price for a call option with strike $100 and premium $5?",
                options: [
                    "$95",
                    "$100",
                    "$105",
                    "$110"
                ],
                correct: 2,
                explanation: "Breakeven for a call = Strike + Premium = $100 + $5 = $105"
            },
            {
                question: "What is the breakeven price for a put option with strike $100 and premium $5?",
                options: [
                    "$95",
                    "$100",
                    "$105",
                    "$110"
                ],
                correct: 0,
                explanation: "Breakeven for a put = Strike - Premium = $100 - $5 = $95"
            },
            {
                question: "Which option type has unlimited profit potential?",
                options: [
                    "Put options only",
                    "Call options only",
                    "Both call and put options",
                    "Neither option type"
                ],
                correct: 1,
                explanation: "Call options have unlimited profit potential if the stock price continues to rise, while put options have limited profit potential."
            },
            {
                question: "If a stock is trading at $50 and you buy a call with strike $55 for $2, what is your maximum loss?",
                options: [
                    "$0",
                    "$200",
                    "$500",
                    "Unlimited"
                ],
                correct: 1,
                explanation: "Maximum loss is limited to the premium paid: $2 × 100 shares = $200"
            },
            {
                question: "Which statement about options is correct?",
                options: [
                    "Options always expire worthless",
                    "Options give you the obligation to buy or sell",
                    "Options limit your risk to the premium paid",
                    "Options can only be used by professional traders"
                ],
                correct: 2,
                explanation: "Options limit risk to the premium paid, unlike stocks which can lose their entire value."
            }
        ];
    }

    initializeQuiz() {
        this.userAnswers = new Array(this.questions.length).fill(null);
        this.showQuestion(0);
        this.updateQuizProgress();
    }

    showQuestion(index) {
        if (index < 0 || index >= this.questions.length) return;

        const question = this.questions[index];
        const questionElement = document.getElementById('question-text');
        const optionsElement = document.getElementById('quiz-options');

        if (questionElement) {
            questionElement.textContent = question.question;
        }

        if (optionsElement) {
            optionsElement.innerHTML = question.options.map((option, optionIndex) => {
                const isSelected = this.userAnswers[index] === optionIndex;
                const isCorrect = optionIndex === question.correct;
                const isIncorrect = this.userAnswers[index] !== null && this.userAnswers[index] === optionIndex && !isCorrect;

                let baseClasses = 'block w-full p-4 mb-3 border-2 border-secondary-600 rounded-lg cursor-pointer transition-all duration-200 bg-secondary-700 hover:border-primary-500 hover:bg-secondary-600 text-left';
                let letterClasses = 'inline-flex items-center justify-center w-8 h-8 bg-secondary-600 text-secondary-200 border border-secondary-500 rounded-full font-bold text-sm mr-3 flex-shrink-0';
                let textClasses = 'text-secondary-200';

                if (isSelected && isCorrect) {
                    baseClasses += ' border-green-500 bg-green-900/30';
                    letterClasses = 'inline-flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full font-bold text-sm mr-3 flex-shrink-0';
                    textClasses = 'text-green-200 font-medium';
                } else if (isIncorrect) {
                    baseClasses += ' border-red-500 bg-red-900/30';
                    letterClasses = 'inline-flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full font-bold text-sm mr-3 flex-shrink-0';
                    textClasses = 'text-red-200 font-medium';
                } else if (isSelected) {
                    baseClasses += ' border-primary-500 bg-primary-900/30';
                    letterClasses = 'inline-flex items-center justify-center w-8 h-8 bg-primary-500 text-white rounded-full font-bold text-sm mr-3 flex-shrink-0';
                    textClasses = 'text-primary-200 font-medium';
                }

                return `
                    <button class="${baseClasses}" onclick="selectAnswer(${index}, ${optionIndex})">
                        <div class="flex items-start gap-3">
                            <span class="${letterClasses}">${String.fromCharCode(65 + optionIndex)}</span>
                            <span class="${textClasses} flex-1 leading-relaxed">${option}</span>
                            ${isSelected && isCorrect ? '<span class="text-green-400 text-lg font-bold ml-2">✓</span>' : ''}
                            ${isIncorrect ? '<span class="text-red-400 text-lg font-bold ml-2">✕</span>' : ''}
                        </div>
                    </button>
                `;
            }).join('');
        }

        this.updateNavigationButtons();
    }

    selectAnswer(questionIndex, answerIndex) {
        this.userAnswers[questionIndex] = answerIndex;
        this.showQuestion(questionIndex);
        this.updateQuizProgress();
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.showQuestion(this.currentQuestionIndex);
        } else {
            this.showQuizResults();
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.showQuestion(this.currentQuestionIndex);
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const currentQuestion = document.getElementById('current-question');

        if (prevBtn) {
            prevBtn.disabled = this.currentQuestionIndex === 0;
        }

        if (nextBtn) {
            const answered = this.userAnswers[this.currentQuestionIndex] !== null;
            nextBtn.disabled = !answered;
            nextBtn.textContent = this.currentQuestionIndex === this.questions.length - 1 ? 'Finish Quiz' : 'Next';
        }

        if (currentQuestion) {
            currentQuestion.textContent = this.currentQuestionIndex + 1;
        }
    }

    updateQuizProgress() {
        const answered = this.userAnswers.filter(answer => answer !== null).length;
        const progress = (answered / this.questions.length) * 100;

        const progressFill = document.getElementById('quiz-progress-fill');
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
    }

    showQuizResults() {
        const quizContainer = document.querySelector('.quiz-container');
        const quizQuestion = document.getElementById('quiz-question');
        const quizResults = document.getElementById('quiz-results');

        if (quizQuestion) quizQuestion.style.display = 'none';
        if (quizResults) quizResults.style.display = 'block';

        // Calculate results
        let correct = 0;
        this.questions.forEach((question, index) => {
            if (this.userAnswers[index] === question.correct) {
                correct++;
            }
        });

        const percentage = Math.round((correct / this.questions.length) * 100);

        // Update results display
        this.updateElement('correct-answers', correct);
        this.updateElement('score-percentage', `${percentage}%`);

        // Show appropriate message
        const messageElement = document.getElementById('results-message');
        if (messageElement) {
            if (percentage >= 80) {
                messageElement.innerHTML = `
                    <div class="success-message">
                        <h4>🎉 Excellent Work!</h4>
                        <p>You've mastered the fundamentals of call and put options. You're ready to move on to more advanced concepts!</p>
                    </div>
                `;
            } else if (percentage >= 60) {
                messageElement.innerHTML = `
                    <div class="good-message">
                        <h4>� Good Job!</h4>
                        <p>You have a solid understanding of call and put options. Consider reviewing the material and retaking the quiz.</p>
                    </div>
                `;
            } else {
                messageElement.innerHTML = `
                    <div class="review-message">
                        <h4>📚 Keep Learning</h4>
                        <p>Take some time to review the lesson material and retake the quiz. Understanding these concepts is crucial for successful options trading.</p>
                    </div>
                `;
            }
        }

        // Save progress
        this.saveQuizProgress(correct, this.questions.length, percentage);
    }

    saveQuizProgress(correct, total, percentage) {
        const progress = {
            lesson: 'lesson-2-calls-puts',
            completed: true,
            score: percentage,
            correct: correct,
            total: total,
            timestamp: new Date().toISOString()
        };

        // Save to localStorage
        const existingProgress = JSON.parse(localStorage.getItem('lesson-progress') || '{}');
        existingProgress['lesson-2'] = progress;
        localStorage.setItem('lesson-progress', JSON.stringify(existingProgress));

        // Update module progress
        this.updateModuleProgress(percentage >= 60);
    }

    updateModuleProgress(passed) {
        // This would typically update the parent module's progress
        console.log('Lesson 2 completed:', passed ? 'Passed' : 'Needs Review');
    }

    // Progress Tracking
    setupProgressTracking() {
        // Track reading progress
        this.trackReadingProgress();

        // Load saved progress
        this.loadSavedProgress();
    }

    trackReadingProgress() {
        const sections = document.querySelectorAll('.lesson-section');
        const progressElement = document.getElementById('reading-progress');

        if (!progressElement) return;

        const observer = new IntersectionObserver((entries) => {
            let visibleSections = 0;
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    visibleSections++;
                }
            });

            const progress = Math.min((visibleSections / sections.length) * 100, 100);
            progressElement.textContent = Math.round(progress) + '%';

            const progressFill = document.getElementById('reading-progress-fill');
            if (progressFill) {
                progressFill.style.width = progress + '%';
            }
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));
    }

    loadSavedProgress() {
        const savedProgress = JSON.parse(localStorage.getItem('lesson-progress') || '{}');
        const lessonProgress = savedProgress['lesson-2'];

        if (lessonProgress) {
            // If already completed, show results
            if (lessonProgress.completed) {
                this.showQuizResults();
            }
        }
    }

    // Utility Methods
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
}

// Global function for quiz options
function selectAnswer(questionIndex, answerIndex) {
    if (window.lesson2Instance) {
        window.lesson2Instance.selectAnswer(questionIndex, answerIndex);
    } else if (window.lesson2) {
        // Fallback for old instance name
        window.lesson2.selectAnswer(questionIndex, answerIndex);
    }
}

// Global function for retaking quiz
function retakeQuiz() {
    if (window.lesson2Instance) {
        window.lesson2Instance.initializeQuiz();
        const quizQuestion = document.getElementById('quiz-question');
        const quizResults = document.getElementById('quiz-results');

        if (quizQuestion) quizQuestion.style.display = 'block';
        if (quizResults) quizResults.style.display = 'none';
    } else if (window.lesson2) {
        // Fallback for old instance name
        window.lesson2.initializeQuiz();
        const quizQuestion = document.getElementById('quiz-question');
        const quizResults = document.getElementById('quiz-results');

        if (quizQuestion) quizQuestion.style.display = 'block';
        if (quizResults) quizResults.style.display = 'none';
    }
}

// Robust initialization system for Lesson 2
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired - initializing Lesson 2...');
    try {
        window.lesson2Instance = new Lesson2();
        console.log('Lesson 2 initialized successfully');
    } catch (error) {
        console.error('Failed to initialize Lesson 2:', error);
    }
});

// Additional initialization methods for robustness
window.addEventListener('load', () => {
    console.log('Window load event fired for Lesson 2');
    if (!window.lesson2Instance) {
        console.log('No Lesson 2 instance found on load, initializing...');
        try {
            window.lesson2Instance = new Lesson2();
            console.log('Lesson 2 initialized on window load');
        } catch (error) {
            console.error('Failed to initialize Lesson 2 on window load:', error);
        }
    }
});

// Immediate initialization if DOM is already ready
if (document.readyState === 'loading') {
    console.log('Lesson 2: Document still loading, waiting for DOMContentLoaded');
} else {
    console.log('Lesson 2: Document already loaded, initializing immediately');
    try {
        window.lesson2Instance = new Lesson2();
        console.log('Lesson 2 initialized immediately');
    } catch (error) {
        console.error('Failed to initialize Lesson 2 immediately:', error);
    }
}

// Final fallback: timeout-based initialization
setTimeout(() => {
    console.log('Lesson 2 timeout fallback: checking if quiz is initialized...');
    if (!window.lesson2Instance) {
        console.log('No Lesson 2 instance found after timeout, initializing...');
        try {
            window.lesson2Instance = new Lesson2();
            console.log('Lesson 2 initialized via timeout fallback');
        } catch (error) {
            console.error('Failed to initialize Lesson 2 via timeout fallback:', error);
        }
    } else {
        console.log('Lesson 2 instance already exists, quiz should be working');
    }
}, 2000);

// Manual initialization function
window.initializeLesson2Quiz = function() {
    console.log('Manual Lesson 2 quiz initialization called');
    if (!window.lesson2Instance) {
        try {
            window.lesson2Instance = new Lesson2();
            console.log('Lesson 2 initialized via manual call');
        } catch (error) {
            console.error('Failed to initialize Lesson 2 manually:', error);
        }
    } else {
        // If instance exists but quiz didn't start, try to restart it
        if (window.lesson2Instance && window.lesson2Instance.initializeQuiz) {
            window.lesson2Instance.initializeQuiz();
        }
    }
};

// Add CSS styles for quiz and calculators
const lesson2Styles = `
    /* Quiz Styles */
    .quiz-option {
        display: block;
        width: 100%;
        padding: 1rem;
        margin: 0.5rem 0;
        border: 2px solid #374151;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        background: #1f2937;
        text-align: left;
        font-size: 1rem;
    }

    .quiz-option:hover {
        border-color: #3b82f6;
        background: #1e40af;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    .quiz-option.correct {
        border-color: #10b981;
        background: #064e3b;
        box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.5);
    }

    .quiz-option.incorrect {
        border-color: #ef4444;
        background: #7f1d1d;
        box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.5);
    }

    .option-letter {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        background: #374151;
        color: #f3f4f6;
        border-radius: 50%;
        font-weight: bold;
        font-size: 0.875rem;
        margin-right: 0.75rem;
        flex-shrink: 0;
    }

    .quiz-option.correct .option-letter {
        background: #10b981;
        color: white;
    }

    .quiz-option.incorrect .option-letter {
        background: #ef4444;
        color: white;
    }

    .option-text {
        flex: 1;
        color: #e5e7eb;
    }

    .quiz-option:hover .option-text {
        color: #f9fafb;
    }

    .quiz-option.correct .option-text,
    .quiz-option.incorrect .option-text {
        color: #f9fafb;
        font-weight: 500;
    }

    .checkmark, .x-mark {
        margin-left: 0.5rem;
        font-size: 1.2rem;
        font-weight: bold;
    }

    .checkmark {
        color: #10b981;
    }

    .x-mark {
        color: #ef4444;
    }

    /* Calculator Styles */
    .profit {
        color: #10b981 !important;
        font-weight: bold;
    }

    .loss {
        color: #ef4444 !important;
        font-weight: bold;
    }

    .breakeven {
        color: #f59e0b !important;
        font-weight: bold;
    }

    /* Notification Styles */
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #1f2937;
        color: #f9fafb;
        border: 1px solid #374151;
        border-radius: 8px;
        padding: 16px;
        z-index: 1002;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .notification-message {
        flex: 1;
    }

    .notification-close {
        background: none;
        border: none;
        color: #9ca3af;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .notification-close:hover {
        color: #f9fafb;
    }

    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    /* Progress Bar Enhancement */
    #quiz-progress-fill {
        transition: width 0.3s ease;
    }

    /* Button Enhancements */
    #prev-btn, #next-btn {
        transition: all 0.3s ease;
    }

    #prev-btn:hover, #next-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    #prev-btn:disabled, #next-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }

    /* Results Message Styles */
    .success-message h4 {
        color: #10b981;
        margin-bottom: 0.5rem;
    }

    .good-message h4 {
        color: #f59e0b;
        margin-bottom: 0.5rem;
    }

    .review-message h4 {
        color: #ef4444;
        margin-bottom: 0.5rem;
    }

    .success-message, .good-message, .review-message {
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
    }

    .success-message {
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid rgba(16, 185, 129, 0.3);
    }

    .good-message {
        background: rgba(245, 158, 11, 0.1);
        border: 1px solid rgba(245, 158, 11, 0.3);
    }

    .review-message {
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.3);
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = lesson2Styles;
document.head.appendChild(styleSheet);
