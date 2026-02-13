// toast.js
// Toast notification system for user feedback

import { useState, useEffect } from 'react';

let toastQueue = [];
let toastListener = null;

export const showToast = (message, type = 'info') => {
    const toast = {
        id: Date.now() + Math.random(),
        message,
        type, // 'success', 'error', 'warning', 'info'
    };
    toastQueue.push(toast);
    if (toastListener) {
        toastListener([...toastQueue]);
    }
};

export const ToastContainer = () => {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        toastListener = setToasts;
        return () => {
            toastListener = null;
        };
    }, []);

    const removeToast = (id) => {
        toastQueue = toastQueue.filter((t) => t.id !== id);
        setToasts([...toastQueue]);
    };

    useEffect(() => {
        if (toasts.length > 0) {
            const timer = setTimeout(() => {
                removeToast(toasts[0].id);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toasts]);

    const getToastIcon = (type) => {
        switch (type) {
            case 'success': return '✅';
            case 'error': return '❌';
            case 'warning': return '⚠️';
            default: return 'ℹ️';
        }
    };

    const getToastColor = (type) => {
        switch (type) {
            case 'success': return 'var(--color-input)';
            case 'error': return 'var(--color-filter)';
            case 'warning': return 'var(--color-text)';
            default: return 'var(--color-api)';
        }
    };

    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className="toast"
                    style={{ borderLeft: `3px solid ${getToastColor(toast.type)}` }}
                >
                    <span className="toast-icon">{getToastIcon(toast.type)}</span>
                    <span className="toast-message">{toast.message}</span>
                    <button className="toast-close" onClick={() => removeToast(toast.id)}>
                        ✕
                    </button>
                </div>
            ))}
        </div>
    );
};
