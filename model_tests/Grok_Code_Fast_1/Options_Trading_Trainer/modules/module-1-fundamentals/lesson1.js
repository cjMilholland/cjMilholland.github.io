// Lesson 1: What Are Options? - JavaScript
// Built with Grok Code Fast 1

class Lesson1WhatAreOptions {
    constructor() {
        this.init();
    }

    init() {
        this.setupInteractiveElements();
        this.setupQuizSystem();
        this.setupProgressTracking();
        this.loadSavedProgress();

        // Hide loading state once initialization is complete
        setTimeout(() => {
            if (typeof hideQuizLoading === 'function') {
                hideQuizLoading();
            }
        }, 100);

        console.log('Lesson 1 initialized successfully');
    }

    // Interactive Elements Setup
    setupInteractiveElements() {
        // Contract specification exercise
        this.setupContractExercise();

        // Add click handlers for interactive elements
        this.setupGlossaryLinks();
        this.setupCalculatorLinks();
        this.setupVisualizerLinks();
    }

    setupContractExercise() {
        // This will be called when the contract exercise button is clicked
        window.checkContractAnswer = () => {
            console.log('checkContractAnswer called');
            const selectedAnswer = document.querySelector('input[name="contract-exercise"]:checked');
            const feedback = document.getElementById('contract-feedback');

            if (!selectedAnswer) {
                this.showFeedback('Please select an answer first.', 'warning', feedback);
                return;
            }

            const answer = selectedAnswer.value;
            if (answer === 'a') {
                this.showFeedback('Correct! AAPL 150C 2025-03-15 means Apple stock, $150 strike price, Call option, expiring March 15, 2025.', 'success', feedback);
                this.markExerciseComplete('contract-specification');
            } else {
                this.showFeedback('Not quite. Let\'s break it down: AAPL = Apple, 150 = strike price, C = Call, 2025-03-15 = expiration date.', 'error', feedback);
            }
        };

        // Make sure the function is immediately available
        console.log('checkContractAnswer function set up');
    }

    setupGlossaryLinks() {
        // Add click handlers for glossary terms
        const glossaryLinks = document.querySelectorAll('[onclick*="showConcept"]');
        glossaryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const concept = e.target.onclick.toString().match(/'([^']+)'/)[1];
                this.showConceptModal(concept);
            });
        });
    }

    setupCalculatorLinks() {
        window.openCalculator = () => {
            this.showNotification('Basic P/L Calculator will be available in the tools section.', 'info');
        };
    }

    setupVisualizerLinks() {
        window.openVisualizer = () => {
            this.showNotification('Options Visualizer will be available in the tools section.', 'info');
        };

        window.openContractBuilder = () => {
            this.showNotification('Contract Builder will be available in the tools section.', 'info');
        };

        window.openConceptChecker = () => {
            this.showNotification('Concept Checker will be available in the tools section.', 'info');
        };
    }

    // Quiz System
    setupQuizSystem() {
        this.quizQuestions = [
            {
                question: "What is an options contract?",
                options: [
                    "A type of stock that pays dividends",
                    "A contract giving the right, but not obligation, to buy or sell an asset",
                    "A loan from a bank",
                    "A type of mutual fund"
                ],
                correct: 1,
                explanation: "An options contract gives the buyer the right, but not the obligation, to buy or sell an underlying asset at a predetermined price within a specific time period."
            },
            {
                question: "What is the main difference between owning stock and owning an options contract?",
                options: [
                    "Options cost more money",
                    "Options have limited risk, stocks have unlimited risk",
                    "Options pay dividends, stocks don't",
                    "There is no difference"
                ],
                correct: 1,
                explanation: "With options, your maximum loss is limited to the premium paid, while stock ownership has unlimited risk (the stock can go to $0)."
            },
            {
                question: "What does 'AAPL 150C 2025-03-15' represent?",
                options: [
                    "Apple stock trading at $150",
                    "Apple call option with $150 strike expiring March 15, 2025",
                    "Apple put option with $150 strike expiring March 15, 2025",
                    "Apple stock dividend payment"
                ],
                correct: 1,
                explanation: "AAPL = Apple stock, 150 = strike price, C = Call option, 2025-03-15 = expiration date."
            },
            {
                question: "What is a 'strike price'?",
                options: [
                    "The price you pay for the option",
                    "The price at which you can buy or sell the underlying asset",
                    "The current price of the stock",
                    "The commission you pay to your broker"
                ],
                correct: 1,
                explanation: "The strike price is the predetermined price at which you can buy (call) or sell (put) the underlying asset if you exercise the option."
            },
            {
                question: "What happens when an options contract expires?",
                options: [
                    "You automatically get your money back",
                    "The contract becomes worthless if not exercised",
                    "You can renew it for another month",
                    "The broker keeps the premium"
                ],
                correct: 1,
                explanation: "When an options contract expires, it becomes worthless if it's out-of-the-money (not exercised). If it's in-the-money, it may be automatically exercised depending on your broker's policy."
            }
        ];

        this.currentQuestionIndex = 0;
        this.quizAnswers = new Array(this.quizQuestions.length).fill(null);
        this.quizStartTime = null;

        this.setupQuizNavigation();
        this.loadQuizProgress();
    }

    setupQuizNavigation() {
        const nextBtn = document.getElementById('next-question');
        const prevBtn = document.getElementById('prev-question');
        const finishBtn = document.getElementById('finish-quiz');
        const retakeBtn = document.getElementById('retake-quiz');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousQuestion());
        }

        if (finishBtn) {
            finishBtn.addEventListener('click', () => this.finishQuiz());
        }

        if (retakeBtn) {
            retakeBtn.addEventListener('click', () => this.retakeQuiz());
        }

        // Start quiz when page loads
        this.startQuiz();
    }

    startQuiz() {
        console.log('Starting quiz...');
        this.quizStartTime = new Date();
        this.currentQuestionIndex = 0;
        this.quizAnswers = new Array(this.quizQuestions.length).fill(null);

        // Add a small delay to ensure DOM is fully ready
        setTimeout(() => {
            try {
                this.displayCurrentQuestion();
                this.updateQuizProgress();
                console.log('Quiz started successfully');
            } catch (error) {
                console.error('Error starting quiz:', error);
                this.showQuizError('Failed to start quiz: ' + error.message);
            }
        }, 100);
    }

    displayCurrentQuestion() {
        const quizContent = document.getElementById('quiz-content');
        if (!quizContent) {
            console.error('Quiz content element not found');
            this.showQuizError('Quiz content element not found. Please refresh the page.');
            return;
        }

        const question = this.quizQuestions[this.currentQuestionIndex];
        if (!question) {
            console.error('Question not found at index:', this.currentQuestionIndex);
            this.showQuizError('Question data not found. Please refresh the page.');
            return;
        }

        const selectedAnswer = this.quizAnswers[this.currentQuestionIndex] || null;

        quizContent.innerHTML = `
            <div class="animate-fade-in-up">
                <div class="question-header mb-6">
                    <h3 class="text-xl font-bold text-white mb-2">Question ${this.currentQuestionIndex + 1} of ${this.quizQuestions.length}</h3>
                    <div class="question-type-badge">
                        <span class="bg-primary-600 text-white px-3 py-1 rounded-full text-sm">Multiple Choice</span>
                    </div>
                </div>
                <p class="text-lg text-secondary-200 mb-6 leading-relaxed">${question.question}</p>
                <div class="space-y-3">
                    ${question.options.map((option, index) => `
                        <label class="answer-option block w-full p-4 mb-3 border-2 border-secondary-600 rounded-lg cursor-pointer transition-all duration-200 bg-secondary-700 hover:border-primary-500 hover:bg-secondary-600 text-left ${selectedAnswer === index ? 'border-primary-500 bg-primary-900/30' : ''}">
                            <input type="radio" name="quiz-answer" value="${index}"
                                   ${selectedAnswer === index ? 'checked' : ''} class="mr-3 accent-primary-600">
                            <div class="flex items-start gap-3">
                                <span class="inline-flex items-center justify-center w-8 h-8 bg-secondary-600 text-secondary-200 border border-secondary-500 rounded-full font-bold text-sm flex-shrink-0 ${selectedAnswer === index ? 'bg-primary-500 text-white' : ''}">${String.fromCharCode(65 + index)}</span>
                                <span class="text-secondary-200 flex-1 leading-relaxed ${selectedAnswer === index ? 'text-primary-200 font-medium' : ''}">${option}</span>
                            </div>
                        </label>
                    `).join('')}
                </div>
                ${question.explanation ? `<div class="hidden mt-4 p-4 bg-primary-900/30 rounded-lg border border-primary-500/30">
                    <h4 class="text-primary-300 font-semibold mb-2">💡 Explanation:</h4>
                    <p class="text-primary-200 text-sm">${question.explanation}</p>
                </div>` : ''}
            </div>
        `;

        // Add event listeners for answer selection
        const radioButtons = quizContent.querySelectorAll('input[name="quiz-answer"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.quizAnswers[this.currentQuestionIndex] = parseInt(e.target.value);
                this.updateQuizNavigation();

                // Add visual feedback
                const selectedLabel = e.target.closest('.answer-option');
                const allLabels = quizContent.querySelectorAll('.answer-option');
                allLabels.forEach(label => label.classList.remove('selected'));
                selectedLabel.classList.add('selected');
            });
        });

        this.updateQuizNavigation();
    }

    updateQuizNavigation() {
        const prevBtn = document.getElementById('prev-question');
        const nextBtn = document.getElementById('next-question');
        const finishBtn = document.getElementById('finish-quiz');
        const currentQuestionSpan = document.getElementById('current-question');
        const totalQuestionsSpan = document.getElementById('total-questions');

        if (currentQuestionSpan) currentQuestionSpan.textContent = this.currentQuestionIndex + 1;
        if (totalQuestionsSpan) totalQuestionsSpan.textContent = this.quizQuestions.length;

        if (prevBtn) {
            prevBtn.style.display = this.currentQuestionIndex > 0 ? 'inline-block' : 'none';
        }

        const hasAnswer = this.quizAnswers[this.currentQuestionIndex] !== undefined;
        const isLastQuestion = this.currentQuestionIndex === this.quizQuestions.length - 1;

        if (nextBtn) {
            nextBtn.style.display = hasAnswer && !isLastQuestion ? 'inline-block' : 'none';
        }

        if (finishBtn) {
            finishBtn.style.display = hasAnswer && isLastQuestion ? 'inline-block' : 'none';
        }
    }

    updateQuizProgress() {
        const progressBar = document.getElementById('quiz-progress');
        if (progressBar) {
            const progress = ((this.currentQuestionIndex + 1) / this.quizQuestions.length) * 100;
            progressBar.style.width = progress + '%';
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.quizQuestions.length - 1) {
            this.currentQuestionIndex++;
            this.displayCurrentQuestion();
            this.updateQuizProgress();
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayCurrentQuestion();
            this.updateQuizProgress();
        }
    }

    finishQuiz() {
        const quizContent = document.getElementById('quiz-content');
        const quizResults = document.getElementById('quiz-results');

        if (!quizContent || !quizResults) return;

        // Calculate score
        let correctAnswers = 0;
        this.quizQuestions.forEach((question, index) => {
            if (this.quizAnswers[index] === question.correct) {
                correctAnswers++;
            }
        });

        const score = Math.round((correctAnswers / this.quizQuestions.length) * 100);
        const passed = score >= 80; // 80% passing score

        // Display results using the enhanced method
        this.displayQuizResults(score, correctAnswers, passed);

        // Hide quiz content and show results
        quizContent.style.display = 'none';
        quizResults.style.display = 'block';

        // Save quiz results
        this.saveQuizResults(score, passed);

        if (passed) {
            this.markLessonComplete();
            this.showNotification('🎊 Congratulations! You passed the quiz and completed Lesson 1!', 'success');
        } else {
            this.showNotification('Keep studying! Review the material and try again.', 'info');
        }
    }

    retakeQuiz() {
        const quizContent = document.getElementById('quiz-content');
        const quizResults = document.getElementById('quiz-results');

        if (quizContent) quizContent.style.display = 'block';
        if (quizResults) quizResults.style.display = 'none';

        this.startQuiz();
    }

    saveQuizResults(score, passed) {
        const quizResults = {
            lesson: 'Lesson 1: What Are Options?',
            score: score,
            passed: passed,
            answers: this.quizAnswers,
            completedDate: new Date().toISOString(),
            timeSpent: this.quizStartTime ? new Date() - this.quizStartTime : null
        };

        localStorage.setItem('lesson1_quiz_results', JSON.stringify(quizResults));
    }

    loadQuizProgress() {
        const savedResults = localStorage.getItem('lesson1_quiz_results');
        if (savedResults) {
            const results = JSON.parse(savedResults);
            if (results.passed) {
                // If already passed, show results
                this.finishQuiz();
            }
        }
    }

    // Progress Tracking
    setupProgressTracking() {
        // Track lesson reading progress
        this.lessonProgress = JSON.parse(localStorage.getItem('lesson1_progress') || '{}');
        this.trackReadingProgress();
    }

    trackReadingProgress() {
        // Simple scroll-based progress tracking
        const contentSections = document.querySelectorAll('.lesson-section');
        const progressItems = document.querySelectorAll('.progress-item');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.markSectionRead(sectionId);
                }
            });
        }, { threshold: 0.5 });

        contentSections.forEach(section => observer.observe(section));
    }

    markSectionRead(sectionId) {
        this.lessonProgress[sectionId] = true;
        localStorage.setItem('lesson1_progress', JSON.stringify(this.lessonProgress));

        // Update progress sidebar
        const progressItem = document.querySelector(`[data-section="${sectionId}"]`);
        if (progressItem) {
            progressItem.classList.add('completed');
        }
    }

    markLessonComplete() {
        // Mark lesson as complete in module progress
        const moduleProgress = JSON.parse(localStorage.getItem('module1_progress') || '{}');
        moduleProgress.lesson1_completed = true;
        moduleProgress.lesson1_completed_date = new Date().toISOString();
        localStorage.setItem('module1_progress', JSON.stringify(moduleProgress));

        this.showNotification('Lesson 1 completed successfully!', 'success');
    }

    markExerciseComplete(exerciseId) {
        // Mark specific exercise as complete
        const exerciseProgress = JSON.parse(localStorage.getItem('lesson1_exercises') || '{}');
        exerciseProgress[exerciseId] = true;
        localStorage.setItem('lesson1_exercises', JSON.stringify(exerciseProgress));

        this.showNotification('Exercise completed! Great job.', 'success');
    }

    loadSavedProgress() {
        // Load saved progress from localStorage
        try {
            const savedProgress = localStorage.getItem('lesson1_progress');
            if (savedProgress) {
                this.lessonProgress = JSON.parse(savedProgress);
            }

            const savedExercises = localStorage.getItem('lesson1_exercises');
            if (savedExercises) {
                this.exerciseProgress = JSON.parse(savedExercises);
            }

            console.log('Progress loaded successfully');
        } catch (error) {
            console.error('Error loading saved progress:', error);
        }
    }

    // Utility Methods
    showFeedback(message, type, container) {
        if (!container) return;

        container.innerHTML = `<div class="feedback-message ${type}">${message}</div>`;
        container.style.display = 'block';

        // Auto-hide after 5 seconds
        setTimeout(() => {
            container.style.display = 'none';
        }, 5000);
    }

    showNotification(message, type = 'info') {
        // Use the main notification system
        if (window.optionsTradingTrainer) {
            window.optionsTradingTrainer.showNotification(message, type);
        } else {
            alert(message); // Fallback
        }
    }

    showQuizError(message) {
        console.error('Quiz Error:', message);

        // Hide loading state
        const loadingDiv = document.getElementById('quiz-loading');
        const errorDiv = document.getElementById('quiz-error');

        if (loadingDiv) loadingDiv.style.display = 'none';
        if (errorDiv) {
            errorDiv.innerHTML = `
                <div class="text-4xl mb-4">⚠️</div>
                <p class="mb-4">${message}</p>
                <div class="space-y-2">
                    <button onclick="window.location.reload()" class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 mr-2">
                        Refresh Page
                    </button>
                    <button onclick="window.initializeLesson1Quiz()" class="bg-secondary-600 hover:bg-secondary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                        Retry Initialization
                    </button>
                </div>
            `;
            errorDiv.style.display = 'block';
        } else {
            // Fallback if error div doesn't exist
            alert('Quiz Error: ' + message + '\n\nPlease refresh the page to try again.');
        }
    }

    showConceptModal(concept) {
        const concepts = {
            'options-definition': {
                title: 'Options Contract Definition',
                content: 'An options contract is a financial derivative that gives the buyer the right, but not the obligation, to buy (call) or sell (put) an underlying asset at a predetermined price within a specific time period.'
            },
            'call-put-difference': {
                title: 'Call vs Put Options',
                content: 'A call option gives you the right to buy the underlying asset at the strike price. A put option gives you the right to sell the underlying asset at the strike price.'
            },
            'profit-loss-basics': {
                title: 'Basic Profit/Loss Calculation',
                content: 'For calls: Profit = (Stock Price - Strike Price) × 100 - Premium Paid. For puts: Profit = (Strike Price - Stock Price) × 100 - Premium Paid.'
            },
            'breakeven-analysis': {
                title: 'Breakeven Analysis',
                content: 'Breakeven for calls = Strike Price + Premium Paid. Breakeven for puts = Strike Price - Premium Paid. This is where you neither profit nor lose.'
            }
        };

        const conceptData = concepts[concept];
        if (!conceptData) return;

        const modal = document.createElement('div');
        modal.className = 'concept-modal-overlay';
        modal.innerHTML = `
            <div class="concept-modal">
                <div class="concept-modal-header">
                    <h3>${conceptData.title}</h3>
                    <button class="modal-close" onclick="this.closest('.concept-modal-overlay').remove()">&times;</button>
                </div>
                <div class="concept-modal-content">
                    <p>${conceptData.content}</p>
                </div>
            </div>
        `;

        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;

        const modalContent = modal.querySelector('.concept-modal');
        modalContent.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 8px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        `;

        document.body.appendChild(modal);
    }

    // Global functions for HTML onclick handlers
    openGlossary() {
        this.showNotification('Full glossary will be available in the resources section.', 'info');
    }

    bookmarkLesson() {
        this.showNotification('Lesson bookmarked! You can access it from your dashboard.', 'success');
    }

    // Additional functions for HTML integration
    retakeQuiz() {
        const quizContent = document.getElementById('quiz-content');
        const quizResults = document.getElementById('quiz-results');
        const detailedResults = document.getElementById('detailed-results');
        const nextLessonLink = document.getElementById('next-lesson-link');

        if (quizContent) quizContent.style.display = 'block';
        if (quizResults) quizResults.style.display = 'none';
        if (detailedResults) detailedResults.style.display = 'none';
        if (nextLessonLink) nextLessonLink.style.display = 'none';

        this.startQuiz();
        this.showNotification('Quiz restarted! Good luck!', 'info');
    }

    // Enhanced quiz result display
    displayQuizResults(score, correctAnswers, passed) {
        const finalScoreSpan = document.getElementById('final-score');
        const correctAnswersSpan = document.getElementById('correct-answers');
        const resultsMessage = document.getElementById('results-message');
        const resultIcon = document.getElementById('result-icon');
        const nextLessonLink = document.getElementById('next-lesson-link');

        if (finalScoreSpan) finalScoreSpan.textContent = score;
        if (correctAnswersSpan) correctAnswersSpan.textContent = correctAnswers;

        if (resultsMessage) {
            if (passed) {
                resultsMessage.textContent = `🎊 Congratulations! You passed with a score of ${score}%. You've successfully completed Lesson 1!`;
                resultsMessage.className = 'text-green-200';
            } else {
                resultsMessage.textContent = `You scored ${score}%. Review the material and try again to achieve at least 80%.`;
                resultsMessage.className = 'text-yellow-200';
            }
        }

        if (resultIcon) {
            if (passed) {
                resultIcon.innerHTML = '<span class="text-white text-sm">✓</span>';
                resultIcon.parentElement.className = 'w-8 h-8 bg-green-500 rounded-full flex items-center justify-center';
            } else {
                resultIcon.innerHTML = '<span class="text-white text-sm">↻</span>';
                resultIcon.parentElement.className = 'w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center';
            }
        }

        if (nextLessonLink && passed) {
            nextLessonLink.style.display = 'inline-block';
        }

        // Show detailed results
        this.showDetailedResults();
    }

    showDetailedResults() {
        const detailedResults = document.getElementById('detailed-results');
        const questionReview = document.getElementById('question-review');

        if (!detailedResults || !questionReview) return;

        let reviewHTML = '';

        this.quizQuestions.forEach((question, index) => {
            const userAnswer = this.quizAnswers[index];
            const isCorrect = userAnswer === question.correct;

            reviewHTML += `
                <div class="bg-secondary-700 rounded-lg p-4 ${isCorrect ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}">
                    <div class="flex items-start justify-between mb-2">
                        <h5 class="text-white font-semibold">Question ${index + 1}</h5>
                        <span class="text-sm ${isCorrect ? 'text-green-400' : 'text-red-400'}">
                            ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
                        </span>
                    </div>
                    <p class="text-secondary-300 text-sm mb-3">${question.question}</p>
                    <div class="text-xs text-secondary-400">
                        <div>Your answer: <span class="${isCorrect ? 'text-green-400' : 'text-red-400'}">${question.options[userAnswer] || 'Not answered'}</span></div>
                        ${!isCorrect ? `<div>Correct answer: <span class="text-green-400">${question.options[question.correct]}</span></div>` : ''}
                    </div>
                    ${question.explanation ? `<div class="mt-3 p-3 bg-primary-900/30 rounded text-primary-200 text-xs">${question.explanation}</div>` : ''}
                </div>
            `;
        });

        questionReview.innerHTML = reviewHTML;
        detailedResults.style.display = 'block';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired - initializing quiz...');
    try {
        window.lesson1Instance = new Lesson1WhatAreOptions();
        console.log('Lesson 1 initialized successfully');
    } catch (error) {
        console.error('Failed to initialize Lesson 1:', error);
    }
});

// Additional initialization methods for robustness
window.addEventListener('load', () => {
    console.log('Window load event fired');
    if (!window.lesson1Instance) {
        console.log('No instance found on load, initializing...');
        try {
            window.lesson1Instance = new Lesson1WhatAreOptions();
            console.log('Lesson 1 initialized on window load');
        } catch (error) {
            console.error('Failed to initialize on window load:', error);
        }
    }
});

// Immediate initialization if DOM is already ready
if (document.readyState === 'loading') {
    console.log('Document still loading, waiting for DOMContentLoaded');
} else {
    console.log('Document already loaded, initializing immediately');
    try {
        window.lesson1Instance = new Lesson1WhatAreOptions();
        console.log('Lesson 1 initialized immediately');
    } catch (error) {
        console.error('Failed to initialize immediately:', error);
    }
}

// Final fallback: timeout-based initialization
setTimeout(() => {
    console.log('Timeout fallback: checking if quiz is initialized...');
    if (!window.lesson1Instance) {
        console.log('No instance found after timeout, initializing...');
        try {
            window.lesson1Instance = new Lesson1WhatAreOptions();
            console.log('Lesson 1 initialized via timeout fallback');
        } catch (error) {
            console.error('Failed to initialize via timeout fallback:', error);
        }
    } else {
        console.log('Instance already exists, quiz should be working');
    }
}, 2000); // 2 second delay as final fallback

// Fallback initialization - call this if quiz doesn't load
window.initializeLesson1Quiz = function() {
    console.log('Manual quiz initialization called');
    if (!window.lesson1Instance) {
        try {
            window.lesson1Instance = new Lesson1WhatAreOptions();
            console.log('Lesson 1 initialized via manual call');
        } catch (error) {
            console.error('Failed to initialize Lesson 1 manually:', error);
        }
    } else {
        // If instance exists but quiz didn't start, try to start it manually
        if (window.lesson1Instance && window.lesson1Instance.startQuiz) {
            window.lesson1Instance.startQuiz();
        }
    }
};

// Make sure the function is available immediately
if (typeof window !== 'undefined') {
    window.initializeLesson1Quiz = window.initializeLesson1Quiz || function() {
        console.log('Fallback manual initialization');
        try {
            if (!window.lesson1Instance) {
                window.lesson1Instance = new Lesson1WhatAreOptions();
            }
        } catch (error) {
            console.error('Manual initialization failed:', error);
        }
    };

    // Also ensure checkContractAnswer is available as a fallback
    window.checkContractAnswer = window.checkContractAnswer || function() {
        console.log('Fallback checkContractAnswer called');
        if (window.lesson1Instance && window.lesson1Instance.setupContractExercise) {
            // Re-setup the contract exercise if instance exists
            window.lesson1Instance.setupContractExercise();
            // Now call the function
            if (window.checkContractAnswer !== arguments.callee) {
                window.checkContractAnswer();
            }
        } else {
            alert('Quiz not fully loaded yet. Please wait a moment and try again.');
        }
    };
}

// Add feedback message styles
const feedbackStyles = `
    .feedback-message {
        padding: 1rem;
        border-radius: 6px;
        margin-top: 1rem;
        font-weight: 500;
    }

    .feedback-message.success {
        background: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }

    .feedback-message.error {
        background: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }

    .feedback-message.warning {
        background: #fff3cd;
        color: #856404;
        border: 1px solid #ffeaa7;
    }

    .answer-option {
        display: block;
        padding: 1rem;
        margin: 0.5rem 0;
        border: 2px solid #374151;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        background: #1f2937;
    }

    .answer-option:hover {
        border-color: #3b82f6;
        background: #1e40af;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    .answer-option.selected {
        border-color: #3b82f6;
        background: #1e40af;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    }

    .answer-option input[type="radio"] {
        margin-right: 0.75rem;
        accent-color: #3b82f6;
    }

    .option-content {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
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
        flex-shrink: 0;
        margin-top: 0.125rem;
    }

    .answer-option.selected .option-letter {
        background: #3b82f6;
        color: white;
    }

    .option-text {
        flex: 1;
        color: #e5e7eb;
        line-height: 1.5;
    }

    .answer-option:hover .option-text {
        color: #f9fafb;
    }

    .answer-option.selected .option-text {
        color: #f9fafb;
        font-weight: 500;
    }

    .question-type-badge {
        display: inline-block;
    }

    .animate-fade-in-up {
        animation: fadeInUp 0.6s ease-out;
    }

    @keyframes fadeInUp {
        0% {
            opacity: 0;
            transform: translateY(30px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .quiz-question {
        max-width: none;
    }

    .question-header {
        border-bottom: 1px solid #374151;
        padding-bottom: 1rem;
    }

    .question-explanation {
        border-left: 4px solid #3b82f6;
    }

    .question-explanation h4 {
        color: #93c5fd;
        margin-bottom: 0.5rem;
    }

    /* Enhanced button styles */
    #next-question, #prev-question, #finish-quiz {
        transition: all 0.3s ease;
    }

    #next-question:hover, #prev-question:hover, #finish-quiz:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    /* Progress bar enhancement */
    #quiz-progress {
        transition: width 0.3s ease;
    }

    /* Modal styles */
    .concept-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(4px);
    }

    .concept-modal {
        background: #1f2937;
        border: 1px solid #374151;
        border-radius: 12px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
    }

    .concept-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        border-bottom: 1px solid #374151;
        padding-bottom: 1rem;
    }

    .concept-modal-header h3 {
        color: #f9fafb;
        font-size: 1.25rem;
        font-weight: bold;
    }

    .modal-close {
        background: none;
        border: none;
        color: #9ca3af;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: all 0.2s ease;
    }

    .modal-close:hover {
        background: #374151;
        color: #f9fafb;
    }

    .concept-modal-content p {
        color: #d1d5db;
        line-height: 1.6;
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = feedbackStyles;
document.head.appendChild(styleSheet);
