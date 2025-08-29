// Module 1: Options Trading Fundamentals - JavaScript
// Built with Grok Code Fast 1

class Module1Fundamentals {
    constructor() {
        this.init();
    }

    init() {
        this.setupProgressTracking();
        this.setupLessonCompletion();
        this.setupAssessmentUnlock();
        this.loadSavedProgress();
        this.updateUI();
    }

    // Progress Tracking System
    setupProgressTracking() {
        // Load saved progress from localStorage
        this.progress = JSON.parse(localStorage.getItem('module1_progress') || '{}');

        // Set up lesson completion handlers
        const completeButtons = document.querySelectorAll('.mark-complete');
        completeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const lessonId = e.target.dataset.lesson;
                this.markLessonComplete(lessonId);
            });
        });
    }

    markLessonComplete(lessonId) {
        // Update progress
        this.progress[`lesson${lessonId}_completed`] = true;
        this.progress[`lesson${lessonId}_completed_date`] = new Date().toISOString();

        // Save to localStorage
        localStorage.setItem('module1_progress', JSON.stringify(this.progress));

        // Update UI
        this.updateLessonProgress(lessonId);
        this.updateModuleCompletionStatus();
        this.checkAssessmentUnlock();

        // Show success message
        this.showNotification(`Lesson ${lessonId} marked as complete!`, 'success');
    }

    updateLessonProgress(lessonId) {
        const lessonCard = document.querySelector(`[data-lesson="${lessonId}"]`);
        if (lessonCard) {
            const progressFill = lessonCard.querySelector('.progress-fill');
            const progressText = lessonCard.querySelector('.progress-text');
            const completeButton = lessonCard.querySelector('.mark-complete');

            if (progressFill && progressText) {
                progressFill.style.width = '100%';
                progressText.textContent = '100% Complete';

                // Add completed class for styling
                lessonCard.classList.add('completed');
            }

            if (completeButton) {
                completeButton.textContent = 'Completed ✓';
                completeButton.disabled = true;
                completeButton.classList.add('completed');
            }
        }
    }

    updateModuleCompletionStatus() {
        const requirements = document.querySelectorAll('.requirement');
        const lesson1Complete = this.progress.lesson1_completed;
        const lesson2Complete = this.progress.lesson2_completed;
        const assessmentComplete = this.progress.assessment_completed;

        // Update requirement statuses
        if (lesson1Complete) {
            this.updateRequirementStatus('req-lesson1', true);
        }
        if (lesson2Complete) {
            this.updateRequirementStatus('req-lesson2', true);
        }
        if (assessmentComplete) {
            this.updateRequirementStatus('req-assessment', true);
        }

        // Check if all requirements are met
        if (lesson1Complete && lesson2Complete && assessmentComplete) {
            this.showModuleCompletion();
        }
    }

    updateRequirementStatus(requirementId, completed) {
        const requirement = document.getElementById(requirementId);
        if (requirement) {
            const statusIcon = requirement.querySelector('.req-status');
            if (statusIcon) {
                statusIcon.textContent = completed ? '✅ Complete' : '❌ Incomplete';
                statusIcon.className = `req-status ${completed ? 'complete' : 'incomplete'}`;
            }
        }
    }

    checkAssessmentUnlock() {
        const lesson1Complete = this.progress.lesson1_completed;
        const lesson2Complete = this.progress.lesson2_completed;
        const assessmentBtn = document.getElementById('start-assessment-btn');
        const assessmentStatus = document.getElementById('assessment-ready-status');

        if (lesson1Complete && lesson2Complete) {
            if (assessmentBtn) {
                assessmentBtn.disabled = false;
                assessmentBtn.textContent = 'Start Assessment';
            }
            if (assessmentStatus) {
                assessmentStatus.textContent = 'Ready to take assessment!';
                assessmentStatus.className = 'prereq-status ready';
            }
        }
    }

    showModuleCompletion() {
        const completionMessage = document.getElementById('completion-message');
        const takeAssessmentBtn = document.getElementById('take-assessment-btn');

        if (completionMessage) {
            completionMessage.style.display = 'block';
        }
        if (takeAssessmentBtn) {
            takeAssessmentBtn.style.display = 'none';
        }

        // Trigger celebration animation
        this.showCelebration();
    }

    showCelebration() {
        // Create celebration effect
        const celebration = document.createElement('div');
        celebration.className = 'celebration-overlay';
        celebration.innerHTML = `
            <div class="celebration-content">
                <div class="celebration-icon">🎉</div>
                <h2>Congratulations!</h2>
                <p>You've completed Module 1: Options Trading Fundamentals!</p>
                <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">Continue</button>
            </div>
        `;

        // Add celebration styles
        celebration.style.cssText = `
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
            animation: fadeIn 0.5s ease-out;
        `;

        const celebrationContent = celebration.querySelector('.celebration-content');
        celebrationContent.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            max-width: 400px;
            animation: slideUp 0.5s ease-out 0.2s both;
        `;

        document.body.appendChild(celebration);

        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    loadSavedProgress() {
        // Load progress from localStorage and update UI accordingly
        Object.keys(this.progress).forEach(key => {
            if (key.includes('_completed') && this.progress[key]) {
                const lessonId = key.match(/lesson(\d+)/)?.[1];
                if (lessonId) {
                    this.updateLessonProgress(lessonId);
                }
            }
        });

        this.updateModuleCompletionStatus();
        this.checkAssessmentUnlock();
    }

    updateUI() {
        // Update any dynamic UI elements based on current state
        this.updateProgressBars();
    }

    updateProgressBars() {
        // Update progress bars based on completion status
        const totalLessons = 2;
        const completedLessons = Object.keys(this.progress).filter(key =>
            key.includes('_completed') && this.progress[key]
        ).length;

        const overallProgress = (completedLessons / totalLessons) * 100;

        // Update main progress bars if they exist
        const progressFills = document.querySelectorAll('#lesson1-progress, #lesson2-progress');
        progressFills.forEach(fill => {
            const lessonId = fill.id.match(/lesson(\d+)/)?.[1];
            if (lessonId && this.progress[`lesson${lessonId}_completed`]) {
                fill.style.width = '100%';
            }
        });
    }

    // Assessment Handling
    startAssessment() {
        // Navigate to assessment or open assessment modal
        window.location.href = '#assessment';
    }

    // Utility Methods
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create new notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Close notification">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
            color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
            border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
            border-radius: 8px;
            padding: 16px;
            z-index: 1002;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        `;

        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);

        document.body.appendChild(notification);
    }

    // Reset Progress (for development/testing)
    resetProgress() {
        if (confirm('Are you sure you want to reset all progress for Module 1? This cannot be undone.')) {
            localStorage.removeItem('module1_progress');
            this.progress = {};
            location.reload();
        }
    }

    // Export Progress
    exportProgress() {
        const data = {
            module: 'Module 1: Fundamentals',
            progress: this.progress,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'module1-progress.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification('Progress exported successfully!', 'success');
    }

    // Import Progress
    importProgress(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.module === 'Module 1: Fundamentals' && data.progress) {
                    this.progress = data.progress;
                    localStorage.setItem('module1_progress', JSON.stringify(this.progress));
                    this.loadSavedProgress();
                    this.showNotification('Progress imported successfully!', 'success');
                } else {
                    throw new Error('Invalid file format');
                }
            } catch (error) {
                this.showNotification('Error importing progress. Please check the file format.', 'error');
            }
        };
        reader.readAsText(file);
    }
}

// Global functions for HTML onclick handlers
function resetProgress() {
    if (window.module1Instance) {
        window.module1Instance.resetProgress();
    }
}

function startAssessment() {
    if (window.module1Instance) {
        window.module1Instance.startAssessment();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.module1Instance = new Module1Fundamentals();
        console.log('Module 1 Fundamentals initialized successfully');
    } catch (error) {
        console.error('Failed to initialize Module 1:', error);
    }
});

// Add CSS animations for notifications
const notificationStyles = `
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

    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .notification-icon {
        font-size: 1.2rem;
        font-weight: bold;
    }

    .notification-message {
        flex: 1;
    }

    .notification-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .req-status.complete {
        color: #28a745;
    }

    .req-status.incomplete {
        color: #dc3545;
    }

    .prereq-status.ready {
        color: #28a745;
        font-weight: bold;
    }
`;

// Add notification styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

export default Module1Fundamentals;
