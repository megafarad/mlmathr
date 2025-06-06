import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {supabase} from "../../supabase.ts";
import {constructUrl} from "../../constructUrl.ts";

const AuthPage: React.FC = () => {
    const { login, signup } = useAuth();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const redirectTo = params.get('to') || '/progress';
    const showVerifyMessage = params.get('verify') === '1';
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [showResetForm, setShowResetForm] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetSent, setResetSent] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const [submitting, setSubmitting] = useState(false);


    useEffect(() => {
        if (!isSignup && emailRef.current) {
            emailRef.current.focus();
        }
    }, [isSignup]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            if (isSignup) {
                const { error } = await signup(email, password);
                if (!error) {
                    navigate('/auth?verify=1');
                    return;
                } else {
                    setError(error.message);
                }
            } else {
                const { error } = await login(email, password);
                if (error) {
                    setError(error.message);
                } else {
                    navigate(redirectTo); // ← Use this instead of hardcoding /progress
                }
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(
                resetEmail,
                { redirectTo: constructUrl('/reset-password')});
            if (error) {
                setError(error.message);
            } else {
                setResetSent(true);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to send reset email.');
        }
    };


    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow rounded">
            <h2 className="text-xl font-semibold mb-4">{isSignup ? 'Sign Up' : 'Log In'}</h2>

            {showVerifyMessage && (
                <div className="mb-4 p-3 bg-blue-100 text-blue-800 rounded">
                    ✅ Your account was created! Please check your email to confirm before logging in.
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    ref={emailRef}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                />
                <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full py-2 rounded ${
                        submitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                >
                    {submitting ? 'Processing...' : isSignup ? 'Create Account' : 'Log In'}
                </button>
            </form>

            {showResetForm && (
                <form onSubmit={handlePasswordReset} className="mt-6 space-y-4">
                    <h3 className="text-sm font-semibold">Reset Password</h3>
                    <input
                        type="email"
                        placeholder="Your email address"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                    >
                        Send Reset Link
                    </button>
                    {resetSent && (
                        <p className="text-green-600 text-sm">✅ Check your email for the reset link.</p>
                    )}
                </form>
            )}


            {error && <p className="text-red-600 mt-4">{error}</p>}

            <p className="mt-4 text-sm">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                    onClick={() => setIsSignup(!isSignup)}
                    className="text-blue-600 hover:underline"
                >
                    {isSignup ? 'Log In' : 'Sign Up'}
                </button>
            </p>
            {!showResetForm && !isSignup && (
                <p className="mt-4 text-sm text-right">
                    <button
                        onClick={() => setShowResetForm(true)}
                        className="text-blue-600 hover:underline"
                    >
                        Forgot password?
                    </button>
                </p>
            )}
        </div>
    );
};

export default AuthPage;
